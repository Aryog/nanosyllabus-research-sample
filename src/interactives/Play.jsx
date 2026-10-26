import { useRef, useState } from 'react';
import { C, Slider, Toggle, useRaf } from './common.jsx';

/* Hands-on screens for lessons 4–9. Shared bits first. */

// A number that flashes when it changes (remount on new key restarts the CSS animation).
export function Live({ v, fmt = (x) => x, color }) {
  const s = fmt(v);
  return (
    <b key={s} className="live-num" style={color ? { color } : undefined}>
      {s}
    </b>
  );
}

// Half-circle speed dial. `marks` = [{ v, color, label }].
function Dial({ value, max, label = 'rpm', marks = [], color = C.teal, x = 0, y = 0, r = 70 }) {
  const ang = (v) => Math.PI * (1 - Math.min(1, Math.max(0, v / max)));
  const pt = (v, rr) => [x + rr * Math.cos(ang(v)), y - rr * Math.sin(ang(v))];
  const [nx, ny] = pt(value, r - 12);
  return (
    <g>
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y}`} fill="none" stroke="#ebebe8" strokeWidth="10" strokeLinecap="round" />
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${pt(value, r).join(' ')}`} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />
      {marks.map((m) => {
        const [a, b] = pt(m.v, r - 8);
        const [c, d] = pt(m.v, r + 10);
        const [tx, ty] = pt(m.v, r + 22);
        return (
          <g key={m.label}>
            <line x1={a} y1={b} x2={c} y2={d} stroke={m.color} strokeWidth="3" />
            <text x={tx} y={ty + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={m.color}>{m.label}</text>
          </g>
        );
      })}
      <line x1={x} y1={y} x2={nx} y2={ny} stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
      <circle cx={x} cy={y} r="5" fill="#1a1a1a" />
      <text x={x} y={y + 22} textAnchor="middle" fontSize="18" fontWeight="800" fill={C.ink}>{Math.round(value)}</text>
      <text x={x} y={y + 36} textAnchor="middle" fontSize="10" fill={C.muted}>{label}</text>
    </g>
  );
}

// Predict-then-reveal: ask first, then show the child sim.
export function Predict({ prompt, options, answer, right, wrong, children, onPick }) {
  const [pick, setPick] = useState(null);
  const choose = (i) => {
    if (pick !== null) return;
    setPick(i);
    onPick?.(i);
  };
  return (
    <div className="fig-stack">
      <div className="predict">
        <span className="predict-tag">Predict</span>
        <div className="predict-q">{prompt}</div>
        <div className="predict-opts">
          {options.map((o, i) => (
            <button
              key={o}
              className={`choice ${pick === i ? (i === answer ? 'right' : 'wrong') : ''} ${pick !== null && i === answer ? 'right' : ''}`}
              disabled={pick !== null}
              onClick={() => choose(i)}
            >
              {o}
            </button>
          ))}
        </div>
        {pick !== null && <div className={`status ${pick === answer ? 'ok' : 'warn'}`}>{pick === answer ? right : wrong}</div>}
      </div>
      {pick !== null && <div className="reveal">{children}</div>}
    </div>
  );
}

/* ───────── L4 · Magnetic circuit and the air gap ─────────
   φ ∝ mmf / (R_iron + R_gap); R_gap grows with gap length. */

