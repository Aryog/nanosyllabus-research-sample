import { Axes, C, D, hook, model, solve, video } from './kit.jsx';

/* Chapter 6 · Performance characteristics (Syllabus Unit 4: Performance characteristics of DC motors). */

// Axes origin (40,190), 290 wide, 160 tall. Map unit coordinates (0..1) to SVG.
const X = (u) => 40 + u * 270;
const Y = (v) => 190 - v * 150;
const path = (f, from = 0, to = 1, n = 40) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const u = from + ((to - from) * i) / n;
    return `${i ? 'L' : 'M'}${X(u).toFixed(1)} ${Y(Math.min(f(u), 1.05)).toFixed(1)}`;
  }).join('');

const Curve = ({ d, color, w = 3, className = '' }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" pathLength={1} className={`draw ${className}`} />
);
const Lbl = ({ x, y, children, color, anchor = 'start' }) => (
  <text x={x} y={y} fontSize={12.5} fontWeight={700} fill={color} textAnchor={anchor}>{children}</text>
);
const Title = ({ children }) => <text x={180} y={18} textAnchor="middle" fontSize={14} fontWeight={800} fill={C.yellow}>{children}</text>;

const shuntT = (u) => 0.9 * u;
const shuntTsh = (u) => Math.max(0, 0.9 * u - 0.06);
const shuntN = (u) => 0.8 - 0.1 * u;
// Series: Ta ∝ Ia² up to saturation (u = 0.45), then linear and tangent.
const seriesT = (u) => (u < 0.45 ? 2.2 * u * u : 2.2 * 0.45 * 0.45 + 2 * 2.2 * 0.45 * (u - 0.45) * 0.55);
const seriesN = (u) => 0.13 / Math.max(u, 0.05);
const compoundN = (u) => 0.85 - 0.45 * u;

