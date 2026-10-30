import { Armature, Arrow, C, K, model, Resistor, Source, video } from './kit.jsx';

/* Chapter 4 · Back EMF (Syllabus Unit 4: Back EMF). 220 V motor, Ra = 0.5 Ω throughout. */

// [N rpm, Eb V, Ia A] per beat of the story video.
const STORY = [
  [0, 0, 0],
  [0, 0, 440],
  [786, 110, 220],
  [1500, 210, 20],
  [1464, 205, 30],
  [1464, 205, 30],
];
// When the meters move in each beat, ms into it ([Eb, Ia]), as the line names
// them; Ia follows Eb a moment later (Ia = (V − Eb)/Ra ties them together).
const MOVES = [
  [0, 0],
  [0, 500],
  [5600, 6000],
  [800, 1200],
  [2600, 3000],
  [0, 0],
];

// A meter: the fill moves to `frac` `at` ms into the beat, and its number
// changes at the same moment (the old one fades out as the new one comes in).
function Bar({ x, frac, color, label, value, was, at = 0, className = '' }) {
  const d = { '--d': `${at}ms` };
  return (
    <g className={className}>
      <rect x={x} y={40} width={26} height={150} rx={4} fill="none" stroke={C.faint} strokeWidth={1.5} />
      <rect
        x={x}
        y={40}
        width={26}
        height={150}
        rx={4}
        fill={color}
        style={{ transform: `scaleY(${Math.max(frac, 0.001)})`, transformBox: 'fill-box', transformOrigin: 'bottom', transition: `transform 1.2s ease-in-out ${at}ms` }}
      />
      <text x={x + 13} y={206} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{label}</text>
      {was !== value && (
        <text key={`was-${was}`} className="val-out" style={d} x={x + 13} y={32} textAnchor="middle" fontSize={11.5} fill={C.chalk}>{was}</text>
      )}
      <text key={value} className={was !== value ? 'val-in' : ''} style={d} x={x + 13} y={32} textAnchor="middle" fontSize={11.5} fill={C.chalk}>{value}</text>
    </g>
  );
}

