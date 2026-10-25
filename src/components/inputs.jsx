import { useState } from 'react';

// Built-in answer inputs. Each gets { value, setValue, status, input }.
// status: 'idle' | 'correct' | 'wrong' | 'revealed'

export function ChoiceInput({ value, setValue, status, input }) {
  const locked = status === 'correct' || status === 'revealed';
  return (
    <div className={`choices ${input.columns === 2 ? 'cols-2' : ''}`}>
      {input.options.map((opt, i) => {
        const selected = value === i;
        const isAnswer = i === input.answer;
        let cls = 'choice';
        if (selected) cls += ' selected';
        if (locked && isAnswer) cls += ' right';
        if (status === 'wrong' && selected) cls += ' wrong';
        return (
          <button key={i} className={cls} disabled={locked} onClick={() => setValue(i)}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// Brilliant-style "drag a tile into the blank". Tap a tile to drop it into the
// next empty slot; tap a filled slot to send the tile back.
export function TileInput({ value, setValue, status, input }) {
  const slots = value ?? Array(input.answer.length).fill(null);
  const locked = status === 'correct' || status === 'revealed';
  const shown = status === 'revealed' ? input.answer.map((a) => input.tiles.indexOf(a)) : slots;

  const place = (tileIdx) => {
    if (locked) return;
    const next = [...slots];
    const empty = next.indexOf(null);
    if (empty === -1) return;
    next[empty] = tileIdx;
    setValue(next);
  };
  const remove = (slotIdx) => {
    if (locked) return;
    const next = [...slots];
    next[slotIdx] = null;
    setValue(next);
  };

  let slotNo = 0;
  return (
    <div className="tiles-wrap">
      <div className={`tile-card ${locked ? 'ok' : ''} ${input.inline ? 'inline' : ''}`}>
        {locked && <span className="tile-check">✓</span>}
        {input.template.map((line, li) => (
          <div className="tile-line" key={li}>
            {line.map((part, pi) => {
              if (part !== '_') return <span key={pi} className="tile-text">{part}</span>;
              const s = slotNo++;
              const t = shown[s];
              const bad = status === 'wrong' && t !== null && input.tiles[t] !== input.answer[s];
              return (
                <button key={pi} className={`slot ${t !== null ? 'filled' : ''} ${bad ? 'bad' : ''} ${locked ? 'ok' : ''}`} onClick={() => remove(s)}>
                  {t !== null ? input.tiles[t] : ''}
                  {bad && <span className="slot-x">×</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="tile-bank">
        {input.tiles.map((t, i) => (
          <button key={i} className="tile" disabled={locked} onClick={() => place(i)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tap-to-sort: the highlighted card drops into whichever bucket you tap.
// input: { buckets: [name…], items: [{ label, bucket }] }; value: bucket index | null per item.
export function SortInput({ value, setValue, status, input }) {
  const n = input.items.length;
  const placed = status === 'revealed' ? input.items.map((it) => it.bucket) : value ?? Array(n).fill(null);
  const locked = status === 'correct' || status === 'revealed';
  const [pick, setPick] = useState(null);
  const free = placed.map((b, i) => (b === null ? i : -1)).filter((i) => i >= 0);
  const sel = pick !== null && placed[pick] === null ? pick : free[0] ?? null;
  const drop = (b) => {
    if (locked || sel === null) return;
    const next = [...placed];
    next[sel] = b;
    setPick(null);
    setValue(next);
  };
  const lift = (i, e) => {
    e.stopPropagation();
    if (locked) return;
    const next = [...placed];
    next[i] = null;
    setPick(i);
    setValue(next);
  };
  return (
    <div className="sort-wrap">
      <div className="tile-bank sort-bank">
        {free.length === 0 && <span className="muted">All sorted. Tap a card to move it back.</span>}
        {free.map((i) => (
          <button key={i} className={`tile sort-tile ${i === sel ? 'sel' : ''}`} disabled={locked} onClick={() => setPick(i)}>
            {input.items[i].label}
          </button>
        ))}
      </div>
      {!locked && sel !== null && <div className="sort-help">Tap a bucket to drop <b>{input.items[sel].label}</b> in it</div>}
      <div className="sort-buckets" style={{ '--cols': input.buckets.length }}>
        {input.buckets.map((name, b) => (
          <div key={name} className={`bucket ${sel !== null && !locked ? 'armed' : ''}`} onClick={() => drop(b)} role="button" tabIndex={0}>
            <div className="bucket-name">{name}</div>
            {placed.map((pb, i) => {
              if (pb !== b) return null;
              const bad = status === 'wrong' && input.items[i].bucket !== b;
              return (
                <button key={i} className={`slot filled sort-chip ${bad ? 'bad' : ''} ${locked ? 'ok' : ''}`} onClick={(e) => lift(i, e)}>
                  {input.items[i].label}
                  {bad && <span className="slot-x">×</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Put-in-order: tap cards to fill numbered slots; tap a slot to send it back.
// input: { items: [...in the correct order], pool?: [shuffled indices] }; value: item index | null per slot.
const shuffled = (n) => {
  let seed = n * 9301 + 49297;
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.every((x, i) => x === i) ? a.reverse() : a;
};
export function OrderInput({ value, setValue, status, input }) {
  const n = input.items.length;
  const slots = status === 'revealed' ? [...Array(n).keys()] : value ?? Array(n).fill(null);
  const locked = status === 'correct' || status === 'revealed';
  const pool = input.pool ?? shuffled(n);
  const place = (i) => {
    if (locked) return;
    const next = [...slots];
    const empty = next.indexOf(null);
    if (empty === -1) return;
    next[empty] = i;
    setValue(next);
  };
  const remove = (s) => {
    if (locked) return;
    const next = [...slots];
    next[s] = null;
    setValue(next);
  };
  return (
    <div className="order-wrap">
      <ol className="order-slots">
        {slots.map((t, s) => {
          const bad = status === 'wrong' && t !== null && t !== s;
          return (
            <li key={s}>
              <span className="order-no">{s + 1}</span>
              <button className={`slot order-slot ${t !== null ? 'filled' : ''} ${bad ? 'bad' : ''} ${locked ? 'ok' : ''}`} onClick={() => remove(s)}>
                {t !== null ? input.items[t] : ''}
                {bad && <span className="slot-x">×</span>}
              </button>
            </li>
          );
        })}
      </ol>
      <div className="tile-bank order-bank">
        {pool.filter((i) => !slots.includes(i)).map((i) => (
          <button key={i} className="tile sort-tile" disabled={locked} onClick={() => place(i)}>
            {input.items[i]}
          </button>
        ))}
      </div>
    </div>
  );
}

export const INPUTS = {
  choice: {
    Component: ChoiceInput,
    complete: (v) => v !== null && v !== undefined,
    correct: (v, input) => v === input.answer,
    retry: () => null,
    reveal: (input) => input.answer,
  },
  tiles: {
    Component: TileInput,
    complete: (v) => Array.isArray(v) && v.every((x) => x !== null),
    correct: (v, input) => v.every((t, i) => input.tiles[t] === input.answer[i]),
    // Keep the blanks that were right, empty the rest.
    retry: (v, input) => v.map((t, i) => (input.tiles[t] === input.answer[i] ? t : null)),
  },
  sort: {
    Component: SortInput,
    complete: (v) => Array.isArray(v) && v.every((x) => x !== null),
    correct: (v, input) => v.every((b, i) => input.items[i].bucket === b),
    // Keep the cards in the right bucket, send the rest back to the bank.
    retry: (v, input) => v.map((b, i) => (input.items[i].bucket === b ? b : null)),
    reveal: (input) => input.items.map((it) => it.bucket),
  },
  order: {
    Component: OrderInput,
    complete: (v) => Array.isArray(v) && v.every((x) => x !== null),
    correct: (v) => v.every((t, i) => t === i),
    retry: (v) => v.map((t, i) => (t === i ? t : null)),
    reveal: (input) => input.items.map((_, i) => i),
  },
};
