---
name: lesson-studio
description: The rulebook and procedure for improving the DC Motors video course (content, voice, visuals, questions, pacing, the unit path). Use whenever asked to review, improve, fix or extend course content or its quality, and keep this file updated with every rule the user sets.
---

# Lesson studio

The DC Motors course is one video-first journey: six micro-topics of IOE
Electrical Machines Unit 4 (4.1–4.6), each about 5 minutes, built from
self-playing whiteboard videos with voice, captions and questions inside the
video. This file is the house rulebook. **It is never finished: every content
or quality task ends by updating it (see "Keep this skill alive").**

## Where things live

| What | File |
|---|---|
| Topic list, order, segments, openers | `src/content/topics.jsx` |
| Video helpers (`video`, `answer`, `overview`, `segments`, SVG parts) | `src/content/video/kit.jsx` |
| Video bank (beats, board, drawings) | `src/content/video/*.jsx` (`vibe.jsx` = segment-1 openers) |
| Player (clock, camera, voice, asks, download) | `src/video/Scene.jsx`, voice keys in `src/video/voice.js` |
| Lesson flow, XP, Finish | `src/components/LessonPlayer.jsx` |
| Unit path (one bubble per micro-topic, Sparky) | `src/App.jsx` |
| Voice clips | `public/audio/scene/<key>.mp3` (`npm run audio:scenes`) |
| Rendered MP4s | `public/videos/<key>.mp4` (`npm run render:videos`) |
| Syllabus and past papers | `vault/` (`scripts/vault-sync.sh`) |

Specialist agents in `.claude/agents/` (`content-quality`, `presentation-quality`,
`question-pacing`) may be used when the user asks for agents; they must follow
these rules too.

## House rules (rigid: follow every one, every time)

### Language and tone
1. Everything is Gen-Z Nepali: roman Nepali on screen (`say`, board, questions), Devanagari in `voice` for TTS. Technical terms, numbers, formulas and real IOE question text stay English.
2. Fun but not jokey: one everyday analogy per idea, at most one emoji per board.

### Structure
3. Each micro-topic is `topic({ num, title, intro, terms, derive, picture })` in three segments: 1/3 Terms ra definitions → 2/3 Derivation → 3/3 Big picture (a real IOE question solved as a video).
4. Segment 1 opens with `overview(num, title, beats)`: about three short voiced beats. Beat 0 writes the topic **number** (e.g. `4.1`) as the heading and the title under it; each later beat writes the questions the topic will answer ("Motor kina ghumcha?", "Back EMF k ho?"). It is a preview, not a summary: no formulas, results or conclusions, and never a list of the three segments.
5. The opener names the topic ("Losses ra efficiency topic suru garau."), never "yo topic". Each beat is one short sentence; the whole opener is about 10–15 s.
6. Segment 1 (Terms ra definitions) is explained like to a 5-year-old: every video in it has a `draw` picture, made of kid-simple doodles from `src/content/video/doodles.jsx` (everyday objects, thick round strokes, a face on the motor, a little motion such as a spinning fan). One picture per beat (`s.on(k, k)`), so each idea gets its own image; add new doodles to `doodles.jsx` instead of one-off drawings.
7. Surplus videos go in `extras` (optional practice), never deleted.

### Questions inside videos
8. Teach before test: a question may only ask what an earlier beat already explained.
9. A lead-in beat that only cues a question says `La, yo answer gara.` / voice `ल, यो आन्सर गर।`. Never filler like "Ekchin, dhyan check", "Bharkhar ko kura", "Ekchoti socha ta", "Dhyan diyera herya?", "Feri recall". Question text doesn't start with "Bharkhar bhaneko:". Lead-ins that carry content ("Aba naya back EMF.") stay.
10. Question cards carry no "Dhyan check 👀" / "Ekchin socha 🤔" tag. Only informative tags (IOE paper, "Quick check", etc.) are allowed.
11. Every question card has **↺ Rewatch** before answering; after an answer the video goes on by itself after 2 s; rewinding before a question asks it again (answers are not kept); XP only for the first try.

