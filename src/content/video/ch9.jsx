import { C, D, hook, solve, video } from './kit.jsx';

/* Chapter 9 · Losses & efficiency (Syllabus Unit 4: Losses and efficiency). */

const losses = video('Where does the power go?', {
  beats: [
    { say: 'Not all the input power becomes shaft power. The losses in a DC machine fall into three groups.' },
    { say: 'Copper losses: armature I a squared R a, the shunt field loss, the series field loss, and the small brush contact drop.' },
    { say: 'Iron losses in the rotating armature core: hysteresis and eddy current. Both depend on how often the iron is re-magnetised, f equals P N over 120.' },
    { say: 'Mechanical losses: friction in the bearings and at the brushes, and windage, the air resistance of the spinning armature.' },
    {
      say: 'The core is built to fight iron loss.',
      ask: {
        q: 'The armature core uses silicon steel AND thin laminations. Which does what?',
        options: ['Silicon steel cuts hysteresis; laminations cut eddy current', 'Silicon steel cuts eddy current; laminations cut hysteresis', 'Both only cut copper loss'],
        answer: 0,
        why: 'Silicon steel has a narrow B–H loop, so less hysteresis. Eddy loss grows with t², so thin laminations block the eddy current paths.',
      },
    },
    { say: 'At constant speed and voltage, iron, mechanical and shunt field losses hardly change with load. These are the constant losses, W c.' },
    { say: 'Anything carrying the armature current changes with load: armature copper loss, series field loss, brush drop. These are the variable losses.' },
    { say: 'Iron and mechanical losses together are also called stray, or rotational, losses.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Losses in a DC machine</> },
    { at: 1, kind: 'step', node: <><span className="r">Copper:</span> Ia²Ra · shunt Ish²Rsh = V·Ish · series Ise²Rse · brush drop</> },
    { at: 2, kind: 'step', node: <><span className="bl">Iron:</span> hysteresis Wh = η·Bmax^1.6·f·V · eddy We ∝ Bmax²·f²·t² · f = PN/120</> },
    { at: 3, kind: 'step', node: <><span className="g">Mechanical:</span> bearing & brush friction · windage</> },
    { at: 5, kind: 'step', node: <><span className="y">Constant losses Wc</span> = iron + mechanical + shunt field Cu</> },
    { at: 6, kind: 'step', node: <><span className="y">Variable losses</span> = Ia²Ra + series field + brush drop (vary with load)</> },
    { at: 7, kind: 'note', node: <>Iron + mechanical = stray (rotational) losses</> },
  ],
});

/* Sankey: main band from x=20 to 330, top fixed at y=50, thickness shrinks at each stage. */
const SANKEY = [
  { x1: 20, x2: 90, h: 80, label: 'Input V·IL', beat: 0 },
  { x1: 90, x2: 160, h: 72, beat: 1 },
  { x1: 160, x2: 260, h: 58, label: 'Eb·Ia (gross)', beat: 2 },
  { x1: 260, x2: 330, h: 46, label: 'Output', beat: 5 },
];
const BRANCHES = [
  { x: 90, from: 72, w: 8, label: 'field Cu V·Ish', beat: 1, color: C.red },
  { x: 160, from: 58, w: 14, label: 'armature Cu Ia²Ra', beat: 2, color: C.red },
  { x: 260, from: 46, w: 12, label: 'iron + mechanical', beat: 5, color: C.blue },
];

const powerFlow = video('Power flow in a DC motor', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Follow the power through a DC shunt motor. It enters from the supply as V times the line current.' },
    { say: 'First, a little goes to the shunt field: V times I shunt.' },
    { say: 'Then the armature copper loss, I a squared R a. What is left is converted into mechanical form: the gross mechanical power, E b times I a.' },
    { say: 'That is the same E b I a we met in the power equation.' },
    {
      say: 'One more stage.',
      ask: {
        q: 'Eb·Ia is converted to mechanical power. Why is the shaft output smaller still?',
        options: ['Iron and mechanical losses are taken from it', 'The field takes more power', 'The back EMF wastes it as heat'],
        answer: 0,
        why: 'Hysteresis, eddy current, friction and windage all come out of the gross mechanical power before it reaches the shaft.',
      },
    },
    { say: 'Iron and mechanical losses come off next, and the rest reaches the shaft as the useful output.' },
    { say: 'Efficiency is output over input, which is the same as output over output plus all the losses.' },
  ],
  draw: (s) => (
    <>
      {SANKEY.map((b) => (
        <g key={b.x1} className={s.on(b.beat)}>
          <rect x={b.x1} y={50} width={b.x2 - b.x1 + 1} height={b.h} fill={C.yellow} opacity={0.8} />
          {b.label && <text x={(b.x1 + b.x2) / 2} y={44} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.yellow}>{b.label}</text>}
        </g>
      ))}
      <polygon points="331,50 352,73 331,96" fill={C.yellow} opacity={0.8} className={s.on(5)} />
      {BRANCHES.map((b) => (
        <g key={b.x} className={s.on(b.beat)}>
          <rect x={b.x - b.w} y={50 + b.from - b.w} width={b.w} height={170 - (50 + b.from - b.w)} fill={b.color} opacity={0.75} />
          <text x={b.x - b.w / 2} y={210} textAnchor="middle" fontSize={10} fill={b.color}>{b.label}</text>
        </g>
      ))}
    </>
  ),
  board: [
    { at: 3, kind: 'note', node: <>Power equation: V·Ia = Eb·Ia + Ia²Ra</> },
    { at: 6, kind: 'eq', node: <>η = Output / Input = Output / (Output + losses)</> },
  ],
});

