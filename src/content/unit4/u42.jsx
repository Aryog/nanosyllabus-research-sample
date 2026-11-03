import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { br, rem, Let } from '../video/kit.jsx';
import { curvesFigure, selfTypesFigure, typesFigure } from './figs.jsx';

/*
  4.2 Types of DC motor, characteristics and applications. Opener, Terms and
  Derivation told by the Tutor (default) and the Lecturer (variant) over the
  book figures (Fig. 2 excitation, Fig. 3 characteristics); Big picture: the
  three past questions, answered point-wise by the Lecturer, space by marks.
  Numbers recomputed: 2069 Bhadra series motor, I2 = 5500/147.5 = 37.29 A.
  Canvas plan for every Syllabus Content video (4.1 pattern, rule 63):
  heading on top · "Remember" card first (what must be known: KCL/KVL,
  Ta ∝ φIa, N ∝ Eb/φ) · main board left, book figure right · "why" lines
  (br) written under the step they explain · "Let," one symbol per line ·
  planned page turns with carried results · last beat: a "Remember" card
  that recaps the whole video, with a recall question.
  Checks: 220 − 20 × 0.5 = 210 V; long shunt 220 − 40 × 0.25 = 210 V;
  20 × 0.5 = 10 V = 4.5 % of 220 V.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

export const opener42 = duo('4.2 · Overview', {
  draw: typesFigure,
  viewBox: '0 0 360 270',
  tutor: [
    {
      say: 'Unit 4.2: DC motor ka types, characteristics ra applications. Field winding kasari jodincha, tyasle motor ko swabhav nai badlincha.',
      voice: 'युनिट फोर पोइन्ट टु — डी सी मोटरका टाइप्स, क्यारेक्टरिस्टिक्स र एप्लिकेसन्स। फिल्ड वाइन्डिङ कसरी जोडिन्छ, त्यसले मोटरको स्वभाव नै बदलिन्छ।',
      lines: [['h', <>4.2</>], ['step', <>Types, characteristics ra applications</>]],
    },
    {
      say: 'Pahila excitation ka char tarika: separately excited, shunt, series ra compound.',
      voice: 'पहिला, एक्साइटेसनका चार तरिका — सेपरेटली एक्साइटेड, शन्ट, सिरिज, र कम्पाउन्ड।',
      lines: [['step', <>1. Excitation: separately excited · shunt · series · compound</>]],
    },
    {
      say: 'Tyaspachi, load badhda shunt ra series motor ko torque ra speed kasari badlincha, ani kun kaam ma kun motor.',
      voice: 'त्यसपछि, लोड बढ्दा, शन्ट र सिरिज मोटरको टर्क र स्पिड कसरी बदलिन्छ — अनि कुन काममा कुन मोटर।',
      lines: [['step', <>2. Characteristics: Ta–Ia, N–Ia, N–Ta · 3. Applications</>]],
    },
    {
      say: 'Antim ma, IOE ka tin question: characteristics ko theory, series motor lai load bina kina start nagarne, ra euta series motor numerical.',
      voice: 'अन्तिममा, आई ओ ईका तीन क्वेस्चन — क्यारेक्टरिस्टिक्सको थ्योरी, सिरिज मोटरलाई लोड बिना किन स्टार्ट नगर्ने, र एउटा सिरिज मोटर न्युमेरिकल।',
      lines: [['hook', <>IOE: characteristics [8] · series motor on no load · series numerical [8]</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.2: types of DC motor, their performance characteristics and applications.',
      voice: 'युनिट फोर पोइन्ट टु — टाइप्स अफ डी सी मोटर, देयर परफर्मेन्स क्यारेक्टरिस्टिक्स, एन्ड एप्लिकेसन्स।',
      lines: [['h', <>Unit 4.2</>], ['step', <>Types, characteristics and applications</>]],
    },
    {
      say: 'Syllabus ko pahilo bhag: method of excitation ra types of DC motor.',
      voice: 'सिलेबसको पहिलो भाग — मेथड अफ एक्साइटेसन, र टाइप्स अफ डी सी मोटर।',
      lines: [['step', <><H>1. Method of excitation</H>separately excited, shunt, series, compound</>]],
    },
    {
      say: 'Dosro bhag: performance characteristics, arthat Ta–Ia, N–Ia ra N–Ta curves, ani tinko adhar ma applications.',
      voice: 'दोस्रो भाग — परफर्मेन्स क्यारेक्टरिस्टिक्स, अर्थात टी ए आई ए, एन आई ए, र एन टी ए कर्भ्स — अनि तिनको आधारमा एप्लिकेसन्स।',
      lines: [['step', <><H>2. Performance characteristics</H>Ta–Ia, N–Ia, N–Ta and applications</>]],
    },
    {
      say: 'Big picture ma tin past question ko answer lekhincha: characteristics, series motor on no load, ra series motor ko numerical.',
      voice: 'बिग पिक्चरमा तीन पास्ट क्वेस्चनको आन्सर लेखिन्छ — क्यारेक्टरिस्टिक्स, सिरिज मोटर अन नो लोड, र सिरिज मोटरको न्युमेरिकल।',
      lines: [['hook', <>IOE: 2070 Magh [8] · 2067 Mangsir, 2065 Chaitra, 2068 Bhadra · 2069 Bhadra, 2066 Magh [8]</>]],
    },
  ],
});

/* ── Terms: methods of excitation and types ──────────────────────────── */
export const types42 = duo('Method of excitation and types of DC motor', {
  draw: typesFigure,
  viewBox: '0 0 540 276',
  tutor: [
    {
      say: 'Yaad garau: shunt bhaneko parallel, series bhaneko same path. Field winding lai current dinu nai excitation ho. Separately excited motor ma field lai separate supply V f bata current aaucha.',
      voice: 'याद गरौं — शन्ट भनेको प्यारालल, सिरिज भनेको सेम पाथ। फिल्ड वाइन्डिङलाई करेन्ट दिनु नै एक्साइटेसन हो। सेपरेटली एक्साइटेड मोटरमा, फिल्डलाई सेपरेट सप्लाई भी एफबाट करेन्ट आउँछ।',
      lines: [['h', <>Methods of excitation</>], rem(<>Shunt = in parallel; series = in the same path</>, <>Excitation = feeding current to the field winding</>), ['step', <>(a) Separately excited: field from its own supply V<sub>f</sub></>, undefined, { carry: <>(a) separately excited: own supply V<sub>f</sub></> }]],
    },
    {
      say: 'Self-excited motor ma field lai same supply bata current milcha. Shunt motor ma field armature sanga parallel, full V across, so flux almost constant. Line current I L equals I a plus I sh.',
      voice: 'सेल्फ एक्साइटेड मोटरमा, फिल्डलाई सेम सप्लाईबाट करेन्ट मिल्छ। शन्ट मोटरमा फिल्ड आर्मेचरसँग प्यारालल, फुल भी अक्रस, सो फ्लक्स अल्मोस्ट कन्स्टेन्ट। लाइन करेन्ट आई एल इक्वल्स, आई ए प्लस आई एस एच।',
      lines: [['step', <>(b) Shunt: field across the supply → φ ≈ constant; <K>{String.raw`I_L = I_a + I_{sh}`}</K></>, undefined, { carry: <>(b) shunt: <K>{String.raw`I_L = I_a + I_{sh}`}</K></> }]],
      ask: {
        q: 'Shunt motor ma field winding armature sanga kasari connected huncha?',
        voice: 'शन्ट मोटरमा फिल्ड वाइन्डिङ, आर्मेचरसँग कसरी कनेक्टेड हुन्छ?',
        options: ['Parallel ma', 'Series ma', 'Connected hudaina'],
        answer: 0,
        why: 'Shunt bhaneko parallel: field supply ko dubai terminal ma connected huncha, armature sanga parallel.',
      },
    },
    {
      say: 'Series motor ma field armature sanga series ma huncha, so full armature current I a field bata bagcha. Saturation samma flux I a sanga increase huncha.',
      voice: 'सिरिज मोटरमा फिल्ड आर्मेचरसँग सिरिजमा हुन्छ, सो फुल आर्मेचर करेन्ट आई ए फिल्डबाट बग्छ। स्याचुरेसनसम्म, फ्लक्स आई एसँग इन्क्रिज हुन्छ।',
      lines: [['step', <>(c) Series: field in series → <K>{String.raw`I_{se} = I_a`}</K>, <K>{String.raw`\phi \propto I_a`}</K> (before saturation)</>, undefined, { carry: <>(c) series: <K>{String.raw`I_{se} = I_a`}</K></> }]],
    },
    {
      page: true,
      say: 'Compound motor ma dubai field hunchan, shunt ra series. Long shunt ma shunt field armature ra series field dubai ko across huncha, so series field ma I a nai bagcha.',
      voice: 'कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छन् — शन्ट र सिरिज। लङ शन्टमा, शन्ट फिल्ड आर्मेचर र सिरिज फिल्ड दुवैको अक्रस हुन्छ, सो सिरिज फिल्डमा आई ए नै बग्छ।',
      lines: [['step', <>(d) Long shunt: shunt field across (armature + series field) → series field carries I<sub>a</sub></>]],
    },
    {
      say: 'Short shunt ma shunt field armature ko matra across huncha. Series field supply line mai parcha, tesaile series field ma full line current I L bagcha.',
      voice: 'सर्ट शन्टमा, शन्ट फिल्ड आर्मेचरको मात्र अक्रस हुन्छ। सिरिज फिल्ड सप्लाई लाइनमै पर्छ, त्यसैले सिरिज फिल्डमा फुल लाइन करेन्ट आई एल बग्छ।',
      lines: [['step', <>(e) Short shunt: shunt field across the armature only → series field carries I<sub>L</sub></>]],
    },
    {
      say: 'Kun ho kasari chinne? Shunt field kaha bata tap gareko cha, tyo check gara. Series field bhanda supply side ma tap bhaye long shunt, armature side ma bhaye short shunt.',
      voice: 'कुन हो कसरी चिन्ने? शन्ट फिल्ड कहाँबाट ट्याप गरेको छ, त्यो चेक गर। सिरिज फिल्डभन्दा सप्लाई साइडमा ट्याप भए लङ शन्ट, आर्मेचर साइडमा भए सर्ट शन्ट।',
      lines: [br('Long or short shunt?', <Pts items={[<>Find where the shunt field is tapped</>, <>Before the series field (supply side): <b>long</b> shunt, I<sub>se</sub> = I<sub>a</sub></>, <>After it (armature side): <b>short</b> shunt, I<sub>se</sub> = I<sub>L</sub></>]} />)],
      ask: {
        q: 'Short-shunt compound motor ma series field ma kun current bagcha?',
        voice: 'सर्ट शन्ट कम्पाउन्ड मोटरमा, सिरिज फिल्डमा कुन करेन्ट बग्छ?',
        options: ['Line current IL', 'Armature current Ia matra', 'Shunt current Ish'],
        answer: 0,
        why: 'Short shunt ma shunt field armature ko matra across; series field supply line ma series ma cha, tesaile IL bagcha.',
      },
    },
    {
      say: 'Dubai field ko flux same direction ma bhaye cumulative compound, opposite direction ma bhaye differential compound.',
      voice: 'दुवै फिल्डको फ्लक्स सेम डाइरेक्सनमा भए क्युमुलेटिभ कम्पाउन्ड, अपोजिट डाइरेक्सनमा भए डिफरेन्सियल कम्पाउन्ड।',
      lines: [['step', <K>{String.raw`\begin{aligned} \text{Cumulative: } \phi &= \phi_{sh} + \phi_{se} \\ \text{Differential: } \phi &= \phi_{sh} - \phi_{se} \end{aligned}`}</K>]],
    },
    {
      page: true,
      say: 'Summary yaad gara: separately excited ko aafnai supply, shunt ma flux constant, series ma flux I a sanga, compound ma dubai field: long shunt ma I a, short shunt ma I L.',
      voice: 'सारांश याद गर — सेपरेटली एक्साइटेडको आफ्नै सप्लाई, शन्टमा फ्लक्स कन्स्टेन्ट, सिरिजमा फ्लक्स आई एसँग, कम्पाउन्डमा दुवै फिल्ड — लङ शन्टमा आई ए, सर्ट शन्टमा आई एल।',
      lines: [['recall', <Pts items={[<>Separately excited: field from its own supply</>, <>Shunt: <K>{String.raw`I_L = I_a + I_{sh}`}</K>, φ ≈ constant</>, <>Series: <K>{String.raw`I_{se} = I_a`}</K>, φ ∝ I<sub>a</sub></>, <>Long shunt: I<sub>se</sub> = I<sub>a</sub>; short shunt: I<sub>se</sub> = I<sub>L</sub></>, <>Cumulative: fluxes add; differential: they oppose</>]} />]],
      ask: {
        q: 'Kun DC motor ma flux load current sanga increase huncha?',
        voice: 'कुन डी सी मोटरमा फ्लक्स लोड करेन्टसँग इन्क्रिज हुन्छ?',
        options: ['Series motor', 'Shunt motor', 'Separately excited motor'],
        answer: 0,
        why: 'Series motor ma Ise = Ia: load badhda Ia ra flux dubai increase hunchan (saturation samma).',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: shunt arthat parallel, series arthat same path. Excitation bhaneko field winding lai current dine method. Separately excited motor ma field separate DC source V f bata excite huncha.',
      voice: 'स्मरण — शन्ट अर्थात प्यारालल, सिरिज अर्थात सेम पाथ। एक्साइटेसन भनेको फिल्ड वाइन्डिङलाई करेन्ट दिने मेथड। सेपरेटली एक्साइटेड मोटरमा, फिल्ड सेपरेट डी सी सोर्स भी एफबाट एक्साइट हुन्छ।',
      lines: [['h', <>Methods of excitation (Fig. 2)</>], rem(<>Shunt: parallel; series: same path</>, <>Excitation: supplying the field winding</>), ['step', <>(a) Separately excited: field fed from a separate DC source V<sub>f</sub></>, undefined, { carry: <>(a) separately excited: separate source V<sub>f</sub></> }]],
    },
    {
      say: 'Self-excited, shunt: field winding armature ko parallel ma, supply ko across. Shunt field ma many turns ra high resistance huncha.',
      voice: 'सेल्फ एक्साइटेड, शन्ट — फिल्ड वाइन्डिङ आर्मेचरको प्याराललमा, सप्लाईको अक्रस। शन्ट फिल्डमा मेनी टर्न्स र हाई रेजिस्टेन्स हुन्छ।',
      lines: [['step', <Pts items={[<>(b) Shunt: field in parallel with the armature; many turns, high R<sub>sh</sub></>, <><K>{String.raw`I_L = I_a + I_{sh}`}</K></>]} />, undefined, { carry: <>(b) shunt: <K>{String.raw`I_L = I_a + I_{sh}`}</K></> }]],
      ask: {
        q: 'Shunt motor ma line current kati huncha?',
        voice: 'शन्ट मोटरमा लाइन करेन्ट आई एल कति हुन्छ?',
        options: ['Ia + Ish', 'Ia matra', 'Ia − Ish'],
        answer: 0,
        why: 'Line current dui branch ma divide huncha: armature (Ia) ra shunt field (Ish).',
      },
    },
    {
      say: 'Series: field winding armature sanga series ma, few turns ra thick wire, low resistance. I L equals I a equals I se.',
      voice: 'सिरिज — फिल्ड वाइन्डिङ आर्मेचरसँग सिरिजमा, फ्यू टर्न्स र थिक वायर, लो रेजिस्टेन्स। आई एल इक्वल्स आई ए इक्वल्स आई एस ई।',
      lines: [['step', <Pts items={[<>(c) Series: field in series; few turns, thick wire, low R<sub>se</sub></>, <><K>{String.raw`I_L = I_a = I_{se}`}</K></>]} />, undefined, { carry: <>(c) series: <K>{String.raw`I_L = I_a = I_{se}`}</K></> }]],
    },
    {
      page: true,
      say: 'Compound, long shunt: shunt field armature ra series field dubai ko across; series field ma armature current I a bagcha.',
      voice: 'कम्पाउन्ड, लङ शन्ट — शन्ट फिल्ड आर्मेचर र सिरिज फिल्ड दुवैको अक्रस। सिरिज फिल्डमा आर्मेचर करेन्ट आई ए बग्छ।',
      lines: [['step', <Pts items={[<>(d) Long-shunt compound: shunt field across armature + series field; I<sub>se</sub> = I<sub>a</sub></>]} />]],
    },
    {
      say: 'Short shunt: shunt field armature ko matra across; series field ma line current I L bagcha.',
      voice: 'सर्ट शन्ट — शन्ट फिल्ड आर्मेचरको मात्र अक्रस। सिरिज फिल्डमा लाइन करेन्ट आई एल बग्छ।',
      lines: [['step', <Pts items={[<>(e) Short-shunt compound: shunt field across the armature only; I<sub>se</sub> = I<sub>L</sub></>]} />]],
    },
    {
      say: 'Long ra short shunt chinna shunt field ko tapping point hernu parcha: series field bhanda supply side ma long, armature side ma short.',
      voice: 'लङ र सर्ट शन्ट चिन्न, शन्ट फिल्डको ट्यापिङ पोइन्ट हेर्नुपर्छ — सिरिज फिल्डभन्दा सप्लाई साइडमा लङ, आर्मेचर साइडमा सर्ट।',
      lines: [br('Identifying the connection', <Pts items={[<>Shunt tapped at the supply side of R<sub>se</sub>: long shunt</>, <>Shunt tapped at the armature side of R<sub>se</sub>: short shunt</>]} />)],
      ask: {
        q: 'Long-shunt compound motor ma series field ma kun current bagcha?',
        voice: 'लङ शन्ट कम्पाउन्ड मोटरमा, सिरिज फिल्डमा कुन करेन्ट बग्छ?',
        options: ['Armature current Ia', 'Line current IL', 'Shunt current Ish'],
        answer: 0,
        why: 'Long shunt ma shunt field (armature + series field) ko across; series field armature sanga series ma, tesaile Ia bagcha.',
      },
    },
    {
      say: 'Fluxes aiding bhaye cumulative compound, opposing bhaye differential compound.',
      voice: 'फ्लक्सेस एडिङ भए क्युमुलेटिभ कम्पाउन्ड, अपोजिङ भए डिफरेन्सियल कम्पाउन्ड।',
      lines: [['step', <K>{String.raw`\begin{aligned} \text{Cumulative: } \phi &= \phi_{sh} + \phi_{se} \\ \text{Differential: } \phi &= \phi_{sh} - \phi_{se} \end{aligned}`}</K>]],
    },
    {
      page: true,
      say: 'Saransh: separately excited ra self-excited; self-excited ka shunt, series ra compound; compound ka long ra short shunt, cumulative ra differential.',
      voice: 'सारांश — सेपरेटली एक्साइटेड र सेल्फ एक्साइटेड। सेल्फ एक्साइटेडका शन्ट, सिरिज र कम्पाउन्ड। कम्पाउन्डका लङ र सर्ट शन्ट, क्युमुलेटिभ र डिफरेन्सियल।',
      lines: [['recall', <Pts items={[<>Separately excited: separate source</>, <>Shunt: <K>{String.raw`I_L = I_a + I_{sh}`}</K>; φ ≈ constant</>, <>Series: <K>{String.raw`I_{se} = I_a`}</K>; φ ∝ I<sub>a</sub></>, <>Compound: long shunt (I<sub>se</sub> = I<sub>a</sub>), short shunt (I<sub>se</sub> = I<sub>L</sub>)</>, <>Cumulative <K>{String.raw`\phi_{sh} + \phi_{se}`}</K>; differential <K>{String.raw`\phi_{sh} - \phi_{se}`}</K></>]} />]],
      ask: {
        q: 'Cumulative compound motor ma dubai field ko flux kasto huncha?',
        voice: 'क्युमुलेटिभ कम्पाउन्ड मोटरमा, दुवै फिल्डको फ्लक्स कस्तो हुन्छ?',
        options: ['Ek arka lai aid garcha', 'Ek arka lai oppose garcha', 'Shunt ko matra flux huncha'],
        answer: 0,
        why: 'Cumulative ma φ = φsh + φse; differential ma φ = φsh − φse.',
      },
    },
  ],
});

/* ── Terms: what a characteristic is ─────────────────────────────────── */
// curvesFigure: 0 axes · 1 shunt Ta–Ia · 2 series Ta–Ia · 3 shunt N–Ia ·
// 4 series N–Ia · 5 shunt N–Ta · 6 no-load mark · 7 series N–Ta.
export const chars42 = duo('Performance characteristics: Ta–Ia, N–Ia, N–Ta', {
  // Every panel gets its curves on the beat that names it (rule 74).
  draw: figAt(curvesFigure, { 0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 4, 7: 4 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Yaad garau: 4.1 bata T a, phi I a sanga proportional, ra 4.2 bata E b equals V minus I a R a. Characteristic bhaneko euta quantity arko sanga kasari change huncha bhanne graph.',
      voice: 'याद गरौं — फोर पोइन्ट वानबाट टी ए, फाइ आई एसँग प्रोपोर्सनल, र फोर पोइन्ट टुबाट ई बी इक्वल्स भी माइनस आई ए आर ए। क्यारेक्टरिस्टिक भनेको, एउटा क्वान्टिटी अर्कोसँग कसरी चेन्ज हुन्छ भन्ने ग्राफ।',
      lines: [['h', <>Performance characteristics</>], rem(<><K>{String.raw`T_a \propto \phi\,I_a`}</K> (4.1)</>, <><K>{String.raw`E_b = V - I_aR_a`}</K> (4.2)</>), ['step', <>Characteristic: a graph of one quantity against another</>]],
    },
    {
      say: 'Pahilo Ta–Ia, electrical characteristic: current increase huda torque kati increase huncha. Yesko base T a, phi I a sanga proportional.',
      voice: 'पहिलो टी ए आई ए, इलेक्ट्रिकल क्यारेक्टरिस्टिक — करेन्ट इन्क्रिज हुँदा टर्क कति इन्क्रिज हुन्छ। यसको बेस — टी ए, फाइ आई एसँग प्रोपोर्सनल।',
      lines: [['step', <>(i) Ta–Ia (electrical): <K>{String.raw`T_a \propto \phi\,I_a`}</K></>]],
    },
    {
      say: 'Dosro N–Ia, speed characteristic: load current increase huda speed kasari change huncha. Yesko base N, V minus I a R a, over phi sanga proportional.',
      voice: 'दोस्रो एन आई ए, स्पिड क्यारेक्टरिस्टिक — लोड करेन्ट इन्क्रिज हुँदा स्पिड कसरी चेन्ज हुन्छ। यसको बेस — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['step', <>(ii) N–Ia (speed): <K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K></>]],
    },
    {
      say: 'N, E b over phi kina? E b equals P phi Z N over sixty A. Machine ma P, Z, A fixed, so N equals sixty A over P Z, times E b over phi.',
      voice: 'एन, ई बी ओभर फाइ किन? ई बी इक्वल्स पी फाइ जेड एन, ओभर सिक्स्टी ए। मेसिनमा पी, जेड, ए फिक्स्ड, सो एन इक्वल्स सिक्स्टी ए ओभर पी जेड, टाइम्स ई बी ओभर फाइ।',
      lines: [br('Why N ∝ Eb/φ?', <Pts items={[<><K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K></>, <>P, Z, A fixed for a machine</>, <><K>{String.raw`N = \dfrac{60A}{PZ}\cdot\dfrac{E_b}{\phi}`}</K></>]} />)],
    },
    {
      say: 'Tesro N–Ta, mechanical characteristic: load le demand gareko torque ma motor kati speed dincha. Application choose garna yahi graph use huncha.',
      voice: 'तेस्रो एन टी ए, मेकानिकल क्यारेक्टरिस्टिक — लोडले डिमान्ड गरेको टर्कमा मोटर कति स्पिड दिन्छ। एप्लिकेसन छान्न यही ग्राफ युज हुन्छ।',
      lines: [['step', <>(iii) N–Ta (mechanical): speed at each load torque → decides the application</>]],
      ask: {
        q: 'Shunt motor ma phi constant bhaye, T a ra I a ko relation kasto huncha?',
        voice: 'शन्ट मोटरमा फाइ कन्स्टेन्ट भए, टी ए र आई एको रिलेसन कस्तो हुन्छ?',
        options: ['Ta ∝ Ia (straight line)', 'Ta ∝ Ia²', 'Ta ∝ 1/Ia'],
        answer: 0,
        why: 'Ta ∝ φ Ia; φ constant bhaye Ta ∝ Ia, origin bata straight line.',
      },
    },
    {
      say: 'Summary: tin curve, ra dui equation. Shunt ra series ko curve kina farak? Kinaki shunt ma flux constant, series ma flux I a sanga change huncha.',
      voice: 'सारांश — तीन कर्भ, र दुई इक्वेसन। शन्ट र सिरिजको कर्भ किन फरक? किनकि शन्टमा फ्लक्स कन्स्टेन्ट, सिरिजमा फ्लक्स आई एसँग चेन्ज हुन्छ।',
      lines: [['recall', <Pts items={[<>Ta–Ia (electrical): <K>{String.raw`T_a \propto \phi I_a`}</K></>, <>N–Ia (speed): <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K></>, <>N–Ta (mechanical): chooses the application</>, <>The shape depends on φ: shunt constant, series ∝ I<sub>a</sub></>]} />]],
      ask: {
        q: 'Shunt ra series motor ko characteristic farak hune mukhya karan k ho?',
        voice: 'शन्ट र सिरिज मोटरको क्यारेक्टरिस्टिक फरक हुने मुख्य कारण के हो?',
        options: ['Flux φ ko behaviour', 'Supply voltage', 'Number of poles'],
        answer: 0,
        why: 'Dubai ma Ta ∝ φIa ra N ∝ Eb/φ; shunt ma φ constant, series ma φ ∝ Ia, tesaile curve farak.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: T a, phi I a sanga proportional ra E b equals V minus I a R a. Performance characteristics bhaneko torque ra speed armature current sanga kasari change hunchan bhanne curves.',
      voice: 'स्मरण — टी ए, फाइ आई एसँग प्रोपोर्सनल, र ई बी इक्वल्स भी माइनस आई ए आर ए। परफर्मेन्स क्यारेक्टरिस्टिक्स भनेको, टर्क र स्पिड आर्मेचर करेन्टसँग कसरी चेन्ज हुन्छन् भन्ने कर्भ्स।',
      lines: [['h', <>Characteristics of DC motors</>], rem(<K>{String.raw`T_a \propto \phi\,I_a`}</K>, <K>{String.raw`E_b = V - I_aR_a`}</K>), ['step', <>Curves of torque and speed against armature current (Fig. 3)</>]],
    },
    {
      say: 'Ta–Ia curve lai electrical characteristic bhanincha. Equation: T a, phi I a sanga proportional.',
      voice: 'टी ए आई ए कर्भलाई इलेक्ट्रिकल क्यारेक्टरिस्टिक भनिन्छ। इक्वेसन — टी ए, फाइ आई एसँग प्रोपोर्सनल।',
      lines: [['step', <Pts items={[<>(i) Ta–Ia, electrical characteristic: <K>{String.raw`T_a \propto \phi I_a`}</K></>]} />]],
    },
    {
      say: 'N–Ia curve speed equation bata aaucha: N, V minus I a R a, over phi sanga proportional.',
      voice: 'एन आई ए कर्भ, स्पिड इक्वेसनबाट आउँछ — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['step', <Pts items={[<>(ii) N–Ia, speed characteristic: <K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K></>]} />]],
    },
    {
      say: 'Kina bhane E b equals P phi Z N over sixty A, ra given machine ma P, Z, A constant; tesaile N, E b over phi sanga proportional.',
      voice: 'किनभने ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, र गिभन मेसिनमा पी, जेड, ए कन्स्टेन्ट। त्यसैले एन, ई बी ओभर फाइसँग प्रोपोर्सनल।',
      lines: [br('Speed equation', <Pts items={[<><K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K>; P, Z, A constant</>, <><K>{String.raw`N \propto \dfrac{E_b}{\phi}`}</K></>]} />)],
    },
    {
      say: 'N–Ta curve lai mechanical characteristic bhanincha. Kun load ko lagi kun motor bhanne selection yasaibata garincha.',
      voice: 'एन टी ए कर्भलाई मेकानिकल क्यारेक्टरिस्टिक भनिन्छ। कुन लोडको लागि कुन मोटर भन्ने सिलेक्सन, यसैबाट गरिन्छ।',
      lines: [['step', <Pts items={[<>(iii) N–Ta, mechanical characteristic: decides the application</>]} />]],
      ask: {
        q: 'Kun characteristic lai mechanical characteristic bhanincha?',
        voice: 'कुन क्यारेक्टरिस्टिकलाई मेकानिकल क्यारेक्टरिस्टिक भनिन्छ?',
        options: ['N–Ta', 'Ta–Ia', 'Eb–N'],
        answer: 0,
        why: 'Speed ra torque dubai mechanical quantity: N–Ta mechanical characteristic.',
      },
    },
    {
      say: 'Saransh: Ta–Ia electrical, N–Ia speed, N–Ta mechanical; curve ko shape flux le decide garcha.',
      voice: 'सारांश — टी ए आई ए इलेक्ट्रिकल, एन आई ए स्पिड, एन टी ए मेकानिकल। कर्भको सेप फ्लक्सले डिसाइड गर्छ।',
      lines: [['recall', <Pts items={[<>Ta–Ia (electrical): <K>{String.raw`T_a \propto \phi I_a`}</K></>, <>N–Ia (speed): <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K></>, <>N–Ta (mechanical): selection of the motor</>, <>φ decides the shape: shunt constant, series ∝ I<sub>a</sub></>]} />]],
      ask: {
        q: 'Ta–Ia characteristic lai ke bhanincha?',
        voice: 'टी ए आई ए क्यारेक्टरिस्टिकलाई के भनिन्छ?',
        options: ['Electrical characteristic', 'Mechanical characteristic', 'Speed characteristic'],
        answer: 0,
        why: 'Ta–Ia le torque lai electrical quantity Ia sanga dekhaucha: electrical characteristic.',
      },
    },
  ],
});

/* ── Derivation: voltage and current equations ───────────────────────── */
export const equations42 = duo('Derivation: voltage and current equations', {
  // (a) separately excited is not taught here: the 2 × 2 figure, no empty slot.
  draw: figAt(selfTypesFigure, { 0: 2, 1: 3, 2: 4, 3: 5 }),
  viewBox: '0 0 370 276',
  tutor: [
    {
      say: 'Yaad garau duita law: KCL, node ma aaune current jane current barabar. Ra 4.2 ko voltage equation: V equals E b plus I a R a.',
      voice: 'याद गरौं दुईटा ल — के सी एल, नोडमा आउने करेन्ट जाने करेन्ट बराबर। र फोर पोइन्ट टुको भोल्टेज इक्वेसन — भी इक्वल्स ई बी प्लस आई ए आर ए।',
      lines: [['h', <>Voltage and current equations</>], rem(<>KCL: current into a node = current out</>, <>KVL (4.2): <K>{String.raw`V = E_b + I_aR_a`}</K></>)],
    },
    {
      say: 'Symbols yaad gara: V supply voltage, I L line current, I a armature current, I sh shunt field current, I se series field current, ra R a, R sh, R se ka resistance.',
      voice: 'सिम्बल्स याद गर — भी सप्लाई भोल्टेज, आई एल लाइन करेन्ट, आई ए आर्मेचर करेन्ट, आई एस एच शन्ट फिल्ड करेन्ट, आई एस ई सिरिज फिल्ड करेन्ट, र आर ए, आर एस एच, आर एस ईका रेजिस्टेन्स।',
      lines: [['step', <Let items={[<>V = supply voltage</>, <>I<sub>L</sub> = line current, I<sub>a</sub> = armature current</>, <>I<sub>sh</sub> = shunt field current, I<sub>se</sub> = series field current</>, <>R<sub>a</sub>, R<sub>sh</sub>, R<sub>se</sub> = their resistances</>]} />]],
    },
    {
      say: 'Shunt motor: line current I L node ma dui tira divide huncha, armature ma I a ra field ma I sh. Field ma full V, so I sh equals V over R sh.',
      voice: 'शन्ट मोटर — लाइन करेन्ट आई एल नोडमा दुईतिर डिभाइड हुन्छ, आर्मेचरमा आई ए, र फिल्डमा आई एस एच। फिल्डमा फुल भी, सो आई एस एच इक्वल्स भी ओभर आर एस एच।',
      lines: [['step', <><span className="lbl">(i) Shunt motor</span><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} \\ I_{sh} &= \dfrac{V}{R_{sh}} \\ V &= E_b + I_aR_a \end{aligned}`}</K></>, undefined, { carry: <>Shunt: <K>{String.raw`V = E_b + I_aR_a`}</K></> }]],
    },
    {
      say: 'Series motor ma euta matra path, so euta matra current. Tara V le aba R a ra R se dubai ko drop pay garnu parcha.',
      voice: 'सिरिज मोटरमा एउटा मात्र पाथ, सो एउटा मात्र करेन्ट। तर भीले अब, आर ए र आर एस ई दुवैको ड्रप पे गर्नुपर्छ।',
      lines: [['step', <><span className="lbl">(ii) Series motor</span><K>{String.raw`\begin{aligned} I_L &= I_a \\ &= I_{se} \\ V &= E_b + I_a(R_a + R_{se}) \end{aligned}`}</K></>, undefined, { carry: <>Series: <K>{String.raw`V = E_b + I_a(R_a + R_{se})`}</K></> }]],
      ask: {
        q: 'Series motor: V = 220 V, Ia = 20 A, Ra + Rse = 0.5 Ω. Eb kati huncha?',
        voice: 'सिरिज मोटर — भी टु ट्वेन्टी भोल्ट, आई ए ट्वेन्टी एम्पियर, आर ए प्लस आर एस ई जिरो पोइन्ट फाइभ ओम। ई बी कति हुन्छ?',
        options: ['210 V', '220 V', '200 V'],
        answer: 0,
        why: 'Eb = V − Ia(Ra + Rse) = 220 − 20 × 0.5 = 210 V.',
      },
    },
    {
      page: true,
      say: 'Long shunt compound ma armature current I a series field bata pani jaancha. So drop I a times R a plus R se, ra I sh equals V over R sh.',
      voice: 'लङ शन्ट कम्पाउन्डमा, आर्मेचर करेन्ट आई ए सिरिज फिल्डबाट पनि जान्छ। सो ड्रप — आई ए टाइम्स आर ए प्लस आर एस ई, र आई एस एच इक्वल्स भी ओभर आर एस एच।',
      lines: [['step', <><span className="lbl">(iii) Long-shunt compound</span><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} \\ I_{sh} &= \dfrac{V}{R_{sh}} \\ V &= E_b + I_a(R_a + R_{se}) \end{aligned}`}</K></>]],
    },
    {
      say: 'Short shunt ma series field bata full line current I L bagcha. So series drop I L R se, ra armature drop I a R a.',
      voice: 'सर्ट शन्टमा, सिरिज फिल्डबाट फुल लाइन करेन्ट आई एल बग्छ। सो सिरिज ड्रप — आई एल आर एस ई, र आर्मेचर ड्रप — आई ए आर ए।',
      lines: [['step', <><span className="lbl">(iv) Short-shunt compound</span><K>{String.raw`\begin{aligned} V &= E_b + I_aR_a + I_LR_{se} \\ I_{sh} &= \dfrac{V - I_LR_{se}}{R_{sh}} \end{aligned}`}</K></>]],
    },
    {
      say: 'Short shunt ma I sh kina V over R sh hoina? I L R se drop pachi matra shunt field connected cha, so field ma V minus I L R se matra lagcha.',
      voice: 'सर्ट शन्टमा आई एस एच किन भी ओभर आर एस एच होइन? आई एल आर एस ई ड्रपपछि मात्र शन्ट फिल्ड कनेक्टेड छ, सो फिल्डमा भी माइनस आई एल आर एस ई मात्र लाग्छ।',
      lines: [br('Why V − IL Rse across the shunt?', <Pts items={[<>Series field first drops I<sub>L</sub>R<sub>se</sub></>, <>Shunt field sees only the rest: V − I<sub>L</sub>R<sub>se</sub></>, <>Same voltage is across the armature: E<sub>b</sub> + I<sub>a</sub>R<sub>a</sub></>]} />)],
    },
    {
      page: true,
      say: 'Summary: har motor ma V equals E b plus sabai series drop. Kun resistance ma kun current, tyo connection le decide garcha.',
      voice: 'सारांश — हरेक मोटरमा, भी इक्वल्स ई बी प्लस सबै सिरिज ड्रप। कुन रेजिस्टेन्समा कुन करेन्ट, त्यो कनेक्सनले डिसाइड गर्छ।',
      lines: [['recall', <Pts items={[<>Shunt: <K>{String.raw`V = E_b + I_aR_a`}</K>, <K>{String.raw`I_L = I_a + I_{sh}`}</K></>, <>Series: <K>{String.raw`V = E_b + I_a(R_a + R_{se})`}</K></>, <>Long shunt: <K>{String.raw`V = E_b + I_a(R_a + R_{se})`}</K></>, <>Short shunt: <K>{String.raw`V = E_b + I_aR_a + I_LR_{se}`}</K></>]} />]],
      ask: {
        q: 'Long-shunt motor: V = 220 V, Ia = 40 A, Ra = 0.2 Ω, Rse = 0.05 Ω. Eb kati huncha?',
        voice: 'लङ शन्ट मोटर — भी टु ट्वेन्टी भोल्ट, आई ए फोर्टी एम्पियर, आर ए जिरो पोइन्ट टु ओम, आर एस ई जिरो पोइन्ट जिरो फाइभ ओम। ई बी कति हुन्छ?',
        options: ['210 V', '212 V', '218 V'],
        answer: 0,
        why: 'Long shunt: Eb = V − Ia(Ra + Rse) = 220 − 40 × 0.25 = 210 V. (212 V bhaye Rse birsiyo.)',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: Kirchhoff ko current law ra voltage equation V equals E b plus I a R a.',
      voice: 'स्मरण — किर्चफको करेन्ट ल, र भोल्टेज इक्वेसन, भी इक्वल्स ई बी प्लस आई ए आर ए।',
      lines: [['h', <>Voltage and current equations</>], rem(<>KCL at a node</>, <K>{String.raw`V = E_b + I_aR_a`}</K>)],
    },
    {
      say: 'Let: V supply voltage, I L line current, I a armature current, I sh ra I se field currents, ra R a, R sh, R se resistances.',
      voice: 'लेट — भी सप्लाई भोल्टेज, आई एल लाइन करेन्ट, आई ए आर्मेचर करेन्ट, आई एस एच र आई एस ई फिल्ड करेन्ट्स, र आर ए, आर एस एच, आर एस ई रेजिस्टेन्सेस।',
      lines: [['step', <Let items={[<>V = supply voltage (V)</>, <>I<sub>L</sub> = line current, I<sub>a</sub> = armature current (A)</>, <>I<sub>sh</sub>, I<sub>se</sub> = shunt and series field currents (A)</>, <>R<sub>a</sub>, R<sub>sh</sub>, R<sub>se</sub> = resistances (Ω)</>]} />]],
    },
    {
      say: 'Shunt motor: I L equals I a plus I sh, I sh equals V over R sh, ra V equals E b plus I a R a.',
      voice: 'शन्ट मोटर — आई एल इक्वल्स आई ए प्लस आई एस एच। आई एस एच इक्वल्स भी ओभर आर एस एच। र भी इक्वल्स ई बी प्लस आई ए आर ए।',
      lines: [['step', <><H>(i) Shunt motor</H><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} && \cdots(1) \\ I_{sh} &= \dfrac{V}{R_{sh}} && \cdots(2) \\ V &= E_b + I_aR_a && \cdots(3) \end{aligned}`}</K></>, undefined, { carry: <><K>{String.raw`V = E_b + I_aR_a \quad (3)`}</K></> }]],
    },
    {
      say: 'Series motor: I L equals I a equals I se, ra V equals E b plus I a times R a plus R se.',
      voice: 'सिरिज मोटर — आई एल इक्वल्स आई ए इक्वल्स आई एस ई। र भी इक्वल्स ई बी प्लस आई ए, टाइम्स आर ए प्लस आर एस ई।',
      lines: [['step', <><H>(ii) Series motor</H><K>{String.raw`\begin{aligned} I_L &= I_a \\ &= I_{se} && \cdots(4) \\ V &= E_b + I_a(R_a + R_{se}) && \cdots(5) \end{aligned}`}</K></>, undefined, { carry: <><K>{String.raw`V = E_b + I_a(R_a + R_{se}) \quad (5)`}</K></> }]],
      ask: {
        q: 'Series motor ma voltage equation kun ho?',
        voice: 'सिरिज मोटरमा भोल्टेज इक्वेसन कुन हो?',
        options: ['V = Eb + Ia(Ra + Rse)', 'V = Eb + IaRa', 'V = Eb − IaRse'],
        answer: 0,
        why: 'Armature ra series field dubai series ma: dubai ko drop add huncha.',
      },
    },
    {
      page: true,
      say: 'Long shunt compound: I L equals I a plus I sh, ra V equals E b plus I a times R a plus R se.',
      voice: 'लङ शन्ट कम्पाउन्ड — आई एल इक्वल्स आई ए प्लस आई एस एच। र भी इक्वल्स ई बी प्लस आई ए, टाइम्स आर ए प्लस आर एस ई।',
      lines: [['step', <><H>(iii) Long-shunt compound</H><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} && \cdots(6) \\ V &= E_b + I_a(R_a + R_{se}) && \cdots(7) \end{aligned}`}</K></>]],
    },
    {
      say: 'Short shunt compound: V equals E b plus I a R a plus I L R se.',
      voice: 'सर्ट शन्ट कम्पाउन्ड — भी इक्वल्स ई बी प्लस आई ए आर ए, प्लस आई एल आर एस ई।',
      lines: [['step', <><H>(iv) Short-shunt compound</H><K>{String.raw`\begin{aligned} V &= E_b + I_aR_a + I_LR_{se} && \cdots(8) \\ I_{sh} &= \dfrac{V - I_LR_{se}}{R_{sh}} && \cdots(9) \end{aligned}`}</K></>]],
    },
    {
      say: 'Equation nau ma shunt field across V minus I L R se huncha, kinaki shunt field series field ko drop pachi tap gariyeko cha.',
      voice: 'इक्वेसन नाइनमा, शन्ट फिल्ड अक्रस भी माइनस आई एल आर एस ई हुन्छ, किनकि शन्ट फिल्ड, सिरिज फिल्डको ड्रपपछि ट्याप गरिएको छ।',
      lines: [br('Voltage across the shunt field', <Pts items={[<>Long shunt: V (tapped at the supply)</>, <>Short shunt: V − I<sub>L</sub>R<sub>se</sub> (tapped after the series field)</>]} />)],
    },
    {
      page: true,
      say: 'Saransh: sabai motor ma V equals E b plus series drops; drop ma kun current, tyo connection anusar.',
      voice: 'सारांश — सबै मोटरमा भी इक्वल्स ई बी प्लस सिरिज ड्रप्स। ड्रपमा कुन करेन्ट, त्यो कनेक्सन अनुसार।',
      lines: [['recall', <Pts items={[<>Shunt: <K>{String.raw`V = E_b + I_aR_a`}</K></>, <>Series and long shunt: <K>{String.raw`V = E_b + I_a(R_a + R_{se})`}</K></>, <>Short shunt: <K>{String.raw`V = E_b + I_aR_a + I_LR_{se}`}</K></>, <>Shunt: <K>{String.raw`I_L = I_a + I_{sh}`}</K>; series: <K>{String.raw`I_L = I_a`}</K></>]} />]],
      ask: {
        q: 'Short-shunt compound motor ma shunt field across kati voltage huncha?',
        voice: 'सर्ट शन्ट कम्पाउन्ड मोटरमा, शन्ट फिल्ड अक्रस कति भोल्टेज हुन्छ?',
        options: ['V − IL Rse', 'V', 'V − Ia Ra'],
        answer: 0,
        why: 'Shunt field series field ko drop IL Rse pachi tap gariyeko cha.',
      },
    },
  ],
});

