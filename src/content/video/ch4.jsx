import { Armature, Arrow, C, Resistor, Source, hook, model, video } from './kit.jsx';

/* Chapter 4 · Back EMF (Syllabus Unit 4: Back EMF). 220 V motor, Ra = 0.5 Ω throughout. */

// [N rpm, Eb V, Ia A] per beat of the story video.
const STORY = [
  [0, 0, 0],
  [0, 0, 440],
  [0, 0, 440],
  [786, 110, 220],
  [1500, 210, 20],
  [1464, 205, 30],
  [1464, 205, 30],
  [1464, 205, 30],
];

function Bar({ x, frac, color, label, value }) {
  return (
    <g>
      <rect x={x} y={40} width={26} height={150} rx={4} fill="none" stroke={C.faint} strokeWidth={1.5} />
      <rect
        x={x}
        y={40}
        width={26}
        height={150}
        rx={4}
        fill={color}
        style={{ transform: `scaleY(${Math.max(frac, 0.001)})`, transformBox: 'fill-box', transformOrigin: 'bottom', transition: 'transform 1.2s ease' }}
      />
      <text x={x + 13} y={206} textAnchor="middle" fontSize={12} fontWeight={700} fill={color}>{label}</text>
      <text x={x + 13} y={32} textAnchor="middle" fontSize={11.5} fill={C.chalk}>{value}</text>
    </g>
  );
}

