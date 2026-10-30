---
name: video-studio
description: The complete studio for the DC Motors video course in one skill. When the user names a topic ("generate 4.3", "make speed control ready", "do topic X"), it builds the whole topic game-ready by following references/topic-recipe.md, with every segment, every video outside Big picture in all four teaching roles (Lecturer, Tutor, Engineer, Senior), a Big picture of real past IOE questions taught by the Lecturer, lint and the topic gate. It also covers scripting (beats, board, questions, Gen-Z Nepali), voice and audio (ElevenLabs whole takes, credits, clip cutting), visuals (2.5D kit, doodles, graphs), animation (scene clock, cues, camera, 3D), the player and unit path, MP4 rendering and QA. Use it for any task that creates, edits, reviews, voices, animates or renders a video or lesson, and keep it updated with every rule the user sets.
---

# Video studio

The DC Motors course (IOE Electrical Machines, Unit 4) is one video-first
journey: six micro-topics, 4.1 to 4.6, of about 5 minutes each. Each topic is
built from self-playing whiteboard videos with a Devanagari voice, roman
captions and questions inside the video. This skill is the single home for
**every** rule and procedure behind those videos. **It is never finished:
every task ends by updating it (see "Keep this skill alive").**

## "Generate topic X": the one-command path

When the user names a topic, do the whole thing, not a step:
1. `node .claude/skills/video-studio/scripts/topic.mjs <num>` prints the brief (syllabus, derivations, past questions from `references/topics.json`) and every gap.
2. Follow **[references/topic-recipe.md](references/topic-recipe.md)** from step 0 to step 7: plan, native scripts, all four roles, visuals, verify, voice (estimate only, record on yes), finish.
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
| Write or edit a video, a topic, a question, a caption or a voice line | [references/scripting.md](references/scripting.md) |
| Record voice, credits, clip problems, audio evenness | [references/voice-audio.md](references/voice-audio.md) |
| Drawings, kit parts, doodles, graphs, board text, 2.5D look | [references/visuals.md](references/visuals.md) |
| Motion, cues, camera, focus ring, hand, 3D scenes | [references/animation.md](references/animation.md) |
| Player controls, progress bar, unit path, segments, Finish | [references/player-and-path.md](references/player-and-path.md) |
| MP4 render, the review loop, the frame strip, the final checklist | [references/render-and-qa.md](references/render-and-qa.md) |

Read the reference before touching its area. Rules are numbered: house rules
1 to 44 (the scripts cite them by number) and motion rules M1 to M16. A rule
lives in exactly one reference.

## POVs: who is teaching (four roles, four skills)