/* ── Derivation: shunt motor characteristics ─────────────────────────── */
export const shunt42 = duo('Derivation: shunt motor characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 1: 2, 3: 3, 5: 5 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Yaad garau: T a, phi I a sanga proportional, ra N, V minus I a R a over phi sanga. Shunt motor ma field supply ko across cha, so flux almost constant.',
      voice: 'याद गरौं — टी ए, फाइ आई एसँग प्रोपोर्सनल, र एन, भी माइनस आई ए आर ए, ओभर फाइसँग। शन्ट मोटरमा फिल्ड सप्लाईको अक्रस छ, सो फ्लक्स अल्मोस्ट कन्स्टेन्ट।',
      lines: [['h', <>Shunt motor characteristics</>], rem(<K>{String.raw`T_a \propto \phi\,I_a`}</K>, <K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K>), ['step', <>Field across V → φ ≈ constant</>]],
    },
    {
      say: 'Flux kina constant? I sh equals V over R sh. V ra R sh dubai fixed, so I sh fixed ra flux fixed. Heavy load ma armature reaction le flux alikati weak garcha.',
      voice: 'फ्लक्स किन कन्स्टेन्ट? आई एस एच इक्वल्स भी ओभर आर एस एच। भी र आर एस एच दुवै फिक्स्ड, सो आई एस एच फिक्स्ड र फ्लक्स फिक्स्ड। हेभी लोडमा, आर्मेचर रियाक्सनले फ्लक्स अलिकति वीक गर्छ।',
      lines: [br('Why φ ≈ constant?', <Pts items={[<><K>{String.raw`I_{sh} = V/R_{sh}`}</K>: V and R<sub>sh</sub> fixed</>, <>∴ I<sub>sh</sub> and φ fixed at every load</>, <>Armature reaction weakens φ slightly at heavy load</>]} />)],
    },
    {
      say: 'Ta–Ia: T a, phi I a sanga proportional ra phi constant, so T a I a sanga directly increase huncha. Graph origin bata straight line.',
      voice: 'टी ए आई ए — टी ए, फाइ आई एसँग प्रोपोर्सनल र फाइ कन्स्टेन्ट, सो टी ए, आई एसँग डाइरेक्ट्ली इन्क्रिज हुन्छ। ग्राफ ओरिजिनबाट स्ट्रेट लाइन।',
      lines: [['step', <><span className="lbl">(i) Ta–Ia</span><K>{String.raw`\begin{aligned} T_a &\propto \phi\,I_a \\ T_a &\propto I_a \end{aligned}`}</K></>, undefined, { carry: <>(i) <K>{String.raw`T_a \propto I_a`}</K>: straight line</> }]],
      ask: {
        q: 'Shunt motor ko Ia double bhayo bhane Ta kati huncha?',
        voice: 'शन्ट मोटरको आई ए डबल भयो भने, टी ए कति हुन्छ?',
        options: ['Double', 'Char guna', 'Same'],
        answer: 0,
        why: 'φ constant: Ta ∝ Ia, tesaile Ta pani double.',
      },
    },
    {
      say: 'N–Ia: N, V minus I a R a over phi. Load increase huda I a R a drop alikati badhcha, so speed slightly decrease huncha: no-load N zero bata full-load N samma.',
      voice: 'एन आई ए — एन, भी माइनस आई ए आर ए, ओभर फाइ। लोड इन्क्रिज हुँदा आई ए आर ए ड्रप अलिकति बढ्छ, सो स्पिड स्लाइट्ली डिक्रिज हुन्छ — नो लोड एन जिरोबाट फुल लोड एनसम्म।',
      lines: [['step', <><span className="lbl">(ii) N–Ia</span><K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K> → falls slightly with load</>, undefined, { carry: <>(ii) N falls slightly</> }]],
    },
    {
      page: true,
      say: 'Slightly matra kina? I a R a drop V ko sano part ho. 220 volt, I a 20 ampere, R a 0.5 ohm ma drop 10 volt, arthat 4.5 percent matra.',
      voice: 'स्लाइट्ली मात्र किन? आई ए आर ए ड्रप, भीको सानो पार्ट हो। टु ट्वेन्टी भोल्ट, आई ए ट्वेन्टी एम्पियर, आर ए जिरो पोइन्ट फाइभ ओममा ड्रप टेन भोल्ट, अर्थात फोर पोइन्ट फाइभ पर्सेन्ट मात्र।',
      lines: [br('Why only slightly?', <Pts items={[<>I<sub>a</sub>R<sub>a</sub> is a small part of V</>, <>220 V, 20 A, 0.5 Ω: drop = 10 V ≈ 4.5 % of V</>, <>So E<sub>b</sub>, and N, fall by only a few percent</>]} />)],
    },
    {
      say: 'N–Ta: torque I a sanga proportional, so N–Ta curve pani N–Ia jastai almost flat. Shunt motor lai almost constant speed motor bhanincha.',
      voice: 'एन टी ए — टर्क आई एसँग प्रोपोर्सनल, सो एन टी ए कर्भ पनि एन आई ए जस्तै अल्मोस्ट फ्ल्याट। शन्ट मोटरलाई अल्मोस्ट कन्स्टेन्ट स्पिड मोटर भनिन्छ।',
      lines: [['step', <><span className="lbl">(iii) N–Ta</span>nearly flat, like N–Ia: a constant-speed motor</>]],
    },
    {
      page: true,
      say: 'Summary: Ta–Ia straight line, N–Ia ra N–Ta almost flat. So constant speed chahine kaam: lathe, fan, blower, centrifugal pump, paper making.',
      voice: 'सारांश — टी ए आई ए स्ट्रेट लाइन, एन आई ए र एन टी ए अल्मोस्ट फ्ल्याट। सो कन्स्टेन्ट स्पिड चाहिने काम — लेथ, फ्यान, ब्लोअर, सेन्ट्रिफ्युगल पम्प, पेपर मेकिङ।',
      lines: [['recall', <Pts items={[<>φ ≈ constant (<K>{String.raw`I_{sh} = V/R_{sh}`}</K>)</>, <>Ta–Ia: straight line through O</>, <>N–Ia, N–Ta: nearly flat (speed falls a few %)</>, <>Uses: lathes, fans, blowers, centrifugal pumps, paper making</>]} />]],
      ask: {
        q: 'Lathe machine ko lagi kun DC motor suitable huncha?',
        voice: 'लेथ मेसिनको लागि कुन डी सी मोटर सुटेबल हुन्छ?',
        options: ['Shunt motor', 'Series motor', 'Differential compound motor'],
        answer: 0,
        why: 'Lathe lai load change huda pani almost constant speed chahincha; shunt motor ko speed thorai matra ghatcha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: T a, phi I a sanga ra N, V minus I a R a over phi sanga proportional. Shunt motor ma I sh equals V over R sh constant, tesaile phi constant.',
      voice: 'स्मरण — टी ए, फाइ आई एसँग, र एन, भी माइनस आई ए आर ए ओभर फाइसँग प्रोपोर्सनल। शन्ट मोटरमा आई एस एच इक्वल्स भी ओभर आर एस एच कन्स्टेन्ट, त्यसैले फाइ कन्स्टेन्ट।',
      lines: [['h', <>Characteristics of a shunt motor</>], rem(<K>{String.raw`T_a \propto \phi\,I_a`}</K>, <K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K>), ['step', <><K>{String.raw`I_{sh} = V/R_{sh}`}</K> = constant, ∴ φ = constant</>]],
    },
    {
      say: 'V ra R sh dubai constant bhayeko le I sh constant; armature reaction ko sano demagnetising effect bahek flux load sanga change hudaina.',
      voice: 'भी र आर एस एच दुवै कन्स्टेन्ट भएकोले आई एस एच कन्स्टेन्ट। आर्मेचर रियाक्सनको सानो डिम्याग्नेटाइजिङ इफेक्ट बाहेक, फ्लक्स लोडसँग चेन्ज हुँदैन।',
      lines: [br('Flux of a shunt motor', <Pts items={[<>V and R<sub>sh</sub> constant → I<sub>sh</sub> constant</>, <>φ constant, except a slight fall due to armature reaction</>]} />)],
    },
    {
      say: 'Ta–Ia: phi constant bhayeko le T a, I a sanga proportional. Curve origin bata straight line.',
      voice: 'टी ए आई ए — फाइ कन्स्टेन्ट भएकोले, टी ए, आई एसँग प्रोपोर्सनल। कर्भ ओरिजिनबाट स्ट्रेट लाइन।',
      lines: [['step', <Pts items={[<>(i) Ta–Ia: <K>{String.raw`T_a \propto I_a`}</K>, a straight line through O</>]} />, undefined, { carry: <>(i) <K>{String.raw`T_a \propto I_a`}</K></> }]],
      ask: {
        q: 'Shunt motor ko Ta–Ia curve kasto huncha?',
        voice: 'शन्ट मोटरको टी ए आई ए कर्भ कस्तो हुन्छ?',
        options: ['Origin bata straight line', 'Parabola', 'Rectangular hyperbola'],
        answer: 0,
        why: 'φ constant: Ta ∝ Ia, origin bata straight line.',
      },
    },
    {
      say: 'N–Ia: N, V minus I a R a, over phi sanga proportional. I a R a sano bhayeko le speed load sanga slightly ghatcha.',
      voice: 'एन आई ए — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल। आई ए आर ए सानो भएकोले, स्पिड लोडसँग स्लाइट्ली घट्छ।',
      lines: [['step', <Pts items={[<>(ii) N–Ia: <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K>, falls slightly</>]} />, undefined, { carry: <>(ii) N falls slightly with I<sub>a</sub></> }]],
    },
    {
      page: true,
      say: 'Udaharan: 220 volt, I a 20 ampere, R a 0.5 ohm ma I a R a 10 volt, arthat V ko 4.5 percent matra; tesaile speed drop pani thorai.',
      voice: 'उदाहरण — टु ट्वेन्टी भोल्ट, आई ए ट्वेन्टी एम्पियर, आर ए जिरो पोइन्ट फाइभ ओममा, आई ए आर ए टेन भोल्ट — अर्थात भीको फोर पोइन्ट फाइभ पर्सेन्ट मात्र। त्यसैले स्पिड ड्रप पनि थोरै।',
      lines: [br('Size of the speed drop', <Pts items={[<>220 V, I<sub>a</sub> = 20 A, R<sub>a</sub> = 0.5 Ω → I<sub>a</sub>R<sub>a</sub> = 10 V</>, <>≈ 4.5 % of V → N falls only a few percent</>]} />)],
    },
    {
      say: 'N–Ta: N–Ia jastai almost flat; shunt motor lai constant speed motor bhanincha.',
      voice: 'एन टी ए — एन आई ए जस्तै अल्मोस्ट फ्ल्याट। शन्ट मोटरलाई कन्स्टेन्ट स्पिड मोटर भनिन्छ।',
      lines: [['step', <Pts items={[<>(iii) N–Ta: nearly flat (constant-speed motor)</>]} />]],
    },
    {
      page: true,
      say: 'Saransh: Ta–Ia straight line, N–Ia ra N–Ta almost flat. Applications: lathes, fans, blowers, centrifugal pumps ra paper making.',
      voice: 'सारांश — टी ए आई ए स्ट्रेट लाइन, एन आई ए र एन टी ए अल्मोस्ट फ्ल्याट। एप्लिकेसन्स — लेथ्स, फ्यान्स, ब्लोअर्स, सेन्ट्रिफ्युगल पम्प्स, र पेपर मेकिङ।',
      lines: [['recall', <Pts items={[<>φ constant</>, <>Ta–Ia: straight line through O</>, <>N–Ia and N–Ta: nearly flat</>, <>Uses: lathes, fans, blowers, centrifugal pumps, paper making</>]} />]],
      ask: {
        q: 'Shunt motor lai kasto speed motor bhanincha?',
        voice: 'शन्ट मोटरलाई कस्तो स्पिड मोटर भनिन्छ?',
        options: ['Almost constant speed motor', 'Variable speed motor', 'Zero speed motor'],
        answer: 0,
        why: 'No load dekhi full load samma speed thorai matra ghatcha.',
      },
    },
  ],
});

