import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { curvesFigure, typesFigure } from './figs.jsx';

/*
  4.2 Types of DC motor, characteristics and applications. Opener, Terms and
  Derivation told by the Tutor (default) and the Lecturer (variant) over the
  book figures (Fig. 2 excitation, Fig. 3 characteristics); Big picture: the
  three past questions, answered point-wise by the Lecturer, space by marks.
  Numbers recomputed: 2069 Bhadra series motor, I2 = 5500/147.5 = 37.29 A.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

export const opener42 = duo('4.2 ma k padhne?', {
  draw: typesFigure,
  viewBox: '0 0 360 270',
  tutor: [
    {
      say: 'Unit 4.2: DC motor ka types, characteristics ra applications. Field winding kasari jodincha, tyasle motor ko swabhav nai badlincha.',
      voice: 'युनिट फोर पोइन्ट टु — डीसी मोटरका टाइप्स, क्यारेक्टरिस्टिक्स र एप्लिकेसन्स। फिल्ड वाइन्डिङ कसरी जोडिन्छ, त्यसले मोटरको स्वभाव नै बदलिन्छ।',
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
      voice: 'अन्तिममा, आइओईका तीन क्वेस्चन — क्यारेक्टरिस्टिक्सको थ्योरी, सिरिज मोटरलाई लोड बिना किन स्टार्ट नगर्ने, र एउटा सिरिज मोटर न्युमेरिकल।',
      lines: [['hook', <>IOE: characteristics [8] · series motor on no load · series numerical [8]</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.2: types of DC motor, their performance characteristics and applications.',
      voice: 'युनिट फोर पोइन्ट टु — टाइप्स अफ डीसी मोटर, देयर परफर्मेन्स क्यारेक्टरिस्टिक्स, एन्ड एप्लिकेसन्स।',
      lines: [['h', <>Unit 4.2</>], ['step', <>Types, characteristics and applications</>]],
    },
    {
      say: 'Syllabus ko pahilo bhag: method of excitation ra types of DC motor.',
      voice: 'सिलेबसको पहिलो भाग — मेथड अफ एक्साइटेसन, र टाइप्स अफ डीसी मोटर।',
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
export const types42 = duo('Excitation ra DC motor ka types', {
  draw: typesFigure,
  viewBox: '0 0 360 270',
  tutor: [
    {
      say: 'Field winding lai current dinu nai excitation ho. Separately excited motor ma field lai chhuttai supply V f bata current aaucha.',
      voice: 'फिल्ड वाइन्डिङलाई करेन्ट दिनु नै एक्साइटेसन हो। सेपरेटली एक्साइटेड मोटरमा, फिल्डलाई छुट्टै सप्लाई भी एफबाट करेन्ट आउँछ।',
      lines: [['h', <>Methods of excitation</>], ['step', <>(a) Separately excited: field from its own supply V<sub>f</sub></>]],
    },
    {
      say: 'Shunt motor ma field armature sanga parallel ma jodincha. Field ma pura V lagcha, tesaile flux lagbhag constant rahancha.',
      voice: 'शन्ट मोटरमा, फिल्ड आर्मेचरसँग प्याराललमा जोडिन्छ। फिल्डमा पूरा भी लाग्छ, त्यसैले फ्लक्स लगभग कन्स्टेन्ट रहन्छ।',
      lines: [['step', <>(b) Shunt: field across the supply → φ ≈ constant</>]],
      ask: {
        q: 'Shunt motor ma field winding armature sanga kasari jodiyeko huncha?',
        voice: 'शन्ट मोटरमा, फिल्ड वाइन्डिङ आर्मेचरसँग कसरी जोडिएको हुन्छ?',
        options: ['Parallel ma', 'Series ma', 'Jodiyeko hudaina'],
        answer: 0,
        why: 'Shunt bhaneko parallel: field supply ko dubai terminal ma jodincha.',
      },
    },
    {
      say: 'Series motor ma field armature sanga series ma huncha, tesaile sampurna armature current field bata bagcha. Flux armature current sanga badhcha.',
      voice: 'सिरिज मोटरमा, फिल्ड आर्मेचरसँग सिरिजमा हुन्छ, त्यसैले सम्पूर्ण आर्मेचर करेन्ट फिल्डबाट बग्छ। फ्लक्स, आर्मेचर करेन्टसँग बढ्छ।',
      lines: [['step', <>(c) Series: field in series → <K>{String.raw`\phi \propto I_a`}</K> (before saturation)</>]],
    },
    {
      say: 'Compound motor ma dubai field hunchan: shunt ra series. Figure ma long shunt cha, jasma shunt field series field ra armature dubai ko parallel ma cha.',
      voice: 'कम्पाउन्ड मोटरमा दुवै फिल्ड हुन्छन् — शन्ट र सिरिज। फिगरमा लङ शन्ट छ, जसमा शन्ट फिल्ड, सिरिज फिल्ड र आर्मेचर दुवैको प्याराललमा छ।',
      lines: [['step', <>(d) Compound: shunt + series field (long shunt shown)</>]],
    },
    {
      say: 'Short shunt ma bhane shunt field armature ko matra parallel ma huncha. Dubai field ko flux jodiye cumulative, ghatiye differential compound.',
      voice: 'सर्ट शन्टमा भने, शन्ट फिल्ड आर्मेचरको मात्र प्याराललमा हुन्छ। दुवै फिल्डको फ्लक्स जोडिए क्युमुलेटिभ, घटिए डिफरेन्सियल कम्पाउन्ड।',
      lines: [['step', <>Short shunt: shunt field across the armature only · cumulative (fluxes add) or differential (oppose)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Excitation: field winding lai current dine tarika. Separately excited motor ma field winding chhuttai DC source V f bata excite huncha.',
      voice: 'एक्साइटेसन — फिल्ड वाइन्डिङलाई करेन्ट दिने तरिका। सेपरेटली एक्साइटेड मोटरमा, फिल्ड वाइन्डिङ छुट्टै डीसी सोर्स भी एफबाट एक्साइट हुन्छ।',
      lines: [['h', <>Methods of excitation (Fig. 2)</>], ['step', <><Pts items={[<>(a) Separately excited: field fed from a separate DC source V<sub>f</sub></>]} /></>]],
    },
    {
      say: 'Self-excited, shunt: field winding armature ko parallel ma, supply ko across. Shunt field ma dherai turns ra high resistance huncha.',
      voice: 'सेल्फ एक्साइटेड, शन्ट — फिल्ड वाइन्डिङ आर्मेचरको प्यारालालमा, सप्लाईको अक्रस। शन्ट फिल्डमा धेरै टर्न्स र हाई रेजिस्टेन्स हुन्छ।',
      lines: [['step', <><Pts items={[<>(b) Shunt: field in parallel with the armature; many turns, high R<sub>sh</sub></>, <><K>{String.raw`I_L = I_a + I_{sh}`}</K></>]} /></>]],
      ask: {
        q: 'Shunt motor ma line current kati huncha?',
        voice: 'शन्ट मोटरमा लाइन करेन्ट कति हुन्छ?',
        options: ['Ia + Ish', 'Ia matra', 'Ia − Ish'],
        answer: 0,
        why: 'Line current dui branch ma bandincha: armature ra shunt field.',
      },
    },
    {
      say: 'Series: field winding armature sanga series ma, thorai turns ra moto taar, low resistance. I L equals I a equals I se.',
      voice: 'सिरिज — फिल्ड वाइन्डिङ आर्मेचरसँग सिरिजमा, थोरै टर्न्स र मोटो तार, लो रेजिस्टेन्स। आई एल इक्वल्स आई ए इक्वल्स आई एस ई।',
      lines: [['step', <><Pts items={[<>(c) Series: field in series; few turns, thick wire, low R<sub>se</sub></>, <><K>{String.raw`I_L = I_a = I_{se}`}</K></>]} /></>]],
    },
    {
      say: 'Compound: shunt ra series dubai field. Long shunt ma shunt field armature ra series field dubai ko across huncha.',
      voice: 'कम्पाउन्ड — शन्ट र सिरिज दुवै फिल्ड। लङ शन्टमा, शन्ट फिल्ड आर्मेचर र सिरिज फिल्ड दुवैको अक्रस हुन्छ।',
      lines: [['step', <><Pts items={[<>(d) Compound: both fields; long shunt: shunt field across armature + series field</>]} /></>]],
    },
    {
      say: 'Short shunt ma shunt field armature ko matra across huncha. Fluxes aiding bhaye cumulative compound, opposing bhaye differential compound.',
      voice: 'सर्ट शन्टमा, शन्ट फिल्ड आर्मेचरको मात्र अक्रस हुन्छ। फ्लक्सेस एडिङ भए क्युमुलेटिभ कम्पाउन्ड, अपोजिङ भए डिफरेन्सियल कम्पाउन्ड।',
      lines: [['step', <><Pts items={[<>Short shunt: shunt field across the armature only</>, <>Cumulative: fluxes aid · differential: fluxes oppose</>]} /></>]],
    },
  ],
});

/* ── Terms: what a characteristic is ─────────────────────────────────── */
// curvesFigure: 0 axes · 1 shunt Ta–Ia · 2 series Ta–Ia · 3 shunt N–Ia ·
// 4 series N–Ia · 5 shunt N–Ta · 6 no-load mark · 7 series N–Ta.
export const chars42 = duo('Characteristics k ho: Ta–Ia, N–Ia, N–Ta', {
  draw: figAt(curvesFigure, { 0: 0 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Characteristic bhaneko euta quantity arko sanga kasari badlincha bhanne graph. Motor ko lagi tin ota mukhya chan.',
      voice: 'क्यारेक्टरिस्टिक भनेको, एउटा क्वान्टिटी अर्कोसँग कसरी बदलिन्छ भन्ने ग्राफ। मोटरको लागि तीनवटा मुख्य छन्।',
      lines: [['h', <>Performance characteristics</>], ['step', <>Three graphs: Ta–Ia · N–Ia · N–Ta</>]],
    },
    {
      say: 'Ta–Ia lai electrical characteristic bhanincha: current badhda torque kati badhcha. Yesko adhar T a phi I a sanga proportional.',
      voice: 'टी ए आई एलाई इलेक्ट्रिकल क्यारेक्टरिस्टिक भनिन्छ — करेन्ट बढ्दा टर्क कति बढ्छ। यसको आधार — टी ए, फाइ आई एसँग प्रोपोर्सनल।',
      lines: [['step', <>(i) Ta–Ia (electrical): <K>{String.raw`T_a \propto \phi\,I_a`}</K></>]],
    },
    {
      say: 'N–Ia le load current badhda speed kasari badlincha dekhaucha. Adhar N, E b over phi sanga proportional.',
      voice: 'एन आई एले, लोड करेन्ट बढ्दा स्पिड कसरी बदलिन्छ देखाउँछ। आधार — एन, ई बी ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['step', <>(ii) N–Ia: <K>{String.raw`N \propto \dfrac{E_b}{\phi} = \dfrac{V - I_aR_a}{\phi}`}</K></>]],
    },
    {
      say: 'N–Ta lai mechanical characteristic bhanincha, kinaki load le maagne torque ma motor kati speed dincha bhanne yesle batauncha.',
      voice: 'एन टी एलाई मेकानिकल क्यारेक्टरिस्टिक भनिन्छ, किनकि लोडले माग्ने टर्कमा मोटर कति स्पिड दिन्छ भन्ने यसले बताउँछ।',
      lines: [['step', <>(iii) N–Ta (mechanical): speed at each load torque</>]],
      ask: {
        q: 'Shunt motor ma phi constant bhaye, T a ra I a ko sambandha kasto huncha?',
        voice: 'शन्ट मोटरमा फाइ कन्स्टेन्ट भए, टी ए र आई एको सम्बन्ध कस्तो हुन्छ?',
        options: ['Ta ∝ Ia (straight line)', 'Ta ∝ Ia²', 'Ta ∝ 1/Ia'],
        answer: 0,
        why: 'T a ∝ φ I a; φ constant bhaye T a ∝ I a, seedha line.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Performance characteristics: motor ko torque ra speed armature current sanga kasari badlinchan, tyo dekhaune curves.',
      voice: 'परफर्मेन्स क्यारेक्टरिस्टिक्स — मोटरको टर्क र स्पिड, आर्मेचर करेन्टसँग कसरी बदलिन्छन्, त्यो देखाउने कर्भ्स।',
      lines: [['h', <>Characteristics of DC motors</>], ['step', <><Pts items={[<>Curves of torque and speed against armature current (Fig. 3)</>]} /></>]],
    },
    {
      say: 'Ta–Ia curve lai electrical characteristic bhanincha. Equation T a phi I a sanga proportional.',
      voice: 'टी ए आई ए कर्भलाई इलेक्ट्रिकल क्यारेक्टरिस्टिक भनिन्छ। इक्वेसन — टी ए, फाइ आई एसँग प्रोपोर्सनल।',
      lines: [['step', <><Pts items={[<>(i) Ta–Ia, electrical characteristic: <K>{String.raw`T_a \propto \phi I_a`}</K></>]} /></>]],
    },
    {
      say: 'N–Ia curve speed equation bata aaucha: N, V minus I a R a, over phi sanga proportional.',
      voice: 'एन आई ए कर्भ, स्पिड इक्वेसनबाट आउँछ — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['step', <><Pts items={[<>(ii) N–Ia, speed characteristic: <K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K></>]} /></>]],
    },
    {
      say: 'N–Ta curve lai mechanical characteristic bhanincha. Kun load ko lagi kun motor bhanne chayan yasaibata garincha.',
      voice: 'एन टी ए कर्भलाई मेकानिकल क्यारेक्टरिस्टिक भनिन्छ। कुन लोडको लागि कुन मोटर भन्ने छनोट, यसैबाट गरिन्छ।',
      lines: [['step', <><Pts items={[<>(iii) N–Ta, mechanical characteristic: decides the application</>]} /></>]],
      ask: {
        q: 'Kun characteristic lai mechanical characteristic bhanincha?',
        voice: 'कुन क्यारेक्टरिस्टिकलाई मेकानिकल क्यारेक्टरिस्टिक भनिन्छ?',
        options: ['N–Ta', 'Ta–Ia', 'Eb–N'],
        answer: 0,
        why: 'Speed ra torque dubai mechanical quantity: N–Ta mechanical characteristic.',
      },
    },
  ],
});

/* ── Derivation: voltage and current equations ───────────────────────── */
export const equations42 = duo('Derivation: voltage ra current equations', {
  draw: figAt(typesFigure, { 1: 0, 2: 1, 3: 2 }),
  viewBox: '0 0 360 270',
  tutor: [
    {
      say: 'Shunt motor bata suru garau. Line current dui bata bandincha: armature tira I a ra field tira I sh.',
      voice: 'शन्ट मोटरबाट सुरु गरौं। लाइन करेन्ट दुईतिर बाँडिन्छ — आर्मेचरतिर आई ए, र फिल्डतिर आई एस एच।',
      lines: [['h', <>Voltage and current equations</>], ['step', tex(String.raw`\begin{aligned} I_L &= I_a + I_{sh} \\ I_{sh} &= \dfrac{V}{R_{sh}} \\ V &= E_b + I_aR_a \end{aligned}`)]],
    },
    {
      say: 'Series motor ma eutai bato cha, tesaile eutai current. Tara V le aba R a ra R se dubai ko drop tirnu parcha.',
      voice: 'सिरिज मोटरमा एउटै बाटो छ, त्यसैले एउटै करेन्ट। तर भीले अब, आर ए र आर एस ई दुवैको ड्रप तिर्नुपर्छ।',
      lines: [['step', tex(String.raw`\begin{aligned} I_L &= I_a \\ &= I_{se} \\ V &= E_b + I_a(R_a + R_{se}) \end{aligned}`)]],
      ask: {
        q: 'Series motor: V 220 V, I a 20 A, R a plus R se 0.5 ohm. E b kati?',
        voice: 'सिरिज मोटर — भी टु ट्वेन्टी भोल्ट, आई ए ट्वेन्टी एम्पियर, आर ए प्लस आर एस ई जिरो पोइन्ट फाइभ ओम। ई बी कति?',
        options: ['210 V', '220 V', '200 V'],
        answer: 0,
        why: 'E b = 220 − 20 × 0.5 = 210 V.',
      },
    },
    {
      say: 'Long shunt compound ma armature current series field bata pani jaancha. Tesaile drop I a times R a plus R se, ra I sh equals V over R sh.',
      voice: 'लङ शन्ट कम्पाउन्डमा, आर्मेचर करेन्ट सिरिज फिल्डबाट पनि जान्छ। त्यसैले ड्रप — आई ए टाइम्स आर ए प्लस आर एस ई, र आई एस एच इक्वल्स भी ओभर आर एस एच।',
      lines: [['step', tex(String.raw`\begin{aligned} I_L &= I_a + I_{sh},\quad I_{sh} \\ &= \tfrac{V}{R_{sh}} \\ V &= E_b + I_a(R_a + R_{se}) \end{aligned}`)]],
    },
    {
      say: 'Short shunt ma series field bata pura line current I L bagcha. Tesaile series drop I L R se, ra armature drop I a R a.',
      voice: 'सर्ट शन्टमा, सिरिज फिल्डबाट पूरा लाइन करेन्ट आई एल बग्छ। त्यसैले सिरिज ड्रप — आई एल आर एस ई, र आर्मेचर ड्रप — आई ए आर ए।',
      lines: [['step', tex(String.raw`\begin{aligned} V &= E_b + I_aR_a + I_LR_{se} \\ I_{sh} &= \dfrac{V - I_LR_{se}}{R_{sh}} \end{aligned}`)]],
    },
  ],
  lecturer: [
    {
      say: 'Shunt motor: I L equals I a plus I sh, I sh equals V over R sh, ra V equals E b plus I a R a.',
      voice: 'शन्ट मोटर — आई एल इक्वल्स आई ए प्लस आई एस एच। आई एस एच इक्वल्स भी ओभर आर एस एच। र भी इक्वल्स ई बी प्लस आई ए आर ए।',
      lines: [['h', <>Voltage and current equations</>], ['step', <><H>(i) Shunt motor</H><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} && \cdots(1) \\ I_{sh} &= \dfrac{V}{R_{sh}} && \cdots(2) \\ V &= E_b + I_aR_a && \cdots(3) \end{aligned}`}</K></>]],
    },
    {
      say: 'Series motor: I L equals I a equals I se, ra V equals E b plus I a times R a plus R se.',
      voice: 'सिरिज मोटर — आई एल इक्वल्स आई ए इक्वल्स आई एस ई। र भी इक्वल्स ई बी प्लस आई ए, टाइम्स आर ए प्लस आर एस ई।',
      lines: [['step', <><H>(ii) Series motor</H><K>{String.raw`\begin{aligned} I_L &= I_a \\ &= I_{se} && \cdots(4) \\ V &= E_b + I_a(R_a + R_{se}) && \cdots(5) \end{aligned}`}</K></>]],
      ask: {
        q: 'Series motor ma voltage equation kun ho?',
        voice: 'सिरिज मोटरमा भोल्टेज इक्वेसन कुन हो?',
        options: ['V = Eb + Ia(Ra + Rse)', 'V = Eb + IaRa', 'V = Eb − IaRse'],
        answer: 0,
        why: 'Armature ra series field dubai series ma: dubai ko drop jodincha.',
      },
    },
    {
      say: 'Long shunt compound: I L equals I a plus I sh, ra V equals E b plus I a times R a plus R se.',
      voice: 'लङ शन्ट कम्पाउन्ड — आई एल इक्वल्स आई ए प्लस आई एस एच। र भी इक्वल्स ई बी प्लस आई ए, टाइम्स आर ए प्लस आर एस ई।',
      lines: [['step', <><H>(iii) Long-shunt compound</H><K>{String.raw`\begin{aligned} I_L &= I_a + I_{sh} && \cdots(6) \\ V &= E_b + I_a(R_a + R_{se}) && \cdots(7) \end{aligned}`}</K></>]],
    },
    {
      say: 'Short shunt compound: V equals E b plus I a R a plus I L R se.',
      voice: 'सर्ट शन्ट कम्पाउन्ड — भी इक्वल्स ई बी प्लस आई ए आर ए, प्लस आई एल आर एस ई।',
      lines: [['step', <><H>(iv) Short-shunt compound</H><K>{String.raw`\begin{aligned} V &= E_b + I_aR_a + I_LR_{se} && \cdots(8) \\ I_{sh} &= \dfrac{V - I_LR_{se}}{R_{sh}} && \cdots(9) \end{aligned}`}</K></>]],
    },
  ],
});

/* ── Derivation: shunt motor characteristics ─────────────────────────── */
export const shunt42 = duo('Derivation: shunt motor characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 1: 1, 3: 2, 5: 3 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Shunt motor ko field supply ko across cha, tesaile I sh ra phi lagbhag constant. Yahi ek kura le tinai curve banauncha.',
      voice: 'शन्ट मोटरको फिल्ड सप्लाईको अक्रस छ, त्यसैले आई एस एच र फाइ लगभग कन्स्टेन्ट। यही एक कुराले तीनै कर्भ बनाउँछ।',
      lines: [['h', <>Shunt motor characteristics</>], ['step', <>Field across V → <K>{String.raw`I_{sh} = V/R_{sh}`}</K> → φ ≈ constant</>]],
    },
    {
      say: 'T a phi I a sanga proportional, ra phi constant. Tesaile T a I a sanga seedha badhcha: origin bata seedha line.',
      voice: 'टी ए, फाइ आई एसँग प्रोपोर्सनल, र फाइ कन्स्टेन्ट। त्यसैले टी ए, आई एसँग सिधा बढ्छ — ओरिजिनबाट सिधा लाइन।',
      lines: [['step', tex(String.raw`\begin{aligned} T_a &\propto \phi\,I_a \\ \Rightarrow T_a &\propto I_a \end{aligned}`)]],
      ask: {
        q: 'Shunt motor ko I a dobar bhayo bhane T a kati huncha?',
        voice: 'शन्ट मोटरको आई ए दोब्बर भयो भने, टी ए कति हुन्छ?',
        options: ['Dobar', 'Char guna', 'Utti nai'],
        answer: 0,
        why: 'φ constant: T a ∝ I a, tesaile dobar.',
      },
    },
    {
      say: 'Speed N, V minus I a R a over phi sanga proportional. I a R a sano drop bhayeko le load badhda speed thorai matra ghatcha.',
      voice: 'स्पिड एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल। आई ए आर ए सानो ड्रप भएकोले, लोड बढ्दा स्पिड थोरै मात्र घट्छ।',
      lines: [['step', <><K>{String.raw`N \propto \dfrac{V - I_aR_a}{\phi}`}</K> → falls slightly with load</>]],
    },
    {
      say: 'Tesaile N–Ta pani lagbhag flat. Shunt motor lagbhag constant speed motor ho: lathe, fan, blower, centrifugal pump, ra paper making ma chalincha.',
      voice: 'त्यसैले एन टी ए पनि लगभग फ्ल्याट। शन्ट मोटर, लगभग कन्स्टेन्ट स्पिड मोटर हो — लेथ, फ्यान, ब्लोअर, सेन्ट्रिफ्युगल पम्प, र पेपर मेकिङमा चलिन्छ।',
      lines: [['idea', <>Nearly constant speed → lathes, fans, blowers, centrifugal pumps, paper making</>]],
    },
  ],
  lecturer: [
    {
      say: 'Shunt motor ma field current V over R sh constant, tesaile flux phi constant manincha.',
      voice: 'शन्ट मोटरमा फिल्ड करेन्ट, भी ओभर आर एस एच कन्स्टेन्ट। त्यसैले फ्लक्स फाइ कन्स्टेन्ट मानिन्छ।',
      lines: [['h', <>Characteristics of a shunt motor</>], ['step', <><Pts items={[<><K>{String.raw`I_{sh} = V/R_{sh}`}</K> = constant, ∴ φ = constant</>]} /></>]],
    },
    {
      say: 'Ta–Ia: T a phi I a sanga proportional, phi constant bhayeko le T a I a sanga proportional. Curve origin bata seedha line.',
      voice: 'टी ए आई ए — टी ए फाइ आई एसँग प्रोपोर्सनल। फाइ कन्स्टेन्ट भएकोले, टी ए, आई एसँग प्रोपोर्सनल। कर्भ ओरिजिनबाट सिधा लाइन।',
      lines: [['step', <><Pts items={[<>(i) Ta–Ia: <K>{String.raw`T_a \propto I_a`}</K>, a straight line through O</>]} /></>]],
    },
    {
      say: 'N–Ia: N, V minus I a R a, over phi sanga proportional. I a R a sano bhayeko le speed load sanga thorai ghatcha.',
      voice: 'एन आई ए — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल। आई ए आर ए सानो भएकोले, स्पिड लोडसँग थोरै घट्छ।',
      lines: [['step', <><Pts items={[<>(ii) N–Ia: <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K>, falls slightly</>]} /></>]],
      ask: {
        q: 'Shunt motor lai kasto speed motor bhanincha?',
        voice: 'शन्ट मोटरलाई कस्तो स्पिड मोटर भनिन्छ?',
        options: ['Lagbhag constant speed motor', 'Variable speed motor', 'Zero speed motor'],
        answer: 0,
        why: 'No load dekhi full load samma speed thorai matra ghatcha.',
      },
    },
    {
      say: 'N–Ta: N–Ia jastai lagbhag flat. Applications: lathes, fans, blowers, centrifugal pumps ra paper making, jaha constant speed chahincha.',
      voice: 'एन टी ए — एन आई ए जस्तै, लगभग फ्ल्याट। एप्लिकेसन्स — लेथ्स, फ्यान्स, ब्लोअर्स, सेन्ट्रिफ्युगल पम्प्स र पेपर मेकिङ, जहाँ कन्स्टेन्ट स्पिड चाहिन्छ।',
      lines: [['step', <><Pts items={[<>(iii) N–Ta: nearly flat (constant speed)</>, <>Uses: lathes, fans, blowers, centrifugal pumps, paper making</>]} /></>]],
    },
  ],
});

/* ── Derivation: series motor characteristics ────────────────────────── */
export const series42 = duo('Derivation: series motor characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 2: 1, 4: 2, 7: 3, 6: 4 }),
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Series motor ma field current nai I a. Saturation agadi phi I a sanga proportional. Tesaile T a, phi I a, arthat I a square sanga proportional: parabola.',
      voice: 'सिरिज मोटरमा फिल्ड करेन्ट नै आई ए। स्याचुरेसन अगाडि फाइ, आई एसँग प्रोपोर्सनल। त्यसैले टी ए — फाइ आई ए, अर्थात आई ए स्क्वायरसँग प्रोपोर्सनल — प्याराबोला।',
      lines: [['h', <>Series motor characteristics</>], ['step', tex(String.raw`\begin{aligned} \phi &\propto I_a \\ \Rightarrow T_a &\propto I_a^2 \end{aligned}`)]],
      ask: {
        q: 'Saturation agadi series motor ko I a dobar bhaye T a kati guna huncha?',
        voice: 'स्याचुरेसन अगाडि, सिरिज मोटरको आई ए दोब्बर भए, टी ए कति गुना हुन्छ?',
        options: ['4 guna', '2 guna', 'Aadha'],
        answer: 0,
        why: 'T a ∝ I a², tesaile 2² = 4 guna. Saturation pachi bhane T a ∝ I a matra.',
      },
    },
    {
      say: 'Speed N, E b over phi sanga, ra phi I a sanga. Tesaile N lagbhag one over I a sanga proportional: rectangular hyperbola.',
      voice: 'स्पिड एन, ई बी ओभर फाइसँग, र फाइ आई एसँग। त्यसैले एन, लगभग वान ओभर आई एसँग प्रोपोर्सनल — रेक्ट्याङ्गुलर हाइपरबोला।',
      lines: [['step', tex(String.raw`\begin{aligned} N &\propto \dfrac{E_b}{\phi} \\ &\propto \dfrac{1}{I_a} \end{aligned}`)]],
    },
    {
      say: 'Torque thulo hunda speed sano, torque sano hunda speed thulo. Yo variable speed, high starting torque motor ho: traction, crane, hoist ra vacuum cleaner.',
      voice: 'टर्क ठूलो हुँदा स्पिड सानो, टर्क सानो हुँदा स्पिड ठूलो। यो भेरिएबल स्पिड, हाई स्टार्टिङ टर्क मोटर हो — ट्र्याक्सन, क्रेन, होइस्ट, र भ्याकुम क्लिनर।',
      lines: [['step', <>N–Ta: high torque at low speed → traction, cranes, hoists, vacuum cleaners</>]],
    },
    {
      say: 'Aba load hatayo bhane I a dherai sano, phi pani sano, ani N ekdam thulo. Armature centrifugal force le phutna sakcha.',
      voice: 'अब लोड हटायो भने, आई ए धेरै सानो, फाइ पनि सानो, अनि एन एकदम ठूलो। आर्मेचर, सेन्ट्रिफ्युगल फोर्सले फुट्न सक्छ।',
      lines: [['trap', <>No load: I<sub>a</sub> → 0, φ → 0, N → very high: never start or run a series motor without load</>]],
    },
  ],
  lecturer: [
    {
      say: 'Series motor ma I se equals I a, ra saturation agadi phi I a sanga proportional. Ta–Ia: T a I a square sanga proportional, parabola.',
      voice: 'सिरिज मोटरमा आई एस ई इक्वल्स आई ए, र स्याचुरेसन अगाडि फाइ, आई एसँग प्रोपोर्सनल। टी ए आई ए — टी ए, आई ए स्क्वायरसँग प्रोपोर्सनल, प्याराबोला।',
      lines: [['h', <>Characteristics of a series motor</>], ['step', <><Pts items={[<>(i) Ta–Ia: before saturation <K>{String.raw`\phi \propto I_a`}</K>, ∴ <K>{String.raw`T_a \propto I_a^2`}</K> (parabola); after saturation <K>{String.raw`T_a \propto I_a`}</K></>]} /></>]],
      ask: {
        q: 'Saturation pachi series motor ma T a kasari badlincha?',
        voice: 'स्याचुरेसन पछि, सिरिज मोटरमा टी ए कसरी बदलिन्छ?',
        options: ['Ia sanga proportional', 'Ia² sanga', 'Constant'],
        answer: 0,
        why: 'Saturation pachi φ lagbhag constant, tesaile T a ∝ I a.',
      },
    },
    {
      say: 'N–Ia: N, E b over phi sanga proportional ra phi I a sanga, tesaile N one over I a sanga: rectangular hyperbola.',
      voice: 'एन आई ए — एन, ई बी ओभर फाइसँग प्रोपोर्सनल, र फाइ आई एसँग। त्यसैले एन, वान ओभर आई एसँग — रेक्ट्याङ्गुलर हाइपरबोला।',
      lines: [['step', <><Pts items={[<>(ii) N–Ia: <K>{String.raw`N \propto \dfrac{E_b}{\phi} \propto \dfrac{1}{I_a}`}</K>, a rectangular hyperbola</>]} /></>]],
    },
    {
      say: 'N–Ta: high torque ma low speed. Applications: traction, cranes, hoists, vacuum cleaners, jaha high starting torque chahincha.',
      voice: 'एन टी ए — हाई टर्कमा लो स्पिड। एप्लिकेसन्स — ट्र्याक्सन, क्रेन्स, होइस्ट्स, भ्याकुम क्लिनर्स, जहाँ हाई स्टार्टिङ टर्क चाहिन्छ।',
      lines: [['step', <><Pts items={[<>(iii) N–Ta: high torque at low speed</>, <>Uses: traction, cranes, hoists, vacuum cleaners</>]} /></>]],
    },
    {
      say: 'Note: no load ma I a ra phi dubai sano, ra speed dangerously high huncha. Hence a series motor is never started without load.',
      voice: 'नोट — नो लोडमा आई ए र फाइ दुवै सानो, र स्पिड डेन्जरस्ली हाई हुन्छ। हेन्स अ सिरिज मोटर इज नेभर स्टार्टेड विदाउट लोड।',
      lines: [['trap', <>At no load, I<sub>a</sub> and φ are small and N becomes dangerously high; a series motor is never started without load.</>]],
    },
  ],
});

/* ── Big picture (Lecturer only, point-wise, space by marks) ───────────── */
export const charsAnswer42 = answer('Model answer: shunt ra series characteristics', {
  draw: figAt(curvesFigure, { 0: 0, 1: 1, 5: 2, 2: 3, 7: 4, 4: 4, 6: 4 }),
  viewBox: '0 0 360 180',
  papers: ['2070 Magh'],
  marks: '[8]',
  q: 'Explain the torque–armature current and speed–torque characteristics of DC shunt and DC series motors.',
  read: {
    say: 'IOE 2070 Magh, aath marks: explain the torque–armature current and speed–torque characteristics of DC shunt and DC series motors. Shunt char marks, series char marks.',
    voice: 'आइओई दुई हजार सत्तरी माघ, आठ मार्क्स — एक्सप्लेन द टर्क आर्मेचर करेन्ट एन्ड स्पिड टर्क क्यारेक्टरिस्टिक्स अफ डीसी शन्ट एन्ड डीसी सिरिज मोटर्स। शन्ट चार मार्क्स, सिरिज चार मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Shunt motor [4]</H><Pts items={[<>Field across V: <K>{String.raw`I_{sh} = V/R_{sh}`}</K>, ∴ φ = constant</>, <>Ta–Ia: <K>{String.raw`T_a \propto \phi I_a \propto I_a`}</K>, a straight line through O</>]} /></>,
      say: 'Shunt motor: field supply ko across, tesaile phi constant. Ta–Ia: T a I a sanga proportional, origin bata seedha line.',
      voice: 'शन्ट मोटर — फिल्ड सप्लाईको अक्रस, त्यसैले फाइ कन्स्टेन्ट। टी ए आई ए — टी ए, आई एसँग प्रोपोर्सनल, ओरिजिनबाट सिधा लाइन।',
    },
    {
      node: <><Pts items={[<>N–Ta: <K>{String.raw`N \propto (V - I_aR_a)/\phi`}</K>; I<sub>a</sub>R<sub>a</sub> is small, so N falls only slightly as T<sub>a</sub> rises</>, <>∴ nearly constant speed: lathes, fans, pumps</>]} /></>,
      say: 'N–Ta: N, V minus I a R a over phi sanga proportional. I a R a sano bhayeko le torque badhda speed thorai matra ghatcha: lagbhag constant speed.',
      voice: 'एन टी ए — एन, भी माइनस आई ए आर ए, ओभर फाइसँग प्रोपोर्सनल। आई ए आर ए सानो भएकोले, टर्क बढ्दा स्पिड थोरै मात्र घट्छ — लगभग कन्स्टेन्ट स्पिड।',
    },
    {
      page: true,
      node: <><H>(b) Series motor [4]</H><Pts items={[<>Field in series: <K>{String.raw`\phi \propto I_a`}</K> (before saturation)</>, <>Ta–Ia: <K>{String.raw`T_a \propto I_a^2`}</K>, a parabola; after saturation <K>{String.raw`T_a \propto I_a`}</K></>]} /></>,
      say: 'Series motor: field series ma, saturation agadi phi I a sanga proportional. Ta–Ia: T a I a square sanga, parabola; saturation pachi seedha line.',
      voice: 'सिरिज मोटर — फिल्ड सिरिजमा, स्याचुरेसन अगाडि फाइ, आई एसँग प्रोपोर्सनल। टी ए आई ए — टी ए, आई ए स्क्वायरसँग, प्याराबोला। स्याचुरेसन पछि, सिधा लाइन।',
      ask: {
        q: 'Saturation agadi series motor ko Ta–Ia curve kasto huncha?',
        voice: 'स्याचुरेसन अगाडि, सिरिज मोटरको टी ए आई ए कर्भ कस्तो हुन्छ?',
        options: ['Parabola (Ta ∝ Ia²)', 'Seedha line', 'Hyperbola'],
        answer: 0,
        why: 'φ ∝ I a, tesaile T a ∝ φ I a ∝ I a².',
      },
    },
    {
      node: <><Pts items={[<>N–Ta: <K>{String.raw`N \propto 1/\phi \propto 1/I_a`}</K> and <K>{String.raw`T_a \propto I_a^2`}</K>, ∴ <K>{String.raw`N \propto 1/\sqrt{T_a}`}</K></>, <>High torque at low speed: traction, cranes</>, <>No load → N dangerously high; never run without load</>]} /></>,
      say: 'N–Ta: N one over I a sanga ra T a I a square sanga, tesaile N one over root T a sanga. High torque ma low speed. No load ma speed dangerously high, tesaile load bina kahile nachalaune.',
      voice: 'एन टी ए — एन, वान ओभर आई एसँग, र टी ए, आई ए स्क्वायरसँग। त्यसैले एन, वान ओभर रुट टी एसँग। हाई टर्कमा लो स्पिड। नो लोडमा स्पिड डेन्जरस्ली हाई, त्यसैले लोड बिना कहिल्यै नचलाउने।',
    },
  ],
});

export const noLoad42 = answer('Model answer: series motor lai load bina kina start nagarne', {
  draw: figAt(curvesFigure, { 0: 0, 4: 2, 6: 3 }),
  viewBox: '0 0 360 180',
  papers: ['2067 Mangsir', '2065 Chaitra', '2068 Bhadra'],
  marks: '',
  q: 'Why should a DC series motor never be started without load?',
  read: {
    say: 'IOE ma tin choti sodhiyeko: why should a DC series motor never be started without load?',
    voice: 'आइओईमा तीन चोटि सोधिएको — ह्वाई सुड अ डीसी सिरिज मोटर नेभर बी स्टार्टेड विदाउट लोड?',
  },
  points: [
    {
      node: <><H>Speed equation</H><Pts items={[<><K>{String.raw`N \propto \dfrac{E_b}{\phi}`}</K></>, <>In a series motor <K>{String.raw`\phi \propto I_a`}</K>, ∴ <K>{String.raw`N \propto \dfrac{1}{I_a}`}</K> (approximately)</>]} /></>,
      say: 'Speed N, E b over phi sanga proportional. Series motor ma phi I a sanga proportional, tesaile N lagbhag one over I a sanga.',
      voice: 'स्पिड एन, ई बी ओभर फाइसँग प्रोपोर्सनल। सिरिज मोटरमा फाइ, आई एसँग प्रोपोर्सनल, त्यसैले एन लगभग, वान ओभर आई एसँग।',
    },
    {
      node: <><H>At no load</H><Pts items={[<>I<sub>a</sub> is very small → φ is very small</>, <>∴ N rises to a dangerously high value</>]} /></>,
      say: 'No load ma I a dherai sano, tesaile phi pani dherai sano, ra speed dangerously high pugcha.',
      voice: 'नो लोडमा आई ए धेरै सानो, त्यसैले फाइ पनि धेरै सानो, र स्पिड डेन्जरस्ली हाई पुग्छ।',
      ask: {
        q: 'No load ma series motor ko speed kina dherai badhcha?',
        voice: 'नो लोडमा सिरिज मोटरको स्पिड किन धेरै बढ्छ?',
        options: ['I a ra phi dubai sano hunchan', 'E b zero huncha', 'R a badhcha'],
        answer: 0,
        why: 'φ ∝ I a; I a sano bhaye φ sano, ra N ∝ E b/φ thulo.',
      },
    },
    {
      node: <><H>Result</H><Pts items={[<>Large centrifugal forces can damage the armature winding and commutator</>, <>Hence it is always started with load, coupled directly or by gears, never by a belt (a belt may slip off)</>]} /></>,
      say: 'Yesto speed ma centrifugal force le armature winding ra commutator bigrincha. Tesaile series motor sadhai load sanga start garincha, direct wa gear le jodera, belt le kahile pani hoina, kinaki belt khaskina sakcha.',
      voice: 'यस्तो स्पिडमा, सेन्ट्रिफ्युगल फोर्सले आर्मेचर वाइन्डिङ र कम्युटेटर बिग्रिन्छ। त्यसैले सिरिज मोटर सधैं लोडसँग स्टार्ट गरिन्छ — डाइरेक्ट वा गियरले जोडेर, बेल्टले कहिल्यै होइन, किनकि बेल्ट खस्किन सक्छ।',
    },
  ],
});

export const seriesSolve42 = answer('IOE 2069 Bhadra: series motor ko current', {
  papers: ['2069 Bhadra', '2066 Magh'],
  marks: '[8]',
  q: 'A 220 V series motor, Ra = 0.06 Ω, Rse = 0.04 Ω, takes 25 A at 1200 rpm. Find the current at 800 rpm (unsaturated field).',
  read: {
    say: 'IOE 2069 Bhadra ra 2066 Magh, aath marks: 220 volt series motor, R a 0.06 ohm, R se 0.04 ohm, 25 ampere ma 1200 rpm. 800 rpm ma current kati?',
    voice: 'आइओई दुई हजार उनान्सत्तरी भदौ र दुई हजार छयासठ्ठी माघ, आठ मार्क्स — टु ट्वेन्टी भोल्ट सिरिज मोटर, आर ए जिरो पोइन्ट जिरो सिक्स ओम, आर एस ई जिरो पोइन्ट जिरो फोर ओम, ट्वेन्टी फाइभ एम्पियरमा ट्वेल्भ हन्ड्रेड आर पी एम। एट हन्ड्रेड आर पी एममा करेन्ट कति?',
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
        options: ['N ∝ 1/I: kam speed bhaneko badhi current (badhi load)', 'E b badhyo', 'R a ghatyo'],
        answer: 0,
        why: 'Series motor ma N ≈ ∝ 1/I; speed ghatnu bhaneko load ra current badhnu.',
      },
    },
  ],
});
