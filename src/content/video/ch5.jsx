import { Armature, Arrow, C, Coil, Source, hook, video } from './kit.jsx';

/* Chapter 5 · Types of DC motor (Syllabus Unit 4: Method of excitation, Types of DC motor). */

const W = ({ d, color = C.chalk }) => <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />;
const Lbl = ({ x, y, children, color = C.orange, anchor = 'start' }) => (
  <text x={x} y={y} fontSize={12.5} fontWeight={700} fill={color} textAnchor={anchor}>{children}</text>
);
const Title = ({ children }) => <text x={180} y={22} textAnchor="middle" fontSize={15} fontWeight={800} fill={C.yellow}>{children}</text>;

// Supply on the left between rails y = 50 (+) and y = 190 (−), rails run to x = xEnd.
function Rails({ xEnd = 320, gapFrom, gapTo }) {
  return (
    <g>
      <W d="M40 50 V113 M40 127 V190" />
      <Source x={40} y={120} label="V" />
      {gapFrom ? <W d={`M40 50 H${gapFrom} M${gapTo} 50 H${xEnd}`} /> : <W d={`M40 50 H${xEnd}`} />}
      <W d={`M40 190 H${xEnd}`} />
    </g>
  );
}

const connections = video('Field le current kasari pauncha', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'DC motor ko naam field winding le current kasari pauncha tyo anusar huncha. First, separately excited: field ko aafnai supply huncha, armature bata independent.', voice: 'डीसी मोटरको नाम फिल्ड वाइन्डिङले करेन्ट कसरी पाउँछ त्यो अनुसार हुन्छ। फर्स्ट, सेपरेटली एक्साइटेड: फिल्डको आफ्नै सप्लाई हुन्छ, आर्मेचरबाट इन्डिपेन्डेन्ट।' },
    { say: 'Shunt motor: field armature sanga parallel ma connect huncha, sidhai supply across. Line current I a ra I sh ma split huncha.', voice: 'शन्ट मोटर: फिल्ड आर्मेचरसँग प्यारालल मा कनेक्ट हुन्छ, सिधै सप्लाई एक्रस। लाइन करेन्ट आई ए र आई एस एच मा स्प्लिट हुन्छ।' },
    {
      say: 'Shunt field full supply voltage across baseko huncha.',
      voice: 'शन्ट फिल्ड फुल सप्लाई भोल्टेज एक्रस बसेको हुन्छ।',
      ask: {
        tag: 'Ekchin socha 🤔',
        q: 'Shunt field current sano rakhna shunt field lai yesari wind garincha…',
        voice: 'शन्ट फिल्ड करेन्ट सानो राख्न शन्ट फिल्डलाई यसरी वाइन्ड गरिन्छ…',
        options: ['patalo wire ko dherai turn (high resistance)', 'moto wire ko thorai turn (low resistance)', 'euta matra copper bar'],
        answer: 0,
        why: 'Full V across bhayera high resistance chahincha, taki Ish line current ko few percent matra hos. Dherai turn le pani prasasta ampere-turns dincha.',
      },
    },
    { say: 'Series motor: field armature sanga series ma huncha, tesaile dubai bata eutai current bagcha. Yo moto wire ko thorai turn ho, resistance ekdam low.', voice: 'सिरिज मोटर: फिल्ड आर्मेचरसँग सिरिजमा हुन्छ, त्यसैले दुवैबाट एउटै करेन्ट बग्छ। यो मोटो वायरको थोरै टर्न हो, रेजिस्टेन्स एकदम लो।' },
    {
      say: 'Current lai follow gara.',
      voice: 'करेन्टलाई फलो गर।',
      ask: {
        tag: 'Quick check',
        q: 'Series motor ma load current double bhayo. Field current…',
        voice: 'सिरिज मोटरमा लोड करेन्ट डबल भयो। फिल्ड करेन्ट…',
        options: ['tyo pani double huncha', 'half huncha', 'same rahancha'],
        answer: 0,
        why: 'Eutai current ho ni ta. Tei bhayera saturation bhanda tala series-motor ko flux Ia sanga proportional huncha.',
      },
    },
    { say: 'Compound motor ma dubai field huncha. Long shunt: shunt field chai series field ra armature dubai ko across huncha.', voice: 'कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छ। लङ शन्ट: शन्ट फिल्ड चाहिँ सिरिज फिल्ड र आर्मेचर दुवैको एक्रस हुन्छ।' },
    {
      say: 'Series field kaha cha, hera.',
      voice: 'सिरिज फिल्ड कहाँ छ, हेर।',
      ask: {
        tag: 'Quick check',
        q: 'Long-shunt compound motor ma series field le carry garcha…',
        voice: 'लङ शन्ट कम्पाउन्ड मोटरमा सिरिज फिल्डले क्यारी गर्छ…',
        options: ['armature current Ia', 'line current IL', 'shunt field current Ish'],
        answer: 0,
        why: 'Series field armature sanga matra series ma cha, tesaile Ise = Ia. Shunt branch tyo bhanda aghi nai chuttincha.',
      },
    },
    { say: 'Short shunt: shunt field armature ko matra across huncha, tesaile series field le full line current carry garcha.', voice: 'सर्ट शन्ट: शन्ट फिल्ड आर्मेचरको मात्र एक्रस हुन्छ, त्यसैले सिरिज फिल्डले फुल लाइन करेन्ट क्यारी गर्छ।' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0, 0)}>
        <Title>Separately excited</Title>
        <Rails xEnd={130} />
        <W d="M130 50 V96 M130 144 V190" />
        <Armature x={130} y={120} r={22} />
        <Lbl x={140} y={76}>Ia</Lbl>
        <W d="M230 70 H300 V113 M300 127 V170 H230 V145 M230 70 V85" color={C.dim} />
        <Source x={300} y={120} label="" />
        <Coil x={230} y={85} len={60} turns={5} vertical />
        <Lbl x={250} y={64} color={C.orange}>If (aafnai supply)</Lbl>
      </g>

      <g className={s.on(1, 2)}>
        <Title>Shunt</Title>
        <Rails xEnd={250} />
        <W d="M140 50 V96 M140 144 V190" />
        <Armature x={140} y={120} r={22} />
        <W d="M250 50 V90 M250 150 V190" color={C.orange} />
        <Coil x={250} y={90} len={60} turns={7} vertical label="Rsh (patalo)" />
        <Arrow x1={52} y1={42} x2={100} y2={42} color={C.yellow} w={2} />
        <Lbl x={60} y={36} color={C.yellow}>IL</Lbl>
        <Lbl x={150} y={78}>Ia</Lbl>
        <Lbl x={258} y={78}>Ish</Lbl>
      </g>

      <g className={s.on(3, 4)}>
        <Title>Series</Title>
        <Rails xEnd={240} gapFrom={90} gapTo={170} />
        <Coil x={90} y={50} len={80} turns={3} label="Rse (moto)" />
        <W d="M240 50 V96 M240 144 V190" />
        <Armature x={240} y={120} r={22} />
        <Arrow x1={180} y1={42} x2={226} y2={42} color={C.yellow} w={2} />
        <Lbl x={250} y={78} color={C.yellow}>I = Ia = Ise</Lbl>
      </g>

      <g className={s.on(5, 6)}>
        <Title>Long-shunt compound</Title>
        <Rails xEnd={290} gapFrom={150} gapTo={220} />
        <W d="M95 50 V92 M95 148 V190" color={C.orange} />
        <Coil x={95} y={92} len={56} turns={6} vertical />
        <Lbl x={104} y={80}>Ish</Lbl>
        <Coil x={150} y={50} len={70} turns={3} />
        <Lbl x={185} y={26 + 46} anchor="middle">Ise = Ia</Lbl>
        <W d="M290 50 V96 M290 144 V190" />
        <Armature x={290} y={120} r={22} />
        <Lbl x={54} y={36} color={C.yellow}>IL</Lbl>
      </g>

      <g className={s.on(7)}>
        <Title>Short-shunt compound</Title>
        <Rails xEnd={290} gapFrom={70} gapTo={140} />
        <Coil x={70} y={50} len={70} turns={3} />
        <Lbl x={105} y={72} anchor="middle">Ise = IL</Lbl>
        <W d="M195 50 V92 M195 148 V190" color={C.orange} />
        <Coil x={195} y={92} len={56} turns={6} vertical />
        <Lbl x={204} y={80}>Ish</Lbl>
        <W d="M290 50 V96 M290 144 V190" />
        <Armature x={290} y={120} r={22} />
        <Lbl x={298} y={78}>Ia</Lbl>
      </g>
    </>
  ),
});

