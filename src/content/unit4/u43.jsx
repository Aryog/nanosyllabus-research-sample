import { K, Pts, answer, duo } from '../video/kit.jsx';
import { effFigure, flowFigure, lossFigure } from './figs.jsx';

/*
  4.3 Losses and efficiency. Tutor (default) and Lecturer over the book
  figures (Fig. 4 losses, Fig. 5 power flow, Fig. 6 efficiency curve). Big
  picture: the two past numericals (both set on a shunt generator; the loss
  groups are the same as a motor's).
  Recomputed: 2074 Bhadra IL 150, Ish 4, Ia 154 A, E 207.7 V, Cu 1185.8 + 800 =
  1985.8 W, η = 30000/32985.8 = 90.95 %. 2083 Baishakh Ia 100 A, E 210 V,
  losses 1000 + 800 + 2500 = 4300 W, η = 19200/23500 = 81.70 %.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

export const opener43 = duo('4.3 ma k padhne?', {
  draw: lossFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Unit 4.3: losses ra efficiency. Motor lai diyeko sabai power shaft samma pugdaina, kehi bato mai harauncha.',
      voice: 'युनिट फोर पोइन्ट थ्री — लसेस र इफिसियन्सी। मोटरलाई दिएको सबै पावर साफ्टसम्म पुग्दैन, केही बाटोमै हराउँछ।',
      lines: [['h', <>4.3</>], ['step', <>Losses ra efficiency</>]],
    },
    {
      say: 'Pahila power kaha kaha harauncha, tyo loss haru chinchau: copper, iron ra mechanical.',
      voice: 'पहिला, पावर कहाँ कहाँ हराउँछ, ती लस हरू चिन्छौं — कपर, आइरन, र मेकानिकल।',
      lines: [['step', <>1. Losses: copper · iron · mechanical</>]],
    },
    {
      say: 'Tyaspachi power flow ra efficiency, ani efficiency maximum kahile huncha bhanne condition derive garchau.',
      voice: 'त्यसपछि पावर फ्लो र इफिसियन्सी, अनि इफिसियन्सी म्याक्सिमम कहिले हुन्छ भन्ने कन्डिसन डेराइभ गर्छौं।',
      lines: [['step', <>2. Power flow, efficiency · 3. Condition for maximum efficiency</>]],
    },
    {
      say: 'Antim ma IOE ka duita efficiency numerical: 2074 Bhadra ra 2083 Baishakh.',
      voice: 'अन्तिममा, आइओईका दुईटा इफिसियन्सी न्युमेरिकल — दुई हजार चौहत्तर भदौ, र दुई हजार त्रियासी वैशाख।',
      lines: [['hook', <>IOE: efficiency numericals, 2074 Bhadra · 2083 Baishakh (ECM) [5]</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.3: losses and efficiency of a DC motor.',
      voice: 'युनिट फोर पोइन्ट थ्री — लसेस एन्ड इफिसियन्सी अफ अ डीसी मोटर।',
      lines: [['h', <>Unit 4.3</>], ['step', <>Losses and efficiency</>]],
    },
    {
      say: 'Pahilo: losses ko classification, copper, iron ra mechanical.',
      voice: 'पहिलो — लसेसको क्लासिफिकेसन, कपर, आइरन, र मेकानिकल।',
      lines: [['step', <><H>1. Losses</H>copper, iron (core), mechanical</>]],
    },
    {
      say: 'Dosro: power flow diagram, efficiency ra condition for maximum efficiency.',
      voice: 'दोस्रो — पावर फ्लो डायग्राम, इफिसियन्सी, र कन्डिसन फर म्याक्सिमम इफिसियन्सी।',
      lines: [['step', <><H>2. Efficiency</H>power flow, condition for maximum efficiency</>]],
    },
    {
      say: 'Big picture ma duita past numerical solve garincha.',
      voice: 'बिग पिक्चरमा दुईटा पास्ट न्युमेरिकल सल्भ गरिन्छ।',
      lines: [['hook', <>IOE: 2074 Bhadra · 2083 Baishakh (ECM) [5]</>]],
    },
  ],
});

/* ── Terms: losses ───────────────────────────────────────────────────── */
export const losses43 = duo('DC motor ka losses', {
  draw: lossFigure,
  viewBox: '0 0 360 230',
  tutor: [
    {
      say: 'Motor ma loss tin thau bata hunchan: winding ko resistance, iron core, ra ghumne bhag ko gharshan.',
      voice: 'मोटरमा लस तीन ठाउँबाट हुन्छन् — वाइन्डिङको रेजिस्टेन्स, आइरन कोर, र घुम्ने भागको घर्षण।',
      lines: [['h', <>Losses in a DC motor</>], ['step', <>Three groups: copper · iron · mechanical</>]],
    },
    {
      say: 'Copper loss winding ko resistance ma current bagda heat bhayera jaancha: armature ma I a square R a, field ma I sh square R sh. Brush contact ma pani thorai.',
      voice: 'कपर लस, वाइन्डिङको रेजिस्टेन्समा करेन्ट बग्दा हिट भएर जान्छ — आर्मेचरमा आई ए स्क्वायर आर ए, फिल्डमा आई एस एच स्क्वायर आर एस एच। ब्रस कन्ट्याक्टमा पनि थोरै।',
      lines: [['step', <>Copper: <K>{String.raw`I_a^2R_a`}</K>, <K>{String.raw`I_{sh}^2R_{sh}`}</K>, brush contact</>]],
      ask: {
        q: 'Armature current dobar bhaye armature copper loss kati guna huncha?',
        voice: 'आर्मेचर करेन्ट दोब्बर भए, आर्मेचर कपर लस कति गुना हुन्छ?',
        options: ['4 guna', '2 guna', 'Utti nai'],
        answer: 0,
        why: 'Loss = I a² R a, tesaile 2² = 4 guna.',
      },
    },
    {
      say: 'Iron loss armature core ma huncha, kinaki ghumda core ko magnetism ulto-sulto bhairahancha: hysteresis loss ra eddy current loss.',
      voice: 'आइरन लस आर्मेचर कोरमा हुन्छ, किनकि घुम्दा कोरको म्याग्नेटिज्म उल्टो सुल्टो भइरहन्छ — हिस्टेरेसिस लस, र एडी करेन्ट लस।',
      lines: [['step', <>Iron (core): hysteresis + eddy current (reduced by laminations)</>]],
    },
    {
      say: 'Mechanical loss bearing ra brush ko friction, ani hawa sanga ko windage bata huncha.',
      voice: 'मेकानिकल लस — बेयरिङ र ब्रसको फ्रिक्सन, अनि हावासँगको विन्डेजबाट हुन्छ।',
      lines: [['step', <>Mechanical: bearing friction, brush friction, windage</>]],
    },
    {
      say: 'Shunt motor ma speed ra flux lagbhag constant, tesaile iron, mechanical ra shunt field copper loss constant loss W c. Armature copper loss load sanga badhcha: variable loss.',
      voice: 'शन्ट मोटरमा स्पिड र फ्लक्स लगभग कन्स्टेन्ट, त्यसैले आइरन, मेकानिकल, र शन्ट फिल्ड कपर लस — कन्स्टेन्ट लस डब्लु सी। आर्मेचर कपर लस, लोडसँग बढ्छ — भेरिएबल लस।',
      lines: [['idea', <>Constant losses W<sub>c</sub> = iron + mechanical + shunt Cu · variable loss = <K>{String.raw`I_a^2R_a`}</K></>]],
    },
  ],
  lecturer: [
    {
      say: 'DC motor ka losses tin bhag ma bandincha: copper losses, iron losses ra mechanical losses.',
      voice: 'डीसी मोटरका लसेस तीन भागमा बाँडिन्छ — कपर लसेस, आइरन लसेस, र मेकानिकल लसेस।',
      lines: [['h', <>Classification of losses (Fig. 4)</>], ['step', <><Pts items={[<>Copper losses · iron (core) losses · mechanical losses</>]} /></>]],
    },
    {
      say: 'Copper losses: armature copper loss I a square R a, field copper loss, ra brush contact loss.',
      voice: 'कपर लसेस — आर्मेचर कपर लस आई ए स्क्वायर आर ए, फिल्ड कपर लस, र ब्रस कन्ट्याक्ट लस।',
      lines: [['step', <><Pts items={[<>(i) Copper: armature <K>{String.raw`I_a^2R_a`}</K>; shunt field <K>{String.raw`I_{sh}^2R_{sh}`}</K>; series field <K>{String.raw`I_a^2R_{se}`}</K>; brush contact</>]} /></>]],
    },
    {
      say: 'Iron losses: hysteresis loss ra eddy current loss, armature core ma. Laminated core le eddy current loss ghataucha.',
      voice: 'आइरन लसेस — हिस्टेरेसिस लस र एडी करेन्ट लस, आर्मेचर कोरमा। ल्यामिनेटेड कोरले एडी करेन्ट लस घटाउँछ।',
      lines: [['step', <><Pts items={[<>(ii) Iron: hysteresis and eddy current loss in the armature core; laminations reduce eddy loss</>]} /></>]],
      ask: {
        q: 'Armature core laminated kina banaincha?',
        voice: 'आर्मेचर कोर ल्यामिनेटेड किन बनाइन्छ?',
        options: ['Eddy current loss ghatauna', 'Copper loss ghatauna', 'Friction ghatauna'],
        answer: 0,
        why: 'Patla insulated lamination le eddy current ko bato saano banaucha.',
      },
    },
    {
      say: 'Mechanical losses: bearing friction, brush friction ra windage.',
      voice: 'मेकानिकल लसेस — बेयरिङ फ्रिक्सन, ब्रस फ्रिक्सन, र विन्डेज।',
      lines: [['step', <><Pts items={[<>(iii) Mechanical: bearing and brush friction, windage</>]} /></>]],
    },
    {
      say: 'Shunt motor ma iron, mechanical ra shunt field copper loss lai constant losses W c bhanincha. Armature copper loss variable loss ho.',
      voice: 'शन्ट मोटरमा, आइरन, मेकानिकल, र शन्ट फिल्ड कपर लसलाई — कन्स्टेन्ट लसेस डब्लु सी भनिन्छ। आर्मेचर कपर लस, भेरिएबल लस हो।',
      lines: [['step', <><Pts items={[<>Constant losses W<sub>c</sub>: iron + mechanical + shunt field Cu</>, <>Variable loss: <K>{String.raw`I_a^2R_a`}</K></>]} /></>]],
    },
  ],
});

