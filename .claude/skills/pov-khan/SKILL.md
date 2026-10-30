---
name: pov-khan
description: The Board POV (Khan Academy style) for the DC Motors videos. It covers the script, sound, look, animation, lesson shape and video format for the handwritten, step-by-step telling on a deep-navy board. It is the default for 2/3 Derivation. Use it when writing, editing, voicing or reviewing a video or variant in the Board POV (`pov: 'khan'` or `variants.khan`). It works inside the video-studio skill.
---

# POV: Board (Khan Academy)

**The idea:** a teacher thinking aloud at the board, with why before how, writing each step as it is said.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'khan'`, look `navy`, which is the blue inks on a navy board with the hand font; CSS `.look-blue.look-navy`).

## Lesson shape (one derivation, ~70–100 s)

1. **What we want** (1 beat): the result we are after, plus the symbols (`note` line).
2. **One physical step per beat:** name the quantity, then say why it is what it is, then write it.
3. **Substitute visibly:** the term pulses (`X`), then its expansion drops in (`R`) (rule 33c).
4. **Box the result** (`eq`).
5. **What it means:** the proportionality for a given machine, plus a quick `ask` (often a ratio or a small number).

## Script

- Conversational but exact: "Euta revolution ma …", "Aba … halchau".
- Say the maths in chunks with resting points (rule 28b). The caption reads the line being written (rule 31).
- One "=" per row, aligned at "=" (rule 33a), with a label above each step (`step(label, tex)`).

## Phrase bank

**Use when** you walk the board from one row to the next.

QUICK PICKS
- Aba … halchau.
- Yesko matlab …
- Arthat …
- Hera, …

STEP TO STEP
- Yasari …
- Tyaspachi …
- Yo thau ma … rakhda …
- Dubai side lai … le multiply garda …

CANCEL / SIMPLIFY
- … cancel huncha.
- Baki rahancha …

RESULT
- Result: …
- Phalswarup …
- Given machine ma … constant, yesko matlab …

Use each connector at most twice in a video (rule 42).

## Look and visuals

- Look `navy`: deep-navy gradient, the hand font for text *and* maths (rule 39), and blue inks: flux/B/Eb blue, current orange, counts green, time violet.
- Board-only by default (two columns on wide screens). Add a drawing only when a symbol needs a place to live. That is the Maths POV's job.

## Animation

- Lines write themselves row by row on the scene clock; no hand.
- Terms expanding: `X(term)` pulses after the line is written, then `R(expr, c, n)` drops in, in order (rule 33c). Cancels strike in red after the drop.
- The marker is a thin underline under the new line (`--mark`, yellow on navy).

## Sound

- Voice settings: `pov.js` → `khan.voice` (stability 0.85, style 0.3, speed 0.95): a little warmer and slower, like thinking aloud.
- Formulas read in chunks: "टी ए इक्वल्स — पी फाइ जेड आई ए, ओभर टु पाइ ए".

## Writing a Board variant

Same beats plus a handwritten board is the usual variant (no new voice), for example the story video's worked numbers:
```jsx
variants: { khan: { draw: undefined, tall: true, board: [ { at: 1, kind: 'step', node: <>Start: <K>{…aligned…}</K></> }, … ] } }
```

## Checklist

- [ ] Every step has a why, and nothing is skipped between rows.
- [ ] Every substitution uses X → R, and no underbrace sits inside a fraction.
- [ ] Two "=" never share a row (lint rule 33).
- [ ] Frame strip in Board (`dcm-pov = "khan"`): the text is readable, and the columns are balanced.

When the user corrects this POV, add the rule here, with a dated line in video-studio's changelog.
