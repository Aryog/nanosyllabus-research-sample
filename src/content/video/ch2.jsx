import { Arrow, C, Conductor, Pole, hook, model, video } from './kit.jsx';

/* Chapter 2 · Construction & commutator action (Syllabus Unit 3: constructional details, armature winding, commutator action, EMF equation). */

const CX = 150;
const CY = 115;
const slots = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12 + Math.PI / 12);

// Arc segment of the commutator ring (end view), angles in radians.
function arc(cx, cy, r, a0, a1) {
  const p = (a) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
  return `M${p(a0)} A${r} ${r} 0 0 1 ${p(a1)}`;
}

// Leader label shown on one beat only.
function Label({ s, k, x, y, tx, ty, text, sub }) {
  return (
    <g className={s.on(k, k)}>
      <line x1={x} y1={y} x2={tx - 4} y2={ty - 4} stroke={C.yellow} strokeWidth={1.2} />
      <text x={tx} y={ty} fontSize={13} fontWeight={700} fill={C.yellow}>{text}</text>
      {sub && <text x={tx} y={ty + 15} fontSize={11} fill={C.dim}>{sub}</text>}
    </g>
  );
}

const crossSection = video('Inside a DC machine', {
  viewBox: '0 0 400 230',
  beats: [
    { say: 'This is a cross-section of a two-pole DC machine. The outer frame is the yoke. It holds everything and carries the flux from one pole to the next.' },
    { say: 'Bolted to the yoke are the poles. The wide pole shoe at the end spreads the flux evenly over the armature and supports the field coils.' },
    { say: 'Around each pole sits the field winding. A DC current in it magnetises the poles and produces the flux, phi per pole.' },
    { say: 'In the middle is the armature core, the part that rotates. It is built from thin laminations of silicon steel.' },
    {
      say: 'Why those two choices?',
      ask: {
        tag: 'Quick check',
        q: 'Why is the armature core laminated, and why is it made of silicon steel?',
        options: [
          'Laminations cut eddy-current loss; silicon steel cuts hysteresis loss',
          'Laminations cut hysteresis loss; silicon steel cuts eddy-current loss',
          'Both only make the armature lighter',
        ],
        answer: 0,
        why: 'Thin insulated sheets break up the eddy-current paths (loss ∝ thickness²). Silicon steel has a narrow hysteresis loop, so less hysteresis loss.',
      },
    },
    { say: 'Slots around the core hold the armature conductors. They are joined into coils, which make up the armature winding.' },
    { say: 'On the same shaft is the commutator: copper segments insulated from each other by thin mica, each one joined to coil ends.' },
    { say: 'Finally, fixed carbon brushes press on the commutator. They connect the rotating armature winding to the outside circuit.' },
  ],
  draw: (s) => {
    const part = (k) => (s.beat === k ? 'hl' : '');
    return (
      <>
        <circle cx={CX} cy={CY} r={100} fill="none" stroke={C.dim} strokeWidth={14} className={part(0)} />
        <g className={part(1)}>
          <rect x={132} y={22} width={36} height={34} fill={C.north} opacity={0.85} />
          <rect x={110} y={54} width={80} height={11} rx={5} fill={C.north} />
          <rect x={132} y={174} width={36} height={34} fill={C.south} opacity={0.85} />
          <rect x={110} y={165} width={80} height={11} rx={5} fill={C.south} />
          <text x={150} y={46} textAnchor="middle" fontSize={14} fontWeight={800}>N</text>
          <text x={150} y={198} textAnchor="middle" fontSize={14} fontWeight={800}>S</text>
        </g>
        <g className={part(2)}>
          {[[118, 26], [170, 26], [118, 178], [170, 178]].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={12} height={26} rx={2} fill={C.orange} opacity={0.9} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={44} fill="#343a40" stroke={C.chalk} strokeWidth={1.5} className={part(3) || part(4)} />
        <g className={part(5)}>
          {slots.map((a, i) => (
            <circle key={i} cx={CX + 37 * Math.cos(a)} cy={CY + 37 * Math.sin(a)} r={4.2} fill={C.orange} />
          ))}
        </g>
        <circle cx={CX} cy={CY} r={7} fill={C.dim} />

        <g className={s.on(6)}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={arc(345, 150, 22, (i * Math.PI) / 2 + 0.12, ((i + 1) * Math.PI) / 2 - 0.12)} fill="none" stroke="#e8590c" strokeWidth={9} className={part(6)} />
          ))}
          <circle cx={345} cy={150} r={6} fill={C.dim} />
          <text x={345} y={194} textAnchor="middle" fontSize={11} fill={C.dim}>commutator (end view)</text>
        </g>
        <g className={s.on(7) + s.hl(7)}>
          <rect x={311} y={144} width={11} height={12} fill={C.chalk} />
          <rect x={368} y={144} width={11} height={12} fill={C.chalk} />
          <text x={303} y={136} fontSize={10} fill={C.dim}>+</text>
          <text x={382} y={136} fontSize={10} fill={C.dim}>−</text>
        </g>

        <Label s={s} k={0} x={244} y={80} tx={262} ty={40} text="Yoke" sub="cast iron / steel frame" />
        <Label s={s} k={1} x={190} y={60} tx={262} ty={40} text="Pole + pole shoe" sub="spreads the flux" />
        <Label s={s} k={2} x={182} y={40} tx={262} ty={40} text="Field winding" sub="DC current → flux φ" />
        <Label s={s} k={3} x={180} y={100} tx={262} ty={40} text="Armature core" sub="laminated silicon steel" />
        <Label s={s} k={4} x={180} y={100} tx={262} ty={40} text="Armature core" sub="laminated silicon steel" />
        <Label s={s} k={5} x={184} y={108} tx={262} ty={40} text="Conductors in slots" sub="= armature winding" />
        <Label s={s} k={6} x={330} y={132} tx={262} ty={40} text="Commutator" sub="copper segments + mica" />
        <Label s={s} k={7} x={316} y={142} tx={262} ty={40} text="Carbon brushes" sub="fixed, press on commutator" />
      </>
    );
  },
});

