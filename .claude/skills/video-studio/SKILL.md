---
name: video-studio
description: The complete studio for the DC Motors video course in one skill. When the user names a topic ("generate 4.3", "make speed control ready", "do topic X"), it builds the whole topic game-ready by following references/topic-recipe.md, with three segments (Basic Understanding: one minute of 3D intuition with no maths, references/basic-understanding.md; Syllabus Content; Model Answer of real past IOE questions taught by the Lecturer), every video outside Model Answer in both teaching roles (Tutor and Lecturer), lint and the topic gate. It also covers scripting (beats, board, questions, Gen-Z Nepali), voice and audio (ElevenLabs whole takes, credits, clip cutting), visuals (2.5D kit, doodles, graphs), animation (scene clock, cues, camera, 3D), the player and unit path, MP4 rendering and QA. Use it for any task that creates, edits, reviews, voices, animates or renders a video or lesson, and keep it updated with every rule the user sets.
---

# Video studio

The course is the whole IOE **Electrical Machines** subject: seven units,
one video-first journey per unit, one micro-topic per IOE syllabus bullet
(57 in all: Unit 1 9, Unit 2 13, Unit 3 7, Unit 4 7, Unit 5 5, Unit 6 9,
Unit 7 7; vault/…/Syllabus). Never merge two bullets into one topic (rule 68). Unit 4 (DC Motor) was the
first and is the reference implementation. Each topic is three segments of
self-playing videos with a Devanagari voice, roman captions and questions
inside the video:

| Segment | Shown as | What | Reference |
|---|---|---|---|
| 1/3 | **Basic Understanding** | ONE video, ~60 s (75 s max), 3D motor tour, no maths: what each part is and does, like for a kid | [references/basic-understanding.md](references/basic-understanding.md) |
| 2/3 | **Syllabus Content** | every syllabus bullet with its maths: definitions and working first, then each derivation | scripting.md |
| 3/3 | **Model Answer** | the real past IOE questions as textbook answers, Lecturer only | pov-lecturer |

(Segment names: user, 2026-11-01. Older text and code comments may still say
Terms / Derivation / Big picture for segments 1 / 2 / 3; the code keys are
`terms`, `derive`, `picture`.) This skill is the single home for
**every** rule and procedure behind those videos. **It is never finished:
every task ends by updating it (see "Keep this skill alive").**

## The units

| Unit | Route slug | Content file | Segment-1 3D tour |
|---|---|---|---|
| 1 Magnetic Circuits and Induction | `magnetic-circuits` | `src/content/units/u1.jsx` | `magnetTour` |
| 2 Transformer | `transformer` | `src/content/units/u2.jsx` | `transformerTour` |
| 3 DC Generator | `dc-generator` | `src/content/units/u3.jsx` | `motorTour` + `engine`, `lamp` |
| 4 DC Motor | `dc-motor` | `src/content/topics.jsx`, `unit4/u41–u46.jsx` | `motorTour` |
| 5 Three Phase Induction Machines | `induction-machines` | `src/content/units/u5.jsx` | `inductionTour` |
| 6 Three Phase Synchronous Machines | `synchronous-machines` | `src/content/units/u6.jsx` | `syncTour` |
| 7 Fractional Kilowatt Motors | `fractional-kw-motors` | `src/content/units/u7.jsx` | `smallTour`; 7.3 `motorTour` + `ac` |

All units are assembled in `src/content/units/index.jsx` (`units`: slug, title, topics, journey); the app routes `/electrical-machines/<slug>[/lesson/<n>]` and keeps one progress record per unit (`em-progress-v3`). Every topic number is unique across the subject, so `lint.mjs 2.3`, `topic.mjs 5.4` work unchanged.

## "Generate topic X": the one-command path

When the user names a topic, do the whole thing, not a step:
1. `node .claude/skills/video-studio/scripts/topic.mjs <num>` prints the brief (syllabus, derivations, past questions from `references/topics.json`) and every gap.
2. Follow **[references/topic-recipe.md](references/topic-recipe.md)** from step 0 to step 7: plan, Basic Understanding ([references/basic-understanding.md](references/basic-understanding.md)), native scripts, both roles (Tutor, Lecturer), visuals, verify, voice (only 4.1 is voiced; estimate, record on yes), finish.
3. It is done only when `topic.mjs <num> --check` exits 0, lint has 0 errors, you have looked at the frame strips (native and per role), and it is committed and pushed. Then report.