/* ── Derivation: series motor characteristics ────────────────────────── */
export const series42 = duo('Derivation: series motor characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 2: 1, 4: 3, 7: 4, 6: 5 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Yaad garau: T a, phi I a sanga ra N, E b over phi sanga proportional. Series motor ma field current nai I a, so saturation samma phi I a sanga proportional.',
      voice: 'याद गरौं — टी ए, फाइ आई एसँग, र एन, ई बी ओभर फाइसँग प्रोपोर्सनल। सिरिज मोटरमा फिल्ड करेन्ट नै आई ए, सो स्याचुरेसनसम्म फाइ, आई एसँग प्रोपोर्सनल।',
      lines: [['h', <>Series motor characteristics</>], rem(<K>{String.raw`T_a \propto \phi\,I_a`}</K>, <K>{String.raw`N \propto E_b/\phi`}</K>, <>Series motor: I<sub>se</sub> = I<sub>a</sub></>), ['step', <><K>{String.raw`\phi \propto I_a`}</K> (before saturation)</>]],
    },
    {
      say: 'Ta–Ia: T a, I a square sanga proportional, so curve parabola. Saturation pachi flux almost constant, ra curve straight line hunchha.',
      voice: 'टी ए आई ए — टी ए, आई ए स्क्वायरसँग प्रोपोर्सनल, सो कर्भ प्याराबोला। स्याचुरेसनपछि फ्लक्स अल्मोस्ट कन्स्टेन्ट, र कर्भ स्ट्रेट लाइन हुन्छ।',
      lines: [['step', <><span className="lbl">(i) Ta–Ia</span><K>{String.raw`T_a \propto I_a^2`}</K> (parabola); after saturation <K>{String.raw`T_a \propto I_a`}</K></>, undefined, { carry: <>(i) <K>{String.raw`T_a \propto I_a^2`}</K></> }]],
      ask: {
        q: 'Saturation agadi series motor ko Ia double bhaye Ta kati guna huncha?',
        voice: 'स्याचुरेसन अगाडि, सिरिज मोटरको आई ए डबल भए, टी ए कति गुना हुन्छ?',
        options: ['4 guna', '2 guna', 'Aadha'],
        answer: 0,
        why: 'Ta ∝ Ia², tesaile 2² = 4 guna. Saturation pachi bhane Ta ∝ Ia matra.',
      },
    },
    {
      say: 'I a square kaha bata? T a, phi I a sanga proportional, ra phi pani I a sanga. So T a, I a times I a, arthat I a square.',
      voice: 'आई ए स्क्वायर कहाँबाट? टी ए, फाइ आई एसँग प्रोपोर्सनल, र फाइ पनि आई एसँग। सो टी ए, आई ए टाइम्स आई ए, अर्थात आई ए स्क्वायर।',
      lines: [br('Why Ia²?', <K>{String.raw`\begin{aligned} T_a &\propto \textcolor{#1c7ed6}{\phi}\, I_a \\ &\propto \textcolor{#1c7ed6}{I_a}\, I_a \\ &= I_a^2 \end{aligned}`}</K>)],
    },
    {
      say: 'N–Ia: E b almost V nai rahancha tara phi I a sanga increase huncha. So N, one over I a sanga proportional: rectangular hyperbola.',
      voice: 'एन आई ए — ई बी अल्मोस्ट भी नै रहन्छ, तर फाइ आई एसँग इन्क्रिज हुन्छ। सो एन, वान ओभर आई एसँग प्रोपोर्सनल — रेक्ट्याङ्गुलर हाइपरबोला।',
      lines: [['step', <><span className="lbl">(ii) N–Ia</span><K>{String.raw`\begin{aligned} N &\propto \dfrac{E_b}{\phi} \\ &\propto \dfrac{1}{I_a} \end{aligned}`}</K></>, undefined, { carry: <>(ii) <K>{String.raw`N \propto 1/I_a`}</K></> }]],
    },
    {
      page: true,
      say: 'N–Ta: high torque ma low speed, low torque ma high speed. Variable speed ra high starting torque: traction, crane, hoist ra vacuum cleaner.',
      voice: 'एन टी ए — हाई टर्कमा लो स्पिड, लो टर्कमा हाई स्पिड। भेरिएबल स्पिड र हाई स्टार्टिङ टर्क — ट्र्याक्सन, क्रेन, होइस्ट र भ्याकुम क्लिनर।',
      lines: [['step', <><span className="lbl">(iii) N–Ta</span>high torque at low speed → traction, cranes, hoists, vacuum cleaners</>]],
    },
    {
      say: 'No load ma I a dherai low, phi pani dherai weak, so N dangerously high huncha. Centrifugal force le armature damage huna sakcha.',
      voice: 'नो लोडमा आई ए धेरै लो, फाइ पनि धेरै वीक, सो एन डेन्जरस्ली हाई हुन्छ। सेन्ट्रिफ्युगल फोर्सले आर्मेचर ड्यामेज हुन सक्छ।',
      lines: [['trap', <>No load: I<sub>a</sub> → 0, φ → 0, N → dangerously high: never start or run a series motor without load</>]],
      ask: {
        q: 'Series motor lai load bina kina chalaunu hudaina?',
        voice: 'सिरिज मोटरलाई लोड बिना किन चलाउनु हुँदैन?',
        options: ['Flux weak bhayera speed dangerously high huncha', 'Torque zero huncha', 'Field winding burn huncha'],
        answer: 0,
        why: 'No load ma Ia ra φ dubai low; N ∝ 1/φ, tesaile speed dangerously high huncha.',
      },
    },
    {
      page: true,
      say: 'Summary: T a, I a square sanga; N, one over I a sanga; high starting torque; ra load bina kahile pani nachalau. So series motor belt drive ma pani use hudaina.',
      voice: 'सारांश — टी ए, आई ए स्क्वायरसँग; एन, वान ओभर आई एसँग; हाई स्टार्टिङ टर्क; र लोड बिना कहिल्यै नचलाऊ। सो सिरिज मोटर बेल्ट ड्राइभमा पनि युज हुँदैन।',
      lines: [['recall', <Pts items={[<><K>{String.raw`\phi \propto I_a`}</K> → <K>{String.raw`T_a \propto I_a^2`}</K> (parabola)</>, <><K>{String.raw`N \propto 1/I_a`}</K> (rectangular hyperbola)</>, <>High starting torque: traction, cranes, hoists</>, <>Never on no load (not with a belt that can slip)</>]} />]],
      ask: {
        q: 'Series motor ma Ia double huda speed kati huncha (Eb almost constant)?',
        voice: 'सिरिज मोटरमा आई ए डबल हुँदा, स्पिड कति हुन्छ, ई बी अल्मोस्ट कन्स्टेन्ट भए?',
        options: ['Almost aadha', 'Double', 'Same'],
        answer: 0,
        why: 'N ∝ Eb/φ ra φ ∝ Ia: Ia double → φ double → N almost aadha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: T a, phi I a sanga, ra N, E b over phi sanga proportional. Series motor ma I se equals I a, ra saturation agadi phi I a sanga proportional.',
      voice: 'स्मरण — टी ए, फाइ आई एसँग, र एन, ई बी ओभर फाइसँग प्रोपोर्सनल। सिरिज मोटरमा आई एस ई इक्वल्स आई ए, र स्याचुरेसन अगाडि फाइ, आई एसँग प्रोपोर्सनल।',
      lines: [['h', <>Characteristics of a series motor</>], rem(<K>{String.raw`T_a \propto \phi\,I_a`}</K>, <K>{String.raw`N \propto E_b/\phi`}</K>), ['step', <>I<sub>se</sub> = I<sub>a</sub>; before saturation <K>{String.raw`\phi \propto I_a`}</K></>]],
    },
    {
      say: 'Ta–Ia: saturation agadi T a, I a square sanga proportional, parabola; saturation pachi T a, I a sanga.',
      voice: 'टी ए आई ए — स्याचुरेसन अगाडि टी ए, आई ए स्क्वायरसँग प्रोपोर्सनल, प्याराबोला। स्याचुरेसनपछि टी ए, आई एसँग।',
      lines: [['step', <Pts items={[<>(i) Ta–Ia: before saturation <K>{String.raw`T_a \propto I_a^2`}</K> (parabola); after saturation <K>{String.raw`T_a \propto I_a`}</K></>]} />, undefined, { carry: <>(i) <K>{String.raw`T_a \propto I_a^2`}</K></> }]],
      ask: {
        q: 'Saturation pachi series motor ma Ta kasari change huncha?',
        voice: 'स्याचुरेसनपछि, सिरिज मोटरमा टी ए कसरी चेन्ज हुन्छ?',
        options: ['Ia sanga proportional', 'Ia² sanga', 'Constant'],
        answer: 0,
        why: 'Saturation pachi φ almost constant, tesaile Ta ∝ Ia.',
      },
    },
    {
      say: 'Kina bhane T a, phi I a sanga ra phi, I a sanga proportional; tesaile T a, I a square sanga.',
      voice: 'किनभने टी ए, फाइ आई एसँग, र फाइ, आई एसँग प्रोपोर्सनल; त्यसैले टी ए, आई ए स्क्वायरसँग।',
      lines: [br('Proof of Ta ∝ Ia²', <K>{String.raw`\begin{aligned} T_a &\propto \phi I_a \\ &\propto I_a^2 \end{aligned}`}</K>)],
    },
    {
      say: 'N–Ia: N, E b over phi sanga ra phi, I a sanga; tesaile N, one over I a sanga: rectangular hyperbola.',
      voice: 'एन आई ए — एन, ई बी ओभर फाइसँग, र फाइ, आई एसँग। त्यसैले एन, वान ओभर आई एसँग — रेक्ट्याङ्गुलर हाइपरबोला।',
      lines: [['step', <Pts items={[<>(ii) N–Ia: <K>{String.raw`N \propto \dfrac{E_b}{\phi} \propto \dfrac{1}{I_a}`}</K>, a rectangular hyperbola</>]} />, undefined, { carry: <>(ii) <K>{String.raw`N \propto 1/I_a`}</K></> }]],
    },
    {
      page: true,
      say: 'N–Ta: high torque ma low speed. Applications: traction, cranes, hoists, vacuum cleaners, jaha high starting torque chahincha.',
      voice: 'एन टी ए — हाई टर्कमा लो स्पिड। एप्लिकेसन्स — ट्र्याक्सन, क्रेन्स, होइस्ट्स, भ्याकुम क्लिनर्स, जहाँ हाई स्टार्टिङ टर्क चाहिन्छ।',
      lines: [['step', <Pts items={[<>(iii) N–Ta: high torque at low speed</>, <>Uses: traction, cranes, hoists, vacuum cleaners</>]} />]],
    },
    {
      say: 'Note: no load ma I a ra phi dubai low, ra speed dangerously high huncha. Hence a series motor is never started without load.',
      voice: 'नोट — नो लोडमा आई ए र फाइ दुवै लो, र स्पिड डेन्जरस्ली हाई हुन्छ। हेन्स अ सिरिज मोटर इज नेभर स्टार्टेड विदाउट लोड।',
      lines: [['trap', <>At no load, I<sub>a</sub> and φ are small and N becomes dangerously high; a series motor is never started without load.</>]],
      ask: {
        q: 'Series motor lai no load ma kina start garinna?',
        voice: 'सिरिज मोटरलाई नो लोडमा किन स्टार्ट गरिन्न?',
        options: ['Flux weak bhayera speed dangerously high huncha', 'Starting torque zero huncha', 'Current zero huncha'],
        answer: 0,
        why: 'No load ma Ia ra φ low; N ∝ Eb/φ, tesaile speed dangerously high.',
      },
    },
    {
      page: true,
      say: 'Saransh: T a, I a square sanga; N, one over I a sanga; high starting torque; ra no load ma kahile pani start nagarne.',
      voice: 'सारांश — टी ए, आई ए स्क्वायरसँग; एन, वान ओभर आई एसँग; हाई स्टार्टिङ टर्क; र नो लोडमा कहिल्यै स्टार्ट नगर्ने।',
      lines: [['recall', <Pts items={[<><K>{String.raw`T_a \propto I_a^2`}</K> (parabola), then <K>{String.raw`T_a \propto I_a`}</K></>, <><K>{String.raw`N \propto 1/I_a`}</K> (rectangular hyperbola)</>, <>High starting torque: traction, cranes, hoists</>, <>Never started without load</>]} />]],
      ask: {
        q: 'Series motor ko N–Ia curve kasto huncha?',
        voice: 'सिरिज मोटरको एन आई ए कर्भ कस्तो हुन्छ?',
        options: ['Rectangular hyperbola', 'Straight line', 'Parabola'],
        answer: 0,
        why: 'N ∝ 1/Ia: rectangular hyperbola.',
      },
    },
  ],
});

