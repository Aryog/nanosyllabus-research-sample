// Dev-server plugin: records a video line with ElevenLabs the first time it is
// played, then caches it in public/audio/scene/<key>.mp3 (+ manifest.json), so
// each line is paid for once. The API key stays on the server.
//
//   GET /api/tts/<key>.mp3   key = voiceKey(text) of a beat in the course
//
// Only lines that exist in the course can be recorded: the key is looked up in
// the course's beats, never taken as free text from the browser.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { loadEnv } from 'vite';
import { beatText, spoken, voiceKey } from '../src/video/voice.js';

export function sceneTts() {
  let server;
  let env;
  let outDir;
  const inflight = new Map();

  async function courseLines() {
    const { journey } = await server.ssrLoadModule('/src/content/journey.jsx');
    const lines = new Map();
    for (const st of journey.steps) for (const b of st.figureProps?.beats ?? []) {
      const text = beatText(b);
      if (text) lines.set(voiceKey(text), spoken(text));
    }
    return lines;
  }

  async function record(key, text) {
    const voiceId = env.ELEVENLABS_SCENE_VOICE_ID || 'cgSgspJ2msm6clMCkdW9';
    const modelId = env.ELEVENLABS_SCENE_MODEL_ID || 'eleven_multilingual_v2';
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: 'POST',
      headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
      body: JSON.stringify({
        text,
        model_id: modelId,
        language_code: 'en',
        voice_settings: { stability: 0.5, similarity_boost: 0.8, use_speaker_boost: true },
      }),
    });
    if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const mp3 = Buffer.from(await res.arrayBuffer());
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, `${key}.mp3`), mp3);
    const manifestPath = path.join(outDir, 'manifest.json');
    let manifest = {};
    try {
      manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    } catch {}
    manifest[key] = modelId.slice(7, 12) + voiceId.slice(0, 4);
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`[tts] recorded ${key} (${text.length} chars): ${text.slice(0, 60)}`);
    return mp3;
  }

  return {
    name: 'scene-tts',
    apply: 'serve',
    configResolved(config) {
      env = loadEnv(config.mode, config.root, '');
      outDir = path.join(config.publicDir, 'audio', 'scene');
    },
    configureServer(s) {
      server = s;
      s.middlewares.use('/api/tts', async (req, res) => {
        const key = /^\/([0-9a-f]{8})\.mp3$/.exec(req.url ?? '')?.[1];
        const send = (code, body, type = 'text/plain') => {
          res.statusCode = code;
          res.setHeader('Content-Type', type);
          res.end(body);
        };
        if (!key) return send(400, 'bad key');
        const file = path.join(outDir, `${key}.mp3`);
        try {
          if (await access(file).then(() => true, () => false)) return send(200, await readFile(file), 'audio/mpeg');
          if (!env.ELEVENLABS_API_KEY) return send(503, 'no ELEVENLABS_API_KEY in .env');
          const text = (await courseLines()).get(key);
          if (!text) return send(404, 'not a course line');
          if (!inflight.has(key)) inflight.set(key, record(key, text).finally(() => inflight.delete(key)));
          send(200, await inflight.get(key), 'audio/mpeg');
        } catch (err) {
          console.error(`[tts] ${key}: ${err.message}`);
          send(502, err.message);
        }
      });
    },
  };
}
