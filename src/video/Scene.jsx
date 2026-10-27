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

// Plain text of a board line, to pace its handwriting by length.
const textOf = (n) => (n == null || typeof n === 'boolean' ? '' : typeof n !== 'object' ? String(n) : Array.isArray(n) ? n.map(textOf).join('') : textOf(n.props?.children));
const writeSecs = (n) => Math.min(2.6, Math.max(0.8, textOf(n).length * 0.045));

// Wide screens lay the board out like a real whiteboard: a drawing beside its
// notes, and long derivations in two columns.
const WIDE = '(min-width: 901px)';
const useWide = () => {
  const [wide, setWide] = useState(() => typeof matchMedia !== 'undefined' && matchMedia(WIDE).matches);
  useEffect(() => {
    const m = matchMedia(WIDE);
    const on = () => setWide(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return wide;
};

// Write a (possibly wrapped) board line the way a hand does: one visual line at
// a time, left to right. Reveals the ink with a clip-path and returns the
// marker's path over it as WAAPI keyframes (ink-local px).
function writeLines(ink, r, k0, w, h, secs) {
  const range = document.createRange();
  range.selectNodeContents(ink);
  const rows = [];
  for (const q of range.getClientRects()) {
    if (!q.width) continue;
    const b = { top: (q.top - r.top) / k0, bottom: (q.bottom - r.top) / k0, left: (q.left - r.left) / k0, right: (q.right - r.left) / k0 };
    const row = rows.find((x) => b.top < x.bottom - 2 && b.bottom > x.top + 2);
    if (row) Object.assign(row, { top: Math.min(row.top, b.top), bottom: Math.max(row.bottom, b.bottom), left: Math.min(row.left, b.left), right: Math.max(row.right, b.right) });
    else rows.push(b);
  }
  rows.sort((a, b) => a.top - b.top);
  if (!rows.length) return null;
  const W = w + 20;
  const H = h + 20;
  // Everything above this row, plus the row itself up to x.
  const poly = (row, x) => `polygon(-10px -10px, ${W}px -10px, ${W}px ${row.top}px, ${x}px ${row.top}px, ${x}px ${row.bottom}px, -10px ${row.bottom}px)`;
  const total = rows.reduce((n, x) => n + (x.right - x.left), 0) || 1;
  const clip = [];
  const pen = [];
  let t = 0;
  rows.forEach((row, i) => {
    const t1 = i === rows.length - 1 ? 0.97 : t + ((row.right - row.left) / total) * 0.97;
    const y = row.top + (row.bottom - row.top) * 0.75;
    clip.push({ offset: t, clipPath: poly(row, row.left) }, { offset: t1, clipPath: poly(row, row.right + 4) });
    pen.push({ offset: t, transform: `translate(${row.left}px, ${y}px)` }, { offset: t1, transform: `translate(${row.right}px, ${y}px)` });
    t = t1;
  });
  clip.push({ offset: 1, clipPath: `polygon(-10px -10px, ${W}px -10px, ${W}px ${H}px, ${W}px ${H}px, ${W}px ${H}px, -10px ${H}px)` });
  pen.push({ offset: 1, transform: pen[pen.length - 1].transform });
  ink.animate(clip, { duration: secs * 1000, easing: 'linear', fill: 'forwards' });
  return pen;
}

// Cartoon hand holding a marker; the marker tip is the element's top-left corner.
const Hand = () => (
  <svg className="hand-svg" viewBox="0 0 120 130" aria-hidden="true">
    <path d="M72 96 L120 130 L120 104 L88 80 Z" fill="#3b5bdb" stroke="#1f2328" strokeWidth="3" strokeLinejoin="round" />
    <path d="M4 4 L14 9 L58 58 L48 66 L6 16 Z" fill="#1f2328" />
    <path d="M14 9 L58 58 L52 63 L9 14 Z" fill="#495057" />
    <path d="M4 4 L10 6 L6 12 Z" fill="#1c7ed6" />
    <path d="M44 52 C40 42 52 34 62 40 L96 62 C108 70 104 92 90 96 L70 100 C56 102 46 92 48 80 Z" fill="#f2c39b" stroke="#1f2328" strokeWidth="3" strokeLinejoin="round" />
    <path d="M38 50 C32 44 38 36 46 40 L62 52" fill="#f2c39b" stroke="#1f2328" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M56 70 C62 72 70 72 76 68 M60 82 C66 84 74 84 80 80" fill="none" stroke="#1f2328" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

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
  const [hand, setHand] = useState(null);
  const handRef = useRef(null);
  useEffect(() => {
    if (hand?.path && handRef.current) handRef.current.animate(hand.path, { duration: hand.secs * 1000, easing: 'linear', fill: 'forwards' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hand?.path]);
  const wide = useWide();
  const split = wide && draw && board?.length > 1;
  // Long derivation: heading across the top, the rest written column by column.
  const head = board && !draw && board[0]?.kind === 'h' ? 1 : 0;
  // Columns are balanced by text length, so long answer points don't pile up on one side.
  let cols = 0;
  if (wide && board && !draw && board.length - head >= 7) {
    const size = board.slice(head).map((b) => textOf(b.node).length + 30);
    const half = size.reduce((a, b) => a + b, 0) / 2;
    let sum = 0;
    let k = 0;
    while (k < size.length - 1 && sum + size[k] / 2 < half) sum += size[k++];
    cols = head + Math.max(1, k);
  }

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
    // The hand follows the line being written, or points at the highlighted part.
    const pen = () => {
      const el = camRef.current;
      if (!el || ended) return setHand(null);
      const o = el.getBoundingClientRect();
      const k0 = new DOMMatrix(getComputedStyle(el).transform).a || 1;
      const ink = el.querySelector('.board-line.hl:not(.kind-q) .ink');
      const part = !ink && el.querySelector('svg .hl');
      const r = (ink || part)?.getBoundingClientRect();
      if (!r || (!r.width && !r.height)) return setHand(null);
      const x = (r.left - o.left) / k0;
      const y = (r.top - o.top) / k0;
      const w = r.width / k0;
      const h = r.height / k0;
      if (!ink) return setHand({ mode: 'point', x: x + w / 2, y: y + h / 2 });
      const secs = parseFloat(ink.parentElement.style.getPropertyValue('--wd')) || 1.4;
      setHand({ mode: 'write', x, y, secs, path: writeLines(ink, r, k0, w, h, secs) });
    };
    // Lines above may still be growing: re-anchor the hand once they settle.
    const follow = () => {
      const el = camRef.current;
      const ink = el?.querySelector('.board-line.hl:not(.kind-q) .ink');
      if (!ink) return;
      const o = el.getBoundingClientRect();
      const r = ink.getBoundingClientRect();
      const k0 = new DOMMatrix(getComputedStyle(el).transform).a || 1;
      setHand((h) => (h?.mode === 'write' ? { ...h, x: (r.left - o.left) / k0, y: (r.top - o.top) / k0 } : h));
    };
    // Once as the line starts, again after it has grown to full height.
    const a = setTimeout(() => {
      frame();
      pen();
    }, 60);
    const b = setTimeout(() => {
      frame();
      follow();
    }, 700);
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
          <div className={`scene-cam ${split ? 'split' : ''}`} ref={camRef} style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})` }}>
            {draw && (
              <svg viewBox={viewBox} className="scene-svg" role="img">
                {draw(s)}
              </svg>
            )}
            {board && (
              <div className={`board ${draw ? '' : 'board-only'} ${cols ? 'board-cols' : ''}`}>
                {(cols ? [board.slice(0, head), board.slice(head, cols), board.slice(cols)] : [board]).map((part, c) => (
                  <div key={c} className={cols ? (c ? 'board-col' : 'board-head') : 'board-flow'}>
                    {part.map((b, i) => (
                      <div
                        key={i}
                        className={`board-line kind-${b.kind ?? 'text'} ${beat >= b.at && (b.until == null || beat <= b.until) ? 'on' : ''} ${beat === b.at ? 'hl' : ''}`}
                        style={{ '--wd': `${writeSecs(b.node)}s` }}
                      >
                        <span className="ink">{b.node}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {hand && (
              <div
                key={`${beat}-${run}`}
                ref={handRef}
                className={`hand hand-${hand.mode}`}
                style={{ left: hand.x, top: hand.y, '--wd': `${hand.secs ?? 1.4}s` }}
              >
                <div className="hand-bob">
                  <Hand />
                </div>
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
