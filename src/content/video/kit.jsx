import katex from 'katex';
import { Hook, ModelAnswer, Scene } from '../../video/Scene.jsx';

/*
  Authoring kit for the video course. A chapter is { title, steps }, where steps
  are LessonPlayer steps built with these helpers:

    video(title, { beats, draw?, board?, viewBox?, tall? })  self-playing scene (most screens)
    hook(big, lines)                                          memory-hook card
    model({ q, papers, marks, points, tip })                  IOE theory question + model answer
    plain question steps ({ body, input, hint, why })         the few between-video checks

  Keep ~90% of screens as video. Put questions INSIDE videos as `ask` beats
  wherever possible (they pause the video). The course is in Gen-Z Nepali: `say`
  is the romanized caption shown on screen and `voice` is the same line in
  Devanagari, which is what gets recorded (ask beats: `q` + `voice`). One idea
  per beat, under ~35 words. Technical terms, numbers and formulas stay English.
*/

// Points on the board instead of a paragraph (user, 2026-10-30: "make a bit
// more point wise, not heavy text"): one short claim per bullet.
export const Pts = ({ items }) => (
  <ul className="pts">
    {items.map((x, i) => (
      <li key={i}>{x}</li>
    ))}
  </ul>
);

export const M = ({ children }) => <span className="math">{children}</span>;

// LaTeX on the board, typeset by KaTeX: <K>{String.raw`T_a \propto \phi I_a`}</K>.
export const K = ({ children }) => (
  <span className="tex" dangerouslySetInnerHTML={{ __html: katex.renderToString(children, { throwOnError: false, trust: (c) => c.command === '\\htmlClass' }) }} />
);

// Marker inks on the whiteboard. (Names kept from the chalk version: `chalk`
// is the main ink, `yellow` the emphasis colour.)
export const C = {
  chalk: '#1f2328',
  dim: '#6b7280',
  faint: '#d0d4da',
  yellow: '#e8590c',
  blue: '#1c7ed6',
  red: '#e03131',
  green: '#2b8a3e',
  orange: '#d9480f',
  violet: '#7048e8',
  board: '#fffef9',
  north: '#e03131',
  south: '#1c7ed6',
};

export const video = (title, props) => ({
  video: true,
  title,
  tag: 'Hera',
  tagKind: 'watch',
  body: title ? <h2>{title}</h2> : null,
  Figure: Scene,
  figureProps: props,
});

/*
  A micro-topic's opening: what the topic is about, in about three short voiced
  beats. Beat 0 names the topic (number as the heading, title under it); each
  later beat writes its key idea, usually with the formula.
    overview(num, title, [{ say, voice, lines: [{ kind, node }] }, …], art?)
  `art` = { viewBox, draw } adds a kid-simple picture (doodles.jsx) beside it.
*/
export const overview = (num, title, beats, art = {}) =>
  video(`${num} ma k padhne?`, {
    ...art,
    beats: beats.map(({ say, voice }) => ({ say, voice })),
    board: [
      { at: 0, kind: 'h', node: <>{num}</> },
      { at: 0, kind: 'step', node: <>{title}</> },
      ...beats.flatMap((b, i) => (b.lines ?? []).map((l) => ({ at: i, ...l }))),
    ],
  });

export const hook = (big, lines) => ({ tag: 'Yaad rakhne trick', tagKind: 'hook', pose: 'dab', body: <Hook big={big} lines={lines} /> });

export const model = (props) => ({ ioe: true, body: <ModelAnswer {...props} /> });

// Optional extra: left out of the main path (each chapter stays under ~5 min)
// and offered after the course in the Extra practice set.
export const extra = (step) => ({ ...step, practice: true });

