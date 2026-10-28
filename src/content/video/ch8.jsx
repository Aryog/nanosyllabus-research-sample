import { Arrow, C, D, K, model, solve, video } from './kit.jsx';

/* Chapter 8 · Speed control: field & armature (Syllabus Unit 4: Speed control — field control, armature control). */

// Speed bar: x = 40 (zero) … 180 (base) … 320 (above base).
const MARKER = [null, null, 180, 180, 265, 115, 60];
const KNOBS = [
  { k: 'φ', name: 'flux', x: 90, beat: 4, color: C.blue },
  { k: 'R', name: 'armature R', x: 180, beat: 5, color: C.orange },
  { k: 'V', name: 'armature V', x: 270, beat: 6, color: C.green },
];

export const threeKnobs = video('Speed ka tinta handle', {
  viewBox: '0 0 360 200',
  beats: [
    {
      say: 'Sabai speed-control method euta equation bata aaucha. Speed chai V minus Ia Ra lai phi le bhag gareko sanga proportional huncha.',
      voice: 'सबै स्पिड कन्ट्रोल मेथड एउटा इक्वेसनबाट आउँछ। स्पिड चाहिँ भी माइनस आई ए आर ए लाई फाइले भाग गरेकोसँग प्रोपोर्सनल हुन्छ।',
    },
    {
      say: 'Tesaile handle tinta chan: flux phi, armature circuit ko resistance, ra armature ma diyeko voltage.',
      voice: 'त्यसैले ह्यान्डल तीनवटा छन्: फ्लक्स फाइ, आर्मेचर सर्किटको रेजिस्टेन्स, र आर्मेचरमा दिएको भोल्टेज।',
    },
    {
      say: 'Base speed bhaneko rated voltage ma, full field ra armature ma extra resistance nabhako bela ko speed ho.',
      voice: 'बेस स्पिड भनेको रेटेड भोल्टेजमा, फुल फिल्ड र आर्मेचरमा एक्स्ट्रा रेजिस्टेन्स नभएको बेलाको स्पिड हो।',
    },
    {
      say: 'Aba field ko barema socha.',
      voice: 'अब फिल्डको बारेमा सोच।',
      ask: {
        q: 'Base speed ma field kasto huncha bhanyo?',
        voice: 'बेस स्पिडमा फिल्ड कस्तो हुन्छ भन्यो?',
        options: ['Full field', 'Aadha field', 'Field nai hudaina'],
        answer: 0,
        why: 'Base speed: rated voltage, full field, armature ma extra R chaina. Tesaile field lai weaken matra garna sakincha.',
      },
    },
    {
      say: 'Flux weaken gara, speed base bhanda mathi jancha. Yo nai field control ho.',
      voice: 'फ्लक्स विकन गर, स्पिड बेसभन्दा माथि जान्छ। यो नै फिल्ड कन्ट्रोल हो।',
    },
    {
      say: 'Armature circuit ma resistance thapa, speed base bhanda tala jharcha. Yo armature control ho.',
      voice: 'आर्मेचर सर्किटमा रेजिस्टेन्स थप, स्पिड बेसभन्दा तल झर्छ। यो आर्मेचर कन्ट्रोल हो।',
    },
    {
      say: 'Armature voltage ghatau, speed smoothly ekdam zero samma jharcha. Yo voltage control ho.',
      voice: 'आर्मेचर भोल्टेज घटाऊ, स्पिड स्मुथ्ली एकदम जिरोसम्म झर्छ। यो भोल्टेज कन्ट्रोल हो।',
    },
  ],
  draw: (s) => {
    const m = MARKER[s.beat];
    return (
      <>
        <text x={180} y={34} textAnchor="middle" fontSize={22} fontStyle="italic" fontFamily="Georgia, serif" fill={C.yellow} className={s.on(0)}>
          N ∝ (V − Ia·Ra) / φ
        </text>
        {KNOBS.map((n) => (
          <g key={n.k} className={s.on(1) + s.hl(n.beat)}>
            <circle cx={n.x} cy={84} r={20} fill={C.board} stroke={n.color} strokeWidth={3} />
            <text x={n.x} y={91} textAnchor="middle" fontSize={18} fontWeight={800} fill={n.color}>{n.k}</text>
            <text x={n.x} y={122} textAnchor="middle" fontSize={11} fill={C.dim}>{n.name}</text>
          </g>
        ))}
        <g className={s.on(2)}>
          <line x1={40} y1={160} x2={320} y2={160} stroke={C.faint} strokeWidth={8} strokeLinecap="round" />
          <line x1={180} y1={160} x2={320} y2={160} stroke={C.blue} strokeWidth={8} strokeLinecap="round" opacity={s.at(4) ? 0.6 : 0} style={{ transition: 'opacity 0.6s' }} />
          <line x1={40} y1={160} x2={180} y2={160} stroke={C.orange} strokeWidth={8} strokeLinecap="round" opacity={s.at(5) ? 0.5 : 0} style={{ transition: 'opacity 0.6s' }} />
          <text x={40} y={186} textAnchor="middle" fontSize={11} fill={C.dim}>0</text>
          <text x={180} y={186} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.chalk}>base</text>
          <text x={320} y={186} textAnchor="middle" fontSize={11} fill={C.dim}>base bhanda mathi</text>
          {m != null && (
            <g style={{ transform: `translateX(${m - 180}px)`, transition: 'transform 1s ease' }}>
              <polygon points="180,148 172,136 188,136" fill={C.yellow} />
            </g>
          )}
        </g>
      </>
    );
  },
});

