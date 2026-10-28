---
name: animation-studio
description: Rulebook and review loop for the motion in the DC Motors videos (drawing entrances, camera, focus ring, hand, 3D scenes, doodle life). Use whenever asked to improve, review or add animation, and keep this file updated with every rule the user sets.
---

# Animation studio

The videos are whiteboard explainers driven by one clock (`within` in
`src/video/Scene.jsx`). Good motion here means: the eye always knows where to
look, every movement explains something, and nothing moves on wall time. This
file is the motion rulebook; `.claude/skills/lesson-studio/SKILL.md` stays the
course rulebook and wins on content. **Every animation task ends by updating
this file (see "Keep this skill alive").**

## Where motion lives

| What | File |
|---|---|
| Scene clock, camera shots, focus ring, hand, writing | `src/video/Scene.jsx` |
| CSS motion (`.sc` entrances, markers, doodle loops, focus ring) | `src/styles.css` |
| 2D drawings per video (`draw: (s) => …`, `s.on(k)`, `s.hl(k)`) | `src/content/video/*.jsx` |
| Shared shaded parts and doodles | `src/content/video/kit.jsx`, `src/content/video/doodles.jsx` |
| 3D stage and scenes | `src/video/Stage3D.jsx`, `src/content/video/motor3d.js` |
| MP4 render (frame by frame on the same clock) | `scripts/render-videos.mjs` |

## Motion rules (rigid)

1. **One clock.** All motion follows the scene clock: CSS animations (paused and seek-synced by the player), `within`, or Stage3D's `ms`/`dt`. Never `setInterval`, `Date.now()` or wall-time loops. Pause must freeze it, seek must land on it, and the MP4 render must match it.
2. **Motion explains.** Each beat moves only what its line talks about: it comes in (`s.on(k)`) or is highlighted (`s.hl(k)`), and the focus ring and hand go to it. Background parts stay still and fully visible.
3. **Sequence, don't dump.** Parts a line names in order arrive in that order (stagger by beat, or by `animation-delay` inside a beat, roughly 150–300 ms apart). Never more than one new idea moving at once.
4. **Readable timing.** Entrances 300–600 ms, ease-out; camera moves about 0.9 s, ease-in-out; nothing faster than 150 ms except tiny loops. A beat's key motion finishes before its line ends.
5. **Physics-true.** Directions follow the physics: current into the screen ⊗ / out ⊙, Fleming forces, counter-clockwise torque, field N → S, current flipping at the neutral zone. Check every arrow against the line.
6. **Loops are small and meaningful.** Idle loops (spinning fan, flowing current dots, field dots) only where they show the idea; they never pull focus from the beat's part.
7. **Never fade the drawing to show focus.** Focus is the ring and the hand; never dimming. No SVG `filter` (renders ghost copies under the camera zoom). Prefer gradients for depth (lesson-studio rules on 2.5D look).
8. **Camera stays calm.** At most 10% zoom past the full board, no cut-off parts, the board always above the caption; a drawing beside notes is shown whole.
9. **3D when turning explains.** Use Stage3D for ideas that need rotation or depth; one camera shot per beat, smooth glide, drag to look around.
10. **CSS transforms on SVG:** an element that has its own `transform` attribute must not get a CSS `transform` (it would replace it); wrap it in a `<g>` and animate the wrapper (`transform-box: fill-box; transform-origin: center`).
11. **Cue to the word.** Inside a beat, stagger parts to roughly when the voice names them: clips are evened to about 14 characters a second, so a word's time ≈ its position in the Devanagari line ÷ its length × the clip length. 2D: give the part `style={{ '--d': '<ms>ms' }}` and either its own `s.on(k)` or class `seq` inside an `s.on(k)` group (`seq pop` adds a small scale-in). 3D: a `CUE` table of ms per part in the build module.
12. **Entrances are animations, exits are quick.** `.sc.on.now` parts come in with a CSS animation (so beat 0 and replays animate too); a part leaving (`s.on(k, j)`) fades in 0.25 s, so two pictures in the same spot never overlap.
13. **Numbers and meters move together.** A meter that changes in a beat moves at its cue, and its number swaps at the same moment (old fades out, new fades in); quantities tied by an equation (Ia = (V − Eb)/Ra) move within ~400 ms of each other.
14. **Turning starts from rest and never jumps.** A wheel spins up with one ease-in turn then steady turns (`.spin-up`, `--ramp` = 2 × `--per`); to go faster later, nest a second `.spin-up` inside rather than changing the first's duration. Spin only the moving part (dots on the rotor), never brushes or labels. In 3D, ease the speed toward the beat's target.
15. **Show the step the line says happens.** Cancellations in a derivation are drawn as red `\cancel{}` strikes after the line is written; a flip (current reversing at the neutral zone) flashes the conductor when it crosses; flowing dashes run the way the quantity flows (the `flow` keyframe moves dashes toward the path's start, so draw the path from where it goes to where it comes from) and faster for more current.

## Review loop (do it every time)

1. Pick the videos (default: the topic being worked on, e.g. 4.1). Read each video's beats and `draw`.
2. For each beat, write down: what the line says → what should move → what moves now. Fix gaps against the rules.
3. Build (`npx vite build`) and serve the build (`npx vite preview --port 4182`), never the dev server for voice.
4. Frame-strip check: drive the page headlessly (Playwright, `~/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome`, add `--enable-unsafe-swiftshader` for 3D), seek into each beat, screenshot early / middle / end of the beat, and look at the strip. Also pause mid-motion and check nothing keeps moving.
5. Fix, re-check, then update this file and report what changed per video with the strips.

## Keep this skill alive

Every time the user corrects or praises motion: add or replace a numbered rule above (short, absolute, testable), and add a dated changelog line. Replace contradicted rules instead of stacking them.

## Changelog

- 2026-10-28: Created. Rules from the course so far: one clock, focus ring instead of dimming, 10% camera, 2.5D look without filters, 3D for turning ideas.
- 2026-10-28: 4.1 main-path pass. New rules 11–15: cue parts to the word (`--d`, `seq`, `seq pop`, 3D `CUE`), entrances as animations with quick exits, meters and numbers move together, spin-up from rest without jumps, show cancels/flips/flow direction. Doodle MagnetWire fixed to push down for ⊗ under N → S.