// Coil end-on between the poles; angle in degrees measured counter-clockwise on screen.
function CoilAt({ deg, a = 'in', b = 'out', forces, plain }) {
  const r = 58;
  const t = (-deg * Math.PI) / 180;
  const p1 = [180 + r * Math.cos(t + Math.PI), 110 + r * Math.sin(t + Math.PI)];
  const p2 = [180 + r * Math.cos(t), 110 + r * Math.sin(t)];
  return (
    <g>
      <line x1={p1[0]} y1={p1[1]} x2={p2[0]} y2={p2[1]} stroke={C.dim} strokeWidth={2} strokeDasharray="5 4" />
      <circle cx={180} cy={110} r={4} fill={C.dim} />
      {plain ? (
        <>
          <circle cx={p1[0]} cy={p1[1]} r={10} fill={C.orange} />
          <circle cx={p2[0]} cy={p2[1]} r={10} fill={C.orange} />
        </>
      ) : (
        <>
          <Conductor x={p1[0]} y={p1[1]} dir={a} />
          <Conductor x={p2[0]} y={p2[1]} dir={b} />
        </>
      )}
      {forces && (
        <>
          <Arrow x1={p1[0]} y1={p1[1] + 14} x2={p1[0]} y2={p1[1] + 46} color={C.green} w={3} />
          <Arrow x1={p2[0]} y1={p2[1] - 14} x2={p2[0]} y2={p2[1] - 46} color={C.green} w={3} />
        </>
      )}
    </g>
  );
}

