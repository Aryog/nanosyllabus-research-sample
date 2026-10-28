// Renders the course's videos into MP4 files, public/videos/<key>.mp4 (key =
// videoKey of everything the video says), which the player's download button
// saves. Nothing is screen-recorded: each video is opened in Chrome's headless
// shell with ?render and drawn frame by frame. The page's clock (timers,
// animation frames, CSS animations) moves exactly 1/30 s per frame however
// long a frame takes to draw, each frame is captured as an image, and ffmpeg
// lays the recorded voice clips under the frames at the moments the player
// logged for them.
// Questions answer themselves. Lines without a recorded clip stay silent
// (captions only). Only new or edited videos are rendered; files of removed
// videos are deleted.
//
//   npm run render:videos                render what's missing
//   npm run render:videos -- 4.1 4.2     only these micro-topics
//   npm run render:videos -- --force     render again even if the file exists
//
// Needs ffmpeg and Chrome's headless shell (npx playwright install
// chromium-headless-shell), or one at CHROME=/path.

import { mkdir, readFile, readdir, rm, stat, unlink, writeFile } from 'node:fs/promises';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { beatText, videoKey, voiceKey } from '../src/video/voice.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'videos');
const clipDir = path.join(root, 'public', 'audio', 'scene');
const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));
const FPS = 30;
const TAIL = FPS; // frames kept after the video ends
const exists = (p) => stat(p).then(() => true, () => false);
const run = promisify(execFile);

