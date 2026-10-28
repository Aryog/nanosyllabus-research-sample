import { useEffect, useMemo, useRef, useState } from 'react';
import rough from 'roughjs';
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

// The visual lines of a (possibly wrapped) board line, in ink-local px at
// scale 1: one box per row of text.
function rowsOf(ink, r, k) {
  const range = document.createRange();
  range.selectNodeContents(ink);
  const rows = [];
  for (const q of range.getClientRects()) {
    // Skip zero-size and KaTeX's 1px screen-reader boxes.
    if (q.width < 2 || q.height < 2) continue;
    const b = { top: (q.top - r.top) / k, bottom: (q.bottom - r.top) / k, left: (q.left - r.left) / k, right: (q.right - r.left) / k };
    const row = rows.find((x) => b.top < x.bottom - 2 && b.bottom > x.top + 2);
    if (row) Object.assign(row, { top: Math.min(row.top, b.top), bottom: Math.max(row.bottom, b.bottom), left: Math.min(row.left, b.left), right: Math.max(row.right, b.right) });
    else rows.push(b);
  }
  return rows.sort((a, b) => a.top - b.top);
}

// Write a board line the way a hand does: row by row, left to right. Every
// frame re-measures the line as it is on screen now (camera zoom mid-move,
// fonts loading, lines above still growing, a resize), so the reveal and the
// pen tip on `hand` always sit exactly on the text. Returns a stop function.
function writeLive(ink, cam, hand, secs) {
  const start = performance.now();
  ink.style.animation = 'none';
  let raf;
  const step = (now) => {
    const t = Math.min(1, (now - start) / (secs * 1000));
    const cr = cam.getBoundingClientRect();
    const k = cr.width / cam.offsetWidth || 1;
    const r = ink.getBoundingClientRect();
    const rows = rowsOf(ink, r, k);
    if (rows.length) {
      const size = (x) => x.right - x.left;
      let d = t * rows.reduce((n, x) => n + size(x), 0);
      let i = 0;
      while (i < rows.length - 1 && d > size(rows[i])) d -= size(rows[i++]);
      const row = rows[i];
      const x = Math.min(row.right, row.left + d);
      const W = r.width / k + 20;
      // Everything above this row, plus the row itself up to the pen.
      ink.style.clipPath = t < 1 ? `polygon(-10px -10px, ${W}px -10px, ${W}px ${row.top}px, ${x}px ${row.top}px, ${x}px ${row.bottom}px, -10px ${row.bottom}px)` : '';
      hand.style.transform = `translate(${(r.left - cr.left) / k + x}px, ${(r.top - cr.top) / k + row.top + (row.bottom - row.top) * 0.78}px)`;
      hand.style.visibility = 'visible';
    }
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(raf);
    ink.style.clipPath = '';
  };
}

// Writing hand: Twemoji ✍🏽 (CC-BY 4.0, https://github.com/jdecked/twemoji),
// turned so the pen tip, the element's origin, leads and the hand trails below.
const Hand = () => <img className="hand-img" src={`${BASE}img/writing-hand.svg`} alt="" draggable={false} />;

// Marker strokes drawn with Rough.js once a line is written: a highlighter
// swipe behind a line, or a scribbled underline under a result.
const gen = rough.generator();
function Marker({ kind, delay }) {
  const ref = useRef(null);
  const [paths, setPaths] = useState(null);
  useEffect(() => {
    const ink = ref.current?.parentElement;
    if (!ink) return;
    const w = ink.offsetWidth;
    const h = ink.offsetHeight;
    const result = kind === 'eq' || kind === 'answer';
    const d = result
      ? gen.linearPath([[4, h + 3], [w * 0.5, h + 5], [w - 4, h + 2]], { stroke: '#e8590c', strokeWidth: 2.6, roughness: 1.6, bowing: 2 })
      : gen.line(-2, h * 0.68, w + 2, h * 0.64, { stroke: 'rgba(255, 212, 59, 0.6)', strokeWidth: h * 0.42, roughness: 1.2, bowing: 1.5 });
    setPaths({ w, h, list: gen.toPaths(d) });
  }, [kind]);
  return (
    <svg ref={ref} className="marker" aria-hidden="true" style={paths ? { width: paths.w, height: paths.h, '--md': `${delay}s` } : { display: 'none' }}>
      {paths?.list.map((p, i) => (
        <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill="none" strokeLinecap="round" pathLength={1} />
      ))}
    </svg>
  );
}

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

