import { useEffect, useMemo, useRef, useState } from 'react';
import Mascot from './Mascot.jsx';
import { beatText } from '../video/voice.js';
import { INPUTS } from './inputs.jsx';
import { CORRECT_LINES, WRONG_LINES } from '../content/narration.js';

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/*
  Adaptive review
  - A Skill-check question (after the SKILL interstitial) that was answered wrong
    at least once, or revealed, is re-queued once at the end of the lesson, after
    the last question and before any trailing summary / the lesson-complete screen.
  - The retry shows `step.variant` (a partial step merged over the original, e.g.
    new body/input/hint/why/figureProps) or a separate step with `retryOf: <id>`
    (matched against the original's `id ?? narration`; such steps are hidden from
    the normal flow). With neither, the identical question is shown again.
  - `checkin: true` marks a low-stakes mid-lesson question: +10 XP whenever it is
    solved (no penalty for wrong tries), never re-queued, not in accuracy stats.
  - `flashback: true` just tags a spaced-retrieval question from an earlier lesson.
  - `practice: true` steps are left out of the lesson and offered after the
    lesson-complete screen as an optional practice set (surplus IOE past
    questions). A practice step with `retryOf` also serves as that question's retry.
  - `ioe: true` tags an IOE past-paper question, `tag` adds any other label,
    and `chapter` labels the screen with its chapter.
  - `video: true` marks a self-playing Scene: the screen goes wide, and when the
    video ends the lesson moves on by itself after a short countdown.
  - `onProgress(k)` reports the index k of the current main screen, so a long
    lesson can resume where the learner left off (passed back as `startStep`).
  - `onTopicEnd(k)` is called instead of moving on at the end of a whole
    micro-topic (the next one starts at main screen k); its last screen offers
    Finish. Segments inside a topic just run on into each other.
  XP: first try 15 / later 5 (Skill check and practice), retry 10 / 5, check-in 10, task 10.
*/
const REVIEW_STEP = { interstitial: { title: 'Let’s try that again', badge: 'review' }, narration: 'review' };
const PRACTICE_STEP = { interstitial: { title: 'Extra practice', badge: 'practice' }, narration: 'practice' };

function buildRetry(steps, i) {
  const orig = steps[i];
  const key = orig.id ?? orig.narration;
  const variant = steps.find((s) => s.retryOf && s.retryOf === key) ?? orig.variant;
  const { retryOf, variant: _v, practice: _p, ...rest } = variant ?? {};
  return { ...orig, ...rest, variant: undefined, retry: true };
}

function Icon({ name }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'close':
      return <svg width="22" height="22" viewBox="0 0 24 24" {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case 'flag':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h2v18H5zM8 4h10l-2.5 4L18 12H8z" /></svg>;
    case 'sound':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'mute':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'chat':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16v12H8l-4 4z" /><path d="M8 9h8M8 12h5" stroke="#1b1b1b" strokeWidth="1.8" strokeLinecap="round" /></svg>;
    case 'mic':
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0012 0M12 17v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
    case 'restart':
      return <svg width="16" height="16" viewBox="0 0 24 24" {...p}><path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7L4 9" /><path d="M4 4v5h5" /></svg>;
    default:
      return null;
  }
}

export function XpCounter({ xp, bump }) {
  return (
    <div className={`xp ${bump ? 'bump' : ''}`}>
      <span>{xp}</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#2fd16b"><path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" /><circle cx="20" cy="4" r="1.6" /></svg>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffd43b"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
    </div>
  );
}

// A video's running time (mm:ss) from its lines: clip length when recorded is
// not known here, so ~80 ms per spoken character plus the pause between lines.
const runTime = (st) => {
  const beats = st?.figureProps?.beats ?? [];
  const ms = beats.reduce((t, b) => t + Math.max(2000, beatText(b).length * 80) + 200, 0);
  const sec = Math.round(ms / 1000);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
};