/* ── Terms: power flow and efficiency ────────────────────────────────── */
export const flow43 = duo('Derivation: power flow ra efficiency', {
  draw: flowFigure,
  viewBox: '0 0 360 180',
  tutor: [
    {
      say: 'Supply bata motor le V times I L power lincha. Yahi input ho.',
      voice: 'सप्लाईबाट मोटरले — भी टाइम्स आई एल पावर लिन्छ। यही इनपुट हो।',
      lines: [['h', <>Power flow</>], ['step', <>Input = <K>{String.raw`V I_L`}</K></>]],
    },
    {
      say: 'Pahila winding ma copper loss jaancha. Baki rahancha E b times I a.',
      voice: 'पहिला वाइन्डिङमा कपर लस जान्छ। बाँकी रहन्छ — ई बी टाइम्स आई ए।',
      lines: [['step', <>− copper losses (<K>{String.raw`I_a^2R_a + I_{sh}^2R_{sh}`}</K>)</>]],
    },
    {
      say: 'E b I a nai armature le banaune mechanical power P m ho, gross mechanical power.',
      voice: 'ई बी आई ए नै, आर्मेचरले बनाउने मेकानिकल पावर पी एम हो — ग्रस मेकानिकल पावर।',
      lines: [['step', <>= <K>{String.raw`P_m = E_bI_a`}</K> (gross mechanical power)</>]],
    },
    {
      say: 'Tyaspachi iron, friction ra windage loss katincha. Baki shaft ma output power aaucha.',
      voice: 'त्यसपछि, आइरन, फ्रिक्सन र विन्डेज लस काटिन्छ। बाँकी, साफ्टमा आउटपुट पावर आउँछ।',
      lines: [['step', <>− iron, friction, windage = output (shaft) power</>]],
    },
    {
      say: 'Overall wa commercial efficiency output over input ho. Mechanical efficiency output over P m, ra electrical efficiency P m over input.',
      voice: 'ओभरअल वा कमर्सियल इफिसियन्सी — आउटपुट ओभर इनपुट हो। मेकानिकल इफिसियन्सी — आउटपुट ओभर पी एम, र इलेक्ट्रिकल इफिसियन्सी — पी एम ओभर इनपुट।',
      lines: [['eq', tex(String.raw`\eta_c = \dfrac{\text{output}}{\text{input}}`)], ['step', <><K>{String.raw`\eta_m = \dfrac{\text{output}}{E_bI_a}`}</K> · <K>{String.raw`\eta_e = \dfrac{E_bI_a}{VI_L}`}</K></>]],
      ask: {
        q: 'Input 4400 W ra output 3700 W bhaye commercial efficiency kati?',
        voice: 'इनपुट चवालिस सय वाट र आउटपुट सैंतिस सय वाट भए, कमर्सियल इफिसियन्सी कति?',
        options: ['84.1 %', '90 %', '75 %'],
        answer: 0,
        why: '3700 / 4400 = 0.841, arthat 84.1 %.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Power flow diagram, Figure 5: input V I L.',
      voice: 'पावर फ्लो डायग्राम, फिगर फाइभ — इनपुट भी आई एल।',
      lines: [['h', <>Power flow (Fig. 5)</>], ['step', <><Pts items={[<>Input from the supply: <K>{String.raw`VI_L`}</K></>]} /></>]],
    },
    {
      say: 'Input bata armature ra field ka copper losses ghatcha.',
      voice: 'इनपुटबाट, आर्मेचर र फिल्डका कपर लसेस घट्छ।',
      lines: [['step', <><Pts items={[<>Less copper losses <K>{String.raw`I_a^2R_a + I_{sh}^2R_{sh}`}</K></>]} /></>]],
    },
    {
      say: 'Baki power armature ko gross mechanical power P m equals E b I a.',
      voice: 'बाँकी पावर, आर्मेचरको ग्रस मेकानिकल पावर — पी एम इक्वल्स ई बी आई ए।',
      lines: [['step', <><Pts items={[<>Gross mechanical power <K>{String.raw`P_m = E_bI_a`}</K></>]} /></>]],
    },
    {
      say: 'Iron ra mechanical losses ghataye pachi shaft output power aaucha.',
      voice: 'आइरन र मेकानिकल लसेस घटाएपछि, साफ्ट आउटपुट पावर आउँछ।',
      lines: [['step', <><Pts items={[<>Less iron and mechanical losses = output (shaft) power</>]} /></>]],
    },
    {
      say: 'Efficiencies: commercial equals output over input, mechanical equals output over E b I a, electrical equals E b I a over V I L.',
      voice: 'इफिसियन्सीज — कमर्सियल इक्वल्स आउटपुट ओभर इनपुट, मेकानिकल इक्वल्स आउटपुट ओभर ई बी आई ए, इलेक्ट्रिकल इक्वल्स ई बी आई ए ओभर भी आई एल।',
      lines: [['step', tex(String.raw`\begin{aligned} \eta_c &= \dfrac{\text{output}}{VI_L} \\ \eta_m &= \dfrac{\text{output}}{E_bI_a} \\ \eta_e &= \dfrac{E_bI_a}{VI_L} \end{aligned}`)]],
      ask: {
        q: 'Commercial efficiency kun ho?',
        voice: 'कमर्सियल इफिसियन्सी कुन हो?',
        options: ['Output / input', 'Pm / input', 'Output / Pm'],
        answer: 0,
        why: 'Commercial (overall) efficiency = shaft output / electrical input.',
      },
    },
  ],
});

/* ── Derivation: condition for maximum efficiency ────────────────────── */
export const maxEff43 = duo('Derivation: maximum efficiency ko condition', {
  draw: effFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Efficiency output over input. Input V I, ra losses constant W c plus variable I square R a. Shunt motor ma I L lagbhag I a, tesaile I lekhchau.',
      voice: 'इफिसियन्सी — आउटपुट ओभर इनपुट। इनपुट भी आई, र लसेस — कन्स्टेन्ट डब्लु सी प्लस भेरिएबल आई स्क्वायर आर ए। शन्ट मोटरमा आई एल लगभग आई ए, त्यसैले आई लेख्छौं।',
      lines: [['h', <>Condition for maximum efficiency</>], ['step', tex(String.raw`\begin{aligned} \eta &= \dfrac{VI - W_c - I^2R_a}{VI} \\ &= 1 - \dfrac{W_c}{VI} - \dfrac{IR_a}{V} \end{aligned}`)]],
    },
    {
      say: 'Constant loss ko bhag W c over V I, load badhda ghatdai jaancha.',
      voice: 'कन्स्टेन्ट लसको भाग — डब्लु सी ओभर भी आई, लोड बढ्दा घट्दै जान्छ।',
      lines: [['step', <><K>{String.raw`\dfrac{W_c}{VI}`}</K> falls as I rises</>]],
    },
    {
      say: 'Variable loss ko bhag I R a over V bhane load sanga badhdai jaancha. Efficiency ko top yi duita ko balance ma huncha.',
      voice: 'भेरिएबल लसको भाग, आई आर ए ओभर भी भने, लोडसँग बढ्दै जान्छ। इफिसियन्सीको टप, यी दुईटाको ब्यालेन्समा हुन्छ।',
      lines: [['step', <><K>{String.raw`\dfrac{IR_a}{V}`}</K> rises with I</>]],
    },
    {
      say: 'Maximum ko lagi d eta by d I zero rakhchau. W c over V I square minus R a over V equals zero.',
      voice: 'म्याक्सिममको लागि, डी इटा बाई डी आई जिरो राख्छौं। डब्लु सी ओभर भी आई स्क्वायर, माइनस आर ए ओभर भी, इक्वल्स जिरो।',
      lines: [['step', tex(String.raw`\begin{aligned} \dfrac{d\eta}{dI} &= \dfrac{W_c}{VI^2} - \dfrac{R_a}{V} \\ &= 0 \end{aligned}`)]],
    },
    {
      say: 'Tesaile I square R a equals W c. Variable loss constant loss barabar hunda efficiency maximum huncha.',
      voice: 'त्यसैले, आई स्क्वायर आर ए इक्वल्स डब्लु सी। भेरिएबल लस, कन्स्टेन्ट लस बराबर हुँदा, इफिसियन्सी म्याक्सिमम हुन्छ।',
      lines: [['eq', tex(String.raw`I^2R_a = W_c`)], ['idea', <>Maximum efficiency when variable loss = constant loss</>]],
      ask: {
        q: 'W c 500 W ra R a 0.5 ohm bhaye, maximum efficiency kun current ma?',
        voice: 'डब्लु सी पाँच सय वाट र आर ए जिरो पोइन्ट फाइभ ओम भए, म्याक्सिमम इफिसियन्सी कुन करेन्टमा?',
        options: ['31.6 A', '1000 A', '250 A'],
        answer: 0,
        why: 'I² × 0.5 = 500 → I² = 1000 → I = 31.6 A.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Let input V I, constant losses W c ra variable loss I square R a. Efficiency eta equals V I minus W c minus I square R a, over V I.',
      voice: 'लेट इनपुट भी आई, कन्स्टेन्ट लसेस डब्लु सी, र भेरिएबल लस आई स्क्वायर आर ए। इफिसियन्सी — इटा इक्वल्स, भी आई माइनस डब्लु सी माइनस आई स्क्वायर आर ए, ओभर भी आई।',
      lines: [['h', <>Condition for maximum efficiency</>], ['step', <><K>{String.raw`\begin{aligned} \eta &= \dfrac{VI - W_c - I^2R_a}{VI} && \\ &= 1 - \dfrac{W_c}{VI} - \dfrac{IR_a}{V} && \cdots(1) \end{aligned}`}</K></>]],
    },
    {
      say: 'Figure 6 ma constant loss W c load sanga barabar rahancha.',
      voice: 'फिगर सिक्समा, कन्स्टेन्ट लस डब्लु सी, लोडसँग बराबर रहन्छ।',
      lines: [['step', <><Pts items={[<>W<sub>c</sub> is constant at every load (Fig. 6)</>]} /></>]],
    },
    {
      say: 'Variable loss I square R a load sanga parabola jastai badhcha.',
      voice: 'भेरिएबल लस, आई स्क्वायर आर ए, लोडसँग प्याराबोला जस्तै बढ्छ।',
      lines: [['step', <><Pts items={[<>Variable loss <K>{String.raw`I^2R_a`}</K> rises as a parabola</>]} /></>]],
    },
    {
      say: 'Equation ek lai I sanga differentiate garera zero rakhda, W c over V I square equals R a over V.',
      voice: 'इक्वेसन वानलाई आईसँग डिफरेन्सिएट गरेर जिरो राख्दा — डब्लु सी ओभर भी आई स्क्वायर इक्वल्स आर ए ओभर भी।',
      lines: [['step', <><K>{String.raw`\begin{aligned} \dfrac{d\eta}{dI} &= \dfrac{W_c}{VI^2} - \dfrac{R_a}{V} && \\ &= 0 && \cdots(2) \end{aligned}`}</K></>]],
    },
    {
      say: 'Tesaile I square R a equals W c. Hence efficiency is maximum when variable loss equals constant loss.',
      voice: 'त्यसैले, आई स्क्वायर आर ए इक्वल्स डब्लु सी। हेन्स इफिसियन्सी इज म्याक्सिमम, ह्वेन भेरिएबल लस इक्वल्स कन्स्टेन्ट लस।',
      lines: [['step', <><K>{String.raw`\boxed{I^2R_a = W_c} \qquad \cdots(3)`}</K><Pts items={[<>η is maximum when variable loss = constant loss.</>]} /></>]],
      ask: {
        q: 'Efficiency maximum kahile huncha?',
        voice: 'इफिसियन्सी म्याक्सिमम कहिले हुन्छ?',
        options: ['Variable loss = constant loss', 'Load zero hunda', 'Copper loss zero hunda'],
        answer: 0,
        why: 'dη/dI = 0 bata I² R a = W c.',
      },
    },
  ],
});