const K_GAP = 0.12; // relative reluctance per mm of gap (iron path = 1)
export function AirGap({ onSolved }) {
  const [g, setG] = useState(3);
  const done = useRef(false);
  const phi = 1 / (1 + K_GAP * g);
  const set = (v) => {
    setG(v);
    if (!done.current && 1 / (1 + K_GAP * v) >= 0.9) {
      done.current = true;
      onSolved?.();
    }
  };
  const cx = 260;
  const cy = 150;
  const ra = 54;
  const gp = 3 + g * 5; // gap in px
  const shoeTop = cy - ra - gp; // bottom edge of N shoe
  const shoeBot = cy + ra + gp;
  const ok = phi >= 0.9;
  const rIron = 1;
  const rGap = K_GAP * g;
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 520 300" className="fig-svg">
        {/* yoke */}
        <circle cx={cx} cy={cy} r="128" fill="none" stroke="#9a9ea6" strokeWidth="20" />
        <text x={cx + 150} y={cy - 104} fontSize="12" fontWeight="700" fill="#6b6b6b">yoke</text>
        {/* poles */}
        <rect x={cx - 26} y={cy - 120} width="52" height={shoeTop - 12 - (cy - 120)} fill={C.north} opacity="0.85" />
        <rect x={cx - 52} y={shoeTop - 12} width="104" height="12" rx="3" fill={C.north} />
        <text x={cx + 34} y={cy - 92} fontSize="14" fontWeight="800" fill={C.north}>N</text>
        <rect x={cx - 26} y={shoeBot + 12} width="52" height={cy + 120 - shoeBot - 12} fill={C.south} opacity="0.85" />
        <rect x={cx - 52} y={shoeBot} width="104" height="12" rx="3" fill={C.south} />
        <text x={cx + 34} y={cy + 102} fontSize="14" fontWeight="800" fill={C.south}>S</text>
        {/* gaps */}
        <rect x={cx - 52} y={shoeTop} width="104" height={cy - ra - shoeTop} fill={C.force} opacity={0.12 + g * 0.06} />
        <rect x={cx - 52} y={cy + ra} width="104" height={shoeBot - cy - ra} fill={C.force} opacity={0.12 + g * 0.06} />
        <text x={cx - 60} y={(shoeTop + cy - ra) / 2 + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={C.force}>air gap</text>
        {/* armature */}
        <circle cx={cx} cy={cy} r={ra} fill="#e9e9e6" stroke="#9a9a9a" strokeWidth="2" />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill="#6b6b6b">armature core</text>
        {/* flux loops: N → gap → armature → gap → S → yoke → N */}
        {[-7, 7].map((dx) => (
          <path
            key={dx}
            d={`M${cx + dx} ${cy - 128} V${cy + 128} A128 128 0 0 ${dx < 0 ? 1 : 0} ${cx + dx} ${cy - 128}`}
            fill="none"
            stroke={ok ? C.green : C.teal}
            strokeWidth={1 + phi * 3}
            strokeDasharray="6 10"
            opacity={0.25 + phi * 0.7}
            className="flow-ccw"
          />
        ))}
      </svg>
      <div className="lab">
        <div className="readout-col">
          <span>Reluctance of the path</span>
          <div className="vsplit-bar">
            <div style={{ width: `${(rIron / (rIron + rGap)) * 100}%`, background: '#9a9ea6' }} />
            <div style={{ width: `${(rGap / (rIron + rGap)) * 100}%`, background: C.force }} />
          </div>
          <span className="tiny">
            <i className="dot" style={{ background: '#9a9ea6' }} /> all the iron &nbsp; <i className="dot" style={{ background: C.force }} /> the thin air gaps
          </span>
        </div>
        <div className="lab-readouts">
          <Slider label="Air gap length" value={g} min={0.5} max={5} step={0.25} onChange={set} unit="mm" fmt={(v) => v.toFixed(2)} />
          <span className="readout-col">
            <span>Flux per pole φ <Live v={phi} fmt={(x) => `${Math.round(x * 100)}%`} color={ok ? C.green : undefined} /> of the no-gap value</span>
          </span>
          <div className={`goal ${ok ? 'hit' : ''}`}>{ok ? '✓ ' : ''}Goal: φ ≥ 90%</div>
        </div>
      </div>
    </div>
  );
}

/* ───────── L5 · Self-regulation: V = Eb + IaRa ─────────
   220 V, Ra = 0.5 Ω, Eb = 0.2·N, T = 9.55·0.2·Ia. */

