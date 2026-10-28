// "Sparky" — a little graduate with a mortarboard. Poses: idle, talk, think, oops, jab, dab.
// Everything is drawn with smooth curves (no straight segments) so it reads soft at any size.
// The jab (on a correct answer) is a quick SMIL punch: chamber → extend → settle.
// The dab (with the XP toast) flings one arm up and tucks the face into the other elbow.
const INK = '#1b1b1b';
const GOLD = '#f4b400';

// Shoulder → hand curves. Each arm is a soft quadratic curve ending in a round mitten.
const ARMS = {
  idle: [
    { d: 'M34 78 Q23 86 24 96', hand: [24, 97] },
    { d: 'M86 78 Q97 86 96 96', hand: [96, 97] },
  ],
  talk: [
    { d: 'M34 78 Q23 86 24 96', hand: [24, 97] },
    { d: 'M86 78 Q100 76 101 62', hand: [101, 61] },
  ],
  think: [
    { d: 'M34 78 Q23 86 24 96', hand: [24, 97] },
    { d: 'M86 80 Q84 95 71 89', hand: [70, 88] },
  ],
  oops: [
    { d: 'M34 76 Q21 67 27 53', hand: [27, 52] },
    { d: 'M86 76 Q99 67 93 53', hand: [93, 52] },
  ],
  // Guard hand up by the face; the punching arm is animated below.
  jab: [{ d: 'M34 78 Q21 77 29 65', hand: [29, 64] }],
  // Dab: the near arm folded across the face, the far arm flung up and out,
  // both pointing the same way.
  dab: [
    { d: 'M34 80 Q40 60 56 59 Q68 58 79 49', hand: [80, 48], cls: 'dab-tuck' },
    { d: 'M86 78 Q100 65 113 50', hand: [114, 49], cls: 'dab-fling' },
  ],
};

// Punching arm keyframes: chambered by the chest, fully extended, settled slightly back.
const JAB_D = ['M86 78 Q95 86 98 75', 'M86 78 Q102 76 117 71', 'M86 78 Q100 77 113 72'];
const JAB_HAND = [
  [98, 74],
  [118, 71],
  [114, 72],
];
const JAB = { dur: '0.42s', keyTimes: '0;0.35;1', spline: '0.2 0.9 0.3 1;0.4 0 0.2 1' };

function ArmStroke({ d, children }) {
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth="9" fill="none" strokeLinecap="round">{children?.[0]}</path>
      <path d={d} stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round">{children?.[1]}</path>
    </g>
  );
}

function Hand({ x, y, r = 5.2, children }) {
  return (
    <circle cx={x} cy={y} r={r} fill="#fff" stroke={INK} strokeWidth="2.6">
      {children}
    </circle>
  );
}

const animD = (key) => (
  <animate key={key} attributeName="d" values={JAB_D.join(';')} dur={JAB.dur} keyTimes={JAB.keyTimes}
    calcMode="spline" keySplines={JAB.spline} fill="freeze" />
);

function JabArm() {
  const xs = JAB_HAND.map((p) => p[0]).join(';');
  const ys = JAB_HAND.map((p) => p[1]).join(';');
  const common = { dur: JAB.dur, keyTimes: JAB.keyTimes, calcMode: 'spline', keySplines: JAB.spline, fill: 'freeze' };
  return (
    <g>
      <ArmStroke d={JAB_D[2]}>{[animD('a'), animD('b')]}</ArmStroke>
      <Hand x={JAB_HAND[2][0]} y={JAB_HAND[2][1]} r={6.2}>
        <animate attributeName="cx" values={xs} {...common} />
        <animate attributeName="cy" values={ys} {...common} />
      </Hand>
      {/* speed lines flash once at full extension */}
      <g stroke={GOLD} strokeWidth="2.2" strokeLinecap="round" opacity="0">
        <path d="M123 63 Q125 61 127 60" />
        <path d="M126 71 L130 71" />
        <path d="M123 79 Q125 81 127 82" />
        <animate attributeName="opacity" values="0;0;1;0" keyTimes="0;0.3;0.45;1" dur="0.6s" fill="freeze" />
      </g>
    </g>
  );
}

