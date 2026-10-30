import { Arrow, C, Conductor, K, Resistor, Source, video } from './kit.jsx';

/*
  4.1 segment 2, Derivation: every equation the syllabus bullet needs, one video
  each (skill rules 31–34). Each step is one board line that the caption reads:
  a label, then the maths in an aligned block, one "=" per line. A term that is
  about to be replaced pulses, then what it becomes drops into its place on the
  next row, in the same colour (X and R below); cancels are struck in red.
    Back EMF equation → voltage and power equation → torque (force method) → torque (power method)
*/

// Inks for terms (hex, so KaTeX \textcolor takes them; looks.js repaints them).
const BL = C.blue; // flux, B, Eb
const OR = C.orange; // current
const GR = C.green; // counts and results
const VI = C.violet; // time, per path

const tex = (s) => <K>{s}</K>;
// Term expanding (rule 33c): X marks a term that is about to be replaced (it
// pulses once the line is written); R is what it becomes on a later row, which
// drops into place after the pulse (n = order, for two or more).
const X = (t, c) => String.raw`\htmlClass{xt}{\textcolor{${c}}{${t}}}`;
const R = (t, c, n = 1) => String.raw`\htmlClass{xr xr${n}}{\textcolor{${c}}{${t}}}`;
const step = (label, math) => <><span className="lbl">{label}</span>{tex(math)}</>;

