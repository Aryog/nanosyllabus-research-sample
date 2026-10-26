import { useMemo, useRef, useState } from 'react';
import { Arrow, C, Compass, Toggle, WireEnd, svgPoint, useRaf } from './common.jsx';

/* ───────────── Teaser: a fan driven by a tiny motor ───────────── */

export function MotorTeaser() {
  const [on, setOn] = useState(false);
  const st = useRef({ angle: 0, w: 0 });
  const [, force] = useState(0);
  useRaf((dt) => {
    const s = st.current;
    const target = on ? 14 : 0;
    s.w += (target - s.w) * Math.min(1, dt * 1.6);
    s.angle = (s.angle + s.w * dt * 57.3) % 360;
    force((n) => n + 1);
  });
  const s = st.current;
  const rpm = Math.round((s.w * 60) / (2 * Math.PI));
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 460 260" className="fig-svg">
        {/* battery + wires */}
        <rect x="40" y="170" width="70" height="36" rx="6" fill="#f3f3f1" stroke="#5c5c5c" strokeWidth="2" />
        <rect x="110" y="180" width="6" height="16" rx="2" fill="#555" />
        <text x="75" y="193" textAnchor="middle" fontSize="13" fill={C.ink} fontWeight="700">9 V</text>
        <path d="M116 188 H170 V150 H196" stroke={on ? C.current : '#555'} strokeWidth="3" fill="none" />
        <path d="M40 188 H24 V230 H230 V178" stroke={on ? C.current : '#555'} strokeWidth="3" fill="none" />
        {/* motor can */}
        <rect x="196" y="120" width="70" height="60" rx="10" fill="#e9e9e6" stroke="#5c5c5c" strokeWidth="2" />
        <rect x="266" y="144" width="40" height="10" fill="#888" />
        <text x="231" y="155" textAnchor="middle" fontSize="12" fill={C.muted} fontWeight="700">DC</text>
        {/* fan */}
        <g transform={`translate(330 149) rotate(${s.angle})`}>
          {[0, 120, 240].map((a) => (
            <path key={a} transform={`rotate(${a})`} d="M0 0 C 18 -10, 60 -14, 78 -4 C 60 8, 20 8, 0 0 Z" fill={C.teal} opacity="0.85" />
          ))}
          <circle r="10" fill="#5c5c5c" />
        </g>
        <text x="330" y="248" textAnchor="middle" fontSize="13" fill={C.muted}>{rpm} rpm</text>
      </svg>
      <div className="controls center">
        <button className={`switch ${on ? 'on' : ''}`} onClick={() => setOn((o) => !o)}>
          <span className="knob" /> {on ? 'Power on' : 'Power off'}
        </button>
      </div>
    </div>
  );
}

/* ───────────── Bar magnet field ───────────── */

const MAG = { cx: 280, cy: 170, half: 100, h: 46 };
const POLES = [
  { x: MAG.cx + MAG.half - 14, y: MAG.cy, q: 1 }, // N (right)
  { x: MAG.cx - MAG.half + 14, y: MAG.cy, q: -1 }, // S (left)
];

function field(x, y) {
  let bx = 0;
  let by = 0;
  for (const p of POLES) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r3 = Math.pow(dx * dx + dy * dy + 30, 1.5);
    bx += (p.q * dx) / r3;
    by += (p.q * dy) / r3;
  }
  return [bx, by];
}

function traceLines() {
  const lines = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.11;
    let x = POLES[0].x + Math.cos(a) * 10;
    let y = POLES[0].y + Math.sin(a) * 10;
    const pts = [[x, y]];
    for (let k = 0; k < 900; k++) {
      const [bx, by] = field(x, y);
      const m = Math.hypot(bx, by) || 1;
      x += (bx / m) * 3;
      y += (by / m) * 3;
      pts.push([x, y]);
      if (Math.hypot(x - POLES[1].x, y - POLES[1].y) < 8) break;
      if (x < -60 || x > 620 || y < -60 || y > 400) break;
    }
    lines.push(pts);
    // Lines that escape the frame never reach S here; the field is mirror-
    // symmetric, so reflect them to get the matching lines entering S.
    const end = pts[pts.length - 1];
    if (Math.hypot(end[0] - POLES[1].x, end[1] - POLES[1].y) >= 8) {
      lines.push(pts.map(([x, y]) => [2 * MAG.cx - x, y]).reverse());
    }
  }
  return lines;
}

