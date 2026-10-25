// "Sparky" — a little graduate with a mortarboard. Poses: idle, talk, dab, oops, think.
const INK = '#1b1b1b';

function Arm({ d }) {
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="#fff" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

const ARMS = {
  idle: ['M36 80 L24 96', 'M84 80 L96 96'],
  talk: ['M36 80 L24 96', 'M84 78 L100 64'],
  think: ['M36 80 L24 96', 'M84 82 L74 90 L66 86'],
  oops: ['M36 76 L26 56', 'M84 76 L94 56'],
  // Dab: one arm flung up-right, the other folded across the face.
  dab: ['M38 76 L54 60 L84 52', 'M84 74 L110 46'],
};

export default function Mascot({ pose = 'idle', speaking = false, size = 84 }) {
  const arms = ARMS[pose] ?? ARMS.idle;
  const happy = pose === 'dab';
  const tilt = pose === 'dab' ? -12 : pose === 'oops' ? 6 : 0;
  return (
    <svg
      className={`mascot pose-${pose} ${speaking ? 'is-speaking' : ''}`}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-label="Sparky the mascot"
    >
      <ellipse cx="60" cy="114" rx="26" ry="4" fill="#000" opacity="0.35" />
      <g className="mascot-bob">
        {/* feet */}
        <ellipse cx="48" cy="108" rx="9" ry="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <ellipse cx="72" cy="108" rx="9" ry="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <g transform={`rotate(${tilt} 60 74)`}>
          {/* body */}
          <path
            d="M60 40 C84 40 92 60 92 80 C92 98 80 106 60 106 C40 106 28 98 28 80 C28 60 36 40 60 40 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="3.5"
          />
          {/* bolt badge */}
          <path d="M62 84 L55 95 L60 95 L57 103 L66 91 L61 91 L64 84 Z" fill="#ffd43b" stroke={INK} strokeWidth="1.5" strokeLinejoin="round" />
          {/* cheeks */}
          <ellipse cx="44" cy="76" rx="5" ry="3" fill="#ff8fa3" opacity="0.7" />
          <ellipse cx="76" cy="76" rx="5" ry="3" fill="#ff8fa3" opacity="0.7" />
          {/* eyes */}
          {happy ? (
            <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M45 68 Q50 62 55 68" />
              <path d="M65 68 Q70 62 75 68" />
            </g>
          ) : pose === 'oops' ? (
            <g stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M45 63 L53 68 L45 72" />
              <path d="M75 63 L67 68 L75 72" />
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
          ) : pose === 'oops' ? (
            <path d="M54 83 Q60 78 66 83" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M53 79 Q60 86 67 79" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
          )}
          {/* mortarboard */}
          <path d="M44 42 L76 42 L74 52 Q60 56 46 52 Z" fill={INK} />
          <path d="M60 26 L94 37 L60 48 L26 37 Z" fill={INK} stroke="#333" strokeWidth="1" />
          <circle cx="60" cy="37" r="2" fill="#ffd43b" />
          <path className="mascot-tassel" d="M60 37 L86 41 L86 54" stroke="#ffd43b" strokeWidth="2.2" fill="none" />
          <rect className="mascot-tassel" x="83.5" y="53" width="5" height="7" rx="1.5" fill="#ffd43b" />
        </g>
        {arms.map((d, i) => (
          <Arm key={i} d={d} />
        ))}
        {pose === 'think' && (
          <text x="96" y="40" fontSize="20" fontWeight="800" fill="#ffd43b">?</text>
        )}
        {pose === 'dab' && (
          <g fill="#ffd43b">
            <path d="M104 22 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" />
            <path d="M16 40 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
          </g>
        )}
      </g>
    </svg>
  );
}
