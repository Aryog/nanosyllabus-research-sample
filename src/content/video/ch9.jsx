import { C, D, K, solve, video } from './kit.jsx';

/* Chapter 9 · Losses & efficiency (Syllabus Unit 4: Losses and efficiency). */

export const losses = video('Power kata jancha?', {
  beats: [
    {
      say: 'Sabai input power shaft power bandaina. DC machine ka losses tin group ma bandincha.',
      voice: 'सबै इनपुट पावर स्याफ्ट पावर बन्दैन। डीसी मेसिनका लसेस तीन ग्रुपमा बाँडिन्छ।',
    },
    {
      say: 'Copper losses: armature I a squared R a, shunt field loss, series field loss, ra sano brush contact drop.',
      voice: 'कपर लसेस: आर्मेचर आई ए स्क्वायर्ड आर ए, शन्ट फिल्ड लस, सिरिज फिल्ड लस, र सानो ब्रस कन्ट्याक्ट ड्रप।',
    },
    {
      say: 'Ghumne armature core ma iron losses: hysteresis ra eddy current. Dubai iron kati choti re-magnetise huncha tesma depend garcha, f equals P N over 120.',
      voice: 'घुम्ने आर्मेचर कोरमा आइरन लसेस: हिस्टेरेसिस र एडी करेन्ट। दुवै आइरन कति चोटि री म्याग्नेटाइज हुन्छ त्यसमा डिपेन्ड गर्छ, एफ इक्वल्स पी एन ओभर वान ट्वेन्टी।',
    },
    {
      say: 'Mechanical losses: bearing ra brush ma friction, ani windage, arthat ghumdai gareko armature ko air resistance.',
      voice: 'मेकानिकल लसेस: बियरिङ र ब्रसमा फ्रिक्सन, अनि विन्डेज, अर्थात् घुम्दै गरेको आर्मेचरको एयर रेजिस्टेन्स।',
    },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Windage loss bhaneko k ho?',
        voice: 'विन्डेज लस भनेको के हो?',
        options: ['Bearing ko friction', 'Ghumne armature ko air resistance', 'Core ma eddy current'],
        answer: 1,
        why: 'Windage = ghumdai gareko armature ko air resistance. Bearing ra brush friction sangai yo mechanical loss ho.',
      },
    },
    {
      say: 'Constant speed ra voltage ma, iron, mechanical ra shunt field losses load sanga khasai change hudaina. Yinlai constant losses, W c, bhanincha.',
      voice: 'कन्स्ट्यान्ट स्पिड र भोल्टेजमा, आइरन, मेकानिकल र शन्ट फिल्ड लसेस लोडसँग खासै चेन्ज हुँदैन। यिनलाई कन्स्ट्यान्ट लसेस, डब्लु सी, भनिन्छ।',
    },
    {
      say: 'Armature current bokne je pani load sanga change huncha: armature copper loss, series field loss, brush drop. Yi variable losses hun.',
      voice: 'आर्मेचर करेन्ट बोक्ने जे पनि लोडसँग चेन्ज हुन्छ: आर्मेचर कपर लस, सिरिज फिल्ड लस, ब्रस ड्रप। यी भेरिएबल लसेस हुन्।',
    },
    {
      say: 'Iron ra mechanical losses lai milayera stray, ya rotational, losses pani bhanincha.',
      voice: 'आइरन र मेकानिकल लसेसलाई मिलाएर स्ट्रे, या रोटेसनल, लसेस पनि भनिन्छ।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>DC machine ka losses</> },
    { at: 1, kind: 'step', node: <><span className="r">Copper:</span> <K>{String.raw`I_a^2 R_a`}</K> · shunt <K>{String.raw`I_{sh}^2 R_{sh} = V I_{sh}`}</K> · series <K>{String.raw`I_{se}^2 R_{se}`}</K> · brush drop</> },
    { at: 2, kind: 'step', node: <><span className="bl">Iron:</span> hysteresis <K>{String.raw`W_h = \eta B_{max}^{1.6} f V`}</K> · eddy <K>{String.raw`W_e \propto B_{max}^2 f^2 t^2`}</K> · <K>{String.raw`f = \tfrac{PN}{120}`}</K></> },
    { at: 3, kind: 'step', node: <><span className="g">Mechanical:</span> bearing ra brush friction · windage</> },
    { at: 5, kind: 'step', node: <><span className="y">Constant losses <K>{String.raw`W_c`}</K></span> = iron + mechanical + shunt field Cu</> },
    { at: 6, kind: 'step', node: <><span className="y">Variable losses</span> = <K>{String.raw`I_a^2 R_a`}</K> + series field + brush drop (load sanga change huncha)</> },
    { at: 7, kind: 'note', node: <>Iron + mechanical = stray (rotational) losses</> },
  ],
});

