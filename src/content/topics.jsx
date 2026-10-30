import { C, extra, overview, segments } from './video/kit.jsx';
import { Ask, Battery, Crane, Face, Fan, MagnetWire, Note, Paper } from './video/doodles.jsx';
import { backEmfAnswer, characteristicsAnswer, starterAnswer, testingAnswer, torqueAnswer } from './video/picture.jsx';
import { backEmfDerivation, torqueDerivation, torqueFromPower, voltageEquation } from './video/t41.jsx';
import './video/roles41.jsx';
import { charsAnswer42, chars42, equations42, noLoad42, opener42, series42, seriesSolve42, shunt42, types42 } from './unit4/u42.jsx';
import { eff2074, eff2083, flow43, losses43, maxEff43, opener43 } from './unit4/u43.jsx';
import { four44, need44, opener44, starterAnswer44, starterR44, three44 } from './unit4/u44.jsx';
import { armature45, armatureR45, field45, knobs45, opener45, seriesRev45, shuntControl45, speedEq45 } from './unit4/u45.jsx';
import { backEmf41, backEmfAnswer41, opener41, principle41, torque41, torqueAnswer41 } from './unit4/u41.jsx';
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
// `opener` is a ready duo() video (Tutor + Lecturer); older topics pass `intro`.
const topic = ({ num, title, intro, introArt, introRoles, opener: given, extras = [], ...parts }) => {
  const opener = given ?? overview(num, title, intro, introArt);
  if (introRoles) opener.figureProps.variants = introRoles;
  return { num, title, steps: [...segments({ ...parts, terms: [opener, ...parts.terms] }), ...extras.map(extra)] };
};

const t41 = topic({
  num: '4.1',
  title: 'Working principle, back EMF ra torque equation',
  opener: opener41,
  terms: [principle41, torque41, backEmf41],
  derive: [backEmfDerivation, voltageEquation, torqueDerivation, torqueFromPower],
  picture: [torqueAnswer41, backEmfAnswer41],
  extras: [vibe41, torqueProduction3d, story, torqueProduction, ch3Model, whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, emfDerivation, emfIoe, ch2Model, torqueFactors, voltagePower, maxPower, speedEq, ch4Model],
});

const t42 = topic({
  num: '4.2',
  title: 'DC motor ka types, characteristics ra applications',
  opener: opener42,
  terms: [types42, chars42],
  derive: [equations42, shunt42, series42],
  picture: [charsAnswer42, noLoad42, seriesSolve42],
  extras: [vibe42, connections, shunt, series, compound, characteristicsAnswer, ch6Model, equations, shuntLoadSpeed, shuntNumerical, seriesNumerical],
});

const t43 = topic({
  num: '4.3',
  title: 'Losses ra efficiency',
  opener: opener43,
  terms: [losses43],
  derive: [flow43, maxEff43],
  picture: [eff2074, eff2083],
  extras: [vibe43, losses, maxEff, ioeEff, powerFlow],
});

const t44 = topic({
  num: '4.4',
  title: 'Starting: 3-point ra 4-point starter',
  opener: opener44,
  terms: [three44, four44],
  derive: [need44, starterR44],
  picture: [starterAnswer44],
  extras: [vibe44, threePoint, fourPoint, whyStarter, starterAnswer, ch7Model],
});

const t45 = topic({
  num: '4.5',
  title: 'Speed control: series, shunt ra direction reverse',
  opener: opener45,
  terms: [knobs45, field45, armature45, seriesRev45],
  derive: [speedEq45],
  picture: [shuntControl45, armatureR45],
  extras: [vibe45, threeKnobs, fieldControl, armatureControl, reversing, speedDerivation, seriesControl, solveField, solveArmature, ch8Model, ...pastQuestions],
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
