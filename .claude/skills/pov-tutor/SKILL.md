---
name: pov-tutor
description: The Tutor role for the DC Motors videos, a private tutor teaching one student, patiently, with why before how, working each step on the same textbook page as the Lecturer (Poppins, Blue or White). It owns the script, sound, animation, lesson shape and video format for this role, and is the default for 1/3 Terms and 2/3 Derivation. Use it when writing, editing, voicing or reviewing a video or variant taught by the Tutor (`pov: 'tutor'` or `variants.tutor`). It works inside the video-studio skill.
---

# Role: Tutor

**Who is speaking:** a private tutor sitting with one student. The tutor goes at the student's pace, says *why* before *how*, writes every step by hand, and stops where students usually get lost.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'tutor'`).

## How the Tutor speaks

- Says "timi" and "hami" together ("Aba hami B halchau"), warm but exact.
- Names the usual confusion before it happens: "Yaha dherai le r cancel garna birsanchan."
- Checks understanding with an `ask` on the beat that taught it (rule 11): a quick ratio or small number, never a recall of wording.
- No hype (rule 32). Thinking aloud is fine; filler is not.

## Lesson shape (one derivation or worked example, ~70–100 s)

1. **What we want** (1 beat): the result we are after, plus the symbols (`note` line).
2. **One physical step per beat:** name the quantity, say why, then write it.
3. **Substitute visibly:** the term pulses (`X`), then its expansion drops in (`R`) (rule 33c).
4. **Box the result** (`eq`).
5. **What it means**, plus a quick `ask`.

Worked numbers (like the story video's tutor variant) take one moment per beat: the line, then its arithmetic in an aligned block.

## Phrase bank

**Use when** you walk the board from one row to the next.

QUICK PICKS
- Aba hami … halchau.
- Yesko matlab …
- Arthat …
- Hera, …

STEP TO STEP
- Yasari …
- Tyaspachi …
- Yo thau ma … rakhda …
- Dubai side lai … le multiply garda …

WHERE STUDENTS SLIP
- Yaha dherai le … birsanchan.
- Dhyan deu: … (only before a real trap)

RESULT
- Result: …
- Phalswarup …

Use each connector at most twice in a video (rule 42).

## Look and animation

- In Derivation, the same page as the Lecturer: the textbook form in Poppins, Blue by default or White, board text on the left and the book figure on the right (`src/content/unit4/figs.jsx`). In Terms (segment 1) the Tutor is playful: 3D objects and real-life examples an 8th-grader knows (rule 7). Never a handwritten font, a navy board, emoji or cartoon faces.
- Write each video as a `duo()` with the Lecturer: same beats, one figure; parts of the figure come in on the beat that names them. Point-wise lines, one "=" per row, X → R expansions in derivations.

## Sound

- Voice settings: `pov.js` → `tutor.voice` (stability 0.85, style 0.3, speed 0.95): warmer and a little slower.
- Formulas are read in chunks with dash pauses (rule 28b).

## Variants

The usual Tutor variant keeps the same beats with a handwritten board (no new voice). Example: `story.variants.tutor` in `src/content/video/ch4.jsx`.

## Not in Big picture (rule 44)

Big picture is always taught by the Lecturer (the player locks it). This role has no versions of Big-picture videos; its exam help goes into Terms and Derivation.

## Checklist

- [ ] Same material as the native script (rule 44). `topic.mjs <num> --check` passes, and its "!" warnings have been read.
- [ ] Every step has a why, and nothing is skipped between rows.
- [ ] Every substitution uses X → R; two "=" never share a row.
- [ ] Every ask sits on a teaching beat and checks understanding.
- [ ] Frame strip with `dcm-pov-<segment> = "tutor"`: the text is readable, and the columns are balanced.

When the user corrects this role, add the rule here, with a dated line in video-studio's changelog.
