import { K, figAt } from './kit.jsx';
import { backEmfFigure, torqueFigure } from './picture.jsx';
import { story } from './ch4.jsx';
import { torqueProduction3d } from './ch3.jsx';
import { vibe41 } from './vibe.jsx';
import { backEmfDerivation, circuit, lever, torqueDerivation, torqueFromPower, voltageEquation } from './t41.jsx';

/*
  4.1 told by every role (skill rule 43; roles in src/content/pov.js, one skill
  each: pov-lecturer, pov-tutor). Each video keeps
  its native role's script; this file adds the other roles' versions as
  `variants`. Every version is its own script (caption first; voice later) on a
  board of its own, so a drawing timed to the native beats is not reused.
    Lecturer: textbook answer (Let, numbered equations, ∴, Hence proved)
    Tutor:    one-on-one, why before how, where students slip, worked by hand
  (Two teachers only since 2026-10-30; the Engineer and Senior versions are in
  git history.)
  Exam counts and years come from vault/dc-motor-digest.md; every number was
  recomputed by script.
*/

const b = (say, voice, ask) => (ask ? { say, voice, ask } : { say, voice });
const q = (qq, voice, options, answer, why, tag) => ({ q: qq, voice, options, answer, why, ...(tag ? { tag } : {}) });
const tex = (s) => <K>{s}</K>;
const L = (at, kind, node, until) => ({ at, kind, node, ...(until != null ? { until } : {}) });
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
// A role's own telling: its own board, no drawing or 3D timed to the native
// script. Its textbook figure is added below (figures, rule 46).
const role = (beats, board, extra = {}) => ({ draw: undefined, three: undefined, notes: false, tall: true, beats, board, ...extra });
const addRoles = (step, roles) => {
  step.figureProps.variants = { ...(step.figureProps.variants ?? {}), ...roles };
};

/* ── Opener: 4.1 ma k padhne? (native: Engineer, by segment) ───────────── */
export const introRoles41 = {
  lecturer: role(
    [
      b('Aaja hami Unit 4.1 padhchau: working principle, back EMF ra torque equation.', 'आज हामी युनिट फोर पोइन्ट वान पढ्छौं — वर्किङ प्रिन्सिपल, ब्याक इएमएफ, र टर्क इक्वेसन।'),
      b('Syllabus anusar, principle, back EMF ko expression ra significance, ani torque equation ko derivation garincha.', 'सिलेबस अनुसार — प्रिन्सिपल, ब्याक इएमएफको एक्स्प्रेसन र सिग्निफिकेन्स, अनि टर्क इक्वेसनको डेराइभेसन गरिन्छ।'),
      b('Antim ma, IOE ka duita question ko model answer: torque equation ra back EMF, dubai tin-tin choti sodhiyeka.', 'अन्तिममा, आइओईका दुईटा क्वेस्चनको मोडेल आन्सर — टर्क इक्वेसन, र ब्याक इएमएफ। दुवै, तीन-तीन चोटि सोधिएका।'),
    ],
    [
      L(0, 'h', <>Unit 4.1</>),
      L(0, 'step', <>Working principle, back EMF and torque equation</>),
      L(1, 'step', <>1. Working principle · 2. Back EMF: expression, significance · 3. Torque equation: derivation</>),
      L(2, 'hook', <>★ IOE: 2 model answers, each asked 3 times</>),
    ],
  ),
  tutor: role(
    [
      b('Hami 4.1 sangai garchau. Pahila motor kina ghumcha, tyo bujhchau, ani matra formula.', 'हामी फोर पोइन्ट वान सँगै गर्छौं। पहिला मोटर किन घुम्छ, त्यो बुझ्छौं — अनि मात्र फर्मुला।'),
      b('Back EMF ma dherai student alamalincha, tesaile yaslai bistarai, number sanga herchau.', 'ब्याक इएमएफमा धेरै स्टुडेन्ट अलमलिन्छन्। त्यसैले यसलाई बिस्तारै, नम्बरसँग हेर्छौं।'),
      b('Ani torque equation lai step by step board ma derive garchau. Kunai step skip hudaina.', 'अनि टर्क इक्वेसनलाई, स्टेप बाई स्टेप बोर्डमा डेराइभ गर्छौं। कुनै स्टेप स्किप हुँदैन।'),
    ],
    [
      L(0, 'h', <>4.1 sangai</>),
      L(0, 'step', <>Pahila: motor kina ghumcha? → ani formula</>),
      L(1, 'step', <>Back EMF: number sanga, bistarai</>),
      L(2, 'step', <>Torque equation: harek step board ma</>),
    ],
  ),
};

