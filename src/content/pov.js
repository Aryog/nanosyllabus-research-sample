/*
  POVs: the four ways a video can be told, each modelled on a reference channel
  and owned by its own skill (.claude/skills/pov-<id>). A POV sets the look,
  the voice settings and how the script is written; a video may carry its own
  script for a POV in `variants: { <id>: { beats, board, draw?, viewBox?, tall?, notes?, three? } }`.
  Without one, the video's main script plays in that POV's look.

  `look` is a look in src/video/looks.js. `voice` is what the recorder sends to
  ElevenLabs for that POV's lines (stability/similarity/style 0–1, speed 0.7–1.2).
*/
export const POVS = [
  {
    id: 'mindset',
    name: 'Mindset',
    channel: 'The Engineering Mindset',
    look: 'blue',
    voice: { stability: 1.0, similarity_boost: 0.8, style: 0.15, speed: 1.0 },
    blurb: 'Real machine first, then how it works',
  },
  {
    id: 'khan',
    name: 'Board',
    channel: 'Khan Academy',
    look: 'navy',
    voice: { stability: 0.85, similarity_boost: 0.8, style: 0.3, speed: 0.95 },
    blurb: 'Handwritten, step by step, why before how',
  },
  {
    id: 'efficient',
    name: 'Maths',
    channel: 'The Efficient Engineer',
    look: 'clean',
    voice: { stability: 1.0, similarity_boost: 0.8, style: 0.1, speed: 0.95 },
    blurb: 'Symbols on the figure, then the equation',
  },
  {
    id: 'exam',
    name: 'Exam',
    channel: 'Science Ready',
    look: 'book',
    voice: { stability: 1.0, similarity_boost: 0.8, style: 0.0, speed: 1.0 },
    blurb: 'Textbook answer the way IOE marks it',
  },
];

export const povById = (id) => POVS.find((p) => p.id === id);

// The POV a segment uses on Auto: Terms → Mindset, Derivation → Board (Khan),
// Big picture → Exam (Science Ready).
export const autoPov = (segment = '') => (segment.startsWith('3/3') ? 'exam' : segment.startsWith('2/3') ? 'khan' : 'mindset');
