import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { retardFigure, swinburneFigure } from './figs.jsx';

/*
  4.6 Testing: Swinburne's test and the retardation test. Tutor (default) and
  Lecturer over the book figures (Fig. 13 Swinburne circuit, Fig. 14 speed–
  time curves). vault/ holds no past question on these tests (topics.json
  gap), so Big picture is an exam-style answer with no paper claimed.
  Recomputed: 220 V, I0 = 5 A, Ish = 1 A, Ra = 0.5 Ω → Wc = 1100 − 8 = 1092 W;
  IL = 40 A → Ia = 39 A, Cu = 760.5 W, η = 6947.5/8800 = 78.9 %.
  Retardation: W′ = 1000 W, t1 = 30 s, t2 = 20 s → W = 1000 × 20/10 = 2000 W.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
// swinburneFigure: 0 circuit · 1 meters · 2 constant losses.
// retardFigure: 0 axes · 1 slowing alone · 2 tangent dN/dt · 3 with W′.

export const opener46 = duo('4.6 ma k padhne?', {
  draw: figAt(swinburneFigure, { 0: 0, 1: 2 }),
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Unit 4.6: testing, arthat Swinburne’s test ra retardation test.',
      voice: 'युनिट फोर पोइन्ट सिक्स — टेस्टिङ, अर्थात स्विनबर्न्स टेस्ट र रिटार्डेसन टेस्ट।',
      lines: [['h', <>4.6</>], ['step', <>Testing: Swinburne’s test ra retardation test</>]],
    },
    {
      say: 'Thulo motor lai pura load lagayera efficiency napnu mahango ra garo huncha. Tesaile load bina losses napne test chahincha.',
      voice: 'ठूलो मोटरलाई पूरा लोड लगाएर इफिसियन्सी नाप्नु महँगो र गाह्रो हुन्छ। त्यसैले, लोड बिना लसेस नाप्ने टेस्ट चाहिन्छ।',
      lines: [['step', <>1. Why indirect tests: losses without full load</>]],
    },
    {
      say: 'Swinburne’s test le constant losses napcha. Retardation test le motor rokidai jada rotational losses napcha.',
      voice: 'स्विनबर्न्स टेस्टले कन्स्टेन्ट लसेस नाप्छ। रिटार्डेसन टेस्टले, मोटर रोकिँदै जाँदा, रोटेसनल लसेस नाप्छ।',
      lines: [['step', <>2. Swinburne’s test · 3. Retardation test</>]],
    },
    {
      say: 'Antim ma Swinburne’s test ko exam-style model answer. Yo test ko past question vault ma chaina, tesaile kunai paper ko naam lindainau.',
      voice: 'अन्तिममा, स्विनबर्न्स टेस्टको एक्जाम स्टाइल मोडल आन्सर। यो टेस्टको पास्ट क्वेस्चन भल्टमा छैन, त्यसैले कुनै पेपरको नाम लिँदैनौं।',
      lines: [['hook', <>Big picture: exam-style answer on Swinburne’s test (no past paper in the vault)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.6: testing of DC machines, Swinburne’s test and retardation test.',
      voice: 'युनिट फोर पोइन्ट सिक्स — टेस्टिङ अफ डीसी मेसिन्स, स्विनबर्न्स टेस्ट एन्ड रिटार्डेसन टेस्ट।',
      lines: [['h', <>Unit 4.6</>], ['step', <>Testing of DC machines</>]],
    },
    {
      say: 'Pahilo: indirect testing ko awashyakta.',
      voice: 'पहिलो — इन्डाइरेक्ट टेस्टिङको आवश्यकता।',
      lines: [['step', <><H>1. Need of indirect tests</H>losses without loading the machine</>]],
    },
    {
      say: 'Dosro: Swinburne’s test ra retardation test ko method ra calculation.',
      voice: 'दोस्रो — स्विनबर्न्स टेस्ट र रिटार्डेसन टेस्टको मेथड र क्याल्कुलेसन।',
      lines: [['step', <><H>2. Tests</H>Swinburne’s (no-load) test, retardation test</>]],
    },
    {
      say: 'Big picture ma Swinburne’s test ko exam-style answer.',
      voice: 'बिग पिक्चरमा, स्विनबर्न्स टेस्टको एक्जाम स्टाइल आन्सर।',
      lines: [['hook', <>Exam-style answer: Swinburne’s test</>]],
    },
  ],
});

/* ── Terms: why indirect testing ─────────────────────────────────────── */
export const why46 = duo('Testing kina: load bina losses', {
  draw: figAt(swinburneFigure, { 0: 0 }),
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Efficiency napne seedha tarika: motor lai pura load lagaune, ani input ra output napne. Yaslai direct wa brake test bhanincha.',
      voice: 'इफिसियन्सी नाप्ने सिधा तरिका — मोटरलाई पूरा लोड लगाउने, अनि इनपुट र आउटपुट नाप्ने। यसलाई डाइरेक्ट वा ब्रेक टेस्ट भनिन्छ।',
      lines: [['h', <>Why indirect tests</>], ['step', <>Direct (brake) test: full load, measure input and output</>]],
    },
    {
      say: 'Thulo motor ma yo garo cha: pura load ko power khera jaancha, ra brake jasto load banauna nai garo.',
      voice: 'ठूलो मोटरमा यो गाह्रो छ — पूरा लोडको पावर खेर जान्छ, र ब्रेक जस्तो लोड बनाउन नै गाह्रो।',
      lines: [['trap', <>Large machines: full-load power wasted, load hard to arrange</>]],
    },
    {
      say: 'Tesaile indirect test garincha: losses matra napera, kunai pani load ko efficiency hisab garincha.',
      voice: 'त्यसैले इन्डाइरेक्ट टेस्ट गरिन्छ — लसेस मात्र नापेर, कुनै पनि लोडको इफिसियन्सी हिसाब गरिन्छ।',
      lines: [['step', <>Indirect: measure the losses, then calculate η at any load</>]],
      ask: {
        q: 'Indirect test ma ke napincha?',
        voice: 'इन्डाइरेक्ट टेस्टमा के नापिन्छ?',
        options: ['Losses', 'Full-load output', 'Brake ko torque'],
        answer: 0,
        why: 'Losses thaha bhaye η = (input − losses)/input jun sukai load ma nikalna milcha.',
      },
    },
    {
      say: 'Duita mukhya indirect test: Swinburne’s test, jasle constant losses napcha, ra retardation test, jasle rotational losses napcha.',
      voice: 'दुईटा मुख्य इन्डाइरेक्ट टेस्ट — स्विनबर्न्स टेस्ट, जसले कन्स्टेन्ट लसेस नाप्छ, र रिटार्डेसन टेस्ट, जसले रोटेसनल लसेस नाप्छ।',
      lines: [['idea', <>Swinburne’s test: constant losses · retardation test: rotational losses</>]],
    },
  ],
  lecturer: [
    {
      say: 'Direct method: motor lai full load ma chalayera input ra output dubai napincha.',
      voice: 'डाइरेक्ट मेथड — मोटरलाई फुल लोडमा चलाएर, इनपुट र आउटपुट दुवै नापिन्छ।',
      lines: [['h', <>Testing of DC machines</>], ['step', <><Pts items={[<>Direct (brake) test: input and output measured at full load</>]} /></>]],
    },
    {
      say: 'Limitation: large machines ma power wastage ra suitable load ko abhav.',
      voice: 'लिमिटेसन — लार्ज मेसिन्समा पावर वेस्टेज, र सुटेबल लोडको अभाव।',
      lines: [['step', <><Pts items={[<>Not suitable for large machines: power wasted, load difficult to provide</>]} /></>]],
    },
    {
      say: 'Indirect methods ma losses napincha, ra efficiency calculate garincha.',
      voice: 'इन्डाइरेक्ट मेथड्समा लसेस नापिन्छ, र इफिसियन्सी क्याल्कुलेट गरिन्छ।',
      lines: [['step', <><Pts items={[<>Indirect methods: losses are measured, efficiency is calculated</>]} /></>]],
      ask: {
        q: 'Thulo DC machine ko efficiency kun method le nikalincha?',
        voice: 'ठूलो डीसी मेसिनको इफिसियन्सी कुन मेथडले निकालिन्छ?',
        options: ['Indirect method', 'Direct brake test', 'Kunai pani hoina'],
        answer: 0,
        why: 'Thulo machine ma direct test ma power khera jaancha; indirect method le losses matra napcha.',
      },
    },
    {
      say: 'Examples: Swinburne’s test for constant losses, ra retardation test for rotational losses.',
      voice: 'एक्जाम्पल्स — स्विनबर्न्स टेस्ट फर कन्स्टेन्ट लसेस, र रिटार्डेसन टेस्ट फर रोटेसनल लसेस।',
      lines: [['step', <><Pts items={[<>Swinburne’s test: constant losses</>, <>Retardation test: rotational losses</>]} /></>]],
    },
  ],
});

