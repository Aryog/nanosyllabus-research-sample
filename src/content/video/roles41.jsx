import { K } from './kit.jsx';
import { story } from './ch4.jsx';
import { torqueProduction3d } from './ch3.jsx';
import { vibe41 } from './vibe.jsx';
import { backEmfDerivation, torqueDerivation, torqueFromPower, voltageEquation } from './t41.jsx';
import { backEmfAnswer, torqueAnswer } from './picture.jsx';

/*
  4.1 told by every role (skill rule 43; roles in src/content/pov.js, one skill
  each: pov-lecturer, pov-tutor, pov-engineer, pov-senior). Each video keeps
  its native role's script; this file adds the other roles' versions as
  `variants`. Every version is its own script (caption first; voice later) on a
  board of its own, so a drawing timed to the native beats is not reused.
    Lecturer: textbook answer (Let, numbered equations, ∴, Hence proved)
    Tutor:    one-on-one, why before how, where students slip, worked by hand
    Engineer: real machine, numbers with units
    Senior:   exam plan (how often, marks, what to write), one trap, one trick
  Exam counts and years come from vault/dc-motor-digest.md; every number was
  recomputed by script.
*/

const b = (say, voice, ask) => (ask ? { say, voice, ask } : { say, voice });
const q = (qq, voice, options, answer, why, tag) => ({ q: qq, voice, options, answer, why, ...(tag ? { tag } : {}) });
const tex = (s) => <K>{s}</K>;
const L = (at, kind, node, until) => ({ at, kind, node, ...(until != null ? { until } : {}) });
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
// A role's own telling: board only, no drawing or 3D from the native script.
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
      L(2, 'step', <>Torque equation: har step board ma</>),
    ],
  ),
  senior: role(
    [
      b('Senior ko kura: 4.1 bata IOE ma duita question baraambar aauchan, dubai tin-tin choti.', 'सिनियरको कुरा — फोर पोइन्ट वानबाट आइओईमा दुईटा क्वेस्चन बारम्बार आउँछन्, दुवै तीन-तीन चोटि।'),
      b('Pahilo: working principle ra torque equation, 4 plus 2 marks. Dosro: back EMF ra yesko role, 2 plus 4 marks.', 'पहिलो — वर्किङ प्रिन्सिपल र टर्क इक्वेसन, फोर प्लस टु मार्क्स। दोस्रो — ब्याक इएमएफ र यसको रोल, टु प्लस फोर मार्क्स।'),
      b('4.1 ramrari garyo bhane 12 marks hatmai. Last ko duita answer video jasta ko testai lekha.', 'फोर पोइन्ट वान राम्ररी गर्यो भने, ट्वेल्भ मार्क्स हातमै। लास्टको दुईटा आन्सर भिडियो जस्ताको तस्तै लेख।'),
    ],
    [
      L(0, 'h', <>4.1: exam ma k aaucha?</>),
      L(1, 'step', <><b>Q1</b> Working principle + torque equation · [4 + 2] · 2073 Chaitra, 2069 Bhadra, 2082 Baishakh (ECM)</>),
      L(1, 'step', <><b>Q2</b> Back EMF + role · [2 + 4] · 2071 Magh, 2078 Poush, 2082 Baishakh (ECM)</>),
      L(2, 'hook', <>12 marks: last ka 2 answer jasta ko testai</>),
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
      b('Ghumcha kina? Field bhitra current bokeko taar lai force lagcha. Yo ek line yaad rakha, baki sabai yaha bata aaucha.', 'घुम्छ किन? फिल्डभित्र करेन्ट बोकेको तारलाई फोर्स लाग्छ। यो एक लाइन याद राख — बाँकी सबै यहीँबाट आउँछ।'),
      b('Ani ghumda motor aafai ulto voltage banaucha, back EMF. Yaha dherai le confuse garchan: yo supply hoina, motor kai bhitra bancha.', 'अनि घुम्दा, मोटर आफैं उल्टो भोल्टेज बनाउँछ — ब्याक इएमएफ। यहाँ धेरैले कन्फ्युज गर्छन् — यो सप्लाई होइन, मोटरकै भित्र बन्छ।',
        q('Back EMF kaha bancha?', 'ब्याक इएमएफ कहाँ बन्छ?', ['Ghumne armature bhitra', 'Supply battery ma', 'Field winding ko resistance ma'], 0, 'Armature ghumda conductor le flux cut garchan; tyahi EMF back EMF ho.')),
    ],
    [
      L(0, 'h', <>Motor = electrical → ghumne kaam</>),
      L(1, 'step', <>Key line: field + current bokeko taar → <b>force</b></>),
      L(2, 'step', <>Ghumda: motor bhitra ulto voltage = <b>back EMF</b> (supply hoina!)</>),
    ],
  ),
  senior: role(
    [
      b('Senior tip: "Define DC motor" sidhai kamai aaucha, tara principle ra back EMF chai har barsa jasto aaucha.', 'सिनियर टिप — डिफाइन डीसी मोटर, सिधै कमै आउँछ। तर प्रिन्सिपल र ब्याक इएमएफ, हर बर्ष जस्तो आउँछ।'),
      b('Principle lekhda exact line lekha: when a current-carrying conductor is placed in a magnetic field, it experiences a force.', 'प्रिन्सिपल लेख्दा, एक्जाक्ट लाइन लेख — ह्वेन अ करेन्ट क्यारिङ कन्डक्टर इज प्लेस्ड इन अ म्याग्नेटिक फिल्ड, इट एक्सपिरियन्सेस अ फोर्स।'),
      b('Trap: Fleming ko right-hand rule lekhyo bhane galat. Motor ma left-hand, generator ma right-hand.', 'ट्र्याप — फ्लेमिङको राइट ह्यान्ड रुल लेख्यो भने गलत। मोटरमा लेफ्ट ह्यान्ड, जेनेरेटरमा राइट ह्यान्ड।',
        q('DC motor ma force ko direction kun rule le dincha?', 'डीसी मोटरमा फोर्सको डाइरेक्सन, कुन रुलले दिन्छ?', ["Fleming's left-hand rule", "Fleming's right-hand rule", "Lenz's law"], 0, 'Motor = Left (yaad: motor ma "L"eft). Generator = Right.')),
    ],
    [
      L(0, 'h', <>Exam ma k aaucha?</>),
      L(0, 'step', <>Principle + back EMF: har barsa jasto</>),
      L(1, 'step', <>Exact line: “…it experiences a force, F = BIl”</>),
      L(2, 'trap', <>Motor = Fleming ko <b>left</b>-hand rule. Right-hand = generator.</>),
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
      L(2, 'step', <>All forces give torque in one sense. At the MNA the commutator reverses the coil current, ∴ torque is <b>unidirectional</b>.</>),
      L(3, 'step', <><H>Factors</H>φ, I<sub>a</sub> and Z, P, A: <K>{String.raw`T_a = 0.159\,\phi Z I_a \tfrac{P}{A} \propto \phi I_a`}</K></>),
    ],
  ),
  tutor: role(
    [
      b('Fleming ko left hand bistarai milau. First finger field, second finger current, ra thumb force.', 'फ्लेमिङको लेफ्ट ह्यान्ड बिस्तारै मिलाऊ। फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, र थम्ब फोर्स।'),
      b('Left ko conductor ma field right tira, current screen bhitra. Hat milayo bhane thumb tala aaucha: force tala.', 'लेफ्टको कन्डक्टरमा, फिल्ड राइटतिर, करेन्ट स्क्रिनभित्र। हात मिलायो भने, थम्ब तल आउँछ — फोर्स तल।'),
      b('Right ko conductor ma current bahira, tesaile thumb mathi. Left tala ra right mathi: dubai le eutai tira ghumauchan.', 'राइटको कन्डक्टरमा करेन्ट बाहिर, त्यसैले थम्ब माथि। लेफ्ट तल र राइट माथि — दुवैले एउटै तिर घुमाउँछन्।'),
      b('Yaha dherai le sochchan force cancel huncha. Hudaina, kinaki duita force centre ko duita side ma ulto direction ma chan.', 'यहाँ धेरैले सोच्छन् — फोर्स क्यान्सिल हुन्छ। हुँदैन, किनकि दुईटा फोर्स, सेन्टरको दुईटा साइडमा, उल्टो डाइरेक्सनमा छन्।',
        q('Left ma force tala ra right ma force mathi bhaye, net torque k huncha?', 'लेफ्टमा फोर्स तल र राइटमा फोर्स माथि भए, नेट टर्क के हुन्छ?', ['Dubai jodincha, eutai tira ghumcha', 'Cancel bhayera zero', 'Armature mathi uthcha'], 0, 'Centre ko duita side ma ulto force = couple. Turning effect jodincha.')),
      b('Ani conductor N muni bata S muni jada MNA cross garcha. Tyaha commutator le current reverse garcha, force pani flip huncha, ra torque ek tira nai rahancha.', 'अनि कन्डक्टर एन मुनिबाट एस मुनि जाँदा, एमएनए क्रस गर्छ। त्यहाँ कम्युटेटरले करेन्ट रिभर्स गर्छ, फोर्स पनि फ्लिप हुन्छ, र टर्क एकतिर नै रहन्छ।'),
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
  senior: role(
    [
      b('Yo 2079 Jestha ma aayo: how is unidirectional torque produced, ra kun factor le torque affect garcha.', 'यो दुई हजार उनासी जेठमा आयो — हाउ इज युनिडाइरेक्सनल टर्क प्रोड्युस्ड, र कुन फ्याक्टरले टर्क अफेक्ट गर्छ।'),
      b('Lekhne: N S ko figure, conductor ma cross ra dot, force arrow, ani commutator le MNA ma current reverse garcha bhanne line.', 'लेख्ने — एन एसको फिगर, कन्डक्टरमा क्रस र डट, फोर्स एरो। अनि कम्युटेटरले एमएनएमा करेन्ट रिभर्स गर्छ भन्ने लाइन।'),
      b('Factors ma T a equals 0.159 phi Z I a P over A lekhera phi, I a, Z, P, A bhana. Commutator chhutyo bhane unidirectional ko marks jancha.', 'फ्याक्टर्समा, टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन फाइ जेड आई ए, पी ओभर ए लेखेर — फाइ, आई ए, जेड, पी, ए भन। कम्युटेटर छुट्यो भने, युनिडाइरेक्सनलको मार्क्स जान्छ।'),
      b('Yaad garne: FBI. Thumb F, first finger B, second finger I.', 'याद गर्ने — एफ बी आई। थम्ब एफ, फर्स्ट फिंगर बी, सेकेन्ड फिंगर आई।',
        q('Left-hand rule ma thumb le k dekhaucha?', 'लेफ्ट ह्यान्ड रुलमा, थम्बले के देखाउँछ?', ['Force (motion)', 'Field', 'Current'], 0, 'FBI: thumb F, first finger B, second finger I.')),
    ],
    [
      L(0, 'h', <>2079 Jestha: unidirectional torque + factors</>),
      L(1, 'step', <>Figure (⊗ ⊙, F arrows) + “commutator reverses current at MNA”</>),
      L(2, 'step', <>Factors: <K>{String.raw`T_a = 0.159\,\phi Z I_a \tfrac{P}{A}`}</K> → φ, I<sub>a</sub>, Z, P, A</>),
      L(2, 'trap', <>Commutator nalekhe “unidirectional” ko marks jancha</>),
      L(3, 'hook', <>FBI: thumb F · first finger B · second finger I</>),
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
      L(2, 'step', <>At start N = 0, ∴ E<sub>b</sub> = 0; from (1),{tex(String.raw`I_a = \dfrac{V}{R_a} \qquad \cdots(2)`)}</>),
      L(3, 'step', <>R<sub>a</sub> is very small (e.g. 0.5 Ω): 220/0.5 = <b>440 A</b>. Hence a starter is used to limit the starting current.</>),
      L(4, 'step', <>Running: E<sub>b</sub> = 210 V → I<sub>a</sub> = 20 A · loaded: E<sub>b</sub> = 205 V → I<sub>a</sub> = 30 A. ∴ the motor is self-regulating.</>),
    ],
  ),
  senior: role(
    [
      b('Senior ko plan: starting current ko question panch choti aayo. Answer ek formula ma cha: I a equals V minus E b, over R a.', 'सिनियरको प्लान — स्टार्टिङ करेन्टको क्वेस्चन पाँच चोटि आयो। आन्सर एउटै फर्मुलामा छ — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए।'),
      b('Numerical ma yo formula nai pahilo step: start ma 440 ampere, full speed ma 20, load thapda 30. Speed ra torque pani yahi bata suru.', 'न्युमेरिकलमा, यो फर्मुला नै पहिलो स्टेप — स्टार्टमा फोर हन्ड्रेड फोर्टी एम्पियर, फुल स्पिडमा ट्वेन्टी, लोड थप्दा थर्टी। स्पिड र टर्क पनि यहीँबाट सुरु।'),
      b('Trap: shunt motor ma I a bhaneko line current hoina. I a equals I L minus I sh.', 'ट्र्याप — शन्ट मोटरमा आई ए भनेको, लाइन करेन्ट होइन। आई ए इक्वल्स, आई एल माइनस आई एस एच।',
        q('Shunt motor le line bata 30 A linchha ra shunt field current 2 A cha. Armature current kati huncha?', 'शन्ट मोटरले लाइनबाट थर्टी एम्पियर लिन्छ, र शन्ट फिल्ड करेन्ट टु एम्पियर छ। आर्मेचर करेन्ट कति हुन्छ?', ['28 A', '30 A', '32 A'], 0, 'Ia = IL − Ish = 30 − 2 = 28 A.')),
      b('Yaad garne: start ma E b zero, current hero. Tesaile starter.', 'याद गर्ने — स्टार्टमा ई बी जिरो, करेन्ट हिरो। त्यसैले स्टार्टर।'),
    ],
    [
      L(0, 'h', <>Starting current: 5 choti aayo</>),
      L(0, 'step', tex(String.raw`I_a = \dfrac{V - E_b}{R_a}`)),
      L(1, 'step', <>Numerical ko pahilo step: start 440 A · full speed 20 A · load 30 A</>),
      L(2, 'trap', <>Shunt: <K>{String.raw`I_a = I_L - I_{sh}`}</K>, line current hoina</>),
      L(3, 'hook', <>Start ma E<sub>b</sub> zero → current hero → starter</>),
    ],
  ),
});

