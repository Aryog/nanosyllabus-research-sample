---
name: topic-studio
description: Generate a whole DC Motors micro-topic game-ready from just its number or name ("generate 4.3", "make losses and efficiency ready", "do topic 4.5"): every segment (opener, Terms, Derivation, Big picture of real past IOE questions), every video in both teaching roles (Tutor and Lecturer), lint, the topic gate, frame strips, the credit estimate, and commit. It is an alias that loads the video-studio skill's generate-a-topic recipe.
---

# Topic studio → video studio

Read `.claude/skills/video-studio/SKILL.md` ("Generate topic X") and follow
`.claude/skills/video-studio/references/topic-recipe.md` from step 0 to step 7.
Start with `node .claude/skills/video-studio/scripts/topic.mjs <num>`, and
finish only when `topic.mjs <num> --check` exits 0.
Add new rules to video-studio or the role skills, not here.