export const fieldControl = video('Field (flux) control', {
  beats: [
    {
      say: 'Field control: shunt field winding sanga series ma euta rheostat.',
      voice: 'फिल्ड कन्ट्रोल: शन्ट फिल्ड वाइन्डिङसँग सिरिजमा एउटा रियोस्ट्याट।',
    },
    {
      say: 'Rheostat badhau, field current ghatcha, flux ghatcha, ani speed base speed bhanda mathi jancha.',
      voice: 'रियोस्ट्याट बढाऊ, फिल्ड करेन्ट घट्छ, फ्लक्स घट्छ, अनि स्पिड बेस स्पिडभन्दा माथि जान्छ।',
    },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Field rheostat badhauda speed kata jancha?',
        voice: 'फिल्ड रियोस्ट्याट बढाउँदा स्पिड कता जान्छ?',
        options: ['Base bhanda tala', 'Base bhanda mathi'],
        answer: 1,
        why: 'Rheostat ↑ → Ish ↓ → φ ↓ → N ↑, base bhanda mathi.',
      },
    },
    {
      say: 'Yo sasto, efficient ra smooth cha, dherai speed steps sanga.',
      voice: 'यो सस्तो, इफिसियन्ट र स्मुथ छ, धेरै स्पिड स्टेप्ससँग।',
    },
    {
      say: 'Tara yasle base bhanda mathi ko speed matra dincha, ani high speed ma poor commutation ra armature ko mechanical strength le limit garcha.',
      voice: 'तर यसले बेसभन्दा माथिको स्पिड मात्र दिन्छ, अनि हाई स्पिडमा पुअर कम्युटेसन र आर्मेचरको मेकानिकल स्ट्रेन्थले लिमिट गर्छ।',
    },
    {
      say: 'Constant-torque load ma, flux weaken garda armature current badhnai parcha, kina bhane phi times I a same rahanu parcha.',
      voice: 'कन्स्ट्यान्ट टर्क लोडमा, फ्लक्स विकन गर्दा आर्मेचर करेन्ट बढ्नै पर्छ, किनभने फाइ टाइम्स आई ए सेम रहनु पर्छ।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Field (flux) control</> },
    { at: 1, kind: 'step', node: <>Rheostat ↑ → Ish ↓ → φ ↓ → <span className="y">N ↑ (base speed bhanda mathi)</span></> },
    { at: 3, kind: 'step', node: <><span className="g">✓</span> sasto, efficient (Ish sano), smooth control</> },
    { at: 4, kind: 'step', node: <><span className="r">✗</span> base bhanda mathi matra · commutation ra armature strength le limit</> },
    { at: 5, kind: 'eq', node: <>Constant torque: <K>{String.raw`\phi_1 I_{a1} = \phi_2 I_{a2}`}</K></> },
  ],
});

