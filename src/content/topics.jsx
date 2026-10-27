import { extra, memory, segments } from './video/kit.jsx';
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
import { retardation, swinburne, testIntro, testingModel } from './video/testing.jsx';

/*
  The six micro-topics of IOE Electrical Machines Unit 4 (DC Motors), each about
  5 minutes, in three video segments (kit.jsx `segments`): terms and
  definitions with visuals → derivation → big picture with the topic's own old
  IOE question and solution (solve videos, model answers) and a memory card.
  In-video questions are easy attention checks on what was just said. `extras` stay out of the main path and are
  offered after the course as Extra practice, grouped by topic.
*/

const topic = ({ num, title, extras = [], ...parts }) => ({ num, title, steps: [...segments(parts), ...extras.map(extra)] });

const t41 = topic({
  num: '4.1',
  title: 'Working principle, back EMF ra torque equation',
  terms: [torqueProduction, story],
  derive: [torqueDerivation],
  picture: [
    ch3Model,
    memory('Torque lai Flux RA current dubai chahincha · Back EMF = motor ko aafnai brake', {
      line: 'Field ma current bokeko conductor le force paucha; ghumda armature le supply lai oppose garne Eb banaucha.',
      formulas: ['F = BIl', 'Ta = 0.159 φ Z Ia (P/A)  ⟹  Ta ∝ φIa', 'Eb = PφZN / 60A', 'Ia = (V − Eb) / Ra'],
      order: ['Ic = Ia/A', 'B = Pφ/2πrl', 'F = B·Ic·l', 'τ = F·r', '× Z'],
      remember: ['Commutator → euta pole muni ka sabai conductor eutai tira push → unidirectional torque', 'Start ma N = 0 → Eb = 0 → Ia = V/Ra huge', 'Load ↑ → N ↓ → Eb ↓ → Ia ↑ → torque ↑ (self-regulating)'],
      forget: ['Wave winding ma P/A = 1 manne (wave ma P/A = P/2).'],
    }),
  ],
  extras: [whyItMoves, howBig, fleming, ch1Model, crossSection, commutatorAction, lapWave, emfDerivation, emfIoe, ch2Model, torqueFactors, voltagePower, maxPower, speedEq, ch4Model],
});

const t42 = topic({
  num: '4.2',
  title: 'DC motor ka types, characteristics ra applications',
  terms: [connections],
  derive: [shunt, series],
  picture: [
    compound,
    ch6Model,
    memory('Shunt: Steady speed · Series: Strong start, Solo kahile pani hoina', {
      line: 'Field kasari jodieko cha tyo le flux decide garcha, ani flux le curve decide garcha: Ta ∝ φIa, N ∝ Eb/φ.',
      formulas: ['Shunt: IL = Ia + Ish, V = Eb + IaRa', 'Series: V = Eb + Ia(Ra + Rse)', 'Speed regulation = (N₀ − N_FL)/N_FL × 100%'],
      remember: ['Shunt: Ta ∝ Ia (line), N lagbhag constant.', 'Series: Ta ∝ Ia² (parabola), N ∝ 1/Ia (hyperbola).', 'Shunt → lathe, fan, pump · Series → traction, crane, hoist · Cumulative compound → shears, punching press'],
      forget: ['Series motor lai no load ma start garnu (speed khatarnak high).', 'Supply ko current lai nai Ia manne: shunt ma pahila Ish ghatau.'],
    }),
  ],
  extras: [equations, shuntLoadSpeed, shuntNumerical, seriesNumerical],
});

