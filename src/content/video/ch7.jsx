import { C, Coil, Resistor, hook, model, video } from './kit.jsx';

/* Chapter 7 · Starting: 3-point & 4-point starters (Syllabus Unit 4: Starting of DC motors). */

const whyStarter = video('DC motor lai starter kina chahincha?', {
  beats: [
    { say: 'DC motor lai starter kina chahincha? Armature current hera.', voice: 'डीसी मोटरलाई स्टार्टर किन चाहिन्छ? आर्मेचर करेन्ट हेर।' },
    { say: 'Armature current bhaneko supply voltage minus back EMF, divide by armature resistance.', voice: 'आर्मेचर करेन्ट भनेको सप्लाई भोल्टेज माइनस ब्याक ई एम एफ, डिभाइड बाई आर्मेचर रेजिस्टेन्स।' },
    { say: 'Start garne instant ma armature ruki rakheko huncha, so N zero ani back EMF pani zero. Current V over R a huncha.', voice: 'स्टार्ट गर्ने इन्स्ट्यान्टमा आर्मेचर रोकिराखेको हुन्छ, सो एन जिरो अनि ब्याक ई एम एफ पनि जिरो। करेन्ट भी ओभर आर ए हुन्छ।' },
    {
      say: 'Real number le try garau.',
      voice: 'रियल नम्बरले ट्राई गरौं।',
      ask: {
        tag: 'IOE 2079 Jestha · 2068 Magh · 2066 Magh',
        q: 'DC motor le starting ma kina thulo current tancha? 220 V motor ko Ra = 0.5 Ω cha. Directly switch on garyo bhane kati current bagcha?',
        voice: 'डीसी मोटरले स्टार्टिङमा किन ठूलो करेन्ट तान्छ? टु ट्वेन्टी भोल्ट मोटरको आर ए जिरो पोइन्ट फाइभ ओम छ। डाइरेक्ट्ली स्विच अन गर्यो भने कति करेन्ट बग्छ?',
        options: ['440 A', '20 A', '110 A', '0.5 A'],
        answer: 0,
        why: 'Eb = 0 huda, Ia = V/Ra = 220/0.5 = 440 A.',
      },
    },
    { say: 'Four hundred forty ampere bhaneko twenty ampere ko full-load current ko lagbhag twenty-two guna ho.', voice: 'फोर हन्ड्रेड फोर्टी एम्पियर भनेको ट्वेन्टी एम्पियरको फुल लोड करेन्टको लगभग ट्वेन्टी टु गुणा हो।' },
    { say: 'Yesle commutator ra brush jalaucha, winding overheat garcha, shaft lai jhatka dincha, ani aru sabai ko lagi supply voltage tala jharcha.', voice: 'यसले कम्युटेटर र ब्रस जलाउँछ, वाइन्डिङ ओभरहिट गर्छ, शाफ्टलाई झट्का दिन्छ, अनि अरू सबैको लागि सप्लाई भोल्टेज तल झार्छ।' },
    { say: 'Starter le start ma armature sanga series ma resistance R thapcha. Ani starting current V over R a plus R huncha, so R equals V over allowed current, minus R a.', voice: 'स्टार्टरले स्टार्टमा आर्मेचरसँग सिरिजमा रेजिस्टेन्स आर थप्छ। अनि स्टार्टिङ करेन्ट भी ओभर आर ए प्लस आर हुन्छ, सो आर इक्वल्स भी ओभर अलाउड करेन्ट, माइनस आर ए।' },
    {
      say: 'Aba starter size garau.',
      voice: 'अब स्टार्टर साइज गरौं।',
      ask: {
        tag: 'Quick check',
        q: '220 V motor ko Ra = 0.4 Ω ra full-load current 25 A cha. Starting current lai full load ko double ma limit gara. Starter resistance kati?',
        voice: 'टु ट्वेन्टी भोल्ट मोटरको आर ए जिरो पोइन्ट फोर ओम र फुल लोड करेन्ट ट्वेन्टी फाइभ एम्पियर छ। स्टार्टिङ करेन्टलाई फुल लोडको डबलमा लिमिट गर। स्टार्टर रेजिस्टेन्स कति?',
        options: ['4 Ω', '4.4 Ω', '8.8 Ω', '0.4 Ω'],
        answer: 0,
        why: 'Ist = 50 A, so total resistance 220/50 = 4.4 Ω. Starter le 4.4 − 0.4 = 4 Ω thapcha.',
      },
    },
    { say: 'Motor ko speed badhdai jada back EMF badhcha ani aafai current limit garcha, so resistance step by step cut out garincha.', voice: 'मोटरको स्पिड बढ्दै जाँदा ब्याक ई एम एफ बढ्छ अनि आफैं करेन्ट लिमिट गर्छ, सो रेजिस्टेन्स स्टेप बाई स्टेप कट आउट गरिन्छ।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>Starter kina?</> },
    { at: 1, kind: 'eq', node: <>Ia = (V − Eb) / Ra</> },
    { at: 2, kind: 'step', node: <>Start ma: N = 0 → Eb = 0 → <span className="y">Ia = V / Ra</span></> },
    { at: 4, kind: 'step', node: <>220 / 0.5 = 440 A ≈ <span className="r">22 × rated 20 A</span></> },
    { at: 5, kind: 'step', node: <>→ commutator ra brush ma sparking · winding overheat · torque jerk · supply dip</> },
    { at: 6, kind: 'eq', node: <>Ist = V / (Ra + R) ⟹ R = V / Ist − Ra</> },
    { at: 8, kind: 'note', node: <>Eb ∝ N speed sangai badhcha, so R lai stud by stud cut out garincha.</> },
  ],
});

/* 3-point starter schematic: pivot at (180,175), handle 110 long, angles in degrees from vertical. */
const PIVOT = { x: 180, y: 175 };
const STUDS = [-50, -30, -10, 10, 30];
const RUN = 50;
const pt = (deg, r = 110) => ({ x: PIVOT.x + r * Math.sin((deg * Math.PI) / 180), y: PIVOT.y - r * Math.cos((deg * Math.PI) / 180) });
const HANDLE = [-70, -70, -50, -50, -10, RUN, RUN, -70, -70];

function arc(r, a1, a2) {
  const p1 = pt(a1, r);
  const p2 = pt(a2, r);
  return `M${p1.x} ${p1.y} A${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
}

const threePoint = video('3-point starter', {
  viewBox: '0 0 360 220',
  tall: true,
  beats: [
    { say: 'Yo 3-point starter ho, naam yesko teen ota terminal bata aako: L bhaneko line, F bhaneko field, A bhaneko armature.', voice: 'यो थ्री पोइन्ट स्टार्टर हो, नाम यसको तीनओटा टर्मिनल बाट आएको: एल भनेको लाइन, एफ भनेको फिल्ड, ए भनेको आर्मेचर।' },
    { say: 'Line current L bata chirchha, overload release coil hudai handle samma pugcha.', voice: 'लाइन करेन्ट एल बाट छिर्छ, ओभरलोड रिलिज कोइल हुँदै ह्यान्डल सम्म पुग्छ।' },
    { say: 'Handle lai stud one ma lag. Aba sabai starting resistance armature sanga series ma cha, ani field le brass arc hudai full voltage paucha.', voice: 'ह्यान्डललाई स्टड वानमा लैजाऊ। अब सबै स्टार्टिङ रेजिस्टेन्स आर्मेचरसँग सिरिजमा छ, अनि फिल्डले ब्रास आर्क हुँदै फुल भोल्टेज पाउँछ।' },
    {
      say: 'Yaha ekchoti pause.',
      voice: 'यहाँ एकचोटि पज।',
      ask: {
        q: 'Start garda field full strength ma kina hunu parcha?',
        voice: 'स्टार्ट गर्दा फिल्ड फुल स्ट्रेन्थमा किन हुनु पर्छ?',
        options: ['Ampere pichhe maximum torque ko lagi, so motor chado start huncha', 'Speed zero mai rakhna', 'Starting resistance tatauna'],
        answer: 0,
        why: 'Ta ∝ φIa. Full φ huda, limited starting current le pani baliyo starting torque dincha.',
      },
    },
    { say: 'Motor ko speed badhdai jada back EMF badhcha ani current ghatcha. Ani arko stud ma sara, resistance ko euta section cut out hudai.', voice: 'मोटरको स्पिड बढ्दै जाँदा ब्याक ई एम एफ बढ्छ अनि करेन्ट घट्छ। अनि अर्को स्टडमा सार, रेजिस्टेन्सको एउटा सेक्सन कट आउट हुँदै।' },
    { say: 'Stud by stud, sabai resistance cut out huncha. RUN ma, soft-iron handle lai no-volt coil le samaucha, jun field sanga series ma cha.', voice: 'स्टड बाई स्टड, सबै रेजिस्टेन्स कट आउट हुन्छ। रन मा, सफ्ट आइरन ह्यान्डललाई नो भोल्ट कोइलले समाउँछ, जुन फिल्डसँग सिरिजमा छ।' },
    {
      say: 'Aba achanak supply fail bhayo.',
      voice: 'अब अचानक सप्लाई फेल भयो।',
      ask: {
        q: 'Motor chaldai garda supply fail bhayo. Handle le k garcha?',
        voice: 'मोटर चल्दै गर्दा सप्लाई फेल भयो। ह्यान्डलले के गर्छ?',
        options: ['Spring le OFF ma pharkancha', 'RUN mai bascha', 'Stud 1 samma matra pharkancha'],
        answer: 0,
        why: 'NVC ko magnetism jancha ani spring le handle lai OFF ma tancha. Power pharkada motor resistance bina restart huna sakdaina.',
      },
    },
    { say: 'Sahi ho. No-volt coil le chodcha ani spring le handle lai ghar, OFF ma pharkaucha. Open field circuit le pani yahi garcha, so motor field bina kahile pani run away garna sakdaina.', voice: 'सही हो। नो भोल्ट कोइलले छोड्छ अनि स्प्रिङले ह्यान्डललाई घर, अफमा फर्काउँछ। ओपन फिल्ड सर्किटले पनि यही गर्छ, सो मोटर फिल्ड बिना कहिले पनि रन अवे गर्न सक्दैन।' },
    { say: 'Overload huda, overload release le aafno iron piece uthaucha ani no-volt coil lai short-circuit garcha. Handle feri OFF ma release huncha.', voice: 'ओभरलोड हुँदा, ओभरलोड रिलिजले आफ्नो आइरन पिस उठाउँछ अनि नो भोल्ट कोइललाई सर्ट सर्किट गर्छ। ह्यान्डल फेरि अफमा रिलिज हुन्छ।' },
  ],
  draw: (s) => {
    const deg = HANDLE[s.beat];
    const nvc = pt(RUN + 9, 118);
    return (
      <>
        <g className={s.on(0)}>
          {/* resistance between studs */}
          {STUDS.slice(0, -1).map((a, i) => {
            const p1 = pt(a);
            const p2 = pt(STUDS[i + 1]);
            return <line key={a} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={C.orange} strokeWidth={2} strokeDasharray="3 3" />;
          })}
          {STUDS.map((a, i) => {
            const p = pt(a);
            return (
              <g key={a}>
                <circle cx={p.x} cy={p.y} r={6} fill={C.board} stroke={C.chalk} strokeWidth={2} />
                <text x={pt(a, 128).x} y={pt(a, 128).y + 4} textAnchor="middle" fontSize={10} fill={C.dim}>{i + 1}</text>
              </g>
            );
          })}
          <text x={pt(-72, 128).x - 6} y={pt(-72, 128).y} textAnchor="end" fontSize={11} fill={C.dim}>OFF</text>
          <text x={pt(RUN, 128).x - 4} y={pt(RUN, 128).y - 6} fontSize={11} fill={C.dim}>RUN</text>
          <text x={180} y={56} textAnchor="middle" fontSize={11} fill={C.orange}>starting resistance</text>
          {/* terminals */}
          {[['L', 30], ['F', 180], ['A', 330]].map(([t, x]) => (
            <g key={t}>
              <circle cx={x} cy={208} r={8} fill={C.board} stroke={C.yellow} strokeWidth={2} />
              <text x={x} y={212} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.yellow}>{t}</text>
            </g>
          ))}
          {/* last stud → A */}
          <path d={`M${pt(30).x + 6} ${pt(30).y} L330 ${pt(30).y} L330 200`} fill="none" stroke={C.dim} strokeWidth={1.6} />
          <text x={334} y={150} fontSize={10} fill={C.dim}>armature tira</text>
        </g>
        {/* line path: L → OLR → pivot */}
        <g className={s.on(1) + s.hl(1) + s.hl(8)}>
          <path d={`M30 200 L30 175 L110 175`} fill="none" stroke={C.dim} strokeWidth={1.6} />
          <Coil x={110} y={175} len={44} turns={4} color={C.red} />
          <line x1={154} y1={175} x2={PIVOT.x} y2={PIVOT.y} stroke={C.dim} strokeWidth={1.6} />
          <text x={132} y={196} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.red}>OLR</text>
        </g>
        {/* brass arc → NVC → F */}
        <g className={s.on(2) + s.hl(2)}>
          <path d={arc(88, -50, RUN)} fill="none" stroke={C.orange} strokeWidth={4} strokeLinecap="round" />
          <text x={180} y={102} textAnchor="middle" fontSize={10.5} fill={C.orange}>brass arc</text>
          <path d={`M${pt(-50, 88).x} ${pt(-50, 88).y} L${pt(-50, 88).x} 150 L180 150 L180 200`} fill="none" stroke={C.orange} strokeWidth={1.4} strokeDasharray="4 3" opacity={0.7} />
        </g>
        <g className={s.on(5) + s.hl(5) + s.hl(7)}>
          <rect x={nvc.x - 4} y={nvc.y - 12} width={30} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={nvc.x + 11} y={nvc.y + 4} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
          <text x={nvc.x + 11} y={nvc.y + 26} textAnchor="middle" fontSize={9} fill={C.dim}>field sanga series ma</text>
        </g>
        {/* handle */}
        <g style={{ transform: `rotate(${deg}deg)`, transformOrigin: `${PIVOT.x}px ${PIVOT.y}px`, transformBox: 'view-box', transition: 'transform 1.1s ease' }}>
          <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y - 112} stroke={C.chalk} strokeWidth={5} strokeLinecap="round" />
          <circle cx={PIVOT.x} cy={PIVOT.y - 112} r={6} fill={C.yellow} />
        </g>
        <circle cx={PIVOT.x} cy={PIVOT.y} r={7} fill={C.chalk} />
        <text x={16} y={22} fontSize={12} fontWeight={700} fill={s.at(7) ? C.red : C.dim} className={s.on(7)}>supply fail → spring → OFF</text>
        <text x={16} y={22} fontSize={12} fontWeight={700} fill={C.red} className={s.on(8)}>overload → OLR le NVC short garcha → OFF</text>
      </>
    );
  },
});

const fourPoint = video('4-point starter', {
  viewBox: '0 0 360 220',
  beats: [
    { say: '3-point starter ko euta kamjori cha. Speed badhauna field control use garda k huncha, hera.', voice: 'थ्री पोइन्ट स्टार्टरको एउटा कमजोरी छ। स्पिड बढाउन फिल्ड कन्ट्रोल युज गर्दा के हुन्छ, हेर।' },
    { say: 'Speed badhauna field circuit ma rheostat thapchau, jasle field current ghataucha.', voice: 'स्पिड बढाउन फिल्ड सर्किटमा रियोस्ट्याट थप्छौं, जसले फिल्ड करेन्ट घटाउँछ।' },
    {
      say: 'No-volt coil ko barema socha ta.',
      voice: 'नो भोल्ट कोइलको बारेमा सोच त।',
      ask: {
        q: '3-point starter ma NVC field sanga series ma huncha. Field current dherai ghatayo bhane k huncha?',
        voice: 'थ्री पोइन्ट स्टार्टरमा एन भी सी फिल्डसँग सिरिजमा हुन्छ। फिल्ड करेन्ट धेरै घटायो भने के हुन्छ?',
        options: ['NVC kamjor huncha ani handle chodna sakcha, motor rokincha', 'NVC jhan baliyo huncha', 'Kehi farak pardaina'],
        answer: 0,
        why: 'Field current kam bhaneko NVC current pani kam. Timilai speed matra badhaunu thiyo, tara handle OFF ma khasna sakcha.',
      },
    },
    { say: 'So 3-point starter field weakening bata wide speed control ko lagi suitable chaina.', voice: 'सो थ्री पोइन्ट स्टार्टर फिल्ड विकनिङ बाट वाइड स्पिड कन्ट्रोलको लागि सुटेबल छैन।' },
    { say: '4-point starter le yo fix garcha. No-volt coil lai field circuit bata nikalera, protective resistance hudai sidhai supply ko across jodincha.', voice: 'फोर पोइन्ट स्टार्टरले यो फिक्स गर्छ। नो भोल्ट कोइललाई फिल्ड सर्किट बाट निकालेर, प्रोटेक्टिभ रेजिस्टेन्स हुँदै सिधै सप्लाईको एक्रस जोडिन्छ।' },
    { say: 'Tyo extra supply connection nai fourth terminal ho. Aba field rheostat le no-volt coil lai ekdam affect gardaina.', voice: 'त्यो एक्स्ट्रा सप्लाई कनेक्सन नै फोर्थ टर्मिनल हो। अब फिल्ड रियोस्ट्याटले नो भोल्ट कोइललाई एकदमै अफेक्ट गर्दैन।' },
    {
      say: 'Aafai check gara.',
      voice: 'आफैं चेक गर।',
      ask: {
        tag: 'Quick check',
        q: '3-point starter bhanda 4-point starter ko main advantage yo ho ki…',
        voice: 'थ्री पोइन्ट स्टार्टर भन्दा फोर पोइन्ट स्टार्टरको मेन एड्भान्टेज यो हो कि…',
        options: ['speed control ko lagi field current change garda NVC lai affect gardaina', 'yeslai starting resistance chahindaina', 'yo brake ko rup ma pani kaam garcha'],
        answer: 0,
        why: 'NVC supply ko across cha, field bata independent, so field-weakening speed control safe huncha.',
      },
    },
    { say: 'Tara catch yo ho: field circuit open bhayo bhane pani no-volt coil le handle samaai rakhcha, so 4-point starter le open-field protection dinna.', voice: 'तर क्याच यो हो: फिल्ड सर्किट ओपन भयो भने पनि नो भोल्ट कोइलले ह्यान्डल समाइ राख्छ, सो फोर पोइन्ट स्टार्टरले ओपन फिल्ड प्रोटेक्सन दिँदैन।' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0)}>
        <text x={90} y={22} textAnchor="middle" fontSize={14} fontWeight={800}>3-point</text>
        <line x1={20} y1={40} x2={160} y2={40} stroke={C.chalk} strokeWidth={2} />
        <text x={14} y={44} textAnchor="end" fontSize={11} fill={C.dim}>+</text>
        <line x1={20} y1={190} x2={160} y2={190} stroke={C.chalk} strokeWidth={2} />
        <text x={14} y={194} textAnchor="end" fontSize={11} fill={C.dim}>−</text>
        <line x1={30} y1={40} x2={30} y2={90} stroke={C.dim} strokeWidth={1.6} />
        <g className={s.hl(1)}>
          <Resistor x1={30} y={90} x2={82} label="field rheostat" labelColor={C.orange} color={C.orange} />
        </g>
        <g className={s.hl(2)}>
          <rect x={88} y={78} width={34} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={105} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
        </g>
        <line x1={122} y1={90} x2={140} y2={90} stroke={C.dim} strokeWidth={1.6} />
        <Coil x={140} y={90} len={70} turns={5} vertical color={C.violet} />
        <text x={124} y={140} textAnchor="end" fontSize={11} fill={C.violet}>field</text>
        <line x1={140} y1={160} x2={140} y2={190} stroke={C.dim} strokeWidth={1.6} />
        <text x={90} y={212} textAnchor="middle" fontSize={10.5} fill={C.red} className={s.on(2, 3)}>NVC current Ish sangai ghatcha</text>
      </g>
      <g className={s.on(4)}>
        <text x={270} y={22} textAnchor="middle" fontSize={14} fontWeight={800}>4-point</text>
        <line x1={200} y1={40} x2={345} y2={40} stroke={C.chalk} strokeWidth={2} />
        <line x1={200} y1={190} x2={345} y2={190} stroke={C.chalk} strokeWidth={2} />
        <g className={s.hl(4) + s.hl(5)}>
          <line x1={210} y1={40} x2={210} y2={78} stroke={C.green} strokeWidth={1.6} />
          <rect x={196} y={78} width={34} height={24} rx={4} fill={C.board} stroke={C.green} strokeWidth={2} />
          <text x={213} y={94} textAnchor="middle" fontSize={10} fontWeight={800} fill={C.green}>NVC</text>
          <line x1={213} y1={102} x2={213} y2={118} stroke={C.green} strokeWidth={1.6} />
          <Resistor x1={213} y={118} x2={263} vertical color={C.green} />
          <line x1={213} y1={168} x2={213} y2={190} stroke={C.green} strokeWidth={1.6} />
          <text x={226} y={150} fontSize={10} fill={C.green}>protective R</text>
        </g>
        <line x1={290} y1={40} x2={290} y2={70} stroke={C.dim} strokeWidth={1.6} />
        <Resistor x1={290} y={70} x2={330} vertical color={C.orange} />
        <text x={304} y={92} fontSize={10.5} fill={C.orange}>rheostat</text>
        <Coil x={290} y={110} len={60} turns={4} vertical color={C.violet} />
        <text x={304} y={148} fontSize={10.5} fill={C.violet}>field</text>
        <line x1={290} y1={170} x2={290} y2={190} stroke={C.dim} strokeWidth={1.6} />
        <text x={270} y={212} textAnchor="middle" fontSize={10.5} fill={C.green} className={s.on(5)}>NVC field bata independent</text>
      </g>
      <g className={s.on(7) + s.hl(7)}>
        <text x={282} y={186} textAnchor="end" fontSize={18} fontWeight={900} fill={C.red}>✕</text>
        <text x={252} y={176} textAnchor="end" fontSize={10} fill={C.red}>open field: NVC le aajhai samaucha</text>
      </g>
    </>
  ),
});

export const ch7 = {
  title: 'Starting: 3-point ra 4-point starter',
  syllabus: 'Unit 4 · DC motor ko starting: 3-point ra 4-point starter',
  steps: [
    whyStarter,
    threePoint,
    fourPoint,
    model({
      q: 'DC motor ma starter ko necessity k ho? 3-point starter ko working neat diagram sanga describe gara.',
      papers: ['2075 Baisakh', '2074 Bhadra', '2073 Bhadra', '2070 Bhadra', '2068 Magh', '2066 Magh', '2083 Baishakh (ECM)'],
      marks: '[2 + 6]',
      points: [
        <><b>Necessity:</b> Ia = (V − Eb)/Ra. Start ma N = 0, so Eb = 0 ani Ia = V/Ra, jun rated current ko 15–25 guna huncha kina bhane Ra dherai sano huncha (e.g. 220/0.5 = 440 A). Yesle commutator, brush ra winding damage garcha ani supply dip garcha, so start ma resistance thapnu parcha ani Eb badhdai jada cut out garnu parcha.</>,
        <><b>Diagram:</b> terminal L, F, A; starting resistance studs ko bichma section ma baadieko; handle pivot gareko ra OLR coil hudai L sanga connected; brass arc NVC hudai field sanga connected; last stud A sanga connected; handle ma spring.</>,
        <><b>Starting:</b> handle OFF bata stud 1 ma, so full resistance armature sanga series ma huncha ra field le brass arc hudai full voltage paucha (maximum starting torque). Speed ra Eb badhdai jada, sabai resistance cut out nahunjel stud by stud sara.</>,
        <><b>NVC (no-volt coil):</b> field sanga series ma huncha; RUN ma soft-iron handle lai spring ko biruddha samaucha. Supply fail wa open field huda yesko magnetism jancha ani spring le handle OFF ma pharkaucha.</>,
        <><b>OLR (overload release):</b> line sanga series ma huncha; excessive current huda iron piece tancha jasle NVC short-circuit garcha, so handle OFF ma pharkancha.</>,
        <><b>Drawback:</b> speed control ko lagi field weakening garda NVC pani kamjor huncha ani handle release huna sakcha. 4-point starter le NVC lai supply ko across jodera yo solve garcha.</>,
      ],
      tip: '6 marks ko dherai jaso part diagram mai cha: L, F, A, studs, brass arc, NVC, OLR ra spring clearly label gara.',
    }),
    hook('NVC = No Volts → handle ghar jancha (OFF) · OLR = Over Load → Release', [
      '3 points: L (line), F (field), A (armature). 4-point le NVC ko lagi alag supply terminal thapcha.',
      'SABAI resistance bhitra ra FULL field sanga start gara. Eb badhdai jada resistance cut out gara.',
      'R_starter = V / I_start − Ra',
    ]),
  ],
};
