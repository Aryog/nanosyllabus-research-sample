import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { seriesCtrlFigure, speedCtrlFigure, speedCurvesFigure } from './figs.jsx';

/*
  4.5 Speed control: field control, armature control, series motors and
  reversal. Tutor (default) and Lecturer over the book figures (Fig. 10
  circuit, Fig. 11 N–Ia lines, Fig. 12 series motor). Big picture: the two
  past questions, point-wise, space by marks.
  Recomputed: 2072 Ashwin Ish 2 A, Ia 48 A, Eb1 195.2 V, Eb2 156.16 V,
  Ra + R = 43.84/48 = 0.9133 Ω → R = 0.813 Ω.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
// speedCtrlFigure: 0 circuit · 1 field rheostat · 2 armature R · 3 equation.
// speedCurvesFigure: 0 axes + normal line · 1 field control · 2 armature control.
// seriesCtrlFigure: 0 series motor · 1 diverter · 2 series R · 3 reversal.

export const opener45 = duo('4.5 ma k padhne?', {
  draw: figAt(speedCtrlFigure, { 0: 0, 3: 2 }),
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Unit 4.5: DC motor ko speed control, ra direction kasari ulto garne.',
      voice: 'युनिट फोर पोइन्ट फाइभ — डीसी मोटरको स्पिड कन्ट्रोल, र डाइरेक्सन कसरी उल्टो गर्ने।',
      lines: [['h', <>4.5</>], ['step', <>Speed control ra direction reverse</>]],
    },
    {
      say: 'DC motor ko thulo guna yahi ho: speed sajilai ra smooth tarika le milauna sakincha.',
      voice: 'डीसी मोटरको ठूलो गुण यही हो — स्पिड सजिलै, र स्मुथ तरिकाले मिलाउन सकिन्छ।',
      lines: [['step', <>1. Speed equation: what decides N</>]],
    },
    {
      say: 'Speed equation bata teen bato nikalchau: field control, armature control ra voltage control. Ani series motor ra reversing.',
      voice: 'स्पिड इक्वेसनबाट तीन बाटो निकाल्छौं — फिल्ड कन्ट्रोल, आर्मेचर कन्ट्रोल, र भोल्टेज कन्ट्रोल। अनि सिरिज मोटर र रिभर्सिङ।',
      lines: [['step', <>2. Field · armature · voltage control · 3. Series motor, reversal</>]],
    },
    {
      say: 'Antim ma IOE ka duita question: shunt motor speed control ko theory, ra armature resistance ko numerical.',
      voice: 'अन्तिममा, आइओईका दुईटा क्वेस्चन — शन्ट मोटर स्पिड कन्ट्रोलको थ्योरी, र आर्मेचर रेजिस्टेन्सको न्युमेरिकल।',
      lines: [['hook', <>IOE: shunt motor speed control [8] · armature resistance numerical [8]</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.5: speed control of DC motors.',
      voice: 'युनिट फोर पोइन्ट फाइभ — स्पिड कन्ट्रोल अफ डीसी मोटर्स।',
      lines: [['h', <>Unit 4.5</>], ['step', <>Speed control of DC motors</>]],
    },
    {
      say: 'Pahilo: speed equation ra speed lai affect garne factors.',
      voice: 'पहिलो — स्पिड इक्वेसन, र स्पिडलाई अफेक्ट गर्ने फ्याक्टर्स।',
      lines: [['step', <><H>1. Speed equation</H>factors affecting speed</>]],
    },
    {
      say: 'Dosro: field control ra armature control, series motor ko control, ra reversal of rotation.',
      voice: 'दोस्रो — फिल्ड कन्ट्रोल र आर्मेचर कन्ट्रोल, सिरिज मोटरको कन्ट्रोल, र रिभर्सल अफ रोटेसन।',
      lines: [['step', <><H>2. Methods</H>field control, armature control, series motors, reversal</>]],
    },
    {
      say: 'Big picture ma duita past question: methods of speed control, ra armature resistance numerical.',
      voice: 'बिग पिक्चरमा दुईटा पास्ट क्वेस्चन — मेथड्स अफ स्पिड कन्ट्रोल, र आर्मेचर रेजिस्टेन्स न्युमेरिकल।',
      lines: [['hook', <>IOE: 2071 Bhadra [8], 2069 Bhadra, 2065 Chaitra · 2072 Ashwin [8]</>]],
    },
  ],
});

/* ── Terms: what decides the speed ───────────────────────────────────── */
export const knobs45 = duo('Speed kun kura le decide garcha', {
  draw: figAt(speedCtrlFigure, { 0: 0, 3: 1, 1: 2, 2: 3 }),
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Back EMF E b, phi N sanga proportional cha. Tesaile ulto milauda N, E b over phi sanga proportional.',
      voice: 'ब्याक इएमएफ ई बी, फाइ एनसँग प्रोपोर्सनल छ। त्यसैले उल्टो मिलाउँदा, एन, ई बी ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['h', <>What decides the speed</>], ['step', tex(String.raw`\begin{aligned} E_b &\propto \phi N \\ \Rightarrow N &\propto \dfrac{E_b}{\phi} \end{aligned}`)]],
    },
    {
      say: 'E b ko thau ma V minus I a times R a plus R rakhda, speed tin kura ma bhar parcha: V, R ra phi.',
      voice: 'ई बीको ठाउँमा, भी माइनस आई ए टाइम्स आर ए प्लस आर राख्दा, स्पिड तीन कुरामा भर पर्छ — भी, आर, र फाइ।',
      lines: [['eq', tex(String.raw`N \propto \dfrac{V - I_a(R_a + R)}{\phi}`)]],
    },
    {
      say: 'Pahilo knob phi: field current ghatayo bhane phi ghatcha, ra speed badhcha.',
      voice: 'पहिलो नब, फाइ — फिल्ड करेन्ट घटायो भने फाइ घट्छ, र स्पिड बढ्छ।',
      lines: [['step', <>Knob 1, φ (field control): φ ↓ → N ↑</>]],
      ask: {
        q: 'Shunt motor ko field current ghatayo bhane speed ma k huncha?',
        voice: 'शन्ट मोटरको फिल्ड करेन्ट घटायो भने, स्पिडमा के हुन्छ?',
        options: ['Badhcha', 'Ghatcha', 'Utti nai'],
        answer: 0,
        why: 'N ∝ 1/φ: field current ghatda φ ghatcha ra N badhcha.',
      },
    },
    {
      say: 'Dosro knob R: armature sanga resistance thapyo bhane drop badhcha, E b ghatcha, ra speed ghatcha. Tesro knob V: armature voltage nai badalne.',
      voice: 'दोस्रो नब, आर — आर्मेचरसँग रेजिस्टेन्स थप्यो भने ड्रप बढ्छ, ई बी घट्छ, र स्पिड घट्छ। तेस्रो नब, भी — आर्मेचर भोल्टेज नै बदल्ने।',
      lines: [['step', <>Knob 2, R (armature control): R ↑ → N ↓ · knob 3, V (voltage control)</>]],
    },
  ],
  lecturer: [
    {
      say: 'E b equals P phi Z N over sixty A bata, N equals K E b over phi, jaha K equals sixty A over P Z.',
      voice: 'ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी एबाट — एन इक्वल्स के ई बी ओभर फाइ, जहाँ के इक्वल्स सिक्स्टी ए ओभर पी जेड।',
      lines: [['h', <>Factors affecting speed (Fig. 10)</>], ['step', <><K>{String.raw`\begin{aligned} N &= \dfrac{60A}{PZ} \cdot \dfrac{E_b}{\phi} && \\ &= K\,\dfrac{E_b}{\phi} && \cdots(1) \end{aligned}`}</K></>]],
    },
    {
      say: 'E b equals V minus I a times R a plus R rakhda, N, V minus I a R a plus R, over phi sanga proportional.',
      voice: 'ई बी इक्वल्स, भी माइनस आई ए टाइम्स आर ए प्लस आर राख्दा — एन, भी माइनस आई ए आर ए प्लस आर, ओभर फाइसँग प्रोपोर्सनल।',
      lines: [['step', <><K>{String.raw`N \propto \dfrac{V - I_a(R_a + R)}{\phi} \qquad \cdots(2)`}</K></>]],
    },
    {
      say: 'Equation dui bata speed tin kura le control garna sakincha. Pahilo, flux phi: field control.',
      voice: 'इक्वेसन टुबाट, स्पिड तीन कुराले कन्ट्रोल गर्न सकिन्छ। पहिलो, फ्लक्स फाइ — फिल्ड कन्ट्रोल।',
      lines: [['step', <><Pts items={[<>(i) Flux φ: field (flux) control</>]} /></>]],
    },
    {
      say: 'Dosro, armature circuit resistance R: armature control. Tesro, applied voltage V: voltage control, jastai Ward-Leonard system.',
      voice: 'दोस्रो, आर्मेचर सर्किट रेजिस्टेन्स आर — आर्मेचर कन्ट्रोल। तेस्रो, एप्लाइड भोल्टेज भी — भोल्टेज कन्ट्रोल, जस्तै वार्ड लियोनार्ड सिस्टम।',
      lines: [['step', <><Pts items={[<>(ii) Armature resistance R: armature (rheostatic) control</>, <>(iii) Applied voltage V: voltage control (Ward-Leonard)</>]} /></>]],
      ask: {
        q: 'Shunt motor ko speed control garne kun tarika hoina?',
        voice: 'शन्ट मोटरको स्पिड कन्ट्रोल गर्ने कुन तरिका होइन?',
        options: ['Number of poles badalne (running ma)', 'Field control', 'Armature control'],
        answer: 0,
        why: 'Equation 2 ma V, R ra φ matra badlina milchan; running motor ko P badlindaina.',
      },
    },
  ],
});

