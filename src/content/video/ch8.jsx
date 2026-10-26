import { Arrow, C, D, hook, model, solve, video } from './kit.jsx';

/* Chapter 8 · Speed control: field & armature (Syllabus Unit 4: Speed control — field control, armature control). */

// Speed bar: x = 40 (zero) … 180 (base) … 320 (above base).
const MARKER = [null, null, 180, 180, 265, 115, 60];
const KNOBS = [
  { k: 'φ', name: 'flux', x: 90, beat: 4, color: C.blue },
  { k: 'R', name: 'armature R', x: 180, beat: 5, color: C.orange },
  { k: 'V', name: 'armature V', x: 270, beat: 6, color: C.green },
];

const threeKnobs = video('Three handles on speed', {
  viewBox: '0 0 360 200',
  beats: [
    { say: 'Every speed-control method comes from one equation. Speed is proportional to V minus Ia Ra, divided by phi.' },
    { say: 'So there are three handles: the flux phi, the resistance in the armature circuit, and the voltage applied to the armature.' },
    { say: 'Base speed is the speed at rated voltage, with full field and no extra armature resistance.' },
    {
      say: 'Think about the field.',
      ask: {
        q: 'At base speed the field is already at full strength. So field control can only…',
        options: ['weaken φ, which raises the speed above base', 'strengthen φ further', 'bring the motor to zero speed'],
        answer: 0,
        why: 'N ∝ 1/φ. The only direction left for φ is down, so field control works above base speed.',
      },
    },
    { say: 'Weaken the flux and the speed rises above base. That is field control.' },
    { say: 'Add resistance in the armature circuit and the speed falls below base. That is armature control.' },
    { say: 'Lower the armature voltage and the speed falls smoothly, right down to zero. That is voltage control.' },
  ],
  draw: (s) => {
    const m = MARKER[s.beat];
    return (
      <>
        <text x={180} y={34} textAnchor="middle" fontSize={22} fontStyle="italic" fontFamily="Georgia, serif" fill={C.yellow} className={s.on(0)}>
          N ∝ (V − Ia·Ra) / φ
        </text>
        {KNOBS.map((n) => (
          <g key={n.k} className={s.on(1) + s.hl(n.beat)}>
            <circle cx={n.x} cy={84} r={20} fill={C.board} stroke={n.color} strokeWidth={3} />
            <text x={n.x} y={91} textAnchor="middle" fontSize={18} fontWeight={800} fill={n.color}>{n.k}</text>
            <text x={n.x} y={122} textAnchor="middle" fontSize={11} fill={C.dim}>{n.name}</text>
          </g>
        ))}
        <g className={s.on(2)}>
          <line x1={40} y1={160} x2={320} y2={160} stroke={C.faint} strokeWidth={8} strokeLinecap="round" />
          <line x1={180} y1={160} x2={320} y2={160} stroke={C.blue} strokeWidth={8} strokeLinecap="round" opacity={s.at(4) ? 0.6 : 0} style={{ transition: 'opacity 0.6s' }} />
          <line x1={40} y1={160} x2={180} y2={160} stroke={C.orange} strokeWidth={8} strokeLinecap="round" opacity={s.at(5) ? 0.5 : 0} style={{ transition: 'opacity 0.6s' }} />
          <text x={40} y={186} textAnchor="middle" fontSize={11} fill={C.dim}>0</text>
          <text x={180} y={186} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.chalk}>base</text>
          <text x={320} y={186} textAnchor="middle" fontSize={11} fill={C.dim}>above base</text>
          {m != null && (
            <g style={{ transform: `translateX(${m - 180}px)`, transition: 'transform 1s ease' }}>
              <polygon points="180,148 172,136 188,136" fill={C.yellow} />
            </g>
          )}
        </g>
      </>
    );
  },
});

