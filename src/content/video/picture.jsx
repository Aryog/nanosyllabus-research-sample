import { Armature, Arrow, Axes, C, Coil, Conductor, K, Pole, Source, answer } from './kit.jsx';

/*
  Big picture model answers, written up on the board as videos (kit.jsx
  `answer`). Same marking-scheme points as the IOE model-answer cards in
  ch3/ch6/ch7/testing.jsx, compressed to what fits a whiteboard line. Each
  has the figure the exam answer needs, built up point by point.
*/

// 4.1: armature between N and S. Field → right; ⊗ under N pushed down, ⊙ under S up.
const torqueFigure = (s) => (
  <>
    <Pole x={8} y={45} h={170} label="N" color={C.north} />
    <Pole x={308} y={45} h={170} label="S" color={C.south} />
    <g className={s.on(1)}>
      {[75, 130, 185].map((y) => (
        <line key={y} x1={58} y1={y} x2={302} y2={y} stroke={C.faint} strokeWidth={1.5} strokeDasharray="5 5" />
      ))}
      <text x={180} y={30} textAnchor="middle" fontSize={15} fill={C.blue} className={s.hl(1)}>F = BIl · field N → S</text>
    </g>
    <circle cx={180} cy={130} r={74} fill="none" stroke={C.chalk} strokeWidth={2.5} />
    <g className={s.on(2)}>
      {[90, 130, 170].map((y) => (
        <g key={y}>
          <Conductor x={126} y={y} dir="in" />
          <Arrow x1={110} y1={y - 8} x2={110} y2={y + 22} color={C.red} w={2.5} head={7} />
          <Conductor x={234} y={y} dir="out" />
          <Arrow x1={250} y1={y + 8} x2={250} y2={y - 22} color={C.red} w={2.5} head={7} />
        </g>
      ))}
      <text x={180} y={250} textAnchor="middle" fontSize={13} fill={C.dim}>⊗ N muni tala · ⊙ S muni mathi</text>
    </g>
    <g className={s.on(3)}>
      <path d="M220 60 A80 80 0 0 0 140 60" fill="none" stroke={C.green} strokeWidth={3} className={s.hl(3)} />
      <polygon points="140,60 152,52 150,66" fill={C.green} />
      <text x={180} y={118} textAnchor="middle" fontSize={12} fill={C.green}>ek tira torque</text>
    </g>
    <text x={180} y={152} textAnchor="middle" fontSize={16} fill={C.blue} className={`${s.on(5)}${s.hl(5)}`}>Ta ∝ φ Ia</text>
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
      <text x={102} y={200} fontSize={12} fill={C.red}>⚠ no load → N bahut high</text>
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

export const torqueAnswer = answer('Model answer: working principle ra torque equation', {
  draw: torqueFigure,
  viewBox: '0 0 360 260',
  papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
  marks: '[4 + 2]',
  q: 'Explain the working principle of a DC motor and derive the torque equation.',
  read: {
    say: 'IOE ko favourite question: DC motor ko working principle explain gara ani torque equation derive gara. Tin choti aaisakyo.',
    voice: 'आइओईको फेभरेट क्वेस्चन: डीसी मोटरको वर्किङ प्रिन्सिपल एक्सप्लेन गर अनि टर्क इक्वेसन डेराइभ गर। तीन चोटि आइसक्यो।',
  },
  points: [
    {
      node: <><b>Principle:</b> a current-carrying conductor in a magnetic field experiences a force <K>{String.raw`F = BIl`}</K>; direction by Fleming’s left-hand rule.</>,
      say: 'Pahilo point, principle: field ma current bokeko conductor le F equals B I l force paucha. Direction Fleming ko left-hand rule le.',
      voice: 'पहिलो पोइन्ट, प्रिन्सिपल: फिल्डमा करेन्ट बोकेको कन्डक्टरले एफ इक्वल्स बी आई एल फोर्स पाउँछ। डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले।',
    },
    {
      node: <><b>Working:</b> conductors under N carry current one way and under S the other, so every force turns the armature the same way.</>,
      say: 'Working: N muni ra S muni current ulto bagcha, tesaile sabai force le armature lai eutai tira ghumauchan.',
      voice: 'वर्किङ: एन मुनि र एस मुनि करेन्ट उल्टो बग्छ, त्यसैले सबै फोर्सले आर्मेचरलाई एउटै तिर घुमाउँछन्।',
    },
    {
      node: <><b>Commutator:</b> reverses each coil’s current at the neutral zone, so the torque stays unidirectional.</>,
      say: 'Commutator le neutral zone ma coil ko current reverse garcha, ani torque ek tira matra rahancha.',
      voice: 'कम्युटेटरले न्युट्रल जोनमा कोइलको करेन्ट रिभर्स गर्छ, अनि टर्क एकतिर मात्र रहन्छ।',
      ask: { q: 'Commutator le k garcha?', voice: 'कम्युटेटरले के गर्छ?', options: ['Flux badhaucha', 'Current reverse garera torque ek tira rakhcha', 'Voltage ghataucha'], answer: 1, why: 'Neutral zone ma current reverse huncha, tesaile torque unidirectional.' },
    },
    {
      node: <><b>Derivation:</b> <K>{String.raw`I_c = \tfrac{I_a}{A},\ B = \tfrac{P\phi}{2\pi r l},\ F = B I_c l,\ \tau = F r = \tfrac{P\phi I_a}{2\pi A}`}</K> per conductor.</>,
      say: 'Derivation ko chain segment 2 mai garyau: current per path, flux density, force, ani torque per conductor.',
      voice: 'डेराइभेसनको चेन सेग्मेन्ट टु मै गर्यौं: करेन्ट पर पाथ, फ्लक्स डेन्सिटी, फोर्स, अनि टर्क पर कन्डक्टर।',
    },
    {
      node: <><b>Result:</b> <K>{String.raw`T_a = 0.159\,\phi Z I_a \tfrac{P}{A}\ \text{N}\cdot\text{m}`}</K>, so <K>{String.raw`\textcolor{#2b8a3e}{T_a \propto \phi I_a}`}</K>.</>,
      say: 'Z le multiply garda result: T a equals zero point one five nine phi Z I a P over A. Yo line box gara!',
      voice: 'जेडले मल्टिप्लाइ गर्दा रिजल्ट: टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन फाइ जेड आई ए पी ओभर ए। यो लाइन बक्स गर!',
    },
    {
      node: <><b>Consequence:</b> shunt (φ constant): <K>{String.raw`T_a \propto I_a`}</K>; series (<K>{String.raw`\phi \propto I_a`}</K>): <K>{String.raw`T_a \propto I_a^2`}</K>.</>,
      say: 'Last ma consequence: shunt ma torque Ia sanga linear, series ma Ia square sanga.',
      voice: 'लास्टमा कन्सिक्वेन्स: शन्टमा टर्क आई ए सँग लिनियर, सिरिजमा आई ए स्क्वायर सँग।',
    },
  ],
  tip: {
    node: <>N–S ko bichma armature, ⊗ ⊙ conductor ra force arrow draw gara. Exam ma English mai lekha.</>,
    say: 'Exam tip: N S ko bichma armature ra force arrow draw gara, ani English mai lekha. Full marks pakka!',
    voice: 'एक्जाम टिप: एन एसको बिचमा आर्मेचर र फोर्स एरो ड्र गर, अनि इङ्लिस मै लेख। फुल मार्क्स पक्का!',
  },
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
  tip: {
    node: <>Charai curve labelled axes sanga sketch gara; series T<sub>a</sub>–I<sub>a</sub> ma saturation bend mark gara.</>,
    say: 'Tip: charai curve label gareko axes sanga sketch gara. Graph bina yo answer adhuro ho.',
    voice: 'टिप: चारै कर्भ लेबल गरेको एक्सिस सँग स्केच गर। ग्राफ बिना यो आन्सर अधुरो हो।',
  },
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
  tip: {
    node: <>L, F, A, studs, brass arc, NVC, OLR ra spring clearly label gara.</>,
    say: 'Tip: diagram ma harek part label gara. Label chhutyo bhane marks katcha.',
    voice: 'टिप: डायग्राममा हरेक पार्ट लेबल गर। लेबल छुट्यो भने मार्क्स काट्छ।',
  },
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
  tip: {
    node: <>Swinburne ko circuit draw gara: ammeter line ma, field ma ammeter ra rheostat, armature ma voltmeter.</>,
    say: 'Tip: Swinburne ko circuit draw garna nabirsa. Exam ma English mai lekha.',
    voice: 'टिप: स्विनबर्नको सर्किट ड्र गर्न नबिर्स। एक्जाममा इङ्लिस मै लेख।',
  },
});
