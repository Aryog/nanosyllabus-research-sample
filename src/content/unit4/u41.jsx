import { K, Pts, answer, duo, figAt } from '../video/kit.jsx';
import { backEmfFigure, torqueFigure } from '../video/picture.jsx';
import { backEmf41 as backEmfScene41, fan41, swing41, torque41 as torqueScene41 } from './scenes41.js';

/*
  4.1 Working principle, back EMF and torque equation: the opener and the
  Terms segment (playful, 3D scenes41.js), each video told by the Tutor
  (default) and the Lecturer (variant). Derivations: t41.jsx. Big picture:
  picture.jsx (torqueAnswer, backEmfAnswer).
  Tone (user, 2026-10-30): serious, exact, no emoji, no hype; text on the left,
  the book figure on the right; every part named on the beat it is drawn.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;

/*
  Segment 1 is playful (skill rule 7, user 2026-10-30): each Terms video is a
  3D scene of something an 8th-grader has seen (scenes41.js): the ceiling
  fan, a rod swinging between a magnet's poles, bicycle pedals turning a
  wheel, a toy motor on an ammeter. The term and its symbol are named after
  the picture has made the idea click. Same scene for the Tutor and the
  Lecturer; same beat count, because the scene follows the beats.
*/
export const opener41 = duo('4.1 ma k padhne?', {
  three: fan41,
  tutor: [
    {
      say: 'Ghar ko ceiling fan sochau. Switch thichyo, pankha ghumna thalcha. Tyo ghumaune kaam garne chij motor ho.',
      voice: 'घरको सिलिङ फ्यान सोचौं। स्विच थिच्यो, पङ्खा घुम्न थाल्छ। त्यो घुमाउने काम गर्ने चीज, मोटर हो।',
      lines: [['h', <>4.1 · Motor kasari ghumcha?</>], ['step', <>Ceiling fan, mixer, e-rickshaw: sabai bhitra motor</>]],
    },
    {
      say: 'Fan ko hub bhitra tamako armature ra magnet ka pole chan. Current ra magnet milera armature ghumaucha.',
      voice: 'फ्यानको हबभित्र तामाको आर्मेचर, र म्याग्नेटका पोल छन्। करेन्ट र म्याग्नेट मिलेर, आर्मेचर घुमाउँछ।',
      lines: [['step', <>Hub bhitra: copper armature + magnet poles (N, S)</>]],
    },
    {
      say: '4.1 ma tin kura: conductor le force kina paucha, tyo force le torque kasari banaucha, ra ghumda banne back EMF.',
      voice: 'फोर पोइन्ट वानमा तीन कुरा — कन्डक्टरले फोर्स किन पाउँछ, त्यो फोर्सले टर्क कसरी बनाउँछ, र घुम्दा बन्ने ब्याक इएमएफ।',
      lines: [['step', <Pts items={[<>Force: <K>{String.raw`F = BIl`}</K></>, <>Torque: T<sub>a</sub></>, <>Back EMF: E<sub>b</sub></>]} />]],
    },
    {
      say: 'IOE ma torque equation ra back EMF, dubai tin-tin choti sodhiyeka chan. Suru garau.',
      voice: 'आइओईमा टर्क इक्वेसन र ब्याक इएमएफ, दुवै तीन-तीन चोटि सोधिएका छन्। सुरु गरौं।',
      lines: [['hook', <>IOE: torque equation [4 + 2] · back EMF [2 + 4], each asked 3 times</>]],
    },
  ],
  lecturer: [
    {
      say: 'Ceiling fan, mixer grinder, electric scooter: yi sabai lai electric motor le ghumaucha. Unit 4.1 ma tesko working principle padhincha.',
      voice: 'सिलिङ फ्यान, मिक्सर ग्राइन्डर, इलेक्ट्रिक स्कुटर — यी सबैलाई इलेक्ट्रिक मोटरले घुमाउँछ। युनिट फोर पोइन्ट वानमा, त्यसको वर्किङ प्रिन्सिपल पढिन्छ।',
      lines: [['h', <>Unit 4.1</>], ['step', <>Fans, mixers, e-scooters: all driven by motors</>]],
    },
    {
      say: 'Fan ko hub bhitra armature ra field poles huncha. Armature le current bokcha, poles le magnetic field dincha.',
      voice: 'फ्यानको हबभित्र आर्मेचर र फिल्ड पोल्स हुन्छ। आर्मेचरले करेन्ट बोक्छ, पोल्सले म्याग्नेटिक फिल्ड दिन्छ।',
      lines: [['step', <>Inside: armature (carries current) + field poles (give B)</>]],
    },
    {
      say: 'Syllabus: working principle, back EMF ko expression ra significance, ani torque equation.',
      voice: 'सिलेबस — वर्किङ प्रिन्सिपल, ब्याक इएमएफको एक्स्प्रेसन र सिग्निफिकेन्स, अनि टर्क इक्वेसन।',
      lines: [['step', <Pts items={[<>Working principle</>, <>Back EMF: expression and significance</>, <>Torque equation</>]} />]],
    },
    {
      say: 'Exam ma yi duita question tin-tin choti aayeka chan. Big picture ma dubai ko model answer lekhincha.',
      voice: 'एक्जाममा यी दुईटा क्वेस्चन तीन-तीन चोटि आएका छन्। बिग पिक्चरमा, दुवैको मोडल आन्सर लेखिन्छ।',
      lines: [['hook', <>IOE: working principle + torque equation [4 + 2] · back EMF and its role [2 + 4]</>]],
    },
  ],
});