/* ── DC motor hamro dherai najik cha (native: Engineer) ─────────────────── */
addRoles(vibe41, {
  lecturer: role(
    [
      b('Definition: DC motor le electrical energy lai mechanical energy ma convert garcha.', 'डेफिनेसन — डीसी मोटरले, इलेक्ट्रिकल इनर्जीलाई मेकानिकल इनर्जीमा कन्भर्ट गर्छ।'),
      b('Yo motor magnetic field ma current-carrying conductor le force paune principle ma chalcha.', 'यो मोटर, म्याग्नेटिक फिल्डमा करेन्ट क्यारिङ कन्डक्टरले फोर्स पाउने प्रिन्सिपलमा चल्छ।'),
      b('Ghumda induce hune back EMF le armature current limit garcha. Applications: fan, lift, traction, ra electric vehicle.', 'घुम्दा इन्ड्युस हुने ब्याक इएमएफले, आर्मेचर करेन्ट लिमिट गर्छ। एप्लिकेसन्स — फ्यान, लिफ्ट, ट्र्याक्सन, र इलेक्ट्रिक भेहिकल।',
        q('DC motor le kun energy lai kun ma convert garcha?', 'डीसी मोटरले कुन इनर्जीलाई कुनमा कन्भर्ट गर्छ?', ['Electrical → mechanical', 'Mechanical → electrical', 'Heat → electrical'], 0, 'Motor: electrical input, mechanical output. Generator ulto.')),
    ],
    [
      L(0, 'h', <>DC motor</>),
      L(0, 'step', <><H>Definition</H>A DC motor converts electrical energy into mechanical energy.</>),
      L(1, 'step', <><H>Principle</H>A current-carrying conductor in a magnetic field experiences a force <K>{String.raw`F = BIl`}</K>.</>),
      L(2, 'step', <><H>Back EMF</H>The EMF induced on rotation opposes V and limits I<sub>a</sub>. <b>Applications:</b> fans, lifts, traction, EVs.</>),
    ],
  ),
  tutor: role(
    [
      b('Timi ko phone vibrate huda bhitra sano DC motor ghumcha. Electrical energy bata ghumne kaam bancha.', 'तिम्रो फोन भाइब्रेट हुँदा, भित्र सानो डीसी मोटर घुम्छ। इलेक्ट्रिकल इनर्जीबाट, घुम्ने काम बन्छ।'),
      b('Ghumcha kina? Field bhitra current bokeko taar lai force lagcha. N muni ko conductor tala, S muni ko mathi push huncha.', 'घुम्छ किन? फिल्डभित्र करेन्ट बोकेको तारलाई फोर्स लाग्छ। एन मुनिको कन्डक्टर तल, एस मुनिको माथि पुस हुन्छ।'),
      b('Ani ghumda motor aafai ulto voltage banaucha, back EMF. Dherai le confuse garchan: yo supply hoina, motor kai bhitra bancha.', 'अनि घुम्दा, मोटर आफैं उल्टो भोल्टेज बनाउँछ — ब्याक इएमएफ। धेरैले कन्फ्युज गर्छन् — यो सप्लाई होइन, मोटरकै भित्र बन्छ।',
        q('Back EMF kaha bancha?', 'ब्याक इएमएफ कहाँ बन्छ?', ['Ghumne armature bhitra', 'Supply battery ma', 'Field winding ko resistance ma'], 0, 'Armature ghumda conductor le flux cut garchan; tyahi EMF back EMF ho.')),
    ],
    [
      L(0, 'h', <>Motor = electrical → ghumne kaam</>),
      L(1, 'step', <>Key line: field + current bokeko taar → <b>force</b> (N muni tala, S muni mathi)</>),
      L(2, 'step', <>Ghumda: motor bhitra ulto voltage = <b>back EMF</b> (supply hoina!)</>),
    ],
  ),
});

