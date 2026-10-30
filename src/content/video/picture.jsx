import { Armature, Arrow, Axes, C, Coil, Conductor, K, Pole, Source, answer, figAt } from './kit.jsx';

/*
  Big picture model answers, written up on the board as videos (kit.jsx
  `answer`). Same marking-scheme points as the IOE model-answer cards in
  ch3/ch6/ch7/testing.jsx, compressed to what fits a whiteboard line. Each
  has the figure the exam answer needs, built up point by point.
*/

// 4.1, drawn like a textbook figure (skill rule 35): thin black outlines,
// plain ⊗/⊙ conductors, labels on leader lines, a numbered caption. No
// gradients, doodles or emoji. Parts come in on the point that names them.
const INK = { stroke: C.chalk, strokeWidth: 1.3, fill: 'none' };
const cond = (x, y, dir) => (
  <g key={`${x}-${y}`}>
    <circle cx={x} cy={y} r={7} fill={C.board} stroke={C.chalk} strokeWidth={1.2} />
    {dir === 'in' ? (
      <path d={`M${x - 4.5} ${y - 4.5} L${x + 4.5} ${y + 4.5} M${x + 4.5} ${y - 4.5} L${x - 4.5} ${y + 4.5}`} stroke={C.chalk} strokeWidth={1.2} />
    ) : (
      <circle cx={x} cy={y} r={1.8} fill={C.chalk} />
    )}
  </g>
);
const head = (x, y, dir) => {
  const d = { down: `${x - 3.5},${y - 7} ${x + 3.5},${y - 7} ${x},${y}`, up: `${x - 3.5},${y + 7} ${x + 3.5},${y + 7} ${x},${y}`, right: `${x - 7},${y - 3.5} ${x - 7},${y + 3.5} ${x},${y}`, left: `${x + 7},${y - 3.5} ${x + 7},${y + 3.5} ${x},${y}` }[dir];
  return <polygon points={d} fill={C.chalk} />;
};
const leader = (x1, y1, x2, y2, label, anchor = 'start') => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.chalk} strokeWidth={0.8} />
    <circle cx={x1} cy={y1} r={1.4} fill={C.chalk} />
    <text x={x2 + (anchor === 'start' ? 3 : -3)} y={y2 + 4} textAnchor={anchor} fontSize={10.5} fill={C.chalk}>{label}</text>
  </g>
);
const LEFT_C = [[132.5, 95.1], [118, 135], [132.5, 174.9]];
const RIGHT_C = [[227.5, 95.1], [242, 135], [227.5, 174.9]];

export const torqueFigure = (s) => (
  <>
    <g className={s.on(0)}>
      <path d="M14 100 H70 V80 H112 V92.9 A80 80 0 0 0 112 177.1 V190 H70 V170 H14 Z" {...INK} />
      <path d="M346 100 H290 V80 H248 V92.9 A80 80 0 0 1 248 177.1 V190 H290 V170 H346 Z" {...INK} />
      <text x={40} y={141} textAnchor="middle" fontSize={17} fontWeight={700} fill={C.chalk}>N</text>
      <text x={320} y={141} textAnchor="middle" fontSize={17} fontWeight={700} fill={C.chalk}>S</text>
      <circle cx={180} cy={135} r={70} {...INK} strokeWidth={1.6} />
      <circle cx={180} cy={135} r={6} {...INK} />
      {leader(214, 196, 236, 214, 'Armature')}
      {leader(104, 96, 80, 62, 'Pole shoe', 'end')}
      <text x={180} y={266} textAnchor="middle" fontSize={11} fontStyle="italic" fill={C.chalk}>Fig. 1  Forces on the armature conductors</text>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      {[115, 155].map((y) => (
        <g key={y}>
          <line x1={112} y1={y} x2={248} y2={y} stroke={C.chalk} strokeWidth={0.9} strokeDasharray="4 3" />
          {head(184, y, 'right')}
        </g>
      ))}
      <text x={300} y={70} textAnchor="middle" fontSize={10.5} fill={C.chalk}>Field B, N → S</text>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      {LEFT_C.map(([x, y]) => cond(x, y, 'in'))}
      {RIGHT_C.map(([x, y]) => cond(x, y, 'out'))}
      {LEFT_C.map(([x, y]) => (
        <g key={`f${y}`}>
          <line x1={x - 16} y1={y - 8} x2={x - 16} y2={y + 14} stroke={C.chalk} strokeWidth={1.2} />
          {head(x - 16, y + 16, 'down')}
        </g>
      ))}
      {RIGHT_C.map(([x, y]) => (
        <g key={`f${y}`}>
          <line x1={x + 16} y1={y + 8} x2={x + 16} y2={y - 14} stroke={C.chalk} strokeWidth={1.2} />
          {head(x + 16, y - 16, 'up')}
        </g>
      ))}
      <text x={98} y={238} textAnchor="middle" fontSize={10.5} fill={C.chalk}>F ↓ under N</text>
      <text x={262} y={238} textAnchor="middle" fontSize={10.5} fill={C.chalk}>F ↑ under S</text>
    </g>
    <g className={s.on(3) + s.hl(3) + s.hl(6)}>
      <line x1={180} y1={62} x2={180} y2={212} stroke={C.chalk} strokeWidth={0.9} strokeDasharray="6 3 1.5 3" />
      <text x={184} y={58} fontSize={10.5} fill={C.chalk}>MNA</text>
      <path d="M222 78 A62 62 0 0 0 138 78" {...INK} strokeWidth={1.4} />
      {head(138, 78, 'left')}
      <text x={180} y={96} textAnchor="middle" fontSize={12} fontStyle="italic" fill={C.chalk}>Ta</text>
    </g>
    <g className={s.on(4, 5) + s.hl(4)}>
      <circle cx={242} cy={135} r={11} fill="none" stroke={C.chalk} strokeWidth={1} strokeDasharray="2 2" />
      <text x={258} y={124} fontSize={11} fontStyle="italic" fill={C.chalk}>Ic, F</text>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <line x1={180} y1={135} x2={235} y2={135} stroke={C.chalk} strokeWidth={1} />
      <text x={206} y={130} textAnchor="middle" fontSize={11} fontStyle="italic" fill={C.chalk}>r</text>
      <text x={206} y={150} textAnchor="middle" fontSize={10.5} fill={C.chalk}>τ = F·r</text>
    </g>
  </>
);

