import { Armature, Arrow, C, Resistor, Source, hook, model, video } from './kit.jsx';

/* Chapter 4 · Back EMF (Syllabus Unit 4: Back EMF). 220 V motor, Ra = 0.5 Ω throughout. */

// [N rpm, Eb V, Ia A] per beat of the story video.
const STORY = [
  [0, 0, 0],
  [0, 0, 440],
  [0, 0, 440],
  [786, 110, 220],
  [1500, 210, 20],
  [1464, 205, 30],
  [1464, 205, 30],
  [1464, 205, 30],
];

function Bar({ x, frac, color, label, value }) {
  return (
    <g>
      <rect x={x} y={40} width={26} height={150} rx={4} fill="none" stroke={C.faint} strokeWidth={1.5} />
      <rect
        x={x}
        y={40}
        width={26}
        height={150}
        rx={4}
        fill={color}
        style={{ transform: `scaleY(${Math.max(frac, 0.001)})`, transformBox: 'fill-box', transformOrigin: 'bottom', transition: 'transform 1.2s ease' }}
      />
      <text x={x + 13} y={206} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{label}</text>
      <text x={x + 13} y={32} textAnchor="middle" fontSize={11.5} fill={C.chalk}>{value}</text>
    </g>
  );
}

const story = video('Why the motor limits its own current', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Here is a 220 volt DC motor with an armature resistance of half an ohm. The switch is still open, so nothing flows.' },
    { say: 'Switch on. The armature is not turning yet, so there is no back EMF. The current is V over Ra: 440 amperes!' },
    {
      say: 'This exact question comes up again and again.',
      ask: {
        tag: 'IOE 2079 Jestha · 2068 Magh · 2066 Magh · 2073 Bhadra · 2082 Bhadra',
        q: 'Why does a DC motor draw a large current at starting?',
        options: [
          'At rest N = 0, so Eb = 0, and only the small Ra limits the current',
          'The field is strongest at starting, so it pulls more current',
          'Friction is highest at starting, so more current is needed',
        ],
        answer: 0,
        why: 'Ia = (V − Eb)/Ra. At standstill Eb = 0, and Ra is only a fraction of an ohm, so Ia = V/Ra is many times the rated current. That is why a starter is needed.',
      },
    },
    { say: 'As the armature speeds up, its conductors cut flux and generate an EMF that opposes the supply. That is the back EMF, and the current falls.' },
    { say: 'At full speed the back EMF is 210 volts. Only 10 volts is left to push current through Ra, so the armature current is just 20 amperes.' },
    { say: 'Now add load. The motor slows a little, Eb falls to 205 volts, and the current rises to 30 amperes, giving the extra torque the load needs.' },
    {
      say: 'Think about what just happened.',
      ask: {
        tag: 'IOE 2067 Mangsir',
        q: 'How does a DC motor adjust its current when the shaft load increases?',
        options: [
          'Speed falls slightly, so Eb falls, so Ia = (V − Eb)/Ra rises',
          'The supply voltage rises to give more current',
          'Ra falls when the motor is loaded',
        ],
        answer: 0,
        why: 'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑, until torque matches the load again. Remove load and the chain runs backwards.',
      },
    },
    { say: 'So back EMF makes the motor self-regulating. It draws exactly the current its load needs.' },
  ],
  draw: (s) => {
    const [n, eb, ia] = STORY[s.beat];
    const on = s.beat >= 1;
    return (
      <>
        <line x1={40} y1={40} x2={40} y2={103} stroke={C.chalk} strokeWidth={2} />
        <line x1={40} y1={117} x2={40} y2={180} stroke={C.chalk} strokeWidth={2} />
        <Source x={40} y={110} label="220 V" />
        <line x1={40} y1={40} x2={80} y2={40} stroke={C.chalk} strokeWidth={2} />
        {on ? (
          <line x1={80} y1={40} x2={100} y2={40} stroke={C.chalk} strokeWidth={2.4} />
        ) : (
          <line x1={80} y1={40} x2={97} y2={26} stroke={C.red} strokeWidth={2.4} strokeLinecap="round" />
        )}
        <line x1={100} y1={40} x2={110} y2={40} stroke={C.chalk} strokeWidth={2} />
        <Resistor x1={110} y={40} x2={180} label="Ra = 0.5 Ω" />
        <line x1={180} y1={40} x2={220} y2={40} stroke={C.chalk} strokeWidth={2} />
        <line x1={220} y1={40} x2={220} y2={86} stroke={C.chalk} strokeWidth={2} />
        <line x1={220} y1={134} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
        <line x1={40} y1={180} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
        <g className={s.beat >= 3 ? 'spin-c' : ''} style={{ transformOrigin: '220px 110px', animationDuration: s.beat >= 4 ? '1s' : '2.6s' }}>
          <Armature x={220} y={110} r={22} label="M" />
        </g>
        <g className={s.on(3)}>
          <Arrow x1={192} y1={128} x2={192} y2={92} color={C.yellow} w={2.4} />
          <text x={186} y={150} textAnchor="end" fontSize={13} fontWeight={700} fill={C.yellow}>Eb</text>
          <text x={186} y={164} textAnchor="end" fontSize={10.5} fill={C.dim}>opposes V</text>
        </g>
        {on && <line x1={60} y1={180} x2={200} y2={180} stroke={C.orange} strokeWidth={2.4} className="flowdash" />}
        <text x={130} y={204} textAnchor="middle" fontSize={12} fill={C.dim}>N = {n} rpm</text>
        <Bar x={268} frac={eb / 220} color={C.yellow} label="Eb" value={`${eb} V`} />
        <Bar x={314} frac={ia / 440} color={C.red} label="Ia" value={`${ia} A`} />
      </>
    );
  },
  board: [
    { at: 1, until: 2, kind: 'eq', node: <>Ia = V / Ra = 220 / 0.5 = 440 A</> },
    { at: 4, until: 4, kind: 'eq', node: <>Ia = (220 − 210) / 0.5 = 20 A</> },
    { at: 5, until: 6, kind: 'eq', node: <>Ia = (220 − 205) / 0.5 = 30 A</> },
    { at: 7, kind: 'eq', node: <>Ia = (V − Eb) / Ra</> },
  ],
});