/* ── Terms: Swinburne's test ─────────────────────────────────────────── */
export const swin46 = duo('Swinburne’s test', {
  draw: swinburneFigure,
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'Swinburne’s test ma shunt motor lai rated voltage ma, load bina, rated speed ma chalaincha.',
      voice: 'स्विनबर्न्स टेस्टमा, शन्ट मोटरलाई रेटेड भोल्टेजमा, लोड बिना, रेटेड स्पिडमा चलाइन्छ।',
      lines: [['h', <>Swinburne’s test</>], ['step', <>Shunt motor run light (no load) at rated V and speed</>]],
    },
    {
      say: 'Ammeter le no-load current I zero ra field current I sh napcha. Voltmeter le V.',
      voice: 'एमिटरले नो लोड करेन्ट आई जिरो, र फिल्ड करेन्ट आई एस एच नाप्छ। भोल्टमिटरले भी।',
      lines: [['step', <>Measure V, I<sub>0</sub> and I<sub>sh</sub></>]],
    },
    {
      say: 'Load nabhayeko le input V I zero sabai loss mai jaancha. Yasbata no-load armature copper loss ghataye constant losses W c aaucha.',
      voice: 'लोड नभएकोले, इनपुट भी आई जिरो सबै लसमै जान्छ। यसबाट नो लोड आर्मेचर कपर लस घटाए, कन्स्टेन्ट लसेस डब्लु सी आउँछ।',
      lines: [['eq', tex(String.raw`W_c = VI_0 - (I_0 - I_{sh})^2R_a`)]],
      ask: {
        q: 'V 220 V, I zero 5 A, I sh 1 A, R a 0.5 ohm. W c kati?',
        voice: 'भी टु ट्वेन्टी भोल्ट, आई जिरो फाइभ एम्पियर, आई एस एच वान एम्पियर, आर ए जिरो पोइन्ट फाइभ ओम। डब्लु सी कति?',
        options: ['1092 W', '1100 W', '1000 W'],
        answer: 0,
        why: 'W c = 220 × 5 − 4² × 0.5 = 1100 − 8 = 1092 W.',
      },
    },
    {
      say: 'Thulo phaida: dherai thorai power ma test huncha. Tara load ma temperature ra flux ko farak dekhaudaina, ra series motor ma garna mildaina.',
      voice: 'ठूलो फाइदा — धेरै थोरै पावरमा टेस्ट हुन्छ। तर लोडमा टेम्परेचर र फ्लक्सको फरक देखाउँदैन, र सिरिज मोटरमा गर्न मिल्दैन।',
      lines: [['trap', <>Cheap test · but load effects ignored; not for series motors (no-load speed unsafe)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Principle: shunt machine lai motor ko rup ma no load ma rated voltage ra speed ma chalaincha.',
      voice: 'प्रिन्सिपल — शन्ट मेसिनलाई मोटरको रूपमा, नो लोडमा, रेटेड भोल्टेज र स्पिडमा चलाइन्छ।',
      lines: [['h', <>Swinburne’s test (Fig. 13)</>], ['step', <><Pts items={[<>The machine runs as a motor on no load at rated voltage and speed</>]} /></>]],
    },
    {
      say: 'No-load input current I zero, shunt field current I sh, ra V napincha.',
      voice: 'नो लोड इनपुट करेन्ट आई जिरो, शन्ट फिल्ड करेन्ट आई एस एच, र भी नापिन्छ।',
      lines: [['step', <><Pts items={[<>Readings: V, I<sub>0</sub>, I<sub>sh</sub>; armature current <K>{String.raw`I_{a0} = I_0 - I_{sh}`}</K></>]} /></>]],
    },
    {
      say: 'No-load input le constant losses ra thorai armature copper loss dincha. Tesaile W c equals V I zero minus I a zero square R a.',
      voice: 'नो लोड इनपुटले कन्स्टेन्ट लसेस, र थोरै आर्मेचर कपर लस दिन्छ। त्यसैले डब्लु सी इक्वल्स, भी आई जिरो माइनस आई ए जिरो स्क्वायर आर ए।',
      lines: [['step', <><K>{String.raw`W_c = VI_0 - (I_0 - I_{sh})^2R_a \qquad \cdots(1)`}</K></>]],
      ask: {
        q: 'Swinburne’s test le kun losses dincha?',
        voice: 'स्विनबर्न्स टेस्टले कुन लसेस दिन्छ?',
        options: ['Constant losses', 'Full-load copper loss', 'Brush contact loss matra'],
        answer: 0,
        why: 'No load ma input ko lagbhag sabai iron, mechanical ra shunt Cu, arthat constant losses.',
      },
    },
    {
      say: 'Advantages: economical ra convenient. Disadvantages: load ma flux ra temperature ko change ignore huncha, ra series motor ma applicable hudaina.',
      voice: 'एडभान्टेजेस — इकोनोमिकल र कन्भिनियन्ट। डिसएडभान्टेजेस — लोडमा फ्लक्स र टेम्परेचरको चेन्ज इग्नोर हुन्छ, र सिरिज मोटरमा एप्लिकेबल हुँदैन।',
      lines: [['step', <><Pts items={[<>Advantages: economical, convenient</>, <>Disadvantages: changes under load ignored; not for series motors</>]} /></>]],
    },
  ],
});