/* ── Armature le torque kasari banaucha (native: Engineer, 3D) ──────────── */
addRoles(torqueProduction3d, {
  lecturer: role(
    [
      b('Production of unidirectional torque, Figure jasto: armature N ra S pole ko bichma huncha.', 'प्रोडक्सन अफ युनिडाइरेक्सनल टर्क — आर्मेचर, एन र एस पोलको बीचमा हुन्छ।'),
      b('N pole muni ka conductor ma current bhitra, S pole muni ka ma bahira. Fleming ko left-hand rule anusar left ma force tala, right ma mathi.', 'एन पोलमुनिका कन्डक्टरमा करेन्ट भित्र, एस पोलमुनिकामा बाहिर। फ्लेमिङको लेफ्ट ह्यान्ड रुल अनुसार, लेफ्टमा फोर्स तल, राइटमा माथि।'),
      b('Yi forces le eutai direction ma torque dinchan. Coil MNA cross garda commutator le current reverse garcha, yasari torque unidirectional rahancha.', 'यी फोर्सले एउटै डाइरेक्सनमा टर्क दिन्छन्। कोइल एमएनए क्रस गर्दा, कम्युटेटरले करेन्ट रिभर्स गर्छ। यसरी टर्क, युनिडाइरेक्सनल रहन्छ।'),
      b('Torque lai affect garne factor: flux phi, armature current I a, ra design constant Z, P, A. T a phi I a sanga proportional.', 'टर्कलाई अफेक्ट गर्ने फ्याक्टर — फ्लक्स फाइ, आर्मेचर करेन्ट आई ए, र डिजाइन कन्स्टेन्ट जेड, पी, ए। टी ए, फाइ आई एसँग प्रोपोर्सनल।'),
    ],
    [
      L(0, 'h', <>Production of unidirectional torque</>),
      L(1, 'step', <>Under N: current inward (⊗) → F downward; under S: outward (⊙) → F upward (Fleming’s LHR).</>),
      L(2, 'step', <>All forces give torque in one sense. At the MNA the commutator reverses the coil current, <K>{String.raw`\therefore`}</K> torque is <b>unidirectional</b>.</>),
      L(3, 'step', <><H>Factors</H>φ, I<sub>a</sub> and Z, P, A: <K>{String.raw`T_a = 0.159\,\phi Z I_a \tfrac{P}{A} \propto \phi I_a`}</K></>),
    ],
  ),
  tutor: role(
    [
      b('Fleming ko left hand bistarai milau. First finger field, second finger current, ra thumb force.', 'फ्लेमिङको लेफ्ट ह्यान्ड बिस्तारै मिलाऊ। फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, र थम्ब फोर्स।'),
      b('Left ko conductor ma field right tira, current screen bhitra. Hat milayo bhane thumb tala aaucha: force tala.', 'लेफ्टको कन्डक्टरमा, फिल्ड राइटतिर, करेन्ट स्क्रिनभित्र। हात मिलायो भने, थम्ब तल आउँछ — फोर्स तल।'),
      b('Right ko conductor ma current bahira, tesaile thumb mathi. Left tala ra right mathi: dubai le eutai tira ghumauchan.', 'राइटको कन्डक्टरमा करेन्ट बाहिर, त्यसैले थम्ब माथि। लेफ्ट तल र राइट माथि — दुवैले एउटै तिर घुमाउँछन्।'),
      b('Dherai le sochchan force cancel huncha. Hudaina, kinaki duita force centre ko duita side ma ulto direction ma chan.', 'धेरैले सोच्छन् — फोर्स क्यान्सिल हुन्छ। हुँदैन, किनकि दुईटा फोर्स, सेन्टरको दुईटा साइडमा, उल्टो डाइरेक्सनमा छन्।',
        q('Left ma force tala ra right ma force mathi bhaye, net torque k huncha?', 'लेफ्टमा फोर्स तल र राइटमा फोर्स माथि भए, नेट टर्क के हुन्छ?', ['Dubai jodincha, eutai tira ghumcha', 'Cancel bhayera zero', 'Armature mathi uthcha'], 0, 'Centre ko duita side ma ulto force = couple. Turning effect jodincha.')),
      b('Ani conductor N muni bata S muni jada MNA cross garcha. MNA mai commutator le current reverse garcha, force pani flip huncha, ra torque ek tira nai rahancha.', 'अनि कन्डक्टर एन मुनिबाट एस मुनि जाँदा, एमएनए क्रस गर्छ। एमएनएमै कम्युटेटरले करेन्ट रिभर्स गर्छ, फोर्स पनि फ्लिप हुन्छ, र टर्क एकतिर नै रहन्छ।'),
    ],
    [
      L(0, 'h', <>Fleming LHR, hat le</>),
      L(0, 'step', <>First finger = <b>B</b> · second finger = <b>I</b> · thumb = <b>F</b></>),
      L(1, 'step', <>Left: B → right, I ⊗ → <b>F tala</b></>),
      L(2, 'step', <>Right: I ⊙ → <b>F mathi</b> → eutai tira ghumcha</>),
      L(3, 'idea', <>Cancel hudaina: duita side ma ulto force = couple</>),
      L(4, 'step', <>MNA cross → commutator le current reverse → F flip → torque ek tira</>),
    ],
  ),
});

