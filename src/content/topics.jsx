import { C, extra, overview, segments } from './video/kit.jsx';
import { Ask, Battery, Crane, Face, Fan, MagnetWire, Note, Paper } from './video/doodles.jsx';
import { backEmfAnswer, characteristicsAnswer, starterAnswer, testingAnswer, torqueAnswer } from './video/picture.jsx';
import { backEmfDerivation, torqueDerivation, torqueFromPower, voltageEquation } from './video/t41.jsx';
import { introRoles41 } from './video/roles41.jsx';
import { ch1Model, fleming, howBig, whyItMoves } from './video/ch1.jsx';
import { ch2Model, commutatorAction, crossSection, emfDerivation, emfIoe, lapWave } from './video/ch2.jsx';
import { ch3Model, torqueFactors, torqueProduction, torqueProduction3d } from './video/ch3.jsx';
import { ch4Model, maxPower, speedEq, story, voltagePower } from './video/ch4.jsx';
import { connections, equations, shuntLoadSpeed } from './video/ch5.jsx';
import { ch6Model, compound, series, seriesNumerical, shunt, shuntNumerical } from './video/ch6.jsx';
import { ch7Model, fourPoint, threePoint, whyStarter } from './video/ch7.jsx';
import { armatureControl, ch8Model, fieldControl, reversing, seriesControl, solveArmature, solveField, speedDerivation, threeKnobs } from './video/ch8.jsx';
import { ioeEff, losses, maxEff, powerFlow } from './video/ch9.jsx';
import { pastQuestions } from './video/past.jsx';
import { vibe41, vibe42, vibe43, vibe44, vibe45, vibe46 } from './video/vibe.jsx';
import { retardation, swinburne, testIntro, testingModel } from './video/testing.jsx';

/*
  The six micro-topics of IOE Electrical Machines Unit 4 (DC Motors), each about
  5 minutes, in three video segments (kit.jsx `segments`): a fun everyday
  opener (vibe.jsx), terms and definitions with visuals → derivation → big picture with the topic's own old
  IOE question and its solution (solve or answer videos).
  In-video questions are easy attention checks on what was just said. `extras` stay out of the main path and are
  offered after the course as Extra practice, grouped by topic.
*/

// Segment 1 opens with the topic's overview (what it's about), then its videos.
// `introRoles` gives the opener a version per teaching role (src/content/pov.js).
const topic = ({ num, title, intro, introArt, introRoles, extras = [], ...parts }) => {
  const opener = overview(num, title, intro, introArt);
  if (introRoles) opener.figureProps.variants = introRoles;
  return { num, title, steps: [...segments({ ...parts, terms: [opener, ...parts.terms] }), ...extras.map(extra)] };
};

