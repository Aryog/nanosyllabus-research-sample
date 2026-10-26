import { Axes, C, D, hook, model, solve, video } from './kit.jsx';

/* Chapter 6 · Performance characteristics (Syllabus Unit 4: Performance characteristics of DC motors). */

// Axes origin (40,190), 290 wide, 160 tall. Map unit coordinates (0..1) to SVG.
const X = (u) => 40 + u * 270;
const Y = (v) => 190 - v * 150;
const path = (f, from = 0, to = 1, n = 40) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const u = from + ((to - from) * i) / n;
    return `${i ? 'L' : 'M'}${X(u).toFixed(1)} ${Y(Math.min(f(u), 1.05)).toFixed(1)}`;
  }).join('');

const Curve = ({ d, color, w = 3, className = '' }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" pathLength={1} className={`draw ${className}`} />
);
const Lbl = ({ x, y, children, color, anchor = 'start' }) => (
  <text x={x} y={y} fontSize={12.5} fontWeight={700} fill={color} textAnchor={anchor}>{children}</text>
);
const Title = ({ children }) => <text x={180} y={18} textAnchor="middle" fontSize={14} fontWeight={800} fill={C.yellow}>{children}</text>;

const shuntT = (u) => 0.9 * u;
const shuntTsh = (u) => Math.max(0, 0.9 * u - 0.06);
const shuntN = (u) => 0.8 - 0.1 * u;
// Series: Ta ∝ Ia² up to saturation (u = 0.45), then linear and tangent.
const seriesT = (u) => (u < 0.45 ? 2.2 * u * u : 2.2 * 0.45 * 0.45 + 2 * 2.2 * 0.45 * (u - 0.45) * 0.55);
const seriesN = (u) => 0.13 / Math.max(u, 0.05);
const compoundN = (u) => 0.85 - 0.45 * u;

const shunt = video('Shunt motor characteristics', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Two rules drive every characteristic: torque is proportional to phi times Ia, and speed is proportional to Eb over phi.' },
    { say: 'In a shunt motor the field is across a fixed supply, so phi is constant. Torque against armature current is a straight line through the origin.' },
    { say: 'Shaft torque is a little lower, because part of the torque is used up by iron and friction losses.' },
    {
      say: 'Check the straight line.',
      ask: {
        tag: 'Quick check',
        q: 'In a shunt motor the armature current doubles. The armature torque…',
        options: ['doubles', 'becomes four times', 'stays the same'],
        answer: 0,
        why: 'φ is constant, so Ta ∝ Ia: double the current, double the torque.',
      },
    },
    { say: 'Speed is proportional to V minus Ia Ra. The Ia Ra drop is small, so the speed falls only a few percent from no load to full load.' },
    { say: 'Speed against torque looks the same: nearly flat. That is why the shunt motor is called a constant-speed motor.' },
    { say: 'The drop is measured by speed regulation: no-load speed minus full-load speed, divided by the full-load speed, times one hundred.' },
    {
      say: 'Try one.',
      ask: {
        tag: 'Quick check',
        q: 'A shunt motor runs at 1000 rpm on no load and 960 rpm on full load. Its speed regulation is…',
        options: ['≈ 4.17%', '4%', '40%'],
        answer: 0,
        why: '(1000 − 960)/960 × 100 ≈ 4.17%. Dividing by the no-load speed instead gives 4%, the usual mistake.',
      },
    },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1, 3)}>
        <Title>Ta – Ia</Title>
        <Axes xLabel="Ia" yLabel="Torque" />
        <Curve d={path(shuntT)} color={C.blue} className={s.on(1)} />
        <Lbl x={X(0.95)} y={Y(0.9) - 8} color={C.blue} anchor="end">Ta</Lbl>
        <g className={s.on(2)}>
          <Curve d={path(shuntTsh, 0.067)} color={C.green} w={2.4} className={s.on(2)} />
          <Lbl x={X(1)} y={Y(0.8) + 16} color={C.green} anchor="end">Tsh</Lbl>
        </g>
      </g>
      <g className={s.on(4, 4)}>
        <Title>N – Ia</Title>
        <Axes xLabel="Ia" yLabel="Speed N" />
        <Curve d={path(shuntN)} color={C.blue} className={s.on(4)} />
        <Lbl x={X(0.05)} y={Y(0.8) - 8} color={C.blue}>N₀</Lbl>
        <Lbl x={X(0.95)} y={Y(0.7) - 8} color={C.blue} anchor="end">small droop</Lbl>
      </g>
      <g className={s.on(5)}>
        <Title>N – T</Title>
        <Axes xLabel="Torque" yLabel="Speed N" />
        <Curve d={path(shuntN)} color={C.blue} className={s.on(5)} />
        <Lbl x={X(0.95)} y={Y(0.7) - 8} color={C.blue} anchor="end">nearly constant speed</Lbl>
      </g>
    </>
  ),
  board: [
    { at: 0, until: 0, kind: 'eq', node: <>Ta ∝ φ·Ia &nbsp;&nbsp; N ∝ Eb/φ</> },
    { at: 6, kind: 'eq', node: <>% speed regulation = (N₀ − N_fl) / N_fl × 100</> },
  ],
});