// Bundle the course (JSX) so its videos can be listed in Node.
const tmp = path.join(root, 'node_modules', '.render-videos');
await mkdir(tmp, { recursive: true });
const bundle = path.join(tmp, 'journey.mjs');
await build({
  entryPoints: [path.join(root, 'src/content/journey.jsx')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom'],
  define: { 'import.meta.env.BASE_URL': '"/"' },
  outfile: bundle,
  logLevel: 'warning',
});
globalThis.window = globalThis;
globalThis.localStorage = { getItem: () => null };
const realFetch = globalThis.fetch;
globalThis.fetch = (u, ...r) => (String(u).startsWith('/') ? Promise.reject(new Error('local')) : realFetch(u, ...r));
const { journey } = await import(pathToFileURL(bundle).href);

// Videos of the main path, by screen number (as /lesson/:n counts them).
const all = journey.steps
  .filter((st) => !st.practice && !st.retryOf)
  .map((st, n) => ({ n, st }))
  .filter(({ st }) => st.video && st.figureProps?.beats?.length)
  .map(({ n, st }) => ({ n, title: st.title ?? `Video ${n}`, topic: st.chapter?.split(' · ')[0] ?? '', key: videoKey(st.figureProps.beats), beats: st.figureProps.beats }));
// Recorded clips, and for each video which of its lines have one: a video
// rendered before more of its lines were recorded is rendered again.
const clips = JSON.parse(await readFile(path.join(clipDir, 'manifest.json'), 'utf8').catch(() => '{}'));
for (const v of all) v.voiced = v.beats.map((b) => (clips[voiceKey(beatText(b))] ? 1 : 0)).join('');
const done = JSON.parse(await readFile(path.join(outDir, 'manifest.json'), 'utf8').catch(() => '{}'));
const keep = new Set(all.map((v) => v.key));

await mkdir(outDir, { recursive: true });
const todo = [];
for (const v of all) {
  if (only.length && !only.includes(v.topic)) continue;
  if (!force && done[v.key]?.voiced === v.voiced && (await exists(path.join(outDir, `${v.key}.mp4`)))) continue;
  todo.push(v);
}
console.log(`${all.length} videos, ${todo.length} to render`);
const rendered = new Set();

if (todo.length) {
  // Lengths of the recorded clips (s); the player times each line by them.
  const durs = {};
  await Promise.all(
    Object.keys(clips).map(async (key) => {
      const { stdout } = await run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(clipDir, `${key}.mp3`)]).catch(() => ({ stdout: '' }));
      if (parseFloat(stdout) > 0) durs[key] = parseFloat(stdout);
    }),
  );

  // Serve a fresh build: no dev server, so nothing is recorded with ElevenLabs.
  const vite = await import('vite');
  await vite.build({ root, logLevel: 'warn' });
  const server = await vite.preview({ root, preview: { port: 4179, strictPort: false }, logLevel: 'warn' });
  const base = server.resolvedUrls.local[0];
  const { chromium } = await import('playwright-core');
  // Frames are drawn only when asked for (begin-frame control), and every
  // animation runs on the main thread, so the frame clock drives all of them.
  // SwiftShader draws the 3D videos (WebGL) without a GPU.
  const browser = await chromium.launchPersistentContext('', {
    executablePath: await findShell(),
    viewport: null,
    args: ['--deterministic-mode', '--enable-begin-frame-control', '--run-all-compositor-stages-before-draw', '--disable-threaded-animation', '--disable-threaded-scrolling', '--disable-checker-imaging', '--enable-unsafe-swiftshader'],
  });
  // Animation frames get the page clock's time, like everything else the player times.
  await browser.addInitScript((d) => {
    window.__clipDurs = d;
    const raf = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (f) => raf(() => f(performance.now()));
  }, durs);
  // One video at a time: the frame clock doesn't take two pages at once.
  let failed = 0;
  try {
    for (const [i, v] of todo.entries()) {
      const t0 = Date.now();
      try {
        const secs = await render(browser, base, v);
        rendered.add(v.key);
        console.log(`[${i + 1}/${todo.length}] ${v.topic} ${v.title}: ${secs.toFixed(0)} s video in ${Math.round((Date.now() - t0) / 1000)} s`);
      } catch (e) {
        failed++;
        console.log(`[${i + 1}/${todo.length}] ${v.topic} ${v.title}: failed, ${e.message}`);
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }
  if (failed) process.exitCode = 1;
}

// One video: frames from the page on its frame clock, then its voice.
async function render(browser, base, v) {
  const open = browser.waitForEvent('page');
  const root = await browser.newCDPSession(browser.pages()[0]);
  await root.send('Target.createTarget', { url: 'about:blank', enableBeginFrameControl: true });
  const page = await open;
  page.on('pageerror', (e) => console.log(`  ${v.title}: page error: ${e.message}`));
  const cdp = await browser.newCDPSession(page);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 860, deviceScaleFactor: 1, mobile: false });
  // Frame times, in the browser's monotonic clock (ms): they start now, as the
  // page does, so its animations don't wait for the frames to catch up.
  let ticks = Number(process.hrtime.bigint() / 1_000_000n) + 100;
  // One frame: the page's timers run 1/30 s (longer while it is still
  // loading something), then it draws at the matching frame time.
  const frame = async (shot) => {
    await new Promise((res) => {
      cdp.once('Emulation.virtualTimeBudgetExpired', res);
      cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pauseIfNetworkFetchesPending', budget: 1000 / FPS });
    });
    ticks += 1000 / FPS;
    const r = await cdp.send('HeadlessExperimental.beginFrame', { frameTimeTicks: ticks, interval: 1000 / FPS, ...(shot ? { screenshot: { format: 'jpeg', quality: 92 } } : {}) });
    return r.screenshotData;
  };
  await cdp.send('Emulation.setVirtualTimePolicy', { policy: 'pause' });
  page.goto(`${base}electrical-machines/dc-motor/lesson/${v.n}?render`).catch(() => {});
  let box = null;
  for (let i = 0; i < 600 && !box; i++) {
    await frame(false);
    box = await page
      .evaluate(() => {
        const r = document.querySelector('.scene-screen')?.getBoundingClientRect();
        return r && [r.width, r.height, r.x, r.y].map((n) => Math.round(n / 2) * 2).join(':');
      })
      .catch(() => null);
  }
  if (!box) throw new Error('the video did not load');
  const T0 = await page.evaluate(() => performance.now());

  const frames = path.join(tmp, `${v.key}.frames.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-vf', `crop=${box},scale=-2:720:flags=lanczos`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '22', '-pix_fmt', 'yuv420p', frames], { stdio: ['pipe', 'ignore', 'inherit'] });
  const encoded = new Promise((res, rej) => ff.on('exit', (c) => (c ? rej(new Error(`ffmpeg exited ${c}`)) : res())));
  let n = 0;
  let tail = -1;
  let last = null;
  for (; n < FPS * 60 * 30 && tail !== 0; n++) {
    // No screenshot when nothing changed: the frame is the same as the last one.
    const data = (await frame(true)) ?? last;
    if (!data) continue;
    last = data;
    if (!ff.stdin.write(Buffer.from(data, 'base64'))) await new Promise((r) => ff.stdin.once('drain', r));
    if (tail > 0) tail--;
    else if (tail < 0 && n % 10 === 0 && (await page.evaluate(() => window.__render?.ended))) tail = TAIL;
  }
  ff.stdin.end();
  await encoded;
  const voice = await page.evaluate(() => window.__render.voice.map(({ key, off, t, len, speed }) => ({ key, off, t, len, speed })));
  await page.close();

  // Each stretch of a clip the player played: cut it, speed it up like the
  // player did (pitch kept), and start it where it was heard.
  const inputs = ['-i', frames];
  const parts = [];
  voice.forEach((s, i) => {
    inputs.push('-i', path.join(clipDir, `${s.key}.mp3`));
    const delay = Math.max(0, Math.round(s.t - T0));
    parts.push(`[${i + 1}:a]atrim=start=${s.off.toFixed(3)}:duration=${((s.len * s.speed) / 1000).toFixed(3)},asetpts=PTS-STARTPTS,atempo=${s.speed},adelay=${delay}:all=1[a${i}]`);
  });
  const secs = n / FPS;
  const mix = voice.length
    ? [...parts, `${voice.map((_, i) => `[a${i}]`).join('')}amix=inputs=${voice.length}:normalize=0,apad,atrim=duration=${secs.toFixed(3)}[a]`].join(';')
    : `anullsrc=r=44100:cl=stereo,atrim=duration=${secs.toFixed(3)}[a]`;
  await run('ffmpeg', ['-y', '-loglevel', 'error', ...inputs, '-filter_complex', mix, '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', path.join(outDir, `${v.key}.mp4`)], { maxBuffer: 1 << 24 });
  await unlink(frames);
  return secs;
}

// CHROME, else a headless shell Playwright has downloaded.
async function findShell() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = path.join(process.env.HOME ?? '', '.cache', 'ms-playwright');
  const builds = (await readdir(cache).catch(() => [])).filter((d) => d.startsWith('chromium_headless_shell-')).sort().reverse();
  for (const d of builds)
    for (const f of ['chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell', 'chrome-mac/headless_shell', 'chrome-win/headless_shell.exe'])
      if (await exists(path.join(cache, d, f))) return path.join(cache, d, f);
  throw new Error('no Chrome headless shell: run npx playwright install chromium-headless-shell, or set CHROME');
}

// Manifest of the rendered videos (the player shows the button only for
// these); files of videos no longer in the course are removed.
const manifest = {};
for (const f of await readdir(outDir)) {
  const key = f.replace(/\.mp4$/, '');
  if (f === key) continue;
  if (!keep.has(key)) {
    await unlink(path.join(outDir, f));
    continue;
  }
  const s = await stat(path.join(outDir, f));
  const v = all.find((v) => v.key === key);
  manifest[key] = { title: v.title, v: Math.round(s.mtimeMs).toString(36), voiced: rendered.has(key) ? v.voiced : done[key]?.voiced };
}
await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await rm(tmp, { recursive: true, force: true });
console.log(`${Object.keys(manifest).length} videos ready in public/videos`);
