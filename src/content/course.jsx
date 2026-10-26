import { journey } from './journey.jsx';

/*
  Step shapes
  - { interstitial: { title, badge } }                       section break, auto-advances
  - { body, Figure?, figureProps? }                            concept → Continue
  - { body, Figure, task: true }                               Continue unlocks when the figure calls onSolved
  - { body, Figure?, input: { type: 'choice'|'tiles', ... } }  Check → Why? / Get help / Try again
  - { body, Figure, input: { type: 'figure', complete, correct, reveal } }  figure is the input
  `narration` = id in narration.js (caption + voice); `hint` shows on Get help; `why` on Why?.

  The course is a single journey (journey.jsx): ten chapters of explain → quick
  check → IOE question → light interactive, then a Past Questions block. The
  lessons/ files are the screen bank it borrows from.
*/

export const course = {
  id: 'dc-motors',
  title: 'DC Motors',
  tagline: 'Electrical Machines ko pura DC motor chapter, compass needle dekhi suru garera IOE style problem samma.',
  lessons: [journey],
};
