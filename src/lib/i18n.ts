import type { Level } from './spell';

export const LANGS = ['en', 'hr'] as const;
export type Lang = (typeof LANGS)[number];
export type Language = 'auto' | Lang;

// Each language's name in that language, for the picker.
export const LANG_NAMES: Record<Lang, string> = {
  en: 'English',
  hr: 'Hrvatski',
};

export function detectLang(): Lang {
  const preferred = navigator.languages ?? [navigator.language];
  return preferred.some((l) => l.toLowerCase().startsWith('hr')) ? 'hr' : 'en';
}

const en = {
  title: 'Words',
  newGame: 'New game',
  settings: 'Settings',
  cancel: 'Cancel',
  done: 'Done',
  levels: {
    three: '3 letters',
    four: '4 letters',
    five: '5 letters',
    long: '6 or more',
  } as Record<Level, string>,
  goal: 'Tap the letters in order',
  say: 'Say the word',
  word: 'Word',
  undo: 'Undo',
  clear: 'Start over',
  solved: 'Well done!',
  next: 'Next word',
  changeLevel: 'Change level',
  language: 'Language',
  automatic: 'Automatic',
  sound: 'Sound and vibration',
  on: 'On',
  off: 'Off',
  statistics: 'Statistics',
  solvedColumn: 'Spelled',
  source: 'Source',
};

export type Strings = typeof en;

const hr: Strings = {
  title: 'Riječi',
  newGame: 'Nova igra',
  settings: 'Postavke',
  cancel: 'Odustani',
  done: 'Gotovo',
  levels: {
    three: '3 slova',
    four: '4 slova',
    five: '5 slova',
    long: '6 i više',
  },
  goal: 'Dodiruj slova redom',
  say: 'Izgovori riječ',
  word: 'Riječ',
  undo: 'Vrati',
  clear: 'Ispočetka',
  solved: 'Bravo!',
  next: 'Sljedeća riječ',
  changeLevel: 'Promijeni razinu',
  language: 'Jezik',
  automatic: 'Automatski',
  sound: 'Zvuk i vibracija',
  on: 'Uključeno',
  off: 'Isključeno',
  statistics: 'Statistika',
  solvedColumn: 'Složeno',
  source: 'Izvorni kod',
};

export const STRINGS: Record<Lang, Strings> = { en, hr };