// Labels are sized for the widest look font (Inter, about 0.6 × font size per
// character) and kept inside the 360-wide figure.
export const backEmfFigure = (s) => (
  <>
    <g className={s.on(0)}>
      {/* Supply V (cell symbol), Ra (box resistor), armature M with Eb. */}
      <path d="M48 50 H120 M170 50 H250 V92 M250 148 V190 H48 V128 M48 112 V50" {...INK} />
      <line x1={36} y1={112} x2={60} y2={112} stroke={C.chalk} strokeWidth={1.6} />
      <line x1={42} y1={128} x2={54} y2={128} stroke={C.chalk} strokeWidth={3} />
      <text x={30} y={110} textAnchor="end" fontSize={11} fill={C.chalk}>+</text>
      <text x={30} y={136} textAnchor="end" fontSize={12} fill={C.chalk}>−</text>
      <text x={18} y={124} textAnchor="end" fontSize={12} fontStyle="italic" fill={C.chalk}>V</text>
      <rect x={120} y={42} width={50} height={16} {...INK} />
      <text x={145} y={36} textAnchor="middle" fontSize={11.5} fontStyle="italic" fill={C.chalk}>Ra</text>
      <circle cx={250} cy={120} r={28} {...INK} strokeWidth={1.5} />
      <text x={250} y={125} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.chalk}>M</text>
      <text x={160} y={214} textAnchor="middle" fontSize={11} fontStyle="italic" fill={C.chalk}>Fig. 2  Armature circuit of a DC motor</text>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <text x={258} y={86} fontSize={11} fill={C.chalk}>+</text>
      <text x={258} y={162} fontSize={12} fill={C.chalk}>−</text>
      <text x={286} y={113} fontSize={12} fontStyle="italic" fill={C.chalk}>Eb</text>
      <text x={286} y={135} fontSize={9.5} fill={C.chalk}>opposes V</text>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      <line x1={70} y1={38} x2={102} y2={38} stroke={C.chalk} strokeWidth={1.1} />
      {head(104, 38, 'right')}
      <text x={70} y={32} fontSize={11.5} fontStyle="italic" fill={C.chalk}>Ia</text>
      <text x={145} y={74} textAnchor="middle" fontSize={10} fill={C.chalk}>IaRa drop</text>
    </g>
    <g className={s.on(3, 4) + s.hl(3)}>
      <text x={135} y={100} textAnchor="middle" fontSize={10} fill={C.chalk}>Load ↑ → N ↓</text>
      <text x={135} y={126} textAnchor="middle" fontSize={10} fill={C.chalk}>→ Eb ↓ → Ia ↑</text>
    </g>
    <g className={s.on(4, 4) + s.hl(4)}>
      <text x={135} y={150} textAnchor="middle" fontSize={10} fill={C.chalk}>Pm = Eb·Ia</text>
    </g>
    <g className={s.on(5, 5) + s.hl(5)}>
      <text x={135} y={100} textAnchor="middle" fontSize={10} fill={C.chalk}>Start: N = 0, Eb = 0</text>
      <text x={135} y={126} textAnchor="middle" fontSize={10} fill={C.chalk}>Ia = V/Ra, very large</text>
    </g>
  </>
);

// 4.2: the four characteristic curves. Top: Ta–Ia. Bottom: N–Ia.
const hyperbola = Array.from({ length: 16 }, (_, i) => {
  const t = 0.22 + (i / 15) * 0.78;
  return `${i ? 'L' : 'M'}${(40 + 235 * t).toFixed(1)} ${(320 - 118 * (0.22 / t)).toFixed(1)}`;
}).join(' ');
const curvesFigure = (s) => (
  <>
    <Axes x={40} y={150} w={250} h={130} xLabel="Armature current Ia" yLabel="Torque Ta" />
    <Axes x={40} y={320} w={250} h={130} xLabel="Armature current Ia" yLabel="Speed N" />
    <text x={60} y={176} fontSize={13} fill={C.dim} className={s.on(1)}>Ta ∝ φIa · N ∝ Eb/φ</text>
    <g className={s.on(2)}>
      <path d="M40 150 L270 55" fill="none" stroke={C.blue} strokeWidth={3} className={`draw${s.hl(2)}`} pathLength={1} />
      <text x={272} y={50} fontSize={13} fill={C.blue}>Shunt</text>
    </g>
    <g className={s.on(3)}>
      <path d="M45 215 L275 232" fill="none" stroke={C.blue} strokeWidth={3} className={`draw${s.hl(3)}`} pathLength={1} />
      <text x={276} y={226} fontSize={13} fill={C.blue}>Shunt</text>
    </g>
    <g className={s.on(4)}>
      <path d="M40 150 Q150 150 200 85 L262 30" fill="none" stroke={C.red} strokeWidth={3} className={`draw${s.hl(4)}`} pathLength={1} />
      <text x={255} y={24} textAnchor="end" fontSize={13} fill={C.red}>Series (Ia²)</text>
    </g>
    <g className={s.on(5)}>
      <path d={hyperbola} fill="none" stroke={C.red} strokeWidth={3} className={`draw${s.hl(5)}`} pathLength={1} />
      <text x={175} y={300} fontSize={13} fill={C.red}>Series (1/Ia)</text>
      <text x={102} y={200} fontSize={12} fill={C.red}>⚠ no load → N dherai high</text>
    </g>
  </>
);

