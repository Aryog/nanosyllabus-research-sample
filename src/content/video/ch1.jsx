import { Arrow, C, Conductor, Pole, hook, video } from './kit.jsx';

/* Chapter 1 · Force on a conductor (Syllabus Unit 1: force on a current-carrying conductor). */

const fieldLines = [62, 88, 132, 158];

const whyItMoves = video('Why does a wire move in a magnetic field?', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Two magnet poles face each other. The field runs straight across the gap, from N to S.' },
    { say: 'Now a wire carrying current out of the screen, drawn as a dot. The current makes its own circular field around the wire.' },
    {
      say: 'Look at both fields together.',
      ask: {
        q: 'Below the wire the circles point right, the same way as the main field. Above, they point left. Where is the total field stronger?',
        options: ['Below the wire', 'Above the wire', 'The same everywhere'],
        answer: 0,
        why: 'Below, the two fields add. Above, they point opposite ways and partly cancel.',
      },
    },
    { say: 'So the field is crowded below the wire and thin above it. Field lines behave like stretched rubber bands, and they push the wire toward the weak side.' },
    { say: 'The wire is pushed up. This is the motor principle: a current-carrying conductor placed in a magnetic field experiences a force.' },
    { say: 'The size of that force is F equals B I l: flux density, times current, times the length of wire inside the field.' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0)}>
        <Pole x={14} y={40} label="N" color={C.north} />
        <Pole x={302} y={40} label="S" color={C.south} />
        {fieldLines.map((y) => {
          const strong = s.at(3) && y > 110;
          const weak = s.at(3) && y < 110;
          return (
            <Arrow key={y} x1={60} y1={y} x2={300} y2={y} color={strong ? C.yellow : C.blue} w={strong ? 3.4 : 1.8} className={`sc on ${weak ? 'fade' : ''}`} />
          );
        })}
      </g>
      <g className={s.on(1)}>
        <circle cx={180} cy={110} r={28} fill="none" stroke={C.violet} strokeWidth={1.6} strokeDasharray="5 4" />
        <circle cx={180} cy={110} r={42} fill="none" stroke={C.violet} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
        <Arrow x1={186} y1={82} x2={172} y2={82} color={C.violet} w={2} head={8} />
        <Arrow x1={174} y1={138} x2={188} y2={138} color={C.violet} w={2} head={8} />
        <Conductor x={180} y={110} r={13} dir="out" />
      </g>
      <g className={s.on(3)}>
        <text x={240} y={50} fontSize={13} fill={C.dim}>weak</text>
        <text x={240} y={186} fontSize={13} fill={C.yellow} fontWeight={700}>strong</text>
      </g>
      <g className={s.on(4) + s.hl(4)}>
        <Arrow x1={180} y1={92} x2={180} y2={34} color={C.green} w={4} head={12} />
        <text x={192} y={44} fontSize={16} fontWeight={800} fill={C.green}>F</text>
      </g>
    </>
  ),
  board: [
    { at: 4, kind: 'note', node: <>IOE wording: “When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.”</> },
    { at: 5, kind: 'eq', node: <>F = B · I · l</> },
  ],
});

