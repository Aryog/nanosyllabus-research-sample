import { Arrow, C, Conductor, Pole, model, video } from './kit.jsx';

/* Chapter 1 · Force on a conductor (Syllabus Unit 1: force on a current-carrying conductor). */

const fieldLines = [62, 88, 132, 158];

export const whyItMoves = video('Magnetic field ma wire kina chalcha?', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Duita magnet ko pole aamne-saamne chan. Field chai gap bhari sidha N bata S tira jancha.', voice: 'दुईटा म्याग्नेटको पोल आमने–सामने छन्। फिल्ड चाहिँ ग्याप भरि सिधा एन बाट एस तिर जान्छ।' },
    { say: 'Aba euta wire, jasma current screen bata bahira aaudai cha, dot le dekhaeko. Tyo current le wire ko waripari aafnai circular field banaucha.', voice: 'अब एउटा वायर, जसमा करेन्ट स्क्रिनबाट बाहिर आउँदै छ, डटले देखाएको। त्यो करेन्टले वायरको वरिपरि आफ्नै सर्कुलर फिल्ड बनाउँछ।' },
    {
      say: 'Aba duitai field sangai hera.',
      voice: 'अब दुवै फिल्ड सँगै हेर।',
      ask: {
        q: 'Wire ko tala circles right tira point garcha, main field kai direction ma. Mathi chai left tira. Total field kata baliyo huncha?',
        voice: 'वायरको तल सर्कल्स राइट तिर पोइन्ट गर्छ, मेन फिल्डकै डाइरेक्सनमा। माथि चाहिँ लेफ्ट तिर। टोटल फिल्ड कता बलियो हुन्छ?',
        options: ['Wire ko tala', 'Wire ko mathi', 'Jata pani same'],
        answer: 0,
        why: 'Tala duita field jodincha. Mathi chai ulto direction ma bhayera partly cancel huncha.',
      },
    },
    { say: 'Tesaile wire ko tala field ekdam crowded, mathi patalo. Field lines tanieko rubber band jastai behave garchan, ra wire lai weak side tira push garchan.', voice: 'तेसैले वायरको तल फिल्ड एकदम क्राउडेड, माथि पातलो। फिल्ड लाइन्स तानिएको रबर ब्यान्ड जस्तै बिहेभ गर्छन्, र वायरलाई वीक साइड तिर पुस गर्छन्।' },
    { say: 'Wire mathi push huncha. Yahi ho motor principle: "a current-carrying conductor placed in a magnetic field experiences a force."', voice: 'वायर माथि पुस हुन्छ। यही हो मोटर प्रिन्सिपल: अ करेन्ट क्यारिङ कन्डक्टर प्लेस्ड इन अ म्याग्नेटिक फिल्ड एक्सपिरियन्सेस अ फोर्स।' },
    { say: 'Tyo force kati thulo bhanda F equals B I l: flux density, times current, times field bhitra ko wire ko length.', voice: 'त्यो फोर्स कति ठूलो भन्दा एफ इक्वल्स बी आई एल: फ्लक्स डेन्सिटी, टाइम्स करेन्ट, टाइम्स फिल्ड भित्रको वायरको लेन्थ।' },
  ],
  draw: (s) => (
    <>
      <g className={s.on(0)}>
        <Pole x={14} y={40} label="N" color={C.north} />
        <Pole x={302} y={40} label="S" color={C.south} />
        {fieldLines.map((y) => {
          const strong = s.at(3) && y > 110;
          const weak = s.at(3) && y < 110;
          return (
            <Arrow key={y} x1={60} y1={y} x2={300} y2={y} color={strong ? C.yellow : C.blue} w={strong ? 3.4 : 1.8} className={`sc on ${weak ? 'fade' : ''}`} />
          );
        })}
      </g>
      <g className={s.on(1)}>
        <circle cx={180} cy={110} r={28} fill="none" stroke={C.violet} strokeWidth={1.6} strokeDasharray="5 4" />
        <circle cx={180} cy={110} r={42} fill="none" stroke={C.violet} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
        <Arrow x1={186} y1={82} x2={172} y2={82} color={C.violet} w={2} head={8} />
        <Arrow x1={174} y1={138} x2={188} y2={138} color={C.violet} w={2} head={8} />
        <Conductor x={180} y={110} r={13} dir="out" />
      </g>
      <g className={s.on(3)}>
        <text x={240} y={50} fontSize={13} fill={C.dim}>kamjor</text>
        <text x={240} y={186} fontSize={13} fill={C.yellow} fontWeight={700}>baliyo</text>
      </g>
      <g className={s.on(4) + s.hl(4)}>
        <Arrow x1={180} y1={92} x2={180} y2={34} color={C.green} w={4} head={12} />
        <text x={192} y={44} fontSize={16} fontWeight={800} fill={C.green}>F</text>
      </g>
    </>
  ),
  board: [
    { at: 4, kind: 'note', node: <>IOE wording (exam ma yestai lekha): “When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.”</> },
    { at: 5, kind: 'eq', node: <>F = B · I · l</> },
  ],
});

