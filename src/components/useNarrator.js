import { useCallback, useEffect, useRef, useState } from 'react';
import { narration } from '../content/narration.js';

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
      if (!text) return;
      stop();
      if (muted) return;
      if (manifest[id]) {
        const a = new Audio(`${BASE}audio/${id}.mp3?v=${manifest[id]}`);
        audioRef.current = a;
        a.onplay = () => setSpeaking(true);
        a.onended = a.onerror = () => setSpeaking(false);
        a.play().catch(() => setSpeaking(false));
      } else if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.05;
        u.pitch = 1.35;
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
