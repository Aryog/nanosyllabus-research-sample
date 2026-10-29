# Visuals: drawings, parts, doodles, graphs, board

## The drawing contract

`draw: (s) => <>…svg…</>` is drawn inside `viewBox` (default `0 0 360 220`). It receives the scene helper `s`:

| Helper | Gives | Use |
|---|---|---|
| `s.on(k)` | class `sc` + `on` from beat k (+ `now` on beat k) | a part arrives on beat k and stays |
| `s.on(k, j)` | visible only on beats k…j | one picture per beat (`s.on(k, k)`), swapped pictures |
| `s.hl(k)` | `' hl'` on beat k | the beat talks about an existing part: ring + hand |
| `s.beat` | current beat index | conditional details |

Put the class on a `<g>`: `<g className={s.on(2)}>…</g>`. Every part a line talks about must carry `s.on` or `s.hl` (rule 18).

## Palette (`C` in kit.jsx; whiteboard marker inks)

`chalk #1f2328` main ink · `dim #6b7280` labels · `faint #d0d4da` guides · `yellow #e8590c` emphasis · `orange #d9480f` current / copper · `blue #1c7ed6` field, south · `red #e03131` north, traps · `green #2b8a3e` force, answers · `violet #7048e8` questions, ideas · `board #fffef9`.
North is always red and south always blue. Current is orange, force green and field blue, in 2D and 3D alike.

## Shared parts (kit.jsx); use these, don't redraw them

`Arrow({x1,y1,x2,y2,color,w,head,className:'draw',dash})` · `Shadow({cx,cy,rx,ry})` soft ground shadow · `Pole({x,y,w,h,label,color})` shaded magnet pole · `Conductor({x,y,r,dir:'in'|'out',color})` ⊗/⊙ · `Rotor({x,y,r,className})` shaded armature · `Resistor`, `Coil`, `Source`, `Armature` for circuits · `Axes({x,y,w,h,xLabel,yLabel})` for graphs.

## Doodles (doodles.jsx), for segment 1

`Face` (moods) · `Ask` (?) · `Note` (handwritten label) · `Phone` · `Fan` (spins) · `MagnetWire({push,current,seq})` · `Treadmill` · `Lift` · `Paper({stampAt})` (IOE paper with stamp) · `Car` · `Dial` · `Crane` · `Battery` · `MysteryGraph` · `Meter({from,to,at})`.
Add a new doodle here when segment 1 needs an everyday object: thick round strokes, few parts, a face if it's the motor.

## House rules: look

16. Board text is big and scales with the video's width. Every line kind's size is a multiple of `--bs` (`.scene-cam`, `clamp(17px, 2cqw, 36px)`; smaller beside a drawing). Never give a line kind a fixed px size. The camera frames the board above the caption, never behind it.
19. Every graph and picture is captioned. It has a title that says what it shows ("Shunt: torque vs armature current"), axes named in full with the symbol ("Armature current Ia", "Speed N"), and every curve named in words ("Tsh (shaft torque)"). Labels sit in open space, never on a line or across an axis. Each step gets a board line saying what the graph shows and why ("Graph: φ constant, so Ta ∝ Ia → origin bata sidha line"). A drawing beside notes, or a two-column board, is shown whole (no zoom).
20. Drawings look solid (2.5D): use the shaded kit parts (`Pole`, `Conductor`, `Rotor`, `Shadow` in `kit.jsx`), with gradients and soft ground shadows, never SVG filters. New objects follow the same lighting (from the top left).

(Rule 7, doodles in segment 1, is in scripting.md. Rule 21, 3D, is in animation.md.)

## Layout checks

- Keep labels at 10–14 viewBox units and clear of strokes; `Note` has `anchor` for left and right alignment.
- Nothing may sit outside the viewBox; the camera never crops (rule 15).
- On wide screens the board sits beside the drawing (`split`), and long derivations flow into two columns. Check both a 1280 px and a phone-width frame (`frame-strip.mjs --width 390`).
- At most one emoji per board (rule 2).