const t41 = topic({
  num: '4.1',
  title: 'Working principle, back EMF ra torque equation',
  intro: [
    { say: 'Working principle, back EMF ra torque equation topic suru garau.', voice: 'वर्किङ प्रिन्सिपल, ब्याक इएमएफ र टर्क इक्वेसन टपिक सुरु गरौं।' },
    {
      say: 'Pahila, field ra current bhaye motor kina ghumcha, tyo bujhchau.',
      voice: 'पहिला, फिल्ड र करेन्ट भए, मोटर किन घुम्छ — त्यो बुझ्छौं।',
      lines: [{ kind: 'idea', node: <>Motor kina ghumcha?</> }, { kind: 'step', node: <>Field + current bokeko conductor → k huncha?</> }],
    },
    {
      say: 'Ani ghumda banne back EMF k ho, ra torque kati huncha, tyo nikalchau.',
      voice: 'अनि घुम्दा बन्ने ब्याक इएमएफ के हो, र टर्क कति हुन्छ — त्यो निकाल्छौं।',
      lines: [{ kind: 'idea', node: <>Back EMF k ho?</> }, { kind: 'idea', node: <>Torque kati huncha, kasari nikalne?</> }],
    },
    {
      say: 'Last ma, IOE ka duita question solve garchau: working principle ra torque equation, ra back EMF ko role. Dubai tin-tin choti sodhiyeka chan.',
      voice: 'लास्टमा, आइओईका दुईटा क्वेस्चन सल्भ गर्छौं — वर्किङ प्रिन्सिपल र टर्क इक्वेसन, र ब्याक इएमएफको रोल। दुवै, तीन-तीन चोटि सोधिएका छन्।',
      lines: [{ kind: 'hook', node: <>★ Last ma: IOE ka 2 question, dubai 3 choti sodhiyeka</> }],
    },
  ],
  introArt: {
    viewBox: '0 0 360 220',
    // Each question's picture comes in as the voice asks it (--d = ms into the beat).
    draw: (s) => (
      <>
        <g className={s.on(0)}>
          <g className="seq pop">
            <Face x={292} y={104} r={36} />
          </g>
          <Note x={292} y={176}>Motor-dai</Note>
        </g>
        <g className={s.on(1)}>
          <MagnetWire x={10} y={70} seq={[500, 1200, 2700]} />
          <g className="seq pop" style={{ '--d': '3100ms' }}>
            <Ask x={142} y={60} />
          </g>
        </g>
        <g className={s.on(2)}>
          {/* Turning (counter-clockwise, like the torque later): drawn as "ghumda" is said. */}
          <path d="M324.1 65.7 A50 50 0 1 0 324.1 142.3" fill="none" stroke={C.yellow} strokeWidth={3} strokeLinecap="round" className="draw" pathLength={1} />
          <g className="seq" style={{ '--d': '1000ms' }}>
            <polygon points="330.2,137.2 326.5,148.2 318.7,139" fill={C.yellow} />
          </g>
          <g className="seq pop" style={{ '--d': '1200ms' }}>
            <Ask x={350} y={60} size={28} />
            <Note x={288} y={200} color={C.violet} anchor="end">back EMF?</Note>
          </g>
          <g className="seq pop" style={{ '--d': '2800ms' }}>
            <Note x={296} y={200} color={C.violet} anchor="start">torque?</Note>
          </g>
        </g>
        <g className={s.on(3)}>
          <g className="seq pop" style={{ '--d': '900ms' }}>
            <Paper x={56} y={2} stampAt={1500} />
          </g>
        </g>
      </>
    ),
  },
  introRoles: introRoles41,
  terms: [vibe41, torqueProduction3d, story],
  derive: [backEmfDerivation, voltageEquation, torqueDerivation, torqueFromPower],
  picture: [torqueAnswer, backEmfAnswer],
  extras: [torqueProduction, ch3Model, whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, emfDerivation, emfIoe, ch2Model, torqueFactors, voltagePower, maxPower, speedEq, ch4Model],
});

const t42 = topic({
  num: '4.2',
  title: 'DC motor ka types, characteristics ra applications',
  intro: [
    { say: 'DC motor ka types, characteristics ra applications topic suru garau.', voice: 'डीसी मोटरका टाइप्स, क्यारेक्टरिस्टिक्स र एप्लिकेसन्स टपिक सुरु गरौं।' },
    {
      say: 'Field kasari jodda motor ko swabhav nai farak huncha. Kasari, herchau.',
      voice: 'फिल्ड कसरी जोड्दा मोटरको स्वभाव नै फरक हुन्छ। कसरी, हेर्छौं।',
      lines: [{ kind: 'idea', node: <>Field jodne tarika badlyo bhane k farak parcha?</> }, { kind: 'step', node: <>Shunt · Series · Compound</> }],
    },
    {
      say: 'Load thapda kun motor ko speed ra torque kasari change huncha, ani kun kaha use garne, bujhchau.',
      voice: 'लोड थप्दा कुन मोटरको स्पिड र टर्क कसरी चेन्ज हुन्छ, अनि कुन कहाँ युज गर्ने, बुझ्छौं।',
      lines: [{ kind: 'idea', node: <>Load thapda speed ra torque ma k huncha?</> }, { kind: 'idea', node: <>Kun kaam ma kun motor?</> }],
    },
    {
      say: 'Ani last ma, IOE 2070 Magh ko shunt ra series characteristics question sangai solve garchau. Antya samma hera!',
      voice: 'अनि लास्टमा, आइओई दुई हजार सत्तरी माघको शन्ट र सिरिज क्यारेक्टरिस्टिक्स क्वेस्चन सँगै सल्भ गर्छौं। अन्त्यसम्म हेर!',
      lines: [{ kind: 'hook', node: <>★ Last ma: IOE 2070 Magh ko question</> }],
    },
  ],
  introArt: {
    viewBox: '0 0 360 240',
    draw: (s) => (
      <>
        <g className={s.on(0)}>
          {[['Shunt', 70], ['Series', 180], ['Compound', 290]].map(([name, x]) => (
            <g key={name}>
              <Face x={x} y={48} r={22} />
              <Note x={x} y={88}>{name}</Note>
            </g>
          ))}
        </g>
        <g className={s.on(1)}>
          <Battery x={165} y={112} />
          {[70, 180, 290].map((x) => (
            <path key={x} d={`M180 108 Q${(180 + x) / 2} 96 ${x} 96`} fill="none" stroke={C.dim} strokeWidth={1.8} strokeDasharray="4 5" />
          ))}
          <Ask x={226} y={150} size={30} />
        </g>
        <g className={s.on(2)}>
          <Fan x={54} y={168} r={18} />
          <Crane x={232} y={114} />
          <Ask x={150} y={214} size={30} />
        </g>
      </>
    ),
  },
  terms: [vibe42, connections],
  derive: [shunt, series],
  picture: [
    compound,
    characteristicsAnswer,
  ],
  extras: [ch6Model, equations, shuntLoadSpeed, shuntNumerical, seriesNumerical],
});