/* ── Terms: field control ────────────────────────────────────────────── */
export const field45 = duo('Field (flux) control', {
  draw: figAt(speedCurvesFigure, { 0: 0, 1: 1 }),
  viewBox: '0 0 360 210',
  tutor: [
    {
      say: 'Field control ma shunt field sanga series ma rheostat R f rakhincha. R f badhayo bhane I sh ra phi ghatchan.',
      voice: 'फिल्ड कन्ट्रोलमा, शन्ट फिल्डसँग सिरिजमा रियोस्टेट आर एफ राखिन्छ। आर एफ बढायो भने, आई एस एच र फाइ घट्छन्।',
      lines: [['h', <>Field control</>], ['step', <>Rheostat R<sub>f</sub> in the field: R<sub>f</sub> ↑ → I<sub>sh</sub> ↓ → φ ↓</>]],
    },
    {
      say: 'N, one over phi sanga proportional bhayeko le speed badhcha. Graph ma field weak garda N–Ia line normal bhanda mathi sarcha.',
      voice: 'एन, वान ओभर फाइसँग प्रोपोर्सनल भएकोले, स्पिड बढ्छ। ग्राफमा फिल्ड विक गर्दा, एन आई ए लाइन नर्मलभन्दा माथि सर्छ।',
      lines: [['step', <><K>{String.raw`N \propto 1/\phi`}</K> → N–Ia line moves above normal</>]],
      ask: {
        q: 'Flux aadha bhayo ra E b lagbhag utti nai rahyo bhane speed kati?',
        voice: 'फ्लक्स आधा भयो, र ई बी लगभग उत्ति नै रह्यो भने, स्पिड कति?',
        options: ['Lagbhag dobar', 'Aadha', 'Utti nai'],
        answer: 0,
        why: 'N ∝ E b/φ: φ aadha bhaye N lagbhag dobar.',
      },
    },
    {
      say: 'I sh sano current bhayeko le rheostat ma loss pani dherai thorai. Yo efficient tarika ho.',
      voice: 'आई एस एच सानो करेन्ट भएकोले, रियोस्टेटमा लस पनि धेरै थोरै। यो इफिसियन्ट तरिका हो।',
      lines: [['step', <>Small I<sub>sh</sub> → small rheostat loss → efficient</>]],
    },
    {
      say: 'Tara yasle normal bhanda mathi ko speed matra dincha. Dherai weak field ma commutation bigrincha ra motor unstable huncha.',
      voice: 'तर यसले नर्मलभन्दा माथिको स्पिड मात्र दिन्छ। धेरै विक फिल्डमा कम्युटेसन बिग्रिन्छ, र मोटर अनस्टेबल हुन्छ।',
      lines: [['trap', <>Only speeds above normal · very weak field → poor commutation, instability</>]],
    },
  ],
  lecturer: [
    {
      say: 'Field control: shunt field circuit ma variable resistance R f series ma jodincha.',
      voice: 'फिल्ड कन्ट्रोल — शन्ट फिल्ड सर्किटमा भेरिएबल रेजिस्टेन्स आर एफ, सिरिजमा जोडिन्छ।',
      lines: [['h', <>Field (flux) control (Fig. 11)</>], ['step', <><Pts items={[<>A rheostat R<sub>f</sub> is connected in series with the shunt field</>]} /></>]],
    },
    {
      say: 'R f badhauda I sh ra phi ghatchan, ra N one over phi sanga bhayeko le speed badhcha.',
      voice: 'आर एफ बढाउँदा, आई एस एच र फाइ घट्छन्, र एन वान ओभर फाइसँग भएकोले स्पिड बढ्छ।',
      lines: [['step', <><Pts items={[<>R<sub>f</sub> ↑ → I<sub>sh</sub> ↓ → φ ↓ → N ↑, since <K>{String.raw`N \propto 1/\phi`}</K></>]} /></>]],
    },
    {
      say: 'Advantages: I sh sano bhayeko le loss kam, efficient ra simple; speed ko control fine huncha.',
      voice: 'एडभान्टेजेस — आई एस एच सानो भएकोले लस कम, इफिसियन्ट र सिम्पल; स्पिडको कन्ट्रोल फाइन हुन्छ।',
      lines: [['step', <><Pts items={[<>Advantages: small loss (I<sub>sh</sub> small), efficient, simple, fine control</>]} /></>]],
    },
    {
      say: 'Disadvantages: speed normal bhanda mathi matra; dherai weak field ma poor commutation ra instability.',
      voice: 'डिसएडभान्टेजेस — स्पिड नर्मलभन्दा माथि मात्र; धेरै विक फिल्डमा पुअर कम्युटेसन र इन्स्टेबिलिटी।',
      lines: [['step', <><Pts items={[<>Disadvantages: speeds above normal only; poor commutation and instability at very weak field</>]} /></>]],
      ask: {
        q: 'Field control le kun range ko speed dincha?',
        voice: 'फिल्ड कन्ट्रोलले कुन रेन्जको स्पिड दिन्छ?',
        options: ['Normal bhanda mathi', 'Normal bhanda tala', 'Zero dekhi normal'],
        answer: 0,
        why: 'Field lai full bhanda badhi garna mildaina; ghatauna matra milcha, tesaile N matra badhcha.',
      },
    },
  ],
});

