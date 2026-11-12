import { useEffect, useState, type CSSProperties } from 'react';

import type { Strings } from '../lib/i18n';
import { isSolved, type Round } from '../lib/spell';

// The picture, the spots for the word, and the tiles to pick from. A tap on
// a wrong tile gives it a little shake; the right one jumps into the word.
export function Board({
  round,
  onPick,
  onSay,
  t,
}: {
  round: Round;
  onPick: (tile: number) => boolean;
  onSay: () => void;
  t: Strings;
}) {
  const [wrong, setWrong] = useState<{ tile: number; at: number }>();
  useEffect(() => {
    if (!wrong) return;
    const timer = setTimeout(() => setWrong(undefined), 450);
    return () => clearTimeout(timer);
  }, [wrong]);

  const solved = isSolved(round);
  const n = round.answer.length;
  // Up to seven tiles fit in one row; longer words take two even rows.
  const row = n <= 7 ? n : Math.ceil(n / 2);
  const pick = (tile: number) => {
    if (onPick(tile)) {
      navigator.vibrate?.(10);
    } else {
      setWrong({ tile, at: Date.now() });
      navigator.vibrate?.([40, 60, 40]);
    }
  };

  return (
    <div className='board' style={{ '--n': n, '--row': row } as CSSProperties}>
      <button
        className={solved ? 'picture picture--solved' : 'picture'}
        onClick={onSay}
        aria-label={t.say}
      >
        <span aria-hidden='true'>{round.emoji}</span>
      </button>

      <div className='slots' aria-label={t.word}>
        {round.answer.map((letter, i) => {
          const filled = i < round.placed.length;
          const next = i === round.placed.length;
          return (
            <span
              key={i}
              className={
                'slot' +
                (filled ? ' slot--filled' : '') +
                (next ? ' slot--next' : '') +
                (solved ? ' slot--solved' : '')
              }
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {filled ? letter : ''}
            </span>
          );
        })}
      </div>

      {/* Once the word is spelled, the empty tiles are not needed. */}
      <div className={solved ? 'pool pool--done' : 'pool'}>
        {round.pool.map((letter, i) => {
          const used = round.placed.includes(i);
          return (
            <button
              // A new key restarts the shake on a second wrong tap.
              key={wrong?.tile === i ? `${i}-${wrong.at}` : i}
              className={
                'tile' +
                (used ? ' tile--used' : '') +
                (wrong?.tile === i ? ' tile--wrong' : '')
              }
              onClick={() => pick(i)}
              disabled={used || solved}
              aria-label={letter}
            >
              {used ? '' : letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
