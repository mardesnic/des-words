import type { Lang } from './i18n';
import { WORDS, type Word } from './words';

export const LEVELS = ['three', 'four', 'five', 'long'] as const;
export type Level = (typeof LEVELS)[number];

// The letters of a word, one per tile, in capitals. In Croatian LJ, NJ and
// DŽ are single letters of the alphabet, so each is one tile: KONJ has three.
export function lettersOf(word: string, lang: Lang): string[] {
  const upper = word.toLocaleUpperCase(lang);
  return (
    (lang === 'hr' ? upper.match(/DŽ|LJ|NJ|./gu) : upper.match(/./gu)) ?? []
  );
}

export function levelOf(word: string, lang: Lang): Level {
  const n = lettersOf(word, lang).length;
  return n <= 3 ? 'three' : n === 4 ? 'four' : n === 5 ? 'five' : 'long';
}

export const wordsAt = (lang: Lang, level: Level): Word[] =>
  WORDS[lang].filter((w) => levelOf(w.word, lang) === level);

export type Round = {
  lang: Lang;
  level: Level;
  emoji: string;
  word: string;
  // The letters in the right order.
  answer: string[];
  // The tiles to pick from, mixed up. Placed tiles keep their spot here.
  pool: string[];
  // Which pool tiles have been put in the word, in order.
  placed: number[];
};

type Random = () => number;

function shuffle<T>(items: T[], random: Random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// The letters mixed up, never left in the right order (unless every
// order spells the word, as with a word of one repeated letter).
export function mix(answer: string[], random: Random): string[] {
  if (new Set(answer).size < 2) return [...answer];
  for (;;) {
    const pool = shuffle(answer, random);
    if (pool.join() !== answer.join()) return pool;
  }
}

export function newRound(
  lang: Lang,
  level: Level,
  { emoji, word }: Word,
  random: Random
): Round {
  const answer = lettersOf(word, lang);
  return {
    lang,
    level,
    emoji,
    word,
    answer,
    pool: mix(answer, random),
    placed: [],
  };
}

// A word at that level, avoiding the ones played recently while there are
// others left.
export function pickWord(
  lang: Lang,
  level: Level,
  recent: string[],
  random: Random
): Word {
  const all = wordsAt(lang, level);
  const fresh = all.filter((w) => !recent.includes(w.word));
  const from = fresh.length ? fresh : all;
  return from[Math.floor(random() * from.length)];
}

export const isSolved = (round: Round) =>
  round.placed.length === round.answer.length;

// Tapping a tile puts it in the next empty spot, but only if it is the
// right letter. Returns the same round when it isn't (or was already used).
export function place(round: Round, tile: number): Round {
  if (isSolved(round) || round.placed.includes(tile)) return round;
  if (round.pool[tile] !== round.answer[round.placed.length]) return round;
  return { ...round, placed: [...round.placed, tile] };
}

export const takeBack = (round: Round): Round =>
  isSolved(round) || !round.placed.length
    ? round
    : { ...round, placed: round.placed.slice(0, -1) };

export const startOver = (round: Round): Round =>
  isSolved(round) ? round : { ...round, placed: [] };