/* ── Terms: retardation test ─────────────────────────────────────────── */
export const retard46 = duo('Retardation test', {
  draw: retardFigure,
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Retardation test ma motor lai rated speed bhanda alikati mathi chalayera supply kaatincha. Ani motor bistarai rokincha.',
      voice: 'रिटार्डेसन टेस्टमा, मोटरलाई रेटेड स्पिडभन्दा अलिकति माथि चलाएर सप्लाई काटिन्छ। अनि मोटर बिस्तारै रोकिन्छ।',
      lines: [['h', <>Retardation (running-down) test</>], ['step', <>Run slightly above rated speed, then switch the armature off</>]],
    },
    {
      say: 'Supply nabhaye pani armature ghumirahancha, kinaki tesma kinetic energy cha. Yo energy friction, windage ra iron loss ma kharcha hunchha.',
      voice: 'सप्लाई नभए पनि आर्मेचर घुमिरहन्छ, किनकि त्यसमा काइनेटिक इनर्जी छ। यो इनर्जी, फ्रिक्सन, विन्डेज र आइरन लसमा खर्च हुन्छ।',
      lines: [['step', <>Stored kinetic energy is spent on rotational losses → speed falls</>]],
    },
    {
      say: 'Speed ghatne dar d N by d t, curve ko slope bata napincha. Loss jati badhi, curve utti chhito jharcha.',
      voice: 'स्पिड घट्ने दर — डी एन बाई डी टी, कर्भको स्लोपबाट नापिन्छ। लस जति बढी, कर्भ उत्ति छिटो झर्छ।',
      lines: [['step', <>Slope dN/dt of the N–t curve gives the rate of energy loss</>]],
    },
    {
      say: 'Moment of inertia thaha nabhaye, euta known extra load W prime jodera feri test garincha. Yasari dui time bata rotational loss nikalincha.',
      voice: 'मोमेन्ट अफ इनर्सिया थाहा नभए, एउटा नोन एक्स्ट्रा लोड डब्लु प्राइम जोडेर फेरि टेस्ट गरिन्छ। यसरी, दुई टाइमबाट रोटेसनल लस निकालिन्छ।',
      lines: [['idea', <>Repeat with a known extra load W′ → second, faster curve</>]],
      ask: {
        q: 'Extra load W prime jodda speed ghatne dar ma k huncha?',
        voice: 'एक्स्ट्रा लोड डब्लु प्राइम जोड्दा, स्पिड घट्ने दरमा के हुन्छ?',
        options: ['Badhcha (chhito rokincha)', 'Ghatcha', 'Utti nai'],
        answer: 0,
        why: 'Energy chhito kharcha huncha, tesaile dN/dt thulo, motor chhito rokincha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Method: machine lai rated speed bhanda mathi chalayera armature supply disconnect garincha, field excited rahancha.',
      voice: 'मेथड — मेसिनलाई रेटेड स्पिडभन्दा माथि चलाएर, आर्मेचर सप्लाई डिस्कनेक्ट गरिन्छ, फिल्ड एक्साइटेड रहन्छ।',
      lines: [['h', <>Retardation test (Fig. 14)</>], ['step', <><Pts items={[<>Run above rated speed; disconnect the armature, keep the field excited</>]} /></>]],
    },
    {
      say: 'Stored kinetic energy rotational losses ma kharcha bhayera speed ghatcha.',
      voice: 'स्टोर्ड काइनेटिक इनर्जी, रोटेसनल लसेसमा खर्च भएर स्पिड घट्छ।',
      lines: [['step', <><Pts items={[<>Kinetic energy is used up in rotational (iron + mechanical) losses</>]} /></>]],
    },
    {
      say: 'N–t curve bata rated speed ma slope d N by d t napincha.',
      voice: 'एन टी कर्भबाट, रेटेड स्पिडमा स्लोप डी एन बाई डी टी नापिन्छ।',
      lines: [['step', <><Pts items={[<>Slope dN/dt is read at rated speed from the N–t curve</>]} /></>]],
    },
    {
      say: 'Moment of inertia I aagyat bhaye, known load W prime sanga test repeat garincha.',
      voice: 'मोमेन्ट अफ इनर्सिया आई अज्ञात भए, नोन लोड डब्लु प्राइमसँग टेस्ट रिपिट गरिन्छ।',
      lines: [['step', <><Pts items={[<>If I is unknown, the test is repeated with a known extra load W′</>]} /></>]],
      ask: {
        q: 'Retardation test le kun losses napcha?',
        voice: 'रिटार्डेसन टेस्टले कुन लसेस नाप्छ?',
        options: ['Rotational (iron + mechanical) losses', 'Armature copper loss', 'Shunt field loss'],
        answer: 0,
        why: 'Armature ma current nabaye copper loss hudaina; speed kinetic energy bata matra ghatcha.',
      },
    },
  ],
});

