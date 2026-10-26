import { C, Coil, Resistor, hook, model, video } from './kit.jsx';

/* Chapter 7 · Starting: 3-point & 4-point starters (Syllabus Unit 4: Starting of DC motors). */

const whyStarter = video('Why does a DC motor need a starter?', {
  beats: [
    { say: 'Why does a DC motor need a starter? Look at the armature current.' },
    { say: 'The armature current is the supply voltage minus the back EMF, divided by the armature resistance.' },
    { say: 'At the instant of starting the armature is still, so N is zero and the back EMF is zero. The current becomes V over Ra.' },
    {
      say: 'Try it with real numbers.',
      ask: {
        tag: 'IOE 2079 Jestha · 2068 Magh · 2066 Magh',
        q: 'Why does a DC motor draw a large current at starting? A 220 V motor has Ra = 0.5 Ω. What current flows if it is switched on directly?',
        options: ['440 A', '20 A', '110 A', '0.5 A'],
        answer: 0,
        why: 'With Eb = 0, Ia = V/Ra = 220/0.5 = 440 A.',
      },
    },
    { say: 'Four hundred and forty amperes is about twenty-two times a full-load current of twenty amperes.' },
    { say: 'That burns the commutator and brushes, overheats the winding, jerks the shaft, and pulls down the supply voltage for everyone else.' },
    { say: 'A starter adds resistance R in series with the armature at start. Then the starting current is V over Ra plus R, so R equals V over the allowed current, minus Ra.' },
    {
      say: 'Now size a starter.',
      ask: {
        tag: 'Quick check',
        q: 'A 220 V motor has Ra = 0.4 Ω and a full-load current of 25 A. Limit the starting current to twice full load. Starter resistance?',
        options: ['4 Ω', '4.4 Ω', '8.8 Ω', '0.4 Ω'],
        answer: 0,
        why: 'Ist = 50 A, so the total resistance is 220/50 = 4.4 Ω. The starter adds 4.4 − 0.4 = 4 Ω.',
      },
    },
    { say: 'As the motor speeds up, the back EMF rises and limits the current by itself, so the resistance is cut out step by step.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Why a starter?</> },
    { at: 1, kind: 'eq', node: <>Ia = (V − Eb) / Ra</> },
    { at: 2, kind: 'step', node: <>At start: N = 0 → Eb = 0 → <span className="y">Ia = V / Ra</span></> },
    { at: 4, kind: 'step', node: <>220 / 0.5 = 440 A ≈ <span className="r">22 × rated 20 A</span></> },
    { at: 5, kind: 'step', node: <>→ sparking at commutator & brushes · overheated winding · torque jerk · supply dip</> },
    { at: 6, kind: 'eq', node: <>Ist = V / (Ra + R) ⟹ R = V / Ist − Ra</> },
    { at: 8, kind: 'note', node: <>Eb ∝ N builds up with speed, so R is cut out stud by stud.</> },
  ],
});

/* 3-point starter schematic: pivot at (180,175), handle 110 long, angles in degrees from vertical. */
const PIVOT = { x: 180, y: 175 };
const STUDS = [-50, -30, -10, 10, 30];
const RUN = 50;
const pt = (deg, r = 110) => ({ x: PIVOT.x + r * Math.sin((deg * Math.PI) / 180), y: PIVOT.y - r * Math.cos((deg * Math.PI) / 180) });
const HANDLE = [-70, -70, -50, -50, -10, RUN, RUN, -70, -70];

function arc(r, a1, a2) {
  const p1 = pt(a1, r);
  const p2 = pt(a2, r);
  return `M${p1.x} ${p1.y} A${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
}

const threePoint = video('The 3-point starter', {
  viewBox: '0 0 360 220',
  tall: true,
  beats: [
    { say: 'This is a 3-point starter, named after its three terminals: L for line, F for field, and A for armature.' },
    { say: 'Line current enters at L, passes through the overload release coil, and reaches the handle.' },
    { say: 'Move the handle to stud one. All the starting resistance is now in series with the armature, and the field gets full voltage through the brass arc.' },
    {
      say: 'Pause here.',
      ask: {
        q: 'Why should the field be at full strength while starting?',
        options: ['For maximum torque per ampere, so the motor starts quickly', 'To keep the speed at zero', 'To heat up the starting resistance'],
        answer: 0,
        why: 'Ta ∝ φIa. With full φ, the limited starting current still gives a strong starting torque.',
      },
    },
    { say: 'As the motor speeds up, back EMF builds and the current falls. Then move to the next stud, cutting out one section of resistance.' },
    { say: 'Stud by stud, all the resistance is cut out. At RUN, the soft-iron handle is held by the no-volt coil, which is in series with the field.' },
    {
      say: 'Now the supply suddenly fails.',
      ask: {
        q: 'The supply fails while the motor is running. What does the handle do?',
        options: ['Springs back to OFF', 'Stays at RUN', 'Moves back to stud 1 only'],
        answer: 0,
        why: 'The NVC loses its magnetism and the spring pulls the handle to OFF. When power returns, the motor cannot restart without its resistance.',
      },
    },
    { say: 'Right. The no-volt coil lets go and the spring returns the handle home to OFF. An open field circuit does the same, so the motor can never run away without field.' },
    { say: 'On overload, the overload release lifts its iron piece and short-circuits the no-volt coil. The handle is released to OFF again.' },
  ],
  draw: (s) => {
    const deg = HANDLE[s.beat];
    const nvc = pt(RUN + 9, 118);
    return (
      <>
        <g className={s.on(0)}>
          {/* resistance between studs */}
          {STUDS.slice(0, -1).map((a, i) => {
            const p1 = pt(a);
            const p2 = pt(STUDS[i + 1]);
            return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.orange} strokeWidth={2} strokeDasharray="3 3" />;
          })}
          {STUDS.map((a, i) => {
            const p = pt(a);
            return (
              <g key={a}>
                <circle cx={p.x} cy={p.y} r={6} fill={C.board} stroke={C.chalk} strokeWidth={2} />
                <text x={pt(a, 128).x} y={pt(a, 128).y + 4} textAnchor="middle" fontSize={10} fill={C.dim}>{i + 1}</text>
              </g>
            );
          })}
          <text x={pt(-72, 128).x - 6} y={pt(-72, 128).y} textAnchor="end" fontSize={11} fill={C.dim}>OFF</text>
          <text x={pt(RUN, 128).x - 4} y={pt(RUN, 128).y - 6} fontSize={11} fill={C.dim}>RUN</text>
          <text x={180} y={56} textAnchor="middle" fontSize={11} fill={C.orange}>starting resistance</text>
          {/* terminals */}
          {[['L', 30], ['F', 180], ['A', 330]].map(([t, x]) => (
            <g key={t}>
              <circle cx={x} cy={208} r={8} fill={C.board} stroke={C.yellow} strokeWidth={2} />
              <text x={x} y={212} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.yellow}>{t}</text>
            </g>
          ))}
          {/* last stud → A */}
          <path d={`M${pt(30).x + 6} ${pt(30).y} L330 ${pt(30).y} L330 200`} fill="none" stroke={C.dim} strokeWidth={1.6} />
          <text x={334} y={150} fontSize={10} fill={C.dim}>to armature</text>
        </g>
        {/* line path: L → OLR → pivot */}
        <g className={s.on(1) + s.hl(1) + s.hl(8)}>
          <path d={`M30 200 L30 175 L110 175`} fill="none" stroke={C.dim} strokeWidth={1.6} />
          <Coil x={110} y={175} len={44} turns={4} color={C.red} />
          <line x1={154} y1={175} x2={PIVOT.x} y2={PIVOT.y} stroke={C.dim} strokeWidth={1.6} />
          <text x={132} y={196} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.red}>OLR</text>
        </g>
        {/* brass arc → NVC → F */}
        <g className={s.on(2) + s.hl(2)}>
          <path d={arc(88, -50, RUN)} fill="none" stroke={C.orange} strokeWidth={4} strokeLinecap="round" />
          <text x={180} y={102} textAnchor="middle" fontSize={10.5} fill={C.orange}>brass arc</text>
          <path d={`M${pt(-50, 88).x} ${pt(-50, 88).y} L${pt(-50, 88).x} 150 L180 150 L180 200`} fill="none" stroke={C.orange} strokeWidth={1.4} strokeDasharray="4 3" opacity={0.7} />
        </g>
        <g className={s.on(5) + s.hl(5) + s.hl(7)}>
          <rect x={nvc.x - 4} y={nvc.y - 12} width={30} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={nvc.x + 11} y={nvc.y + 4} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
          <text x={nvc.x + 11} y={nvc.y + 26} textAnchor="middle" fontSize={9} fill={C.dim}>in series with field</text>
        </g>
        {/* handle */}
        <g style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${PIVOT.x}px ${PIVOT.y}px`, transformBox: 'view-box', transition: 'transform 1.1s ease' }}>
          <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - 112} stroke={C.chalk} strokeWidth={5} strokeLinecap="round" />
          <circle cx={PIVOT.x} cy={PIVOT.y - 112} r={6} fill={C.yellow} />
        </g>
        <circle cx={PIVOT.x} cy={PIVOT.y} r={7} fill={C.chalk} />
        <text x={16} y={22} fontSize={12} fontWeight={700} fill={s.at(7) ? C.red : C.dim} className={s.on(7)}>supply failed → spring → OFF</text>
        <text x={16} y={22} fontSize={12} fontWeight={700} fill={C.red} className={s.on(8)}>overload → OLR shorts NVC → OFF</text>
      </>
    );
  },
});

