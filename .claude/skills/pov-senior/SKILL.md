---
name: pov-senior
description: The Senior role for the DC Motors videos, an IOE senior (dai/didi) who cleared the exam and tells juniors what to write for each mark, how often a question came, the trap examiners catch, and a memory trick, on a clean off-white page. It owns the script, sound, look (clean), animation, lesson shape and video format for this role. Use it when writing, editing, voicing or reviewing a video or variant taught by the Senior (`pov: 'senior'` or `variants.senior`) in Terms or Derivation (Big picture is always the Lecturer). It works inside the video-studio skill.
---

# Role: Senior (dai/didi)

**Who is speaking:** an IOE senior who passed this paper, talking to juniors the night before the exam. The question is what earns marks, not what the theory is. The Senior assumes the Lecturer's answer exists and turns it into a plan.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'senior'`, look `clean`).

## How the Senior speaks

- Casual Gen-Z Nepali, but no hype (rule 32): "Six marks ko lagi yati lekhe pugcha."
- Always facts from `vault/`: how many times the question came, which years, the marks split.
- Exactly one trap per video (the mistake that loses marks) and one memory trick (an acronym or a picture).
- Never invents a marking scheme. It splits the paper's own marks (e.g. [2 + 4]) by what the question asks.

## Lesson shape (~40–60 s, 4–5 beats)

1. **The plan** (1 beat): count, years, marks ("tin choti aayo, 2 + 4 marks").
2. **Mark by mark** (1–2 beats): for each part of the marks, exactly what to write and draw.
3. **Trap** (1 beat, `trap` line), with an `ask` that tests it.
4. **Memory trick** (1 beat, `hook` line).

## Phrase bank

**Use when** you are giving juniors a plan without repeating yourself.

QUICK PICKS
- Senior ko plan: …
- Yati lekhe pugcha.
- Yo nabirsa: …

MARKS
- Pahila … marks: …
- Ani … marks: …
- Figure banayo bhane …

TRAPS
- Trap: …
- … lekhyo bhane marks katcha.

MEMORY
- Yaad garne tarika: …
- … jastai.

Use each connector at most twice in a video (rule 42).

## Look and animation

- Look `clean`: off-white page, Inter, the palette's own inks. Board-only by default: `h` plan, `note` papers, `step` per mark, `trap`, `hook`.
- Simple motion: lines write themselves, the marker underlines them. No figures, unless the trap is a figure mistake.

## Sound

- Voice settings: `pov.js` → `senior.voice` (stability 0.8, style 0.35, speed 1.05): livelier and a touch faster.

## Variants

A Senior version always has its own beats (it is a different telling). Examples: the Senior versions in `src/content/video/roles41.jsx` (marks plans, traps, memory tricks).

## Not in Big picture (rule 44)

Big picture is always taught by the Lecturer (the player locks it). This role has no versions of Big-picture videos; its exam help goes into Terms and Derivation.

## Checklist

- [ ] Same material as the native script (rule 44). `topic.mjs <num> --check` passes, and its "!" warnings have been read.
- [ ] The count, years and marks match `vault/`.
- [ ] Every mark has a concrete "write this / draw this".
- [ ] One trap with an ask that tests it, and one memory trick.
- [ ] Frame strip with `dcm-pov = "senior"`: the board is readable.

When the user corrects this role, add the rule here, with a dated line in video-studio's changelog.
