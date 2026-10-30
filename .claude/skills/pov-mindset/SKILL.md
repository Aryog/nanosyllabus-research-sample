---
name: pov-mindset
description: The Mindset POV (The Engineering Mindset style) for the DC Motors videos. It covers the script, sound, look, animation, lesson shape and video format for the real-machine-first telling on the brand-blue field. It is the default for 1/3 Terms ra definitions. Use it when writing, editing, voicing or reviewing a video or variant in the Mindset POV (`pov: 'mindset'` or `variants.mindset`). It works inside the video-studio skill.
---

# POV: Mindset (The Engineering Mindset)

**The idea:** show the real machine first, then open it up and show how it works. Students should see the motor before they see any symbol.

The house rules of `video-studio` all apply (Gen-Z Nepali, credits, one clock, teach before test, said = shown). This skill adds what is specific to this POV. Registry: `src/content/pov.js` (`id: 'mindset'`, look `blue`).

## Lesson shape (one video, ~60–90 s)

1. **Where you meet it** (1 beat): a real object that has this part (phone vibrator, lift, e-car).
2. **Open it up** (1–2 beats): the part on screen, solid 2.5D or 3D, each piece named as it appears.
3. **How it works** (2–4 beats): one physical step per beat (field → current → force → turning). Current, field and force move as flowing dashes and arrows.
4. **Check** (an `ask` on the last teaching beat): one conceptual question, no numbers.
5. **Takeaway** (`idea` line): one sentence.

## Script

- Short spoken sentences, present tense, one idea each, at most ~30 words per beat.
- Every beat writes one what-and-why line in words (rule 40): "Speed ↑ → Eb ↑ → Ia ↓".
- At most one analogy per video (treadmill, cruise control). No hype (rule 32).

## Phrase bank

**Use when** you move from one step to the next without repeating "tesaile".

QUICK PICKS
- Aba hera, … (opening a part)
- Yasari …
- Yesko matlab …
- Ani …

CAUSE → EFFECT
- Phalswarup …
- Yahi karan …
- Tyasbata …
- Jasle garda …

NAMING A PART
- Yo bhag lai … bhanincha.
- Yaha … cha, jun … garcha.

ENDING
- Chhoto ma: …
- Yaad rakha: …

Use each connector at most twice in a video (rule 42).

## Look and visuals

- Look `blue`: brand-blue field, white ink, palette inks repainted (`looks.js`).
- Solid 2.5D kit parts (`Pole`, `Conductor`, `Rotor`, `Shadow`) or a 3D build (`motor3d.js`). No doodles here; doodles belong to the opener.
- Labels sit near the part on leader lines, with few words on screen.

## Animation

- Parts arrive as they are named (M11). Current flows as dashes, faster for more current (M15). The motor spins up from rest (M14).
- 3D when turning explains (M9): one camera shot per beat.
- Focus: the green ring on the part, the rest softens (rule 18). No hand (rule 39).

## Sound

- Voice settings in `pov.js` → `mindset.voice` (stability 1.0, style 0.15, speed 1.0): calm and even.
- Rest before each named part: "— आर्मेचर". Comma after openers (rule 28b).
- Recording follows voice-audio.md, as one whole take. Estimate first and ask the user.

## Writing a Mindset variant

```jsx
variants: {
  mindset: { draw: picture, viewBox: '0 0 360 220', board: [...] },  // same beats: no new voice
  // or with its own beats (new captions, new voice later)
}
```
Prefer the same beats with a new picture and board, because that costs no credits. Write new beats only when the telling really differs.

## Checklist

- [ ] The real object comes first, and every part on screen is named in the caption.
- [ ] Each beat has its what-and-why line, and the ask sits on a teaching beat.
- [ ] Frame strip in Mindset (`dcm-pov = "mindset"`): nothing overlaps, and the ring is on the part.
- [ ] Lint is clean for the topic, including `[mindset]` variants.

When the user corrects this POV, add the rule here, with a dated line in video-studio's changelog.
