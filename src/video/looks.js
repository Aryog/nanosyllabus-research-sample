/*
  Looks of the video picture (rules 30–32 in the video-studio skill).
    blue   Brand blue: white ink on a deep blue field, bright marker colours.
           The default for Terms and Derivation.
    book   Textbook page: white paper, black serif ink, thin lines, muted colours.
           The default for the Big picture (IOE model answers).
    board  The original whiteboard.
  'auto' picks blue or book from the segment. The scripts keep using the
  palette `C` (kit.jsx); a look repaints those inks by CSS, so a drawing never
  has to know which look it is in.
*/

export const LOOKS = [
  ['auto', 'Auto'],
  ['blue', 'Blue'],
  ['book', 'Book'],
  ['board', 'Board'],
];

// Palette ink (kit.jsx `C`) → the ink it becomes in each look.
const INK = {
  blue: {
    '#1f2328': '#ffffff', // chalk
    '#6b7280': '#b9cff0', // dim
    '#d0d4da': '#4f7fc0', // faint
    '#e8590c': '#ffc078', // yellow (emphasis)
    '#d9480f': '#ffa94d', // orange (current)
    '#1c7ed6': '#8ee3f5', // blue (field)
    '#e03131': '#ff8f8f', // red
    '#2b8a3e': '#8ce99a', // green (force, answers)
    '#7048e8': '#d0bfff', // violet
    '#fffef9': '#0d4f9e', // board
  },
  book: {
    '#1f2328': '#111111',
    '#6b7280': '#555555',
    '#d0d4da': '#bdbdbd',
    '#e8590c': '#b8460b',
    '#d9480f': '#b8460b',
    '#1c7ed6': '#1d4f91',
    '#e03131': '#a61e1e',
    '#2b8a3e': '#1f6b30',
    '#7048e8': '#4b3aa8',
    '#fffef9': '#ffffff',
  },
};

// SVG fills and strokes, and KaTeX \textcolor spans, repainted per look.
export const lookCss = Object.entries(INK)
  .map(([look, map]) =>
    Object.entries(map)
      .map(([from, to]) =>
        [
          `.scene.look-${look} :is(.scene-svg,.board-line) [fill="${from}"]{fill:${to}}`,
          `.scene.look-${look} :is(.scene-svg,.board-line) [stroke="${from}"]{stroke:${to}}`,
          `.scene.look-${look} .scene-svg [stop-color="${from}"]{stop-color:${to}}`,
          `.scene.look-${look} .board-line [style*="${from}"]{color:${to}!important}`,
        ].join(''),
      )
      .join(''),
  )
  .join('');

// The look a video gets on 'auto': Big picture reads like a textbook.
export const autoLook = (segment = '') => (segment.startsWith('3/3') ? 'book' : 'blue');
