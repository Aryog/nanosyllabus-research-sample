import { useEffect, useMemo, useRef, useState } from 'react';
import rough from 'roughjs';
import { beatText, isNepali, spoken, videoKey, voiceKey } from './voice.js';

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
// pen tip on `hand` always sit exactly on the text. Progress follows the
// scene's clock (`elapsed`, ms), so the pen stops on pause and jumps on a seek.
// Returns a stop function.
function writeLive(ink, cam, hand, secs, elapsed) {
  ink.style.animation = 'none';
  let raf;
  let last = -1;
  const step = () => {
    raf = requestAnimationFrame(step);
    const t = Math.min(1, Math.max(0, elapsed() / (secs * 1000)));
    if (t === 1 && last === 1) return;
    last = t;
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

// Speaker for the voice button: sound waves when on, a cross when muted.
const SoundIcon = ({ on }) => (
  <svg className="scene-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    {on ? (
      <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
        <path className="wave1" d="M15.2 9.3a3.8 3.8 0 0 1 0 5.4" />
        <path className="wave2" d="M17.8 6.8a7.4 7.4 0 0 1 0 10.4" />
      </g>
    ) : (
      <path d="M15.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    )}
  </svg>
);

// Download button: an arrow into a tray.
const SaveIcon = () => (
  <svg className="scene-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4v10m-4.5-4.5L12 14l4.5-4.5M5 16.5V19h14v-2.5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Download: every video is rendered ahead of time into an MP4
// (npm run render:videos → public/videos/<videoKey>.mp4), and the button just
// saves that file. The renderer opens the video with ?render and steps it frame
// by frame on a virtual clock: the video plays itself from the start, its
// questions answer themselves, nothing is heard, and window.__render logs when
// each clip is due (clip, offset into it, page time) so the sound can be laid
// under the frames afterwards. Clip lengths come from window.__clipDurs.
const RENDER = typeof location !== 'undefined' && new URLSearchParams(location.search).has('render');
const renderLog = RENDER ? (window.__render = { voice: [], ended: false }) : null;
const videos = fetch(`${BASE}videos/manifest.json`)
  .then((r) => (r.ok ? r.json() : {}))
  .catch(() => ({}));
// URL of this video's rendered MP4, once the manifest says there is one.
const useVideoFile = (beats) => {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const key = videoKey(beats);
    let live = true;
    setUrl(null);
    videos.then((m) => live && m[key] && setUrl(`${BASE}videos/${key}.mp4?v=${m[key].v}`));
    return () => (live = false);
  }, [beats]);
  return url;
};
const ASK_HOLD = 3500; // in a render: ms an ask shows its question, then its answer

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

const clipSrc = (key) => `${BASE}audio/scene/${key}.mp3?v=${clips[key]}`;
const readMs = (t = '', speed = 1.25) => Math.max(2000, (1200 + t.length * 58) / speed);

// Real lengths of the recorded clips (s), read from the files' metadata, so the
// timeline matches what is heard.
const durs = {};
function useClipLengths(beats) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let live = true;
    clipsReady.then(() => {
      for (const b of beats) {
        const key = voiceKey(beatText(b));
        if (!clips[key] || durs[key]) continue;
        const a = new Audio();
        a.preload = 'metadata';
        a.onloadedmetadata = () => {
          durs[key] = a.duration;
          if (live) setN((x) => x + 1);
        };
        a.src = clipSrc(key);
      }
    });
    return () => {
      live = false;
    };
  }, [beats]);
  return n;
}

