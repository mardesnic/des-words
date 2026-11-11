import { describe, expect, it } from 'vitest';

import { LANGS } from './i18n';
import {
  LEVELS,
  isSolved,
  lettersOf,
  levelOf,
  mix,
  newRound,
  pickWord,
  place,
  startOver,
  takeBack,
  wordsAt,
} from './spell';
import { WORDS } from './words';

// A repeatable stand-in for Math.random.
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

describe('lettersOf', () => {
  it('splits a word into capital letters', () => {
    expect(lettersOf('cat', 'en')).toEqual(['C', 'A', 'T']);
    expect(lettersOf('mačka', 'hr')).toEqual(['M', 'A', 'Č', 'K', 'A']);
  });

  it('keeps Croatian LJ, NJ and DŽ as one letter', () => {
    expect(lettersOf('konj', 'hr')).toEqual(['K', 'O', 'NJ']);
    expect(lettersOf('ključ', 'hr')).toEqual(['K', 'LJ', 'U', 'Č']);
    expect(lettersOf('džep', 'hr')).toEqual(['DŽ', 'E', 'P']);
  });

  it('does not join letters in English', () => {
    expect(lettersOf('banjo', 'en')).toHaveLength(5);
  });
});

describe('levelOf', () => {
  it('goes by the number of letters', () => {
    expect(levelOf('konj', 'hr')).toBe('three');
    expect(levelOf('fish', 'en')).toBe('four');
    expect(levelOf('mačka', 'hr')).toBe('five');
    expect(levelOf('banana', 'en')).toBe('long');
  });
});

describe('word lists', () => {
  for (const lang of LANGS) {
    it(`${lang} has plenty of words at every level`, () => {
      for (const level of LEVELS)
        expect(wordsAt(lang, level).length).toBeGreaterThanOrEqual(20);
    });

    it(`${lang} has no word or picture twice`, () => {
      const words = WORDS[lang].map((w) => w.word);
      const emojis = WORDS[lang].map((w) => w.emoji);
      expect(new Set(words).size).toBe(words.length);
      expect(new Set(emojis).size).toBe(emojis.length);
    });

    it(`${lang} words use only that language's letters`, () => {
      const letters = lang === 'hr' ? /^[a-pr-vzčćđšž]+$/ : /^[a-z]+$/;
      for (const { word } of WORDS[lang]) expect(word).toMatch(letters);
    });
  }
});

describe('mix', () => {
  it('never leaves the letters in the right order', () => {
    const random = seeded(1);
    for (let i = 0; i < 200; i++) {
      const pool = mix(['P', 'A', 'S'], random);
      expect(pool.join('')).not.toBe('PAS');
      expect([...pool].sort()).toEqual(['A', 'P', 'S']);
    }
  });
});

describe('a round', () => {
  const round = () =>
    newRound('en', 'three', { emoji: '🐱', word: 'cat' }, seeded(3));
  const tileOf = (r: ReturnType<typeof round>, letter: string) =>
    r.pool.findIndex((l, i) => l === letter && !r.placed.includes(i));

  it('takes only the next right letter', () => {
    const r = round();
    expect(place(r, tileOf(r, 'A'))).toBe(r);
    const c = place(r, tileOf(r, 'C'));
    expect(c.placed).toHaveLength(1);
    expect(place(c, c.placed[0])).toBe(c);
  });

  it('is solved when every letter is in place', () => {
    let r = round();
    for (const letter of r.answer) r = place(r, tileOf(r, letter));
    expect(isSolved(r)).toBe(true);
    expect(takeBack(r)).toBe(r);
    expect(startOver(r)).toBe(r);
  });

  it('accepts either of two same letters', () => {
    let r = newRound('en', 'long', { emoji: '🍌', word: 'banana' }, seeded(5));
    const as = r.pool.flatMap((l, i) => (l === 'A' ? [i] : []));
    r = place(r, tileOf(r, 'B'));
    expect(place(r, as[2]).placed).toHaveLength(2);
  });

  it('can take back a letter or start over', () => {
    let r = round();
    r = place(r, tileOf(r, 'C'));
    r = place(r, tileOf(r, 'A'));
    expect(takeBack(r).placed).toHaveLength(1);
    expect(startOver(r).placed).toEqual([]);
  });
});

describe('pickWord', () => {
  it('avoids recent words while others are left', () => {
    const all = wordsAt('en', 'three').map((w) => w.word);
    const recent = all.slice(1);
    expect(pickWord('en', 'three', recent, seeded(7)).word).toBe(all[0]);
    expect(all).toContain(pickWord('en', 'three', all, seeded(7)).word);
  });
});
