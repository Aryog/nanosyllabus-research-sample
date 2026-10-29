// Cuts one continuous take of a whole video into its line clips, so the
// voice keeps a single flow and tone across the video while the player still
// gets a clip per beat (and can wait on a question between them).
// Each cut sits in the middle of the pause between two lines, found from the
// per-character timings ElevenLabs returns with the take. Loudness is set once
// for the whole take; pace is left as read, so the take stays one performance.
//
//   await cutTake({ audio, align }, lines, files)

import { execFile } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const TAG = 'we'; // manifest versions of clips cut from a whole take end with this (still "evened")

export const isWhole = (version) => typeof version === 'string' && version.endsWith(TAG);
export const wholeTag = (version) => (isWhole(version) ? version : `${version}${TAG}`);

export async function cutTake({ audio, align }, lines, files) {
  const text = lines.join(' ');
  if (align.characters.length !== text.length) throw new Error(`timings cover ${align.characters.length} of ${text.length} chars`);
  const starts = align.character_start_times_seconds;
  const ends = align.character_end_times_seconds;
  const cuts = [0];
  let off = 0;
  for (const line of lines.slice(0, -1)) {
    off += line.length; // the space that joins this line to the next
    cuts.push((ends[off - 1] + starts[off + 1]) / 2);
    off += 1;
  }
  const dir = await mkdtemp(path.join(tmpdir(), 'take-'));
  try {
    const raw = path.join(dir, 'raw.mp3');
    const wav = path.join(dir, 'take.wav');
    await writeFile(raw, audio);
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '44100', '-ac', '1', wav]);
    for (let i = 0; i < lines.length; i++) {
      const span = i + 1 < lines.length ? ['-to', String(cuts[i + 1])] : [];
      const filters = [
        // Trim the pause at both ends, then put back the same short one.
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05',
        'areverse',
        'silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1',
        'areverse',
        'adelay=120:all=1',
        'apad=pad_dur=0.25',
      ];
      await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-ss', String(cuts[i]), ...span, '-af', filters.join(','), '-b:a', '96k', files[i]]);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