export const backEmfDerivation = video('Derivation: back EMF equation', {
  tall: true,
  beats: [
    {
      say: 'Back EMF equation derive garchau. Symbols: P pole, phi flux per pole, Z conductor, A parallel path, ra N speed rpm ma.',
      voice: 'ब्याक इएमएफ इक्वेसन डेराइभ गर्छौं। सिम्बोल्स — पी पोल, फाइ फ्लक्स पर पोल, जेड कन्डक्टर, ए प्यारालल पाथ, र एन स्पिड, आरपीएममा।',
    },
    {
      say: 'Euta revolution ma conductor sabai P pole muni bata pass huncha. Tesaile cut hune flux d Phi equals P phi weber.',
      voice: 'एउटा रिभोलुसनमा, कन्डक्टर सबै पी पोलमुनिबाट पास हुन्छ। त्यसैले कट हुने फ्लक्स — डी फाइ इक्वल्स, पी फाइ वेबर।',
    },
    {
      say: 'Speed N rpm bhaye, euta revolution ko time d t equals sixty over N second.',
      voice: 'स्पिड एन आरपीएम भए, एउटा रिभोलुसनको टाइम — डी टी इक्वल्स, सिक्स्टी ओभर एन सेकेन्ड।',
    },
    {
      say: 'Faraday ko law: e equals d Phi over d t. d Phi ko thau ma P phi, d t ko thau ma sixty over N halda, e equals P phi N over sixty volt.',
      voice: 'फाराडेको ल — ई इक्वल्स, डी फाइ ओभर डी टी। डी फाइको ठाउँमा पी फाइ, डी टीको ठाउँमा सिक्स्टी ओभर एन हाल्दा, ई इक्वल्स — पी फाइ एन, ओभर सिक्स्टी भोल्ट।',
    },
    {
      say: 'Euta parallel path ma Z over A conductor series ma hunchan. Machine ko EMF euta path ko EMF ho, tesaile e lai Z over A le multiply garchau.',
      voice: 'एउटा प्यारालल पाथमा, जेड ओभर ए कन्डक्टर सिरिजमा हुन्छन्। मेसिनको इएमएफ, एउटा पाथको इएमएफ हो। त्यसैले, ईलाई जेड ओभर एले मल्टिप्लाई गर्छौं।',
    },
    {
      say: 'Result: E b equals P phi Z N over sixty A. Motor ma yo EMF supply voltage ko ulto huncha, yasari yaslai back EMF bhanincha.',
      voice: 'रिजल्ट — ई बी इक्वल्स, पी फाइ जेड एन, ओभर सिक्स्टी ए। मोटरमा यो इएमएफ, सप्लाई भोल्टेजको उल्टो हुन्छ। यसरी यसलाई ब्याक इएमएफ भनिन्छ।',
    },
    {
      say: 'Euta machine ma P, Z ra A fixed hunchan. Yesko matlab E b equals k phi N: back EMF flux ra speed sanga proportional cha.',
      voice: 'एउटा मेसिनमा, पी, जेड र ए फिक्स्ड हुन्छन्। यसको मतलब, ई बी इक्वल्स — के फाइ एन। ब्याक इएमएफ, फ्लक्स र स्पिडसँग प्रोपोर्सनल छ।',
      ask: {
        tag: 'Quick check',
        q: 'Flux same rakhera motor ko speed aadha garyo. Back EMF kati huncha?',
        voice: 'फ्लक्स उही राखेर, मोटरको स्पिड आधा गर्यो। ब्याक इएमएफ कति हुन्छ?',
        options: ['Aadha huncha', 'Same rahancha', 'Dui guna huncha'],
        answer: 0,
        why: 'Eb = kφN. φ same ra N aadha bhaye Eb pani aadha.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Back EMF equation</> },
    { at: 0, kind: 'note', node: <>P poles · φ Wb/pole · Z conductors · A parallel paths · N rpm</> },
    { at: 1, kind: 'step', node: step('Flux cut in one revolution', String.raw`\textcolor{${BL}}{d\Phi} = P\phi\ \text{Wb}`) },
    { at: 2, kind: 'step', node: step('Time of one revolution', String.raw`\textcolor{${VI}}{dt} = \dfrac{60}{N}\ \text{s}`) },
    {
      at: 3,
      kind: 'step',
      node: step('EMF per conductor (Faraday)', String.raw`\begin{aligned} e &= \dfrac{${X(String.raw`d\Phi`, BL)}}{${X('dt', VI)}} \\ &= \dfrac{${R(String.raw`P\phi`, BL, 1)}}{${R('60/N', VI, 2)}} \\ &= \dfrac{P\phi N}{60}\ \text{V} \end{aligned}`),
    },
    {
      at: 4,
      kind: 'step',
      node: step('EMF of the machine = EMF of one path', String.raw`\begin{aligned} E_b &= ${X('e', GR)} \times \textcolor{${OR}}{\dfrac{Z}{A}} \\ &= ${R(String.raw`\dfrac{P\phi N}{60}`, GR, 1)} \cdot \textcolor{${OR}}{\dfrac{Z}{A}} \end{aligned}`),
    },
    { at: 5, kind: 'eq', node: tex(String.raw`E_b = \dfrac{P\phi Z N}{60A}\ \text{V}`) },
    { at: 6, kind: 'step', node: step('Given machine: k = PZ/60A', String.raw`\begin{aligned} E_b &= k\,\phi N \\ \Rightarrow\ E_b &\propto \phi N \end{aligned}`) },
  ],
  pov: 'khan',
  // Exam POV: the derivation as it is written in the answer sheet (rule 41).
  variants: {
    exam: {
      tall: true,
      beats: [
        {
          say: 'EMF equation, answer sheet ma lekhne tarika. Let: P pole, phi flux per pole, Z conductor, A parallel path, ra N speed rpm ma.',
          voice: 'इएमएफ इक्वेसन, आन्सर सिटमा लेख्ने तरिका। लेट — पी पोल, फाइ फ्लक्स पर पोल, जेड कन्डक्टर, ए प्यारालल पाथ, र एन स्पिड आरपीएममा।',
        },
        {
          say: 'Euta revolution ma euta conductor le cut garne flux d Phi equals P phi weber, equation ek. Time d t equals sixty over N second, equation dui.',
          voice: 'एउटा रिभोलुसनमा, एउटा कन्डक्टरले कट गर्ने फ्लक्स — डी फाइ इक्वल्स पी फाइ वेबर, इक्वेसन वान। टाइम — डी टी इक्वल्स सिक्स्टी ओभर एन सेकेन्ड, इक्वेसन टु।',
        },
        {
          say: 'Faraday ko law anusar EMF per conductor e equals d Phi over d t, arthat P phi N over sixty volt, equation tin.',
          voice: 'फाराडेको ल अनुसार, इएमएफ पर कन्डक्टर — ई इक्वल्स डी फाइ ओभर डी टी, अर्थात पी फाइ एन ओभर सिक्स्टी भोल्ट, इक्वेसन थ्री।',
        },
        {
          say: 'Euta path ma Z over A conductor series ma hunchan. Yesko matlab E b equals P phi Z N over sixty A, equation char.',
          voice: 'एउटा पाथमा, जेड ओभर ए कन्डक्टर सिरिजमा हुन्छन्। यसको मतलब — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए, इक्वेसन फोर।',
        },
        {
          say: 'Given machine ma P, Z ra A constant. Phalswarup E b phi N sanga proportional. Hence proved.',
          voice: 'गिभन मेसिनमा, पी, जेड र ए कन्स्टेन्ट। फलस्वरूप, ई बी फाइ एनसँग प्रोपोर्सनल। हेन्स प्रुभ्ड।',
        },
      ],
      board: [
        { at: 0, kind: 'h', node: <>EMF equation of a DC machine</> },
        { at: 0, kind: 'step', node: <>Let,&nbsp; P = number of poles; φ = flux per pole (Wb); Z = total armature conductors; A = number of parallel paths; N = speed (rpm).</> },
        { at: 1, kind: 'step', node: <>In one revolution, flux cut by one conductor and the time taken:{tex(String.raw`\begin{aligned} d\Phi &= P\phi\ \text{Wb} && \cdots(1) \\ dt &= \dfrac{60}{N}\ \text{s} && \cdots(2) \end{aligned}`)}</> },
        { at: 2, kind: 'step', node: <>By Faraday’s law, EMF per conductor,{tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} && \\ &= \dfrac{P\phi N}{60}\ \text{V} && \cdots(3) \end{aligned}`)}</> },
        { at: 3, kind: 'step', node: <>With Z/A conductors in series per path, ∴{tex(String.raw`\boxed{E_b = \dfrac{P\phi Z N}{60A}\ \text{V}} \qquad \cdots(4)`)}</> },
        { at: 4, kind: 'step', node: <>For a given machine, <K>{String.raw`E_b = k\phi N`}</K> ∴ <K>{String.raw`E_b \propto \phi N`}</K>. <b>Hence proved.</b></> },
      ],
    },
  },
});

// Armature circuit for the voltage equation: supply V, Ra, armature with Eb
// against the supply, Ia round the loop.
const circuit = (s) => (
  <>
    <g className={s.on(0)}>
      <line x1={60} y1={40} x2={140} y2={40} stroke={C.chalk} strokeWidth={2} />
      <line x1={210} y1={40} x2={280} y2={40} stroke={C.chalk} strokeWidth={2} />
      <line x1={280} y1={40} x2={280} y2={86} stroke={C.chalk} strokeWidth={2} />
      <line x1={280} y1={134} x2={280} y2={180} stroke={C.chalk} strokeWidth={2} />
      <line x1={60} y1={180} x2={280} y2={180} stroke={C.chalk} strokeWidth={2} />
      <line x1={60} y1={40} x2={60} y2={96} stroke={C.chalk} strokeWidth={2} />
      <line x1={60} y1={124} x2={60} y2={180} stroke={C.chalk} strokeWidth={2} />
      <g className="seq">
        <Source x={60} y={110} label="V" />
      </g>
      <g className="seq" style={{ '--d': '1800ms' }}>
        <Resistor x1={140} y={40} x2={210} label="Ra" />
      </g>
      <g className="seq pop" style={{ '--d': '3200ms' }}>
        <circle cx={280} cy={110} r={24} fill={C.board} stroke={C.chalk} strokeWidth={2.4} />
        <text x={280} y={115} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.chalk}>Eb</text>
        <text x={290} y={82} fontSize={13} fontWeight={700} fill={C.blue}>+</text>
        <text x={290} y={146} fontSize={15} fontWeight={700} fill={C.blue}>−</text>
        <text x={312} y={114} fontSize={12} fill={C.blue}>opposes V</text>
      </g>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <Arrow x1={100} y1={28} x2={130} y2={28} color={C.orange} w={2.4} />
      <text x={96} y={22} fontSize={13} fontWeight={700} fill={C.orange}>Ia</text>
      <text x={175} y={70} textAnchor="middle" fontSize={12} fill={C.dim}>drop Ia·Ra</text>
    </g>
  </>
);

export const voltageEquation = video('Derivation: voltage ra power equation', {
  tall: true,
  viewBox: '0 0 360 200',
  draw: circuit,
  beats: [
    {
      say: 'Armature circuit: supply V, armature resistance R a, ra armature bhitra back EMF E b, jun supply ko ulto cha.',
      voice: 'आर्मेचर सर्किट — सप्लाई भी, आर्मेचर रेजिस्टेन्स आर ए, र आर्मेचर भित्र ब्याक इएमएफ ई बी, जुन सप्लाईको उल्टो छ।',
    },
    {
      say: 'Loop ma KVL: supply voltage V, back EMF E b ra R a ko drop I a R a ma baadincha.',
      voice: 'लुपमा केभीएल — सप्लाई भोल्टेज भी, ब्याक इएमएफ ई बी, र आर ए को ड्रप आई ए आर एमा बाँडिन्छ।',
    },
    {
      say: 'Yesbata armature current: I a equals V minus E b, over R a. E b thulo bhaye current sano huncha.',
      voice: 'यसबाट आर्मेचर करेन्ट — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए। ई बी ठूलो भए, करेन्ट सानो हुन्छ।',
    },
    {
      say: 'Power equation ko lagi voltage equation ko dubai side lai I a le multiply garchau.',
      voice: 'पावर इक्वेसनको लागि, भोल्टेज इक्वेसनको दुवै साइडलाई, आई एले मल्टिप्लाई गर्छौं।',
    },
    {
      say: 'V I a armature ma diyeko electrical input ho. I a squared R a armature copper loss ho, jun heat bhayera jancha.',
      voice: 'भी आई ए — आर्मेचरमा दिएको इलेक्ट्रिकल इनपुट हो। आई ए स्क्वायर आर ए — आर्मेचर कपर लस हो, जुन हिट भएर जान्छ।',
    },
    {
      say: 'Baki E b I a nai mechanical power ma convert huncha: P m equals E b I a.',
      voice: 'बाँकी ई बी आई ए नै, मेकानिकल पावरमा कन्भर्ट हुन्छ। पी एम इक्वल्स — ई बी आई ए।',
      ask: {
        tag: 'Quick check',
        q: 'Armature input V·Ia ko kun part mechanical power ma convert huncha?',
        voice: 'आर्मेचर इनपुट भी आई एको कुन पार्ट, मेकानिकल पावरमा कन्भर्ट हुन्छ?',
        options: ['Eb·Ia', 'Ia²·Ra', 'V·Ia pura'],
        answer: 0,
        why: 'V·Ia = Eb·Ia + Ia²Ra. Ia²Ra heat ho; Eb·Ia mechanical power Pm ho.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Voltage ra power equation</> },
    { at: 1, kind: 'eq', node: tex(String.raw`V = \textcolor{${BL}}{E_b} + \textcolor{${OR}}{I_a}R_a`) },
    { at: 2, kind: 'step', node: step('Armature current', String.raw`\textcolor{${OR}}{I_a} = \dfrac{V - \textcolor{${BL}}{E_b}}{R_a}`) },
    {
      at: 3,
      kind: 'step',
      node: step('Both sides × Ia', String.raw`\begin{aligned} V\,\textcolor{${OR}}{I_a} &= (E_b + I_aR_a)\,\textcolor{${OR}}{I_a} \\ &= E_bI_a + I_a^2R_a \end{aligned}`),
    },
    {
      at: 4,
      kind: 'step',
      node: step('Meaning of each term', String.raw`\underbrace{VI_a}_{\textstyle \text{input}} = \underbrace{\textcolor{${GR}}{E_bI_a}}_{\textstyle \textcolor{${GR}}{P_m}} + \underbrace{I_a^2R_a}_{\textstyle \text{Cu loss}}`),
    },
    { at: 5, kind: 'eq', node: tex(String.raw`P_m = E_b\,I_a`) },
  ],
});

// Maths POV (The Efficient Engineer): the symbols live on the figure first.
// One conductor on the armature: radius r to it, force F along the rim (the
// lever arm), length l into the page. Same beats as the main script.
const lever = (s) => (
  <>
    <g className={s.on(0)}>
      <circle cx={150} cy={110} r={74} fill="none" stroke={C.chalk} strokeWidth={2.4} />
      <circle cx={150} cy={110} r={3} fill={C.chalk} />
      <g className="seq" style={{ '--d': '2200ms' }}>
        <line x1={150} y1={110} x2={224} y2={110} stroke={C.chalk} strokeWidth={1.6} strokeDasharray="4 4" />
        <text x={186} y={104} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.chalk}>r</text>
      </g>
      <g className="seq" style={{ '--d': '3600ms' }}>
        <text x={150} y={206} textAnchor="middle" fontSize={12} fill={C.dim}>active length l (into the page)</text>
      </g>
    </g>
    <g className={s.on(1) + s.hl(1)}>
      <Conductor x={224} y={110} dir="out" />
      <text x={242} y={136} fontSize={13} fontWeight={700} fill={C.orange}>Ic = Ia/A</text>
    </g>
    <g className={s.on(2) + s.hl(2)}>
      {[40, 80, 140, 180].map((y) => (
        <line key={y} x1={20} y1={y} x2={330} y2={y} stroke={C.blue} strokeOpacity={0.45} strokeWidth={1.2} strokeDasharray="5 6" />
      ))}
      <text x={300} y={34} fontSize={13} fontWeight={700} fill={C.blue}>B</text>
    </g>
    <g className={s.on(3) + s.hl(3) + s.hl(4)}>
      <Arrow x1={238} y1={104} x2={238} y2={50} color={C.green} w={2.8} />
      <text x={246} y={60} fontSize={14} fontWeight={700} fill={C.green}>F</text>
    </g>
    <g className={s.on(5) + s.hl(5)}>
      <path d="M200 52 A74 74 0 0 0 112 46" fill="none" stroke={C.yellow} strokeWidth={3} />
      <polygon points="112,46 124,40 122,54" fill={C.yellow} />
      <text x={150} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.yellow}>τ = F·r</text>
    </g>
    <g className={s.on(6) + s.hl(6)}>
      <text x={150} y={130} textAnchor="middle" fontSize={13} fontWeight={700} fill={C.green}>× Z conductors</text>
    </g>
  </>
);

export const torqueDerivation = video('Derivation: torque equation (force method)', {
  tall: true,
  beats: [
    {
      say: 'Torque equation, force method bata. Armature radius r, active length l, ra armature current I a.',
      voice: 'टर्क इक्वेसन, फोर्स मेथडबाट। आर्मेचर रेडियस आर, एक्टिभ लेन्थ एल, र आर्मेचर करेन्ट आई ए।',
    },
    {
      say: 'Armature current A ota parallel path ma barabar baadincha. Tesaile euta conductor ko current I c equals I a over A.',
      voice: 'आर्मेचर करेन्ट, ए ओटा प्यारालल पाथमा बराबर बाँडिन्छ। त्यसैले एउटा कन्डक्टरको करेन्ट — आई सी इक्वल्स, आई ए ओभर ए।',
    },
    {
      say: 'Total flux P phi armature ko surface two pi r l ma phailincha. Tesaile average flux density B equals P phi over two pi r l.',
      voice: 'टोटल फ्लक्स पी फाइ, आर्मेचरको सर्फेस टु पाइ आर एलमा फैलिन्छ। त्यसैले एभरेज फ्लक्स डेन्सिटी — बी इक्वल्स, पी फाइ ओभर टु पाइ आर एल।',
    },
    {
      say: 'Euta conductor ma force F equals B I c l. Aba B ra I c lai expand garchau.',
      voice: 'एउटा कन्डक्टरमा फोर्स — एफ इक्वल्स, बी आई सी एल। अब, बी र आई सीलाई एक्स्पान्ड गर्छौं।',
    },
    {
      say: 'Expand garda l cancel huncha. Force F equals P phi I a over two pi r A.',
      voice: 'एक्स्पान्ड गर्दा, एल क्यान्सिल हुन्छ। फोर्स — एफ इक्वल्स, पी फाइ आई ए, ओभर टु पाइ आर ए।',
    },
    {
      say: 'Euta conductor ko torque, force times radius. r pani cancel huncha: tau equals P phi I a over two pi A.',
      voice: 'एउटा कन्डक्टरको टर्क, फोर्स टाइम्स रेडियस। आर पनि क्यान्सिल हुन्छ — टाउ इक्वल्स, पी फाइ आई ए, ओभर टु पाइ ए।',
      ask: {
        tag: 'Quick check',
        q: 'Euta conductor ko torque τ kun kura ma depend gardaina?',
        voice: 'एउटा कन्डक्टरको टर्क टाउ, कुन कुरामा डिपेन्ड गर्दैन?',
        options: ['Radius r', 'Flux φ', 'Current Ia'],
        answer: 0,
        why: 'F ma 1/r cha ra τ = F·r, tesaile r cancel huncha: τ = PφIa/2πA.',
      },
    },
    {
      say: 'Commutator le sabai Z conductor ko torque eutai direction ma rakhcha. Aba tau lai Z le multiply garchau.',
      voice: 'कम्युटेटरले सबै जेड कन्डक्टरको टर्क, एउटै डाइरेक्सनमा राख्छ। अब, टाउलाई जेडले मल्टिप्लाई गर्छौं।',
    },
    {
      say: 'One over two pi equals 0.159. Yesko matlab T a equals 0.159 phi Z I a times P over A, newton metre ma.',
      voice: 'वान ओभर टु पाइ इक्वल्स, जिरो पोइन्ट वान फाइभ नाइन। यसको मतलब, टी ए इक्वल्स — जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए। न्युटन मिटरमा।',
    },
    {
      say: 'Euta machine ma P, Z ra A fixed hunchan. Phalswarup armature torque flux ra armature current ko product sanga proportional cha.',
      voice: 'एउटा मेसिनमा, पी, जेड र ए फिक्स्ड हुन्छन्। फलस्वरूप आर्मेचर टर्क — फ्लक्स र आर्मेचर करेन्टको प्रोडक्टसँग प्रोपोर्सनल छ।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Torque equation: force method</> },
    { at: 0, kind: 'note', node: <>r radius · l active length · P poles · φ Wb/pole · Z conductors · A paths · I<sub>a</sub> armature current</> },
    { at: 1, kind: 'step', node: step('Current per conductor', String.raw`\textcolor{${OR}}{I_c} = \dfrac{I_a}{A}`) },
    { at: 2, kind: 'step', node: step('Average flux density', String.raw`\textcolor{${BL}}{B} = \dfrac{P\phi}{2\pi r l}`) },
    {
      at: 3,
      kind: 'step',
      node: step('Force on one conductor', String.raw`F = ${X('B', BL)}\;${X('I_c', OR)}\;l`),
    },
    {
      at: 4,
      kind: 'step',
      node: step('Substitute', String.raw`\begin{aligned} F &= ${R(String.raw`\dfrac{P\phi}{2\pi r \cancel{l}}`, BL, 1)} \cdot ${R(String.raw`\dfrac{I_a}{A}`, OR, 2)} \cdot \cancel{l} \\ &= \dfrac{P\phi I_a}{2\pi r A} \end{aligned}`),
    },
    {
      at: 5,
      kind: 'step',
      node: step('Torque of one conductor', String.raw`\begin{aligned} \tau &= ${X('F', GR)} \cdot r \\ &= ${R(String.raw`\dfrac{P\phi I_a}{2\pi \cancel{r} A}`, GR, 1)} \cdot \cancel{r} \\ &= \dfrac{P\phi I_a}{2\pi A} \end{aligned}`),
    },
    { at: 6, kind: 'step', node: step('All Z conductors', String.raw`\begin{aligned} T_a &= \textcolor{${GR}}{Z}\,\tau \\ &= \dfrac{P\phi \textcolor{${GR}}{Z} I_a}{2\pi A} \end{aligned}`) },
    { at: 7, kind: 'eq', node: tex(String.raw`T_a = 0.159\,\phi Z I_a \left(\tfrac{P}{A}\right)\ \text{N}\cdot\text{m}`) },
    { at: 8, kind: 'step', node: step('Given machine', String.raw`\textcolor{${GR}}{T_a \propto \phi\, I_a}`) },
  ],
  pov: 'khan',
  // POV variants (src/content/pov.js). Maths: the same lines over the lever
  // figure, with a compact board, so no new voice is needed.
  variants: {
    efficient: {
      tall: true,
      viewBox: '0 0 340 216',
      draw: lever,
      board: [
        { at: 0, kind: 'h', node: <>Torque: force method</> },
        { at: 1, kind: 'step', node: tex(String.raw`\textcolor{${OR}}{I_c} = \dfrac{I_a}{A},\qquad \textcolor{${BL}}{B} = \dfrac{P\phi}{2\pi r l}`) },
        { at: 3, kind: 'step', node: tex(String.raw`\begin{aligned} F &= ${X('B', BL)}\,${X('I_c', OR)}\,l \\ &= ${R(String.raw`\dfrac{P\phi I_a}{2\pi r A}`, GR, 1)} \end{aligned}`) },
        { at: 5, kind: 'step', node: tex(String.raw`\begin{aligned} \tau &= F\,r \\ &= \dfrac{P\phi I_a}{2\pi A} \end{aligned}`) },
        { at: 7, kind: 'eq', node: tex(String.raw`T_a = 0.159\,\phi Z I_a \tfrac{P}{A}`) },
        { at: 8, kind: 'step', node: tex(String.raw`\textcolor{${GR}}{T_a \propto \phi\, I_a}`) },
      ],
    },
  },
});

export const torqueFromPower = video('Derivation: torque equation (power method)', {
  tall: true,
  beats: [
    {
      say: 'Arko method: mechanical power bata torque. P m equals E b I a, ra rotating shaft ma P m equals T a omega pani ho.',
      voice: 'अर्को मेथड — मेकानिकल पावरबाट टर्क। पी एम इक्वल्स ई बी आई ए। र घुम्ने साफ्टमा, पी एम इक्वल्स टी ए ओमेगा पनि हो।',
    },
    {
      say: 'Omega equals two pi N over sixty radian per second. Tesaile T a equals sixty E b I a over two pi N, arthat 9.55 E b I a over N.',
      voice: 'ओमेगा इक्वल्स — टु पाइ एन ओभर सिक्स्टी, रेडियन पर सेकेन्ड। त्यसैले टी ए इक्वल्स — सिक्स्टी ई बी आई ए, ओभर टु पाइ एन। अर्थात, नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन।',
    },
    {
      say: 'Aba E b ko thau ma P phi Z N over sixty A halchau. N ra sixty dubai cancel hunchan.',
      voice: 'अब, ई बीको ठाउँमा — पी फाइ जेड एन, ओभर सिक्स्टी ए हाल्छौं। एन र सिक्स्टी, दुवै क्यान्सिल हुन्छन्।',
    },
    {
      say: 'Dubai method bata eutai result aaucha: T a equals 0.159 phi Z I a times P over A.',
      voice: 'दुवै मेथडबाट एउटै रिजल्ट आउँछ — टी ए इक्वल्स, जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए।',
      ask: {
        tag: 'Quick check',
        q: 'Motor ko Eb = 210 V, Ia = 20 A ra N = 1500 rpm cha. Armature torque kati huncha?',
        voice: 'मोटरको ई बी टु हन्ड्रेड टेन भोल्ट, आई ए ट्वेन्टी एम्पियर, र एन पन्ध्र सय आरपीएम छ। आर्मेचर टर्क कति हुन्छ?',
        options: ['≈ 26.7 N·m', '≈ 2.8 N·m', '≈ 267 N·m'],
        answer: 0,
        why: 'Ta = 9.55 × 210 × 20 / 1500 ≈ 26.7 N·m. (2.8 N·m le 9.55 birsancha.)',
      },
    },
    {
      say: 'Iron ra friction loss pachi load samma pugne torque shaft torque ho: T sh equals 9.55 output over N. Farak lost torque ho.',
      voice: 'आइरन र फ्रिक्सन लसपछि, लोडसम्म पुग्ने टर्क — साफ्ट टर्क हो। टी एस एच इक्वल्स, नाइन पोइन्ट फाइभ फाइभ, आउटपुट ओभर एन। फरक, लस्ट टर्क हो।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Torque equation: power method</> },
    { at: 0, kind: 'step', node: step('Mechanical power, two ways', String.raw`\begin{aligned} P_m &= \textcolor{${BL}}{E_b}\,I_a \\ P_m &= T_a\,\textcolor{${VI}}{\omega} \end{aligned}`) },
    {
      at: 1,
      kind: 'step',
      node: step('Solve for Ta', String.raw`\begin{aligned} T_a &= \dfrac{E_bI_a}{${X(String.raw`\omega`, VI)}} \\ &= \dfrac{E_bI_a}{${R(String.raw`2\pi N/60`, VI, 1)}} \\ &= \dfrac{60\,E_bI_a}{2\pi N} \\ &= 9.55\,\dfrac{E_bI_a}{N}\ \text{N}\cdot\text{m} \end{aligned}`),
    },
    {
      at: 2,
      kind: 'step',
      node: step('Put Eb = PφZN/60A', String.raw`\begin{aligned} T_a &= \dfrac{60}{2\pi N} \cdot ${X('E_b', BL)} \cdot I_a \\ &= \dfrac{\cancel{60}}{2\pi \cancel{N}} \cdot ${R(String.raw`\dfrac{P\phi Z\cancel{N}}{\cancel{60}A}`, BL, 1)} \cdot I_a \\ &= \dfrac{P\phi Z I_a}{2\pi A} \end{aligned}`),
    },
    { at: 3, kind: 'eq', node: tex(String.raw`\begin{aligned} T_a &= 0.159\,\phi Z I_a \left(\tfrac{P}{A}\right) \\ &= 9.55\,\dfrac{E_bI_a}{N} \end{aligned}`) },
    { at: 4, kind: 'step', node: step('Shaft torque', String.raw`\begin{aligned} T_{sh} &= 9.55\,\dfrac{P_{out}}{N} \\ T_a - T_{sh} &= \text{lost torque} \end{aligned}`) },
  ],
});
