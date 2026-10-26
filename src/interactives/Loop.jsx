import { useRef, useState } from 'react';
import { Arrow, C, Toggle, WireEnd, svgPoint, useRaf } from './common.jsx';

const CX = 280;
const CY = 165;
const R = 105;
const deg = (r) => (r * 180) / Math.PI;

// Cross-section of a rectangular coil seen end-on: two wire sides joined by
// the loop plane (the line between them). α = loop angle from horizontal (CCW).
// Side A carries current out of the screen (or the commutator flips it).
function LoopScene({ alpha, sign = 1, showLever = true, commutator = false }) {
  const ax = CX + R * Math.cos(alpha);
  const ay = CY - R * Math.sin(alpha);
  const bx = CX - R * Math.cos(alpha);
  const by = CY + R * Math.sin(alpha);
  const curA = sign; // +1 out of screen, -1 into
  const fA = curA; // B points right → force up on "out" current
  const torque = Math.cos(alpha) * sign; // fraction of max, + = CCW
  const len = 56;
  return (
    <g>
      {/* poles */}
      <path d="M20 40 H120 V95 Q90 165 120 235 V290 H20 Z" fill={C.north} />
      <path d="M540 40 H440 V95 Q470 165 440 235 V290 H540 Z" fill={C.south} />
      <text x="56" y="172" fontSize="30" fontWeight="800" fill="#fff">N</text>
      <text x="486" y="172" fontSize="30" fontWeight="800" fill="#fff">S</text>
      {[70, 120, 165, 210, 260].map((y) => (
        <line key={y} x1="130" y1={y} x2="430" y2={y} stroke={C.teal} strokeWidth="1.3" opacity="0.55" />
      ))}
      <path d="M-6 -5 L6 0 L-6 5 Z" fill={C.teal} opacity="0.6" transform="translate(150 70)" />
      <path d="M-6 -5 L6 0 L-6 5 Z" fill={C.teal} opacity="0.6" transform="translate(150 260)" />
      {/* lever arms */}
      {showLever && (
        <g stroke={C.force} strokeDasharray="4 5" strokeWidth="1.6" opacity="0.8">
          <line x1={ax} y1={ay} x2={ax} y2={CY} />
          <line x1={bx} y1={by} x2={bx} y2={CY} />
          <line x1={bx} y1={CY} x2={ax} y2={CY} stroke={C.force} strokeDasharray="" strokeWidth="3" opacity="0.5" />
        </g>
      )}
      {/* loop */}
      <line x1={ax} y1={ay} x2={bx} y2={by} stroke="#4a4a4a" strokeWidth="6" strokeLinecap="round" />
      <circle cx={CX} cy={CY} r="7" fill="#9a9a9a" stroke="#4a4a4a" strokeWidth="2" />
      <WireEnd x={ax} y={ay} r={17} dir={curA} />
      <WireEnd x={bx} y={by} r={17} dir={-curA} />
      <Arrow x1={ax} y1={ay - fA * 20} x2={ax} y2={ay - fA * (20 + len)} color={C.force} width={4.5} />
      <Arrow x1={bx} y1={by + fA * 20} x2={bx} y2={by + fA * (20 + len)} color={C.force} width={4.5} />
      {commutator && <Commutator alpha={alpha} sign={sign} />}
      {/* torque meter */}
      <g transform="translate(160 312)">
        <rect x="0" y="-8" width="240" height="16" rx="8" fill="#ebebe8" />
        <rect x="120" y="-8" width="1.5" height="16" fill="#666" />
        <rect
          x={torque >= 0 ? 120 : 120 + torque * 120}
          y="-8"
          width={Math.abs(torque) * 120}
          height="16"
          rx="4"
          fill={Math.abs(torque) < 0.05 ? C.green : C.force}
        />
        <text x="-10" y="5" textAnchor="end" fontSize="13" fill={C.ink} fontWeight="700">Torque</text>
        <text x="250" y="5" fontSize="13" fill={Math.abs(torque) < 0.05 ? C.green : C.ink} fontWeight="800">
          {Math.round(Math.abs(torque) * 100)}% {Math.abs(torque) < 0.05 ? '' : torque > 0 ? '↺' : '↻'}
        </text>
      </g>
    </g>
  );
}

