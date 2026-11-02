import { K, Pts, br, duo, figAt, rem, Let } from '../video/kit.jsx';
import { backEmfFigure, torqueFigure } from '../video/picture.jsx';
import { commFigure, forceFigure } from './figs.jsx';

/*
  4.1 Syllabus Content (segment 2), rewritten 2026-11-02 from the user's
  review and the Electrical Machines notes (vault/…/Notes, KBT Insights on EM,
  D.C. Motor pp. 123–127: Fig (a)/(b) after 180°, torque by work in one
  revolution, the aspects of back EMF).
  Bookish notes, no 3D (user: "mid section is good bookish notes"); every
  video in both roles over one book figure.
  Canvas plan for every video: heading on top · "Remember" card first (what
  must be known before the new idea) · main board left · figure right · a
  branch scene (br) takes the figure's place for one beat to answer "where
  did this come from?", then the main line goes on · planned page turns
  (`page: true`) keep earlier results as short carried lines.
  Symbols, one meaning each, in every video: P poles · φ flux per pole (Wb) ·
  Φ flux cut · Z armature conductors · A parallel paths · N speed (rpm) ·
  t time (s) · Eb back EMF · e EMF per conductor · Ia armature current ·
  Ic current per conductor · Ra armature resistance · B flux density ·
  l active length · r armature radius · F force · τ torque of one conductor ·
  Ta armature torque · Tsh shaft torque · Pm gross mechanical power.
  Numbers: 220/0.5 = 440 A; 60/1200 = 0.05 s; 1/2π = 0.1592; 60/2π = 9.549.
*/

const tex = (s) => <K>{s}</K>;
const H = ({ children }) => <span className="lbl"><u>{children}</u></span>;
const step = (label, math) => <><span className="lbl">{label}</span>{tex(math)}</>;
const C = { BL: '#1c7ed6', OR: '#d9480f', GR: '#2b8a3e', VI: '#7048e8' };
const X = (t, c) => String.raw`\htmlClass{xt}{\textcolor{${c}}{${t}}}`;
const R = (t, c, n = 1) => String.raw`\htmlClass{xr xr${n}}{\textcolor{${c}}{${t}}}`;

/* ── 1. Working principle ─────────────────────────────────────────────── */
// forceFigure: 0 poles + field · 1 conductor with I · 2 force · 3 F = BIl
export const principleS41 = duo('Working principle of a DC motor', {
  draw: figAt(forceFigure, { 0: 0, 1: 1, 2: 2, 3: 4 }),
  viewBox: '0 0 360 216',
  tutor: [
    {
      say: 'Working principle bujhna pahila duita kura yaad garau. Magnetic field N pole bata S pole tira jancha. Cross ko chinha le current page bhitra jane, dot le page bahira aaune dekhaucha.',
      voice: 'वर्किङ प्रिन्सिपल बुझ्न, पहिला दुईटा कुरा याद गरौं। म्याग्नेटिक फिल्ड, एन पोलबाट एस पोलतिर जान्छ। क्रसको चिन्हले करेन्ट पेजभित्र जाने, र डटले पेजबाहिर आउने देखाउँछ।',
      lines: [['h', <>Working principle of a DC motor</>], rem(<>Field lines go from N to S; flux density B (T)</>, <>⊗ current into the page · ⊙ current out of the page</>)],
    },
    {
      say: 'Aba yo field bhitra l length ko conductor rakhau, ra tyasma current I pathau. Figure ma current page bhitra jaadai cha.',
      voice: 'अब यो फिल्डभित्र, एल लेन्थको कन्डक्टर राखौं, र त्यसमा करेन्ट आई पठाऔं। फिगरमा करेन्ट पेजभित्र जाँदै छ।',
      lines: [['step', <>A conductor of active length l carrying current I is placed in the field.</>]],
    },
    {
      say: 'Conductor ma turuntai mechanical force F aaucha. Yahi DC motor ko working principle ho: magnetic field ma rakheko current-carrying conductor le mechanical force anubhav garcha.',
      voice: 'कन्डक्टरमा तुरुन्तै मेकानिकल फोर्स एफ आउँछ। यही डी सी मोटरको वर्किङ प्रिन्सिपल हो — म्याग्नेटिक फिल्डमा राखेको करेन्ट क्यारिङ कन्डक्टरले, मेकानिकल फोर्स अनुभव गर्छ।',
      lines: [['step', <><b>Principle:</b> <i>a current-carrying conductor placed in a magnetic field experiences a mechanical force.</i></>]],
      ask: {
        q: 'Magnetic field ma rakheko conductor ma current nabaye force kati huncha?',
        voice: 'म्याग्नेटिक फिल्डमा राखेको कन्डक्टरमा करेन्ट नभए, फोर्स कति हुन्छ?',
        options: ['Zero', 'B l', 'Ulto direction ma B I l'],
        answer: 0,
        why: 'F = BIl; I = 0 bhaye F = 0. Force current ra field dubai bhaye matra aaucha.',
      },
    },
    {
      say: 'Force ko direction Fleming ko left-hand rule le dincha. Debre haat ka tin aunla ek arka sanga perpendicular rakhau: first finger field, second finger current, thumb force.',
      voice: 'फोर्सको डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ। देब्रे हातका तीन औंला, एक अर्कासँग पर्पेन्डिकुलर राखौं — फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, थम्ब फोर्स।',
      lines: [br('Direction of F: Fleming’s left-hand rule', <Pts items={[<>Three fingers of the left hand, mutually perpendicular</>, <><b>F</b>irst finger → <b>F</b>ield (B)</>, <>se<b>C</b>ond finger → <b>C</b>urrent (I)</>, <>thu<b>M</b>b → <b>M</b>otion (F)</>]} />)],
    },
    {
      say: 'Force ko magnitude F equals B I l. Yesko unit newton ho. Force B, I ra l teenai sanga proportional cha.',
      voice: 'फोर्सको म्याग्निच्युड — एफ इक्वल्स बी आई एल। यसको युनिट न्युटन हो। फोर्स बी, आई र एल, तीनैसँग प्रोपोर्सनल छ।',
      lines: [['eq', tex(String.raw`F = B\,I\,l \unit{newton}`)], ['note', <>F grows with B, I and l (conductor at right angles to B)</>]],
    },
    {
      say: 'DC motor ma yahi force armature ka dherai conductor ma ekai choti lagcha, ra armature ghumcha. Electrical energy mechanical energy ma badalincha.',
      voice: 'डी सी मोटरमा यही फोर्स, आर्मेचरका धेरै कन्डक्टरमा एकैचोटि लाग्छ, र आर्मेचर घुम्छ। इलेक्ट्रिकल इनर्जी, मेकानिकल इनर्जीमा बदलिन्छ।',
      lines: [['idea', <>Force on many armature conductors → rotation: electrical energy → mechanical energy</>]],
    },
  ],
  lecturer: [
    {
      say: 'Working principle suru garnu aghi do kura smaran garau: magnetic field N bata S tira huncha, ra cross le inward, dot le outward current janauncha.',
      voice: 'वर्किङ प्रिन्सिपल सुरु गर्नुअघि, दुई कुरा स्मरण गरौं — म्याग्नेटिक फिल्ड एनबाट एसतिर हुन्छ, र क्रसले इनवार्ड, डटले आउटवार्ड करेन्ट जनाउँछ।',
      lines: [['h', <>Principle of operation of a DC motor</>], rem(<>Magnetic field: from N to S, flux density B (T)</>, <>⊗ inward current · ⊙ outward current</>)],
    },
    {
      say: 'Maanau, uniform field B ma l active length ko conductor rakhiyeko cha, jasma current I bagcha.',
      voice: 'मानौं, युनिफर्म फिल्ड बीमा, एल एक्टिभ लेन्थको कन्डक्टर राखिएको छ, जसमा करेन्ट आई बग्छ।',
      lines: [['step', <>Let a conductor of active length l, carrying current I, be placed in a uniform field B.</>]],
    },
    {
      say: 'Principle: when a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force. DC motor yahi siddhanta ma chalcha.',
      voice: 'प्रिन्सिपल — ह्वेन अ करेन्ट क्यारिङ कन्डक्टर इज प्लेस्ड इन अ म्याग्नेटिक फिल्ड, इट एक्स्पिरियन्सेस अ मेकानिकल फोर्स। डी सी मोटर यही सिद्धान्तमा चल्छ।',
      lines: [['step', <><i>When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.</i></>]],
      ask: {
        q: 'DC motor ko working principle kun ho?',
        voice: 'डी सी मोटरको वर्किङ प्रिन्सिपल कुन हो?',
        options: ['Field ma current-carrying conductor le force paucha', 'Ghumne conductor ma EMF induce huncha', 'Current le heat banaucha'],
        answer: 0,
        why: 'Motor force ko principle ma chalcha; ghumne conductor ma EMF induce hune principle generator ko ho.',
      },
    },
    {
      say: 'Force ko direction Fleming ko left-hand rule le dincha: first finger field, second finger current, ra thumb motion, teenai mutually perpendicular.',
      voice: 'फोर्सको डाइरेक्सन, फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ — फर्स्ट फिंगर फिल्ड, सेकेन्ड फिंगर करेन्ट, र थम्ब मोसन, तीनै म्युचुअली पर्पेन्डिकुलर।',
      lines: [br('Fleming’s left-hand rule', <Pts items={[<>Fingers of the left hand mutually perpendicular</>, <>First finger: field · second finger: current</>, <>Thumb: direction of force (motion)</>]} />)],
    },
    {
      say: 'Force ko magnitude F equals B I l, newton ma.',
      voice: 'फोर्सको म्याग्निच्युड — एफ इक्वल्स बी आई एल, न्युटनमा।',
      lines: [['eq', tex(String.raw`F = B\,I\,l \unit{newton}`)], ['note', <>Valid when the conductor is at right angles to B.</>]],
    },
    {
      say: 'Armature ka sabai conductor ma yo force lagda armature ghumcha; yasari electrical energy mechanical energy ma rupantaran huncha.',
      voice: 'आर्मेचरका सबै कन्डक्टरमा यो फोर्स लाग्दा, आर्मेचर घुम्छ। यसरी इलेक्ट्रिकल इनर्जी, मेकानिकल इनर्जीमा रूपान्तरण हुन्छ।',
      lines: [['idea', <>Hence electrical energy is converted into mechanical energy.</>]],
    },
  ],
});

