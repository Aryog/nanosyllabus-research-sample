// Pre-records the video scenes' captions with ElevenLabs into
// public/audio/scene/<key>.mp3 (key = voiceKey of the spoken text). Only new or
// edited lines are requested; clips for removed lines are deleted.
//
//   npm run audio:scenes            record missing lines
//   npm run audio:scenes -- --dry   just count lines and characters
//
// Key is read from .env as ELEVENLABS_API_KEY=sk_... (a bare sk_... line also works).
// Optional: ELEVENLABS_SCENE_VOICE_ID, ELEVENLABS_SCENE_MODEL_ID.

import { readFile, writeFile, mkdir, access, readdir, unlink, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { beatText, isNepali, spoken, voiceKey } from '../src/video/voice.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'audio', 'scene');
const manifestPath = path.join(outDir, 'manifest.json');
const dry = process.argv.includes('--dry');

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

const lines = new Map();
for (const st of journey.steps) for (const b of st.figureProps?.beats ?? []) {
  const text = beatText(b);
  if (text) lines.set(voiceKey(text), spoken(text));
}
const chars = [...lines.values()].reduce((n, t) => n + t.length, 0);

await mkdir(outDir, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {}
const exists = (p) => access(p).then(() => true, () => false);
const todo = [];
for (const [key, text] of lines) if (!manifest[key] || !(await exists(path.join(outDir, `${key}.mp3`)))) todo.push([key, text]);
const todoChars = todo.reduce((n, [, t]) => n + t.length, 0);
console.log(`${lines.size} lines (${chars} chars); ${todo.length} to record (${todoChars} chars).`);
if (dry) process.exit(0);

const env = await loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
const voiceId = env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9';
const modelId = env.ELEVENLABS_SCENE_MODEL_ID || 'eleven_multilingual_v2';
if (!apiKey) {
  console.error('No ELEVENLABS_API_KEY found in .env');
  process.exit(1);
}

async function synth(key, text) {
  // Devanagari lines use eleven_v3 in Nepali, as the Sparky narration does.
  const nepali = isNepali(text);
  const res = await realFetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
    body: JSON.stringify({
      text,
      model_id: nepali ? 'eleven_v3' : modelId,
      language_code: nepali ? 'ne' : 'en',
      voice_settings: { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true },
    }),
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  await writeFile(path.join(outDir, `${key}.mp3`), Buffer.from(await res.arrayBuffer()));
}

let made = 0;
let failed = 0;
const save = () => writeFile(manifestPath, JSON.stringify(manifest, null, 2));
// A few requests at a time.
const queue = [...todo];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    for (let job; (job = queue.shift()); ) {
      const [key, text] = job;
      try {
        await synth(key, text);
        manifest[key] = (nepali ? 'v3ne' : modelId.slice(7, 12)) + voiceId.slice(0, 4);
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
