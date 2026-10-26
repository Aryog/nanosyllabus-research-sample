import { useEffect, useState } from 'react';
import LessonPlayer, { XpCounter } from './components/LessonPlayer.jsx';
import Mascot from './components/Mascot.jsx';
import { useNarrator } from './components/useNarrator.js';
import { course } from './content/course.jsx';

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
const breaks = steps.map((st, i) => (st.interstitial ? i : -1)).filter((i) => i >= 0);
const videos = steps.filter((s) => s.video).length;
const pastCount = steps.filter((s) => s.chapter === 'Past Questions').length;

// Which outline row (chapter or Past Questions) a saved screen index falls in.
const sectionOf = (pos) => breaks.reduce((acc, b, k) => (pos >= b ? k : acc), 0);

export default function App() {
  const [progress, setProgress] = useState(load);
  // Dev shortcut: ?s=<step> jumps straight into a screen.
  const dev = import.meta.env.DEV ? new URLSearchParams(location.search) : null;
  const [active, setActive] = useState(dev?.has('s') ? 0 : null);
  const narrator = useNarrator();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const addXp = (n) => setProgress((p) => ({ ...p, xp: p.xp + n }));
  const complete = (id) => setProgress((p) => ({ ...p, pos: 0, done: p.done.includes(id) ? p.done : [...p.done, id] }));
  const saveSpot = (pos) => setProgress((p) => (p.pos === pos ? p : { ...p, pos }));
  const finished = progress.done.includes(journey.id);
  const started = progress.pos > 0;

  if (active !== null) {
    return (
      <LessonPlayer
        key={active}
        course={course}
        lessonIndex={0}
        startStep={dev?.has('s') ? Number(dev.get('s')) : progress.pos}
        narrator={narrator}
        xp={progress.xp}
        addXp={addXp}
        onComplete={complete}
        onProgress={saveSpot}
        onExit={() => {
          narrator.stop();
          setActive(null);
        }}
      />
    );
  }

  const pct = finished && !started ? 100 : Math.round((progress.pos / steps.length) * 100);
  const now = started ? sectionOf(progress.pos) : finished ? -1 : 0;
  const label = started ? 'Continue garau' : finished ? 'Feri suru garau' : 'Suru garau';
  return (
    <div className="home">
      <header className="home-top">
        <div className="brand">
          <span className="brand-mark">⚡</span> Spark<span className="muted">lab</span>
        </div>
        <XpCounter xp={progress.xp} />
      </header>
      <div className="home-grid">
        <section className="course-card">
          <div className="course-art">
            <svg viewBox="0 0 120 120" width="96" height="96">
              <circle cx="60" cy="60" r="40" fill="#f3f3f1" stroke="#0f9d84" strokeWidth="3" />
              <rect x="22" y="40" width="14" height="40" rx="3" fill="#e03131" />
              <rect x="84" y="40" width="14" height="40" rx="3" fill="#3b5bdb" />
              <g className="spin-slow" style={{ transformOrigin: '60px 60px' }}>
                <rect x="40" y="57" width="40" height="6" rx="3" fill="#c06a1f" />
                <rect x="57" y="40" width="6" height="40" rx="3" fill="#c06a1f" opacity="0.5" />
              </g>
              <circle cx="60" cy="60" r="5" fill="#5c5c5c" />
            </svg>
          </div>
          <span className="eyebrow">Electricity & Magnetism</span>
          <h1>{course.title}</h1>
          <p className="muted">{course.tagline}</p>
          <div className="course-progress">
            <div className="progress"><div className="progress-fill" style={{ width: `${Math.max(pct, 2)}%` }} /></div>
            <span>{pct}%</span>
          </div>
          <button className="btn btn-green wide" onClick={() => setActive(0)}>{label}</button>
          <div className="course-meta">
            <span>{journey.chapters.length} chapter · {pastCount} past question</span>
            <span>{videos} wota sano video</span>
          </div>
        </section>

        <section className="journey">
          <div className="node-row">
            <button className={`node ${finished && !started ? 'node-done' : 'node-next'}`} onClick={() => setActive(0)} aria-label={label}>
              <span className="node-face">{finished && !started ? '✓' : '⚡'}</span>
            </button>
            <div className="node-tip">{label}</div>
            <div className="node-label">
              <b>Euta journey, suru dekhi antya samma</b>
              <span className="muted">Sano sano video jun bich ma rokera question sodhcha, IOE model answer ra yaad rakhne trick, syllabus kai order ma. Ani last ma real past questions.</span>
            </div>
          </div>
          <ol className="outline">
            {[...journey.chapters, 'Past Questions'].map((title, k) => (
              <li key={title} className={`${k === now ? 'now' : ''} ${now === -1 || k < now ? 'done' : ''} ${k === journey.chapters.length ? 'past' : ''}`}>
                <span className="outline-num">{now === -1 || k < now ? '✓' : k === journey.chapters.length ? 'PQ' : k + 1}</span>
                {title}
                {k === journey.chapters.length && <span className="outline-beats">IOE 2065–2083</span>}
              </li>
            ))}
          </ol>
          <div className="path-mascot">
            <div className="bubble tone-info">{started ? 'Welcome back bro! Jaha chhodeko thiyau, tei bata continue garau.' : 'Hi! Ma Sparky. Start thicha, baki ma sangai guide garchu.'}</div>
            <Mascot pose={finished && !started ? 'dab' : 'talk'} size={96} />
          </div>
        </section>
      </div>
    </div>
  );
}