const SR = { V: 220, Ra: 0.5, k: 0.2, J: 0.6 };
const tq = (Ia) => 9.55 * SR.k * Ia;
export function SelfRegulation({ onSolved }) {
  const st = useRef({ N: (SR.V - (15 / tq(1)) * SR.Ra) / SR.k, TL: 15, dir: 0 });
  const [TL, setTL] = useState(15);
  const [, tick] = useState(0);
  const done = useRef(false);
  useRaf((dt) => {
    const s = st.current;
    for (let i = 0; i < 8; i++) {
      const Ia = (SR.V - SR.k * s.N) / SR.Ra;
      s.N += ((tq(Ia) - s.TL) / SR.J) * (dt / 8);
    }
    const Ia = (SR.V - SR.k * s.N) / SR.Ra;
    const gap = tq(Ia) - s.TL;
    s.dir = Math.abs(gap) < 0.4 ? 0 : gap < 0 ? 1 : -1; // 1 = load just rose
    if (!done.current && s.TL >= 50 && s.dir === 0) {
      done.current = true;
      onSolved?.();
    }
    tick((n) => (n + 1) % 1e6);
  });
  const s = st.current;
  const Eb = SR.k * s.N;
  const Ia = (SR.V - Eb) / SR.Ra;
  const T = tq(Ia);
  const setLoad = (v) => {
    setTL(v);
    st.current.TL = v;
  };
  const chain = s.dir === 1 ? ['Load ↑', 'N ↓', 'Eb ↓', 'Ia ↑', 'T ↑'] : s.dir === -1 ? ['Load ↓', 'N ↑', 'Eb ↑', 'Ia ↓', 'T ↓'] : ['Load', 'N', 'Eb', 'Ia', 'T = load'];
  return (
    <div className="fig-stack">
      <div className="lab">
        <svg viewBox="0 0 220 150" className="fig-svg dial-svg">
          <Dial x={110} y={100} r={70} value={s.N} max={1200} />
        </svg>
        <div className="lab-readouts">
          <div className="eq-live">
            <span>V</span>=<span>Eb</span>+<span>Ia·Ra</span>
            <b>{SR.V}</b>=<Live v={Eb} fmt={(x) => x.toFixed(0)} />+<Live v={Ia * SR.Ra} fmt={(x) => x.toFixed(0)} />
          </div>
          <div className="readout-col">
            <span>Armature current Ia <Live v={Ia} fmt={(x) => `${x.toFixed(0)} A`} /></span>
            <span>Motor torque <b>{T.toFixed(1)} N·m</b> vs load <b>{TL} N·m</b> {s.dir === 0 && <em className="up">balanced</em>}</span>
          </div>
        </div>
      </div>
      <div className={`chain ${s.dir ? 'on' : ''}`}>
        {chain.map((c, i) => (
          <span key={i}>{c}</span>
        ))}
      </div>
      <div className="controls wide">
        <Slider label="Load torque" value={TL} min={5} max={80} step={5} onChange={setLoad} unit="N·m" />
      </div>
      <div className={`goal ${done.current ? 'hit' : ''}`}>{done.current ? '✓ ' : ''}Goal: raise the load to 50 N·m or more and let it settle</div>
    </div>
  );
}

/* ───────── L5 · Power equation split ───────── */

export function PowerSplit() {
  const [Ia, setIa] = useState(40);
  const V = 220;
  const Ra = 0.5;
  const Eb = V - Ia * Ra;
  const pin = V * Ia;
  const pm = Eb * Ia;
  const cu = Ia * Ia * Ra;
  const max = V * 120;
  return (
    <div className="fig-stack">
      <div className="eq-live big">
        <span>V·Ia</span>=<span style={{ color: C.green }}>Eb·Ia</span>+<span style={{ color: C.force }}>Ia²·Ra</span>
        <Live v={pin} fmt={(x) => `${(x / 1000).toFixed(2)} kW`} />=
        <Live v={pm} fmt={(x) => `${(x / 1000).toFixed(2)} kW`} color={C.green} />+
        <Live v={cu} fmt={(x) => `${(x / 1000).toFixed(2)} kW`} color={C.force} />
      </div>
      <div className="flow-bar">
        <div style={{ flex: pm, background: C.green }} />
        <div style={{ flex: Math.max(cu, 1), background: C.force }} />
        <div style={{ flex: max - pin, background: '#ebebe8' }} />
      </div>
      <div className="flow-legend">
        <span><i style={{ background: C.green }} />mechanical Pm = Eb·Ia</span>
        <span><i style={{ background: C.force }} />heat Ia²Ra</span>
        <span>Eb = 220 − Ia × 0.5 = <b>{Eb.toFixed(0)} V</b></span>
        <span>Converted: <b>{((pm / pin) * 100).toFixed(0)}%</b></span>
      </div>
      <div className="controls wide">
        <Slider label="Armature current Ia (220 V, Ra = 0.5 Ω)" value={Ia} min={5} max={120} step={5} onChange={setIa} unit="A" />
      </div>
    </div>
  );
}

