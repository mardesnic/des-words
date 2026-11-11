import type { Lang, Language } from './i18n';
import {
  LEVELS,
  isSolved,
  newRound,
  pickWord,
  type Level,
  type Round,
} from './spell';

export type Settings = { language: Language; sound: boolean };

export const initialSettings: Settings = { language: 'auto', sound: true };

export type Stats = { [L in Level]: { solved: number } };

export const initialStats = Object.fromEntries(
  LEVELS.map((l) => [l, { solved: 0 }])
) as Stats;

// The word being spelled, and the last few words, so they don't come again
// too soon.
export type Store = { round?: Round; recent: string[] };

export const initialStore: Store = { recent: [] };

const RECENT = 12;

export function nextRound(
  store: Store,
  lang: Lang,
  level: Level,
  random = Math.random
): Store {
  const word = pickWord(lang, level, store.recent, random);
  return {
    round: newRound(lang, level, word, random),
    recent: [word.word, ...store.recent].slice(0, RECENT),
  };
}

export const recordWin = (stats: Stats, round: Round): Stats =>
  isSolved(round)
    ? { ...stats, [round.level]: { solved: stats[round.level].solved + 1 } }
    : stats;