const series = video('Series motor characteristics', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Now the series motor. The field carries the armature current, so the flux grows with Ia, until the iron saturates.' },
    { say: 'Torque is phi times Ia, and phi is proportional to Ia. So torque goes as Ia squared: a parabola. This gives a huge starting torque.' },
    { say: 'After saturation, phi stops growing, so torque becomes proportional to Ia again, and the curve straightens out.' },
    {
      say: 'Check the square law.',
      ask: {
        tag: 'Quick check',
        q: 'Below saturation, a series motor’s current doubles. Its torque becomes…',
        options: ['four times', 'twice', 'half'],
        answer: 0,
        why: 'Ta ∝ φ·Ia ∝ Ia·Ia = Ia². Doubling Ia multiplies the torque by 2² = 4.',
      },
    },
    { say: 'Speed is proportional to Eb over phi, roughly V over Ia. So speed against current is a rectangular hyperbola, and speed against torque falls the same way.' },
    { say: 'As load is removed, Ia and phi shrink and the speed shoots up. Near no load it becomes dangerously high.' },
    {
      say: 'This is a classic IOE question.',
      ask: {
        tag: 'IOE 2067 Mangsir · 2065 Chaitra · 2068 Bhadra',
        q: 'Why must a DC series motor never be started (or run) at no load?',
        options: [
          'Ia and φ are tiny, so N ∝ 1/φ rises to a dangerous value',
          'It produces no torque at no load',
          'Its series field would burn out',
        ],
        answer: 0,
        why: 'At no load Ia is very small, so φ is very small and the speed races. Centrifugal force can burst the armature. (2068 Bhadra’s “should always be started at no load” is FALSE.)',
      },
    },
    { say: 'So a series motor is always coupled or geared directly to its load, never belt driven, because a belt can slip off.' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1, 3)}>
        <Title>Ta – Ia</Title>
        <Axes xLabel="Ia" yLabel="Torque" />
        <Curve d={path(seriesT, 0, 0.45)} color={C.red} className={s.on(1)} />
        <Lbl x={X(0.3)} y={Y(0.2) - 10} color={C.red} anchor="end">∝ Ia²</Lbl>
        <g className={s.on(2)}>
          <Curve d={path(seriesT, 0.45, 1)} color={C.red} className={s.on(2)} />
          <Lbl x={X(0.98)} y={Y(seriesT(0.98)) + 18} color={C.red} anchor="end">∝ Ia (saturated)</Lbl>
        </g>
      </g>
      <g className={s.on(4)}>
        <Title>N – Ia</Title>
        <Axes xLabel="Ia" yLabel="Speed N" />
        <Curve d={path(seriesN, 0.13)} color={C.red} className={s.on(4)} />
        <g className={s.on(5) + s.hl(5)}>
          <rect x={X(0)} y={Y(1.05)} width={X(0.2) - X(0)} height={Y(0.65) - Y(1.05)} fill={C.red} opacity={0.12} />
          <Lbl x={X(0.22)} y={Y(0.92)} color={C.red}>runaway at no load!</Lbl>
        </g>
      </g>
    </>
  ),
  board: [
    { at: 1, kind: 'step', node: <>Before saturation: φ ∝ Ia ⟹ Ta ∝ Ia²</> },
    { at: 4, kind: 'step', node: <>N ∝ Eb/φ ≈ V/Ia ⟹ N ∝ 1/Ia</> },
    { at: 4, kind: 'step', node: <>N–T: T ∝ Ia² ⟹ N ∝ 1/√T (high torque at low speed)</> },
  ],
});

