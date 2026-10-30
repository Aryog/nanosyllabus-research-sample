import { C } from '../video/kit.jsx';

/*
  Textbook figures for Unit 4 (skill rules 35, 46): thin single-ink outlines,
  italic symbols, labels on leader lines, a numbered caption under each figure,
  no colour fills, doodles or emoji. Every figure is built in parts that come in
  beat by beat (`s.on(k)`), and the part being explained is ringed (`s.hl(k)`).
  The palette ink C.chalk is repainted by each look (black on the white page,
  white on the blue board), so these read as printed diagrams in either theme.
  Labels are sized for the widest look font (rule 39).
*/

const INK = { stroke: C.chalk, strokeWidth: 1.3, fill: 'none' };
const T = ({ x, y, children, a = 'middle', size = 10.5, i = false, b = false }) => (
  // Size inline: the player's `.scene-svg text` rule would otherwise set every
  // label to one size and stack them on top of each other.
  <text x={x} y={y} textAnchor={a} style={{ fontSize: size }} fontStyle={i ? 'italic' : 'normal'} fontWeight={b ? 700 : 400} fill={C.chalk}>
    {children}
  </text>
);
const Cap = ({ x = 180, y, children }) => <T x={x} y={y} i size={10.5}>{children}</T>;
const W = ({ d, w = 1.3, dash }) => <path d={d} {...INK} strokeWidth={w} strokeDasharray={dash} />;
const head = (x, y, dir, s = 7) => {
  const h = s / 2;
  const d = { down: `${x - h},${y - s} ${x + h},${y - s} ${x},${y}`, up: `${x - h},${y + s} ${x + h},${y + s} ${x},${y}`, right: `${x - s},${y - h} ${x - s},${y + h} ${x},${y}`, left: `${x + s},${y - h} ${x + s},${y + h} ${x},${y}` }[dir];
  return <polygon points={d} fill={C.chalk} />;
};
const cond = (x, y, dir, r = 7) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
    {dir === 'in' ? <W d={`M${x - r * 0.64} ${y - r * 0.64} L${x + r * 0.64} ${y + r * 0.64} M${x + r * 0.64} ${y - r * 0.64} L${x - r * 0.64} ${y + r * 0.64}`} w={1.2} /> : <circle cx={x} cy={y} r={1.8} fill={C.chalk} />}
  </g>
);
// Zigzag resistor, horizontal (x1 → x2 at y) or vertical (y1 → y2 at x).
const zig = (n, len) => Array.from({ length: n }, (_, i) => [(len * (i + 0.5)) / n, i % 2 ? -5 : 5]);
const ResH = ({ x1, x2, y, label, ly = -9, vary }) => (
  <g>
    <path d={`M${x1} ${y} ${zig(6, x2 - x1).map(([dx, dy]) => `L${x1 + dx} ${y + dy}`).join(' ')} L${x2} ${y}`} {...INK} />
    {vary && <><W d={`M${x1 + 2} ${y + 11} L${x2 - 4} ${y - 11}`} w={1} />{head(x2 - 3, y - 12, 'up', 5)}</>}
    {label && <T x={(x1 + x2) / 2} y={y + ly} i>{label}</T>}
  </g>
);
const ResV = ({ x, y1, y2, label, lx = 9, vary, a = 'start' }) => (
  <g>
    <path d={`M${x} ${y1} ${zig(6, y2 - y1).map(([dy, dx]) => `L${x + dx} ${y1 + dy}`).join(' ')} L${x} ${y2}`} {...INK} />
    {vary && <><W d={`M${x - 11} ${y2 - 3} L${x + 9} ${y1 + 5}`} w={1} />{head(x + 10, y1 + 4, 'up', 5)}</>}
    {label && <T x={x + lx} y={(y1 + y2) / 2 + 4} a={a} i>{label}</T>}
  </g>
);
// Field winding: a row of loops (horizontal) or a column (vertical).
const CoilH = ({ x1, x2, y, label, ly = -10 }) => {
  const n = 4;
  const w = (x2 - x1) / n;
  return (
    <g>
      <path d={`M${x1} ${y} ${Array.from({ length: n }, (_, i) => `A${w / 2} ${w / 2} 0 0 1 ${x1 + w * (i + 1)} ${y}`).join(' ')}`} {...INK} />
      {label && <T x={(x1 + x2) / 2} y={y + ly} i>{label}</T>}
    </g>
  );
};
const CoilV = ({ x, y1, y2, label, lx = 10, a = 'start' }) => {
  const n = 4;
  const h = (y2 - y1) / n;
  return (
    <g>
      <path d={`M${x} ${y1} ${Array.from({ length: n }, (_, i) => `A${h / 2} ${h / 2} 0 0 1 ${x} ${y1 + h * (i + 1)}`).join(' ')}`} {...INK} />
      {label && <T x={x + lx} y={(y1 + y2) / 2 + 4} a={a} i>{label}</T>}
    </g>
  );
};
// Armature: a circle with two brushes, on a vertical branch at x.
const Arm = ({ x, y, r = 13, label = 'A' }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={C.board} stroke={C.chalk} strokeWidth={1.5} />
    <rect x={x - 4} y={y - r - 4} width={8} height={4} {...INK} />
    <rect x={x - 4} y={y + r} width={8} height={4} {...INK} />
    <T x={x} y={y + 4} i>{label}</T>
  </g>
);
const Term = ({ x, y, sign, label, a = 'end' }) => (
  <g>
    <circle cx={x} cy={y} r={2.6} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
    {sign && <T x={x + (a === 'end' ? -6 : 6)} y={y + 4} a={a}>{sign}</T>}
    {label && <T x={x + (a === 'end' ? -16 : 16)} y={y + 4} a={a} i>{label}</T>}
  </g>
);
const Meter = ({ x, y, l }) => (
  <g>
    <circle cx={x} cy={y} r={9} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
    <T x={x} y={y + 4} b size={10}>{l}</T>
  </g>
);
const Cur = ({ x, y, dir = 'right', label, lx = 0, ly = -6 }) => (
  <g>
    {head(x, y, dir, 6)}
    {label && <T x={x + lx} y={y + ly} i size={10}>{label}</T>}
  </g>
);