/* ───────── L6 · Predict, then compute N₂ = N₁ × Eb₂/Eb₁ ───────── */

export function SpeedPredict({ onSolved }) {
  const [Ia, setIa] = useState(50);
  const [picked, setPicked] = useState(false);
  const done = useRef(false);
  const Eb2 = 220 - Ia * 0.2;
  const N2 = (1000 * Eb2) / 210;
  const set = (v) => {
    setIa(v);
    if (!done.current && picked && v === 20) {
      done.current = true;
      onSolved?.();
    }
  };
  return (
    <Predict
      prompt={<>A 220 V shunt motor (Ra = 0.2 Ω) runs at 1000 rpm with Ia = 50 A. The load drops so Ia falls to 20 A. Its speed…</>}
      options={['rises a lot', 'rises a little', 'stays exactly 1000 rpm', 'falls']}
      answer={1}
      right="Right: less IaRa drop means slightly more Eb, so slightly more speed."
      wrong="Not quite. Drag Ia down to 20 A and watch what N does."
      onPick={() => setPicked(true)}
    >
      <div className="lab">
        <svg viewBox="0 0 220 150" className="fig-svg dial-svg">
          <Dial x={110} y={100} r={70} value={N2} max={1200} marks={[{ v: 1000, color: C.muted, label: '1000' }]} />
        </svg>
        <div className="lab-readouts">
          <div className="readout-col">
            <span>Eb₁ = 220 − 50 × 0.2 = <b>210 V</b></span>
            <span>Eb₂ = 220 − {Ia} × 0.2 = <Live v={Eb2} fmt={(x) => `${x.toFixed(1)} V`} /></span>
            <span>N₂ = 1000 × Eb₂/210 = <Live v={N2} fmt={(x) => `${x.toFixed(1)} rpm`} color={done.current ? C.green : undefined} /></span>
          </div>
          <Slider label="New armature current Ia₂" value={Ia} min={0} max={60} step={5} onChange={set} unit="A" />
          <div className={`goal ${done.current ? 'hit' : ''}`}>{done.current ? '✓ ' : ''}Set Ia₂ = 20 A</div>
        </div>
      </div>
      {done.current && <div className="status ok">φ is constant, so N₂ = 1000 × 216/210 ≈ 1028.6 rpm. Less load, slightly more speed: a nearly constant-speed motor.</div>}
    </Predict>
  );
}

/* ───────── L6 · Speed regulation lab ─────────
   Shunt: Ia 2→40 A, N = (220 − 0.5 Ia)/0.2.  Series: kφ = 0.005·Ia, R = 0.8 Ω. */

