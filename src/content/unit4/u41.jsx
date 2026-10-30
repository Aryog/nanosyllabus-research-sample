import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { backEmfFigure, torqueFigure } from '../video/picture.jsx';
import { forceFigure } from './figs.jsx';

/*
  4.1 Working principle, back EMF and torque equation: the opener and the
  Terms segment, each video told by the Tutor (default) and the Lecturer
  (variant) over one textbook figure. Derivations: t41.jsx. Big picture:
  picture.jsx (torqueAnswer, backEmfAnswer).
  Tone (user, 2026-10-30): serious, exact, no emoji, no hype; text on the left,
  the book figure on the right; every part named on the beat it is drawn.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

export const opener41 = duo('4.1 ma k padhne?', {
  draw: forceFigure,
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'Unit 4.1: working principle, back EMF ra torque equation. Sabai DC motor ko jag yahi topic ho.',
      voice: 'युनिट फोर पोइन्ट वान — वर्किङ प्रिन्सिपल, ब्याक इएमएफ र टर्क इक्वेसन। सबै डीसी मोटरको जग, यही टपिक हो।',
      lines: [['h', <>4.1</>], ['step', <>Working principle, back EMF ra torque equation</>]],
    },
    {
      say: 'Pahila, magnetic field bhitra current bokeko conductor le kina force paucha, ra tyo force le armature kasari ghumcha, bujhchau.',
      voice: 'पहिला, म्याग्नेटिक फिल्डभित्र करेन्ट बोकेको कन्डक्टरले किन फोर्स पाउँछ, र त्यो फोर्सले आर्मेचर कसरी घुम्छ — बुझ्छौं।',
      lines: [['step', <>1. Conductor in a field → force <K>{String.raw`F = BIl`}</K></>]],
    },
    {
      say: 'Tyaspachi, ghumda armature mai banne back EMF, ra torque ko equation derive garchau.',
      voice: 'त्यसपछि, घुम्दा आर्मेचरमै बन्ने ब्याक इएमएफ, र टर्कको इक्वेसन डेराइभ गर्छौं।',
      lines: [['step', <>2. Back EMF · 3. Torque equation</>]],
    },
    {
      say: 'Antim ma, IOE ka duita question ko model answer: torque equation ra back EMF ko role. Dubai tin-tin choti sodhiyeka chan.',
      voice: 'अन्तिममा, आइओईका दुईटा क्वेस्चनको मोडल आन्सर — टर्क इक्वेसन, र ब्याक इएमएफको रोल। दुवै, तीन-तीन चोटि सोधिएका छन्।',
      lines: [['hook', <>IOE: torque equation [4 + 2] · back EMF [2 + 4], each asked 3 times</>]],
    },
  ],
  lecturer: [
    {
      say: 'Unit 4.1: working principle, back EMF and torque equation of a DC motor.',
      voice: 'युनिट फोर पोइन्ट वान — डीसी मोटरको वर्किङ प्रिन्सिपल, ब्याक इएमएफ, एन्ड टर्क इक्वेसन।',
      lines: [['h', <>Unit 4.1</>], ['step', <>Working principle, back EMF and torque equation</>]],
    },
    {
      say: 'Syllabus ko pahilo bhag: working principle. Field ma rakheko current-carrying conductor le force paucha, F equals B I l.',
      voice: 'सिलेबसको पहिलो भाग — वर्किङ प्रिन्सिपल। फिल्डमा राखेको करेन्ट क्यारिङ कन्डक्टरले फोर्स पाउँछ — एफ इक्वल्स बी आई एल।',
      lines: [['step', <><H>1. Working principle</H>Force on a current-carrying conductor, <K>{String.raw`F = BIl`}</K></>]],
    },
    {
      say: 'Dosro ra tesro bhag: back EMF ko expression ra significance, ani torque equation ko derivation.',
      voice: 'दोस्रो र तेस्रो भाग — ब्याक इएमएफको एक्स्प्रेसन र सिग्निफिकेन्स, अनि टर्क इक्वेसनको डेराइभेसन।',
      lines: [['step', <><H>2. Back EMF</H>expression and significance · <H>3. Torque equation</H>derivation</>]],
    },
    {
      say: 'Exam ma yi duita question tin-tin choti aayeka chan. Big picture ma dubai ko model answer lekhincha.',
      voice: 'एक्जाममा यी दुईटा क्वेस्चन तीन-तीन चोटि आएका छन्। बिग पिक्चरमा, दुवैको मोडल आन्सर लेखिन्छ।',
      lines: [['hook', <>IOE: working principle + torque equation [4 + 2] · back EMF and its role [2 + 4]</>]],
    },
  ],
});

/* ── Working principle: force on a conductor ─────────────────────────── */
export const principle41 = duo('Working principle: F = BIl', {
  draw: forceFigure,
  viewBox: '0 0 360 214',
  tutor: [
    {
      say: 'N ra S pole ko bich ma magnetic field cha, N bata S tira. Yesko flux density B ho, tesla ma.',
      voice: 'एन र एस पोलको बीचमा म्याग्नेटिक फिल्ड छ, एनबाट एसतिर। यसको फ्लक्स डेन्सिटी बी हो, टेस्लामा।',
      lines: [['h', <>Working principle</>], ['step', <>Field N → S, flux density <b>B</b> (T)</>]],
    },
    {
      say: 'Aba field bhitra euta conductor rakhau, jasma current I page bhitra jaancha. Cross ko chinha le bhitra jaane current janaucha.',
      voice: 'अब फिल्डभित्र एउटा कन्डक्टर राखौं, जसमा करेन्ट आई पेजभित्र जान्छ। क्रसको चिन्हले, भित्र जाने करेन्ट जनाउँछ।',
      lines: [['step', <>Conductor with current <b>I</b> into the page (⊗)</>]],
    },
    {
      say: 'Conductor ko aafnai field ra pole ko field milda, conductor tala dhakelincha. Yahi mechanical force F ho.',
      voice: 'कन्डक्टरको आफ्नै फिल्ड र पोलको फिल्ड मिल्दा, कन्डक्टर तल धकेलिन्छ। यही मेकानिकल फोर्स एफ हो।',
      lines: [['step', <>Two fields combine → conductor pushed down: force <b>F</b></>]],
      ask: {
        q: 'Field ma rakheko conductor ma current nabaye force kati huncha?',
        voice: 'फिल्डमा राखेको कन्डक्टरमा करेन्ट नभए, फोर्स कति हुन्छ?',
        options: ['Zero', 'B l', 'Ulto direction ma'],
        answer: 0,
        why: 'F = BIl; I = 0 bhaye F = 0. Force current bata matra aaucha.',
      },
    },
    {
      say: 'Force ko magnitude F equals B I l newton, l conductor ko active length. Direction Fleming ko left-hand rule le dincha: first finger field, second finger current, thumb force.',
      voice: 'फोर्सको म्याग्निच्युड — एफ इक्वल्स बी आई एल न्युटन, एल कन्डक्टरको एक्टिभ लेन्थ। डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ — फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, थम्ब फोर्स।',
      lines: [['eq', tex(String.raw`F = B\,I\,l\ \ \text{N}`)], ['note', <>Fleming’s left-hand rule: first finger B · second finger I · thumb F</>]],
    },
  ],
  lecturer: [
    {
      say: 'Figure 1 ma N ra S pole ko bich uniform magnetic field cha, jasko flux density B tesla.',
      voice: 'फिगर वानमा, एन र एस पोलको बीच युनिफर्म म्याग्नेटिक फिल्ड छ, जसको फ्लक्स डेन्सिटी बी टेस्ला।',
      lines: [['h', <>Principle of a DC motor</>], ['step', <>Let a uniform magnetic field of flux density B (T) act from N to S (Fig. 1).</>]],
    },
    {
      say: 'Field ma length l ko conductor rakhincha, jasma current I page bhitra bagcha.',
      voice: 'फिल्डमा लेन्थ एलको कन्डक्टर राखिन्छ, जसमा करेन्ट आई पेजभित्र बग्छ।',
      lines: [['step', <>A conductor of active length l carrying current I (into the page) is placed in the field.</>]],
    },
    {
      say: 'Principle: when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.',
      voice: 'प्रिन्सिपल — ह्वेन अ करेन्ट क्यारिङ कन्डक्टर इज प्लेस्ड इन अ म्याग्नेटिक फिल्ड, इट एक्स्पिरियन्सेस अ मेकानिकल फोर्स।',
      lines: [['step', <><i>When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.</i></>]],
      ask: {
        q: 'DC motor ko working principle kun ho?',
        voice: 'डीसी मोटरको वर्किङ प्रिन्सिपल कुन हो?',
        options: ['Field ma current-carrying conductor le force paucha', 'Ghumne conductor ma EMF induce huncha', 'Current le heat banaucha'],
        answer: 0,
        why: 'Motor ma force principle; EMF induce hune principle generator ko ho.',
      },
    },
    {
      say: 'Force ko magnitude F equals B I l newton. Direction Fleming ko left-hand rule le dincha.',
      voice: 'फोर्सको म्याग्निच्युड — एफ इक्वल्स बी आई एल न्युटन। डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ।',
      lines: [['eq', tex(String.raw`F = B\,I\,l\ \ \text{N}`)], ['note', <>Direction: Fleming’s left-hand rule.</>]],
    },
  ],
});

