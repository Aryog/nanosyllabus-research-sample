// Checks the video scripts against the house rules that a machine can test
// (language, questions, lead-ins, resting points, hook). Errors break a rule;
// warnings need a human look.
//
//   node .claude/skills/video-studio/scripts/lint.mjs [4.1 …] [--main] [--quiet]
//
// Exit code 1 when any error is found.

import { loadCourse, topicsFrom, wanted } from './journey.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const { JOINED } = await import(pathToFileURL(path.join(process.cwd(), 'src/content/abbr.js')).href);

const args = process.argv.slice(2);
const topics = topicsFrom(args);
const mainOnly = args.includes('--main');
const quiet = args.includes('--quiet');
const { videos, voice } = await loadCourse();

const DEVANAGARI = /[ऀ-ॿ]/;
// Questions must stand alone (rule 10): no pointing back at the video.
const BACK_REF = /\b(bhanyo|bhaniyo|k bhaneko|dajaiyo|jastai kun)\b/i;
// Filler lead-ins (rule 11).
const FILLER = /\b(ekchin|dhyan check|bharkhar|ekchoti socha|dhyan diyera|feri recall)\b/i;
const BAD_TAG = /dhyan check|ekchin socha/i;
// Hype and filler (rule 32), and beats that only cue a question (rule 11).
const HYPE = /\b(dami|ekdam smart|simple cha|pakka|antya samma hera|box gara|yo hera)\b/i;
// Pointing words (rule 47): "yaha bata aaucha" points at nothing; yaha/tyaha/hera
// only when the figure shows that part on that beat.
const POINT_NOWHERE = /\b(yaha|yahi|tyaha|tyahi)\s*bata\s+aau/i;
const POINT = /\b(yaha|tyaha|hera)\b/i;
const LEAD_IN = /^(la,? yo answer gara|la use garau|euta term baki cha|aba maximum chahiyo)\.?$/i;
// LaTeX inside a board line (the <K> children), to check rule 33.
// Basic Understanding (segment 1, rule 7) is intuition only: no maths, no
// symbols. Converted topics have a segment-1 video titled "<num> · Basic understanding…".
const textOf = (n) => (n == null || typeof n === 'boolean' ? '' : typeof n !== 'object' ? String(n) : Array.isArray(n) ? n.map(textOf).join('') : [textOf(n.props?.children), textOf(n.props?.items)].join(' '));
const hasTex = (n) => (n == null || typeof n !== 'object' ? false : Array.isArray(n) ? n.some(hasTex) : !!n.type?.isTex || hasTex(n.props?.children) || hasTex(n.props?.items));
const SYMBOL = /\b(E ?b|I ?a|R ?a|T ?a|Eb|Ia|Ra|Ta|Ish|Rsh|IL|Pm|BIl)\b|[φΦ∝ηωτ=≈]/;
const texOf = (n) => (n == null || typeof n !== 'object' ? '' : Array.isArray(n) ? n.map(texOf).filter(Boolean).join(' \\\\ ') : n.type?.name === 'K' && typeof n.props?.children === 'string' ? n.props.children : texOf(n.props?.children));

const out = [];
let errors = 0;
let warnings = 0;
const report = (level, v, k, msg) => {
  level === 'error' ? errors++ : warnings++;
  out.push(`${level === 'error' ? '✗' : '!'} ${v.topic} ${v.practice ? '(practice) ' : ''}"${v.title}" beat ${k}: ${msg}`);
};

