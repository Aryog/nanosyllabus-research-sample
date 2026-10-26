import { useEffect, useRef, useState } from 'react';
import { Arrow, C, Slider, Toggle, WireEnd, svgPoint, useRaf } from './common.jsx';

// Wire between two pole pieces. Field points from N to S.
// Force direction: F = I L × B → (out of screen) × (→) = ↑
export function ForceOnWire({
  onSolved,
  mode = 'sliders', // 'sliders' | 'directions' | 'question'
  config = { flip: false, cur: 1 },
  target = 1,
}) {
  const [B, setB] = useState(0.5);
  const [I, setI] = useState(2);
  const [L, setL] = useState(0.1);
  const [flip, setFlip] = useState(config.flip);
  const [cur, setCur] = useState(config.cur);
  const [tried, setTried] = useState({ flip: false, cur: false });
  const disp = useRef(0);
  const [, tick] = useState(0);
  const done = useRef(false);

  const F = B * I * L;
  const bSign = flip ? -1 : 1;
  const fDir = cur * bSign; // +1 up, -1 down
  const showForce = mode !== 'question';

  useRaf((dt) => {
    const goal = showForce ? -fDir * Math.min(F, 3) * 22 : 0;
    disp.current += (goal - disp.current) * Math.min(1, dt * 6);
    tick((n) => n + 1);
  });

  useEffect(() => {
    if (done.current || !onSolved) return;
    if (mode === 'sliders' && Math.abs(F - target) < 0.005) {
      done.current = true;
      onSolved();
    }
    if (mode === 'directions' && tried.flip && tried.cur) {
      done.current = true;
      onSolved();
    }
  }, [F, tried, mode, onSolved, target]);

  const leftIsN = !flip;
  const wy = 160 + disp.current;
  const fieldYs = [90, 125, 195, 230];
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 560 320" className="fig-svg">
        {/* pole pieces */}
        <rect x="30" y="60" width="110" height="200" rx="10" fill={leftIsN ? C.north : C.south} />
        <rect x="420" y="60" width="110" height="200" rx="10" fill={leftIsN ? C.south : C.north} />
        <text x="85" y="170" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">{leftIsN ? 'N' : 'S'}</text>
        <text x="475" y="170" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">{leftIsN ? 'S' : 'N'}</text>
        {/* field lines */}
        {[...fieldYs, 160].map((y) => (
          <g key={y} opacity={0.35 + B * 0.6}>
            <line x1="150" y1={y} x2="410" y2={y} stroke={C.teal} strokeWidth="1.6" strokeDasharray={y === 160 ? '4 6' : ''} />
            <path d="M-6 -5 L6 0 L-6 5 Z" fill={C.teal} transform={`translate(${y === 160 ? 190 : 330} ${y}) rotate(${bSign === 1 ? 0 : 180})`} />
          </g>
        ))}
        <text x="280" y="50" textAnchor="middle" fontSize="13" fill={C.teal} fontWeight="700">B {bSign === 1 ? '→' : '←'}</text>
        {/* wire */}
        <WireEnd x={280} y={wy} r={20} dir={cur} />
        {showForce && F > 0.001 && (
          <Arrow x1={280} y1={wy + (fDir > 0 ? -24 : 24)} x2={280} y2={wy + (fDir > 0 ? -24 : 24) - fDir * (18 + Math.min(F, 3) * 30)} color={C.force} width={5} head={12} />
        )}
        {mode === 'question' && <text x="280" y={wy - 40} textAnchor="middle" fontSize="22" fontWeight="800" fill="#3b5bdb">?</text>}
        {showForce && (
          <text x="320" y={wy - 30} fontSize="14" fontWeight="800" fill={C.force}>F</text>
        )}
        {/* legend */}
        <g transform="translate(150 300)" fontSize="12" fill={C.muted}>
          <text>⊙ current out of screen · ⊗ into screen</text>
        </g>
      </svg>

      {mode === 'sliders' && (
        <>
          <div className="formula">
            F = B · I · l = {B.toFixed(2)} × {I.toFixed(1)} × {L.toFixed(2)} ={' '}
            <b className={Math.abs(F - target) < 0.005 ? 'ok' : ''}>{F.toFixed(2)} N</b>
            <span className="muted"> · target {target.toFixed(2)} N</span>
          </div>
          <div className="controls grid3">
            <Slider label="Field B" unit="T" value={B} min={0} max={1} step={0.05} onChange={setB} fmt={(v) => v.toFixed(2)} />
            <Slider label="Current I" unit="A" value={I} min={0} max={10} step={0.5} onChange={setI} fmt={(v) => v.toFixed(1)} />
            <Slider label="Length l" unit="m" value={L} min={0.05} max={0.3} step={0.01} onChange={setL} fmt={(v) => v.toFixed(2)} />
          </div>
        </>
      )}
      {mode === 'directions' && (
        <div className="controls center">
          <button className="chip" onClick={() => { setFlip((f) => !f); setTried((t) => ({ ...t, flip: true })); }}>⇄ Flip magnets {tried.flip && '✓'}</button>
          <button className="chip" onClick={() => { setCur((c) => -c); setTried((t) => ({ ...t, cur: true })); }}>↺ Reverse current {tried.cur && '✓'}</button>
          <span className="hint">Force: <b style={{ color: C.force }}>{fDir > 0 ? 'up ↑' : 'down ↓'}</b></span>
        </div>
      )}
    </div>
  );
}

