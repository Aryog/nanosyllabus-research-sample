---
name: pov-efficient
description: The Maths POV (The Efficient Engineer style) for the DC Motors videos. It covers the script, sound, look, animation, lesson shape and video format for the figure-first telling, where symbols live on a clean diagram, colours carry from the picture to the equation, and the result is interpreted. Use it when writing, editing, voicing or reviewing a video or variant in the Maths POV (`pov: 'efficient'` or `variants.efficient`). It works inside the video-studio skill.
---

# POV: Maths (The Efficient Engineer)

**The idea:** every symbol is first a thing on the figure. The equation is then built from the figure, in the same colours, and ends with what it means physically.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'efficient'`, look `clean`: an off-white page, Inter, KaTeX maths and the palette's own inks).

## Lesson shape (~60–90 s)

1. **Model** (1 beat): a clean figure of the one element that matters (one conductor on the armature, one loop).
2. **Label the figure** (1–2 beats): each symbol appears *on the figure* in its colour (r, l, I_c orange, B blue, F green).
3. **Build the equation** (2–4 beats): a compact board beside the figure, every term in the colour of its label, with substitution via X → R.
4. **Result and meaning** (1–2 beats): boxed result, then the proportionality or a limiting case. Check the units.

## Script

- Precise and calm, with no analogy unless it is the model itself.
- The caption names the symbol and where it is ("radius r, centre bata conductor samma").
- The board is compact: at most about 6 lines beside the figure. Merge definitions into one row with `\qquad`.

## Phrase bank

**Use when** you tie a symbol on the figure to the equation.

QUICK PICKS
- Figure ma …
- Yo … ho, jaslai … le dekhaucha.
- Aba yo … equation ma rakhchau.

BUILDING
- … ra … ko product …
- … ko thau ma … halda …
- Arthat …

INTERPRETING
- Yesko matlab …
- … badhyo bhane … pani badhcha.
- Unit check: …

Use each connector at most twice in a video (rule 42).

## Look and visuals

- Look `clean`. Diagrams are thin and flat: plain circles and arrows in palette inks, no gradients, labels next to the part.
- The colour of a symbol on the figure equals its colour in the maths (rule 33d).
- The figure sits beside the board (`split`), with the drawing kept under ~340×220 viewBox units.

## Animation

- The symbol appears on the figure on the beat that names it (`s.on(k)`), and its board term arrives on the same beat.
- The green ring goes on the figure part while its term is written (`s.hl(k)`).
- X → R expansion on the board (rule 33c).

## Sound

- Voice settings: `pov.js` → `efficient.voice` (stability 1.0, style 0.1, speed 0.95): steady and precise.

## Writing a Maths variant

The usual variant has the same beats, a figure and a compact board, so it needs no new voice. Example: `torqueDerivation.variants.efficient` in `src/content/video/t41.jsx` (the `lever` figure).

## Checklist

- [ ] Every symbol in the equation appears on the figure first, in the same colour.
- [ ] The board has 6 lines or fewer and reads at 1280 px beside the figure.
- [ ] The result is boxed and followed by its meaning, with the units checked.
- [ ] Frame strip in Maths (`dcm-pov = "efficient"`): nothing overlaps, and the text is not tiny.

When the user corrects this POV, add the rule here, with a dated line in video-studio's changelog.
