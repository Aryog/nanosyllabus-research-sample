// Pre-records the video scenes' captions with ElevenLabs into
// public/audio/scene/<key>.mp3 (key = voiceKey of the spoken text). Only new or
// edited lines are requested; clips for removed lines are deleted.
//
//   npm run audio:scenes -- 4.1            record missing lines of micro-topic 4.1 (its videos and practice videos)
//   npm run audio:scenes -- 4.1 --dry      just count lines and characters
//   npm run audio:scenes -- 4.1 --even     even out clips already recorded (no credits)
//   npm run audio:scenes -- 4.1 --main     only the main path (overview to big picture), no practice videos
//   npm run audio:scenes -- 4.1 --redo     record again even the lines that already have a clip
//   npm run audio:scenes -- 4.1 --whole    each segment as one continuous take per telling (Tutor and
//                                          Lecturer), cut into its line clips (skill rule 27)
//   npm run audio:scenes -- 4.1 --whole --per-video   the old way: one take per video
//   npm run audio:scenes                   every topic (asks nothing: estimate first!)
//
// Every new clip is evened out (audio-even.mjs): same pace, loudness and
// pauses, so the voice sounds the same everywhere.
//
// Key is read from .env as ELEVENLABS_API_KEY=sk_... (a bare sk_... line also works).
// Optional: ELEVENLABS_SCENE_VOICE_ID, ELEVENLABS_SCENE_MODEL_ID.

import { readFile, writeFile, mkdir, access, readdir, unlink, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { beatText, isNepali, spoken, videoKey, voiceKey } from '../src/video/voice.js';
import { cutTake, isWhole, wholeTag } from './whole-take.mjs';
import { evenClip, evenTag, isEven } from './audio-even.mjs';

// Robust delivery: the steadiest, most even read.
const VOICE = { stability: 1.0, similarity_boost: 0.8, use_speaker_boost: true };
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'audio', 'scene');
const manifestPath = path.join(outDir, 'manifest.json');
const dry = process.argv.includes('--dry');
const evenOnly = process.argv.includes('--even');
const mainOnly = process.argv.includes('--main');
const redo = process.argv.includes('--redo');
const whole = process.argv.includes('--whole');
const perVideo = process.argv.includes('--per-video');
// Longest text one take may carry (eleven_v3 request limit); a longer segment
// is split at video boundaries into as few takes as possible.
const MAX_TAKE = 3000;
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));

async function loadEnv() {
  const env = {};
  try {
    const raw = await readFile(path.join(root, '.env'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq === -1) {
        if (t.startsWith('sk_')) env.ELEVENLABS_API_KEY = t;
        continue;
      }
      env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    }
  } catch {}
  return { ...env, ...process.env };
}

// Bundle the course (JSX) so its beats can be read in Node.
const tmp = path.join(root, 'node_modules', '.scene-audio');
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
globalThis.fetch ??= () => Promise.reject();
const realFetch = globalThis.fetch;
globalThis.fetch = (u, ...r) => (String(u).startsWith('/') ? Promise.reject(new Error('local')) : realFetch(u, ...r));
const { journey } = await import(pathToFileURL(bundle).href);
await rm(tmp, { recursive: true, force: true });

// Every line of the course (to drop stale clips), and the ones asked for: the
// given micro-topics, main path and practice videos alike (or everything).
const lines = new Map();
const want = new Map();
const videos = new Map(); // videoKey -> the spoken lines of a wanted video, in order
for (const st of journey.steps) for (const b of st.figureProps?.beats ?? []) {
  const text = beatText(b);
  if (!text) continue;
  lines.set(voiceKey(text), spoken(text));
  const topic = st.chapter?.split(' · ')[0];
  if ((!only.length || only.includes(topic)) && !(mainOnly && st.practice)) want.set(voiceKey(text), spoken(text));
}
for (const st of journey.steps) {
  const topic = st.chapter?.split(' · ')[0];
  const beats = st.figureProps?.beats ?? [];
  const said = beats.map(beatText).filter(Boolean).map(spoken);
  if (said.length && (!only.length || only.includes(topic)) && !(mainOnly && st.practice)) videos.set(videoKey(beats), said);
}
// Segment takes: per topic, per segment (Terms, Derivation, Big picture), per
// telling (the video's own script and each role version), the lines of all
// its videos in order.
const segTakes = new Map(); // "4.1 · 1/3 · tutor" -> [[lines of video 1], [lines of video 2], …]
for (const st of journey.steps) {
  const topic = st.chapter?.split(' · ')[0];
  const fp = st.figureProps;
  if (!fp?.beats?.length || !st.segment || st.practice || (only.length && !only.includes(topic))) continue;
  const locked = st.segment.startsWith('3/3');
  const native = locked ? 'lecturer' : fp.pov ?? (st.segment.startsWith('3/3') ? 'lecturer' : 'tutor');
  const tellings = [[native, fp.beats], ...(locked ? [] : Object.entries(fp.variants ?? {}).map(([r, va]) => [r, va.beats]).filter(([, b]) => b?.length))];
  for (const [role, beats] of tellings) {
    const said = beats.map(beatText).filter(Boolean).map(spoken);
    for (const t of said) lines.set(voiceKey(t), t);
    if (!said.length) continue;
    const k = `${topic} · ${st.segment.split(' · ')[0]} · ${role}`;
    if (!segTakes.has(k)) segTakes.set(k, []);
    segTakes.get(k).push(said);
  }
}
const chars = [...lines.values()].reduce((n, t) => n + t.length, 0);