// Fleming's left-hand rule as three perpendicular arrows.
export function FlemingAxes() {
  return (
    <svg viewBox="0 0 360 200" className="fig-svg small">
      <g transform="translate(150 120)">
        <Arrow x1={0} y1={0} x2={0} y2={-90} color={C.force} width={5} />
        <Arrow x1={0} y1={0} x2={110} y2={0} color={C.teal} width={5} />
        <Arrow x1={0} y1={0} x2={-62} y2={52} color={C.current} width={5} />
        <circle r="6" fill="#5c5c5c" />
        <text x="12" y="-80" fill={C.force} fontWeight="800" fontSize="14">thuMb → Motion (F)</text>
        <text x="60" y="22" fill={C.teal} fontWeight="800" fontSize="14">First finger → Field (B)</text>
        <text x="-140" y="72" fill={C.current} fontWeight="800" fontSize="14">seCond finger → Current (I)</text>
      </g>
    </svg>
  );
}

/* ───────── "Mark the point" graph input (torque vs angle) ─────────
   value = { a: angle in degrees } once the learner has placed the point. */

const GX = 60;
const GY = 30;
const GW = 420;
const GH = 200;
const toX = (deg) => GX + (deg / 360) * GW;
const toY = (t) => GY + GH / 2 - t * (GH / 2 - 10);

export function TorqueGraph({ value, setValue, status, answer = 90, prompt = 'zero' }) {
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const a = value?.a ?? 300;
  const placed = value != null;
  const tq = Math.cos((a * Math.PI) / 180);
  const pts = [];
  for (let d = 0; d <= 360; d += 3) pts.push(`${toX(d).toFixed(1)},${toY(Math.cos((d * Math.PI) / 180)).toFixed(1)}`);

  const move = (e) => {
    if (!drag || status === 'correct' || status === 'revealed') return;
    const p = svgPoint(svgRef.current, e);
    const deg = Math.round(Math.max(0, Math.min(360, ((p.x - GX) / GW) * 360)) / 15) * 15;
    setValue({ a: deg });
  };
  const ok = status === 'correct' || status === 'revealed';
  const shownA = status === 'revealed' ? answer : a;
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 520 290"
      className="fig-svg touch-none"
      onPointerMove={move}
      onPointerUp={() => setDrag(false)}
      onPointerLeave={() => setDrag(false)}
    >
      <text x={GX} y="18" fontSize="13" fontWeight="700" fill={C.ink}>Torque on the coil, % of max (negative = other way)</text>
      {[0, 90, 180, 270, 360].map((d) => (
        <g key={d}>
          <line x1={toX(d)} y1={GY} x2={toX(d)} y2={GY + GH} stroke={C.grid} />
          <text x={toX(d)} y={GY + GH + 18} textAnchor="middle" fontSize="12" fill={C.ink}>{d}°</text>
        </g>
      ))}
      {[1, 0.5, 0, -0.5, -1].map((t) => (
        <g key={t}>
          <line x1={GX} y1={toY(t)} x2={GX + GW} y2={toY(t)} stroke={t === 0 ? '#555' : C.grid} />
          <text x={GX - 8} y={toY(t) + 4} textAnchor="end" fontSize="12" fill={C.ink}>{Math.round(t * 100)}</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke={ok ? C.green : C.teal} strokeWidth="2.5" />
      <text x={GX + GW} y={GY + GH + 40} textAnchor="end" fontSize="13" fontWeight="700" fill={C.ink}>Coil angle θ (plane from the field direction)</text>
      <g
        onPointerDown={(e) => { e.target.setPointerCapture?.(e.pointerId); setDrag(true); if (!placed) setValue({ a }); }}
        style={{ cursor: ok ? 'default' : drag ? 'grabbing' : 'grab' }}
      >
        <circle cx={toX(shownA)} cy={toY(Math.cos((shownA * Math.PI) / 180))} r="22" fill={ok ? 'rgba(31,157,85,.16)' : 'rgba(59,91,219,.10)'} />
        <circle cx={toX(shownA)} cy={toY(Math.cos((shownA * Math.PI) / 180))} r="7" fill={ok ? C.green : status === 'wrong' ? '#e09a00' : '#3b5bdb'} />
      </g>
      {(placed || ok) && (
        <text x={toX(shownA)} y={toY(Math.cos((shownA * Math.PI) / 180)) - 26} textAnchor="middle" fontSize="13" fontWeight="800" fill={ok ? C.green : C.ink}>
          ({shownA}°, {Math.round(Math.cos((shownA * Math.PI) / 180) * 100) || 0}%)
        </text>
      )}
      {!placed && !ok && (
        <text x={toX(a)} y={toY(tq) + 42} textAnchor="middle" fontSize="12" fill={C.muted}>drag me</text>
      )}
      <title>{prompt}</title>
    </svg>
  );
}

TorqueGraph.complete = (v) => v != null;