/* ── Derivation: efficiency from Swinburne's test ────────────────────── */
export const swinEff46 = duo('Derivation: Swinburne bata efficiency', {
  draw: figAt(swinburneFigure, { 0: 0, 1: 0, 2: 1 }),
  viewBox: '0 0 360 220',
  tutor: [
    {
      say: 'No-load test bata W c thaha bhayo: W c equals V I zero minus I zero minus I sh, square times R a.',
      voice: 'नो लोड टेस्टबाट डब्लु सी थाहा भयो — डब्लु सी इक्वल्स, भी आई जिरो माइनस, आई जिरो माइनस आई एस एच स्क्वायर, टाइम्स आर ए।',
      lines: [['h', <>Efficiency from Swinburne’s test</>], ['step', tex(String.raw`W_c = VI_0 - (I_0 - I_{sh})^2R_a`)]],
    },
    {
      say: 'Aba motor le jun sukai load ma I L line current lincha. Armature current I a equals I L minus I sh, ra copper loss I a square R a.',
      voice: 'अब मोटरले जुन सुकै लोडमा आई एल लाइन करेन्ट लिन्छ। आर्मेचर करेन्ट — आई ए इक्वल्स आई एल माइनस आई एस एच, र कपर लस — आई ए स्क्वायर आर ए।',
      lines: [['step', tex(String.raw`\begin{aligned} I_a &= I_L - I_{sh} \\ \text{Cu loss} &= I_a^2R_a \end{aligned}`)]],
    },
    {
      say: 'Input V I L, losses W c plus I a square R a. Efficiency input minus losses, over input.',
      voice: 'इनपुट भी आई एल, लसेस — डब्लु सी प्लस आई ए स्क्वायर आर ए। इफिसियन्सी — इनपुट माइनस लसेस, ओभर इनपुट।',
      lines: [['eq', tex(String.raw`\eta = \dfrac{VI_L - W_c - I_a^2R_a}{VI_L}`)]],
    },
    {
      say: 'Example: 220 volt, I zero 5, I sh 1, R a 0.5: W c 1092 watt. I L 40 ampere ma I a 39, copper loss 760.5 watt, ra efficiency 78.9 percent.',
      voice: 'उदाहरण — टु ट्वेन्टी भोल्ट, आई जिरो फाइभ, आई एस एच वान, आर ए जिरो पोइन्ट फाइभ — डब्लु सी टेन नाइन्टी टु वाट। आई एल फोर्टी एम्पियरमा आई ए थर्टी नाइन, कपर लस सेभेन सिक्स्टी पोइन्ट फाइभ वाट, र इफिसियन्सी सेभेन्टी एट पोइन्ट नाइन पर्सेन्ट।',
      lines: [['step', tex(String.raw`\begin{aligned} \eta &= \dfrac{8800 - 1092 - 760.5}{8800} \\ &= 78.9\,\% \end{aligned}`)]],
      ask: {
        q: 'Yo motor ko input I L 40 A ma kati?',
        voice: 'यो मोटरको इनपुट, आई एल फोर्टी एम्पियरमा कति?',
        options: ['8800 W', '8580 W', '1092 W'],
        answer: 0,
        why: 'Input = V I L = 220 × 40 = 8800 W.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Constant losses from the no-load test: W c equals V I zero minus I a zero square R a.',
      voice: 'कन्स्टेन्ट लसेस फ्रम द नो लोड टेस्ट — डब्लु सी इक्वल्स, भी आई जिरो माइनस, आई ए जिरो स्क्वायर आर ए।',
      lines: [['h', <>Efficiency from Swinburne’s test</>], ['step', <><K>{String.raw`W_c = VI_0 - (I_0 - I_{sh})^2R_a \qquad \cdots(1)`}</K></>]],
    },
    {
      say: 'At any load current I L: I a equals I L minus I sh, ra armature copper loss I a square R a.',
      voice: 'एट एनी लोड करेन्ट आई एल — आई ए इक्वल्स आई एल माइनस आई एस एच, र आर्मेचर कपर लस, आई ए स्क्वायर आर ए।',
      lines: [['step', <><K>{String.raw`\begin{aligned} I_a &= I_L - I_{sh} && \cdots(2) \\ \text{Cu loss} &= I_a^2R_a && \cdots(3) \end{aligned}`}</K></>]],
    },
    {
      say: 'Motor efficiency eta equals V I L minus W c minus I a square R a, over V I L.',
      voice: 'मोटर इफिसियन्सी — इटा इक्वल्स, भी आई एल माइनस डब्लु सी माइनस आई ए स्क्वायर आर ए, ओभर भी आई एल।',
      lines: [['step', <><K>{String.raw`\boxed{\eta_{motor} = \dfrac{VI_L - W_c - I_a^2R_a}{VI_L}} \qquad \cdots(4)`}</K></>]],
    },
    {
      say: 'Example: W c 1092 watt; I L 40 ampere ma I a 39 ampere, copper loss 760.5 watt, efficiency 78.9 percent.',
      voice: 'उदाहरण — डब्लु सी टेन नाइन्टी टु वाट; आई एल फोर्टी एम्पियरमा आई ए थर्टी नाइन एम्पियर, कपर लस सेभेन सिक्स्टी पोइन्ट फाइभ वाट, इफिसियन्सी सेभेन्टी एट पोइन्ट नाइन पर्सेन्ट।',
      lines: [['step', <><K>{String.raw`\begin{aligned} \eta &= \dfrac{8800 - 1092 - 760.5}{8800} && \\ &= 78.9\,\% && \end{aligned}`}</K></>]],
      ask: {
        q: 'Swinburne method ma load ma armature current kasari nikalincha?',
        voice: 'स्विनबर्न मेथडमा, लोडमा आर्मेचर करेन्ट कसरी निकालिन्छ?',
        options: ['Ia = IL − Ish', 'Ia = IL + Ish', 'Ia = I0'],
        answer: 0,
        why: 'Shunt motor ma line current armature ra field ma bandincha.',
      },
    },
  ],
});

/* ── Derivation: the retardation test formula ────────────────────────── */
export const retardDer46 = duo('Derivation: retardation test ko formula', {
  draw: retardFigure,
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Ghumne armature ko kinetic energy half I omega square. Rotational loss W yahi energy ghatne dar ho.',
      voice: 'घुम्ने आर्मेचरको काइनेटिक इनर्जी — हाफ आई ओमेगा स्क्वायर। रोटेसनल लस डब्लु, यही इनर्जी घट्ने दर हो।',
      lines: [['h', <>Retardation test formula</>], ['step', tex(String.raw`\begin{aligned} KE &= \tfrac{1}{2} I\omega^2 \\ W &= \dfrac{d}{dt}\left(\tfrac{1}{2}I\omega^2\right) \end{aligned}`)]],
    },
    {
      say: 'Differentiate garda W equals I omega d omega by d t. Omega equals two pi N over sixty rakhda, W equals two pi over sixty square, I N d N by d t.',
      voice: 'डिफरेन्सिएट गर्दा — डब्लु इक्वल्स आई ओमेगा डी ओमेगा बाई डी टी। ओमेगा इक्वल्स टु पाइ एन ओभर सिक्स्टी राख्दा — डब्लु इक्वल्स, टु पाइ ओभर सिक्स्टी स्क्वायर, आई एन डी एन बाई डी टी।',
      lines: [['eq', tex(String.raw`\begin{aligned} W &= I\omega\,\dfrac{d\omega}{dt} \\ &= \left(\dfrac{2\pi}{60}\right)^2 I\,N\,\dfrac{dN}{dt} \end{aligned}`)]],
    },
    {
      say: 'I thaha chaina bhane known load W prime jodera dosro test. Eutai speed range jharna pahilo ma t ek ra dosro ma t dui second lagcha.',
      voice: 'आई थाहा छैन भने, नोन लोड डब्लु प्राइम जोडेर दोस्रो टेस्ट। एउटै स्पिड रेन्ज झर्न, पहिलोमा टी वान, र दोस्रोमा टी टु सेकेन्ड लाग्छ।',
      lines: [['step', tex(String.raw`\dfrac{W}{W + W'} = \dfrac{t_2}{t_1}`)]],
    },
    {
      say: 'Milauda W equals W prime times t dui, over t ek minus t dui. Example: W prime 1000 watt, t ek 30, t dui 20 second bhaye W equals 2000 watt.',
      voice: 'मिलाउँदा — डब्लु इक्वल्स डब्लु प्राइम टाइम्स टी टु, ओभर टी वान माइनस टी टु। उदाहरण — डब्लु प्राइम थाउजेन्ड वाट, टी वान थर्टी, टी टु ट्वेन्टी सेकेन्ड भए, डब्लु इक्वल्स टु थाउजेन्ड वाट।',
      lines: [['eq', tex(String.raw`\begin{aligned} W &= W' \times \dfrac{t_2}{t_1 - t_2} \\ &= 1000 \times \dfrac{20}{10} \\ &= 2000\ \text{W} \end{aligned}`)]],
      ask: {
        q: 'W prime 500 W, t ek 25 s, t dui 20 s bhaye W kati?',
        voice: 'डब्लु प्राइम पाँच सय वाट, टी वान ट्वेन्टी फाइभ सेकेन्ड, टी टु ट्वेन्टी सेकेन्ड भए, डब्लु कति?',
        options: ['2000 W', '400 W', '625 W'],
        answer: 0,
        why: 'W = 500 × 20/(25 − 20) = 500 × 4 = 2000 W.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Rotational loss W equals rate of loss of kinetic energy, half I omega square.',
      voice: 'रोटेसनल लस डब्लु इक्वल्स, रेट अफ लस अफ काइनेटिक इनर्जी, हाफ आई ओमेगा स्क्वायर।',
      lines: [['h', <>Retardation test: rotational losses</>], ['step', <><K>{String.raw`\begin{aligned} W &= \dfrac{d}{dt}\left(\tfrac{1}{2}I\omega^2\right) && \\ &= I\omega\,\dfrac{d\omega}{dt} && \cdots(1) \end{aligned}`}</K></>]],
    },
    {
      say: 'Omega equals two pi N over sixty rakhda, W equals two pi over sixty square, I N d N by d t.',
      voice: 'ओमेगा इक्वल्स टु पाइ एन ओभर सिक्स्टी राख्दा — डब्लु इक्वल्स, टु पाइ ओभर सिक्स्टी स्क्वायर, आई एन डी एन बाई डी टी।',
      lines: [['step', <><K>{String.raw`W = \left(\dfrac{2\pi}{60}\right)^2 I\,N\,\dfrac{dN}{dt} \qquad \cdots(2)`}</K></>]],
    },
    {
      say: 'With a known extra load W prime, W over W plus W prime equals t dui over t ek.',
      voice: 'विद अ नोन एक्स्ट्रा लोड डब्लु प्राइम — डब्लु ओभर डब्लु प्लस डब्लु प्राइम, इक्वल्स टी टु ओभर टी वान।',
      lines: [['step', <><K>{String.raw`\dfrac{W}{W + W'} = \dfrac{t_2}{t_1} \qquad \cdots(3)`}</K></>]],
    },
    {
      say: 'Hence W equals W prime times t dui over t ek minus t dui. Example ma 2000 watt.',
      voice: 'हेन्स डब्लु इक्वल्स, डब्लु प्राइम टाइम्स टी टु, ओभर टी वान माइनस टी टु। उदाहरणमा टु थाउजेन्ड वाट।',
      lines: [['step', <><K>{String.raw`\boxed{W = W'\,\dfrac{t_2}{t_1 - t_2}} \qquad \cdots(4)`}</K><Pts items={[<>e.g. W′ = 1000 W, t<sub>1</sub> = 30 s, t<sub>2</sub> = 20 s → W = 2000 W</>]} /></>]],
      ask: {
        q: 'Retardation test ma t dui kina t ek bhanda sano huncha?',
        voice: 'रिटार्डेसन टेस्टमा, टी टु किन टी वानभन्दा सानो हुन्छ?',
        options: ['Extra load le energy chhito kharcha garcha', 'I badhcha', 'Field kamjor huncha'],
        answer: 0,
        why: 'W′ thapda total loss W + W′; energy chhito sakincha, speed chhito jharcha.',
      },
    },
  ],
});