export const solveField = solve({
  title: 'IOE 2075 Baishakh solve: field weakening',
  paper: '2075 Baishakh',
  paperVoice: 'टु थाउजेन्ड सेभेन्टी फाइभ बैशाख',
  read: '250 volt ko DC shunt motor le 1500 rpm ma 20 ampere armature current lincha. Armature resistance 0.25 ohm ra field resistance 250 ohm cha. Load torque constant rakhera field sanga series ma 250 ohm resistance thapincha. Naya speed nikala.',
  readVoice: 'टु फिफ्टी भोल्टको डीसी शन्ट मोटरले फिफ्टीन हन्ड्रेड आर पी एममा ट्वेन्टी एम्पियर आर्मेचर करेन्ट लिन्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट टु फाइभ ओह्म र फिल्ड रेजिस्टेन्स टु फिफ्टी ओह्म छ। लोड टर्क कन्स्ट्यान्ट राखेर फिल्डसँग सिरिजमा टु फिफ्टी ओह्म रेजिस्टेन्स थपिन्छ। नयाँ स्पिड निकाल।',
  question: (
    <>
      A <D>250 V</D> DC shunt motor (<D>Ra = 0.25 Ω</D>, <D>Rsh = 250 Ω</D>) takes an armature current of <D>20 A</D> at <D>1500 rpm</D>. A{' '}
      <D>250 Ω</D> resistance is added in series with the field, keeping the <D>load torque constant</D>. Assuming φ ∝ field current, find the new speed.
    </>
  ),
  given: [
    { node: <>V = 250 V</>, say: 'Supply 250 volt', voice: 'सप्लाई टु फिफ्टी भोल्ट' },
    { node: <>Ra = 0.25 Ω, Rsh = 250 Ω</>, say: 'armature resistance 0.25 ohm, field 250 ohm', voice: 'आर्मेचर रेजिस्टेन्स जिरो पोइन्ट टु फाइभ ओह्म, फिल्ड टु फिफ्टी ओह्म' },
    { node: <>Ia₁ = 20 A, N₁ = 1500 rpm</>, say: '1500 rpm ma 20 ampere', voice: 'फिफ्टीन हन्ड्रेड आर पी एममा ट्वेन्टी एम्पियर' },
    { node: <>Field circuit: 250 + 250 = 500 Ω; torque constant</>, say: 'ani constant torque ma field circuit 500 ohm huncha', voice: 'अनि कन्स्ट्यान्ट टर्कमा फिल्ड सर्किट फाइभ हन्ड्रेड ओह्म हुन्छ' },
  ],
  find: { node: <>Naya speed N₂</>, say: 'Naya speed chahiyo.', voice: 'नयाँ स्पिड चाहियो।' },
  idea: {
    node: <>N₂/N₁ = (Eb₂/Eb₁)(φ₁/φ₂) ra constant torque ⟹ φ₁Ia₁ = φ₂Ia₂</>,
    say: 'Key idea: speed ratio bhaneko back EMF ratio times flux ratio ho, ani constant torque bhaneko phi times I a same rahancha.',
    voice: 'की आइडिया: स्पिड रेसियो भनेको ब्याक ई एम एफ रेसियो टाइम्स फ्लक्स रेसियो हो, अनि कन्स्ट्यान्ट टर्क भनेको फाइ टाइम्स आई ए सेम रहन्छ।',
  },
  steps: [
    {
      node: <>Ish₁ = 250/250 = 1 A → Ish₂ = 250/500 = 0.5 A ⟹ φ₂ = φ₁/2</>,
      say: 'Field current 1 ampere bata half ampere ma jharcha, tesaile flux half huncha.',
      voice: 'फिल्ड करेन्ट वान एम्पियरबाट हाफ एम्पियरमा झर्छ, त्यसैले फ्लक्स हाफ हुन्छ।',
    },
    {
      node: <>φ₁Ia₁ = φ₂Ia₂ ⟹ Ia₂ = 20 × 2 = 40 A</>,
      say: 'Aba armature current.',
      voice: 'अब आर्मेचर करेन्ट।',
      ask: {
        tag: 'IOE 2075 Baishakh',
        q: 'Load torque constant cha ra Ta ∝ φ·Ia. φ half bhayo bhane armature current le…',
        voice: 'लोड टर्क कन्स्ट्यान्ट छ र टी ए प्रोपोर्सनल टु फाइ आई ए। फाइ हाफ भयो भने आर्मेचर करेन्टले…',
        options: ['double bhayera 40 A pugnu parcha', 'half bhayera 10 A hunu parcha', '20 A mai rahanu parcha'],
        answer: 0,
        why: 'φ₁·Ia₁ = φ₂·Ia₂, tesaile Ia₂ = 20 × (φ₁/φ₂) = 40 A.',
      },
    },
    {
      node: <>Eb₁ = 250 − 20 × 0.25 = 245 V · Eb₂ = 250 − 40 × 0.25 = 240 V</>,
      say: 'Back EMF pahile 245 volt, pachi 240 volt.',
      voice: 'ब्याक ई एम एफ पहिले टु हन्ड्रेड फोर्टी फाइभ भोल्ट, पछि टु हन्ड्रेड फोर्टी भोल्ट।',
    },
  ],
  answer: {
    node: <>N₂ = 1500 × (240/245) × 2 ≈ 2939 rpm</>,
    say: 'Tesaile N two = 1500 times 240 over 245, times 2: lagbhag 2939 rpm. Field weakening le speed lai base bhanda dherai mathi puryayo.',
    voice: 'त्यसैले एन टु बराबर फिफ्टीन हन्ड्रेड टाइम्स टु फोर्टी ओभर टु फोर्टी फाइभ, टाइम्स टु: लगभग टु थाउजेन्ड नाइन हन्ड्रेड थर्टी नाइन आर पी एम। फिल्ड विकनिङले स्पिडलाई बेसभन्दा धेरै माथि पुर्यायो।',
  },
  trap: {
    node: <>Trap: Ia = 20 A nai rakhyo bhane (constant torque birsiyo bhane) 1500 × 2 × 245/245 = 3000 rpm aaucha.</>,
    say: 'Common trap bhaneko current 20 ampere mai rakhnu ho, jasle 3000 rpm dincha.',
    voice: 'कमन ट्र्याप भनेको करेन्ट ट्वेन्टी एम्पियरमै राख्नु हो, जसले थ्री थाउजेन्ड आर पी एम दिन्छ।',
  },
});

