// Checks the video scripts against the house rules that a machine can test
// (language, questions, lead-ins, resting points, hook). Errors break a rule;
// warnings need a human look.
//
//   node .claude/skills/video-studio/scripts/lint.mjs [4.1 …] [--main] [--quiet]
//
// Exit code 1 when any error is found.

import { loadCourse, topicsFrom, wanted } from './journey.mjs';

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
const LEAD_IN = /^(la,? yo answer gara|la use garau|euta term baki cha|aba maximum chahiyo)\.?$/i;
// LaTeX inside a board line (the <K> children), to check rule 33.
const texOf = (n) => (n == null || typeof n !== 'object' ? '' : Array.isArray(n) ? n.map(texOf).filter(Boolean).join(' \\\\ ') : typeof n.props?.children === 'string' && /\\|[_^=]/.test(n.props.children) && !n.props.className ? n.props.children : texOf(n.props?.children));

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
    if (/\byo topic\b/i.test(say)) report('error', v, k, 'says "yo topic"; name the topic (rule 5)');
    if (FILLER.test(say)) report('error', v, k, `filler lead-in "${say.match(FILLER)[0]}"; use "La, yo answer gara." (rule 11)`);
    if (HYPE.test(say)) report('error', v, k, `filler "${say.match(HYPE)[0]}" (rule 32)`);
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

  // Rule 42: no connector more than twice per video.
  const counts = {};
  for (const b of v.beats) for (const m of (b.say ?? '').toLowerCase().matchAll(/\b(tesaile|yasari|yesko matlab|phalswarup|yahi karan)\b/g)) counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  for (const [w, n] of Object.entries(counts)) if (n > 2) report('warn', v, 0, `"${w}" used ${n} times; vary it from the POV phrase bank (rule 42)`);

  // Topic opener (rules 4–6): number heading, hook line on the last beat.
  if (/ ma k padhne\?$/.test(v.title)) {
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
  }
  // Every board line must appear on a beat that exists.
  for (const l of v.board) if (l.at >= v.beats.length) report('error', v, l.at, `board line at beat ${l.at} but the video has ${v.beats.length} beats`);
}

if (!quiet || errors) console.log(out.join('\n'));
console.log(`\n${checked} videos checked${topics.length ? ` (${topics.join(', ')})` : ''}: ${errors} errors, ${warnings} warnings.`);
process.exit(errors ? 1 : 0);