/* ── Motor le aafno current aafai kina limit garcha (native: Engineer) ──── */
addRoles(story, {
  lecturer: role(
    [
      b('Question: why does a DC motor draw a large current at starting? Yo IOE ma panch choti sodhiyeko cha.', 'क्वेस्चन — ह्वाई डज अ डीसी मोटर ड्र अ लार्ज करेन्ट एट स्टार्टिङ? यो आइओईमा पाँच चोटि सोधिएको छ।'),
      b('Armature current I a equals V minus E b, over R a, equation ek.', 'आर्मेचर करेन्ट — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए, इक्वेसन वान।'),
      b('Start ma N zero, yesko matlab E b zero. Equation ek bata I a equals V over R a, equation dui.', 'स्टार्टमा एन जिरो, यसको मतलब ई बी जिरो। इक्वेसन वानबाट, आई ए इक्वल्स भी ओभर आर ए, इक्वेसन टु।'),
      b('R a ekdam sano huncha, jastai 0.5 ohm, tesaile 220 volt ma 440 ampere. Hence a starter is used to limit the starting current.', 'आर ए एकदम सानो हुन्छ, जस्तै जिरो पोइन्ट फाइभ ओम। त्यसैले टु ट्वेन्टी भोल्टमा, फोर हन्ड्रेड फोर्टी एम्पियर। हेन्स, अ स्टार्टर इज युज्ड।'),
      b('Speed badhdai E b badhcha: full speed ma 210 volt ra I a 20 ampere. Load thapda E b 205 volt ra I a 30 ampere. Yasari motor self-regulating cha.', 'स्पिड बढ्दै ई बी बढ्छ — फुल स्पिडमा टु हन्ड्रेड टेन भोल्ट, र आई ए ट्वेन्टी एम्पियर। लोड थप्दा, ई बी टु हन्ड्रेड फाइभ भोल्ट, र आई ए थर्टी एम्पियर। यसरी मोटर सेल्फ रेगुलेटिङ छ।'),
    ],
    [
      L(0, 'q', <><span className="tag">IOE 2079 Jestha · 2068 Magh · 2066 Magh +2</span>Why does a DC motor draw a large current at starting?</>),
      L(1, 'step', tex(String.raw`I_a = \dfrac{V - E_b}{R_a} \qquad \cdots(1)`)),
      L(2, 'step', <>At start N = 0, <K>{String.raw`\therefore`}</K> E<sub>b</sub> = 0; from (1),{tex(String.raw`I_a = \dfrac{V}{R_a} \qquad \cdots(2)`)}</>),
      L(3, 'step', <>R<sub>a</sub> is very small (e.g. 0.5 Ω): 220/0.5 = <b>440 A</b>. Hence a starter is used to limit the starting current.</>),
      L(4, 'step', <>Running: E<sub>b</sub> = 210 V → I<sub>a</sub> = 20 A · loaded: E<sub>b</sub> = 205 V → I<sub>a</sub> = 30 A. <K>{String.raw`\therefore`}</K> the motor is self-regulating.</>),
    ],
  ),
});

/* ── Derivation: back EMF equation (native: Tutor) ─────────────────────── */
addRoles(backEmfDerivation, {
});