/* ── Big picture (Lecturer only, point-wise, space by marks) ───────────── */
export const charsAnswer42 = answer('Model answer: shunt and series motor characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 1: 1, 3: 2, 5: 2, 2: 3, 7: 4, 4: 4, 6: 4 }),
  viewBox: '0 0 360 180',
  papers: ['2070 Magh'],
  marks: '[8]',
  q: 'Explain the torque–armature current and speed–torque characteristics of DC shunt and DC series motors.',
  read: {
    say: 'IOE 2070 Magh, aath marks: explain the torque–armature current I a and speed–torque characteristics of DC shunt and DC series motors. Shunt char marks, series char marks.',
    voice: 'आई ओ ई दुई हजार सत्तरी माघ, आठ मार्क्स — एक्सप्लेन द टर्क आर्मेचर करेन्ट आई ए एन्ड स्पिड टर्क क्यारेक्टरिस्टिक्स अफ डी सी शन्ट एन्ड डी सी सिरिज मोटर्स। शन्ट चार मार्क्स, सिरिज चार मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Shunt motor [4]</H><Pts items={[<>Field across V: <K>{String.raw`I_{sh} = V/R_{sh}`}</K>, ∴ φ = constant</>, <>Ta–Ia: <K>{String.raw`T_a \propto \phi I_a \propto I_a`}</K>, a straight line through O</>]} /></>,
      say: 'Shunt motor: field supply ko across, so phi constant. Ta–Ia: T a I a sanga proportional, origin bata straight line.',
      voice: 'शन्ट मोटर — फिल्ड सप्लाईको अक्रस, सो फाइ कन्स्टेन्ट। टी ए आई ए — टी ए, आई एसँग प्रोपोर्सनल, ओरिजिनबाट स्ट्रेट लाइन।',
    },
    {
      node: <><Pts items={[<>N–Ta: <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K>; I<sub>a</sub>R<sub>a</sub> is small, so N falls only slightly as T<sub>a</sub> rises</>, <>∴ nearly constant speed: lathes, fans, pumps</>]} /></>,
      say: 'N–Ta: N, V minus I a R a over phi sanga proportional. I a R a drop small bhayeko le torque increase huda speed slightly matra decrease huncha: almost constant speed.',
      voice: 'एन टी ए — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल। आई ए आर ए ड्रप स्मल भएकोले, टर्क इन्क्रिज हुँदा स्पिड स्लाइट्ली मात्र डिक्रिज हुन्छ — अल्मोस्ट कन्स्टेन्ट स्पिड।',
    },
    {
      page: true,
      node: <><H>(b) Series motor [4]</H><Pts items={[<>Field in series: <K>{String.raw`\phi \propto I_a`}</K> (before saturation)</>, <>Ta–Ia: <K>{String.raw`T_a \propto I_a^2`}</K>, a parabola; after saturation <K>{String.raw`T_a \propto I_a`}</K></>]} /></>,
      say: 'Series motor: field series ma, saturation agadi phi I a sanga proportional. Ta–Ia: T a I a square sanga, parabola; saturation pachi straight line.',
      voice: 'सिरिज मोटर — फिल्ड सिरिजमा, स्याचुरेसन अगाडि फाइ, आई एसँग प्रोपोर्सनल। टी ए आई ए — टी ए, आई ए स्क्वायरसँग, प्याराबोला। स्याचुरेसन पछि, स्ट्रेट लाइन।',
      ask: {
        q: 'Saturation agadi series motor ko Ta–Ia curve kasto huncha?',
        voice: 'स्याचुरेसन अगाडि, सिरिज मोटरको टी ए आई ए कर्भ कस्तो हुन्छ?',
        options: ['Parabola (Ta ∝ Ia²)', 'Straight line', 'Hyperbola'],
        answer: 0,
        why: 'φ ∝ I a, so T a ∝ φ I a ∝ I a².',
      },
    },
    {
      node: <><Pts items={[<>N–Ta: <K>{String.raw`N \propto 1/\phi \propto 1/I_a`}</K> and <K>{String.raw`T_a \propto I_a^2`}</K>, ∴ <K>{String.raw`N \propto 1/\sqrt{T_a}`}</K></>, <>High torque at low speed: traction, cranes</>, <>No load → N dangerously high; never run without load</>]} /></>,
      say: 'N–Ta: N one over I a sanga ra T a I a square sanga, tesaile N one over root T a sanga. High torque ma low speed. No load ma speed dangerously high, so load bina kahile pani nachalaune.',
      voice: 'एन टी ए — एन, वान ओभर आई एसँग, र टी ए, आई ए स्क्वायरसँग। त्यसैले एन, वान ओभर रुट टी एसँग। हाई टर्कमा लो स्पिड। नो लोडमा स्पिड डेन्जरस्ली हाई, सो लोड बिना कहिल्यै नचलाउने।',
    },
  ],
});