export const armatureControl = video('Armature (rheostatic) control', {
  beats: [
    {
      say: 'Armature control: armature sanga series ma euta resistance.',
      voice: 'आर्मेचर कन्ट्रोल: आर्मेचरसँग सिरिजमा एउटा रेजिस्टेन्स।',
    },
    {
      say: 'Extra resistance le thulo voltage drop dincha, tesaile back EMF ghatcha ra speed base speed bhanda tala jharcha.',
      voice: 'एक्स्ट्रा रेजिस्टेन्सले ठूलो भोल्टेज ड्रप दिन्छ, त्यसैले ब्याक ई एम एफ घट्छ र स्पिड बेस स्पिडभन्दा तल झर्छ।',
    },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Armature ma extra resistance thapda speed kata jancha?',
        voice: 'आर्मेचरमा एक्स्ट्रा रेजिस्टेन्स थप्दा स्पिड कता जान्छ?',
        options: ['Base bhanda mathi', 'Base bhanda tala'],
        answer: 1,
        why: 'Extra R le thulo drop dincha, Eb ghatcha, tesaile speed base bhanda tala.',
      },
    },
    {
      say: 'Yo wasteful cha, kina bhane pura armature current le resistance lai tataucha, ani load change huda speed dherai change huncha.',
      voice: 'यो वेस्टफुल छ, किनभने पूरा आर्मेचर करेन्टले रेजिस्टेन्सलाई तताउँछ, अनि लोड चेन्ज हुँदा स्पिड धेरै चेन्ज हुन्छ।',
    },
    {
      say: 'Voltage control, arthat Ward-Leonard system, le variable armature voltage dina motor-generator set use garcha. Zero dekhi base samma smooth speed, dubai direction ma, tara mahango.',
      voice: 'भोल्टेज कन्ट्रोल, अर्थात् वार्ड लियोनार्ड सिस्टमले, भेरिएबल आर्मेचर भोल्टेज दिन मोटर जेनेरेटर सेट युज गर्छ। जिरोदेखि बेससम्म स्मुथ स्पिड, दुवै डाइरेक्सनमा, तर महँगो।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Armature (rheostatic) control</> },
    { at: 1, kind: 'step', node: <>Extra R → Ia(Ra + R) ↑ → Eb ↓ → <span className="y">N ↓ (base bhanda tala matra)</span></> },
    { at: 3, kind: 'step', node: <><span className="r">✗</span> Ia²R waste · <span className="r">✗</span> poor speed regulation</> },
    { at: 4, kind: 'h', node: <>Voltage (Ward-Leonard) control</> },
    { at: 4, kind: 'step', node: <>M-G set bata variable armature V → 0 dekhi base speed, dubai direction · ekdam ramro tara mahango</> },
  ],
});

