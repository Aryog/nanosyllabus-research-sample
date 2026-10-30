---
name: pov-exam
description: The Exam POV (Science Ready style, written like an Indian textbook answer) for the DC Motors videos. It covers the script, sound, look, animation, lesson shape and video format for the answer students will write in the IOE exam: underlined headings, "Let, …", numbered equations, ∴, a boxed result, "Hence proved" and numbered figures. It is the default for 3/3 Big picture. Use it when writing, editing, voicing or reviewing a model answer, an exam-style derivation or any video or variant in the Exam POV (`pov: 'exam'` or `variants.exam`). It works inside the video-studio skill.
---

# POV: Exam (Science Ready, Indian textbook answer)

**The idea:** this is the page students will reproduce in the exam. They will not open a textbook, so the video *is* the textbook answer, written the way IOE marks it.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'exam'`, look `book`: white page, black serif ink, thin rules).

## Answer shape (model answer, `answer()` in kit.jsx)

1. **Q.** the real IOE question, with papers and marks from `vault/` (the board `q` line shows "Q." in the Book look).
2. **Underlined headings** for each part, matched to the marks: Working principle · Working (Fig. 1) · Function of commutator · Torque equation · Note. Use the `H` helper in `picture.jsx`.
3. **Definitions in exam wording**, the key sentence in italics: *"when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force"*.
4. **Derivation:** start with "Let," and list every symbol with its unit. Then one relation per row, each numbered on the right, `&& \cdots(1)`. Refer back to the numbers ("from (3)", "multiplying (2) by Iₐ").
5. **Result:** "∴ …" and `\boxed{…} \qquad \cdots(n)`. End with "**Hence proved.**" where a derivation was asked.
6. **Figure:** numbered and captioned ("Fig. 1 Forces on the armature conductors"), cited in the text, and drawn the bookish way (rule 35).
7. **Exam tip** (`tip`): what to write and draw for full marks.
8. Long answers turn the page with `page: true` (rule 36).

## Script (captions)

- The caption reads the point in Nepali, closely following the English line, and says the equation numbers ("equation tin").
- Same register as the page: definition → expression → significance (i), (ii), (iii).
- At most ~35 words per beat. Split a long point into two points rather than cramming.

## Phrase bank

**Use when** you read an answer page aloud without sounding repetitive.

QUICK PICKS
- Let: …
- Yesko matlab …
- Yasari …
- Hence proved.

REFERRING
- Equation … anusar …
- Equation … bata …
- Figure … ma …

SIGNIFICANCE / LISTS
- Significance ek, … · dui, … · tin, …
- Pahilo point …, dosro …

CONCLUDING
- Phalswarup …
- Yahi karan …
- Exam tip: …

Use each connector at most twice in a video (rule 42).

## Look and visuals

- Look `book`: serif text and KaTeX serif maths, underlined bold headings, text flush left, aligned blocks indented and numbered on the right, a thin-bordered boxed result.
- Figures: thin black outlines, plain ⊗/⊙, labels on leader lines, numbered italic caption, no colour fills (rule 35). Labels are sized for the widest font (rule 39).

## Animation

- Calm: each point writes itself, and the figure part it names comes in (`s.on(k)`) with the green ring.
- No term-expanding drops in answers: the exam page shows the final rows. The underline marker is in the Book accent.
- Page turns (`page: true`) clear the earlier points and keep the question.

## Sound

- Voice settings: `pov.js` → `exam.voice` (stability 1.0, style 0.0, speed 1.0): the plainest and most even read.
- Read English question text as written. Read equation numbers in English ("इक्वेसन थ्री").

## Writing an Exam variant of a derivation

Give it its own beats (it is a different telling): heading → "Let," list → numbered rows → boxed result with "Hence proved". Example: `backEmfDerivation.variants.exam` in `src/content/video/t41.jsx`.

## Checklist

- [ ] The question, papers and marks match `vault/`.
- [ ] Headings are underlined, every symbol is in "Let,", equations are numbered on the right and referred back to.
- [ ] The result is boxed with ∴, plus "Hence proved" where it applies.
- [ ] The figure is numbered, cited, bookish, with no overlaps in Book or any other POV.
- [ ] Frame strip in Exam (`dcm-pov = "exam"`): each page is readable at 1280 px.

When the user corrects this POV, add the rule here, with a dated line in video-studio's changelog.