const equations = video('Euta connection, euta set equation', {
  beats: [
    { say: 'Har IOE numerical connection anusar ko sahi current ra voltage equation lekhera start huncha. Yo hera, ek ek type gardai.', voice: 'हर आइओई न्युमेरिकल कनेक्सन अनुसारको सही करेन्ट र भोल्टेज इक्वेसन लेखेर स्टार्ट हुन्छ। यो हेर, एक एक टाइप गर्दै।' },
    { say: 'Shunt: field current V over R sh. Line current I a plus I sh. Ani V equals E b plus I a R a.', voice: 'शन्ट: फिल्ड करेन्ट भी ओभर आर एस एच। लाइन करेन्ट आई ए प्लस आई एस एच। अनि भी इक्वल्स ई बी प्लस आई ए आर ए।' },
    { say: 'Series: jata pani eutai current bagcha, tesaile V equals E b plus I a times R a plus R se.', voice: 'सिरिज: जता पनि एउटै करेन्ट बग्छ, त्यसैले भी इक्वल्स ई बी प्लस आई ए टाइम्स आर ए प्लस आर एस ई।' },
    { say: 'Long shunt: series field le I a carry garcha. So V equals E b plus I a times R a plus R se, ani I L equals I a plus I sh.', voice: 'लङ शन्ट: सिरिज फिल्डले आई ए क्यारी गर्छ। सो भी इक्वल्स ई बी प्लस आई ए टाइम्स आर ए प्लस आर एस ई, अनि आई एल इक्वल्स आई ए प्लस आई एस एच।' },
    { say: 'Short shunt: series field le line current carry garcha. So V equals E b plus I a R a plus I L R se.', voice: 'सर्ट शन्ट: सिरिज फिल्डले लाइन करेन्ट क्यारी गर्छ। सो भी इक्वल्स ई बी प्लस आई ए आर ए प्लस आई एल आर एस ई।' },
    {
      say: 'Aba euta real exam trap, dhyan deu hai.',
      voice: 'अब एउटा रियल एक्जाम ट्र्याप, ध्यान देऊ है।',
      ask: {
        tag: 'IOE 2071 Magh Q4(b)',
        q: 'Euta DC shunt motor le 230 V supply bata 60 A lincha. Rsh = 115 Ω. Armature current kati ho?',
        voice: 'एउटा डीसी शन्ट मोटरले टु थर्टी भोल्ट सप्लाईबाट सिक्स्टी एम्पियर लिन्छ। आर एस एच इक्वल्स वान फिफ्टिन ओम। आर्मेचर करेन्ट कति हो?',
        options: ['58 A', '60 A', '62 A', '2 A'],
        answer: 0,
        why: 'Ish = 230/115 = 2 A, ani “supply bata liyeko” 60 A chai line current ho, tesaile Ia = 60 − 2 = 58 A.',
      },
    },
    { say: 'R a 0.2 ohm bhaye back EMF 230 minus 58 times 0.2, jun 218.4 volt ho. Yo question next chapter ma finish garchau.', voice: 'आर ए जिरो पोइन्ट टु ओम भए ब्याक ई एम एफ टु थर्टी माइनस फिफ्टी एट टाइम्स जिरो पोइन्ट टु, जुन टु एटिन पोइन्ट फोर भोल्ट हो। यो क्वेस्चन नेक्स्ट च्याप्टरमा फिनिस गर्छौं।' },
    { say: 'Trap yo ho: supply bata liyeko current bhaneko line current ho. V equals E b plus I a R a use garnu aghi sadhai I sh ghatau.', voice: 'ट्र्याप यो हो: सप्लाईबाट लिएको करेन्ट भनेको लाइन करेन्ट हो। भी इक्वल्स ई बी प्लस आई ए आर ए युज गर्नु अघि सधैं आई एस एच घटाऊ।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Current ra voltage equation</> },
    { at: 1, kind: 'step', node: <><b>Shunt</b>: Ish = V/Rsh · IL = Ia + Ish · V = Eb + IaRa</> },
    { at: 2, kind: 'step', node: <><b>Series</b>: I = Ia = Ise · V = Eb + Ia(Ra + Rse)</> },
    { at: 3, kind: 'step', node: <><b>Long shunt</b>: Ise = Ia · IL = Ia + Ish · V = Eb + Ia(Ra + Rse)</> },
    { at: 4, kind: 'step', node: <><b>Short shunt</b>: Ise = IL · Ish = (V − IL·Rse)/Rsh · V = Eb + IaRa + IL·Rse</> },
    { at: 6, kind: 'eq', node: <>Ish = 2 A → Ia = 58 A → Eb = 230 − 58 × 0.2 = 218.4 V</> },
    { at: 7, kind: 'note', node: <>Trap: “supply bata liyeko current” = IL. Pahila Ish ghatau.</> },
  ],
});

export const ch5 = {
  title: 'DC motor ka types',
  syllabus: 'Unit 4 · Method of excitation, DC motor ka types',
  steps: [
    connections,
    equations,
    hook('Shunt = Chheu chheu ma · Series = Eutai line ma', [
      'Shunt field: armature sanga parallel, patalo wire ko dherai turn, Ish = V/Rsh.',
      'Series field: armature sanga eutai line ma, moto wire ko thorai turn, Ia carry garcha.',
      'Long shunt: Ise = Ia. Short shunt: Ise = IL.',
    ]),
  ],
};