const story = video('Motor le aafno current aafai kina limit garcha', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Yo hera 220 volt ko DC motor, armature resistance half ohm. Switch ahile open cha, tesaile kei pani bagdaina.', voice: 'यो हेर टु ट्वेन्टी भोल्टको डीसी मोटर, आर्मेचर रेजिस्टेन्स हाफ ओम। स्विच अहिले ओपन छ, त्यसैले केही पनि बग्दैन।' },
    { say: 'Switch on. Armature ahile ghumeko chaina, tesaile back EMF zero. Current V over R a: 440 ampere, dami!', voice: 'स्विच अन। आर्मेचर अहिले घुमेको छैन, त्यसैले ब्याक ई एम एफ जिरो। करेन्ट भी ओभर आर ए: फोर हन्ड्रेड फोर्टी एम्पियर, दामी!' },
    {
      say: 'Yo exact question ghari ghari aaucha hai.',
      voice: 'यो एक्जाक्ट क्वेस्चन घरि घरि आउँछ है।',
      ask: {
        tag: 'IOE 2079 Jestha · 2068 Magh · 2066 Magh · 2073 Bhadra · 2082 Bhadra',
        q: 'DC motor le starting ma kina thulo current tancha?',
        voice: 'डीसी मोटरले स्टार्टिङमा किन ठूलो करेन्ट तान्छ?',
        options: [
          'Rest ma N = 0, so Eb = 0, ani sano Ra le matra current limit garcha',
          'Starting ma field sabai bhanda strong huncha, tesaile dherai current tancha',
          'Starting ma friction sabai bhanda dherai huncha, tesaile dherai current chahincha',
        ],
        answer: 0,
        why: 'Ia = (V − Eb)/Ra. Standstill ma Eb = 0, ani Ra ta ohm ko sano fraction matra, tesaile Ia = V/Ra rated current bhanda dherai guna huncha. Tei bhayera starter chahincha.',
      },
    },
    { say: 'Armature ko speed badhdai jada yesko conductor le flux cut garchan ra supply lai oppose garne EMF generate garchan. Tyo nai back EMF ho, ani current ghatcha.', voice: 'आर्मेचरको स्पिड बढ्दै जाँदा यसको कन्डक्टरले फ्लक्स कट गर्छन् र सप्लाईलाई अपोज गर्ने ई एम एफ जेनेरेट गर्छन्। त्यो नै ब्याक ई एम एफ हो, अनि करेन्ट घट्छ।' },
    { say: 'Full speed ma back EMF 210 volt huncha. R a bata current push garna 10 volt matra baki huncha, tesaile armature current just 20 ampere.', voice: 'फुल स्पिडमा ब्याक ई एम एफ टु हन्ड्रेड टेन भोल्ट हुन्छ। आर ए बाट करेन्ट पुस गर्न टेन भोल्ट मात्र बाँकी हुन्छ, त्यसैले आर्मेचर करेन्ट जस्ट ट्वेन्टी एम्पियर।' },
    { say: 'Aba load thapa. Motor ali slow huncha, E b 205 volt ma jharcha, ani current 30 ampere samma badhcha, jasle load lai chahine extra torque dincha.', voice: 'अब लोड थप। मोटर अलि स्लो हुन्छ, ई बी टु हन्ड्रेड फाइभ भोल्टमा झर्छ, अनि करेन्ट थर्टी एम्पियर सम्म बढ्छ, जसले लोडलाई चाहिने एक्स्ट्रा टर्क दिन्छ।' },
    {
      say: 'Bharkhar k bhayo, ekchoti socha ta.',
      voice: 'भर्खर के भयो, एकचोटि सोच त।',
      ask: {
        tag: 'IOE 2067 Mangsir',
        q: 'Shaft load badhda DC motor le aafno current kasari adjust garcha?',
        voice: 'शाफ्ट लोड बढ्दा डीसी मोटरले आफ्नो करेन्ट कसरी एड्जस्ट गर्छ?',
        options: [
          'Speed ali ghatcha, so Eb ghatcha, so Ia = (V − Eb)/Ra badhcha',
          'Dherai current dina supply voltage badhcha',
          'Motor load hunda Ra ghatcha',
        ],
        answer: 0,
        why: 'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑, jaba samma torque pheri load sanga match hudaina. Load hatayo bhane chain ulto chalcha.',
      },
    },
    { say: 'So back EMF le motor lai self-regulating banaucha. Load lai jati current chahincha, exactly tyati nai tancha. Ekdam smart.', voice: 'सो ब्याक ई एम एफले मोटरलाई सेल्फ रेगुलेटिङ बनाउँछ। लोडलाई जति करेन्ट चाहिन्छ, एक्जाक्ट्ली त्यति नै तान्छ। एकदम स्मार्ट।' },
  ],
  draw: (s) => {
    const [n, eb, ia] = STORY[s.beat];
    const on = s.beat >= 1;
    return (
      <>
        <line x1={40} y1={40} x2={40} y2={103} stroke={C.chalk} strokeWidth={2} />
        <line x1={40} y1={117} x2={40} y2={180} stroke={C.chalk} strokeWidth={2} />
        <Source x={40} y={110} label="220 V" />
        <line x1={40} y1={40} x2={80} y2={40} stroke={C.chalk} strokeWidth={2} />
        {on ? (
          <line x1={80} y1={40} x2={100} y2={40} stroke={C.chalk} strokeWidth={2.4} />
        ) : (
          <line x1={80} y1={40} x2={97} y2={26} stroke={C.red} strokeWidth={2.4} strokeLinecap="round" />
        )}
        <line x1={100} y1={40} x2={110} y2={40} stroke={C.chalk} strokeWidth={2} />
        <Resistor x1={110} y={40} x2={180} label="Ra = 0.5 Ω" />
        <line x1={180} y1={40} x2={220} y2={40} stroke={C.chalk} strokeWidth={2} />
        <line x1={220} y1={40} x2={220} y2={86} stroke={C.chalk} strokeWidth={2} />
        <line x1={220} y1={134} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
        <line x1={40} y1={180} x2={220} y2={180} stroke={C.chalk} strokeWidth={2} />
        <g className={s.beat >= 3 ? 'spin-c' : ''} style={{ transformOrigin: '220px 110px', animationDuration: s.beat >= 4 ? '1s' : '2.6s' }}>
          <Armature x={220} y={110} r={22} label="M" />
        </g>
        <g className={s.on(3)}>
          <Arrow x1={192} y1={128} x2={192} y2={92} color={C.yellow} w={2.4} />
          <text x={186} y={150} textAnchor="end" fontSize={13} fontWeight={700} fill={C.yellow}>Eb</text>
          <text x={186} y={164} textAnchor="end" fontSize={10.5} fill={C.dim}>V lai oppose</text>
        </g>
        {on && <line x1={60} y1={180} x2={200} y2={180} stroke={C.orange} strokeWidth={2.4} className="flowdash" />}
        <text x={130} y={204} textAnchor="middle" fontSize={12} fill={C.dim}>N = {n} rpm</text>
        <Bar x={268} frac={eb / 220} color={C.yellow} label="Eb" value={`${eb} V`} />
        <Bar x={314} frac={ia / 440} color={C.red} label="Ia" value={`${ia} A`} />
      </>
    );
  },
  board: [
    { at: 1, until: 2, kind: 'eq', node: <>Ia = V / Ra = 220 / 0.5 = 440 A</> },
    { at: 4, until: 4, kind: 'eq', node: <>Ia = (220 − 210) / 0.5 = 20 A</> },
    { at: 5, until: 6, kind: 'eq', node: <>Ia = (220 − 205) / 0.5 = 30 A</> },
    { at: 7, kind: 'eq', node: <>Ia = (V − Eb) / Ra</> },
  ],
});