/* ── 4.1: a conductor in a field (Fig. 1) ─────────────────────────────── */
// 0 poles + field · 1 conductor carrying current · 2 force · 3 F = BIl + rule
export const forceFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <W d="M20 50 H80 V170 H20 Z" />
      <W d="M280 50 H340 V170 H280 Z" />
      <T x={50} y={115} b size={16}>N</T>
      <T x={310} y={115} b size={16}>S</T>
      {[75, 110, 145].map((y) => (
        <g key={y}>
          <W d={`M80 ${y} H280`} w={0.9} dash="4 3" />
          {head(128, y, 'right')}
        </g>
      ))}
      <T x={128} y={66} i>B</T>
      <Cap y={206}>Fig. 1  Conductor in a magnetic field</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      {cond(200, 110, 'in', 10)}
      <W d="M212 98 L236 82" w={0.8} />
      <T x={240} y={80} a="start" size={10}>I (into the page)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M200 124 V170" w={1.6} />
      {head(200, 176, 'down')}
      <T x={210} y={168} a="start" i>F</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={180} y={30} i size={12}>F = B I l  newton</T>
    </g>
  </>
);

/* ── 4.2: methods of excitation (Fig. 2) ──────────────────────────────── */
// One panel per type: 0 separately excited · 1 shunt · 2 series · 3 compound.
const panel = (ox, oy, kind, cap) => {
  const top = oy + 18;
  const bot = oy + 92;
  const ax = ox + 140;
  const shunt = kind === 'shunt' || kind === 'compound';
  const series = kind === 'series' || kind === 'compound';
  return (
    <g>
      <Term x={ox + 16} y={top} sign="+" />
      <Term x={ox + 16} y={bot} sign="−" />
      <T x={ox + 6} y={(top + bot) / 2 + 4} a="end" i>V</T>
      {series ? (
        <>
          <W d={`M${ox + 19} ${top} H${ox + 96}`} />
          <CoilH x1={ox + 96} x2={ox + 124} y={top} label="Rse" ly={-8} />
          <W d={`M${ox + 124} ${top} H${ax}`} />
        </>
      ) : (
        <W d={`M${ox + 19} ${top} H${ax}`} />
      )}
      <W d={`M${ax} ${top} V${(top + bot) / 2 - 17} M${ax} ${(top + bot) / 2 + 17} V${bot} M${ax} ${bot} H${ox + 19}`} />
      <Arm x={ax} y={(top + bot) / 2} />
      {shunt && (
        <>
          <W d={`M${ox + 70} ${top} V${top + 14} M${ox + 70} ${bot - 14} V${bot}`} />
          <CoilV x={ox + 70} y1={top + 14} y2={bot - 14} label="Rsh" lx={-8} a="end" />
        </>
      )}
      {kind === 'separate' && (
        <>
          <W d={`M${ox + 62} ${top + 28} H${ox + 76} M${ox + 62} ${bot - 12} H${ox + 76}`} />
          <CoilV x={ox + 76} y1={top + 28} y2={bot - 12} />
          <Term x={ox + 60} y={top + 28} />
          <Term x={ox + 60} y={bot - 12} />
          <T x={ox + 52} y={(top + bot) / 2 + 12} a="end" i>Vf</T>
        </>
      )}
      <Cur x={ox + 40} y={top} label="IL" ly={-6} />
      <Cur x={ax} y={top + 12} dir="down" label="Ia" lx={14} ly={4} />
      <Cap x={ox + 80} y={oy + 112}>{cap}</Cap>
    </g>
  );
};
export const typesFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>{panel(20, 0, 'separate', '(a) Separately excited')}</g>
    <g className={s.on(1) + s.hl(1)}>{panel(190, 0, 'shunt', '(b) Shunt')}</g>
    <g className={s.on(2) + s.hl(2)}>{panel(20, 124, 'series', '(c) Series')}</g>
    <g className={s.on(3) + s.hl(3)}>{panel(190, 124, 'compound', '(d) Compound (long shunt)')}</g>
    <Cap y={262}>Fig. 2  Methods of excitation</Cap>
  </>
);