export const noLoad42 = answer('Model answer: why a series motor must not start without load', {
  // All three panels carry the series curves from the speed equation on (rule 74).
  draw: figAt(curvesFigure, { 0: 0, 2: 1, 4: 1, 7: 1, 6: 2 }),
  viewBox: '0 0 360 180',
  papers: ['2067 Mangsir', '2065 Chaitra', '2068 Bhadra'],
  marks: '',
  q: 'Why should a DC series motor never be started without load?',
  read: {
    say: 'IOE ma tin choti sodhiyeko: why should a DC series motor never be started without load?',
    voice: 'आई ओ ईमा तीन चोटि सोधिएको — ह्वाई सुड अ डी सी सिरिज मोटर नेभर बी स्टार्टेड विदाउट लोड?',
  },
  points: [
    {
      node: <><H>Speed equation</H><Pts items={[<><K>{String.raw`N \propto \dfrac{E_b}{\phi}`}</K></>, <>In a series motor <K>{String.raw`\phi \propto I_a`}</K>, ∴ <K>{String.raw`N \propto \dfrac{1}{I_a}`}</K> (approximately)</>]} /></>,
      say: 'Speed N, E b over phi sanga proportional. Series motor ma phi I a sanga proportional, so N almost one over I a sanga.',
      voice: 'स्पिड एन, ई बी ओभर फाइसँग प्रोपोर्सनल। सिरिज मोटरमा फाइ, आई एसँग प्रोपोर्सनल, सो एन अल्मोस्ट, वान ओभर आई एसँग।',
    },
    {
      node: <><H>At no load</H><Pts items={[<>I<sub>a</sub> is very small → φ is very small</>, <>∴ N rises to a dangerously high value</>]} /></>,
      say: 'No load ma I a very low, so phi pani very weak, ra speed dangerously high pugcha.',
      voice: 'नो लोडमा आई ए भेरी लो, सो फाइ पनि भेरी वीक, र स्पिड डेन्जरस्ली हाई पुग्छ।',
      ask: {
        q: 'No load ma series motor ko speed kina dangerously high huncha?',
        voice: 'नो लोडमा सिरिज मोटरको स्पिड किन डेन्जरस्ली हाई हुन्छ?',
        options: ['I a ra phi dubai low hunchan', 'E b zero huncha', 'R a increase huncha'],
        answer: 0,
        why: 'φ ∝ I a; I a low bhaye φ weak, ra N ∝ E b/φ dangerously high.',
      },
    },
    {
      node: <><H>Result</H><Pts items={[<>Large centrifugal forces can damage the armature winding and commutator</>, <>Hence it is always started with load, coupled directly or by gears, never by a belt (a belt may slip off)</>]} /></>,
      say: 'Yesto speed ma centrifugal force le armature winding ra commutator damage huncha. Hence series motor sadhai load sanga start garincha, direct wa gear le jodera, belt le kahile pani hoina, kinaki belt slip huna sakcha.',
      voice: 'यस्तो स्पिडमा, सेन्ट्रिफ्युगल फोर्सले आर्मेचर वाइन्डिङ र कम्युटेटर ड्यामेज हुन्छ। हेन्स सिरिज मोटर सधैं लोडसँग स्टार्ट गरिन्छ — डाइरेक्ट वा गियरले जोडेर, बेल्टले कहिल्यै होइन, किनकि बेल्ट खस्किन सक्छ।',
    },
  ],
});