export const howBig = video('F = BIl sin θ: push kati thulo huncha?', {
  beats: [
    { say: 'Push kati thulo huncha? Scene yo ho, teen ta kura le decide garcha.', voice: 'पुस कति ठूलो हुन्छ? सिन यो हो, तीन ओटा कुराले डिसाइड गर्छ।' },
    { say: 'Flux density B tesla ma, current I ampere ma, ra active length l metre ma. Force chai newton ma aaucha.', voice: 'फ्लक्स डेन्सिटी बी टेस्लामा, करेन्ट आई एम्पियरमा, र एक्टिभ लेन्थ एल मिटरमा। फोर्स चाहिँ न्युटनमा आउँछ।' },
    { say: 'Wire field sanga theta angle ma tilt cha bhane, field ko perpendicular part le matra push garcha. Tesaile F equals B I l sine theta.', voice: 'वायर फिल्डसँग थिटा एङ्गलमा टिल्ट छ भने, फिल्डको पर्पेन्डिकुलर पार्टले मात्र पुस गर्छ। तेसैले एफ इक्वल्स बी आई एल साइन थिटा।' },
    { say: 'Ninety degree ma force sabai bhanda dherai huncha. Field kai direction ma, zero degree ma, force ekdam zero.', voice: 'नाइन्टी डिग्रीमा फोर्स सबैभन्दा धेरै हुन्छ। फिल्डकै डाइरेक्सनमा, जिरो डिग्रीमा, फोर्स एकदम जिरो।' },
    { say: 'Tesaile ta armature conductors sadhai flux sanga right angle ma rakhincha.', voice: 'तेसैले त आर्मेचर कन्डक्टर्स सधैं फ्लक्ससँग राइट एङ्गलमा राखिन्छ।' },
    {
      say: 'La aba timro palo.',
      voice: 'ल अब तिम्रो पालो।',
      ask: {
        tag: 'Quick check',
        q: '0.25 m ko wire ma 10 A current cha, 0.6 T field sanga right angle ma. Force kati?',
        voice: 'जिरो पोइन्ट टु फाइभ मिटरको वायरमा टेन एम्पियर करेन्ट छ, जिरो पोइन्ट सिक्स टेस्ला फिल्डसँग राइट एङ्गलमा। फोर्स कति?',
        options: ['1.5 N', '15 N', '0.15 N', '2.4 N'],
        answer: 0,
        why: 'F = 0.6 × 10 × 0.25 = 1.5 N.',
      },
    },
    { say: 'Tyahi wire lai thirty degree ma tilt gara, force aadha huncha, kina bhane sine thirty is one half: 0.75 newton.', voice: 'त्यही वायरलाई थर्टी डिग्रीमा टिल्ट गर, फोर्स आधा हुन्छ, किनभने साइन थर्टी इज वान हाफ: जिरो पोइन्ट सेभेन्टी फाइभ न्युटन।' },
  ],
  board: [
    { at: 0, kind: 'h', node: <>F = B I l sin θ</> },
    { at: 1, kind: 'step', node: <><span className="bl">B</span> flux density (T) · <span className="y">I</span> current (A) · <span className="g">l</span> field bhitra ko length (m) · F chai N ma</> },
    { at: 2, kind: 'eq', node: <>F = B I l sin θ</> },
    { at: 3, kind: 'step', node: <>θ = 90° → maximum, F = BIl &nbsp;·&nbsp; θ = 0° → F = 0</> },
    { at: 4, kind: 'note', node: <>Design rule: conductors flux sanga 90° ma baschan.</> },
    { at: 6, kind: 'step', node: <>At 30°: F = 1.5 × sin 30° = <span className="y">0.75 N</span></> },
  ],
});