const shunt = video('Shunt motor ko characteristics', {
  viewBox: '0 0 360 220',
  beats: [
    {
      say: 'Har characteristic lai duita rule le chalaucha: torque proportional to phi times I a, ani speed proportional to E b over phi.',
      voice: 'हरेक क्यारेक्टरिस्टिकलाई दुईटा रुलले चलाउँछ: टर्क प्रोपोर्सनल टु फाइ टाइम्स आई ए, अनि स्पिड प्रोपोर्सनल टु ई बी ओभर फाइ।',
    },
    {
      say: 'Shunt motor ma field fixed supply ko across huncha, so phi constant. Torque vs armature current chai origin bata jane sidha line ho.',
      voice: 'शन्ट मोटरमा फिल्ड फिक्स्ड सप्लाईको एक्रस हुन्छ, सो फाइ कन्स्टेन्ट। टर्क भर्सेस आर्मेचर करेन्ट चाहिँ ओरिजिन बाट जाने सिधा लाइन हो।',
    },
    {
      say: 'Shaft torque chai ali kam huncha, kina bhane torque ko ali part iron ra friction losses ma khaincha.',
      voice: 'शाफ्ट टर्क चाहिँ अलि कम हुन्छ, किनभने टर्कको अलि पार्ट आइरन र फ्रिक्सन लसेसमा खाइन्छ।',
    },
    {
      say: 'Straight line check garau.',
      voice: 'स्ट्रेट लाइन चेक गरौं।',
      ask: {
        tag: 'Quick check',
        q: 'Shunt motor ma armature current double bhayo. Armature torque…',
        voice: 'शन्ट मोटरमा आर्मेचर करेन्ट डबल भयो। आर्मेचर टर्क…',
        options: ['double huncha', 'char guna huncha', 'same rahancha'],
        answer: 0,
        why: 'φ constant cha, so Ta ∝ Ia: current double, torque pani double.',
      },
    },
    {
      say: 'Speed proportional to V minus I a R a. I a R a drop sano huncha, so no load dekhi full load samma speed khali kehi percent matra ghatcha.',
      voice: 'स्पिड प्रोपोर्सनल टु भी माइनस आई ए आर ए। आई ए आर ए ड्रप सानो हुन्छ, सो नो लोड देखि फुल लोड सम्म स्पिड खाली केही पर्सेन्ट मात्र घट्छ।',
    },
    {
      say: 'Speed vs torque pani ustai dekhincha: almost flat. Tei bhayera shunt motor lai constant-speed motor bhanincha.',
      voice: 'स्पिड भर्सेस टर्क पनि उस्तै देखिन्छ: अल्मोस्ट फ्ल्याट। त्यसैले शन्ट मोटरलाई कन्स्टेन्ट स्पिड मोटर भनिन्छ।',
    },
    {
      say: 'Yo drop lai speed regulation le napcha: no-load speed minus full-load speed, divide by full-load speed, times one hundred.',
      voice: 'यो ड्रपलाई स्पिड रेगुलेसनले नाप्छ: नो लोड स्पिड माइनस फुल लोड स्पिड, डिभाइड बाई फुल लोड स्पिड, टाइम्स वान हन्ड्रेड।',
    },
    {
      say: 'La ekchoti try gara.',
      voice: 'ल एकचोटि ट्राई गर।',
      ask: {
        tag: 'Quick check',
        q: 'Euta shunt motor no load ma 1000 rpm ra full load ma 960 rpm ma chalcha. Yesko speed regulation…',
        voice: 'एउटा शन्ट मोटर नो लोडमा वान थाउजेन्ड आर पी एम र फुल लोडमा नाइन हन्ड्रेड सिक्स्टी आर पी एममा चल्छ। यसको स्पिड रेगुलेसन…',
        options: ['≈ 4.17%', '4%', '40%'],
        answer: 0,
        why: '(1000 − 960)/960 × 100 ≈ 4.17%. No-load speed le divide garyo bhane 4% aaucha, tyo nai common mistake ho.',
      },
    },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1, 3)}>
        <Title>Ta – Ia</Title>
        <Axes xLabel="Ia" yLabel="Torque" />
        <Curve d={path(shuntT)} color={C.blue} className={s.on(1)} />
        <Lbl x={X(0.95)} y={Y(0.9) - 8} color={C.blue} anchor="end">Ta</Lbl>
        <g className={s.on(2)}>
          <Curve d={path(shuntTsh, 0.067)} color={C.green} w={2.4} className={s.on(2)} />
          <Lbl x={X(1)} y={Y(0.8) + 16} color={C.green} anchor="end">Tsh</Lbl>
        </g>
      </g>
      <g className={s.on(4, 4)}>
        <Title>N – Ia</Title>
        <Axes xLabel="Ia" yLabel="Speed N" />
        <Curve d={path(shuntN)} color={C.blue} className={s.on(4)} />
        <Lbl x={X(0.05)} y={Y(0.8) - 8} color={C.blue}>N₀</Lbl>
        <Lbl x={X(0.95)} y={Y(0.7) - 8} color={C.blue} anchor="end">sano droop</Lbl>
      </g>
      <g className={s.on(5)}>
        <Title>N – T</Title>
        <Axes xLabel="Torque" yLabel="Speed N" />
        <Curve d={path(shuntN)} color={C.blue} className={s.on(5)} />
        <Lbl x={X(0.95)} y={Y(0.7) - 8} color={C.blue} anchor="end">lagbhag constant speed</Lbl>
      </g>
    </>
  ),
  board: [
    { at: 0, until: 0, kind: 'eq', node: <>Ta ∝ φ·Ia &nbsp;&nbsp; N ∝ Eb/φ</> },
    { at: 6, kind: 'eq', node: <>% speed regulation = (N₀ − N_fl) / N_fl × 100</> },
  ],
});