const regN = (type, load) => {
  const Ia = 4 + 36 * load;
  if (type === 'shunt') return (220 - 0.5 * Ia) / 0.2;
  return (220 - 0.8 * Ia) / (0.005 * Ia);
};
export function RegulationLab({ onSolved }) {
  const [type, setType] = useState('shunt');
  const [load, setLoad] = useState(0.5);
  const [seen, setSeen] = useState({ shunt: new Set(), series: new Set() });
  const done = useRef(false);
  const mark = (t, l) => {
    const end = l <= 0 ? 'nl' : l >= 1 ? 'fl' : null;
    if (!end) return;
    const next = { ...seen, [t]: new Set(seen[t]).add(end) };
    setSeen(next);
    // Reading N₀ and N_fl for one motor is the meaningful action; comparing the other is optional.
    if (!done.current && (next.shunt.size === 2 || next.series.size === 2)) {
      done.current = true;
      onSolved?.();
    }
  };
  const move = (v) => {
    setLoad(v);
    mark(type, v);
  };
  const choose = (t) => {
    setType(t);
    mark(t, load);
  };
  const N = regN(type, load);
  const N0 = regN(type, 0);
  const Nfl = regN(type, 1);
  const known = seen[type].size === 2;
  const W = 420;
  const H = 130;
  const X = (l) => 40 + l * W;
  const Y = (n) => 14 + H - (Math.min(n, 3000) / 3000) * H;
  const pts = [];
  for (let i = 0; i <= 40; i++) pts.push(`${X(i / 40)},${Y(regN(type, i / 40))}`);
  return (
    <div className="fig-stack">
      <div className="controls center">
        <Toggle value={type} onChange={choose} options={[{ value: 'shunt', label: 'Shunt motor' }, { value: 'series', label: 'Series motor' }]} />
      </div>
      <svg viewBox="0 0 480 170" className="fig-svg">
        <line x1="40" y1={14 + H} x2={40 + W} y2={14 + H} stroke="#666" />
        <line x1="40" y1="14" x2="40" y2={14 + H} stroke="#666" />
        {[0, 1000, 2000, 3000].map((n) => (
          <text key={n} x="34" y={Y(n) + 4} textAnchor="end" fontSize="10" fill={C.muted}>{n}</text>
        ))}
        <text x="44" y="10" fontSize="10" fill={C.muted}>N (rpm)</text>
        <text x={X(0)} y={14 + H + 14} fontSize="10" fill={C.muted}>no load</text>
        <text x={X(1)} y={14 + H + 14} textAnchor="end" fontSize="10" fill={C.muted}>full load</text>
        <polyline points={pts.join(' ')} fill="none" stroke={type === 'shunt' ? C.teal : C.force} strokeWidth="3" />
        <circle cx={X(load)} cy={Y(N)} r="6" fill="#fff" stroke={type === 'shunt' ? C.teal : C.force} strokeWidth="3" />
        {N > 3000 ? (
          <text x={Math.min(X(load) + 10, 360)} y="26" fontSize="12" fontWeight="800" fill={C.north}>runaway! {Math.round(N)} rpm</text>
        ) : (
          <text x={Math.min(X(load), 420)} y={Y(N) - 12} textAnchor="middle" fontSize="12" fontWeight="800" fill={C.ink}>{Math.round(N)} rpm</text>
        )}
      </svg>
      <div className="controls wide">
        <Slider label="Load" value={load} min={0} max={1} step={0.05} onChange={move} unit="" fmt={(v) => (v === 0 ? 'no load' : v === 1 ? 'full load' : `${Math.round(v * 100)}%`)} />
      </div>
      <div className="formula">
        % reg = (N₀ − N_fl) / N_fl × 100 ={' '}
        {known ? (
          <>
            ({Math.round(N0)} − {Math.round(Nfl)}) / {Math.round(Nfl)} × 100 = <b className="ok">{(((N0 - Nfl) / Nfl) * 100).toFixed(1)}%</b>
          </>
        ) : (
          <span className="muted">slide from no load to full load to read N₀ and N_fl</span>
        )}
      </div>
    </div>
  );
}

/* ───────── L8 · Size the starting resistance ─────────
   220 V, Ra = 0.5 Ω, full load 20 A. Target 30–40 A at start. */