// 4.4: 3-point starter. Studs on an arc round the handle pivot P; the handle
// swings from OFF onto the studs and is held at RUN by the NVC.
const P = [170, 200];
const at = (deg, r) => [P[0] + r * Math.cos((deg * Math.PI) / 180), P[1] - r * Math.sin((deg * Math.PI) / 180)];
const studs = [160, 140, 120, 100, 80, 60];
const starterFigure = (s) => {
  const arc = studs.map((d, i) => `${i ? 'L' : 'M'}${at(d, 110).map((v) => v.toFixed(1)).join(' ')}`).join(' ');
  const [nx, ny] = at(38, 110);
  const [sx, sy] = at(60, 110);
  return (
    <>
      <text x={170} y={18} textAnchor="middle" fontSize={14} fill={C.red} className={`${s.on(1)}${s.hl(1)}`}>Start: Eb = 0 ⟹ Ia = V/Ra = 440 A ⚠</text>
      <g className={s.on(2)}>
        <path d={arc} fill="none" stroke={C.orange} strokeWidth={3} strokeDasharray="2 4" />
        {studs.map((d) => {
          const [x, y] = at(d, 110);
          return <rect key={d} x={x - 6} y={y - 6} width={12} height={12} rx={2} fill={C.board} stroke={C.chalk} strokeWidth={2} />;
        })}
        <text x={at(110, 132)[0]} y={at(110, 132)[1]} textAnchor="middle" fontSize={12} fill={C.orange}>starting R (studs)</text>
        <path d={`M${at(160, 86).join(' ')} A86 86 0 0 1 ${at(42, 86).join(' ')}`} fill="none" stroke="#c9a227" strokeWidth={4} />
        <text x={170} y={128} textAnchor="middle" fontSize={11} fill={C.dim}>brass arc</text>
        {[['L', 50], ['F', 230], ['A', 300]].map(([l, x]) => (
          <g key={l}>
            <circle cx={x} cy={248} r={7} fill={C.board} stroke={C.chalk} strokeWidth={2} />
            <text x={x} y={235} textAnchor="middle" fontSize={13} fontWeight={700}>{l}</text>
          </g>
        ))}
        <path d={`M50 241 L50 222 M50 196 L50 200 L${P[0]} 200`} fill="none" stroke={C.chalk} strokeWidth={2} />
        <path d={`M${sx} ${sy} L300 ${sy} L300 241`} fill="none" stroke={C.chalk} strokeWidth={2} />
        <path d={`M${nx + 12} ${ny} L230 ${ny} L230 241`} fill="none" stroke={C.chalk} strokeWidth={2} />
        <circle cx={P[0]} cy={P[1]} r={5} fill={C.chalk} />
      </g>
      <g style={{ transform: s.at(3) ? 'rotate(122deg)' : 'none', transformOrigin: `${P[0]}px ${P[1]}px`, transformBox: 'view-box', transition: 'transform 3s ease-in-out' }} className={s.on(2)}>
        <line x1={P[0]} y1={P[1]} x2={at(176, 112)[0]} y2={at(176, 112)[1]} stroke={C.chalk} strokeWidth={5} strokeLinecap="round" className={s.hl(3)} />
      </g>
      <text x={at(176, 128)[0]} y={at(176, 128)[1]} textAnchor="middle" fontSize={11} fill={C.dim} className={s.on(2)}>OFF</text>
      <g className={`${s.on(4)}${s.hl(4)}`}>
        <rect x={nx - 4} y={ny - 9} width={26} height={18} rx={4} fill="#fff3bf" stroke={C.chalk} strokeWidth={2} />
        <text x={nx + 9} y={ny - 14} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.violet}>NVC</text>
      </g>
      <g className={`${s.on(5)}${s.hl(5)}`}>
        <Coil x={50} y={196} len={26} turns={3} vertical color={C.red} />
        <text x={70} y={214} fontSize={12} fontWeight={700} fill={C.red}>OLR</text>
      </g>
      <text x={170} y={275} textAnchor="middle" fontSize={12.5} fill={C.red} className={`${s.on(6)}${s.hl(6)}`}>Field weaken → NVC kamjor → handle release ⚠</text>
    </>
  );
};