export const fleming = video('Kun tira? Fleming ko left-hand rule', {
  viewBox: '0 0 360 220',
  beats: [
    { say: 'Aafno left hand uthau. Thumb, first finger ra second finger tana, sabai ek arka sanga right angle ma.', voice: 'आफ्नो लेफ्ट ह्यान्ड उठाऊ। थम्ब, फर्स्ट फिङ्गर र सेकेन्ड फिङ्गर तान, सबै एक अर्कासँग राइट एङ्गलमा।' },
    { say: 'First finger le Field ko direction dekhaucha, N bata S tira.', voice: 'फर्स्ट फिङ्गरले फिल्डको डाइरेक्सन देखाउँछ, एन बाट एस तिर।' },
    { say: 'Second finger le Current ko direction dekhaucha.', voice: 'सेकेन्ड फिङ्गरले करेन्टको डाइरेक्सन देखाउँछ।' },
    { say: 'Ani thumb le Motion dekhaucha, matlab force ko direction. Simple cha.', voice: 'अनि थम्बले मोसन देखाउँछ, मतलब फोर्सको डाइरेक्सन। सिम्पल छ।' },
    {
      say: 'La, yo answer gara.',
      voice: 'ल, यो आन्सर गर।',
      ask: {
        tag: 'Quick check',
        q: 'Field right tira, current timi tira aaudai cha. Force kun tira?',
        voice: 'फिल्ड राइट तिर, करेन्ट तिमी तिर आउँदै छ। फोर्स कुन तिर?',
        options: ['Mathi', 'Tala', 'Left', 'Screen bhitra'],
        answer: 0,
        why: 'First finger right, second finger timi tira, ani thumb mathi point garcha. Wire mathi push bhako sanga match bhayo.',
      },
    },
    { say: 'Field wa current, euta matra reverse gara, force reverse huncha. Duitai reverse gara bhane force pahila kai direction ma farkincha.', voice: 'फिल्ड वा करेन्ट, एउटा मात्र रिभर्स गर, फोर्स रिभर्स हुन्छ। दुवै रिभर्स गर भने फोर्स पहिलाकै डाइरेक्सनमा फर्किन्छ।' },
    {
      say: 'Yahi idea IOE paper ma exactly sodhincha, bro.',
      voice: 'यही आइडिया आइओई पेपरमा एक्ज्याक्ट्ली सोधिन्छ, ब्रो।',
      ask: {
        tag: 'IOE 2073 Chaitra · 2069 Bhadra',
        q: '“Explain the working principle of a DC motor.” Tyo principle kun statement ho?',
        voice: 'एक्सप्लेन द वर्किङ प्रिन्सिपल अफ अ डीसी मोटर। त्यो प्रिन्सिपल कुन स्टेटमेन्ट हो?',
        options: [
          'Magnetic field ma rakheko current-carrying conductor le mechanical force experience garcha',
          'Magnetic field ma chaleko conductor ma EMF induce huncha',
          'Euta coil ko changing current le arko coil ma EMF induce garcha',
        ],
        answer: 0,
        why: 'Tyo motor principle ho. Dosro generator principle ho, ra tesro chai transformer kasari kaam garcha bhanne.',
      },
    },
  ],
  draw: (s) => (
    <>
      <circle cx={170} cy={130} r={6} fill={C.chalk} className={s.on(0)} />
      <g className={s.on(1) + s.hl(1)}>
        <Arrow x1={170} y1={130} x2={310} y2={130} color={C.blue} w={4} head={12} />
        <text x={250} y={152} fontSize={13} fontWeight={700} fill={C.blue}>First finger · Field</text>
      </g>
      <g className={s.on(2) + s.hl(2)}>
        <Arrow x1={170} y1={130} x2={92} y2={196} color={C.red} w={4} head={12} />
        <text x={20} y={214} fontSize={13} fontWeight={700} fill={C.red}>seCond finger · Current</text>
      </g>
      <g className={s.on(3) + s.hl(3)}>
        <Arrow x1={170} y1={130} x2={170} y2={24} color={C.green} w={4} head={12} />
        <text x={182} y={34} fontSize={13} fontWeight={700} fill={C.green}>thuMb · Motion (force)</text>
      </g>
      <text x={20} y={40} fontSize={26} fontWeight={900} fill={C.yellow} className={s.on(3)}>F · B · I</text>
      <text x={20} y={58} fontSize={11.5} fill={C.dim} className={s.on(3)}>thumb · first · second</text>
    </>
  ),
});

// Segment 3: the principle half of the IOE working-principle question.
export const ch1Model = model({
  q: 'Explain the working principle of a DC motor. (Principle wala part: conductor ma force ra yesko direction.)',
  papers: ['2073 Chaitra', '2069 Bhadra'],
  marks: 'Principle part',
  points: [
    <><b>Principle:</b> “When a current-carrying conductor is placed in a magnetic field, it experiences a mechanical force.”</>,
    <><b>Kina:</b> conductor ko current le aafnai circular field banaucha. Main field sanga milda euta side ma field crowded ra arko side ma patalo huncha; tanieko field lines le conductor lai patalo side tira push garcha.</>,
    <><b>Magnitude:</b> F = BIl sin θ newton (B tesla, I ampere, l metre, θ conductor ra field bich ko angle). θ = 90° ma F = BIl, maximum.</>,
    <><b>Direction:</b> Fleming ko left-hand rule: First finger = Field, seCond finger = Current, thuMb = Motion. Field wa current euta matra reverse garda force reverse huncha.</>,
    <><b>Diagram:</b> N ra S ko bich ma ⊙ conductor, crowded ra patalo field side, ani force arrow.</>,
  ],
  tip: 'Yo principle part ho. Torque equation sangai pura answer Chapter 3 ma cha. Exam ma English mai lekha.',
});