const series = video('Series motor ko characteristics', {
  viewBox: '0 0 360 220',
  beats: [
    {
      say: 'Aba series motor. Field le armature current nai bokcha, so flux I a sangai badhcha, iron saturate nahunjel samma.',
      voice: 'अब सिरिज मोटर। फिल्डले आर्मेचर करेन्ट नै बोक्छ, सो फ्लक्स आई ए सँगै बढ्छ, आइरन स्याचुरेट नहुन्जेल सम्म।',
    },
    {
      say: 'Torque bhaneko phi times I a, ani phi proportional to I a. So torque I a squared jasto jancha: parabola. Yesle dami starting torque dincha.',
      voice: 'टर्क भनेको फाइ टाइम्स आई ए, अनि फाइ प्रोपोर्सनल टु आई ए। सो टर्क आई ए स्क्वायर्ड जस्तो जान्छ: प्याराबोला। यसले दामी स्टार्टिङ टर्क दिन्छ।',
    },
    {
      say: 'Saturation pachi phi badhna chodcha, so torque feri I a sanga proportional huncha, ani curve sidha hudai jancha.',
      voice: 'स्याचुरेसन पछि फाइ बढ्न छोड्छ, सो टर्क फेरि आई ए सँग प्रोपोर्सनल हुन्छ, अनि कर्भ सिधा हुँदै जान्छ।',
    },
    {
      say: 'Square law check garau.',
      voice: 'स्क्वायर ल चेक गरौं।',
      ask: {
        tag: 'Quick check',
        q: 'Saturation bhanda tala, series motor ko current double bhayo. Yesko torque kati huncha…',
        voice: 'स्याचुरेसन भन्दा तल, सिरिज मोटरको करेन्ट डबल भयो। यसको टर्क कति हुन्छ…',
        options: ['char guna', 'dui guna', 'aadha'],
        answer: 0,
        why: 'Ta ∝ φ·Ia ∝ Ia·Ia = Ia². Ia double garda torque 2² = 4 guna huncha.',
      },
    },
    {
      say: 'Speed proportional to E b over phi, roughly V over I a. So speed vs current rectangular hyperbola huncha, ani speed vs torque pani ustai gari jharcha.',
      voice: 'स्पिड प्रोपोर्सनल टु ई बी ओभर फाइ, रफ्ली भी ओभर आई ए। सो स्पिड भर्सेस करेन्ट रेक्ट्याङ्गुलर हाइपरबोला हुन्छ, अनि स्पिड भर्सेस टर्क पनि उस्तै गरी झर्छ।',
    },
    {
      say: 'Load hatayo bhane I a ra phi sano hudai jancha ani speed ekdam badhcha. No load najik ta khatarnak high huncha.',
      voice: 'लोड हटायो भने आई ए र फाइ सानो हुँदै जान्छ अनि स्पिड एकदम बढ्छ। नो लोड नजिक त खतरनाक हाई हुन्छ।',
    },
    {
      say: 'Yo classic IOE question ho bro.',
      voice: 'यो क्लासिक आइओई क्वेस्चन हो ब्रो।',
      ask: {
        tag: 'IOE 2067 Mangsir · 2065 Chaitra · 2068 Bhadra',
        q: 'DC series motor lai kina kahile pani no load ma start (wa run) garnu hudaina?',
        voice: 'डीसी सिरिज मोटरलाई किन कहिले पनि नो लोडमा स्टार्ट वा रन गर्नु हुँदैन?',
        options: [
          'Ia ra φ ekdam sano hunchan, so N ∝ 1/φ khatarnak value samma badhcha',
          'No load ma yesle torque nai dinna',
          'Yesko series field jalcha',
        ],
        answer: 0,
        why: 'No load ma Ia dherai sano, so φ pani dherai sano ani speed bhagcha. Centrifugal force le armature phutauna sakcha. (2068 Bhadra ko “should always be started at no load” FALSE ho.)',
      },
    },
    {
      say: 'Tei bhayera series motor lai sadhai load sanga directly coupled wa geared garincha, belt drive kahile pani hoina, kina bhane belt chiplera niskina sakcha.',
      voice: 'त्यसैले सिरिज मोटरलाई सधैं लोडसँग डाइरेक्ट्ली कपल्ड वा गियर्ड गरिन्छ, बेल्ट ड्राइभ कहिले पनि होइन, किनभने बेल्ट चिप्लेर निस्कन सक्छ।',
    },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1, 3)}>
        <Title>Ta – Ia</Title>
        <Axes xLabel="Ia" yLabel="Torque" />
        <Curve d={path(seriesT, 0, 0.45)} color={C.red} className={s.on(1)} />
        <Lbl x={X(0.3)} y={Y(0.2) - 10} color={C.red} anchor="end">∝ Ia²</Lbl>
        <g className={s.on(2)}>
          <Curve d={path(seriesT, 0.45, 1)} color={C.red} className={s.on(2)} />
          <Lbl x={X(0.98)} y={Y(seriesT(0.98)) + 18} color={C.red} anchor="end">∝ Ia (saturation pachi)</Lbl>
        </g>
      </g>
      <g className={s.on(4)}>
        <Title>N – Ia</Title>
        <Axes xLabel="Ia" yLabel="Speed N" />
        <Curve d={path(seriesN, 0.13)} color={C.red} className={s.on(4)} />
        <g className={s.on(5) + s.hl(5)}>
          <rect x={X(0)} y={Y(1.05)} width={X(0.2) - X(0)} height={Y(0.65) - Y(1.05)} fill={C.red} opacity={0.12} />
          <Lbl x={X(0.22)} y={Y(0.92)} color={C.red}>no load ma runaway!</Lbl>
        </g>
      </g>
    </>
  ),
  board: [
    { at: 1, kind: 'step', node: <>Saturation aghi: φ ∝ Ia ⟹ Ta ∝ Ia²</> },
    { at: 4, kind: 'step', node: <>N ∝ Eb/φ ≈ V/Ia ⟹ N ∝ 1/Ia</> },
    { at: 4, kind: 'step', node: <>N–T: T ∝ Ia² ⟹ N ∝ 1/√T (low speed ma high torque)</> },
  ],
});