const fourPoint = video('The 4-point starter', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'The 3-point starter has one weakness. Watch what happens when we use field control to raise the speed.' },
    { say: 'To raise the speed, we add a rheostat in the field circuit, which lowers the field current.' },
    {
      say: 'Think about the no-volt coil.',
      ask: {
        q: 'In a 3-point starter the NVC is in series with the field. What happens when the field current is reduced a lot?',
        options: ['The NVC weakens and may release the handle, stopping the motor', 'The NVC gets stronger', 'Nothing changes'],
        answer: 0,
        why: 'Less field current means less NVC current. The handle can drop back to OFF when you only wanted more speed.',
      },
    },
    { say: 'So the 3-point starter is unsuitable for wide speed control by field weakening.' },
    { say: 'The 4-point starter fixes this. The no-volt coil is taken out of the field circuit and connected straight across the supply, through a protective resistance.' },
    { say: 'That extra supply connection is the fourth terminal. Now the field rheostat does not affect the no-volt coil at all.' },
    {
      say: 'Check yourself.',
      ask: {
        tag: 'Quick check',
        q: 'The main advantage of a 4-point starter over a 3-point starter is that…',
        options: ['changing the field current for speed control does not affect the NVC', 'it needs no starting resistance', 'it also works as a brake'],
        answer: 0,
        why: 'The NVC is across the supply, independent of the field, so field-weakening speed control is safe.',
      },
    },
    { say: 'Its catch: if the field circuit opens, the no-volt coil still holds the handle, so a 4-point starter gives no open-field protection.' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0)}>
        <text x={90} y={22} textAnchor="middle" fontSize={14} fontWeight={800}>3-point</text>
        <line x1={20} y1={40} x2={160} y2={40} stroke={C.chalk} strokeWidth={2} />
        <text x={14} y={44} textAnchor="end" fontSize={11} fill={C.dim}>+</text>
        <line x1={20} y1={190} x2={160} y2={190} stroke={C.chalk} strokeWidth={2} />
        <text x={14} y={194} textAnchor="end" fontSize={11} fill={C.dim}>−</text>
        <line x1={30} y1={40} x2={30} y2={90} stroke={C.dim} strokeWidth={1.6} />
        <g className={s.hl(1)}>
          <Resistor x1={30} y={90} x2={82} label="field rheostat" labelColor={C.orange} color={C.orange} />
        </g>
        <g className={s.hl(2)}>
          <rect x={88} y={78} width={34} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={105} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
        </g>
        <line x1={122} y1={90} x2={140} y2={90} stroke={C.dim} strokeWidth={1.6} />
        <Coil x={140} y={90} len={70} turns={5} vertical color={C.violet} />
        <text x={124} y={140} textAnchor="end" fontSize={11} fill={C.violet}>field</text>
        <line x1={140} y1={160} x2={140} y2={190} stroke={C.dim} strokeWidth={1.6} />
        <text x={90} y={212} textAnchor="middle" fontSize={10.5} fill={C.red} className={s.on(2, 3)}>NVC current falls with Ish</text>
      </g>
      <g className={s.on(4)}>
        <text x={270} y={22} textAnchor="middle" fontSize={14} fontWeight={800}>4-point</text>
        <line x1={200} y1={40} x2={345} y2={40} stroke={C.chalk} strokeWidth={2} />
        <line x1={200} y1={190} x2={345} y2={190} stroke={C.chalk} strokeWidth={2} />
        <g className={s.hl(4) + s.hl(5)}>
          <line x1={210} y1={40} x2={210} y2={78} stroke={C.green} strokeWidth={1.6} />
          <rect x={196} y={78} width={34} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={213} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
          <line x1={213} y1={102} x2={213} y2={118} stroke={C.green} strokeWidth={1.6} />
          <Resistor x1={213} y={118} x2={263} vertical color={C.green} />
          <line x1={213} y1={168} x2={213} y2={190} stroke={C.green} strokeWidth={1.6} />
          <text x={226} y={150} fontSize={10} fill={C.green}>protective R</text>
        </g>
        <line x1={290} y1={40} x2={290} y2={70} stroke={C.dim} strokeWidth={1.6} />
        <Resistor x1={290} y={70} x2={330} vertical color={C.orange} />
        <text x={304} y={92} fontSize={10.5} fill={C.orange}>rheostat</text>
        <Coil x={290} y={110} len={60} turns={4} vertical color={C.violet} />
        <text x={304} y={148} fontSize={10.5} fill={C.violet}>field</text>
        <line x1={290} y1={170} x2={290} y2={190} stroke={C.dim} strokeWidth={1.6} />
        <text x={270} y={212} textAnchor="middle" fontSize={10.5} fill={C.green} className={s.on(5)}>NVC independent of field</text>
      </g>
      <g className={s.on(7) + s.hl(7)}>
        <text x={282} y={186} textAnchor="end" fontSize={18} fontWeight={900} fill={C.red}>✕</text>
        <text x={252} y={176} textAnchor="end" fontSize={10} fill={C.red}>open field: NVC still holds</text>
      </g>
    </>
  ),
});