/* ── Big picture: exam-style answer (no past paper in the vault) ────── */
export const swinAnswer46 = answer('Model answer: Swinburne’s test', {
  draw: swinburneFigure,
  viewBox: '0 0 360 220',
  papers: [],
  marks: '[6]',
  q: 'Describe Swinburne’s test for a DC shunt machine. How is the efficiency found from it? State its advantages and disadvantages.',
  read: {
    say: 'Exam-style question: describe Swinburne’s test for a DC shunt machine, efficiency kasari nikalne, ra advantages ra disadvantages.',
    voice: 'एक्जाम स्टाइल क्वेस्चन — डिस्क्राइब स्विनबर्न्स टेस्ट फर अ डीसी शन्ट मेसिन, इफिसियन्सी कसरी निकाल्ने, र एडभान्टेजेस र डिसएडभान्टेजेस।',
  },
  points: [
    {
      node: <><H>Test (Fig. 13)</H><Pts items={[<>Machine run as a motor on no load at rated V and speed</>, <>Readings: V, I<sub>0</sub>, I<sub>sh</sub>; <K>{String.raw`I_{a0} = I_0 - I_{sh}`}</K></>]} /></>,
      say: 'Test: machine lai no load ma rated voltage ra speed ma motor jastai chalaune, ra V, I zero ra I sh napne.',
      voice: 'टेस्ट — मेसिनलाई नो लोडमा, रेटेड भोल्टेज र स्पिडमा मोटर जस्तै चलाउने, र भी, आई जिरो र आई एस एच नाप्ने।',
    },
    {
      node: <><H>Constant losses</H><K>{String.raw`W_c = VI_0 - (I_0 - I_{sh})^2R_a \qquad \cdots(1)`}</K></>,
      say: 'Constant losses W c equals V I zero minus I a zero square R a.',
      voice: 'कन्स्टेन्ट लसेस — डब्लु सी इक्वल्स, भी आई जिरो माइनस, आई ए जिरो स्क्वायर आर ए।',
    },
    {
      node: <><H>Efficiency at any load</H><K>{String.raw`\begin{aligned} \eta_{motor} &= \dfrac{VI_L - W_c - I_a^2R_a}{VI_L} && \cdots(2) \\ \eta_{gen} &= \dfrac{VI_L}{VI_L + W_c + I_a^2R_a} && \cdots(3) \end{aligned}`}</K></>,
      say: 'Motor ko efficiency V I L minus losses, over V I L. Generator ko efficiency V I L, over V I L plus losses.',
      voice: 'मोटरको इफिसियन्सी — भी आई एल माइनस लसेस, ओभर भी आई एल। जेनेरेटरको इफिसियन्सी — भी आई एल, ओभर भी आई एल प्लस लसेस।',
      ask: {
        q: 'Generator ko lagi I a kasari lekhincha?',
        voice: 'जेनेरेटरको लागि आई ए कसरी लेखिन्छ?',
        options: ['Ia = IL + Ish', 'Ia = IL − Ish', 'Ia = I0'],
        answer: 0,
        why: 'Generator ma armature le load ra shunt field dubai lai current dincha.',
      },
    },
    {
      page: true,
      node: <><H>Advantages</H><Pts items={[<>Economical: only the no-load power is used</>, <>Efficiency at any load can be predicted</>]} /></>,
      say: 'Advantages: no-load power matra lagne bhayeko le economical, ra jun sukai load ko efficiency predict garna milcha.',
      voice: 'एडभान्टेजेस — नो लोड पावर मात्र लाग्ने भएकोले इकोनोमिकल, र जुन सुकै लोडको इफिसियन्सी प्रेडिक्ट गर्न मिल्छ।',
    },
    {
      node: <><H>Disadvantages</H><Pts items={[<>Changes in iron loss and resistance under load are ignored</>, <>Not applicable to series motors</>]} /></>,
      say: 'Disadvantages: load ma iron loss ra resistance ko change ignore huncha, ra series motor ma applicable hudaina.',
      voice: 'डिसएडभान्टेजेस — लोडमा आइरन लस र रेजिस्टेन्सको चेन्ज इग्नोर हुन्छ, र सिरिज मोटरमा एप्लिकेबल हुँदैन।',
    },
  ],
});
