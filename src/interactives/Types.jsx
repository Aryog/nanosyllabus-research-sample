import { useState } from 'react';
import { C, Slider, Toggle } from './common.jsx';

/* ───────── Circuit symbols ───────── */

function Coil({ x1, y1, x2, y2, label, color = '#d08a3c' }) {
  const vertical = x1 === x2;
  const len = vertical ? y2 - y1 : x2 - x1;
  const n = 5;
  const r = len / (2 * n);
  let d = `M${x1} ${y1}`;
  for (let i = 0; i < n; i++) d += vertical ? ` a${r} ${r} 0 0 1 0 ${2 * r}` : ` a${r} ${r} 0 0 1 ${2 * r} 0`;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="3" />
      {label && (
        <text x={vertical ? x1 + r + 10 : (x1 + x2) / 2} y={vertical ? (y1 + y2) / 2 + 4 : y1 - r - 8} textAnchor={vertical ? 'start' : 'middle'} fontSize="12" fontWeight="700" fill={color}>
          {label}
        </text>
      )}
    </g>
  );
}

function Armature({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="24" fill="#222" stroke="#ccc" strokeWidth="2.5" />
      <rect x={x - 7} y={y - 30} width="14" height="7" fill="#777" />
      <rect x={x - 7} y={y + 23} width="14" height="7" fill="#777" />
      <text x={x} y={y + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">M</text>
      <text x={x + 32} y={y + 4} fontSize="12" fill={C.muted}>Ra</text>
    </g>
  );
}

function Battery({ x, y1, y2, label = 'V' }) {
  const m = (y1 + y2) / 2;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={m - 8} stroke="#999" strokeWidth="2.5" />
      <line x1={x - 16} y1={m - 8} x2={x + 16} y2={m - 8} stroke="#ddd" strokeWidth="3" />
      <line x1={x - 9} y1={m + 4} x2={x + 9} y2={m + 4} stroke="#ddd" strokeWidth="5" />
      <line x1={x} y1={m + 4} x2={x} y2={y2} stroke="#999" strokeWidth="2.5" />
      <text x={x - 24} y={m} textAnchor="end" fontSize="14" fontWeight="800" fill={C.ink}>{label}</text>
      <text x={x + 20} y={m - 12} fontSize="12" fill={C.north}>+</text>
    </g>
  );
}

const Wire = ({ d }) => (
  <g>
    <path d={d} fill="none" stroke="#777" strokeWidth="2.5" />
    <path d={d} fill="none" stroke={C.current} strokeWidth="2" strokeDasharray="4 12" className="flow-cw" opacity="0.9" />
  </g>
);
const Tag = ({ x, y, children, color = C.current }) => (
  <text x={x} y={y} fontSize="12.5" fontWeight="800" fill={color}>{children}</text>
);

const TOP = 40;
const BOT = 220;