/* ── Big picture: the two numericals ─────────────────────────────────── */
export const eff2074 = answer('IOE 2074 Bhadra: EMF, copper loss ra efficiency', {
  papers: ['2074 Bhadra'],
  marks: '',
  q: 'A shunt generator delivers 30 kW at 200 V. Ra = 0.05 Ω, Rsh = 50 Ω, iron and friction losses = 1000 W. Find (i) the EMF, (ii) the copper losses, (iii) the efficiency.',
  read: {
    say: 'IOE 2074 Bhadra: shunt generator 30 kilowatt 200 volt ma dincha. R a 0.05 ohm, R sh 50 ohm, iron ra friction loss 1000 watt. EMF, copper loss ra efficiency nikala.',
    voice: 'आइओई दुई हजार चौहत्तर भदौ — शन्ट जेनेरेटर, थर्टी किलोवाट, टु हन्ड्रेड भोल्टमा दिन्छ। आर ए जिरो पोइन्ट जिरो फाइभ ओम, आर एस एच फिफ्टी ओम, आइरन र फ्रिक्सन लस थाउजेन्ड वाट। इएमएफ, कपर लस, र इफिसियन्सी निकाल।',
  },
  points: [
    {
      node: <><H>Given</H><Pts items={[<>Output 30 kW, V = 200 V</>, <>R<sub>a</sub> = 0.05 Ω, R<sub>sh</sub> = 50 Ω, W<sub>i+f</sub> = 1000 W</>]} /></>,
      say: 'Given: output 30 kilowatt, V 200 volt, R a 0.05 ohm, R sh 50 ohm, iron ra friction loss 1000 watt.',
      voice: 'गिभन — आउटपुट थर्टी किलोवाट, भी टु हन्ड्रेड भोल्ट, आर ए जिरो पोइन्ट जिरो फाइभ ओम, आर एस एच फिफ्टी ओम, आइरन र फ्रिक्सन लस थाउजेन्ड वाट।',
    },
    {
      node: <><H>(i) EMF</H><K>{String.raw`\begin{aligned} I_L &= \dfrac{30000}{200} \\ &= 150\ \text{A} \\ I_{sh} &= \dfrac{200}{50} \\ &= 4\ \text{A} \\ I_a &= 150 + 4 \\ &= 154\ \text{A} \\ E &= 200 + 154(0.05) \\ &= \boxed{207.7\ \text{V}} \end{aligned}`}</K></>,
      say: 'I L 150 ampere, I sh 4 ampere, tesaile I a 154 ampere. EMF E equals 200 plus 154 times 0.05, arthat 207.7 volt.',
      voice: 'आई एल वान फिफ्टी एम्पियर, आई एस एच फोर एम्पियर, त्यसैले आई ए वान फिफ्टी फोर एम्पियर। इएमएफ — ई इक्वल्स टु हन्ड्रेड प्लस वान फिफ्टी फोर टाइम्स जिरो पोइन्ट जिरो फाइभ, अर्थात टु हन्ड्रेड सेभेन पोइन्ट सेभेन भोल्ट।',
    },
    {
      page: true,
      node: <><H>(ii) Copper losses</H><K>{String.raw`\begin{aligned} I_a^2R_a &= 154^2(0.05) \\ &= 1185.8\ \text{W} \\ VI_{sh} &= 200 \times 4 \\ &= 800\ \text{W} \\ \text{Cu loss} &= \boxed{1985.8\ \text{W}} \end{aligned}`}</K></>,
      say: 'Armature copper loss 154 square times 0.05, arthat 1185.8 watt. Shunt field loss 200 times 4, 800 watt. Total copper loss 1985.8 watt.',
      voice: 'आर्मेचर कपर लस — वान फिफ्टी फोर स्क्वायर टाइम्स जिरो पोइन्ट जिरो फाइभ, अर्थात इलेभेन एट्टी फाइभ पोइन्ट एट वाट। शन्ट फिल्ड लस — टु हन्ड्रेड टाइम्स फोर, एट हन्ड्रेड वाट। टोटल कपर लस, नाइन्टिन एट्टी फाइभ पोइन्ट एट वाट।',
    },
    {
      node: <><H>(iii) Efficiency</H><K>{String.raw`\begin{aligned} \text{Losses} &= 1985.8 + 1000 \\ &= 2985.8\ \text{W} \\ \eta &= \dfrac{30000}{30000 + 2985.8} \\ &= \boxed{90.95\,\%} \end{aligned}`}</K></>,
      say: 'Total losses 2985.8 watt. Efficiency 30000 over 32985.8, arthat 90.95 percent.',
      voice: 'टोटल लसेस — टु थाउजेन्ड नाइन हन्ड्रेड एट्टी फाइभ पोइन्ट एट वाट। इफिसियन्सी — थर्टी थाउजेन्ड ओभर थर्टी टु थाउजेन्ड नाइन हन्ड्रेड एट्टी फाइभ पोइन्ट एट, अर्थात नाइन्टी पोइन्ट नाइन फाइभ पर्सेन्ट।',
      ask: {
        q: 'Generator ma input kasari nikalincha?',
        voice: 'जेनेरेटरमा इनपुट कसरी निकालिन्छ?',
        options: ['Output + total losses', 'Output − losses', 'V × I sh'],
        answer: 0,
        why: 'Input = output + sabai losses = 30000 + 2985.8 W.',
      },
    },
  ],
});

