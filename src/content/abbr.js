/*
  Short forms and their full forms (skill rule 53, user 2026-11-01: "short
  form haru ko full form pani lekhna parla … MNA bujhiyena"). The player
  writes the full form after the first time a short form appears in a video,
  once in the captions and once on the board: "EMF (Electro-Motive Force)".
  Maths (<K>) and the question card (kind 'q', the exact IOE wording) are left
  as they are. A short form the author already expanded ("DC (Direct
  Current)") is not expanded again. Names of exams and papers (IOE, ECM) are
  not listed: they are names, not terms.

  `voice` is how the short form is spelled in a Devanagari voice line: one
  letter name per word, never joined ("इएमएफ" is read as the word "imf";
  rule 28c). lint.mjs fails a voice line that has the joined spelling.
*/
export const ABBR = {
  DC: { full: 'Direct Current', voice: 'डी सी', joined: 'डीसी' },
  AC: { full: 'Alternating Current', voice: 'ए सी', joined: 'एसी' },
  EMF: { full: 'Electro-Motive Force', voice: 'ई एम एफ', joined: 'इएमएफ|ईएमएफ' },
  MNA: { full: 'Magnetic Neutral Axis', voice: 'एम एन ए', joined: 'एमएनए' },
  GNA: { full: 'Geometric Neutral Axis', voice: 'जी एन ए', joined: 'जीएनए' },
  NVC: { full: 'No-Volt Coil', voice: 'एन भी सी', joined: 'एनभीसी' },
  OLR: { full: 'Overload Release', voice: 'ओ एल आर', joined: 'ओएलआर' },
  KVL: { full: 'Kirchhoff’s Voltage Law', voice: 'के भी एल', joined: 'केभीएल' },
  rpm: { full: 'revolutions per minute', voice: 'आर पी एम', joined: 'आरपीएम' },
};

// Also joined in voice lines, though not expanded on screen.
const JOINED_EXTRA = ['आइओई', 'आईओई'];

// A joined Devanagari spelling (not inside a longer word), for lint.
export const JOINED = new RegExp(`(?<![\\u0900-\\u097F])(${[...Object.values(ABBR).map((a) => a.joined), ...JOINED_EXTRA].join('|')})`);

const RE = new RegExp(`\\b(${Object.keys(ABBR).join('|')})\\b`, 'g');

// Expands, in `text`, each short form not yet in `seen` (and adds it there).
export function expandText(text, seen) {
  return text.replace(RE, (m, k, at) => {
    if (seen.has(k)) return m;
    seen.add(k);
    // Already followed by its full form, written by hand.
    if (/^\s*\(/.test(text.slice(at + m.length))) return m;
    return `${m} (${ABBR[k].full})`;
  });
}