export const story = video('Motor le aafno current aafai kina limit garcha', {
  viewBox: '-28 0 388 220', // room on the left for the "220 V" label
  beats: [
    { say: '220 volt ko DC motor, armature resistance 0.5 ohm. Switch open cha, tesaile current zero cha.', voice: 'टु ट्वेन्टी भोल्टको डीसी मोटर, आर्मेचर रेजिस्टेन्स जिरो पोइन्ट फाइभ ओम। स्विच ओपन छ, त्यसैले करेन्ट जिरो छ।' },
    {
      say: 'Switch on. Armature ghumeko chaina, tesaile back EMF zero. Current V over R a, arthat 440 ampere.',
      voice: 'स्विच अन। आर्मेचर घुमेको छैन, त्यसैले ब्याक इएमएफ जिरो। करेन्ट — भी ओभर आर ए, अर्थात फोर हन्ड्रेड फोर्टी एम्पियर।',
      ask: {
        q: 'Motor start garne instant ma back EMF kati huncha?',
        voice: 'मोटर स्टार्ट गर्ने इन्स्ट्यान्टमा, ब्याक इएमएफ कति हुन्छ?',
        options: ['V jati', 'Zero', '440 V'],
        answer: 1,
        why: 'N = 0 bhaye Eb = PφZN/60A = 0, tesaile Ia = V/Ra = 440 A.',
      },
    },
    { say: 'Armature ko speed badhdai jada yesko conductor le flux cut garchan ra supply lai oppose garne EMF generate garchan. Tyo nai back EMF ho, ani current ghatcha.', voice: 'आर्मेचरको स्पिड बढ्दै जाँदा, यसको कन्डक्टरले फ्लक्स कट गर्छन्, र सप्लाईलाई अपोज गर्ने ई एम एफ जेनेरेट गर्छन्। त्यो नै ब्याक ई एम एफ हो। अनि करेन्ट घट्छ।' },
    { say: 'Full speed ma back EMF 210 volt huncha. R a bata current push garna 10 volt matra baki huncha, yasari armature current just 20 ampere.', voice: 'फुल स्पिडमा, ब्याक ई एम एफ टु हन्ड्रेड टेन भोल्ट हुन्छ। आर ए बाट करेन्ट पुस गर्न, टेन भोल्ट मात्र बाँकी हुन्छ। यसरी आर्मेचर करेन्ट, जस्ट ट्वेन्टी एम्पियर।' },
    {
      say: 'Load thapda motor ali slow huncha. E b 205 volt ma jharcha, ra current 30 ampere samma badhcha, jasle load lai chahine extra torque dincha.',
      voice: 'लोड थप्दा, मोटर अलि स्लो हुन्छ। ई बी टु हन्ड्रेड फाइभ भोल्टमा झर्छ, र करेन्ट थर्टी एम्पियरसम्म बढ्छ — जसले लोडलाई चाहिने एक्स्ट्रा टर्क दिन्छ।',
      ask: {
        q: 'Load thapda armature current kina badhcha?',
        voice: 'लोड थप्दा, आर्मेचर करेन्ट किन बढ्छ?',
        options: ['Speed ghatda Eb ghatcha, ra V − Eb badhcha', 'Supply voltage badhcha', 'Armature resistance ghatcha'],
        answer: 0,
        why: 'Ia = (V − Eb)/Ra. Load le speed ghataucha, Eb ghatcha, tesaile Ia badhcha.',
      },
    },
    { say: 'Yesko matlab back EMF le motor lai self-regulating banaucha: load lai jati torque chahincha, tyati current matra tancha.', voice: 'यसको मतलब, ब्याक इएमएफले मोटरलाई सेल्फ रेगुलेटिङ बनाउँछ। लोडलाई जति टर्क चाहिन्छ, त्यति करेन्ट मात्र तान्छ।' },
  ],
  draw: (s) => {
    const k = s.beat;
    const [n, eb, ia] = STORY[k];
    const [, eb0, ia0] = STORY[Math.max(0, k - 1)];
    const [ebAt, iaAt] = MOVES[k];
    const on = k >= 1;
    const hl = (...ks) => (ks.includes(k) ? ' hl' : '');
    // Current flows round the loop (+ terminal → switch → Ra → motor → back),
    // faster when more current flows. Each dash line runs from where the
    // current goes to where it comes from (the flow keyframe moves dashes
    // toward the path's start).
    const flow = { animationDuration: `${Math.min(2.2, 0.35 * Math.sqrt(440 / Math.max(ia, 1))).toFixed(2)}s` };
    return (
      <>
        <g className={s.on(0)}>
          <line x1={40} y1={40} x2={40} y2={103} stroke={C.chalk} strokeWidth={2} />
          <line x1={40} y1={117} x2={40} y2={180} stroke={C.chalk} strokeWidth={2} />
          <line x1={40} y1={40} x2={80} y2={40} stroke={C.chalk} strokeWidth={2} />
          <line x1={100} y1={40} x2={110} y2={40} stroke={C.chalk} strokeWidth={2} />
          <line x1={180} y1={40} x2={220} y2={40} stroke={C.chalk} strokeWidth={2} />
          <line x1={220} y1={40} x2={220} y2={86} stroke={C.chalk} strokeWidth={2} />
          <line x1={220} y1={134} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
          <line x1={40} y1={180} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
          {/* "220 volt ko DC motor": the supply, then the motor. */}
          <g className="seq">
            <Source x={40} y={110} label="220 V" />
          </g>
          <g className="seq pop" style={{ '--d': '2500ms' }}>
            <Armature x={220} y={110} r={22} label="M" />
            {/* The armature turns: dots on it spin up from rest (beat 3) and
                speed up to full speed (beat 4); the brushes and the M stay put. */}
            <g className={k >= 2 ? 'spin-up' : ''} style={{ transformOrigin: '220px 110px', '--ramp': '5.2s', '--per': '2.6s' }}>
              <g className={k >= 3 ? 'spin-up' : ''} style={{ transformOrigin: '220px 110px', '--ramp': '3.25s', '--per': '1.625s' }}>
                {[0, 90, 180, 270].map((a) => (
                  <circle key={a} cx={220 + 15 * Math.cos((a * Math.PI) / 180)} cy={110 + 15 * Math.sin((a * Math.PI) / 180)} r={2.4} fill={C.chalk} />
                ))}
              </g>
            </g>
          </g>
          <g className="seq" style={{ '--d': '3300ms' }}>
            <Resistor x1={110} y={40} x2={180} label="Ra = 0.5 Ω" />
          </g>
        </g>
        {/* The switch: open (red, up) until beat 1, then it swings shut. */}
        <g className={s.on(0)}>
          <g className="seq" style={{ '--d': '5600ms' }}>
            <g style={{ transform: on ? 'none' : 'rotate(-38deg)', transformOrigin: '80px 40px', transformBox: 'view-box', transition: 'transform 0.4s ease-in' }}>
              <line x1={80} y1={40} x2={100} y2={40} stroke={on ? C.chalk : C.red} strokeWidth={2.4} strokeLinecap="round" />
            </g>
            <circle cx={80} cy={40} r={2.6} fill={C.chalk} />
          </g>
        </g>
        <g className={s.on(2) + hl(2)}>
          <g className="seq" style={{ '--d': '5600ms' }}>
            <Arrow x1={192} y1={128} x2={192} y2={92} color={C.yellow} w={2.4} />
            <text x={186} y={145} textAnchor="end" fontSize={13} fontWeight={700} fill={C.yellow}>Eb</text>
            <text x={186} y={167} textAnchor="end" fontSize={10.5} fill={C.dim}>V lai oppose</text>
          </g>
        </g>
        {on && (
          <g stroke={C.orange} strokeWidth={2.4} className="current-flow">
            <line x1={40} y1={42} x2={40} y2={101} className="flowdash" style={flow} />
            <line x1={110} y1={40} x2={42} y2={40} className="flowdash" style={flow} />
            <line x1={218} y1={40} x2={182} y2={40} className="flowdash" style={flow} />
            <line x1={220} y1={86} x2={220} y2={42} className="flowdash" style={flow} />
            <line x1={220} y1={178} x2={220} y2={134} className="flowdash" style={flow} />
            <line x1={42} y1={180} x2={218} y2={180} className="flowdash" style={flow} />
            <line x1={40} y1={119} x2={40} y2={178} className="flowdash" style={flow} />
          </g>
        )}
        {/* "Load thapda": a load hangs on the motor (beat 4 on). */}
        <g className={s.on(4)}>
          <g className="seq pop">
            <line x1={236} y1={124} x2={249} y2={148} stroke={C.dim} strokeWidth={1.8} />
            <rect x={236} y={148} width={26} height={22} rx={3} fill="#ffe3e3" stroke={C.chalk} strokeWidth={2} />
            <text x={249} y={163} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.red}>Load</text>
          </g>
        </g>
        <text x={130} y={204} textAnchor="middle" fontSize={12} fill={C.dim}>N = {n} rpm</text>
        <Bar x={268} frac={eb / 220} was={`${eb0} V`} at={ebAt} color={C.yellow} label="Eb" value={`${eb} V`} className={hl(2, 3, 4)} />
        <Bar x={314} frac={ia / 440} was={`${ia0} A`} at={iaAt} color={C.red} label="Ia" value={`${ia} A`} className={hl(1, 2, 3, 4, 5)} />
        {/* Full speed: only V − Eb = 10 V is left to push current through Ra. */}
        <g className={s.on(3, 3)}>
          <g className="seq" style={{ '--d': '2800ms' }}>
            <path d="M266 40 h-4 v7 h4 M262 44 L257 52" fill="none" stroke={C.chalk} strokeWidth={1.2} />
            <text x={262} y={63} textAnchor="end" fontSize={10} fontWeight={700} fill={C.chalk}>10 V</text>
          </g>
        </g>
      </>
    );
  },
  // Explanation phase: each beat also writes what is happening and why, in words.
  board: [
    { at: 0, until: 0, kind: 'step', node: <>Switch open → circuit pura chaina → <b>I<sub>a</sub> = 0</b></> },
    { at: 1, until: 1, kind: 'step', node: <>Start ma N = 0 → <b>E<sub>b</sub> = 0</b>. Current lai rokne R<sub>a</sub> matra, jun ekdam sano → current dherai thulo</> },
    { at: 2, until: 2, kind: 'step', node: <>Speed ↑ → conductor le flux cut garcha → <b>E<sub>b</sub></b> bancha (V ko ulto) → <b>I<sub>a</sub> ↓</b></> },
    { at: 3, until: 3, kind: 'step', node: <>Full speed: E<sub>b</sub> = 210 V. R<sub>a</sub> ma baki V − E<sub>b</sub> = 10 V matra → I<sub>a</sub> = 20 A</> },
    { at: 4, until: 4, kind: 'step', node: <>Load ↑ → speed ↓ → E<sub>b</sub> ↓ (205 V) → I<sub>a</sub> ↑ (30 A) → torque ↑</> },
    { at: 5, kind: 'idea', node: <>Back EMF le current aafai milaucha: motor self-regulating</> },
    { at: 1, until: 1, kind: 'eq', node: <><K>{String.raw`\begin{aligned} I_a &= \dfrac{V}{R_a} \\ &= \dfrac{220}{0.5} \\ &= 440\ \text{A} \end{aligned}`}</K></> },
    { at: 3, until: 3, kind: 'eq', node: <><K>{String.raw`\begin{aligned} I_a &= \dfrac{220 - 210}{0.5} \\ &= 20\ \text{A} \end{aligned}`}</K></> },
    { at: 4, until: 4, kind: 'eq', node: <><K>{String.raw`\begin{aligned} I_a &= \dfrac{220 - 205}{0.5} \\ &= 30\ \text{A} \end{aligned}`}</K></> },
    { at: 5, kind: 'eq', node: <><K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K></> },
  ],
  pov: 'engineer',
  // Tutor role: the same lines, worked by hand on the board, one moment per
  // beat, so no new voice is needed.
  variants: {
    tutor: {
      draw: undefined,
      tall: true,
      board: [
        { at: 0, kind: 'h', node: <>220 V motor, R<sub>a</sub> = 0.5 Ω</> },
        { at: 0, kind: 'step', node: <>Switch open → <K>{String.raw`I_a = 0`}</K></> },
        { at: 1, kind: 'step', node: <>Start (N = 0, E<sub>b</sub> = 0):<K>{String.raw`\begin{aligned} I_a &= \dfrac{V}{R_a} \\ &= \dfrac{220}{0.5} \\ &= 440\ \text{A} \end{aligned}`}</K></> },
        { at: 2, kind: 'step', node: <>Speed ↑ → E<sub>b</sub> ↑ → I<sub>a</sub> ↓</> },
        { at: 3, kind: 'step', node: <>Full speed (E<sub>b</sub> = 210 V):<K>{String.raw`\begin{aligned} I_a &= \dfrac{220 - 210}{0.5} \\ &= 20\ \text{A} \end{aligned}`}</K></> },
        { at: 4, kind: 'step', node: <>Load added (E<sub>b</sub> = 205 V):<K>{String.raw`\begin{aligned} I_a &= \dfrac{220 - 205}{0.5} \\ &= 30\ \text{A} \end{aligned}`}</K></> },
        { at: 5, kind: 'eq', node: <><K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K></> },
        { at: 5, kind: 'idea', node: <>Back EMF le current aafai milaucha</> },
      ],
    },
  },
});