export function StartResistor({ onSolved }) {
  const [R, setR] = useState(0);
  const done = useRef(false);
  const Ia = 220 / (0.5 + R);
  const ok = Ia <= 40 && Ia >= 30;
  const set = (v) => {
    setR(v);
    const I = 220 / (0.5 + v);
    if (!done.current && I <= 40 && I >= 30) {
      done.current = true;
      onSolved?.();
    }
  };
  const frac = Math.sqrt(Ia / 440);
  const zz = Math.round(3 + R * 1.6);
  let d = 'M150 40';
  for (let i = 1; i <= zz; i++) d += ` L${150 + (i * 120) / zz - 60 / zz} ${i % 2 ? 30 : 50} `;
  d += ' L270 40';
  const msg =
    R === 0
      ? 'Direct on line: Eb = 0 at standstill, so Ia = 220 / 0.5 = 440 A, 22× full load. That burns the armature, sparks the commutator and dips the line.'
      : Ia > 40
        ? 'Still too much current. Add more resistance.'
        : Ia < 30
          ? 'Too much resistance: so little current that the starting torque is feeble.'
          : 'Safe start: about twice full-load current, with plenty of torque.';
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 420 170" className="fig-svg">
        <path d="M60 40 H150 M270 40 H360 V70 M360 130 V150 H60 V40" fill="none" stroke="#5c5c5c" strokeWidth="2.5" />
        <path d="M60 40 H150 M270 40 H360 V70 M360 130 V150 H60 V40" fill="none" stroke={C.current} strokeWidth="2" strokeDasharray="4 12" className="flow-cw" opacity={0.3 + frac * 0.7} style={{ animationDuration: `${0.25 + (1 - frac) * 1.5}s` }} />
        <path d={d} fill="none" stroke="#c06a1f" strokeWidth="3" />
        <text x="210" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#c06a1f">starting resistance R</text>
        <circle cx="360" cy="100" r="26" fill="#fff" stroke="#4a4a4a" strokeWidth="2.5" />
        <text x="360" y="106" textAnchor="middle" fontSize="16" fontWeight="800" fill="#1a1a1a">M</text>
        <text x="394" y="104" fontSize="11" fill={C.muted}>Ra</text>
        <text x="44" y="100" textAnchor="end" fontSize="13" fontWeight="800" fill={C.ink}>220 V</text>
        <line x1="44" y1="92" x2="76" y2="92" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="104" x2="68" y2="104" stroke="#333" strokeWidth="5" />
      </svg>
      <div className="lab">
        <div className="readout-col">
          <span>Starting current Ia = 220 / (0.5 + R)</span>
          <span className="big-num"><Live v={Ia} fmt={(x) => `${x.toFixed(0)} A`} color={ok ? C.green : Ia > 40 ? C.north : C.force} /></span>
          <span><b>{(Ia / 20).toFixed(1)}×</b> full-load current</span>
        </div>
        <div className="lab-readouts">
          <Slider label="Starting resistance R" value={R} min={0} max={10} step={0.25} onChange={set} unit="Ω" fmt={(v) => v.toFixed(2)} />
          <div className={`goal ${ok ? 'hit' : ''}`}>{ok ? '✓ ' : ''}Goal: start at 30–40 A (about 2× full load)</div>
        </div>
      </div>
      <div className={`status ${ok ? 'ok' : R === 0 || Ia > 40 ? 'warn' : ''}`}>{msg}</div>
    </div>
  );
}

/* ───────── L8 · 3-point vs 4-point starter under field weakening ───────── */