export const seriesSolve42 = answer('IOE 2069 Bhadra: current of a series motor', {
  papers: ['2069 Bhadra', '2066 Magh'],
  marks: '[8]',
  q: 'A 220 V series motor, Ra = 0.06 Ω, Rse = 0.04 Ω, takes 25 A at 1200 rpm. Find the current at 800 rpm (unsaturated field).',
  read: {
    say: 'IOE 2069 Bhadra ra 2066 Magh, aath marks: 220 volt series motor, R a 0.06 ohm, R se 0.04 ohm, 25 ampere ma 1200 rpm. 800 rpm ma current kati?',
    voice: 'आई ओ ई दुई हजार उनान्सत्तरी भदौ र दुई हजार छयासठ्ठी माघ, आठ मार्क्स — टु ट्वेन्टी भोल्ट सिरिज मोटर, आर ए जिरो पोइन्ट जिरो सिक्स ओम, आर एस ई जिरो पोइन्ट जिरो फोर ओम, ट्वेन्टी फाइभ एम्पियरमा ट्वेल्भ हन्ड्रेड आर पी एम। एट हन्ड्रेड आर पी एममा करेन्ट कति?',
  },
  points: [
    {
      node: <><H>Given</H><Pts items={[<>V = 220 V, R<sub>a</sub> + R<sub>se</sub> = 0.1 Ω</>, <>I<sub>1</sub> = 25 A, N<sub>1</sub> = 1200 rpm, N<sub>2</sub> = 800 rpm</>, <>Unsaturated: φ ∝ I</>]} /></>,
      say: 'Given: V 220 volt, R a plus R se 0.1 ohm, I ek 25 ampere, N ek 1200 rpm, N dui 800 rpm. Unsaturated bhayeko le phi I sanga proportional.',
      voice: 'गिभन — भी टु ट्वेन्टी भोल्ट, आर ए प्लस आर एस ई जिरो पोइन्ट वान ओम। आई वान ट्वेन्टी फाइभ एम्पियर, एन वान ट्वेल्भ हन्ड्रेड, एन टु एट हन्ड्रेड आर पी एम। अनस्याचुरेटेड भएकोले, फाइ, आईसँग प्रोपोर्सनल।',
    },
    {
      node: <><H>Solution</H><K>{String.raw`\begin{aligned} E_{b1} &= 220 - 25(0.1) \\ &= 217.5\ \text{V} \\ E_{b2} &= 220 - 0.1\,I_2 \end{aligned}`}</K></>,
      say: 'E b ek equals 220 minus 25 times 0.1, arthat 217.5 volt. E b dui equals 220 minus 0.1 I dui.',
      voice: 'ई बी वान इक्वल्स — टु ट्वेन्टी माइनस ट्वेन्टी फाइभ टाइम्स जिरो पोइन्ट वान, अर्थात टु सेभेन्टिन पोइन्ट फाइभ भोल्ट। ई बी टु इक्वल्स — टु ट्वेन्टी माइनस जिरो पोइन्ट वान आई टु।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \dfrac{N_2}{N_1} &= \dfrac{E_{b2}}{E_{b1}} \times \dfrac{I_1}{I_2} \\ \dfrac{800}{1200} &= \dfrac{220 - 0.1\,I_2}{217.5} \times \dfrac{25}{I_2} \end{aligned}`}</K></>,
      say: 'N dui over N ek equals E b dui over E b ek, times I ek over I dui. Values halda 800 over 1200 equals 220 minus 0.1 I dui, over 217.5, times 25 over I dui.',
      voice: 'एन टु ओभर एन वान इक्वल्स — ई बी टु ओभर ई बी वान, टाइम्स आई वान ओभर आई टु। भ्यालु हाल्दा — एट हन्ड्रेड ओभर ट्वेल्भ हन्ड्रेड इक्वल्स, टु ट्वेन्टी माइनस जिरो पोइन्ट वान आई टु, ओभर टु सेभेन्टिन पोइन्ट फाइभ, टाइम्स ट्वेन्टी फाइभ ओभर आई टु।',
    },
    {
      page: true,
      node: <><K>{String.raw`\begin{aligned} 145\,I_2 &= 5500 - 2.5\,I_2 \\ 147.5\,I_2 &= 5500 \\ I_2 &= \boxed{37.3\ \text{A}} \end{aligned}`}</K></>,
      say: 'Cross multiply garda 145 I dui equals 5500 minus 2.5 I dui. Arthat 147.5 I dui equals 5500, ra I dui equals 37.3 ampere.',
      voice: 'क्रस मल्टिप्लाई गर्दा — वान फोर्टी फाइभ आई टु इक्वल्स, फिफ्टी फाइभ हन्ड्रेड माइनस टु पोइन्ट फाइभ आई टु। अर्थात वान फोर्टी सेभेन पोइन्ट फाइभ आई टु इक्वल्स फिफ्टी फाइभ हन्ड्रेड, र आई टु इक्वल्स थर्टी सेभेन पोइन्ट थ्री एम्पियर।',
      ask: {
        q: 'Series motor ko speed 1200 bata 800 rpm ma jharda current kina badhyo?',
        voice: 'सिरिज मोटरको स्पिड ट्वेल्भ हन्ड्रेडबाट एट हन्ड्रेड आर पी एममा झर्दा, करेन्ट किन बढ्यो?',
        options: ['N ∝ 1/I: low speed bhaneko high current (heavy load)', 'E b increase bhayo', 'R a decrease bhayo'],
        answer: 0,
        why: 'Series motor ma N ∝ 1/I (approx.); speed decrease hunu bhaneko load ra current increase hunu.',
      },
    },
  ],
});