/* ── 4.2: performance characteristics (Fig. 3) ────────────────────────── */
// 0 axes · 1 shunt Ta–Ia · 2 series Ta–Ia · 3 shunt N–Ia · 4 series N–Ia ·
// 5 shunt N–Ta · 6 the no-load danger mark on the series curve · 7 series N–Ta.
const axes = (ox, oy, w, h, xl, yl) => (
  <g>
    <W d={`M${ox} ${oy} V${oy + h} H${ox + w}`} />
    {head(ox, oy - 2, 'up', 6)}
    {head(ox + w + 2, oy + h, 'right', 6)}
    <T x={ox + w} y={oy + h + 14} a="end" i size={10}>{xl}</T>
    <T x={ox + 4} y={oy - 4} a="start" i size={10}>{yl}</T>
    <T x={ox - 5} y={oy + h + 11} size={9}>O</T>
  </g>
);
const hyp = (ox, oy, w, h, k = 0.16) => Array.from({ length: 18 }, (_, i) => {
  const x = 0.14 + (0.86 * i) / 17;
  return `${i ? 'L' : 'M'}${(ox + x * w).toFixed(1)} ${(oy + h - Math.min(0.95, k / x) * h).toFixed(1)}`;
}).join(' ');
export const curvesFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {axes(22, 24, 88, 96, 'Ia', 'Ta')}
      {axes(142, 24, 88, 96, 'Ia', 'N')}
      {axes(262, 24, 88, 96, 'Ta', 'N')}
      <T x={66} y={152} size={10}>(i) Ta – Ia</T>
      <T x={186} y={152} size={10}>(ii) N – Ia</T>
      <T x={306} y={152} size={10}>(iii) N – Ta</T>
      <Cap y={174}>Fig. 3  Shunt (solid) and series (dashed)</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M22 120 L104 44" w={1.6} />
      <T x={92} y={66} a="start" size={9.5}>shunt</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M22 120 Q58 118 76 82 L96 34" w={1.6} dash="5 3" />
      <T x={70} y={40} a="end" size={9.5}>series</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M142 50 L226 60" w={1.6} />
      <T x={226} y={52} a="end" size={9.5}>shunt</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <path d={hyp(142, 24, 88, 96)} {...INK} strokeWidth={1.6} strokeDasharray="5 3" />
      <T x={226} y={112} a="end" size={9.5}>series</T>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <W d="M262 52 L346 64" w={1.6} />
    </g>
    <g className={s.on(7) + s.hl(7)}>
      <path d={hyp(262, 24, 88, 96, 0.2)} {...INK} strokeWidth={1.6} strokeDasharray="5 3" />
    </g>
    <g className={s.on(6) + s.hl(6)}>
      <circle cx={162} cy={30} r={7} {...INK} strokeWidth={1} strokeDasharray="2 2" />
      <W d="M156 26 L138 12" w={0.8} />
      <T x={136} y={12} a="end" size={9.5}>no load: N very high</T>
    </g>
  </>
);

