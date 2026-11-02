import { backEmfS41, commS41, emfS41, principleS41, torqueForceS41, torquePowerS41, voltageS41 } from './unit4/s41.jsx';
import { C, extra, overview, segments, topic } from './video/kit.jsx';
import { Ask, Battery, Crane, Face, Fan, MagnetWire, Note, Paper } from './video/doodles.jsx';
import { backEmfAnswer, characteristicsAnswer, starterAnswer, testingAnswer, torqueAnswer } from './video/picture.jsx';
import { backEmfDerivation, torqueDerivation, torqueFromPower, voltageEquation } from './video/t41.jsx';
import './video/roles41.jsx';
import { charsAnswer42, chars42, equations42, noLoad42, opener42, series42, seriesSolve42, shunt42, suitability43, types42 } from './unit4/u42.jsx';
import { eff2074, eff2083, flow43, losses43, maxEff43, opener43 } from './unit4/u43.jsx';
import { four44, need44, opener44, starterAnswer44, starterR44, three44 } from './unit4/u44.jsx';
import { armature45, armatureR45, field45, knobs45, opener45, seriesRev45, shuntControl45, speedEq45 } from './unit4/u45.jsx';
import { opener46, retard46, retardDer46, swin46, swinAnswer46, swinEff46, why46 } from './unit4/u46.jsx';
import { backEmf41, backEmfAnswer41, opener41, principle41, torque41, torqueAnswer41 } from './unit4/u41.jsx';
import { basics41, basics42, basics43, basics44, basics45, basics46, basicsBackEmf, basicsChars } from './unit4/basics.jsx';
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
  The seven micro-topics (one per IOE syllabus bullet) of IOE Electrical Machines Unit 4 (DC Motors) in three
  video segments (kit.jsx `segments`): Basic Understanding (about a minute of
  intuition in 3D, no maths; unit4/basics.jsx) → Syllabus Content (the old
  Terms videos with their maths, then the derivations) → Model Answer (the
  topic's own old IOE questions, solve or answer videos). The old openers and
  Terms segments are kept: openers in `extras`, Terms videos in Syllabus Content.
  In-video questions are easy attention checks on what was just said. `extras` stay out of the main path and are
  offered after the course as Extra practice, grouped by topic.
*/

// One topic per IOE syllabus bullet of Unit 4 (user, 2026-11-02: "don't
// squeeze, be actual as IOE"), numbered in syllabus order.
const t41 = topic({
  num: '4.1',
  title: 'Working principle and Torque equation',
  opener: basics41,
  terms: [],
  derive: [principleS41, commS41, torqueForceS41],
  picture: [torqueAnswer41],
  extras: [principle41, torque41, torqueDerivation, opener41, vibe41, torqueProduction3d, torqueProduction, ch3Model, whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, torqueFactors],
});

const t42 = topic({
  num: '4.2',
  title: 'Back EMF',
  opener: basicsBackEmf,
  terms: [],
  derive: [backEmfS41, emfS41, voltageS41, torquePowerS41],
  picture: [backEmfAnswer41],
  extras: [backEmf41, backEmfDerivation, voltageEquation, torqueFromPower, story, emfDerivation, emfIoe, ch2Model, voltagePower, maxPower, speedEq, ch4Model],
});

const t43 = topic({
  num: '4.3',
  title: 'Method of excitation, Types of DC motor',
  opener: basics42,
  terms: [],
  derive: [types42, equations42],
  picture: [suitability43],
  extras: [opener42, vibe42, connections, compound, equations],
});

const t44 = topic({
  num: '4.4',
  title: 'Performance Characteristics of D.C. motors',
  opener: basicsChars,
  terms: [],
  derive: [chars42, shunt42, series42],
  picture: [charsAnswer42, noLoad42, seriesSolve42],
  extras: [shunt, series, characteristicsAnswer, ch6Model, shuntLoadSpeed, shuntNumerical, seriesNumerical],
});

const t45 = topic({
  num: '4.5',
  title: 'Starting of D.C. Motors: 3 point and 4 point starters',
  opener: basics44,
  terms: [],
  derive: [need44, starterR44, three44, four44],
  picture: [starterAnswer44],
  extras: [opener44, vibe44, threePoint, fourPoint, whyStarter, starterAnswer, ch7Model],
});

const t46 = topic({
  num: '4.6',
  title: 'Speed control of D.C. motors: Field Control, Armature Control',
  opener: basics45,
  terms: [],
  derive: [knobs45, speedEq45, field45, armature45, seriesRev45],
  picture: [shuntControl45, armatureR45],
  extras: [opener45, vibe45, threeKnobs, fieldControl, armatureControl, reversing, speedDerivation, seriesControl, solveField, solveArmature, ch8Model, ...pastQuestions],
});

// Losses and Efficiency, with the tests that find the losses (Swinburne's,
// retardation) in the same IOE bullet.
const t47 = topic({
  num: '4.7',
  title: 'Losses and Efficiency',
  opener: basics43,
  terms: [],
  derive: [losses43, flow43, maxEff43, why46, swin46, swinEff46, retard46, retardDer46],
  picture: [eff2074, eff2083],
  extras: [swinAnswer46, opener43, vibe43, losses, maxEff, ioeEff, powerFlow, basics46, opener46, vibe46, testIntro, swinburne, retardation, testingAnswer, testingModel],
});

export const topics = [t41, t42, t43, t44, t45, t46, t47];