let checked = 0;
for (const v of videos) {
  if (!v.topic || !wanted(v, topics) || (mainOnly && v.practice)) continue;
  checked++;
  v.beats.forEach((b, k) => {
    const say = b.say ?? '';
    if (say && !b.voice) report('error', v, k, 'has `say` but no Devanagari `voice` (rule 1)');
    if (b.voice && !DEVANAGARI.test(b.voice)) report('error', v, k, '`voice` is not Devanagari (rule 1)');
    if (b.voice && /…|\.\.\./.test(b.voice)) report('error', v, k, '`voice` contains "…" (rule 28b: sounds hesitant)');
    if (/(…|\.\.\.)\s*$/.test(say)) report('error', v, k, 'caption trails off with "…"; finish the sentence (rules 10, 32)');
    // Rule 28c: a short form in a voice line is spelled letter by letter.
    for (const t of [b.voice, b.ask?.voice]) if (t && JOINED.test(t)) report('error', v, k, `voice spells "${t.match(JOINED)[0]}" joined; write the letter names apart, e.g. "ई एम एफ" (rule 28c, src/content/abbr.js)`);
    if (/\byo topic\b/i.test(say)) report('error', v, k, 'says "yo topic"; name the topic (rule 5)');
    if (FILLER.test(say)) report('error', v, k, `filler lead-in "${say.match(FILLER)[0]}"; use "La, yo answer gara." (rule 11)`);
    if (HYPE.test(say)) report('error', v, k, `filler "${say.match(HYPE)[0]}" (rule 32)`);
    if (POINT_NOWHERE.test(say)) report('error', v, k, `"${say.match(POINT_NOWHERE)[0]}" points at nothing; say what it is (rule 47)`);
    else if (POINT.test(say)) report('warn', v, k, `pointing word "${say.match(POINT)[0]}": only if the figure shows it now (rule 47)`);
    if (b.ask && LEAD_IN.test(say.trim())) report(topics.length ? 'error' : 'warn', v, k, 'beat only cues its question; attach the ask to the beat that taught it (rule 11)');
    const words = say.split(/\s+/).filter(Boolean).length;
    if (words > 35) report('warn', v, k, `${words} words in one beat (keep under ~35)`);
    const spokenLen = voice.spoken(b.voice ?? '').length;
    if (spokenLen > 140 && !/[,،।—]/.test(b.voice ?? '')) report('warn', v, k, 'long voice line without resting points (rule 28b)');

    const a = b.ask;
    if (!a) return;
    if (!a.voice) report('error', v, k, 'question has no Devanagari `voice`');
    if (a.voice && /…|\.\.\./.test(a.voice)) report('error', v, k, 'question voice trails off with "…" (rule 10)');
    if (/…|\.\.\.\s*$/.test(a.q) || !/[?？]\s*$/.test(a.q.trim())) report('error', v, k, `question "${a.q.slice(0, 50)}" must end as a full question with "?" (rule 10)`);
    if (BACK_REF.test(a.q)) report('error', v, k, `question points back at the video ("${a.q.match(BACK_REF)[0]}") (rule 10)`);
    if (/^bharkhar bhaneko/i.test(a.q)) report('error', v, k, 'question starts with "Bharkhar bhaneko" (rule 11)');
    if (a.tag && BAD_TAG.test(a.tag)) report('error', v, k, `non-informative question tag "${a.tag}" (rule 12)`);
    if (!Array.isArray(a.options) || a.options.length < 2) report('error', v, k, 'question needs at least two options');
    else {
      if (!(a.answer >= 0 && a.answer < a.options.length)) report('error', v, k, `answer index ${a.answer} is outside the options`);
      if (new Set(a.options).size !== a.options.length) report('error', v, k, 'duplicate options');
    }
    if (!a.why) report('warn', v, k, 'question has no `why`');
  });

  // Rule 7: Basic Understanding has no maths and no symbols.
  if (v.step.segment?.startsWith('1/3') && /Basic understanding/i.test(v.step.title ?? '')) {
    v.beats.forEach((b, k) => {
      if (SYMBOL.test(b.say ?? '')) report('error', v, k, `Basic Understanding caption has maths or a symbol ("${(b.say ?? '').match(SYMBOL)[0]}"); say it in words (rule 7)`);
    });
    for (const l of v.board) {
      if (l.kind === 'eq' || hasTex(l.node)) report('error', v, l.at, 'Basic Understanding board has an equation; no maths in segment 1 (rule 7)');
      else if (SYMBOL.test(textOf(l.node))) report('error', v, l.at, `Basic Understanding board has a symbol ("${textOf(l.node).match(SYMBOL)[0]}"); name it in words (rule 7)`);
    }
  }
  // Rule 59: "under N" is "N pole ko prabhav ma", never "N muni".
  v.beats.forEach((b, k) => {
    for (const t of [b.say, b.voice, b.ask?.q, b.ask?.voice]) if (t && /\bmuni|मुनि/.test(t)) report('error', v, k, '"muni" for "under a pole": say "N pole ko prabhav ma" (rule 59)');
  });
  // Rule 60: titles are plain English (only the content is roman Nepali).
  const NEP = /\b(ra|ko|ka|ki|bata|kina|ho|ma|lai|garau|nagarne|padhne|kasari|kati|cha|bhitra|yesko|tyasko|sanga|matra|garne|huncha|kun|ani)\b/i;
  if (NEP.test(v.title)) report('error', v, 0, `title "${v.title}" has roman Nepali ("${v.title.match(NEP)[0]}"); titles are plain English (rule 60)`);
  // Rule 61: the unit of a formula is \unit{full name}, apart from the formula.
  for (const l of v.board) {
    const tex = texOf(l.node);
    const m = tex && tex.match(/[A-Za-z})]\s*(\\[ ,;:]|\\quad)*\s*\\text\{(V|A|W|Wb|s|N|T|rpm|volt|watt|newton|weber)\}/);
    if (m) report('error', v, l.at, `unit "${m[2]}" right after a symbol reads as part of the formula; write \\unit{${m[2]}} in full (rule 61)`);
  }
  // Rule 62: Syllabus Content and Model Answer are bookish: no 3D scenes.
  if (/^[23]\/3/.test(v.step.segment ?? '') && v.step.figureProps?.three) report('error', v, 0, 'a 3D scene outside Basic Understanding; use the book figure (rule 62)');
  // Rule 63: a branch scene returns to the main line on a later beat.
  for (const l of v.board.filter((x) => x.kind === 'branch')) {
    if (!l.title) report('error', v, l.at, 'branch scene has no title (rule 63)');
    if ((l.until ?? l.at) >= v.beats.length - 1) report('warn', v, l.at, 'branch scene on the last beat: come back to the main line after it (rule 63)');
  }

  // Rule 69: a 3D label is at most three words (user: "the texts are like lots").
  for (const l of (v.step.figureProps?.three?.plan ?? [])) for (const [txt] of l.labels ?? []) if (String(txt).split(/\s+/).length > 3) report('error', v, 0, `3D label "${txt}" is longer than three words (rule 69)`);

  // Rule 1: engineer Gen-Z Nepali: technical nouns in English, not pure Nepali.
  const PURE = /\b(falam|hawa|phera|dhakka|rokawat|bijuli|tama ko tar|tar ko coil|chumbak)\b/i;
  v.beats.forEach((b, k) => {
    for (const t of [b.say, b.ask?.q, ...(b.ask?.options ?? [])]) {
      const m = typeof t === 'string' && t.match(PURE);
      if (m) report('warn', v, k, `pure-Nepali "${m[1]}" for a technical term; say iron/core, air, turns, MMF/push, reluctance, current, copper wire, magnet (rule 1)`);
    }
  });

  // Rule 42: no connector more than twice per video.
  const counts = {};
  for (const b of v.beats) for (const m of (b.say ?? '').toLowerCase().matchAll(/\b(tesaile|yasari|yesko matlab|phalswarup|yahi karan)\b/g)) counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  for (const [w, n] of Object.entries(counts)) if (n > 2) report('warn', v, 0, `"${w}" used ${n} times; vary it from the POV phrase bank (rule 42)`);

  // Topic opener (rules 4–6): number heading, hook line on the last beat.
  if (/ ma k padhne\?$| · Overview$/.test(v.title)) {
    const last = v.beats.length - 1;
    if (!v.board.some((l) => l.kind === 'hook' && l.at === last)) report('error', v, last, 'opener has no `hook` board line on its last beat (rule 6)');
    if (v.board[0]?.kind !== 'h') report('error', v, 0, 'opener must start with the topic number as an `h` line (rule 4)');
  }
  // Rule 33: never two "=" on one row of maths, and no unicode "·" inside \text.
  for (const l of v.board) {
    const tex = texOf(l.node);
    if (!tex) continue;
    for (const row of tex.replace(/\\(begin|end)\{aligned\}/g, '').split(/\\\\/)) {
      const eqs = (row.replace(/\\(underbrace|overbrace)\{[^]*?\}_\{[^]*?\}\}/g, 'X').match(/(?<![<>!\\])=/g) ?? []).length;
      if (eqs > 1 && !/\\q?quad|,\\q/.test(row)) report('warn', v, l.at, `board maths has ${eqs} "=" on one row; break it into an aligned block (rule 33)`);
    }
    if (/\\text\{[^}]*·/.test(tex)) report('error', v, l.at, 'unicode "·" inside \\text renders red; use \\text{N}\\cdot\\text{m} (rule 33)');
    // Rule 55: a row of maths fits the board (about 30 visible characters).
    for (const row of tex.replace(/\\(begin|end)\{aligned\}/g, '').split(/\\\\/)) {
      const visible = row.replace(/\\(underbrace|overbrace)\{([^]*?)\}_\{[^]*?\}/g, '$2').replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}&_^\s]/g, '');
      if (visible.length > 44) report('warn', v, l.at, `board maths row is ~${visible.length} characters wide; split it into aligned rows (rule 55)`);
    }
  }
  // Every board line must appear on a beat that exists.
  for (const l of v.board) if (l.at >= v.beats.length) report('error', v, l.at, `board line at beat ${l.at} but the video has ${v.beats.length} beats`);
}

if (!quiet || errors) console.log(out.join('\n'));
console.log(`\n${checked} videos checked${topics.length ? ` (${topics.join(', ')})` : ''}: ${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