/* ── 4.3: classification of losses (Fig. 4) ───────────────────────────── */
// 0 total + three groups · 1 copper · 2 iron · 3 mechanical · 4 constant/variable
const box = (x, y, w, h, label, sub) => (
  <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} {...INK} />
    <T x={x} y={y + (sub ? -1 : 4)} size={10.5}>{label}</T>
    {sub && <T x={x} y={y + 12} size={9} i>{sub}</T>}
  </g>
);
export const lossFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {box(180, 20, 110, 22, 'Total losses')}
      <W d="M180 31 V44 M62 44 H298 M62 44 V54 M180 44 V54 M298 44 V54" />
      {box(62, 68, 104, 28, 'Copper losses', 'variable')}
      {box(180, 68, 104, 28, 'Iron (core) losses', 'constant')}
      {box(298, 68, 104, 28, 'Mechanical losses', 'constant')}
      <Cap y={222}>Fig. 4  Losses in a DC motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M62 82 V96" />
      <T x={62} y={108} size={9.5}>Armature: Ia²Ra</T>
      <T x={62} y={122} size={9.5}>Series field: Ia²Rse</T>
      <T x={62} y={136} size={9.5}>Shunt field: Ish²Rsh</T>
      <T x={62} y={150} size={9.5}>Brush contact</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M180 82 V96" />
      <T x={180} y={108} size={9.5}>Hysteresis</T>
      <T x={180} y={122} size={9.5}>Eddy current</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M298 82 V96" />
      <T x={298} y={108} size={9.5}>Bearing friction</T>
      <T x={298} y={122} size={9.5}>Brush friction</T>
      <T x={298} y={136} size={9.5}>Windage</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M14 164 V172 H110 V164" w={1} />
      <T x={62} y={188} size={10}>Variable losses ∝ Ia²</T>
      <W d="M130 150 V172 H350 V150" w={1} />
      <T x={240} y={188} size={10}>Constant losses Wc (with shunt field Cu)</T>
    </g>
  </>
);

/* ── 4.3: power flow (Fig. 5) ──────────────────────────────────────────── */
// 0 input · 1 copper losses · 2 Pm = EbIa · 3 iron + friction · 4 output
export const flowFigure = (s) => (
  <>
    <g className={s.on(0) + s.hl(0)}>
      {box(46, 50, 76, 34, 'Input', 'V·IL')}
      <Cap y={170}>Fig. 5  Power flow in a DC motor</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M84 50 H126" />
      {head(130, 50, 'right')}
      <W d="M108 50 V96" />
      {head(108, 100, 'down')}
      <T x={108} y={116} size={9.5}>Copper losses</T>
      <T x={108} y={130} size={9} i>Ia²Ra + Ish²Rsh</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      {box(180, 50, 92, 34, 'Mechanical power', 'Pm = Eb·Ia')}
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M226 50 H268" />
      {head(272, 50, 'right')}
      <W d="M250 50 V96" />
      {head(250, 100, 'down')}
      <T x={250} y={116} size={9.5}>Iron + friction</T>
      <T x={250} y={130} size={9} i>+ windage</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      {box(314, 50, 76, 34, 'Output', 'shaft power')}
    </g>
  </>
);

/* ── 4.3: efficiency against load (Fig. 6) ────────────────────────────── */
// 0 axes · 1 constant loss · 2 variable loss · 3 efficiency · 4 the maximum
export const effFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {axes(40, 20, 290, 150, 'Load current IL', 'Losses, η')}
      <Cap y={218}>Fig. 6  Efficiency and losses vs load</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 120 H326" w={1.4} />
      <T x={326} y={114} a="end" size={10}>constant loss Wc</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M40 170 Q170 166 310 40" w={1.4} dash="5 3" />
      <T x={300} y={36} a="end" size={10}>variable loss Ia²Ra</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <W d="M40 170 C80 60 140 46 200 44 S300 60 326 72" w={1.8} />
      <T x={110} y={52} a="end" size={10.5} i>η</T>
    </g>
    <g className={s.on(4) + s.hl(4)}>
      <W d="M200 40 V170" w={0.9} dash="3 3" />
      <circle cx={200} cy={120} r={3} fill={C.chalk} />
      <T x={204} y={200} a="start" size={10}>ηmax where Ia²Ra = Wc</T>
    </g>
  </>
);

