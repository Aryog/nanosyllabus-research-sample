import { useEffect, useState } from 'react';
import LessonPlayer, { XpCounter } from './components/LessonPlayer.jsx';
import Mascot from './components/Mascot.jsx';
import { useNarrator } from './components/useNarrator.js';
import { course } from './content/course.jsx';

const KEY = 'dcm-progress';
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? { done: [], xp: 0 };
  } catch {
    return { done: [], xp: 0 };
  }
}

const ICONS = ['🧲', '➡️', '🔄', '🔩', '🔋', '⚙️', '🔀', '🔌', '🎛️', '📉'];

function LessonNode({ lesson, index, state, onStart, offset }) {
  return (
    <div className="node-row" style={{ transform: `translateX(${offset}px)` }}>
      <button className={`node node-${state}`} onClick={onStart} aria-label={`Start ${lesson.title}`}>
        <span className="node-face">{state === 'done' ? '✓' : ICONS[index]}</span>
      </button>
      {state === 'next' && <div className="node-tip">Start</div>}
      <div className="node-label">
        <span className="node-num">Lesson {index + 1}</span>
        <b>{lesson.title}</b>
        <span className="muted">{lesson.blurb}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [progress, setProgress] = useState(load);
  // Dev shortcut: ?l=<lesson>&s=<step> jumps straight into a screen.
  const dev = import.meta.env.DEV ? new URLSearchParams(location.search) : null;
  const [active, setActive] = useState(dev?.has('l') ? Number(dev.get('l')) : null);
  const narrator = useNarrator();

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const addXp = (n) => setProgress((p) => ({ ...p, xp: p.xp + n }));
  const complete = (id) => setProgress((p) => ({ ...p, done: p.done.includes(id) ? p.done : [...p.done, id] }));
  const nextIdx = course.lessons.findIndex((l) => !progress.done.includes(l.id));

  if (active !== null) {
    return (
      <LessonPlayer
        key={active}
        course={course}
        lessonIndex={active}
        startStep={dev?.has('s') ? Number(dev.get('s')) : 0}
        narrator={narrator}
        xp={progress.xp}
        addXp={addXp}
        onComplete={complete}
        onExit={() => {
          narrator.stop();
          setActive(null);
        }}
      />
    );
  }

  const pct = Math.round((progress.done.length / course.lessons.length) * 100);
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
              <circle cx="60" cy="60" r="40" fill="#262626" stroke="#5fd3b8" strokeWidth="3" />
              <rect x="22" y="40" width="14" height="40" rx="3" fill="#ff6b6b" />
              <rect x="84" y="40" width="14" height="40" rx="3" fill="#6c8cff" />
              <g className="spin-slow" style={{ transformOrigin: '60px 60px' }}>
                <rect x="40" y="57" width="40" height="6" rx="3" fill="#d08a3c" />
                <rect x="57" y="40" width="6" height="40" rx="3" fill="#d08a3c" opacity="0.5" />
              </g>
              <circle cx="60" cy="60" r="5" fill="#ddd" />
            </svg>
          </div>
          <span className="eyebrow">Electricity & Magnetism</span>
          <h1>{course.title}</h1>
          <p className="muted">{course.tagline}</p>
          <div className="course-progress">
            <div className="progress"><div className="progress-fill" style={{ width: `${Math.max(pct, 2)}%` }} /></div>
            <span>{pct}%</span>
          </div>
          <button className="btn btn-green wide" onClick={() => setActive(nextIdx === -1 ? 0 : nextIdx)}>
            {progress.done.length === 0 ? 'Start course' : nextIdx === -1 ? 'Review course' : 'Continue'}
          </button>
          <div className="course-meta">
            <span>{course.lessons.length} lessons</span>
            <span>{course.lessons.reduce((n, l) => n + l.steps.filter((s) => s.input || s.task).length, 0)} interactive problems</span>
          </div>
        </section>

        <section className="path">
          {course.lessons.map((l, i) => (
            <LessonNode
              key={l.id}
              lesson={l}
              index={i}
              offset={[0, 60, 0, -60][i % 4]}
              state={progress.done.includes(l.id) ? 'done' : i === nextIdx ? 'next' : 'open'}
              onStart={() => setActive(i)}
            />
          ))}
          <div className="path-mascot">
            <div className="bubble tone-info">Hi! I’m Sparky. Tap a lesson to begin.</div>
            <Mascot pose={progress.done.length === course.lessons.length ? 'dab' : 'talk'} size={96} />
          </div>
        </section>
      </div>
    </div>
  );
}