/* Sankey: main band from x=20 to 330, top fixed at y=50, thickness shrinks at each stage. */
const SANKEY = [
  { x1: 20, x2: 90, h: 80, label: 'Input V·IL', beat: 0 },
  { x1: 90, x2: 160, h: 72, beat: 1 },
  { x1: 160, x2: 260, h: 58, label: 'Eb·Ia (gross)', beat: 2 },
  { x1: 260, x2: 330, h: 46, label: 'Output', beat: 5 },
];
const BRANCHES = [
  { x: 90, from: 72, w: 8, label: 'field Cu V·Ish', beat: 1, color: C.red },
  { x: 160, from: 58, w: 14, label: 'armature Cu Ia²Ra', beat: 2, color: C.red },
  { x: 260, from: 46, w: 12, label: 'iron + mechanical', beat: 5, color: C.blue },
];

export const powerFlow = video('DC motor ma power flow', {
  viewBox: '0 0 360 220',
  beats: [
    {
      say: 'DC shunt motor bhitra power lai follow gara. Yo supply bata V times line current ko rup ma bhitra pascha.',
      voice: 'डीसी शन्ट मोटरभित्र पावरलाई फलो गर। यो सप्लाईबाट भी टाइम्स लाइन करेन्टको रूपमा भित्र पस्छ।',
    },
    {
      say: 'Pahila, ali kati shunt field ma jancha: V times I shunt.',
      voice: 'पहिला, अलि कति शन्ट फिल्डमा जान्छ: भी टाइम्स आई शन्ट।',
    },
    {
      say: 'Ani armature copper loss, I a squared R a. Baaki bhayeko mechanical form ma convert huncha: gross mechanical power, E b times I a.',
      voice: 'अनि आर्मेचर कपर लस, आई ए स्क्वायर्ड आर ए। बाँकी भएको मेकानिकल फर्ममा कन्भर्ट हुन्छ: ग्रस मेकानिकल पावर, ई बी टाइम्स आई ए।',
    },
    {
      say: 'Yo tei E b I a ho jun hamile power equation ma dekheko thiyau.',
      voice: 'यो त्यही ई बी आई ए हो जुन हामीले पावर इक्वेसनमा देखेको थियौं।',
    },
    {
      say: 'Euta stage aajhai baaki cha.',
      voice: 'एउटा स्टेज अझै बाँकी छ।',
      ask: {
        q: 'Eb·Ia mechanical power ma convert huncha. Tara shaft output kina aajhai sano huncha?',
        voice: 'ई बी आई ए मेकानिकल पावरमा कन्भर्ट हुन्छ। तर स्याफ्ट आउटपुट किन अझै सानो हुन्छ?',
        options: ['Iron ra mechanical losses yesbata katincha', 'Field le aajhai power lincha', 'Back EMF le yeslai heat banayera waste garcha'],
        answer: 0,
        why: 'Hysteresis, eddy current, friction ra windage sabai shaft ma pugnu agadi gross mechanical power bata nai katincha.',
      },
    },
    {
      say: 'Tespachi iron ra mechanical losses katincha, ani baaki useful output bhayera shaft ma pugcha.',
      voice: 'त्यसपछि आइरन र मेकानिकल लसेस कटिन्छ, अनि बाँकी युजफुल आउटपुट भएर स्याफ्टमा पुग्छ।',
    },
    {
      say: 'Efficiency bhaneko output over input, jun output over output plus sabai losses jastai ho.',
      voice: 'इफिसियन्सी भनेको आउटपुट ओभर इनपुट, जुन आउटपुट ओभर आउटपुट प्लस सबै लसेस जस्तै हो।',
    },
  ],
  draw: (s) => (
    <>
      {SANKEY.map((b) => (
        <g key={b.x1} className={s.on(b.beat)}>
          <rect x={b.x1} y={50} width={b.x2 - b.x1 + 1} height={b.h} fill={C.yellow} opacity={0.8} />
          {b.label && <text x={(b.x1 + b.x2) / 2} y={44} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.yellow}>{b.label}</text>}
        </g>
      ))}
      <polygon points="331,50 352,73 331,96" fill={C.yellow} opacity={0.8} className={s.on(5)} />
      {BRANCHES.map((b) => (
        <g key={b.x} className={s.on(b.beat)}>
          <rect x={b.x - b.w} y={50 + b.from - b.w} width={b.w} height={170 - (50 + b.from - b.w)} fill={b.color} opacity={0.75} />
          <text x={b.x - b.w / 2} y={210} textAnchor="middle" fontSize={10} fill={b.color}>{b.label}</text>
        </g>
      ))}
    </>
  ),
  board: [
    { at: 3, kind: 'note', node: <>Power equation: V·Ia = Eb·Ia + Ia²Ra</> },
    { at: 6, kind: 'eq', node: <>η = Output / Input = Output / (Output + losses)</> },
  ],
});

