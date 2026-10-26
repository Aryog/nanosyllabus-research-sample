import { useEffect, useId, useRef, useState } from 'react';

/*
  Scene: a short, self-playing "video" built from beats, like a whiteboard
  explainer. Each beat shows a caption (read aloud by the browser voice) and
  reveals or highlights parts of the drawing / board.

  <Scene
    viewBox="0 0 360 220"           // optional SVG drawing area
    draw={(s) => <>…svg…</>}         // s.on(k) → class that fades in from beat k
                                     // s.on(k, j) → visible only for beats k…j
                                     // s.hl(k) → ' hl' on beat k (signal / glow)
                                     // s.beat → current beat index
    board={[{ at: 2, kind: 'eq', node: <>…</> }]}   // text lines that build up
    beats={[{ say: 'caption', ms?: 4000, ask?: { q, options, answer, why } }]}
    onEnded={() => …}                // called once after the last beat
  />

  An `ask` beat pauses the video on a question; the video resumes once the
  learner answers and presses Continue. kind: 'h' (heading), 'eq' (equation),
  'step' (derivation line), 'note' (muted aside), 'hook' (memory hook), default text.
*/

const isMuted = () => {
  try {
    return localStorage.getItem('dcm-muted') === '1';
  } catch {
    return false;
  }
};

// Make symbols speakable for the browser voice.
const SPOKEN = [
  [/⊙/g, ' dot '], [/⊗/g, ' cross '], [/φ/g, ' phi '], [/Φ/g, ' phi '], [/Ω/g, ' ohm '], [/∝/g, ' is proportional to '],
  [/→/g, ' to '], [/⟹/g, ', so '], [/↑/g, ' up '], [/↓/g, ' down '], [/²/g, ' squared '], [/√/g, ' root '], [/π/g, ' pi '],
  [/η/g, ' eta '], [/τ/g, ' tau '], [/×/g, ' times '], [/÷/g, ' divided by '], [/−/g, ' minus '], [/≈/g, ' about '],
  [/\bEb\b/g, 'E b'], [/\bIa\b/g, 'I a'], [/\bRa\b/g, 'R a'], [/\bTa\b/g, 'T a'], [/\bIsh\b/g, 'I shunt'], [/\bRsh\b/g, 'R shunt'],
  [/\bIL\b/g, 'I L'], [/\bWc\b/g, 'W c'], [/\bPm\b/g, 'P m'], [/\brpm\b/g, 'R P M'], [/\bIOE\b/g, 'I O E'], [/\bNVC\b/g, 'N V C'], [/\bOLR\b/g, 'O L R'],
];
const spoken = (t) => SPOKEN.reduce((acc, [re, to]) => acc.replace(re, to), t);

function pickVoice() {
  const vs = window.speechSynthesis.getVoices();
  return vs.find((v) => v.lang === 'en-IN') ?? vs.find((v) => /en[-_]GB/i.test(v.lang)) ?? vs.find((v) => v.lang?.startsWith('en'));
}

const readMs = (t = '') => Math.max(2600, 1200 + t.length * 58);