// 4.6: Swinburne's no-load circuit (top) and the retardation run-down curve (bottom).
const decay = (k) => Array.from({ length: 14 }, (_, i) => {
  const t = i / 13;
  return `${i ? 'L' : 'M'}${(40 + 235 * t).toFixed(1)} ${(320 - 118 * Math.exp(-k * t)).toFixed(1)}`;
}).join(' ');
const testingFigure = (s) => (
  <>
    <g className={s.on(1)}>
      <path d="M30 30 L270 30 M30 130 L270 130 M30 30 L30 66 M30 94 L30 130" fill="none" stroke={C.chalk} strokeWidth={2} />
      <Source x={30} y={80} label="V" />
      <circle cx={95} cy={30} r={12} fill={C.board} stroke={C.chalk} strokeWidth={2} />
      <text x={95} y={35} textAnchor="middle" fontSize={12} fontWeight={700}>A</text>
      <text x={95} y={14} textAnchor="middle" fontSize={12} fill={C.blue}>I₀</text>
      <path d="M160 30 L160 46 M160 106 L160 130" fill="none" stroke={C.chalk} strokeWidth={2} />
      <Coil x={160} y={46} len={40} turns={4} vertical label="field" />
      <circle cx={160} cy={98} r={8} fill={C.board} stroke={C.chalk} strokeWidth={1.6} />
      <text x={175} y={102} fontSize={11} fill={C.blue}>Ish</text>
      <path d="M240 30 L240 62 M240 98 L240 130" fill="none" stroke={C.chalk} strokeWidth={2} />
      <Armature x={240} y={80} />
      <text x={262} y={84} fontSize={12} fill={C.dim}>no load</text>
      <text x={150} y={152} textAnchor="middle" fontSize={13} fill={C.blue} className={s.hl(1)}>Wc = V·I₀ − Ia₀²Ra</text>
    </g>
    <g className={s.on(5)}>
      <Axes x={40} y={320} w={250} h={130} xLabel="Time t" yLabel="Speed N" />
      <path d={decay(1.3)} fill="none" stroke={C.blue} strokeWidth={3} className={`draw${s.hl(5)}`} pathLength={1} />
      <text x={190} y={250} fontSize={12} fill={C.blue}>armature OFF</text>
    </g>
    <g className={s.on(6)}>
      <path d={decay(2.6)} fill="none" stroke={C.red} strokeWidth={3} className={`draw${s.hl(6)}`} pathLength={1} />
      <text x={110} y={300} fontSize={12} fill={C.red}>+ W′ load (chhito rokincha)</text>
    </g>
  </>
);

// Model answers are written the way an IOE answer is written in the exam, like
// an Indian textbook (skill rule 41): underlined headings, "Let, …" for the
// symbols, numbered equations on the right, ∴, a boxed result, "Hence proved".
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

export const torqueAnswer = answer('Model answer: working principle ra torque equation', {
  // Fig. 1 parts on the answer's beats: Ic·F and r come with part (b).
  draw: figAt(torqueFigure, { 0: 0, 1: 1, 2: 2, 3: 3, 4: 5, 5: 6 }),
  viewBox: '0 0 360 276',
  papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
  marks: '[4 + 2]',
  q: 'Explain the working principle of a DC motor and derive the torque equation.',
  read: {
    say: 'IOE ma tin choti sodhiyeko question: Explain the working principle of a DC motor and derive the torque equation.',
    voice: 'आइओईमा तीन चोटि सोधिएको क्वेस्चन — एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर, एन्ड डेराइभ द टर्क इक्वेसन।',
  },
  points: [
    {
      node: <><H>(a) Working principle [4]</H>A DC motor works on the principle that <i>when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force</i> <K>{String.raw`F = BIl`}</K> newton, whose direction is given by Fleming’s left-hand rule.</>,
      say: 'Working principle: magnetic field ma rakheko current-carrying conductor le mechanical force paucha, F equals B I l newton. Yesko direction Fleming ko left-hand rule le dincha.',
      voice: 'वर्किङ प्रिन्सिपल — म्याग्नेटिक फिल्डमा राखेको करेन्ट क्यारिङ कन्डक्टरले, मेकानिकल फोर्स पाउँछ। एफ इक्वल्स बी आई एल न्युटन। यसको डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ।',
    },
    {
      node: <><H>Working (Fig. 1)</H>When the armature is supplied from DC, the conductors under the N-pole carry current inward (⊗) and those under the S-pole outward (⊙). Hence the force is downward on the left and upward on the right, and all conductors turn the armature anticlockwise.</>,
      say: 'Working, Figure 1 ma: N pole muni ka conductor ma current bhitra, S pole muni ka ma bahira. Yasari left ma force tala ra right ma mathi, ani sabai le armature lai anticlockwise ghumauchan.',
      voice: 'वर्किङ, फिगर वानमा — एन पोलमुनिका कन्डक्टरमा करेन्ट भित्र, एस पोलमुनिकामा बाहिर। यसरी, लेफ्टमा फोर्स तल र राइटमा माथि। अनि सबैले, आर्मेचरलाई एन्टिक्लकवाइज घुमाउँछन्।',
    },
    {
      node: <><H>Function of commutator</H>As each coil crosses the magnetic neutral axis (MNA), the commutator reverses its current, so the torque remains unidirectional.</>,
      say: 'Commutator: harek coil le magnetic neutral axis cross garda tesko current reverse garcha. Phalswarup torque eutai direction ma rahancha.',
      voice: 'कम्युटेटर — हरेक कोइलले म्याग्नेटिक न्युट्रल एक्सिस क्रस गर्दा, त्यसको करेन्ट रिभर्स गर्छ। फलस्वरूप, टर्क एउटै डाइरेक्सनमा रहन्छ।',
      ask: {
        q: 'DC motor ma commutator ko kaam k ho?',
        voice: 'डीसी मोटरमा कम्युटेटरको काम के हो?',
        options: ['Flux badhaunu', 'MNA ma coil ko current reverse garera torque ek tira rakhnu', 'Supply voltage ghataunu'],
        answer: 1,
        why: 'MNA cross garda current reverse huncha, tesaile torque unidirectional rahancha.',
      },
    },
    {
      node: <><H>Continuous rotation</H>The armature carries many coils spread round its periphery. Every coil is commutated as it crosses the MNA, so the forces of all coils add up and the armature runs continuously with a steady torque. Thus electrical energy is converted into mechanical energy.</>,
      say: 'Continuous rotation: armature ma dherai coil periphery bhari hunchan. Harek coil MNA ma commutate huncha, tesaile sabai ko force jodincha ra armature steady torque le lagatar ghumcha. Yasari electrical energy mechanical energy ma convert huncha.',
      voice: 'कन्टिन्युअस रोटेसन — आर्मेचरमा धेरै कोइल, पेरिफेरीभरि हुन्छन्। हरेक कोइल एमएनएमा कम्युटेट हुन्छ, त्यसैले सबैको फोर्स जोडिन्छ, र आर्मेचर स्टेडी टर्कले लगातार घुम्छ। यसरी, इलेक्ट्रिकल इनर्जी मेकानिकल इनर्जीमा कन्भर्ट हुन्छ।',
    },
    {
      page: true,
      node: (
        <>
          <H>(b) Torque equation [2]</H>
          Let P = poles, φ = flux/pole, Z = conductors, A = parallel paths, I<sub>a</sub> = armature current, r = radius, l = length.
          <K>{String.raw`\begin{aligned} I_c &= \dfrac{I_a}{A},\quad B = \dfrac{P\phi}{2\pi r l} && \cdots(1) \\ F &= B\,I_c\,l = \dfrac{P\phi I_a}{2\pi r A} && \cdots(2) \end{aligned}`}</K>
        </>
      ),
      say: 'Torque equation. Let: P pole, phi flux per pole, Z conductor, A parallel path, I a armature current, r radius, l length. I c equals I a over A ra B equals P phi over two pi r l, equation ek. Force F equals P phi I a over two pi r A, equation dui.',
      voice: 'टर्क इक्वेसन। लेट — पी पोल, फाइ फ्लक्स पर पोल, जेड कन्डक्टर, ए प्यारालल पाथ, आई ए आर्मेचर करेन्ट, आर रेडियस, एल लेन्थ। आई सी इक्वल्स आई ए ओभर ए, र बी इक्वल्स पी फाइ ओभर टु पाइ आर एल — इक्वेसन वान। फोर्स — एफ इक्वल्स पी फाइ आई ए, ओभर टु पाइ आर ए — इक्वेसन टु।',
    },
    {
      node: (
        <>
          Torque of Z conductors, <K>{String.raw`T_a = Z\,F\,r = \dfrac{P\phi Z I_a}{2\pi A}`}</K>,
          <K>{String.raw`\boxed{T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right)\ \text{N}\cdot\text{m}} \qquad \cdots(3)`}</K>
          For a given machine, <K>{String.raw`T_a \propto \phi\, I_a`}</K>. <b>Hence proved.</b>
        </>
      ),
      say: 'Z conductor ko torque T a equals Z F r, arthat P phi Z I a over two pi A. Tesaile T a equals 0.159 phi Z I a times P over A newton metre, equation tin. Given machine ma T a phi I a sanga proportional. Hence proved.',
      voice: 'जेड कन्डक्टरको टर्क — टी ए इक्वल्स जेड एफ आर, अर्थात पी फाइ जेड आई ए, ओभर टु पाइ ए। त्यसैले, टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए न्युटन मिटर — इक्वेसन थ्री। गिभन मेसिनमा, टी ए — फाइ आई एसँग प्रोपोर्सनल। हेन्स प्रुभ्ड।',
    },
  ],
});