const compound = video('Compound motor ra kun motor kaha use huncha', {
  viewBox: '0 0 360 220',
  beats: [
    {
      say: 'Cumulative compound motor ma duitai field huncha, ani series flux shunt flux ma thapincha.',
      voice: 'क्युमुलेटिभ कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छ, अनि सिरिज फ्लक्स शन्ट फ्लक्समा थपिन्छ।',
    },
    {
      say: 'Yesko speed curve shunt ra series motor ko bichma bascha: ramro starting torque, tara safe ra definite no-load speed.',
      voice: 'यसको स्पिड कर्भ शन्ट र सिरिज मोटरको बीचमा बस्छ: राम्रो स्टार्टिङ टर्क, तर सेफ र डेफिनिट नो लोड स्पिड।',
    },
    {
      say: 'Differential compound motor ma series flux le shunt flux lai oppose garcha. Yo unstable huncha, so dherai kam use huncha.',
      voice: 'डिफरेन्सियल कम्पाउन्ड मोटरमा सिरिज फ्लक्सले शन्ट फ्लक्सलाई अपोज गर्छ। यो अनस्टेबल हुन्छ, सो धेरै कम युज हुन्छ।',
    },
    {
      say: 'Shunt motor le almost constant speed dincha: lathe, fan, blower, centrifugal pump ra paper-making machine.',
      voice: 'शन्ट मोटरले अल्मोस्ट कन्स्टेन्ट स्पिड दिन्छ: लेथ, फ्यान, ब्लोअर, सेन्ट्रिफ्युगल पम्प र पेपर मेकिङ मेसिन।',
    },
    {
      say: 'Series motor le high starting torque dincha: electric traction, crane ra hoist. AC ma pani chalne sana series motor lai universal motor bhanincha, vacuum cleaner ma use huncha.',
      voice: 'सिरिज मोटरले हाई स्टार्टिङ टर्क दिन्छ: इलेक्ट्रिक ट्र्याक्सन, क्रेन र होइस्ट। एसी मा पनि चल्ने साना सिरिज मोटरलाई युनिभर्सल मोटर भनिन्छ, भ्याकुम क्लिनरमा युज हुन्छ।',
    },
    {
      say: 'Cumulative compound motor le flywheel sanga achanak aaune heavy load handle garcha: shears, punching press, rolling mill ra elevator.',
      voice: 'क्युमुलेटिभ कम्पाउन्ड मोटरले फ्लाइह्विलसँग अचानक आउने हेभी लोड ह्यान्डल गर्छ: सियर्स, पन्चिङ प्रेस, रोलिङ मिल र एलिभेटर।',
    },
    {
      say: 'La yo chai IOE version.',
      voice: 'ल यो चाहिँ आइओई भर्सन।',
      ask: {
        tag: 'IOE 2067 Mangsir',
        q: 'Yi sab ko lagi suitable motor: electric traction, vacuum cleaner, paper making, shearing ra punching?',
        voice: 'यी सबको लागि सुटेबल मोटर: इलेक्ट्रिक ट्र्याक्सन, भ्याकुम क्लिनर, पेपर मेकिङ, सियरिङ र पन्चिङ?',
        options: [
          'Series · series (universal) · shunt · cumulative compound',
          'Shunt · series · series · shunt',
          'Series · shunt · cumulative compound · shunt',
        ],
        answer: 0,
        why: 'Traction lai dherai starting torque chahincha (series); vacuum cleaner ma sano series/universal motor huncha; paper making lai steady speed chahincha (shunt); shears ra punch le flywheel sanga achanak heavy load linchan (cumulative compound).',
      },
    },
  ],
  draw: (s) => (
    <>
      <Title>N – Ia</Title>
      <Axes xLabel="Ia" yLabel="Speed N" />
      <Curve d={path(shuntN)} color={C.blue} w={2.2} className={s.on(0)} />
      <Lbl x={X(1)} y={Y(0.7) - 8} color={C.blue} anchor="end">shunt</Lbl>
      <Curve d={path(seriesN, 0.13)} color={C.red} w={2.2} className={s.on(0)} />
      <Lbl x={X(1)} y={Y(0.13) - 8} color={C.red} anchor="end">series</Lbl>
      <g className={s.on(1) + s.hl(1)}>
        <Curve d={path(compoundN)} color={C.green} className={s.on(1)} />
        <Lbl x={X(0.62)} y={Y(compoundN(0.62)) + 18} color={C.green}>cumulative compound</Lbl>
      </g>
    </>
  ),
  board: [
    { at: 3, kind: 'step', node: <><span className="bl">Shunt</span>: lathe, fan, blower, centrifugal pump, paper making</> },
    { at: 4, kind: 'step', node: <><span className="r">Series</span>: traction, crane, hoist · universal: vacuum cleaner</> },
    { at: 5, kind: 'step', node: <><span className="g">Cumulative compound</span>: shears, punching press, rolling mill, elevator</> },
  ],
});