A POV is a **role**: the person teaching the video. The **POV** selector at the top right of the player switches roles (`Auto` = the segment's role; ★ marks the roles this video has its own version for). Each role owns its voice (how it speaks), script, sound settings, look, animation and lesson shape in its own skill. Load the role's skill before writing for it.

| Role | Skill | Who | Look (visual reference) | Auto for |
|---|---|---|---|---|
| Lecturer | `pov-lecturer` | college lecturer, the textbook/exam answer | `book` or blue (viewer's choice, `dcm-lecturer-theme`) | 3/3 Big picture, **always** (locked) |
| Tutor | `pov-tutor` | private tutor, one-on-one, why before how | `navy` (Khan Academy board) | 2/3 Derivation |
| Engineer | `pov-engineer` | practising engineer, machine and model first, units | `blue` (Engineering Mindset + Efficient Engineer) | 1/3 Terms |
| Senior | `pov-senior` | IOE senior dai/didi, marks plan, trap, memory trick | `clean` | (variants) |

Registry and voice settings: `src/content/pov.js`. A video sets `pov:` (its native role; `answer()` sets `lecturer`) and may carry `variants: { <role>: { beats?, board?, draw?, viewBox?, tall?, notes?, three? } }`. A variant without `beats` reuses the video's lines (no new voice); one with `beats` is a new script. Lint checks variants as `"<title> [<role>]"`. **Every video of a finished topic has all four roles** (4.1 does: native script + 3 role versions each, in `src/content/video/roles<topic>.jsx`, the opener via `topic({ introRoles })`). **Not yet:** the recorder and MP4 renderer only voice and render the main script; variant beats stay caption-only until the recorder learns `variants` and each role's `voice` settings.

## Non-negotiables (break none, ever)

1. **Gen-Z Nepali.** Roman Nepali on screen (`say`, board, questions), Devanagari in `voice`. Technical terms, numbers, formulas and real IOE question text stay in English (rule 1).
2. **Credits are the user's.** Never record without a character estimate and the user's yes. Only approved topics get recorded (so far 4.1 and 4.2). The dev server never records unless `TTS_LIVE=1` is set (rules 25–26).
3. **One whole take per video**, never line by line (rule 27).
4. **One clock.** All motion runs on the scene clock, never on wall time (M1).
5. **Teach before test.** A question only asks what an earlier beat taught, and it stands on its own (rules 9–10).
6. **Make the focus obvious.** The part the voice is on stays bright with the ring and the hand; everything else softens, done by CSS (rule 18, M7). Never use SVG `filter`.
7. **Unchanged lines stay byte-identical**, so their clips are reused (rule 28).
8. **Test on a build** (`vite preview`), never on the dev server (render-and-qa.md).
9. **Said = shown, no filler.** The caption reads exactly what the beat writes or points at; teacher's register, no hype, no lead-in-only beats (rules 11, 31, 32).
11. **Exam = textbook answer.** Big-picture answers read like the Indian textbook page students will write: Q., underlined headings, "Let,", numbered equations, ∴, boxed result, "Hence proved" (rule 41, `pov-lecturer`).
13. **Same material, different explanation; Big picture is always the past questions, taught by the Lecturer.** Every role covers the native script's content; Big picture has no role versions, opens with the real IOE question, and the viewer may only switch the Lecturer's White/Blue theme (rule 44).
12. **Don't sound repetitive.** Vary connectors from the role's phrase bank; none more than twice per video (rule 42).
10. **Each segment has its look.** Terms: Blue (Engineering Mindset). Derivation: handwritten navy board (Khan Academy) with Efficient-Engineer maths (one "=" per row, underbraced expansions). Big picture: Book (Science Ready) with textbook figures, one model answer per IOE question (rules 30, 33–36).

## Where things live

| What | File |
|---|---|
| Topic list, order, openers, extras | `src/content/topics.jsx` (assembled in `src/content/journey.jsx`) |
| Authoring helpers (`video`, `overview`, `solve`, `answer`, `segments`, `extra`, SVG parts, palette `C`, `K` for KaTeX) | `src/content/video/kit.jsx` |
| Kid-simple doodles (segment 1) | `src/content/video/doodles.jsx` |
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
node .claude/skills/video-studio/scripts/frame-strip.mjs <n|title> [--frames 10]   # screenshots + pause test (needs preview)
node .claude/skills/video-studio/scripts/anim-once.mjs <n> [--pov role]            # nothing animates twice (needs preview)
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
- 2026-10-30: 4.1 is role-wise: every main video (opener included) now has all four roles, 26 new role versions in `roles41.jsx` (caption-first; voice lines written, nothing recorded). Exam counts from the vault digest; numbers recomputed.
- 2026-10-30: **Generate-a-topic path** added at the user's request ("whenever I tell you to generate on this topic, make the entire game ready"): `references/topic-recipe.md` (steps 0–7 + flexibility table), `references/topics.json` (syllabus, derivations, past questions per topic from vault/), `scripts/topic.mjs` (brief + `--check` gate: segments, Big-picture question cards in every role, past-question coverage, all four roles, same-material warnings, lint, credits). Rule 44: same material across roles; Big picture always the past IOE questions in every role. 4.1 Big-picture role versions rewritten to open with the question; 4.1 passes the gate. Known gaps for 4.2–4.6 are printed by the gate (4.2 has a non-question video in Big picture; 4.6 has no past question in vault/).
- 2026-10-30: Animations play once (M16): the board's pen line no longer starts the CSS write first (it was written twice on every beat, 30–80 ms apart); `scripts/anim-once.mjs` checks it. Highlighter replaced: iPad-style stroke that paints behind the rows, holds ~1 s and fades, only on results, traps and "find" lines, never an underline on every line (rule 39). Story video's "220 V" label no longer clipped.
- 2026-10-30: Big picture is always the Lecturer (user: "big picture to be always lecturer"): the player locks the role there and its role versions were removed; the Lecturer can be shown White (Book) or Blue (`dcm-lecturer-theme`, switch beside the POV chip), textbook form kept in both (`.lect`). Layout fixes from `scripts/fit-check.mjs` (every beat × role × 4 sizes): written lines no longer clipped at 320 px, the camera no longer flips (negative scale) when the caption or a question card shrinks the stage, story labels spaced.
- 2026-10-30: Big picture defaults to the Lecturer in Blue; POV kept per segment (Derivation opens on the Tutor); ∴ always inside the maths (`\therefore`), never a loose text glyph; rule 46 (every role version gets its academic figure via `figAt`); rule 47 (no pointing words without a figure; lint).