The recipe's "Flexibility" table covers partial requests (one segment, one role, with or without audio, a new role, another unit).

## The pipeline

```
 script ─────▶ visuals ─────▶ motion ─────▶ lint + build + look ─────▶ voice ─────▶ render ─────▶ ship
 beats, board   draw(), kit,   s.on/s.hl,    lint.mjs, vite build,     whole takes   MP4 per video   commit,
 asks, voice    doodles, 3D    --d cues, 3D  frame-strip.mjs           (credits!)    offline         push main
 scripting.md   visuals.md     animation.md  render-and-qa.md          voice-audio.md render-and-qa.md
```

Order matters. Settle the text (`say`, `voice`, `ask`) **before** recording,
because every edit to a spoken line changes its clip key and costs credits
again. Settle the voice **before** rendering, because an MP4 is timed by its
clips.

## Read the right reference

| Task | Read |
|---|---|
| **Generate a whole topic** (the one-command path) | [references/topic-recipe.md](references/topic-recipe.md) + `scripts/topic.mjs` + [references/topics.json](references/topics.json) |
| **Segment 1, Basic Understanding** (the 3D motor tour, kid-level, one minute) | [references/basic-understanding.md](references/basic-understanding.md) |
| Write or edit a video, a topic, a question, a caption or a voice line | [references/scripting.md](references/scripting.md) |
| Record voice, credits, clip problems, audio evenness | [references/voice-audio.md](references/voice-audio.md) |
| Drawings, kit parts, doodles, graphs, board text, 2.5D look | [references/visuals.md](references/visuals.md) |
| Motion, cues, camera, focus ring, hand, 3D scenes | [references/animation.md](references/animation.md) |
| Player controls, progress bar, unit path, segments, Finish | [references/player-and-path.md](references/player-and-path.md) |
| MP4 render, the review loop, the frame strip, the final checklist | [references/render-and-qa.md](references/render-and-qa.md) |

Read the reference before touching its area. Rules are numbered: house rules
1 to 67 (the scripts cite them by number) and motion rules M1 to M20. A rule
lives in exactly one reference.

## POVs: who is teaching (two roles, two skills)

