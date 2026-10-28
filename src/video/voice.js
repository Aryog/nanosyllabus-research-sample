/*
  Voice for the video scenes. Each beat's line is pre-recorded with ElevenLabs
  (npm run audio:scenes) into public/audio/scene/<key>.mp3, keyed by a hash of
  the spoken text, so editing a caption simply needs a new clip. Shared by the
  browser player and the generator script.
*/

// Make symbols speakable.
const SPOKEN = [
  [/⊙/g, ' dot '], [/⊗/g, ' cross '], [/φ/g, ' phi '], [/Φ/g, ' phi '], [/Ω/g, ' ohm '], [/∝/g, ' is proportional to '],
  [/→/g, ' to '], [/⟹/g, ', so '], [/↑/g, ' up '], [/↓/g, ' down '], [/²/g, ' squared '], [/√/g, ' root '], [/π/g, ' pi '],
  [/η/g, ' eta '], [/τ/g, ' tau '], [/×/g, ' times '], [/÷/g, ' divided by '], [/−/g, ' minus '], [/≈/g, ' about '],
  [/\bEb\b/g, 'E b'], [/\bIa\b/g, 'I a'], [/\bRa\b/g, 'R a'], [/\bTa\b/g, 'T a'], [/\bIsh\b/g, 'I shunt'], [/\bRsh\b/g, 'R shunt'],
  [/\bIL\b/g, 'I L'], [/\bWc\b/g, 'W c'], [/\bPm\b/g, 'P m'], [/\brpm\b/g, 'R P M'], [/\bIOE\b/g, 'I O E'], [/\bNVC\b/g, 'N V C'], [/\bOLR\b/g, 'O L R'],
];
export const spoken = (t) => SPOKEN.reduce((acc, [re, to]) => acc.replace(re, to), t).replace(/\s+/g, ' ').trim();

// What a beat says aloud: its Devanagari `voice` (or the caption), plus the
// question when it pauses on one.
export const beatText = (b) => `${b.voice ?? b.say ?? ''} ${b.ask ? b.ask.voice ?? b.ask.q : ''}`.trim();

// Nepali lines (Devanagari) are read by the Nepali model; anything else by the English one.
export const isNepali = (t) => /[\u0900-\u097F]/.test(t);

// FNV-1a, 32-bit, as 8 hex chars.
export function voiceKey(text) {
  let h = 0x811c9dc5;
  const s = spoken(text);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

// A whole video's key, from everything it says: its rendered MP4 is
// public/videos/<key>.mp4, so editing any line marks the video for a re-render.
export const videoKey = (beats) => voiceKey(beats.map(beatText).join(' | '));
