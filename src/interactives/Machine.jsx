import { useState } from 'react';
import { C, Slider, Toggle } from './common.jsx';

/* ───────── Construction: clickable cross-section of a 4-pole DC machine ───────── */

const PARTS = {
  yoke: {
    name: 'Yoke (frame)',
    made: 'Cast iron (small machines), cast or rolled steel (large machines)',
    job: 'Outer frame. Gives mechanical support to the poles, protects the machine, and carries the magnetic flux from one pole to the next.',
  },
  pole: {
    name: 'Pole core & pole shoe',
    made: 'Laminated steel stampings riveted together',
    job: 'The core carries the field winding. The wider shoe spreads the flux over the armature, reducing air-gap reluctance, and holds the field coils in place.',
  },
  field: {
    name: 'Field winding',
    made: 'Insulated copper wire wound on the pole cores',
    job: 'Carries DC (the exciting current) to magnetise the poles and produce the main flux φ. Coils are connected so the poles alternate N, S, N, S.',
  },
  gap: {
    name: 'Air gap',
    made: '1–5 mm of air between pole shoe and armature',
    job: 'Lets the armature rotate freely. It is kept as small as possible because air has very high reluctance.',
  },
  core: {
    name: 'Armature core',
    made: '0.35–0.5 mm laminated silicon-steel stampings, with slots on the outside',
    job: 'Houses the armature conductors and gives the flux a low-reluctance path. Laminations reduce eddy-current loss; silicon steel reduces hysteresis loss.',
  },
  winding: {
    name: 'Armature winding',
    made: 'Copper conductors placed in the slots (lap or wave connected)',
    job: 'Where the action happens: current here feels the force that makes torque, and the back EMF is induced here. ⊙ = current out of screen, ⊗ = into screen.',
  },
  comm: {
    name: 'Commutator',
    made: 'Hard-drawn copper segments insulated from each other by mica',
    job: 'Mounted on the shaft. In a motor it reverses the current in each coil as it passes from one pole to the next, so the torque stays in one direction.',
  },
  brush: {
    name: 'Brushes',
    made: 'Carbon or graphite, held by spring-loaded brush holders',
    job: 'Stationary contacts that feed current from the supply into the rotating commutator. Carbon is self-lubricating and wears instead of the commutator.',
  },
  shaft: {
    name: 'Shaft & bearings',
    made: 'Mild steel shaft; ball or roller bearings',
    job: 'Carries the armature core and commutator, and transmits the mechanical power to the load.',
  },
};

const CX = 220;
const CY = 210;
const polar = (r, tDeg) => {
  const t = (tDeg * Math.PI) / 180;
  return [r * Math.sin(t), -r * Math.cos(t)];
};
const arcPath = (r1, r2, a) => {
  const [x1, y1] = polar(r1, -a);
  const [x2, y2] = polar(r1, a);
  const [x3, y3] = polar(r2, a);
  const [x4, y4] = polar(r2, -a);
  return `M${x1} ${y1} A${r1} ${r1} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r2} ${r2} 0 0 0 ${x4} ${y4} Z`;
};