const compound = video('Compound motors and where each motor is used', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'A cumulative compound motor has both fields, and the series flux adds to the shunt flux.' },
    { say: 'Its speed curve sits between the shunt and the series motor: good starting torque, but a safe, definite no-load speed.' },
    { say: 'In a differential compound motor the series flux opposes the shunt flux. It is unstable, so it is rarely used.' },
    { say: 'Shunt motors give nearly constant speed: lathes, fans, blowers, centrifugal pumps and paper-making machines.' },
    { say: 'Series motors give high starting torque: electric traction, cranes and hoists. Small series motors that also run on AC are universal motors, used in vacuum cleaners.' },
    { say: 'Cumulative compound motors handle sudden heavy loads with a flywheel: shears, punching presses, rolling mills and elevators.' },
    {
      say: 'Here is the IOE version.',
      ask: {
        tag: 'IOE 2067 Mangsir',
        q: 'Suitable motor for: electric traction, vacuum cleaner, paper making, shearing and punching?',
        options: [
          'Series · series (universal) · shunt · cumulative compound',
          'Shunt · series · series · shunt',
          'Series · shunt · cumulative compound · shunt',
        ],
        answer: 0,
        why: 'Traction needs huge starting torque (series); a vacuum cleaner uses a small series/universal motor; paper making needs steady speed (shunt); shears and punches take sudden heavy loads with a flywheel (cumulative compound).',
      },
    },
  ],
  draw: (s) => (
    <>
      <Title>N – Ia</Title>
      <Axes xLabel="Ia" yLabel="Speed N" />
      <Curve d={path(shuntN)} color={C.blue} w={2.2} className={s.on(0)} />
      <Lbl x={X(1)} y={Y(0.7) - 8} color={C.blue} anchor="end">shunt</Lbl>
      <Curve d={path(seriesN, 0.13)} color={C.red} w={2.2} className={s.on(0)} />
      <Lbl x={X(1)} y={Y(0.13) - 8} color={C.red} anchor="end">series</Lbl>
      <g className={s.on(1) + s.hl(1)}>
        <Curve d={path(compoundN)} color={C.green} className={s.on(1)} />
        <Lbl x={X(0.62)} y={Y(compoundN(0.62)) + 18} color={C.green}>cumulative compound</Lbl>
      </g>
    </>
  ),
  board: [
    { at: 3, kind: 'step', node: <><span className="bl">Shunt</span>: lathe, fan, blower, centrifugal pump, paper making</> },
    { at: 4, kind: 'step', node: <><span className="r">Series</span>: traction, crane, hoist · universal: vacuum cleaner</> },
    { at: 5, kind: 'step', node: <><span className="g">Cumulative compound</span>: shears, punching press, rolling mill, elevator</> },
  ],
});