export const ch7 = {
  title: 'Starting: 3-point & 4-point starters',
  syllabus: 'Unit 4 · Starting of DC motors: 3-point and 4-point starters',
  steps: [
    whyStarter,
    threePoint,
    fourPoint,
    model({
      q: 'What is the necessity of a starter in a DC motor? Describe the working of a 3-point starter with a neat diagram.',
      papers: ['2075 Baisakh', '2074 Bhadra', '2073 Bhadra', '2070 Bhadra', '2068 Magh', '2066 Magh', '2083 Baishakh (ECM)'],
      marks: '[2 + 6]',
      points: [
        <><b>Necessity:</b> Ia = (V − Eb)/Ra. At start N = 0, so Eb = 0 and Ia = V/Ra, which is 15–25 times the rated current because Ra is very small (e.g. 220/0.5 = 440 A). This damages the commutator, brushes and winding and dips the supply, so a resistance must be added at start and cut out as Eb builds up.</>,
        <><b>Diagram:</b> terminals L, F, A; starting resistance divided into sections between studs; handle pivoted and connected to L through the OLR coil; brass arc connected to the field through the NVC; last stud connected to A; spring on the handle.</>,
        <><b>Starting:</b> handle from OFF to stud 1, so the full resistance is in series with the armature while the field gets full voltage through the brass arc (maximum starting torque). As the speed and Eb rise, move stud by stud until all resistance is cut out.</>,
        <><b>NVC (no-volt coil):</b> in series with the field; at RUN it holds the soft-iron handle against the spring. On supply failure or an open field it loses magnetism and the spring returns the handle to OFF.</>,
        <><b>OLR (overload release):</b> in series with the line; on excessive current it attracts an iron piece that short-circuits the NVC, so the handle returns to OFF.</>,
        <><b>Drawback:</b> field weakening for speed control also weakens the NVC and may release the handle. The 4-point starter solves this by connecting the NVC across the supply.</>,
      ],
      tip: 'The diagram carries most of the 6 marks: label L, F, A, studs, brass arc, NVC, OLR and spring clearly.',
    }),
    hook('NVC = No Volts → handle goes home (OFF) · OLR = Over Load → Release', [
      '3 points: L (line), F (field), A (armature). 4-point adds a separate supply terminal for the NVC.',
      'Start with ALL resistance in and FULL field. Cut resistance out as Eb builds.',
      'R_starter = V / I_start − Ra',
    ]),
  ],
};
