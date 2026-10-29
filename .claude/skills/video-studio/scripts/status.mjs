// Where each topic stands in the pipeline: lines recorded (whole take /
// line-by-line / missing), credits still needed, and MP4s rendered or stale.
// Reads files only: never spends credits.
//
//   node .claude/skills/video-studio/scripts/status.mjs [4.1 …] [--videos]
//
// --videos also lists every video with its own state.

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { loadCourse, root, topicsFrom, wanted } from './journey.mjs';

const args = process.argv.slice(2);
const topics = topicsFrom(args);
const perVideo = args.includes('--videos');
const { videos, voice } = await loadCourse();
const json = (p) => {
  try {
    return JSON.parse(readFileSync(path.join(root, p), 'utf8'));
  } catch {
    return {};
  }
};
const clips = json('public/audio/scene/manifest.json');
const mp4s = json('public/videos/manifest.json');

const rows = new Map();
for (const v of videos) {
  if (!v.topic || !wanted(v, topics)) continue;
  const r = rows.get(v.topic) ?? { videos: 0, practice: 0, lines: 0, whole: 0, chunked: 0, missing: 0, credits: 0, rendered: 0, stale: 0, unrendered: 0 };
  rows.set(v.topic, r);
  v.practice ? r.practice++ : r.videos++;
  const said = v.beats.map(voice.beatText).filter(Boolean);
  let vMissing = 0;
  let vWhole = 0;
  for (const t of said) {
    const k = voice.voiceKey(t);
    const tag = clips[k];
    r.lines++;
    if (!tag || !existsSync(path.join(root, 'public/audio/scene', `${k}.mp3`))) r.missing++, vMissing++;
    else if (tag.endsWith('we')) r.whole++, vWhole++;
    else r.chunked++;
  }
  // A whole take records the whole video again, so any missing line costs the video.
  const needs = vMissing || vWhole < said.length;
  if (needs) r.credits += said.map(voice.spoken).join(' ').length;
  let mp4 = '—';
  if (!v.practice) {
    const voiced = v.beats.map((b) => (clips[voice.voiceKey(voice.beatText(b))] ? 1 : 0)).join('');
    const m = mp4s[v.key];
    if (!m || !existsSync(path.join(root, 'public/videos', `${v.key}.mp4`))) (r.unrendered++, (mp4 = 'not rendered'));
    else if (m.voiced !== voiced) (r.stale++, (mp4 = 'stale (voice changed)'));
    else (r.rendered++, (mp4 = 'ok'));
  }
  if (perVideo)
    console.log(`${v.topic} ${v.practice ? 'practice' : `#${v.n}`.padEnd(8)} ${v.title.slice(0, 44).padEnd(44)} voice ${vWhole}/${said.length} whole${vMissing ? `, ${vMissing} missing` : ''} · mp4 ${mp4}`);
}

if (perVideo) console.log('');
console.log('topic  videos(+practice)  lines  whole  line-by-line  missing  credits-for-whole-takes  mp4 ok/stale/missing');
for (const [t, r] of [...rows].sort()) {
  console.log(
    `${t.padEnd(6)} ${`${r.videos} (+${r.practice})`.padEnd(18)} ${String(r.lines).padEnd(6)} ${String(r.whole).padEnd(6)} ${String(r.chunked).padEnd(13)} ${String(r.missing).padEnd(8)} ${String(r.credits).padEnd(24)} ${r.rendered}/${r.stale}/${r.unrendered}`,
  );
}
console.log('\nCredits = characters of every video that is not yet fully a whole take (1 credit per character). Confirm with `npm run audio:scenes -- <topic> --whole --dry` and ask the user before recording.');
