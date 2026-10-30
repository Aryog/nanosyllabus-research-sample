/*
  What each symbol is called, for the labels under an equation (skill rule 51):
  the player labels a symbol in a boxed equation ('eq' line) the first time it
  appears in a video, with a curved leader line, like a textbook figure.
  Keys are KaTeX tokens as written: a letter or \command, with its subscript
  (E_b, I_{sh} → I_sh). A symbol not listed here is never labelled.
*/
export const TERMS = {
  E_b: 'back EMF',
  '\\phi': 'flux per pole',
  Z: 'total conductors',
  N: 'speed (rpm)',
  P: 'no. of poles',
  A: 'parallel paths',
  V: 'supply voltage',
  I_a: 'armature current',
  R_a: 'armature resistance',
  T_a: 'armature torque',
  T_sh: 'shaft torque',
  P_m: 'mechanical power',
  I_L: 'line current',
  I_sh: 'shunt field current',
  R_sh: 'shunt field resistance',
  R_se: 'series field resistance',
  W_c: 'constant loss',
  '\\eta': 'efficiency',
  '\\omega': 'angular speed',
  B: 'flux density',
  l: 'active length',
  I: 'current',
  F: 'force',
  r: 'radius',
  '\\tau': 'torque',
};
