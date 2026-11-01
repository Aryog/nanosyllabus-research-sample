# Segment 1, Basic Understanding: the full recipe

Basic Understanding is the first segment of every micro-topic. It is about **one minute** of intuition, told like it is for a kid: what each part **is**, what it **does**, and why. It has no maths. Its job is to make the terms that later confuse students (armature, coil, commutator, brush, field coil, starter, No-Volt Coil…) familiar *before* Syllabus Content derives anything, so the derivation reads like "oh, that part".

User direction, 2026-11-01 (verbatim gist): *"first section is all about intuitive learning, no math, no complex things, just intuitive knowledge, curiosity, visualize. Explain now, visually, intuitively, like for a kid, the terms that will confuse later: what is the armature, what is the coil, what is the commutator, what is the starter, so the derivation is enjoyable later. 3 minutes → 1 minute."*

All six Unit 4 topics follow this recipe; **`src/content/unit4/basics.jsx` is the worked example** (copy its shape, not its words).

---

## 1. The three segments (names are fixed)

| # | Key in `topic()` | Shown as | What goes in | Taught by |
|---|---|---|---|---|
| 1/3 | `opener` (+ `terms: []`) | **Basic Understanding** | ONE `duo()` video, ~60 s, 3D, no maths | Tutor (default) + Lecturer |
| 2/3 | `derive` | **Syllabus Content** | every syllabus bullet with its maths: the definition/working videos first (the old "Terms" videos), then each `Derivation: …` | Tutor (default) + Lecturer |
| 3/3 | `picture` | **Model Answer** | the topic's real past IOE questions, `answer()` / `solve()` | Lecturer only (locked) |

The labels live in `SEGMENTS` (`src/content/video/kit.jsx`) and `SEG` (`src/App.jsx`). The code keys (`terms`, `derive`, `picture`) and the chips' `1/3 · …` prefixes stay; scripts select segments by the prefix.

Wiring in `src/content/topics.jsx`:

```jsx
const t44 = topic({
  num: '4.4',
  title: 'Starting: 3-point ra 4-point starter',
  opener: basics44,                              // segment 1: the one Basic Understanding video
  terms: [],                                     // always empty now
  derive: [need44, starterR44, three44, four44], // segment 2: definitions/working first, then derivations
  picture: [starterAnswer44],                    // segment 3
  extras: [opener44, vibe44, …],                 // the old opener is kept here (rule 8: never delete)
});
```

## 2. Hard limits (lint and the gate enforce them)

| Limit | Value | Checked by |
|---|---|---|
| Videos in segment 1 | exactly 1, titled `"<num> · Basic understanding: <question>"` | `topic.mjs --check` |
| Length per telling | about 60 s, **75 s at most** (estimate: 300 ms + 80 ms per spoken character, per beat) | `topic.mjs --check` |
| Maths | none: no `<K>`, no `'eq'` line, no `=` `≈` `∝` `φ` `η` `ω` `τ`, no symbol names (`Eb`, `Ia`, `Ra`, `Ta`, `BIl`, …) in captions or board | `lint.mjs` (error) |
| Beats | 7–9; one part or one idea per beat | review |
| Caption | ≤ ~20 words; voice ≈ 70–95 Devanagari characters | review (budget below) |
| Questions | at most one `ask`, on the beat that taught it, about an idea (not a number) | `lint.mjs` rules 9–12 |

**Time budget.** A beat lasts ≈ `0.3 s + 0.08 s × spoken characters`. 60 s over 8 beats ⇒ ~7.5 s a beat ⇒ ~90 spoken characters of `voice`. Measure, don't guess:

```bash
node .claude/skills/video-studio/scripts/topic.mjs 4.4 --check   # prints "[tutor] 65 s", "[lecturer] 62 s"
```

If a telling is over 75 s, shorten sentences (drop "ani", "pani", repeated subjects) before dropping a beat.

## 3. Writing the story (8 beats is the usual shape)