/* ── 4.4: armature circuit at starting (Fig. 7) ───────────────────────── */
// 0 circuit · 1 Eb = 0 at start · 2 starting resistance R · 3 Ia = V/(Ra + R)
export const startFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <Term x={30} y={40} sign="+" />
      <Term x={30} y={160} sign="−" />
      <T x={18} y={104} a="end" i>V</T>
      <W d="M33 40 H60" />
      <W d="M60 40 L84 30" />
      <circle cx={60} cy={40} r={2} fill={C.chalk} />
      <W d="M86 40 H120" />
      <T x={72} y={22} size={9.5}>switch</T>
      <W d="M230 40 H280 V84 M280 116 V160 H33" />
      <W d="M120 40 H150" />
      <ResH x1={150} x2={196} y={40} label="Ra" />
      <W d="M196 40 H230" />
      <Arm x={280} y={100} r={16} />
      <Cur x={110} y={40} label="Ia" />
      <Cap y={196}>Fig. 7  Armature circuit at starting</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <T x={306} y={98} a="start" i>Eb = 0</T>
      <T x={306} y={112} a="start" size={9.5}>(N = 0)</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <rect x={200} y={30} width={30} height={20} fill={C.board} stroke="none" />
      <ResH x1={200} x2={230} y={40} vary />
      <T x={215} y={66} i>R</T>
      <T x={215} y={78} size={9}>starter</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={150} y={124} i size={12}>Ia = V / (Ra + R)</T>
    </g>
  </>
);

/* ── 4.4: 3-point and 4-point starters (Figs. 8, 9) ───────────────────── */
// 0 terminals, studs, field, armature · 1 handle on stud 1 · 2 handle at run,
// held by the NVC · 3 NVC · 4 OLR. Four-point: the NVC fed from the line.
const PV = [176, 168];
const pol = (deg, r) => [PV[0] + r * Math.cos((deg * Math.PI) / 180), PV[1] - r * Math.sin((deg * Math.PI) / 180)];
const STUDS = [150, 130, 110, 90, 70, 50];
const starter = (four) => (s) => {
  const [lx, ly] = pol(STUDS.at(-1), 92);
  const [fx, fy] = pol(36, 72);
  const [nx, ny] = pol(30, 96);
  const handle = (deg, dash) => {
    const [hx, hy] = pol(deg, 92);
    return <W d={`M${PV[0]} ${PV[1]} L${hx} ${hy}`} w={3.4} dash={dash} />;
  };
  return (
    <>
      <g className={s.on(0)}>
        {/* Line, OLR coil to the pivot. */}
        <Term x={20} y={40} sign="+" label="L" />
        <Term x={20} y={244} sign="−" />
        <W d="M23 40 H52" />
        <W d={`M88 40 H120 V${PV[1]} H${PV[0]}`} />
        <circle cx={PV[0]} cy={PV[1]} r={4} fill={C.chalk} />
        {/* Studs and the starting resistance between them. */}
        {STUDS.map((d, i) => {
          const [x, y] = pol(d, 92);
          return <rect key={d} x={x - 5} y={y - 5} width={10} height={10} {...INK} className={i === 0 ? s.hl(1) : ''} />;
        })}
        {STUDS.slice(1).map((d, i) => {
          const [x1, y1] = pol(STUDS[i], 104);
          const [x2, y2] = pol(d, 104);
          return <path key={d} d={`M${x1} ${y1} L${(x1 + x2) / 2} ${(y1 + y2) / 2 - 8} L${x2} ${y2}`} {...INK} strokeWidth={1} />;
        })}
        <T x={PV[0]} y={PV[1] - 116} size={9.5}>starting resistance</T>
        {/* Brass arc from the first stud to the holding coil. */}
        <path d={`M${pol(150, 72)[0]} ${pol(150, 72)[1]} A72 72 0 0 1 ${fx} ${fy}`} {...INK} strokeWidth={2} />
        <T x={PV[0]} y={PV[1] - 50} size={9}>brass arc</T>
        {/* Armature from the last stud through A. */}
        <W d={`M${lx} ${ly} L${lx + 22} ${ly - 12} H316`} />
        <Term x={316} y={ly - 12} label="A" a="start" />
        <W d={`M318 ${ly - 12} H334 V150 M334 186 V244 H23`} />
        <Arm x={334} y={168} r={16} />
        {/* Shunt field from F. */}
        <W d={`M296 ${four ? 120 : 132} V244`} />
        <Term x={296} y={four ? 120 : 132} label="F" a="start" />
        <CoilV x={296} y1={176} y2={212} label="field" lx={-8} a="end" />
        <Cap y={268}>{four ? 'Fig. 9  Four-point starter' : 'Fig. 8  Three-point starter'}</Cap>
      </g>
      <g className={s.on(0)}>
        <CoilH x1={52} x2={88} y={40} label="OLR" ly={-9} />
      </g>
      {/* Holding (NVC) coil at the run end. */}
      <g className={s.on(0) + s.hl(3)}>
        <rect x={nx - 4} y={ny - 26} width={22} height={18} {...INK} />
        <T x={nx + 7} y={ny - 32} size={9.5} b>NVC</T>
        {four ? (
          <>
            <W d={`M${nx + 18} ${ny - 17} H360 V244`} w={1} />
            <rect x={350} y={60} width={0} height={0} />
            <ResV x={360} y1={84} y2={112} label="R" lx={-6} a="end" />
            <W d={`M${fx} ${fy} L296 120`} />
          </>
        ) : (
          <W d={`M${nx + 18} ${ny - 17} H296 V132 M${fx} ${fy} L${nx} ${ny - 10}`} />
        )}
      </g>
      <g className={s.on(1, 1)}>{handle(STUDS[0])}</g>
      <g className={s.on(2) + s.hl(2)}>
        {handle(STUDS[0], '3 3')}
        {handle(STUDS.at(-1) - 14)}
        <path d={`M${pol(140, 60)[0]} ${pol(140, 60)[1]} A60 60 0 0 1 ${pol(52, 60)[0]} ${pol(52, 60)[1]}`} {...INK} strokeWidth={0.9} strokeDasharray="3 3" />
        {head(pol(52, 60)[0], pol(52, 60)[1], 'right', 5)}
      </g>
      <g className={s.on(4) + s.hl(4)}>
        <W d="M70 50 V64 M64 64 H76 M64 70 H76" w={1} />
        <T x={70} y={84} size={9}>contacts short NVC</T>
      </g>
    </>
  );
};
export const threePointFigure = starter(false);
export const fourPointFigure = starter(true);