export const solveArmature = solve({
  title: 'IOE 2072 Ashwin solve: armature resistance',
  paper: '2072 Ashwin',
  paperVoice: 'टु थाउजेन्ड सेभेन्टी टु आश्विन',
  read: '200 volt ko DC shunt motor le constant-torque load chalaucha. Yasle 1000 rpm ma 50 ampere lincha. Armature resistance 0.1 ohm, field resistance 100 ohm. Armature circuit ma kati resistance rakhda speed 800 rpm ma jharcha?',
  readVoice: 'टु हन्ड्रेड भोल्टको डीसी शन्ट मोटरले कन्स्ट्यान्ट टर्क लोड चलाउँछ। यसले वान थाउजेन्ड आर पी एममा फिफ्टी एम्पियर लिन्छ। आर्मेचर रेजिस्टेन्स जिरो पोइन्ट वान ओह्म, फिल्ड रेजिस्टेन्स वान हन्ड्रेड ओह्म। आर्मेचर सर्किटमा कति रेजिस्टेन्स राख्दा स्पिड एट हन्ड्रेड आर पी एममा झर्छ?',
  question: (
    <>
      A <D>200 V</D> DC shunt motor drives a <D>constant-torque</D> load. It draws <D>50 A</D> at <D>1000 rpm</D>. <D>Ra = 0.1 Ω</D>, <D>Rsh = 100 Ω</D>.
      What resistance must be inserted in the armature circuit to reduce the speed to <D>800 rpm</D>?
    </>
  ),
  given: [
    { node: <>V = 200 V, IL = 50 A</>, say: '200 volt, line bata 50 ampere', voice: 'टु हन्ड्रेड भोल्ट, लाइनबाट फिफ्टी एम्पियर' },
    { node: <>Ra = 0.1 Ω, Rsh = 100 Ω</>, say: 'armature 0.1 ohm, field 100 ohm', voice: 'आर्मेचर जिरो पोइन्ट वान ओह्म, फिल्ड वान हन्ड्रेड ओह्म' },
    { node: <>N₁ = 1000 rpm → N₂ = 800 rpm, torque constant</>, say: 'constant torque ma speed 1000 bata 800 rpm samma jharcha', voice: 'कन्स्ट्यान्ट टर्कमा स्पिड वान थाउजेन्डबाट एट हन्ड्रेड आर पी एमसम्म झर्छ' },
  ],
  find: { node: <>Extra armature resistance R</>, say: 'Extra armature resistance chahiyo.', voice: 'एक्स्ट्रा आर्मेचर रेजिस्टेन्स चाहियो।' },
  idea: {
    node: <>φ constant ra torque constant ⟹ Ia constant, ani N ∝ Eb</>,
    say: 'Key idea: shunt motor ho, tesaile flux fixed. Constant torque le armature current pani fix garcha, ani speed back EMF sanga proportional huncha.',
    voice: 'की आइडिया: शन्ट मोटर हो, त्यसैले फ्लक्स फिक्स्ड। कन्स्ट्यान्ट टर्कले आर्मेचर करेन्ट पनि फिक्स गर्छ, अनि स्पिड ब्याक ई एम एफसँग प्रोपोर्सनल हुन्छ।',
  },
  steps: [
    {
      node: <>Ish = 200/100 = 2 A ⟹ Ia = 50 − 2 = 48 A</>,
      say: 'Field current ghatau: 2 ampere. Dubai speed ma I a 48 ampere.',
      voice: 'फिल्ड करेन्ट घटाऊ: टु एम्पियर। दुवै स्पिडमा आई ए फोर्टी एट एम्पियर।',
    },
    {
      node: <>Eb₁ = 200 − 48 × 0.1 = 195.2 V ⟹ Eb₂ = 0.8 × 195.2 = 156.16 V</>,
      say: 'Back EMF 1000 rpm ma 195.2 volt, tesaile 800 rpm ma 156.16 volt.',
      voice: 'ब्याक ई एम एफ वान थाउजेन्ड आर पी एममा वान हन्ड्रेड नाइन्टी फाइभ पोइन्ट टु भोल्ट, त्यसैले एट हन्ड्रेड आर पी एममा वान हन्ड्रेड फिफ्टी सिक्स पोइन्ट वान सिक्स भोल्ट।',
    },
    {
      node: <>200 − 156.16 = 48 × (0.1 + R) ⟹ 0.1 + R = 0.913 Ω</>,
      say: 'Aba extra resistance sahit ko voltage equation.',
      voice: 'अब एक्स्ट्रा रेजिस्टेन्स सहितको भोल्टेज इक्वेसन।',
      ask: {
        tag: 'IOE 2072 Ashwin',
        q: '200 − 156.16 = 48 × (0.1 + R). Thapeko resistance R kati ho?',
        voice: 'टु हन्ड्रेड माइनस वान हन्ड्रेड फिफ्टी सिक्स पोइन्ट वान सिक्स बराबर फोर्टी एट टाइम्स जिरो पोइन्ट वान प्लस आर। थपेको रेजिस्टेन्स आर कति हो?',
        options: ['≈ 0.81 Ω', '≈ 0.91 Ω', '≈ 1.33 Ω', '≈ 0.1 Ω'],
        answer: 0,
        why: '43.84/48 = 0.913 Ω total. Ra = 0.1 Ω ghatau: R ≈ 0.81 Ω.',
      },
    },
  ],
  answer: {
    node: <>R ≈ 0.81 Ω</>,
    say: 'Tesaile extra resistance lagbhag 0.81 ohm. IOE 2068 Bhadra ma twist cha, pump ko torque speed squared sanga badhcha: testo bela I a 30.72 ampere ma jharcha ra R lagbhag 1.33 ohm huncha.',
    voice: 'त्यसैले एक्स्ट्रा रेजिस्टेन्स लगभग जिरो पोइन्ट एट वान ओह्म। आइओई टु थाउजेन्ड सिक्स्टी एट भदौमा ट्विस्ट छ, पम्पको टर्क स्पिड स्क्वायर्डसँग बढ्छ: त्यस्तो बेला आई ए थर्टी पोइन्ट सेभेन टु एम्पियरमा झर्छ र आर लगभग वान पोइन्ट थ्री थ्री ओह्म हुन्छ।',
  },
  trap: {
    node: <>Trap: Ra ghatauna birsiyo bhane 0.91 Ω aaucha; Ia = 48 A ko satta IL = 50 A use garyo bhane pani answer sarcha.</>,
    say: 'Common traps: R a ghatauna birsanu, ya I a ko satta line current use garnu.',
    voice: 'कमन ट्र्याप्स: आर ए घटाउन बिर्सनु, या आई एको सट्टा लाइन करेन्ट युज गर्नु।',
  },
});