1. **Hook, beat 0.** A question or everyday picture a 13-year-old knows ("Fan, mixer, e-rickshaw: sabai motor le ghumchan."). Board: `['h', '<num> · <curious question>?']` plus one `step` line.
2. **One part per beat.** Name it in plain words, say what it looks like, then what it does: *"Bich ma ghumne falam ko drum: yo armature ho, motor ko ghumne bhag."* The technical name comes **after** the picture has made sense.
3. **Everyday comparisons**, one per idea: bicycle pedals (couple), heater wire (copper loss), a flood/bādh (inrush current), a door that opens slowly (starter), a bicycle wheel coasting to a stop (retardation).
4. **Cause → effect chains** in words, not symbols: "Magnet kamjor → jhan chito".
5. **The surprise** (curiosity): the counter-intuitive fact the topic hinges on (weaker field ⇒ faster; series motor with no load runs away; a spinning motor pushes back on the battery).
6. **Last beat** writes the takeaway as an `idea` line.
7. **No hook to IOE questions, no list of segments, no "yo topic".** The Model Answer segment names the papers.

Words to use instead of symbols: *dhakka* (force/push), *ulto dhakka* (back EMF, then name it), *magnet ko bal* (flux), *ghumai* (rotation/torque), *taato* (heat/loss), *bato* (current path), *khudkila* (resistance steps).

### Both tellings (`duo`)

Same beat count, same plan, same parts named on the same beat.

| | Tutor | Lecturer |
|---|---|---|
| Register | "timi/hami", warm, everyday words, comparisons | formal Nepali, the proper names (field winding, excitation, rheostat, rotational losses) |
| Still | no maths | no maths |
| Example, 4.2 beat 2 | "Shunt motor ma field coil le battery bata aafnai chhuttai bato lincha." | "Shunt motor ma field winding armature sanga parallel ma jodincha." |

### Beat template

```jsx
{
  say: 'Aagadi tama ko tukra-tukra ring: commutator. Carbon ko brush le yasma current pugaucha.',
  voice: 'अगाडि तामाको टुक्रा-टुक्रा रिङ — कम्युटेटर। कार्बनको ब्रसले यसमा करेन्ट पुर्‍याउँछ।',
  lines: [['step', <>Commutator: tukra-tukra ring · brush: current dine carbon</>]],
},
```

With a question (the only one in the video):

```jsx
{
  say: 'Magnet kamjor banau: ulto dhakka banauna motor lai jhan chito ghumnu parcha. Field ghatda speed badhcha!',
  voice: 'म्याग्नेट कमजोर बनाऔं — उल्टो धक्का बनाउन मोटरलाई झन् छिटो घुम्नु पर्छ। फिल्ड घट्दा स्पिड बढ्छ!',
  lines: [['step', <>Magnet kamjor → jhan chito</>]],
  ask: { q: 'Magnet kamjor banauda motor ko speed k huncha?', voice: 'म्याग्नेट कमजोर बनाउँदा मोटरको स्पिड के हुन्छ?',
         options: ['Badhcha', 'Ghatcha', 'Ustai rahancha'], answer: 0,
         why: 'Kamjor magnet ma utti nai ulto dhakka banauna motor jhan chito ghumnu parcha.' },
},
```

Voice lines follow the voice rules (rule 28b resting points, **rule 28c short forms letter by letter**: `डी सी`, `ई एम एफ`, `एन भी सी`).

## 4. The picture: `motorTour(plan)` (`src/content/unit4/basics3d.js`)

One 3D DC motor, built once. A topic only writes a **plan**: one entry per beat. Keys you leave out keep the previous beat's value, so a beat states only what changes. `labels` never carry over; `focus: null` clears the focus.

