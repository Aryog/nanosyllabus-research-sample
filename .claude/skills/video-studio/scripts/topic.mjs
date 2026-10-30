// One topic, end to end: what it must contain (references/topics.json, from
// vault/), what the course has now, and whether it is game-ready. The
// "generate topic" recipe (references/topic-recipe.md) starts and ends here.
//
//   node .claude/skills/video-studio/scripts/topic.mjs 4.2            # brief + status
//   node .claude/skills/video-studio/scripts/topic.mjs 4.2 --check    # same, exit 1 unless game-ready
//
// Never spends credits.

import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadCourse, root } from './journey.mjs';

const args = process.argv.slice(2);
const num = args.find((a) => !a.startsWith('--'));
const gate = args.includes('--check');
if (!num) {
  console.error('usage: topic.mjs <topic, e.g. 4.2> [--check]');
  process.exit(2);
}

const here = path.dirname(new URL(import.meta.url).pathname);
const topics = JSON.parse(await readFile(path.join(here, '../references/topics.json'), 'utf8'));
const spec = topics[num];
const { POVS, autoPov } = await import(pathToFileURL(path.join(root, 'src/content/pov.js')).href);
const { journey, voice } = await loadCourse();
const clips = JSON.parse(await readFile(path.join(root, 'public/audio/scene/manifest.json'), 'utf8').catch(() => '{}'));

const textOf = (n) => (n == null || typeof n === 'boolean' ? '' : typeof n !== 'object' ? String(n) : Array.isArray(n) ? n.map(textOf).join('') : textOf(n.props?.children));
const steps = journey.steps.filter((st) => st.chapter?.startsWith(`${num} `) && !st.practice && st.figureProps?.beats?.length);
const seg = (k) => steps.filter((st) => st.segment?.startsWith(k));
const ROLES = POVS.map((p) => p.id);

const out = [];
const fails = [];
const warns = [];
const ok = (cond, msg, warnOnly = false) => {
  out.push(`${cond ? '✓' : warnOnly ? '!' : '✗'} ${msg}`);
  if (!cond) (warnOnly ? warns : fails).push(msg);
};

// ── Brief: what the topic must contain ───────────────────────────────────
console.log(`\n══ ${num} · ${spec?.title ?? '(not in topics.json)'} ══`);
if (!spec) {
  console.log('Add this topic to references/topics.json first (syllabus bullets, derivations, past questions from vault/).');
  process.exit(gate ? 1 : 0);
}
console.log(`Syllabus: ${spec.syllabus.join(' · ')}`);
console.log('Derivations (segment 2, one video each):');
for (const d of spec.derivations) console.log(`  - ${d}`);
console.log('Big picture (segment 3, one video per question, every role opens with it):');
for (const q of spec.bigPicture) console.log(`  - [${q.kind}] ${q.papers.join(' · ')} ${q.marks}: ${q.q}`);
if (spec.gap) console.log(`  ⚠ ${spec.gap}`);
if (spec.alsoAsked?.length) {
  console.log('Also asked (use inside Terms/Derivation or practice):');
  for (const q of spec.alsoAsked) console.log(`  - ${q.papers.join(' · ')}: ${q.q} → ${q.where}`);
}

// ── Status: what the course has, and is it game-ready? ───────────────────
const [terms, derive, picture] = ['1/3', '2/3', '3/3'].map(seg);
ok(terms.length >= 2 && / ma k padhne\?$/.test(terms[0]?.title ?? ''), `Segment 1 Terms: opener + ${Math.max(0, terms.length - 1)} video(s)`);
ok(derive.length >= spec.derivations.length, `Segment 2 Derivation: ${derive.length} video(s) for ${spec.derivations.length} equation(s)`);
ok(picture.length >= Math.max(1, spec.bigPicture.length), `Segment 3 Big picture: ${picture.length} video(s) for ${spec.bigPicture.length} past question(s)`, !spec.bigPicture.length);

