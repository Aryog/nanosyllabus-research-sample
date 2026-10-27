import { Arrow, Axes, C, model, video } from './kit.jsx';

/* Syllabus 4.6 · Testing of DC machine: retardation test and Swinburne's test for shunt motor.
   The vault has no IOE past question on these tests, so the numbers here are worked examples. */

// Speed-decay sketch: N falls slower without extra load (t₁) than with it (t₂).
const X = (u) => 40 + u * 280;
const Y = (v) => 180 - v * 130;
const decay = (k) => Array.from({ length: 41 }, (_, i) => i / 40).map((u, i) => `${i ? 'L' : 'M'}${X(u)} ${Y(Math.exp(-k * u))}`).join('');

export const testIntro = video('Load nahali efficiency kasari thaha paune?', {
  viewBox: '0 0 360 210',
  beats: [
    {
      say: 'Thulo motor lai full load ma chalayera efficiency napnu mahango cha: tyati power ra tyati thulo load chahincha.',
      voice: 'ठूलो मोटरलाई फुल लोडमा चलाएर इफिसियन्सी नाप्नु महँगो छ: त्यति पावर र त्यति ठूलो लोड चाहिन्छ।',
    },
    {
      say: 'Trick yo ho: efficiency lai losses le decide garcha. Constant losses chai load nahali pani napna sakincha.',
      voice: 'ट्रिक यो हो: इफिसियन्सीलाई लसेसले डिसाइड गर्छ। कन्स्टेन्ट लसेस चाहिँ लोड नहाली पनि नाप्न सकिन्छ।',
    },
    {
      say: 'No load ma motor le liyeko sabai power losses mai jancha, kina bhane output zero cha. Yo idea Swinburne test ho.',
      voice: 'नो लोडमा मोटरले लिएको सबै पावर लसेसमै जान्छ, किनभने आउटपुट जिरो छ। यो आइडिया स्विनबर्न टेस्ट हो।',
    },
    {
      say: 'Arko trick: supply kaati deu ani machine kati chhito slow huncha hera. Ghumdai gareko energy losses le khaancha. Yo retardation test ho.',
      voice: 'अर्को ट्रिक: सप्लाई काटिदेऊ अनि मेसिन कति छिटो स्लो हुन्छ हेर। घुमिरहेको इनर्जी लसेसले खान्छ। यो रिटार्डेसन टेस्ट हो।',
    },
    {
      say: 'La socha.',
      voice: 'ल सोच।',
      ask: {
        tag: 'Dhyan check 👀',
        q: 'Supply kaatepachi slow hune machine ko energy kasle khaancha bhanyo?',
        voice: 'सप्लाई काटेपछि स्लो हुने मेसिनको इनर्जी कसले खान्छ भन्यो?',
        options: ['Supply le', 'Losses le', 'Field le'],
        answer: 1,
        why: 'Ghumne energy losses le khaancha. Losses dherai bhaye machine chhito slow huncha.',
      },
    },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0, 2)}>
        <rect x={40} y={40} width={110} height={56} rx={10} fill={C.board} stroke={C.chalk} strokeWidth={2} />
        <text x={95} y={64} textAnchor="middle" fontSize={13} fontWeight={700}>Input = VI₀</text>
        <text x={95} y={84} textAnchor="middle" fontSize={11} fill={C.dim}>no load</text>
        <Arrow x1={150} y1={68} x2={220} y2={68} color={C.red} />
        <text x={226} y={64} fontSize={13} fontWeight={700} fill={C.red} className={s.on(2)}>sabai = losses</text>
        <text x={226} y={84} fontSize={11} fill={C.dim} className={s.on(2)}>output = 0</text>
        <text x={40} y={130} fontSize={13} fill={C.dim} className={s.on(1)}>η = output / (output + losses)</text>
        <text x={40} y={152} fontSize={13} fill={C.yellow} fontWeight={700} className={s.on(1)}>→ losses thaha bhaye η thaha huncha</text>
      </g>
      <g className={s.on(3)}>
        <Axes x={40} y={180} w={290} h={150} xLabel="time" yLabel="N" />
        <path d={decay(1.2)} fill="none" stroke={C.blue} strokeWidth={3} />
        <path d={decay(3)} fill="none" stroke={C.red} strokeWidth={3} className={s.on(4)} />
        <text x={250} y={Y(Math.exp(-1.2 * 0.75)) - 8} fontSize={12} fill={C.blue}>kam losses</text>
        <text x={120} y={Y(Math.exp(-3 * 0.35)) + 22} fontSize={12} fill={C.red} className={s.on(4)}>dherai losses</text>
      </g>
    </>
  ),
});

