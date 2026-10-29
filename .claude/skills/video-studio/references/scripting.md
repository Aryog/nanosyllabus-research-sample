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

3. Each micro-topic is `topic({ num, title, intro, terms, derive, picture })` in three segments: 1/3 Terms ra definitions → 2/3 Derivation → 3/3 Big picture (a real IOE question solved as a video).
4. Segment 1 opens with `overview(num, title, beats)`: about three short voiced beats. Beat 0 writes the topic **number** (e.g. `4.1`) as the heading and the title under it. Each later beat writes a question the topic will answer ("Motor kina ghumcha?", "Back EMF k ho?"). It is a preview, not a summary: no formulas, results or conclusions, and never a list of the three segments.
5. The opener names the topic ("Losses ra efficiency topic suru garau."), never "yo topic". Each beat is one short sentence, and the whole opener runs about 10–15 s.
6. The opener's last beat is the hook. It promises the topic's final IOE question and says how often it was asked ("Ani last ma, IOE ma tin choti aayeko question … sangai solve garchau. Antya samma hera!"), shown as a `hook` board line ("★ Last ma: IOE ma 3 choti aayeko question"). Use the real paper count of that topic's Big-picture video, and name the year when it was asked once.
7. Segment 1 (Terms ra definitions) is explained as if to a 5-year-old. Every video in it has a `draw` picture made of kid-simple doodles from `src/content/video/doodles.jsx` (everyday objects, thick round strokes, a face on the motor, a little motion such as a spinning fan). Use one picture per beat (`s.on(k, k)`) so each idea gets its own image, and add new doodles to `doodles.jsx` instead of drawing one-offs.
8. Surplus videos go in `extras` (optional practice) and are never deleted.

## House rules: questions inside videos

9. Teach before test: a question may only ask what an earlier beat already explained.
10. A question stands on its own, like an exam question. It never points back at the video ("… bhanyo?", "… bhaniyo?", "k bhaneko?", "kun sanga dajaiyo?", "X jastai kun?"); ask the concept itself ("Start garne instant ma current kati huncha?"), and the Devanagari voice matches. It ends as a full question, never a stem trailing off with "…" ("Torque…" → "Torque kati huncha?").
11. A lead-in beat that only cues a question says `La, yo answer gara.` / voice `ल, यो आन्सर गर।`. Never use filler like "Ekchin, dhyan check", "Bharkhar ko kura", "Ekchoti socha ta", "Dhyan diyera herya?" or "Feri recall", and question text never starts with "Bharkhar bhaneko:". Lead-ins that carry content ("Aba naya back EMF.") stay.
12. Question cards carry no "Dhyan check 👀" or "Ekchin socha 🤔" tag. Only informative tags (IOE paper, "Quick check", etc.) are allowed.
13. Every question card has **↺ Rewatch** before answering. After an answer the video goes on by itself after 2 s; rewinding before a question asks it again (answers are not kept); XP is given only for the first try.

## Writing the voice line (see voice-audio.md for recording)

- `voice` says the same thing as `say`, in Devanagari, with English terms spelled out the way they sound: "टर्क इक्वेसन", "आई ए", "जिरो पोइन्ट वान फाइभ नाइन". Write numbers as words when the reading matters.
- `spoken()` in `voice.js` turns symbols into words (⊙ dot, φ phi, ∝ is proportional to, Ia → "I a" …). Add a mapping there rather than misspelling a caption, but know that this changes keys for every line that uses the symbol.
- Resting points and pacing are rule 28b (voice-audio.md). Each beat is under about 35 words; split a longer one into two beats.

## Templates

Lead-in plus question:
```jsx
{ say: 'La, yo answer gara.', voice: 'ल, यो आन्सर गर।',
  ask: { tag: 'Quick check', q: 'Start garne instant ma back EMF kati huncha?',
         voice: 'स्टार्ट गर्ने इन्स्ट्यान्टमा ब्याक इएमएफ कति हुन्छ?',
         options: ['Zero', 'V jati', 'Ia Ra jati'], answer: 0,
         why: 'N = 0 bhaye Eb = PφZN/60A = 0.' } },
```

Graph step board line (rule 19):
```jsx
{ at: 3, kind: 'step', node: <>Graph: φ constant, so <K>{String.raw`T_a \propto I_a`}</K> → origin bata sidha line</> },
```

## Before you hand over a script

- Run `lint.mjs <topic>`: no errors.
- Check every number with a quick node or python calculation, and make sure every wrong option is really wrong.
- The real IOE question and its year or count come from `vault/` (Question Bank), cited in the board `tag`.