const voltagePower = video('Derivation: voltage, power ra torque equation', {
  beats: [
    { say: 'Supply ko duita kaam cha. Back EMF lai overcome garnu parcha, ani armature resistance bata current push garnu parcha.', voice: 'सप्लाईको दुईटा काम छ। ब्याक ई एम एफलाई ओभरकम गर्नु पर्छ, अनि आर्मेचर रेजिस्टेन्सबाट करेन्ट पुस गर्नु पर्छ।' },
    { say: 'So motor ko voltage equation: V equals E b plus I a R a.', voice: 'सो मोटरको भोल्टेज इक्वेसन: भी इक्वल्स ई बी प्लस आई ए आर ए।' },
    { say: 'Voltage lai power ma convert garna har term lai I a le multiply gara.', voice: 'भोल्टेजलाई पावरमा कन्भर्ट गर्न हर टर्मलाई आई एले मल्टिप्लाई गर।' },
    { say: 'V I a equals E b I a plus I a squared R a.', voice: 'भी आई ए इक्वल्स ई बी आई ए प्लस आई ए स्क्वायर्ड आर ए।' },
    { say: 'V I a bhaneko armature lai diyeko electrical power. I a squared R a chai copper loss, heat bhayera waste huncha.', voice: 'भी आई ए भनेको आर्मेचरलाई दिएको इलेक्ट्रिकल पावर। आई ए स्क्वायर्ड आर ए चाहिँ कपर लस, हिट भएर वेस्ट हुन्छ।' },
    {
      say: 'Euta term baki cha.',
      voice: 'एउटा टर्म बाँकी छ।',
      ask: {
        tag: 'Ekchin socha 🤔',
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

const maxPower = video('Derivation: maximum power ko condition', {
  beats: [
    { say: 'Motor le sabai bhanda dherai mechanical power kahile develop garcha? P m equals E b I a bata start garau.', voice: 'मोटरले सबैभन्दा धेरै मेकानिकल पावर कहिले डेभलप गर्छ? पी एम इक्वल्स ई बी आई ए बाट स्टार्ट गरौं।' },
    { say: 'E b equals V minus I a R a substitute gara. Ani P m equals V I a minus I a squared R a.', voice: 'ई बी इक्वल्स भी माइनस आई ए आर ए सब्स्टिच्युट गर। अनि पी एम इक्वल्स भी आई ए माइनस आई ए स्क्वायर्ड आर ए।' },
    {
      say: 'Aba maximum chahiyo.',
      voice: 'अब म्याक्सिमम चाहियो।',
      ask: {
        tag: 'Ekchin socha 🤔',
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

const speedEq = video('Derivation: speed equation', {
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
      say: 'Arko ekchoti.',
      voice: 'अर्को एकचोटि।',
      ask: {
        tag: 'Quick check',
        q: 'V same rakhera shunt motor ko field weak garyo. Yesko speed…',
        voice: 'भी सेम राखेर शन्ट मोटरको फिल्ड विक गर्यो। यसको स्पिड…',
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

export const ch4 = {
  title: 'Back EMF',
  syllabus: 'Unit 4 · Back EMF',
  steps: [
    story,
    voltagePower,
    maxPower,
    speedEq,
    model({
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
    }),
    hook('Back EMF bhaneko current ma motor ko aafnai brake ho', [
      'Speed chaina → Eb chaina → huge current → tei bhayera starter chahincha.',
      'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑ (self-regulating).',
      'Pm = Eb·Ia; Eb = V/2 hunda maximum, tara kahile use hudaina (η ≤ 50%).',
    ]),
  ],
};