const commutatorAction = video('Commutator action: why it keeps turning', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'A single coil lies flat between the poles. Current goes in on the side near N and comes out on the side near S.' },
    { say: 'The side near N is pushed down and the side near S is pushed up. The two forces twist the coil counter-clockwise. Here the torque is biggest.' },
    { say: 'Now the coil stands upright. The forces still point down and up, but straight through the axle. No lever arm, so zero torque. This is the dead spot.' },
    { say: 'If the current never switched, the coil would drift past upright and the same forces would twist it backwards. It would rock and stop.' },
    { say: 'The fix is the commutator: a split ring turning with the coil, with two fixed brushes. Each time the coil passes upright, the brushes swap segments and the coil current reverses.' },
    { say: 'Now whichever side is near N always carries current inward and is pushed down. The torque never reverses, so the coil keeps spinning one way.' },
    {
      say: 'Count the switches.',
      ask: {
        tag: 'Quick check',
        q: 'With a two-segment commutator, how many times does the coil current reverse in one revolution?',
        options: ['Twice', 'Once', 'Four times', 'Never'],
        answer: 0,
        why: 'The coil passes upright twice per turn, at 90° and 270°, and the current reverses each time.',
      },
    },
    { say: 'Real machines use many coils in slots all round the armature. At every instant most of them are near their best angle, so the torque is smooth with no dead spot.' },
  ],
  draw: (s) => (
    <>
      <Pole x={14} y={40} label="N" color={C.north} />
      <Pole x={302} y={40} label="S" color={C.south} />
      {[70, 150].map((y) => (
        <Arrow key={y} x1={62} y1={y} x2={298} y2={y} color={C.blue} w={1.2} className="sc on" dash="3 6" />
      ))}
      <g className={s.on(0, 1)}>
        <CoilAt deg={0} forces={s.at(1)} />
      </g>
      <g className={s.on(1, 1)}>
        <path d="M180 40 A70 70 0 0 0 110 110" fill="none" stroke={C.yellow} strokeWidth={2} />
        <polygon points="110,110 104,98 118,100" fill={C.yellow} />
        <text x={190} y={36} fontSize={13} fill={C.yellow} fontWeight={700}>max torque</text>
      </g>
      <g className={s.on(2, 2) + s.hl(2)}>
        <CoilAt deg={90} />
        <Arrow x1={180} y1={66} x2={180} y2={20} color={C.green} w={3} />
        <Arrow x1={180} y1={154} x2={180} y2={200} color={C.green} w={3} />
        <text x={200} y={30} fontSize={13} fill={C.yellow} fontWeight={700}>torque = 0</text>
      </g>
      <g className={s.on(3, 3)}>
        <CoilAt deg={110} />
        <text x={196} y={210} fontSize={13} fill={C.red} fontWeight={700}>pulled back ↺</text>
      </g>
      <g className={s.on(4, 4)}>
        <CoilAt deg={90} plain />
        {[0, 1].map((i) => (
          <path key={i} d={arc(180, 110, 20, i * Math.PI + 0.25, (i + 1) * Math.PI - 0.25)} fill="none" stroke="#e8590c" strokeWidth={8} />
        ))}
        <rect x={150} y={104} width={9} height={12} fill={C.chalk} />
        <rect x={201} y={104} width={9} height={12} fill={C.chalk} />
        <text x={180} y={212} textAnchor="middle" fontSize={12} fill={C.yellow}>split ring + brushes reverse the coil current</text>
      </g>
      <g className={s.on(5, 6)}>
        <g className="spin-c" style={{ transformOrigin: '180px 110px', animationDirection: 'reverse' }}>
          <CoilAt deg={0} plain />
        </g>
        <text x={66} y={26} fontSize={12} fill={C.chalk}>near N: always ⊗ → down</text>
        <text x={200} y={212} fontSize={12} fill={C.chalk}>near S: always ⊙ → up</text>
      </g>
      <g className={s.on(7)}>
        <circle cx={180} cy={110} r={62} fill="#343a40" stroke={C.chalk} strokeWidth={1.5} />
        {slots.map((a, i) => (
          <circle key={i} cx={180 + 52 * Math.cos(a)} cy={110 + 52 * Math.sin(a)} r={6} fill={C.orange} />
        ))}
        <text x={180} y={115} textAnchor="middle" fontSize={13} fill={C.chalk}>many coils</text>
      </g>
    </>
  ),
});

