import { Arrow, C, Conductor, Pole, hook, model, video } from './kit.jsx';

/* Chapter 3 · Working principle & torque equation (Syllabus Unit 4: working principle and torque equation). */

const CX = 180;
const CY = 112;
// Conductor angles (degrees, screen CCW from +x): left half under N, right half under S.
const LEFT = [140, 180, 220];
const RIGHT = [-40, 0, 40];
const pos = (deg, r = 56) => [CX + r * Math.cos((-deg * Math.PI) / 180), CY + r * Math.sin((-deg * Math.PI) / 180)];

const torqueProduction = video('How the armature makes torque', {
  viewBox: '0 0 360 224',
  beats: [
    { say: 'Here is the armature between a north pole on the left and a south pole on the right. The field crosses it from left to right.' },
    { say: 'The commutator makes sure every conductor under the N pole carries current into the screen, shown as crosses, and every conductor under S carries current out, shown as dots.' },
    { say: 'Fleming’s left-hand rule: field to the right and current into the screen gives a force downward. So every conductor on the left is pushed down.' },
    { say: 'On the right the current comes out, so the force is upward.' },
    { say: 'Down on the left and up on the right: all the forces turn the armature the same way, counter-clockwise. Their turning effects add up to the armature torque.' },
    {
      say: 'This is a real IOE question.',
      ask: {
        tag: 'IOE 2079 Jestha',
        q: 'How is unidirectional torque produced in a DC machine when the armature is supplied from a DC source?',
        options: [
          'The commutator reverses each coil’s current as it passes from one pole to the next, so conductors under a given pole always carry current the same way',
          'The DC supply reverses its polarity every half turn',
          'The brushes rotate with the armature',
        ],
        answer: 0,
        why: 'The supply and poles are fixed. The commutator switches each coil as it crosses the neutral zone, so all the forces keep turning the armature one way.',
      },
    },
    { say: 'As a conductor moves from under N to under S, the commutator reverses its current, so its force flips too, and it keeps pushing in the same direction of rotation.' },
  ],
  draw: (s) => (
    <>
      <Pole x={14} y={42} label="N" color={C.north} />
      <Pole x={302} y={42} label="S" color={C.south} />
      {[70, 154].map((y) => (
        <Arrow key={y} x1={62} y1={y} x2={298} y2={y} color={C.blue} w={1.2} className="sc on" dash="3 6" />
      ))}
      <circle cx={CX} cy={CY} r={70} fill="#343a40" stroke={C.chalk} strokeWidth={1.5} className={s.on(0)} />
      <circle cx={CX} cy={CY} r={6} fill={C.dim} />
      <line x1={CX} y1={CY - 76} x2={CX} y2={CY + 76} stroke={C.dim} strokeWidth={1} strokeDasharray="3 4" className={s.on(6)} />
      <text x={CX + 4} y={CY - 80} fontSize={11} fill={C.dim} className={s.on(6)}>neutral zone</text>
      <g className={s.on(1) + s.hl(1)}>
        {LEFT.map((d) => {
          const [x, y] = pos(d);
          return <Conductor key={d} x={x} y={y} dir="in" />;
        })}
        {RIGHT.map((d) => {
          const [x, y] = pos(d);
          return <Conductor key={d} x={x} y={y} dir="out" />;
        })}
      </g>
      <g className={s.on(2) + s.hl(2)}>
        {LEFT.map((d) => {
          const [x, y] = pos(d);
          return <Arrow key={d} x1={x - 18} y1={y + 2} x2={x - 18} y2={y + 30} color={C.green} w={2.6} />;
        })}
      </g>
      <g className={s.on(3) + s.hl(3)}>
        {RIGHT.map((d) => {
          const [x, y] = pos(d);
          return <Arrow key={d} x1={x + 18} y1={y - 2} x2={x + 18} y2={y - 30} color={C.green} w={2.6} />;
        })}
      </g>
      <g className={s.on(4) + s.hl(4)}>
        <path d={`M${CX + 30} ${CY - 22} A36 36 0 1 0 ${CX + 34} ${CY + 14}`} fill="none" stroke={C.yellow} strokeWidth={3} />
        <polygon points={`${CX + 37},${CY + 4} ${CX + 28},${CY + 18} ${CX + 42},${CY + 19}`} fill={C.yellow} />
        <text x={CX} y={CY + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill={C.yellow}>Ta</text>
      </g>
    </>
  ),
  board: [{ at: 4, kind: 'note', node: <>All conductors under N: ⊗ and pushed down. All under S: ⊙ and pushed up. → <b>unidirectional torque</b></> }],
});

const torqueDerivation = video('Derivation: the torque equation', {
  tall: true,
  beats: [
    { say: 'Now the torque equation. Armature radius r, active length l, P poles, phi per pole, Z conductors, A parallel paths, and armature current Ia.' },
    { say: 'The armature current splits equally between the A paths, so each conductor carries Ia over A.' },
    { say: 'The total flux, P phi, spreads over the armature surface, an area of two pi r l. So the average flux density is P phi over two pi r l.' },
    { say: 'Force on one conductor is B I l. Put in B and the conductor current, and the l cancels: P phi Ia over two pi r A.' },
    {
      say: 'Force becomes torque through a lever arm.',
      ask: {
        tag: 'Mid-derivation',
        q: 'The torque from one conductor is its force multiplied by…',
        options: ['r, the armature radius', 'l, the active length', '2πr, the circumference', 'A, the number of paths'],
        answer: 0,
        why: 'The force acts tangentially at the armature surface, a distance r from the shaft.',
      },
    },
    { say: 'Torque from one conductor is F times r. The r cancels too, leaving P phi Ia over two pi A.' },
    { say: 'The commutator makes all Z conductors push the same way, so multiply by Z: Ta equals P phi Z Ia over two pi A.' },
    { say: 'One over two pi is 0.159. So Ta equals 0.159 phi Z Ia times P over A, in newton metres.' },
    { say: 'For a given machine, P, Z and A are fixed. So the armature torque is proportional to flux times armature current.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Torque equation</> },
    { at: 0, kind: 'note', node: <>r radius · l length · P poles · φ Wb/pole · Z conductors · A paths · I<sub>a</sub></> },
    { at: 1, kind: 'step', node: <>Current per conductor: I<sub>c</sub> = <span className="y">I<sub>a</sub> / A</span></> },
    { at: 2, kind: 'step', node: <>Flux density: B = Pφ / (2πrl)</> },
    { at: 3, kind: 'step', node: <>Force per conductor: F = B·I<sub>c</sub>·l = (Pφ/2πrl)(I<sub>a</sub>/A)·l = <span className="y">PφI<sub>a</sub> / (2πrA)</span></> },
    { at: 5, kind: 'step', node: <>Torque per conductor: τ = F·r = <span className="y">PφI<sub>a</sub> / (2πA)</span></> },
    { at: 6, kind: 'step', node: <>All Z conductors: T<sub>a</sub> = PφZI<sub>a</sub> / (2πA)</> },
    { at: 7, kind: 'eq', node: <>T<sub>a</sub> = 0.159 · φ · Z · I<sub>a</sub> · (P/A) N·m</> },
    { at: 8, kind: 'step', node: <>Given machine: <span className="g">T<sub>a</sub> ∝ φ I<sub>a</sub></span></> },
  ],
});

const torqueFactors = video('What decides the torque?', {
  beats: [
    { say: 'IOE 2079 Jestha also asks: what factors affect the torque produced? Read them straight off the equation.' },
    { say: 'Flux per pole, phi. More field current gives more flux, until the iron saturates.' },
    { say: 'Armature current, Ia. This is set by the load: a heavier load draws more current.' },
    { say: 'And the design constants: the number of conductors Z, poles P, and parallel paths A. These are fixed once the machine is built.' },
    {
      say: 'Let us use it.',
      ask: {
        tag: 'Quick check',
        q: 'A 4-pole, lap-wound motor has Z = 480 conductors and φ = 20 mWb. Its armature current is 50 A. What is the armature torque?',
        options: ['≈ 76.3 N·m', '≈ 38.2 N·m', '≈ 152.6 N·m', '≈ 480 N·m'],
        answer: 0,
        why: 'Lap: A = P, so P/A = 1. Ta = 0.159 × 0.02 × 480 × 50 ≈ 76.3 N·m. (152.6 N·m wrongly uses the wave value P/A = 2.)',
      },
    },
    { say: 'Notice the trap: in lap winding P over A is one, but in wave winding it is P over two. The same machine wound wave would give twice the torque per ampere.' },
    {
      say: 'One more.',
      ask: {
        tag: 'Quick check',
        q: 'You double the armature current and halve the flux. The torque…',
        options: ['stays the same', 'doubles', 'halves', 'becomes four times bigger'],
        answer: 0,
        why: 'Ta ∝ φIa: (½φ)(2Ia) = φIa, so the torque is unchanged.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'eq', node: <>T<sub>a</sub> = 0.159 · φ · Z · I<sub>a</sub> · (P/A)</> },
    { at: 1, kind: 'step', node: <><span className="y">φ</span>: flux per pole (field current, saturation)</> },
    { at: 2, kind: 'step', node: <><span className="y">I<sub>a</sub></span>: armature current (set by the load)</> },
    { at: 3, kind: 'step', node: <><span className="y">Z, P, A</span>: design constants (fixed)</> },
    { at: 5, kind: 'note', node: <>Lap: P/A = 1 · Wave: P/A = P/2</> },
  ],
});

export const ch3 = {
  title: 'Working principle & torque equation',
  syllabus: 'Unit 4 · Working principle and torque equation',
  steps: [
    torqueProduction,
    torqueDerivation,
    torqueFactors,
    model({
      q: 'Explain the working principle of a DC motor and derive the equation of torque developed by the armature.',
      papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
      marks: 'ECM 2082 Baishakh [4 + 2]',
      points: [
        <><b>Principle:</b> when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force F = BIl, whose direction is given by Fleming’s left-hand rule.</>,
        <><b>Working:</b> the field winding produces flux; the armature is fed through the brushes and commutator. Conductors under N carry current one way and those under S the other way, so all the forces act in the same rotational sense and produce a torque.</>,
        <><b>Role of the commutator:</b> it reverses the current in each coil as it passes the neutral zone, keeping the torque unidirectional.</>,
        <><b>Derivation:</b> I<sub>c</sub> = I<sub>a</sub>/A; B = Pφ/(2πrl); F = BI<sub>c</sub>l = PφI<sub>a</sub>/(2πrA); torque per conductor = F·r = PφI<sub>a</sub>/(2πA).</>,
        <><b>Result:</b> T<sub>a</sub> = PφZI<sub>a</sub>/(2πA) = 0.159 φZI<sub>a</sub>(P/A) N·m, so T<sub>a</sub> ∝ φI<sub>a</sub>.</>,
        <><b>Consequence:</b> shunt motor (φ constant) T<sub>a</sub> ∝ I<sub>a</sub>; series motor (φ ∝ I<sub>a</sub>) T<sub>a</sub> ∝ I<sub>a</sub>² before saturation.</>,
      ],
      tip: 'Draw the armature between N and S with ⊗ and ⊙ conductors and force arrows. ECM 2082 Baishakh adds “role of back EMF” for 2 marks (see the Back EMF chapter).',
    }),
    hook('Torque needs Flux AND current: Ta ∝ φ Ia', [
      'Ta = 0.159 φ Z Ia (P/A), since 1/2π = 0.159',
      'Commutator → every conductor under one pole pushes the same way',
      'Lap: P/A = 1 · Wave: P/A = P/2',
    ]),
  ],
};
