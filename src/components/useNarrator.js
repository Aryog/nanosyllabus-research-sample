import { useCallback, useEffect, useRef, useState } from 'react';
import { narration, speech } from '../content/narration.js';

const BASE = import.meta.env.BASE_URL;

// Plays ElevenLabs clips from public/audio when they exist, otherwise falls
// back to the browser's speech synthesis so Sparky always has a voice.
export function useNarrator() {
  const [manifest, setManifest] = useState({});
  const [caption, setCaption] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('dcm-muted') === '1';
    } catch {
      return false;
    }
  });
  const audioRef = useRef(null);
  const lastId = useRef(null);

  useEffect(() => {
    fetch(`${BASE}audio/manifest.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .then(setManifest)
      .catch(() => {});
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const play = useCallback(
    (id) => {
      const text = narration[id];
      stop();
      if (!text) return;
      if (muted) return;
      if (manifest[id]) {
        const a = new Audio(`${BASE}audio/${id}.mp3?v=${manifest[id]}`);
        audioRef.current = a;
        a.onplay = () => setSpeaking(true);
        a.onended = a.onerror = () => setSpeaking(false);
        a.play().catch(() => setSpeaking(false));
      } else if ('speechSynthesis' in window) {
        // Fallback voice reads the Devanagari line; Hindi voices handle it if no Nepali one exists.
        const u = new SpeechSynthesisUtterance(speech[id] ?? text);
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find((x) => x.lang?.startsWith('ne')) ?? voices.find((x) => x.lang?.startsWith('hi'));
        if (v) u.voice = v;
        u.lang = v?.lang ?? 'ne-NP';
        u.rate = 1;
        u.pitch = 1.2;
        u.onstart = () => setSpeaking(true);
        u.onend = u.onerror = () => setSpeaking(false);
        window.speechSynthesis.speak(u);
      }
    },
    [manifest, muted, stop],
  );

  const say = useCallback(
    (id) => {
      lastId.current = id;
      setCaption(narration[id] ?? '');
      play(id);
    },
    [play],
  );

  const replay = useCallback(() => lastId.current && play(lastId.current), [play]);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      try {
        localStorage.setItem('dcm-muted', next ? '1' : '0');
      } catch {}
      if (next) stop();
      return next;
    });
  }, [stop]);

  useEffect(() => stop, [stop]);

  return { say, replay, caption, speaking, muted, toggleMute, stop };
}