/* ── 2. Unidirectional torque and the commutator ─────────────────────── */
// commFigure: 0 poles, coil, commutator · 1 currents (a) · 2 forces, Ta (a) ·
// 3 panel (b) after 180° · 4 MNA
export const commS41 = duo('Production of unidirectional torque', {
  draw: figAt(commFigure, { 0: 0, 1: 1, 2: 2, 3: 4, 4: 6 }),
  viewBox: '0 0 360 246',
  tutor: [
    {
      say: 'Aghillo video bata yaad garau: field ma current bokeko conductor le F equals B I l force paucha, ra direction Fleming ko left-hand rule le dincha. Aba euta coil a, a dash, ra commutator lyau.',
      voice: 'अघिल्लो भिडियोबाट याद गरौं — फिल्डमा करेन्ट बोकेको कन्डक्टरले, एफ इक्वल्स बी आई एल फोर्स पाउँछ, र डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुलले दिन्छ। अब एउटा कोइल — ए, ए ड्यास, र कम्युटेटर ल्याऔं।',
      lines: [['h', <>Production of unidirectional torque</>], rem(<>F = BIl on a current-carrying conductor in a field</>, <>Direction of F: Fleming’s left-hand rule</>)],
    },
    {
      say: 'Figure a ma conductor a N pole ko prabhav ma cha ra tyasma current bhitra jancha. Conductor a dash S pole ko prabhav ma cha ra tyasma current bahira aaucha.',
      voice: 'फिगर एमा, कन्डक्टर ए, एन पोलको प्रभावमा छ, र त्यसमा करेन्ट भित्र जान्छ। कन्डक्टर ए ड्यास, एस पोलको प्रभावमा छ, र त्यसमा करेन्ट बाहिर आउँछ।',
      lines: [['step', <>Fig. (a): a, in the N-pole region, carries ⊗; a′, in the S-pole region, carries ⊙</>]],
    },
    {
      say: 'Fleming ko rule le a ma force tala ra a dash ma force mathi dincha. Yi duita ulta force le couple banauchan, ra coil anticlockwise ghumcha. Yahi torque T a ho.',
      voice: 'फ्लेमिङको रुलले, ए मा फोर्स तल, र ए ड्यासमा फोर्स माथि दिन्छ। यी दुईटा उल्टा फोर्सले कपल बनाउँछन्, र कोइल एन्टिक्लकवाइज घुम्छ। यही टर्क टी ए हो।',
      lines: [['step', <>F on a: downward · F on a′: upward → a couple → anticlockwise torque T<sub>a</sub></>]],
      ask: {
        q: 'Coil ko euta side ma force tala ra arko side ma force mathi bhaye coil lai k huncha?',
        voice: 'कोइलको एउटा साइडमा फोर्स तल, र अर्को साइडमा फोर्स माथि भए, कोइललाई के हुन्छ?',
        options: ['Couple banera ghumcha', 'Force cancel bhayera rokincha', 'Mathi uthcha'],
        answer: 0,
        why: 'Centre ko dui side ma barabar ra ulta force le couple banaucha; couple le ghumaucha.',
      },
    },
    {
      say: 'Commutator nabhaye ke hunthyo? Aadha round ghumepachi a S pole ko prabhav ma pugcha tara current ajhai bhitra nai jancha. Force ulto huncha, ra coil agadi pachadi matra hallincha.',
      voice: 'कम्युटेटर नभए के हुन्थ्यो? आधा राउन्ड घुमेपछि, ए, एस पोलको प्रभावमा पुग्छ, तर करेन्ट अझै भित्रै जान्छ। फोर्स उल्टो हुन्छ, र कोइल अगाडि पछाडि मात्र हल्लिन्छ।',
      lines: [br('Without a commutator?', <Pts items={[<>After 180°, a is in the S-pole region but still carries ⊗</>, <>Its force reverses → the torque reverses</>, <>The coil only rocks to and fro: no continuous rotation</>]} />)],
    },
    {
      say: 'Figure b ma coil 180 degree ghumisakeko cha. Commutator ra brush le coil ko current ulto gardincha, tesaile N pole ko prabhav ma aaune a dash ma aba current bhitra jancha. Force ra torque ko direction usai rahancha.',
      voice: 'फिगर बीमा, कोइल एक सय असी डिग्री घुमिसकेको छ। कम्युटेटर र ब्रसले कोइलको करेन्ट उल्टो गर्दिन्छ, त्यसैले एन पोलको प्रभावमा आउने ए ड्यासमा अब करेन्ट भित्र जान्छ। फोर्स र टर्कको डाइरेक्सन उस्तै रहन्छ।',
      lines: [['step', <>Fig. (b), after 180°: the commutator reverses the coil current → a′ (now in the N-pole region) carries ⊗ → same torque direction</>]],
    },
    {
      say: 'Yo ulto hune kaam kaha huncha? MNA ma, arthat N ra S ko thik bich ko line ma. MNA ma conductor le flux kaatdaina, so current palta dida force ko jhatka hudaina.',
      voice: 'यो उल्टो हुने काम कहाँ हुन्छ? एम एन एमा — अर्थात एन र एसको ठीक बीचको लाइनमा। एम एन एमा कन्डक्टरले फ्लक्स काट्दैन, सो करेन्ट पल्टाउँदा फोर्सको झट्का हुँदैन।',
      lines: [br('What is the MNA?', <Pts items={[<>Magnetic Neutral Axis: the line midway between N and S</>, <>A conductor there cuts no flux: no EMF, no force</>, <>The commutator reverses the coil current here</>]} />)],
    },
    {
      say: 'Figure ma MNA dubai panel ko bich ma cha. Coil MNA cross garne bittikai commutator le current reverse garcha, tesaile torque sadhai eutai direction ma rahancha: unidirectional torque.',
      voice: 'फिगरमा एम एन ए, दुवै प्यानलको बीचमा छ। कोइल एम एन ए क्रस गर्नेबित्तिकै, कम्युटेटरले करेन्ट रिभर्स गर्छ। यसरी टर्क सधैं एउटै डाइरेक्सनमा रहन्छ — युनिडाइरेक्सनल टर्क।',
      lines: [['step', <>Current reversed as each coil crosses the MNA → torque always in one direction: <b>unidirectional torque</b></>]],
      ask: {
        q: 'DC motor ma commutator ko kaam k ho?',
        voice: 'डी सी मोटरमा कम्युटेटरको काम के हो?',
        options: ['MNA ma coil ko current reverse garera torque eutai direction ma rakhnu', 'Flux badhaunu', 'Supply voltage ghataunu'],
        answer: 0,
        why: 'Coil MNA cross garda current reverse huncha, yasari torque unidirectional rahancha.',
      },
    },
    {
      say: 'Real armature ma dherai coil hunchan ra harek coil palai palo commutate huncha. Sabai ko torque jodera armature lagatar ra samaan rupma ghumcha.',
      voice: 'रियल आर्मेचरमा धेरै कोइल हुन्छन्, र हरेक कोइल पालैपालो कम्युटेट हुन्छ। सबैको टर्क जोडिएर, आर्मेचर लगातार र समान रूपमा घुम्छ।',
      lines: [['idea', <>Many coils, each commutated in turn → their torques add → steady, continuous rotation</>]],
    },
  ],
  lecturer: [
    {
      say: 'Smaran: field ma current-carrying conductor le F equals B I l force paucha, direction Fleming ko left-hand rule anusar. Aba single coil a a dash ra commutator bata unidirectional torque herau.',
      voice: 'स्मरण — फिल्डमा करेन्ट क्यारिङ कन्डक्टरले, एफ इक्वल्स बी आई एल फोर्स पाउँछ, डाइरेक्सन फ्लेमिङको लेफ्ट ह्यान्ड रुल अनुसार। अब सिंगल कोइल ए ए ड्यास र कम्युटेटरबाट, युनिडाइरेक्सनल टर्क हेरौं।',
      lines: [['h', <>Production of unidirectional torque</>], rem(<>F = BIl; direction by Fleming’s left-hand rule</>)],
    },
    {
      say: 'Figure a ma conductor a N pole ko prabhav kshetra ma cha ra inward current bokcha; a dash S pole ko prabhav kshetra ma outward current bokcha.',
      voice: 'फिगर एमा, कन्डक्टर ए, एन पोलको प्रभाव क्षेत्रमा छ, र इनवार्ड करेन्ट बोक्छ। ए ड्यास, एस पोलको प्रभाव क्षेत्रमा, आउटवार्ड करेन्ट बोक्छ।',
      lines: [['step', <>In Fig. (a), conductor a (N-pole region) carries inward current ⊗ and a′ (S-pole region) outward current ⊙.</>]],
    },
    {
      say: 'Fleming ko left-hand rule anusar a ma force downward ra a dash ma upward huncha. Yi forces le couple banaera anticlockwise torque T a dinchan.',
      voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुल अनुसार, ए मा फोर्स डाउनवार्ड, र ए ड्यासमा अपवार्ड हुन्छ। यी फोर्सले कपल बनाएर, एन्टिक्लकवाइज टर्क टी ए दिन्छन्।',
      lines: [['step', <>By Fleming’s left-hand rule, the force on a is downward and on a′ upward; they form a couple giving an anticlockwise torque T<sub>a</sub>.</>]],
      ask: {
        q: 'Fleming ko left-hand rule ma thumb le k dekhaucha?',
        voice: 'फ्लेमिङको लेफ्ट ह्यान्ड रुलमा, थम्बले के देखाउँछ?',
        options: ['Force (motion) ko direction', 'Field ko direction', 'Current ko direction'],
        answer: 0,
        why: 'First finger field, second finger current, thumb force ra motion.',
      },
    },
    {
      say: 'Commutator nabhaye, 180 degree pachi a S pole ko kshetra ma pugda pani inward current nai bokthyo; force ulto bhayera continuous rotation sambhav hudaina thiyo.',
      voice: 'कम्युटेटर नभए, एक सय असी डिग्रीपछि ए, एस पोलको क्षेत्रमा पुग्दा पनि इनवार्ड करेन्ट नै बोक्थ्यो। फोर्स उल्टो भएर, कन्टिन्युअस रोटेसन सम्भव हुँदैनथ्यो।',
      lines: [br('If there were no commutator', <Pts items={[<>After 180° the force on each conductor would reverse</>, <>The torque would alternate: no continuous rotation</>]} />)],
    },
    {
      say: 'Figure b, 180 degree rotation pachi: commutator ra carbon brush le coil current reverse garchan, ra N pole ko kshetra ko conductor ma inward current nai rahancha. Torque ko direction parivartan hudaina.',
      voice: 'फिगर बी, एक सय असी डिग्री रोटेसनपछि — कम्युटेटर र कार्बन ब्रसले कोइल करेन्ट रिभर्स गर्छन्, र एन पोलको क्षेत्रको कन्डक्टरमा इनवार्ड करेन्ट नै रहन्छ। टर्कको डाइरेक्सन परिवर्तन हुँदैन।',
      lines: [['step', <>Fig. (b), after 180°: the commutator and brushes reverse the coil current, so the conductor in the N-pole region again carries ⊗; the torque keeps its direction.</>]],
    },
    {
      say: 'MNA bhaneko N ra S ko bich ko magnetic neutral axis ho, jaha conductor le flux cut gardaina. Current reversal yahi huncha.',
      voice: 'एम एन ए भनेको, एन र एसको बीचको म्याग्नेटिक न्युट्रल एक्सिस हो, जहाँ कन्डक्टरले फ्लक्स कट गर्दैन। करेन्ट रिभर्सल यहीं हुन्छ।',
      lines: [br('Magnetic Neutral Axis (MNA)', <Pts items={[<>Axis midway between adjacent poles</>, <>No flux is cut there: EMF and force are zero</>, <>Commutation (current reversal) takes place on it</>]} />)],
    },
    {
      say: 'Function of commutator: coil MNA cross garda tesko current reverse garnu; phalswarup torque unidirectional rahancha.',
      voice: 'फङ्सन अफ कम्युटेटर — कोइल एम एन ए क्रस गर्दा, त्यसको करेन्ट रिभर्स गर्नु। फलस्वरूप, टर्क युनिडाइरेक्सनल रहन्छ।',
      lines: [['step', <><H>Function of commutator</H>It reverses the current in each coil as the coil crosses the MNA; hence the torque is unidirectional.</>]],
      ask: {
        q: 'Commutator le coil ko current kun thau ma reverse garcha?',
        voice: 'कम्युटेटरले कोइलको करेन्ट कुन ठाउँमा रिभर्स गर्छ?',
        options: ['MNA ma', 'Pole ko centre ma', 'Brush bata tadha'],
        answer: 0,
        why: 'MNA ma conductor le flux kaatdaina, yasari current reversal tyahi garincha.',
      },
    },
    {
      say: 'Armature ma dherai coil sequence ma commutate hunchan; sabai ko torque jodera steady ra continuous rotation prapta huncha.',
      voice: 'आर्मेचरमा धेरै कोइल सिक्वेन्समा कम्युटेट हुन्छन्। सबैको टर्क जोडिएर, स्टेडी र कन्टिन्युअस रोटेसन प्राप्त हुन्छ।',
      lines: [['idea', <>With many coils commutated in sequence, the torques add to give steady, continuous rotation.</>]],
    },
  ],
});