// Length of a beat when played, in ms at this speed: its recorded clip when the
// length is known, else a guess (Nepali clips run about 80 ms per character at
// 1×), plus the pause after the line; with the voice off, the reading time.
// Time spent answering an ask doesn't count.
const estMs = (b, speed, voice) => {
  if (b.ms) return b.ms;
  const text = beatText(b);
  if (!voice || !text) return readMs(text, speed);
  const d = durs[voiceKey(text)];
  return Math.max(MIN_BEAT, d ? (d * 1000) / speed : (300 + spoken(text).length * 80) / speed) + GAP;
};
// When an ask's question card opens, in ms into the beat: once the beat's own
// line has been said. The clip holds the line and then the question, so it is
// split by length.
const askAt = (b, speed, voice, dur) => {
  const line = b.voice ?? b.say;
  if (!b.ask || !line) return 0;
  if (!voice) return readMs(b.say, speed);
  const share = spoken(line).length / spoken(beatText(b)).length;
  return share * (dur ? (dur * 1000) / speed : estMs(b, speed, voice) - GAP);
};
const clock = (ms) => {
  const t = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

export function Scene({ beats, draw, board, viewBox = '0 0 360 220', onEnded, onCheck, onNext, tall, notes, title, kicker, upcoming = [] }) {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [voice, setVoice] = useState(() => !isMuted() && 'speechSynthesis' in window);
  const [run, setRun] = useState(0);
  const [picked, setPicked] = useState({});
  const [ended, setEnded] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [scrub, setScrub] = useState(false);
  const [speed, setSpeed] = useState(() => (SPEEDS.includes(pref('dcm-speed', 1.25)) ? pref('dcm-speed', 1.25) : 1.25));
  const [cc, setCc] = useState(() => pref('dcm-cc', true) !== false);
  const [full, setFull] = useState(false);
  const sceneRef = useRef(null);
  const audioRef = useRef(null);
  const tried = useRef(new Set());
  const endedRef = useRef(false);
  const clipsKnown = useClipLengths(beats);
  const mp4 = useVideoFile(beats);
  // The scene's clock: ms played of the current beat. It runs only while
  // playing and drives the voice, the handwriting, the slider and the end of
  // the beat, so pause freezes all of it and a seek lands on the exact moment.
  const within = useRef(0);
  const seek = useRef(null); // last seek: { at: ms into its beat, fresh, t0, done }
  const line = useRef(null); // this beat's voice: { audio, ready, wait, silent, spoke, at, min, speech, next }
  const held = useRef(new Set()); // CSS animations frozen by pause
  const playingRef = useRef(playing);
  playingRef.current = playing;
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
    if (ink && handRef.current) return writeLive(ink, camRef.current, handRef.current, hand.secs, () => within.current);
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
  // board line being written, and the parts of the drawing it reveals or
  // highlights); on beats with nothing new, and at the end, pull back to show
  // the whole board. When the line and the drawing are too far apart to share
  // one close shot, it writes the line first, then moves to the drawing. The
  // shots follow the scene's clock, so they hold on pause and match a seek.
  useEffect(() => {
    const stage = stageRef.current;
    const el = camRef.current;
    if (!stage || !el) return;
    const LINE = '.board-line.hl .ink';
    const PEN = '.board-line.hl:not(.kind-q) .ink';
    const FIG = 'svg .hl, svg .now';
    const join = (a, b) => (a && b ? { l: Math.min(a.l, b.l), t: Math.min(a.t, b.t), r: Math.max(a.r, b.r), b: Math.max(a.b, b.b) } : a || b);
    // Box of the parts in camera-local px, measured against the transform on
    // screen now (it may be mid-move).
    const measure = (sel) => {
      if (!sel) return null;
      const o = el.getBoundingClientRect();
      const k0 = new DOMMatrix(getComputedStyle(el).transform).a || 1;
      let box = null;
      for (const part of el.querySelectorAll(sel)) {
        const r = part.getBoundingClientRect();
        if (r.width || r.height) box = join(box, { l: (r.left - o.left) / k0, t: (r.top - o.top) / k0, r: (r.right - o.left) / k0, b: (r.bottom - o.top) / k0 });
      }
      return box;
    };
    const view = (box) => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const cw = el.offsetWidth;
      const ch = el.offsetHeight;
      if (!W || !H || !cw || !ch) return null;
      const fit = Math.min(1, W / cw, H / ch);
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
      const place = (v, size, c) => (size * k <= v ? (v - size * k) / 2 : Math.min(0, Math.max(v - size * k, v / 2 - c * k)));
      const top = ch * k <= H ? Math.min((H - ch * k) / 2, H * 0.06) : place(H, ch, cy);
      return { k, x: place(W, cw, cx), y: draw ? place(H, ch, cy) : top };
    };
    // The shots of this beat: from (ms on the clock), what the camera frames,
    // and what the hand does (writes the line, or points at the drawing).
    const plan = () => {
      const line = measure(LINE);
      const fig = draw ? measure(FIG) : null;
      const writes = !!el.querySelector(PEN);
      const hand = ended ? null : writes ? 'write' : fig ? 'point' : null;
      if (ended || beat === beats.length - 1) return [{ from: 0, cam: null, hand }];
      if (!line || !fig) return [{ from: 0, cam: line ? LINE : fig ? FIG : null, hand }];
      const close = (b) => view(b)?.k ?? 1;
      if (close(join(line, fig)) >= 0.8 * Math.min(close(line), close(fig))) return [{ from: 0, cam: `${LINE}, ${FIG}`, hand }];
      const secs = parseFloat(el.querySelector(LINE).parentElement.style.getPropertyValue('--wd')) || 1.4;
      return [
        { from: 0, cam: LINE, hand },
        { from: secs * 1000 + 400, cam: FIG, hand: 'point' },
      ];
    };
    const frame = (shot) => {
      const v = view(measure(shot.cam));
      if (v) setCam(v);
    };
    const pen = (mode) => {
      if (!mode) return setHand(null);
      if (mode === 'write') {
        const ink = el.querySelector(PEN);
        // writeLive (above) places the hand every frame while the line is written.
        return setHand({ mode, x: 0, y: 0, secs: parseFloat(ink.parentElement.style.getPropertyValue('--wd')) || 1.4 });
      }
      // Point from the lower-left corner, so the hand doesn't cover what it points at.
      const b = measure('svg .hl') ?? measure(FIG);
      setHand(b ? { mode, x: b.l, y: b.b } : null);
    };
    let shots = null;
    let at = -1;
    let settle = 0;
    let raf;
    const t0 = performance.now();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      // Let the beat's parts come in first.
      if (now - t0 < 60) return;
      shots ??= plan();
      let i = 0;
      while (i + 1 < shots.length && within.current >= shots[i + 1].from) i++;
      if (i !== at) {
        at = i;
        frame(shots[i]);
        pen(shots[i].hand);
        settle = now + 640;
      } else if (settle && now >= settle) {
        // Again once a new line has grown to full height.
        settle = 0;
        frame(shots[i]);
      }
    };
    raf = requestAnimationFrame(loop);
    const onResize = () => shots && frame(shots[Math.max(0, at)]);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, run, ended, beats.length]);
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

  // Start a beat: from its beginning, or from where a seek landed. The beat
  // ends from the clock (below), not from timers, so it can be paused.
  useEffect(() => {
    const sk = seek.current;
    within.current = sk?.fresh ? sk.at : 0;
    if (sk?.fresh) sk.fresh = false;
    else seek.current = null;
    setAskOpen(false);
    const text = beatText(cur);
    const st = { min: cur.ms ?? readMs(text, speed), silent: !voice || !text, spoke: false, at: 0 };
    st.wait = !st.silent; // the clock waits for the voice to be ready
    line.current = st;
    // Dragging the slider: show the beat, don't speak.
    if (scrub) return;
    // Lines after this one: rest of this video, then the next videos.
    prepare([...beats.slice(beat + 1).map(beatText), ...upcoming].filter(Boolean));
    let live = true;
    // Voice failed or is missing: fall back to reading time, never rush the beat.
    const silent = () => {
      st.silent = true;
      st.wait = false;
    };
    const speakBrowser = () => {
      // The browser voice isn't part of the tab's sound, so a render stays silent.
      const v = 'speechSynthesis' in window && !RENDER ? pickVoice(text) : null;
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
        st.spoke = true;
        st.at = within.current;
      };
      st.speech = true;
      st.wait = false;
      window.speechSynthesis.speak(u);
      if (!playingRef.current) window.speechSynthesis.pause();
    };
    if (!st.silent) {
      clipsReady.then(() => {
        if (!live) return;
        const key = voiceKey(text);
        // In dev, a line that isn't recorded yet is recorded on the spot (and cached).
        const src = clips[key] ? clipSrc(key) : import.meta.env.DEV ? `${BASE}api/tts/${key}.mp3` : null;
        if (!src) return speakBrowser();
        if (RENDER) {
          // The clip runs on the scene's clock; the tick logs what is heard.
          const dur = window.__clipDurs?.[key];
          if (!dur) return silent();
          durs[key] = dur;
          st.audio = { duration: dur, pause() {}, get currentTime() { return Math.min(dur, (within.current * speed) / 1000); } };
          st.clip = { key, end: (dur * 1000) / speed };
          st.play = () => {};
          st.ready = true;
          st.wait = false;
          return;
        }
        const audio = new Audio(src);
        st.audio = audio;
        audioRef.current = audio;
        audio.playbackRate = speed;
        audio.preservesPitch = true;
        audio.onplay = () => (clips[key] ??= 'new');
        audio.onended = () => {
          st.spoke = true;
          st.at = within.current;
        };
        // Recording failed or autoplay was blocked: fall back once.
        let fell = false;
        const fallback = (fn) => () => {
          if (!live || fell) return;
          fell = true;
          st.audio = null;
          fn();
        };
        audio.onerror = fallback(speakBrowser);
        st.play = () => st.ready && !st.spoke && audio.play().catch(fallback(silent));
        audio.onloadedmetadata = () => {
          durs[key] ??= audio.duration;
          // Seeked into the beat: start the clip at the same moment.
          const t = (within.current * speed) / 1000;
          if (t >= audio.duration) {
            st.spoke = true;
            st.at = (audio.duration * 1000) / speed;
          } else if (t > 0.05) audio.currentTime = t;
          st.ready = true;
          st.wait = false;
          if (playingRef.current) st.play();
        };
      });
    }
    return () => {
      live = false;
      if (st.audio) st.audio.pause();
      audioRef.current = null;
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, run, voice, scrub]);

  // Pause and resume the voice where it is.
  useEffect(() => {
    const st = line.current;
    if (playing) st?.play?.();
    else st?.audio?.pause();
    if ('speechSynthesis' in window) playing ? window.speechSynthesis.resume() : window.speechSynthesis.pause();
  }, [playing]);

  useEffect(() => () => 'speechSynthesis' in window && window.speechSynthesis.cancel(), []);

  // Timeline: start of every beat and the total, in ms of playback.
  const est = useMemo(() => beats.map((b) => estMs(b, speed, voice)), [beats, speed, voice, clipsKnown]);
  const starts = useMemo(() => est.reduce((a, m, i) => [...a, a[i] + m], [0]), [est]);
  const total = starts[beats.length];
  // One animation frame runs the clock, ends the beat, and moves the bar, its
  // knob and the time straight (no re-render), so the slider glides.
  const fillRef = useRef(null);
  const knobRef = useRef(null);
  const timeRef = useRef(null);
  const drag = useRef(null);
  const resumeAfter = useRef(true);
  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      const st = line.current;
      const w0 = within.current;
      if (playing && !ended && !scrub && st && !st.wait) within.current += dt;
      const w = within.current;
      // Render: the clip is heard while the clock runs through it.
      const c = st?.clip;
      if (c && w > w0 && w0 < c.end) {
        const seg = renderLog.voice.at(-1);
        if (seg?.st === st && Math.abs(seg.t + seg.len - (now - dt)) < 1) seg.len += Math.min(w, c.end) - w0;
        else renderLog.voice.push({ st, key: c.key, off: (w0 * speed) / 1000, t: now - dt, len: Math.min(w, c.end) - w0, speed });
        if (w >= c.end) {
          st.spoke = true;
          st.at = c.end;
        }
      }
      if (st && !ended && !scrub) {
        // Some browser voices never report the end; don't let the video hang on them.
        if (st.speech && !st.spoke && w > st.min * 2.2) {
          st.spoke = true;
          st.at = w;
        }
        if (ask && !askOpen && w >= askAt(cur, speed, voice && !st.silent, st.audio?.duration)) setAskOpen(true);
        const done = st.silent ? w >= st.min : st.spoke && w >= Math.max(MIN_BEAT, st.at + GAP);
        if (playing && done && !waiting && !st.next) {
          st.next = true;
          advance();
        }
      }
      const a = st?.audio;
      const inBeat = a && a.duration && !st.silent ? (st.spoke ? (a.duration * 1000) / speed + w - st.at : (a.currentTime * 1000) / speed) : w;
      const pos = drag.current ?? (ended ? total : starts[beat] + Math.min(inBeat, est[beat]));
      const f = Math.min(1, pos / total);
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${f})`;
      if (knobRef.current) knobRef.current.style.left = `${f * 100}%`;
      if (timeRef.current) timeRef.current.textContent = `${clock(pos)} / ${clock(total)}`;

      const scene = sceneRef.current;
      if (scene) {
        const anims = () => scene.getAnimations({ subtree: true });
        // Paused: freeze everything that moves (camera, drawing, markers, the hand).
        if (!playing && !ended) {
          for (const an of anims()) {
            if (an.playState !== 'running') continue;
            an.pause();
            held.current.add(an);
          }
        } else if (held.current.size) {
          for (const an of held.current) if (an.playState === 'paused') an.play();
          held.current.clear();
        }
        // Just seeked: the animations the jump started land where the clock
        // is. This beat's own parts (its line, highlight, marker, the hand)
        // play on from there; everything before it is shown finished.
        const sk = seek.current;
        if (sk && now - sk.t0 < 800) {
          for (const an of anims()) {
            if (sk.done.has(an)) continue;
            sk.done.add(an);
            const end = an.effect?.getComputedTiming().endTime;
            if (!(end < Infinity)) continue;
            const el = an.effect.target;
            // The pointing hand comes in with its own shot, later in the beat.
            if (el?.closest?.('.hand-point')) continue;
            if (el?.closest?.('.hl, .hand')) an.currentTime = Math.min(end, w);
            else an.finish();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, playing, waiting, ended, scrub, askOpen, speed, voice, est, starts, total]);
  const timeAt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * total;
  };
  const beatAt = (t) => {
    const k = est.findIndex((_, i) => t < starts[i + 1]);
    return k === -1 ? beats.length - 1 : k;
  };
  const seekTo = (k, at) => (seek.current = { at, fresh: true, t0: performance.now(), done: new WeakSet() });

  // Play from `at` ms into beat k.
  const jump = (k, at = 0, play = true) => {
    seekTo(k, at);
    setEnded(false);
    setBeat(k);
    if (play) setPlaying(true);
    setRun((r) => r + 1);
  };
  const toggle = () => (ended ? jump(0) : setPlaying((p) => !p));
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
  // Drag the slider: the scene follows the knob, frame by frame (silently);
  // on release it plays on from that exact moment, or stays paused if it was.
  const scrubTo = (t) => {
    const k = beatAt(t);
    drag.current = t;
    if (k === beat && scrub) within.current = t - starts[k];
    else {
      seekTo(k, t - starts[k]);
      setBeat(k);
    }
  };
  const seekDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    resumeAfter.current = playing || ended;
    setEnded(false);
    setScrub(true);
    scrubTo(timeAt(e));
  };
  const seekMove = (e) => {
    if (drag.current != null) scrubTo(timeAt(e));
  };
  const seekUp = (e) => {
    if (drag.current == null) return;
    const t = timeAt(e);
    const k = beatAt(t);
    drag.current = null;
    setScrub(false);
    jump(k, t - starts[k], resumeAfter.current);
  };
  const seekCancel = () => {
    if (drag.current == null) return;
    drag.current = null;
    setScrub(false);
    jump(beat, within.current, resumeAfter.current);
  };
  const fullscreen = () => (document.fullscreenElement ? document.exitFullscreen() : sceneRef.current?.requestFullscreen?.())?.catch?.(() => {});
  const resume = () => {
    setPicked((p) => ({ ...p, [beat]: { ...p[beat], done: true } }));
    setPlaying(true);
    advance();
  };

  useEffect(() => {
    if (RENDER && ended) renderLog.ended = true;
  }, [ended]);
  // In a render, an ask answers itself: the question, then the right answer and why, then on.
  useEffect(() => {
    if (!RENDER || !askOpen || !ask) return;
    const t = setTimeout(() => (picked[beat] ? !picked[beat].done && resume() : setPicked((p) => ({ ...p, [beat]: { i: ask.answer, done: false } }))), ASK_HOLD);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [askOpen, beat, picked]);

  const s = {
    beat,
    on: (k, until = Infinity) => (beat >= k && beat <= until ? (beat === k ? 'sc on now' : 'sc on') : 'sc'),
    hl: (k) => (beat === k ? ' hl' : ''),
    at: (k) => beat >= k,
  };
  const pick = picked[beat];

  return (
    <div className={`scene beat-${beat} ${tall ? 'tall' : ''} ${full ? 'full' : ''}`} ref={sceneRef}>
      <div className={`scene-screen ${ask && askOpen && !ended ? 'asking' : ''}`}>
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
        {ask && askOpen && !ended && (
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
          {ended ? '↻' : playing ? '❚❚' : '▶'}
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
            onPointerCancel={seekCancel}
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
            jump(beat, within.current, playing);
          }}
          title={voice ? 'Awaj on' : 'Awaj off'}
        >
          <SoundIcon on={voice} />
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
        {mp4 && (
          <a className="scene-btn scene-save" href={mp4} download={`${(title ?? 'video').replace(/[^\w\- ]+/g, '').trim() || 'video'}.mp4`} title="Download video (MP4)" aria-label="Download video">
            <SaveIcon />
          </a>
        )}
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
