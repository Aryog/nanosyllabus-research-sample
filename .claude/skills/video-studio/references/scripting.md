# Scripting: topics, videos, beats, board, questions

## The data model

```
topics.jsx  topic({ num, title, intro, introArt?, terms, derive, picture, extras? })
              └─ segments(): 1/3 terms → [silent title card] 2/3 derive → [card] 3/3 picture
                   └─ steps; most are video(title, props) → Scene
journey.jsx  joins the topics, adds chapter "4.1 · <title>" to every step (scripts read the topic from it)
```

A video's `props`:

```jsx
video('Derivation: torque equation', {
  tall: true,                       // long board (derivations, solves)
  viewBox: '0 0 360 220',           // drawing area, if there is a draw
  draw: (s) => <>…svg…</>,          // see visuals.md and animation.md
  three: buildMotor,                // instead of draw: 3D (animation.md)
  notes: true,                      // a drawing beside notes, shown whole
  beats: [
    { say: 'roman caption', voice: 'देवनागरी आवाज', ms?: 4000,
      ask?: { tag?, q, voice, options: [...], answer: 0, why } },
  ],
  board: [{ at: 2, kind: 'step', node: <>…</> }],   // line written on beat `at`
})
```

- **Beat**: one idea and one caption. `say` is shown; `voice` is spoken and recorded. A beat without `voice` falls back to `say` (only for silent or English lines, so avoid it).
- **ask**: the video pauses on the question after the beat's line. Its `voice` is recorded with the beat (as `beatText` = voice + ask.voice), so editing the question changes that clip.
- **Board kinds** (`kind`): `h` heading · `step` derivation or teaching line · `eq` boxed result equation (blue, centred) · `note` muted aside · `idea` 💡 key idea (violet script) · `q` question card · `given` data · `find` "Nikalnu parne" (red) · `answer` (green, centred) · `trap` exam trap (red) · `hook` memory hook (green script). Default is plain text.
- **Math**: `<K>{String.raw`T_a = 0.159\,\phi Z I_a`}</K>` (KaTeX). Colour terms with `\textcolor{#d9480f}{…}` (`C.orange`); show cancels with `\cancel{l}`. `<D>…</D>` highlights data inside a question.

## Helpers (kit.jsx)

| Helper | Use for | Shape |
|---|---|---|
| `overview(num, title, beats, art?)` | the topic opener (via `topic({ intro, introArt })`) | beats `{ say, voice, lines: [{ kind, node }] }` |
| `video(title, props)` | every normal video | above |
| `solve({ title?, paper, paperVoice?, marks, read, readVoice?, question, given, find, idea, steps, answer, trap? })` | a past IOE **numerical**, solved | read → data → find → idea → steps (each may `ask`) → answer → trap |
| `answer(title, { papers, marks, q, read, points, tip?, draw?, viewBox? })` | a past IOE **theory** question as a model answer | beat 0 the question, beat k point k |
| `extra(step)` | practice video, kept out of the main path | via `topic({ extras })` |
| `hook(big, lines)`, `model(props)` | non-video cards (rare) | |

Keep about 90% of screens as videos, and put questions inside videos as `ask` beats.

## House rules: language and tone

1. Everything is in Gen-Z Nepali: roman Nepali on screen (`say`, board, questions), Devanagari in `voice` for TTS. Technical terms, numbers, formulas and real IOE question text stay in English.
2. Fun but not jokey: one everyday analogy per idea, and at most one emoji per board.

## House rules: structure