const lapWave = video('Lap and wave windings', {
  beats: [
    { say: 'The armature conductors are joined so that, between the brushes, the current splits into a number of parallel paths. We call that number A.' },
    { say: 'In a lap winding, A equals P, the number of poles. Many paths, so it suits large currents at lower voltage.' },
    { say: 'In a wave winding, A is always two, whatever the number of poles. More conductors in series per path, so higher voltage and smaller current.' },
    { say: 'The armature current Ia divides equally between the paths, so each conductor carries Ia divided by A.' },
    {
      say: 'Try it.',
      ask: {
        tag: 'Quick check',
        q: 'A 4-pole, lap-wound armature carries Ia = 40 A. What current flows in each conductor?',
        options: ['10 A', '20 A', '40 A', '160 A'],
        answer: 0,
        why: 'Lap: A = P = 4, so each conductor carries 40 ÷ 4 = 10 A.',
      },
    },
    { say: 'Wind the same machine wave, and A becomes two, so each conductor carries twenty amperes.' },
    { say: 'IOE 2070 Magh and 2069 Bhadra ask exactly this, for a wave-wound generator: find the current in each armature conductor.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Parallel paths, A</> },
    { at: 1, kind: 'step', node: <><span className="y">Lap</span>: A = P → many paths, high current, low voltage</> },
    { at: 2, kind: 'step', node: <><span className="bl">Wave</span>: A = 2 (always) → high voltage, low current</> },
    { at: 3, kind: 'eq', node: <>I<sub>c</sub> = I<sub>a</sub> / A</> },
    { at: 5, kind: 'step', node: <>Wave, same machine: I<sub>c</sub> = 40 / 2 = <span className="y">20 A</span></> },
    { at: 6, kind: 'note', node: <>IOE 2070 Magh · 2069 Bhadra: “current per conductor” in a wave-wound shunt generator.</> },
  ],
});

const emfDerivation = video('Derivation: the EMF equation', {
  tall: true,
  beats: [
    { say: 'Let us derive the EMF equation. P poles, phi webers per pole, Z armature conductors, A parallel paths, and speed N in r p m.' },
    { say: 'In one revolution, a conductor passes under all P poles, so it cuts a total flux of P phi webers.' },
    { say: 'One revolution takes sixty over N seconds.' },
    {
      say: 'Now apply Faraday’s law: EMF equals flux cut divided by time.',
      ask: {
        tag: 'Mid-derivation',
        q: 'So the EMF induced in one conductor is…',
        options: ['PφN / 60', '60Pφ / N', 'Pφ / N', 'φN / 60'],
        answer: 0,
        why: 'e = Pφ ÷ (60/N) = PφN/60 volts.',
      },
    },
    { say: 'EMF per conductor is P phi N over sixty volts.' },
    { say: 'Each parallel path has Z over A conductors in series, and the machine’s EMF is the EMF of one path.' },
    { say: 'Multiply them: E equals P phi Z N over sixty A. The same equation gives the back EMF of a motor.' },
    { say: 'For a given machine P, Z and A are fixed, so E equals k phi N. The EMF is proportional to flux times speed.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>EMF equation</> },
    { at: 0, kind: 'note', node: <>P poles · φ Wb/pole · Z conductors · A paths · N rpm</> },
    { at: 1, kind: 'step', node: <>Flux cut per revolution: dΦ = <span className="y">Pφ</span> Wb</> },
    { at: 2, kind: 'step', node: <>Time per revolution: dt = <span className="y">60 / N</span> s</> },
    { at: 4, kind: 'step', node: <>EMF per conductor: e = dΦ/dt = Pφ ÷ (60/N) = <span className="y">PφN / 60</span> V</> },
    { at: 5, kind: 'step', node: <>Conductors in series per path: <span className="y">Z / A</span></> },
    { at: 6, kind: 'eq', node: <>E = (PφN/60) × (Z/A) = PφZN / 60A</> },
    { at: 7, kind: 'step', node: <>Given machine: E = kφN ⟹ <span className="g">E ∝ φN</span></> },
  ],
});

const emfIoe = video('IOE 2078 Poush Q3(b): using the EMF equation', {
  beats: [
    { say: 'A real IOE question. A 4-pole, lap-wound machine has 300 conductors, fifty slots of six, and fifty milliwebers per pole. It must generate 260.25 volts. Find the speed.' },
    { say: 'Rearrange the EMF equation for speed: N equals sixty A E over P phi Z.' },
    {
      say: 'First, the number of paths.',
      ask: {
        tag: 'IOE 2078 Poush · 2070 Bhadra',
        q: 'For this lap-wound, 4-pole armature, A = ?',
        options: ['4', '2', '1', '300'],
        answer: 0,
        why: 'Lap winding: A = P = 4.',
      },
    },
    { say: 'N equals sixty times four times 260.25, over four times 0.05 times 300. That is 62,460 over sixty: 1041 r p m.' },
    {
      say: 'The paper also asks: what if it were wave wound?',
      ask: {
        tag: 'IOE 2078 Poush · 2070 Bhadra',
        q: 'Same machine, wave wound. What speed gives the same 260.25 V?',
        options: ['520.5 rpm', '1041 rpm', '2082 rpm', '260.25 rpm'],
        answer: 0,
        why: 'Wave: A = 2, so N = 60 × 2 × 260.25 / 60 = 520.5 rpm. Twice the conductors in series per path, so half the speed.',
      },
    },
    { say: 'Where does 260.25 volts come from? It is a long-shunt generator: forty amperes load, one ampere shunt, forty-one through the armature, so E is 250 plus 41 times 0.25.' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>4-pole lap · Z = 300 · φ = 50 mWb · E = 260.25 V</> },
    { at: 1, kind: 'eq', node: <>N = 60·A·E / (P·φ·Z)</> },
    { at: 3, kind: 'step', node: <>N = 60 × 4 × 260.25 / (4 × 0.05 × 300) = 62 460 / 60 = <span className="y">1041 rpm</span></> },
    { at: 4, kind: 'step', node: <>Wave (A = 2): N = <span className="y">520.5 rpm</span></> },
    { at: 5, kind: 'note', node: <>From the circuit: I<sub>L</sub> = 10 kW / 250 V = 40 A, I<sub>sh</sub> = 1 A, I<sub>a</sub> = 41 A, E = 250 + 41 × (0.1 + 0.15) = 260.25 V</> },
  ],
});

export const ch2 = {
  title: 'Construction & commutator action',
  syllabus: 'Unit 3 · Constructional details, armature winding, commutator action, EMF equation',
  steps: [
    crossSection,
    commutatorAction,
    lapWave,
    emfDerivation,
    emfIoe,
    model({
      q: 'Explain the functions of the commutator and carbon brushes in a DC machine.',
      papers: ['2071 Chaitra', '2072 Ashwin', '2081 Ashwin (ECM)', '2082 Bhadra (ECM)'],
      marks: '3–5 marks',
      points: [
        <><b>Commutator, construction:</b> a cylinder of hard-drawn copper segments, insulated from each other by thin mica, mounted on the shaft. Each segment is joined to the ends of armature coils.</>,
        <><b>Commutator in a motor:</b> it reverses the current in each coil as the coil passes the neutral zone, so conductors under a given pole always carry current the same way and the torque stays unidirectional.</>,
        <><b>Commutator in a generator:</b> it converts the alternating EMF induced in the coils into a unidirectional (DC) voltage at the brushes (a mechanical rectifier).</>,
        <><b>Brushes:</b> stationary contacts pressed on the commutator by springs in brush holders. They carry current between the rotating armature and the external circuit.</>,
        <><b>Why carbon:</b> it is self-lubricating and softer than copper, so it wears instead of the commutator, and its contact resistance helps sparkless commutation.</>,
      ],
      tip: 'Draw the split ring with two brushes, and label the segments, mica and brushes. The diagram earns marks.',
    }),
    hook('Lap = Lots of paths · Wave = Two paths', [
      'Lap: A = P (high current) · Wave: A = 2 (high voltage)',
      'E = PφZN / 60A, and for one machine E ∝ φN',
      'Commutator = automatic current reverser → one-way torque',
    ]),
  ],
};