/*
  One video in both tellings (two teachers, skill rule 43). The Tutor's script
  plays by default; the Lecturer's is its variant. Both have the same number of
  beats and share one textbook figure, so each part of the figure comes in on
  the same beat in both. A beat is { say, voice, ask?, lines: [[kind, node, until?]] }.
    duo(title, { draw?, viewBox?, tutor: [beat…], lecturer: [beat…] })
*/
const split = (bs) => ({
  beats: bs.map(({ say, voice, ask }) => (ask ? { say, voice, ask } : { say, voice })),
  board: bs.flatMap((b, i) => (b.lines ?? []).map(([kind, node, until]) => ({ at: i, kind, node, ...(until != null ? { until } : {}) }))),
});
export const duo = (title, { tutor, lecturer, ...rest }) => {
  if (tutor.length !== lecturer.length) throw new Error(`duo "${title}": the Tutor has ${tutor.length} beats, the Lecturer ${lecturer.length}`);
  return video(title, { tall: true, ...rest, ...split(tutor), pov: 'tutor', variants: { lecturer: split(lecturer) } });
};

/*
  Model answer as a video: the question goes up on the board, then each point
  the marking scheme wants (one beat each, narrated).
    answer(title, { papers, marks, q, read: { say, voice }, points: [{ node, say, voice, page? }], draw?, viewBox?, variants? })
  No exam tip (user, 2026-10-30). Each part of the question gets space in
  proportion to its marks: head each part "(a) … [4]" and give it about one
  point per mark.
  `draw` adds the diagram or chart the answer needs, beside the notes; beat 0 is
  the question, beat k the k-th point.
*/
// Reuses a figure in another telling (skill rule 46): `map` sends the figure's
// own beat numbers to the beats of the new script; parts left out of the map
// never show.
export const figAt = (draw, map) => (s) => {
  const m = (k) => map[k] ?? 99;
  return draw({ ...s, on: (k, until) => s.on(m(k), until == null ? Infinity : m(until)), hl: (k) => s.hl(m(k)) });
};

export function answer(title, { papers, marks, q, read, points, draw, viewBox, variants }) {
  const src = papers.length ? `IOE ${papers.slice(0, 3).join(' · ')}${papers.length > 3 ? ` +${papers.length - 3}` : ''}` : 'Exam-style';
  const beats = [read, ...points].map(({ say, voice, ask }) => ({ say, voice, ask }));
  // A point with `page: true` turns the page: the points before it leave the
  // board (the question stays), so a long answer stays big enough to read.
  const until = (i) => {
    const next = points.findIndex((p, j) => j > i && p.page);
    return next < 0 ? undefined : next;
  };
  const board = [
    { at: 0, kind: 'q', node: <><span className="tag">{src}{marks ? ` · ${marks}` : ''}</span>{q}</> },
    ...points.map((p, i) => ({ at: i + 1, until: until(i), kind: 'step', node: p.node })),
  ];
  return { ...video(title, { beats, board, tall: true, draw, viewBox, notes: true, pov: 'lecturer', variants }), ioe: papers.length > 0, tag: 'Model answer', tagKind: 'watch' };
}

/*
  Every micro-topic is three video segments:
    terms    Terms ra definitions: what the terms and symbols mean, shown with visuals
    derive   Derivation: each video titled "Derivation: …"
    picture  Big picture: an old IOE question and its solution (solve() or
             answer() videos, with a diagram or chart where the answer needs one)
  steps: segments({ terms: [...], derive: [...], picture: [...] })
  Each step gets a segment chip; segments 2 and 3 open with a short, silent
  title card. Segment 1 follows straight on from the topic card.
*/
const SEGMENTS = [
  ['terms', 'Terms ra definitions', '1/3 · Terms ra definitions'],
  ['derive', 'Derivation', '2/3 · Derivation', '∫', 'Step by step derivation'],
  ['picture', 'Big picture', '3/3 · Big picture', '★', 'Purano IOE question ra solution'],
];

export const segments = (parts) =>
  SEGMENTS.flatMap(([key, title, chip, icon, kicker], i) => [
    ...(i ? [{ interstitial: { title, badge: 'chapter', icon, kicker }, segmentBreak: true }] : []),
    ...parts[key].map((s) => ({ ...s, segment: chip })),
  ]);

/* ── SVG primitives (use inside draw) ─────────────────────────────── */