const t43 = topic({
  num: '4.3',
  title: 'Losses ra efficiency',
  intro: [
    { say: 'Losses ra efficiency topic suru garau.', voice: 'लसेस र इफिसियन्सी टपिक सुरु गरौं।' },
    {
      say: 'Motor lai diyeko power kata kata harauncha, tyo khojchau.',
      voice: 'मोटरलाई दिएको पावर कता कता हराउँछ, त्यो खोज्छौं।',
      lines: [{ kind: 'idea', node: <>Diyeko sabai power kaam ma lagcha ta?</> }, { kind: 'step', node: <>Power kata harauncha?</> }],
    },
    {
      say: 'Ani motor sabai bhanda efficient kahile huncha, tyo condition nikalchau.',
      voice: 'अनि मोटर सबैभन्दा इफिसियन्ट कहिले हुन्छ, त्यो कन्डिसन निकाल्छौं।',
      lines: [{ kind: 'idea', node: <>Efficiency kahile maximum huncha?</> }],
    },
    {
      say: 'Ani last ma, IOE 2074 Bhadra ko efficiency numerical sangai solve garchau. Antya samma hera!',
      voice: 'अनि लास्टमा, आइओई दुई हजार चौहत्तर भदौको इफिसियन्सी न्युमेरिकल सँगै सल्भ गर्छौं। अन्त्यसम्म हेर!',
      lines: [{ kind: 'hook', node: <>★ Last ma: IOE 2074 Bhadra ko numerical</> }],
    },
  ],
  terms: [vibe43, losses],
  derive: [maxEff],
  picture: [
    ioeEff,
  ],
  extras: [powerFlow],
});

const t44 = topic({
  num: '4.4',
  title: 'Starting: 3-point ra 4-point starter',
  intro: [
    { say: 'Starting: 3-point ra 4-point starter topic suru garau.', voice: 'स्टार्टिङ: थ्री-पोइन्ट र फोर-पोइन्ट स्टार्टर टपिक सुरु गरौं।' },
    {
      say: 'Motor start garne bela current kina khatarnak badhcha, tyo herchau.',
      voice: 'मोटर स्टार्ट गर्ने बेला करेन्ट किन खतरनाक बढ्छ, त्यो हेर्छौं।',
      lines: [{ kind: 'idea', node: <>Start garda current kina dherai?</> }],
    },
    {
      say: 'Ani starter le motor lai kasari bachaucha, 3-point ra 4-point ma k farak, bujhchau.',
      voice: 'अनि स्टार्टरले मोटरलाई कसरी बचाउँछ, थ्री-पोइन्ट र फोर-पोइन्टमा के फरक, बुझ्छौं।',
      lines: [{ kind: 'idea', node: <>Starter le kasari bachaucha?</> }, { kind: 'step', node: <>3-point vs 4-point: k farak?</> }],
    },
    {
      say: 'Ani last ma, IOE ma saat choti aayeko starter question sangai solve garchau. Antya samma hera!',
      voice: 'अनि लास्टमा, आइओईमा सात चोटि आएको स्टार्टर क्वेस्चन सँगै सल्भ गर्छौं। अन्त्यसम्म हेर!',
      lines: [{ kind: 'hook', node: <>★ Last ma: IOE ma 7 choti aayeko question</> }],
    },
  ],
  terms: [vibe44, threePoint, fourPoint],
  derive: [whyStarter],
  picture: [
    starterAnswer,
  ],
  extras: [ch7Model],
});