/* ── 3. Back EMF and its significance ───────────────────────────────── */
// backEmfFigure: 0 circuit · 1 Eb opposes V · 2 Ia, IaRa · 3 load chain ·
// 4 Pm = EbIa · 5 start
export const backEmfS41 = duo('Back EMF and its significance', {
  draw: figAt(backEmfFigure, { 0: 0, 1: 1, 2: 3, 3: 5, 4: 6, 5: 7 }),
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Back EMF bujhna duita law yaad garau. Faraday: flux kaatne conductor ma EMF induce huncha. Lenz: induced EMF le sadhai aafno karan lai oppose garcha.',
      voice: 'ब्याक ई एम एफ बुझ्न, दुईटा ल याद गरौं। फाराडे — फ्लक्स काट्ने कन्डक्टरमा, ई एम एफ इन्ड्युस हुन्छ। लेन्ज — इन्ड्युस्ड ई एम एफले, सधैं आफ्नो कारणलाई अपोज गर्छ।',
      lines: [['h', <>Back EMF and its significance</>], rem(<>Faraday: a conductor cutting flux has an EMF induced in it</>, <>Lenz: the induced EMF opposes its cause</>)],
    },
    {
      say: 'Motor ghumna thalepachi armature ka conductor le pani flux kaatchan, tesaile tinma EMF induce huncha. Lenz ko law anusar yo EMF supply voltage V ko ulto huncha. Yaslai back EMF E b bhanincha.',
      voice: 'मोटर घुम्न थालेपछि, आर्मेचरका कन्डक्टरले पनि फ्लक्स काट्छन्, त्यसैले तिनमा ई एम एफ इन्ड्युस हुन्छ। लेन्जको ल अनुसार, यो ई एम एफ सप्लाई भोल्टेज भीको उल्टो हुन्छ। यसलाई ब्याक ई एम एफ, ई बी भनिन्छ।',
      lines: [['step', <><b>Back EMF E<sub>b</sub>:</b> the EMF induced in the rotating armature, opposing V (Lenz’s law)</>]],
      ask: {
        q: 'Back EMF le supply voltage lai k garcha?',
        voice: 'ब्याक ई एम एफले सप्लाई भोल्टेजलाई के गर्छ?',
        options: ['Oppose garcha', 'Jodcha', 'Kei pani gardaina'],
        answer: 0,
        why: 'Lenz ko law: induced EMF le aafulai banaune karan, arthat supply bata aayeko current, lai oppose garcha.',
      },
    },
    {
      say: 'Yesko magnitude EMF equation le dincha: E b equals P phi Z N over sixty A. Derivation yahi segment ma aghi aaucha; ahile yati yaad rakhau: E b, flux ra speed sanga badhcha.',
      voice: 'यसको म्याग्निच्युड, ई एम एफ इक्वेसनले दिन्छ — ई बी इक्वल्स, पी फाइ जेड एन, ओभर सिक्स्टी ए। डेराइभेसन यही सेगमेन्टमा अघि आउँछ। अहिले यति याद राखौं — ई बी, फ्लक्स र स्पिडसँग बढ्छ।',
      lines: [['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A} \unit{volt}`)], ['note', <>Derived later in this segment; E<sub>b</sub> grows with φ and N</>]],
    },
    {
      say: 'Significance ek: current V le matra chalaudaina. Net voltage V minus E b ho, tesaile I a equals V minus E b, over R a. Back EMF le armature current lai limit garcha.',
      voice: 'सिग्निफिकेन्स एक — करेन्ट भीले मात्र चलाउँदैन। नेट भोल्टेज भी माइनस ई बी हो, त्यसैले आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए। ब्याक ई एम एफले आर्मेचर करेन्टलाई लिमिट गर्छ।',
      lines: [['step', <>(i) Limits the current: <K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K></>, undefined, { carry: <>(i) <K>{String.raw`I_a = (V - E_b)/R_a`}</K></> }]],
    },
    {
      say: 'V minus E b kina? Loop ma V le current agadi dhakelcha, E b le pachadi dhakelcha. Bachi rahane V minus E b le matra R a ma current bagaucha.',
      voice: 'भी माइनस ई बी किन? लुपमा भीले करेन्ट अगाडि धकेल्छ, ई बीले पछाडि धकेल्छ। बाँकी रहने भी माइनस ई बीले मात्र, आर ए मा करेन्ट बगाउँछ।',
      lines: [br('Why V − Eb?', <Pts items={[<>V pushes current forward; E<sub>b</sub> pushes back</>, <>Net push V − E<sub>b</sub> drives I<sub>a</sub> through R<sub>a</sub></>, <>Ohm’s law: I<sub>a</sub> = (V − E<sub>b</sub>) / R<sub>a</sub></>]} />)],
    },
    {
      page: true,
      say: 'Significance dui, self-regulation: load badhyo bhane speed ghatcha, E b ghatcha, I a badhcha, ra badhi torque bancha. Torque load barabar nahunjel yo chalcha.',
      voice: 'सिग्निफिकेन्स दुई, सेल्फ रेगुलेसन — लोड बढ्यो भने स्पिड घट्छ, ई बी घट्छ, आई ए बढ्छ, र बढी टर्क बन्छ। टर्क लोड बराबर नहुन्जेल यो चल्छ।',
      lines: [['step', <>(ii) Self-regulation: load ↑ → N ↓ → E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑ until T<sub>a</sub> = T<sub>L</sub></>, undefined, { carry: <>(ii) self-regulation</> }]],
      ask: {
        q: 'DC motor ma load badhda armature current kina badhcha?',
        voice: 'डी सी मोटरमा लोड बढ्दा, आर्मेचर करेन्ट किन बढ्छ?',
        options: ['Speed ra Eb ghatchan, yasari V − Eb badhcha', 'Supply voltage badhcha', 'Ra badhcha'],
        answer: 0,
        why: 'Ia = (V − Eb)/Ra; Eb ghatda V − Eb badhcha ra Ia badhcha.',
      },
    },
    {
      say: 'Significance tin, energy conversion: E b I a nai mechanical power ma badalincha. P m equals E b I a. Back EMF nai nabhaye kunai pani power convert hudaina.',
      voice: 'सिग्निफिकेन्स तीन, इनर्जी कन्भर्सन — ई बी आई ए नै, मेकानिकल पावरमा बदलिन्छ। पी एम इक्वल्स ई बी आई ए। ब्याक ई एम एफ नै नभए, कुनै पनि पावर कन्भर्ट हुँदैन।',
      lines: [['step', <>(iii) Energy conversion: <K>{String.raw`P_m = E_b\,I_a`}</K></>, undefined, { carry: <>(iii) <K>{String.raw`P_m = E_bI_a`}</K></> }]],
    },
    {
      say: 'Significance char, starting: suru ma N zero huncha, yasari E b pani zero. I a equals V over R a, ra R a sano bhayeko le current dherai thulo. 220 volt ra 0.5 ohm ma 440 ampere! Yesaile starter chahincha.',
      voice: 'सिग्निफिकेन्स चार, स्टार्टिङ — सुरुमा एन जिरो हुन्छ, यसरी ई बी पनि जिरो। आई ए इक्वल्स भी ओभर आर ए, र आर ए सानो भएकोले करेन्ट धेरै ठूलो। दुई सय बीस भोल्ट र जिरो पोइन्ट फाइभ ओममा, चार सय चालीस एम्पियर। यसैले स्टार्टर चाहिन्छ।',
      lines: [['step', <>(iv) Starting: N = 0 → E<sub>b</sub> = 0 → <K>{String.raw`I_a = V/R_a`}</K>, very large (220 V, 0.5 Ω → 440 A) → a starter is needed</>]],
      ask: {
        q: '220 V supply ra Ra = 0.5 Ω bhaye, start ko current kati huncha?',
        voice: 'दुई सय बीस भोल्ट सप्लाई र आर ए जिरो पोइन्ट फाइभ ओम भए, स्टार्टको करेन्ट कति हुन्छ?',
        options: ['440 A', '110 A', '220 A'],
        answer: 0,
        why: 'Start ma Eb = 0, yasari Ia = 220 / 0.5 = 440 A.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Back EMF ko lagi Faraday ra Lenz ko law smaran garau: flux cut garda EMF induce huncha, ra tyo EMF le aafno karan lai oppose garcha.',
      voice: 'ब्याक ई एम एफको लागि, फाराडे र लेन्जको ल स्मरण गरौं — फ्लक्स कट गर्दा ई एम एफ इन्ड्युस हुन्छ, र त्यो ई एम एफले आफ्नो कारणलाई अपोज गर्छ।',
      lines: [['h', <>Back EMF</>], rem(<>Faraday’s law: flux cut → EMF induced</>, <>Lenz’s law: induced EMF opposes its cause</>)],
    },
    {
      say: 'Definition: when the armature of a DC motor rotates, an EMF is induced in it which opposes the applied voltage. This EMF is called back EMF.',
      voice: 'डेफिनेसन — ह्वेन द आर्मेचर अफ अ डी सी मोटर रोटेट्स, एन ई एम एफ इज इन्ड्युस्ड इन इट, ह्विच अपोजेज द एप्लाइड भोल्टेज। दिस ई एम एफ इज कल्ड ब्याक ई एम एफ।',
      lines: [['step', <><i>When the armature of a DC motor rotates, an EMF is induced in it which opposes the applied voltage; this EMF is called the back EMF, E<sub>b</sub>.</i></>]],
      ask: {
        q: 'Back EMF ko direction kun law le dincha?',
        voice: 'ब्याक ई एम एफको डाइरेक्सन कुन लले दिन्छ?',
        options: ["Lenz's law", "Ohm's law", "Coulomb's law"],
        answer: 0,
        why: 'Lenz ko law: induced EMF le tyo EMF banaune karan lai oppose garcha.',
      },
    },
    {
      say: 'Back EMF ko magnitude E b equals P phi Z N over sixty A huncha; yesko derivation yahi segment ma garincha.',
      voice: 'ब्याक ई एम एफको म्याग्निच्युड — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए हुन्छ। यसको डेराइभेसन, यही सेगमेन्टमा गरिन्छ।',
      lines: [['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A} \unit{volt}`)]],
    },
    {
      say: 'Significance one: armature current I a equals V minus E b, over R a; back EMF le current lai seemit garera armature lai short circuit jasto awastha bata bachaucha.',
      voice: 'सिग्निफिकेन्स वान — आर्मेचर करेन्ट, आई ए इक्वल्स, भी माइनस ई बी, ओभर आर ए। ब्याक ई एम एफले करेन्टलाई सीमित गरेर, आर्मेचरलाई सर्ट सर्किट जस्तो अवस्थाबाट बचाउँछ।',
      lines: [['step', <>(i) <K>{String.raw`I_a = \dfrac{V - E_b}{R_a}`}</K>: E<sub>b</sub> limits I<sub>a</sub> and protects the armature from a short-circuit current.</>, undefined, { carry: <>(i) <K>{String.raw`I_a = (V - E_b)/R_a`}</K></> }]],
    },
    {
      say: 'Yo relation armature loop ma KVL bata aaucha: V equals E b plus I a R a.',
      voice: 'यो रिलेसन, आर्मेचर लुपमा के भी एलबाट आउँछ — भी इक्वल्स, ई बी प्लस आई ए आर ए।',
      lines: [br('Where it comes from', <><Pts items={[<>KVL round the armature loop of Fig. 2:</>]} />{tex(String.raw`\begin{aligned} V &= E_b + I_aR_a \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} \end{aligned}`)}</>)],
    },
    {
      page: true,
      say: 'Significance two: load badhda N ra E b ghatchan, I a badhcha ra T a badhcha; motor self-regulating huncha.',
      voice: 'सिग्निफिकेन्स टु — लोड बढ्दा एन र ई बी घट्छन्, आई ए बढ्छ, र टी ए बढ्छ। मोटर सेल्फ रेगुलेटिङ हुन्छ।',
      lines: [['step', <>(ii) Load ↑ → N, E<sub>b</sub> ↓ → I<sub>a</sub> ↑ → T<sub>a</sub> ↑: the motor is self-regulating.</>, undefined, { carry: <>(ii) self-regulation</> }]],
      ask: {
        q: 'Back EMF le DC motor lai self-regulating kasari banaucha?',
        voice: 'ब्याक ई एम एफले डी सी मोटरलाई सेल्फ रेगुलेटिङ कसरी बनाउँछ?',
        options: ['Load badhda Eb ghatera Ia ra torque badhcha', 'Load badhda V badhcha', 'Load badhda flux zero huncha'],
        answer: 0,
        why: 'N ghatda Eb ghatcha, Ia = (V − Eb)/Ra badhcha, Ta ∝ φIa badhcha.',
      },
    },
    {
      say: 'Significance three: E b I a nai gross mechanical power ho, arthat P m equals E b I a.',
      voice: 'सिग्निफिकेन्स थ्री — ई बी आई ए नै ग्रस मेकानिकल पावर हो, अर्थात पी एम इक्वल्स ई बी आई ए।',
      lines: [['step', <>(iii) The power converted is <K>{String.raw`P_m = E_b\,I_a`}</K>.</>, undefined, { carry: <>(iii) <K>{String.raw`P_m = E_bI_a`}</K></> }]],
    },
    {
      say: 'Significance four: starting ma N zero hune bhayeko le E b zero, ra I a equals V over R a dherai thulo huncha, jastai 220 volt ra 0.5 ohm ma 440 ampere. Hence a starter is necessary.',
      voice: 'सिग्निफिकेन्स फोर — स्टार्टिङमा एन जिरो हुने भएकोले ई बी जिरो, र आई ए इक्वल्स भी ओभर आर ए, धेरै ठूलो हुन्छ — जस्तै दुई सय बीस भोल्ट र जिरो पोइन्ट फाइभ ओममा, चार सय चालीस एम्पियर। हेन्स अ स्टार्टर इज नेसेसरी।',
      lines: [['step', <>(iv) At starting E<sub>b</sub> = 0, so <K>{String.raw`I_a = V/R_a`}</K> is very large (220 V, 0.5 Ω → 440 A); hence a starter is necessary.</>]],
      ask: {
        q: 'Start ma DC motor le kina dherai current lincha?',
        voice: 'स्टार्टमा डी सी मोटरले किन धेरै करेन्ट लिन्छ?',
        options: ['Eb zero huncha ra Ra sano huncha', 'Flux zero huncha', 'Supply voltage badhcha'],
        answer: 0,
        why: 'N = 0 bhayeko le Eb = 0; Ia = V/Ra, ra Ra sano bhayeko le current thulo.',
      },
    },
  ],
});

/* ── 4. Derivation: EMF equation ────────────────────────────────────── */
// torqueFigure: 0 poles + armature · 1 field lines
export const emfS41 = duo('Derivation: EMF equation (back EMF)', {
  draw: figAt(torqueFigure, { 0: 0, 1: 2 }),
  viewBox: '0 0 360 276',
  tutor: [
    {
      say: 'EMF equation ko lagi duita kura yaad garau. Faraday ko law: EMF equals cut bhayeko flux, bhag time, arthat d Phi over d t. Ra N rpm bhaneko euta minute ma kati revolution.',
      voice: 'ई एम एफ इक्वेसनको लागि, दुईटा कुरा याद गरौं। फाराडेको ल — ई एम एफ, इक्वल्स कट भएको फ्लक्स, भाग टाइम — अर्थात डी फाइ ओभर डी टी। र एन आर पी एम भनेको, एक मिनेटमा कति रिभोलुसन।',
      lines: [['h', <>Derivation: EMF equation</>], rem(<>Faraday’s law: <K>{String.raw`e = \dfrac{d\Phi}{dt}`}</K> (flux cut ÷ time)</>, <>N rpm = N revolutions in one minute (60 s)</>)],
    },
    {
      say: 'Symbols maanau: P poles ko sankhya, phi euta pole ko flux weber ma, Z armature ka jamma conductor, A parallel path, ra N speed rpm ma. Yi symbols har video ma yahi artha ma aauchan.',
      voice: 'सिम्बोल्स मानौं — पी पोल्सको सङ्ख्या, फाइ एउटा पोलको फ्लक्स वेबरमा, जेड आर्मेचरका जम्मा कन्डक्टर, ए प्यारालल पाथ, र एन स्पिड आर पी एममा। यी सिम्बोल्स हरेक भिडियोमा यही अर्थमा आउँछन्।',
      lines: [['step', <Let items={[<>P = poles</>, <>φ = flux per pole (Wb)</>, <>Z = armature conductors</>, <>A = parallel paths</>, <>N = speed (rpm)</>]} />, undefined, { carry: <>P, φ, Z, A, N as defined</> }]],
    },
    {
      say: 'Pahilo kadam: euta revolution ma euta conductor le kati flux kaatcha? d Phi equals P phi weber.',
      voice: 'पहिलो कदम — एउटा रिभोलुसनमा एउटा कन्डक्टरले कति फ्लक्स काट्छ? डी फाइ इक्वल्स, पी फाइ वेबर।',
      lines: [['step', step('Flux cut by one conductor in one revolution', String.raw`\textcolor{${C.BL}}{d\Phi} = P\phi \unit{weber}`), undefined, { carry: <><K>{String.raw`d\Phi = P\phi`}</K></> }]],
    },
    {
      say: 'P phi kina? Euta revolution ma conductor le har pole lai ek choti paar garcha. Harek pole bata phi flux aaucha, tesaile P pole ko jamma P phi. Jastai char pole bhaye char phi.',
      voice: 'पी फाइ किन? एउटा रिभोलुसनमा कन्डक्टरले हरेक पोललाई एकचोटि पार गर्छ। हरेक पोलबाट फाइ फ्लक्स आउँछ, त्यसैले पी पोलको जम्मा पी फाइ। जस्तै, चार पोल भए चार फाइ।',
      lines: [br('Why Pφ?', <Pts items={[<>In one revolution a conductor passes every pole once</>, <>Each pole gives flux φ</>, <>P poles → flux cut = P × φ (4 poles → 4φ)</>]} />)],
    },
    {
      say: 'Dosro kadam: euta revolution lai kati time lagcha? d t equals sixty over N second.',
      voice: 'दोस्रो कदम — एउटा रिभोलुसनलाई कति टाइम लाग्छ? डी टी इक्वल्स, सिक्स्टी ओभर एन सेकेन्ड।',
      lines: [['step', step('Time for one revolution', String.raw`\textcolor{${C.VI}}{dt} = \dfrac{60}{N} \unit{second}`), undefined, { carry: <><K>{String.raw`dt = 60/N`}</K></> }]],
    },
    {
      say: 'Sixty over N kina? N rpm ko artha sixty second ma N revolution. Tesaile euta revolution ma sixty over N second. Jastai 1200 rpm ma sixty over 1200, arthat 0.05 second.',
      voice: 'सिक्स्टी ओभर एन किन? एन आर पी एमको अर्थ, साठी सेकेन्डमा एन रिभोलुसन। त्यसैले एउटा रिभोलुसनमा, सिक्स्टी ओभर एन सेकेन्ड। जस्तै, बाह्र सय आर पी एममा, साठी भाग बाह्र सय — अर्थात जिरो पोइन्ट जिरो फाइभ सेकेन्ड।',
      lines: [br('Why 60/N?', <><Pts items={[<>N revolutions take 60 s</>, <>1 revolution takes 60 ÷ N s</>]} />{tex(String.raw`\begin{aligned} N &= 1200\ \text{rpm} \\ dt &= \tfrac{60}{1200} \\ &= 0.05\ \text{s} \end{aligned}`)}</>)],
    },
    {
      page: true,
      say: 'Aba Faraday ko law: e equals d Phi over d t. d Phi ma P phi ra d t ma sixty over N rakhda e equals P phi N over sixty volt: euta conductor ko average EMF.',
      voice: 'अब फाराडेको ल — ई इक्वल्स डी फाइ ओभर डी टी। डी फाइमा पी फाइ, र डी टीमा सिक्स्टी ओभर एन राख्दा, ई इक्वल्स पी फाइ एन ओभर सिक्स्टी भोल्ट — एउटा कन्डक्टरको एभरेज ई एम एफ।',
      lines: [['step', step('EMF per conductor (Faraday)', String.raw`\begin{aligned} e &= \dfrac{${X(String.raw`d\Phi`, C.BL)}}{${X('dt', C.VI)}} \\ &= \dfrac{${R(String.raw`P\phi`, C.BL, 1)}}{${R('60/N', C.VI, 2)}} \\ &= \dfrac{P\phi N}{60} \unit{volt} \end{aligned}`), undefined, { carry: <><K>{String.raw`e = P\phi N/60`}</K></> }]],
    },
    {
      say: 'Machine ko EMF euta path ko EMF ho. Z conductor A parallel path ma bandiyeka chan, arthat euta path ma Z over A conductor series ma. Series ma EMF jodincha; sabai path ko voltage eutai.',
      voice: 'मेसिनको ई एम एफ, एउटा पाथको ई एम एफ हो। जेड कन्डक्टर, ए प्यारालल पाथमा बाँडिएका छन् — अर्थात एउटा पाथमा जेड ओभर ए कन्डक्टर सिरिजमा। सिरिजमा ई एम एफ जोडिन्छ, सबै पाथको भोल्टेज एउटै।',
      lines: [br('Why multiply by Z/A?', <Pts items={[<>Z conductors are shared among A parallel paths</>, <>Each path: Z/A conductors in series → their EMFs add</>, <>Parallel paths have the same EMF = machine EMF</>, <>Lap: A = P · Wave: A = 2</>]} />)],
    },
    {
      say: 'E b equals e times Z over A. e rakhda E b equals P phi Z N over sixty A volt. Motor ma yahi EMF back EMF ho.',
      voice: 'ई बी इक्वल्स, ई टाइम्स जेड ओभर ए। ई राख्दा, ई बी इक्वल्स पी फाइ जेड एन, ओभर सिक्स्टी ए भोल्ट। मोटरमा यही ई एम एफ, ब्याक ई एम एफ हो।',
      lines: [['step', step('EMF of the machine = EMF of one path', String.raw`\begin{aligned} E_b &= ${X('e', C.GR)} \times \dfrac{Z}{A} \\ &= ${R(String.raw`\dfrac{P\phi N}{60}`, C.GR, 1)} \cdot \dfrac{Z}{A} \end{aligned}`)], ['eq', tex(String.raw`E_b = \dfrac{P\phi Z N}{60A} \unit{volt}`)]],
    },
    {
      say: 'Euta machine ma P, Z ra A fixed hunchan. Yasari k equals P Z over sixty A rakhda E b equals k phi N. Back EMF flux ra speed dubai sanga proportional cha.',
      voice: 'एउटा मेसिनमा पी, जेड र ए फिक्स्ड हुन्छन्। यसरी के इक्वल्स पी जेड ओभर सिक्स्टी ए राख्दा, ई बी इक्वल्स के फाइ एन। ब्याक ई एम एफ, फ्लक्स र स्पिड दुवैसँग प्रोपोर्सनल छ।',
      lines: [['step', step('Given machine: k = PZ/60A', String.raw`\begin{aligned} E_b &= k\,\phi N \\ E_b &\propto \phi N \end{aligned}`)]],
      ask: {
        tag: 'Quick check',
        q: 'Flux same rakhera motor ko speed aadha garyo. Back EMF kati huncha?',
        voice: 'फ्लक्स उही राखेर, मोटरको स्पिड आधा गर्‍यो। ब्याक ई एम एफ कति हुन्छ?',
        options: ['Aadha huncha', 'Same rahancha', 'Dui guna huncha'],
        answer: 0,
        why: 'Eb = kφN. φ same ra N aadha bhaye Eb pani aadha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'EMF equation ko lagi Faraday ko law ra rpm ko artha smaran garau.',
      voice: 'ई एम एफ इक्वेसनको लागि, फाराडेको ल र आर पी एमको अर्थ स्मरण गरौं।',
      lines: [['h', <>EMF equation of a DC machine</>], rem(<>Faraday’s law: <K>{String.raw`e = \dfrac{d\Phi}{dt}`}</K></>, <>N rpm: N revolutions per 60 s</>)],
    },
    {
      say: 'Let: P number of poles, phi flux per pole weber ma, Z total armature conductors, A number of parallel paths, ra N speed rpm ma.',
      voice: 'लेट — पी नम्बर अफ पोल्स, फाइ फ्लक्स पर पोल वेबरमा, जेड टोटल आर्मेचर कन्डक्टर्स, ए नम्बर अफ प्यारालल पाथ्स, र एन स्पिड आर पी एममा।',
      lines: [['step', <Let items={[<>P = number of poles</>, <>φ = flux per pole (Wb)</>, <>Z = total armature conductors</>, <>A = number of parallel paths</>, <>N = speed (rpm)</>]} />, undefined, { carry: <>P, φ, Z, A, N as defined</> }]],
    },
    {
      say: 'Euta revolution ma euta conductor le cut garne flux d Phi equals P phi weber, equation ek.',
      voice: 'एउटा रिभोलुसनमा, एउटा कन्डक्टरले कट गर्ने फ्लक्स — डी फाइ इक्वल्स पी फाइ वेबर, इक्वेसन वान।',
      lines: [['step', <>Flux cut by one conductor in one revolution,{tex(String.raw`d\Phi = P\phi \unit{weber} \qquad \cdots(1)`)}</>, undefined, { carry: <><K>{String.raw`d\Phi = P\phi \quad (1)`}</K></> }]],
    },
    {
      say: 'Kina bhane euta revolution ma conductor P ota pole bata pass huncha, ra har pole le phi flux dincha.',
      voice: 'किनभने एउटा रिभोलुसनमा, कन्डक्टर पी ओटा पोलबाट पास हुन्छ, र हरेक पोलले फाइ फ्लक्स दिन्छ।',
      lines: [br('Why Pφ?', <Pts items={[<>One revolution: the conductor passes all P poles</>, <>Each pole contributes φ → total Pφ</>]} />)],
    },
    {
      say: 'Euta revolution ko time d t equals sixty over N second, equation dui.',
      voice: 'एउटा रिभोलुसनको टाइम — डी टी इक्वल्स सिक्स्टी ओभर एन सेकेन्ड, इक्वेसन टु।',
      lines: [['step', <>Time taken for one revolution,{tex(String.raw`dt = \dfrac{60}{N} \unit{second} \qquad \cdots(2)`)}</>, undefined, { carry: <><K>{String.raw`dt = 60/N \quad (2)`}</K></> }]],
    },
    {
      say: 'N revolution lai sixty second lagcha, yasari euta revolution lai sixty over N second; 1200 rpm ma 0.05 second.',
      voice: 'एन रिभोलुसनलाई साठी सेकेन्ड लाग्छ, यसरी एउटा रिभोलुसनलाई सिक्स्टी ओभर एन सेकेन्ड — बाह्र सय आर पी एममा, जिरो पोइन्ट जिरो फाइभ सेकेन्ड।',
      lines: [br('Why 60/N?', <><Pts items={[<>N revolutions ↔ 60 s</>, <>1 revolution ↔ 60/N s</>]} />{tex(String.raw`\begin{aligned} N &= 1200\ \text{rpm} \\ dt &= 0.05\ \text{s} \end{aligned}`)}</>)],
    },
    {
      page: true,
      say: 'Faraday ko law anusar EMF per conductor e equals d Phi over d t; equation ek ra dui rakhda e equals P phi N over sixty volt, equation tin.',
      voice: 'फाराडेको ल अनुसार, ई एम एफ पर कन्डक्टर — ई इक्वल्स डी फाइ ओभर डी टी। इक्वेसन वान र टु राख्दा, ई इक्वल्स पी फाइ एन ओभर सिक्स्टी भोल्ट, इक्वेसन थ्री।',
      lines: [['step', <>By Faraday’s law, EMF per conductor, using (1) and (2),{tex(String.raw`\begin{aligned} e &= \dfrac{d\Phi}{dt} && \\ &= \dfrac{P\phi N}{60} \unit{volt} && \cdots(3) \end{aligned}`)}</>, undefined, { carry: <><K>{String.raw`e = P\phi N/60 \quad (3)`}</K></> }]],
    },
    {
      say: 'Z conductors A parallel path ma bandiyeka chan; euta path ma Z over A conductor series ma hunchan, ra machine ko EMF euta path ko EMF ho. Lap ma A equals P, wave ma A equals 2.',
      voice: 'जेड कन्डक्टर्स, ए प्यारालल पाथमा बाँडिएका छन्। एउटा पाथमा जेड ओभर ए कन्डक्टर सिरिजमा हुन्छन्, र मेसिनको ई एम एफ एउटा पाथको ई एम एफ हो। ल्यापमा ए इक्वल्स पी, वेभमा ए इक्वल्स टु।',
      lines: [br('Conductors per path', <Pts items={[<>Z/A conductors in series in each path</>, <>Machine EMF = EMF of one path</>, <>Lap winding A = P; wave winding A = 2</>]} />)],
    },
    {
      say: 'Yasari E b equals e times Z over A, arthat P phi Z N over sixty A volt, equation char.',
      voice: 'यसरी, ई बी इक्वल्स ई टाइम्स जेड ओभर ए — अर्थात पी फाइ जेड एन, ओभर सिक्स्टी ए भोल्ट, इक्वेसन फोर।',
      lines: [['step', <>EMF per path = e × Z/A, from (3):{tex(String.raw`\therefore\ \boxed{E_b = \dfrac{P\phi Z N}{60A} \unit{volt}} \qquad \cdots(4)`)}</>]],
    },
    {
      say: 'Given machine ma P, Z ra A constant; yasari E b equals k phi N, arthat E b phi N sanga proportional. Hence proved.',
      voice: 'गिभन मेसिनमा पी, जेड र ए कन्स्टेन्ट। यसरी ई बी इक्वल्स के फाइ एन — अर्थात ई बी, फाइ एनसँग प्रोपोर्सनल। हेन्स प्रुभ्ड।',
      lines: [['step', <>For a given machine, <K>{String.raw`E_b = k\phi N`}</K>, i.e. <K>{String.raw`E_b \propto \phi N`}</K>. <b>Hence proved.</b></>]],
      ask: {
        tag: 'Quick check',
        q: 'Lap-wound machine ma parallel path A kati huncha?',
        voice: 'ल्याप वाउन्ड मेसिनमा, प्यारालल पाथ ए कति हुन्छ?',
        options: ['A = P', 'A = 2', 'A = Z'],
        answer: 0,
        why: 'Lap winding ma parallel path poles barabar (A = P); wave ma sadhai 2.',
      },
    },
  ],
});

/* ── 5. Derivation: voltage and power equation ──────────────────────── */
export const voltageS41 = duo('Derivation: voltage and power equation', {
  draw: figAt(backEmfFigure, { 0: 0, 1: 1, 2: 1, 4: 5 }),
  viewBox: '0 0 360 222',
  tutor: [
    {
      say: 'Yaad garau: E b equals P phi Z N over sixty A, ra KVL anusar kunai bandh loop ma voltage ko rise ra drop barabar hunchan.',
      voice: 'याद गरौं — ई बी इक्वल्स, पी फाइ जेड एन ओभर सिक्स्टी ए। र के भी एल अनुसार, कुनै बन्द लुपमा भोल्टेजको राइज र ड्रप बराबर हुन्छन्।',
      lines: [['h', <>Derivation: voltage and power equation</>], rem(<K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K>, <>KVL: in a closed loop, rises = drops</>)],
    },
    {
      say: 'Armature circuit ma supply V lagaieko cha. Armature ma back EMF E b V ko ulto cha, ra current I a le R a ma I a R a drop dincha.',
      voice: 'आर्मेचर सर्किटमा सप्लाई भी लगाइएको छ। आर्मेचरमा ब्याक ई एम एफ ई बी, भीको उल्टो छ, र करेन्ट आई एले आर ए मा, आई ए आर ए ड्रप दिन्छ।',
      lines: [['step', <>Armature circuit: supply V, back EMF E<sub>b</sub> against V, drop I<sub>a</sub>R<sub>a</sub></>]],
    },
    {
      say: 'Loop ma KVL lagau: V ek matra rise ho; drop chai R a ma I a R a ra E b. Tesaile V equals E b plus I a R a.',
      voice: 'लुपमा के भी एल लगाऔं — भी एक मात्र राइज हो, ड्रप चाहिं आर ए मा आई ए आर ए, र ई बी। त्यसैले भी इक्वल्स, ई बी प्लस आई ए आर ए।',
      lines: [br('KVL round the armature loop', <><Pts items={[<>Rise: V (supply)</>, <>Drops: I<sub>a</sub>R<sub>a</sub> and E<sub>b</sub></>]} />{tex(String.raw`V - I_aR_a - E_b = 0`)}</>)],
    },
    {
      say: 'Voltage equation V equals E b plus I a R a. Yasbata I a equals V minus E b, over R a.',
      voice: 'भोल्टेज इक्वेसन, भी इक्वल्स ई बी प्लस आई ए आर ए। यसबाट, आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।',
      lines: [['eq', tex(String.raw`V = E_b + I_aR_a`)], ['step', step('Armature current', String.raw`I_a = \dfrac{V - E_b}{R_a}`), undefined, { carry: <><K>{String.raw`V = E_b + I_aR_a`}</K></> }]],
    },
    {
      say: 'Power equation ko lagi dubai side lai I a le multiply garau: V I a equals E b I a plus I a squared R a.',
      voice: 'पावर इक्वेसनको लागि, दुवै साइडलाई आई एले मल्टिप्लाई गरौं — भी आई ए इक्वल्स, ई बी आई ए प्लस, आई ए स्क्वायर आर ए।',
      lines: [['step', step('Multiply by Ia', String.raw`\begin{aligned} V I_a &= ${X('E_bI_a', C.GR)} + I_a^2R_a \end{aligned}`)]],
    },
    {
      say: 'Har term ko artha: V I a armature ko input power, I a squared R a armature copper loss, ra bachi rahane E b I a mechanical power ma badalincha. P m equals E b I a.',
      voice: 'हरेक टर्मको अर्थ — भी आई ए आर्मेचरको इनपुट पावर, आई ए स्क्वायर आर ए आर्मेचर कपर लस, र बाँकी रहने ई बी आई ए, मेकानिकल पावरमा बदलिन्छ। पी एम इक्वल्स ई बी आई ए।',
      lines: [['step', <><Pts items={[<>VI<sub>a</sub>: input to the armature</>, <>I<sub>a</sub>²R<sub>a</sub>: armature copper loss</>, <>E<sub>b</sub>I<sub>a</sub>: power converted (gross mechanical power)</>]} /></>], ['eq', tex(String.raw`P_m = E_b\,I_a \unit{watt}`)]],
      ask: {
        q: 'DC motor ma gross mechanical power kun ho?',
        voice: 'डी सी मोटरमा ग्रस मेकानिकल पावर कुन हो?',
        options: ['Eb Ia', 'V Ia', 'Ia² Ra'],
        answer: 0,
        why: 'V Ia input, Ia² Ra copper loss, bachi rahane Eb Ia mechanical power.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: E b equals P phi Z N over sixty A, ra Kirchhoff ko voltage law.',
      voice: 'स्मरण — ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, र किर्चफको भोल्टेज ल।',
      lines: [['h', <>Voltage and power equation of a DC motor</>], rem(<K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K>, <>KVL round a closed loop</>)],
    },
    {
      say: 'Figure ma armature circuit cha: applied voltage V, back EMF E b, ra armature resistance R a.',
      voice: 'फिगरमा आर्मेचर सर्किट छ — एप्लाइड भोल्टेज भी, ब्याक ई एम एफ ई बी, र आर्मेचर रेजिस्टेन्स आर ए।',
      lines: [['step', <>Consider the armature circuit (Fig. 2): applied voltage V, back EMF E<sub>b</sub>, armature resistance R<sub>a</sub>.</>]],
    },
    {
      say: 'Applied voltage le back EMF ra armature resistance drop dubai lai overcome garnu parcha.',
      voice: 'एप्लाइड भोल्टेजले, ब्याक ई एम एफ र आर्मेचर रेजिस्टेन्स ड्रप, दुवैलाई ओभरकम गर्नुपर्छ।',
      lines: [br('KVL', <>{tex(String.raw`V - I_aR_a - E_b = 0`)}<Pts items={[<>V must overcome E<sub>b</sub> and the drop I<sub>a</sub>R<sub>a</sub></>]} /></>)],
    },
    {
      say: 'Voltage equation: V equals E b plus I a R a, equation ek; ra I a equals V minus E b, over R a.',
      voice: 'भोल्टेज इक्वेसन — भी इक्वल्स ई बी प्लस आई ए आर ए, इक्वेसन वान। र आई ए इक्वल्स भी माइनस ई बी, ओभर आर ए।',
      lines: [['step', tex(String.raw`\begin{aligned} V &= E_b + I_aR_a && \cdots(1) \\ \therefore\ I_a &= \dfrac{V - E_b}{R_a} && \cdots(2) \end{aligned}`), undefined, { carry: <><K>{String.raw`V = E_b + I_aR_a \quad (1)`}</K></> }]],
    },
    {
      say: 'Equation ek lai I a le multiply garda V I a equals E b I a plus I a squared R a, equation tin.',
      voice: 'इक्वेसन वानलाई आई एले मल्टिप्लाई गर्दा, भी आई ए इक्वल्स ई बी आई ए प्लस आई ए स्क्वायर आर ए, इक्वेसन थ्री।',
      lines: [['step', <>Multiplying (1) by I<sub>a</sub>,{tex(String.raw`VI_a = E_bI_a + I_a^2R_a \qquad \cdots(3)`)}</>]],
    },
    {
      say: 'Equation tin ma V I a input, I a squared R a armature copper loss, ra E b I a gross mechanical power P m ho.',
      voice: 'इक्वेसन थ्रीमा भी आई ए इनपुट, आई ए स्क्वायर आर ए आर्मेचर कपर लस, र ई बी आई ए ग्रस मेकानिकल पावर पी एम हो।',
      lines: [['step', <>where VI<sub>a</sub> = input, I<sub>a</sub>²R<sub>a</sub> = armature copper loss,{tex(String.raw`\therefore\ \boxed{P_m = E_bI_a \unit{watt}} \qquad \cdots(4)`)}</>]],
      ask: {
        q: 'V Ia = Eb Ia + Ia² Ra ma Ia² Ra le k janauncha?',
        voice: 'भी आई ए इक्वल्स ई बी आई ए प्लस आई ए स्क्वायर आर एमा, आई ए स्क्वायर आर एले के जनाउँछ?',
        options: ['Armature copper loss', 'Mechanical power', 'Input power'],
        answer: 0,
        why: 'Ia² Ra armature resistance ma heat bhayera janey copper loss ho.',
      },
    },
  ],
});

/* ── 6. Derivation: torque equation (force method) ──────────────────── */
// torqueFigure: 0 poles + armature · 1 field · 2 conductors + forces ·
// 3 MNA + Ta arc · 4 one conductor Ic, F · 5 radius r, τ = Fr
export const torqueForceS41 = duo('Derivation: torque equation (force method)', {
  draw: figAt(torqueFigure, { 0: 0, 1: 1, 2: 1, 4: 2, 5: 7, 3: 7 }),
  viewBox: '0 0 360 276',
  tutor: [
    {
      say: 'Torque equation ko lagi duita kura yaad garau: field ma conductor ko force F equals B I l, ra torque bhaneko force times radius, tau equals F r.',
      voice: 'टर्क इक्वेसनको लागि, दुईटा कुरा याद गरौं — फिल्डमा कन्डक्टरको फोर्स, एफ इक्वल्स बी आई एल। र टर्क भनेको फोर्स टाइम्स रेडियस — टाउ इक्वल्स एफ आर।',
      lines: [['h', <>Derivation: torque equation (force method)</>], rem(<K>{String.raw`F = B\,I\,l`}</K>, <>Torque = force × radius: <K>{String.raw`\tau = F\,r`}</K></>)],
    },
    {
      say: 'Symbols: P, phi, Z ra A aghi jastai. Thap ma I a armature current, r armature ko radius, ra l conductor ko active length.',
      voice: 'सिम्बोल्स — पी, फाइ, जेड र ए अघि जस्तै। थपमा, आई ए आर्मेचर करेन्ट, आर आर्मेचरको रेडियस, र एल कन्डक्टरको एक्टिभ लेन्थ।',
      lines: [['step', <Let items={[<>P, φ, Z, A as before</>, <>I<sub>a</sub> = armature current</>, <>r = armature radius</>, <>l = active length</>]} />, undefined, { carry: <>P, φ, Z, A, I<sub>a</sub>, r, l</> }]],
    },
    {
      say: 'Pahilo kadam: euta conductor ma current I c equals I a over A.',
      voice: 'पहिलो कदम — एउटा कन्डक्टरमा करेन्ट, आई सी इक्वल्स आई ए ओभर ए।',
      lines: [['step', step('Current in one conductor', String.raw`\textcolor{${C.OR}}{I_c} = \dfrac{I_a}{A}`), undefined, { carry: <><K>{String.raw`I_c = I_a/A`}</K></> }]],
    },
    {
      say: 'I a over A kina? Brush bata pasne I a armature ka A ota parallel path ma barabar bandincha. Harek path ra tyasko harek conductor ma I a over A bagcha.',
      voice: 'आई ए ओभर ए किन? ब्रसबाट पस्ने आई ए, आर्मेचरका ए ओटा प्यारालल पाथमा बराबर बाँडिन्छ। हरेक पाथ, र त्यसको हरेक कन्डक्टरमा, आई ए ओभर ए बग्छ।',
      lines: [br('Why Ia/A?', <Pts items={[<>I<sub>a</sub> enters at the brush</>, <>It divides equally among the A parallel paths</>, <>Every conductor of a path carries I<sub>a</sub>/A</>]} />)],
    },
    {
      say: 'Dosro kadam: armature ko surface ma flux density B equals P phi over two pi r l.',
      voice: 'दोस्रो कदम — आर्मेचरको सर्फेसमा फ्लक्स डेन्सिटी, बी इक्वल्स पी फाइ, ओभर टु पाइ आर एल।',
      lines: [['step', step('Flux density at the armature surface', String.raw`\textcolor{${C.BL}}{B} = \dfrac{P\phi}{2\pi r\,l}`), undefined, { carry: <><K>{String.raw`B = P\phi/2\pi r l`}</K></> }]],
    },
    {
      say: 'Two pi r l kina? Sabai pole ko jamma flux P phi armature ko cylinder surface bata pasch. Tyo surface ko area circumference two pi r times length l ho. Flux density bhaneko flux bhag area.',
      voice: 'टु पाइ आर एल किन? सबै पोलको जम्मा फ्लक्स पी फाइ, आर्मेचरको सिलिन्डर सर्फेसबाट पस्छ। त्यो सर्फेसको एरिया, सर्कमफरेन्स टु पाइ आर, टाइम्स लेन्थ एल हो। फ्लक्स डेन्सिटी भनेको, फ्लक्स भाग एरिया।',
      lines: [br('Why 2πrl?', <><Pts items={[<>Total flux of all poles: Pφ</>, <>It enters the armature’s curved surface</>, <>Area = circumference × length = 2πr × l</>]} />{tex(String.raw`\begin{aligned} B &= \dfrac{\text{flux}}{\text{area}} \\ &= \dfrac{P\phi}{2\pi r l} \end{aligned}`)}</>)],
    },
    {
      page: true,
      say: 'Tesro kadam: F equals B I c l ma B ra I c rakhau. l cancel huncha, ra F equals P phi I a over two pi r A.',
      voice: 'तेस्रो कदम — एफ इक्वल्स बी आई सी एलमा, बी र आई सी राखौं। एल क्यान्सल हुन्छ, र एफ इक्वल्स पी फाइ आई ए, ओभर टु पाइ आर ए।',
      lines: [['step', step('Force on one conductor', String.raw`\begin{aligned} F &= ${X('B', C.BL)}\;${X('I_c', C.OR)}\;l \\ &= ${R(String.raw`\dfrac{P\phi}{2\pi r \cancel{l}}`, C.BL, 1)} \cdot ${R(String.raw`\dfrac{I_a}{A}`, C.OR, 2)} \cdot \cancel{l} \\ &= \dfrac{P\phi I_a}{2\pi r A} \end{aligned}`), undefined, { carry: <><K>{String.raw`F = P\phi I_a/2\pi r A`}</K></> }]],
    },
    {
      say: 'Euta conductor ko torque tau equals F r. Z conductor ko jamma torque T a equals Z F r. F rakhda r pani cancel huncha: T a equals P phi Z I a over two pi A.',
      voice: 'एउटा कन्डक्टरको टर्क, टाउ इक्वल्स एफ आर। जेड कन्डक्टरको जम्मा टर्क, टी ए इक्वल्स जेड एफ आर। एफ राख्दा आर पनि क्यान्सल हुन्छ — टी ए इक्वल्स, पी फाइ जेड आई ए, ओभर टु पाइ ए।',
      lines: [['step', step('Torque of Z conductors', String.raw`\begin{aligned} T_a &= Z\,${X('F', C.GR)}\,r \\ &= Z\cdot ${R(String.raw`\dfrac{P\phi I_a}{2\pi \cancel{r} A}`, C.GR, 1)} \cdot \cancel{r} \\ &= \dfrac{P\phi Z I_a}{2\pi A} \end{aligned}`)]],
    },
    {
      say: 'One over two pi 0.159 huncha. Tesaile T a equals 0.159 phi Z I a, P over A, newton metre.',
      voice: 'वान ओभर टु पाइ, जिरो पोइन्ट वान फाइभ नाइन हुन्छ। त्यसैले टी ए इक्वल्स, जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए — न्युटन मिटर।',
      lines: [['eq', tex(String.raw`T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right) \unit{newton-metre}`)]],
    },
    {
      say: 'Euta machine ma P, Z ra A fixed. Tesaile torque flux ra armature current ma bhar parcha: T a phi I a sanga proportional. IOE ma sodhine factors pani yahi hun.',
      voice: 'एउटा मेसिनमा पी, जेड र ए फिक्स्ड। त्यसैले टर्क, फ्लक्स र आर्मेचर करेन्टमा भर पर्छ — टी ए, फाइ आई एसँग प्रोपोर्सनल। आई ओ ईमा सोधिने फ्याक्टर्स पनि यही हुन्।',
      lines: [['step', step('Factors affecting torque (given machine)', String.raw`T_a \propto \phi\, I_a`)]],
      ask: {
        tag: 'Quick check',
        q: 'Flux same rakhera armature current dui guna garda torque kati huncha?',
        voice: 'फ्लक्स उही राखेर, आर्मेचर करेन्ट दुई गुना गर्दा, टर्क कति हुन्छ?',
        options: ['Dui guna', 'Same', 'Char guna'],
        answer: 0,
        why: 'Ta ∝ φ Ia; φ same bhaye Ta Ia sanga badhcha.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Torque equation ko lagi smaran: F equals B I l ra tau equals F r.',
      voice: 'टर्क इक्वेसनको लागि स्मरण — एफ इक्वल्स बी आई एल, र टाउ इक्वल्स एफ आर।',
      lines: [['h', <>Torque equation of a DC motor</>], rem(<K>{String.raw`F = B\,I\,l`}</K>, <K>{String.raw`\tau = F\,r`}</K>)],
    },
    {
      say: 'Let: P poles, phi flux per pole, Z conductors, A parallel paths, I a armature current, r armature radius, ra l active length.',
      voice: 'लेट — पी पोल्स, फाइ फ्लक्स पर पोल, जेड कन्डक्टर्स, ए प्यारालल पाथ्स, आई ए आर्मेचर करेन्ट, आर आर्मेचर रेडियस, र एल एक्टिभ लेन्थ।',
      lines: [['step', <Let items={[<>P = poles</>, <>φ = flux/pole (Wb)</>, <>Z = conductors</>, <>A = parallel paths</>, <>I<sub>a</sub> = armature current (A)</>, <>r = radius (m)</>, <>l = active length (m)</>]} />, undefined, { carry: <>P, φ, Z, A, I<sub>a</sub>, r, l</> }]],
    },
    {
      say: 'Current per conductor I c equals I a over A, equation ek.',
      voice: 'करेन्ट पर कन्डक्टर — आई सी इक्वल्स आई ए ओभर ए, इक्वेसन वान।',
      lines: [['step', tex(String.raw`I_c = \dfrac{I_a}{A} \qquad \cdots(1)`), undefined, { carry: <><K>{String.raw`I_c = I_a/A \quad (1)`}</K></> }]],
    },
    {
      say: 'Kina bhane armature current A ota parallel path ma barabar bandincha.',
      voice: 'किनभने आर्मेचर करेन्ट, ए ओटा प्यारालल पाथमा बराबर बाँडिन्छ।',
      lines: [br('Why Ia/A?', <Pts items={[<>I<sub>a</sub> divides equally among A parallel paths</>]} />)],
    },
    {
      say: 'Average flux density B equals P phi over two pi r l, equation dui.',
      voice: 'एभरेज फ्लक्स डेन्सिटी — बी इक्वल्स पी फाइ, ओभर टु पाइ आर एल, इक्वेसन टु।',
      lines: [['step', tex(String.raw`B = \dfrac{P\phi}{2\pi r\,l} \qquad \cdots(2)`), undefined, { carry: <><K>{String.raw`B = P\phi/2\pi r l \quad (2)`}</K></> }]],
    },
    {
      say: 'Kina bhane jamma flux P phi armature ko curved surface area two pi r l ma failincha.',
      voice: 'किनभने जम्मा फ्लक्स पी फाइ, आर्मेचरको कर्भ्ड सर्फेस एरिया, टु पाइ आर एलमा फैलिन्छ।',
      lines: [br('Why 2πrl?', <Pts items={[<>Total flux Pφ spreads over the curved surface</>, <>Area = 2πr × l</>]} />)],
    },
    {
      page: true,
      say: 'Force per conductor F equals B I c l; equation ek ra dui rakhda F equals P phi I a over two pi r A, equation tin.',
      voice: 'फोर्स पर कन्डक्टर — एफ इक्वल्स बी आई सी एल। इक्वेसन वान र टु राख्दा, एफ इक्वल्स पी फाइ आई ए, ओभर टु पाइ आर ए, इक्वेसन थ्री।',
      lines: [['step', <>Force on each conductor, from (1) and (2),{tex(String.raw`\begin{aligned} F &= B\,I_c\,l && \\ &= \dfrac{P\phi I_a}{2\pi r A} && \cdots(3) \end{aligned}`)}</>, undefined, { carry: <><K>{String.raw`F = P\phi I_a/2\pi r A \quad (3)`}</K></> }]],
    },
    {
      say: 'Total torque T a equals Z F r; equation tin rakhda T a equals P phi Z I a over two pi A.',
      voice: 'टोटल टर्क — टी ए इक्वल्स जेड एफ आर। इक्वेसन थ्री राख्दा, टी ए इक्वल्स पी फाइ जेड आई ए, ओभर टु पाइ ए।',
      lines: [['step', <>Total torque,{tex(String.raw`\begin{aligned} T_a &= Z\,F\,r && \\ &= \dfrac{P\phi Z I_a}{2\pi A} && \cdots(4) \end{aligned}`)}</>]],
    },
    {
      say: 'One over two pi equals 0.159; yasari T a equals 0.159 phi Z I a, P over A newton metre, equation panch.',
      voice: 'वान ओभर टु पाइ इक्वल्स जिरो पोइन्ट वान फाइभ नाइन। यसरी टी ए इक्वल्स, जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए न्युटन मिटर, इक्वेसन फाइभ।',
      lines: [['step', tex(String.raw`\therefore\ \boxed{T_a = 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right) \unit{newton-metre}} \qquad \cdots(5)`)]],
    },
    {
      say: 'Given machine ma P, Z ra A constant, yasari T a phi I a sanga proportional. Torque lai flux ra armature current le prabhavit garchan.',
      voice: 'गिभन मेसिनमा पी, जेड र ए कन्स्टेन्ट। यसरी टी ए, फाइ आई एसँग प्रोपोर्सनल। टर्कलाई फ्लक्स र आर्मेचर करेन्टले प्रभावित गर्छन्।',
      lines: [['step', <>For a given machine, <K>{String.raw`T_a \propto \phi\, I_a`}</K>: the torque depends on the flux and the armature current.</>]],
      ask: {
        q: 'Given DC motor ko torque kun kura sanga proportional huncha?',
        voice: 'गिभन डी सी मोटरको टर्क, कुन कुरासँग प्रोपोर्सनल हुन्छ?',
        options: ['φ Ia', 'N Ia', 'V / Ra'],
        answer: 0,
        why: 'Ta = 0.159 φ Z Ia (P/A); P, Z, A constant bhaye Ta ∝ φ Ia.',
      },
    },
  ],
});

/* ── 7. Derivation: torque equation (power method, as in the notes) ─── */
// torqueFigure: 0 poles + armature · 5 radius r · 3 Ta arc
export const torquePowerS41 = duo('Derivation: torque equation (power method)', {
  draw: figAt(torqueFigure, { 0: 0, 5: 1, 3: 4 }),
  viewBox: '0 0 360 276',
  tutor: [
    {
      say: 'Aghillo videos bata yaad garau: E b equals P phi Z N over sixty A, power converted P m equals E b I a, ra euta revolution lai sixty over N second lagcha.',
      voice: 'अघिल्ला भिडियोबाट याद गरौं — ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, पावर कन्भर्टेड पी एम इक्वल्स ई बी आई ए, र एउटा रिभोलुसनलाई सिक्स्टी ओभर एन सेकेन्ड लाग्छ।',
      lines: [['h', <>Derivation: torque equation (power method)</>], rem(<K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K>, <K>{String.raw`P_m = E_b\,I_a`}</K>, <>One revolution takes 60/N s</>)],
    },
    {
      say: 'Maanau armature ma radius r ma force F lagcha, ra torque T a equals F r.',
      voice: 'मानौं आर्मेचरमा, रेडियस आरमा फोर्स एफ लाग्छ, र टर्क टी ए इक्वल्स एफ आर।',
      lines: [['step', step('Torque developed', String.raw`T_a = F\,r`)]],
    },
    {
      say: 'Euta revolution ma gareko work equals F times two pi r, arthat T a times two pi joule.',
      voice: 'एउटा रिभोलुसनमा गरेको वर्क — इक्वल्स एफ टाइम्स टु पाइ आर, अर्थात टी ए टाइम्स टु पाइ जुल।',
      lines: [['step', step('Work done in one revolution', String.raw`\begin{aligned} \text{Work} &= F \times 2\pi r \\ &= T_a \cdot 2\pi \unit{joule} \end{aligned}`), undefined, { carry: <>Work per revolution = <K>{String.raw`2\pi T_a`}</K></> }]],
    },
    {
      say: 'Kina F times two pi r? Work equals force times distance. Euta revolution ma force lagne bindu le circumference two pi r jati baato hidcha. Ra F r nai T a ho.',
      voice: 'किन एफ टाइम्स टु पाइ आर? वर्क इक्वल्स फोर्स टाइम्स डिस्टेन्स। एउटा रिभोलुसनमा, फोर्स लाग्ने बिन्दुले सर्कमफरेन्स, टु पाइ आर जति बाटो हिँड्छ। र एफ आर नै टी ए हो।',
      lines: [br('Why F × 2πr?', <Pts items={[<>Work = force × distance moved</>, <>One revolution: the point moves the circumference 2πr</>, <>F × 2πr = (F r) × 2π = T<sub>a</sub> × 2π</>]} />)],
    },
    {
      say: 'Power bhaneko work bhag time. Time sixty over N rakhda power equals two pi N T a over sixty watt.',
      voice: 'पावर भनेको वर्क भाग टाइम। टाइम सिक्स्टी ओभर एन राख्दा, पावर इक्वल्स, टु पाइ एन टी ए ओभर सिक्स्टी वाट।',
      lines: [['step', step('Power developed = work ÷ time', String.raw`\begin{aligned} P_m &= \dfrac{2\pi T_a}{${X('60/N', C.VI)}} \\ &= \dfrac{2\pi N T_a}{60} \unit{watt} \end{aligned}`), undefined, { carry: <><K>{String.raw`P_m = 2\pi N T_a/60`}</K></> }]],
    },
    {
      page: true,
      say: 'Yo mechanical power electrical side ko E b I a barabar huncha. Tesaile T a equals sixty E b I a over two pi N, arthat 9.55 E b I a over N.',
      voice: 'यो मेकानिकल पावर, इलेक्ट्रिकल साइडको ई बी आई ए बराबर हुन्छ। त्यसैले टी ए इक्वल्स, सिक्स्टी ई बी आई ए ओभर टु पाइ एन — अर्थात नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन।',
      lines: [['step', step('Equate with EbIa', String.raw`\begin{aligned} \dfrac{2\pi N T_a}{60} &= E_b I_a \\ T_a &= \dfrac{60}{2\pi}\cdot\dfrac{E_bI_a}{N} \end{aligned}`)], ['eq', tex(String.raw`T_a = 9.55\,\dfrac{E_bI_a}{N} \unit{newton-metre}`)]],
    },
    {
      say: '9.55 kaha bata? Sixty bhag two pi, arthat 9.549, round garda 9.55.',
      voice: 'नाइन पोइन्ट फाइभ फाइभ कहाँबाट? साठी भाग टु पाइ, अर्थात नाइन पोइन्ट फाइभ फोर नाइन, राउन्ड गर्दा नाइन पोइन्ट फाइभ फाइभ।',
      lines: [br('Where does 9.55 come from?', tex(String.raw`\begin{aligned} \dfrac{60}{2\pi} &= 9.549 \\ &\approx 9.55 \end{aligned}`))],
    },
    {
      say: 'Aba E b ko equation halau. N ra sixty cancel hunchan: T a equals P phi Z I a over two pi A, arthat 0.159 phi Z I a, P over A. Force method kai result!',
      voice: 'अब ई बीको इक्वेसन हालौं। एन र सिक्स्टी क्यान्सल हुन्छन् — टी ए इक्वल्स पी फाइ जेड आई ए, ओभर टु पाइ ए, अर्थात जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए। फोर्स मेथडकै रिजल्ट।',
      lines: [['step', step('Put Eb = PφZN/60A', String.raw`\begin{aligned} T_a &= \dfrac{60}{2\pi N}\cdot ${X('E_b', C.BL)}\cdot I_a \\ &= \dfrac{\cancel{60}}{2\pi \cancel{N}}\cdot ${R(String.raw`\dfrac{P\phi Z\cancel{N}}{\cancel{60}A}`, C.BL, 1)}\cdot I_a \\ &= 0.159\,\phi Z I_a \left(\dfrac{P}{A}\right) \end{aligned}`)]],
    },
    {
      say: 'Shaft ma pugne torque T sh, T a bhanda alik kam huncha, kinaki iron ra friction loss le kehi torque kharcha garcha. T sh equals 9.55 times output over N.',
      voice: 'साफ्टमा पुग्ने टर्क टी एस एच, टी ए भन्दा अलि कम हुन्छ, किनकि आइरन र फ्रिक्सन लसले केही टर्क खर्च गर्छ। टी एस एच इक्वल्स, नाइन पोइन्ट फाइभ फाइभ टाइम्स आउटपुट ओभर एन।',
      lines: [['step', step('Shaft torque (useful)', String.raw`\begin{aligned} T_{sh} &= 9.55\,\dfrac{\text{output}}{N} \\ T_{sh} &< T_a \end{aligned}`)], ['note', <>T<sub>a</sub> − T<sub>sh</sub> = lost torque (iron and friction losses)</>]],
      ask: {
        q: 'Shaft torque Tsh armature torque Ta bhanda kina sano huncha?',
        voice: 'साफ्ट टर्क टी एस एच, आर्मेचर टर्क टी ए भन्दा किन सानो हुन्छ?',
        options: ['Iron ra friction loss le kehi torque kharcha garcha', 'Copper loss le torque badhaucha', 'Flux zero huncha'],
        answer: 0,
        why: 'Ta ko kehi bhag iron ra mechanical loss ma janchha; bachi rahane Tsh ho.',
      },
    },
  ],
  lecturer: [
    {
      say: 'Smaran: E b equals P phi Z N over sixty A, P m equals E b I a, ra euta revolution ko time sixty over N second.',
      voice: 'स्मरण — ई बी इक्वल्स पी फाइ जेड एन ओभर सिक्स्टी ए, पी एम इक्वल्स ई बी आई ए, र एउटा रिभोलुसनको टाइम सिक्स्टी ओभर एन सेकेन्ड।',
      lines: [['h', <>Torque equation (power method)</>], rem(<K>{String.raw`E_b = \dfrac{P\phi Z N}{60A}`}</K>, <K>{String.raw`P_m = E_bI_a`}</K>, <>Time of one revolution = 60/N s</>)],
    },
    {
      say: 'Let T a armature le develop gareko torque, jaha force F radius r ma lagcha.',
      voice: 'लेट, टी ए आर्मेचरले डेभलप गरेको टर्क, जहाँ फोर्स एफ रेडियस आरमा लाग्छ।',
      lines: [['step', <>Let T<sub>a</sub> be the torque developed by the armature, with force F at radius r:{tex(String.raw`T_a = F\,r \qquad \cdots(1)`)}</>]],
    },
    {
      say: 'Euta complete revolution ma gareko work F times two pi r, arthat T a times two pi, equation dui.',
      voice: 'एउटा कम्प्लिट रिभोलुसनमा गरेको वर्क, एफ टाइम्स टु पाइ आर — अर्थात टी ए टाइम्स टु पाइ, इक्वेसन टु।',
      lines: [['step', <>Work done in one complete revolution,{tex(String.raw`\begin{aligned} \text{Work} &= F\times 2\pi r && \\ &= 2\pi T_a \unit{joule} && \cdots(2) \end{aligned}`)}</>, undefined, { carry: <>Work per rev. = <K>{String.raw`2\pi T_a \quad (2)`}</K></> }]],
    },
    {
      say: 'Kina bhane euta revolution ma force ko bindu circumference two pi r jati sarcha.',
      voice: 'किनभने एउटा रिभोलुसनमा, फोर्सको बिन्दु सर्कमफरेन्स टु पाइ आर जति सर्छ।',
      lines: [br('Why F × 2πr?', <Pts items={[<>Work = force × distance</>, <>Distance in one revolution = 2πr</>]} />)],
    },
    {
      say: 'Power developed equals rate of doing work; time sixty over N le bhag garda two pi N T a over sixty watt, equation tin.',
      voice: 'पावर डेभलप्ड इक्वल्स रेट अफ डुइङ वर्क — टाइम सिक्स्टी ओभर एनले भाग गर्दा, टु पाइ एन टी ए ओभर सिक्स्टी वाट, इक्वेसन थ्री।',
      lines: [['step', <>Power developed = rate of doing work,{tex(String.raw`\begin{aligned} P_m &= \dfrac{2\pi T_a}{60/N} && \\ &= \dfrac{2\pi N T_a}{60} && \cdots(3) \end{aligned}`)}</>, undefined, { carry: <><K>{String.raw`P_m = 2\pi N T_a/60 \quad (3)`}</K></> }]],
    },
    {
      page: true,
      say: 'Electrical power converted E b I a sanga equation tin barabar garda T a equals 9.55 E b I a over N.',
      voice: 'इलेक्ट्रिकल पावर कन्भर्टेड ई बी आई एसँग इक्वेसन थ्री बराबर गर्दा, टी ए इक्वल्स नाइन पोइन्ट फाइभ फाइभ, ई बी आई ए ओभर एन।',
      lines: [['step', <>But P<sub>m</sub> = E<sub>b</sub>I<sub>a</sub>; from (3),{tex(String.raw`\begin{aligned} \dfrac{2\pi N T_a}{60} &= E_bI_a && \\ T_a &= 9.55\,\dfrac{E_bI_a}{N} \unit{newton-metre} && \cdots(4) \end{aligned}`)}</>]],
    },
    {
      say: 'Equation char ko 9.55 bhaneko sixty over two pi ho.',
      voice: 'इक्वेसन फोरको नाइन पोइन्ट फाइभ फाइभ भनेको, सिक्स्टी ओभर टु पाइ हो।',
      lines: [br('9.55', tex(String.raw`\begin{aligned} \dfrac{60}{2\pi} &= 9.549 \\ &\approx 9.55 \end{aligned}`))],
    },
    {
      say: 'E b ko maan rakhda T a equals 0.159 phi Z I a, P over A, jun force method ko result sanga milcha.',
      voice: 'ई बीको मान राख्दा, टी ए इक्वल्स जिरो पोइन्ट वान फाइभ नाइन, फाइ जेड आई ए, पी ओभर ए — जुन फोर्स मेथडको रिजल्टसँग मिल्छ।',
      lines: [['step', <>Substituting E<sub>b</sub> = PφZN/60A in (4),{tex(String.raw`\therefore\ \boxed{T_a = 0.159\,\phi Z I_a\left(\dfrac{P}{A}\right) \unit{newton-metre}}`)}</>]],
    },
    {
      say: 'Shaft torque T sh equals 9.55 output over N, ra iron tatha friction loss ko karan T sh T a bhanda sano huncha.',
      voice: 'साफ्ट टर्क — टी एस एच इक्वल्स, नाइन पोइन्ट फाइभ फाइभ, आउटपुट ओभर एन। र आइरन तथा फ्रिक्सन लसको कारण, टी एस एच, टी ए भन्दा सानो हुन्छ।',
      lines: [['step', <>Shaft torque <K>{String.raw`T_{sh} = 9.55\,\dfrac{\text{output}}{N}`}</K>; <K>{String.raw`T_{sh} < T_a`}</K> owing to iron and friction losses (lost torque).</>]],
      ask: {
        q: 'Ta = 9.55 Eb Ia / N ma 9.55 kaha bata aaucha?',
        voice: 'टी ए इक्वल्स नाइन पोइन्ट फाइभ फाइभ ई बी आई ए ओभर एनमा, नाइन पोइन्ट फाइभ फाइभ कहाँबाट आउँछ?',
        options: ['60 / 2π', '2π / 60', '1 / 2π'],
        answer: 0,
        why: '2πNTa/60 = EbIa bata Ta = (60/2π)(EbIa/N) = 9.55 EbIa/N.',
      },
    },
  ],
});
