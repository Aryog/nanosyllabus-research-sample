// Loads the course in Node (bundles src/content/journey.jsx like the repo's
// own scripts do) and lists its videos. Shared by the other video-studio scripts.
//
//   const { videos, voice } = await loadCourse();
//   videos: [{ n, topic, title, practice, step, beats, board, key }]   n = /lesson/:n (main path only)

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
    entryPoints: [path.join(root, 'src/content/journey.jsx')],
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
  const { journey } = await import(pathToFileURL(out).href);
  const voice = await import(pathToFileURL(path.join(root, 'src/video/voice.js')).href);
  await rm(tmp, { recursive: true, force: true });

  // Screen numbers count main-path steps, as the router and render-videos.mjs do.
  const main = journey.steps.filter((st) => !st.practice && !st.retryOf);
  const videos = journey.steps
    .filter((st) => st.figureProps?.beats?.length)
    .map((st) => ({
      n: st.practice ? null : main.indexOf(st),
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
  return { journey, videos, voice };
}

// Topic filter from argv: `4.1 4.2` (none = every topic).
export const topicsFrom = (argv) => argv.filter((a) => !a.startsWith('--'));
export const wanted = (v, topics) => !topics.length || topics.includes(v.topic);
