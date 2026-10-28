import { Armature, Arrow, C, Coil, D, Source, solve, video } from './kit.jsx';

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

export const connections = video('Field le current kasari pauncha', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'DC motor ko naam field winding le current kasari pauncha tyo anusar huncha. First, separately excited: field ko aafnai supply huncha, armature bata independent.', voice: 'डीसी मोटरको नाम फिल्ड वाइन्डिङले करेन्ट कसरी पाउँछ त्यो अनुसार हुन्छ। फर्स्ट, सेपरेटली एक्साइटेड: फिल्डको आफ्नै सप्लाई हुन्छ, आर्मेचरबाट इन्डिपेन्डेन्ट।' },
    { say: 'Shunt motor: field armature sanga parallel ma connect huncha, sidhai supply across. Line current I a ra I sh ma split huncha.', voice: 'शन्ट मोटर: फिल्ड आर्मेचरसँग प्यारालल मा कनेक्ट हुन्छ, सिधै सप्लाई एक्रस। लाइन करेन्ट आई ए र आई एस एच मा स्प्लिट हुन्छ।' },
    {
      say: 'Shunt field full supply voltage across baseko huncha.',
      voice: 'शन्ट फिल्ड फुल सप्लाई भोल्टेज एक्रस बसेको हुन्छ।',
      ask: {
        q: 'Shunt motor ma line current kun duita ma split huncha?',
        voice: 'शन्ट मोटरमा लाइन करेन्ट कुन दुईटामा स्प्लिट हुन्छ?',
        options: ['Ia ra Ish', 'Ia ra Ise', 'IL ra V'],
        answer: 0,
        why: 'Field parallel ma cha, tesaile IL = Ia + Ish. Shunt field patalo wire ko dherai turn, Ish sano.',
      },
    },
    { say: 'Series motor: field armature sanga series ma huncha, tesaile dubai bata eutai current bagcha. Yo moto wire ko thorai turn ho, resistance ekdam low.', voice: 'सिरिज मोटर: फिल्ड आर्मेचरसँग सिरिजमा हुन्छ, त्यसैले दुवैबाट एउटै करेन्ट बग्छ। यो मोटो वायरको थोरै टर्न हो, रेजिस्टेन्स एकदम लो।' },
    {
      say: 'Current lai follow gara.',
      voice: 'करेन्टलाई फलो गर।',
      ask: {
        q: 'Series field ko wire kasto huncha bhanyo?',
        voice: 'सिरिज फिल्डको तार कस्तो हुन्छ भन्यो?',
        options: ['Patalo wire, dherai turn', 'Moto wire, thorai turn'],
        answer: 1,
        why: 'Series field le pura armature current bokcha, tesaile moto wire ko thorai turn, resistance ekdam low.',
      },
    },
    { say: 'Compound motor ma dubai field huncha. Long shunt: shunt field chai series field ra armature dubai ko across huncha.', voice: 'कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छ। लङ शन्ट: शन्ट फिल्ड चाहिँ सिरिज फिल्ड र आर्मेचर दुवैको एक्रस हुन्छ।' },
    {
      say: 'Series field kaha cha, hera.',
      voice: 'सिरिज फिल्ड कहाँ छ, हेर।',
      ask: {
        q: 'Long shunt ma shunt field kasko across huncha?',
        voice: 'लङ शन्टमा शन्ट फिल्ड कसको अक्रस हुन्छ?',
        options: ['Armature matra', 'Series field ra armature dubai'],
        answer: 1,
        why: 'Long shunt: shunt field le series field ra armature dubai span garcha, tesaile series field le Ia bokcha.',
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

export const equations = video('Euta connection, euta set equation', {
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

// Big picture: a full IOE shunt numerical that needs exactly these equations.
export const shuntLoadSpeed = solve({
  title: 'Shunt motor: load badhda speed kati?',
  paper: '2075 Baishakh',
  paperVoice: 'टु थाउजेन्ड सेभेन्टी फाइभ बैशाख',
  read: 'Euta 1.25 kilowatt, 250 volt ko DC shunt motor no load ma 1000 rpm ma ghumcha. Armature resistance 0.2 ohm, shunt field 250 ohm. Load halepachi 50 ampere tanda speed kati huncha, nikalnu cha.',
  readVoice: 'एउटा वान पोइन्ट टु फाइभ किलोवाट, टु हन्ड्रेड फिफ्टी भोल्टको डीसी शन्ट मोटर नो लोडमा थाउजेन्ड आर पी एममा घुम्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट टु ओम, शन्ट फिल्ड टु हन्ड्रेड फिफ्टी ओम। लोड हालेपछि फिफ्टी एम्पियर तान्दा स्पिड कति हुन्छ, निकाल्नु छ।',
  question: <>A <D>1.25 kW</D>, <D>250 V</D> DC shunt motor on no load runs at <D>1000 rpm</D>. <D>Ra = 0.2 Ω</D>, <D>Rsh = 250 Ω</D>. Find its speed when loaded and drawing <D>50 A</D>. (The 1.25 kW is read as the no-load input.)</>,
  given: [
    { node: <>V = 250 V, Ra = 0.2 Ω, Rsh = 250 Ω</>, say: 'V 250 volt, Ra 0.2 ohm, Rsh 250 ohm', voice: 'भी टु हन्ड्रेड फिफ्टी भोल्ट, आर ए जिरो पोइन्ट टु ओम, आर एस एच टु हन्ड्रेड फिफ्टी ओम' },
    { node: <>No load ma: input 1.25 kW ⟹ IL₀ = 1250/250 = 5 A, N₀ = 1000 rpm</>, say: 'no load ma 1.25 kilowatt linchha, tesaile line current 1250 over 250, matlab 5 ampere, 1000 rpm ma', voice: 'नो लोडमा वान पोइन्ट टु फाइभ किलोवाट लिन्छ, तेसैले लाइन करेन्ट ट्वेल्भ हन्ड्रेड फिफ्टी ओभर टु हन्ड्रेड फिफ्टी, मतलब फाइभ एम्पियर, थाउजेन्ड आर पी एममा' },
    { node: <>Load ma: IL = 50 A, N = ?</>, say: 'load ma line current 50 ampere', voice: 'लोडमा लाइन करेन्ट फिफ्टी एम्पियर' },
  ],
  find: { node: <>50 A ma speed N</>, say: '50 ampere ma speed kati, tyo chahiyo.', voice: 'फिफ्टी एम्पियरमा स्पिड कति, त्यो चाहियो।' },
  idea: { node: <>Shunt ⟹ φ fixed ⟹ N₂/N₁ = Eb₂/Eb₁</>, say: 'Shunt motor ho, so flux constant rahancha. Ani speed simply back EMF ko proportional huncha, simple cha.', voice: 'शन्ट मोटर हो, सो फ्लक्स कन्स्टेन्ट रहन्छ। अनि स्पिड सिम्प्ली ब्याक ई एम एफको प्रोपोर्सनल हुन्छ, सिम्पल छ।' },
  steps: [
    { node: <>Ish = 250/250 = <b>1 A</b></>, say: 'Pahila field current: 250 over 250, 1 ampere.', voice: 'पहिला फिल्ड करेन्ट: टु हन्ड्रेड फिफ्टी ओभर टु हन्ड्रेड फिफ्टी, वान एम्पियर।' },
    {
      node: <>Ia₀ = 5 − 1 = 4 A,  Ia = 50 − 1 = <b>49 A</b></>,
      say: 'Aba yeslai duitai line current bata ghatau.',
      voice: 'अब यसलाई दुईटै लाइन करेन्टबाट घटाऊ।',
      ask: { tag: 'Step predict gara', q: '5 A ra 50 A chai line current hun. Load ma armature current kati?', voice: 'फाइभ एम्पियर र फिफ्टी एम्पियर चाहिँ लाइन करेन्ट हुन्। लोडमा आर्मेचर करेन्ट कति?', options: ['49 A', '50 A', '51 A'], answer: 0, why: 'Shunt motor ma IL = Ia + Ish, tesaile Ia = 50 − 1 = 49 A.' },
    },
    { node: <>Eb₀ = 250 − 4 × 0.2 = 249.2 V</>, say: 'No load ma back EMF: 250 minus 4 times 0.2, matlab 249.2 volt.', voice: 'नो लोडमा ब्याक ई एम एफ: टु हन्ड्रेड फिफ्टी माइनस फोर टाइम्स जिरो पोइन्ट टु, मतलब टु हन्ड्रेड फोर्टी नाइन पोइन्ट टु भोल्ट।' },
    { node: <>Eb = 250 − 49 × 0.2 = 240.2 V</>, say: 'Load ma: 250 minus 49 times 0.2, matlab 240.2 volt.', voice: 'लोडमा: टु हन्ड्रेड फिफ्टी माइनस फोर्टी नाइन टाइम्स जिरो पोइन्ट टु, मतलब टु हन्ड्रेड फोर्टी पोइन्ट टु भोल्ट।' },
    { node: <>N = 1000 × 240.2 / 249.2</>, say: 'Speed back EMF sangai scale huncha: 1000 times 240.2 over 249.2.', voice: 'स्पिड ब्याक ई एम एफसँगै स्केल हुन्छ: थाउजेन्ड टाइम्स टु हन्ड्रेड फोर्टी पोइन्ट टु ओभर टु हन्ड्रेड फोर्टी नाइन पोइन्ट टु।' },
  ],
  answer: { node: <>N ≈ 964 rpm</>, say: 'Lagbhag 964 rpm. Shunt motor load ma ali matra slow huncha.', voice: 'लगभग नाइन हन्ड्रेड सिक्स्टी फोर आर पी एम। शन्ट मोटर लोडमा अलि मात्र स्लो हुन्छ।' },
  trap: { node: <>Trap: Eb₀ = V = 250 V liyo bhane (no-load IaRa drop bhulera) 960.8 rpm aaucha. Eb₀ = 249.2 V use gara.</>, say: 'Trap yo ho: no load ko back EMF pura 250 volt liyo bhane 960.8 rpm aaucha. No load ma pani Eb nikala hai.', voice: 'ट्र्याप यो हो: नो लोडको ब्याक ई एम एफ पुरा टु हन्ड्रेड फिफ्टी भोल्ट लियो भने नाइन हन्ड्रेड सिक्स्टी पोइन्ट एट आर पी एम आउँछ। नो लोडमा पनि ई बी निकाल है।' },
});