/* ── 4.5: speed control of a shunt motor (Fig. 10) ────────────────────── */
// 0 circuit · 1 field rheostat · 2 armature resistance · 3 speed equation
export const speedCtrlFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <Term x={30} y={40} sign="+" />
      <Term x={30} y={170} sign="−" />
      <T x={18} y={110} a="end" i>V</T>
      <W d="M33 40 H290 V88 M290 122 V170 H33" />
      <Arm x={290} y={105} r={16} />
      <W d="M120 40 V58 M120 152 V170" />
      <CoilV x={120} y1={110} y2={152} label="field" lx={-10} a="end" />
      <W d="M120 58 V64 M120 98 V110" />
      <Cur x={60} y={40} label="IL" />
      <T x={320} y={108} a="start" i>Eb</T>
      <Cap y={204}>Fig. 10  Shunt motor speed control</Cap>
    </g>
    <g className={s.on(0)}>
      <ResV x={120} y1={64} y2={98} />
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <ResV x={120} y1={64} y2={98} vary label="Rf (field control)" lx={-14} a="end" />
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <rect x={198} y={30} width={50} height={20} fill={C.board} stroke="none" />
      <ResH x1={198} x2={248} y={40} vary label="R (armature control)" ly={-12} />
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={206} y={140} i size={12}>N ∝ (V − Ia(Ra + R)) / φ</T>
    </g>
  </>
);

/* ── 4.5: speed against armature current (Fig. 11) ────────────────────── */
// 0 axes + normal line · 1 field control (above) · 2 armature control (below)
export const speedCurvesFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {axes(40, 20, 280, 140, 'Ia', 'N')}
      <W d="M40 90 L316 100" w={1.6} />
      <T x={316} y={94} a="end" size={10}>normal (R = 0, full field)</T>
      <W d="M40 96 H24" w={0} />
      <Cap y={200}>Fig. 11  N–Ia under speed control</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M40 44 L316 56" w={1.4} dash="6 3" />
      <T x={316} y={48} a="end" size={10}>weaker field: above normal</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M40 90 L316 150" w={1.4} dash="2 3" />
      <T x={300} y={138} a="end" size={10}>extra R: below normal</T>
    </g>
  </>
);

