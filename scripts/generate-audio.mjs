// Pre-generates Sparky's voice lines with ElevenLabs so the API key never
// reaches the browser. Only lines whose text/voice changed are re-requested.
//
//   npm run audio
//
// Key is read from .env as ELEVENLABS_API_KEY=sk_... (a bare sk_... line also works).
// Optional: ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL_ID, ELEVENLABS_LANGUAGE.
// Lines are Nepali: the Devanagari `speech` text is sent, eleven_v3 with language_code "ne".

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { narration, speech } from '../src/content/narration.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'audio');
const manifestPath = path.join(outDir, 'manifest.json');

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

const env = await loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
// "Jessica" — a bright premade voice; checked with speech-to-text that its Nepali transcribes cleanly.
const voiceId = env.ELEVENLABS_VOICE_ID || 'cgSgspJ2msm6clMCkdW9';
const modelId = env.ELEVENLABS_MODEL_ID || 'eleven_v3';
const language = env.ELEVENLABS_LANGUAGE || 'ne';

if (!apiKey) {
  console.error('No ELEVENLABS_API_KEY found in .env');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });
let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {}

const exists = (p) => access(p).then(() => true, () => false);
const hashOf = (text) =>
  createHash('sha1').update(`${voiceId}|${modelId}|${language}|${text}`).digest('hex').slice(0, 10);

async function synth(id, text) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({
        text,
        model_id: modelId,
        language_code: language,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true },
      }),
    },
  );
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  await writeFile(path.join(outDir, `${id}.mp3`), Buffer.from(await res.arrayBuffer()));
}

const entries = Object.keys(narration).map((id) => [id, speech[id] ?? narration[id]]);
let made = 0;
let failed = 0;
for (const [id, text] of entries) {
  const hash = hashOf(text);
  if (manifest[id] === hash && (await exists(path.join(outDir, `${id}.mp3`)))) continue;
  try {
    await synth(id, text);
    manifest[id] = hash;
    made++;
    console.log(`✓ ${id}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${id}: ${err.message}`);
  }
}

// Drop lines that no longer exist.
for (const id of Object.keys(manifest)) if (!(id in narration)) delete manifest[id];
await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nGenerated ${made}, failed ${failed}, total ${entries.length}.`);
if (failed) process.exit(1);