/* ── Working principle: the wire swing ───────────────────────────────── */
export const principle41 = duo('Working principle: F = BIl', {
  three: swing41,
  tutor: [
    {
      say: 'Euta horseshoe magnet lyau: mathi N pole, tala S pole. Bich ma magnetic field cha, N bata S tira. Yesko flux density B, tesla ma.',
      voice: 'एउटा हर्सशु म्याग्नेट ल्याऔं — माथि एन पोल, तल एस पोल। बीचमा म्याग्नेटिक फिल्ड छ, एनबाट एसतिर। यसको फ्लक्स डेन्सिटी बी, टेस्लामा।',
      lines: [['h', <>Working principle</>], ['step', <>Magnet: field N → S, flux density <b>B</b> (T)</>]],
    },
    {
      say: 'Aba bich ma tamako dandi jhula jastai jhundyau, ra cell jodera tyasma current I pathau.',
      voice: 'अब बीचमा तामाको डन्डी, झुला जस्तै झुन्ड्याऔं। र सेल जोडेर, त्यसमा करेन्ट आई पठाऔं।',
      lines: [['step', <>Copper rod hung like a swing, current <b>I</b> through it</>]],
    },
    {
      say: 'Current pugne bittikai dandi jhula jastai bahira dhakelincha. Yahi mechanical force F ho.',
      voice: 'करेन्ट पुग्नेबित्तिकै, डन्डी झुला जस्तै बाहिर धकेलिन्छ। यही मेकानिकल फोर्स एफ हो।',
      lines: [['step', <>Current on → rod pushed out: force <b>F</b></>]],
      ask: {
        q: 'Field ma rakheko conductor ma current nabaye force kati huncha?',
        voice: 'फिल्डमा राखेको कन्डक्टरमा करेन्ट नभए, फोर्स कति हुन्छ?',
        options: ['Zero', 'B l', 'Ulto direction ma'],
        answer: 0,
        why: 'F = BIl; I = 0 bhaye F = 0. Force current bata matra aaucha.',
      },
    },
    {
      say: 'Force kati? F equals B I l newton, jaha l dandi ko field bhitra ko length. Direction Fleming ko left-hand rule le dincha: first finger field, second finger current, thumb force.',
      voice: 'फोर्स कति? एफ इक्वल्स बी आई एल न्युटन — जहाँ एल, डन्डीको फिल्डभित्रको लेन्थ। डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ — फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, थम्ब फोर्स।',
      lines: [['eq', tex(String.raw`F = B\,I\,l\ \ \text{N}`)], ['note', <>Fleming’s left-hand rule: first finger B · second finger I · thumb F</>]],
    },
  ],
  lecturer: [
    {
      say: 'Horseshoe magnet ko N ra S pole ko bich uniform magnetic field cha, jasko flux density B tesla.',
      voice: 'हर्सशु म्याग्नेटको एन र एस पोलको बीच, युनिफर्म म्याग्नेटिक फिल्ड छ, जसको फ्लक्स डेन्सिटी बी टेस्ला।',
      lines: [['h', <>Principle of a DC motor</>], ['step', <>Let a uniform magnetic field of flux density B (T) act from N to S.</>]],
    },
    {
      say: 'Field ma active length l ko copper rod jhundyaincha, ra yasma current I pathaincha.',
      voice: 'फिल्डमा एक्टिभ लेन्थ एलको कपर रड झुन्ड्याइन्छ, र यसमा करेन्ट आई पठाइन्छ।',
      lines: [['step', <>A rod of active length l carrying current I is placed in the field.</>]],
    },
    {
      say: 'Rod turuntai side tira dhakelincha. Principle: when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.',
      voice: 'रड तुरुन्तै साइडतिर धकेलिन्छ। प्रिन्सिपल — ह्वेन अ करेन्ट क्यारिङ कन्डक्टर इज प्लेस्ड इन अ म्याग्नेटिक फिल्ड, इट एक्स्पिरियन्सेस अ मेकानिकल फोर्स।',
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

/* ── Unidirectional torque: the armature, like bicycle pedals ────────── */
// The 3D armature's beats (motor3d.js): 0 armature, N, S, field · 1 currents
// under N then S · 2 force down on the left · 3 force up on the right ·
// 4 it turns, torque arc Ta · 5 neutral zone, currents flip.
export const torque41 = duo('Unidirectional torque ra commutator', {
  three: torqueScene41,
  tutor: [
    {
      say: 'Real motor ma euta dandi hoina. Armature bhanne ghumne drum ma dherai conductor hunchan, N ra S pole ko bich ma.',
      voice: 'रियल मोटरमा एउटा डन्डी होइन। आर्मेचर भन्ने घुम्ने ड्रममा धेरै कन्डक्टर हुन्छन्, एन र एस पोलको बीचमा।',
      lines: [['h', <>Unidirectional torque</>], ['step', <>Armature: a drum of many conductors between N and S</>]],
    },
    {
      say: 'Supply diyepachi N pole tira ka conductor ma current bhitra jaancha, S pole tira ka ma bahira aaucha.',
      voice: 'सप्लाई दिएपछि, एन पोलतिरका कन्डक्टरमा करेन्ट भित्र जान्छ, एस पोलतिरकामा बाहिर आउँछ।',
      lines: [['step', <>Under N: current in (⊗) · under S: out (⊙)</>]],
    },
    {
      say: 'Fleming ko rule lagau: field, current, ani force. N pole tira ka conductor tala dhakelinchan.',
      voice: 'फ्लेमिङको रुल लगाऔं — फिल्ड, करेन्ट, अनि फोर्स। एन पोलतिरका कन्डक्टर तल धकेलिन्छन्।',
      lines: [['step', <>Left side (under N): F down</>]],
    },
    {
      say: 'Ra S pole tira ka conductor chai mathi dhakelinchan.',
      voice: 'र एस पोलतिरका कन्डक्टर चाहिं माथि धकेलिन्छन्।',
      lines: [['step', <>Right side (under S): F up</>]],
      ask: {
        q: 'Left ma force tala ra right ma force mathi bhaye, armature lai k huncha?',
        voice: 'लेफ्टमा फोर्स तल र राइटमा फोर्स माथि भए, आर्मेचरलाई के हुन्छ?',
        options: ['Eutai direction ma ghumcha', 'Force cancel bhayera rokincha', 'Mathi uthcha'],
        answer: 0,
        why: 'Centre ko duita side ma ulto force le couple banaucha; dubai le eutai direction ma ghumaucha.',
      },
    },
    {
      say: 'Cycle ko pedal jastai: euta side tala, arko mathi, ani chakka ghumcha. Yo couple le armature anticlockwise ghumcha: torque T a. Euta conductor ma F equals B I c l, torque F r.',
      voice: 'साइकलको पेडल जस्तै — एउटा साइड तल, अर्को माथि, अनि चक्का घुम्छ। यो कपलले आर्मेचर एन्टिक्लकवाइज घुम्छ — टर्क टी ए। एउटा कन्डक्टरमा — एफ इक्वल्स बी आई सी एल, टर्क — एफ आर।',
      lines: [['step', <>Like pedals: down on one side, up on the other → couple → torque <b>Ta</b></>], ['note', <>One conductor: <K>{String.raw`F = BI_cl`}</K>, torque <K>{String.raw`\tau = Fr`}</K></>]],
    },
    {
      say: 'Conductor neutral zone kaatera arko pole tira pugda, current ulto nabhaye force ulto hunthyo. Commutator le tyahi current palta dincha, tesaile torque sadhai eutai direction ma.',
      voice: 'कन्डक्टर न्युट्रल जोन काटेर अर्को पोलतिर पुग्दा, करेन्ट उल्टो नभए फोर्स उल्टो हुन्थ्यो। कम्युटेटरले त्यही करेन्ट पल्टा दिन्छ, त्यसैले टर्क सधैं एउटै डाइरेक्सनमा।',
      lines: [['idea', <>Commutator flips the current at the neutral zone (MNA) → torque stays one way</>]],
    },
  ],
  lecturer: [
    {
      say: 'Production of unidirectional torque. Armature N ra S pole ko bich rakhiyeko cha, jasma dherai conductor chan.',
      voice: 'प्रोडक्सन अफ युनिडाइरेक्सनल टर्क। आर्मेचर, एन र एस पोलको बीच राखिएको छ, जसमा धेरै कन्डक्टर छन्।',
      lines: [['h', <>Production of unidirectional torque</>], ['step', <>The armature, with many conductors, lies between the N and S poles.</>]],
    },
    {
      say: 'DC supply dida N pole muni ka conductor ma current inward ra S pole muni ka ma outward huncha.',
      voice: 'डीसी सप्लाई दिँदा, एन पोलमुनिका कन्डक्टरमा करेन्ट इनवार्ड, र एस पोलमुनिकामा आउटवार्ड हुन्छ।',
      lines: [['step', <>Conductors under N carry current inward (⊗), those under S outward (⊙).</>]],
    },
    {
      say: 'Fleming ko left-hand rule anusar N pole muni ka conductor ma force downward huncha.',
      voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुल अनुसार, एन पोलमुनिका कन्डक्टरमा फोर्स डाउनवार्ड हुन्छ।',
      lines: [['step', <>By Fleming’s left-hand rule, the force is downward under N,</>]],
    },
    {
      say: 'Ra S pole muni ka conductor ma force upward.',
      voice: 'र एस पोलमुनिका कन्डक्टरमा फोर्स अपवार्ड।',
      lines: [['step', <>and upward under S.</>]],
      ask: {
        q: 'Fleming ko left-hand rule ma thumb le k dekhaucha?',
        voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुलमा, थम्बले के देखाउँछ?',
        options: ['Force (motion) ko direction', 'Field ko direction', 'Current ko direction'],
        answer: 0,
        why: 'First finger field, second finger current, thumb force.',
      },
    },
    {
      say: 'Yi forces le bicycle ko pedal jastai couple banaucha, ra armature anticlockwise ghumcha. Yo turning moment armature torque T a ho. Euta conductor ma F equals B I c l, ra tau equals F r.',
      voice: 'यी फोर्सले बाइसाइकलको पेडल जस्तै कपल बनाउँछ, र आर्मेचर एन्टिक्लकवाइज घुम्छ। यो टर्निङ मोमेन्ट, आर्मेचर टर्क टी ए हो। एउटा कन्डक्टरमा — एफ इक्वल्स बी आई सी एल, र टाउ इक्वल्स एफ आर।',
      lines: [['step', <>The forces form a couple; the turning moment is the armature torque T<sub>a</sub>.</>], ['step', tex(String.raw`\begin{aligned} F &= B\,I_c\,l \\ \tau &= F\,r \end{aligned}`)]],
    },
    {
      say: 'Coil MNA cross garda commutator le tesko current reverse garcha. Phalswarup torque unidirectional rahancha.',
      voice: 'कोइल एमएनए क्रस गर्दा, कम्युटेटरले त्यसको करेन्ट रिभर्स गर्छ। फलस्वरूप, टर्क युनिडाइरेक्सनल रहन्छ।',
      lines: [['step', <><H>Function of commutator</H>As a coil crosses the MNA its current is reversed by the commutator; hence the torque is unidirectional.</>]],
    },
  ],
});

/* ── Back EMF: a toy motor on an ammeter ─────────────────────────────── */
// The 3D scene's beats (scenes41.js): 0 cell, ammeter, motor · 1 it runs,
// Eb grows against V · 2 the needle settles low · 3 a brake (load) ·
// 4 load held · 5 a fresh start: the needle jumps to the red.
export const backEmf41 = duo('Back EMF ra yesko significance', {
  three: backEmfScene41,
  tutor: [
    {
      say: 'Euta sano toy motor, cell ra ammeter series ma jodau. Cell ko voltage V, ra motor ko armature resistance R a.',
      voice: 'एउटा सानो टोय मोटर, सेल र एमिटर सिरिजमा जोडौं। सेलको भोल्टेज भी, र मोटरको आर्मेचर रेजिस्टेन्स आर ए।',
      lines: [['h', <>Back EMF</>], ['step', <>Cell V → ammeter → toy motor (resistance R<sub>a</sub>)</>]],
    },
    {
      say: 'Motor ghumna thalepachi aafai sano generator banchha: conductor le flux kaatcha ra EMF induce huncha. Lenz ko law anusar yo V ko ulto huncha: yahi back EMF E b.',
      voice: 'मोटर घुम्न थालेपछि, आफैं सानो जेनेरेटर बन्छ — कन्डक्टरले फ्लक्स काट्छ, र इएमएफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो भीको उल्टो हुन्छ — यही ब्याक इएमएफ ई बी।',
      lines: [['step', <>Spinning motor = small generator → EMF against V (Lenz) = <b>back EMF E<sub>b</sub></b></>], ['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A}`)]],
      ask: {
        q: 'Back EMF le supply voltage lai k garcha?',
        voice: 'ब्याक इएमएफले सप्लाई भोल्टेजलाई के गर्छ?',
        options: ['Oppose garcha', 'Jodcha (add garcha)', 'Kei pani gardaina'],
        answer: 0,
        why: 'Lenz ko law: induced EMF le aafulai banaune karan (supply bata aayeko current) lai oppose garcha.',
      },
    },
    {
      say: 'Speed badhdai jada ammeter ko needle jhardai jancha. Current V le hoina, V minus E b le chalaucha: I a equals V minus E b, over R a.',
      voice: 'स्पिड बढ्दै जाँदा, एमिटरको निडल झर्दै जान्छ। करेन्ट भीले होइन, भी माइनस ई बीले चलाउँछ — आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए।',
      lines: [['eq', tex(String.raw`I_a = \dfrac{V - E_b}{R_a}`)]],
    },
    {
      say: 'Aba shaft lai brake le thichau. Speed ghatcha, E b ghatcha, ani I a badhcha; badhi current le badhi torque dincha. Motor le aafno current aafai milaucha.',
      voice: 'अब शाफ्टलाई ब्रेकले थिचौं। स्पिड घट्छ, ई बी घट्छ, अनि आई ए बढ्छ — बढी करेन्टले बढी टर्क दिन्छ। मोटरले आफ्नो करेन्ट आफैं मिलाउँछ।',
      lines: [['step', <>Load ↑ → N ↓ → E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑: self-regulating</>]],
    },
    {
      say: 'E b times I a nai mechanical power ma badalincha: P m equals E b I a. Back EMF bina electrical power mechanical ma convert hudaina.',
      voice: 'ई बी टाइम्स आई ए नै मेकानिकल पावरमा बदलिन्छ — पी एम इक्वल्स ई बी आई ए। ब्याक इएमएफ बिना, इलेक्ट्रिकल पावर मेकानिकलमा कन्भर्ट हुँदैन।',
      lines: [['eq', tex(String.raw`P_m = E_b\,I_a`)]],
    },
    {
      say: 'Switch on garne bela motor rokiyeko huncha: N zero, E b zero, ra I a equals V over R a. R a sano bhayeko le current dherai thulo huncha: yesaile starter chahincha.',
      voice: 'स्विच अन गर्ने बेला मोटर रोकिएको हुन्छ — एन जिरो, ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए। आर ए सानो भएकोले, करेन्ट धेरै ठूलो हुन्छ — यसैले स्टार्टर चाहिन्छ।',
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
      say: 'Supply V bata ammeter hudai motor jodiyeko cha; armature resistance R a.',
      voice: 'सप्लाई भीबाट एमिटर हुँदै मोटर जोडिएको छ — आर्मेचर रेजिस्टेन्स आर ए।',
      lines: [['h', <>Back EMF</>], ['step', <>A motor is connected to a supply V through an ammeter; armature resistance R<sub>a</sub>.</>]],
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
      say: 'Significance one: armature current V minus E b, over R a huncha; speed badhda ammeter ko reading ghatcha.',
      voice: 'सिग्निफिकेन्स वान — आर्मेचर करेन्ट, भी माइनस ई बी, ओभर आर ए हुन्छ। स्पिड बढ्दा, एमिटरको रिडिङ घट्छ।',
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