/* ── Terms: armature control ─────────────────────────────────────────── */
export const armature45 = duo('Armature (rheostatic) control', {
  draw: figAt(speedCurvesFigure, { 0: 0, 2: 1 }),
  viewBox: '0 0 360 210',
  tutor: [
    {
      say: 'Armature control ma armature sanga series ma variable resistance R rakhincha. Field lai chhoina.',
      voice: 'आर्मेचर कन्ट्रोलमा, आर्मेचरसँग सिरिजमा भेरिएबल रेजिस्टेन्स आर राखिन्छ। फिल्डलाई छुइँदैन।',
      lines: [['h', <>Armature control</>], ['step', <>Variable R in series with the armature; field unchanged</>]],
    },
    {
      say: 'R badhayo bhane drop I a times R a plus R badhcha, E b ghatcha, ra speed ghatcha. N–Ia line normal bhanda tala jhukcha.',
      voice: 'आर बढायो भने, ड्रप — आई ए टाइम्स आर ए प्लस आर बढ्छ, ई बी घट्छ, र स्पिड घट्छ। एन आई ए लाइन, नर्मलभन्दा तल झुक्छ।',
      lines: [['step', <>R ↑ → drop ↑ → E<sub>b</sub> ↓ → N ↓ (below normal)</>]],
      ask: {
        q: 'Armature control le speed kata lagcha?',
        voice: 'आर्मेचर कन्ट्रोलले स्पिड कता लाग्छ?',
        options: ['Normal bhanda tala', 'Normal bhanda mathi', 'Badlindaina'],
        answer: 0,
        why: 'Resistance le E b ghataucha; N ∝ E b/φ, tesaile N normal bhanda tala.',
      },
    },
    {
      say: 'Tara pura armature current R bata bagcha, tesaile I a square R loss dherai huncha. Yo wasteful tarika ho.',
      voice: 'तर पूरा आर्मेचर करेन्ट आरबाट बग्छ, त्यसैले आई ए स्क्वायर आर लस धेरै हुन्छ। यो वेस्टफुल तरिका हो।',
      lines: [['trap', <>Full I<sub>a</sub> flows in R → large <K>{String.raw`I_a^2R`}</K> loss</>]],
    },
    {
      say: 'Load badalda speed pani dherai badalincha, arthat speed regulation kharab. Tesaile thorai samaya ko lagi matra, jastai crane ra hoist ma.',
      voice: 'लोड बदल्दा स्पिड पनि धेरै बदलिन्छ, अर्थात स्पिड रेगुलेसन खराब। त्यसैले, थोरै समयको लागि मात्र — जस्तै क्रेन र होइस्टमा।',
      lines: [['step', <>Poor speed regulation → short-time use (cranes, hoists)</>]],
    },
  ],
  lecturer: [
    {
      say: 'Armature control: armature circuit ma variable resistance R series ma jodincha.',
      voice: 'आर्मेचर कन्ट्रोल — आर्मेचर सर्किटमा भेरिएबल रेजिस्टेन्स आर, सिरिजमा जोडिन्छ।',
      lines: [['h', <>Armature (rheostatic) control (Fig. 11)</>], ['step', <><Pts items={[<>A variable resistance R is connected in series with the armature</>]} /></>]],
    },
    {
      say: 'R badhauda armature drop badhcha, E b ghatcha, ra speed normal bhanda tala jhardcha.',
      voice: 'आर बढाउँदा आर्मेचर ड्रप बढ्छ, ई बी घट्छ, र स्पिड नर्मलभन्दा तल झर्छ।',
      lines: [['step', <><Pts items={[<>R ↑ → <K>{String.raw`I_a(R_a + R)`}</K> ↑ → E<sub>b</sub> ↓ → N ↓ (below normal)</>]} /></>]],
    },
    {
      say: 'Disadvantages: R ma I a square R ko thulo loss, ra speed regulation poor.',
      voice: 'डिसएडभान्टेजेस — आरमा आई ए स्क्वायर आरको ठूलो लस, र स्पिड रेगुलेसन पुअर।',
      lines: [['step', <><Pts items={[<>Disadvantages: large <K>{String.raw`I_a^2R`}</K> loss; poor speed regulation</>]} /></>]],
      ask: {
        q: 'Armature control ko mukhya kamjori k ho?',
        voice: 'आर्मेचर कन्ट्रोलको मुख्य कमजोरी के हो?',
        options: ['R ma dherai power loss', 'Speed normal bhanda mathi janchha', 'Field kamjor huncha'],
        answer: 0,
        why: 'Pura I a R bata bagcha, tesaile I a²R loss thulo.',
      },
    },
    {
      say: 'Applications: speed normal bhanda tala, thorai samaya chahine thau, jastai cranes, hoists ra traction.',
      voice: 'एप्लिकेसन्स — स्पिड नर्मलभन्दा तल, थोरै समय चाहिने ठाउँ, जस्तै क्रेन्स, होइस्ट्स, र ट्र्याक्सन।',
      lines: [['step', <><Pts items={[<>Uses: below-normal speeds for short periods (cranes, hoists, traction)</>]} /></>]],
    },
  ],
});