// Player preferences, remembered across videos: playback speed (voice pitch is
// kept) and subtitles.
const SPEEDS = [0.75, 1, 1.25, 1.5];
const pref = (key, def) => {
  try {
    const v = localStorage.getItem(key);
    return v == null ? def : JSON.parse(v);
  } catch {
    return def;
  }
};
const keep = (key, v) => {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {}
};
const GAP = 200; // pause after a line, ms
const MIN_BEAT = 800; // shortest a beat can be, ms

const ZOOM_MAX = 1.6; // closest the camera gets to one part

// Predicted length of a beat when played: recorded Nepali clips run about
// 80 ms per character at 1×, plus the pause after the line. Only the spoken
// line counts; an ask's question and the time spent answering don't.
const estMs = (b, speed) => b.ms ?? Math.max(MIN_BEAT, (300 + spoken(b.voice ?? b.say ?? '').length * 80) / speed) + GAP;
const clock = (ms) => {
  const t = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};
const readMs = (t = '', speed = 1.25) => Math.max(2000, (1200 + t.length * 58) / speed);

export function Scene({ beats, draw, board, viewBox = '0 0 360 220', onEnded, onCheck, onNext, tall, notes, title, kicker, upcoming = [] }) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [voice, setVoice] = useState(() => !isMuted() && 'speechSynthesis' in window);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState({});
  const [ended, setEnded] = useState(false);
  const [speed, setSpeed] = useState(() => (SPEEDS.includes(pref('dcm-speed', 1.25)) ? pref('dcm-speed', 1.25) : 1.25));
  const [cc, setCc] = useState(() => pref('dcm-cc', true) !== false);
  const [full, setFull] = useState(false);
  const sceneRef = useRef(null);
  const audioRef = useRef(null);
  const tried = useRef(new Set());
  const endedRef = useRef(false);
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed]);
  useEffect(() => {
    const on = () => setFull(document.fullscreenElement === sceneRef.current);
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  const stageRef = useRef(null);
  const camRef = useRef(null);
  const [cam, setCam] = useState({ x: 0, y: 0, k: 1 });
  const [hand, setHand] = useState(null);
  const handRef = useRef(null);
  useEffect(() => {
    if (hand?.mode !== 'write') return;
    const ink = camRef.current?.querySelector('.board-line.hl:not(.kind-q) .ink');
    if (ink && handRef.current) return writeLive(ink, camRef.current, handRef.current, hand.secs);
  }, [hand]);
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
      // Centre on the part, but never show past the board's edges. A board
      // shorter than the frame starts at the top, like a real whiteboard.
      const place = (view, size, c) => (size * k <= view ? (view - size * k) / 2 : Math.min(0, Math.max(view - size * k, view / 2 - c * k)));
      const top = ch * k <= H ? Math.min((H - ch * k) / 2, H * 0.06) : place(H, ch, cy);
      setCam({ k, x: place(W, cw, cx), y: draw ? place(H, ch, cy) : top });
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
      // Point from the lower-left corner, so the hand doesn't cover what it points at.
      if (!ink) return setHand({ mode: 'point', x: (r.left - o.left) / k0, y: (r.bottom - o.top) / k0 });
      // writeLive (above) places the hand every frame while the line is written.
      setHand({ mode: 'write', x: 0, y: 0, secs: parseFloat(ink.parentElement.style.getPropertyValue('--wd')) || 1.4 });
    };
    // Once as the line starts, again after it has grown to full height.
    const a = setTimeout(() => {
      frame();
      pen();
    }, 60);
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
    const minMs = cur.ms ?? readMs(text, speed);
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
      u.rate = speed;
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
        audioRef.current = audio;
        audio.playbackRate = speed;
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
      audioRef.current = null;
      if (audio) audio.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, playing, run, voice, waiting]);

  useEffect(() => () => 'speechSynthesis' in window && window.speechSynthesis.cancel(), []);

  // Timeline: predicted start of every beat and the total, in ms of playback.
  const est = useMemo(() => beats.map((b) => estMs(b, speed)), [beats, speed]);
  const starts = useMemo(() => est.reduce((a, m, i) => [...a, a[i] + m], [0]), [est]);
  const total = starts[beats.length];
  // The bar, its knob and the clock are moved straight from an animation frame
  // (no re-render), so the slider glides instead of stepping.
  const fillRef = useRef(null);
  const knobRef = useRef(null);
  const timeRef = useRef(null);
  const within = useRef(0);
  const drag = useRef(null);
  useEffect(() => {
    within.current = 0;
  }, [beat, run]);
  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      if (playing && !waiting && !ended) within.current += dt;
      const a = audioRef.current;
      const frac = a && a.duration && !a.paused ? Math.min(1, a.currentTime / a.duration) : Math.min(1, within.current / est[beat]);
      const pos = drag.current ?? (ended ? total : starts[beat] + frac * est[beat]);
      const f = Math.min(1, pos / total);
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${f})`;
      if (knobRef.current) knobRef.current.style.left = `${f * 100}%`;
      if (timeRef.current) timeRef.current.textContent = `${clock(pos)} / ${clock(total)}`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [beat, playing, waiting, ended, est, starts, total]);
  const timeAt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * total;
  };
  const beatAt = (t) => {
    const k = est.findIndex((_, i) => t < starts[i + 1]);
    return k === -1 ? beats.length - 1 : k;
  };

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
    // Only the first try at a check earns XP; a rewatched retry doesn't.
    onCheck?.(i === ask.answer, !tried.current.has(beat));
    tried.current.add(beat);
  };
  // Got it wrong: replay the part that explained it, then ask again.
  const rewatch = () => {
    setPicked(({ [beat]: _, ...rest }) => rest);
    jump(ask.from ?? Math.max(0, beat - 2));
  };
  // Drag or tap the slider: the knob follows the pointer, release jumps there.
  const seekDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = timeAt(e);
  };
  const seekMove = (e) => {
    if (drag.current != null) drag.current = timeAt(e);
  };
  const seekUp = (e) => {
    if (drag.current == null) return;
    const k = beatAt(timeAt(e));
    drag.current = null;
    jump(k);
  };
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : sceneRef.current?.requestFullscreen?.())?.catch?.(() => {});
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
    <div className={`scene beat-${beat} ${tall ? 'tall' : ''} ${full ? 'full' : ''}`} ref={sceneRef}>
      <div className={`scene-screen ${ask && !ended ? 'asking' : ''}`}>
        {title && (
          <div className={`scene-title ${(beat === 0 && playing) || !playing || ended ? 'show' : ''}`}>
            {kicker && <span>{kicker}</span>}
            <b>{title}</b>
          </div>
        )}
        <div className="scene-stage" ref={stageRef}>
          <div className={`scene-cam ${split ? 'split' : ''} ${split && notes ? 'notes' : ''}`} ref={camRef} style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.k})` }}>
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
                        <span className="ink">
                          {b.node}
                          {beat === b.at && b.kind !== 'q' && b.kind !== 'h' && b.kind !== 'hook' && <Marker kind={b.kind} delay={writeSecs(b.node)} />}
                        </span>
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
        {ask && !ended && (
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
                  {pick.i !== ask.answer && (
                    <button className="scene-rewatch" onClick={rewatch}>
                      ↺ Tyo part feri hera
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
        {cc && (
          <div className="scene-caption" key={`${beat}-${run}`}>
            {cur.say}
          </div>
        )}
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
          <div
            className="scene-progress"
            onPointerDown={seekDown}
            onPointerMove={seekMove}
            onPointerUp={seekUp}
            onPointerCancel={() => (drag.current = null)}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={Math.round(total / 1000)}
          >
            <div className="sp-fill" ref={fillRef} />
            {beats.map((b, k) =>
              b.ask ? <span key={k} className={`sp-ask ${k < beat || ended ? 'done' : ''}`} style={{ left: `${(starts[k + 1] / total) * 100}%` }} title="Dhyan check" /> : null,
            )}
            <span className="sp-knob" ref={knobRef} />
          </div>
        )}
        {!(pick && !pick.done) && <span className="scene-time" ref={timeRef} />}
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
        <button
          className="scene-btn scene-speed"
          onClick={() => {
            const v = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
            setSpeed(v);
            keep('dcm-speed', v);
          }}
          title="Playback speed"
        >
          {speed}×
        </button>
        <button
          className={`scene-btn scene-cc ${cc ? 'on' : ''}`}
          onClick={() => {
            setCc(!cc);
            keep('dcm-cc', !cc);
          }}
          title={cc ? 'Subtitle off' : 'Subtitle on'}
          aria-pressed={cc}
        >
          CC
        </button>
        <button className="scene-btn" onClick={fullscreen} title={full ? 'Exit full screen' : 'Full screen'} aria-label="Full screen">
          {full ? '⤡' : '⤢'}
        </button>
        {/* The lesson's Skip / Next lives in the player, so the video gets the page. */}
        {onNext && (
          <button className={`scene-next ${ended ? 'go' : ''}`} onClick={onNext}>
            {ended ? 'Aghi badhau →' : 'Skip ⏭'}
          </button>
        )}
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
