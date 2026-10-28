import { extra, segments } from './video/kit.jsx';
import { characteristicsAnswer, starterAnswer, testingAnswer, torqueAnswer } from './video/picture.jsx';
import { ch1Model, fleming, howBig, whyItMoves } from './video/ch1.jsx';
import { ch2Model, commutatorAction, crossSection, emfDerivation, emfIoe, lapWave } from './video/ch2.jsx';
import { ch3Model, torqueDerivation, torqueFactors, torqueProduction } from './video/ch3.jsx';
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

const topic = ({ num, title, extras = [], ...parts }) => ({ num, title, steps: [...segments(parts), ...extras.map(extra)] });

const t41 = topic({
  num: '4.1',
  title: 'Working principle, back EMF ra torque equation',
  terms: [vibe41, torqueProduction, story],
  derive: [torqueDerivation],
  picture: [
    torqueAnswer,
  ],
  extras: [ch3Model, whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, emfDerivation, emfIoe, ch2Model, torqueFactors, voltagePower, maxPower, speedEq, ch4Model],
});

const t42 = topic({
  num: '4.2',
  title: 'DC motor ka types, characteristics ra applications',
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
  terms: [vibe46, testIntro],
  derive: [swinburne, retardation],
  picture: [
    testingAnswer,
  ],
  extras: [testingModel],
});

export const topics = [t41, t42, t43, t44, t45, t46];
