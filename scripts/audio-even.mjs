// Makes every recorded voice clip sound the same: the same speaking pace
// (characters of spoken text per second of speech), the same loudness, and
// the same short silence at each end. ElevenLabs reads some lines faster
// than others; this evens them out with ffmpeg (pitch is kept).
//
//   await evenClip(file, spokenText)   // rewrites the mp3 in place

import { execFile } from 'node:child_process';
import { rename } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);
export const PACE = 14; // target characters per second of speech
const STRETCH = [0.85, 1.2]; // never change the pace more than this
const TAG = 'e'; // manifest versions of evened clips end with this

export const isEven = (version) => typeof version === 'string' && version.endsWith(TAG);
export const evenTag = (version) => (isEven(version) ? version : `${version}${TAG}`);

// Seconds of the clip that are speech (not silence).
async function speechSecs(file) {
  const { stderr } = await run('ffmpeg', ['-hide_banner', '-i', file, '-af', 'silencedetect=n=-40dB:d=0.25', '-f', 'null', '-'], { maxBuffer: 1 << 24 });
  const total = +(/Duration: (\d+):(\d+):([\d.]+)/.exec(stderr) ?? []).slice(1).reduce((s, v, i) => s + v * [3600, 60, 1][i], 0);
  const quiet = [...stderr.matchAll(/silence_duration: ([\d.]+)/g)].reduce((s, m) => s + +m[1], 0);
  return Math.max(0.3, total - quiet);
}

export async function evenClip(file, text) {
  const pace = text.length / (await speechSecs(file));
  const tempo = Math.min(STRETCH[1], Math.max(STRETCH[0], PACE / pace));
  const filters = [
    // Trim silence at both ends, then put back the same short pause.
    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05',
    'areverse',
    'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05',
    'areverse',
    ...(Math.abs(tempo - 1) > 0.02 ? [`atempo=${tempo.toFixed(3)}`] : []),
    'loudnorm=I=-16:TP=-1.5:LRA=11',
    'adelay=120:all=1',
    'apad=pad_dur=0.15',
  ];
  const tmp = file.replace(/\.mp3$/, '.even.mp3');
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, '-af', filters.join(','), '-ar', '44100', '-ac', '1', '-b:a', '64k', tmp]);
  await rename(tmp, file);
  return { pace, tempo };
}