export const voltagePower = video('Derivation: voltage, power ra torque equation', {
  beats: [
    { say: 'Supply ko duita kaam cha. Back EMF lai overcome garnu parcha, ani armature resistance bata current push garnu parcha.', voice: 'सप्लाईको दुईटा काम छ। ब्याक ई एम एफलाई ओभरकम गर्नु पर्छ, अनि आर्मेचर रेजिस्टेन्सबाट करेन्ट पुस गर्नु पर्छ।' },
    { say: 'So motor ko voltage equation: V equals E b plus I a R a.', voice: 'सो मोटरको भोल्टेज इक्वेसन: भी इक्वल्स ई बी प्लस आई ए आर ए।' },
    { say: 'Voltage lai power ma convert garna harek term lai I a le multiply gara.', voice: 'भोल्टेजलाई पावरमा कन्भर्ट गर्न हरेक टर्मलाई आई एले मल्टिप्लाई गर।' },
    { say: 'V I a equals E b I a plus I a squared R a.', voice: 'भी आई ए इक्वल्स ई बी आई ए प्लस आई ए स्क्वायर्ड आर ए।' },
    { say: 'V I a bhaneko armature lai diyeko electrical power. I a squared R a chai copper loss, heat bhayera waste huncha.', voice: 'भी आई ए भनेको आर्मेचरलाई दिएको इलेक्ट्रिकल पावर। आई ए स्क्वायर्ड आर ए चाहिँ कपर लस, हिट भएर वेस्ट हुन्छ।' },
    {
      say: 'Euta term baki cha.',
      voice: 'एउटा टर्म बाँकी छ।',
      ask: {
        q: 'Input = Eb·Ia + copper loss. Ta Eb·Ia chai k ho?',
        voice: 'इनपुट इक्वल्स ई बी आई ए प्लस कपर लस। त ई बी आई ए चाहिँ के हो?',
        options: ['Develop bhaeko gross mechanical power, Pm', 'Iron loss', 'Shunt field loss'],
        answer: 0,
        why: 'Heat ma lose nabhaeko jati electrical power cha, tyo convert huncha. Eb·Ia mechanical form ma convert bhaeko power ho.',
      },
    },
    { say: 'Mechanical power torque times angular speed pani ho, ani omega equals two pi N over sixty.', voice: 'मेकानिकल पावर टर्क टाइम्स एंगुलर स्पिड पनि हो, अनि ओमेगा इक्वल्स टु पाइ एन ओभर सिक्स्टी।' },
    { say: 'Torque ko lagi solve gara: T a equals 9.55 E b I a over N. E b equals P phi Z N over sixty A halda pheri 0.159 phi Z I a times P over A nai aaucha.', voice: 'टर्कको लागि सल्भ गर: टी ए इक्वल्स नाइन पोइन्ट फाइभ फाइभ ई बी आई ए ओभर एन। ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए हाल्दा फेरि जिरो पोइन्ट वान फाइभ नाइन फाइ जेड आई ए टाइम्स पी ओभर ए नै आउँछ।' },
    { say: 'Tyo torque ko kehi part iron ra friction loss ma kharcha huncha. Load samma pugne chai shaft torque, 9.55 times output power over N. Farak chai lost torque.', voice: 'त्यो टर्कको केही पार्ट आइरन र फ्रिक्सन लसमा खर्च हुन्छ। लोड सम्म पुग्ने चाहिँ शाफ्ट टर्क, नाइन पोइन्ट फाइभ फाइभ टाइम्स आउटपुट पावर ओभर एन। फरक चाहिँ लस्ट टर्क।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Voltage → power → torque</> },
    { at: 1, kind: 'eq', node: <>V = Eb + Ia·Ra</> },
    { at: 2, kind: 'step', node: <>Dubai tira × Ia:</> },
    { at: 3, kind: 'step', node: <>V·Ia = Eb·Ia + Ia²·Ra</> },
    { at: 4, kind: 'note', node: <>V·Ia = armature input · Ia²Ra = armature copper loss</> },
    { at: 6, kind: 'step', node: <>Pm = Eb·Ia = Ta·ω,  ω = 2πN / 60</> },
    { at: 7, kind: 'step', node: <>Ta = 60·Eb·Ia / (2πN) = <span className="y">9.55 · Eb·Ia / N</span>  N·m</> },
    { at: 7, kind: 'step', node: <>Eb = PφZN/60A halda: Ta = (60/2πN)(PφZN/60A)·Ia = <span className="y">0.159 φZIa (P/A)</span> ✓</> },
    { at: 8, kind: 'step', node: <>Tsh = 9.55 × Output / N  ·  Lost torque = Ta − Tsh = 9.55 × (iron + friction loss) / N</> },
  ],
});

export const maxPower = video('Derivation: maximum power ko condition', {
  beats: [
    { say: 'Motor le sabai bhanda dherai mechanical power kahile develop garcha? P m equals E b I a bata start garau.', voice: 'मोटरले सबैभन्दा धेरै मेकानिकल पावर कहिले डेभलप गर्छ? पी एम इक्वल्स ई बी आई ए बाट स्टार्ट गरौं।' },
    { say: 'E b equals V minus I a R a substitute gara. Ani P m equals V I a minus I a squared R a.', voice: 'ई बी इक्वल्स भी माइनस आई ए आर ए सब्स्टिच्युट गर। अनि पी एम इक्वल्स भी आई ए माइनस आई ए स्क्वायर्ड आर ए।' },
    {
      say: 'Aba maximum chahiyo.',
      voice: 'अब म्याक्सिमम चाहियो।',
      ask: {
        q: 'Pm lai maximum banaune Ia ko value kasari nikalne?',
        voice: 'पी एमलाई म्याक्सिमम बनाउने आई एको भ्यालु कसरी निकाल्ने?',
        options: ['Differentiate gara ra dPm/dIa = 0 rakha', 'Ia = 0 rakha', 'Eb = 0 rakha'],
        answer: 0,
        why: 'Maximum ma slope zero huncha, tesaile Ia ko respect ma derivative lai zero rakhchau.',
      },
    },
    { say: 'd P m by d I a equals V minus two I a R a. Yeslai zero rakha.', voice: 'डी पी एम बाई डी आई ए इक्वल्स भी माइनस टु आई ए आर ए। यसलाई जिरो राख।' },
    { say: 'So I a R a equals V over two. Supply voltage ko half armature resistance ma drop huncha.', voice: 'सो आई ए आर ए इक्वल्स भी ओभर टु। सप्लाई भोल्टेजको हाफ आर्मेचर रेजिस्टेन्समा ड्रप हुन्छ।' },
    { say: 'Ani E b equals V minus V over two, jun V over two nai ho.', voice: 'अनि ई बी इक्वल्स भी माइनस भी ओभर टु, जुन भी ओभर टु नै हो।' },
    { say: 'Second derivative minus two R a, jun negative cha, tesaile yo sachikai maximum ho.', voice: 'सेकेन्ड डेरिभेटिभ माइनस टु आर ए, जुन नेगेटिभ छ, त्यसैले यो साँच्चिकै म्याक्सिमम हो।' },
    { say: 'E b equals V over two hunda maximum power develop huncha. Tara tyo bela input ko half R a ma jalcha: efficiency best ma fifty percent, ani current ekdam huge.', voice: 'ई बी इक्वल्स भी ओभर टु हुँदा म्याक्सिमम पावर डेभलप हुन्छ। तर त्यो बेला इनपुटको हाफ आर एमा जल्छ: इफिसियन्सी बेस्टमा फिफ्टी पर्सेन्ट, अनि करेन्ट एकदम ह्युज।' },
    { say: 'So real motor lai yo point ma kahile pani chalaudainan. Tini haru E b lai V ko najik rakhera chalchan.', voice: 'सो रियल मोटरलाई यो पोइन्टमा कहिले पनि चलाउँदैनन्। तिनीहरू ई बी लाई भी को नजिक राखेर चल्छन्।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Maximum mechanical power</> },
    { at: 1, kind: 'step', node: <>Pm = Eb·Ia = (V − IaRa)·Ia = V·Ia − Ia²·Ra</> },
    { at: 3, kind: 'step', node: <>dPm/dIa = V − 2·Ia·Ra = 0</> },
    { at: 4, kind: 'step', node: <>Ia·Ra = V / 2</> },
    { at: 5, kind: 'step', node: <>Eb = V − IaRa = V − V/2 = V/2</> },
    { at: 6, kind: 'step', node: <>d²Pm/dIa² = −2Ra &lt; 0  ⟹  maximum</> },
    { at: 7, kind: 'eq', node: <>Eb = V / 2 hunda Pm maximum</> },
    { at: 8, kind: 'note', node: <>e.g. 220 V, Ra = 0.5 Ω → Ia = 220 A, Pm = 24.2 kW, η = 50%. Practice ma kahile use hudaina.</> },
  ],
});

export const speedEq = video('Derivation: speed equation', {
  beats: [
    { say: 'Back EMF le generator ko jastai EMF equation follow garcha: E b equals P phi Z N over sixty A.', voice: 'ब्याक ई एम एफले जेनेरेटरको जस्तै ई एम एफ इक्वेसन फलो गर्छ: ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए।' },
    { say: 'Speed ko lagi rearrange gara: N equals sixty A E b over P phi Z.', voice: 'स्पिडको लागि रिएरेन्ज गर: एन इक्वल्स सिक्स्टी ए ई बी ओभर पी फाइ जेड।' },
    { say: 'Given machine ma P, Z ra A fixed huncha. So speed E b over phi sanga proportional huncha, arthat V minus I a R a, over phi.', voice: 'गिभन मेसिनमा पी, जेड र ए फिक्स्ड हुन्छ। सो स्पिड ई बी ओभर फाइसँग प्रोपोर्सनल हुन्छ, अर्थात भी माइनस आई ए आर ए, ओभर फाइ।' },
    {
      say: 'No load ma try gara.',
      voice: 'नो लोडमा ट्राई गर।',
      ask: {
        tag: 'Quick check',
        q: 'No load ma armature current ekdam sano huncha. Eb kun ko najik huncha?',
        voice: 'नो लोडमा आर्मेचर करेन्ट एकदम सानो हुन्छ। ई बी कुनको नजिक हुन्छ?',
        options: ['V', 'Zero', 'V / 2'],
        answer: 0,
        why: 'Ia sano bhaye IaRa drop pani sano, tesaile Eb ≈ V.',
      },
    },
    { say: 'Eutai motor ko duita operating point ko lagi N 2 over N 1 equals E b 2 over E b 1, times phi 1 over phi 2. Yo euta ratio le dherai jaso IOE speed numerical solve huncha.', voice: 'एउटै मोटरको दुईटा अपरेटिङ पोइन्टको लागि एन टु ओभर एन वान इक्वल्स ई बी टु ओभर ई बी वान, टाइम्स फाइ वान ओभर फाइ टु। यो एउटा रेसियोले धेरैजसो आइओई स्पिड न्युमेरिकल सल्भ हुन्छ।' },
    { say: 'Shunt motor: flux constant huncha, tesaile speed ratio bhaneko back EMF ko ratio matra ho.', voice: 'शन्ट मोटर: फ्लक्स कन्स्टेन्ट हुन्छ, त्यसैले स्पिड रेसियो भनेको ब्याक ई एम एफको रेसियो मात्र हो।' },
    { say: 'Saturation bina ko series motor: flux I a sanga proportional, tesaile I a 1 over I a 2 le pani multiply gara.', voice: 'स्याचुरेसन बिनाको सिरिज मोटर: फ्लक्स आई ए सँग प्रोपोर्सनल, त्यसैले आई ए वान ओभर आई ए टु ले पनि मल्टिप्लाई गर।' },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        tag: 'Quick check',
        q: 'V same rakhera shunt motor ko field weak garyo. Speed ke huncha?',
        voice: 'भी सेम राखेर शन्ट मोटरको फिल्ड विक गर्यो। स्पिड के हुन्छ?',
        options: ['badhcha', 'ghatcha', 'same rahancha'],
        answer: 0,
        why: 'N ∝ Eb/φ, ani Eb ≈ V lagbhag fixed rahancha, tesaile sano φ bhaneko thulo N. Yehi ho field control.',
      },
    },
  ],
  board: [
    { at: 0, kind: 'step', node: <>Eb = PφZN / 60A</> },
    { at: 1, kind: 'step', node: <>N = 60A·Eb / (PφZ)</> },
    { at: 2, kind: 'eq', node: <>N ∝ Eb / φ = (V − IaRa) / φ</> },
    { at: 4, kind: 'eq', node: <>N₂ / N₁ = (Eb₂ / Eb₁) × (φ₁ / φ₂)</> },
    { at: 5, kind: 'step', node: <>Shunt (φ constant): N₂/N₁ = Eb₂/Eb₁</> },
    { at: 6, kind: 'step', node: <>Series (φ ∝ Ia): N₂/N₁ = (Eb₂/Eb₁) × (Ia₁/Ia₂)</> },
  ],
});

