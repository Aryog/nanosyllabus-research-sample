import { Arrow, C, Pole } from './kit.jsx';

/*
  Kid-simple doodles for segment 1 (explain it like to a 5-year-old): everyday
  things drawn with thick round strokes, a face on the motor, and a little
  motion (a fan that spins, a phone that buzzes). Use inside a video's `draw`;
  wrap each in a <g className={s.on(k)}> so it comes in on its beat.
*/

const ink = { stroke: C.chalk, strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

// A friendly face, for the motor ("motor-dai").
export function Face({ x, y, r = 30, fill = '#ffe8cc', mood = 'happy' }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} {...ink} />
      <circle cx={x - r * 0.33} cy={y - r * 0.18} r={r * 0.09} fill={C.chalk} />
      <circle cx={x + r * 0.33} cy={y - r * 0.18} r={r * 0.09} fill={C.chalk} />
      {mood === 'happy' ? (
        <path d={`M${x - r * 0.38} ${y + r * 0.2} Q${x} ${y + r * 0.55} ${x + r * 0.38} ${y + r * 0.2}`} fill="none" {...ink} />
      ) : (
        <circle cx={x} cy={y + r * 0.32} r={r * 0.14} fill="none" {...ink} />
      )}
    </g>
  );
}

// Big hand-drawn question mark.
export const Ask = ({ x, y, size = 34, color = C.violet }) => (
  <text x={x} y={y} fontSize={size} fontWeight={800} fill={color} textAnchor="middle" fontFamily="var(--script)">
    ?
  </text>
);

// Small label under or beside a doodle.
export const Note = ({ x, y, children, color = C.dim, size = 12, anchor = 'middle' }) => (
  <text x={x} y={y} fontSize={size} fontWeight={700} fill={color} textAnchor={anchor}>
    {children}
  </text>
);

// A phone with a tiny motor inside; it buzzes.
export function Phone({ x, y }) {
  return (
    <g>
      <g className="doodle-buzz">
        <rect x={x} y={y} width={62} height={112} rx={12} fill="#fff" {...ink} />
        <rect x={x + 7} y={y + 12} width={48} height={74} rx={4} fill="#e7f5ff" stroke={C.dim} strokeWidth={1.2} />
        <circle cx={x + 31} cy={y + 99} r={5} fill="none" stroke={C.dim} strokeWidth={1.5} />
        <circle cx={x + 31} cy={y + 49} r={11} fill="#ffe8cc" stroke={C.orange} strokeWidth={2} />
        <circle cx={x + 31} cy={y + 49} r={3} fill={C.orange} />
      </g>
      {[-1, 1].map((d) => (
        <g key={d} className="doodle-blink" fill="none" stroke={C.orange} strokeWidth={2.2} strokeLinecap="round">
          <path d={`M${x + 31 + d * 42} ${y + 40} q${d * 8} 16 0 32`} />
          <path d={`M${x + 31 + d * 52} ${y + 32} q${d * 12} 24 0 48`} />
        </g>
      ))}
    </g>
  );
}

// A table fan whose blades spin.
export function Fan({ x, y, r = 34 }) {
  return (
    <g>
      <line x1={x} y1={y + r} x2={x} y2={y + r + 34} {...ink} />
      <path d={`M${x - 24} ${y + r + 38} h48`} {...ink} />
      <circle cx={x} cy={y} r={r + 4} fill="none" stroke={C.dim} strokeWidth={1.5} strokeDasharray="4 4" />
      <g className="doodle-spin">
        {[0, 120, 240].map((a) => (
          <ellipse key={a} cx={x} cy={y - r * 0.5} rx={r * 0.26} ry={r * 0.5} fill="#d0ebff" stroke={C.blue} strokeWidth={2} transform={`rotate(${a} ${x} ${y})`} />
        ))}
        <circle cx={x} cy={y} r={6} fill={C.blue} />
      </g>
    </g>
  );
}

// Two magnets with a wire between them, and the wire's push.
export function MagnetWire({ x, y, push = true, current = true }) {
  return (
    <g>
      <Pole x={x} y={y} w={38} h={96} label="N" color={C.north} />
      <Pole x={x + 172} y={y} w={38} h={96} label="S" color={C.south} />
      {[y + 26, y + 70].map((yy) => (
        <Arrow key={yy} x1={x + 44} y1={yy} x2={x + 166} y2={yy} color={C.blue} w={1.2} dash="3 6" />
      ))}
      <circle cx={x + 105} cy={y + 48} r={12} fill="#fff" stroke={C.orange} strokeWidth={3} />
      {current && (
        <g stroke={C.orange} strokeWidth={2.6} strokeLinecap="round">
          <line x1={x + 98} y1={y + 41} x2={x + 112} y2={y + 55} />
          <line x1={x + 112} y1={y + 41} x2={x + 98} y2={y + 55} />
        </g>
      )}
      {push && <Arrow x1={x + 105} y1={y + 34} x2={x + 105} y2={y - 4} color={C.green} w={3.4} head={11} />}
    </g>
  );
}