// Straight arrow with a filled head. Add className 'draw' to animate the shaft.
export function Arrow({ x1, y1, x2, y2, color = C.chalk, w = 2.5, head = 8, className = '', dash }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - head * Math.cos(a);
  const hy = y2 - head * Math.sin(a);
  const p = (s) => `${hx + (head / 2) * Math.cos(a + s * Math.PI / 2)},${hy + (head / 2) * Math.sin(a + s * Math.PI / 2)}`;
  return (
    <g className={className}>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} pathLength={dash ? undefined : 1} className={dash ? '' : 'draw'} />
      <polygon points={`${x2},${y2} ${p(1)} ${p(-1)}`} fill={color} />
    </g>
  );
}

// The drawings get a light 3D look from gradients and soft ground shadows
// (no filters: drop-shadow under the camera's zoom renders ghost copies).
const tint = (hex, f) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v) => Math.round(f > 0 ? v + (255 - v) * f : v * (1 + f));
  return `rgb(${ch(n >> 16)}, ${ch((n >> 8) & 255)}, ${ch(n & 255)})`;
};
const gid = (kind, color) => `${kind}-${color.replace(/[^\w]/g, '')}`;

// Soft oval shadow on the ground under an object.
export const Shadow = ({ cx, cy, rx, ry = rx * 0.16 }) => (
  <>
    <defs>
      <radialGradient id="kit-shadow">
        <stop offset="0%" stopColor="#000" stopOpacity={0.22} />
        <stop offset="100%" stopColor="#000" stopOpacity={0} />
      </radialGradient>
    </defs>
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#kit-shadow)" />
  </>
);

// A magnet pole as a solid block: lit from the top left, with a bevelled edge.
export function Pole({ x, y, w = 44, h = 140, label, color }) {
  const id = gid('pole', color);
  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={tint(color, 0.35)} />
          <stop offset="45%" stopColor={color} />
          <stop offset="100%" stopColor={tint(color, -0.35)} />
        </linearGradient>
      </defs>
      <Shadow cx={x + w / 2} cy={y + h + 6} rx={w * 0.75} />
      <rect x={x + 4} y={y + 4} width={w} height={h} rx={7} fill={tint(color, -0.5)} />
      <rect x={x} y={y} width={w} height={h} rx={7} fill={`url(#${id})`} />
      <rect x={x + 5} y={y + 5} width={w * 0.28} height={h - 10} rx={4} fill="#fff" opacity={0.18} />
      <text x={x + w / 2} y={y + h / 2 + 8} textAnchor="middle" fontSize={24} fontWeight={800} fill="#fff" stroke={tint(color, -0.5)} strokeWidth={0.8}>{label}</text>
    </g>
  );
}

// Conductor end-on, as the copper end of a rod: dir 'out' = ⊙ (toward you),
// 'in' = ⊗ (away from you).
export function Conductor({ x, y, r = 11, dir = 'out', color = C.orange }) {
  const k = r * 0.5;
  const id = gid('rod', color);
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={tint(color, 0.75)} />
          <stop offset="55%" stopColor={tint(color, 0.2)} />
          <stop offset="100%" stopColor={tint(color, -0.4)} />
        </radialGradient>
      </defs>
      <circle cx={x + 1.5} cy={y + 2} r={r + 1} fill="#000" opacity={0.3} />
      <circle cx={x} cy={y} r={r} fill={`url(#${id})`} stroke={tint(color, -0.45)} strokeWidth={1.6} />
      {dir === 'out' ? (
        <circle cx={x} cy={y} r={r * 0.3} fill={tint(color, -0.55)} />
      ) : (
        <path d={`M${x - k} ${y - k}L${x + k} ${y + k}M${x + k} ${y - k}L${x - k} ${y + k}`} stroke={tint(color, -0.55)} strokeWidth={2.4} strokeLinecap="round" />
      )}
    </g>
  );
}