// IOE model answer for this chapter.
export const ch4Model = model({
  q: 'Back EMF bhaneko k ho? DC motor ma yesle kasari important role khelcha?',
  papers: ['2071 Magh', '2078 Poush', '2082 Baishakh (ECM)'],
  marks: '[2 + 4]',
  points: [
    <>Definition: armature ghumda yesko conductor le flux cut garchan ra EMF induce huncha (Faraday’s law). Lenz’s law anusar yesle applied voltage lai oppose garcha, tesaile yeslai back (counter) EMF bhanincha. Exam ma lekha: “It opposes the applied voltage, so it is called the back (counter) EMF”: <b>Eb = PφZN / 60A</b>.</>,
    <>Equivalent circuit (V, Ra, Eb) draw gara ra <b>V = Eb + IaRa</b> lekha, tesaile <b>Ia = (V − Eb) / Ra</b>.</>,
    <>Role 1, current limit garcha: chaliraheko bela Eb V ko najik huncha, tesaile Ia sano rahancha. Standstill ma Eb = 0 ra Ia = V/Ra khatarnak thulo huncha, tei bhayera starter chahincha.</>,
    <>Role 2, self-regulation: load ↑ → N ↓ → Eb ↓ → Ia ↑ → Ta ↑, jaba samma torque load sanga match hudaina. Load ghatda chain reverse huncha.</>,
    <>Role 3, energy conversion: Eb·Ia bhaneko develop bhaeko mechanical power (Pm) ho. Back EMF bina kunai electrical power convert hudaina thiyo.</>,
  ],
  tip: 'Examiner le circuit diagram, V = Eb + IaRa ra arrow sahit ko self-regulation chain herchan. Exam ma English mai lekha.',
});
