// Screenshots a video at evenly spaced moments, plus a pause test, so motion
// and layout can be looked at without watching. Needs a served build (never the
// dev server): `npx vite build && npx vite preview --port 4182`.
//
//   node .claude/skills/video-studio/scripts/frame-strip.mjs <screen n | title words> [--frames 10] [--url http://localhost:4182/] [--out dir] [--width 1280]
//
// Prints the PNG paths; read them with the Read tool. Practice videos have no
// /lesson/:n screen; strip their flat main-path twin or move them in to test.

import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { loadCourse } from './journey.mjs';

const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : def;
};
const optVals = new Set(['--frames', '--url', '--out', '--width'].flatMap((f) => [args.indexOf(f) + 1]).filter((i) => i > 0));
const target = args.filter((a, i) => !a.startsWith('--') && !optVals.has(i)).join(' ');
const frames = Number(opt('frames', 10));
const base = opt('url', 'http://localhost:4182/').replace(/\/?$/, '/');
const width = Number(opt('width', 1280));
if (!target) {
  console.error('usage: frame-strip.mjs <screen n | title words> [--frames 10] [--url …] [--out dir]');
  process.exit(2);
}

const { videos } = await loadCourse();
const main = videos.filter((v) => !v.practice);
const v = /^\d+$/.test(target) ? main.find((x) => x.n === Number(target)) : main.find((x) => x.title.toLowerCase().includes(target.toLowerCase()));
if (!v) {
  console.error(`no main-path video matches "${target}". Some: ${main.slice(0, 8).map((x) => `#${x.n} ${x.title}`).join(' · ')}`);
  process.exit(2);
}
const out = opt('out', path.join(process.env.TMPDIR ?? '/tmp', 'frame-strip', `${v.topic}-${v.n}`));
await mkdir(out, { recursive: true });

async function chrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const cache = path.join(process.env.HOME ?? '', '.cache', 'ms-playwright');
  for (const d of (await readdir(cache).catch(() => [])).filter((d) => d.startsWith('chromium-')).sort().reverse()) return path.join(cache, d, 'chrome-linux64', 'chrome');
  throw new Error('no Playwright Chromium in ~/.cache/ms-playwright (set CHROME=/path)');
}

const { chromium } = await import('playwright-core');
const browser = await chromium.launch({ executablePath: await chrome(), args: ['--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width, height: Math.round(width * 0.67) } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(`${base}electrical-machines/dc-motor/lesson/${v.n}`, { waitUntil: 'networkidle' });
const screen = page.locator('.scene-screen');
await screen.waitFor({ timeout: 15000 });
await page.waitForTimeout(1200);

const pause = async () => {
  const btn = page.locator('.scene-bar .scene-btn').first();
  if ((await btn.getAttribute('aria-label')) === 'Pause') await btn.click();
};
await pause();
const bar = page.locator('.scene-progress');
const shots = [];
for (let i = 0; i < frames; i++) {
  const f = (i + 0.5) / frames;
  if (!(await bar.count())) break; // a question card replaced the bar
  const box = await bar.boundingBox();
  await page.mouse.click(box.x + box.width * f, box.y + box.height / 2);
  await pause();
  await page.waitForTimeout(900); // let entrances and the camera settle
  const file = path.join(out, `${String(i).padStart(2, '0')}-${Math.round(f * 100)}pct.png`);
  await screen.screenshot({ path: file });
  shots.push(file);
}

// Pause test: nothing may move while paused.
const a = await screen.screenshot();
await page.waitForTimeout(1500);
const b = await screen.screenshot();
const still = a.equals(b);
await browser.close();

console.log(`${v.topic} #${v.n} "${v.title}" (${v.beats.length} beats)`);
console.log(shots.join('\n'));
console.log(`pause test: ${still ? 'ok, frozen' : 'FAILED, something moves while paused'}`);
if (errors.length) console.log(`page errors:\n  ${errors.join('\n  ')}`);
process.exit(still && !errors.length ? 0 : 1);