/* ── Derivation: back EMF equation (native: Tutor) ─────────────────────── */
addRoles(backEmfDerivation, {
  engineer: role(
    [
      b('Real motor: 4-pole, lap wound, Z 500 conductor, phi 0.02 weber, ani speed 1500 rpm.', 'रियल मोटर — फोर पोल, ल्याप वाउन्ड, जेड पाँच सय कन्डक्टर, फाइ जिरो पोइन्ट जिरो टु वेबर, अनि स्पिड पन्ध्र सय आरपीएम।'),
      b('Formula kaha bata? Euta revolution ma conductor le P phi flux sixty over N second ma cut garcha, ra Z over A conductor series ma. Yesko matlab E b equals P phi Z N over sixty A.', 'फर्मुला कहाँबाट? एउटा रिभोलुसनमा, कन्डक्टरले पी फाइ फ्लक्स, सिक्स्टी ओभर एन सेकेन्डमा कट गर्छ। र जेड ओभर ए कन्डक्टर सिरिजमा। यसको मतलब — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए।'),
      b('Lap ma A equals P, tesaile E b equals phi Z N over sixty: 0.02 times 500 times 1500, over sixty.', 'ल्यापमा ए इक्वल्स पी। त्यसैले ई बी इक्वल्स — फाइ जेड एन ओभर सिक्स्टी। जिरो पोइन्ट जिरो टु, टाइम्स पाँच सय, टाइम्स पन्ध्र सय, ओभर सिक्स्टी।'),
      b('Back EMF 250 volt aaucha. Speed aadha, 750 rpm, bhaye E b pani aadha: 125 volt.', 'ब्याक इएमएफ — टु हन्ड्रेड फिफ्टी भोल्ट आउँछ। स्पिड आधा, सात सय पचास आरपीएम भए, ई बी पनि आधा — वान हन्ड्रेड ट्वेन्टी फाइभ भोल्ट।',
        q('Tyahi motor ma flux same rakhera speed 1500 bata 750 rpm garyo. Eb kati huncha?', 'त्यही मोटरमा फ्लक्स उही राखेर, स्पिड पन्ध्र सयबाट सात सय पचास आरपीएम गर्यो। ई बी कति हुन्छ?', ['125 V', '250 V', '500 V'], 0, 'Eb ∝ N: 250 × 750/1500 = 125 V.')),
      b('Site ma yahi kaam lagcha: E b le speed bataucha. Supply ra current thaha bhaye, motor kati chhito ghumcha bhanna sakincha.', 'साइटमा यही काम लाग्छ — ई बीले स्पिड बताउँछ। सप्लाई र करेन्ट थाहा भए, मोटर कति छिटो घुम्छ भन्न सकिन्छ।'),
    ],
    [
      L(0, 'h', <>Back EMF on a real motor</>),
      L(0, 'given', <>4-pole lap (A = P) · Z = 500 · φ = 0.02 Wb · N = 1500 rpm</>),
      L(1, 'step', <>e = Pφ ÷ (60/N) per conductor, × Z/A in series → <K>{String.raw`E_b = \tfrac{P\phi ZN}{60A}`}</K></>),
      L(2, 'step', tex(String.raw`\begin{aligned} E_b &= \dfrac{P\phi Z N}{60A} \\ &= \dfrac{0.02 \times 500 \times 1500}{60} \end{aligned}`)),
      L(3, 'answer', <>E<sub>b</sub> = 250 V · at 750 rpm: 125 V</>),
      L(4, 'idea', <>E<sub>b</sub> ∝ φN: back EMF tells the speed</>),
    ],
  ),
  senior: role(
    [
      b('EMF equation ko derivation IOE ma panch choti aayo: 2078 Baishakh, 2075 Baishakh, 2071 Bhadra, 2070 Bhadra ra 2066 Magh.', 'इएमएफ इक्वेसनको डेराइभेसन, आइओईमा पाँच चोटि आयो — दुई हजार अठहत्तर बैशाख, पचहत्तर बैशाख, एकहत्तर भदौ, सत्तरी भदौ, र छयसट्ठी माघ।'),
      b('Char line pugcha: flux per revolution, time, EMF per conductor, ani Z over A le multiply.', 'चार लाइन पुग्छ — फ्लक्स पर रिभोलुसन, टाइम, इएमएफ पर कन्डक्टर, अनि जेड ओभर एले मल्टिप्लाई।'),
      b('Trap: lap ma A equals P, wave ma A equals 2. Numerical ma yo ultyayo bhane answer dui guna farak.', 'ट्र्याप — ल्यापमा ए इक्वल्स पी, वेभमा ए इक्वल्स टु। न्युमेरिकलमा यो उल्टायो भने, आन्सर दुई गुना फरक।',
        q('4-pole wave wound machine ma parallel path A kati huncha?', 'फोर पोल, वेभ वाउन्ड मेसिनमा, प्यारालल पाथ ए कति हुन्छ?', ['2', '4', '8'], 0, 'Wave winding ma sadhai A = 2. Lap ma A = P = 4.')),
      b('Yaad garne: "P phi Z N over sixty A": Pi Fi Zen over sixty A.', 'याद गर्ने — पी फाइ जेड एन ओभर सिक्स्टी ए। पाइ फाइ जेन, ओभर सिक्स्टी ए।'),
    ],
    [
      L(0, 'h', <>EMF equation: 5 choti aayo</>),
      L(0, 'note', <>2078 Baishakh · 2075 Baishakh · 2071 Bhadra · 2070 Bhadra · 2066 Magh</>),
      L(1, 'step', <>4 lines: dΦ = Pφ → dt = 60/N → e = PφN/60 → × Z/A</>),
      L(2, 'trap', <>Lap: A = P · Wave: A = 2</>),
      L(3, 'hook', <>“Pi Fi Zen over sixty A”: <K>{String.raw`E_b = \tfrac{P\phi ZN}{60A}`}</K></>),
    ],
  ),
});