export function Scene({ beats, draw, board, viewBox = '0 0 360 220', onEnded, tall }) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [voice, setVoice] = useState(() => !isMuted() && 'speechSynthesis' in window);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState({});
  const [ended, setEnded] = useState(false);
  const endedRef = useRef(false);
  const rough = `wb-${useId().replace(/:/g, '')}`;
  const cur = beats[beat];
  const ask = cur.ask;
  const waiting = ask && !picked[beat]?.done;

  const finish = () => {
    setPlaying(false);
    setEnded(true);
    if (!endedRef.current) {
      endedRef.current = true;
      onEnded?.();
    }
  };
  const advance = () => (beat < beats.length - 1 ? setBeat((b) => b + 1) : finish());

  useEffect(() => {
    if (!playing) return;
    let timeUp = false;
    let spokeDone = !voice;
    const maybe = () => {
      if (timeUp && spokeDone && !waiting) advance();
    };
    const text = ask ? `${cur.say ?? ''} ${ask.q}` : cur.say ?? '';
    if (voice && text && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(spoken(text));
      const v = pickVoice();
      if (v) u.voice = v;
      u.lang = v?.lang ?? 'en-IN';
      u.rate = 1.03;
      u.onend = u.onerror = () => {
        spokeDone = true;
        setTimeout(maybe, 450);
      };
      window.speechSynthesis.speak(u);
    }
    // Some browsers never fire onend; don't let the video hang on them.
    const guard = voice ? setTimeout(() => {
      spokeDone = true;
      maybe();
    }, readMs(text) * 2.2) : null;
    const t = setTimeout(() => {
      timeUp = true;
      maybe();
    }, voice ? 1400 : cur.ms ?? readMs(text));
    return () => {
      clearTimeout(t);
      clearTimeout(guard);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, playing, run, voice, waiting]);

  useEffect(() => () => 'speechSynthesis' in window && window.speechSynthesis.cancel(), []);

  const jump = (k) => {
    setEnded(false);
    setBeat(k);
    setPlaying(true);
    setRun((r) => r + 1);
  };
  const toggle = () => {
    if (ended) return jump(0);
    setPlaying((p) => !p);
    setRun((r) => r + 1);
  };
  const choose = (i) => {
    if (picked[beat]) return;
    setPicked((p) => ({ ...p, [beat]: { i, done: false } }));
  };
  const resume = () => {
    setPicked((p) => ({ ...p, [beat]: { ...p[beat], done: true } }));
    setPlaying(true);
    advance();
  };

  const s = {
    beat,
    on: (k, until = Infinity) => (beat >= k && beat <= until ? 'sc on' : 'sc'),
    hl: (k) => (beat === k ? ' hl' : ''),
    at: (k) => beat >= k,
  };
  const pick = picked[beat];

  return (
    <div className={`scene beat-${beat} ${tall ? 'tall' : ''}`}>
      <div className="scene-screen">
        {draw && (
          <svg viewBox={viewBox} className="scene-svg" role="img">
            {/* A slight wobble so strokes look hand-drawn with a marker. */}
            <defs>
              <filter id={rough}>
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="1.6" />
              </filter>
            </defs>
            <g filter={`url(#${rough})`}>{draw(s)}</g>
          </svg>
        )}
        {board && (
          <div className={`board ${draw ? '' : 'board-only'}`}>
            {board.map((b, i) => (
              <div key={i} className={`board-line kind-${b.kind ?? 'text'} ${beat >= b.at && (b.until == null || beat <= b.until) ? 'on' : ''} ${beat === b.at ? 'hl' : ''}`}>
                <span className="ink">{b.node}</span>
                {beat === b.at && <span className="pen" aria-hidden="true">✎</span>}
              </div>
            ))}
          </div>
        )}
        {ask && (
          <div className="scene-ask">
            <div className="scene-ask-card">
              <span className="scene-ask-tag">{ask.tag ?? 'Pause and think'}</span>
              <p className="scene-ask-q">{ask.q}</p>
              <div className="scene-ask-options">
                {ask.options.map((o, i) => (
                  <button
                    key={i}
                    className={`scene-opt ${pick ? (i === ask.answer ? 'right' : pick.i === i ? 'wrong' : 'dim') : ''}`}
                    onClick={() => choose(i)}
                  >
                    {o}
                  </button>
                ))}
              </div>
              {pick && (
                <div className="scene-ask-why">
                  <b>{pick.i === ask.answer ? 'Yes!' : 'Not quite.'}</b> {ask.why}
                  {!pick.done && (
                    <button className="scene-resume" onClick={resume}>
                      Continue video ▶
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        <div className="scene-caption" key={`${beat}-${run}`}>
          {cur.say}
        </div>
      </div>

      <div className="scene-bar">
        <button className="scene-btn" onClick={toggle} aria-label={ended ? 'Replay' : playing ? 'Pause' : 'Play'}>
          {ended ? '↻' : playing && !waiting ? '❚❚' : '▶'}
        </button>
        <div className="scene-track">
          {beats.map((b, k) => (
            <button key={k} className={`seg ${k < beat || ended ? 'done' : k === beat ? 'now' : ''} ${b.ask ? 'ask' : ''}`} onClick={() => jump(k)} aria-label={`Go to part ${k + 1}`}>
              {k === beat && !ended && (
                <span
                  key={run}
                  className="seg-fill"
                  style={{ animationDuration: `${voice ? readMs(b.say) * 1.1 : b.ms ?? readMs(b.say)}ms`, animationPlayState: playing && !waiting ? 'running' : 'paused' }}
                />
              )}
            </button>
          ))}
        </div>
        <button
          className={`scene-btn ${voice ? 'on' : ''}`}
          onClick={() => {
            setVoice((v) => !v);
            setRun((r) => r + 1);
          }}
          title={voice ? 'Voice on' : 'Voice off'}
        >
          {voice ? '🔊' : '🔈'}
        </button>
      </div>
    </div>
  );
}

/* A memory hook card, shown at the end of a chapter's video run. */
export function Hook({ big, lines }) {
  return (
    <div className="hook">
      <span className="hook-tag">Memory hook</span>
      <div className="hook-big">{big}</div>
      {lines && <ul>{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>}
    </div>
  );
}

/*
  Model answer for an IOE theory question: the question as set, the papers it
  came in, and the points to write (revealed on tap, like the marking scheme).
*/
export function ModelAnswer({ q, papers, marks, points, tip }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="model">
      <div className="model-head">
        <span className="model-tag">IOE asked · {papers.length} paper{papers.length > 1 ? 's' : ''}</span>
        {marks && <span className="model-marks">{marks}</span>}
      </div>
      <p className="model-q">“{q}”</p>
      <div className="model-papers">{papers.map((p) => <span key={p}>{p}</span>)}</div>
      {open ? (
        <ol className="model-points">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
      ) : (
        <button className="chip primary" onClick={() => setOpen(true)}>Show model answer</button>
      )}
      {open && tip && <p className="model-tip">✍️ {tip}</p>}
    </div>
  );
}