/* ── 4.5: series motor control and reversal (Fig. 12) ─────────────────── */
// 0 series motor · 1 diverter across the field · 2 series resistance · 3 reversal
export const seriesCtrlFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <Term x={30} y={50} sign="+" />
      <Term x={30} y={170} sign="−" />
      <T x={18} y={114} a="end" i>V</T>
      <W d="M33 50 H90" />
      <CoilH x1={90} x2={150} y={50} label="series field" ly={-12} />
      <W d="M150 50 H290 V94 M290 126 V170 H33" />
      <Arm x={290} y={110} r={16} />
      <Cap y={206}>Fig. 12  Series motor: control, reversal</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <W d="M80 50 V86 M160 50 V86" />
      <ResH x1={80} x2={160} y={86} label="diverter Rd" ly={18} />
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <rect x={190} y={40} width={50} height={20} fill={C.board} stroke="none" />
      <ResH x1={190} x2={240} y={50} label="series R" ly={-10} />
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <T x={316} y={100} a="start" size={9.5}>reverse</T>
      <T x={316} y={113} a="start" size={9.5}>armature</T>
      <T x={316} y={126} a="start" size={9.5}>(or field)</T>
    </g>
  </>
);

/* ── 4.6: Swinburne's test (Fig. 13) ───────────────────────────────────── */
// 0 circuit on no load · 1 meters · 2 constant losses
export const swinburneFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <Term x={30} y={40} sign="+" />
      <Term x={30} y={180} sign="−" />
      <W d="M33 40 H290 V94 M290 126 V180 H33" />
      <Arm x={290} y={110} r={16} />
      <W d="M170 40 V70 M170 150 V180" />
      <CoilV x={170} y1={100} y2={150} label="Rsh" lx={-10} a="end" />
      <T x={318} y={104} a="start" size={9.5}>running</T>
      <T x={318} y={117} a="start" size={9.5}>light</T>
      <T x={318} y={130} a="start" size={9.5}>(no load)</T>
      <Cap y={214}>Fig. 13  Swinburne’s (no-load) test</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <rect x={70} y={30} width={22} height={20} fill={C.board} stroke="none" />
      <Meter x={81} y={40} l="A" />
      <T x={81} y={22} i size={10}>I0</T>
      <rect x={160} y={70} width={20} height={22} fill={C.board} stroke="none" />
      <W d="M170 70 V90 M170 90 V100" />
      <Meter x={170} y={82} l="A" />
      <T x={186} y={86} a="start" i size={10}>Ish</T>
      <W d="M60 40 V100 M60 120 V180" w={1} />
      <Meter x={60} y={110} l="V" />
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <T x={180} y={200} i size={11.5}>Wc = V·I0 − (I0 − Ish)²·Ra</T>
    </g>
  </>
);

/* ── 4.6: retardation test (Fig. 14) ───────────────────────────────────── */
// 0 axes · 1 slowing down alone · 2 tangent dN/dt at N · 3 with extra load
const decay = (k) => Array.from({ length: 16 }, (_, i) => {
  const t = i / 15;
  return `${i ? 'L' : 'M'}${(50 + t * 270).toFixed(1)} ${(40 + 120 * (1 - Math.exp(-k * t))).toFixed(1)}`;
}).join(' ');
export const retardFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {axes(50, 24, 280, 140, 't (s)', 'N (rpm)')}
      <Cap y={204}>Fig. 14  Retardation test: N vs t</Cap>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <path d={decay(1.4)} {...INK} strokeWidth={1.8} />
      <T x={316} y={128} a="end" size={10}>armature switched off</T>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <W d="M70 50 L190 112" w={1} dash="4 3" />
      <circle cx={118} cy={75} r={3} fill={C.chalk} />
      <T x={124} y={68} a="start" i size={10.5}>slope dN/dt at N</T>
    </g>
    <g className={s.on(3) + s.hl(3)}>
      <path d={decay(3)} {...INK} strokeWidth={1.4} strokeDasharray="5 3" />
      <T x={150} y={154} a="start" size={10}>with known extra load W′</T>
    </g>
  </>
);
