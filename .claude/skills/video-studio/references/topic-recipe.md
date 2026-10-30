# Generate a topic: the full recipe

When the user names a topic ("generate 4.3", "make 4.5 ready", "do losses and efficiency"), make that topic **game-ready** end to end without asking for each step. Game-ready means every segment is complete, every video outside Big picture exists in all four roles, the Big picture answers the topic's real past IOE questions in the Lecturer's textbook form, lint and the topic gate pass, and the user has the credit estimate. 4.1 is the reference implementation: copy its patterns, not its words.

Treat this as exam material for real students. Every fact, number and paper must be verifiable. Take nothing from memory that `vault/` can confirm.

## 0. Read first (always)

1. This skill's SKILL.md non-negotiables, then `scripting.md`, `visuals.md` and `animation.md`.
2. The four role skills: `pov-lecturer`, `pov-tutor`, `pov-engineer`, `pov-senior`.
3. `node .claude/skills/video-studio/scripts/topic.mjs <num>` prints the brief: syllabus bullets, the derivations segment 2 needs, the Big-picture past questions, "also asked" items, and the current state with every gap.
4. `vault/dc-motor-digest.md` plus the raw Question Bank lines for each paper you cite. If the topic is not in `references/topics.json`, add it from `vault/` first (syllabus bullets, derivations, past questions with papers, marks and exact text), then re-run the brief.

## 1. Plan (write it down before any code)

A short table per segment:

| Segment | Videos | Native role | Notes |
|---|---|---|---|
| 1/3 Terms | opener + 2–4 | Engineer | one idea per video; every beat gets a what-and-why line (rule 40) |
| 2/3 Derivation | one per item in `derivations` | Tutor | rule 33 maths; X → R expansion; boxed result; meaning |
| 3/3 Big picture | one per item in `bigPicture` | Lecturer | `answer()` for theory, `solve()` for numericals; textbook form (rule 41) |

Reuse existing videos that already meet the rules (check them against this recipe). Rewrite the rest. Surplus videos go to `extras`, never deleted (rule 8).

## 2. Write the native scripts

- Files: derivations in `src/content/video/t<topic>.jsx` (4.1: `t41.jsx`), model answers in `picture.jsx`, terms videos where they live (or a new `t<topic>.jsx` section). Wire them in `src/content/topics.jsx` (`terms`, `derive`, `picture`, `introRoles`).
- Opener (rules 4–6): the topic name, 2–3 question beats, and the hook naming the Big-picture questions with their real counts.
- Every beat: `say` (roman Gen-Z Nepali) + `voice` (Devanagari with resting points, rule 28b). Caption = screen (rule 31). No filler (rule 32). Vary connectors (rule 42). Asks sit on the teaching beat (rule 11) and stand alone (rule 10).
- Numbers: compute every value with a quick `python3 -c` or `node -e` and keep the command's output in your notes. Every wrong option must really be wrong.

## 3. Write every role (rule 43, rule 44)

For **every** main video outside Big picture, opener included, add the three non-native roles in `src/content/video/roles<topic>.jsx` with `addRoles(video, { role: role(beats, board) })` (the opener via `topic({ introRoles })`). Copy the helpers from `roles41.jsx`.

- **Same material, different explanation (rule 44).** A role version covers the same definitions, equations, results and conclusions as the native script. Only the way it explains changes (register, examples, order of why/how, traps, memory tricks). Never drop a key result. `topic.mjs` warns when a role misses a native `eq`/`answer` line.
- **Big picture is the Lecturer's, always (rule 44).** Big-picture videos (the past IOE questions) get **no** role versions; the player locks them to the Lecturer and offers only the White/Blue theme. Put the care into the Lecturer's textbook answer instead (pov-lecturer), and check it in both themes.
- Each role follows its skill's lesson shape, phrase bank and voice register, on a board of its own (no drawing timed to other beats).

## 4. Visuals and motion

- Native videos: drawings per `visuals.md` (kit parts, doodles only in the opener, bookish figures in Big picture, rule 35). Motion per `animation.md` (cue to the word, M11).
- Labels sized for the widest font (rule 39). Check figures in every role's look.

## 5. Verify (all must pass before reporting)

```bash
node .claude/skills/video-studio/scripts/lint.mjs <num> --main           # 0 errors, all role versions included
node .claude/skills/video-studio/scripts/topic.mjs <num> --check         # exit 0 = game-ready; read every "!" warning
npx vite build && npx vite preview --port 4182
node .claude/skills/video-studio/scripts/frame-strip.mjs "<title words>" --frames 6   # every changed native video
node .claude/skills/video-studio/scripts/anim-once.mjs <screen> [--pov <role>]          # nothing animates twice (M16)
node .claude/skills/video-studio/scripts/fit-check.mjs <num>                              # nothing cut/overlapping, every beat × role × size (0 problems)
```
For role versions, screenshot with `localStorage dcm-pov = "<role>"` (see the `pov.mjs`-style snippet: `page.addInitScript(() => localStorage.setItem('dcm-pov', '"tutor"'))`), at least one video per role, and every Big-picture video in both Lecturer themes (`localStorage dcm-lecturer-theme = "blue"`). Open every PNG and look: nothing overlapping, text readable, the question card on top in Big picture, the green ring on the part.

## 6. Voice and render (only with the user's yes)

`topic.mjs` prints the characters for every unrecorded line, role versions included. Give the user that number. Record only after they say yes (rule 25), as whole takes (rule 27). Role versions need the recorder to support `variants` and each role's `voice` settings. Until then, say they are caption-only. Render MP4s after the voice (rule 29).

## 7. Finish

1. Update `references/topics.json` if scope or papers changed. Add any new rule the user gave to the owning reference or role skill.
2. Changelog line in SKILL.md.
3. Commit and push to `main`.
4. Report: what was made (videos per segment × roles), which past questions are answered, what was verified (lint, gate, the strips you looked at), the credits needed, and anything not done (with the reason).

## Flexibility: what the user may ask instead

| The user says | Do |
|---|---|
| "generate 4.x" / "make 4.x ready" | the whole recipe |
| "only the derivation of 4.x" / "only Big picture" | steps 1–5 for that segment, all roles |
| "only the Tutor for 4.x" | step 3 for that role across all videos of the topic |
| "with audio" | steps 1–5, then the estimate and **ask** before recording (never skip the yes) |
| "no audio" / "captions only" | stop after step 5 (rule 38) |
| "add a role, e.g. Classmate" | add it to `src/content/pov.js` (id, name, role, ref, look, voice), create `.claude/skills/pov-<id>/SKILL.md` from an existing role skill, then add that role to every finished topic (it becomes required by `topic.mjs`) |
| "a topic outside Unit 4" | add the unit's topics to `topics.json` from `vault/` first. The recipe is the same |
| "redo 4.x in a new style" | change the role skills or rules first, then regenerate. The gate keeps the structure |

If `vault/` has no past question for a topic (`topics.json` `gap`), do not invent one. Use the closest real past question that the topic's method answers, say so in the video's board tag, and tell the user.
