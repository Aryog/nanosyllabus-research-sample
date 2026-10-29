# Animation: clock, cues, camera, focus, 3D

Good motion here means: the eye always knows where to look, every movement
explains something, and nothing moves on wall time.

## The scene clock

`Scene.jsx` runs one clock: `within` is the ms into the current beat. CSS
animations are paused and seek-synced by the player; board handwriting, the
hand, the camera and Stage3D all read the same clock. The offline renderer
steps the page's virtual time, so anything on this clock renders exactly as
it plays.

## CSS motion classes (styles.css)

| Class | Effect |
|---|---|
| `sc on` (from `s.on(k)`) | the part fades in; with `now` it plays the `scin` entrance after `var(--d)` + 150 ms |
| `seq` (child of an `s.on(k)` group) | its own staggered entrance at `--d` |
| `pop` (with `sc on now` or `seq`) | scale-in with a little overshoot (`scpop`) |
| `draw` (+ `pathLength={1}`) | the stroke draws itself (1 s) |
| `hl` (from `s.hl(k)`) | the pulsing yellow focus ring |
| `spin-up` | spin up from rest: one ease-in turn (`--ramp`), then steady (`--per`) |
| `flowdash`, `flow-ccw`/`flow-cw` | dashes flowing along a path |
| `fade` | dims a part to 0.3: don't use it (M7) |

Cue a part to its word: `<g className="seq pop" style={{ '--d': '1200ms' }}>`.

## Cue timing math

Clips run about 14 characters of spoken text per second, plus a 120 ms lead.
A word's moment in its beat ≈ 120 ms + (characters before the word in the
Devanagari `voice`) ÷ 14 × 1000 ms. Check against the real clip with
`ffprobe` when it matters. Whole takes keep the natural pace, so allow ±15%.

## Motion rules (rigid)

M1. **One clock.** All motion follows the scene clock: CSS animations (paused and seek-synced by the player), `within`, or Stage3D's `ms`/`dt`. Never use `setInterval`, `Date.now()` or wall-time loops. Pause must freeze it, a seek must land on it, and the MP4 render must match it.
M2. **Motion explains.** Each beat moves only what its line talks about: it comes in (`s.on(k)`) or is highlighted (`s.hl(k)`), and the focus ring and hand go to it. Background parts stay still and fully visible.
M3. **Sequence, don't dump.** Parts a line names in order arrive in that order (stagger by beat, or by `animation-delay` inside a beat, roughly 150–300 ms apart). Never more than one new idea moves at once.
M4. **Readable timing.** Entrances take 300–600 ms with ease-out; camera moves take about 0.9 s with ease-in-out; nothing is faster than 150 ms except tiny loops. A beat's key motion finishes before its line ends.
M5. **Physics-true.** Directions follow the physics: current into the screen ⊗ / out ⊙, Fleming forces, counter-clockwise torque, field N → S, current flipping at the neutral zone. Check every arrow against the line.
M6. **Loops are small and meaningful.** Idle loops (spinning fan, flowing current dots, field dots) appear only where they show the idea; they never pull focus from the beat's part.
M7. **Never fade the drawing to show focus.** Focus is the ring and the hand, never dimming. No SVG `filter` (it renders ghost copies under the camera zoom). Prefer gradients for depth.
M8. **Camera stays calm.** At most 10% zoom past the full board, no cut-off parts, the board always above the caption; a drawing beside notes is shown whole.
M9. **3D when turning explains.** Use Stage3D for ideas that need rotation or depth: one camera shot per beat, a smooth glide, drag to look around.
M10. **CSS transforms on SVG.** An element that has its own `transform` attribute must not get a CSS `transform` (it would replace it). Wrap it in a `<g>` and animate the wrapper (`transform-box: fill-box; transform-origin: center`).
M11. **Cue to the word.** Inside a beat, stagger parts to roughly when the voice names them (cue math above). In 2D, give the part `style={{ '--d': '<ms>ms' }}` and either its own `s.on(k)` or class `seq` inside an `s.on(k)` group (`seq pop` adds a small scale-in). In 3D, use a `CUE` table of ms per part in the build module.
M12. **Entrances are animations, exits are quick.** `.sc.on.now` parts come in with a CSS animation (so beat 0 and replays animate too). A part leaving (`s.on(k, j)`) fades out in 0.25 s, so two pictures in the same spot never overlap.
M13. **Numbers and meters move together.** A meter that changes in a beat moves at its cue, and its number swaps at the same moment (old fades out, new fades in). Quantities tied by an equation (Ia = (V − Eb)/Ra) move within ~400 ms of each other.
M14. **Turning starts from rest and never jumps.** A wheel spins up with one ease-in turn and then steady turns (`.spin-up`, `--ramp` = 2 × `--per`). To go faster later, nest a second `.spin-up` inside rather than changing the first one's duration. Spin only the moving part (dots on the rotor), never brushes or labels. In 3D, ease the speed toward the beat's target.
M15. **Show the step the line says happens.** Cancellations in a derivation are drawn as red `\cancel{}` strikes after the line is written. A flip (current reversing at the neutral zone) flashes the conductor when it crosses. Flowing dashes run the way the quantity flows, and faster for more current; the `flow` keyframe moves dashes toward the path's start, so draw the path from where the quantity goes to where it comes from.

## House rules: camera and focus (player side)

15. Camera zoom is at most 10% past the full-board view (`ZOOM_IN = 1.1` in `Scene.jsx`); the drawing must never be cut off.
17. Pause freezes everything (voice, handwriting, hand, CSS animations), and seeking lands on the exact moment; all of it runs on the scene clock `within`.
18. Focus follows the voice, and the drawing always stays fully visible (never dim or fade parts). The part a beat brings in (`s.on(k)`) or highlights (`s.hl(k)`) gets the pulsing yellow focus ring and the pointing hand, so every beat that talks about a part of the drawing must mark it with `s.on(k)` or `s.hl(k)`.
21. Where turning the object makes the idea click (the motor turning, current along conductors, force directions), use a real 3D picture: a video's `three: build` prop (`src/video/Stage3D.jsx`, three.js, loaded lazily) with a build module like `src/content/video/motor3d.js`. It keeps the 2D video's beats (so the voice is reused), one camera shot per beat, everything driven by the scene clock (`ms`, `dt`, never wall time), and drag to look around. Keep the flat version in `extras`.

## The 3D build contract

```js
export function buildX(THREE, scene) {
  // make meshes once (colours from the palette: north red, south blue, copper, force green)
  return ({ beat, ms, dt, camera }) => {
    // ms = time into the beat (scene clock), dt = since last frame (0 when paused)
    // glide camera toward SHOTS[beat] over ~1 s; show parts when ms >= CUE.part
  };
}
```
Follow `motor3d.js`: a header comment listing what each beat shows, `SHOTS` per beat, `AIM`, `MOVE` ms, `CUE` ms per part, and speeds in rad per ms of clock. Frame strips of 3D need `--enable-unsafe-swiftshader` (frame-strip.mjs passes it).

## Motion review loop (every motion task)

1. Pick the videos (default: the topic being worked on). Read each video's beats and `draw`.
2. For each beat, write down: what the line says → what should move → what moves now. Fix gaps against the rules.
3. Build and preview (never the dev server), then run `frame-strip.mjs` before and after. Its pause test must pass.
4. Never change `say`/`voice` during a motion pass (that costs credits). Board lines, drawings and CSS are free.
5. Re-render affected MP4s (`npm run render:videos -- <topic> --force`) if they are voiced.