/* ── Terms: series motors and reversal ───────────────────────────────── */
export const seriesRev45 = duo('Series motor ko speed control ra reversing', {
  draw: seriesCtrlFigure,
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Series motor ma field ra armature eutai current bokchan. Field current badalna field ko across diverter jodincha.',
      voice: 'सिरिज मोटरमा फिल्ड र आर्मेचर एउटै करेन्ट बोक्छन्। फिल्ड करेन्ट बदल्न, फिल्डको अक्रस डाइभर्टर जोडिन्छ।',
      lines: [['h', <>Series motor control and reversal</>], ['step', <>Series motor: field and armature carry the same current</>]],
    },
    {
      say: 'Diverter R d le field current ko kehi bhag bypass garcha. Phi ghatcha, ra speed badhcha.',
      voice: 'डाइभर्टर आर डीले, फिल्ड करेन्टको केही भाग बाइपास गर्छ। फाइ घट्छ, र स्पिड बढ्छ।',
      lines: [['step', <>Field diverter R<sub>d</sub>: part of I<sub>a</sub> bypasses the field → φ ↓ → N ↑</>]],
    },
    {
      say: 'Motor sanga series resistance thapda voltage drop badhcha, ra speed ghatcha. Tapped field le pani turns ghatayera speed badhauna milcha.',
      voice: 'मोटरसँग सिरिज रेजिस्टेन्स थप्दा भोल्टेज ड्रप बढ्छ, र स्पिड घट्छ। ट्याप्ड फिल्डले पनि टर्न्स घटाएर स्पिड बढाउन मिल्छ।',
      lines: [['step', <>Series resistance → N ↓ · tapped field (fewer turns) → N ↑</>]],
    },
    {
      say: 'Direction ulto garna armature wa field madhye euta ko current matra ulto garincha. Dubai ulto garyo bhane direction utti nai rahancha.',
      voice: 'डाइरेक्सन उल्टो गर्न, आर्मेचर वा फिल्डमध्ये एउटाको करेन्ट मात्र उल्टो गरिन्छ। दुवै उल्टो गर्‍यो भने, डाइरेक्सन उत्ति नै रहन्छ।',
      lines: [['idea', <>Reversal: reverse armature or field current, not both</>]],
      ask: {
        q: 'Supply ko polarity nai ulto garyo bhane DC shunt motor ko direction ma k huncha?',
        voice: 'सप्लाईको पोलारिटी नै उल्टो गर्‍यो भने, डीसी शन्ट मोटरको डाइरेक्सनमा के हुन्छ?',
        options: ['Badlindaina', 'Ulto huncha', 'Motor rokincha'],
        answer: 0,
        why: 'Field ra armature dubai ko current ulto huncha; F ∝ B I ma dubai ulto bhaye direction utti nai.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Series motor ko speed control: flux control ra series resistance control.',
      voice: 'सिरिज मोटरको स्पिड कन्ट्रोल — फ्लक्स कन्ट्रोल, र सिरिज रेजिस्टेन्स कन्ट्रोल।',
      lines: [['h', <>Series motor control and reversal (Fig. 12)</>], ['step', <><Pts items={[<>Methods: flux control and series resistance control</>]} /></>]],
    },
    {
      say: 'Field diverter: series field ko across variable resistance, jasle field current ra phi ghataucha, ra speed badhcha.',
      voice: 'फिल्ड डाइभर्टर — सिरिज फिल्डको अक्रस भेरिएबल रेजिस्टेन्स, जसले फिल्ड करेन्ट र फाइ घटाउँछ, र स्पिड बढ्छ।',
      lines: [['step', <><Pts items={[<>(i) Field diverter across the series field: φ ↓ → N ↑</>]} /></>]],
    },
    {
      say: 'Tapped field le active turns ghataucha, ra series resistance le terminal voltage ghatayera speed ghataucha.',
      voice: 'ट्याप्ड फिल्डले एक्टिभ टर्न्स घटाउँछ, र सिरिज रेजिस्टेन्सले टर्मिनल भोल्टेज घटाएर स्पिड घटाउँछ।',
      lines: [['step', <><Pts items={[<>(ii) Tapped field: fewer turns → N ↑</>, <>(iii) Series resistance: N ↓</>]} /></>]],
    },
    {
      say: 'Reversal of rotation: armature current wa field current, euta matra reverse garincha.',
      voice: 'रिभर्सल अफ रोटेसन — आर्मेचर करेन्ट वा फिल्ड करेन्ट, एउटा मात्र रिभर्स गरिन्छ।',
      lines: [['step', <><Pts items={[<>Reversal: reverse either the armature or the field current, not both</>]} /></>]],
      ask: {
        q: 'DC motor ko rotation reverse garna k garnu parcha?',
        voice: 'डीसी मोटरको रोटेसन रिभर्स गर्न के गर्नुपर्छ?',
        options: ['Armature wa field madhye euta ko current reverse', 'Dubai ko current reverse', 'Supply voltage ghatau'],
        answer: 0,
        why: 'Euta matra reverse garda force ulto huncha; dubai garda force utti nai.',
      },
    },
  ],
});