const shuntNumerical = solve({
  title: 'Sangai solve garau: shunt motor speed',
  paper: '2071 Magh Q4(b)',
  paperVoice: 'टु थाउजेन्ड सेभेन्टी वान माघ, क्यू फोर बी',
  marks: '6 marks',
  read: 'Euta DC shunt motor 230 volt supply bata 60 ampere lindai 600 rpm ma chalcha. Armature resistance 0.2 ohm ra field resistance 115 ohm cha. Armature current 30 ampere huda speed nikal.',
  readVoice: 'एउटा डीसी शन्ट मोटर टु थर्टी भोल्ट सप्लाई बाट सिक्स्टी एम्पियर लिँदै सिक्स हन्ड्रेड आर पी एममा चल्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट टु ओम र फिल्ड रेजिस्टेन्स वान फिफ्टीन ओम छ। आर्मेचर करेन्ट थर्टी एम्पियर हुँदा स्पिड निकाल।',
  question: (
    <>
      A DC shunt motor runs at <D>600 rpm</D> taking <D>60 A</D> from a <D>230 V</D> supply. Armature resistance is <D>0.2 Ω</D> and field
      resistance is <D>115 Ω</D>. Find the speed when the armature current is <D>30 A</D>.
    </>
  ),
  given: [
    { node: <>V = 230 V</>, say: 'Supply 230 volt', voice: 'सप्लाई टु थर्टी भोल्ट' },
    { node: <>IL₁ = 60 A (line current!)</>, say: '60 ampere supply bata lieko, tyo line current ho', voice: 'सिक्स्टी एम्पियर सप्लाई बाट लिएको, त्यो लाइन करेन्ट हो' },
    { node: <>N₁ = 600 rpm</>, say: 'speed 600 rpm', voice: 'स्पिड सिक्स हन्ड्रेड आर पी एम' },
    { node: <>Ra = 0.2 Ω, Rsh = 115 Ω</>, say: 'R a 0.2 ohm ra R sh 115 ohm', voice: 'आर ए जिरो पोइन्ट टु ओम र आर एस एच वान फिफ्टीन ओम' },
    { node: <>Ia₂ = 30 A</>, say: 'ani naya armature current 30 ampere', voice: 'अनि नयाँ आर्मेचर करेन्ट थर्टी एम्पियर' },
  ],
  find: { node: <>naya speed N₂</>, say: 'Naya speed N2 chahiyo.', voice: 'नयाँ स्पिड एन टु चाहियो।' },
  idea: {
    node: <>Shunt ⟹ φ constant ⟹ N₂/N₁ = Eb₂/Eb₁</>,
    say: 'Shunt motor ho, so flux constant ani speed back EMF sanga proportional. Duitai back EMF chahincha.',
    voice: 'शन्ट मोटर हो, सो फ्लक्स कन्स्टेन्ट अनि स्पिड ब्याक ई एम एफ सँग प्रोपोर्सनल। दुवै ब्याक ई एम एफ चाहिन्छ।',
  },
  steps: [
    {
      node: <>Ish = 230 / 115 = 2 A ⟹ Ia₁ = 60 − 2 = 58 A</>,
      say: 'Field current 230 over 115, matlab 2 ampere. So pahilo armature current 58 ampere.',
      voice: 'फिल्ड करेन्ट टु थर्टी ओभर वान फिफ्टीन, मतलब टु एम्पियर। सो पहिलो आर्मेचर करेन्ट फिफ्टी एट एम्पियर।',
    },
    {
      node: <>Eb₁ = 230 − 58 × 0.2 = ?</>,
      say: 'Aba pahilo back EMF.',
      voice: 'अब पहिलो ब्याक ई एम एफ।',
      ask: {
        tag: 'Timro step',
        q: 'Eb₁ = 230 − 58 × 0.2 = ?',
        voice: 'ई बी वान इक्वल्स टु थर्टी माइनस फिफ्टी एट टाइम्स जिरो पोइन्ट टु, कति हुन्छ?',
        options: ['218.4 V', '218 V', '224 V'],
        answer: 0,
        why: '58 × 0.2 = 11.6 V, ani 230 − 11.6 = 218.4 V. (218 V chai 60 A line current use garda aaucha.)',
      },
    },
    {
      node: <>Eb₁ = 218.4 V · Eb₂ = 230 − 30 × 0.2 = 224 V</>,
      say: 'E b 1 = 218.4 volt. 30 ampere ma, E b 2 = 230 minus 6, matlab 224 volt.',
      voice: 'ई बी वान इक्वल्स टु एटिन पोइन्ट फोर भोल्ट। थर्टी एम्पियरमा, ई बी टु इक्वल्स टु थर्टी माइनस सिक्स, मतलब टु ट्वेन्टी फोर भोल्ट।',
    },
    {
      node: <>N₂ = 600 × 224 / 218.4</>,
      say: 'So N2 equals 600 times 224 over 218.4.',
      voice: 'सो एन टु इक्वल्स सिक्स हन्ड्रेड टाइम्स टु ट्वेन्टी फोर ओभर टु एटिन पोइन्ट फोर।',
    },
  ],
  answer: {
    node: <>N₂ ≈ 615.4 rpm</>,
    say: 'Naya speed lagbhag 615.4 rpm. Current kam, speed ali badhi: typical shunt behaviour.',
    voice: 'नयाँ स्पिड लगभग सिक्स फिफ्टीन पोइन्ट फोर आर पी एम। करेन्ट कम, स्पिड अलि बढी: टिपिकल शन्ट बिहेभियर।',
  },
  trap: {
    node: <>Trap: 60 A lai Ia manne. Pahile Ish ghata.</>,
    say: 'Common trap bhaneko 60 ampere lai nai armature current manne. Sadhai pahile field current ghata.',
    voice: 'कमन ट्र्याप भनेको सिक्स्टी एम्पियरलाई नै आर्मेचर करेन्ट मान्ने। सधैं पहिले फिल्ड करेन्ट घटाऊ।',
  },
});

