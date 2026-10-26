import { useRef, useState } from 'react';
import { C, Slider, useRaf } from './common.jsx';

// Real-unit DC motor model.
//   k = N·B·A   (motor constant: V per rad/s, also N·m per A)
//   I = (V − kω) / R          back EMF E = kω
//   J·ω' = k·I − b·ω − τ_load
const A = 0.0025; // coil area, m² (5 cm × 5 cm)
const R = 2; // coil resistance, Ω
const J = 3e-3;
const b = 2e-5;
const toRpm = (w) => (w * 60) / (2 * Math.PI);

function stepMotor(s, p, dt) {
  const k = p.N * p.B * A;
  const n = 20;
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    const I = (p.V - k * s.w) / R;
    const drive = k * I - b * s.w;
    if (s.w <= 1e-6 && drive <= p.load) {
      s.w = 0; // stalled: load wins
    } else {
      s.w = Math.max(0, s.w + ((drive - p.load) / J) * h);
    }
    s.a += s.w * h;
  }
  s.I = (p.V - k * s.w) / R;
  s.E = k * s.w;
  return s;
}

function Rotor({ angle, N, B }) {
  return (
    <svg viewBox="0 0 260 220" className="fig-svg">
      <path d="M10 20 H70 V70 Q50 110 70 150 V200 H10 Z" fill={C.north} opacity={0.4 + B * 0.6} />
      <path d="M250 20 H190 V70 Q210 110 190 150 V200 H250 Z" fill={C.south} opacity={0.4 + B * 0.6} />
      <text x="28" y="118" fontSize="22" fontWeight="800" fill="#fff">N</text>
      <text x="214" y="118" fontSize="22" fontWeight="800" fill="#fff">S</text>
      <g transform={`translate(130 110) rotate(${(-angle * 180) / Math.PI})`}>
        <circle r="56" fill="#f3f3f1" stroke="#9a9a9a" strokeWidth="2" />
        {Array.from({ length: Math.min(12, Math.round(N / 16) + 2) }).map((_, i, arr) => (
          <rect key={i} x={-48} y={-3 - (arr.length * 4) / 2 + i * 4} width="96" height="2.6" rx="1" fill="#c06a1f" opacity="0.9" />
        ))}
        <circle r="8" fill="#5c5c5c" />
        <rect x="-3" y="-56" width="6" height="12" fill={C.teal} />
      </g>
    </svg>
  );
}

function Gauge({ label, value, unit, max, color, warn }) {
  const f = Math.max(0, Math.min(1, value / max));
  return (
    <div className={`gauge ${warn ? 'warn' : ''}`}>
      <div className="gauge-top">
        <span>{label}</span>
        <b>
          {value >= 100 ? Math.round(value) : value.toFixed(value >= 10 ? 1 : 2)} <small>{unit}</small>
        </b>
      </div>
      <div className="gauge-bar">
        <div style={{ width: `${f * 100}%`, background: color }} />
      </div>
    </div>
  );
}

export function MotorLab({ onSolved, goalRpm = 1500 }) {
  const [p, setP] = useState({ V: 6, B: 0.5, N: 100, load: 0 });
  const st = useRef({ w: 0, a: 0, I: 0, E: 0, above: 0 });
  const [, tick] = useState(0);
  const done = useRef(false);
  useRaf((dt) => {
    stepMotor(st.current, p, dt);
    const rpm = toRpm(st.current.w);
    st.current.above = rpm > goalRpm ? st.current.above + dt : 0;
    if (!done.current && onSolved && st.current.above > 0.6) {
      done.current = true;
      onSolved();
    }
    tick((n) => n + 1);
  });
  const s = st.current;
  const rpm = toRpm(s.w);
  const set = (key) => (v) => setP((q) => ({ ...q, [key]: v }));
  const eFrac = p.V > 0 ? Math.max(0, Math.min(1, s.E / p.V)) : 0;
  return (
    <div className="fig-stack">
      <div className="lab">
        <Rotor angle={s.a} N={p.N} B={p.B} />
        <div className="lab-readouts">
          <Gauge label="Speed" value={rpm} unit="rpm" max={4000} color={rpm > goalRpm ? C.green : C.teal} />
          <Gauge label="Current" value={Math.max(0, s.I)} unit="A" max={6} color={C.current} warn={s.I > 4} />
          <div className="vsplit">
            <div className="vsplit-label">
              Supply {p.V.toFixed(1)} V = <span style={{ color: C.teal }}>back EMF {s.E.toFixed(1)} V</span> +{' '}
              <span style={{ color: C.force }}>I·R {(Math.max(0, s.I) * R).toFixed(1)} V</span>
            </div>
            <div className="vsplit-bar">
              <div style={{ width: `${eFrac * 100}%`, background: C.teal }} />
              <div style={{ width: `${(1 - eFrac) * 100}%`, background: C.force }} />
            </div>
          </div>
          {onSolved && (
            <div className={`goal ${rpm > goalRpm ? 'hit' : ''}`}>Goal: &gt; {goalRpm} rpm</div>
          )}
        </div>
      </div>
      <div className="controls grid2">
        <Slider label="Battery voltage" unit="V" value={p.V} min={0} max={12} step={0.5} onChange={set('V')} fmt={(v) => v.toFixed(1)} />
        <Slider label="Magnet strength" unit="T" value={p.B} min={0.1} max={1} step={0.05} onChange={set('B')} fmt={(v) => v.toFixed(2)} />
        <Slider label="Turns of wire" unit="" value={p.N} min={20} max={200} step={10} onChange={set('N')} />
        <Slider label="Load torque" unit="N·m" value={p.load} min={0} max={0.3} step={0.01} onChange={set('load')} fmt={(v) => v.toFixed(2)} />
      </div>
    </div>
  );
}

