// Loads the whole subject in Node (bundles src/content/units/index.jsx: every
// unit's journey) and lists its videos. Shared by the other video-studio scripts.
//
//   const { videos, voice, journey, units } = await loadCourse();
//   videos: [{ n, slug, topic, title, practice, step, beats, board, key }]
//   n = /electrical-machines/<slug>/lesson/:n (main path only); `journey.steps`
//   holds every unit's steps (topic numbers such as 2.3 are unique).

import { mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

export const root = process.cwd();

export async function loadCourse() {
  const tmp = path.join(root, 'node_modules', '.video-studio');
  await mkdir(tmp, { recursive: true });
  const out = path.join(tmp, `journey-${process.pid}.mjs`);
  await build({
    entryPoints: [path.join(root, 'src/content/units/index.jsx')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    jsx: 'automatic',
    external: ['react', 'react-dom'],
    define: { 'import.meta.env.BASE_URL': '"/"' },
    outfile: out,
    logLevel: 'error',
  });
  globalThis.window = globalThis;
  globalThis.localStorage = { getItem: () => null };
  globalThis.fetch = () => Promise.reject(new Error('offline'));
  const { units } = await import(pathToFileURL(out).href);
  const voice = await import(pathToFileURL(path.join(root, 'src/video/voice.js')).href);
  await rm(tmp, { recursive: true, force: true });

  // Screen numbers count main-path steps per unit, as the router and render-videos.mjs do.
  const journey = { steps: units.flatMap((u) => u.journey.steps) };
  const videos = units.flatMap((u) => {
   const main = u.journey.steps.filter((st) => !st.practice && !st.retryOf);
   return u.journey.steps
    .filter((st) => st.figureProps?.beats?.length)
    .map((st) => ({
      n: st.practice ? null : main.indexOf(st),
      slug: u.slug,
      topic: st.chapter?.split(' · ')[0] ?? '',
      title: st.title ?? '(untitled)',
      practice: !!st.practice,
      step: st,
      beats: st.figureProps.beats,
      board: st.figureProps.board ?? [],
      key: voice.videoKey(st.figureProps.beats),
    }))
    // POV variants (src/content/pov.js) are checked like videos of their own.
    .flatMap((v) => [
      v,
      ...Object.entries(v.step.figureProps.variants ?? {}).map(([pov, va]) => ({
        ...v,
        n: null,
        pov,
        title: `${v.title} [${pov}]`,
        beats: va.beats ?? v.beats,
        board: va.board ?? v.board,
        key: voice.videoKey(va.beats ?? v.beats),
      })),
    ]);
  });
  return { journey, videos, voice, units };
}

// Topic filter from argv: `4.1 4.2` (none = every topic).
export const topicsFrom = (argv) => argv.filter((a) => !a.startsWith('--'));
export const wanted = (v, topics) => !topics.length || topics.includes(v.topic);

// The player's address of a main-path screen.
export const lessonUrl = (base, slug, n) => `${base}electrical-machines/${slug}/lesson/${n}`;
