import { useEffect, useRef, useState } from 'react';
import { beatText, isNepali, spoken, voiceKey } from './voice.js';

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
    beats={[{ say: 'caption', voice?: 'देवनागरी', ms?: 4000, ask?: { q, voice?, options, answer, why } }]}
                                     // say/q are shown; voice (Devanagari) is spoken when given
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

const BASE = import.meta.env.BASE_URL;

// Recorded clips, keyed by voiceKey(text). Loaded once for all scenes.
let clips = {};
const clipsReady = fetch(`${BASE}audio/scene/manifest.json`)
  .then((r) => (r.ok ? r.json() : {}))
  .then((m) => (clips = m))
  .catch(() => {});

// Sparky's recorded Nepali reactions (public/audio/fb-*.mp3), said when an
// in-video question is answered.
const REACT = { right: ['fb-correct-1', 'fb-correct-2', 'fb-correct-3'], wrong: ['fb-wrong-1', 'fb-wrong-2'] };
let sparky = null;
function react(right) {
  sparky ??= fetch(`${BASE}audio/manifest.json`).then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  sparky.then((m) => {
    const ids = REACT[right ? 'right' : 'wrong'].filter((id) => m[id]);
    const id = ids[Math.floor(Math.random() * ids.length)];
    if (id) new Audio(`${BASE}audio/${id}.mp3?v=${m[id]}`).play().catch(() => {});
  });
}

// Keep the next AHEAD lines recorded before they are needed, and no more, so
// the voice never waits on ElevenLabs. Dev only: the server records and caches.
const AHEAD = 3;
const asked = new Set();
function prepare(texts) {
  if (!import.meta.env.DEV) return;
  clipsReady.then(() => {
    for (const text of texts.slice(0, AHEAD)) {
      const key = voiceKey(text);
      if (clips[key] || asked.has(key)) continue;
      asked.add(key);
      fetch(`${BASE}api/tts/${key}.mp3?ahead`)
        .then((r) => {
          if (r.ok) clips[key] ??= 'new';
          else asked.delete(key);
        })
        .catch(() => asked.delete(key));
    }
  });
}

// Fallback browser voice: Devanagari lines need a Nepali (or Hindi) voice;
// an English voice can't read them.
function pickVoice(text) {
  const vs = window.speechSynthesis.getVoices();
  if (isNepali(text)) return vs.find((v) => v.lang?.startsWith('ne')) ?? vs.find((v) => v.lang?.startsWith('hi'));
  return vs.find((v) => v.lang === 'en-IN') ?? vs.find((v) => /en[-_]GB/i.test(v.lang)) ?? vs.find((v) => v.lang?.startsWith('en'));
}

// Playback speed for the voice: fast, explainer-video pace (pitch is kept).
const SPEED = 1.3;
const GAP = 200; // pause after a line, ms
const MIN_BEAT = 800; // shortest a beat can be, ms

const ZOOM_MAX = 1.6; // closest the camera gets to one part

const readMs = (t = '') => Math.max(2000, (1200 + t.length * 58) / SPEED);

