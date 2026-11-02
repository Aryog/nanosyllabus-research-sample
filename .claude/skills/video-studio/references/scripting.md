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

3. Each micro-topic is `topic({ num, title, opener, terms: [], derive, picture })` in three segments (names: user, 2026-11-01): 1/3 **Basic Understanding** (`opener`: one duo, rule 7) → 2/3 **Syllabus Content** (`derive`: the definition and working videos first, then every equation the syllabus bullet needs, rule 34) → 3/3 **Model Answer** (`picture`: the topic's real IOE questions as model answers, rule 36).
4. *(Old topics only; their openers now live in `extras`.)* Segment 1 opened with `overview(num, title, beats)`: about three short voiced beats. Beat 0 writes the topic **number** (e.g. `4.1`) as the heading and the title under it. Each later beat writes a question the topic will answer ("Motor kina ghumcha?", "Back EMF k ho?"). It is a preview, not a summary: no formulas, results or conclusions, and never a list of the three segments.
5. The opener names the topic ("Losses ra efficiency topic suru garau."), never "yo topic". Each beat is one short sentence, and the whole opener runs about 10–15 s.
6. The opener's last beat is the hook. It names the topic's Big-picture IOE questions and how often each was asked ("Last ma, IOE ka duita question solve garchau: working principle ra torque equation, ra back EMF ko role. Dubai tin-tin choti sodhiyeka chan."), shown as a `hook` board line ("★ Last ma: IOE ka 2 question, dubai 3 choti sodhiyeka"). Use the real paper counts from `vault/`, and name the year when a question was asked once. No "Antya samma hera!" (rule 32).
7. **Segment 1, Basic Understanding: one minute of intuition, no maths** (user, 2026-11-01, replacing the 2026-10-30 "playful Terms" rule). ONE `duo()` per topic titled `"<num> · Basic understanding: <question>?"`, about 60 s per telling (75 s at most, `topic.mjs --check`), 7–9 beats, over `motorTour(plan)` (`src/content/unit4/basics3d.js`). Each beat shows one part or one idea and says, like for a kid, what it is and what it does, with an everyday comparison; the technical name comes after the picture. **No maths, no equations, no symbols** (`=`, `φ`, `Eb`, `Ia`, …) on the board or in the caption (`lint.mjs` error); the derivations come in Syllabus Content. No IOE hook and no list of segments. At most one `ask`. Never emoji or cartoon faces. The full recipe, parts, plan keys and example plans: [basic-understanding.md](basic-understanding.md). Segments 2 and 3 stay bookish (rules 35, 48–50).
8. Surplus videos go in `extras` (optional practice) and are never deleted.

## House rules: questions inside videos

9. Teach before test: a question may only ask what an earlier beat already explained.
10. A question stands on its own, like an exam question. It never points back at the video ("… bhanyo?", "… bhaniyo?", "k bhaneko?", "kun sanga dajaiyo?", "X jastai kun?"); ask the concept itself ("Start garne instant ma current kati huncha?"), and the Devanagari voice matches. It ends as a full question, never a stem trailing off with "…" ("Torque…" → "Torque kati huncha?").
11. **No lead-in-only beats** (replaced by rule 32). A question is attached (`ask`) to the content beat that taught it, so the video pauses right after that line. Never write a beat that only cues a question ("La, yo answer gara.", "Ekchin, dhyan check", "Euta term baki cha.") and never start question text with "Bharkhar bhaneko:". Older topics still have `La, yo answer gara.` beats; remove them whenever that topic is rewritten.
12. Question cards carry no "Dhyan check 👀" or "Ekchin socha 🤔" tag. Only informative tags (IOE paper, "Quick check", etc.) are allowed.
13. Every question card has **↺ Rewatch** before answering. After an answer the video goes on by itself after 2 s; rewinding before a question asks it again (answers are not kept); XP is given only for the first try.

## House rules: script quality (set 2026-10-30)

40. **Basic Understanding explains in words too.** Every beat of a segment-1 video also writes one short board line saying what happens and why, as a chain ("Start ma N = 0 → E_b = 0 → current dherai thulo"). A line may retire after its beat (`until`) when the picture needs the room; the last beat writes the takeaway as an `idea`.
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
53. **Every short form has its full form, once per video** (user, 2026-11-01: "MNA bujhiyena"). The player adds it: the first `DC`, `EMF`, `MNA`, `GNA`, `NVC`, `OLR`, `KVL`, `AC` or `rpm` in a video becomes "EMF (Electro-Motive Force)", once on the board and once in the captions (`src/content/abbr.js`, `withAbbr` in `Scene.jsx`). Maths and the question card are not touched. Write short forms plainly in `say` and board lines; for a new one, add it to `ABBR` (full form + spaced Devanagari spelling). In Basic Understanding prefer the plain words ("No-Volt Coil").
52. **After a question, a tone, not a voice.** Answering an in-video question plays a short soft tone (a rising chime when correct, a muted low pair when wrong; `react()` in Scene.jsx), and the card says "Correct." or "Not quite." followed by the why. Never a spoken "Sahi ho" or similar.
50. **Big-picture space follows the marks.** Head each part of a model answer "(a) … [marks]" and give it about one point per mark (a [4 + 2] question: four points for (a), two for (b)). Read the marks split aloud on the question beat. No exam-tip beat.


54. **Numbers in `voice` never collide with a short form.** Spell numbers the way they are read, never as English digit words that spell a short form joined: 180° is "एक सय असी", not "वान एटी" (`एटी` = AT, lint error 28c); 80–90° is "असी देखि नब्बे". When lint flags a joined short form inside a number, rewrite the number in Nepali words.
55. **One maths row fits the board.** A row of board maths holds one "=" (rule 33) and at most about 30 visible characters; never chain "⇒", "\quad" clauses or a long product of fractions on one row. Split into an `aligned` block (define long sub-terms such as `Z_2 = \sqrt{R_2^2+(sX_2)^2}` on their own row, then use `Z_2`). `scripts/eqsplit.py <file>` splits "a = b = c" rows mechanically (it leaves `\quad` rows and boxed rows for you); lint warns on rows that are still too wide (rule 55).
56. **Basic Understanding boards say relations in words.** No "=", "≈", "∝", "Φ", "→ ∝" or symbols on a segment-1 board, in either telling, the Lecturer's included ("Copper loss grows with the square of load", "Best when the two losses are equal"). Arrows "→" and "·" are fine. Lint: rule 7 error.
57. **Every topic, every unit, the same shape.** A micro-topic is: one Basic Understanding duo (7–8 beats, ≤ 75 s) → Syllabus Content duos, at least one per `derivations` item in `topics.json`, each 5 beats over one book figure → Model Answer: one `answer()` or `solve()` per `bigPicture` item, the question text copied exactly into `q` (the gate matches its first 40 characters). Theory questions use `answer()` with `(a) … [marks]` heads; numericals use `solve()` with every number recomputed. Reuse the topic's figure in its answers (`figAt` when the beat order differs).
58. **Write numericals from the vault exactly, compute them yourself.** The OCR of `vault/…/Question Bank` is noisy: restore the question text carefully (units, decimals, subscripts), keep the paper name ("2073 Chaitra", "2071 (Old Back)", "2082 Baishakh (ECM)"), and never invent marks that the paper does not show (leave `marks` empty). Put the recomputation in the unit file's header comment (`units/u*.jsx`).

## House rules: canvas plan, branches, symbols (user, 2026-11-02)

59. **"Under a pole" is "N pole ko prabhav ma"** (in Devanagari "एन पोलको प्रभावमा"), never "N muni" / "N ko muni". Board text in English may say "under the N pole". Lint: error.
60. **Titles are plain English, content is roman Nepali.** A topic's title is its IOE syllabus bullets, exactly, joined with " · " (`topics.json` `syllabus`), never merged into a made-up phrase; every video title (Basic understanding questions, derivations, model answers, IOE numericals) is English. Lint: error on roman Nepali words in a title.
61. **Units stand apart from the formula.** After a symbolic expression write `\unit{weber}` (KaTeX macro in `kit.jsx`): the full SI name in brackets, italic, muted ("dΦ = Pφ (weber)"). A number keeps its short unit ("440 A"). Lint: error on `\text{Wb}`-style units right after a symbol.
62. **Syllabus Content and Model Answer are bookish notes, no 3D.** Segments 2 and 3 use book figures only (`figs.jsx`, `picture.jsx`); 3D lives in Basic Understanding. Take the content from `vault/…/Electrical Machines/Notes` first (KBT Insights on EM) and cover what the past questions ask; never drop a detail to save time. Lint: error on `three` outside segment 1.
63. **Plan the canvas before writing** (user: "thinking ahead … how to manage the content in the canvas … the main priority"). Every Syllabus Content video follows one plan, written in its header comment:
    - **Top:** heading (or the IOE question card in Model Answer, always in full).
    - **First board line: a "Remember" card** (`rem(…)`, kind `recall`): what must already be known (Faraday, KVL, F = BIl, "rpm = revolutions per minute"), before the first new idea.
    - **Left:** the main line; **right:** the book figure.
    - **Branch scenes** (`br(title, node, until)`, kind `branch`): every intermediate term that would otherwise "come from nowhere" (dt = 60/N, why Pφ, why Z/A, I<sub>c</sub> = I<sub>a</sub>/A, 2πrl, 0.159 = 1/2π, 9.55 = 60/2π, work = F·2πr, KVL, MNA, Fleming's rule, long vs short shunt) gets a ~5 s side scene: it takes the figure's place for its beat, the caption explains it, then the next beat says "main line ma farkau" and continues. Branch again as often as needed. Lint: a branch needs a title and a main beat after it.
    - **Planned page turns** (`page: true` on the beat) where the board would overflow, and **carried results** (`{ carry: <>…</> }` as the 4th item of a line, or `carry` on an `answer()` point / `solve()` step): a short line that stays on later pages, so step (b) still sees I<sub>a</sub>, (1), (2) from step (a). Model answers split into two chunks: part (a), page turn, part (b) with (a)'s results carried.
64. **One symbol, one meaning, one case, in every unit.** The symbol table is `src/content/sym.jsx` (`SUBS`) and `src/content/terms.js` (names): P poles, φ flux per pole, Φ flux cut, Z conductors, A parallel paths, N rpm, t time, I current (never inertia: J is moment of inertia), W watt/loss (work is written "Work"), Eb, Ia, Ic, Ra, Ta, Tsh, Pm. Write plain "Eb", "E b", "Ia²Ra" in captions, questions and figure labels: the player sets the subscripts (`sym`, `symTree`). Name every symbol in a "Let," line or a `note` before its first use, and never switch case (A paths is never "a").
65. **Professional Nepali.** A teacher's register: "Maanau, …", "Smaran garau", "Main line ma farkau", "arthat", "phalswarup"; never "let gareko", "N ko muni", slang or half-English filler.
66. **Basic Understanding boards have one fixed shape** (user, 2026-11-02: "the mind can't keep the structure"). Parts are `part(name, job)`: numbered, the name bold, its job under it, under the label "Parts and their jobs". Steps of the mechanism are `chain(step)`: one link per line on a rail, under "How it works". The takeaway is the last `idea`. A part name is at most two words; anything longer is a chain step. Arrow chains break only after an arrow (`keepSteps` in `sym.jsx`). A 3D video's board is one column beside the model, never newspaper columns.
67. **The IOE question card is a full-width top row** above the answer and its figure: line 1 the papers (red, uppercase) with the marks as a yellow chip, line 2 the question text. There is no title chip over the picture; the bar names the chapter.
68. **One micro-topic per IOE syllabus bullet, in syllabus order** (user, 2026-11-02). The bullet's exact text is the topic title; its Basic Understanding, Syllabus Content and Model Answer cover that bullet only (a teaser of the next bullet is fine, its teaching is not). A derivation that needs a later bullet's result moves to that later topic (4.1's torque-by-power needs E_b, so it lives in 4.2). A Model Answer is a real past question for that bullet; when the vault has none, use the closest real question the bullet's method answers and say so (`gap` in topics.json); only when no question in any of the three vault question banks comes close (2.1 transformer construction) may the Model Answer use an exam-style question, labelled "Exam-style" on the card and in the read beat, with the `gap` recorded and the user told.