/* ── Unidirectional torque and the commutator ───────────────────────── */
// torqueFigure parts: 0 poles + armature · 1 field · 2 ⊗/⊙ + forces ·
// 3 MNA + Ta (ringed again on 6) · 4 Ic, F · 5 r.
export const torque41 = duo('Unidirectional torque ra commutator', {
  draw: torqueFigure,
  viewBox: '0 0 360 276',
  tutor: [
    {
      say: 'Motor ma euta conductor hoina, armature ma dherai conductor hunchan. Armature N ra S pole ko bich ma ghumcha.',
      voice: 'मोटरमा एउटा कन्डक्टर होइन, आर्मेचरमा धेरै कन्डक्टर हुन्छन्। आर्मेचर, एन र एस पोलको बीचमा घुम्छ।',
      lines: [['h', <>Unidirectional torque</>], ['step', <>Armature: many conductors between N and S</>]],
    },
    {
      say: 'Field N bata S tira, armature ko mathi ra tala dubai bata.',
      voice: 'फिल्ड एनबाट एसतिर, आर्मेचरको माथि र तल दुवैबाट।',
      lines: [['step', <>Field B: N → S across the armature</>]],
    },
    {
      say: 'N pole muni ko conductor ma current bhitra, S pole muni ko ma bahira. Tesaile left ma force tala, right ma force mathi.',
      voice: 'एन पोलमुनिको कन्डक्टरमा करेन्ट भित्र, एस पोलमुनिकोमा बाहिर। त्यसैले, लेफ्टमा फोर्स तल, राइटमा फोर्स माथि।',
      lines: [['step', <>Under N: ⊗ → F down · under S: ⊙ → F up</>]],
      ask: {
        q: 'Left ma force tala ra right ma force mathi bhaye, armature lai k huncha?',
        voice: 'लेफ्टमा फोर्स तल र राइटमा फोर्स माथि भए, आर्मेचरलाई के हुन्छ?',
        options: ['Eutai direction ma ghumcha', 'Force cancel bhayera rokincha', 'Mathi uthcha'],
        answer: 0,
        why: 'Centre ko duita side ma ulto force le couple banaucha; dubai le eutai direction ma ghumaucha.',
      },
    },
    {
      say: 'Ulto side ma ulto force bhayeko le turning effect jodincha. Yo couple le armature anticlockwise ghumcha: yahi torque T a ho.',
      voice: 'उल्टो साइडमा उल्टो फोर्स भएकोले, टर्निङ इफेक्ट जोडिन्छ। यो कपलले आर्मेचर एन्टिक्लकवाइज घुम्छ — यही टर्क टी ए हो।',
      lines: [['step', <>Opposite forces on opposite sides → couple → torque <b>Ta</b> (anticlockwise)</>]],
    },
    {
      say: 'Euta conductor ko force F equals B I c l, ra centre bata duri r bhaye usko torque F r.',
      voice: 'एउटा कन्डक्टरको फोर्स — एफ इक्वल्स बी आई सी एल। र सेन्टरबाट दूरी आर भए, उसको टर्क — एफ आर।',
      lines: [['step', <>One conductor: <K>{String.raw`F = BI_cl`}</K>, torque <K>{String.raw`\tau = Fr`}</K></>]],
    },
    {
      say: 'Conductor ghumdai S pole muni pugda current ulto nabhaye force pani ulto huncha. Commutator le MNA ma current reverse garcha, ra torque sadhai eutai direction ma rahancha.',
      voice: 'कन्डक्टर घुम्दै एस पोलमुनि पुग्दा, करेन्ट उल्टो नभए फोर्स पनि उल्टो हुन्छ। कम्युटेटरले एमएनएमा करेन्ट रिभर्स गर्छ, र टर्क सधैं एउटै डाइरेक्सनमा रहन्छ।',
      lines: [['idea', <>Commutator reverses the coil current at the MNA → torque stays unidirectional</>]],
    },
  ],
  lecturer: [
    {
      say: 'Production of unidirectional torque. Figure ma armature N ra S pole ko bich rakhiyeko cha.',
      voice: 'प्रोडक्सन अफ युनिडाइरेक्सनल टर्क। फिगरमा, आर्मेचर एन र एस पोलको बीच राखिएको छ।',
      lines: [['h', <>Production of unidirectional torque</>], ['step', <>The armature is placed between the N and S poles (Fig. 1).</>]],
    },
    {
      say: 'Field winding excite garda flux N bata S tira armature bhayera jaancha.',
      voice: 'फिल्ड वाइन्डिङ एक्साइट गर्दा, फ्लक्स एनबाट एसतिर, आर्मेचर भएर जान्छ।',
      lines: [['step', <>When the field winding is excited, flux passes from N to S through the armature.</>]],
    },
    {
      say: 'Armature lai DC supply diyepachi N pole muni ka conductor ma current inward ra S pole muni ka ma outward huncha. Left-hand rule anusar left ma force downward, right ma upward.',
      voice: 'आर्मेचरलाई डीसी सप्लाई दिएपछि, एन पोलमुनिका कन्डक्टरमा करेन्ट इनवार्ड, र एस पोलमुनिकामा आउटवार्ड हुन्छ। लेफ्ट ह्यान्ड रुल अनुसार, लेफ्टमा फोर्स डाउनवार्ड, राइटमा अपवार्ड।',
      lines: [['step', <>Conductors under N carry current inward (⊗), those under S outward (⊙); by Fleming’s left-hand rule the force is downward on the left and upward on the right.</>]],
      ask: {
        q: 'Fleming ko left-hand rule ma thumb le k dekhaucha?',
        voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुलमा, थम्बले के देखाउँछ?',
        options: ['Force (motion) ko direction', 'Field ko direction', 'Current ko direction'],
        answer: 0,
        why: 'First finger field, second finger current, thumb force.',
      },
    },
    {
      say: 'Yi forces le couple banaucha ra armature anticlockwise ghumcha. Yo turning moment armature torque T a ho.',
      voice: 'यी फोर्सले कपल बनाउँछ, र आर्मेचर एन्टिक्लकवाइज घुम्छ। यो टर्निङ मोमेन्ट, आर्मेचर टर्क टी ए हो।',
      lines: [['step', <>These forces form a couple; the turning moment produced is the armature torque T<sub>a</sub>.</>]],
    },
    {
      say: 'Euta conductor ma force F equals B I c l, ra radius r ma usko torque tau equals F r.',
      voice: 'एउटा कन्डक्टरमा फोर्स — एफ इक्वल्स बी आई सी एल। र रेडियस आरमा, उसको टर्क — टाउ इक्वल्स एफ आर।',
      lines: [['step', tex(String.raw`\begin{aligned} F &= B\,I_c\,l \\ \tau &= F\,r \end{aligned}`)]],
    },
    {
      say: 'Coil MNA cross garda commutator le tesko current reverse garcha. Phalswarup torque unidirectional rahancha.',
      voice: 'कोइल एमएनए क्रस गर्दा, कम्युटेटरले त्यसको करेन्ट रिभर्स गर्छ। फलस्वरूप, टर्क युनिडाइरेक्सनल रहन्छ।',
      lines: [['step', <><H>Function of commutator</H>As a coil crosses the MNA its current is reversed by the commutator; hence the torque is unidirectional.</>]],
    },
  ],
});