// The armature seen end-on, as a steel cylinder: lit from the top left, with
// its laminations, a shaft and a shadow under it.
export function Rotor({ x, y, r, className = '' }) {
  return (
    <g className={className}>
      <defs>
        <radialGradient id="kit-rotor" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#868e96" />
          <stop offset="55%" stopColor="#3b4248" />
          <stop offset="100%" stopColor="#1a1d20" />
        </radialGradient>
        <radialGradient id="kit-shaft" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f1f3f5" />
          <stop offset="100%" stopColor="#868e96" />
        </radialGradient>
      </defs>
      <Shadow cx={x} cy={y + r + 8} rx={r * 0.9} ry={r * 0.12} />
      <circle cx={x} cy={y} r={r} fill="url(#kit-rotor)" stroke="#16181b" strokeWidth={2} />
      <circle cx={x} cy={y} r={r * 0.92} fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={r * 0.06} />
      <circle cx={x} cy={y} r={r * 0.62} fill="none" stroke="#fff" strokeOpacity={0.06} strokeWidth={1} />
      <path d={`M${x - r * 0.7} ${y - r * 0.45} A${r * 0.85} ${r * 0.85} 0 0 1 ${x + r * 0.1} ${y - r * 0.82}`} fill="none" stroke="#fff" strokeOpacity={0.28} strokeWidth={r * 0.07} strokeLinecap="round" />
      <circle cx={x} cy={y} r={r * 0.1} fill="url(#kit-shaft)" stroke="#495057" strokeWidth={1} />
    </g>
  );
}

// Zigzag resistor from (x1,y) to (x2,y), or vertical when `vertical` (x, y1→y2 given as x1=x, y=y1, x2=y2).
export function Resistor({ x1, y, x2, color = C.chalk, vertical, label, labelColor = C.dim }) {
  const n = 6;
  const len = x2 - x1;
  const seg = len / (n + 2);
  const pts = [[0, 0], [seg, 0]];
  for (let i = 0; i < n; i++) pts.push([seg * (1.5 + i), i % 2 ? 7 : -7]);
  pts.push([len - seg, 0], [len, 0]);
  const d = pts.map(([a, b], i) => `${i ? 'L' : 'M'}${vertical ? x1 + b : x1 + a} ${vertical ? y + a : y + b}`).join('');
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      {label && (
        <text x={vertical ? x1 + 14 : x1 + len / 2} y={vertical ? y + len / 2 + 4 : y - 12} textAnchor={vertical ? 'start' : 'middle'} fontSize={12} fill={labelColor}>
          {label}
        </text>
      )}
    </g>
  );
}

// Field coil: a row of loops from (x,y), horizontal by default.
export function Coil({ x, y, len = 60, turns = 5, color = C.orange, vertical, label }) {
  const step = len / turns;
  let d = `M${x} ${y}`;
  for (let i = 0; i < turns; i++) {
    const a = x + i * step;
    d += vertical
      ? ` C${x + 12} ${y + i * step} ${x + 12} ${y + (i + 1) * step} ${x} ${y + (i + 1) * step}`
      : ` C${a} ${y - 12} ${a + step} ${y - 12} ${a + step} ${y}`;
  }
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={2.2} />
      {label && <text x={vertical ? x + 18 : x + len / 2} y={vertical ? y + len / 2 + 4 : y - 18} textAnchor={vertical ? 'start' : 'middle'} fontSize={12} fill={color}>{label}</text>}
    </g>
  );
}

// DC source (battery), vertical, + on top.
export function Source({ x, y, label = 'V' }) {
  return (
    <g>
      <line x1={x - 14} y1={y - 5} x2={x + 14} y2={y - 5} stroke={C.chalk} strokeWidth={2.5} />
      <line x1={x - 8} y1={y + 5} x2={x + 8} y2={y + 5} stroke={C.chalk} strokeWidth={4} />
      <text x={x - 24} y={y + 5} textAnchor="end" fontSize={14} fontWeight={700}>{label}</text>
      <text x={x + 18} y={y - 8} fontSize={11} fill={C.dim}>+</text>
    </g>
  );
}

// Armature drawn as a circle with brushes, for circuit diagrams.
export function Armature({ x, y, r = 18, label = 'M', color = C.chalk }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.board} stroke={color} strokeWidth={2.4} />
      <rect x={x - 5} y={y - r - 5} width={10} height={6} fill={C.dim} />
      <rect x={x - 5} y={y + r - 1} width={10} height={6} fill={C.dim} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700}>{label}</text>
    </g>
  );
}