function FieldLines({ opacity = 1 }) {
  const lines = useMemo(traceLines, []);
  return (
    <g opacity={opacity}>
      {lines.map((pts, i) => {
        const d = 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L');
        // arrowheads at a third and two-thirds along the line, outside the bar
        const marks = [0.3, 0.7]
          .map((f) => Math.floor(pts.length * f))
          .filter((j) => j > 0 && j < pts.length - 1)
          .filter((j) => !(Math.abs(pts[j][0] - MAG.cx) < MAG.half && Math.abs(pts[j][1] - MAG.cy) < MAG.h / 2 + 4));
        return (
          <g key={i}>
            <path d={d} stroke={C.teal} strokeWidth="1.6" fill="none" opacity="0.7" />
            {marks.map((j) => {
              const [x, y] = pts[j];
              const [x2, y2] = pts[j + 1];
              const ang = (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI;
              return <path key={j} d="M-5 -4 L4 0 L-5 4 Z" fill={C.teal} transform={`translate(${x} ${y}) rotate(${ang})`} />;
            })}
          </g>
        );
      })}
    </g>
  );
}

function BarMagnet() {
  const { cx, cy, half, h } = MAG;
  return (
    <g>
      <rect x={cx - half} y={cy - h / 2} width={half} height={h} rx="6" fill={C.south} />
      <rect x={cx} y={cy - h / 2} width={half} height={h} rx="6" fill={C.north} />
      <rect x={cx - 6} y={cy - h / 2} width="12" height={h} fill={C.north} />
      <rect x={cx - 6} y={cy - h / 2} width="6" height={h} fill={C.south} />
      <text x={cx - half / 2} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff">S</text>
      <text x={cx + half / 2} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="800" fill="#fff">N</text>
    </g>
  );
}

const TARGETS = [
  { x: 280, y: 70, label: 'above' },
  { x: 90, y: 170, label: 'left' },
  { x: 470, y: 170, label: 'right' },
];

export function FieldExplorer({ onSolved, solved, showLines: initialLines = false }) {
  const svgRef = useRef(null);
  const [pos, setPos] = useState({ x: 140, y: 290 });
  const [drag, setDrag] = useState(false);
  const [visited, setVisited] = useState([]);
  const [lines, setLines] = useState(initialLines);
  const [bx, by] = field(pos.x, pos.y);
  const angle = (Math.atan2(by, bx) * 180) / Math.PI;

  const move = (e) => {
    if (!drag) return;
    const p = svgPoint(svgRef.current, e);
    const x = Math.max(24, Math.min(536, p.x));
    const y = Math.max(24, Math.min(316, p.y));
    if (Math.abs(x - MAG.cx) < MAG.half + 20 && Math.abs(y - MAG.cy) < MAG.h / 2 + 20) return;
    setPos({ x, y });
    TARGETS.forEach((t, i) => {
      if (Math.hypot(t.x - x, t.y - y) < 24 && !visited.includes(i)) {
        const v = [...visited, i];
        setVisited(v);
        if (v.length === TARGETS.length) {
          setLines(true);
          onSolved?.();
        }
      }
    });
  };

  return (
    <div className="fig-stack">
      <svg
        ref={svgRef}
        viewBox="0 0 560 340"
        className="fig-svg touch-none"
        onPointerMove={move}
        onPointerUp={() => setDrag(false)}
        onPointerLeave={() => setDrag(false)}
      >
        {lines && <FieldLines />}
        <BarMagnet />
        {onSolved &&
          TARGETS.map((t, i) => (
            <g key={i}>
              <circle cx={t.x} cy={t.y} r="24" fill={visited.includes(i) ? 'rgba(31,157,85,.10)' : 'rgba(59,91,219,.08)'} stroke={visited.includes(i) ? C.green : '#3b5bdb'} strokeDasharray="4 4" strokeWidth="1.5" />
            </g>
          ))}
        <g onPointerDown={(e) => { e.target.setPointerCapture?.(e.pointerId); setDrag(true); }} style={{ cursor: drag ? 'grabbing' : 'grab' }}>
          <circle cx={pos.x} cy={pos.y} r="32" fill="transparent" />
          <Compass x={pos.x} y={pos.y} angle={angle} r={20} glow={drag} />
        </g>
      </svg>
      <div className="controls center">
        <span className="hint">{onSolved && !solved ? 'Drag the compass and watch the needle.' : 'The red tip points along the field.'}</span>
        <button className="chip" onClick={() => setLines((l) => !l)}>{lines ? 'Hide' : 'Show'} field lines</button>
      </div>
    </div>
  );
}

export function MagnetQuestion() {
  return (
    <svg viewBox="0 30 560 180" className="fig-svg" style={{ maxWidth: 460, margin: '0 auto' }}>
      <g transform="translate(0 -20)">
        <BarMagnet />
        <circle cx="280" cy="80" r="22" fill="rgba(59,91,219,.08)" stroke="#3b5bdb" strokeWidth="2" strokeDasharray="4 4" />
        <text x="280" y="88" textAnchor="middle" fontSize="22" fontWeight="800" fill="#3b5bdb">?</text>
      </g>
    </svg>
  );
}

/* ───────────── Ørsted: field around a wire ───────────── */

export function OerstedWire({ onSolved, mode = 'explore', fixedDir = -1 }) {
  const [dir, setDir] = useState(0);
  const [tried, setTried] = useState(new Set());
  const cur = mode === 'question' ? fixedDir : dir;
  const cx = 230;
  const cy = 150;
  const rings = [70, 118];
  const compasses = [];
  for (const r of mode === 'question' ? [] : [92]) {
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const dx = Math.cos(a) * r;
      const dy = Math.sin(a) * r;
      let vx = 0;
      let vy = -1; // Earth's field: "north" is up the screen
      if (cur) {
        const tx = cur === 1 ? dy : -dy;
        const ty = cur === 1 ? -dx : dx;
        const m = Math.hypot(tx, ty);
        vx = tx / m + 0;
        vy = ty / m - 0.12;
      }
      compasses.push({ x: cx + dx, y: cy + dy, angle: (Math.atan2(vy, vx) * 180) / Math.PI });
    }
  }

  const choose = (d) => {
    setDir(d);
    if (!d) return;
    const t = new Set(tried).add(d);
    setTried(t);
    if (t.size === 2) onSolved?.();
  };

  return (
    <div className="fig-stack">
      <svg viewBox="0 0 460 300" className="fig-svg">
        {cur !== 0 && mode !== 'question' &&
          rings.map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="6 10" className={cur === 1 ? 'flow-ccw' : 'flow-cw'} opacity="0.7" />
          ))}
        {mode === 'question' &&
          rings.map((r) => <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="3 7" opacity="0.6" />)}
        {compasses.map((c, i) => (
          <Compass key={i} x={c.x} y={c.y} angle={c.angle} r={14} />
        ))}
        <WireEnd x={cx} y={cy} r={22} dir={cur} />
        {mode === 'question' && (
          <g transform={`translate(${cx} ${cy - 94})`}>
            <circle r="17" fill="#fff" stroke="#3b5bdb" strokeWidth="2" strokeDasharray="4 3" />
            <text y="7" textAnchor="middle" fontSize="20" fontWeight="800" fill="#3b5bdb">?</text>
          </g>
        )}
        {mode !== 'question' && (
          <g transform="translate(400 40)">
            <text textAnchor="middle" fontSize="11" fill={C.muted}>Earth N</text>
            <Arrow x1={0} y1={34} x2={0} y2={8} color={C.muted} width={2} head={7} />
          </g>
        )}
      </svg>
      {mode !== 'question' && (
        <div className="controls center">
          <Toggle
            value={dir}
            onChange={choose}
            options={[
              { value: 0, label: 'Off' },
              { value: 1, label: '⊙ Out of screen' },
              { value: -1, label: '⊗ Into screen' },
            ]}
          />
        </div>
      )}
    </div>
  );
}