export const seriesControl = video('IOE 2075 Baisakh: series motor ko speed control', {
  viewBox: '0 0 360 120',
  beats: [
    {
      say: 'Series motor ma pani yei duita idea nai use huncha.',
      voice: 'सिरिज मोटरमा पनि यही दुईटा आइडिया नै युज हुन्छ।',
    },
    {
      say: 'Field control: series field ko across ma diverter resistance, ya tapped field, le flux weaken garcha ra speed badhaucha.',
      voice: 'फिल्ड कन्ट्रोल: सिरिज फिल्डको एक्रसमा डाइभर्टर रेजिस्टेन्स, या ट्याप्ड फिल्डले, फ्लक्स विकन गर्छ र स्पिड बढाउँछ।',
    },
    {
      say: 'Armature control: motor sanga series ma rakheko resistance le speed ghataucha.',
      voice: 'आर्मेचर कन्ट्रोल: मोटरसँग सिरिजमा राखेको रेजिस्टेन्सले स्पिड घटाउँछ।',
    },
    {
      say: 'IOE 2075 Baisakh, 8 marks: 200 volt ko series motor 15 ampere ma 800 rpm ma chalcha, Ra 0.6 ra Rse 0.4 ohm. Same current ma 5 ohm thapda speed kati huncha, nikala.',
      voice: 'आइओई टु थाउजेन्ड सेभेन्टी फाइभ बैशाख, एट मार्क्स: टु हन्ड्रेड भोल्टको सिरिज मोटर फिफ्टीन एम्पियरमा एट हन्ड्रेड आर पी एममा चल्छ, आर ए जिरो पोइन्ट सिक्स र आर एस ई जिरो पोइन्ट फोर ओह्म। सेम करेन्टमा फाइभ ओह्म थप्दा स्पिड कति हुन्छ, निकाल।',
    },
    {
      say: 'Current same cha, tesaile series flux pani same. Speed ratio bhaneko back EMF ratio matra ho.',
      voice: 'करेन्ट सेम छ, त्यसैले सिरिज फ्लक्स पनि सेम। स्पिड रेसियो भनेको ब्याक ई एम एफ रेसियो मात्र हो।',
    },
    {
      say: 'La solve gara.',
      voice: 'ल सल्भ गर।',
      ask: {
        q: 'Eb₁ = 185 V ra Eb₂ = 110 V. Current same bhaye speed ratio kasko ratio bhanyo?',
        voice: 'ई बी वान वान एटी फाइभ भोल्ट र ई बी टु वान टेन भोल्ट। करेन्ट सेम भए स्पिड रेसियो कसको रेसियो भन्यो?',
        options: ['Current ko ratio', 'Resistance ko ratio', 'Back EMF ko ratio'],
        answer: 2,
        why: 'Same current → same flux, tesaile N₂/N₁ = Eb₂/Eb₁ = 110/185.',
      },
    },
    {
      say: 'Tesaile naya speed 800 times 110 over 185, lagbhag 476 rpm.',
      voice: 'त्यसैले नयाँ स्पिड एट हन्ड्रेड टाइम्स वान हन्ड्रेड टेन ओभर वान हन्ड्रेड एटी फाइभ, लगभग फोर हन्ड्रेड सेभेन्टी सिक्स आर पी एम।',
    },
  ],
  draw: (s) => (
    <>
      <g className={s.on(1) + s.hl(1)}>
        <path d="M30 50 C38 34 46 34 54 50 C62 34 70 34 78 50 C86 34 94 34 102 50" fill="none" stroke={C.violet} strokeWidth={2.2} />
        <text x={66} y={72} textAnchor="middle" fontSize={11} fill={C.violet}>series field</text>
        <path d="M30 50 L30 20 L44 20 L48 12 L56 28 L64 12 L72 28 L80 12 L88 20 L102 20 L102 50" fill="none" stroke={C.blue} strokeWidth={2} />
        <text x={66} y={10} textAnchor="middle" fontSize={11} fill={C.blue}>diverter</text>
      </g>
      <g className={s.on(2) + s.hl(2)}>
        <line x1={102} y1={50} x2={140} y2={50} stroke={C.dim} strokeWidth={1.6} />
        <path d="M140 50 L146 40 L154 60 L162 40 L170 60 L178 40 L184 50" fill="none" stroke={C.orange} strokeWidth={2} />
        <text x={162} y={78} textAnchor="middle" fontSize={11} fill={C.orange}>series R</text>
        <line x1={184} y1={50} x2={220} y2={50} stroke={C.dim} strokeWidth={1.6} />
        <circle cx={240} cy={50} r={18} fill={C.board} stroke={C.chalk} strokeWidth={2.4} />
        <text x={240} y={55} textAnchor="middle" fontSize={14} fontWeight={700}>M</text>
        <Arrow x1={282} y1={50} x2={330} y2={50} color={C.yellow} />
        <text x={306} y={40} textAnchor="middle" fontSize={12} fill={C.yellow}>N ↓</text>
      </g>
      <text x={180} y={108} textAnchor="middle" fontSize={12} fill={C.dim} className={s.on(3)}>200 V · 15 A ma 800 rpm · Ra = 0.6 Ω · Rse = 0.4 Ω · 5 Ω thapa, same current</text>
    </>
  ),
  board: [
    { at: 4, kind: 'step', node: <>Same I ⟹ same φ ⟹ N₂/N₁ = Eb₂/Eb₁</> },
    { at: 6, kind: 'eq', node: <>N₂ = 800 × 110 / 185 ≈ 476 rpm</> },
  ],
});