export const backEmfAnswer = answer('Model answer: back EMF ra yesko role', {
  draw: backEmfFigure,
  viewBox: '0 0 360 222',
  papers: ['2071 Magh', '2078 Poush', '2082 Baishakh (ECM)'],
  marks: '[2 + 4]',
  q: 'What is back EMF? How does it play an important role in a DC motor?',
  read: {
    say: 'Arko IOE question, yo pani tin choti sodhiyeko: What is back EMF? How does it play an important role in a DC motor?',
    voice: 'अर्को आइओई क्वेस्चन, यो पनि तीन चोटि सोधिएको — ह्वाट इज ब्याक इएमएफ? हाउ डज इट प्ले एन इम्पोर्टेन्ट रोल इन अ डीसी मोटर?',
  },
  points: [
    {
      node: <><H>(a) Back EMF [2]</H>When the armature of a DC motor rotates, its conductors cut the magnetic flux and an EMF is induced in them (generator action). By Lenz’s law this EMF opposes the applied voltage V; hence it is called the <b>back EMF</b> or counter EMF, <K>{String.raw`E_b`}</K>.</>,
      say: 'Back EMF: armature ghumda conductor le flux cut garchan ra EMF induce huncha. Lenz ko law anusar yo applied voltage V lai oppose garcha, tesaile yaslai back EMF E b bhanincha.',
      voice: 'ब्याक इएमएफ — आर्मेचर घुम्दा, कन्डक्टरले फ्लक्स कट गर्छन्, र इएमएफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो एप्लाइड भोल्टेज भीलाई अपोज गर्छ। त्यसैले यसलाई — ब्याक इएमएफ, ई बी भनिन्छ।',
    },
    {
      node: (
        <>
          <H>Expression (Fig. 2)</H>
          <K>{String.raw`\begin{aligned} E_b &= \dfrac{P\phi Z N}{60A} && \cdots(1) \\ V &= E_b + I_aR_a && \cdots(2) \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} && \cdots(3) \end{aligned}`}</K>
        </>
      ),
      say: 'Expression: E b equals P phi Z N over sixty A, equation ek. Voltage equation V equals E b plus I a R a, equation dui. Yasari I a equals V minus E b, over R a, equation tin.',
      voice: 'एक्स्प्रेसन — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए, इक्वेसन वान। भोल्टेज इक्वेसन — भी इक्वल्स ई बी प्लस आई ए आर ए, इक्वेसन टु। यसरी, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए, इक्वेसन थ्री।',
    },
    {
      page: true,
      node: <><H>(b) Role of back EMF [4]</H>(i) <b>Self-regulation:</b> load ↑ → N ↓ → <K>{String.raw`E_b`}</K> ↓ → <K>{String.raw`I_a`}</K> ↑ (from 3) → <K>{String.raw`T_a`}</K> ↑, until <K>{String.raw`T_a = T_L`}</K>. When the load is reduced, the reverse happens.</>,
      say: 'Significance ek, self-regulation: load badhda speed ghatcha, E b ghatcha, ani equation tin anusar I a badhcha. Torque load torque barabar nahunjel badhcha. Load ghatda ulto huncha.',
      voice: 'सिग्निफिकेन्स वान, सेल्फ रेगुलेसन — लोड बढ्दा स्पिड घट्छ, ई बी घट्छ, अनि इक्वेसन थ्री अनुसार आई ए बढ्छ। टर्क, लोड टर्क बराबर नहुन्जेल बढ्छ। लोड घट्दा, उल्टो हुन्छ।',
    },
    {
      node: (
        <>
          (ii) <b>Energy conversion:</b> multiplying (2) by I<sub>a</sub>,
          <K>{String.raw`\begin{aligned} VI_a &= E_bI_a + I_a^2R_a && \cdots(4) \\ P_m &= E_b\,I_a && \cdots(5) \end{aligned}`}</K>
          The power drawn against the back EMF is converted into mechanical power.
        </>
      ),
      say: 'Significance dui, energy conversion: equation dui lai I a le multiply garda V I a equals E b I a plus I a squared R a. Back EMF ko biruddha liyeko power E b I a nai mechanical power P m ho.',
      voice: 'सिग्निफिकेन्स टु, इनर्जी कन्भर्सन — इक्वेसन टुलाई आई एले मल्टिप्लाई गर्दा, भी आई ए इक्वल्स ई बी आई ए प्लस आई ए स्क्वायर आर ए। ब्याक इएमएफको बिरुद्ध लिएको पावर, ई बी आई ए नै — मेकानिकल पावर पी एम हो।',
    },
    {
      node: <>(iii) <b>Starting:</b> at start N = 0, <K>{String.raw`\therefore`}</K> <K>{String.raw`E_b = 0`}</K> and from (3) <K>{String.raw`I_a = V/R_a`}</K>, which is very large (220 V, R<sub>a</sub> = 0.5 Ω → 440 A). Hence a starter is necessary.</>,
      say: 'Significance tin, starting: start ma N zero, yasari E b zero, ani equation tin bata I a equals V over R a dherai thulo, jastai 220 volt ra 0.5 ohm ma 440 ampere. Yahi karan starter chahincha.',
      voice: 'सिग्निफिकेन्स थ्री, स्टार्टिङ — स्टार्टमा एन जिरो, यसरी ई बी जिरो। अनि इक्वेसन थ्रीबाट, आई ए इक्वल्स भी ओभर आर ए, धेरै ठूलो — जस्तै टु ट्वेन्टी भोल्ट र जिरो पोइन्ट फाइभ ओममा, फोर हन्ड्रेड फोर्टी एम्पियर। यही कारण, स्टार्टर चाहिन्छ।',
      ask: {
        q: 'DC motor lai starter kina chahincha?',
        voice: 'डीसी मोटरलाई स्टार्टर किन चाहिन्छ?',
        options: ['Start ma Eb = 0 bhayera Ia = V/Ra dherai thulo huncha', 'Speed badhauna', 'Flux ghatauna'],
        answer: 0,
        why: 'N = 0 ma Eb = 0, tesaile Ia = V/Ra (220/0.5 = 440 A). Starter resistance le yo current limit garcha.',
      },
    },
    {
      node: <>(iv) <b>Speed:</b> from (1) and (2), <K>{String.raw`N \propto \dfrac{E_b}{\phi} = \dfrac{V - I_aR_a}{\phi}`}</K>. The back EMF fixes the speed, so the speed can be controlled by changing V, R<sub>a</sub> or φ.</>,
      say: 'Significance char, speed: equation ek ra dui bata N, E b over phi sanga proportional, arthat V minus I a R a, over phi. Back EMF le speed decide garcha, tesaile V, R a wa phi badlera speed control garincha.',
      voice: 'सिग्निफिकेन्स फोर, स्पिड — इक्वेसन वान र टुबाट, एन, ई बी ओभर फाइसँग प्रोपोर्सनल, अर्थात भी माइनस आई ए आर ए, ओभर फाइ। ब्याक इएमएफले स्पिड डिसाइड गर्छ, त्यसैले भी, आर ए, वा फाइ बदलेर स्पिड कन्ट्रोल गरिन्छ।',
    },
  ],
});