/* ───────────── ⊙ / ⊗ : looking along an arrow ───────────── */

export function DotCross({ onSolved }) {
  const [dir, setDir] = useState(1); // 1 = coming toward you, -1 = going away
  const [seen, setSeen] = useState(() => new Set([1]));
  const choose = (d) => {
    setDir(d);
    const t = new Set(seen).add(d);
    setSeen(t);
    if (t.size === 2) onSolved?.();
  };
  const y = 112;
  const [tail, tip] = dir === 1 ? [50, 196] : [196, 50];
  const fx = tail + (dir === 1 ? 10 : -10); // feathers sit just inside the tail
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 460 230" className="fig-svg">
        <text x="125" y="26" textAnchor="middle" fontSize="12" fill={C.muted}>From the side</text>
        <text x="360" y="26" textAnchor="middle" fontSize="12" fill={C.muted}>What your eye sees</text>
        <line x1="258" y1="40" x2="258" y2="200" stroke={C.grid} strokeWidth="2" />
        {/* eye */}
        <g transform={`translate(232 ${y})`}>
          <path d="M -14 0 Q 0 -13 14 0 Q 0 13 -14 0 Z" fill="#fff" stroke="#5c5c5c" strokeWidth="1.5" />
          <circle r="5" fill="#222" />
        </g>
        <line x1="40" y1={y} x2="214" y2={y} stroke={C.muted} strokeDasharray="2 6" />
        <Arrow x1={tail} y1={y} x2={tip} y2={y} color={C.current} width={5} head={16} />
        <g stroke={C.current} strokeWidth="3" strokeLinecap="round">
          <line x1={fx} y1={y} x2={fx + (dir === 1 ? -12 : 12)} y2={y - 11} />
          <line x1={fx} y1={y} x2={fx + (dir === 1 ? -12 : 12)} y2={y + 11} />
        </g>
        <text x="125" y="160" textAnchor="middle" fontSize="13" fill={C.ink}>
          {dir === 1 ? 'Arrow flying toward you' : 'Arrow flying away from you'}
        </text>
        <WireEnd x={360} y={y} r={44} dir={dir} />
        <text x="360" y="186" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.current}>
          {dir === 1 ? '⊙ dot = the tip' : '⊗ cross = the tail feathers'}
        </text>
      </svg>
      <div className="controls center">
        <Toggle
          value={dir}
          onChange={choose}
          options={[
            { value: 1, label: 'Toward you' },
            { value: -1, label: 'Away from you' },
          ]}
        />
      </div>
    </div>
  );
}