// Segment 2: where the three knobs and the speed-control ratios come from.
export const speedDerivation = video('Derivation: speed control ko equation', {
  tall: true,
  beats: [
    {
      say: 'Aba yo equation derive garau. Suru voltage equation bata: V equals E b plus I a R a, ani E b equals k phi N.',
      voice: 'अब यो इक्वेसन डिराइभ गरौं। सुरु भोल्टेज इक्वेसनबाट: भी इक्वल्स ई बी प्लस आई ए आर ए, अनि ई बी इक्वल्स के फाइ एन।',
    },
    {
      say: 'k bhaneko P Z over 60 A, machine ko constant. N lai alag gara: N equals V minus I a R a, over k phi.',
      voice: 'के भनेको पी जेड ओभर सिक्स्टी ए, मेसिनको कन्स्टेन्ट। एनलाई अलग गर: एन इक्वल्स भी माइनस आई ए आर ए, ओभर के फाइ।',
    },
    {
      say: 'Armature sanga extra R thapyo bhane drop I a times R a plus R huncha. Aba tinai knob eutai equation ma dekhincha: V, R ra phi.',
      voice: 'आर्मेचरसँग एक्स्ट्रा आर थप्यो भने ड्रप आई ए टाइम्स आर ए प्लस आर हुन्छ। अब तीनै नब एउटै इक्वेसनमा देखिन्छ: भी, आर र फाइ।',
    },
    { say: 'Eutai motor ko duita operating point ko lagi N 2 over N 1 equals E b 2 over E b 1, times phi 1 over phi 2. Yo euta ratio le dherai jaso IOE speed numerical solve huncha.', voice: 'एउटै मोटरको दुईटा अपरेटिङ पोइन्टको लागि एन टु ओभर एन वान इक्वल्स ई बी टु ओभर ई बी वान, टाइम्स फाइ वान ओभर फाइ टु। यो एउटा रेसियोले धेरैजसो आइओई स्पिड न्युमेरिकल सल्भ हुन्छ।' },
    {
      say: 'Aba load torque ko condition.',
      voice: 'अब लोड टर्कको कन्डिसन।',
      ask: {
        tag: 'Derivation ko bich ma',
        q: 'Load torque constant cha, ra Ta ∝ φIa. Flux aadha garyo bhane armature current…',
        voice: 'लोड टर्क कन्स्टेन्ट छ, र टी ए प्रोपोर्सनल टु फाइ आई ए। फ्लक्स आधा गर्यो भने आर्मेचर करेन्ट…',
        options: ['double huncha', 'aadha huncha', 'same rahancha'],
        answer: 0,
        why: 'φ₁Ia₁ = φ₂Ia₂: φ aadha bhaye Ia double hunai parcha. Tesaile field weakening ma Eb ali ghatcha.',
      },
    },
    {
      say: 'Constant torque bhaneko phi 1 I a 1 equals phi 2 I a 2. Har speed-control numerical yi duita line ho: pahila naya I a, ani naya E b, ani speed ratio.',
      voice: 'कन्स्टेन्ट टर्क भनेको फाइ वान आई ए वान इक्वल्स फाइ टु आई ए टु। हर स्पिड कन्ट्रोल न्युमेरिकल यी दुईटा लाइन हो: पहिला नयाँ आई ए, अनि नयाँ ई बी, अनि स्पिड रेसियो।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Speed equation, step by step</> },
    { at: 0, kind: 'step', node: <><K>{String.raw`V = E_b + I_a R_a,\quad E_b = k\phi N \;\; (k = \tfrac{PZ}{60A})`}</K></> },
    { at: 1, kind: 'step', node: <><K>{String.raw`N = \dfrac{V - I_a R_a}{k\phi}`}</K></> },
    { at: 2, kind: 'eq', node: <><K>{String.raw`N = \dfrac{V - I_a (R_a + R)}{k\phi}`}</K></> },
    { at: 2, kind: 'note', node: <><span className="g">V</span> voltage control · <span className="y">R</span> armature control · <span className="y">φ</span> field control</> },
    { at: 3, kind: 'eq', node: <><K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}} \times \dfrac{\phi_1}{\phi_2}`}</K></> },
    { at: 5, kind: 'eq', node: <>Constant torque: <K>{String.raw`\phi_1 I_{a1} = \phi_2 I_{a2}`}</K></> },
    { at: 5, kind: 'note', node: <>Recipe: naya I<sub>a</sub> → naya E<sub>b</sub> → speed ratio</> },
  ],
});

// IOE model answer for this chapter.
export const ch8Model = model({
  q: 'DC shunt motor ko speed control garne bibhinna method haru describe gara.',
  papers: ['2071 Bhadra', '2069 Bhadra', '2065 Chaitra'],
  marks: '[8]',
  points: [
    <><b>Aadhar:</b> Eb = PφZN/60A ⟹ N ∝ Eb/φ = (V − IaRa)/φ. Speed lai φ, armature circuit resistance, ya armature voltage bata change garna sakincha.</>,
    <><b>Field (flux) control:</b> shunt field sanga series ma rheostat. Yo badhauda Ish ra φ ghatcha, tesaile N base speed bhanda mathi jancha. Efficient ra sasto (field current sano huncha), fine control; high speed ma commutation ra mechanical strength le limit garcha. Circuit ra φ ghatdai jada ko N–Ia curves draw gara.</>,
    <><b>Armature (rheostatic) control:</b> armature sanga series ma variable resistance. Ia(Ra + R) drop le Eb ra N lai base speed bhanda tala jharcha. Simple cha, tara Ia²R power waste garcha ra speed regulation poor huncha. Circuit ra R badhdai jada ko N–Ia lines draw gara.</>,
    <><b>Voltage control (Ward-Leonard):</b> armature lai arko motor le chalaune separately excited generator bata feed garincha; generator field change garda V change huncha, ani zero dekhi base speed samma dubai direction ma smooth control milcha. Ekdam ramro tara mahango.</>,
    <><b>Tulana:</b> field control base bhanda mathi (constant power), armature/voltage control base bhanda tala (constant torque).</>,
  ],
  tip: 'Pahila N ∝ (V − IaRa)/φ lekha: ani har method “yo equation ko euta term change gara” jasto padhincha.',
});

// Syllabus 4.5: reversing the direction of rotation.
export const reversing = video('Rotation ko direction kasari ulto garne?', {
  tall: true,
  beats: [
    {
      say: 'Motor lai ulto ghumauna parcha bhane? Torque ko direction field ra armature current dubai le decide garcha, Fleming ko left-hand rule jastai.',
      voice: 'मोटरलाई उल्टो घुमाउन पर्छ भने? टर्कको डाइरेक्सन फिल्ड र आर्मेचर करेन्ट दुवैले डिसाइड गर्छ, फ्लेमिङको लेफ्ट ह्यान्ड रुल जस्तै।',
    },
    {
      say: 'Tesaile euta matra ulto gara: field current wa armature current. Rotation ulto huncha.',
      voice: 'त्यसैले एउटा मात्र उल्टो गर: फिल्ड करेन्ट वा आर्मेचर करेन्ट। रोटेसन उल्टो हुन्छ।',
    },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        q: 'Rotation ulto garna kati ota current ulto garnu parcha bhanyo?',
        voice: 'रोटेसन उल्टो गर्न कति ओटा करेन्ट उल्टो गर्नु पर्छ भन्यो?',
        options: ['Euta matra: field wa armature', 'Dubai'],
        answer: 0,
        why: 'Euta matra. Dubai ulto garyo bhane (jastai series motor ko supply swap) direction uhi rahancha.',
      },
    },
    {
      say: 'Practice ma armature ko connection ulto garincha. Field winding ko inductance thulo huncha, tesaile yesko current achanak ulto garda high voltage induce huncha, ani field open bhaye motor race garna sakcha.',
      voice: 'प्र्याक्टिसमा आर्मेचरको कनेक्सन उल्टो गरिन्छ। फिल्ड वाइन्डिङको इन्डक्टेन्स ठूलो हुन्छ, त्यसैले यसको करेन्ट अचानक उल्टो गर्दा हाई भोल्टेज इन्ड्युस हुन्छ, अनि फिल्ड ओपन भए मोटर रेस गर्न सक्छ।',
    },
    {
      say: 'Shunt, series, compound, sabai ma rule eutai: armature ra field madhye euta matra ulto.',
      voice: 'शन्ट, सिरिज, कम्पाउन्ड, सबैमा रुल एउटै: आर्मेचर र फिल्डमध्ये एउटा मात्र उल्टो।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Reversing the direction of rotation</> },
    { at: 0, kind: 'step', node: <>Torque direction ← field (φ) ko direction × armature current (Ia) ko direction</> },
    { at: 1, kind: 'eq', node: <>Euta matra ulto: φ <i>wa</i> Ia → rotation ulto</> },
    { at: 2, kind: 'note', node: <>Dubai ulto (supply swap) → torque uhi direction</> },
    { at: 3, kind: 'step', node: <>Practice: <span className="y">armature terminals</span> ulto gara (field inductive; open field → race)</> },
    { at: 4, kind: 'note', node: <>Compound motor: armature ulto gara, tesaile shunt ra series field ko relation (cumulative) uhi rahancha</> },
  ],
});