await mkdir(outDir, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {}
const exists = (p) => access(p).then(() => true, () => false);

// Whole takes: one request per video, so the voice keeps one flow and tone.
// A video is skipped when every one of its lines already comes from a take.
const SEG = 'swe'; // manifest versions of clips cut from a segment take end with this
const isSeg = (v) => typeof v === 'string' && v.endsWith(SEG);
if (whole && !perVideo) {
  // Pack a segment's videos into takes of at most MAX_TAKE characters.
  const takesOf = (vids) => {
    const out = [[]];
    for (const said of vids) {
      const cur = out.at(-1);
      const len = [...cur, ...said].join(' ').length;
      if (cur.length && len > MAX_TAKE) out.push([...said]);
      else cur.push(...said);
    }
    return out;
  };
  const todo = [];
  for (const [k, vids] of segTakes) {
    const all = vids.flat();
    const done = await Promise.all(all.map(async (t) => isSeg(manifest[voiceKey(t)]) && (await exists(path.join(outDir, `${voiceKey(t)}.mp3`)))));
    if (redo || !done.every(Boolean)) todo.push([k, takesOf(vids)]);
  }
  const n = todo.reduce((c, [, takes]) => c + takes.reduce((m, t) => m + t.join(' ').length, 0), 0);
  console.log(`${only.length ? only.join(', ') : 'all topics'}: ${segTakes.size} segment tellings; ${todo.length} to record (${n} chars = credits):`);
  for (const [k, takes] of todo) console.log(`  ${k}: ${takes.reduce((m, t) => m + t.join(' ').length, 0)} chars${takes.length > 1 ? ` in ${takes.length} takes (over ${MAX_TAKE})` : ''}`);
  if (dry) process.exit(0);
  const env = await loadEnv();
  if (!env.ELEVENLABS_API_KEY) {
    console.error('No ELEVENLABS_API_KEY found in .env');
    process.exit(1);
  }
  const tag = 'v3ne' + (env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9').slice(0, 4) + 'r' + SEG;
  let made = 0;
  for (const [k, takes] of todo) {
    try {
      for (const said of takes) {
        const take = await synthTake(env, said.join(' '));
        await cutTake(take, said, said.map((t) => path.join(outDir, `${voiceKey(t)}.mp3`)));
        for (const t of said) manifest[voiceKey(t)] = tag;
        await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      }
      made++;
      console.log(`✓ ${k}`);
    } catch (err) {
      console.error(`✗ ${k}: ${err.message.slice(0, 200)}`);
      if (/quota|401/.test(err.message)) break;
    }
  }
  console.log(`\nRecorded ${made} of ${todo.length} segment tellings.`);
  process.exit(made === todo.length ? 0 : 1);
}
if (whole) {
  const todoV = [];
  for (const said of videos.values()) {
    const done = await Promise.all(said.map(async (t) => isWhole(manifest[voiceKey(t)]) && (await exists(path.join(outDir, `${voiceKey(t)}.mp3`)))));
    if (redo || !done.every(Boolean)) todoV.push(said);
  }
  const n = todoV.reduce((c, said) => c + said.join(' ').length, 0);
  console.log(`${only.length ? only.join(', ') : 'all topics'}: ${videos.size} videos; ${todoV.length} to record as whole takes (${n} chars = credits).`);
  if (dry) process.exit(0);
  const env = await loadEnv();
  if (!env.ELEVENLABS_API_KEY) {
    console.error('No ELEVENLABS_API_KEY found in .env');
    process.exit(1);
  }
  const tag = 'v3ne' + (env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9').slice(0, 4) + 'r';
  let made = 0;
  for (const said of todoV) {
    try {
      const take = await synthTake(env, said.join(' '));
      await cutTake(take, said, said.map((t) => path.join(outDir, `${voiceKey(t)}.mp3`)));
      for (const t of said) manifest[voiceKey(t)] = wholeTag(tag);
      await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      made++;
      console.log(`✓ ${said.length} lines, ${said.join(' ').length} chars: ${said[0].slice(0, 50)}`);
    } catch (err) {
      console.error(`✗ ${said[0].slice(0, 50)}: ${err.message.slice(0, 200)}`);
      if (/quota|401/.test(err.message)) break;
    }
  }
  console.log(`\nRecorded ${made} of ${todoV.length} videos.`);
  process.exit(made === todoV.length ? 0 : 1);
}

const todo = [];
const onDisk = new Set();
for (const [key, text] of want) {
  if (!redo && (await exists(path.join(outDir, `${key}.mp3`)))) onDisk.add(key);
  else todo.push([key, text]);
}
const todoChars = todo.reduce((n, [, t]) => n + t.length, 0);
console.log(`${only.length ? only.join(', ') : 'all topics'}: ${want.size} lines; ${todo.length} to record (${todoChars} chars = credits). Course total ${lines.size} lines (${chars} chars).`);
if (dry) process.exit(0);
if (evenOnly) {
  let n = 0;
  for (const key of onDisk) {
    if (isEven(manifest[key])) continue;
    const { pace, tempo } = await evenClip(path.join(outDir, `${key}.mp3`), want.get(key));
    manifest[key] = evenTag(manifest[key] ?? 'v3ne');
    n++;
    console.log(`≈ ${key} ${pace.toFixed(1)} ch/s × ${tempo.toFixed(2)}`);
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Evened ${n} clips.`);
  process.exit(0);
}

const env = await loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
const voiceId = env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9';
const modelId = env.ELEVENLABS_SCENE_MODEL_ID || 'eleven_multilingual_v2';
if (!apiKey) {
  console.error('No ELEVENLABS_API_KEY found in .env');
  process.exit(1);
}

async function synth(key, text, tries = 4) {
  // Devanagari lines use eleven_v3 in Nepali, as the Sparky narration does.
  const nepali = isNepali(text);
  const res = await realFetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_64`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text,
      model_id: nepali ? 'eleven_v3' : modelId,
      language_code: nepali ? 'ne' : 'en',
      voice_settings: VOICE,
    }),
  });
  if (res.status === 429 && tries > 1) {
    await new Promise((r) => setTimeout(r, 2000));
    return synth(key, text, tries - 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  await writeFile(path.join(outDir, `${key}.mp3`), Buffer.from(await res.arrayBuffer()));
}

// The 'r' marks the Robust delivery (stability 1.0), so browsers drop older takes.
// One continuous take with per-character timings, for --whole.
async function synthTake(env, text) {
  const id = env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9';
  const res = await realFetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: 'eleven_v3', language_code: 'ne', voice_settings: VOICE }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  const r = await res.json();
  return { audio: Buffer.from(r.audio_base64, 'base64'), align: r.alignment ?? r.normalized_alignment };
}

const tagFor = (text) => (isNepali(text) ? 'v3ne' : modelId.slice(7, 12)) + voiceId.slice(0, 4) + 'r';
// Clips already on disk (e.g. from an interrupted run) just need registering.
for (const key of onDisk) manifest[key] ??= tagFor(lines.get(key));

let made = 0;
let failed = 0;
const save = () => writeFile(manifestPath, JSON.stringify(manifest, null, 2));
// Two requests at a time: the plan's concurrency limit.
const queue = [...todo];
await Promise.all(
  Array.from({ length: 2 }, async () => {
    for (let job; (job = queue.shift()); ) {
      const [key, text] = job;
      try {
        await synth(key, text);
        await evenClip(path.join(outDir, `${key}.mp3`), text);
        manifest[key] = evenTag(tagFor(text));
        made++;
        console.log(`✓ ${key} ${text.slice(0, 60)}`);
        if (made % 20 === 0) await save();
      } catch (err) {
        failed++;
        console.error(`✗ ${key}: ${err.message.slice(0, 200)}`);
        if (/quota|401/.test(err.message)) queue.length = 0;
      }
    }
  }),
);

// Drop clips for lines that no longer exist.
for (const key of Object.keys(manifest)) if (!lines.has(key)) delete manifest[key];
for (const f of await readdir(outDir)) if (f.endsWith('.mp3') && !lines.has(f.slice(0, -4))) await unlink(path.join(outDir, f));
await save();
console.log(`\nRecorded ${made}, failed ${failed}, total ${lines.size}.`);
if (failed) process.exit(1);
