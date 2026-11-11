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
  goal: 'Put the letters in order to spell the word',
  undo: 'Undo',
  clear: 'Start over',
  solved: 'Well done!',
  next: 'Next word',
  language: 'Language',
  automatic: 'Automatic',
  sound: 'Sound and vibration',
  on: 'On',
  off: 'Off',
  source: 'Source',
};

export type Strings = typeof en;

const hr: Strings = {
  title: 'Riječi',
  newGame: 'Nova igra',
  settings: 'Postavke',
  cancel: 'Odustani',
  done: 'Gotovo',
  goal: 'Složi slova da dobiješ riječ',
  undo: 'Vrati',
  clear: 'Ispočetka',
  solved: 'Bravo!',
  next: 'Sljedeća riječ',
  language: 'Jezik',
  automatic: 'Automatski',
  sound: 'Zvuk i vibracija',
  on: 'Uključeno',
  off: 'Isključeno',
  source: 'Izvorni kod',
};

export const STRINGS: Record<Lang, Strings> = { en, hr };