const seriesNumerical = solve({
  title: 'Sangai solve garau: series motor current',
  paper: '2069 Bhadra · 2066 Magh',
  paperVoice: 'टु थाउजेन्ड सिक्स्टी नाइन भदौ र टु थाउजेन्ड सिक्स्टी सिक्स माघ',
  marks: '8 marks',
  read: 'Armature resistance 0.06 ohm ra field resistance 0.04 ohm bhako DC series motor lai 220 volt bata supply gariyeko cha. 1200 rpm ma yesle 25 ampere lincha. 800 rpm ma kati current lincha, nikal.',
  readVoice: 'आर्मेचर रेजिस्टेन्स जिरो पोइन्ट जिरो सिक्स ओम र फिल्ड रेजिस्टेन्स जिरो पोइन्ट जिरो फोर ओम भएको डीसी सिरिज मोटरलाई टु ट्वेन्टी भोल्ट बाट सप्लाई गरिएको छ। ट्वेल्भ हन्ड्रेड आर पी एममा यसले ट्वेन्टी फाइभ एम्पियर लिन्छ। एट हन्ड्रेड आर पी एममा कति करेन्ट लिन्छ, निकाल।',
  question: (
    <>
      A DC series motor with armature resistance <D>0.06 Ω</D> and field winding resistance <D>0.04 Ω</D> is supplied by a <D>220 V</D> source. If it
      draws <D>25 A</D> when running at <D>1200 rpm</D>, calculate the current drawn when running at <D>800 rpm</D>.
    </>
  ),
  given: [
    { node: <>V = 220 V</>, say: 'Supply 220 volt', voice: 'सप्लाई टु ट्वेन्टी भोल्ट' },
    { node: <>Ra + Rse = 0.06 + 0.04 = 0.1 Ω</>, say: 'total resistance 0.1 ohm', voice: 'टोटल रेजिस्टेन्स जिरो पोइन्ट वान ओम' },
    { node: <>I₁ = 25 A at N₁ = 1200 rpm</>, say: '1200 rpm ma 25 ampere', voice: 'ट्वेल्भ हन्ड्रेड आर पी एममा ट्वेन्टी फाइभ एम्पियर' },
    { node: <>N₂ = 800 rpm, saturation chaina</>, say: 'ani naya speed 800 rpm, saturation chaina', voice: 'अनि नयाँ स्पिड एट हन्ड्रेड आर पी एम, स्याचुरेसन छैन' },
  ],
  find: {
    node: <>naya current I₂</>,
    say: 'Naya current I2 chahiyo. E b 2 ra flux duitai yesmai depend garcha.',
    voice: 'नयाँ करेन्ट आई टु चाहियो। ई बी टु र फ्लक्स दुवै यसमै डिपेन्ड गर्छ।',
  },
  idea: {
    node: <>Series, unsaturated ⟹ φ ∝ I ⟹ N₂/N₁ = (Eb₂/Eb₁) × (I₁/I₂)</>,
    say: 'Series motor ma flux current sanga proportional huncha, so speed ratio ma extra I1 over I2 term aaucha.',
    voice: 'सिरिज मोटरमा फ्लक्स करेन्टसँग प्रोपोर्सनल हुन्छ, सो स्पिड रेसियोमा एक्स्ट्रा आई वान ओभर आई टु टर्म आउँछ।',
  },
  steps: [
    {
      node: <>Eb₁ = 220 − 25 × 0.1 = 217.5 V · Eb₂ = 220 − 0.1·I₂</>,
      say: 'E b 1 = 220 minus 2.5, matlab 217.5 volt. E b 2 = 220 minus 0.1 I2.',
      voice: 'ई बी वान इक्वल्स टु ट्वेन्टी माइनस टु पोइन्ट फाइभ, मतलब टु सेभेन्टिन पोइन्ट फाइभ भोल्ट। ई बी टु इक्वल्स टु ट्वेन्टी माइनस जिरो पोइन्ट वान आई टु।',
    },
    {
      node: <>800/1200 = [(220 − 0.1 I₂)/217.5] × ( ? )</>,
      say: 'Speed ratio lekha.',
      voice: 'स्पिड रेसियो लेख।',
      ask: {
        tag: 'Timro step',
        q: 'Saturation binako series motor ma bracket bhitra k aaucha?',
        voice: 'स्याचुरेसन बिनाको सिरिज मोटरमा ब्र्याकेट भित्र के आउँछ?',
        options: ['25 / I₂', 'I₂ / 25', '1'],
        answer: 0,
        why: 'N ∝ Eb/φ ra φ ∝ I, so φ₁/φ₂ = I₁/I₂ = 25/I₂. 1 rakhyo bhane shunt motor jastai treat gareko huncha.',
      },
    },
    {
      node: <>800/1200 = [(220 − 0.1 I₂)/217.5] × (25/I₂)</>,
      say: 'So 800 over 1200 equals 220 minus 0.1 I2, over 217.5, times 25 over I2.',
      voice: 'सो एट हन्ड्रेड ओभर ट्वेल्भ हन्ड्रेड इक्वल्स टु ट्वेन्टी माइनस जिरो पोइन्ट वान आई टु, ओभर टु सेभेन्टिन पोइन्ट फाइभ, टाइम्स ट्वेन्टी फाइभ ओभर आई टु।',
    },
    {
      node: <>145 I₂ = 5500 − 2.5 I₂ ⟹ 147.5 I₂ = 5500</>,
      say: 'Cross-multiply gara: 217.5 ko two thirds 145, so 145 I2 equals 5500 minus 2.5 I2.',
      voice: 'क्रस मल्टिप्लाई गर: टु सेभेन्टिन पोइन्ट फाइभको टु थर्ड्स वान फोर्टी फाइभ, सो वान फोर्टी फाइभ आई टु इक्वल्स फाइभ थाउजेन्ड फाइभ हन्ड्रेड माइनस टु पोइन्ट फाइभ आई टु।',
    },
  ],
  answer: {
    node: <>I₂ = 5500 / 147.5 ≈ 37.3 A</>,
    say: 'So I2 lagbhag 37.3 ampere. Slow bhayeko series motor le dherai load bokdai cha, so dherai current lincha.',
    voice: 'सो आई टु लगभग थर्टी सेभेन पोइन्ट थ्री एम्पियर। स्लो भएको सिरिज मोटरले धेरै लोड बोक्दै छ, सो धेरै करेन्ट लिन्छ।',
  },
  trap: {
    node: <>Trap: N₂/N₁ = Eb₂/Eb₁ matra (tyo ta shunt ko formula ho).</>,
    say: 'Common trap bhaneko flux change huncha bhanne birsanu. Tyo shunt formula le yaha galat answer dincha.',
    voice: 'कमन ट्र्याप भनेको फ्लक्स चेन्ज हुन्छ भन्ने बिर्सनु। त्यो शन्ट फर्मुलाले यहाँ गलत आन्सर दिन्छ।',
  },
});