export const swinburne = video('Derivation: Swinburne test bata constant losses ra η', {
  tall: true,
  beats: [
    {
      say: 'Swinburne test shunt machine ma garincha. Motor lai rated voltage ra rated speed ma no load chalau, ani input current I zero napa.',
      voice: 'स्विनबर्न टेस्ट शन्ट मेसिनमा गरिन्छ। मोटरलाई रेटेड भोल्टेज र रेटेड स्पिडमा नो लोड चलाऊ, अनि इनपुट करेन्ट आई जिरो नाप।',
    },
    {
      say: 'No-load input V I zero. Output zero, so yo sabai loss ho: constant losses plus sano armature copper loss.',
      voice: 'नो लोड इनपुट भी आई जिरो। आउटपुट जिरो, सो यो सबै लस हो: कन्स्टेन्ट लसेस प्लस सानो आर्मेचर कपर लस।',
    },
    {
      say: 'I sh equals V over R sh, ani I a zero equals I zero minus I sh. Tesaile W c equals V I zero minus I a zero squared R a.',
      voice: 'आई एस एच इक्वल्स भी ओभर आर एस एच, अनि आई ए जिरो इक्वल्स आई जिरो माइनस आई एस एच। त्यसैले डब्लु सी इक्वल्स भी आई जिरो माइनस आई ए जिरो स्क्वायर्ड आर ए।',
    },
    {
      say: 'Formula check.',
      voice: 'फर्मुला चेक।',
      ask: {
        tag: 'Dhyan check 👀',
        q: 'Wc nikalna V I₀ bata kun loss ghatauchau?',
        voice: 'डब्लु सी निकाल्न भी आई जिरोबाट कुन लस घटाउँछौं?',
        options: ['Iron loss', 'Ia₀²Ra (armature copper loss)', 'Field loss'],
        answer: 1,
        why: 'Wc = V·I₀ − Ia₀²Ra. Example: 220 V, 6 A, Rsh 110 Ω, Ra 0.5 Ω → Ish 2 A, Ia₀ 4 A, Wc = 1320 − 8 = 1312 W.',
      },
    },
    {
      say: 'Aba kunai pani load ma efficiency nikala. Motor ma: input V I L, I a equals I L minus I sh, losses W c plus I a squared R a.',
      voice: 'अब कुनै पनि लोडमा इफिसियन्सी निकाल। मोटरमा: इनपुट भी आई एल, आई ए इक्वल्स आई एल माइनस आई एस एच, लसेस डब्लु सी प्लस आई ए स्क्वायर्ड आर ए।',
    },
    {
      say: 'Example: 40 ampere load ma I a 38 ampere, copper loss 722 watt. Efficiency 8800 minus 1312 minus 722, over 8800: lagbhag 76.9 percent.',
      voice: 'उदाहरण: फोर्टी एम्पियर लोडमा आई ए थर्टी एट एम्पियर, कपर लस सेभेन हन्ड्रेड ट्वेन्टी टु वाट। इफिसियन्सी एट थाउजेन्ड एट हन्ड्रेड माइनस थर्टिन हन्ड्रेड ट्वेल्भ माइनस सेभेन हन्ड्रेड ट्वेन्टी टु, ओभर एट थाउजेन्ड एट हन्ड्रेड: लगभग सेभेन्टी सिक्स पोइन्ट नाइन पर्सेन्ट।',
    },
    {
      say: 'Fayda: sasto, thorai power chahincha. Kamjori: load ma iron loss ko change ignore garcha, ani series motor ma garna mildaina, no load ma race garcha.',
      voice: 'फाइदा: सस्तो, थोरै पावर चाहिन्छ। कमजोरी: लोडमा आइरन लसको चेन्ज इग्नोर गर्छ, अनि सिरिज मोटरमा गर्न मिल्दैन, नो लोडमा रेस गर्छ।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Swinburne’s test (no-load test, shunt machine)</> },
    { at: 0, kind: 'note', node: <>Rated V, rated N, no load · napne: I₀</> },
    { at: 1, kind: 'step', node: <>No-load input = V·I₀ = W<sub>c</sub> + I<sub>a0</sub>²R<sub>a</sub></> },
    { at: 2, kind: 'step', node: <>I<sub>sh</sub> = V/R<sub>sh</sub>, I<sub>a0</sub> = I₀ − I<sub>sh</sub></> },
    { at: 2, kind: 'eq', node: <>W<sub>c</sub> = V·I₀ − I<sub>a0</sub>²R<sub>a</sub></> },
    { at: 3, kind: 'step', node: <>Example: I<sub>sh</sub> = 2 A, I<sub>a0</sub> = 4 A, W<sub>c</sub> = 1320 − 8 = <span className="y">1312 W</span></> },
    { at: 4, kind: 'eq', node: <>Motor: η = [V·I<sub>L</sub> − W<sub>c</sub> − I<sub>a</sub>²R<sub>a</sub>] / V·I<sub>L</sub>,  I<sub>a</sub> = I<sub>L</sub> − I<sub>sh</sub></> },
    { at: 5, kind: 'step', node: <>I<sub>L</sub> = 40 A: I<sub>a</sub> = 38 A, I<sub>a</sub>²R<sub>a</sub> = 722 W, η = 6766/8800 ≈ <span className="y">76.9%</span></> },
    { at: 6, kind: 'step', node: <><span className="g">✓</span> sasto, thorai power · <span className="r">✗</span> load ma iron loss change ignore, series motor ma mildaina</> },
  ],
});

export const retardation = video('Derivation: retardation test bata rotational losses', {
  tall: true,
  beats: [
    {
      say: 'Retardation test le rotational losses, matlab iron plus mechanical, nikalcha. Machine lai rated speed bhanda ali mathi chalau.',
      voice: 'रिटार्डेसन टेस्टले रोटेसनल लसेस, मतलब आइरन प्लस मेकानिकल, निकाल्छ। मेसिनलाई रेटेड स्पिडभन्दा अलि माथि चलाऊ।',
    },
    {
      say: 'Ani armature ko supply kaata, tara field excited nai rakha. Machine bistarai slow huncha, ra tesko kinetic energy rotational losses le khaancha.',
      voice: 'अनि आर्मेचरको सप्लाई काट, तर फिल्ड एक्साइटेड नै राख। मेसिन बिस्तारै स्लो हुन्छ, र यसको काइनेटिक इनर्जी रोटेसनल लसेसले खान्छ।',
    },
    {
      say: 'Rotational loss W equals rate of loss of kinetic energy: J omega times d omega over d t. Rpm ma, W equals two pi over sixty, squared, times J N d N over d t.',
      voice: 'रोटेसनल लस डब्लु इक्वल्स रेट अफ लस अफ काइनेटिक इनर्जी: जे ओमेगा टाइम्स डी ओमेगा ओभर डी टी। आर पी एममा, डब्लु इक्वल्स टु पाइ ओभर सिक्स्टी, स्क्वायर्ड, टाइम्स जे एन डी एन ओभर डी टी।',
    },
    {
      say: 'Speed kasari napne? Armature ma induced voltage speed sanga proportional huncha, tesaile armature ma voltmeter jodera speed padhincha.',
      voice: 'स्पिड कसरी नाप्ने? आर्मेचरमा इन्ड्युस्ड भोल्टेज स्पिडसँग प्रोपोर्सनल हुन्छ, त्यसैले आर्मेचरमा भोल्टमिटर जोडेर स्पिड पढिन्छ।',
    },
    {
      say: 'J thaha chaina bhane duita run gara. Pahila khali, speed le d N ghatna t 1 time lagcha. Ani armature ma thaha bhaeko load W dash jodera, t 2.',
      voice: 'जे थाहा छैन भने दुईटा रन गर। पहिला खाली, स्पिडले डी एन घट्न टी वान टाइम लाग्छ। अनि आर्मेचरमा थाहा भएको लोड डब्लु ड्यास जोडेर, टी टु।',
    },
    {
      say: 'Sochau.',
      voice: 'सोचौं।',
      ask: {
        tag: 'Dhyan check 👀',
        q: 'Dosro run ma armature ma k jodincha bhanyo?',
        voice: 'दोस्रो रनमा आर्मेचरमा के जोडिन्छ भन्यो?',
        options: ['Supply', 'Thaha bhaeko load W′', 'Extra field'],
        answer: 1,
        why: 'Known load W′ jodera same dN ko time t₂ napincha. Energy W + W′ le khaancha, tesaile t₂ < t₁.',
      },
    },
    {
      say: 'Loss time sanga ulto proportional: W over W plus W dash equals t 2 over t 1. Tesaile W equals W dash times t 2 over t 1 minus t 2.',
      voice: 'लस टाइमसँग उल्टो प्रोपोर्सनल: डब्लु ओभर डब्लु प्लस डब्लु ड्यास इक्वल्स टी टु ओभर टी वान। त्यसैले डब्लु इक्वल्स डब्लु ड्यास टाइम्स टी टु ओभर टी वान माइनस टी टु।',
    },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Retardation (running-down) test</> },
    { at: 0, kind: 'note', node: <>Rated speed bhanda ali mathi chalau</> },
    { at: 1, kind: 'step', node: <>Armature supply OFF, field ON → machine slow huncha</> },
    { at: 2, kind: 'step', node: <>W = d/dt(½Jω²) = Jω·dω/dt</> },
    { at: 2, kind: 'eq', node: <>W = (2π/60)² · J · N · dN/dt</> },
    { at: 3, kind: 'note', node: <>Speed ∝ armature voltage → voltmeter le N padhincha</> },
    { at: 4, kind: 'step', node: <>Run 1: khali, same dN ma time t₁ · Run 2: extra load W′, time t₂</> },
    { at: 6, kind: 'step', node: <>Same energy: W·t₁ = (W + W′)·t₂</> },
    { at: 6, kind: 'eq', node: <>W = W′ · t₂ / (t₁ − t₂)</> },
  ],
});