// Split-ring commutator + brushes drawn as an inset (top right).
function Commutator({ alpha, sign }) {
  const ox = 280;
  const oy = -12;
  const r = 18;
  const gap = 0.32;
  const arc = (a0, a1) => {
    const p = (a) => `${ox + r * Math.cos(a)} ${oy - r * Math.sin(a)}`;
    return `M${p(a0)} A${r} ${r} 0 0 0 ${p(a1)}`;
  };
  return (
    <g>
      <rect x={ox - 60} y={oy - 30} width="120" height="56" rx="10" fill="#f7f7f5" stroke="#d6d6d2" />
      <line x1={ox} y1={oy + r} x2={CX} y2={CY - 8} stroke="#b4b4b0" strokeDasharray="2 4" />
      <path d={arc(alpha - Math.PI / 2 + gap, alpha + Math.PI / 2 - gap)} stroke="#e0a43a" strokeWidth="7" fill="none" />
      <path d={arc(alpha + Math.PI / 2 + gap, alpha + (3 * Math.PI) / 2 - gap)} stroke="#b07a2a" strokeWidth="7" fill="none" />
      <rect x={ox + r + 2} y={oy - 4} width="10" height="8" fill={sign > 0 ? C.north : C.south} />
      <rect x={ox - r - 12} y={oy - 4} width="10" height="8" fill={sign > 0 ? C.south : C.north} />
      <text x={ox - 52} y={oy - 16} fontSize="10" fill={C.muted}>+</text>
      <text x={ox + 46} y={oy - 16} fontSize="10" fill={C.muted}>−</text>
    </g>
  );
}

export function LoopTorque({ onSolved, goal = null }) {
  const svgRef = useRef(null);
  const [alpha, setAlpha] = useState(0.5);
  const [drag, setDrag] = useState(false);
  const [moved, setMoved] = useState(false);
  const done = useRef(false);

  const move = (e) => {
    if (!drag) return;
    const p = svgPoint(svgRef.current, e);
    const a = Math.atan2(CY - p.y, p.x - CX);
    setAlpha(a);
    setMoved(true);
    if (!done.current && goal === 'zero' && Math.abs(Math.cos(a)) < 0.05) {
      done.current = true;
      onSolved?.();
    }
  };
  const a360 = ((deg(alpha) % 360) + 360) % 360;
  return (
    <div className="fig-stack">
      <svg
        ref={svgRef}
        viewBox="0 0 560 330"
        className="fig-svg touch-none"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); setDrag(true); }}
        onPointerMove={move}
        onPointerUp={() => setDrag(false)}
        style={{ cursor: drag ? 'grabbing' : 'grab' }}
      >
        <LoopScene alpha={alpha} />
        {!moved && (
          <text x={CX} y={CY + 60} textAnchor="middle" fontSize="13" fill={C.muted}>drag to rotate</text>
        )}
      </svg>
      <div className="controls center">
        <span className="hint">
          Coil angle θ (from the field) <b>{Math.round(a360)}°</b> · torque = F × lever arm = F·w·cos θ
        </span>
      </div>
    </div>
  );
}

// Physics: J·θ'' = τ₀·cosθ·s − b·θ', with s = +1 (no commutator) or sign(cosθ).
export function LoopSim({ onSolved, commutatorAvailable = false, startCommutator = false, goal = 'settle' }) {
  const st = useRef({ a: 0, w: 0, t: 0, running: false, revs: 0, last: 0 });
  const [comm, setComm] = useState(startCommutator);
  const [running, setRunning] = useState(false);
  const [, tick] = useState(0);
  const done = useRef(false);
  const J = 0.05;
  const b = 0.05;
  const tau0 = 1;

  useRaf((dt) => {
    const s = st.current;
    if (!s.running) return;
    const steps = 8;
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const c = Math.cos(s.a);
      const sign = comm ? (c >= 0 ? 1 : -1) : 1;
      const acc = (tau0 * c * sign - b * s.w) / J;
      s.w += acc * h;
      s.a += s.w * h;
    }
    s.t += dt;
    s.revs = Math.floor(Math.abs(s.a) / (2 * Math.PI));
    if (!done.current) {
      if (goal === 'settle' && s.t > 2.5 && Math.abs(s.w) < 0.15) {
        done.current = true;
        onSolved?.();
      }
      if (goal === 'spin' && s.revs >= 3) {
        done.current = true;
        onSolved?.();
      }
    }
    tick((n) => n + 1);
  }, running);

  const release = () => {
    st.current = { a: 0, w: 0, t: 0, running: true, revs: 0 };
    setRunning(true);
  };
  const s = st.current;
  const sign = comm ? (Math.cos(s.a) >= 0 ? 1 : -1) : 1;
  const rps = Math.abs(s.w) / (2 * Math.PI);
  return (
    <div className="fig-stack">
      <svg viewBox={comm || commutatorAvailable ? '0 -46 560 376' : '0 0 560 330'} className="fig-svg">
        <LoopScene alpha={s.a} sign={sign} showLever={false} commutator={comm} />
      </svg>
      <div className="controls center">
        <button className="chip primary" onClick={release}>{running ? '↺ Reset & release' : '▶ Release'}</button>
        {commutatorAvailable && (
          <Toggle
            value={comm}
            onChange={(v) => { setComm(v); }}
            options={[
              { value: false, label: 'No commutator' },
              { value: true, label: 'Commutator' },
            ]}
          />
        )}
        <span className="hint">
          {running ? `${rps.toFixed(1)} rev/s · ${s.revs} turn${s.revs === 1 ? '' : 's'}` : 'Starts flat, at max torque'}
        </span>
      </div>
    </div>
  );
}
