# Render and QA

## MP4 render

29. MP4 downloads are rendered offline frame by frame (`npm run render:videos -- 4.1 4.2`), never screen-recorded. Re-render after any change to a video's content, voice, the camera or the player look. The script re-renders automatically when the text or the recorded lines change; otherwise use `--force`.

How `scripts/render-videos.mjs` works:
1. It bundles the course and lists the main-path videos (practice videos have no MP4). Each MP4's key is the `videoKey`; the manifest stores which lines were voiced (`voiced` = "1101…").
2. It runs `vite build` and `vite preview` on port 4179 (never the dev server, so nothing is recorded).
3. It opens `/lesson/:n?render` in Chrome's headless shell with begin-frame control, and the page's virtual time moves exactly 1/30 s per frame. It crops to `.scene-screen` and scales to 720p with libx264 CRF 22.
4. The player logs each clip it played (`window.__render.voice`); ffmpeg lays those clips under the frames at the logged moments.
5. Videos removed from the course have their files deleted, and `public/videos/manifest.json` is rewritten.

Needs ffmpeg and `npx playwright install chromium-headless-shell` (installed: `~/.cache/ms-playwright/chromium_headless_shell-1234`), or `CHROME=/path`.
Render only after the voice for those videos is final; lines without a clip render silent.

If one video fails with ffmpeg `Cannot allocate memory` (error -12), memory ran short; the 3D video needs the most. A failed mux may leave a broken MP4 behind. Stop the extra preview servers, delete that video's `public/videos/<key>.mp4`, and run `npm run render:videos -- <topic>` without `--force`: only the missing one is rendered. Check every file with `ffprobe -show_entries format=duration:stream=duration`; the container and stream lengths must match.

## Browsers for checks

- Screenshots and frame strips: `~/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome` (frame-strip.mjs finds it; add `--enable-unsafe-swiftshader` for 3D, which the script already does).
- Always test a build: `npx vite build && npx vite preview --port 4182`. The dev server can record voice when `TTS_LIVE=1`.

## Frame strip

```bash
node .claude/skills/video-studio/scripts/frame-strip.mjs 6 --frames 10            # by screen number
node .claude/skills/video-studio/scripts/frame-strip.mjs "torque equation"        # by title words
node .claude/skills/video-studio/scripts/frame-strip.mjs 6 --width 390            # phone layout
```
It pauses the video, seeks to evenly spaced points, and screenshots `.scene-screen` after the motion settles. It ends with a pause test (two shots 1.5 s apart must be identical). **Open the PNGs with Read and look at them** before you report.

## The final checklist (per changed video)

- [ ] `lint.mjs <topic>` shows no new errors.
- [ ] `npx vite build` passes.
- [ ] The frame strip looks right: nothing cut off, the board above the caption, text big, labels clear, focus ring on the part being talked about.
- [ ] The pause test passes and there are no page errors.
- [ ] `anim-once.mjs <screen>` (and `--pov <role>` for each role version) reports 0 started twice, 0 cancelled (M16).
- [ ] Every number was recomputed by script; every wrong option is really wrong.
- [ ] IOE question text, year and count match `vault/`.
- [ ] The opener's hook count matches the Big-picture video's papers.
- [ ] `status.mjs <topic>` shows what voice and renders are still owed, and the user has the credit estimate.
- [ ] Rendered after the voice changed (`render:videos -- <topic>`), and the download works.