// A stick person running on a treadmill, with the belt pushing back.
export function Treadmill({ x, y }) {
  return (
    <g>
      <rect x={x} y={y + 70} width={130} height={14} rx={7} fill="#e9ecef" {...ink} />
      <circle cx={x + 10} cy={y + 77} r={4} fill={C.chalk} />
      <circle cx={x + 120} cy={y + 77} r={4} fill={C.chalk} />
      <line x1={x + 118} y1={y + 70} x2={x + 128} y2={y + 6} {...ink} />
      <g className="doodle-run">
        <circle cx={x + 64} cy={y + 10} r={9} fill="#ffe8cc" {...ink} />
        <path d={`M${x + 62} ${y + 19} L${x + 56} ${y + 44} L${x + 44} ${y + 68} M${x + 56} ${y + 44} L${x + 72} ${y + 66} M${x + 60} ${y + 28} L${x + 76} ${y + 36} M${x + 60} ${y + 28} L${x + 46} ${y + 36}`} fill="none" {...ink} />
      </g>
      <Arrow x1={x + 100} y1={y + 98} x2={x + 30} y2={y + 98} color={C.red} w={3} head={10} />
    </g>
  );
}

// A car with a speedometer whose needle stays put (cruise control).
export function Car({ x, y }) {
  return (
    <g>
      <path d={`M${x} ${y + 40} q0 -14 14 -14 h18 l18 -20 h44 l20 20 h16 q14 0 14 14 v12 h-144 z`} fill="#d3f9d8" {...ink} />
      <path d={`M${x + 54} ${y + 10} h36 l14 16 h-58 z`} fill="#e7f5ff" stroke={C.dim} strokeWidth={1.4} />
      {[x + 30, x + 116].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={y + 54} r={12} fill={C.chalk} />
          <circle cx={cx} cy={y + 54} r={4} fill="#fff" />
        </g>
      ))}
    </g>
  );
}

// A dial; `at` 0–1 sets the needle.
export function Dial({ x, y, r = 26, at = 0.5, color = C.green, shake }) {
  const a = Math.PI * (1 - at);
  return (
    <g>
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x + r} ${y}`} fill="#fff" {...ink} />
      <g className={shake ? 'doodle-shake' : ''} style={{ transformOrigin: `${x}px ${y}px` }}>
        <line x1={x} y1={y} x2={x + (r - 6) * Math.cos(a)} y2={y - (r - 6) * Math.sin(a)} stroke={color} strokeWidth={3} strokeLinecap="round" />
      </g>
      <circle cx={x} cy={y} r={3.5} fill={C.chalk} />
    </g>
  );
}

// A crane lifting a heavy box.
export function Crane({ x, y }) {
  return (
    <g>
      <path d={`M${x} ${y + 120} h44 M${x + 22} ${y + 120} V${y} M${x + 4} ${y + 6} H${x + 120} M${x + 22} ${y + 24} L${x + 60} ${y + 6}`} fill="none" {...ink} />
      <g className="doodle-lift">
        <line x1={x + 110} y1={y + 6} x2={x + 110} y2={y + 62} stroke={C.dim} strokeWidth={1.8} />
        <rect x={x + 92} y={y + 62} width={36} height={28} rx={3} fill="#ffe3e3" {...ink} />
        <Note x={x + 110} y={y + 81} color={C.red} size={11}>1 ton</Note>
      </g>
    </g>
  );
}

// A battery.
export function Battery({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width={30} height={52} rx={4} fill="#fff3bf" {...ink} />
      <rect x={x + 9} y={y - 6} width={12} height={6} rx={1.5} fill={C.chalk} />
      <Note x={x + 15} y={y + 22} color={C.chalk} size={14}>+</Note>
      <Note x={x + 15} y={y + 44} color={C.chalk} size={14}>−</Note>
    </g>
  );
}

// Tiny axes with a dashed, unknown curve.
export function MysteryGraph({ x, y, w = 110, h = 80, xLabel, yLabel }) {
  return (
    <g>
      <path d={`M${x} ${y} V${y + h} H${x + w}`} fill="none" {...ink} />
      <path d={`M${x + 8} ${y + h - 14} C${x + w * 0.35} ${y + h * 0.2} ${x + w * 0.6} ${y + h * 0.8} ${x + w - 8} ${y + 14}`} fill="none" stroke={C.violet} strokeWidth={2.4} strokeDasharray="5 6" />
      {xLabel && <Note x={x + w} y={y + h + 14} anchor="end">{xLabel}</Note>}
      {yLabel && <Note x={x - 4} y={y - 6} anchor="start">{yLabel}</Note>}
      <Ask x={x + w * 0.55} y={y + h * 0.45} size={26} />
    </g>
  );
}