/* ── Derivation: voltage ra power equation (native: Tutor) ─────────────── */
addRoles(voltageEquation, {
  lecturer: role(
    [
      b('Voltage equation of a DC motor: applied voltage le back EMF ra armature drop dubai overcome garcha.', 'भोल्टेज इक्वेसन अफ अ डीसी मोटर — एप्लाइड भोल्टेजले, ब्याक इएमएफ र आर्मेचर ड्रप, दुवै ओभरकम गर्छ।'),
      b('Yesko matlab V equals E b plus I a R a, equation ek. Yasbata I a equals V minus E b, over R a.', 'यसको मतलब — भी इक्वल्स ई बी प्लस आई ए आर ए, इक्वेसन वान। यसबाट, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।'),
      b('Equation ek lai I a le multiply garda V I a equals E b I a plus I a squared R a, equation dui.', 'इक्वेसन वानलाई आई एले मल्टिप्लाई गर्दा — भी आई ए इक्वल्स, ई बी आई ए प्लस आई ए स्क्वायर आर ए, इक्वेसन टु।'),
      b('V I a input, I a squared R a copper loss, ra E b I a gross mechanical power P m ho, equation tin.', 'भी आई ए इनपुट, आई ए स्क्वायर आर ए कपर लस, र ई बी आई ए — ग्रस मेकानिकल पावर पी एम हो, इक्वेसन थ्री।'),
    ],
    [
      L(0, 'h', <>Voltage and power equation</>),
      L(1, 'step', tex(String.raw`\begin{aligned} V &= E_b + I_aR_a && \cdots(1) \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} && \end{aligned}`)),
      L(2, 'step', <>Multiplying (1) by I<sub>a</sub>,{tex(String.raw`VI_a = E_bI_a + I_a^2R_a \qquad \cdots(2)`)}</>),
      L(3, 'step', <>VI<sub>a</sub> = input, I<sub>a</sub>²R<sub>a</sub> = armature Cu loss, {tex(String.raw`\therefore\ \boxed{P_m = E_b\,I_a} \qquad \cdots(3)`)}</>),
    ],
  ),
});

/* ── Derivation: torque equation, force method (native: Tutor) ─────────── */
addRoles(torqueDerivation, {
  lecturer: role(
    [
      b('Torque equation. Let: P pole, phi flux per pole, Z conductor, A parallel path, I a armature current, r radius ra l length.', 'टर्क इक्वेसन। लेट — पी पोल, फाइ फ्लक्स पर पोल, जेड कन्डक्टर, ए प्यारालल पाथ, आई ए आर्मेचर करेन्ट, आर रेडियस, र एल लेन्थ।'),
      b('I c equals I a over A, equation ek. B equals P phi over two pi r l, equation dui.', 'आई सी इक्वल्स आई ए ओभर ए, इक्वेसन वान। बी इक्वल्स पी फाइ, ओभर टु पाइ आर एल, इक्वेसन टु।'),
      b('Force F equals B I c l, arthat P phi I a over two pi r A, equation tin. Torque per conductor F r, equation char.', 'फोर्स एफ इक्वल्स बी आई सी एल, अर्थात पी फाइ आई ए ओभर टु पाइ आर ए, इक्वेसन थ्री। टर्क पर कन्डक्टर — एफ आर, इक्वेसन फोर।'),
      b('Z conductor ko lagi T a equals 0.159 phi Z I a times P over A newton metre. Hence proved.', 'जेड कन्डक्टरको लागि — टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए न्युटन मिटर। हेन्स प्रुभ्ड।'),
    ],
    [
      L(0, 'h', <>Torque equation of a DC motor</>),
      L(0, 'step', <>Let, P = poles; φ = flux/pole; Z = conductors; A = paths; I<sub>a</sub> = armature current; r = radius; l = length.</>),
      L(1, 'step', tex(String.raw`\begin{aligned} I_c &= \dfrac{I_a}{A} && \cdots(1) \\ B &= \dfrac{P\phi}{2\pi r l} && \cdots(2) \end{aligned}`)),
      L(2, 'step', tex(String.raw`\begin{aligned} F &= B\,I_c\,l && \\ &= \dfrac{P\phi I_a}{2\pi r A} && \cdots(3) \\ \tau &= F\,r && \cdots(4) \end{aligned}`)),
      L(3, 'step', <>{tex(String.raw`\therefore\ \boxed{T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right)\ \text{N}\cdot\text{m}} \qquad \cdots(5)`)}<b>Hence proved.</b></>),
    ],
  ),
});