const t43 = topic({
  num: '4.3',
  title: 'Losses ra efficiency',
  terms: [losses],
  derive: [maxEff],
  picture: [
    ioeEff,
    memory('Variable loss = Constant loss huda Maximum η', {
      line: 'Input = output + losses; losses constant ra variable ma bandincha.',
      formulas: ['η = Output / (Output + losses)', 'Max η: I²Ra = Wc', 'I(max η) = √(Wc / Ra)'],
      order: ['η = 1 − Wc/VI − IRa/V', 'dη/dI = 0', 'Wc/I² = Ra', 'I²Ra = Wc'],
      remember: ['Constant: iron + mechanical + shunt field. Variable: Ia²Ra, series field, brush drop.', 'Silicon steel → kam hysteresis · Laminations → kam eddy current.'],
      forget: ['Field copper loss (V·Ish) birsanu.', 'Generator ma Ia = IL + Ish, IL matra hoina.'],
    }),
  ],
  extras: [powerFlow],
});

const t44 = topic({
  num: '4.4',
  title: 'Starting: 3-point ra 4-point starter',
  terms: [threePoint, fourPoint],
  derive: [whyStarter],
  picture: [
    ch7Model,
    memory('NVC = No Volts → handle ghar jancha (OFF) · OLR = Over Load → Release', {
      line: 'Start ma Eb = 0, tesaile current V/Ra huge; starter le R thapera limit garcha.',
      formulas: ['I_start = V / (Ra + R)', 'R_starter = V / I_start − Ra'],
      remember: ['3 points: L (line), F (field), A (armature).', '4-point: NVC lai field circuit bata alag, aafnai supply terminal.', 'SABAI resistance bhitra ra FULL field sanga start gara.'],
      forget: ['3-point ma field weaken garda NVC le handle chodna sakcha.', '4-point ma field open bhaye pani handle chhodina.'],
    }),
  ],
});

const t45 = topic({
  num: '4.5',
  title: 'Speed control: series, shunt ra direction reverse',
  terms: [threeKnobs, fieldControl, armatureControl, reversing],
  derive: [speedDerivation],
  picture: [
    seriesControl,
    memory('Field → Faster (base bhanda mathi) · Armature → slower (base bhanda tala)', {
      line: 'Speed control bhaneko N ∝ (V − IaRa)/φ ko euta term change garnu ho; direction chai φ wa Ia euta ulto garera.',
      formulas: ['N ∝ (V − IaRa)/φ', 'N₂/N₁ = (Eb₂/Eb₁)(φ₁/φ₂)', 'Constant torque: φ₁Ia₁ = φ₂Ia₂'],
      remember: ['Shunt: field rheostat (mathi), armature R (tala), Ward-Leonard (smooth, zero samma).', 'Series: diverter/tapped field (mathi), series R (tala).', 'Reverse: armature WA field, euta matra; practice ma armature.'],
      forget: ['Field weaken garda Ia same rakhnu (constant torque ma badhcha).', 'Supply polarity swap le direction badalcha bhanne (dubai ulto → uhi direction).'],
    }),
  ],
  extras: [solveField, solveArmature, ch8Model, ...pastQuestions],
});

const t46 = topic({
  num: '4.6',
  title: 'Testing: Retardation test ra Swinburne’s test',
  terms: [testIntro],
  derive: [swinburne, retardation],
  picture: [
    testingModel,
    memory('Swinburne = Still (no load) · Retardation = Run down', {
      line: 'Load nahali losses napera efficiency nikalne: no-load input (Swinburne) wa slow hune rate (retardation).',
      formulas: ['Swinburne: Wc = V·I₀ − Ia₀²Ra,  Ia₀ = I₀ − Ish', 'Motor η = (V·IL − Wc − Ia²Ra) / V·IL', 'Retardation: W = (2π/60)² J N dN/dt', 'W = W′ · t₂ / (t₁ − t₂)'],
      remember: ['Swinburne: shunt machine, rated V ra N, no load.', 'Retardation: rated bhanda mathi chalau, armature OFF, field ON; N lai armature voltage le padha.'],
      forget: ['Swinburne series motor ma garnu (no load ma race garcha).', 'Swinburne le load ma iron loss ko change ignore garcha.'],
    }),
  ],
});

export const topics = [t41, t42, t43, t44, t45, t46];
