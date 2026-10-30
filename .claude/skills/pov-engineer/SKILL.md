---
name: pov-engineer
description: The Engineer role for the DC Motors videos, a practising engineer who starts from the real machine and its model and works with numbers and units, on the brand-blue field (The Engineering Mindset visuals, The Efficient Engineer figure-first maths). It owns the script, sound, look (blue), animation, lesson shape and video format for this role, and is the default for 1/3 Terms ra definitions. Use it when writing, editing, voicing or reviewing a video or variant taught by the Engineer (`pov: 'engineer'` or `variants.engineer`). It works inside the video-studio skill.
---

# Role: Engineer

**Who is speaking:** a practising engineer showing a junior the machine. The real motor comes first, then the model of its one part that matters, with each symbol placed on that model, then the numbers a site would see.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'engineer'`, look `blue`, visual references The Engineering Mindset and The Efficient Engineer).

## How the Engineer speaks

- Short, practical sentences in the present tense: "Switch on garda 440 ampere tancha." Units are always said.
- Ties every idea to what happens on a real machine: heating, the starter, the speed under load.
- At most one analogy per video. No hype (rule 32).

## Lesson shape (~60–90 s)

1. **Where you meet it** (1 beat): the real object (phone vibrator, lift, e-car, workshop motor).
2. **Open it up** (1–2 beats): the part in solid 2.5D or 3D, each piece named as it appears.
3. **Model it** (for maths): a clean figure of one element, with symbols placed on it in their colours (r, l, I_c orange, B blue, F green). The equation is built beside it in the same colours.
4. **How it behaves** (2–3 beats): one physical step per beat, and a real number with units.
5. **Check** (`ask` on the last teaching beat), then a **takeaway** (`idea`).

Every Terms beat writes one what-and-why line (rule 40).

## Phrase bank

**Use when** you move from the machine to the model to the number.

QUICK PICKS
- Real machine ma …
- Figure ma …
- Yasari …
- Yesko matlab …

CAUSE → EFFECT
- Phalswarup …
- Yahi karan …
- Jasle garda …

NUMBERS
- … ampere tancha / … volt baki huncha.
- Unit check: …

ENDING
- Site ma yaad rakha: …

Use each connector at most twice in a video (rule 42).

## Look and animation

- Look `blue`: brand-blue field, white ink, palette inks repainted (`looks.js`). The maths uses the board font (rule 39).
- Solid kit parts (`Pole`, `Conductor`, `Rotor`, `Shadow`) or a 3D build (`motor3d.js`). Model figures are thin and flat, with labels next to the part.
- Parts arrive as they are named (M11). Current flows as dashes, faster for more current (M15). Motors spin up from rest (M14). 3D is used when turning explains (M9). The green ring marks the part (rule 18).

## Sound

- Voice settings: `pov.js` → `engineer.voice` (stability 1.0, style 0.15, speed 1.0): calm and even.
- Rest before each named part ("— आर्मेचर") and before each number.

## Variants

The usual Engineer variant keeps the same beats with a model figure and a compact board (no new voice). Example: `torqueDerivation.variants.engineer` in `src/content/video/t41.jsx` (the `lever` figure).

## Not in Big picture (rule 44)

Big picture is always taught by the Lecturer (the player locks it). This role has no versions of Big-picture videos; its exam help goes into Terms and Derivation.

## Checklist

- [ ] Same material as the native script (rule 44). `topic.mjs <num> --check` passes, and its "!" warnings have been read.
- [ ] The real object comes first, and every symbol appears on the figure before it is used in the equation.
- [ ] The figure's colour of each symbol matches its colour in the equation, and units are said.
- [ ] The board beside the figure has 6 lines or fewer.
- [ ] Frame strip with `dcm-pov = "engineer"`: nothing overlaps, and the ring is on the part.

When the user corrects this role, add the rule here, with a dated line in video-studio's changelog.