const TYPES = {
  separate: {
    label: 'Separately excited',
    draw: () => (
      <>
        <Battery x={60} y1={TOP} y2={BOT} />
        <Wire d={`M60 ${TOP} H250 V100 M250 160 V${BOT} H60`} />
        <Armature x={250} y={130} />
        <Tag x={120} y={TOP - 8}>IL = Ia</Tag>
        <Battery x={470} y1={70} y2={190} label="Vf" />
        <Wire d={`M470 70 H380 V80 M380 180 V190 H470`} />
        <Coil x1={380} y1={80} x2={380} y2={180} label="field" />
        <Tag x={395} y={62}>If</Tag>
      </>
    ),
    eqs: ['Field is fed from a separate DC source', 'Ia = IL', 'Eb = V − Ia·Ra'],
    use: 'Wide speed control (Ward-Leonard drives), lab machines.',
  },
  shunt: {
    label: 'Shunt',
    draw: () => (
      <>
        <Battery x={60} y1={TOP} y2={BOT} />
        <Wire d={`M60 ${TOP} H420 M300 ${TOP} V100 M300 160 V${BOT} M420 ${TOP} V70 M420 190 V${BOT} M420 ${BOT} H60`} />
        <Armature x={300} y={130} />
        <Coil x1={420} y1={70} x2={420} y2={190} label="Rsh" />
        <Tag x={110} y={TOP - 8}>IL</Tag>
        <Tag x={310} y={92}>Ia</Tag>
        <Tag x={430} y={62}>Ish</Tag>
      </>
    ),
    eqs: ['Field in parallel with armature', 'IL = Ia + Ish,  Ish = V / Rsh', 'Eb = V − Ia·Ra'],
    use: 'Nearly constant speed: lathes, fans, blowers, conveyors, machine tools.',
  },
  series: {
    label: 'Series',
    draw: () => (
      <>
        <Battery x={60} y1={TOP} y2={BOT} />
        <Wire d={`M60 ${TOP} H150 M250 ${TOP} H330 V100 M330 160 V${BOT} H60`} />
        <Coil x1={150} y1={TOP} x2={250} y2={TOP} label="Rse" />
        <Armature x={330} y={130} />
        <Tag x={90} y={TOP + 22}>IL = Ise = Ia</Tag>
      </>
    ),
    eqs: ['Field in series with armature', 'IL = Ise = Ia', 'Eb = V − Ia(Ra + Rse)'],
    use: 'Very high starting torque: electric traction, cranes, hoists, trolleys.',
  },
  long: {
    label: 'Long-shunt compound',
    draw: () => (
      <>
        <Battery x={60} y1={TOP} y2={BOT} />
        <Wire d={`M60 ${TOP} H200 M300 ${TOP} H360 V100 M360 160 V${BOT} H60 M140 ${TOP} V70 M140 190 V${BOT}`} />
        <Coil x1={140} y1={70} x2={140} y2={190} label="Rsh" />
        <Coil x1={200} y1={TOP} x2={300} y2={TOP} label="Rse" />
        <Armature x={360} y={130} />
        <Tag x={82} y={TOP - 8}>IL</Tag>
        <Tag x={370} y={92}>Ia = Ise</Tag>
        <Tag x={150} y={62}>Ish</Tag>
      </>
    ),
    eqs: ['Shunt field across (series field + armature)', 'IL = Ia + Ish,  Ise = Ia', 'Eb = V − Ia(Ra + Rse)'],
    use: 'Cumulative compound: presses, shears, rolling mills, elevators.',
  },
  short: {
    label: 'Short-shunt compound',
    draw: () => (
      <>
        <Battery x={60} y1={TOP} y2={BOT} />
        <Wire d={`M60 ${TOP} H100 M200 ${TOP} H440 M320 ${TOP} V100 M320 160 V${BOT} M440 ${TOP} V70 M440 190 V${BOT} M440 ${BOT} H60`} />
        <Coil x1={100} y1={TOP} x2={200} y2={TOP} label="Rse" />
        <Armature x={320} y={130} />
        <Coil x1={440} y1={70} x2={440} y2={190} label="Rsh" />
        <Tag x={80} y={TOP + 22}>IL = Ise</Tag>
        <Tag x={330} y={92}>Ia</Tag>
        <Tag x={450} y={62}>Ish</Tag>
      </>
    ),
    eqs: ['Shunt field across the armature only', 'IL = Ise = Ia + Ish', 'Eb = V − Ia·Ra − IL·Rse'],
    use: 'Same uses as long-shunt; the difference is only where the shunt is tapped.',
  },
};

export function MotorTypes({ onSolved, only }) {
  const keys = only ?? Object.keys(TYPES);
  const [t, setT] = useState(keys[0]);
  const [seen, setSeen] = useState(() => new Set([keys[0]]));
  const choose = (k) => {
    setT(k);
    const next = new Set(seen).add(k);
    setSeen(next);
    if (next.size === keys.length) onSolved?.();
  };
  const type = TYPES[t];
  return (
    <div className="fig-stack">
      <div className="controls center">
        <Toggle value={t} onChange={choose} options={keys.map((k) => ({ value: k, label: `${seen.has(k) ? '✓ ' : ''}${TYPES[k].label}` }))} />
      </div>
      <svg viewBox="0 0 520 250" className="fig-svg" key={t}>
        {type.draw()}
      </svg>
      <div className="eq-card">
        {type.eqs.map((e, i) => (
          <div key={i} className={i === 0 ? 'muted' : 'math-line'}>{e}</div>
        ))}
        <div className="eq-use"><b>Used for:</b> {type.use}</div>
      </div>
    </div>
  );
}