export function ConstructionExplorer({ onSolved }) {
  const [sel, setSel] = useState(null);
  const [seen, setSeen] = useState(() => new Set());
  const pick = (id) => {
    setSel(id);
    const next = new Set(seen).add(id);
    setSeen(next);
    if (next.size === Object.keys(PARTS).length) onSolved?.();
  };
  const dim = (id) => (sel && sel !== id ? 0.35 : 1);
  const ring = (id) => (sel === id ? { stroke: C.green, strokeWidth: 3 } : {});
  const part = (id) => ({ onClick: () => pick(id), style: { cursor: 'pointer' }, opacity: dim(id) });

  const slots = Array.from({ length: 20 }, (_, i) => (i * 360) / 20);
  const segs = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  const info = sel && PARTS[sel];
  return (
    <div className="explorer">
      <svg viewBox="0 0 440 420" className="fig-svg">
        <g transform={`translate(${CX} ${CY})`}>
          <g {...part('yoke')}>
            <path d="M0 -196 A196 196 0 1 1 -0.1 -196 Z M0 -172 A172 172 0 1 0 0.1 -172 Z" fillRule="evenodd" fill="#5b5f66" {...ring('yoke')} />
          </g>
          {[0, 90, 180, 270].map((rot, i) => (
            <g key={rot} transform={`rotate(${rot})`}>
              <g {...part('pole')}>
                <rect x="-20" y="-173" width="40" height="50" fill="#8a8f98" {...ring('pole')} />
                <path d={arcPath(124, 116, 32)} fill="#8a8f98" {...ring('pole')} />
              </g>
              <g {...part('field')}>
                <rect x="-36" y="-166" width="15" height="34" rx="3" fill="#d08a3c" {...ring('field')} />
                <rect x="21" y="-166" width="15" height="34" rx="3" fill="#d08a3c" {...ring('field')} />
              </g>
              <text x="0" y="-140" textAnchor="middle" fontSize="15" fontWeight="800" fill={i % 2 ? C.south : C.north} pointerEvents="none" transform={`rotate(${-rot} 0 -140)`}>
                {i % 2 ? 'S' : 'N'}
              </text>
            </g>
          ))}
          <g {...part('gap')}>
            <circle r="112" fill="none" stroke={sel === 'gap' ? C.green : '#2c2c2c'} strokeWidth="7" />
          </g>
          <g {...part('core')}>
            <circle r="108" fill="#4a4e55" {...ring('core')} />
            {slots.map((a) => (
              <rect key={a} x="-5" y="-108" width="10" height="16" fill="#202226" transform={`rotate(${a})`} />
            ))}
            <circle r="56" fill="#3f4248" />
          </g>
          <g {...part('winding')}>
            {slots.map((a) => {
              const [x, y] = polar(99, a);
              const underN = (a + 45) % 180 < 90; // top & bottom (N) quadrants
              return (
                <g key={a}>
                  <circle cx={x} cy={y} r="5" fill="#2b2b2b" stroke={sel === 'winding' ? C.green : '#e0a43a'} strokeWidth="2" />
                  {underN ? <circle cx={x} cy={y} r="1.6" fill="#e0a43a" /> : <path d={`M${x - 2.5} ${y - 2.5} L${x + 2.5} ${y + 2.5} M${x + 2.5} ${y - 2.5} L${x - 2.5} ${y + 2.5}`} stroke="#e0a43a" strokeWidth="1.4" />}
                </g>
              );
            })}
          </g>
          <g {...part('comm')}>
            <circle r="40" fill="#c98a36" {...ring('comm')} />
            {segs.map((a) => (
              <line key={a} x1="0" y1="-40" x2="0" y2="-20" stroke="#1d1d1d" strokeWidth="2" transform={`rotate(${a + 15})`} />
            ))}
          </g>
          <g {...part('brush')}>
            <rect x="-62" y="-9" width="22" height="18" rx="2" fill="#2e2e2e" stroke={sel === 'brush' ? C.green : '#777'} strokeWidth="2" />
            <rect x="40" y="-9" width="22" height="18" rx="2" fill="#2e2e2e" stroke={sel === 'brush' ? C.green : '#777'} strokeWidth="2" />
          </g>
          <g {...part('shaft')}>
            <circle r="16" fill="#b9bcc2" {...ring('shaft')} />
          </g>
        </g>
      </svg>
      <div className="explorer-side">
        {info ? (
          <div className="part-card" key={sel}>
            <h3>{info.name}</h3>
            <div className="part-row"><span>Made of</span>{info.made}</div>
            <div className="part-row"><span>Job</span>{info.job}</div>
          </div>
        ) : (
          <div className="part-card empty">Tap any part of the machine to learn what it is, what it’s made of and what it does.</div>
        )}
        <div className="part-list">
          {Object.entries(PARTS).map(([id, p]) => (
            <button key={id} className={`part-chip ${sel === id ? 'on' : ''} ${seen.has(id) ? 'seen' : ''}`} onClick={() => pick(id)}>
              {seen.has(id) ? '✓ ' : ''}
              {p.name.split(' (')[0]}
            </button>
          ))}
        </div>
        <span className="hint">{seen.size}/{Object.keys(PARTS).length} parts explored</span>
      </div>
    </div>
  );
}

