import { useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import LessonPlayer, { XpCounter } from './components/LessonPlayer.jsx';
import Mascot from './components/Mascot.jsx';
import { useNarrator } from './components/useNarrator.js';
import { course } from './content/course.jsx';
import { syllabus } from './content/syllabus.js';

// v2: the video course. Positions saved by the older course don't map onto it,
// so only the XP carries over.
const KEY = 'dcm-progress-v2';
function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) return { done: [], xp: 0, pos: 0, ...saved };
    return { done: [], xp: JSON.parse(localStorage.getItem('dcm-progress'))?.xp ?? 0, pos: 0 };
  } catch {
    return { done: [], xp: 0, pos: 0 };
  }
}

const journey = course.lessons[0];
const steps = journey.steps;
// Screens of the main path, as the player counts them (saved positions index this).
const path = steps.filter((st) => !st.practice && !st.retryOf);
// Micro-topic cards only; segment cards inside a topic don't start a row.
const breaks = path.map((st, i) => (st.interstitial && !st.segmentBreak ? i : -1)).filter((i) => i >= 0);
// Routes: / (syllabus) · /electrical-machines/dc-motor (unit path) ·
// /electrical-machines/dc-motor/lesson/:n (player at main-path screen n).
const UNIT = '/electrical-machines/dc-motor';

// Each micro-topic's three lesson nodes: where each segment starts and ends in
// the main path (segment 1 starts at the topic card, 2 and 3 at their cards).
const SEG = [['📘', 'Terms'], ['∫', 'Derivation'], ['★', 'Big picture']];
const topicNodes = breaks.map((b, k) => {
  const end = (breaks[k + 1] ?? path.length) - 1;
  const cuts = [b, ...path.map((st, i) => (st.segmentBreak && i > b && i <= end ? i : -1)).filter((i) => i >= 0)];
  return {
    num: journey.nums[k],
    title: journey.chapters[k],
    nodes: cuts.map((start, j) => ({ start, end: (cuts[j + 1] ?? end + 1) - 1, icon: SEG[j][0], label: SEG[j][1] })),
  };
});

export default function App() {
  const [progress, setProgress] = useState(load);
  // Dev shortcut: ?s=<step> jumps straight into a screen.
  const dev = import.meta.env.DEV ? new URLSearchParams(location.search) : null;
  // The URL is the state, so Back works and a reload stays put.
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lesson = matchPath(`${UNIT}/lesson/:n`, pathname);
  const view = lesson || matchPath(UNIT, pathname) ? 'unit' : 'syllabus';
  const active = dev?.has('s') ? Number(dev.get('s')) : lesson ? Number(lesson.params.n) : null;
  const setView = (v) => navigate(v === 'unit' ? UNIT : '/');
  const setActive = (n) => navigate(n == null ? UNIT : `${UNIT}/lesson/${n}`);
  // Opening the unit lands on the lesson node you're at, not the top of the path.
  useEffect(() => {
    if (view !== 'unit' || active !== null) return;
    requestAnimationFrame(() => document.querySelector('.unit-node.now')?.scrollIntoView({ block: 'center' }));
  }, [view, active]);
  const narrator = useNarrator();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const addXp = (n) => setProgress((p) => ({ ...p, xp: p.xp + n }));
  const complete = (id) => setProgress((p) => ({ ...p, pos: 0, max: 0, done: p.done.includes(id) ? p.done : [...p.done, id] }));
  // `pos` is the screen last shown; `max` the furthest reached, so going back to
  // an earlier topic never loses the place to continue from.
  const saveSpot = (pos) => setProgress((p) => (p.pos === pos ? p : { ...p, pos, max: Math.max(p.max ?? p.pos, pos) }));
  const finished = progress.done.includes(journey.id);
  const furthest = Math.max(progress.max ?? 0, progress.pos);
  const started = furthest > 0;

  if (active !== null) {
    return (
      <LessonPlayer
        key={active}
        course={course}
        lessonIndex={0}
        startStep={active}
        reachStep={finished ? path.length : furthest}
        narrator={narrator}
        xp={progress.xp}
        addXp={addXp}
        onComplete={complete}
        onProgress={saveSpot}
        crumbs={[
          { label: syllabus.subject, onClick: () => { narrator.stop(); setView('syllabus'); } },
          { label: 'DC Motor', onClick: () => { narrator.stop(); setActive(null); } },
        ]}
        onExit={() => {
          narrator.stop();
          setActive(null);
        }}
      />
    );
  }

  const pct = finished ? 100 : Math.round((furthest / path.length) * 100);
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
            {syllabus.units.map((u) => (
              <li key={u.num}>
                {u.live ? (
                  <button className="syl-unit live" onClick={() => setView('unit')}>
                    <span className="syl-icon">{u.icon}</span>
                    <span className="syl-body">
                      <span className="syl-kicker">Unit {u.num}</span>
                      <b>{u.title}</b>
                      <span className="syl-bar"><span style={{ width: `${Math.max(pct, 3)}%` }} /></span>
                    </span>
                    <span className="syl-go">{started ? 'Continue' : 'Start'} →</span>
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
            ))}
          </ol>
        </main>
      </div>
    );
  }

  // Unit 4 as a Duolingo-style path: each micro-topic is a section of three
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
            <span>Unit 4</span>
            <h1>DC Motor</h1>
          </div>
          <span className="unit-pct">{pct}%</span>
        </div>
        {topicNodes.map((t, k) => (
          <section key={t.num} className="unit-topic">
            <div className="unit-topic-head">
              <b>{t.num}</b> {t.title}
            </div>
            <div className="unit-path">
              {t.nodes.map((n, j) => {
                const st = nodeState(n.start, n.end);
                const off = [-1, 0, 1][(j + k) % 3] * 70;
                return (
                  <div key={j} className={`unit-node ${st}`} style={{ transform: `translateX(${off}px)` }}>
                    {st === 'now' && <span className="unit-tip">{furthest > n.start ? 'Continue' : 'Start'}</span>}
                    <button disabled={st === 'locked'} onClick={() => open(st === 'now' ? furthest : n.start)} aria-label={`${t.num} ${n.label}`}>
                      {st === 'done' ? '✓' : st === 'locked' ? '🔒' : n.icon}
                    </button>
                    <span className="unit-label">{n.label}</span>
                    {st === 'now' && <Mascot pose="talk" size={78} />}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