// Big picture for 4.6. The vault has no IOE question on these tests, so this is
// an exam-style question, shown without an IOE tag.
export const testingModel = {
  ...model({
    q: 'Explain Swinburne’s test and the retardation test for finding the losses of a DC machine. State the merits and demerits of Swinburne’s test.',
    papers: [],
    marks: 'Exam-style',
    points: [
      <><b>Swinburne’s test:</b> run the shunt machine as a motor at no load, rated voltage and rated speed; measure I₀. No-load input V·I₀ = constant losses + I<sub>a0</sub>²R<sub>a</sub>, so W<sub>c</sub> = V·I₀ − I<sub>a0</sub>²R<sub>a</sub>, with I<sub>a0</sub> = I₀ − I<sub>sh</sub>.</>,
      <><b>Efficiency at any load:</b> motor η = (V·I<sub>L</sub> − W<sub>c</sub> − I<sub>a</sub>²R<sub>a</sub>) / V·I<sub>L</sub>, I<sub>a</sub> = I<sub>L</sub> − I<sub>sh</sub>; generator η = output / (output + W<sub>c</sub> + I<sub>a</sub>²R<sub>a</sub>), I<sub>a</sub> = I<sub>L</sub> + I<sub>sh</sub>.</>,
      <><b>Merits:</b> economical (little power needed), efficiency can be predetermined at any load.</>,
      <><b>Demerits:</b> ignores the change in iron loss under load (armature reaction); not applicable to series machines (they race at no load); temperature rise and commutation at full load are not tested.</>,
      <><b>Retardation test:</b> run slightly above rated speed, switch off the armature supply with the field still excited; the stored kinetic energy is used up by rotational losses: W = (2π/60)²·J·N·dN/dt. Speed is read from the armature voltage.</>,
      <><b>Without J:</b> repeat with a known extra load W′ on the armature; with t₁, t₂ the times for the same speed fall, W·t₁ = (W + W′)·t₂, so W = W′·t₂/(t₁ − t₂).</>,
    ],
    tip: 'Swinburne ko circuit (ammeter line ma, shunt field ma ammeter ra rheostat, armature ma voltmeter) draw gara. Exam ma English mai lekha.',
  }),
  ioe: false,
};
