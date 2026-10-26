import { useState } from 'react';

// Worked example revealed one step at a time. Solves when every step is shown.
export function WorkedExample({ title = 'Worked example', given, steps, onSolved }) {
  const [shown, setShown] = useState(1);
  const reveal = () => {
    const n = shown + 1;
    setShown(n);
    if (n >= steps.length) onSolved?.();
  };
  return (
    <div className="worked">
      <div className="worked-head">
        <span className="worked-tag">{title}</span>
        {given && <div className="worked-given">{given}</div>}
      </div>
      <ol className="worked-steps">
        {steps.slice(0, shown).map((s, i) => (
          <li key={i} className="worked-step">
            {s}
          </li>
        ))}
      </ol>
      {shown < steps.length ? (
        <button className="chip primary" onClick={reveal}>
          Show next step ({shown}/{steps.length})
        </button>
      ) : (
        <div className="worked-done">✓ That’s the full method</div>
      )}
    </div>
  );
}

// Flip cards: tap each card to reveal the back. Solves when all are flipped.
export function FlipCards({ cards, onSolved }) {
  const [open, setOpen] = useState(() => new Set());
  const flip = (i) => {
    const next = new Set(open).add(i);
    setOpen(next);
    // Opening one card is enough to move on; the others stay available.
    onSolved?.();
  };
  return (
    <div className="flip-grid">
      {cards.map((c, i) => (
        <button key={i} className={`flip ${open.has(i) ? 'open' : ''}`} onClick={() => flip(i)}>
          <span className="flip-front">
            {c.icon && <span className="flip-icon">{c.icon}</span>}
            <b>{c.front}</b>
            {!open.has(i) && <span className="flip-tap">tap to reveal</span>}
          </span>
          {open.has(i) && <span className="flip-back">{c.back}</span>}
        </button>
      ))}
    </div>
  );
}

export function Callout({ kind = 'ioe', children }) {
  const label = kind === 'ioe' ? 'IOE exam tip' : kind === 'remember' ? 'Remember' : 'Note';
  return (
    <div className={`callout callout-${kind}`}>
      <span className="callout-label">{label}</span>
      {children}
    </div>
  );
}