export const characteristicsAnswer = answer('Model answer: shunt ra series characteristics', {
  draw: curvesFigure,
  viewBox: '0 0 320 340',
  papers: ['2070 Magh'],
  marks: '[8]',
  q: 'Explain the torque–armature current and speed–torque characteristics of DC shunt and DC series motors.',
  read: {
    say: 'IOE 2070 Magh, 8 marks: shunt ra series motor ko torque–current ra speed–torque characteristics explain gara.',
    voice: 'आइओई टु थाउजेन्ड सेभेन्टी माघ, एट मार्क्स: शन्ट र सिरिज मोटरको टर्क करेन्ट र स्पिड टर्क क्यारेक्टरिस्टिक्स एक्सप्लेन गर।',
  },
  points: [
    {
      node: <>Start from <K>{String.raw`T_a \propto \phi I_a`}</K> and <K>{String.raw`N \propto \dfrac{V - I_a R_a}{\phi}`}</K>.</>,
      say: 'Duita relation bata suru gara: Ta proportional to phi Ia, ani N proportional to V minus Ia Ra over phi.',
      voice: 'दुईटा रिलेसनबाट सुरु गर: टी ए प्रोपोर्सनल टु फाइ आई ए, अनि एन प्रोपोर्सनल टु भी माइनस आई ए आर ए ओभर फाइ।',
    },
    {
      node: <><b>Shunt T<sub>a</sub>–I<sub>a</sub>:</b> φ constant, so a straight line through the origin.</>,
      say: 'Shunt ma flux constant, so torque–current graph origin bata sidha line.',
      voice: 'शन्टमा फ्लक्स कन्स्टेन्ट, सो टर्क करेन्ट ग्राफ ओरिजिनबाट सिधा लाइन।',
    },
    {
      node: <><b>Shunt N–T:</b> I<sub>a</sub>R<sub>a</sub> is small, so speed falls only 5–15%: almost constant speed.</>,
      say: 'Shunt ko speed load ma thorai matra jharcha, five dekhi fifteen percent. Almost constant speed.',
      voice: 'शन्टको स्पिड लोडमा थोरै मात्र झर्छ, फाइभ देखि फिफ्टिन पर्सेन्ट। अल्मोस्ट कन्स्टेन्ट स्पिड।',
    },
    {
      node: <><b>Series T<sub>a</sub>–I<sub>a</sub>:</b> φ ∝ I<sub>a</sub>, so T<sub>a</sub> ∝ I<sub>a</sub>² (parabola), linear after saturation.</>,
      say: 'Series ma flux Ia sanga badhcha, so torque Ia square: parabola. Saturation pachi line.',
      voice: 'सिरिजमा फ्लक्स आई ए सँग बढ्छ, सो टर्क आई ए स्क्वायर: प्याराबोला। स्याचुरेसन पछि लाइन।',
      ask: { q: 'Series motor ma torque Ia sanga kasari badhcha?', voice: 'सिरिज मोटरमा टर्क आई ए सँग कसरी बढ्छ?', options: ['Ia² (parabola)', 'Ia (sidha line)', 'Badhdaina'], answer: 0, why: 'φ ∝ Ia, tesaile Ta ∝ Ia²: parabola.' },
    },
    {
      node: <><b>Series N–T:</b> N ∝ 1/I<sub>a</sub>, a hyperbola; dangerously high speed at no load.</>,
      say: 'Series ko speed one over Ia: hyperbola. No load ma speed khatarnak high, kahile pani no load ma start nagara.',
      voice: 'सिरिजको स्पिड वान ओभर आई ए: हाइपरबोला। नो लोडमा स्पिड खतरनाक हाइ, कहिल्यै पनि नो लोडमा स्टार्ट नगर।',
    },
    {
      node: <><b>Conclude:</b> shunt for constant-speed drives; series for traction and cranes.</>,
      say: 'Conclude gara: shunt constant speed drive ko lagi, series traction ra crane ko lagi.',
      voice: 'कन्क्लुड गर: शन्ट कन्स्टेन्ट स्पिड ड्राइभको लागि, सिरिज ट्र्याक्सन र क्रेनको लागि।',
    },
  ],
});

