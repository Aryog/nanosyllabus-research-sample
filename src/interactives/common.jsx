import { useEffect, useRef } from 'react';

export const C = {
  // Light theme: every colour must read on a white card.
  teal: '#0f9d84',
  green: '#1f9d55',
  north: '#e03131',
  south: '#3b5bdb',
  force: '#e8590c',
  current: '#d98e04',
  ink: '#1a1a1a',
  muted: '#71716c',
  grid: '#e6e6e3',
  panel: '#f3f3f1',
  // neutrals for drawings (wires, metal, plates)
  wire: '#5c5c5c',
  metal: '#9a9ea6',
  copper: '#c06a1f',
  fill: '#ffffff',
};

// Calls cb(dt seconds) every animation frame while `active`.
export function useRaf(cb, active = true) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  useEffect(() => {
    if (!active) return;
    let id;
    let last = performance.now();
    const loop = (t) => {
      const dt = Math.min((t - last) / 1000, 1 / 20);
      last = t;
      cbRef.current(dt);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active]);
}

// Client → SVG user coordinates.
export function svgPoint(svg, e) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

export function Arrow({ x1, y1, x2, y2, color, width = 4, head = 10, opacity = 1 }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 2) return null;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const bx = x2 - ux * head;
  const by = y2 - uy * head;
  const px = -uy * head * 0.6;
  const py = ux * head * 0.6;
  return (
    <g opacity={opacity}>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <path d={`M${x2} ${y2} L${bx + px} ${by + py} L${bx - px} ${by - py} Z`} fill={color} />
    </g>
  );
}

// Wire cross-section: dot = current out of the screen, cross = into it.
export function WireEnd({ x, y, r = 18, dir, color = C.current }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={dir ? color : C.muted} strokeWidth="3" />
      {dir === 1 && <circle cx={x} cy={y} r={r * 0.28} fill={color} />}
      {dir === -1 && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1={x - r * 0.45} y1={y - r * 0.45} x2={x + r * 0.45} y2={y + r * 0.45} />
          <line x1={x + r * 0.45} y1={y - r * 0.45} x2={x - r * 0.45} y2={y + r * 0.45} />
        </g>
      )}
    </g>
  );
}

export function Slider({ label, value, min, max, step, onChange, unit, fmt = (v) => v }) {
  return (
    <label className="slider">
      <span className="slider-label">
        {label}
        <b>
          {fmt(value)} {unit}
        </b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </label>
  );
}

export function Toggle({ options, value, onChange }) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button key={String(o.value)} className={value === o.value ? 'on' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Compass({ x, y, angle, r = 18, glow }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r + 3} fill="#fff" stroke={glow ? C.green : '#9a9a9a'} strokeWidth="2" />
      <g className="needle" style={{ transform: `rotate(${angle}deg)` }}>
        <path d={`M0 -4 L${r - 2} 0 L0 4 Z`} fill={C.north} />
        <path d={`M0 -4 L${-(r - 2)} 0 L0 4 Z`} fill="#b4b4b0" />
      </g>
      <circle r="2.5" fill="#1a1a1a" />
    </g>
  );
}