/* ── Derivation: voltage ra power equation (native: Tutor) ─────────────── */
addRoles(voltageEquation, {
  lecturer: role(
    [
      b('Voltage equation of a DC motor: applied voltage le back EMF ra armature drop dubai overcome garcha.', 'भोल्टेज इक्वेसन अफ अ डीसी मोटर — एप्लाइड भोल्टेजले, ब्याक इएमएफ र आर्मेचर ड्रप, दुवै ओभरकम गर्छ।'),
      b('Yesko matlab V equals E b plus I a R a, equation ek. Yasbata I a equals V minus E b, over R a.', 'यसको मतलब — भी इक्वल्स ई बी प्लस आई ए आर ए, इक्वेसन वान। यसबाट, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।'),
      b('Equation ek lai I a le multiply garda V I a equals E b I a plus I a squared R a, equation dui.', 'इक्वेसन वानलाई आई एले मल्टिप्लाई गर्दा — भी आई ए इक्वल्स, ई बी आई ए प्लस आई ए स्क्वायर आर ए, इक्वेसन टु।'),
      b('Yaha V I a input, I a squared R a copper loss, ra E b I a gross mechanical power P m ho, equation tin.', 'यहाँ भी आई ए इनपुट, आई ए स्क्वायर आर ए कपर लस, र ई बी आई ए — ग्रस मेकानिकल पावर पी एम हो, इक्वेसन थ्री।'),
    ],
    [
      L(0, 'h', <>Voltage and power equation</>),
      L(1, 'step', tex(String.raw`\begin{aligned} V &= E_b + I_aR_a && \cdots(1) \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} && \end{aligned}`)),
      L(2, 'step', <>Multiplying (1) by I<sub>a</sub>,{tex(String.raw`VI_a = E_bI_a + I_a^2R_a \qquad \cdots(2)`)}</>),
      L(3, 'step', <>VI<sub>a</sub> = input, I<sub>a</sub>²R<sub>a</sub> = armature Cu loss, ∴{tex(String.raw`\boxed{P_m = E_b\,I_a} \qquad \cdots(3)`)}</>),
    ],
  ),
  engineer: role(
    [
      b('Real motor: 220 volt supply, R a 0.5 ohm, ra load ma I a 20 ampere.', 'रियल मोटर — टु ट्वेन्टी भोल्ट सप्लाई, आर ए जिरो पोइन्ट फाइभ ओम, र लोडमा आई ए ट्वेन्टी एम्पियर।'),
      b('Armature drop I a R a equals 10 volt. Yasari back EMF 210 volt.', 'आर्मेचर ड्रप, आई ए आर ए इक्वल्स टेन भोल्ट। यसरी ब्याक इएमएफ, टु हन्ड्रेड टेन भोल्ट।'),
      b('Input 4400 watt. Copper loss 20 squared times 0.5, arthat 200 watt, jun heat bhayera jancha.', 'इनपुट — चवालीस सय वाट। कपर लस — ट्वेन्टी स्क्वायर टाइम्स जिरो पोइन्ट फाइभ, अर्थात टु हन्ड्रेड वाट, जुन हिट भएर जान्छ।'),
      b('Baki 4200 watt, E b times I a, shaft tira mechanical power banera jancha.', 'बाँकी बयालीस सय वाट — ई बी टाइम्स आई ए, साफ्टतिर मेकानिकल पावर बनेर जान्छ।',
        q('220 V, Ra = 0.5 Ω, Ia = 20 A. Developed mechanical power Pm kati huncha?', 'टु ट्वेन्टी भोल्ट, आर ए जिरो पोइन्ट फाइभ ओम, आई ए ट्वेन्टी एम्पियर। डेभलप्ड मेकानिकल पावर, पी एम कति हुन्छ?', ['4200 W', '4400 W', '200 W'], 0, 'Eb = 220 − 10 = 210 V; Pm = 210 × 20 = 4200 W.')),
    ],
    [
      L(0, 'h', <>Power on a real motor</>),
      L(0, 'given', <>V = 220 V · R<sub>a</sub> = 0.5 Ω · I<sub>a</sub> = 20 A</>),
      L(1, 'step', tex(String.raw`\begin{aligned} E_b &= V - I_aR_a \\ &= 220 - 10 \\ &= 210\ \text{V} \end{aligned}`)),
      L(2, 'step', <>Input 220 × 20 = 4400 W · Cu loss 20² × 0.5 = 200 W (heat)</>),
      L(3, 'answer', <>P<sub>m</sub> = E<sub>b</sub>I<sub>a</sub> = 4200 W</>),
    ],
  ),
  senior: role(
    [
      b('Numerical ko pahilo line sadhai yahi: E b equals V minus I a R a.', 'न्युमेरिकलको पहिलो लाइन, सधैं यही — ई बी इक्वल्स भी माइनस आई ए आर ए।'),
      b('Shunt ma I a equals I L minus I sh. Series ma R a sanga series field R se pani jod.', 'शन्टमा आई ए इक्वल्स, आई एल माइनस आई एस एच। सिरिजमा, आर एसँग सिरिज फिल्ड, आर एस ई पनि जोड।'),
      b('Trap: brush drop diyeko cha bhane tyo pani ghatau. V equals E b plus I a R a plus brush drop.', 'ट्र्याप — ब्रस ड्रप दिएको छ भने, त्यो पनि घटाऊ। भी इक्वल्स — ई बी प्लस आई ए आर ए, प्लस ब्रस ड्रप।',
        q('220 V motor, Ia = 20 A, Ra = 0.5 Ω, total brush drop 2 V. Eb kati huncha?', 'टु ट्वेन्टी भोल्ट मोटर, आई ए ट्वेन्टी एम्पियर, आर ए जिरो पोइन्ट फाइभ ओम, टोटल ब्रस ड्रप टु भोल्ट। ई बी कति हुन्छ?', ['208 V', '210 V', '212 V'], 0, 'Eb = 220 − 20 × 0.5 − 2 = 208 V.')),
      b('Yaad garne: V le tin thau tirne bill: E b, I a R a, ra brush. Ani E b times I a nai P m, mechanical power.', 'याद गर्ने — भीले तीन ठाउँ तिर्ने बिल — ई बी, आई ए आर ए, र ब्रस। अनि ई बी टाइम्स आई ए नै — पी एम, मेकानिकल पावर।'),
    ],
    [
      L(0, 'h', <>Numerical ko first line</>),
      L(0, 'step', tex(String.raw`E_b = V - I_aR_a`)),
      L(1, 'step', <>Shunt: <K>{String.raw`I_a = I_L - I_{sh}`}</K> · Series: R<sub>a</sub> + R<sub>se</sub></>),
      L(2, 'trap', <>Brush drop diyeko bhaye: <K>{String.raw`V = E_b + I_aR_a + V_{brush}`}</K></>),
      L(3, 'hook', <>V ko bill: E<sub>b</sub> + I<sub>a</sub>R<sub>a</sub> + brush · P<sub>m</sub> = E<sub>b</sub>I<sub>a</sub></>),
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
      L(3, 'step', <>∴{tex(String.raw`\boxed{T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right)\ \text{N}\cdot\text{m}} \qquad \cdots(5)`)}<b>Hence proved.</b></>),
    ],
  ),
  senior: role(
    [
      b('Torque derivation tin choti aayo. Marks ko lagi chain matra yaad: I c, B, F, tau, ani Z.', 'टर्क डेराइभेसन तीन चोटि आयो। मार्क्सको लागि चेन मात्र याद — आई सी, बी, एफ, टाउ, अनि जेड।'),
      b('Har link euta line: I c equals I a over A, B equals P phi over two pi r l, F equals B I c l, tau equals F r, T a equals Z tau.', 'हर लिङ्क एउटा लाइन — आई सी इक्वल्स आई ए ओभर ए, बी इक्वल्स पी फाइ ओभर टु पाइ आर एल, एफ इक्वल्स बी आई सी एल, टाउ इक्वल्स एफ आर, टी ए इक्वल्स जेड टाउ।'),
      b('Trap: 0.159 bhaneko one over two pi ho, ra P over A lap ma 1, wave ma P over 2. Unit newton metre nabirsa.', 'ट्र्याप — जिरो पोइन्ट वान फाइभ नाइन भनेको, वान ओभर टु पाइ हो। र पी ओभर ए — ल्यापमा वान, वेभमा पी ओभर टु। युनिट न्युटन मिटर नबिर्स।',
        q('4-pole wave wound motor ma P/A kati huncha?', 'फोर पोल, वेभ वाउन्ड मोटरमा, पी ओभर ए कति हुन्छ?', ['2', '1', '4'], 0, 'Wave: A = 2, so P/A = 4/2 = 2. Lap ma P/A = 1.')),
      b('Yaad garne chain: Current, B, Force, Tau, Z. "Cute Bear Finds Tasty Zucchini."', 'याद गर्ने चेन — करेन्ट, बी, फोर्स, टाउ, जेड। क्युट बियर फाइन्ड्स टेस्टी जुकिनी।'),
    ],
    [
      L(0, 'h', <>Torque derivation: chain yaad gara</>),
      L(1, 'step', <>I<sub>c</sub> = I<sub>a</sub>/A → B = Pφ/2πrl → F = BI<sub>c</sub>l → τ = Fr → T<sub>a</sub> = Zτ</>),
      L(2, 'trap', <>0.159 = 1/2π · P/A: lap 1, wave P/2 · unit N·m</>),
      L(3, 'hook', <>Cute Bear Finds Tasty Zucchini: I<sub>c</sub> · B · F · τ · Z</>),
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
  engineer: role(
    [
      b('Real motor: E b 210 volt, I a 20 ampere, speed 1500 rpm. P m equals E b I a equals T a omega, yasari T a equals 9.55 E b I a over N.', 'रियल मोटर — ई बी टु हन्ड्रेड टेन भोल्ट, आई ए ट्वेन्टी एम्पियर, स्पिड पन्ध्र सय आरपीएम। पी एम इक्वल्स ई बी आई ए, इक्वल्स टी ए ओमेगा। यसरी, टी ए इक्वल्स नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन।'),
      b('Armature torque 9.55 times 4200 over 1500, arthat 26.7 newton metre.', 'आर्मेचर टर्क — नाइन पोइन्ट फाइभ फाइभ, टाइम्स बयालीस सय, ओभर पन्ध्र सय। अर्थात छब्बीस पोइन्ट सेभेन न्युटन मिटर।'),
      b('Shaft bata 3.7 kilowatt matra niskancha. Shaft torque 9.55 times 3700 over 1500, arthat 23.6 newton metre.', 'साफ्टबाट थ्री पोइन्ट सेभेन किलोवाट मात्र निस्कन्छ। साफ्ट टर्क — नाइन पोइन्ट फाइभ फाइभ, टाइम्स सैंतीस सय, ओभर पन्ध्र सय। अर्थात तेइस पोइन्ट सिक्स न्युटन मिटर।'),
      b('Farak 3.2 newton metre, 500 watt ko iron ra friction loss ma kharcha huncha. Bearing ra core yahi bata taato hunchan.', 'फरक, थ्री पोइन्ट टु न्युटन मिटर — पाँच सय वाटको आइरन र फ्रिक्सन लसमा खर्च हुन्छ। बियरिङ र कोर, यहीँबाट तातो हुन्छन्।',
        q('Pm = 4200 W ra output 3700 W bhaye, iron ra friction loss kati?', 'पी एम बयालीस सय वाट, र आउटपुट सैंतीस सय वाट भए, आइरन र फ्रिक्सन लस कति?', ['500 W', '200 W', '3700 W'], 0, 'Pm − Pout = 4200 − 3700 = 500 W (lost torque ≈ 3.2 N·m).')),
    ],
    [
      L(0, 'h', <>Torque on a real motor</>),
      L(0, 'given', <>E<sub>b</sub> = 210 V · I<sub>a</sub> = 20 A · N = 1500 rpm · P<sub>out</sub> = 3.7 kW</>),
      L(0, 'step', tex(String.raw`\begin{aligned} E_bI_a &= T_a\,\omega \\ \Rightarrow T_a &= 9.55\,\dfrac{E_bI_a}{N} \end{aligned}`)),
      L(1, 'step', tex(String.raw`\begin{aligned} T_a &= 9.55 \times \dfrac{4200}{1500} \\ &= 26.7\ \text{N}\cdot\text{m} \end{aligned}`)),
      L(2, 'step', tex(String.raw`\begin{aligned} T_{sh} &= 9.55 \times \dfrac{3700}{1500} \\ &= 23.6\ \text{N}\cdot\text{m} \end{aligned}`)),
      L(3, 'answer', <>Lost torque ≈ 3.2 N·m (500 W iron + friction)</>),
    ],
  ),
  senior: role(
    [
      b('Numerical ma torque chahiyo bhane 9.55 wala formula sabai bhanda chhito: T a equals 9.55 E b I a over N.', 'न्युमेरिकलमा टर्क चाहियो भने, नाइन पोइन्ट फाइभ फाइभ वाला फर्मुला सबैभन्दा छिटो — टी ए इक्वल्स, नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन।'),
      b('Trap: T a ma E b I a, tara T sh ma output power. Dubai mix garyo bhane marks katcha.', 'ट्र्याप — टी एमा ई बी आई ए, तर टी एस एचमा आउटपुट पावर। दुवै मिक्स गर्यो भने, मार्क्स काटिन्छ।',
        q('Shaft torque nikalda kun power use garne?', 'साफ्ट टर्क निकाल्दा, कुन पावर युज गर्ने?', ['Output power', 'Eb·Ia', 'V·Ia'], 0, 'Tsh = 9.55 Pout/N. Eb·Ia le armature torque Ta dincha.')),
      b('Arko trap: N rpm mai halne, 9.55 le conversion garisakeko cha. Radian per second ma feri convert nagara.', 'अर्को ट्र्याप — एन आरपीएममै हाल्ने, नाइन पोइन्ट फाइभ फाइभले कन्भर्सन गरिसकेको छ। रेडियन पर सेकेन्डमा फेरि कन्भर्ट नगर।'),
      b('Yaad garne: 9.55 equals sixty over two pi.', 'याद गर्ने — नाइन पोइन्ट फाइभ फाइभ इक्वल्स, सिक्स्टी ओभर टु पाइ।'),
    ],
    [
      L(0, 'h', <>Torque numerical: fastest formula</>),
      L(0, 'step', tex(String.raw`T_a = 9.55\,\dfrac{E_bI_a}{N}`)),
      L(1, 'trap', <>T<sub>a</sub>: E<sub>b</sub>I<sub>a</sub> · T<sub>sh</sub>: P<sub>out</sub></>),
      L(2, 'trap', <>N in rpm (9.55 already converts)</>),
      L(3, 'hook', <>9.55 = 60 / 2π</>),
    ],
  ),
});

/* ── Big picture (rule 44): every role opens with the same IOE question card
   (`ioeQ`) and covers the same answer points as the Lecturer's model answer;
   only the way it is explained changes. ─────────────────────────────────── */
const TORQUE_Q = { tag: 'IOE 2073 Chaitra · 2069 Bhadra · 2082 Baishakh (ECM) · [4 + 2]', q: 'Explain the working principle of a DC motor and derive the torque equation.' };
const BACKEMF_Q = { tag: 'IOE 2071 Magh · 2078 Poush · 2082 Baishakh (ECM) · [2 + 4]', q: 'What is back EMF? How does it play an important role in a DC motor?' };
const ioeQ = ({ tag, q: text }) => L(0, 'q', <><span className="tag">{tag}</span>{text}</>);

/* ── Model answer: working principle ra torque equation (native: Lecturer) ─ */
addRoles(torqueAnswer, {
  tutor: role(
    [
      b('IOE ko yo question sangai garau: Explain the working principle of a DC motor and derive the torque equation.', 'आइओईको यो क्वेस्चन सँगै गरौं — एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर, एन्ड डेराइभ द टर्क इक्वेसन।'),
      b('Pahila principle: field ma current bokeko conductor lai F equals B I l force lagcha. N muni ra S muni current ulto, yasari force pani ulto.', 'पहिला प्रिन्सिपल — फिल्डमा करेन्ट बोकेको कन्डक्टरलाई, एफ इक्वल्स बी आई एल फोर्स लाग्छ। एन मुनि र एस मुनि करेन्ट उल्टो, यसरी फोर्स पनि उल्टो।'),
      b('Yaha dherai le sochchan force cancel huncha. Hudaina: duita side ma ulto force le couple banaucha. Commutator le MNA ma current reverse garera torque ek tira rakhcha.', 'यहाँ धेरैले सोच्छन् — फोर्स क्यान्सिल हुन्छ। हुँदैन — दुईटा साइडमा उल्टो फोर्सले कपल बनाउँछ। कम्युटेटरले एमएनएमा करेन्ट रिभर्स गरेर, टर्क एकतिर राख्छ।',
        q('Commutator nabhaye armature ma k huncha?', 'कम्युटेटर नभए, आर्मेचरमा के हुन्छ?', ['Agadi pachadi hallincha, pura ghumdaina', 'Jhan chhito ghumcha', 'Kei farak pardaina'], 0, 'MNA pachi current reverse nabhaye torque ulto huncha; armature oscillate matra garcha.')),
      b('Derivation: I c equals I a over A, ra B equals P phi over two pi r l. F equals B I c l ma l cancel huncha: P phi I a over two pi r A.', 'डेराइभेसन — आई सी इक्वल्स आई ए ओभर ए, र बी इक्वल्स पी फाइ ओभर टु पाइ आर एल। एफ इक्वल्स बी आई सी एलमा, एल क्यान्सिल हुन्छ — पी फाइ आई ए, ओभर टु पाइ आर ए।'),
      b('Torque F r ma r pani cancel: P phi I a over two pi A. Z le gunda T a equals 0.159 phi Z I a times P over A.', 'टर्क एफ आरमा, आर पनि क्यान्सिल — पी फाइ आई ए, ओभर टु पाइ ए। जेडले गुन्दा — टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, टाइम्स पी ओभर ए।'),
      b('Result: T a phi I a sanga proportional. Exam ma yahi kram ma lekha: principle, figure, working, commutator, derivation.', 'रिजल्ट — टी ए, फाइ आई एसँग प्रोपोर्सनल। एक्जाममा यही क्रममा लेख — प्रिन्सिपल, फिगर, वर्किङ, कम्युटेटर, डेराइभेसन।'),
    ],
    [
      ioeQ(TORQUE_Q),
      L(1, 'step', <>Principle: <K>{String.raw`F = BIl`}</K> · under N and under S, current (and force) opposite</>),
      L(2, 'step', <>Doubt: cancel? No, opposite forces on two sides = <b>couple</b> · commutator keeps torque one way</>),
      L(3, 'step', tex(String.raw`\begin{aligned} I_c &= \dfrac{I_a}{A},\qquad B = \dfrac{P\phi}{2\pi r l} \\ F &= \dfrac{P\phi}{2\pi r \cancel{l}} \cdot \dfrac{I_a}{A} \cdot \cancel{l} \\ &= \dfrac{P\phi I_a}{2\pi r A} \end{aligned}`)),
      L(4, 'step', tex(String.raw`\begin{aligned} \tau &= F\,r \\ &= \dfrac{P\phi I_a}{2\pi A} \\ T_a &= Z\,\tau \\ &= 0.159\,\phi Z I_a \tfrac{P}{A} \end{aligned}`)),
      L(5, 'idea', <>T<sub>a</sub> ∝ φI<sub>a</sub> · write: principle → Fig. → working → commutator → derivation</>),
    ],
  ),
  engineer: role(
    [
      b('IOE question: Explain the working principle of a DC motor and derive the torque equation. Real motor bata herau.', 'आइओई क्वेस्चन — एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर, एन्ड डेराइभ द टर्क इक्वेसन। रियल मोटरबाट हेरौं।'),
      b('Principle: field ma current bokeko conductor le F equals B I l force paucha. Real motor ma yo force sayau conductor ma ekai choti lagcha.', 'प्रिन्सिपल — फिल्डमा करेन्ट बोकेको कन्डक्टरले, एफ इक्वल्स बी आई एल फोर्स पाउँछ। रियल मोटरमा यो फोर्स, सयौं कन्डक्टरमा एकैचोटि लाग्छ।'),
      b('N muni ka conductor ma current bhitra, S muni ka ma bahira. Commutator le MNA ma current reverse garcha, yasari shaft ek tira matra ghumcha.', 'एन मुनिका कन्डक्टरमा करेन्ट भित्र, एस मुनिकामा बाहिर। कम्युटेटरले एमएनएमा करेन्ट रिभर्स गर्छ, यसरी साफ्ट एकतिर मात्र घुम्छ।'),
      b('Euta conductor ko force P phi I a over two pi r A, ra lever arm r le torque P phi I a over two pi A. Z conductor jodda T a equals 0.159 phi Z I a P over A.', 'एउटा कन्डक्टरको फोर्स — पी फाइ आई ए, ओभर टु पाइ आर ए। र लिभर आर्म आरले टर्क — पी फाइ आई ए, ओभर टु पाइ ए। जेड कन्डक्टर जोड्दा — टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए।'),
      b('Number ma: 4-pole lap, Z 480, phi 20 milliweber, I a 50 ampere bhaye T a lagbhag 76 newton metre.', 'नम्बरमा — फोर पोल ल्याप, जेड चार सय असी, फाइ ट्वेन्टी मिलिवेबर, आई ए फिफ्टी एम्पियर भए, टी ए लगभग छयहत्तर न्युटन मिटर।',
        q('Tyahi motor ma flux same rakhera Ia 50 A bata 100 A bhayo. Torque kati huncha?', 'त्यही मोटरमा फ्लक्स उही राखेर, आई ए फिफ्टी बाट वान हन्ड्रेड एम्पियर भयो। टर्क कति हुन्छ?', ['≈ 153 N·m', '≈ 76 N·m', '≈ 38 N·m'], 0, 'Ta ∝ Ia at constant φ: 76.3 × 2 ≈ 153 N·m.')),
      b('Result: T a phi I a sanga proportional. Load badhda motor le aafai dherai I a tancha ra torque badhcha.', 'रिजल्ट — टी ए, फाइ आई एसँग प्रोपोर्सनल। लोड बढ्दा, मोटरले आफैं धेरै आई ए तान्छ, र टर्क बढ्छ।'),
    ],
    [
      ioeQ(TORQUE_Q),
      L(1, 'step', <>Principle: <K>{String.raw`F = BIl`}</K> on every conductor at once</>),
      L(2, 'step', <>⊗ under N, ⊙ under S · commutator reverses at the MNA → shaft turns one way</>),
      L(3, 'step', tex(String.raw`\begin{aligned} F &= \dfrac{P\phi I_a}{2\pi r A} \\ \tau &= F\,r \\ &= \dfrac{P\phi I_a}{2\pi A} \\ T_a &= 0.159\,\phi Z I_a \tfrac{P}{A} \end{aligned}`)),
      L(4, 'step', tex(String.raw`\begin{aligned} T_a &= 0.159 \times 0.02 \times 480 \times 50 \\ &\approx 76.3\ \text{N}\cdot\text{m} \end{aligned}`)),
      L(5, 'idea', <>T<sub>a</sub> ∝ φI<sub>a</sub>: load ↑ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑</>),
    ],
  ),
  senior: role(
    [
      b('Senior ko plan: Explain the working principle of a DC motor and derive the torque equation. Tin choti aayo, 4 plus 2 marks.', 'सिनियरको प्लान — एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर, एन्ड डेराइभ द टर्क इक्वेसन। तीन चोटि आयो, फोर प्लस टु मार्क्स।'),
      b('4 marks: principle ko exact line, N S ko figure ⊗ ⊙ sahit, working ra commutator ko ek line.', 'फोर मार्क्स — प्रिन्सिपलको एक्जाक्ट लाइन, एन एसको फिगर, क्रस र डटसहित, वर्किङ, र कम्युटेटरको एक लाइन।'),
      b('2 marks: derivation ko panch line chain, ani boxed result 0.159 phi Z I a P over A.', 'टु मार्क्स — डेराइभेसनको पाँच लाइन चेन, अनि बक्स्ड रिजल्ट — जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए।'),
      b('Trap: N dot m unit ra P over A chhutaunu. Ani figure bina "working" ko marks pura aaudaina.', 'ट्र्याप — एन डट एम युनिट, र पी ओभर ए छुटाउनु। अनि फिगरबिना, वर्किङको मार्क्स पूरा आउँदैन।',
        q('Torque equation ko result kun unit ma lekhne?', 'टर्क इक्वेसनको रिजल्ट, कुन युनिटमा लेख्ने?', ['N·m', 'N', 'W'], 0, 'Torque = force × radius, so N·m. Watt power ko unit ho.')),
    ],
    [
      ioeQ(TORQUE_Q),
      L(1, 'step', <><b>4 marks:</b> principle line + Fig. 1 (⊗ ⊙) + working + commutator</>),
      L(2, 'step', <><b>2 marks:</b> 5-line chain + <K>{String.raw`\boxed{T_a = 0.159\,\phi Z I_a \tfrac{P}{A}}`}</K></>),
      L(3, 'trap', <>Unit N·m, P/A, ra figure nachhutau</>),
    ],
  ),
});

/* ── Model answer: back EMF ra yesko role (native: Lecturer) ───────────── */
addRoles(backEmfAnswer, {
  tutor: role(
    [
      b('IOE ko yo question sangai garau: What is back EMF? How does it play an important role in a DC motor?', 'आइओईको यो क्वेस्चन सँगै गरौं — ह्वाट इज ब्याक इएमएफ? हाउ डज इट प्ले एन इम्पोर्टेन्ट रोल इन अ डीसी मोटर?'),
      b('Back EMF: armature ghumda conductor le flux cut garchan ra EMF induce huncha. Lenz ko law anusar yo aafno karan, supply current, lai oppose garcha.', 'ब्याक इएमएफ — आर्मेचर घुम्दा, कन्डक्टरले फ्लक्स कट गर्छन्, र इएमएफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो आफ्नो कारण — सप्लाई करेन्टलाई अपोज गर्छ।'),
      b('Expression: E b equals P phi Z N over sixty A, ra V equals E b plus I a R a. Yasari I a equals V minus E b, over R a.', 'एक्स्प्रेसन — ई बी इक्वल्स पी फाइ जेड एन, ओभर सिक्स्टी ए। र भी इक्वल्स ई बी प्लस आई ए आर ए। यसरी, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।'),
      b('Role ek: load badhda speed ghatcha ra E b ghatcha. V fixed, tesaile I a badhcha, ra torque load barabar nahunjel badhcha.', 'रोल वान — लोड बढ्दा स्पिड घट्छ, र ई बी घट्छ। भी फिक्स्ड, त्यसैले आई ए बढ्छ, र टर्क लोड बराबर नहुन्जेल बढ्छ।',
        q('V fixed cha ra Eb badhyo. Ia ma k huncha?', 'भी फिक्स्ड छ र ई बी बढ्यो। आई एमा के हुन्छ?', ['Ghatcha', 'Badhcha', 'Same rahancha'], 0, 'Ia = (V − Eb)/Ra: Eb ↑ → numerator ↓ → Ia ↓.')),
      b('Role dui: E b le energy waste gardaina. V I a equals E b I a plus I a squared R a, ra E b I a nai mechanical power ho.', 'रोल टु — ई बीले इनर्जी वेस्ट गर्दैन। भी आई ए इक्वल्स, ई बी आई ए प्लस आई ए स्क्वायर आर ए। र ई बी आई ए नै, मेकानिकल पावर हो।'),
      b('Role tin: start ma N zero, E b zero, ani I a equals V over R a dherai thulo. Yahi karan starter chahincha.', 'रोल थ्री — स्टार्टमा एन जिरो, ई बी जिरो। अनि आई ए इक्वल्स भी ओभर आर ए, धेरै ठूलो। यही कारण, स्टार्टर चाहिन्छ।'),
    ],
    [
      ioeQ(BACKEMF_Q),
      L(1, 'step', <>Back EMF: induced on rotation; by Lenz it opposes its cause (the supply current)</>),
      L(2, 'step', tex(String.raw`\begin{aligned} E_b &= \dfrac{P\phi ZN}{60A} \\ V &= E_b + I_aR_a \\ I_a &= \dfrac{V - E_b}{R_a} \end{aligned}`)),
      L(3, 'step', <><b>Role 1</b> load ↑ → N ↓ → E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> = T<sub>L</sub></>),
      L(4, 'step', <><b>Role 2</b> <K>{String.raw`VI_a = E_bI_a + I_a^2R_a`}</K>: E<sub>b</sub>I<sub>a</sub> = P<sub>m</sub> (not wasted)</>),
      L(5, 'step', <><b>Role 3</b> start: E<sub>b</sub> = 0 → I<sub>a</sub> = V/R<sub>a</sub> very large → starter</>),
    ],
  ),
  engineer: role(
    [
      b('IOE question: What is back EMF? How does it play an important role in a DC motor? Site ko motor bata herau.', 'आइओई क्वेस्चन — ह्वाट इज ब्याक इएमएफ? हाउ डज इट प्ले एन इम्पोर्टेन्ट रोल इन अ डीसी मोटर? साइटको मोटरबाट हेरौं।'),
      b('Back EMF: ghumda armature ma induce hune EMF, jun Lenz ko law le supply V ko ulto huncha. E b equals P phi Z N over sixty A, ra V equals E b plus I a R a.', 'ब्याक इएमएफ — घुम्दा आर्मेचरमा इन्ड्युस हुने इएमएफ, जुन लेन्जको लले सप्लाई भीको उल्टो हुन्छ। ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, र भी इक्वल्स ई बी प्लस आई ए आर ए।'),
      b('Self-regulation: 220 volt, R a 0.5 ohm motor ma full speed E b 210 volt ra current 20 ampere. Load thapda E b 205 volt ra current 30 ampere.', 'सेल्फ रेगुलेसन — टु ट्वेन्टी भोल्ट, आर ए जिरो पोइन्ट फाइभ ओम मोटरमा, फुल स्पिड ई बी टु हन्ड्रेड टेन भोल्ट, र करेन्ट ट्वेन्टी एम्पियर। लोड थप्दा, ई बी टु हन्ड्रेड फाइभ भोल्ट, र करेन्ट थर्टी एम्पियर।'),
      b('Energy conversion: 210 volt times 20 ampere, 4200 watt, mechanical power ma jancha. 200 watt chai copper loss.', 'इनर्जी कन्भर्सन — टु हन्ड्रेड टेन भोल्ट टाइम्स ट्वेन्टी एम्पियर, बयालीस सय वाट — मेकानिकल पावरमा जान्छ। टु हन्ड्रेड वाट चाहिँ कपर लस।'),
      b('Starting: E b zero huda 440 ampere, rated ko 22 guna. 40 ampere ma limit garna total 5.5 ohm, arthat starter ma 5 ohm.', 'स्टार्टिङ — ई बी जिरो हुँदा फोर हन्ड्रेड फोर्टी एम्पियर, रेटेडको बाइस गुना। फोर्टी एम्पियरमा लिमिट गर्न, टोटल फाइभ पोइन्ट फाइभ ओम, अर्थात स्टार्टरमा फाइभ ओम।',
        q('220 V motor, Ra = 0.5 Ω. Starting current 40 A rakhna kati external resistance chahincha?', 'टु ट्वेन्टी भोल्ट मोटर, आर ए जिरो पोइन्ट फाइभ ओम। स्टार्टिङ करेन्ट फोर्टी एम्पियर राख्न, कति एक्सटर्नल रेजिस्टेन्स चाहिन्छ?', ['5 Ω', '5.5 Ω', '0.5 Ω'], 0, 'Total = 220/40 = 5.5 Ω; external = 5.5 − 0.5 = 5 Ω.')),
    ],
    [
      ioeQ(BACKEMF_Q),
      L(1, 'step', tex(String.raw`\begin{aligned} E_b &= \dfrac{P\phi ZN}{60A} \\ V &= E_b + I_aR_a \end{aligned}`)),
      L(2, 'step', <><b>Self-regulation</b> full speed: E<sub>b</sub> = 210 V, I<sub>a</sub> = 20 A · loaded: 205 V, 30 A</>),
      L(3, 'step', <><b>Energy</b> E<sub>b</sub>I<sub>a</sub> = 210 × 20 = 4200 W mechanical · I<sub>a</sub>²R<sub>a</sub> = 200 W heat</>),
      L(4, 'step', <><b>Starting</b> E<sub>b</sub> = 0 → 440 A (22 × rated) · <K>{String.raw`R_{total} = \tfrac{220}{40}`}</K> = 5.5 Ω → starter 5 Ω</>),
    ],
  ),
});