/* ───────── Characteristics: N–Ia, T–Ia, N–T ───────── */

const V = 220;
const MODELS = {
  shunt: { label: 'Shunt', R: 0.5, kphi: () => 0.2 },
  series: { label: 'Series', R: 0.6, kphi: (I) => (0.02 * I) / (1 + I / 40) },
  compound: { label: 'Cumulative compound', R: 0.55, kphi: (I) => 0.17 + (0.006 * I) / (1 + I / 40) },
};
const operating = (m, I) => {
  const k = m.kphi(I);
  return { I, N: (V - I * m.R) / k, T: 9.55 * k * I };
};

function MiniGraph({ title, xLabel, yLabel, pts, dot, xMax, yMax, color }) {
  const W = 150;
  const H = 120;
  const X = (v) => 30 + (Math.min(v, xMax) / xMax) * W;
  const Y = (v) => 14 + H - (Math.min(v, yMax) / yMax) * H;
  const poly = pts.filter((p) => p[1] <= yMax * 1.02).map((p) => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
  return (
    <svg viewBox="0 0 200 180" className="mini-graph">
      <text x="100" y="10" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.ink}>{title}</text>
      <line x1="30" y1={14 + H} x2={30 + W} y2={14 + H} stroke="#666" />
      <line x1="30" y1="14" x2="30" y2={14 + H} stroke="#666" />
      <polyline points={poly} fill="none" stroke={color} strokeWidth="2.5" />
      {dot && dot[1] <= yMax && <circle cx={X(dot[0])} cy={Y(dot[1])} r="5" fill="#fff" stroke={color} strokeWidth="3" />}
      <text x={30 + W} y={14 + H + 16} textAnchor="end" fontSize="11" fill={C.muted}>{xLabel} →</text>
      <text x="24" y="22" textAnchor="end" fontSize="11" fill={C.muted} transform="rotate(-90 24 22)">{yLabel} →</text>
    </svg>
  );
}

export function Characteristics({ onSolved, start = 'shunt', only }) {
  const [type, setType] = useState(only ?? start);
  const [I, setI] = useState(30);
  const [seen, setSeen] = useState(() => new Set([start]));
  const m = MODELS[type];
  const curve = [];
  for (let i = 3; i <= 60; i += 1) curve.push(operating(m, i));
  const op = operating(m, I);
  const choose = (k) => {
    setType(k);
    const next = new Set(seen).add(k);
    setSeen(next);
    if (next.size === 3) onSolved?.();
  };
  const color = type === 'shunt' ? C.teal : type === 'series' ? C.force : '#b99bff';
  return (
    <div className="fig-stack">
      {!only && (
        <div className="controls center">
          <Toggle value={type} onChange={choose} options={Object.entries(MODELS).map(([k, v]) => ({ value: k, label: `${seen.has(k) ? '✓ ' : ''}${v.label}` }))} />
        </div>
      )}
      <div className="graph-row">
        <MiniGraph title="Speed vs armature current" xLabel="Ia" yLabel="N" pts={curve.map((p) => [p.I, p.N])} dot={[op.I, op.N]} xMax={60} yMax={3000} color={color} />
        <MiniGraph title="Torque vs armature current" xLabel="Ia" yLabel="T" pts={curve.map((p) => [p.I, p.T])} dot={[op.I, op.T]} xMax={60} yMax={300} color={color} />
        <MiniGraph title="Speed vs torque" xLabel="T" yLabel="N" pts={curve.map((p) => [p.T, p.N])} dot={[op.T, op.N]} xMax={300} yMax={3000} color={color} />
      </div>
      <div className="readout-row">
        <span>Ia <b>{I} A</b></span>
        <span>N <b className={op.N > 2900 ? 'warn' : ''}>{op.N > 2900 ? '> 3000 (danger!)' : `${Math.round(op.N)} rpm`}</b></span>
        <span>T <b>{Math.round(op.T)} N·m</b></span>
      </div>
      <div className="controls">
        <Slider label="Load → armature current" value={I} min={3} max={60} step={1} onChange={setI} unit="A" />
      </div>
    </div>
  );
}