/* ── Derivation: speed equation and speed ratio ──────────────────────── */
export const speedEq45 = duo('Derivation: speed equation ra speed ratio', {
  draw: figAt(speedCtrlFigure, { 0: 0, 3: 1 }),
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Back EMF equation bata suru garau: E b equals P phi Z N over sixty A. Yaslai N ko lagi milaunchau.',
      voice: 'ब्याक इएमएफ इक्वेसनबाट सुरु गरौं — ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए। यसलाई एनको लागि मिलाउँछौं।',
      lines: [['h', <>Speed equation</>], ['step', tex(String.raw`\begin{aligned} E_b &= \dfrac{P\phi Z N}{60A} \\ \Rightarrow N &= \dfrac{60A}{PZ} \cdot \dfrac{E_b}{\phi} \end{aligned}`)]],
    },
    {
      say: 'Euta machine ma P, Z ra A fixed, tesaile N equals K E b over phi. E b ko thau ma V minus I a R a.',
      voice: 'एउटा मेसिनमा पी, जेड र ए फिक्स्ड, त्यसैले एन इक्वल्स के ई बी ओभर फाइ। ई बीको ठाउँमा, भी माइनस आई ए आर ए।',
      lines: [['eq', tex(String.raw`\begin{aligned} N &= K\,\dfrac{E_b}{\phi} \\ &= K\,\dfrac{V - I_aR_a}{\phi} \end{aligned}`)]],
    },
    {
      say: 'Dui awastha ko ratio liyo bhane K cancel huncha. N dui over N ek equals E b dui over E b ek, times phi ek over phi dui.',
      voice: 'दुई अवस्थाको रेसियो लियो भने के क्यान्सिल हुन्छ। एन टु ओभर एन वान इक्वल्स — ई बी टु ओभर ई बी वान, टाइम्स फाइ वान ओभर फाइ टु।',
      lines: [['eq', tex(String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}} \times \dfrac{\phi_1}{\phi_2}`)]],
    },
    {
      say: 'Shunt motor ma phi constant, tesaile N dui over N ek equals E b dui over E b ek. Series motor ma phi I a sanga, tesaile phi ek over phi dui ko thau ma I a ek over I a dui.',
      voice: 'शन्ट मोटरमा फाइ कन्स्टेन्ट, त्यसैले एन टु ओभर एन वान इक्वल्स ई बी टु ओभर ई बी वान। सिरिज मोटरमा फाइ आई एसँग, त्यसैले फाइ वान ओभर फाइ टुको ठाउँमा, आई ए वान ओभर आई ए टु।',
      lines: [['step', <>Shunt: <K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}}`}</K> · series: <K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}} \cdot \dfrac{I_{a1}}{I_{a2}}`}</K></>]],
      ask: {
        q: 'Shunt motor: E b 200 bata 180 V ma jharyo, N ek 1000 rpm. N dui kati?',
        voice: 'शन्ट मोटर — ई बी टु हन्ड्रेडबाट वान एट्टी भोल्टमा झर्‍यो, एन वान थाउजेन्ड आर पी एम। एन टु कति?',
        options: ['900 rpm', '1111 rpm', '800 rpm'],
        answer: 0,
        why: 'N2 = 1000 × 180/200 = 900 rpm (φ constant).',
      },
    },
  ],
  lecturer: [
    {
      say: 'From the EMF equation, N equals sixty A over P Z, times E b over phi.',
      voice: 'फ्रम द इएमएफ इक्वेसन — एन इक्वल्स, सिक्स्टी ए ओभर पी जेड, टाइम्स ई बी ओभर फाइ।',
      lines: [['h', <>Speed equation</>], ['step', <><K>{String.raw`\begin{aligned} E_b &= \dfrac{P\phi Z N}{60A} && \cdots(1) \\ N &= \dfrac{60A}{PZ}\cdot\dfrac{E_b}{\phi} && \cdots(2) \end{aligned}`}</K></>]],
    },
    {
      say: 'For a given machine, N equals K E b over phi, arthat K times V minus I a R a, over phi.',
      voice: 'फर अ गिभन मेसिन — एन इक्वल्स के ई बी ओभर फाइ, अर्थात के टाइम्स भी माइनस आई ए आर ए, ओभर फाइ।',
      lines: [['step', <><K>{String.raw`\begin{aligned} N &= K\,\dfrac{E_b}{\phi} && \\ &= K\,\dfrac{V - I_aR_a}{\phi} && \cdots(3) \end{aligned}`}</K></>]],
    },
    {
      say: 'Speed ratio: N dui over N ek equals E b dui over E b ek, times phi ek over phi dui.',
      voice: 'स्पिड रेसियो — एन टु ओभर एन वान इक्वल्स, ई बी टु ओभर ई बी वान, टाइम्स फाइ वान ओभर फाइ टु।',
      lines: [['step', <><K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}} \times \dfrac{\phi_1}{\phi_2} \qquad \cdots(4)`}</K></>]],
    },
    {
      say: 'Shunt motor ma phi constant; series motor ma unsaturated field ma phi I a sanga proportional.',
      voice: 'शन्ट मोटरमा फाइ कन्स्टेन्ट; सिरिज मोटरमा, अनस्याचुरेटेड फिल्डमा, फाइ आई एसँग प्रोपोर्सनल।',
      lines: [['step', <><Pts items={[<>Shunt (φ constant): <K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}}`}</K></>, <>Series (<K>{String.raw`\phi \propto I_a`}</K>): <K>{String.raw`\dfrac{N_2}{N_1} = \dfrac{E_{b2}}{E_{b1}}\cdot\dfrac{I_{a1}}{I_{a2}}`}</K></>]} /></>]],
      ask: {
        q: 'Series motor ko speed ratio ma phi ek over phi dui ko thau ma k rakhincha?',
        voice: 'सिरिज मोटरको स्पिड रेसियोमा, फाइ वान ओभर फाइ टुको ठाउँमा के राखिन्छ?',
        options: ['Ia1 / Ia2', 'Ia2 / Ia1', '1'],
        answer: 0,
        why: 'φ ∝ I a, tesaile φ1/φ2 = I a1/I a2.',
      },
    },
  ],
});

/* ── Big picture ─────────────────────────────────────────────────────── */
export const shuntControl45 = answer('Model answer: shunt motor ko speed control', {
  draw: speedCtrlFigure,
  viewBox: '0 0 360 214',
  papers: ['2071 Bhadra', '2069 Bhadra', '2065 Chaitra'],
  marks: '[8]',
  q: 'Explain the methods of speed control of a DC shunt motor (armature control and field control).',
  read: {
    say: 'IOE ma tin choti sodhiyeko, aath marks: explain the methods of speed control of a DC shunt motor. Field control char marks, armature control char marks.',
    voice: 'आइओईमा तीन चोटि सोधिएको, आठ मार्क्स — एक्सप्लेन द मेथड्स अफ स्पिड कन्ट्रोल अफ अ डीसी शन्ट मोटर। फिल्ड कन्ट्रोल चार मार्क्स, आर्मेचर कन्ट्रोल चार मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Field control [4]</H><Pts items={[<>Speed equation: <K>{String.raw`N \propto \dfrac{V - I_a(R_a + R)}{\phi}`}</K></>, <>Rheostat R<sub>f</sub> in series with the shunt field (Fig. 10)</>]} /></>,
      say: 'Speed equation: N, V minus I a times R a plus R, over phi sanga proportional. Field control ma shunt field sanga rheostat R f.',
      voice: 'स्पिड इक्वेसन — एन, भी माइनस आई ए टाइम्स आर ए प्लस आर, ओभर फाइसँग प्रोपोर्सनल। फिल्ड कन्ट्रोलमा, शन्ट फिल्डसँग रियोस्टेट आर एफ।',
    },
    {
      node: <><Pts items={[<>R<sub>f</sub> ↑ → I<sub>sh</sub> ↓ → φ ↓ → N ↑ (above normal only)</>, <>Efficient (small I<sub>sh</sub>), simple; poor commutation at very weak field</>]} /></>,
      say: 'R f badhauda phi ghatcha ra speed normal bhanda mathi badhcha. I sh sano bhayeko le efficient, tara dherai weak field ma commutation bigrincha.',
      voice: 'आर एफ बढाउँदा फाइ घट्छ, र स्पिड नर्मलभन्दा माथि बढ्छ। आई एस एच सानो भएकोले इफिसियन्ट, तर धेरै विक फिल्डमा कम्युटेसन बिग्रिन्छ।',
    },
    {
      page: true,
      node: <><H>(b) Armature control [4]</H><Pts items={[<>Variable R in series with the armature (Fig. 10)</>, <>R ↑ → <K>{String.raw`I_a(R_a + R)`}</K> ↑ → E<sub>b</sub> ↓ → N ↓ (below normal)</>]} /></>,
      say: 'Armature control: armature sanga series ma variable R. R badhauda drop badhcha, E b ghatcha, ra speed normal bhanda tala.',
      voice: 'आर्मेचर कन्ट्रोल — आर्मेचरसँग सिरिजमा भेरिएबल आर। आर बढाउँदा ड्रप बढ्छ, ई बी घट्छ, र स्पिड नर्मलभन्दा तल।',
    },
    {
      node: <><Pts items={[<>Large <K>{String.raw`I_a^2R`}</K> loss, poor speed regulation</>, <>Used for short periods: cranes, hoists</>]} /></>,
      say: 'Kamjori: R ma I a square R ko thulo loss ra poor regulation. Tesaile crane ra hoist jasto thorai samaya ko kaam ma.',
      voice: 'कमजोरी — आरमा आई ए स्क्वायर आरको ठूलो लस, र पुअर रेगुलेसन। त्यसैले, क्रेन र होइस्ट जस्तो थोरै समयको काममा।',
      ask: {
        q: 'Normal bhanda mathi ko speed kun method le paincha?',
        voice: 'नर्मलभन्दा माथिको स्पिड कुन मेथडले पाइन्छ?',
        options: ['Field control', 'Armature control', 'Dubai le'],
        answer: 0,
        why: 'Field control le φ ghataucha, N badhcha; armature control le N ghataucha.',
      },
    },
  ],
});

export const armatureR45 = answer('IOE 2072 Ashwin: armature resistance for 800 rpm', {
  papers: ['2072 Ashwin'],
  marks: '[8]',
  q: 'A 200 V shunt motor driving a constant-torque load takes 50 A at 1000 rpm. Ra = 0.1 Ω, Rsh = 100 Ω. Find the resistance to be added in the armature circuit to reduce the speed to 800 rpm.',
  read: {
    say: 'IOE 2072 Ashwin, aath marks: 200 volt shunt motor, constant torque load, 1000 rpm ma 50 ampere. R a 0.1 ohm, R sh 100 ohm. 800 rpm ko lagi armature ma kati resistance thapne?',
    voice: 'आइओई दुई हजार बहत्तर असोज, आठ मार्क्स — टु हन्ड्रेड भोल्ट शन्ट मोटर, कन्स्टेन्ट टर्क लोड, थाउजेन्ड आर पी एममा फिफ्टी एम्पियर। आर ए जिरो पोइन्ट वान ओम, आर एस एच वान हन्ड्रेड ओम। एट हन्ड्रेड आर पी एमको लागि, आर्मेचरमा कति रेजिस्टेन्स थप्ने?',
  },
  points: [
    {
      node: <><H>Given</H><Pts items={[<>V = 200 V, I<sub>L</sub> = 50 A, N<sub>1</sub> = 1000 rpm, N<sub>2</sub> = 800 rpm</>, <>R<sub>a</sub> = 0.1 Ω, R<sub>sh</sub> = 100 Ω, torque constant</>]} /></>,
      say: 'Given: V 200 volt, I L 50 ampere, N ek 1000, N dui 800 rpm, R a 0.1 ohm, R sh 100 ohm, ra torque constant.',
      voice: 'गिभन — भी टु हन्ड्रेड भोल्ट, आई एल फिफ्टी एम्पियर, एन वान थाउजेन्ड, एन टु एट हन्ड्रेड आर पी एम, आर ए जिरो पोइन्ट वान ओम, आर एस एच वान हन्ड्रेड ओम, र टर्क कन्स्टेन्ट।',
    },
    {
      node: <><H>Solution</H><K>{String.raw`\begin{aligned} I_{sh} &= \dfrac{200}{100} \\ &= 2\ \text{A} \\ I_{a1} &= 50 - 2 \\ &= 48\ \text{A} \\ E_{b1} &= 200 - 48(0.1) \\ &= 195.2\ \text{V} \end{aligned}`}</K></>,
      say: 'I sh 2 ampere, tesaile I a ek 48 ampere. E b ek equals 200 minus 48 times 0.1, arthat 195.2 volt.',
      voice: 'आई एस एच टु एम्पियर, त्यसैले आई ए वान फोर्टी एट एम्पियर। ई बी वान इक्वल्स — टु हन्ड्रेड माइनस फोर्टी एट टाइम्स जिरो पोइन्ट वान, अर्थात वान नाइन्टी फाइभ पोइन्ट टु भोल्ट।',
    },
    {
      node: <><Pts items={[<>Torque and φ constant → <K>{String.raw`I_{a2} = I_{a1} = 48`}</K> A</>]} /><K>{String.raw`\begin{aligned} E_{b2} &= E_{b1} \times \dfrac{N_2}{N_1} \\ &= 195.2 \times \dfrac{800}{1000} \\ &= 156.16\ \text{V} \end{aligned}`}</K></>,
      say: 'Torque ra phi constant bhayeko le I a dui pani 48 ampere. E b dui equals 195.2 times 800 over 1000, arthat 156.16 volt.',
      voice: 'टर्क र फाइ कन्स्टेन्ट भएकोले, आई ए टु पनि फोर्टी एट एम्पियर। ई बी टु इक्वल्स — वान नाइन्टी फाइभ पोइन्ट टु टाइम्स एट हन्ड्रेड ओभर थाउजेन्ड, अर्थात वान फिफ्टी सिक्स पोइन्ट वान सिक्स भोल्ट।',
      ask: {
        q: 'Constant torque ra constant flux ma I a kina badlindaina?',
        voice: 'कन्स्टेन्ट टर्क र कन्स्टेन्ट फ्लक्समा आई ए किन बदलिँदैन?',
        options: ['Ta ∝ φ Ia: Ta ra φ constant bhaye Ia constant', 'Eb constant bhayeko le', 'R thapeko le'],
        answer: 0,
        why: 'T a ∝ φ I a; dubai constant bhaye I a pani constant.',
      },
    },
    {
      page: true,
      node: <><K>{String.raw`\begin{aligned} R_a + R &= \dfrac{200 - 156.16}{48} \\ &= 0.9133\ \Omega \\ R &= 0.9133 - 0.1 \\ &= \boxed{0.813\ \Omega} \end{aligned}`}</K></>,
      say: 'R a plus R equals 200 minus 156.16, over 48, arthat 0.9133 ohm. Tesaile thapnu parne R equals 0.813 ohm.',
      voice: 'आर ए प्लस आर इक्वल्स — टु हन्ड्रेड माइनस वान फिफ्टी सिक्स पोइन्ट वान सिक्स, ओभर फोर्टी एट, अर्थात जिरो पोइन्ट नाइन वान थ्री थ्री ओम। त्यसैले थप्नुपर्ने आर इक्वल्स, जिरो पोइन्ट एट वान थ्री ओम।',
    },
  ],
});
