import { useEffect, useLayoutEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import LessonPlayer, { XpCounter } from './components/LessonPlayer.jsx';
import Mascot from './components/Mascot.jsx';
import { useNarrator } from './components/useNarrator.js';
import { syllabus } from './content/syllabus.js';

import { units } from './content/units/index.jsx';

// v3: one record per unit ({ done, pos, max }) and one XP total. The v2
// record (the DC motor course alone) becomes Unit 4's.
const KEY = 'em-progress-v4'; // v4: one topic per IOE syllabus bullet (topic numbers changed)
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) return { xp: 0, units: {}, ...saved };
    const v2 = JSON.parse(localStorage.getItem('dcm-progress-v2'));
    if (v2) return { xp: v2.xp ?? 0, units: { 'dc-motor': { done: v2.done ?? [], pos: v2.pos ?? 0, max: v2.max ?? 0 } } };
    return { xp: JSON.parse(localStorage.getItem('dcm-progress'))?.xp ?? 0, units: {} };
  } catch {
    return { xp: 0, units: {} };
  }
}

// Routes: / (syllabus) · /electrical-machines/<unit> (unit path) ·
// /electrical-machines/<unit>/lesson/:n (player at main-path screen n).
const ROOT = '/electrical-machines';
const SEG = ['Basic Understanding', 'Syllabus Content', 'Model Answer'];

// Per unit: its main path, and one node per micro-topic spanning its screens;
// inside it, where each of its three segments starts and ends.
const plans = Object.fromEntries(
  units.map((u) => {
    const journey = u.journey;
    const path = journey.steps.filter((st) => !st.practice && !st.retryOf);
    const breaks = path.map((st, i) => (st.interstitial && !st.segmentBreak ? i : -1)).filter((i) => i >= 0);
    const topicNodes = breaks.map((b, k) => {
      const end = (breaks[k + 1] ?? path.length) - 1;
      const cuts = [b, ...path.map((st, i) => (st.segmentBreak && i > b && i <= end ? i : -1)).filter((i) => i >= 0)];
      return {
        num: journey.nums[k],
        title: journey.chapters[k],
        start: b,
        end,
        segs: cuts.map((start, j) => ({ start, end: (cuts[j + 1] ?? end + 1) - 1, label: SEG[j] })),
      };
    });
    return [u.slug, { unit: u, journey, path, topicNodes, course: { id: journey.id, title: u.title, lessons: [journey] } }];
  }),
);