/* ── Back EMF and its significance ───────────────────────────────────── */
// backEmfFigure parts: 0 circuit · 1 Eb opposes V · 2 Ia, drop ·
// 3 load chain (3–4) · 4 Pm · 5 starting.
export const backEmf41 = duo('Back EMF ra yesko significance', {
  draw: backEmfFigure,
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Armature circuit ma supply V, armature resistance R a, ra armature M series ma chan.',
      voice: 'आर्मेचर सर्किटमा — सप्लाई भी, आर्मेचर रेजिस्टेन्स आर ए, र आर्मेचर एम, सिरिजमा छन्।',
      lines: [['h', <>Back EMF</>], ['step', <>Supply V → R<sub>a</sub> → armature M</>]],
    },
    {
      say: 'Armature ghumda conductor le flux cut garcha, tesaile generator jastai EMF induce huncha. Lenz ko law anusar yo EMF supply V ko viruddha huncha: yahi back EMF E b.',
      voice: 'आर्मेचर घुम्दा, कन्डक्टरले फ्लक्स कट गर्छ, त्यसैले जेनेरेटर जस्तै इएमएफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो इएमएफ सप्लाई भीको विरुद्ध हुन्छ — यही ब्याक इएमएफ ई बी।',
      lines: [['step', <>Rotating conductors cut flux → EMF induced, opposing V (Lenz’s law) = <b>back EMF E<sub>b</sub></b></>], ['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A}`)]],
      ask: {
        q: 'Back EMF le supply voltage lai k garcha?',
        voice: 'ब्याक इएमएफले सप्लाई भोल्टेजलाई के गर्छ?',
        options: ['Oppose garcha', 'Jodcha (add garcha)', 'Kei pani gardaina'],
        answer: 0,
        why: 'Lenz ko law: induced EMF le aafulai banaune karan (supply bata aayeko current) lai oppose garcha.',
      },
    },
    {
      say: 'Tesaile armature current V hoina, V minus E b le chalaucha. I a equals V minus E b, over R a.',
      voice: 'त्यसैले आर्मेचर करेन्ट, भी होइन — भी माइनस ई बीले चलाउँछ। आई ए इक्वल्स — भी माइनस ई बी, ओभर आर ए।',
      lines: [['eq', tex(String.raw`I_a = \dfrac{V - E_b}{R_a}`)]],
    },
    {
      say: 'Load badhyo bhane speed alikati ghatcha, E b ghatcha, ani I a badhcha. Badhi current le badhi torque dincha. Motor le aafno current aafai milaucha.',
      voice: 'लोड बढ्यो भने, स्पिड अलिकति घट्छ — ई बी घट्छ — अनि आई ए बढ्छ। बढी करेन्टले बढी टर्क दिन्छ। मोटरले आफ्नो करेन्ट आफैं मिलाउँछ।',
      lines: [['step', <>Load ↑ → N ↓ → E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑: self-regulating</>]],
    },
    {
      say: 'E b times I a nai mechanical power ma badalincha: P m equals E b I a. Back EMF bina electrical power mechanical ma convert hudaina.',
      voice: 'ई बी टाइम्स आई ए नै मेकानिकल पावरमा बदलिन्छ — पी एम इक्वल्स ई बी आई ए। ब्याक इएमएफ बिना, इलेक्ट्रिकल पावर मेकानिकलमा कन्भर्ट हुँदैन।',
      lines: [['eq', tex(String.raw`P_m = E_b\,I_a`)]],
    },
    {
      say: 'Start ma N zero, tesaile E b zero ra I a equals V over R a. R a sano bhayeko le current dherai thulo huncha: yesaile starter chahincha.',
      voice: 'स्टार्टमा एन जिरो, त्यसैले ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए। आर ए सानो भएकोले, करेन्ट धेरै ठूलो हुन्छ — यसैले स्टार्टर चाहिन्छ।',
      lines: [['step', <>At start: N = 0 → E<sub>b</sub> = 0 → <K>{String.raw`I_a = V/R_a`}</K> (very large) → starter needed</>]],
      ask: {
        q: '220 V supply ra R a 0.5 ohm bhaye, start ko current kati huncha?',
        voice: 'टु ट्वेन्टी भोल्ट सप्लाई र आर ए जिरो पोइन्ट फाइभ ओम भए, स्टार्टको करेन्ट कति हुन्छ?',
        options: ['440 A', '110 A', '220 A'],
        answer: 0,
        why: 'E b = 0, tesaile I a = 220 / 0.5 = 440 A.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Figure 2: DC motor ko armature circuit. Supply V, armature resistance R a ra armature M.',
      voice: 'फिगर टु — डीसी मोटरको आर्मेचर सर्किट। सप्लाई भी, आर्मेचर रेजिस्टेन्स आर ए, र आर्मेचर एम।',
      lines: [['h', <>Back EMF</>], ['step', <>Fig. 2 shows the armature circuit: supply V, armature resistance R<sub>a</sub>, armature M.</>]],
    },
    {
      say: 'Definition: when the armature rotates, an EMF is induced in it which opposes the applied voltage. This EMF is called back EMF.',
      voice: 'डेफिनेसन — ह्वेन द आर्मेचर रोटेट्स, एन इएमएफ इज इन्ड्युस्ड इन इट, ह्विच अपोजेज द एप्लाइड भोल्टेज। दिस इएमएफ इज कल्ड ब्याक इएमएफ।',
      lines: [['step', <><i>When the armature rotates, an EMF is induced in it which opposes the applied voltage (Lenz’s law); it is called the back EMF, E<sub>b</sub>.</i></>], ['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A}`)]],
      ask: {
        q: 'Back EMF ko direction kun law le dincha?',
        voice: 'ब्याक इएमएफको डाइरेक्सन कुन लले दिन्छ?',
        options: ["Lenz's law", "Ohm's law", "Coulomb's law"],
        answer: 0,
        why: 'Lenz ko law: induced EMF le tyo EMF banaune karan lai oppose garcha.',
      },
    },
    {
      say: 'Significance one: armature current V minus E b, over R a huncha.',
      voice: 'सिग्निफिकेन्स वान — आर्मेचर करेन्ट, भी माइनस ई बी, ओभर आर ए हुन्छ।',
      lines: [['step', <>(i) The armature current is <K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K></>]],
    },
    {
      say: 'Significance two: load badhda speed ra E b ghatchan, I a badhcha, ra badhi torque banera motor self-regulating huncha.',
      voice: 'सिग्निफिकेन्स टु — लोड बढ्दा, स्पिड र ई बी घट्छन्, आई ए बढ्छ, र बढी टर्क बनेर मोटर सेल्फ रेगुलेटिङ हुन्छ।',
      lines: [['step', <>(ii) Load ↑ → N, E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑: the motor is self-regulating.</>]],
    },
    {
      say: 'Significance three: E b I a nai gross mechanical power ho. P m equals E b I a.',
      voice: 'सिग्निफिकेन्स थ्री — ई बी आई ए नै ग्रस मेकानिकल पावर हो। पी एम इक्वल्स ई बी आई ए।',
      lines: [['step', <>(iii) The power converted is <K>{String.raw`P_m = E_b\,I_a`}</K></>]],
    },
    {
      say: 'Significance four: start ma E b zero, tesaile current V over R a, dherai thulo. Hence a starter is necessary.',
      voice: 'सिग्निफिकेन्स फोर — स्टार्टमा ई बी जिरो, त्यसैले करेन्ट भी ओभर आर ए, धेरै ठूलो। हेन्स अ स्टार्टर इज नेसेसरी।',
      lines: [['step', <>(iv) At starting E<sub>b</sub> = 0, so <K>{String.raw`I_a = V/R_a`}</K> is very large; hence a starter is necessary.</>]],
      ask: {
        q: 'Start ma DC motor le kina dherai current lincha?',
        voice: 'स्टार्टमा डीसी मोटरले किन धेरै करेन्ट लिन्छ?',
        options: ['E b zero huncha ra R a sano huncha', 'Flux zero huncha', 'Supply voltage badhcha'],
        answer: 0,
        why: 'N = 0 bhayeko le E b = 0; I a = V/R a, R a sano bhayeko le thulo.',
      },
    },
  ],
});

/* ── Big picture: the two past questions, answered by the Lecturer ─────── */
// Point-wise, each part given space by its marks: about one point per mark.
export const torqueAnswer41 = answer('Model answer: working principle ra torque equation', {
  draw: figAt(torqueFigure, { 0: 0, 1: 1, 2: 2, 3: 3, 4: 5, 5: 6 }),
  viewBox: '0 0 360 276',
  papers: ['2073 Chaitra', '2069 Bhadra', '2082 Baishakh (ECM)'],
  marks: '[4 + 2]',
  q: 'Explain the working principle of a DC motor and derive the torque equation.',
  read: {
    say: 'IOE ma tin choti sodhiyeko question: explain the working principle of a DC motor and derive the torque equation. Pahilo bhag char marks, dosro dui marks.',
    voice: 'आइओईमा तीन चोटि सोधिएको क्वेस्चन — एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर, एन्ड डेराइभ द टर्क इक्वेसन। पहिलो भाग चार मार्क्स, दोस्रो दुई मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Working principle [4]</H><Pts items={[<>A current-carrying conductor in a magnetic field experiences a force.</>, <><K>{String.raw`F = BIl`}</K> newton</>, <>Direction: Fleming’s left-hand rule</>]} /></>,
      say: 'Working principle: magnetic field ma current-carrying conductor le force paucha. F equals B I l newton, direction Fleming ko left-hand rule le.',
      voice: 'वर्किङ प्रिन्सिपल — म्याग्नेटिक फिल्डमा करेन्ट क्यारिङ कन्डक्टरले फोर्स पाउँछ। एफ इक्वल्स बी आई एल न्युटन, डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले।',
    },
    {
      node: <><H>Working (Fig. 1)</H><Pts items={[<>Under N: current inward (⊗) → F downward</>, <>Under S: current outward (⊙) → F upward</>, <>The forces form a couple → armature turns anticlockwise</>]} /></>,
      say: 'Figure 1 ma: N muni current inward ra force downward, S muni current outward ra force upward. Yi forces le couple banaucha, ra armature anticlockwise ghumcha.',
      voice: 'फिगर वानमा — एन मुनि करेन्ट इनवार्ड र फोर्स डाउनवार्ड, एस मुनि करेन्ट आउटवार्ड र फोर्स अपवार्ड। यी फोर्सले कपल बनाउँछ, र आर्मेचर एन्टिक्लकवाइज घुम्छ।',
    },
    {
      node: <><H>Function of commutator</H><Pts items={[<>A coil crossing the MNA has its current reversed</>, <>∴ the torque is unidirectional</>]} /></>,
      say: 'Commutator: coil MNA cross garda tesko current reverse garcha. Tesaile torque unidirectional rahancha.',
      voice: 'कम्युटेटर — कोइल एमएनए क्रस गर्दा, त्यसको करेन्ट रिभर्स गर्छ। त्यसैले, टर्क युनिडाइरेक्सनल रहन्छ।',
      ask: {
        q: 'DC motor ma commutator ko kaam k ho?',
        voice: 'डीसी मोटरमा कम्युटेटरको काम के हो?',
        options: ['MNA ma coil ko current reverse garera torque ek tira rakhnu', 'Flux badhaunu', 'Supply voltage ghataunu'],
        answer: 0,
        why: 'MNA cross garda current reverse huncha, tesaile torque unidirectional rahancha.',
      },
    },
    {
      node: <><H>Continuous rotation</H><Pts items={[<>Many coils round the armature, each commutated in turn</>, <>Their torques add → steady, continuous rotation</>, <>Electrical energy → mechanical energy</>]} /></>,
      say: 'Armature ma dherai coil hunchan ra harek palai palo commutate huncha. Sabai ko torque jodera armature lagatar ghumcha: electrical energy mechanical ma badalincha.',
      voice: 'आर्मेचरमा धेरै कोइल हुन्छन्, र हरेक पालैपालो कम्युटेट हुन्छ। सबैको टर्क जोडेर आर्मेचर लगातार घुम्छ — इलेक्ट्रिकल इनर्जी मेकानिकलमा बदलिन्छ।',
    },
    {
      page: true,
      node: (
        <>
          <H>(b) Torque equation [2]</H>
          <Pts items={[<>Let P = poles, φ = flux/pole, Z = conductors, A = paths</>, <>I<sub>a</sub> = armature current, r = radius, l = length</>]} />
          <K>{String.raw`\begin{aligned} I_c &= \dfrac{I_a}{A} && \cdots(1) \\ B &= \dfrac{P\phi}{2\pi r l} && \cdots(2) \\ F &= B\,I_c\,l && \\ &= \dfrac{P\phi I_a}{2\pi r A} && \cdots(3) \end{aligned}`}</K>
        </>
      ),
      say: 'Torque equation. Let gareko symbols sanga: I c equals I a over A, B equals P phi over two pi r l, ra F equals P phi I a over two pi r A.',
      voice: 'टर्क इक्वेसन। लेट गरेको सिम्बोलसँग — आई सी इक्वल्स आई ए ओभर ए, बी इक्वल्स पी फाइ ओभर टु पाइ आर एल, र एफ इक्वल्स पी फाइ आई ए, ओभर टु पाइ आर ए।',
    },
    {
      node: (
        <>
          <K>{String.raw`\begin{aligned} T_a &= Z\,F\,r && \\ &= \dfrac{P\phi Z I_a}{2\pi A} && \cdots(4) \end{aligned}`}</K>
          <K>{String.raw`\boxed{T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right)\ \text{N}\cdot\text{m}} \qquad \cdots(5)`}</K>
          <Pts items={[<>For a given machine, <K>{String.raw`T_a \propto \phi\, I_a`}</K>. <b>Hence proved.</b></>]} />
        </>
      ),
      say: 'Z conductor ko torque T a equals Z F r, arthat P phi Z I a over two pi A. Tesaile T a equals 0.159 phi Z I a, P over A newton metre. Given machine ma T a phi I a sanga proportional. Hence proved.',
      voice: 'जेड कन्डक्टरको टर्क — टी ए इक्वल्स जेड एफ आर, अर्थात पी फाइ जेड आई ए, ओभर टु पाइ ए। त्यसैले, टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए न्युटन मिटर। गिभन मेसिनमा टी ए, फाइ आई एसँग प्रोपोर्सनल। हेन्स प्रुभ्ड।',
    },
  ],
});

export const backEmfAnswer41 = answer('Model answer: back EMF ra yesko role', {
  draw: backEmfFigure,
  viewBox: '0 0 360 222',
  papers: ['2071 Magh', '2078 Poush', '2082 Baishakh (ECM)'],
  marks: '[2 + 4]',
  q: 'What is back EMF? How does it play an important role in a DC motor?',
  read: {
    say: 'Arko question, yo pani tin choti sodhiyeko: what is back EMF, and how does it play an important role in a DC motor? Pahilo bhag dui marks, dosro char marks.',
    voice: 'अर्को क्वेस्चन, यो पनि तीन चोटि सोधिएको — ह्वाट इज ब्याक इएमएफ, एन्ड हाउ डज इट प्ले एन इम्पोर्टेन्ट रोल इन अ डीसी मोटर? पहिलो भाग दुई मार्क्स, दोस्रो चार मार्क्स।',
  },
  points: [
    {
      node: <><H>(a) Back EMF [2]</H><Pts items={[<>Rotating armature conductors cut the flux → an EMF is induced</>, <>By Lenz’s law it opposes the applied voltage V</>, <>It is called the back (counter) EMF, E<sub>b</sub></>]} /></>,
      say: 'Back EMF: armature ghumda conductor le flux cut garchan ra EMF induce huncha. Lenz ko law anusar yo V lai oppose garcha, tesaile back EMF E b bhanincha.',
      voice: 'ब्याक इएमएफ — आर्मेचर घुम्दा कन्डक्टरले फ्लक्स कट गर्छन्, र इएमएफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो भीलाई अपोज गर्छ। त्यसैले, ब्याक इएमएफ ई बी भनिन्छ।',
    },
    {
      node: <><H>Expression (Fig. 2)</H><K>{String.raw`\begin{aligned} E_b &= \dfrac{P\phi Z N}{60A} && \cdots(1) \\ V &= E_b + I_aR_a && \cdots(2) \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} && \cdots(3) \end{aligned}`}</K></>,
      say: 'Expression: E b equals P phi Z N over sixty A. Voltage equation V equals E b plus I a R a. Yasari I a equals V minus E b, over R a.',
      voice: 'एक्स्प्रेसन — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए। भोल्टेज इक्वेसन — भी इक्वल्स ई बी प्लस आई ए आर ए। यसरी, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।',
    },
    {
      page: true,
      node: <><H>(b) Role of back EMF [4]</H><Pts items={[<><b>(i) Self-regulation:</b> load ↑ → N ↓ → E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑ until T<sub>a</sub> = T<sub>L</sub></>]} /></>,
      say: 'Role ek, self-regulation: load badhda speed ra E b ghatchan, I a badhcha, ani torque load barabar nahunjel badhcha.',
      voice: 'रोल वान, सेल्फ रेगुलेसन — लोड बढ्दा, स्पिड र ई बी घट्छन्। आई ए बढ्छ, अनि टर्क, लोड बराबर नहुन्जेल बढ्छ।',
    },
    {
      node: <><Pts items={[<><b>(ii) Energy conversion:</b> (2) × I<sub>a</sub></>]} /><K>{String.raw`\begin{aligned} VI_a &= E_bI_a + I_a^2R_a && \cdots(4) \\ P_m &= E_b\,I_a && \cdots(5) \end{aligned}`}</K></>,
      say: 'Role dui, energy conversion: equation dui lai I a le multiply garda V I a equals E b I a plus I a squared R a. E b I a nai mechanical power P m ho.',
      voice: 'रोल टु, इनर्जी कन्भर्सन — इक्वेसन टुलाई आई एले मल्टिप्लाई गर्दा, भी आई ए इक्वल्स ई बी आई ए, प्लस आई ए स्क्वायर आर ए। ई बी आई ए नै, मेकानिकल पावर पी एम हो।',
    },
    {
      node: <><Pts items={[<><b>(iii) Starting:</b> N = 0 → E<sub>b</sub> = 0 → <K>{String.raw`I_a = V/R_a`}</K>, very large</>, <>e.g. 220 V, R<sub>a</sub> = 0.5 Ω → 440 A; hence a starter is necessary</>]} /></>,
      say: 'Role tin, starting: N zero bhayeko le E b zero, ra I a equals V over R a dherai thulo, jastai 440 ampere. Tesaile starter chahincha.',
      voice: 'रोल थ्री, स्टार्टिङ — एन जिरो भएकोले ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए, धेरै ठूलो — जस्तै फोर हन्ड्रेड फोर्टी एम्पियर। त्यसैले, स्टार्टर चाहिन्छ।',
      ask: {
        q: 'DC motor lai starter kina chahincha?',
        voice: 'डीसी मोटरलाई स्टार्टर किन चाहिन्छ?',
        options: ['Start ma Eb = 0 bhayera Ia = V/Ra dherai thulo huncha', 'Speed badhauna', 'Flux ghatauna'],
        answer: 0,
        why: 'N = 0 ma Eb = 0, tesaile Ia = V/Ra (220/0.5 = 440 A). Starter resistance le yo current limit garcha.',
      },
    },
    {
      node: <><Pts items={[<><b>(iv) Speed:</b> <K>{String.raw`N \propto \dfrac{E_b}{\phi}`}</K> → speed controlled by V, R<sub>a</sub> or φ</>]} /></>,
      say: 'Role char, speed: N, E b over phi sanga proportional. Back EMF le speed tokcha, tesaile V, R a wa phi badlera speed control garincha.',
      voice: 'रोल फोर, स्पिड — एन, ई बी ओभर फाइसँग प्रोपोर्सनल। ब्याक इएमएफले स्पिड तोक्छ, त्यसैले भी, आर ए, वा फाइ बदलेर स्पिड कन्ट्रोल गरिन्छ।',
    },
  ],
});