export const maxEff = video('Derivation: maximum efficiency ko condition', {
  beats: [
    {
      say: 'DC machine kahile sabai bhanda efficient huncha? La derive garau.',
      voice: 'डीसी मेसिन कहिले सबैभन्दा इफिसियन्ट हुन्छ? ल डिराइभ गरौं।',
    },
    {
      say: 'Input power V I liyau. Losses ma euta constant part, W c, ra euta variable part, I squared R a, huncha.',
      voice: 'इनपुट पावर भी आई लियौं। लसेसमा एउटा कन्स्ट्यान्ट पार्ट, डब्लु सी, र एउटा भेरिएबल पार्ट, आई स्क्वायर्ड आर ए, हुन्छ।',
    },
    {
      say: 'Efficiency bhaneko input minus losses, over input. Sabai lai V I le bhag gara: one minus W c over V I, minus I R a over V aaucha.',
      voice: 'इफिसियन्सी भनेको इनपुट माइनस लसेस, ओभर इनपुट। सबैलाई भी आईले भाग गर: वान माइनस डब्लु सी ओभर भी आई, माइनस आई आर ए ओभर भी आउँछ।',
    },
    {
      say: 'Aba key move.',
      voice: 'अब की मुभ।',
      ask: {
        q: 'η = 1 − Wc/VI − … ani tesro term kun ho?',
        voice: 'इटा इक्वल्स वान माइनस डब्लु सी ओभर भी आई माइनस, अनि तेस्रो टर्म कुन हो?',
        options: ['IRa/V', 'V/IRa', 'Wc/Ra'],
        answer: 0,
        why: 'η = 1 − Wc/VI − IRa/V. Aba yeslai I sanga differentiate garchau.',
      },
    },
    {
      say: 'Differentiate gara. Derivative bhaneko W c over V I squared, minus R a over V. Yeslai zero rakha.',
      voice: 'डिफरेन्सिएट गर। डेरिभेटिभ भनेको डब्लु सी ओभर भी आई स्क्वायर्ड, माइनस आर ए ओभर भी। यसलाई जिरो राख।',
    },
    {
      say: 'V le multiply gara. W c over I squared equals R a, tesaile I squared R a equals W c.',
      voice: 'भीले मल्टिप्लाई गर। डब्लु सी ओभर आई स्क्वायर्ड इक्वल्स आर ए, त्यसैले आई स्क्वायर्ड आर ए इक्वल्स डब्लु सी।',
    },
    {
      say: 'Variable loss constant loss barabar bhayo bhane efficiency maximum huncha.',
      voice: 'भेरिएबल लस कन्स्ट्यान्ट लस बराबर भयो भने इफिसियन्सी म्याक्सिमम हुन्छ।',
    },
    {
      say: 'Maximum efficiency ma load current bhaneko W c over R a ko square root ho.',
      voice: 'म्याक्सिमम इफिसियन्सीमा लोड करेन्ट भनेको डब्लु सी ओभर आर एको स्क्वायर रुट हो।',
    },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Maximum efficiency ko current kasto huncha?',
        voice: 'म्याक्सिमम इफिसियन्सीको करेन्ट कस्तो हुन्छ?',
        options: ['Wc/Ra', '√(Wc/Ra)', 'Wc·Ra'],
        answer: 1,
        why: 'I²Ra = Wc, tesaile I = √(Wc/Ra).',
      },
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Maximum η ko condition</> },
    { at: 1, kind: 'step', node: <>Input = <K>{String.raw`VI`}</K> · Losses = <K>{String.raw`W_c`}</K> (constant) + <K>{String.raw`I^2 R_a`}</K> (variable)</> },
    { at: 2, kind: 'step', node: <><K>{String.raw`\eta = \dfrac{VI - W_c - I^2 R_a}{VI} = 1 - \dfrac{W_c}{VI} - \dfrac{I R_a}{V}`}</K></> },
    { at: 4, kind: 'step', node: <><K>{String.raw`\dfrac{d\eta}{dI} = \dfrac{W_c}{V I^2} - \dfrac{R_a}{V} = 0`}</K></> },
    { at: 5, kind: 'step', node: <><K>{String.raw`\Rightarrow \dfrac{W_c}{I^2} = R_a \;\Rightarrow\; \textcolor{#d9480f}{I^2 R_a = W_c}`}</K></> },
    { at: 6, kind: 'eq', node: <>Variable loss = Constant loss</> },
    { at: 7, kind: 'step', node: <><K>{String.raw`I_{(\eta_{max})} = \sqrt{W_c / R_a}`}</K></> },
    { at: 7, kind: 'note', node: <>Motor ko lagi I ≈ Ia: sano shunt current Wc bhitrai count gariyeko huncha.</> },
  ],
});