export const starterAnswer = answer('Model answer: starter ko necessity ra 3-point starter', {
  draw: starterFigure,
  viewBox: '0 0 340 285',
  papers: ['2075 Baisakh', '2074 Bhadra', '2073 Bhadra', '2070 Bhadra', '2068 Magh', '2066 Magh', '2083 Baishakh (ECM)'],
  marks: '[2 + 6]',
  q: 'Why is a starter needed for a DC motor? Describe the working of a 3-point starter with a neat diagram.',
  read: {
    say: 'IOE ko all-time hit, saat choti aayo: starter kina chahincha, ani 3-point starter ko working diagram sanga.',
    voice: 'आइओईको अल टाइम हिट, सात चोटि आयो: स्टार्टर किन चाहिन्छ, अनि थ्री पोइन्ट स्टार्टरको वर्किङ डायग्राम सँग।',
  },
  points: [
    {
      node: <><b>Necessity:</b> at start N = 0, so E<sub>b</sub> = 0 and I<sub>a</sub> = V/R<sub>a</sub> (220/0.5 = 440 A), 15–25× rated: it damages the commutator, brushes and winding.</>,
      say: 'Necessity: start ma back EMF zero, so current V over Ra, rated ko pandhra dekhi pachis guna. Commutator ra winding jalcha.',
      voice: 'नेसेसिटी: स्टार्टमा ब्याक इएमएफ जिरो, सो करेन्ट भी ओभर आर ए, रेटेडको पन्ध्र देखि पच्चिस गुना। कम्युटेटर र वाइन्डिङ जल्छ।',
    },
    {
      node: <><b>Diagram:</b> terminals L, F, A; resistance studs; handle with spring; OLR in the line; brass arc → NVC → field.</>,
      say: 'Diagram ma L, F, A terminal, resistance studs, spring bhako handle, OLR ra NVC. Yo diagram nai six marks ho.',
      voice: 'डायग्राममा एल, एफ, ए टर्मिनल, रेजिस्टेन्स स्टड्स, स्प्रिङ भएको ह्यान्डल, ओएलआर र एनभीसी। यो डायग्राम नै सिक्स मार्क्स हो।',
    },
    {
      node: <><b>Starting:</b> handle to stud 1, so full R is in series with the armature and the field gets full voltage; move stud by stud as E<sub>b</sub> rises.</>,
      say: 'Starting: handle stud one ma, full resistance armature sanga series ma. Speed badhdai jada stud by stud sara.',
      voice: 'स्टार्टिङ: ह्यान्डल स्टड वानमा, फुल रेजिस्टेन्स आर्मेचर सँग सिरिजमा। स्पिड बढ्दै जाँदा स्टड बाइ स्टड सार।',
    },
    {
      node: <><b>NVC:</b> in series with the field, holds the handle at RUN; if the supply fails, the spring returns the handle to OFF.</>,
      say: 'NVC field sanga series ma. Supply gayo bhane magnet chhodcha, spring le handle OFF ma pharkaucha.',
      voice: 'एनभीसी फिल्ड सँग सिरिजमा। सप्लाई गयो भने म्याग्नेट छोड्छ, स्प्रिङले ह्यान्डल अफमा फर्काउँछ।',
      ask: { q: 'Supply gayo bhane NVC le k garcha?', voice: 'सप्लाई गयो भने एनभीसीले के गर्छ?', options: ['Current badhaucha', 'Kei gardaina', 'Handle OFF ma pharkaucha'], answer: 2, why: 'NVC ko magnet chhodcha, spring le handle OFF ma lancha.' },
    },
    {
      node: <><b>OLR:</b> in series with the line; on overload it shorts the NVC, so the handle goes OFF.</>,
      say: 'OLR line sanga series ma. Overload huda NVC short garcha, ani handle OFF.',
      voice: 'ओएलआर लाइन सँग सिरिजमा। ओभरलोड हुँदा एनभीसी सर्ट गर्छ, अनि ह्यान्डल अफ।',
    },
    {
      node: <><b>Drawback:</b> field weakening also weakens the NVC, so the handle can release; the 4-point starter fixes this.</>,
      say: 'Drawback: field weaken garda NVC pani kamjor, handle aafai chhodcha. Tesko solution 4-point starter.',
      voice: 'ड्रब्याक: फिल्ड वीकन गर्दा एनभीसी पनि कमजोर, ह्यान्डल आफै छोड्छ। त्यसको सोलुसन फोर पोइन्ट स्टार्टर।',
    },
  ],
});