export default function LessonPlayer({ course, lessonIndex, startStep = 0, reachStep = 0, crumbs = [], narrator, xp, addXp, onExit, onComplete, onProgress, onTopicEnd }) {
  const lesson = course.lessons[lessonIndex];
  const [pos, setPos] = useState(startStep);
  const [missed, setMissed] = useState([]);
  const [mode, setMode] = useState('lesson');
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState('idle');
  const [tries, setTries] = useState(0);
  const [solved, setSolved] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [bubbleTone, setBubbleTone] = useState('info');
  const [pose, setPose] = useState('talk');
  const [xpBump, setXpBump] = useState(false);
  // Game layer: XP pops for finished videos and first-try checks, plus a streak.
  const [toast, setToast] = useState(null);
  const [streak, setStreak] = useState(0);
  const watched = useRef(new Set());
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [reviewStats, setReviewStats] = useState({ correct: 0, total: 0 });
  const [done, setDone] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  // Furthest screen reached, so the progress bar can jump back to anything seen.
  const [reach, setReach] = useState(Math.max(startStep, reachStep));
  const scrollRef = useRef(null);

  // Playable sequence: lesson steps (minus `retryOf` alternates), with the review
  // block spliced in right after the last question.
  const { base, slot, skillIdx } = useMemo(() => {
    const b = lesson.steps.map((st, i) => (st.retryOf || st.practice ? null : { i })).filter(Boolean);
    const lastQ = b.reduce((acc, e, k) => (lesson.steps[e.i].input ? k : acc), -1);
    const sk = lesson.steps.findIndex((st) => st.interstitial?.badge === 'check');
    return { base: b, slot: lastQ + 1, skillIdx: sk };
  }, [lesson]);
  const practiceSeq = useMemo(() => {
    const ps = lesson.steps.map((st, i) => (st.practice ? { i } : null)).filter(Boolean);
    return ps.length ? [{ practiceIntro: true }, ...ps] : [];
  }, [lesson]);
  const sequence = useMemo(
    () =>
      mode === 'practice'
        ? practiceSeq
        : missed.length
          ? [...base.slice(0, slot), { review: true }, ...missed.map((i) => ({ i, retry: true })), ...base.slice(slot)]
          : base,
    [base, slot, missed, mode, practiceSeq],
  );
  const entry = sequence[Math.min(pos, sequence.length - 1)];
  const step = useMemo(
    () =>
      entry.review
        ? REVIEW_STEP
        : entry.practiceIntro
          ? PRACTICE_STEP
          : entry.retry
            ? buildRetry(lesson.steps, entry.i)
            : lesson.steps[entry.i],
    [entry, lesson],
  );
  const inPractice = mode === 'practice';
  const inter = !done && step.interstitial;
  // The next screen opens a new micro-topic: this one ends with Finish, back
  // on the unit path.
  const after = done || inPractice || !onTopicEnd ? null : sequence[pos + 1];
  const afterStep = after && !after.review && !after.retry ? lesson.steps[after.i] : null;
  const topicEnd = !!afterStep?.interstitial && !afterStep.segmentBreak;
  const nextLabel = topicEnd ? 'Finish ✓' : null;
  const isQuestion = !!step.input;
  const isTask = !!step.task;
  const inputDef = isQuestion ? (step.input.type === 'figure' ? step.input : INPUTS[step.input.type]) : null;

  // Enter a step: reset state and let Sparky read the prompt.
  useEffect(() => {
    if (done) return;
    setValue(null);
    setStatus('idle');
    setTries(0);
    setSolved(false);
    setWhyOpen(false);
    setHelpOpen(false);
    setVideoEnded(false);
    setBubbleTone('info');
    setPose(step.pose ?? 'talk');
    narrator.say(step.narration);
    scrollRef.current?.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, lessonIndex, done, mode]);

  useEffect(() => {
    if (!done) setReach((r) => Math.max(r, pos));
  }, [pos, done]);

  useEffect(() => {
    if (done || inPractice || entry.review || entry.retry) return;
    onProgress?.(base.indexOf(entry));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, done, mode]);

  useEffect(() => {
    if (!inter) return;
    const t = setTimeout(() => setPos((i) => i + 1), 1500);
    return () => clearTimeout(t);
  }, [inter, pos]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    // A micro-topic's last video waits for Finish.
    if (!videoEnded || topicEnd) return;
    const t = setTimeout(() => next(), 4000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoEnded]);

  const gainXp = (n) => {
    addXp(n);
    setXpBump(true);
    setTimeout(() => setXpBump(false), 600);
  };

  const pop = (label, xp) => setToast({ label, xp, key: Date.now() });
  const onVideoEnd = () => {
    setVideoEnded(true);
    const id = `${mode}-${entry.i}`;
    if (watched.current.has(id)) return;
    watched.current.add(id);
    gainXp(10);
    pop('Video complete', 10);
  };
  const onCheck = (right, first) => {
    if (!first) return;
    if (!right) return setStreak(0);
    const n = streak + 1;
    setStreak(n);
    const bonus = n >= 3 ? 5 : 0;
    gainXp(5 + bonus);
    pop(n >= 3 ? `🔥 ${n} streak!` : 'Ekdam sahi!', 5 + bonus);
  };

  const markRight = (line) => {
    setBubbleTone('correct');
    setPose('jab');
    narrator.say(line);
  };

  const onTaskSolved = () => {
    if (solved) return;
    setSolved(true);
    setStatus('correct');
    gainXp(10);
    markRight('fb-task');
  };

  const changeValue = (v) => {
    setValue(v);
    if (status === 'wrong') {
      setStatus('idle');
      setBubbleTone('info');
      setPose(step.pose ?? 'talk');
    }
  };

  const check = () => {
    const ok = inputDef.correct(value, step.input);
    if (ok) {
      setStatus('correct');
      const first = tries === 0;
      if (step.checkin) {
        gainXp(10);
      } else if (inPractice) {
        gainXp(first ? 15 : 5);
      } else if (step.retry) {
        gainXp(first ? 10 : 5);
        setReviewStats((s) => ({ correct: s.correct + (first ? 1 : 0), total: s.total + 1 }));
      } else {
        gainXp(first ? 15 : 5);
        setStats((s) => ({ correct: s.correct + (first ? 1 : 0), total: s.total + 1 }));
      }
      markRight(pick(CORRECT_LINES));
    } else {
      setStatus('wrong');
      setTries((t) => t + 1);
      setBubbleTone('wrong');
      setPose('oops');
      narrator.say(pick(WRONG_LINES));
    }
  };

  const tryAgain = () => {
    setValue(inputDef.retry ? inputDef.retry(value, step.input) : null);
    setStatus('idle');
    setBubbleTone('info');
    setPose(step.pose ?? 'talk');
    narrator.say(step.narration);
  };

  const reveal = () => {
    setHelpOpen(false);
    if (inputDef.reveal) setValue(inputDef.reveal(step.input));
    setStatus('revealed');
    if (step.retry) setReviewStats((s) => ({ ...s, total: s.total + 1 }));
    else if (!step.checkin && !inPractice) setStats((s) => ({ ...s, total: s.total + 1 }));
    setWhyOpen(true);
    setBubbleTone('info');
    setPose('think');
    narrator.say('fb-answer');
  };

  // Escape hatches so a stubborn interactive never blocks the lesson.
  const skipTask = () => {
    setBubbleTone('info');
    setPose('talk');
    next();
  };

  const openHelp = () => {
    setHelpOpen(true);
    narrator.say('fb-reveal');
  };

  const startOver = () => {
    setResetKey((k) => k + 1);
    setValue(null);
    if (status === 'wrong') setStatus('idle');
    if (isTask && !solved) setStatus('idle');
  };

  const next = () => {
    // Re-queue a Skill-check question that needed a second attempt or was revealed.
    const shaky = status === 'revealed' || tries > 0;
    const requeue =
      !inPractice && isQuestion && shaky && !entry.retry && !entry.review && !step.checkin && skillIdx >= 0 && entry.i > skillIdx && !missed.includes(entry.i);
    const len = sequence.length + (requeue ? (missed.length ? 1 : 2) : 0);
    if (requeue) setMissed((m) => [...m, entry.i]);
    if (topicEnd && !requeue) {
      narrator.stop();
      onTopicEnd(base.indexOf(after));
    } else if (pos < len - 1) {
      setPos((i) => i + 1);
    } else {
      setDone(true);
      setPose('jab');
      setBubbleTone('correct');
      narrator.say('lesson-done');
      if (!inPractice) onComplete(lesson.id);
    }
  };

  const startPractice = () => {
    setMode('practice');
    setPos(0);
    setDone(false);
  };

  // Main bar tracks the lesson's own screens; review pips track the retries.
  const passed = sequence.slice(0, pos);
  const basePassed = passed.filter((e) => !e.review && !e.retry).length;
  const reviewsPassed = passed.filter((e) => e.retry).length;
  const progress = done ? 1 : inPractice ? pos / sequence.length : basePassed / base.length;
  // Inside a micro-topic the bar splits into its three segments (terms,
  // derivation, big picture), each filling as its screens are passed.
  const segBars = useMemo(() => {
    if (inPractice || done || !step.segment || entry?.i == null) return null;
    const groups = {};
    lesson.steps.forEach((st, k) => {
      if (st.chapter === step.chapter && st.segment && !st.practice && !st.retryOf) (groups[st.segment] ??= []).push(k);
    });
    return Object.keys(groups)
      .sort()
      .map((seg) => {
        const ks = groups[seg];
        const ticks = ks.map((k, n) => {
          const st = lesson.steps[k];
          const name = st.title ?? (st.input ? 'Question' : st.task ? 'Try it' : seg);
          return { k, n: n + 1, of: ks.length, at: sequence.findIndex((e) => e.i === k && !e.retry), title: name, kind: st.video ? 'Video' : st.input ? 'Question' : 'Screen' };
        });
        return { seg, ticks, now: seg === step.segment, frac: ks.filter((k) => k < entry.i).length / ks.length };
      });
  }, [lesson, step, entry, sequence, inPractice, done]);
  const resolved = status === 'correct' || status === 'revealed';
  const complete = isQuestion && inputDef.complete(value, step.input);
  const Figure = step.Figure;
  const InputComp = isQuestion && step.input.type !== 'figure' ? inputDef.Component : null;

  // First few spoken lines of the videos after this screen, so the scene can
  // have their voice ready before the learner gets there.
  const upcomingLines = useMemo(() => {
    const out = [];
    for (const e of sequence.slice(pos + 1)) {
      const beats = e.i != null && !e.retry ? lesson.steps[e.i]?.figureProps?.beats : null;
      if (beats) out.push(...beats.map(beatText).filter(Boolean));
      if (out.length >= 3) break;
    }
    return out;
  }, [sequence, pos, lesson]);

  const figureProps = useMemo(
    () => ({
      ...(step.figureProps ?? {}),
      ...(isTask ? { onSolved: onTaskSolved, solved } : {}),
      ...(isQuestion && step.input.type === 'figure' ? { value, setValue: changeValue, status } : {}),
      ...(step.video
        ? {
            onEnded: onVideoEnd,
            onCheck,
            onNext: next,
            nextLabel,
            upcoming: upcomingLines,
            title: step.title,
            kicker: [step.chapter?.split(' · ')[0], step.segment, step.ioe && 'IOE'].filter(Boolean).join(' · '),
            segment: step.segment,
          }
        : {}),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, solved, value, status, upcomingLines, streak, nextLabel],
  );

  const glow = status === 'correct' || done ? 'glow-correct' : status === 'wrong' ? 'glow-wrong' : '';

  if (inter) {
    return (
      <div className="player">
        <header className="topbar hidden" />
        <main className="card interstitial" onClick={() => setPos((i) => i + 1)}>
          <div className="inter-art">
            <div className={`badge badge-${inter.badge}`}>{inter.icon ?? (inter.badge === 'check' ? '✓' : inter.badge === 'review' ? '↻' : inter.badge === 'practice' ? '✎' : '⚡')}</div>
            <Mascot pose="jab" size={130} />
          </div>
          {inter.kicker && <span className="eyebrow">{inter.kicker}</span>}
          <h2>{inter.title}</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="player">
      <header className="topbar">
        <div className="crumbs">
          <button className="icon-btn" onClick={onExit} aria-label="Close lesson">
            <Icon name="close" />
          </button>
          {/* Where you are: subject › unit › topic · segment; each part links back. */}
          <nav className="crumb-trail" aria-label="You are here">
            {crumbs.map((c) => (
              <button key={c.label} onClick={c.onClick}>{c.label}</button>
            ))}
            {step.chapter && <span>{[step.chapter.split(' · ')[0], step.segment?.split(' · ')[1]].filter(Boolean).join(' · ')}</span>}
          </nav>
        </div>
        <div className="progress-group">
          {segBars ? (
            segBars.map((b) => (
              <div key={b.seg} className={`progress progress-seg ${b.now ? 'now' : ''}`}>
                <div className="progress-fill" style={{ width: `${b.now ? Math.max(b.frac * 100, 4) : b.frac * 100}%` }} />
                <div className="progress-ticks">
                  {b.ticks.map((t) => {
                    // Hover card: where this screen sits, its name, and whether you can go there.
                    const here = t.k === entry.i;
                    const open = t.at >= 0 && t.at <= reach && !here;
                    const state = here ? '▶ Ahile yaha cha' : t.at >= 0 && t.at < pos ? '✓ Herisakyau · click garera feri hera' : open ? 'Click garera jau' : '🔒 Aghi badhepachi khulcha';
                    return (
                      <button
                        key={t.k}
                        className={`progress-tick ${here ? 'on' : ''}`}
                        aria-disabled={!open}
                        onClick={() => open && setPos(t.at)}
                        aria-label={`${t.kind} ${t.n}/${t.of}: ${t.title}. ${state}`}
                      >
                        <span className="tick-tip" role="tooltip">
                          <small>{[step.chapter?.split(' · ')[0], b.seg].filter(Boolean).join(' · ')} · {t.kind} {t.n}/{t.of}</small>
                          <b>{t.title}</b>
                          <span className={here ? 'now' : open ? 'go' : 'lock'}>{state}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="progress">
              <div className="progress-fill" style={{ width: `${Math.max(progress * 100, 2)}%` }} />
            </div>
          )}
          {!inPractice && missed.map((i, k) => (
            <span
              key={`r${i}`}
              className={`progress-review ${done || k < reviewsPassed ? 'done' : ''} ${!done && entry.retry && entry.i === i ? 'now' : ''}`}
              title="Review question"
            />
          ))}
          {course.lessons.slice(lessonIndex + 1).map((l) => (
            <span key={l.id} className="progress-dot" title={l.title} />
          ))}
        </div>
        <XpCounter xp={xp} bump={xpBump} />
      </header>

      <main className={`card ${glow} ${step.video && !done ? "card-video" : ""}`}>
        {toast && (
          <div className="xp-toast" key={toast.key} role="status">
            <Mascot pose="dab" size={84} />
            <div className="xp-toast-text">
              <b>+{toast.xp} XP</b>
              <span>{toast.label}</span>
            </div>
            {[...Array(8)].map((_, i) => (
              <i key={i} className="xp-bit" style={{ '--a': `${i * 45 + 20}deg` }} />
            ))}
          </div>
        )}

        <div className="scroll" ref={scrollRef}>
          {done ? (
            <div className="complete">
              <Mascot pose="jab" size={180} />
              <h1>{inPractice ? 'Practice complete!' : lesson.doneTitle ?? 'Lesson complete!'}</h1>
              <p className="muted">{lesson.title}</p>
              <div className="complete-stats">
                <div><b>{xp}</b><span>Total XP</span></div>
                <div><b>{stats.total ? Math.round((stats.correct / stats.total) * 100) : 100}%</b><span>First-try accuracy</span></div>
                {reviewStats.total > 0 && (
                  <div><b>{reviewStats.correct}/{reviewStats.total}</b><span>Reviews fixed</span></div>
                )}
                <div><b>{sequence.length}</b><span>Screens</span></div>
              </div>
              {!inPractice && practiceSeq.length > 0 && (
                <p className="muted center">
                  Optional: {practiceSeq.length - 1} more practice question{practiceSeq.length > 2 ? 's' : ''} (IOE past papers and variants).
                </p>
              )}
            </div>
          ) : (
            <div className={`content ${step.video ? 'wide' : ''} ${step.video && segBars ? 'yt' : ''}`} key={`${lessonIndex}-${pos}`}>
              {/* Videos carry their own title and topic inside the player. */}
              {!step.video && (step.chapter || step.segment || step.retry || step.checkin || step.flashback || step.ioe || step.tag || inPractice) && (
                <div className="q-tags">
                  {step.chapter && <span className="q-tag q-tag-chapter">{step.chapter}</span>}
                  {step.segment && <span className="q-tag q-tag-segment">{step.segment}</span>}
                  {inPractice && <span className="q-tag q-tag-practice">Practice</span>}
                  {step.ioe && <span className="q-tag q-tag-ioe">IOE ma sodhiyeko</span>}
                  {step.tag && <span className={`q-tag q-tag-${step.tagKind ?? 'tryit'}`}>{step.tag}</span>}
                  {step.retry && <span className="q-tag q-tag-review">↻ Review</span>}
                  {step.checkin && <span className="q-tag q-tag-checkin">Quick check</span>}
                  {step.flashback && <span className="q-tag q-tag-flash">Flashback</span>}
                </div>
              )}
              {!step.video && step.body}
              {Figure && (
                <div className="figure">
                  <Figure key={resetKey} {...figureProps} />
                </div>
              )}
              {step.video && segBars && (
                // Up next, like a video site: the topic's videos by segment,
                // each with its length; open ones can be clicked.
                <aside className="yt-list" aria-label="Videos in this topic">
                  <div className="yt-list-head">
                    <b>{step.chapter}</b>
                  </div>
                  {segBars.map((b) => (
                    <section key={b.seg} className="yt-seg">
                      <h3>{b.seg}</h3>
                      {b.ticks.map((t) => {
                        const here = t.k === entry.i;
                        const open = t.at >= 0 && t.at <= reach && !here;
                        const seen = t.at >= 0 && t.at < pos;
                        return (
                          <button key={t.k} className={`yt-item ${here ? 'now' : ''} ${seen ? 'seen' : ''}`} disabled={!open && !here} onClick={() => open && setPos(t.at)}>
                            <span className={`yt-thumb seg-${b.seg[0]}`}>
                              <i>{here ? '▶' : open || seen ? t.n : '🔒'}</i>
                              <small>{runTime(lesson.steps[t.k])}</small>
                            </span>
                            <span className="yt-text">
                              <b>{t.title}</b>
                              <small>{here ? 'Ahile herdai' : seen ? '✓ Herisakyau' : open ? 'Click garera hera' : 'Aghi badhepachi khulcha'}</small>
                            </span>
                          </button>
                        );
                      })}
                    </section>
                  ))}
                </aside>
              )}
              {step.after}
              {InputComp && <InputComp value={value} setValue={changeValue} status={status} input={step.input} />}
              {(isQuestion || isTask) && !resolved && (
                <button className="start-over" onClick={startOver}>
                  <Icon name="restart" /> Start over
                </button>
              )}
              {helpOpen && status === 'wrong' && (
                <div className="why help">
                  <div className="why-title">Hint</div>
                  {step.hint ?? <p>Re-read the prompt slowly and check each part of your answer.</p>}
                  {tries >= 2 && (
                    <button className="link-btn" onClick={reveal}>Show me the answer</button>
                  )}
                </div>
              )}
              {whyOpen && step.why && (
                <div className="why">
                  <div className="why-title">Why?</div>
                  {step.why}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Videos carry Skip / Next in their own bar; the page is all video. */}
        {(!step.video || done) && (
        <footer className="bottom">
          <div className="sparky">
            {narrator.caption && (
              <div className={`bubble tone-${bubbleTone}`} key={narrator.caption + bubbleTone}>
                {narrator.caption}
              </div>
            )}
            <div className="sparky-row">
              <button className="sparky-btn" onClick={narrator.replay} title="Hear Sparky again">
                <Mascot pose={pose} speaking={narrator.speaking} size={88} />
              </button>
            </div>
          </div>

          <div className="actions">
            {done ? (
              <>
                {!inPractice && practiceSeq.length > 0 && (
                  <button className="btn btn-grey" onClick={startPractice}>Extra practice</button>
                )}
                <button className="btn btn-green" onClick={onExit}>Continue</button>
              </>
            ) : isQuestion ? (
              resolved ? (
                <>
                  {step.why && !whyOpen && <button className="btn btn-grey" onClick={() => setWhyOpen(true)}>Why?</button>}
                  <button className="btn btn-green" onClick={next}>{nextLabel ?? 'Continue'}</button>
                </>
              ) : status === 'wrong' ? (
                <>
                  <button className="btn btn-grey" onClick={tries >= 2 ? reveal : openHelp}>{tries >= 2 ? 'Show answer' : 'Get help'}</button>
                  <button className="btn btn-amber" onClick={tryAgain}>Try again</button>
                </>
              ) : (
                <>
                  <button className="btn btn-grey" onClick={reveal} title="Show the answer and explanation">Skip</button>
                  <button className="btn btn-light" disabled={!complete} onClick={check}>Check</button>
                </>
              )
            ) : isTask && !solved ? (
              <>
                <button className="btn btn-grey" onClick={skipTask} title="Move on without finishing">Skip</button>
                <button className="btn btn-light" disabled>{step.taskLabel ?? 'Continue'}</button>
              </>
            ) : (
              <button className={`btn ${isTask || videoEnded ? 'btn-green' : 'btn-light'} ${videoEnded ? 'btn-next-auto' : ''}`} onClick={next}>
                {step.video && !videoEnded ? 'Skip video' : nextLabel ?? 'Aghi badhau'}
              </button>
            )}
          </div>
          <div className="bottom-spacer" />
        </footer>
        )}
      </main>
    </div>
  );
}
