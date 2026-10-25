---
name: lesson-studio
description: Run the three course-quality agents (content-quality, presentation-quality, question-pacing) in parallel over the DC Motors lessons, then integrate, regenerate audio and verify. Use when asked to review, improve, or extend the course content, interactivity, or question flow.
---

# Lesson studio

Three specialist agents live in `.claude/agents/`:

| Agent | Owns | Writes to |
|---|---|---|
| `content-quality` | correctness, IOE syllabus coverage, real past questions from `vault/` | `src/content/lessons/*.jsx` (text/answers), `vault/dc-motor-digest.md` |
| `presentation-quality` | interactivity & visuals, Brilliant fidelity | `src/interactives/*.jsx`, `src/styles.css`, Figure wiring in lessons |
| `question-pacing` | how many questions, order, difficulty, spacing, retries | step order / question count in lessons, `LessonPlayer.jsx` adaptivity |

## Procedure
1. `scripts/vault-sync.sh` if `vault/` is missing or stale (needs the `nano_syllabus_actions` SSH key).
2. Launch all three agents **in one message** (parallel). To avoid edit collisions, give each a lesson-file or file-type lane; the pacing agent goes last on any file the others touch, or works on a disjoint set.
3. When all report back: reconcile conflicts, run `npm run build`, then `npm run audio` if `narration.js` changed.
4. Sweep every screen headlessly (load `?l=<lesson>&s=<step>` for all steps, fail on console errors) and screenshot changed screens.
5. Summarize to the user: what each agent changed, open issues.
