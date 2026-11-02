import { Children, cloneElement, isValidElement } from 'react';

/*
  One way to write a symbol, everywhere (user, 2026-11-02: "subscript and
  superscript problem", "capital or small letter"). Captions, question cards,
  board text and figure labels write symbols as plain text ("Eb", "E b",
  "Ia²Ra", "Rsh"); this turns them into a letter with its subscript, the way
  the maths shows them (E_b). Only the symbols in SYM are touched, so roman
  Nepali words ("ra", "ta") stay words.

  SYM is also the symbol table of the subject: one letter, one meaning,
  one case. A new symbol is added here and in terms.js (its name).
*/

// base + subscript, as written in plain text. Order: longest first.
const SUBS = {
  E: ['b', 'g', 'r', 'ph'],
  I: ['sh', 'se', 'a', 'L', 'c', 'f', 'm', 'w', 'μ', '0', 'st', 'fl', 'nl'],
  R: ['sh', 'se', 'a', 'f', 'c', 'L', 'st', 'eq'],
  T: ['sh', 'st', 'max', 'a', 'L', 'f', 'lost'],
  P: ['cu', 'm', 'i', 'out', 'g'],
  W: ['cu', 'c', 'i', 'h', 'f'],
  N: ['s', 'r', '0', 'nl', 'fl'],
  X: ['s', 'a', 'L', 'eq'],
  V: ['t', 'ph', 'L'],
  Z: ['s', 'eq'],
  B: ['r', 'max', 'm'],
  H: ['c'],
  K: ['a', 'f'],
};
// Words that read like a symbol at the start of a roman Nepali sentence
// ("Ra" = "and", "Pi"): only taken as symbols in the middle of a sentence.
const SENTENCE_WORD = new Set(['Ra', 'Pi', 'If', 'Eg', 'Ka']);

const alt = Object.entries(SUBS)
  .flatMap(([b, subs]) => subs.map((s) => [b, s]))
  .sort((a, b) => b[1].length - a[1].length);
const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// "Eb", "E b", "I sh", "Ia²", "Ia1" (a following digit is not part of it)
const RE = new RegExp(
  `(^|[^\\p{L}0-9_])(${[...new Set(alt.map(([b]) => b))].join('|')})( ?)(${[...new Set(alt.map(([, s]) => esc(s)))].join('|')})(?![\\p{L}])`,
  'gu',
);
const known = new Set(alt.map(([b, s]) => b + s));

// Split a plain string into [text, {base, sub}] pieces.
export function symParts(str, label = false) {
  if (typeof str !== 'string' || !str) return [str];
  const out = [];
  let last = 0;
  for (const m of str.matchAll(RE)) {
    const [, lead, base, space, sub] = m;
    if (!known.has(base + sub)) continue;
    const at = m.index + lead.length;
    const before = str.slice(0, at).trimEnd();
    const start = !before || /[.!?:\n]$/.test(before);
    // Figure labels are never Nepali sentences.
    if (start && !label && SENTENCE_WORD.has(base + sub)) continue;
    out.push(str.slice(last, at), { base, sub });
    last = at + base.length + space.length + sub.length;
  }
  if (!out.length) return [str];
  out.push(str.slice(last));
  return out.filter((p) => p !== '');
}

// HTML: <i>E</i><sub>b</sub>
export function sym(str) {
  const parts = symParts(str);
  if (parts.length === 1 && typeof parts[0] === 'string') return str;
  return parts.map((p, i) =>
    typeof p === 'string' ? p : (
      <span key={i} className="sym">
        {p.base}
        <sub>{p.sub}</sub>
      </span>
    ),
  );
}

// SVG: tspans; the subscript drops by dy and the next text comes back up.
export function symSvg(str) {
  const parts = symParts(str, true);
  if (parts.length === 1 && typeof parts[0] === 'string') return str;
  const out = [];
  parts.forEach((p, i) => {
    if (typeof p === 'string') return out.push(p);
    out.push(
      <tspan key={`${i}b`}>{p.base}</tspan>,
      <tspan key={`${i}s`} dy="0.32em" style={{ fontSize: '0.72em' }}>
        {p.sub}
      </tspan>,
      <tspan key={`${i}r`} dy="-0.32em" />,
    );
  });
  return out;
}

// Walk a React tree and format the plain strings in HTML text and SVG <text>
// (maths in <K> is left alone: it is already typeset).
// A chain "load ↑ → N ↓ → Eb ↓" breaks only after an arrow, never inside a
// step (user, 2026-11-02: "this things are messier"). Short steps keep their
// spaces unbreakable; long ones wrap normally.
const NB = '\u00a0';
export const keepSteps = (str) =>
  !str.includes('→') && !str.includes('⇒')
    ? str
    : str
        .split(/(→|⇒)/)
        .map((p, i) => (i % 2 ? p : p.trim().length <= 22 ? p.replace(/ +/g, (m, at) => (at === 0 && i > 0 ? ' ' : NB)) : p))
        .join('')
        .replace(/ (→|⇒)/g, `${NB}$1`);
export function symTree(node, svg = false) {
  if (typeof node === 'string') return svg ? symSvg(node) : sym(keepSteps(node));
  if (Array.isArray(node)) return node.map((n) => symTree(n, svg));
  if (!isValidElement(node)) return node;
  const t = node.type;
  if (t?.isTex || t === 'tspan' || node.props?.dangerouslySetInnerHTML) return node;
  const p = {};
  const sv = svg || t === 'svg';
  if (node.props.children != null) {
    const kids = Children.map(node.props.children, (c) => symTree(c, sv));
    p.children = kids?.length === 1 ? kids[0] : kids;
  }
  if (Array.isArray(node.props.items)) p.items = node.props.items.map((c) => symTree(c, sv));
  return Object.keys(p).length ? cloneElement(node, p) : node;
}