export const testingAnswer = answer('Model answer: Swinburne ra retardation test', {
  draw: testingFigure,
  viewBox: '0 0 320 340',
  papers: [],
  q: 'Explain Swinburne’s test and the retardation test for finding the losses of a DC machine. State the merits and demerits of Swinburne’s test.',
  read: {
    say: 'Exam-style question: Swinburne test ra retardation test explain gara, ani Swinburne ko merits ra demerits lekha.',
    voice: 'एक्जाम स्टाइल क्वेस्चन: स्विनबर्न टेस्ट र रिटार्डेसन टेस्ट एक्सप्लेन गर, अनि स्विनबर्नको मेरिट्स र डिमेरिट्स लेख।',
  },
  points: [
    {
      node: <><b>Swinburne:</b> shunt machine at no load, rated V and N; <K>{String.raw`W_c = V I_0 - I_{a0}^2 R_a`}</K>, with <K>{String.raw`I_{a0} = I_0 - I_{sh}`}</K>.</>,
      say: 'Swinburne: shunt machine lai no load ma rated voltage ra speed ma chalau. Input bata armature copper loss ghatau, constant loss aaucha.',
      voice: 'स्विनबर्न: शन्ट मेसिनलाई नो लोडमा रेटेड भोल्टेज र स्पिडमा चलाऊ। इनपुटबाट आर्मेचर कपर लस घटाऊ, कन्स्टेन्ट लस आउँछ।',
    },
    {
      node: <><b>η at any load:</b> motor <K>{String.raw`\eta = \dfrac{V I_L - W_c - I_a^2 R_a}{V I_L}`}</K>.</>,
      say: 'Ani jun sukai load ko efficiency: input bata constant loss ra Ia square Ra ghatau, input le bhaag gara.',
      voice: 'अनि जुन सुकै लोडको इफिसियन्सी: इनपुटबाट कन्स्टेन्ट लस र आई ए स्क्वायर आर ए घटाऊ, इनपुटले भाग गर।',
    },
    {
      node: <><b>Merits:</b> economical; η can be predetermined at any load.</>,
      say: 'Merits: sasto, thorai power chahincha, ani load nahali efficiency thaha huncha.',
      voice: 'मेरिट्स: सस्तो, थोरै पावर चाहिन्छ, अनि लोड नहाली इफिसियन्सी थाहा हुन्छ।',
    },
    {
      node: <><b>Demerits:</b> ignores the change in iron loss on load; not for series motors; full-load heating and commutation are not tested.</>,
      say: 'Demerits: load ma iron loss ko change ignore huncha, series motor ma garna mildaina, full load ko heating test hudaina.',
      voice: 'डिमेरिट्स: लोडमा आइरन लसको चेन्ज इग्नोर हुन्छ, सिरिज मोटरमा गर्न मिल्दैन, फुल लोडको हिटिङ टेस्ट हुँदैन।',
      ask: { q: 'Swinburne test kun motor ma garna mildaina?', voice: 'स्विनबर्न टेस्ट कुन मोटरमा गर्न मिल्दैन?', options: ['Shunt', 'Series', 'Compound'], answer: 1, why: 'Series motor no load ma race garcha.' },
    },
    {
      node: <><b>Retardation:</b> run above rated speed, switch off the armature (field on); <K>{String.raw`W = \left(\tfrac{2\pi}{60}\right)^2 J N \tfrac{dN}{dt}`}</K>.</>,
      say: 'Retardation: rated bhanda mathi chalau, armature off gara, field on rakha. Slow hune rate bata rotational loss.',
      voice: 'रिटार्डेसन: रेटेड भन्दा माथि चलाऊ, आर्मेचर अफ गर, फिल्ड अन राख। स्लो हुने रेटबाट रोटेसनल लस।',
    },
    {
      node: <><b>Without J:</b> repeat with an extra load W′: <K>{String.raw`W = W' \dfrac{t_2}{t_1 - t_2}`}</K>.</>,
      say: 'J thaha chaina bhane extra load W dash rakhera feri gara: W equals W dash t two over t one minus t two.',
      voice: 'जे थाहा छैन भने एक्स्ट्रा लोड डब्लु ड्यास राखेर फेरि गर: डब्लु इक्वल्स डब्लु ड्यास टी टु ओभर टी वान माइनस टी टु।',
    },
  ],
});