```jsx
export const basics44 = duo('4.4 · Basic understanding: starter kina chahincha?', {
  three: motorTour([
    { shot: 'wiring', show: WIRED, open: 0.7, spin: 0, flow: 0 },
    { flow: 1, focus: ['wires', 'battery', 'coil'], labels: [['dherai current', 'wires']] },
    { shot: 'commutator', heat: { coil: 1 }, spark: 1, focus: ['coil', 'brushes', 'commutator'], labels: [['spark', 'brushes']] },
    { shot: 'starter', show: STARTER, wiring: 'none', heat: {}, spark: 0, stud: 1, focus: ['starter'], labels: [['handle', 'handle'], ['resistance', 'studs']] },
    { stud: 5, studMs: 2600, spin: 0.7, focus: ['starter', 'armature'] },
    …
  ]),
  tutor: [/* 8 beats */],
  lecturer: [/* 8 beats */],
});
```

### Parts

| Part | What it is on screen | Kid words |
|---|---|---|
| `yoke` | outer steel frame + feet (`open` makes it see-through) | bahira ko frame |
| `poles` (`north` red, `south` blue) | field poles with curved shoes | magnet |
| `fieldCoil` | copper rings round each pole | pole ma bereko tar |
| `field` | blue arrows N → S (`field` 0–1 also sets the poles' glow) | nadekhine magnetic field |
| `armature` | grey iron drum (turns) | ghumne falam ko drum |
| `coil` | copper bars in the slots + end rings (turns) | tama ko tar |
| `commutator` | copper segments on the shaft, front (turns) | tukra-tukra ring |
| `brushes` | two carbon blocks + springs, top and bottom of the commutator | carbon ko brush |
| `shaft`, `fan` | steel shaft, a 3-blade fan at the back (the load) | |
| `battery`, `wires` | battery with + / −, wire tubes, moving current dots | |
| `starter` (`studs`, `handle`, `nvc`, `olr`) | panel left of the motor, 5 studs with resistance coils, a handle, the No-Volt Coil, the Overload Release | |

Groups for `show`, defined at the top of `basics.jsx`: `MOTOR` (the default), `WIRED` = motor + battery, `STARTER` = wired + starter.

### Plan keys

| Key | Values | Use for |
|---|---|---|
| `shot` | `whole`, `inside`, `front`, `commutator`, `side`, `wiring`, `starter`, `back`, or `[x, y, z]` | camera; glides 1.2 s from the last beat's shot |
| `show` | list of parts | what exists at all |
| `focus` | list of parts / `null` | glow + pulse on these; every other shown part fades to 0.22 (rule 18) |
| `open` | 0–1 | see inside the yoke |
| `spin`, `spinMs` | −1…1 (negative = reverse); ms to reach it (default 900; 6000 = coasting) | speed stories |
| `push` | 0–1 | the two green force arrows on the coil sides (one down, one up) |
| `field` | 0–1 | field arrows + pole glow (0.15 = "weak magnet") |
| `wiring` | `main`, `shunt`, `series`, `compound`, `none` | which wire paths are drawn (needs `battery` shown) |
| `flow` | 0–1 | current dots along the wires, faster with more |
| `back` | 0–1 | green "battery push" and orange "push back" arrows above the battery (back EMF) |
| `heat` | `{ coil, fieldCoil, armature, brushes, fan }` 0–1 | red-hot glow (losses, inrush) |
| `spark` | 0–1 | sparks at the brushes |
| `stud`, `studMs` | 0 (off) … 5 (run); glide time (default 500; ~2600 = stud by stud) | starter handle |
| `labels`, `gap` | `[[text, anchor or [x,y,z]], …]`; ms between labels (default 1400) | names, in the order the line says them |

Label anchors: every part name, plus `north`, `south`, `studs`, `handle`, `nvc`, `olr`. Labels are plain words (≤ 3), never symbols.

### Rules for the picture

- **One clock (M1).** Every value is computed from `(beat, ms)`: it goes from the previous beat's state to this beat's over the first ~0.6 s. Never ease by `dt` (dt is 0 while seeking or paused, so the frame strip and the MP4 render would freeze in the old state; this happened on 2026-11-01 and is why the code looks the way it does). Only the spin angle accumulates.
- **One part per beat.** The part the line names is in `focus`; label it on that beat.
- Hide the wires (`wiring: 'none'`) when the starter is on screen; they cross the panel.
- Need a part the model doesn't have? Add it to `basics3d.js` as a new `part(name)` with its own materials (so focus/fade work), an anchor in `ANCHORS`, and a row in the parts table above. Never build a one-off scene for one topic.

## 5. Short forms (rule 53, automatic)

The player adds full forms by itself: the first time `DC`, `EMF`, `MNA`, `GNA`, `NVC`, `OLR`, `KVL`, `AC` or `rpm` appears in a video, the board shows `EMF (Electro-Motive Force)` once and the caption once. The table is `src/content/abbr.js`; add a new short form there (with its spaced Devanagari spelling). Maths (`<K>`) and the question card (exact IOE wording) are left alone; IOE and paper names are not expanded.

## 6. Steps, in order

1. `node .claude/skills/video-studio/scripts/topic.mjs <num>`: read the syllabus bullets. List the 5–8 parts/ideas a student must *picture* before the maths.
2. Write the 8 Tutor beats (section 3), then the 8 Lecturer beats.
3. Write the plan (section 4), one entry per beat.
4. Add the `duo` to `basics.jsx`, wire `topics.jsx` (section 1), move the old opener to `extras` and old Terms videos to the front of `derive`.
5. Verify:
   ```bash
   node .claude/skills/video-studio/scripts/lint.mjs <num> --main          # 0 errors
   node .claude/skills/video-studio/scripts/topic.mjs <num> --check        # exit 0, both tellings ≤ 75 s
   npx vite build && npx vite preview --port 4182
   node .claude/skills/video-studio/scripts/frame-strip.mjs "<num> · Basic" --frames 8 --out <dir>
   magick montage <dir>/0*.png -tile 4x2 -geometry 640x518+4+4 <dir>-sheet.png   # look at one sheet
   node .claude/skills/video-studio/scripts/fit-check.mjs <num>            # 0 problems
   ```
   In the sheet check: the named part is bright on its beat, labels readable and inside the stage, nothing appears that the caption doesn't name, the starter panel/battery are visible on their beats.
6. Voice: **only 4.1 is voiced** (user, 2026-11-01). Other topics stay caption-only (rule 38); never record them. For 4.1, estimate (`npm run audio:scenes -- 4.1 --whole --dry`) and record only after the user's yes.

## 7. Example plans (copy and adapt)

| Topic | The story in 8 beats | Key plan moves |
|---|---|---|
| 4.1 principle, back EMF, torque | motor → magnet N/S → armature → coil → push (pedals) → commutator + brush → half-turn flip (ask) → push back = back EMF → no push back at start → starter | `open`, `focus` per part, `push: 1`, `back: 1` with `WIRED`, `STARTER` + `stud: 3` |
| 4.2 types | field coil is an electromagnet → how it's fed decides the type → shunt (own path) → steady speed → series (one line) → huge start push → no-load runaway (ask) → compound | `wiring: 'shunt'/'series'/'compound'`, `flow`, `field: 0.15` + `spin: 1` |
| 4.3 losses | energy leaks as heat → copper → iron → friction + air → which grow with load (ask) → efficiency → best when growing = fixed losses | `heat` per part, `focus: null` for the overview |
| 4.4 starters | switch on suddenly? → no push back, flood of current → heat + spark → starter = slow door → studs → No-Volt Coil (ask) → Overload Release → 3- vs 4-point | `flow: 1`, `heat`, `spark`, `stud` 1 → 5 → 0 |
| 4.5 speed control | three knobs → speed settles where push back ≈ battery → weak magnet = faster (ask) → field control → armature control → voltage → reversing | `field`, `spin`, `back`, `spin: -0.5` |
| 4.6 testing | full-load test is costly → no load: all input = losses → Swinburne → constant losses → retardation: cut supply → coasts down (ask) → both give efficiency | `heat`, `spin: 0` + `spinMs: 6500` |