const shuntNumerical = solve({
  title: 'Solve with me: shunt motor speed',
  paper: '2071 Magh Q4(b)',
  marks: '6 marks',
  read: 'A DC shunt motor runs at 600 rpm taking 60 amperes from a 230 volt supply. Armature resistance is 0.2 ohm and field resistance is 115 ohm. Find the speed when the armature current is 30 amperes.',
  question: (
    <>
      A DC shunt motor runs at <D>600 rpm</D> taking <D>60 A</D> from a <D>230 V</D> supply. Armature resistance is <D>0.2 Ω</D> and field
      resistance is <D>115 Ω</D>. Find the speed when the armature current is <D>30 A</D>.
    </>
  ),
  given: [
    { node: <>V = 230 V</>, say: 'Supply 230 volts' },
    { node: <>IL₁ = 60 A (line current!)</>, say: '60 amperes taken from the supply, which is the line current' },
    { node: <>N₁ = 600 rpm</>, say: 'speed 600 rpm' },
    { node: <>Ra = 0.2 Ω, Rsh = 115 Ω</>, say: 'Ra 0.2 ohm and Rsh 115 ohm' },
    { node: <>Ia₂ = 30 A</>, say: 'and a new armature current of 30 amperes' },
  ],
  find: { node: <>new speed N₂</>, say: 'They want the new speed, N2.' },
  idea: { node: <>Shunt ⟹ φ constant ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'It is a shunt motor, so the flux is constant and speed is proportional to back EMF. We need both back EMFs.' },
  steps: [
    { node: <>Ish = 230 / 115 = 2 A ⟹ Ia₁ = 60 − 2 = 58 A</>, say: 'Field current is 230 over 115, which is 2 amperes. So the first armature current is 58 amperes.' },
    {
      node: <>Eb₁ = 230 − 58 × 0.2 = ?</>,
      say: 'Now the first back EMF.',
      ask: {
        tag: 'Your step',
        q: 'Eb₁ = 230 − 58 × 0.2 = ?',
        options: ['218.4 V', '218 V', '224 V'],
        answer: 0,
        why: '58 × 0.2 = 11.6 V, and 230 − 11.6 = 218.4 V. (218 V comes from using the 60 A line current.)',
      },
    },
    { node: <>Eb₁ = 218.4 V · Eb₂ = 230 − 30 × 0.2 = 224 V</>, say: 'Eb1 is 218.4 volts. At 30 amperes, Eb2 is 230 minus 6, which is 224 volts.' },
    { node: <>N₂ = 600 × 224 / 218.4</>, say: 'So N2 equals 600 times 224 over 218.4.' },
  ],
  answer: { node: <>N₂ ≈ 615.4 rpm</>, say: 'The new speed is about 615.4 rpm. Less current, slightly higher speed: typical shunt behaviour.' },
  trap: { node: <>Trap: using 60 A as Ia. Subtract Ish first.</>, say: 'The common trap is using the 60 amperes as the armature current. Always subtract the field current first.' },
});