export const ch6 = {
  title: 'Performance characteristics',
  syllabus: 'Unit 4 · DC motor ko performance characteristics',
  steps: [
    shunt,
    series,
    compound,
    shuntNumerical,
    seriesNumerical,
    model({
      q: 'DC shunt ra DC series motor ko torque–armature current ra speed–torque characteristics explain gara.',
      papers: ['2070 Magh'],
      marks: '[8]',
      points: [
        <>Duita relation bata suru gara: <b>Ta ∝ φ·Ia</b> ra <b>N ∝ Eb/φ = (V − IaRa)/φ</b>.</>,
        <><b>Shunt, Ta–Ia</b>: φ constant, so Ta ∝ Ia, origin bata jane sidha line. Shaft torque Tsh yo bhanda ali tala huncha (lost torque).</>,
        <><b>Shunt, N–Ia ra N–T</b>: IaRa sano huncha, so speed ali matra jharcha (lagbhag 5–15%). Yo almost constant-speed motor ho.</>,
        <><b>Series, Ta–Ia</b>: φ ∝ Ia, so saturation aghi Ta ∝ Ia² (parabola), ani saturation pachi Ta ∝ Ia. Dherai high starting torque.</>,
        <><b>Series, N–Ia ra N–T</b>: N ∝ 1/Ia, rectangular hyperbola. Low speed ma high torque, ani light load ma khatarnak high speed, so yeslai kahile pani no load ma start nagara.</>,
        <>Charai curve labelled axes sanga sketch gara, ani applications le conclude gara: constant-speed drive ko lagi shunt, traction ra crane ko lagi series.</>,
      ],
      tip: 'Axes label gara ani series Ta–Ia curve ma saturation bend mark gara. “Never at no load” chai alag question ko rup ma pani sodhincha (2067 Mangsir, 2065 Chaitra, 2068 Bhadra). Exam ma English mai lekha.',
    }),
    hook('Shunt: Steady speed · Series: Strong start, Solo kahile pani hoina', [
      'Shunt: Ta ∝ Ia (line), N lagbhag constant.',
      'Series: Ta ∝ Ia² (parabola), N ∝ 1/Ia (hyperbola), no load ma kahile pani chalaunu hudaina.',
      'Speed ratio: shunt ma N₂/N₁ = Eb₂/Eb₁; series ma I₁/I₂ le multiply gara.',
    ]),
  ],
};