3. Each micro-topic is `topic({ num, title, intro, terms, derive, picture })` in three segments: 1/3 Terms ra definitions → 2/3 Derivation (every equation the syllabus bullet needs, rule 34) → 3/3 Big picture (the topic's real IOE questions as model answers, rule 36).
4. Segment 1 opens with `overview(num, title, beats)`: about three short voiced beats. Beat 0 writes the topic **number** (e.g. `4.1`) as the heading and the title under it. Each later beat writes a question the topic will answer ("Motor kina ghumcha?", "Back EMF k ho?"). It is a preview, not a summary: no formulas, results or conclusions, and never a list of the three segments.
5. The opener names the topic ("Losses ra efficiency topic suru garau."), never "yo topic". Each beat is one short sentence, and the whole opener runs about 10–15 s.
6. The opener's last beat is the hook. It names the topic's Big-picture IOE questions and how often each was asked ("Last ma, IOE ka duita question solve garchau: working principle ra torque equation, ra back EMF ko role. Dubai tin-tin choti sodhiyeka chan."), shown as a `hook` board line ("★ Last ma: IOE ka 2 question, dubai 3 choti sodhiyeka"). Use the real paper counts from `vault/`, and name the year when a question was asked once. No "Antya samma hera!" (rule 32).
7. **Segment 1 is playful, for an 8th-grader** (user, 2026-10-30). Terms ra definitions is not bookish: each idea is shown with a 3D object (`three`, `src/content/video/motor3d.js`, rule 21) or a real-life example an 8th-grader knows (a ceiling fan, a mixer grinder, a bicycle dynamo, a magnet and a nail), even one from outside the motor, as long as it makes the term click. Then name the term and its symbol. One example per idea, one picture per beat (`s.on(k, k)`). Never emoji or cartoon faces (no "Motor-dai"). Segments 2 and 3 stay bookish (rules 35, 48–50).
8. Surplus videos go in `extras` (optional practice) and are never deleted.

## House rules: questions inside videos

9. Teach before test: a question may only ask what an earlier beat already explained.
10. A question stands on its own, like an exam question. It never points back at the video ("… bhanyo?", "… bhaniyo?", "k bhaneko?", "kun sanga dajaiyo?", "X jastai kun?"); ask the concept itself ("Start garne instant ma current kati huncha?"), and the Devanagari voice matches. It ends as a full question, never a stem trailing off with "…" ("Torque…" → "Torque kati huncha?").
11. **No lead-in-only beats** (replaced by rule 32). A question is attached (`ask`) to the content beat that taught it, so the video pauses right after that line. Never write a beat that only cues a question ("La, yo answer gara.", "Ekchin, dhyan check", "Euta term baki cha.") and never start question text with "Bharkhar bhaneko:". Older topics still have `La, yo answer gara.` beats; remove them whenever that topic is rewritten.
12. Question cards carry no "Dhyan check 👀" or "Ekchin socha 🤔" tag. Only informative tags (IOE paper, "Quick check", etc.) are allowed.
13. Every question card has **↺ Rewatch** before answering. After an answer the video goes on by itself after 2 s; rewinding before a question asks it again (answers are not kept); XP is given only for the first try.

## House rules: script quality (set 2026-10-30)

40. **Terms segment explains in words too.** Every beat of a segment-1 video also writes one short board line saying what happens and why, as a chain ("Start ma N = 0 → E_b = 0 → current dherai thulo"). A line may retire after its beat (`until`) when the picture needs the room; the last beat writes the takeaway as an `idea`.
31. **What is said is what is shown.** Every beat writes one board line or brings in / highlights one part, and its caption reads that line or names that part, in the same order. Nothing appears that the caption does not name, and the caption never names something that is not on screen ("Derivation segment 2 mai garyau" over a formula is wrong: read the formula). In a model answer the caption is the Nepali reading of that point, no more.
32. **Professional, no filler.** A teacher's register: state, define, derive, conclude. No hype or exclamations ("dami!", "Ekdam smart", "Simple cha", "Full marks pakka!", "Antya samma hera!", "Yo line box gara!"), no "Yo hera" openers, no lead-in-only beats (rule 11). One everyday analogy per idea is still fine in segment 1 (rule 2). `lint.mjs` flags these words.
33. **Maths layout.** (a) A chain with more than one "=" is an `aligned` block with one "=" per row, aligned at "=" (`\begin{aligned} F &= … \\ &= … \end{aligned}`); never two "=" on one row. (b) Each derivation step is `step(label, tex)`: a short English label on its own line, the maths under it. (c) **Expansion is animated**: wrap the term about to be replaced in `X(term, colour)` and what it becomes on a later row in `R(expr, colour, n)` (helpers in `t41.jsx`, KaTeX `\htmlClass`). Once the line is written the term pulses, then each expansion drops into its place in order (n = 1, 2, …), in the same colour. Never stack an underbrace inside a fraction; keep `\underbrace` only for naming a term ("input", "Cu loss"). (d) One colour per quantity for the whole video (flux/B/E_b blue, current orange, counts and results green, time and per-path violet); cancels are `\cancel{}` (struck in red). (e) Units stay outside: `\text{N}\cdot\text{m}` (never a unicode "·" inside `\text`, KaTeX shows it red).
34. **Derivation segment is complete and taught like Khan Academy + The Efficient Engineer.** Segment 2 has one video per equation the syllabus bullet needs (4.1: back EMF equation → voltage and power equation → torque by force → torque by power), not one. Each video: name every symbol first (board `note`), one physical step per beat with *why* before *how*, substitute visibly (rule 33c), box the result (`eq`), then one line on what it means for a given machine (proportionality) and, where useful, a second method or a quick numerical `ask`. The board grows like a notebook from the top left and is written as it is said.
36. **Big picture = every IOE question of the topic.** When the topic has two distinct past IOE questions, the Big picture has two model-answer videos (`answer()`), one per question, each with its real papers and marks from `vault/`. A long answer turns the page with `page: true` on the point where a new part starts (derivation, roles), so the text stays big. The figure is bookish (rule 35).

41. **Exam answers are textbook answers.** A Big-picture model answer is the page a student will write in the IOE exam: "Q." with papers and marks, underlined headings per part (`H` in `picture.jsx`), definitions in exam wording, "Let," with every symbol and unit, one relation per row numbered on the right (`&& \cdots(1)`) and referred back to, "∴" and a `\boxed{}` result, "Hence proved." when a derivation was asked, and a numbered figure cited in the text. The details live in the `pov-lecturer` skill.
42. **Don't sound repetitive.** Within one video no connector ("tesaile", "yasari", "yesko matlab", "phalswarup", "yahi karan", "aba", "ani") appears more than twice in captions. Pick from the role's phrase bank (each `pov-*` skill), and change the Devanagari `voice` with it. `lint.mjs` warns past two.
43. **POVs are roles; variants are other roles teaching the same video.** Each video has a native role (`pov:`, else the segment's: Tutor, Tutor, Lecturer) and may carry `variants` for other roles (see SKILL.md "POVs"). The role decides how it speaks (Lecturer formal, textbook wording; Tutor patient "timi/hami", why before how). Prefer variants that reuse the lines with a new board or figure (no credits); write new `beats` when the role tells it differently (Lecturer derivations). Every variant follows its role's skill and passes lint and a frame strip in that role. A topic is done only when each of its main videos outside Big picture (opener included) exists in both roles; write it as one `duo()` (Tutor + Lecturer, same beats, one figure) in `src/content/unit4/u<topic>.jsx`.

44. **Same material, different explanation; Big picture is the Lecturer's.** A role version teaches exactly the native script's material (definitions, equations, results, conclusions); only the way it is explained changes. **Big picture is always the past IOE questions, always taught by the Lecturer**: every Big-picture video answers a real question from `references/topics.json` (`answer()` or `solve()`, never a plain concept video), opens with the question card (kind `q` at beat 0, papers + marks in the tag, exact text), and has **no role versions**. The player locks the role there; the viewer can only switch the Lecturer's theme (White = Book, Blue). `topic.mjs --check` fails a Big-picture video without the card or with role versions, and warns when a role elsewhere drops a native key result.

## Writing the voice line (see voice-audio.md for recording)

- `voice` says the same thing as `say`, in Devanagari, with English terms spelled out the way they sound: "टर्क इक्वेसन", "आई ए", "जिरो पोइन्ट वान फाइभ नाइन". Write numbers as words when the reading matters.
- `spoken()` in `voice.js` turns symbols into words (⊙ dot, φ phi, ∝ is proportional to, Ia → "I a" …). Add a mapping there rather than misspelling a caption, but know that this changes keys for every line that uses the symbol.
- Resting points and pacing are rule 28b (voice-audio.md). Each beat is under about 35 words; split a longer one into two beats.

## Templates

Question on the beat that taught it (rule 11):
```jsx
{ say: 'Switch on. Armature ghumeko chaina, tesaile back EMF zero. Current V over R a, arthat 440 ampere.',
  voice: 'स्विच अन। आर्मेचर घुमेको छैन, त्यसैले ब्याक इएमएफ जिरो। करेन्ट — भी ओभर आर ए, अर्थात फोर हन्ड्रेड फोर्टी एम्पियर।',
  ask: { tag: 'Quick check', q: 'Start garne instant ma back EMF kati huncha?',
         voice: 'स्टार्ट गर्ने इन्स्ट्यान्टमा ब्याक इएमएफ कति हुन्छ?',
         options: ['Zero', 'V jati', 'Ia Ra jati'], answer: 0,
         why: 'N = 0 bhaye Eb = PφZN/60A = 0.' } },
```

Derivation step (rule 33): label above, aligned maths, one "=" per row, the term that expands marked with `X`, its expansion with `R`:
```jsx
{ at: 3, kind: 'step', node: step('Force on one conductor', String.raw`F = ${X('B', BL)}\;${X('I_c', OR)}\;l`) },
{ at: 4, kind: 'step', node: step('Substitute',
  String.raw`\begin{aligned} F &= ${R(String.raw`\dfrac{P\phi}{2\pi r \cancel{l}}`, BL, 1)} \cdot ${R(String.raw`\dfrac{I_a}{A}`, OR, 2)} \cdot \cancel{l} \\ &= \dfrac{P\phi I_a}{2\pi r A} \end{aligned}`) },
```
(`step(label, tex)` and the ink constants are in `src/content/video/t41.jsx`.)

Graph step board line (rule 19):
```jsx
{ at: 3, kind: 'step', node: <>Graph: φ constant, so <K>{String.raw`T_a \propto I_a`}</K> → origin bata sidha line</> },
```

## Before you hand over a script

- Run `lint.mjs <topic>`: no errors.
- Check every number with a quick node or python calculation, and make sure every wrong option is really wrong.
- The real IOE question and its year or count come from `vault/` (Question Bank), cited in the board `tag`.

47. **Say what it is; don't point at nothing.** Never "yaha bata aaucha", "baki sabai yahi bata", "yaha dherai le…" or "hera" as filler. "Yaha/tyaha/hera" are allowed only when the figure shows that exact part on that beat; otherwise name it ("MNA mai commutator le…", "Dherai le confuse garchan"). Lint: "… bata aau…" is an error, other pointing words a warning.

48. **Point-wise, not paragraphs.** A board line holds one short claim (about 12 words at most); several claims go in a `Pts` list (`kit.jsx`). Captions stay under about 30 words. No emoji anywhere, no "Exam tip" lines, no cartoon faces or doodles; the opener shows the topic's book figure.
51. **Say what each symbol is called** (user, 2026-10-30, like a "shear modulus" call-out). The player does this by itself: in a one-row boxed equation (an `'eq'` line written with `tex()`/`<K>`), every symbol listed in `src/content/terms.js` gets an italic label under the box with a curved leader line to it, the first time that symbol appears in the video. When the row doesn't fit (phones, long equations) it becomes a "where Eb back EMF · P no. of poles …" list. To label a new symbol, add it to `TERMS`; never write the names into the equation by hand. Aligned derivation blocks are not labelled.
52. **After a question, a tone, not a voice.** Answering an in-video question plays a short soft tone (a rising chime when correct, a muted low pair when wrong; `react()` in Scene.jsx), and the card says "Correct." or "Not quite." followed by the why. Never a spoken "Sahi ho" or similar.
50. **Big-picture space follows the marks.** Head each part of a model answer "(a) … [marks]" and give it about one point per mark (a [4 + 2] question: four points for (a), two for (b)). Read the marks split aloud on the question beat. No exam-tip beat.

