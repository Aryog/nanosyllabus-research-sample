/*
  POVs are roles: who is teaching the video. Each role has its own skill
  (.claude/skills/pov-<id>) for script, sound, look, animation and lesson shape.
  A role sets the look and the voice settings; a video may carry its own script
  for a role in `variants: { <id>: { beats?, board?, draw?, viewBox?, tall?, notes?, three? } }`.
  Without one, the video's main script plays in that role's look.

  `look` is a look in src/video/looks.js. `voice` is what the recorder sends to
  ElevenLabs for that role's lines (stability/similarity/style 0–1, speed 0.7–1.2).
  `ref` is the visual reference the look follows.
*/
export const POVS = [
  {
    id: 'lecturer',
    name: 'Lecturer',
    role: 'College lecturer: formal, syllabus and textbook, the answer as IOE marks it',
    ref: 'Science Ready / Indian textbook',
    look: 'book',
    voice: { stability: 1.0, similarity_boost: 0.8, style: 0.0, speed: 1.0 },
  },
  {
    id: 'tutor',
    name: 'Tutor',
    role: 'Private tutor: one-on-one, patient, why before how, worked on the board',
    ref: 'Khan Academy',
    look: 'navy',
    voice: { stability: 0.85, similarity_boost: 0.8, style: 0.3, speed: 0.95 },
  },
  {
    id: 'engineer',
    name: 'Engineer',
    role: 'Practising engineer: the real machine and its model first, numbers with units',
    ref: 'The Engineering Mindset + The Efficient Engineer',
    look: 'blue',
    voice: { stability: 1.0, similarity_boost: 0.8, style: 0.15, speed: 1.0 },
  },
  {
    id: 'senior',
    name: 'Senior',
    role: 'IOE senior (dai/didi): what to write for the marks, traps, memory tricks',
    ref: 'Exam notes',
    look: 'clean',
    voice: { stability: 0.8, similarity_boost: 0.8, style: 0.35, speed: 1.05 },
  },
];

export const povById = (id) => POVS.find((p) => p.id === id);

// The role a segment uses on Auto: Terms → Engineer, Derivation → Tutor,
// Big picture → Lecturer.
export const autoPov = (segment = '') => (segment.startsWith('3/3') ? 'lecturer' : segment.startsWith('2/3') ? 'tutor' : 'engineer');