export default function Mascot({ pose = 'idle', speaking = false, size = 84 }) {
  const p = pose;
  const arms = ARMS[p] ?? ARMS.idle;
  const happy = p === 'jab' || p === 'dab';
  const tilt = p === 'jab' ? -5 : p === 'dab' ? -12 : p === 'oops' ? 5 : 0;
  return (
    <svg
      key={p /* remount so the jab and dab replay every time */}
      className={`mascot pose-${p} ${speaking ? 'is-speaking' : ''}`}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-label="Sparky the mascot"
    >
      <ellipse cx="60" cy="114" rx="25" ry="3.5" fill="#000" opacity="0.12" />
      <g className="mascot-bob">
        {/* feet: soft beans */}
        <path d="M39 108 C39 102 57 102 57 108 C57 113 39 113 39 108 Z" fill="#fff" stroke={INK} strokeWidth="2.8" />
        <path d="M63 108 C63 102 81 102 81 108 C81 113 63 113 63 108 Z" fill="#fff" stroke={INK} strokeWidth="2.8" />
        <g transform={`rotate(${tilt} 60 76)`}>
          {/* body: one smooth egg */}
          <path
            d="M60 38 C81 38 93 55 93 77 C93 97 79 107 60 107 C41 107 27 97 27 77 C27 55 39 38 60 38 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="3.2"
          />
          {/* bolt badge, rounded corners */}
          <path d="M62 84 L55 95 L60 95 L57 103 L66 91 L61 91 L64 84 Z" fill={GOLD} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
          {/* cheeks */}
          <ellipse cx="43.5" cy="77" rx="5" ry="3" fill="#ff8fa3" opacity="0.6" />
          <ellipse cx="76.5" cy="77" rx="5" ry="3" fill="#ff8fa3" opacity="0.6" />
          {/* eyes */}
          {happy ? (
            <g stroke={INK} strokeWidth="3.2" fill="none" strokeLinecap="round">
              <path d="M45 69 C47 63 53 63 55 69" />
              <path d="M65 69 C67 63 73 63 75 69" />
            </g>
          ) : p === 'oops' ? (
            <g stroke={INK} strokeWidth="3.2" fill="none" strokeLinecap="round">
              <path d="M45 64 Q51 66 53 68.5 Q51 71 45 73" />
              <path d="M75 64 Q69 66 67 68.5 Q69 71 75 73" />
            </g>
          ) : (
            <g className="mascot-eyes">
              <ellipse cx="50" cy="67" rx="4.5" ry="6" fill={INK} />
              <ellipse cx="70" cy="67" rx="4.5" ry="6" fill={INK} />
              <circle cx="51.5" cy="64.5" r="1.6" fill="#fff" />
              <circle cx="71.5" cy="64.5" r="1.6" fill="#fff" />
            </g>
          )}
          {/* mouth */}
          {speaking ? (
            <ellipse className="mascot-mouth-talk" cx="60" cy="81" rx="5" ry="4" fill={INK} />
          ) : p === 'oops' ? (
            <path d="M54 84 C56 79.5 64 79.5 66 84" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : happy ? (
            <path d="M52 79 C54 88 66 88 68 79 Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          ) : (
            <path d="M53 79 C55 85 65 85 67 79" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* mortarboard: curved band + softened board */}
          <path d="M44 44 Q60 40 76 44 L75 52 Q60 57.5 45 52 Z" fill={INK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <path d="M60 27 L93 37 L60 47.5 L27 37 Z" fill={INK} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="60" cy="37" r="2.2" fill={GOLD} />
          <path className="mascot-tassel" d="M60 37 Q79 37 86 42 Q86.5 48 86 54" stroke={GOLD} strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <rect className="mascot-tassel" x="83.5" y="53" width="5" height="7" rx="2.2" fill={GOLD} />
        </g>
        {arms.map((a, i) => (
          <g key={i} className={a.cls}>
            <ArmStroke d={a.d} />
            <Hand x={a.hand[0]} y={a.hand[1]} r={p === 'jab' ? 6 : 5.2} />
          </g>
        ))}
        {p === 'jab' && <JabArm />}
        {p === 'dab' && (
          <g className="dab-sparks" fill={GOLD}>
            <path d="M104 22 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" />
            <path d="M16 44 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
            <path d="M92 12 l1 3 3 1 -3 1 -1 3 -1 -3 -3 -1 3 -1z" />
          </g>
        )}
        {p === 'think' && (
          <text x="96" y="40" fontSize="20" fontWeight="800" fill={GOLD}>?</text>
        )}
      </g>
    </svg>
  );
}