const howBig = video('How big is the push?', {
  beats: [
    { say: 'How big is the push? Three things set it.' },
    { say: 'Flux density B in tesla, current I in amperes, and active length l in metres. The force comes out in newtons.' },
    { say: 'If the wire is tilted at an angle theta to the field, only the perpendicular part of the field pushes. So F equals B I l sine theta.' },
    { say: 'At ninety degrees the force is biggest. Along the field, at zero degrees, there is no force at all.' },
    { say: 'That is why armature conductors are always laid at right angles to the flux.' },
    {
      say: 'Your turn.',
      ask: {
        tag: 'Quick check',
        q: 'A 0.25 m wire carries 10 A at right angles to a 0.6 T field. What is the force?',
        options: ['1.5 N', '15 N', '0.15 N', '2.4 N'],
        answer: 0,
        why: 'F = 0.6 × 10 × 0.25 = 1.5 N.',
      },
    },
    { say: 'Tilt that same wire to thirty degrees, and the force halves, because sine thirty is one half: 0.75 newtons.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>F = B I l sin θ</> },
    { at: 1, kind: 'step', node: <><span className="bl">B</span> flux density (T) · <span className="y">I</span> current (A) · <span className="g">l</span> length in the field (m) · F in N</> },
    { at: 2, kind: 'eq', node: <>F = B I l sin θ</> },
    { at: 3, kind: 'step', node: <>θ = 90° → maximum, F = BIl &nbsp;·&nbsp; θ = 0° → F = 0</> },
    { at: 4, kind: 'note', node: <>Design rule: conductors sit at 90° to the flux.</> },
    { at: 6, kind: 'step', node: <>At 30°: F = 1.5 × sin 30° = <span className="y">0.75 N</span></> },
  ],
});

const fleming = video('Which way? Fleming’s left-hand rule', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Hold up your left hand. Stretch the thumb, first finger and second finger so they are all at right angles.' },
    { say: 'First finger points along the Field, from N to S.' },
    { say: 'Second finger points along the Current.' },
    { say: 'Then the thumb shows the Motion, the direction of the force.' },
    {
      say: 'Check it against the wire we just saw.',
      ask: {
        tag: 'Quick check',
        q: 'Field to the right, current coming toward you. Which way is the force?',
        options: ['Up', 'Down', 'Left', 'Into the screen'],
        answer: 0,
        why: 'First finger right, second finger toward you, and the thumb points up. That matches the wire being pushed up.',
      },
    },
    { say: 'Reverse either the field or the current and the force reverses. Reverse both, and the force goes back to where it was.' },
    {
      say: 'This exact idea is asked in IOE papers.',
      ask: {
        tag: 'IOE 2073 Chaitra · 2069 Bhadra',
        q: '“Explain the working principle of a DC motor.” Which statement is that principle?',
        options: [
          'A current-carrying conductor in a magnetic field experiences a mechanical force',
          'A conductor moving in a magnetic field has an EMF induced in it',
          'A changing current in one coil induces an EMF in the next',
        ],
        answer: 0,
        why: 'That is the motor principle. The second is the generator principle, and the third is how a transformer works.',
      },
    },
  ],
  draw: (s) => (
    <>
      <circle cx={170} cy={130} r={6} fill={C.chalk} className={s.on(0)} />
      <g className={s.on(1) + s.hl(1)}>
        <Arrow x1={170} y1={130} x2={310} y2={130} color={C.blue} w={4} head={12} />
        <text x={250} y={152} fontSize={13} fontWeight={700} fill={C.blue}>First finger · Field</text>
      </g>
      <g className={s.on(2) + s.hl(2)}>
        <Arrow x1={170} y1={130} x2={92} y2={196} color={C.red} w={4} head={12} />
        <text x={20} y={214} fontSize={13} fontWeight={700} fill={C.red}>seCond finger · Current</text>
      </g>
      <g className={s.on(3) + s.hl(3)}>
        <Arrow x1={170} y1={130} x2={170} y2={24} color={C.green} w={4} head={12} />
        <text x={182} y={34} fontSize={13} fontWeight={700} fill={C.green}>thuMb · Motion (force)</text>
      </g>
      <text x={20} y={40} fontSize={26} fontWeight={900} fill={C.yellow} className={s.on(3)}>F · B · I</text>
      <text x={20} y={58} fontSize={11.5} fill={C.dim} className={s.on(3)}>thumb · first · second</text>
    </>
  ),
});

export const ch1 = {
  title: 'Force on a conductor',
  syllabus: 'Unit 1 · Force on a current-carrying conductor',
  steps: [
    whyItMoves,
    howBig,
    fleming,
    hook('Left hand, F-B-I', [
      'thuMb = Motion (Force) · First finger = Field (B) · seCond finger = Current (I)',
      'Motors use the LEFT hand. Generators use the RIGHT hand.',
      'F = BIl sin θ: biggest at 90°, zero along the field.',
    ]),
  ],
};