const seriesNumerical = solve({
  title: 'Solve with me: series motor current',
  paper: '2069 Bhadra · 2066 Magh',
  marks: '8 marks',
  read: 'A DC series motor with armature resistance 0.06 ohm and field resistance 0.04 ohm is supplied from 220 volts. It draws 25 amperes at 1200 rpm. Calculate the current drawn at 800 rpm.',
  question: (
    <>
      A DC series motor with armature resistance <D>0.06 Ω</D> and field winding resistance <D>0.04 Ω</D> is supplied by a <D>220 V</D> source. If it
      draws <D>25 A</D> when running at <D>1200 rpm</D>, calculate the current drawn when running at <D>800 rpm</D>.
    </>
  ),
  given: [
    { node: <>V = 220 V</>, say: 'Supply 220 volts' },
    { node: <>Ra + Rse = 0.06 + 0.04 = 0.1 Ω</>, say: 'total resistance 0.1 ohm' },
    { node: <>I₁ = 25 A at N₁ = 1200 rpm</>, say: '25 amperes at 1200 rpm' },
    { node: <>N₂ = 800 rpm, no saturation</>, say: 'and a new speed of 800 rpm, with no saturation' },
  ],
  find: { node: <>new current I₂</>, say: 'They want the new current, I2. Both Eb2 and the flux depend on it.' },
  idea: { node: <>Series, unsaturated ⟹ φ ∝ I ⟹ N₂/N₁ = (Eb₂/Eb₁) × (I₁/I₂)</>, say: 'In a series motor the flux is proportional to the current, so the speed ratio has an extra I1 over I2 term.' },
  steps: [
    { node: <>Eb₁ = 220 − 25 × 0.1 = 217.5 V · Eb₂ = 220 − 0.1·I₂</>, say: 'Eb1 is 220 minus 2.5, which is 217.5 volts. Eb2 is 220 minus 0.1 I2.' },
    {
      node: <>800/1200 = [(220 − 0.1 I₂)/217.5] × ( ? )</>,
      say: 'Write the speed ratio.',
      ask: {
        tag: 'Your step',
        q: 'What goes in the bracket for a series motor without saturation?',
        options: ['25 / I₂', 'I₂ / 25', '1'],
        answer: 0,
        why: 'N ∝ Eb/φ and φ ∝ I, so φ₁/φ₂ = I₁/I₂ = 25/I₂. Using 1 would treat it like a shunt motor.',
      },
    },
    { node: <>800/1200 = [(220 − 0.1 I₂)/217.5] × (25/I₂)</>, say: 'So 800 over 1200 equals 220 minus 0.1 I2, over 217.5, times 25 over I2.' },
    { node: <>145 I₂ = 5500 − 2.5 I₂ ⟹ 147.5 I₂ = 5500</>, say: 'Cross-multiply: two thirds of 217.5 is 145, so 145 I2 equals 5500 minus 2.5 I2.' },
  ],
  answer: { node: <>I₂ = 5500 / 147.5 ≈ 37.3 A</>, say: 'So I2 is about 37.3 amperes. The slower series motor is carrying more load, so it draws more current.' },
  trap: { node: <>Trap: N₂/N₁ = Eb₂/Eb₁ alone (that’s the shunt formula).</>, say: 'The common trap is forgetting that the flux changes. That shunt formula gives a wrong answer here.' },
});

export const ch6 = {
  title: 'Performance characteristics',
  syllabus: 'Unit 4 · Performance characteristics of DC motors',
  steps: [
    shunt,
    series,
    compound,
    shuntNumerical,
    seriesNumerical,
    model({
      q: 'Explain torque–armature current and speed–torque characteristics of DC shunt and DC series motors.',
      papers: ['2070 Magh'],
      marks: '[8]',
      points: [
        <>Start from the two relations: <b>Ta ∝ φ·Ia</b> and <b>N ∝ Eb/φ = (V − IaRa)/φ</b>.</>,
        <><b>Shunt, Ta–Ia</b>: φ is constant, so Ta ∝ Ia, a straight line through the origin. Shaft torque Tsh lies slightly below it (lost torque).</>,
        <><b>Shunt, N–Ia and N–T</b>: IaRa is small, so the speed droops only slightly (about 5–15%). It is a nearly constant-speed motor.</>,
        <><b>Series, Ta–Ia</b>: φ ∝ Ia, so Ta ∝ Ia² (a parabola) before saturation, and Ta ∝ Ia after saturation. Very high starting torque.</>,
        <><b>Series, N–Ia and N–T</b>: N ∝ 1/Ia, a rectangular hyperbola. High torque at low speed, and a dangerously high speed at light load, so never start it at no load.</>,
        <>Sketch all four curves with labelled axes, then conclude with applications: shunt for constant-speed drives, series for traction and cranes.</>,
      ],
      tip: 'Label the axes and mark the saturation bend on the series Ta–Ia curve. “Never at no load” is also asked alone (2067 Mangsir, 2065 Chaitra, 2068 Bhadra).',
    }),
    hook('Shunt: Steady speed · Series: Strong start, never Solo', [
      'Shunt: Ta ∝ Ia (line), N nearly constant.',
      'Series: Ta ∝ Ia² (parabola), N ∝ 1/Ia (hyperbola), never at no load.',
      'Speed ratios: shunt N₂/N₁ = Eb₂/Eb₁; series multiply by I₁/I₂.',
    ]),
  ],
};