const HOLD = 60; // NVC needs ≥ 60% of rated current to hold the handle
export function ThreeVsFour({ onSolved }) {
  const [kind, setKind] = useState(3);
  const [f, setF] = useState(100);
  const [released, setReleased] = useState(false);
  const [got, setGot] = useState({ trip: false, fast: false });
  const done = useRef(false);
  const nvc = kind === 3 ? f : 100;
  const N = released ? 0 : (1000 * 100) / f;
  const note = (g) => {
    setGot(g);
    if (!done.current && g.trip && g.fast) {
      done.current = true;
      onSolved?.();
    }
  };
  const setField = (v) => {
    if (released) return;
    setF(v);
    if (kind === 3 && v < HOLD) {
      setReleased(true);
      note({ ...got, trip: true });
    } else if (kind === 4 && v <= 60) note({ ...got, fast: true });
  };
  const choose = (k) => {
    setKind(k);
    setReleased(false);
    setF(100);
  };
  const [hx, hy] = released ? [22, 118] : [150, 84];
  const flow = (on) => ({ opacity: on ? 0.35 + (nvc / 100) * 0.65 : 0 });
  const spin = N > 0 ? { transformOrigin: '440px 95px', animation: `spin ${(60 / N) * 8}s linear infinite` } : undefined;
  return (
    <div className="fig-stack">
      <div className="controls center">
        <Toggle value={kind} onChange={choose} options={[{ value: 3, label: `${got.trip ? '✓ ' : ''}3-point starter` }, { value: 4, label: `${got.fast ? '✓ ' : ''}4-point starter` }]} />
      </div>
      <svg viewBox="0 0 480 182" className="fig-svg">
        <path d="M20 20 H460" stroke={C.north} strokeWidth="3" />
        <path d="M20 170 H460" stroke={C.south} strokeWidth="3" />
        <text x="24" y="14" fontSize="12" fontWeight="800" fill={C.north}>L+</text>
        <text x="24" y="166" fontSize="12" fontWeight="800" fill={C.south}>L−</text>
        {/* armature */}
        <path d="M440 20 V68 M440 122 V170" stroke="#5c5c5c" strokeWidth="2.5" />
        <circle cx="440" cy="95" r="26" fill="#fff" stroke="#4a4a4a" strokeWidth="2.5" />
        <g style={spin}>
          <line x1="420" y1="95" x2="460" y2="95" stroke={C.teal} strokeWidth="3" />
        </g>
        {/* field branch: rheostat + coil */}
        <path d="M340 20 V36 M340 80 V92 M340 150 V170" stroke="#5c5c5c" strokeWidth="2.5" />
        <path d="M340 36 l8 4 l-16 6 l16 6 l-16 6 l16 6 l-16 6 l8 4 V80" fill="none" stroke="#c06a1f" strokeWidth="2.5" />
        <line x1={324} y1={72} x2={360} y2={44} stroke={C.ink} strokeWidth="1.5" />
        <path d={`M340 92 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 10`} fill="none" stroke="#c06a1f" strokeWidth="3" opacity={0.4 + (f / 100) * 0.6} />
        <text x="356" y="62" fontSize="10" fill="#c06a1f">rheostat</text>
        <text x="352" y="124" fontSize="10" fill="#c06a1f">field {f}%</text>
        {/* NVC wiring */}
        {kind === 3 ? (
          <g>
            <path d="M210 72 H300 V100 H332" fill="none" stroke="#3b5bdb" strokeWidth="2" />
            <path d="M210 72 H300 V100 H332" fill="none" stroke={C.current} strokeWidth="2" strokeDasharray="4 10" className="flow-ccw" style={flow(true)} />
            <text x="214" y="52" fontSize="10.5" fill="#4263eb">in series with the field</text>
          </g>
        ) : (
          <g>
            <path d="M180 20 V58 M180 86 V108 M180 146 V170" fill="none" stroke="#3b5bdb" strokeWidth="2" />
            <path d="M180 108 l6 3 l-12 5 l12 5 l-12 5 l12 5 l-12 5 l12 5 l-6 3 V146" fill="none" stroke="#4263eb" strokeWidth="2" />
            <path d="M180 20 V58" fill="none" stroke={C.current} strokeWidth="2" strokeDasharray="4 10" className="flow-cw" />
            <text x="192" y="132" fontSize="10.5" fill="#4263eb">across the supply</text>
          </g>
        )}
        <rect x="150" y="58" width="60" height="28" rx="5" fill={!released ? '#dbe4ff' : '#f3f3f1'} stroke="#3b5bdb" strokeWidth="2" />
        <text x="180" y="77" textAnchor="middle" fontSize="12" fontWeight="800" fill="#2a3f9e">NVC</text>
        {/* handle */}
        <text x="16" y="138" fontSize="11" fontWeight="700" fill={C.muted}>OFF</text>
        <line x1="86" y1="150" x2={hx} y2={hy} stroke="#5c5c5c" strokeWidth="7" strokeLinecap="round" className="arm" />
        <circle cx="86" cy="150" r="8" fill="#777" />
        <text x="96" y="164" fontSize="10" fill={C.muted}>handle</text>
      </svg>
      <div className="lab">
        <div className="readout-col">
          <span>NVC pull <b className={nvc < HOLD ? 'warn' : ''}>{nvc}%</b> <em>holds at ≥ {HOLD}%</em></span>
          <div className="gauge-bar hold-bar">
            <div style={{ width: `${nvc}%`, background: nvc < HOLD ? C.north : '#3b5bdb' }} />
            <i style={{ left: `${HOLD}%` }} />
          </div>
        </div>
        <div className="lab-readouts">
          <Slider label="Field current (field rheostat)" value={f} min={40} max={100} step={5} onChange={setField} unit="%" />
          <div className="readout-col">
            <span>Speed <Live v={N} fmt={(x) => `${Math.round(x)} rpm`} /> {!released && f < 100 && <em className="up">above base</em>}</span>
          </div>
          {released && (
            <button className="chip primary" onClick={() => choose(kind)}>
              Restart
            </button>
          )}
        </div>
      </div>
      <div className={`status ${released ? 'warn' : kind === 4 && f <= 60 ? 'ok' : ''}`}>
        {released
          ? 'The NVC current fell with the field, so it let go: the handle sprang to OFF and the motor stopped. Now try the 4-point starter.'
          : kind === 3
            ? 'Weaken the field to speed the motor up…'
            : f <= 60
              ? 'The NVC is fed straight from the supply, so it holds no matter how weak the field is.'
              : 'Weaken the field all the way down to 60% or below.'}
      </div>
    </div>
  );
}

