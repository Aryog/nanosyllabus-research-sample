import { force, magnets, spin } from './lessons/basics.jsx';
import { backemf, construction, torque } from './lessons/machine.jsx';
import { control, losses, starting, types } from './lessons/control.jsx';

/*
  Step shapes
  - { interstitial: { title, badge } }                       section break, auto-advances
  - { body, Figure?, figureProps? }                            concept → Continue
  - { body, Figure, task: true }                               Continue unlocks when the figure calls onSolved
  - { body, Figure?, input: { type: 'choice'|'tiles', ... } }  Check → Why? / Get help / Try again
  - { body, Figure, input: { type: 'figure', complete, correct, reveal } }  figure is the input
  `narration` = id in narration.js (caption + voice); `hint` shows on Get help; `why` on Why?.

  Each lesson teaches first (explore → explain → worked example), then a Skill
  check with IOE-style theory and numerical questions.
*/

export const course = {
  id: 'dc-motors',
  title: 'DC Motors',
  tagline: 'The complete DC motor chapter of Electrical Machines, built up from a compass needle and checked with IOE-style problems.',
  lessons: [magnets, force, spin, construction, backemf, torque, types, starting, control, losses],
};