/* ───────── Switch-on transient: plot I(t) and rpm(t) ───────── */

const T_END = 1.6;
export function StartupGraph({ onSolved }) {
  const [samples, setSamples] = useState([]);
  const [running, setRunning] = useState(false);
  const st = useRef(null);
  const p = { V: 12, B: 0.5, N: 100, load: 0 };

  useRaf((dt) => {
    const s = st.current;
    const sim = dt * 0.5; // half speed so you can watch the spike
    stepMotor(s, p, sim);
    s.t += sim;
    setSamples((arr) => [...arr, { t: s.t, I: s.I, rpm: toRpm(s.w) }]);
    if (s.t >= T_END) {
      setRunning(false);
      onSolved?.();
    }
  }, running);

  const start = () => {
    st.current = { w: 0, a: 0, I: p.V / R, E: 0, t: 0 };
    setSamples([{ t: 0, I: p.V / R, rpm: 0 }]);
    setRunning(true);
  };

  const W = 460;
  const H = 200;
  const X = (t) => 50 + (t / T_END) * W;
  const YI = (i) => 20 + H - (i / 6.5) * H;
  const YR = (r) => 20 + H - (r / 1000) * H;
  const last = samples[samples.length - 1];
  const line = (fn) => samples.map((s) => `${X(s.t).toFixed(1)},${fn(s).toFixed(1)}`).join(' ');
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 560 260" className="fig-svg">
        {[0, 0.4, 0.8, 1.2, 1.6].map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={20} x2={X(t)} y2={20 + H} stroke={C.grid} />
            <text x={X(t)} y={20 + H + 18} textAnchor="middle" fontSize="12" fill={C.ink}>{t}s</text>
          </g>
        ))}
        {[0, 2, 4, 6].map((i) => (
          <g key={i}>
            <line x1={50} y1={YI(i)} x2={50 + W} y2={YI(i)} stroke={C.grid} />
            <text x={42} y={YI(i) + 4} textAnchor="end" fontSize="12" fill={C.current}>{i} A</text>
          </g>
        ))}
        {[0, 500, 1000].map((r) => (
          <text key={r} x={50 + W + 6} y={YR(r) + 4} fontSize="12" fill={C.teal}>{r}</text>
        ))}
        <polyline points={line((s) => YI(s.I))} fill="none" stroke={C.current} strokeWidth="2.6" />
        <polyline points={line((s) => YR(s.rpm))} fill="none" stroke={C.teal} strokeWidth="2.6" />
        <text x="58" y="16" fontSize="13" fontWeight="700" fill={C.current}>Current</text>
        <text x={50 + W} y="16" textAnchor="end" fontSize="13" fontWeight="700" fill={C.teal}>Speed (rpm)</text>
        {!samples.length && (
          <text x={50 + W / 2} y={20 + H / 2} textAnchor="middle" fontSize="14" fill={C.muted}>Flip the switch to record</text>
        )}
      </svg>
      <div className="controls center">
        <button className="chip primary" onClick={start} disabled={running}>
          {samples.length ? '↺ Run again' : '⚡ Flip the switch'}
        </button>
        {last && (
          <span className="hint">
            I = <b style={{ color: C.current }}>{last.I.toFixed(2)} A</b> · {Math.round(last.rpm)} rpm
          </span>
        )}
      </div>
    </div>
  );
}