export default function App() {
  const [progress, setProgress] = useState(load);
  // Dev shortcut: ?s=<step> jumps straight into a screen.
  const dev = import.meta.env.DEV ? new URLSearchParams(location.search) : null;
  // The URL is the state, so Back works and a reload stays put.
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const lesson = matchPath(`${ROOT}/:unit/lesson/:n`, pathname);
  const unitMatch = lesson ?? matchPath(`${ROOT}/:unit`, pathname);
  const plan = plans[unitMatch?.params.unit] ?? null;
  const slug = plan?.unit.slug ?? 'dc-motor';
  const UNIT = `${ROOT}/${slug}`;
  const view = plan ? 'unit' : 'syllabus';
  const active = plan && (dev?.has('s') ? Number(dev.get('s')) : lesson ? Number(lesson.params.n) : null);
  const setView = (v, to = slug) => navigate(v === 'unit' ? `${ROOT}/${to}` : '/');
  const setActive = (n) => navigate(n == null ? UNIT : `${UNIT}/lesson/${n}`);
  // Opening the unit lands on the lesson node you're at, not the top of the path.
  useEffect(() => {
    if (view !== 'unit' || active !== null) return;
    requestAnimationFrame(() => document.querySelector('.unit-node.now')?.scrollIntoView({ block: 'center' }));
  }, [view, active]);
  const narrator = useNarrator();
  // Just finished a micro-topic: Sparky hops from its last node to the next
  // topic's first one (state.hop = the main screen it starts at) and waits there.
  const hop = view === 'unit' && active === null ? state?.hop : null;
  useLayoutEffect(() => {
    if (hop == null) return;
    const go = () => navigate(UNIT, { replace: true });
    const to = document.querySelector('.unit-node.now');
    const from = document.querySelector(`.unit-node[data-end="${hop - 1}"]`);
    const sparky = to?.querySelector('.mascot');
    if (!from || !sparky || !to.matches(`[data-start="${hop}"]`)) return go();
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    const dx = a.left - b.left;
    const dy = a.top - b.top;
    const at = (f) => `translate(${dx * (1 - f)}px, ${dy * (1 - f) - Math.sin(f * Math.PI) * 60}px)`;
    const run = sparky.animate(
      [{ transform: at(0) }, { transform: at(0.25) }, { transform: at(0.5) }, { transform: at(0.75) }, { transform: at(1) }],
      { duration: 1100, delay: 350, easing: 'ease-in-out', fill: 'backwards' },
    );
    const t = setTimeout(go, 1100 + 350);
    return () => {
      run.cancel();
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hop]);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const addXp = (n) => setProgress((p) => ({ ...p, xp: p.xp + n }));
  const rec = (p, s = slug) => ({ done: [], pos: 0, max: 0, ...(p.units[s] ?? {}) });
  const setRec = (f) => setProgress((p) => ({ ...p, units: { ...p.units, [slug]: f(rec(p)) } }));
  const complete = (id) => setRec((r) => ({ ...r, pos: 0, max: 0, done: r.done.includes(id) ? r.done : [...r.done, id] }));
  // `pos` is the screen last shown; `max` the furthest reached, so going back to
  // an earlier topic never loses the place to continue from.
  const saveSpot = (pos) => setRec((r) => (r.pos === pos ? r : { ...r, pos, max: Math.max(r.max ?? r.pos, pos) }));
  const statusOf = (s) => {
    const r = rec(progress, s);
    const { journey, path } = plans[s];
    const finished = r.done.includes(journey.id);
    const furthest = Math.max(r.max ?? 0, r.pos);
    return { finished, furthest, started: furthest > 0, pct: finished ? 100 : path.length ? Math.round((furthest / path.length) * 100) : 0 };
  };
  const { finished, furthest, started, pct } = statusOf(slug);
  const { journey, path, topicNodes, course, unit } = plan ?? plans['dc-motor'];

  if (active !== null && active !== false) {
    return (
      <LessonPlayer
        key={`${slug}-${active}`}
        course={course}
        lessonIndex={0}
        startStep={active}
        reachStep={finished ? path.length : furthest}
        narrator={narrator}
        xp={progress.xp}
        addXp={addXp}
        onComplete={complete}
        onProgress={saveSpot}
        onTopicEnd={(at) => {
          saveSpot(at);
          navigate(UNIT, { state: { hop: at } });
        }}
        crumbs={[
          { label: syllabus.subject, onClick: () => { narrator.stop(); setView('syllabus'); } },
          { label: unit.title, onClick: () => { narrator.stop(); setActive(null); } },
        ]}
        onExit={() => {
          narrator.stop();
          setActive(null);
        }}
      />
    );
  }

  const open = (k) => setActive(k);

  if (view === 'syllabus') {
    return (
      <div className="home">
        <header className="home-top">
          <div className="brand">
            <span className="brand-mark">⚡</span> Spark<span className="muted">lab</span>
          </div>
          <XpCounter xp={progress.xp} />
        </header>
        <main className="syl">
          <h1 className="syl-title">{syllabus.subject}</h1>
          <ol className="syl-units">
            {syllabus.units.map((u) => {
              const live = units.find((x) => x.num === u.num && x.topics.length);
              const st = live && statusOf(live.slug);
              return (
              <li key={u.num}>
                {live ? (
                  <button className="syl-unit live" onClick={() => setView('unit', live.slug)}>
                    <span className="syl-icon">{u.icon}</span>
                    <span className="syl-body">
                      <span className="syl-kicker">Unit {u.num} · {live.topics.length} topics</span>
                      <b>{u.title}</b>
                      <span className="syl-bar"><span style={{ width: `${Math.max(st.pct, 3)}%` }} /></span>
                    </span>
                    <span className="syl-go">{st.started ? 'Continue' : 'Start'} →</span>
                  </button>
                ) : (
                  <div className="syl-unit locked">
                    <span className="syl-icon">{u.icon}</span>
                    <span className="syl-body">
                      <span className="syl-kicker">Unit {u.num}</span>
                      <b>{u.title}</b>
                      <span className="syl-topics">{u.topics.join(' · ')}</span>
                    </span>
                    <span className="syl-soon">🔒 Chhito aaudai</span>
                  </div>
                )}
              </li>
              );
            })}
          </ol>
        </main>
      </div>
    );
  }

  // The unit as a Duolingo-style path: each micro-topic is a section of three
  // lesson nodes (terms, derivation, big picture) winding down the page.
  const nodeState = (start, end) => (finished || furthest > end ? 'done' : furthest >= start ? 'now' : 'locked');
  return (
    <div className="home">
      <header className="home-top">
        <button className="link-back" onClick={() => setView('syllabus')}>← {syllabus.subject}</button>
        <XpCounter xp={progress.xp} />
      </header>
      <main className="unit">
        <div className="unit-banner">
          <div>
            <span>Unit {unit.num}</span>
            <h1>{unit.title}</h1>
          </div>
          <span className="unit-pct">{pct}%</span>
        </div>
        {topicNodes.map((t, k) => (
          <section key={t.num} className="unit-topic">
            <div className="unit-topic-head">
              <b>{t.num}</b> {t.title}
            </div>
            <div className="unit-path">
              {(() => {
                const st = nodeState(t.start, t.end);
                const off = [-1, 0, 1][k % 3] * 70;
                const seg = t.segs.find((g) => furthest <= g.end) ?? t.segs.at(-1);
                return (
                  <div className={`unit-node ${st}`} data-start={t.start} data-end={t.end} style={{ transform: `translateX(${off}px)` }}>
                    {st === 'now' && <span className="unit-tip">{furthest > t.start ? 'Continue' : 'Start'}</span>}
                    <button disabled={st === 'locked'} onClick={() => open(st === 'now' ? furthest : t.start)} aria-label={`${t.num} ${t.title}`}>
                      {st === 'done' ? '✓' : st === 'locked' ? '🔒' : t.num}
                    </button>
                    {/* Its three segments: done, the one you're in, still to come. */}
                    <span className="unit-segs">
                      {t.segs.map((g) => (
                        <i key={g.start} className={nodeState(g.start, g.end)} title={g.label} />
                      ))}
                    </span>
                    <span className="unit-label">{st === 'now' ? seg.label : `${t.segs.length} parts`}</span>
                    {st === 'now' && <Mascot pose="talk" size={78} />}
                  </div>
                );
              })()}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