/* ───────── Lap vs wave: number of parallel paths ───────── */

export function LapWave() {
  const [P, setP] = useState(4);
  const [type, setType] = useState('lap');
  const Ia = 120;
  const Z = 480;
  const A = type === 'lap' ? P : 2;
  const lanes = Array.from({ length: A });
  const h = 210;
  const laneH = Math.min(34, (h - 20) / A);
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 520 240" className="fig-svg">
        <rect x="20" y="15" width="16" height={h} rx="4" fill={C.north} />
        <rect x="484" y="15" width="16" height={h} rx="4" fill={C.south} />
        <text x="28" y={h + 34} textAnchor="middle" fontSize="12" fill={C.ink}>+ brush</text>
        <text x="492" y={h + 34} textAnchor="middle" fontSize="12" fill={C.ink}>− brush</text>
        {lanes.map((_, i) => {
          const y = 15 + (h - A * laneH) / 2 + i * laneH + laneH / 2;
          return (
            <g key={i}>
              <path d={`M36 ${y} H484`} stroke="#d08a3c" strokeWidth={Math.max(2, laneH / 6)} strokeDasharray="10 6" className="flow-ccw" />
              <text x="260" y={y - 4} textAnchor="middle" fontSize="11" fill={C.ink}>
                path {i + 1}: {Z / A} conductors · {(Ia / A).toFixed(0)} A
              </text>
            </g>
          );
        })}
      </svg>
      <div className="formula">
        {type === 'lap' ? 'Lap winding: A = P' : 'Wave winding: A = 2 (always)'} → A = <b>{A}</b> parallel paths · current per conductor ={' '}
        <b>Ia / A = {(Ia / A).toFixed(0)} A</b>
      </div>
      <div className="controls center">
        <Toggle value={type} onChange={setType} options={[{ value: 'lap', label: 'Lap' }, { value: 'wave', label: 'Wave' }]} />
        <Toggle value={P} onChange={setP} options={[2, 4, 6, 8].map((p) => ({ value: p, label: `${p} poles` }))} />
      </div>
    </div>
  );
}

/* ───────── EMF equation calculator ───────── */

export function EmfCalculator() {
  const [P, setP] = useState(4);
  const [phi, setPhi] = useState(25);
  const [Z, setZ] = useState(720);
  const [N, setN] = useState(1000);
  const [type, setType] = useState('lap');
  const A = type === 'lap' ? P : 2;
  const E = (P * (phi / 1000) * Z * N) / (60 * A);
  return (
    <div className="fig-stack">
      <div className="big-eq">
        <span className="math">E<sub>b</sub> = PφZN / 60A</span>
        <span className="big-eq-sub">
          = {P} × {(phi / 1000).toFixed(3)} × {Z} × {N} / (60 × {A}) = <b>{E.toFixed(1)} V</b>
        </span>
      </div>
      <div className="controls grid2">
        <Slider label="Poles P" value={P} min={2} max={8} step={2} onChange={setP} unit="" />
        <Slider label="Flux per pole φ" value={phi} min={5} max={50} step={1} onChange={setPhi} unit="mWb" />
        <Slider label="Conductors Z" value={Z} min={100} max={1200} step={20} onChange={setZ} unit="" />
        <Slider label="Speed N" value={N} min={100} max={1500} step={50} onChange={setN} unit="rpm" />
      </div>
      <div className="controls center">
        <Toggle value={type} onChange={setType} options={[{ value: 'lap', label: 'Lap (A = P)' }, { value: 'wave', label: 'Wave (A = 2)' }]} />
      </div>
    </div>
  );
}
