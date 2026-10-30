---
name: pov-lecturer
description: The Lecturer role for the DC Motors videos, a formal college lecturer who teaches the answer as IOE marks it, written like an Indian textbook (Q., underlined headings, "Let, …", numbered equations, ∴, a boxed result, "Hence proved", numbered figures). It owns the script, sound, look (Book), animation, lesson shape and video format for this role, and is the default for 3/3 Big picture. Use it when writing, editing, voicing or reviewing a model answer, a textbook derivation or any video or variant taught by the Lecturer (`pov: 'lecturer'` or `variants.lecturer`). It works inside the video-studio skill.
---

# Role: Lecturer

**Who is speaking:** a college lecturer in front of the class. The tone is formal and complete, and the answer is exactly the page a student will write in the IOE exam. Students will not open a textbook, so this video *is* the textbook answer.

All `video-studio` house rules apply. Registry: `src/content/pov.js` (`id: 'lecturer'`, look `book`, visual reference Science Ready / Indian textbook).

## How the Lecturer speaks

- Says "hami" ("Aba hami torque equation derive garchau"), never "timi" or "bro".
- Gives the definition in exam wording, then expands it. The caption reads the point in Nepali and says the equation numbers ("equation tin").
- No analogies or jokes. Every sentence is something a student could write down.

## Answer shape (`answer()` in kit.jsx; `pov: 'lecturer'` is set there)

1. **Q.** the real IOE question, with papers and marks from `vault/`.
2. **Underlined headings** per part, matched to the marks (`H` helper in `picture.jsx`).
3. **Definitions in exam wording**, with the key sentence in italics.
4. **Derivation:** start with "Let," and list every symbol with its unit. Then one relation per row, numbered on the right (`&& \cdots(1)`), and refer back to the numbers.
5. **Result:** "∴" plus `\boxed{…} \qquad \cdots(n)`, then "**Hence proved.**" when a derivation was asked.
6. **Figure:** numbered, captioned, cited in the text, drawn the bookish way (rule 35).
7. **Exam tip** (`tip`): what to write and draw for full marks.
8. Long answers turn the page with `page: true` (rule 36).

## Phrase bank

**Use when** you read a textbook answer aloud without sounding repetitive.

QUICK PICKS
- Let: …
- Yesko matlab …
- Yasari …
- Hence proved.

REFERRING
- Equation … anusar …
- Equation … bata …
- Figure … ma …

LISTS
- Significance ek, … · dui, … · tin, …
- Pahilo point …, dosro …

CONCLUDING
- Phalswarup …
- Yahi karan …
- Exam tip: …

Use each connector at most twice in a video (rule 42).

## Look and animation

- Look `book`: white page, serif text and maths, underlined bold headings, flush-left text, aligned blocks indented with numbers on the right, a thin-bordered boxed result, "Q." before the question.
- Figures: thin black outlines, plain ⊗/⊙, labels on leader lines, numbered italic caption, no fills (rules 35, 39).
- Calm motion: each point writes itself, the part it names comes in with the green ring, and page turns keep the question. Final rows are shown with no term-expanding drops.

## Sound

- Voice settings: `pov.js` → `lecturer.voice` (stability 1.0, style 0.0, speed 1.0), the plainest and most even read.
- Read English question text as written, and equation numbers in English ("इक्वेसन थ्री").

## Variants

A Lecturer version of a derivation has its own beats: heading → "Let," list → numbered rows → boxed result with "Hence proved". Example: `backEmfDerivation.variants.lecturer` in `src/content/video/t41.jsx`.

## Same material for the other roles (rule 44)

The Lecturer's model answer is the reference content for the Big picture. Tutor, Engineer and Senior versions must cover every one of its points and open with the same question card, so keep the points explicit (one per beat).

## Checklist

- [ ] Same material as the native script (rule 44). `topic.mjs <num> --check` passes, and its "!" warnings have been read.
- [ ] The question, papers and marks match `vault/`.
- [ ] Headings are underlined, every symbol is in "Let,", and equations are numbered and referred back to.
- [ ] The result is boxed with ∴, plus "Hence proved" where it applies.
- [ ] The figure is numbered, cited and bookish, with no overlaps in any role's look.
- [ ] Frame strip with `dcm-pov = "lecturer"`: each page is readable at 1280 px.

When the user corrects this role, add the rule here, with a dated line in video-studio's changelog.