const voltagePower = video('Derivation: voltage, power and torque equations', {
  beats: [
    { say: 'The supply has two jobs. It must overcome the back EMF, and it must push current through the armature resistance.' },
    { say: 'So the voltage equation of a motor is V equals Eb plus Ia Ra.' },
    { say: 'Multiply every term by Ia to turn voltages into powers.' },
    { say: 'V Ia equals Eb Ia plus Ia squared Ra.' },
    { say: 'V Ia is the electrical power fed to the armature. Ia squared Ra is the copper loss, wasted as heat.' },
    {
      say: 'One term is left.',
      ask: {
        tag: 'Pause and think',
        q: 'Input = Eb·Ia + copper loss. So what is Eb·Ia?',
        options: ['The gross mechanical power developed, Pm', 'The iron loss', 'The shunt field loss'],
        answer: 0,
        why: 'Whatever electrical power is not lost as heat is converted. Eb·Ia is the power converted to mechanical form.',
      },
    },
    { say: 'Mechanical power is also torque times angular speed, and omega equals two pi N over sixty.' },
    { say: 'Solve for torque: Ta equals 9.55 Eb Ia over N. Put in Eb equals P phi Z N over sixty A, and it becomes 0.159 phi Z Ia times P over A again.' },
    { say: 'Some of that torque is used up by iron and friction losses. What reaches the load is the shaft torque, 9.55 times output power over N. The difference is the lost torque.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Voltage → power → torque</> },
    { at: 1, kind: 'eq', node: <>V = Eb + Ia·Ra</> },
    { at: 2, kind: 'step', node: <>× Ia on both sides:</> },
    { at: 3, kind: 'step', node: <>V·Ia = Eb·Ia + Ia²·Ra</> },
    { at: 4, kind: 'note', node: <>V·Ia = armature input · Ia²Ra = armature copper loss</> },
    { at: 6, kind: 'step', node: <>Pm = Eb·Ia = Ta·ω,  ω = 2πN / 60</> },
    { at: 7, kind: 'step', node: <>Ta = 60·Eb·Ia / (2πN) = <span className="y">9.55 · Eb·Ia / N</span>  N·m</> },
    { at: 7, kind: 'step', node: <>Put Eb = PφZN/60A: Ta = (60/2πN)(PφZN/60A)·Ia = <span className="y">0.159 φZIa (P/A)</span> ✓</> },
    { at: 8, kind: 'step', node: <>Tsh = 9.55 × Output / N  ·  Lost torque = Ta − Tsh = 9.55 × (iron + friction loss) / N</> },
  ],
});

const maxPower = video('Derivation: condition for maximum power', {
  beats: [
    { say: 'When does a motor develop the most mechanical power? Start from Pm equals Eb Ia.' },
    { say: 'Substitute Eb equals V minus Ia Ra. Then Pm equals V Ia minus Ia squared Ra.' },
    {
      say: 'Now we need the maximum.',
      ask: {
        tag: 'Pause and think',
        q: 'How do we find the value of Ia that makes Pm a maximum?',
        options: ['Differentiate and set dPm/dIa = 0', 'Set Ia = 0', 'Set Eb = 0'],
        answer: 0,
        why: 'At a maximum the slope is zero, so we set the derivative with respect to Ia equal to zero.',
      },
    },
    { say: 'dPm by dIa equals V minus two Ia Ra. Set it to zero.' },
    { say: 'So Ia Ra equals V over two. Half the supply voltage is dropped across the armature resistance.' },
    { say: 'Then Eb equals V minus V over two, which is V over two.' },
    { say: 'The second derivative is minus two Ra, which is negative, so this really is a maximum.' },
    { say: 'Maximum power is developed when Eb equals V over two. But then half the input is burnt in Ra: efficiency is fifty percent at best, and the current is enormous.' },
    { say: 'So real motors are never run at this point. They run with Eb close to V.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Maximum mechanical power</> },
    { at: 1, kind: 'step', node: <>Pm = Eb·Ia = (V − IaRa)·Ia = V·Ia − Ia²·Ra</> },
    { at: 3, kind: 'step', node: <>dPm/dIa = V − 2·Ia·Ra = 0</> },
    { at: 4, kind: 'step', node: <>Ia·Ra = V / 2</> },
    { at: 5, kind: 'step', node: <>Eb = V − IaRa = V − V/2 = V/2</> },
    { at: 6, kind: 'step', node: <>d²Pm/dIa² = −2Ra &lt; 0  ⟹  maximum</> },
    { at: 7, kind: 'eq', node: <>Pm is maximum when Eb = V / 2</> },
    { at: 8, kind: 'note', node: <>e.g. 220 V, Ra = 0.5 Ω → Ia = 220 A, Pm = 24.2 kW, η = 50%. Never used in practice.</> },
  ],
});

const speedEq = video('Derivation: the speed equation', {
  beats: [
    { say: 'The back EMF follows the same EMF equation as a generator: Eb equals P phi Z N over sixty A.' },
    { say: 'Rearrange it for speed: N equals sixty A Eb over P phi Z.' },
    { say: 'P, Z and A are fixed for a given machine. So speed is proportional to Eb over phi, which is V minus Ia Ra, over phi.' },
    {
      say: 'Try it at no load.',
      ask: {
        tag: 'Quick check',
        q: 'At no load the armature current is tiny. What is Eb close to?',
        options: ['V', 'Zero', 'V / 2'],
        answer: 0,
        why: 'With Ia tiny, the IaRa drop is tiny, so Eb ≈ V.',
      },
    },
    { say: 'For two operating points of the same motor, N2 over N1 equals Eb2 over Eb1, times phi1 over phi2. This one ratio solves most IOE speed numericals.' },
    { say: 'Shunt motor: the flux is constant, so the speed ratio is just the ratio of back EMFs.' },
    { say: 'Series motor without saturation: flux is proportional to Ia, so multiply by Ia1 over Ia2 as well.' },
    {
      say: 'One more.',
      ask: {
        tag: 'Quick check',
        q: 'A shunt motor’s field is weakened while V stays the same. Its speed…',
        options: ['rises', 'falls', 'stays the same'],
        answer: 0,
        why: 'N ∝ Eb/φ, and Eb ≈ V stays nearly fixed, so a smaller φ means a higher N. This is field control.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'step', node: <>Eb = PφZN / 60A</> },
    { at: 1, kind: 'step', node: <>N = 60A·Eb / (PφZ)</> },
    { at: 2, kind: 'eq', node: <>N ∝ Eb / φ = (V − IaRa) / φ</> },
    { at: 4, kind: 'eq', node: <>N₂ / N₁ = (Eb₂ / Eb₁) × (φ₁ / φ₂)</> },
    { at: 5, kind: 'step', node: <>Shunt (φ constant): N₂/N₁ = Eb₂/Eb₁</> },
    { at: 6, kind: 'step', node: <>Series (φ ∝ Ia): N₂/N₁ = (Eb₂/Eb₁) × (Ia₁/Ia₂)</> },
  ],
});

export const ch4 = {
  title: 'Back EMF',
  syllabus: 'Unit 4 · Back EMF',
  steps: [
    story,
    voltagePower,
    maxPower,
    speedEq,
    model({
      q: 'What is back EMF? How does it play an important role in a DC motor?',
      papers: ['2071 Magh', '2078 Poush', '2082 Baishakh (ECM)'],
      marks: '[2 + 4]',
      points: [
        <>Definition: when the armature rotates, its conductors cut the flux and an EMF is induced (Faraday’s law). By Lenz’s law it opposes the applied voltage, so it is called the back (counter) EMF: <b>Eb = PφZN / 60A</b>.</>,
        <>Draw the equivalent circuit (V, Ra, Eb) and write <b>V = Eb + IaRa</b>, so <b>Ia = (V − Eb) / Ra</b>.</>,
        <>Role 1, it limits the current: when running, Eb is close to V, so Ia stays small. At standstill Eb = 0 and Ia = V/Ra is dangerously large, which is why a starter is needed.</>,
        <>Role 2, self-regulation: load ↑ → N ↓ → Eb ↓ → Ia ↑ → Ta ↑ until the torque matches the load. When the load falls the chain reverses.</>,
        <>Role 3, energy conversion: Eb·Ia is the mechanical power developed (Pm). Without back EMF no electrical power would be converted.</>,
      ],
      tip: 'Examiners look for the circuit diagram, V = Eb + IaRa and the self-regulation chain with arrows.',
    }),
    hook('Back EMF is the motor’s own brake on current', [
      'No speed → no Eb → huge current → that’s why we need a starter.',
      'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑ (self-regulating).',
      'Pm = Eb·Ia; maximum when Eb = V/2, but never used (η ≤ 50%).',
    ]),
  ],
};