/* ───────────── Right-hand grip rule: predict, then see ───────────── */

export function GripRule({ onSolved }) {
  const [dir, setDir] = useState(1); // 1 = ⊙ out of the screen, -1 = ⊗ into it
  const [guess, setGuess] = useState({}); // dir → 'ccw' | 'cw'
  const g = guess[dir];
  const truth = dir === 1 ? 'ccw' : 'cw';
  const predict = (v) => {
    const next = { ...guess, [dir]: v };
    setGuess(next);
    if (next[1] && next[-1]) onSolved?.();
  };
  const cx = 340;
  const cy = 132;
  const compasses = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    const dx = Math.cos(a) * 82;
    const dy = Math.sin(a) * 82;
    const tx = dir === 1 ? dy : -dy;
    const ty = dir === 1 ? -dx : dx;
    return { x: cx + dx, y: cy + dy, angle: (Math.atan2(ty, tx) * 180) / Math.PI };
  });
  // side view: wire runs up the page; the eye looks down it from the top
  const wx = 110;
  const front = dir === 1 ? 1 : -1; // field on the near side of the loop runs right when current flows up
  return (
    <div className="fig-stack">
      <svg viewBox="0 0 460 270" className="fig-svg">
        <text x={wx} y="20" textAnchor="middle" fontSize="12" fill={C.muted}>Side view</text>
        <text x={cx} y="20" textAnchor="middle" fontSize="12" fill={C.muted}>Looking down the wire</text>
        <line x1="228" y1="34" x2="228" y2="250" stroke={C.grid} strokeWidth="2" />
        <g transform={`translate(${wx} 46)`}>
          <path d="M -12 0 Q 0 -11 12 0 Q 0 11 -12 0 Z" fill="#fff" stroke="#5c5c5c" strokeWidth="1.5" />
          <circle r="4" fill="#222" />
        </g>
        <line x1={wx} y1="66" x2={wx} y2="250" stroke="#b08850" strokeWidth="8" strokeLinecap="round" />
        {/* the fist: four curled fingers wrapped round the wire */}
        <rect x={wx - 34} y="148" width="68" height="62" rx="20" fill="#e8b98c" stroke="#c28a5a" opacity="0.92" />
        {[160, 174, 188].map((yy) => (
          <path key={yy} d={`M ${wx - 30} ${yy + 6} Q ${wx} ${yy + 14} ${wx + 30} ${yy + 6}`} fill="none" stroke="#a87a52" strokeWidth="2" />
        ))}
        {/* thumb = current */}
        <Arrow x1={wx + 22} y1={dir === 1 ? 150 : 96} x2={wx + 22} y2={dir === 1 ? 92 : 152} color={C.current} width={6} head={13} />
        <text x={wx + 40} y="122" fontSize="12" fill={C.current}>thumb</text>
        <text x={wx + 40} y="137" fontSize="12" fill={C.current}>= current</text>
        {g && (
          <g>
            <ellipse cx={wx} cy="230" rx="54" ry="13" fill="none" stroke={C.teal} strokeWidth="2" strokeDasharray="5 6" className={dir === 1 ? 'flow-ccw' : 'flow-cw'} />
            <Arrow x1={wx - 14 * front} y1="243" x2={wx + 16 * front} y2="243" color={C.teal} width={3} head={9} />
          </g>
        )}
        {[60, 104].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="6 10"
            className={g ? (dir === 1 ? 'flow-ccw' : 'flow-cw') : ''} opacity={g ? 0.75 : 0.25} />
        ))}
        {g && compasses.map((c, i) => <Compass key={i} x={c.x} y={c.y} angle={c.angle} r={12} />)}
        <WireEnd x={cx} y={cy} r={22} dir={dir} />
        {!g && (
          <text x={cx} y={cy - 70} textAnchor="middle" fontSize="20" fontWeight="800" fill="#3b5bdb">↻ or ↺ ?</text>
        )}
        {g && (
          <text x={cx} y="258" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.teal}>
            {truth === 'ccw' ? '↺ counterclockwise' : '↻ clockwise'}
          </text>
        )}
      </svg>
      <div className="controls center">
        <Toggle
          value={dir}
          onChange={setDir}
          options={[
            { value: 1, label: '⊙ Out of the screen' },
            { value: -1, label: '⊗ Into the screen' },
          ]}
        />
      </div>
      {!g ? (
        <div className="predict">
          <span className="predict-tag">Predict</span>
          <span>Thumb {dir === 1 ? 'toward you' : 'away from you'}. Which way do your fingers curl, as you look down the wire?</span>
          <div className="predict-opts">
            <button className="choice" onClick={() => predict('cw')}>↻ Clockwise</button>
            <button className="choice" onClick={() => predict('ccw')}>↺ Counterclockwise</button>
          </div>
        </div>
      ) : (
        <p className={`status ${g === truth ? 'ok' : 'warn'}`}>
          {g === truth ? 'Right! ' : 'Not quite. '}
          {dir === 1
            ? 'Thumb toward you: your fingers curl counterclockwise.'
            : 'Thumb away from you: your fingers curl clockwise.'}
          {!(guess[1] && guess[-1]) && ' Now try the other direction.'}
        </p>
      )}
    </div>
  );
}