const t45 = topic({
  num: '4.5',
  title: 'Speed control: series, shunt ra direction reverse',
  intro: [
    { say: 'Speed control ra direction reverse topic suru garau.', voice: 'स्पिड कन्ट्रोल र डाइरेक्सन रिभर्स टपिक सुरु गरौं।' },
    {
      say: 'Motor ko speed kun kun kura le decide garcha, tyo herchau.',
      voice: 'मोटरको स्पिड कुन कुन कुराले डिसाइड गर्छ, त्यो हेर्छौं।',
      lines: [{ kind: 'idea', node: <>Speed kun kura le decide garcha?</> }],
    },
    {
      say: 'Ani speed ghataune badhaune ra direction ulto garne tarika sikchau.',
      voice: 'अनि स्पिड घटाउने बढाउने र डाइरेक्सन उल्टो गर्ने तरिका सिक्छौं।',
      lines: [{ kind: 'idea', node: <>Speed kasari ghataune, badhaune?</> }, { kind: 'idea', node: <>Direction kasari ulto garne?</> }],
    },
    {
      say: 'Ani last ma, IOE 2075 Baisakh ko series motor speed control question sangai solve garchau. Antya samma hera!',
      voice: 'अनि लास्टमा, आइओई दुई हजार पचहत्तर वैशाखको सिरिज मोटर स्पिड कन्ट्रोल क्वेस्चन सँगै सल्भ गर्छौं। अन्त्यसम्म हेर!',
      lines: [{ kind: 'hook', node: <>★ Last ma: IOE 2075 Baisakh ko question</> }],
    },
  ],
  terms: [vibe45, threeKnobs, fieldControl, armatureControl, reversing],
  derive: [speedDerivation],
  picture: [
    seriesControl,
  ],
  extras: [solveField, solveArmature, ch8Model, ...pastQuestions],
});

const t46 = topic({
  num: '4.6',
  title: 'Testing: Retardation test ra Swinburne’s test',
  intro: [
    { say: "Testing: Swinburne's test ra retardation test topic suru garau.", voice: 'टेस्टिङ: स्विनबर्न्स टेस्ट र रिटार्डेसन टेस्ट टपिक सुरु गरौं।' },
    {
      say: 'Thulo motor lai load nalagai efficiency kasari thaha paune, tyo herchau.',
      voice: 'ठूलो मोटरलाई लोड नलगाई इफिसियन्सी कसरी थाहा पाउने, त्यो हेर्छौं।',
      lines: [{ kind: 'idea', node: <>Load bina efficiency kasari nikalne?</> }],
    },
    {
      say: "Swinburne's test ra retardation test le k k napcha, bujhchau.",
      voice: 'स्विनबर्न्स टेस्ट र रिटार्डेसन टेस्टले के के नाप्छ, बुझ्छौं।',
      lines: [{ kind: 'idea', node: <>Swinburne's test le k napcha?</> }, { kind: 'idea', node: <>Retardation test le k napcha?</> }],
    },
    {
      say: 'Ani last ma, exam ma aaune testing ko model answer sangai lekhchau. Antya samma hera!',
      voice: 'अनि लास्टमा, एक्जाममा आउने टेस्टिङको मोडल आन्सर सँगै लेख्छौं। अन्त्यसम्म हेर!',
      lines: [{ kind: 'hook', node: <>★ Last ma: exam-style model answer</> }],
    },
  ],
  terms: [vibe46, testIntro],
  derive: [swinburne, retardation],
  picture: [
    testingAnswer,
  ],
  extras: [testingModel],
});

export const topics = [t41, t42, t43, t44, t45, t46];
