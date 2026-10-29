---
name: video-studio
description: The complete studio for the DC Motors video course in one skill. It covers scripting (beats, board, questions, Gen-Z Nepali), voice and audio (ElevenLabs whole takes, credits, clip cutting), visuals (2.5D kit, doodles, graphs), animation (scene clock, cues, camera, 3D), the player and unit path, MP4 rendering and QA. Use it for any task that creates, edits, reviews, voices, animates or renders a video or lesson, and keep it updated with every rule the user sets.
---

# Video studio

The DC Motors course (IOE Electrical Machines, Unit 4) is one video-first
journey: six micro-topics, 4.1 to 4.6, of about 5 minutes each. Each topic is
built from self-playing whiteboard videos with a Devanagari voice, roman
captions and questions inside the video. This skill is the single home for
**every** rule and procedure behind those videos. **It is never finished:
every task ends by updating it (see "Keep this skill alive").**

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
| Write or edit a video, a topic, a question, a caption or a voice line | [references/scripting.md](references/scripting.md) |
| Record voice, credits, clip problems, audio evenness | [references/voice-audio.md](references/voice-audio.md) |
| Drawings, kit parts, doodles, graphs, board text, 2.5D look | [references/visuals.md](references/visuals.md) |
| Motion, cues, camera, focus ring, hand, 3D scenes | [references/animation.md](references/animation.md) |
| Player controls, progress bar, unit path, segments, Finish | [references/player-and-path.md](references/player-and-path.md) |
| MP4 render, the review loop, the frame strip, the final checklist | [references/render-and-qa.md](references/render-and-qa.md) |

Read the reference before touching its area. Rules are numbered: house rules
1 to 29 (the scripts cite them by number) and motion rules M1 to M15. A rule
lives in exactly one reference.

## Non-negotiables (break none, ever)

1. **Gen-Z Nepali.** Roman Nepali on screen (`say`, board, questions), Devanagari in `voice`. Technical terms, numbers, formulas and real IOE question text stay in English (rule 1).
2. **Credits are the user's.** Never record without a character estimate and the user's yes. Only approved topics get recorded (so far 4.1 and 4.2). The dev server never records unless `TTS_LIVE=1` is set (rules 25–26).
3. **One whole take per video**, never line by line (rule 27).
4. **One clock.** All motion runs on the scene clock, never on wall time (M1).
5. **Teach before test.** A question only asks what an earlier beat taught, and it stands on its own (rules 9–10).
6. **Never fade the drawing to show focus.** Use the focus ring and the hand. Never use SVG `filter` (rule 18, M7).
7. **Unchanged lines stay byte-identical**, so their clips are reused (rule 28).
8. **Test on a build** (`vite preview`), never on the dev server (render-and-qa.md).

## Where things live

| What | File |
|---|---|
| Topic list, order, openers, extras | `src/content/topics.jsx` (assembled in `src/content/journey.jsx`) |
| Authoring helpers (`video`, `overview`, `solve`, `answer`, `segments`, `extra`, SVG parts, palette `C`, `K` for KaTeX) | `src/content/video/kit.jsx` |
| Kid-simple doodles (segment 1) | `src/content/video/doodles.jsx` |
| Video bank | `src/content/video/ch1–ch9.jsx`, `vibe.jsx` (openers), `picture.jsx` (big-picture answers), `past.jsx`, `testing.jsx` |
| Player: clock, camera, writing hand, voice, asks, download | `src/video/Scene.jsx` |
| Speakable text, clip keys | `src/video/voice.js` |
| 3D stage and scenes | `src/video/Stage3D.jsx`, `src/content/video/motor3d.js` |
| Motion CSS (`.sc`, `.seq`, `.pop`, `.draw`, `.spin-up`, `.flowdash`, board kinds) | `src/styles.css` |
| Lesson flow, XP, Finish; unit path | `src/components/LessonPlayer.jsx`; `src/App.jsx` |
| Voice clips and manifest | `public/audio/scene/<key>.mp3`, `manifest.json` |
| Rendered MP4s and manifest | `public/videos/<key>.mp4`, `manifest.json` |
| Recording, cutting, evening, rendering | `scripts/generate-scene-audio.mjs`, `whole-take.mjs`, `audio-even.mjs`, `tts-plugin.mjs`, `render-videos.mjs` |
| Syllabus and past papers | `vault/` (refresh: `scripts/vault-sync.sh`) |

## Commands

```bash
# This skill's tools (run from the repo root; they never spend credits)
node .claude/skills/video-studio/scripts/status.mjs [4.1 …] [--videos]   # voice + MP4 state, credits still needed
node .claude/skills/video-studio/scripts/lint.mjs [4.1 …] [--main]       # house-rule checks on the scripts
node .claude/skills/video-studio/scripts/frame-strip.mjs <n|title> [--frames 10]   # screenshots + pause test (needs preview)

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