const fieldControl = video('Field (flux) control', {
  beats: [
    { say: 'Field control: a rheostat in series with the shunt field winding.' },
    { say: 'Increase the rheostat, and the field current falls, the flux falls, and the speed rises above base speed.' },
    {
      say: 'Why is this method so economical?',
      ask: {
        q: 'Why is field control efficient compared with armature control?',
        options: ['The field current is small, so little power is lost in the rheostat', 'It needs no rheostat at all', 'It lowers the armature current to zero'],
        answer: 0,
        why: 'Ish is only a few percent of the line current, so Ish²R in the field rheostat is tiny.',
      },
    },
    { say: 'It is cheap, efficient and smooth, with many speed steps.' },
    { say: 'But it only gives speeds above base, and it is limited by poor commutation and the mechanical strength of the armature at high speed.' },
    { say: 'With a constant-torque load, weakening the flux forces the armature current up, because phi times I a must stay the same.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Field (flux) control</> },
    { at: 1, kind: 'step', node: <>Rheostat ↑ → Ish ↓ → φ ↓ → <span className="y">N ↑ (above base speed)</span></> },
    { at: 3, kind: 'step', node: <><span className="g">✓</span> cheap, efficient (small Ish), smooth control</> },
    { at: 4, kind: 'step', node: <><span className="r">✗</span> only above base · limited by commutation & armature strength</> },
    { at: 5, kind: 'eq', node: <>Constant torque: φ₁·Ia₁ = φ₂·Ia₂</> },
  ],
});

const solveField = solve({
  title: 'Solving IOE 2075 Baishakh: field weakening',
  paper: '2075 Baishakh',
  read: 'A 250 volt DC shunt motor takes an armature current of 20 amperes at 1500 rpm. Armature resistance is 0.25 ohm and field resistance 250 ohms. A 250 ohm resistance is added in series with the field, with the load torque constant. Find the new speed.',
  question: (
    <>
      A <D>250 V</D> DC shunt motor (<D>Ra = 0.25 Ω</D>, <D>Rsh = 250 Ω</D>) takes an armature current of <D>20 A</D> at <D>1500 rpm</D>. A{' '}
      <D>250 Ω</D> resistance is added in series with the field, keeping the <D>load torque constant</D>. Assuming φ ∝ field current, find the new speed.
    </>
  ),
  given: [
    { node: <>V = 250 V</>, say: 'Supply 250 volts' },
    { node: <>Ra = 0.25 Ω, Rsh = 250 Ω</>, say: 'armature resistance 0.25 ohm, field 250 ohms' },
    { node: <>Ia₁ = 20 A, N₁ = 1500 rpm</>, say: '20 amperes at 1500 rpm' },
    { node: <>Field circuit: 250 + 250 = 500 Ω; torque constant</>, say: 'and the field circuit becomes 500 ohms at constant torque' },
  ],
  find: { node: <>New speed N₂</>, say: 'They want the new speed.' },
  idea: {
    node: <>N₂/N₁ = (Eb₂/Eb₁)(φ₁/φ₂) and constant torque ⟹ φ₁Ia₁ = φ₂Ia₂</>,
    say: 'Key idea: the speed ratio is the back EMF ratio times the flux ratio, and constant torque means phi times I a stays the same.',
  },
  steps: [
    { node: <>Ish₁ = 250/250 = 1 A → Ish₂ = 250/500 = 0.5 A ⟹ φ₂ = φ₁/2</>, say: 'Field current falls from one ampere to half an ampere, so the flux halves.' },
    {
      node: <>φ₁Ia₁ = φ₂Ia₂ ⟹ Ia₂ = 20 × 2 = 40 A</>,
      say: 'Now the armature current.',
      ask: {
        tag: 'IOE 2075 Baishakh',
        q: 'Load torque is constant and Ta ∝ φ·Ia. If φ halves, the armature current must…',
        options: ['double to 40 A', 'halve to 10 A', 'stay at 20 A'],
        answer: 0,
        why: 'φ₁·Ia₁ = φ₂·Ia₂, so Ia₂ = 20 × (φ₁/φ₂) = 40 A.',
      },
    },
    { node: <>Eb₁ = 250 − 20 × 0.25 = 245 V · Eb₂ = 250 − 40 × 0.25 = 240 V</>, say: 'Back EMF before is 245 volts, after is 240 volts.' },
  ],
  answer: { node: <>N₂ = 1500 × (240/245) × 2 ≈ 2939 rpm</>, say: 'So N two is 1500 times 240 over 245, times 2: about 2939 rpm. Field weakening took the speed well above base.' },
  trap: { node: <>Trap: keeping Ia = 20 A (forgetting constant torque) gives 1500 × 2 × 245/245 = 3000 rpm.</>, say: 'The common trap is keeping the current at 20 amperes, which gives 3000 rpm.' },
});

const armatureControl = video('Armature (rheostatic) control', {
  beats: [
    { say: 'Armature control: a resistance in series with the armature.' },
    { say: 'The extra resistance makes a bigger voltage drop, so the back EMF falls and the speed falls below base speed.' },
    {
      say: 'What does that cost?',
      ask: {
        q: 'What is the main drawback of armature resistance control?',
        options: ['Ia²R power is wasted in the resistance, and speed changes a lot with load', 'It can only raise the speed', 'It weakens the field'],
        answer: 0,
        why: 'The full armature current flows through R, so a lot of power is burnt, and the drop Ia·R changes with load.',
      },
    },
    { say: 'It is wasteful, because the full armature current heats the resistance, and the speed changes a lot as the load changes.' },
    { say: 'Voltage control, the Ward-Leonard system, uses a motor-generator set to feed a variable armature voltage. Smooth speed from zero to base, in both directions, but costly.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Armature (rheostatic) control</> },
    { at: 1, kind: 'step', node: <>Extra R → Ia(Ra + R) ↑ → Eb ↓ → <span className="y">N ↓ (below base only)</span></> },
    { at: 3, kind: 'step', node: <><span className="r">✗</span> Ia²R waste · <span className="r">✗</span> poor speed regulation</> },
    { at: 4, kind: 'h', node: <>Voltage (Ward-Leonard) control</> },
    { at: 4, kind: 'step', node: <>Variable armature V from an M-G set → 0 to base speed, both directions · excellent but costly</> },
  ],
});

const solveArmature = solve({
  title: 'Solving IOE 2072 Ashwin: armature resistance',
  paper: '2072 Ashwin',
  read: 'A 200 volt DC shunt motor drives a constant-torque load. It draws 50 amperes at 1000 rpm. Armature resistance 0.1 ohm, field resistance 100 ohms. What resistance in the armature circuit reduces the speed to 800 rpm?',
  question: (
    <>
      A <D>200 V</D> DC shunt motor drives a <D>constant-torque</D> load. It draws <D>50 A</D> at <D>1000 rpm</D>. <D>Ra = 0.1 Ω</D>, <D>Rsh = 100 Ω</D>.
      What resistance must be inserted in the armature circuit to reduce the speed to <D>800 rpm</D>?
    </>
  ),
  given: [
    { node: <>V = 200 V, IL = 50 A</>, say: '200 volts, 50 amperes from the line' },
    { node: <>Ra = 0.1 Ω, Rsh = 100 Ω</>, say: 'armature 0.1 ohm, field 100 ohms' },
    { node: <>N₁ = 1000 rpm → N₂ = 800 rpm, torque constant</>, say: 'speed from 1000 down to 800 rpm, at constant torque' },
  ],
  find: { node: <>Extra armature resistance R</>, say: 'They want the extra armature resistance.' },
  idea: {
    node: <>φ constant & torque constant ⟹ Ia constant, and N ∝ Eb</>,
    say: 'Key idea: shunt motor, so flux is fixed. Constant torque then fixes the armature current, and speed is proportional to back EMF.',
  },
  steps: [
    { node: <>Ish = 200/100 = 2 A ⟹ Ia = 50 − 2 = 48 A</>, say: 'Subtract the field current: 2 amperes. I a is 48 amperes at both speeds.' },
    { node: <>Eb₁ = 200 − 48 × 0.1 = 195.2 V ⟹ Eb₂ = 0.8 × 195.2 = 156.16 V</>, say: 'Back EMF at 1000 rpm is 195.2 volts, so at 800 rpm it is 156.16 volts.' },
    {
      node: <>200 − 156.16 = 48 × (0.1 + R) ⟹ 0.1 + R = 0.913 Ω</>,
      say: 'Now the voltage equation with the extra resistance.',
      ask: {
        tag: 'IOE 2072 Ashwin',
        q: '200 − 156.16 = 48 × (0.1 + R). What is the added resistance R?',
        options: ['≈ 0.81 Ω', '≈ 0.91 Ω', '≈ 1.33 Ω', '≈ 0.1 Ω'],
        answer: 0,
        why: '43.84/48 = 0.913 Ω in total. Subtract Ra = 0.1 Ω: R ≈ 0.81 Ω.',
      },
    },
  ],
  answer: { node: <>R ≈ 0.81 Ω</>, say: 'So the extra resistance is about 0.81 ohm. IOE 2068 Bhadra twists it with a pump whose torque grows with speed squared: then I a falls to 30.72 amperes and R is about 1.33 ohms.' },
  trap: { node: <>Trap: forgetting to subtract Ra gives 0.91 Ω; using IL = 50 A instead of Ia = 48 A also shifts the answer.</>, say: 'Common traps: forgetting to subtract R a, or using the line current instead of I a.' },
});

const seriesControl = video('Speed control of a series motor', {
  viewBox: '0 0 360 120',
  beats: [
    { say: 'Series motors use the same two ideas.' },
    { say: 'Field control: a diverter resistance across the series field, or a tapped field, weakens the flux and raises the speed.' },
    { say: 'Armature control: a resistance in series with the motor lowers the speed.' },
    { say: 'IOE 2075 Baisakh, 8 marks: a 200 volt series motor runs at 800 rpm on 15 amperes, with Ra 0.6 and Rse 0.4 ohm. Find its speed with 5 ohms added, same current.' },
    { say: 'The current is the same, so the series flux is the same. The speed ratio is just the back EMF ratio.' },
    {
      say: 'Work it out.',
      ask: {
        tag: 'IOE 2075 Baisakh',
        q: 'Eb₁ = 200 − 15 × 1 = 185 V and Eb₂ = 200 − 15 × 6 = 110 V. What is the new speed?',
        options: ['≈ 476 rpm', '≈ 1345 rpm', '≈ 667 rpm', '800 rpm'],
        answer: 0,
        why: 'N₂ = 800 × 110/185 ≈ 476 rpm. 1345 rpm comes from flipping the ratio.',
      },
    },
    { say: 'So the new speed is 800 times 110 over 185, about 476 rpm.' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1) + s.hl(1)}>
        <path d="M30 50 C38 34 46 34 54 50 C62 34 70 34 78 50 C86 34 94 34 102 50" fill="none" stroke={C.violet} strokeWidth={2.2} />
        <text x={66} y={72} textAnchor="middle" fontSize={11} fill={C.violet}>series field</text>
        <path d="M30 50 L30 20 L44 20 L48 12 L56 28 L64 12 L72 28 L80 12 L88 20 L102 20 L102 50" fill="none" stroke={C.blue} strokeWidth={2} />
        <text x={66} y={10} textAnchor="middle" fontSize={11} fill={C.blue}>diverter</text>
      </g>
      <g className={s.on(2) + s.hl(2)}>
        <line x1={102} y1={50} x2={140} y2={50} stroke={C.dim} strokeWidth={1.6} />
        <path d="M140 50 L146 40 L154 60 L162 40 L170 60 L178 40 L184 50" fill="none" stroke={C.orange} strokeWidth={2} />
        <text x={162} y={78} textAnchor="middle" fontSize={11} fill={C.orange}>series R</text>
        <line x1={184} y1={50} x2={220} y2={50} stroke={C.dim} strokeWidth={1.6} />
        <circle cx={240} cy={50} r={18} fill={C.board} stroke={C.chalk} strokeWidth={2.4} />
        <text x={240} y={55} textAnchor="middle" fontSize={14} fontWeight={700}>M</text>
        <Arrow x1={282} y1={50} x2={330} y2={50} color={C.yellow} />
        <text x={306} y={40} textAnchor="middle" fontSize={12} fill={C.yellow}>N ↓</text>
      </g>
      <text x={180} y={108} textAnchor="middle" fontSize={12} fill={C.dim} className={s.on(3)}>200 V · 800 rpm at 15 A · Ra = 0.6 Ω · Rse = 0.4 Ω · add 5 Ω, same current</text>
    </>
  ),
  board: [
    { at: 4, kind: 'step', node: <>Same I ⟹ same φ ⟹ N₂/N₁ = Eb₂/Eb₁</> },
    { at: 6, kind: 'eq', node: <>N₂ = 800 × 110 / 185 ≈ 476 rpm</> },
  ],
});

export const ch8 = {
  title: 'Speed control: field & armature',
  syllabus: 'Unit 4 · Speed control of DC motors: field control, armature control',
  steps: [
    threeKnobs,
    fieldControl,
    solveField,
    armatureControl,
    solveArmature,
    seriesControl,
    model({
      q: 'Describe different methods of controlling the speed of a DC shunt motor.',
      papers: ['2071 Bhadra', '2069 Bhadra', '2065 Chaitra'],
      marks: '[8]',
      points: [
        <><b>Basis:</b> Eb = PφZN/60A ⟹ N ∝ Eb/φ = (V − IaRa)/φ. Speed can be changed through φ, the armature circuit resistance, or the armature voltage.</>,
        <><b>Field (flux) control:</b> a rheostat in series with the shunt field. Increasing it lowers Ish and φ, so N rises above base speed. Efficient and cheap (field current is small), fine control; limited by commutation and mechanical strength at high speed. Draw the circuit and the N–Ia curves for decreasing φ.</>,
        <><b>Armature (rheostatic) control:</b> a variable resistance in series with the armature. The drop Ia(Ra + R) lowers Eb and N below base speed. Simple, but wastes Ia²R power and gives poor speed regulation. Draw the circuit and the N–Ia lines for increasing R.</>,
        <><b>Voltage control (Ward-Leonard):</b> the armature is fed from a separately excited generator driven by another motor; varying the generator field varies V, giving smooth control from zero to base speed in both directions. Excellent but costly.</>,
        <><b>Compare:</b> field control above base (constant power), armature/voltage control below base (constant torque).</>,
      ],
      tip: 'Write N ∝ (V − IaRa)/φ first: every method then reads as “change one term in this equation”.',
    }),
    hook('Field → Faster (above base) · Armature → slower (below base)', [
      'N ∝ (V − IaRa)/φ: three handles φ, R, V.',
      'Constant torque: shunt keeps Ia fixed (φ fixed); weaken φ and Ia must rise so φ₁Ia₁ = φ₂Ia₂.',
      'Series motor: diverter or tapped field for field control; series R for armature control.',
    ]),
  ],
};