export const ioeEff = solve({
  title: 'IOE 2074 Bhadra solve: efficiency',
  paper: '2074 Bhadra',
  paperVoice: 'टु थाउजेन्ड सेभेन्टी फोर भदौ',
  read: 'Euta DC shunt generator le 200 volt ma 30 kilowatt full-load output dincha. Armature resistance 0.05 ohm, shunt field 50 ohm, ani iron ra friction losses 1000 watt. Generated EMF, copper losses ra efficiency nikala.',
  readVoice: 'एउटा डीसी शन्ट जेनेरेटरले टु हन्ड्रेड भोल्टमा थर्टी किलोवाट फुल लोड आउटपुट दिन्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट जिरो फाइभ ओह्म, शन्ट फिल्ड फिफ्टी ओह्म, अनि आइरन र फ्रिक्सन लसेस वान थाउजेन्ड वाट। जेनेरेटेड ई एम एफ, कपर लसेस र इफिसियन्सी निकाल।',
  question: (
    <>
      A DC shunt generator gives a full-load output of <D>30 kW</D> at <D>200 V</D>. <D>Ra = 0.05 Ω</D>, <D>Rsh = 50 Ω</D>, and the iron and friction losses are{' '}
      <D>1000 W</D>. Calculate (i) the EMF generated, (ii) the copper losses, (iii) the efficiency.
    </>
  ),
  given: [
    { node: <>Output = 30 kW, V = 200 V ma</>, say: '200 volt ma output 30 kilowatt', voice: 'टु हन्ड्रेड भोल्टमा आउटपुट थर्टी किलोवाट' },
    { node: <>Ra = 0.05 Ω, Rsh = 50 Ω</>, say: 'armature 0.05 ohm, field 50 ohm', voice: 'आर्मेचर जिरो पोइन्ट जिरो फाइभ ओह्म, फिल्ड फिफ्टी ओह्म' },
    { node: <>Iron + friction = 1000 W</>, say: 'ani 1000 watt iron ra friction loss', voice: 'अनि वान थाउजेन्ड वाट आइरन र फ्रिक्सन लस' },
  ],
  find: { node: <>E, copper losses, η</>, say: 'EMF, copper losses ra efficiency chahiyo.', voice: 'ई एम एफ, कपर लसेस र इफिसियन्सी चाहियो।' },
  idea: {
    node: <>Generator: Ia = IL + Ish · η = Output / (Output + sabai losses)</>,
    say: 'Key idea: generator ma armature le load ra aafnai field dubai lai feed garcha, tesaile I a = I L plus I shunt. Ani harek loss jodne.',
    voice: 'की आइडिया: जेनेरेटरमा आर्मेचरले लोड र आफ्नै फिल्ड दुवैलाई फिड गर्छ, त्यसैले आई ए बराबर आई एल प्लस आई शन्ट। अनि हरेक लस जोड्ने।',
  },
  steps: [
    {
      node: <>IL = 30 000/200 = 150 A · Ish = 200/50 = 4 A ⟹ Ia = 154 A</>,
      say: 'Load current 150 ampere, field current 4 ampere, tesaile I a 154 ampere.',
      voice: 'लोड करेन्ट वान हन्ड्रेड फिफ्टी एम्पियर, फिल्ड करेन्ट फोर एम्पियर, त्यसैले आई ए वान हन्ड्रेड फिफ्टी फोर एम्पियर।',
    },
    {
      node: <>Armature Cu = 154² × 0.05 = 1185.8 W</>,
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Ia kati aayo?',
        voice: 'आई ए कति आयो?',
        options: ['150 A', '154 A', '146 A'],
        answer: 1,
        why: 'Generator: Ia = IL + Ish = 150 + 4 = 154 A. Armature copper loss = 154² × 0.05 = 1185.8 W.',
      },
    },
    {
      node: <>Field Cu = 200 × 4 = 800 W · total Cu = 1985.8 W</>,
      say: 'Field copper loss bhaneko V times I shunt, 800 watt. Total copper loss 1985.8 watt.',
      voice: 'फिल्ड कपर लस भनेको भी टाइम्स आई शन्ट, एट हन्ड्रेड वाट। टोटल कपर लस वान थाउजेन्ड नाइन हन्ड्रेड एटी फाइभ पोइन्ट एट वाट।',
    },
    {
      node: <>Total losses = 1985.8 + 1000 = 2985.8 W</>,
      say: 'Iron ra friction jodda, total losses 2985.8 watt huncha.',
      voice: 'आइरन र फ्रिक्सन जोड्दा, टोटल लसेस टु थाउजेन्ड नाइन हन्ड्रेड एटी फाइभ पोइन्ट एट वाट हुन्छ।',
    },
    {
      node: <>η = 30 000 / 32 985.8</>,
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Total losses kati bhayo?',
        voice: 'टोटल लसेस कति भयो?',
        options: ['1985.8 W', '2985.8 W', '1000 W'],
        answer: 1,
        why: 'Copper 1985.8 W + iron ra friction 1000 W = 2985.8 W.',
      },
    },
  ],
  answer: {
    node: <>E = 200 + 154 × 0.05 = 207.7 V · Cu = 1985.8 W · η ≈ 90.9 %</>,
    say: 'EMF bhaneko 200 plus 154 times 0.05, 207.7 volt. Copper losses 1985.8 watt, ani efficiency lagbhag 90.9 percent.',
    voice: 'ई एम एफ भनेको टु हन्ड्रेड प्लस वान फिफ्टी फोर टाइम्स जिरो पोइन्ट जिरो फाइभ, टु हन्ड्रेड सेभेन पोइन्ट सेभेन भोल्ट। कपर लसेस वान थाउजेन्ड नाइन हन्ड्रेड एटी फाइभ पोइन्ट एट वाट, अनि इफिसियन्सी लगभग नाइन्टी पोइन्ट नाइन पर्सेन्ट।',
  },
  trap: {
    node: <>Trap: 800 W field loss birsiyo bhane 93.2 % aaucha; Ia = IL use garyo bhane armature loss 1125 W aaucha.</>,
    say: 'Traps: field loss birsiyo bhane 93.2 percent aaucha, ani I a ko lagi line current use garyo bhane copper loss galat aaucha.',
    voice: 'ट्र्याप्स: फिल्ड लस बिर्सियो भने नाइन्टी थ्री पोइन्ट टु पर्सेन्ट आउँछ, अनि आई एको लागि लाइन करेन्ट युज गर्यो भने कपर लस गलत आउँछ।',
  },
});
