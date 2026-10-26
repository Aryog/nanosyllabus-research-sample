import { useRef, useState } from 'react';
import { C, Slider, Toggle, svgPoint, useRaf } from './common.jsx';

/* ───────── 3-point starter ─────────
   Shunt motor: V = 220 V, Ra = 0.5 Ω, Eb = 0.2·N, T = 9.55·0.2·Ia.
   The handle steps across studs; R_ext is the starting resistance left in circuit. */

const V = 220;
const RA = 0.5;
const KPHI = 0.2;
const STUD_R = [null, 10.5, 5.5, 2.8, 1.3, 0.5, 0]; // index 0 = OFF, 6 = RUN
const TRIP = 40; // OLR setting, A
const J = 0.07; // N·m per (rpm/s)

const PIV = { x: 190, y: 190 };
const ARM = 112;
const studAngle = (k) => (k === 0 ? 205 : 222 + (k - 1) * 22); // SVG degrees
const at = (r, deg) => {
  const t = (deg * Math.PI) / 180;
  return [PIV.x + r * Math.cos(t), PIV.y + r * Math.sin(t)];
};

export function StarterSim({ onSolved }) {
  const st = useRef({ N: 0, Ia: 0, handle: 0, ang: studAngle(0), atRun: 0, load: 10, peak: 0 });
  const [, tick] = useState(0);
  const [msg, setMsg] = useState('Handle is OFF. Move it to stud 1 to start.');
  const [tripped, setTripped] = useState(false);
  const done = useRef(false);

  const release = (why) => {
    const s = st.current;
    s.handle = 0;
    setTripped(true);
    setMsg(why);
  };

  useRaf((dt) => {
    const s = st.current;
    const steps = 10;
    const h = dt / steps;
    for (let i = 0; i < steps; i++) {
      const R = STUD_R[s.handle];
      s.Ia = R === null ? 0 : Math.max(0, (V - KPHI * s.N) / (RA + R));
      const T = 9.55 * KPHI * s.Ia;
      const load = s.N > 1 ? s.load : Math.min(s.load, T);
      s.N = Math.max(0, s.N + ((T - load - 0.002 * s.N) / J) * h);
    }
    s.peak = Math.max(s.peak * (1 - dt * 0.8), s.Ia);
    if (s.Ia > TRIP && s.handle > 0) release(`Overload! ${s.Ia.toFixed(0)} A > ${TRIP} A, so the OLR shorted the NVC and the handle sprang back to OFF.`);
    // spring the handle toward its stud
    const target = studAngle(s.handle);
    s.ang += (target - s.ang) * Math.min(1, dt * (s.handle === 0 ? 7 : 14));
    s.atRun = s.handle === 6 ? s.atRun + dt : 0;
    if (!done.current && s.atRun > 1.2) {
      done.current = true;
      onSolved?.();
    }
    tick((n) => n + 1);
  });

  const s = st.current;
  const next = () => {
    if (s.handle >= 6) return;
    if (s.handle === 0) setTripped(false);
    s.handle += 1;
    setMsg(s.handle === 6 ? 'RUN: the NVC now holds the handle against its spring. All starting resistance is out.' : `Stud ${s.handle}: ${STUD_R[s.handle]} Ω of starting resistance in circuit. Wait for the current to fall…`);
  };
  const powerCut = () => {
    if (s.handle === 0) return;
    release('Supply failed. The NVC lost its magnetism, so the spring pulled the handle back to OFF. Safe to restart later.');
  };
  const overload = () => {
    s.load = 95;
    setTimeout(() => (st.current.load = 10), 2500);
  };
  const dol = () => {
    setMsg(`Direct-on-line at standstill: Ia = V / Ra = ${V} / ${RA} = ${V / RA} A, about 20× full-load current. That’s why we need a starter.`);
  };

  const [hx, hy] = at(ARM, s.ang);
  const studs = [0, 1, 2, 3, 4, 5, 6];
  const iFrac = Math.min(1, s.Ia / 60);
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 560 300" className="fig-svg">
        {/* resistance chain between studs */}
        {studs.slice(1, 6).map((k) => {
          const [x1, y1] = at(132, studAngle(k));
          const [x2, y2] = at(132, studAngle(k + 1));
          return <path key={k} d={zig(x1, y1, x2, y2)} fill="none" stroke="#c06a1f" strokeWidth="2" />;
        })}
        {studs.map((k) => {
          const [x, y] = at(ARM, studAngle(k));
          const [x2, y2] = at(132, studAngle(k));
          return (
            <g key={k}>
              {k > 0 && <line x1={x} y1={y} x2={x2} y2={y2} stroke="#5c5c5c" strokeWidth="2" />}
              <circle cx={x} cy={y} r="8" fill={k === s.handle ? C.green : '#fff'} stroke="#5c5c5c" strokeWidth="1.5" />
              <text x={at(96, studAngle(k))[0]} y={at(96, studAngle(k))[1] + 4} textAnchor="middle" fontSize="10" fill={C.muted}>
                {k === 0 ? 'OFF' : k === 6 ? 'RUN' : k}
              </text>
            </g>
          );
        })}
        {/* brass arc feeding the field */}
        <path d={`M${at(150, studAngle(1)).join(' ')} A150 150 0 0 1 ${at(150, studAngle(6)).join(' ')}`} fill="none" stroke="#c27c00" strokeWidth="4" opacity="0.6" />
        {/* NVC */}
        <g transform={`translate(${at(ARM, studAngle(6) + 16).join(' ')})`}>
          <rect x="-16" y="-12" width="32" height="24" rx="4" fill={s.handle === 6 ? '#dbe4ff' : '#f3f3f1'} stroke="#3b5bdb" strokeWidth="2" />
          <text y="4" textAnchor="middle" fontSize="10" fontWeight="800" fill="#2a3f9e">NVC</text>
        </g>
        {/* handle */}
        <line x1={PIV.x} y1={PIV.y} x2={hx} y2={hy} stroke="#5c5c5c" strokeWidth="8" strokeLinecap="round" />
        <circle cx={PIV.x} cy={PIV.y} r="10" fill="#777" />
        <path d={`M${PIV.x} ${PIV.y + 10} q 10 20 -6 30`} stroke="#5c5c5c" fill="none" strokeWidth="2" strokeDasharray="3 3" />
        <text x={PIV.x + 14} y={PIV.y + 34} fontSize="10" fill={C.muted}>spring</text>
        {/* supply, OLR */}
        <text x="20" y="282" fontSize="13" fontWeight="800" fill={C.north}>L+</text>
        <path d={`M44 278 H120 M150 278 H190 V${PIV.y + 10}`} stroke="#5c5c5c" strokeWidth="2" fill="none" />
        <rect x="120" y="268" width="30" height="20" rx="4" fill="#f3f3f1" stroke={s.peak > TRIP * 0.8 ? C.force : '#888'} strokeWidth="2" />
        <text x="135" y="282" textAnchor="middle" fontSize="10" fontWeight="800" fill={C.ink}>OLR</text>
        {/* armature + field */}
        <path d={`M${at(ARM, studAngle(6)).join(' ')} L400 60 H440 V120`} stroke="#5c5c5c" strokeWidth="2" fill="none" />
        <text x="404" y="52" fontSize="12" fontWeight="800" fill={C.ink}>A</text>
        <circle cx="440" cy="150" r="28" fill="#fff" stroke="#4a4a4a" strokeWidth="2.5" />
        <g transform={`rotate(${(s.N * 0.6) % 360} 440 150)`}>
          <line x1="420" y1="150" x2="460" y2="150" stroke={C.teal} strokeWidth="3" />
        </g>
        <text x="404" y="154" textAnchor="end" fontSize="11" fill={C.muted}>armature</text>
        <path d="M440 178 V278 H530" stroke="#5c5c5c" strokeWidth="2" fill="none" />
        <path d={`M${at(150, studAngle(1)).join(' ')} L310 30 H530 V110`} stroke="#c27c00" strokeWidth="2" fill="none" opacity="0.7" />
        <text x="314" y="24" fontSize="12" fontWeight="800" fill="#c27c00">F (via NVC)</text>
        <path d="M530 110 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 a6 6 0 0 1 0 12 V278" stroke="#c06a1f" strokeWidth="2.5" fill="none" />
        <text x="522" y="206" textAnchor="end" fontSize="11" fill="#c06a1f">shunt field</text>
        <text x="540" y="296" textAnchor="end" fontSize="13" fontWeight="800" fill={C.south}>L−</text>
        {/* current meter */}
        <g transform="translate(300 230)">
          <text fontSize="12" fill={C.ink} fontWeight="700">Armature current</text>
          <rect y="8" width="140" height="12" rx="6" fill="#ebebe8" />
          <rect y="8" width={iFrac * 140} height="12" rx="6" fill={s.Ia > TRIP ? '#e03131' : C.current} />
          <rect x={(TRIP / 60) * 140} y="4" width="2" height="20" fill="#e03131" />
          <text x="0" y="38" fontSize="12" fill={C.current} fontWeight="800">{s.Ia.toFixed(1)} A</text>
          <text x="140" y="38" textAnchor="end" fontSize="11" fill={C.muted}>{Math.round(s.N)} rpm</text>
        </g>
      </svg>
      <div className={`status ${tripped ? 'warn' : s.handle === 6 ? 'ok' : ''}`}>{msg}</div>
      <div className="controls center">
        <button className="chip primary" onClick={next} disabled={s.handle >= 6}>Move handle ▶</button>
        <button className="chip" onClick={powerCut}>⚡ Supply failure</button>
        <button className="chip" onClick={overload} disabled={s.handle !== 6}>🏋 Overload</button>
        <button className="chip" onClick={dol}>What if no starter?</button>
      </div>
    </div>
  );
}