/* ── Derivation: torque equation, power method (native: Tutor) ─────────── */
addRoles(torqueFromPower, {
  lecturer: role(
    [
      b('Torque in terms of back EMF: mechanical power P m equals E b I a, ra P m equals T a omega, equation ek.', 'टर्क इन टर्म्स अफ ब्याक इएमएफ — मेकानिकल पावर, पी एम इक्वल्स ई बी आई ए, र पी एम इक्वल्स टी ए ओमेगा, इक्वेसन वान।'),
      b('Omega equals two pi N over sixty, equation dui.', 'ओमेगा इक्वल्स — टु पाइ एन ओभर सिक्स्टी, इक्वेसन टु।'),
      b('Equation ek ra dui bata T a equals 9.55 E b I a over N newton metre, equation tin.', 'इक्वेसन वान र टुबाट — टी ए इक्वल्स नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन न्युटन मिटर, इक्वेसन थ्री।'),
      b('Shaft torque T sh equals 9.55 output over N, equation char. T a minus T sh lost torque ho.', 'साफ्ट टर्क — टी एस एच इक्वल्स, नाइन पोइन्ट फाइभ फाइभ, आउटपुट ओभर एन, इक्वेसन फोर। टी ए माइनस टी एस एच, लस्ट टर्क हो।'),
    ],
    [
      L(0, 'h', <>Armature torque in terms of E<sub>b</sub></>),
      L(0, 'step', tex(String.raw`P_m = E_bI_a = T_a\,\omega \qquad \cdots(1)`)),
      L(1, 'step', tex(String.raw`\omega = \dfrac{2\pi N}{60} \qquad \cdots(2)`)),
      L(2, 'step', <>From (1) and (2),{tex(String.raw`\boxed{T_a = 9.55\,\dfrac{E_bI_a}{N}\ \text{N}\cdot\text{m}} \qquad \cdots(3)`)}</>),
      L(3, 'step', <>{tex(String.raw`T_{sh} = 9.55\,\dfrac{P_{out}}{N} \qquad \cdots(4)`)}T<sub>a</sub> − T<sub>sh</sub> = lost torque.</>),
    ],
  ),
});

// Big picture is always the Lecturer (rule 44): its model answers have no
// role versions. (The Tutor/Engineer/Senior answers are in git history,
// commit 0451c4c, if they are ever wanted as practice.)

/* ── Figures for every telling (rule 46) ──────────────────────────────────
   No role teaches a part it cannot show. Each role version gets the
   textbook figure of its idea, its parts brought in on that role's own beats
   (figAt: figure beat → role beat; parts left out never show).
   torqueFigure: 0 poles + armature, 1 field, 2 ⊗/⊙ + forces, 3 Ta (6: MNA),
   4 Ic·F, 5 r. backEmfFigure: 0 circuit, 1 Eb, 2 Ia + drop, 3 load chain,
   4 Pm, 5 start. circuit: 0 circuit, 1 Ia. lever: native torque beats. */
const T = (map) => ({ draw: figAt(torqueFigure, map), viewBox: '0 0 360 276' });
const E = (map) => ({ draw: figAt(backEmfFigure, map), viewBox: '0 0 360 222' });
const figures = (step, byRole) => {
  for (const [r, f] of Object.entries(byRole)) if (step.figureProps.variants?.[r]) Object.assign(step.figureProps.variants[r], f);
};
figures(vibe41, { lecturer: T({ 0: 0, 1: 1, 2: 1 }), tutor: T({ 0: 0, 1: 1, 2: 1 }) });
figures(torqueProduction3d, {
  lecturer: T({ 0: 0, 1: 0, 2: 1, 3: 2, 4: 2, 6: 2 }),
  tutor: T({ 0: 0, 1: 0, 2: 1, 3: 3, 6: 4 }),
});
figures(story, { lecturer: E({ 0: 0, 1: 1, 2: 1, 5: 2, 3: 4 }) });
figures(voltageEquation, {
  lecturer: { draw: figAt(circuit, { 0: 0, 1: 1 }), viewBox: '0 0 376 200' },
});
figures(torqueDerivation, {
  lecturer: { draw: figAt(lever, { 0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 3 }), viewBox: '0 0 340 216' },
});
figures(torqueFromPower, { lecturer: E({ 0: 0, 1: 0, 2: 0 }) });