A POV is a **role**: the person teaching the video. The **POV** selector at the top right of the player switches roles (`Auto` = the segment's role; ★ marks the roles this video has its own version for). Each role owns its voice (how it speaks), script, sound settings, look, animation and lesson shape in its own skill. Load the role's skill before writing for it.

Two teachers only (user, 2026-10-30: "only Lecturer + Tutor"). Both teach on the **same page**: the textbook form of Big picture, in Poppins, Blue by default or White (`dcm-lecturer-theme`), text on the left and the book figure on the right. They differ only in how they explain.

| Role | Skill | Who | Auto for |
|---|---|---|---|
| Tutor | `pov-tutor` | private tutor, one-on-one, why before how, "timi/hami" | 1/3 Terms, 2/3 Derivation (default) |
| Lecturer | `pov-lecturer` | college lecturer, the textbook/exam answer | 3/3 Big picture, **always** (locked); the variant everywhere else |

Registry and voice settings: `src/content/pov.js`. Write a Terms or Derivation video with `duo(title, { draw, viewBox, tutor: [beat…], lecturer: [beat…] })` (`kit.jsx`): same number of beats, one shared figure, each beat `{ say, voice, ask?, lines: [[kind, node, until?]] }`. Big picture uses `answer()` (Lecturer only). Unit 4 lives in `src/content/unit4/u41–u46.jsx`, its figures in `src/content/unit4/figs.jsx`. **Not yet:** the recorder and MP4 renderer voice only the default telling (Tutor outside Big picture); the Lecturer variants stay caption-only until the recorder learns `variants`.

## Non-negotiables (break none, ever)

1. **Gen-Z Nepali.** Roman Nepali on screen (`say`, board, questions), Devanagari in `voice`. Technical terms, numbers, formulas and real IOE question text stay in English (rule 1).
2. **Credits are the user's.** Never record without a character estimate and the user's yes. **Only 4.1 is voiced** (user, 2026-11-01: "only 4.1 will have audio, other will not"); every other topic stays caption-only (rule 38). The dev server never records unless `TTS_LIVE=1` is set (rules 25–26).
3. **One long take per segment and teller** (Terms and Derivation for the Tutor and the Lecturer, Big picture for the Lecturer), never per video or line by line (rule 27).
4. **One clock.** All motion runs on the scene clock, never on wall time (M1).
5. **Teach before test.** A question only asks what an earlier beat taught, and it stands on its own (rules 9–10).
6. **Make the focus obvious.** The part the voice is on stays bright with the ring and the hand; everything else softens, done by CSS (rule 18, M7). Never use SVG `filter`.
7. **Unchanged lines stay byte-identical**, so their clips are reused (rule 28).
8. **Test on a build** (`vite preview`), never on the dev server (render-and-qa.md).
9. **Said = shown, no filler.** The caption reads exactly what the beat writes or points at; teacher's register, no hype, no lead-in-only beats (rules 11, 31, 32).
11. **Exam = textbook answer.** Big-picture answers read like the Indian textbook page students will write: Q., underlined headings, "Let,", numbered equations, ∴, boxed result, "Hence proved" (rule 41, `pov-lecturer`).
13. **Same material, different explanation; Big picture is always the past questions, taught by the Lecturer.** Every role covers the native script's content; Big picture has no role versions, opens with the real IOE question, and the viewer may only switch the Lecturer's White/Blue theme (rule 44).
12. **Don't sound repetitive.** Vary connectors from the role's phrase bank; none more than twice per video (rule 42).
10. **Basic Understanding is one minute of intuition; Syllabus Content and Model Answer are bookish.** Segment 1 is ONE video (~60 s, 75 s max), a 3D tour of the motor (`motorTour` in `unit4/basics3d.js`) told like for a kid: what each part is and does, everyday comparisons, the surprise, **no maths and no symbols** (rule 7, [references/basic-understanding.md](references/basic-understanding.md)). Segments 2 and 3 are the textbook form: board text left, book figure right, point-wise lines (`Pts`), one "=" per row (rules 30, 33, 35, 48–50). All segments: Poppins, Blue (default) or White, and never emoji or cartoon faces.
14. **Every short form gets its full form** the first time it appears in a video, on the board and in the caption: "EMF (Electro-Motive Force)". The player does it from `src/content/abbr.js` (rule 53); add new short forms there.
15. **Short forms are spoken letter by letter.** In `voice`, write the letter names apart (`ई एम एफ`, `डी सी`, `एम एन ए`, `एन भी सी`); joined (`इएमएफ`) is read as one word ("imf"). Lint fails the joined spelling (rule 28c).

## Where things live

| What | File |
|---|---|
| Topic list, order, openers, extras (Unit 4) | `src/content/topics.jsx` (assembled in `src/content/journey.jsx`); `topic()` lives in `kit.jsx` |
| Authoring helpers (`video`, `overview`, `solve`, `answer`, `segments`, `extra`, SVG parts, palette `C`, `K` for KaTeX) | `src/content/video/kit.jsx` |
| Unit 4 content (duo videos, answers) and book figures | `src/content/unit4/u41–u46.jsx`, `src/content/unit4/figs.jsx` (also exports the shared ink for every unit) |
| Units 1–3, 5–7 (figures, basics, syllabus duos, answers, summary) | `src/content/units/u1.jsx` … `u7.jsx`; assembled with Unit 4 in `src/content/units/index.jsx` |
| 3D machines for the other units | engine `src/content/machines/tour3d.js` (`makeTour`), models `src/content/machines/models3d.js` (basic-understanding.md §8) |
| 4.1 Syllabus Content (the canvas-plan reference: Remember, branches, carry) | `src/content/unit4/s41.jsx` |
| Symbol table and subscripts (captions, questions, board, figure labels) | `src/content/sym.jsx` |
| Segment 1 Basic Understanding (one duo per topic) and its 3D motor tour | `src/content/unit4/basics.jsx`, `src/content/unit4/basics3d.js` (`motorTour(plan)`) |
| Short forms → full forms + spoken spelling | `src/content/abbr.js` (player: `withAbbr`/`captionsOf` in `Scene.jsx`) |
| Old doodles (extras only; never in the main path) | `src/content/video/doodles.jsx` |
| Video bank | `src/content/video/ch1–ch9.jsx`, `vibe.jsx` (openers), `t41.jsx` (4.1 derivations, `step()` helper), `roles41.jsx` (every 4.1 video in every role: `addRoles`, `role()`), `picture.jsx` (big-picture answers, bookish figure helpers), `past.jsx`, `testing.jsx` |
| POV registry (look, voice settings, auto per segment) | `src/content/pov.js`; skills `.claude/skills/pov-*` |
| Picture looks (blue / navy / clean / book / board, ink repaint) | `src/video/looks.js` + `styles.css` "video looks" |
| Player: clock, camera, writing hand, voice, asks, download | `src/video/Scene.jsx` |
| Speakable text, clip keys | `src/video/voice.js` |
| 3D stage and scenes | `src/video/Stage3D.jsx`, `src/content/video/motor3d.js` |
| Motion CSS (`.sc`, `.seq`, `.pop`, `.draw`, `.spin-up`, `.flowdash`, board kinds) | `src/styles.css` |
| Lesson flow, XP, Finish, Up-next list (rule 37); unit path | `src/components/LessonPlayer.jsx`; `src/App.jsx` |
| Voice clips and manifest | `public/audio/scene/<key>.mp3`, `manifest.json` |
| Rendered MP4s and manifest | `public/videos/<key>.mp4`, `manifest.json` |
| Recording, cutting, evening, rendering | `scripts/generate-scene-audio.mjs`, `whole-take.mjs`, `audio-even.mjs`, `tts-plugin.mjs`, `render-videos.mjs` |
| Syllabus and past papers | `vault/` (refresh: `scripts/vault-sync.sh`) |

## Commands

```bash
# This skill's tools (run from the repo root; they never spend credits)
node .claude/skills/video-studio/scripts/topic.mjs 4.2 [--check]            # topic brief, status, game-ready gate
node .claude/skills/video-studio/scripts/status.mjs [4.1 …] [--videos]   # voice + MP4 state, credits still needed
node .claude/skills/video-studio/scripts/lint.mjs [4.1 …] [--main]       # house-rule checks on the scripts
node .claude/skills/video-studio/scripts/frame-strip.mjs <title words | n --unit slug> [--frames 10]   # screenshots + pause test (needs preview)
node .claude/skills/video-studio/scripts/anim-once.mjs <n> [--unit slug] [--pov role]          # nothing animates twice (needs preview)
python3 .claude/skills/video-studio/scripts/eqsplit.py src/content/units/u5.jsx             # rule 33/55: split "a = b = c" maths rows
node .claude/skills/video-studio/scripts/fit-check.mjs 4.1 [--sizes 390x844]        # layout: nothing cut or overlapping, every beat × role × size

# Repo pipeline
npx vite build && npx vite preview --port 4182                # what you test on
npm run audio:scenes -- 4.2 --whole --dry                     # credit estimate (free)
npm run audio:scenes -- 4.2 --whole                           # record: ONLY after the user approves
npm run render:videos -- 4.2 [--force]                        # MP4s, after the voice is in
npm run dev                                                   # for the user to browse; never for tests
```

## Procedures

**New or edited video.** scripting.md → write beats, board and asks → visuals.md + animation.md for `draw` → lint → build → frame strip → status (does it need voice?) → estimate → ask the user → record → render → update this skill → commit.

**Text-only fix to a recorded video.** Change as little spoken text as you can (board lines and drawings are free; `say`/`voice`/`ask` are not). Run lint, then build. Tell the user which videos now need a new take and give the estimate.

**Motion pass.** animation.md review loop → never touch `say`/`voice` → frame strips before and after → re-render the affected MP4s with `--force` if their voice exists.

**Voice a topic.** Run `status.mjs <topic>` and the `--whole --dry` estimate. Give the user the number of characters (= credits; the key started with about 10k). Record only after they say yes. Check the clips (voice-audio.md "After recording"), then render.

**Content correctness.** Check every number with a quick node or python calculation. Real IOE questions come from `vault/`, never invented (render-and-qa.md checklist).

Specialist agents in `.claude/agents/` (`content-quality`, `presentation-quality`, `question-pacing`, `animation-quality`) may be used **when the user asks for agents**. They follow this skill too.

## Finish every task

1. `lint.mjs` shows no new errors for the touched topics, and `npx vite build` passes.
2. You looked at the frame strip of every changed video.
3. Report to the user: what changed, what was verified (with the strips), the credits needed, and what is not yet recorded or rendered.
4. Update this skill (next section).
5. Commit and push to `main` (the user's standing preference).

## Keep this skill alive

Every time the user corrects, prefers or praises something:

- Turn it into a numbered rule in the reference that owns that area. Keep it short, absolute and testable, and say what to do, not what happened. A new house rule takes the next free number (30, 31, …); a new motion rule takes M16, M17, ….
- If it contradicts an existing rule, replace that rule (don't keep both).
- If a machine can check it, add the check to `scripts/lint.mjs`.
- Keep file paths and names here correct when the code moves.
- Add a dated line to the changelog below. One-off task details stay out.

## Changelog

- 2026-10-28: lesson-studio created (house rules 1–29) and animation-studio created (motion rules M1–M15); history kept in their old files' git log.
- 2026-10-29: Voice now Robust (stability 1.0) with resting points. Every 4.1 video is recorded as one whole take and cut into line clips (rules 27, 28b).
- 2026-10-29: **video-studio created**: lesson-studio and animation-studio merged into one bundled skill, with references per area (scripting, voice/audio, visuals, animation, player/path, render/QA) and tools (`status.mjs`, `lint.mjs`, `frame-strip.mjs`). Those two skills now point here. The first lint run found one 4.1 practice question that trails off with "…" (EMF derivation, beat 3); fixing it needs a new take.
- 2026-10-29: Rule 18 and M7 replaced at the user's request ("the part should be more focused, others decreased opacity"). The focused part stays bright with the ring; the rest of the drawing softens to 0.32, and earlier board lines to 0.45 while a new line is written. This is gentler than the old 0.3 spotlight, which dimmed even the focused part's own group.
- 2026-10-30: 4.1 rewritten to the user's script level: filler and lead-in-only beats removed (rule 11 replaced, rule 32), captions read what is on screen (31), maths one "=" per row with underbraced expansions (33), Derivation now four videos (back EMF, voltage/power, torque by force, torque by power; 34), Big picture two model answers (torque, back EMF) with bookish figures and page turns (35, 36). Reference channels studied → looks per segment with a ◐ selector (30), Up-next list beside the player (37). Unvoiced lines are caption-only (38); nothing recorded. lint.mjs checks rules 11, 32, 33.
- 2026-10-30: User feedback on 4.1: no hand (rule 39), one font per board with handwritten maths on the Derivation board, thin underline marker instead of the highlighter band, terms expanding as an animation (rule 33c: X pulses, R drops in), figure labels sized for every look, and a what-and-why line on every Terms beat (rule 40).
- 2026-10-30: Bug fixed: look/POV changes while paused left board text in the old colour (colour transitions were frozen with the clock); now only non-colour animations follow the clock. Focus ring is green. **POVs added**: Mindset, Board (Khan), Maths (Efficient Engineer), Exam (Science Ready), each with its own skill (`pov-*`), a POV selector replacing the look selector, and 4.1 variants (back EMF derivation [exam], torque force method [efficient], story [khan]). Exam answers rewritten as Indian-textbook answers (rule 41). Connector variety (rule 42) with phrase banks per POV; lint warns past two uses.
- 2026-10-30: POVs redefined as **roles** at the user's request ("POV is like lecturer, private tutor"): Lecturer (book), Tutor (navy), Engineer (blue), Senior (clean), with skills `pov-lecturer`, `pov-tutor`, `pov-engineer`, `pov-senior` (the channel-named POV skills were replaced). 4.1 variants renamed (backEmfDerivation [lecturer], torqueDerivation [engineer], story [tutor]) and a Senior version of the back EMF answer added (6-mark plan, Eb < V trap, RES trick).
- 2026-10-30: 4.1 is role-wise: every main video (opener included) now has both roles (Tutor, Lecturer), 26 new role versions in `roles41.jsx` (caption-first; voice lines written, nothing recorded). Exam counts from the vault digest; numbers recomputed.
- 2026-10-30: **Generate-a-topic path** added at the user's request ("whenever I tell you to generate on this topic, make the entire game ready"): `references/topic-recipe.md` (steps 0–7 + flexibility table), `references/topics.json` (syllabus, derivations, past questions per topic from vault/), `scripts/topic.mjs` (brief + `--check` gate: segments, Big-picture question cards in every role, past-question coverage, both roles (Tutor, Lecturer), same-material warnings, lint, credits). Rule 44: same material across roles; Big picture always the past IOE questions in every role. 4.1 Big-picture role versions rewritten to open with the question; 4.1 passes the gate. Known gaps for 4.2–4.6 are printed by the gate (4.2 has a non-question video in Big picture; 4.6 has no past question in vault/).
- 2026-10-30: Animations play once (M16): the board's pen line no longer starts the CSS write first (it was written twice on every beat, 30–80 ms apart); `scripts/anim-once.mjs` checks it. Highlighter replaced: iPad-style stroke that paints behind the rows, holds ~1 s and fades, only on results, traps and "find" lines, never an underline on every line (rule 39). Story video's "220 V" label no longer clipped.
- 2026-10-30: Big picture is always the Lecturer (user: "big picture to be always lecturer"): the player locks the role there and its role versions were removed; the Lecturer can be shown White (Book) or Blue (`dcm-lecturer-theme`, switch beside the POV chip), textbook form kept in both (`.lect`). Layout fixes from `scripts/fit-check.mjs` (every beat × role × 4 sizes): written lines no longer clipped at 320 px, the camera no longer flips (negative scale) when the caption or a question card shrinks the stage, story labels spaced.
- 2026-10-30: Big picture defaults to the Lecturer in Blue; POV kept per segment (Derivation opens on the Tutor); ∴ always inside the maths (`\therefore`), never a loose text glyph; rule 46 (every role version gets its academic figure via `figAt`); rule 47 (no pointing words without a figure; lint).
- 2026-10-30: **Unit 4 regenerated** (user: "fully regenerate the content part for all 4th chapter"): two teachers only (Tutor default, Lecturer variant and Big picture; Engineer and Senior removed with their skills), every video a `duo()` over a book figure (`unit4/figs.jsx`), all segments in the Big-picture form, Poppins everywhere, text left / figure right, whiteboard pages instead of shrinking (rule 49), point-wise boards (rule 48), no exam tips and answer space by marks (rule 50), no emoji or doodle faces. Old videos kept as extras. 4.1 main path re-recorded as whole takes (7,904 credits).
- 2026-10-31: 4.1 Terms rewritten playful in 3D (`src/content/unit4/scenes41.js`: ceiling fan, wire swing, armature as bicycle pedals, toy motor on an ammeter); 4.1 fully voiced as five segment takes (Terms, Derivation × Tutor/Lecturer, Big picture), 12,027 chars. New 3D scenes use the `kit()` helpers there (labels, arrows, beat camera); `buildMotor` takes cue overrides.
- 2026-10-30: Rule 27 and non-negotiable 3 replaced: one long take per segment telling, the Lecturer versions voiced too (`--whole` now does this; `--per-video` keeps the old way).
- 2026-10-30: Non-negotiable 10 and rule 7 replaced (user: "the first segment can be playful like the 3d objects … real life examples for 8th grade kid … for segment 1 no need to be bookish"). Rule 51 (term labels under equations, automatic) and rule 52 (a soft tone after a question, no spoken "Sahi") added.
- 2026-10-30: Rule 37 replaced (user: "each segment will have one video, chunked in the player like YouTube", "show any frame as the thumbnail", Big picture thumbnails blue): segments play as one video with chapters on the bar; playlist of segment cards with real stills.
- 2026-10-30: Rule 37: chapters moved out of the sidebar into a panel inside the video, opened from the `2/4 ›` button on the bar (user: "only show if clicked … a little modal inside the video").
- 2026-11-01: **Segments renamed and segment 1 rebuilt** (user feedback on 4.1: "section rename 1. Basic Understanding 2. Syllabus Content 3. Model Answer"; first section 3 min → 1 min, no maths, "like for a kid", explain armature, coil, commutator, starter visually). Every topic 4.1–4.6 now opens with ONE Basic Understanding `duo()` (45–69 s per telling) over `motorTour(plan)` (`unit4/basics3d.js`: one 3D motor whose parts are focused per beat; deterministic on the scene clock). Old Terms videos moved to the front of Syllabus Content, old openers to extras. New reference `references/basic-understanding.md` (the full recipe, parts and plan keys, example plans). Gate: one segment-1 video ≤ 75 s per telling; lint: no maths/symbols in segment 1.
- 2026-11-01: **Short forms** (user: "DC (Direct Current), EMF (Electro-Motive Force) … MNA bujhiyena"): the player writes the full form the first time per video (rule 53, `src/content/abbr.js`). **Pronunciation** (user: "EMF lai imf bhandaixa"): the voice lines spelled short forms joined (`इएमएफ` ×50, `डीसी` ×43, `आइओई`, `एनभीसी`, `एमएनए`, `ओएलआर`, `आरपीएम`, `केभीएल`, `एसी`), which TTS reads as a word; all 165 rewritten letter by letter (rule 28c, lint error). This re-keys those lines: 4.1's recorded clips with them need a new take.
- 2026-11-01: **Only 4.1 is voiced** (user). Other topics stay caption-only. fit-check no longer measures playlist thumbnails (false "label cut" on 3D videos).
- 2026-11-01: **Whole subject generated** (user: "generate content for all units and its submodules … make good use of what we have in vault"). Units 1–3 and 5–7 (24 topics) built in the 4.1 pattern, caption-only: a 3D Basic Understanding per topic on a new engine (`machines/tour3d.js`) with one model per unit (`models3d.js`: magnetic core, transformer, induction, synchronous, single-phase/stepper; the DC machine gained `engine`, `lamp`, `ac`), Tutor + Lecturer Syllabus Content over one book figure per topic, and Model Answers for 38 real past questions from the vault Question Bank (topics.json). Multi-unit routes and per-unit progress in `App.jsx`; scripts load every unit. New rules 54–58 (numbers vs short forms in voice, row width, words on segment-1 boards, the topic shape, vault numericals) and M17–M18; `eqsplit.py`; lint warns on wide maths rows. New short forms MMF, AT, OC, SC, CT, PT, LV, HV, RMF, kVA, pf.

- 2026-11-02: **4.1 Syllabus Content rebuilt as bookish notes with a planned canvas** (user review: script ≠ animation, "dt = 60/N comes from nowhere", symbols messy, no subscripts, units read as part of formulas, "N ko muni", merged Nepali titles, 3D in the mid section, cramped content). Seven new duos in `unit4/s41.jsx` from the vault notes (working principle, commutator Fig (a)/(b), back EMF and four significances, EMF equation, voltage/power, torque by force, torque by power), each with a Remember card, branch scenes and carried results (rules 59–65, M19–M20). Old 3D versions moved to extras. Player: ←/→ skip 5 s, branch zone, `recall` kind, planned pages, carried lines; `sym.jsx` subscripts everywhere; `\unit{}` macro (24 formulas converted); topic titles = IOE syllabus bullets, 131 video titles in English; "muni" replaced course-wide; 4.2 excitation figure with long- and short-shunt panels; 4.6 inertia J (not I); 3D wires smooth with caps. Lint rules 59–63. Nothing recorded: the 4.1 clips whose lines changed need new takes when the user asks (user: no audio during the revamp).
- 2026-11-02 (later): Basic Understanding boards structured as numbered parts + "How it works" chain (rule 66; 146 parts, 180 chain steps converted across all 30 topics); 3D boards no longer split into columns; IOE question card full width with papers / marks chip / question lines and no title chip (rule 67); wires rerouted as 90° cabling (M19, `machines/wire3d.js`).
- 2026-11-02: **One topic per IOE syllabus bullet** (user: "don't squeeze, be actual as IOE"; chose: own topic, all three segments, all units). Unit 4 split from 6 to 7 topics (4.1 Working principle and Torque equation, 4.2 Back EMF, 4.3 Method of excitation and types, 4.4 Performance characteristics, 4.5 Starting, 4.6 Speed control, 4.7 Losses and efficiency with the tests); new Basic Understanding duos `basicsBackEmf`, `basicsChars`; 4.3 Model Answer from 2067 Mangsir (suitability); Swinburne exam-style answer moved to extras (no paper in vault). Progress key `em-progress-v4`.
- 2026-11-02: Unit 3 split from 4 to 7 topics (one per IOE bullet): new Basic Understanding for 3.1 construction, 3.5 characteristics, 3.7 efficiency and regulation; new notes video 3.6 losses (`lossFigureFor`); new model answers 3.2 commutator and brushes (2071 Chaitra, 2072 Ashwin, ECM 2082 Bhadra) and 3.6 losses with maximum efficiency (2071 Chaitra).
- 2026-11-02: Unit 5 split from 4 to 5 topics: 5.1 construction and types (new model answer 2067 Mangsir, stator connection of a slip-ring motor: the closest real question, `gap` noted), 5.2 the long IOE bullet (principle … torque equation), 5.3 torque-slip, 5.4 induction generator, 5.5 power stages (new Basic Understanding).
- 2026-11-02: Unit 7 split from 4 to 7 topics: new Basic Understanding 7.1 construction, 7.4 capacitor, 7.5 reluctance start; new notes video 7.4 capacitor start/run (split72 trimmed to split phase); reluctance figure Fig. 7.5 (`relFigure`, replacing the borrowed split-phase figure); new model answers 7.1 (2068 Magh [5+3]), 7.4 (2073 Chaitra, 2068 Magh short note), 7.5 (starting-methods question, closest real one; gap noted).
- 2026-11-02: Unit 1 split from 3 to 9 topics: new Basic Understanding 1.2 Ohm's law, 1.3 series/parallel (2D book figure: the magnet model has no three-limb core), 1.4 air gap, 1.5 B-H, 1.6 hysteresis DC/AC, 1.9 force; new notes 1.2 reluctance and permeance, 1.3 series and parallel circuits (`parallelFigure`, Fig. 1.4), 1.6 hysteresis with DC and AC; new model answers 1.2 (2073 Chaitra), 1.3 (2073 Chaitra method; figure data not in vault), 1.5 numerical (2068 Magh, I = 2.71 A), 1.9 (2079 Jestha, closest real question).
- 2026-11-02: Unit 6 split from 4 to 9 topics: new Basic Understanding 6.2 working, 6.4 armature reaction, 6.7 starting, 6.8 load, 6.9 excitation; new notes 6.6 motor principle and 6.8 load operation with a to-scale motor phasor figure (`motorPhasorFigure`, Fig. 6.5); new model answers 6.7 short note (2068 Magh) and 6.8 numerical (2071 Bhadra, E = 2089.7 V/phase, δ = 3.49°).
- 2026-11-02: Unit 2 split from 5 to 13 topics (2.1–2.13, numbers 2.10–2.13 are exact strings): eight new Basic Understanding tours, seven new notes (construction with `coreShellFigure` Fig. 2.6, ideal transformer, load phasors, polarity test, losses, all-day efficiency, three-phase connections with `threePhaseFigure` Fig. 2.7), new model answers 2.3 (2071 Magh), 2.5 (2068 Magh), 2.8 (2071 Chaitra), 2.13 (2075 Baisakh) and 2.1 exam-style (no construction question in any vault bank; gap). **All 57 IOE subtopics are now their own topics, every gate passes.**
- 2026-11-02: "Why" explanations moved from a card over the figure into the notes (rule 63, M20); "Main line ma farkau" removed from 44 lines; `Let` component: one symbol per line (10 definition lines converted).