const maxEff = video('Derivation: condition for maximum efficiency', {
  beats: [
    { say: 'When is a DC machine most efficient? Let us derive it.' },
    { say: 'Take input power V I. The losses are a constant part, W c, and a variable part, I squared R a.' },
    { say: 'Efficiency is input minus losses, over input. Divide through by V I to get one minus W c over V I, minus I R a over V.' },
    {
      say: 'Now the key move.',
      ask: {
        q: 'To find the load current that gives maximum efficiency, what do we do?',
        options: ['Set dη/dI = 0', 'Set I = 0', 'Set Wc = 0'],
        answer: 0,
        why: 'η is a function of the load current I. At its maximum, the slope dη/dI is zero.',
      },
    },
    { say: 'Differentiate. The derivative is W c over V I squared, minus R a over V. Set it to zero.' },
    { say: 'Multiply by V. W c over I squared equals R a, so I squared R a equals W c.' },
    { say: 'Efficiency is maximum when the variable loss equals the constant loss.' },
    { say: 'The load current at maximum efficiency is the square root of W c over R a.' },
    {
      say: 'Use it.',
      ask: {
        tag: 'Quick check',
        q: 'A machine has constant losses Wc = 1312 W and Ra = 0.5 Ω. At what current is its efficiency maximum?',
        options: ['≈ 51 A', '≈ 2624 A', '≈ 26 A'],
        answer: 0,
        why: 'I = √(1312/0.5) = √2624 ≈ 51 A.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Condition for maximum η</> },
    { at: 1, kind: 'step', node: <>Input = V·I · Losses = Wc (constant) + I²Ra (variable)</> },
    { at: 2, kind: 'step', node: <>η = (VI − Wc − I²Ra) / VI = 1 − Wc/(VI) − IRa/V</> },
    { at: 4, kind: 'step', node: <>dη/dI = Wc/(VI²) − Ra/V = 0</> },
    { at: 5, kind: 'step', node: <>⟹ Wc/I² = Ra ⟹ <span className="y">I²Ra = Wc</span></> },
    { at: 6, kind: 'eq', node: <>Variable loss = Constant loss</> },
    { at: 7, kind: 'step', node: <>I(max η) = √(Wc / Ra)</> },
    { at: 7, kind: 'note', node: <>For a motor, I ≈ Ia: the small shunt current is counted inside Wc.</> },
  ],
});

const ioeEff = solve({
  title: 'Solving IOE 2074 Bhadra: efficiency',
  paper: '2074 Bhadra',
  read: 'A DC shunt generator gives a full-load output of 30 kilowatts at 200 volts. Armature resistance 0.05 ohm, shunt field 50 ohms, and iron and friction losses 1000 watts. Find the generated EMF, the copper losses and the efficiency.',
  question: (
    <>
      A DC shunt generator gives a full-load output of <D>30 kW</D> at <D>200 V</D>. <D>Ra = 0.05 Ω</D>, <D>Rsh = 50 Ω</D>, and the iron and friction losses are{' '}
      <D>1000 W</D>. Calculate (i) the EMF generated, (ii) the copper losses, (iii) the efficiency.
    </>
  ),
  given: [
    { node: <>Output = 30 kW at V = 200 V</>, say: 'Output 30 kilowatts at 200 volts' },
    { node: <>Ra = 0.05 Ω, Rsh = 50 Ω</>, say: 'armature 0.05 ohm, field 50 ohms' },
    { node: <>Iron + friction = 1000 W</>, say: 'and 1000 watts of iron and friction loss' },
  ],
  find: { node: <>E, copper losses, η</>, say: 'They want the EMF, the copper losses and the efficiency.' },
  idea: {
    node: <>Generator: Ia = IL + Ish · η = Output / (Output + all losses)</>,
    say: 'Key idea: in a generator the armature feeds the load and its own field, so I a is I L plus I shunt. Then add up every loss.',
  },
  steps: [
    { node: <>IL = 30 000/200 = 150 A · Ish = 200/50 = 4 A ⟹ Ia = 154 A</>, say: 'Load current 150 amperes, field current 4 amperes, so I a is 154 amperes.' },
    {
      node: <>Armature Cu = 154² × 0.05 = 1185.8 W</>,
      say: 'Next, the armature copper loss.',
      ask: {
        tag: 'IOE 2074 Bhadra',
        q: 'Armature copper loss Ia²Ra = 154² × 0.05 = ?',
        options: ['1185.8 W', '1125 W', '7.7 W', '800 W'],
        answer: 0,
        why: '154² = 23 716, times 0.05 is 1185.8 W. Using IL = 150 A gives 1125 W.',
      },
    },
    { node: <>Field Cu = 200 × 4 = 800 W · total Cu = 1985.8 W</>, say: 'Field copper loss is V times I shunt, 800 watts. Total copper loss 1985.8 watts.' },
    { node: <>Total losses = 1985.8 + 1000 = 2985.8 W</>, say: 'Adding iron and friction, total losses are 2985.8 watts.' },
    {
      node: <>η = 30 000 / 32 985.8</>,
      say: 'Now the efficiency.',
      ask: {
        tag: 'IOE 2074 Bhadra',
        q: 'η = 30 000 / (30 000 + 2985.8) ≈ ?',
        options: ['90.9 %', '93.2 %', '96.2 %'],
        answer: 0,
        why: '30 000 / 32 985.8 ≈ 0.909.',
      },
    },
  ],
  answer: { node: <>E = 200 + 154 × 0.05 = 207.7 V · Cu = 1985.8 W · η ≈ 90.9 %</>, say: 'The EMF is 200 plus 154 times 0.05, 207.7 volts. Copper losses 1985.8 watts, and efficiency about 90.9 percent.' },
  trap: { node: <>Trap: forgetting the 800 W field loss gives 93.2 %; using Ia = IL gives 1125 W of armature loss.</>, say: 'Traps: forgetting the field loss gives 93.2 percent, and using the line current for I a gives the wrong copper loss.' },
});

export const ch9 = {
  title: 'Losses & efficiency',
  syllabus: 'Unit 4 · Losses and efficiency',
  steps: [
    losses,
    powerFlow,
    maxEff,
    ioeEff,
    hook('Maximum η when Variable loss = Constant loss', [
      'Constant: iron + mechanical + shunt field. Variable: Ia²Ra, series field, brush drop.',
      'η = Output / (Output + losses) · I(max η) = √(Wc / Ra)',
      'Silicon steel → less hysteresis · Laminations → less eddy current.',
    ]),
  ],
};