/* ── 4.3 Model answer: suitability of series, shunt and compound motors ── */
// 2067 Mangsir (Question Bank part 12): "Explain with reason, the suitability
// of DC series, DC shunt and DC compound motors. Identify suitable DC motor
// for the following application: i) Electric traction ii) Vacuum cleaner
// iii) Paper making iv) Shearing and punching". Marks not shown in the paper.
// curvesFigure: every panel filled (rule 74): shunt curves on point 0, series curves + no-load mark on point 1.
export const suitability43 = answer('Model answer: suitability of DC series, shunt and compound motors', {
  draw: figAt(curvesFigure, { 0: 0, 1: 0, 3: 0, 5: 0, 2: 1, 4: 1, 7: 1, 6: 1 }),
  viewBox: '0 0 360 180',
  papers: ['2067 Mangsir'],
  marks: '',
  q: 'Explain with reason, the suitability of DC series, DC shunt and DC compound motors. Identify suitable DC motor for the following application: i) Electric traction ii) Vacuum cleaner iii) Paper making iv) Shearing and punching.',
  read: {
    say: 'IOE 2067 Mangsir: DC series, shunt ra compound motor ko suitability karan sahit, ani char ota application ko lagi suitable motor.',
    voice: 'आई ओ ई दुई हजार सतसट्ठी मंसिर — डी सी सिरिज, शन्ट र कम्पाउन्ड मोटरको सुटेबिलिटी कारणसहित, अनि चार ओटा एप्लिकेसनको लागि सुटेबल मोटर।',
  },
  points: [
    {
      carry: <>(a) Shunt: near-constant speed</>,
      node: <><H>(a) Suitability with reason</H><Pts items={[<><b>Shunt motor:</b> φ ≈ constant, so N falls only slightly with load (Fig. 1)</>, <>Suitable where a nearly constant speed is needed</>]} /></>,
      say: 'Shunt motor: flux almost constant, so load increase huda speed slightly matra decrease huncha. Almost constant speed chahine thau ma suitable.',
      voice: 'शन्ट मोटर — फ्लक्स अल्मोस्ट कन्स्टेन्ट, सो लोड इन्क्रिज हुँदा स्पिड स्लाइट्ली मात्र डिक्रिज हुन्छ। अल्मोस्ट कन्स्टेन्ट स्पिड चाहिने ठाउँमा सुटेबल।',
    },
    {
      carry: <>(a) Series: high starting torque, never on no load</>,
      node: <><Pts items={[<><b>Series motor:</b> φ ∝ I<sub>a</sub>, so <K>{String.raw`T_a \propto I_a^2`}</K>: very high starting torque</>, <>Speed falls sharply with load; dangerous speed on no load</>, <>Suitable for heavy starting loads that are never removed</>]} /></>,
      say: 'Series motor: flux I a sanga increase huncha, so T a I a squared sanga proportional ra starting torque very high. Load increase huda speed sharply decrease huncha, ra no load ma speed dangerously high.',
      voice: 'सिरिज मोटर — फ्लक्स आई एसँग इन्क्रिज हुन्छ, सो टी ए, आई ए स्क्वायरसँग प्रोपोर्सनल र स्टार्टिङ टर्क भेरी हाई। लोड इन्क्रिज हुँदा स्पिड सार्प्ली डिक्रिज हुन्छ, र नो लोडमा स्पिड डेन्जरस्ली हाई।',
    },
    {
      carry: <>(a) Cumulative compound: high torque + limited no-load speed</>,
      node: <><Pts items={[<><b>Cumulative compound motor:</b> φ = φ<sub>sh</sub> + φ<sub>se</sub></>, <>High starting torque like series, safe no-load speed like shunt</>, <>Suitable for sudden heavy loads (with a flywheel)</>]} /></>,
      say: 'Cumulative compound motor: dubai field ko flux jodincha. Series jastai high starting torque, ra shunt jastai no load ma pani safe speed. Sudden heavy load ma, flywheel sanga suitable.',
      voice: 'क्युमुलेटिभ कम्पाउन्ड मोटर — दुवै फिल्डको फ्लक्स जोडिन्छ। सिरिज जस्तै हाई स्टार्टिङ टर्क, र शन्ट जस्तै नो लोडमा पनि सेफ स्पिड। सडन हेभी लोडमा, फ्लाइह्विलसँग सुटेबल।',
    },
    {
      page: true,
      node: <><H>(b) Suitable motor for each application</H><Pts items={[<>(i) Electric traction: <b>DC series motor</b> (very high starting torque)</>, <>(ii) Vacuum cleaner: <b>DC series (universal) motor</b> (high speed, always loaded by the fan)</>]} /></>,
      say: 'Application: electric traction ko lagi DC series motor, kinaki starting torque very high. Vacuum cleaner ko lagi series, arthat universal motor: high speed, ra fan le sadhai load dincha.',
      voice: 'एप्लिकेसन — इलेक्ट्रिक ट्र्याक्सनको लागि डी सी सिरिज मोटर, किनकि स्टार्टिङ टर्क भेरी हाई। भ्याकुम क्लिनरको लागि सिरिज, अर्थात युनिभर्सल मोटर — हाई स्पिड, र फ्यानले सधैं लोड दिन्छ।',
    },
    {
      node: <><Pts items={[<>(iii) Paper making: <b>DC shunt motor</b> (nearly constant speed)</>, <>(iv) Shearing and punching: <b>cumulative compound motor</b> (high torque for sudden loads, with a flywheel)</>]} /></>,
      say: 'Paper making ko lagi DC shunt motor, kinaki speed almost constant chahincha. Shearing ra punching ko lagi cumulative compound motor: sudden heavy load ko lagi high torque.',
      voice: 'पेपर मेकिङको लागि डी सी शन्ट मोटर, किनकि स्पिड अल्मोस्ट कन्स्टेन्ट चाहिन्छ। सियरिङ र पन्चिङको लागि क्युमुलेटिभ कम्पाउन्ड मोटर — सडन हेभी लोडको लागि हाई टर्क।',
      ask: {
        q: 'Electric traction ko lagi kun DC motor suitable huncha?',
        voice: 'इलेक्ट्रिक ट्र्याक्सनको लागि कुन डी सी मोटर सुटेबल हुन्छ?',
        options: ['DC series motor', 'DC shunt motor', 'Differential compound motor'],
        answer: 0,
        why: 'Series motor ko starting torque very high huncha (Ta ∝ Ia² before saturation).',
      },
    },
  ],
});