export const eff2083 = answer('IOE 2083 Baishakh: EMF ra commercial efficiency', {
  papers: ['2083 Baishakh (ECM)'],
  marks: '[5]',
  q: 'A shunt generator delivers 96 A at 200 V. Ra = 0.1 Ω, Rsh = 50 Ω, iron and friction losses = 2500 W. Find (a) the EMF, (b) the commercial efficiency.',
  read: {
    say: 'IOE 2083 Baishakh, panch marks: shunt generator 200 volt ma 96 ampere dincha. R a 0.1 ohm, R sh 50 ohm, iron ra friction 2500 watt. EMF ra commercial efficiency.',
    voice: 'आइओई दुई हजार त्रियासी वैशाख, पाँच मार्क्स — शन्ट जेनेरेटर, टु हन्ड्रेड भोल्टमा नाइन्टी सिक्स एम्पियर दिन्छ। आर ए जिरो पोइन्ट वान ओम, आर एस एच फिफ्टी ओम, आइरन र फ्रिक्सन टु थाउजेन्ड फाइभ हन्ड्रेड वाट। इएमएफ र कमर्सियल इफिसियन्सी।',
  },
  points: [
    {
      node: <><H>(a) EMF [2]</H><K>{String.raw`\begin{aligned} I_{sh} &= \dfrac{200}{50} \\ &= 4\ \text{A} \\ I_a &= 96 + 4 \\ &= 100\ \text{A} \\ E &= 200 + 100(0.1) \\ &= \boxed{210\ \text{V}} \end{aligned}`}</K></>,
      say: 'I sh 4 ampere, I a 100 ampere. EMF 200 plus 100 times 0.1, arthat 210 volt.',
      voice: 'आई एस एच फोर एम्पियर, आई ए वान हन्ड्रेड एम्पियर। इएमएफ — टु हन्ड्रेड प्लस वान हन्ड्रेड टाइम्स जिरो पोइन्ट वान, अर्थात टु टेन भोल्ट।',
    },
    {
      node: <><H>(b) Commercial efficiency [3]</H><K>{String.raw`\begin{aligned} I_a^2R_a &= 100^2(0.1) \\ &= 1000\ \text{W} \\ VI_{sh} &= 800\ \text{W} \\ \text{Losses} &= 1000 + 800 + 2500 \\ &= 4300\ \text{W} \end{aligned}`}</K></>,
      say: 'Losses: armature copper 1000 watt, shunt 800 watt, iron ra friction 2500 watt. Jamma 4300 watt.',
      voice: 'लसेस — आर्मेचर कपर थाउजेन्ड वाट, शन्ट एट हन्ड्रेड वाट, आइरन र फ्रिक्सन टु थाउजेन्ड फाइभ हन्ड्रेड वाट। जम्मा फोर थाउजेन्ड थ्री हन्ड्रेड वाट।',
    },
    {
      node: <><K>{String.raw`\begin{aligned} \text{Output} &= 200 \times 96 \\ &= 19200\ \text{W} \\ \eta_c &= \dfrac{19200}{19200 + 4300} \\ &= \boxed{81.7\,\%} \end{aligned}`}</K></>,
      say: 'Output 200 times 96, arthat 19200 watt. Commercial efficiency 19200 over 23500, arthat 81.7 percent.',
      voice: 'आउटपुट — टु हन्ड्रेड टाइम्स नाइन्टी सिक्स, अर्थात नाइन्टिन थाउजेन्ड टु हन्ड्रेड वाट। कमर्सियल इफिसियन्सी — नाइन्टिन थाउजेन्ड टु हन्ड्रेड ओभर ट्वेन्टी थ्री थाउजेन्ड फाइभ हन्ड्रेड, अर्थात एट्टी वान पोइन्ट सेभेन पर्सेन्ट।',
      ask: {
        q: 'Yo generator ma total losses kati?',
        voice: 'यो जेनेरेटरमा टोटल लसेस कति?',
        options: ['4300 W', '3500 W', '2500 W'],
        answer: 0,
        why: '1000 (armature Cu) + 800 (shunt) + 2500 (iron, friction) = 4300 W.',
      },
    },
  ],
});