export function Scene({ beats, draw, board, viewBox = '0 0 360 220', onEnded, tall, upcoming = [] }) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [voice, setVoice] = useState(() => !isMuted() && 'speechSynthesis' in window);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState({});
  const [ended, setEnded] = useState(false);
  const endedRef = useRef(false);
  const stageRef = useRef(null);
  const camRef = useRef(null);
  const [cam, setCam] = useState({ x: 0, y: 0, k: 1 });

  // Camera, like an explainer video: zoom onto what this beat explains (the
  // board line being written, or the drawing parts it highlights); on beats
  // with nothing new, and at the end, pull back to show the whole board.
  useEffect(() => {
    const frame = () => {
      const stage = stageRef.current;
      const el = camRef.current;
      if (!stage || !el) return;
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const cw = el.offsetWidth;
      const ch = el.offsetHeight;
      if (!W || !H || !cw || !ch) return;
      const fit = Math.min(1, W / cw, H / ch);
      const whole = ended || beat === beats.length - 1;
      let box = null;
      if (!whole) {
        // Measure against the transform on screen now (it may be mid-move).
        const o = el.getBoundingClientRect();
        const k0 = new DOMMatrix(getComputedStyle(el).transform).a || 1;
        for (const part of el.querySelectorAll('.board-line.hl .ink, svg .hl')) {
          const r = part.getBoundingClientRect();
          if (!r.width && !r.height) continue;
          const b = { l: (r.left - o.left) / k0, t: (r.top - o.top) / k0, r: (r.right - o.left) / k0, b: (r.bottom - o.top) / k0 };
          box = box ? { l: Math.min(box.l, b.l), t: Math.min(box.t, b.t), r: Math.max(box.r, b.r), b: Math.max(box.b, b.b) } : b;
        }
      }
      let k = fit;
      let cx = cw / 2;
      let cy = ch / 2;
      if (box) {
        const pad = 28;
        k = Math.max(fit, Math.min(ZOOM_MAX, W / (box.r - box.l + 2 * pad), H / (box.b - box.t + 2 * pad)));
        cx = (box.l + box.r) / 2;
        cy = (box.t + box.b) / 2;
      }
      // Centre on the part, but never show past the board's edges.
      const place = (view, size, c) => (size * k <= view ? (view - size * k) / 2 : Math.min(0, Math.max(view - size * k, view / 2 - c * k)));
      setCam({ k, x: place(W, cw, cx), y: place(H, ch, cy) });
    };
    // Once as the line starts, again after it has grown to full height.
    const a = setTimeout(frame, 60);
    const b = setTimeout(frame, 700);
    window.addEventListener('resize', frame);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      window.removeEventListener('resize', frame);
    };
  }, [beat, ended, beats.length]);
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
    let live = true;
    let timeUp = false;
    let spokeDone = !voice;
    let audio = null;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const maybe = () => {
      if (live && timeUp && spokeDone && !waiting) advance();
    };
    const text = beatText(cur);
    // Lines after this one: rest of this video, then the next videos.
    prepare([...beats.slice(beat + 1).map(beatText), ...upcoming].filter(Boolean));
    const minMs = cur.ms ?? readMs(text);
    // Voice failed or is missing: fall back to reading time, never rush the beat.
    const silent = () => {
      spokeDone = true;
      later(() => {
        timeUp = true;
        maybe();
      }, minMs);
    };

    const speakBrowser = () => {
      const v = 'speechSynthesis' in window ? pickVoice(text) : null;
      if (!v) return silent();
      let started = false;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(spoken(text));
      u.voice = v;
      u.lang = v.lang;
      u.rate = SPEED;
      u.onstart = () => (started = true);
      u.onend = u.onerror = () => {
        if (!live) return;
        if (!started) return silent();
        spokeDone = true;
        later(maybe, GAP);
      };
      window.speechSynthesis.speak(u);
      // Some browsers never fire onend; don't let the video hang on them.
      later(() => {
        spokeDone = true;
        maybe();
      }, minMs * 2.2);
      later(() => {
        timeUp = true;
        maybe();
      }, MIN_BEAT);
    };

    if (!voice || !text) {
      later(() => {
        timeUp = true;
        maybe();
      }, minMs);
    } else {
      clipsReady.then(() => {
        if (!live) return;
        const key = voiceKey(text);
        // In dev, a line that isn't recorded yet is recorded on the spot (and cached).
        const src = clips[key] ? `${BASE}audio/scene/${key}.mp3?v=${clips[key]}` : import.meta.env.DEV ? `${BASE}api/tts/${key}.mp3` : null;
        if (!src) return speakBrowser();
        audio = new Audio(src);
        audio.playbackRate = SPEED;
        audio.preservesPitch = true;
        audio.onplay = () => (clips[key] ??= 'new');
        audio.onended = () => {
          spokeDone = true;
          later(maybe, GAP);
        };
        // Recording failed or autoplay was blocked: fall back once.
        let fell = false;
        const fallback = (fn) => () => {
          if (!live || fell) return;
          fell = true;
          fn();
        };
        audio.onerror = fallback(speakBrowser);
        audio.play().catch(fallback(silent));
        later(() => {
          timeUp = true;
          maybe();
        }, MIN_BEAT);
      });
    }
    return () => {
      live = false;
      timers.forEach(clearTimeout);
      if (audio) audio.pause();
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
    if (voice) react(i === ask.answer);
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
      <div className={`scene-screen ${ask ? 'asking' : ''}`}>
        <div className="scene-stage" ref={stageRef}>
          <div className="scene-cam" ref={camRef} style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})` }}>
            {draw && (
              <svg viewBox={viewBox} className="scene-svg" role="img">
                {draw(s)}
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
          </div>
        </div>
        {ask && (
          <div className="scene-ask">
            <div className="scene-ask-card">
              <span className="scene-ask-tag">{ask.tag ?? 'Ekchin socha 🤔'}</span>
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
                  <b>{pick.i === ask.answer ? 'Ekdam sahi! 🔥' : 'Hmm, yo haina.'}</b> {ask.why}
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
        <button className="scene-btn" onClick={pick && !pick.done ? resume : toggle} aria-label={ended ? 'Replay' : playing ? 'Pause' : 'Play'}>
          {ended ? '↻' : playing && !waiting ? '❚❚' : '▶'}
        </button>
        {/* After answering, Continue sits in the bar so it is always on screen. */}
        {pick && !pick.done ? (
          <button className="scene-resume" onClick={resume}>
            Video continue ▶
          </button>
        ) : (
          <div className="scene-track">
            {beats.map((b, k) => (
              <button key={k} className={`seg ${k < beat || ended ? 'done' : k === beat ? 'now' : ''} ${b.ask ? 'ask' : ''}`} onClick={() => jump(k)} aria-label={`Go to part ${k + 1}`}>
                {k === beat && !ended && (
                  <span
                    key={run}
                    className="seg-fill"
                    style={{ animationDuration: `${b.ms ?? readMs(beatText(b))}ms`, animationPlayState: playing && !waiting ? 'running' : 'paused' }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
        <button
          className={`scene-btn ${voice ? 'on' : ''}`}
          onClick={() => {
            setVoice((v) => !v);
            setRun((r) => r + 1);
          }}
          title={voice ? 'Awaj on' : 'Awaj off'}
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
      <span className="hook-tag">Yaad rakhne trick</span>
      <div className="hook-big">{big}</div>
      {lines && <ul>{lines.map((l, i) => <li key={i}>{l}</li>)}</ul>}
    </div>
  );
}

/*
  Memory map: the Memorization segment of a chapter, as one card. It compresses
  the chapter (never re-teaches it): one line, the formulas, the derivation
  order, the mnemonic, must-remember points and the common slips.
*/
export function Memory({ line, formulas, order, big, remember, forget }) {
  return (
    <div className="memory">
      <span className="hook-tag">Memory map</span>
      <p className="memory-line">{line}</p>
      {formulas && (
        <div className="memory-block">
          <h4>Formula</h4>
          {formulas.map((f, i) => <div key={i} className="memory-eq">{f}</div>)}
        </div>
      )}
      {order && (
        <div className="memory-block">
          <h4>Derivation ko order</h4>
          <p className="memory-order">{order.join(' → ')}</p>
        </div>
      )}
      <div className="hook">
        <span className="hook-tag">Yaad rakhne trick</span>
        <div className="hook-big">{big}</div>
        {remember && <ul>{remember.map((l, i) => <li key={i}>{l}</li>)}</ul>}
      </div>
      {forget && (
        <div className="memory-block">
          <h4>Bhulne galti</h4>
          <ul>{forget.map((l, i) => <li key={i}>{l}</li>)}</ul>
        </div>
      )}
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
        <span className="model-tag">{papers.length ? `IOE ma sodhiyeko · ${papers.length} paper` : 'Exam-style question'}</span>
        {marks && <span className="model-marks">{marks}</span>}
      </div>
      <p className="model-q">“{q}”</p>
      {papers.length > 0 && <div className="model-papers">{papers.map((p) => <span key={p}>{p}</span>)}</div>}
      {open ? (
        <ol className="model-points">
          {points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ol>
      ) : (
        <button className="chip primary" onClick={() => setOpen(true)}>Model answer hera</button>
      )}
      {open && tip && <p className="model-tip">✍️ {tip}</p>}
    </div>
  );
}
