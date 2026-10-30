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

30. **Looks come from the POV.** Five looks live in `src/video/looks.js` + `styles.css`: `blue` (Engineer: brand-blue field, white ink), `navy` (Tutor: deep-navy handwritten board, class `look-blue look-navy`), `clean` (Senior: off-white page, Inter, palette inks), `book` (Lecturer: white page, serif, thin rules) and `board` (the old whiteboard). The POV selector at the top right (pref `dcm-pov`, `Auto` = segment's POV) picks the role and so the look (SKILL.md "POVs"). Drawings keep using the palette `C`: a look repaints those exact hex inks by CSS, so never hard-code another hex for a palette role. Colour transitions are not frozen by the player clock (frozen, they left text in the old look's colour).
35. **Big-picture figures are bookish.** Model-answer figures are drawn like a textbook figure: thin black outlines (`stroke` 0.8–1.6), plain ⊗/⊙ conductors, small filled arrowheads, labels on leader lines (a dot at the part, a thin line to the label), and a numbered italic caption (`Fig. 1  …`) that the tip can cite. No gradients, kit 2.5D parts, doodles, emoji or colour fills; parts still arrive on the point that names them (`s.on(k)`), and labels never overlap one another or a stroke. Helpers `cond`, `head`, `leader` live in `src/content/video/picture.jsx`.

45. **Nothing is ever cut or covered.** At every beat, in every role (the Lecturer in both themes) and at 1280×760, 1440×860, 1024×700 and 390×844, no written line or label is cut by the frame, sits under the caption or the POV chip, overlaps another, or spills out of its column; `fit-check.mjs <topic>` must report 0. Board lines are never height-capped once written; maths wider than its line is scaled to fit; the POV chip has its own strip above the picture. On phones (stacked drawing and board) what is in focus must be fully in frame; the rest may slide off as the camera follows the beat.
39. **Clean board.** No writing hand on screen (the line writes itself; the focus ring marks the drawing part). One font per board: in every look but Book the maths uses the board font (Inter for Engineer and Senior, the hand font for Tutor); only the Lecturer's Book look keeps KaTeX serif. The highlighter works like a pen on an iPad: a soft yellow stroke paints behind each row of the line just written, holds about a second, then fades away completely, so no line keeps a mark. It is used only on lines that matter (`eq`, `answer`, `trap`, `find`), never on every line, and never as an underline. Colour and strength per look: `--mark`, `--mark-a` (multiplied on light pages, softer on the blue boards). Figure labels are sized for the widest look font (≈ 0.6 × font size per character), stay inside the viewBox, clear the notes beside it and every other label and stroke; check a figure in both Book and Blue (`dcm-look`) before shipping.

(Rule 7, doodles in segment 1, is in scripting.md. Rule 21, 3D, is in animation.md.)

## Reference channels (what we take from each)

| Channel | Take | Rule |
|---|---|---|
| The Engineering Mindset | brand-blue field behind every concept picture; real 3D objects and cutaways; current, field and flow shown as moving dashes/dots; few words on screen, labels near the part | 30, 21, M6 |
| The Efficient Engineer | symbols defined on the picture before the maths; one colour per quantity carried from picture to equation; each substitution visible; result boxed, then its meaning | 33, 34 |
| Khan Academy | the derivation is handwritten on a dark board as it is said; the pen goes where the voice is; circling/underlining the term being discussed; conversational why-then-how | 34, 18 |
| Science Ready | close to the textbook: white page, plain line figures with numbered captions, syllabus wording, exam-style answers with marks | 35, 36 |

## Layout checks

- Keep labels at 10–14 viewBox units and clear of strokes; `Note` has `anchor` for left and right alignment.
- Nothing may sit outside the viewBox; the camera never crops (rule 15).
- On wide screens the board sits beside the drawing (`split`), and long derivations flow into two columns. Check both a 1280 px and a phone-width frame (`frame-strip.mjs --width 390`).
- At most one emoji per board (rule 2).