/* ───────── L8 · Hit the target speed with each method ─────────
   Same model as SpeedControl: kφ = 0.2, Ra = 0.5 Ω, constant load torque 38.2 N·m. */

const TARGETS = [
  { m: 'flux', goal: 1200, label: 'Flux control: make it run at 1200 rpm' },
  { m: 'res', goal: 800, label: 'Armature resistance: slow it to 800 rpm' },
  { m: 'volt', goal: 500, label: 'Armature voltage: bring it to 500 rpm' },
];
export function SpeedTargets({ onSolved }) {
  const [k, setK] = useState(0);
  const [vals, setVals] = useState({ flux: 100, res: 0, volt: 220 });
  const [hit, setHit] = useState([]);
  const t = TARGETS[k];
  const f = t.m === 'flux' ? vals.flux / 100 : 1;
  const R = 0.5 + (t.m === 'res' ? vals.res : 0);
  const V = t.m === 'volt' ? vals.volt : 220;
  const Ia = 20 / f;
  const N = (V - Ia * R) / (0.2 * f);
  const ok = Math.abs(N - t.goal) <= 10;
  const set = (key, v) => {
    const nv = { ...vals, [key]: v };
    setVals(nv);
    const ff = key === 'flux' ? v / 100 : 1;
    const n = ((key === 'volt' ? v : 220) - (20 / ff) * (0.5 + (key === 'res' ? v : 0))) / (0.2 * ff);
    if (Math.abs(n - t.goal) <= 10 && !hit.includes(k)) {
      const h = [...hit, k];
      setHit(h);
      onSolved?.(); // one target hit unlocks; the other methods stay open
    }
  };
  return (
    <div className="fig-stack">
      <div className="target-steps">
        {TARGETS.map((x, i) => (
          <button key={x.m} className={`part-chip ${i === k ? 'on' : ''}`} onClick={() => setK(i)}>
            {x.m === 'flux' ? 'Flux' : x.m === 'res' ? 'Resistance' : 'Voltage'}
          </button>
        ))}
      </div>
      <div className="lab">
        <svg viewBox="0 0 220 150" className="fig-svg dial-svg">
          <Dial x={110} y={100} r={70} value={N} max={1600} color={ok ? C.green : C.teal} marks={[{ v: t.goal, color: C.force, label: `${t.goal}` }, { v: 1050, color: C.muted, label: 'base' }]} />
        </svg>
        <div className="lab-readouts">
          <div className={`goal ${ok ? 'hit' : ''}`}>{ok ? '✓ ' : ''}{t.label}</div>
          {t.m === 'flux' && <Slider label="Field flux φ" value={vals.flux} min={50} max={100} step={1} onChange={(v) => set('flux', v)} unit="%" />}
          {t.m === 'res' && <Slider label="Extra armature resistance" value={vals.res} min={0} max={5} step={0.1} onChange={(v) => set('res', v)} unit="Ω" fmt={(v) => v.toFixed(1)} />}
          {t.m === 'volt' && <Slider label="Armature voltage" value={vals.volt} min={20} max={220} step={5} onChange={(v) => set('volt', v)} unit="V" />}
          <div className="eq-live small">
            N = (<Live v={V} fmt={(x) => x} /> − <Live v={Ia} fmt={(x) => x.toFixed(1)} /> × <Live v={R} fmt={(x) => x.toFixed(1)} />) / <Live v={0.2 * f} fmt={(x) => x.toFixed(3)} /> = <Live v={N} fmt={(x) => Math.round(x)} color={ok ? C.green : undefined} />
          </div>
          {ok && k < TARGETS.length - 1 && (
            <button className="chip primary" onClick={() => setK(k + 1)}>
              Next target ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