// Simple x–y axes for characteristic curves.
// Graph axes. Name each axis in full, with its symbol ("Armature current Ia").
export function Axes({ x = 40, y = 190, w = 290, h = 160, xLabel, yLabel }) {
  return (
    <g>
      <Arrow x1={x} y1={y} x2={x + w} y2={y} color={C.dim} w={1.8} head={7} />
      <Arrow x1={x} y1={y} x2={x} y2={y - h} color={C.dim} w={1.8} head={7} />
      {xLabel && <text x={x + w} y={y + 19} textAnchor="end" fontSize={14} fontWeight={700} fill={C.chalk}>{xLabel}</text>}
      {yLabel && <text x={x + 8} y={y - h + 4} fontSize={14} fontWeight={700} fill={C.chalk}>{yLabel}</text>}
    </g>
  );
}

/* ── Past-question solving video ─────────────────────────────────────
  solve({
    title, paper: '2073 Bhadra', marks: '8 marks',
    read: 'A 240 V DC shunt motor …',            // spoken while the question is read
    question: <>A <D>240 V</D> DC shunt motor …</>, // <D> marks the data to pick out
    paperVoice: 'टु थाउजेन्ड सेभेन्टी थ्री भदौ',   // optional, how the voice says the paper
    readVoice: 'टु फोर्टी भोल्टको डीसी शन्ट मोटर …', // Devanagari of `read`, spoken
    given: [{ node: <>V = 240 V</>, say: 'Supply 240 volt', voice: 'सप्लाई टु फोर्टी भोल्ट' }, …],
    find: { node: <>New speed N₂</>, say: 'Naya speed chahiyo.', voice: 'नयाँ स्पिड चाहियो।' },
    idea: { node: <>φ constant ⟹ N ∝ Eb</>, say: 'Shunt motor, flux fixed…', voice: '…' },
    steps: [{ node: <>Ish = 240/120 = 2 A</>, say: '…', voice: '…', ask?: { q, voice, options, answer, why } }, …],
    answer: { node: <>N₂ = 1500 rpm</>, say: '…' },
    trap: { node: <>…</>, say: '…' },                  // optional: the common mistake
  })
  Beats: read → pick the data → what is asked → key idea → steps (asks pause) →
  answer → trap. Every past question in the course is taught this way.
*/
export const D = ({ children }) => <mark className="wb-data">{children}</mark>;

export function solve({ title, paper, paperVoice, marks, read, readVoice, question, given, find, idea, steps, answer, trap }) {
  const line = (x) => ({ say: x.say, voice: x.voice });
  const beats = [
    { say: `IOE ${paper} ko question. Bistarai padhau. ${read}`, voice: `आइओई ${paperVoice ?? paper} को क्वेस्चन। बिस्तारै पढौं। ${readVoice ?? read}` },
    {
      say: `Aba data tipau. ${given.map((g) => g.say).join('. ')}.`,
      voice: `अब डाटा टिपौं। ${given.map((g) => g.voice ?? g.say).join('। ')}।`,
    },
    line(find),
    line(idea),
    ...steps.map((st) => ({ ...line(st), ask: st.ask })),
    line(answer),
    ...(trap ? [line(trap)] : []),
  ];
  const first = 4;
  const board = [
    { at: 0, kind: 'q', node: <><span className="tag">IOE {paper}{marks ? ` · ${marks}` : ''}</span>{question}</> },
    ...given.map((g) => ({ at: 1, kind: 'given', node: g.node })),
    { at: 2, kind: 'find', node: <>Nikalnu parne: {find.node}</> },
    { at: 3, kind: 'idea', node: <><b>Method.</b> {idea.node}</> },
    ...steps.map((st, i) => ({ at: first + i, kind: 'step', node: st.node })),
    { at: first + steps.length, kind: 'answer', node: answer.node },
    ...(trap ? [{ at: first + steps.length + 1, kind: 'trap', node: trap.node }] : []),
  ];
  return { ...video(title ?? `IOE ${paper} solve garau`, { beats, board, tall: true }), ioe: true, tag: 'Sangai solve garau', tagKind: 'watch' };
}
