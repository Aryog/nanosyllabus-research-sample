import { useEffect, useRef } from 'react';

/*
  A 3D picture for a Scene, drawn with three.js (loaded only when a 3D video
  opens). The content module builds its objects once and gets called every
  frame with the scene's clock, so pause, seek and the offline MP4 render all
  match the rest of the video:

    build(THREE, scene) → update({ beat, ms, dt, camera })

  `ms` is the time into the current beat (the scene clock), `dt` how much it
  moved since the last frame (0 while paused). Dragging turns the view
  around; a double-click puts it back.
*/
export default function Stage3D({ build, beat, clock, aspect = 16 / 10 }) {
  const box = useRef(null);
  const beatRef = useRef(beat);
  beatRef.current = beat;

  useEffect(() => {
    const el = box.current;
    let live = true;
    let stop = () => {};
    import('three').then((THREE) => {
      if (!live) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, aspect, 0.1, 100);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xb0b4ba, 1.6));
      const sun = new THREE.DirectionalLight(0xffffff, 1.8);
      sun.position.set(-4, 6, 7);
      scene.add(sun);
      const update = build(THREE, scene);

      // Drag to look around: yaw and pitch added on top of the beat's shot.
      const look = { yaw: 0, pitch: 0, drag: null };
      const down = (e) => {
        look.drag = { x: e.clientX, y: e.clientY, yaw: look.yaw, pitch: look.pitch };
        el.setPointerCapture(e.pointerId);
      };
      const move = (e) => {
        if (!look.drag) return;
        look.yaw = look.drag.yaw - (e.clientX - look.drag.x) * 0.008;
        look.pitch = Math.max(-0.6, Math.min(0.9, look.drag.pitch + (e.clientY - look.drag.y) * 0.006));
      };
      const up = () => (look.drag = null);
      const reset = () => Object.assign(look, { yaw: 0, pitch: 0 });
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('dblclick', reset);

      const size = () => {
        const w = el.clientWidth;
        renderer.setSize(w, w / aspect, false);
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(el);

      let raf;
      let last = clock.current;
      let lastBeat = beatRef.current;
      const frame = () => {
        raf = requestAnimationFrame(frame);
        const ms = clock.current;
        const b = beatRef.current;
        const dt = b === lastBeat ? Math.max(0, ms - last) : 0;
        last = ms;
        lastBeat = b;
        update({ beat: b, ms, dt, camera, look });
        renderer.render(scene, camera);
      };
      frame();
      stop = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        el.removeEventListener('dblclick', reset);
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    return () => {
      live = false;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [build]);

  return <div ref={box} className="stage3d" title="Drag garera ghumau · double-click le reset" />;
}