function zig(x1, y1, x2, y2) {
  const n = 6;
  const dx = (x2 - x1) / n;
  const dy = (y2 - y1) / n;
  const len = Math.hypot(dx, dy);
  const px = (-dy / len) * 5;
  const py = (dx / len) * 5;
  let d = `M${x1} ${y1}`;
  for (let i = 1; i <= n; i++) {
    const s = i === n ? 0 : i % 2 ? 1 : -1;
    d += ` L${x1 + dx * i + px * s} ${y1 + dy * i + py * s}`;
  }
  return d;
}

/* ───────── Speed control of a shunt motor ───────── */

export function SpeedControl({ onSolved }) {
  const [method, setMethod] = useState('flux');
  const [flux, setFlux] = useState(100);
  const [Rx, setRx] = useState(0);
  const [Va, setVa] = useState(220);
  const [seen, setSeen] = useState(() => new Set(['flux']));
  const T = 38.2; // constant load torque, N·m (Ia = 20 A at full flux)
  const kphi = 0.2 * (method === 'flux' ? flux / 100 : 1);
  const R = RA + (method === 'res' ? Rx : 0);
  const Vs = method === 'volt' ? Va : 220;
  const Ia = T / (9.55 * kphi);
  const N = Math.max(0, (Vs - Ia * R) / kphi);
  const base = (220 - 20 * RA) / 0.2;
  const wasted = method === 'res' ? Ia * Ia * Rx : 0;
  const choose = (m) => {
    setMethod(m);
    const next = new Set(seen).add(m);
    setSeen(next);
    if (next.size >= 2) onSolved?.(); // comparing two methods is the point
  };

  const W = 300;
  const H = 150;
  const X = (t) => 40 + (t / 80) * W;
  const Y = (n) => 10 + H - (n / 2400) * H;
  const line = (k, r, v) => {
    const n0 = v / k;
    const n1 = (v - (80 / (9.55 * k)) * r) / k;
    return `${X(0)},${Y(Math.min(n0, 2400))} ${X(80)},${Y(Math.max(0, n1))}`;
  };
  return (
    <div className="fig-stack">
      <div className="controls center">
        <Toggle
          value={method}
          onChange={choose}
          options={[
            { value: 'flux', label: 'Flux (field) control' },
            { value: 'res', label: 'Armature resistance' },
            { value: 'volt', label: 'Armature voltage' },
          ]}
        />
      </div>
      <div className="lab">
        <svg viewBox="0 0 360 200" className="fig-svg">
          <text x="40" y="8" fontSize="11" fill={C.muted}>N (rpm)</text>
          <line x1="40" y1={10 + H} x2={40 + W} y2={10 + H} stroke="#666" />
          <line x1="40" y1="10" x2="40" y2={10 + H} stroke="#666" />
          {[0, 1000, 2000].map((n) => (
            <text key={n} x="34" y={Y(n) + 4} textAnchor="end" fontSize="10" fill={C.muted}>{n}</text>
          ))}
          <polyline points={line(0.2, RA, 220)} stroke="#666" strokeDasharray="5 4" strokeWidth="2" fill="none" />
          <polyline points={line(kphi, R, Vs)} stroke={C.teal} strokeWidth="3" fill="none" />
          <line x1={X(T)} y1="10" x2={X(T)} y2={10 + H} stroke={C.force} strokeDasharray="3 4" />
          <circle cx={X(T)} cy={Y(Math.min(N, 2400))} r="6" fill="#fff" stroke={C.teal} strokeWidth="3" />
          <text x={X(T) + 6} y={10 + H - 4} fontSize="10" fill={C.force}>load torque</text>
          <text x={40 + W} y={10 + H + 16} textAnchor="end" fontSize="11" fill={C.muted}>Torque (N·m) →</text>
          <text x={40 + W} y={Y(base) - 6} textAnchor="end" fontSize="10" fill="#71716c">base</text>
        </svg>
        <div className="lab-readouts">
          {method === 'flux' && <Slider label="Field flux (field rheostat)" value={flux} min={50} max={100} step={5} onChange={setFlux} unit="%" />}
          {method === 'res' && <Slider label="Extra armature resistance" value={Rx} min={0} max={5} step={0.25} onChange={setRx} unit="Ω" fmt={(v) => v.toFixed(2)} />}
          {method === 'volt' && <Slider label="Armature voltage (Ward-Leonard)" value={Va} min={40} max={220} step={10} onChange={setVa} unit="V" />}
          <div className="readout-col">
            <span>Speed <b>{Math.round(N)} rpm</b> <em className={N > base + 5 ? 'up' : N < base - 5 ? 'down' : ''}>{N > base + 5 ? 'above base' : N < base - 5 ? 'below base' : 'base speed'}</em></span>
            <span>Armature current <b>{Ia.toFixed(1)} A</b></span>
            {method === 'res' && <span>Wasted in resistor <b className={wasted > 50 ? 'warn' : ''}>{Math.round(wasted)} W</b></span>}
          </div>
          <div className="formula small">N ∝ (V − Ia·R) / φ</div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Power flow & efficiency ─────────
   Shunt motor: V = 220 V, Ish = 2 A, Ra = 0.5 Ω, rotational loss 400 W. */

const ROT = 400;
const ISH = 2;
export function PowerFlow({ onSolved, showEfficiency = true }) {
  const [Ia, setIa] = useState(20);
  const done = useRef(false);
  const calc = (I) => {
    const Eb = V - I * RA;
    const input = V * (I + ISH);
    const field = V * ISH;
    const cu = I * I * RA;
    const out = Eb * I - ROT;
    return { Eb, input, field, cu, out, eta: out / input };
  };
  const p = calc(Ia);
  const Wc = ROT + V * ISH;
  const best = Math.sqrt(Wc / RA);
  const set = (v) => {
    setIa(v);
    if (!done.current && Math.abs(v - best) < 2.5) {
      done.current = true;
      onSolved?.();
    }
  };
  const segs = [
    { k: 'Shunt field Cu loss', v: p.field, c: '#7048e8' },
    { k: 'Armature Cu loss Ia²Ra', v: p.cu, c: C.force },
    { k: 'Iron + mechanical', v: ROT, c: '#9a9ea6' },
    { k: 'Output (shaft)', v: Math.max(0, p.out), c: C.green },
  ];
  const curve = [];
  for (let i = 4; i <= 90; i += 2) curve.push([i, calc(i).eta]);
  const X = (i) => 30 + (i / 90) * 280;
  const Y = (e) => 10 + 100 - Math.max(0, e) * 100;
  return (
    <div className="fig-stack">
      <div className="flow-bar">
        {segs.map((s) => (
          <div key={s.k} style={{ flex: Math.max(s.v, 1), background: s.c }} title={s.k} />
        ))}
      </div>
      <div className="flow-legend">
        <span><b>Input V·IL</b> {Math.round(p.input)} W</span>
        {segs.map((s) => (
          <span key={s.k}><i style={{ background: s.c }} />{s.k}: <b>{Math.round(s.v)} W</b></span>
        ))}
      </div>
      {showEfficiency && (
        <div className="lab">
          <svg viewBox="0 0 330 140" className="fig-svg">
            <text x="30" y="8" fontSize="11" fill={C.muted}>Efficiency η</text>
            <line x1="30" y1="110" x2="310" y2="110" stroke="#666" />
            <line x1="30" y1="10" x2="30" y2="110" stroke="#666" />
            {[0.5, 1].map((e) => (
              <text key={e} x="26" y={Y(e) + 4} textAnchor="end" fontSize="10" fill={C.muted}>{e * 100}%</text>
            ))}
            <polyline points={curve.map(([i, e]) => `${X(i)},${Y(e)}`).join(' ')} fill="none" stroke={C.teal} strokeWidth="2.5" />
            <circle cx={X(Ia)} cy={Y(p.eta)} r="5" fill="#fff" stroke={C.teal} strokeWidth="3" />
            <text x="310" y="128" textAnchor="end" fontSize="11" fill={C.muted}>Armature current →</text>
          </svg>
          <div className="lab-readouts">
            <div className="readout-col">
              <span>η = <b className={Math.abs(Ia - best) < 2.5 ? 'ok' : ''}>{(p.eta * 100).toFixed(1)}%</b></span>
              <span>Variable loss Ia²Ra <b style={{ color: C.force }}>{Math.round(p.cu)} W</b></span>
              <span>Constant loss Wc <b>{Wc} W</b></span>
            </div>
            {Math.abs(Ia - best) < 2.5 && <div className="goal hit">Maximum efficiency: Ia²Ra = Wc</div>}
          </div>
        </div>
      )}
      <div className="controls">
        <Slider label="Load → armature current Ia" value={Ia} min={4} max={90} step={1} onChange={set} unit="A" />
      </div>
    </div>
  );
}

/* ───────── Generic "mark the point" graph input ───────── */

export function MarkGraph({ value, setValue, status, fn, xMax, yMax, xTicks, yTicks, snap, title, xLabel, answer, fmtX = (x) => x, fmtY = (y) => y }) {
  const svgRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const GX = 60;
  const GY = 30;
  const GW = 420;
  const GH = 200;
  const X = (x) => GX + (x / xMax) * GW;
  const Y = (y) => GY + GH - (y / yMax) * GH;
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const x = (i / 120) * xMax;
    pts.push(`${X(x).toFixed(1)},${Y(Math.max(0, fn(x))).toFixed(1)}`);
  }
  const ok = status === 'correct' || status === 'revealed';
  const x = status === 'revealed' ? answer : value?.x ?? xMax * 0.85;
  const move = (e) => {
    if (!drag || ok) return;
    const p = svgPoint(svgRef.current, e);
    const raw = Math.max(0, Math.min(xMax, ((p.x - GX) / GW) * xMax));
    setValue({ x: Math.round(raw / snap) * snap });
  };
  const y = Math.max(0, fn(x));
  return (
    <svg ref={svgRef} viewBox="0 0 520 290" className="fig-svg touch-none" onPointerMove={move} onPointerUp={() => setDrag(false)} onPointerLeave={() => setDrag(false)}>
      <text x={GX} y="18" fontSize="13" fontWeight="700" fill={C.ink}>{title}</text>
      {xTicks.map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={GY} x2={X(t)} y2={GY + GH} stroke={C.grid} />
          <text x={X(t)} y={GY + GH + 18} textAnchor="middle" fontSize="12" fill={C.ink}>{fmtX(t)}</text>
        </g>
      ))}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={GX} y1={Y(t)} x2={GX + GW} y2={Y(t)} stroke={C.grid} />
          <text x={GX - 8} y={Y(t) + 4} textAnchor="end" fontSize="12" fill={C.ink}>{fmtY(t)}</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke={ok ? C.green : C.teal} strokeWidth="2.5" />
      <text x={GX + GW} y={GY + GH + 40} textAnchor="end" fontSize="13" fontWeight="700" fill={C.ink}>{xLabel}</text>
      <g onPointerDown={(e) => { e.target.setPointerCapture?.(e.pointerId); setDrag(true); if (!value) setValue({ x }); }} style={{ cursor: ok ? 'default' : 'grab' }}>
        <circle cx={X(x)} cy={Y(y)} r="22" fill={ok ? 'rgba(31,157,85,.16)' : 'rgba(59,91,219,.10)'} />
        <circle cx={X(x)} cy={Y(y)} r="7" fill={ok ? C.green : status === 'wrong' ? '#e09a00' : '#3b5bdb'} />
      </g>
      {(value || ok) && (
        <text x={X(x)} y={Y(y) - 26} textAnchor="middle" fontSize="13" fontWeight="800" fill={ok ? C.green : C.ink}>
          ({fmtX(x)}, {fmtY(Math.round(y))})
        </text>
      )}
      {!value && !ok && <text x={X(x)} y={Y(y) + 42} textAnchor="middle" fontSize="12" fill={C.muted}>drag me</text>}
    </svg>
  );
}