// Big picture: every video and every role version opens with an IOE question.
const qLine = (board) => (board ?? []).find((l) => l.kind === 'q' && l.at === 0);
for (const st of picture) {
  const main = qLine(st.figureProps.board);
  // A topic with no past question in vault/ (topics.json `gap`) may use an
  // exam-style card instead; it must not claim a paper.
  const card = spec.gap ? /IOE|Exam-style/ : /IOE/;
  ok(!!main && card.test(textOf(main.node)), `Big picture "${st.title}" opens with ${spec.gap ? 'an IOE or exam-style' : 'an IOE'} question card`);
  // Big picture is always the Lecturer (rule 44): no role versions there.
  ok(!Object.keys(st.figureProps.variants ?? {}).length, `  taught by the Lecturer only (no role versions)`);
  for (const [r, va] of Object.entries(st.figureProps.variants ?? {})) {
    const vq = qLine(va.board ?? st.figureProps.board);
    ok(!!vq && /IOE/.test(textOf(vq.node)), `  [${r}] opens with the same IOE question`);
    if (vq && main) {
      const strip = (n) => textOf(n.node).replace(/^.*?\)\s*|IOE[^A-Za-z]*?(?=[A-Z][a-z])/g, '').slice(-60);
      ok(textOf(vq.node).includes(strip(main).slice(-40)), `  [${r}] question text matches the main answer`, true);
    }
  }
}
for (const q of spec.bigPicture) {
  // Matched on the question text (papers are shared between questions).
  const key = q.q.replace(/\(digest.*$/, '').slice(0, 40);
  const hit = picture.find((st) => textOf(qLine(st.figureProps.board)?.node).includes(key));
  ok(!!hit, `Past question ${q.id} (${q.papers[0]}…) is answered in Big picture${hit ? `: "${hit.title}"` : ''}`);
}

// Roles: every main video outside Big picture in all four roles.
for (const st of steps.filter((x) => !x.segment?.startsWith('3/3'))) {
  const native = st.figureProps.pov ?? autoPov(st.segment);
  const have = new Set([native, ...Object.keys(st.figureProps.variants ?? {})]);
  const miss = ROLES.filter((r) => !have.has(r));
  ok(!miss.length, `Roles for "${st.title}": native ${native}${miss.length ? `, missing ${miss.join(', ')}` : ', all 4'}`);
  // Same material: each key result (eq/answer line) of the native script
  // should appear in every role version (its left-hand symbol, at least).
  const keys = (st.figureProps.board ?? []).filter((l) => l.kind === 'eq' || l.kind === 'answer').map((l) => textOf(l.node).split('=')[0].replace(/[\\{}\s_]|dfrac|text|boxed/g, '')).filter((k) => k.length && k.length < 8);
  for (const [r, va] of Object.entries(st.figureProps.variants ?? {})) {
    if (!va.board) continue;
    const all = (va.board.map((l) => textOf(l.node)).join(' ') + ' ' + (va.beats ?? []).map((b) => b.say).join(' ')).replace(/[\\{}\s_]/g, '');
    const lost = keys.filter((k) => !all.includes(k));
    if (lost.length) ok(false, `  [${r}] may drop key result(s) ${lost.join(', ')} of the native script (same material, rule 44)`, true);
  }
}

// Lint (errors only) for this topic, all role versions included.
const lint = spawnSync('node', [path.join(here, 'lint.mjs'), num, '--main', '--quiet'], { encoding: 'utf8' });
const summary = (lint.stdout.trim().split('\n').pop() ?? '').trim();
ok(lint.status === 0, `Lint: ${summary}`);

// Voice: lines with no clip yet, main scripts and role versions.
let lines = 0;
let chars = 0;
for (const st of steps) {
  const sets = [st.figureProps.beats, ...Object.values(st.figureProps.variants ?? {}).map((va) => va.beats).filter(Boolean)];
  for (const beats of sets)
    for (const b of beats) {
      const t = voice.beatText(b);
      if (!t || clips[voice.voiceKey(t)]) continue;
      lines++;
      chars += voice.spoken(t).length;
    }
}
ok(true, `Voice: ${lines} line(s) not recorded ≈ ${chars} characters (credits) incl. role versions; record only after the user says yes`);

console.log('\nStatus:');
console.log(out.join('\n'));
console.log(`\n${fails.length ? `NOT game-ready: ${fails.length} failing check(s)` : 'Game-ready (content). Voice and MP4 follow the user’s go-ahead.'}${warns.length ? `, ${warns.length} warning(s) to review` : ''}.`);
process.exit(gate && fails.length ? 1 : 0);
