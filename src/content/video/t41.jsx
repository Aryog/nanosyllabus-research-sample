import { Arrow, C, K, Resistor, Source, video } from './kit.jsx';

/*
  4.1 segment 2, Derivation: every equation the syllabus bullet needs, one video
  each (skill rules 31–34). Each step is one board line that the caption reads:
  a label, then the maths in an aligned block, one "=" per line. A term that is
  about to be replaced carries an underbrace with what it becomes, in the same
  colour as on the next line; cancels are struck in red.
    Back EMF equation → voltage and power equation → torque (force method) → torque (power method)
*/

// Inks for terms (hex, so KaTeX \textcolor takes them; looks.js repaints them).
const BL = C.blue; // flux, B, Eb
const OR = C.orange; // current
const GR = C.green; // counts and results
const VI = C.violet; // time, per path

const tex = (s) => <K>{s}</K>;
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
      say: 'Result: E b equals P phi Z N over sixty A. Motor ma yo EMF supply voltage ko ulto huncha, tesaile yaslai back EMF bhanincha.',
      voice: 'रिजल्ट — ई बी इक्वल्स, पी फाइ जेड एन, ओभर सिक्स्टी ए। मोटरमा यो इएमएफ, सप्लाई भोल्टेजको उल्टो हुन्छ। त्यसैले यसलाई ब्याक इएमएफ भनिन्छ।',
    },
    {
      say: 'Euta machine ma P, Z ra A fixed hunchan. Tesaile E b equals k phi N: back EMF flux ra speed sanga proportional cha.',
      voice: 'एउटा मेसिनमा, पी, जेड र ए फिक्स्ड हुन्छन्। त्यसैले, ई बी इक्वल्स — के फाइ एन। ब्याक इएमएफ, फ्लक्स र स्पिडसँग प्रोपोर्सनल छ।',
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
      node: step(
        'EMF per conductor (Faraday)',
        String.raw`\begin{aligned} e &= \dfrac{\underbrace{\textcolor{${BL}}{d\Phi}}_{\textstyle \textcolor{${BL}}{P\phi}}}{\underbrace{\textcolor{${VI}}{dt}}_{\textstyle \textcolor{${VI}}{60/N}}} \\ &= \dfrac{\textcolor{${BL}}{P\phi}}{\textcolor{${VI}}{60/N}} \\ &= \dfrac{P\phi N}{60}\ \text{V} \end{aligned}`,
      ),
    },
    {
      at: 4,
      kind: 'step',
      node: step(
        'EMF of the machine = EMF of one path',
        String.raw`\begin{aligned} E_b &= \underbrace{\textcolor{${GR}}{e}}_{\textstyle \textcolor{${GR}}{P\phi N/60}} \times \underbrace{\textcolor{${OR}}{\tfrac{Z}{A}}}_{\textstyle \textcolor{${OR}}{\text{per path}}} \\ &= \textcolor{${GR}}{\dfrac{P\phi N}{60}} \cdot \textcolor{${OR}}{\dfrac{Z}{A}} \end{aligned}`,
      ),
    },
    { at: 5, kind: 'eq', node: tex(String.raw`E_b = \dfrac{P\phi Z N}{60A}\ \text{V}`) },
    { at: 6, kind: 'step', node: step('Given machine: k = PZ/60A', String.raw`\begin{aligned} E_b &= k\,\phi N \\ \Rightarrow\ E_b &\propto \phi N \end{aligned}`) },
  ],
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
      say: 'Commutator le sabai Z conductor ko torque eutai direction ma rakhcha. Tesaile tau lai Z le multiply garchau.',
      voice: 'कम्युटेटरले सबै जेड कन्डक्टरको टर्क, एउटै डाइरेक्सनमा राख्छ। त्यसैले, टाउलाई जेडले मल्टिप्लाई गर्छौं।',
    },
    {
      say: 'One over two pi equals 0.159. Tesaile T a equals 0.159 phi Z I a times P over A, newton metre ma.',
      voice: 'वान ओभर टु पाइ इक्वल्स, जिरो पोइन्ट वान फाइभ नाइन। त्यसैले, टी ए इक्वल्स — जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए। न्युटन मिटरमा।',
    },
    {
      say: 'Euta machine ma P, Z ra A fixed hunchan. Tesaile armature torque flux ra armature current ko product sanga proportional cha.',
      voice: 'एउटा मेसिनमा, पी, जेड र ए फिक्स्ड हुन्छन्। त्यसैले आर्मेचर टर्क — फ्लक्स र आर्मेचर करेन्टको प्रोडक्टसँग प्रोपोर्सनल छ।',
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
      node: step('Force on one conductor', String.raw`F = \underbrace{\textcolor{${BL}}{B}}_{\textstyle \textcolor{${BL}}{\frac{P\phi}{2\pi r l}}}\;\underbrace{\textcolor{${OR}}{I_c}}_{\textstyle \textcolor{${OR}}{\frac{I_a}{A}}}\;l`),
    },
    {
      at: 4,
      kind: 'step',
      node: step('Substitute', String.raw`\begin{aligned} F &= \textcolor{${BL}}{\dfrac{P\phi}{2\pi r \cancel{l}}} \cdot \textcolor{${OR}}{\dfrac{I_a}{A}} \cdot \cancel{l} \\ &= \dfrac{P\phi I_a}{2\pi r A} \end{aligned}`),
    },
    {
      at: 5,
      kind: 'step',
      node: step('Torque of one conductor', String.raw`\begin{aligned} \tau &= \underbrace{F}_{\textstyle \frac{P\phi I_a}{2\pi r A}} \cdot r \\ &= \dfrac{P\phi I_a}{2\pi \cancel{r} A} \cdot \cancel{r} \\ &= \dfrac{P\phi I_a}{2\pi A} \end{aligned}`),
    },
    { at: 6, kind: 'step', node: step('All Z conductors', String.raw`\begin{aligned} T_a &= \textcolor{${GR}}{Z}\,\tau \\ &= \dfrac{P\phi \textcolor{${GR}}{Z} I_a}{2\pi A} \end{aligned}`) },
    { at: 7, kind: 'eq', node: tex(String.raw`T_a = 0.159\,\phi Z I_a \left(\tfrac{P}{A}\right)\ \text{N}\cdot\text{m}`) },
    { at: 8, kind: 'step', node: step('Given machine', String.raw`\textcolor{${GR}}{T_a \propto \phi\, I_a}`) },
  ],
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
      node: step('Solve for Ta', String.raw`\begin{aligned} T_a &= \dfrac{E_bI_a}{\underbrace{\textcolor{${VI}}{\omega}}_{\textstyle \textcolor{${VI}}{2\pi N/60}}} \\ &= \dfrac{60\,E_bI_a}{2\pi N} \\ &= 9.55\,\dfrac{E_bI_a}{N}\ \text{N}\cdot\text{m} \end{aligned}`),
    },
    {
      at: 2,
      kind: 'step',
      node: step('Put Eb = PφZN/60A', String.raw`\begin{aligned} T_a &= \dfrac{60}{2\pi N} \cdot \underbrace{\textcolor{${BL}}{E_b}}_{\textstyle \textcolor{${BL}}{\frac{P\phi ZN}{60A}}} \cdot I_a \\ &= \dfrac{\cancel{60}}{2\pi \cancel{N}} \cdot \textcolor{${BL}}{\dfrac{P\phi Z\cancel{N}}{\cancel{60}A}} \cdot I_a \\ &= \dfrac{P\phi Z I_a}{2\pi A} \end{aligned}`),
    },
    { at: 3, kind: 'eq', node: tex(String.raw`\begin{aligned} T_a &= 0.159\,\phi Z I_a \left(\tfrac{P}{A}\right) \\ &= 9.55\,\dfrac{E_bI_a}{N} \end{aligned}`) },
    { at: 4, kind: 'step', node: step('Shaft torque', String.raw`\begin{aligned} T_{sh} &= 9.55\,\dfrac{P_{out}}{N} \\ T_a - T_{sh} &= \text{lost torque} \end{aligned}`) },
  ],
});