### Player and camera
12. Default speed 1× (pref key `dcm-rate`). Space plays and pauses.
13. Camera zoom is at most 10% past the full-board view (`ZOOM_IN = 1.1` in `Scene.jsx`); the drawing must never be cut off.
14. Pause freezes everything (voice, handwriting, hand, CSS animations); seeking lands on the exact moment; all of it runs on the scene clock `within`.
15. Focus follows the voice, and the drawing always stays fully visible (never dim or fade parts). The part a beat brings in (`s.on(k)`) or highlights (`s.hl(k)`) gets the pulsing yellow focus ring and the pointing hand, so every beat that talks about a part of the drawing must mark it with `s.on(k)` or `s.hl(k)`.
16. Drawings look solid (2.5D): use the shaded kit parts (`Pole`, `Conductor`, `Rotor`, `Shadow` in `kit.jsx`), with gradients and soft ground shadows, never SVG filters. New objects follow the same lighting (from the top left).

### Unit path and flow
17. One bubble per micro-topic, with a three-part bar for its segments.
18. Segments run straight into each other inside the player, with no trip back to the path. Only after all three segments, the last screen says **Finish ✓**; then Sparky hops on the path to the next topic's bubble and waits there (no auto-enter).

### Voice, credits and video files
19. ElevenLabs costs 1 credit per character and the key's balance can't be queried. **Before recording, estimate the characters (`npm run audio:scenes -- --dry`) and ask the user.** Record only the modules the user approved (so far 4.1 and 4.2).
20. The dev server records unrecorded lines on its own when they play (spends credits). Preview unrecorded content with `vite preview` on a fresh build instead.
21. Editing a line's `say`/`voice` changes its clip key, so it must be recorded again; keep unchanged lines byte-identical so their clips are reused.
22. MP4 downloads are rendered offline frame by frame (`npm run render:videos -- 4.1 4.2`), never screen-recorded. Re-render after any change to a video's content, voice, the camera or the player look; the script re-renders automatically when the text or the recorded lines change, otherwise use `--force`.

## Procedure

1. Read this file and the touched content first. Refresh `vault/` with `scripts/vault-sync.sh` if needed.
2. Make the change following the house rules. Verify every number with a quick node/python check.
3. `npx vite build` must pass.
4. Look at the result: drive the app headlessly (Playwright, `chromium-1234/chrome-linux64/chrome` in `~/.cache/ms-playwright`) and screenshot the changed screens. Use a `vite preview` build when lines aren't recorded yet.
5. Voice: if lines changed, run `npm run audio:scenes -- --dry`, give the user the credit estimate, and record only after they approve.
6. If rendered videos are affected, re-render them (after voice is recorded).
7. **Update this file** (next section).
8. Report to the user: what changed, what was verified, the credits needed, what isn't committed.

## Keep this skill alive

Every time the user improves or corrects course content or quality:

- Turn each new preference or correction into a numbered house rule in the right group: short, absolute, testable. Say what to do, not what happened.
- If it contradicts an existing rule, replace that rule (don't keep both), and update any file paths or names here that changed.
- Add a dated line to the changelog below.
- Keep rules about *how the course should be*. One-off task details stay out.

## Changelog

- 2026-10-28: Rewrote for the video-first course. Added rules 1–19 from this session: offline MP4 render, 1× default, 10% zoom cap, Rewatch button, 2 s auto-continue, re-ask on rewind, "La, yo answer gara" lead-in, no Dhyan-check tags, one bubble per micro-topic, Finish ✓ with Sparky hop only after a whole topic, topic opener with number + title naming the topic, and credit estimates before recording.
- 2026-10-28: Rules 4–5: the topic opener is now about three beats of key ideas and formulas (the single title-only beat left the board empty).
- 2026-10-28: Rule 4: the opener previews the topic as questions; it must not give away formulas or conclusions.
- 2026-10-28: New rule 6: segment 1 gets kid-simple doodle pictures for every video (doodles.jsx). Rules renumbered.
- 2026-10-28: New rule 15: spotlight; the drawing part the voice is about stays bright and the rest dims, and the hand points at it.
- 2026-10-28: Rule 15 replaced: no dimming (the user found it faded); a focus ring marks the part instead. New rule 16: solid 2.5D look with the shaded kit parts.
- 2026-10-28: The question lead-in rule now covers every filler cue (bharkhar / ekchoti / dhyan / recall); 24 lead-ins replaced.
