import { Arrow, C, Conductor, K, model, Pole, video } from './kit.jsx';

/* Chapter 3 · Working principle & torque equation (Syllabus Unit 4: working principle and torque equation). */

const CX = 180;
const CY = 112;
// Conductor angles (degrees, screen CCW from +x): left half under N, right half under S.
const LEFT = [140, 180, 220];
const RIGHT = [-40, 0, 40];
const pos = (deg, r = 56) => [CX + r * Math.cos((-deg * Math.PI) / 180), CY + r * Math.sin((-deg * Math.PI) / 180)];

export const torqueProduction = video('Armature le torque kasari banaucha', {
  viewBox: '0 0 360 224',
  beats: [
    { say: 'Yo hera armature, left ma north pole ra right ma south pole ko bichma. Field chai yeslai left bata right tira cross garcha.', voice: 'यो हेर आर्मेचर, लेफ्टमा नर्थ पोल र राइटमा साउथ पोलको बीचमा। फिल्ड चाहिँ यसलाई लेफ्टबाट राइटतिर क्रस गर्छ।' },
    { say: 'Commutator le ensure garcha ki N pole muni ko har conductor ma current screen bhitra jancha, cross le dekhaeko, ra S muni ko har conductor ma current bahira aaucha, dot le dekhaeko.', voice: 'कम्युटेटरले इन्स्योर गर्छ कि एन पोलमुनिको हर कन्डक्टरमा करेन्ट स्क्रिन भित्र जान्छ, क्रसले देखाएको, र एस मुनिको हर कन्डक्टरमा करेन्ट बाहिर आउँछ, डटले देखाएको।' },
    { say: 'Fleming ko left-hand rule: field right tira ra current screen bhitra bhaye force tala tira huncha. So left ko har conductor tala push huncha.', voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुल: फिल्ड राइटतिर र करेन्ट स्क्रिन भित्र भए फोर्स तलतिर हुन्छ। सो लेफ्टको हर कन्डक्टर तल पुस हुन्छ।' },
    { say: 'Right tira current bahira aaucha, tesaile force mathi tira huncha.', voice: 'राइटतिर करेन्ट बाहिर आउँछ, त्यसैले फोर्स माथितिर हुन्छ।' },
    { say: 'Left ma tala, right ma mathi: sabai force le armature lai eutai tira ghumaucha, counter-clockwise. Yinko turning effect jodda armature torque bancha.', voice: 'लेफ्टमा तल, राइटमा माथि: सबै फोर्सले आर्मेचरलाई एउटै तिर घुमाउँछ, काउन्टर क्लकवाइज। यिनको टर्निङ इफेक्ट जोड्दा आर्मेचर टर्क बन्छ।' },
    {
      say: 'Dhyan diyera herya? Check garau.',
      voice: 'ध्यान दिएर हेर्यौ? चेक गरौं।',
      ask: {
        tag: 'Dhyan check 👀',
        q: 'Bharkhar bhaneko: left ra right ka sabai force le armature lai kata ghumaucha?',
        voice: 'भर्खर भनेको: लेफ्ट र राइटका सबै फोर्सले आर्मेचरलाई कता घुमाउँछ?',
        options: ['Duitai tira, cancel huncha', 'Eutai tira, counter-clockwise', 'Ghumaudai ghumaudaina'],
        answer: 1,
        why: 'Left ma tala, right ma mathi: sabai force le eutai tira, counter-clockwise ghumaucha.',
      },
    },
    { say: 'Conductor N muni bata S muni jada commutator le tesko current reverse garcha, tesaile force pani flip huncha, ra tyo rotation ko eutai direction ma push garirahancha.', voice: 'कन्डक्टर एन मुनिबाट एस मुनि जाँदा कम्युटेटरले यसको करेन्ट रिभर्स गर्छ, त्यसैले फोर्स पनि फ्लिप हुन्छ, र त्यो रोटेसनको एउटै डाइरेक्सनमा पुस गरिरहन्छ।' },
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
  board: [{ at: 4, kind: 'note', node: <>N muni ko sabai conductor: ⊗ ra tala push. S muni ko sabai: ⊙ ra mathi push. → <b>unidirectional torque</b></> }],
});

export const torqueDerivation = video('Derivation: torque equation', {
  tall: true,
  beats: [
    { say: 'Aba torque equation. Armature radius r, active length l, P pole, per pole phi, Z conductor, A parallel path, ra armature current I a.', voice: 'अब टर्क इक्वेसन। आर्मेचर रेडियस आर, एक्टिभ लेन्थ एल, पी पोल, पर पोल फाइ, जेड कन्डक्टर, ए प्यारालल पाथ, र आर्मेचर करेन्ट आई ए।' },
    { say: 'Armature current A ota path ma barabar split huncha, tesaile har conductor ma I a over A bagcha.', voice: 'आर्मेचर करेन्ट ए ओटा पाथमा बराबर स्प्लिट हुन्छ, त्यसैले हर कन्डक्टरमा आई ए ओभर ए बग्छ।' },
    { say: 'Total flux, P phi, armature ko surface bhari phailincha, jasko area two pi r l ho. So average flux density P phi over two pi r l huncha.', voice: 'टोटल फ्लक्स, पी फाइ, आर्मेचरको सर्फेस भरि फैलिन्छ, जसको एरिया टु पाइ आर एल हो। सो एभरेज फ्लक्स डेन्सिटी पी फाइ ओभर टु पाइ आर एल हुन्छ।' },
    { say: 'Euta conductor ma force B I l. B ra conductor current halda l cancel huncha: P phi I a over two pi r A.', voice: 'एउटा कन्डक्टरमा फोर्स बी आई एल। बी र कन्डक्टर करेन्ट हाल्दा एल क्यान्सिल हुन्छ: पी फाइ आई ए ओभर टु पाइ आर ए।' },
    {
      say: 'Force lever arm bata torque bancha.',
      voice: 'फोर्स लिभर आर्मबाट टर्क बन्छ।',
      ask: {
        tag: 'Dhyan check 👀',
        q: 'Euta conductor ko force ma kun kura cancel bhayo?',
        voice: 'एउटा कन्डक्टरको फोर्समा कुन कुरा क्यान्सिल भयो?',
        options: ['l, active length', 'r, radius', 'Z, conductor number'],
        answer: 0,
        why: 'B = Pφ/2πrl ma l cha ra F = BIl ma pani l cha, tesaile l cancel huncha. Aba F lai r le multiply garera torque.',
      },
    },
    { say: 'Euta conductor ko torque F times r. r pani cancel huncha, baki rahancha P phi I a over two pi A.', voice: 'एउटा कन्डक्टरको टर्क एफ टाइम्स आर। आर पनि क्यान्सिल हुन्छ, बाँकी रहन्छ पी फाइ आई ए ओभर टु पाइ ए।' },
    { say: 'Commutator le sabai Z conductor lai eutai tira push garaucha, tesaile Z le multiply gara: T a equals P phi Z I a over two pi A.', voice: 'कम्युटेटरले सबै जेड कन्डक्टरलाई एउटै तिर पुस गराउँछ, त्यसैले जेडले मल्टिप्लाई गर: टी ए इक्वल्स पी फाइ जेड आई ए ओभर टु पाइ ए।' },
    { say: 'One over two pi bhaneko 0.159. So T a equals 0.159 phi Z I a times P over A, newton metre ma.', voice: 'वान ओभर टु पाइ भनेको जिरो पोइन्ट वान फाइभ नाइन। सो टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन फाइ जेड आई ए टाइम्स पी ओभर ए, न्युटन मिटरमा।' },
    { say: 'Euta given machine ma P, Z ra A fixed huncha. So armature torque flux times armature current sanga proportional huncha. Simple cha.', voice: 'एउटा गिभन मेसिनमा पी, जेड र ए फिक्स्ड हुन्छ। सो आर्मेचर टर्क फ्लक्स टाइम्स आर्मेचर करेन्टसँग प्रोपोर्सनल हुन्छ। सिम्पल छ।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Torque equation</> },
    { at: 0, kind: 'note', node: <>r radius · l length · P pole · φ Wb/pole · Z conductor · A path · I<sub>a</sub></> },
    { at: 1, kind: 'step', node: <>Euta conductor ko current: <K>{String.raw`I_c = \textcolor{#d9480f}{I_a / A}`}</K></> },
    { at: 2, kind: 'step', node: <>Flux density: <K>{String.raw`B = \dfrac{P\phi}{2\pi r l}`}</K></> },
    { at: 3, kind: 'step', node: <>Euta conductor ma force: <K>{String.raw`F = B I_c l = \dfrac{P\phi}{2\pi r l}\cdot\dfrac{I_a}{A}\cdot l = \textcolor{#d9480f}{\dfrac{P\phi I_a}{2\pi r A}}`}</K></> },
    { at: 5, kind: 'step', node: <>Euta conductor ko torque: <K>{String.raw`\tau = F r = \textcolor{#d9480f}{\dfrac{P\phi I_a}{2\pi A}}`}</K></> },
    { at: 6, kind: 'step', node: <>Sabai Z conductor: <K>{String.raw`T_a = \dfrac{P\phi Z I_a}{2\pi A}`}</K></> },
    { at: 7, kind: 'eq', node: <><K>{String.raw`T_a = 0.159\,\phi Z I_a \left(\tfrac{P}{A}\right)\ \text{N}\cdot\text{m}`}</K></> },
    { at: 8, kind: 'step', node: <>Given machine ma: <K>{String.raw`\textcolor{#2b8a3e}{T_a \propto \phi I_a}`}</K></> },
  ],
});

export const torqueFactors = video('Torque kasle decide garcha?', {
  beats: [
    { say: 'IOE 2079 Jestha le yo pani sodhcha: produce bhaeko torque lai kun factor le affect garcha? Equation bata sidhai padha.', voice: 'आइओई टु थाउजेन्ड सेभेन्टी नाइन जेठले यो पनि सोध्छ: प्रोड्युस भएको टर्कलाई कुन फ्याक्टरले अफेक्ट गर्छ? इक्वेसनबाट सिधै पढ।' },
    { say: 'Flux per pole, phi. Field current badhe flux badhcha, iron saturate nahunjel.', voice: 'फ्लक्स पर पोल, फाइ। फिल्ड करेन्ट बढे फ्लक्स बढ्छ, आइरन स्याचुरेट नहुन्जेल।' },
    { say: 'Armature current, I a. Yo load le set garcha: heavy load le dherai current tancha.', voice: 'आर्मेचर करेन्ट, आई ए। यो लोडले सेट गर्छ: हेभी लोडले धेरै करेन्ट तान्छ।' },
    { say: 'Ani design constant haru: conductor ko number Z, pole P, ra parallel path A. Machine banisakepachi yi fixed hunchan.', voice: 'अनि डिजाइन कन्स्टेन्ट हरु: कन्डक्टरको नम्बर जेड, पोल पी, र प्यारालल पाथ ए। मेसिन बनिसकेपछि यी फिक्स्ड हुन्छन्।' },
    {
      say: 'La use garau.',
      voice: 'ल युज गरौं।',
      ask: {
        tag: 'Quick check',
        q: '4-pole, lap-wound motor ma Z = 480 conductor ra φ = 20 mWb cha. Armature current 50 A cha. Armature torque kati huncha?',
        voice: 'फोर पोल, ल्याप वाउन्ड मोटरमा जेड इक्वल्स फोर एटी कन्डक्टर र फाइ इक्वल्स ट्वेन्टी मिलिवेबर छ। आर्मेचर करेन्ट फिफ्टी एम्पियर छ। आर्मेचर टर्क कति हुन्छ?',
        options: ['≈ 76.3 N·m', '≈ 38.2 N·m', '≈ 152.6 N·m', '≈ 480 N·m'],
        answer: 0,
        why: 'Lap ma A = P, so P/A = 1. Ta = 0.159 × 0.02 × 480 × 50 ≈ 76.3 N·m. (152.6 N·m le galti le wave ko value P/A = 2 use garcha.)',
      },
    },
    { say: 'Trap hera: lap winding ma P over A one huncha, tara wave winding ma P over two. Eutai machine wave ma wound bhaye per ampere dui guna torque dincha.', voice: 'ट्र्याप हेर: ल्याप वाइन्डिङमा पी ओभर ए वान हुन्छ, तर वेभ वाइन्डिङमा पी ओभर टु। एउटै मेसिन वेभमा वाउन्ड भए पर एम्पियर दुई गुना टर्क दिन्छ।' },
    {
      say: 'Arko ekchoti.',
      voice: 'अर्को एकचोटि।',
      ask: {
        tag: 'Quick check',
        q: 'Armature current double garyo ra flux half garyo. Torque…',
        voice: 'आर्मेचर करेन्ट डबल गर्यो र फ्लक्स हाफ गर्यो। टर्क…',
        options: ['same rahancha', 'double huncha', 'half huncha', 'char guna thulo huncha'],
        answer: 0,
        why: 'Ta ∝ φIa: (½φ)(2Ia) = φIa, tesaile torque change hudaina.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'eq', node: <>T<sub>a</sub> = 0.159 · φ · Z · I<sub>a</sub> · (P/A)</> },
    { at: 1, kind: 'step', node: <><span className="y">φ</span>: flux per pole (field current, saturation)</> },
    { at: 2, kind: 'step', node: <><span className="y">I<sub>a</sub></span>: armature current (load le set garcha)</> },
    { at: 3, kind: 'step', node: <><span className="y">Z, P, A</span>: design constant (fixed)</> },
    { at: 5, kind: 'note', node: <>Lap: P/A = 1 · Wave: P/A = P/2</> },
  ],
});

// IOE model answer for this chapter.
export const ch3Model = model({
  q: 'DC motor ko working principle explain gara ra armature le develop garne torque ko equation derive gara.',
  papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
  marks: 'ECM 2082 Baishakh [4 + 2]',
  points: [
    <><b>Principle:</b> Exam ma exactly yo lekha: “When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force F = BIl”, ani yesko direction Fleming ko left-hand rule le dincha.</>,
    <><b>Working:</b> field winding le flux banaucha; armature lai brush ra commutator bata feed garincha. N muni ka conductor ma current euta tira ra S muni ka ma arko tira bagcha, tesaile sabai force eutai rotational sense ma lagchan ra torque produce garchan.</>,
    <><b>Commutator ko role:</b> har coil le neutral zone pass garda tesko current reverse garcha, ani torque lai unidirectional rakhcha.</>,
    <><b>Derivation:</b> I<sub>c</sub> = I<sub>a</sub>/A; B = Pφ/(2πrl); F = BI<sub>c</sub>l = PφI<sub>a</sub>/(2πrA); euta conductor ko torque = F·r = PφI<sub>a</sub>/(2πA).</>,
    <><b>Result:</b> T<sub>a</sub> = PφZI<sub>a</sub>/(2πA) = 0.159 φZI<sub>a</sub>(P/A) N·m, tesaile T<sub>a</sub> ∝ φI<sub>a</sub>.</>,
    <><b>Consequence:</b> shunt motor (φ constant) ma T<sub>a</sub> ∝ I<sub>a</sub>; series motor (φ ∝ I<sub>a</sub>) ma saturation aghi T<sub>a</sub> ∝ I<sub>a</sub>².</>,
  ],
  tip: 'N ra S ko bichma armature draw gara, ⊗ ra ⊙ conductor ra force arrow sanga. ECM 2082 Baishakh ma “role of back EMF” 2 marks ko lagi thapincha (Back EMF chapter hera). Exam ma English mai lekha.',
});
