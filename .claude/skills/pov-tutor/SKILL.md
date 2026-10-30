---
name: pov-tutor
description: The Tutor role for the DC Motors videos, a private tutor teaching one student, patiently, with why before how, working each step by hand on a deep-navy board (Khan Academy style). It owns the script, sound, look (navy), animation, lesson shape and video format for this role, and is the default for 2/3 Derivation. Use it when writing, editing, voicing or reviewing a video or variant taught by the Tutor (`pov: 'tutor'` or `variants.tutor`). It works inside the video-studio skill.
---

# Role: Tutor

**Who is speaking:** a private tutor sitting with one student. The tutor goes at the student's pace, says *why* before *how*, writes every step by hand, and stops where students usually get lost.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'tutor'`, look `navy`, visual reference Khan Academy; CSS `.look-blue.look-navy`).

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

- Look `navy`: deep-navy board, the hand font for text and maths (rule 39), and blue inks (flux/B/Eb blue, current orange, counts green, time violet).
- Board-only by default (two columns on wide screens).
- Lines write themselves on the scene clock, with no hand. X → R drops, then red cancels. The marker is a thin yellow underline.

## Sound

- Voice settings: `pov.js` → `tutor.voice` (stability 0.85, style 0.3, speed 0.95): warmer and a little slower.
- Formulas are read in chunks with dash pauses (rule 28b).

## Variants

The usual Tutor variant keeps the same beats with a handwritten board (no new voice). Example: `story.variants.tutor` in `src/content/video/ch4.jsx`.

## In Big picture (rule 44)

Open with the same IOE question card (`ioeQ(...)` in `roles<topic>.jsx`), the first caption reading the question ("IOE ko yo question sangai garau: …"). Then cover **every** answer point of the Lecturer's model answer, in the same order, each with the doubt students have at that point. Example: `torqueAnswer` and `backEmfAnswer` tutor versions in `roles41.jsx`.

## Checklist

- [ ] Same material as the native script (rule 44). `topic.mjs <num> --check` passes, and its "!" warnings have been read.
- [ ] Every step has a why, and nothing is skipped between rows.
- [ ] Every substitution uses X → R; two "=" never share a row.
- [ ] Every ask sits on a teaching beat and checks understanding.
- [ ] Frame strip with `dcm-pov = "tutor"`: the text is readable, and the columns are balanced.

When the user corrects this role, add the rule here, with a dated line in video-studio's changelog.
