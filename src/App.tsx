import { useEffect, useState } from 'react';

import { Board } from './components/Board';
import { Confetti } from './components/Confetti';
import { Icon } from './components/Icon';
import { NewGame, SettingsView } from './components/Menu';
import {
  initialStats,
  initialStore,
  nextRound,
  recordWin,
  type Stats,
  type Store,
} from './lib/game';
import { STRINGS, detectLang } from './lib/i18n';
import { speak, warmUpSpeech } from './lib/speech';
import { isSolved, place, startOver, takeBack, type Level } from './lib/spell';
import { popMenu, pushMenu, useBackButton } from './lib/use-back-button';
import { useCheer } from './lib/use-cheer';
import { useLanguage, useSound } from './lib/use-shared-settings';
import { useStoredState } from './lib/use-stored-state';
import { useWakeLock } from './lib/use-wake-lock';

type View = 'play' | 'new' | 'settings';

export default function App() {
  // Keys are prefixed: other apps on the same GitHub Pages origin share
  // this storage.
  const [store, setStore] = useStoredState<Store>('words', initialStore);
  const [stats, setStats] = useStoredState<Stats>('words-stats', initialStats);

  const [language, setLanguage] = useLanguage();
  const lang = language === 'auto' ? detectLang() : language;
  const t = STRINGS[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.title;
  }, [lang, t]);

  // A word in the other language is swapped for one in this language, at
  // the same level.
  const round = store.round?.lang === lang ? store.round : undefined;
  const switchedLevel = store.round && !round ? store.round.level : undefined;
  useEffect(() => {
    if (switchedLevel) setStore((s) => nextRound(s, lang, switchedLevel));
  }, [switchedLevel, lang, setStore]);

  const [view, setViewState] = useState<View>(store.round ? 'play' : 'new');
  // Menus open over the game, so the phone's Back button closes them.
  const setView = (next: View) => {
    if (next === 'play') popMenu();
    else pushMenu();
    setViewState(next);
  };
  useBackButton(() => {
    if (store.round) setViewState('play');
  });
  const [celebrating, setCelebrating] = useState(false);
  useWakeLock();
  const [sound, setSound] = useSound();
  const cheer = useCheer(sound);
  useEffect(warmUpSpeech, []);

  const say = () => {
    if (round && sound) speak(round.word, round.lang);
  };

  const start = (level: Level) => {
    setStore(nextRound(store, lang, level));
    setView('play');
  };

  const onPick = (tile: number) => {
    if (!round) return false;
    const next = place(round, tile);
    if (next === round) return false;
    if (isSolved(next)) {
      setStats(recordWin(stats, next));
      setCelebrating(true);
      cheer();
      // After the cheer, so the word is heard clearly.
      if (sound) setTimeout(() => speak(next.word, next.lang), 700);
    }
    setStore({ ...store, round: next });
    return true;
  };

  const solved = round && isSolved(round);

  return (
    <main className={view === 'play' && round ? 'app app--play' : 'app'}>
      <header className='header'>
        <h1>{t.title}</h1>
        <div className='header__actions'>
          {view === 'play' ? (
            <>
              <button
                className='button button--small'
                onClick={() => setView('new')}
              >
                {t.newGame}
              </button>
              <button
                className='button button--small'
                onClick={() => setView('settings')}
              >
                {t.settings}
              </button>
            </>
          ) : (
            store.round && (
              <button
                className='button button--small'
                onClick={() => setView('play')}
              >
                {view === 'new' ? t.cancel : t.done}
              </button>
            )
          )}
        </div>
      </header>

      {view === 'new' && <NewGame onStart={start} t={t} />}
      {view === 'settings' && (
        <SettingsView
          language={language}
          setLanguage={setLanguage}
          sound={sound}
          setSound={setSound}
          stats={stats}
          t={t}
        />
      )}

      {view === 'play' && round && (
        <>
          <div className='stage'>
            <Board
              // A new word starts with no tile shaking.
              key={`${round.lang}-${round.word}`}
              round={round}
              onPick={onPick}
              onSay={say}
              t={t}
            />
          </div>

          {solved ? (
            <section className='card solved'>
              <h2>{t.solved}</h2>
              <div className='solved__actions'>
                <button className='button' onClick={() => start(round.level)}>
                  {t.next}
                </button>
                <button
                  className='button button--secondary'
                  onClick={() => setView('new')}
                >
                  {t.changeLevel}
                </button>
              </div>
            </section>
          ) : (
            <div className='bar'>
              <p className='goal'>{t.goal}</p>
              <div className='tools'>
                <button
                  className='tool'
                  onClick={() => setStore({ ...store, round: takeBack(round) })}
                  disabled={!round.placed.length}
                  aria-label={t.undo}
                >
                  <Icon name='undo' />
                </button>
                <button
                  className='tool'
                  onClick={() =>
                    setStore({ ...store, round: startOver(round) })
                  }
                  disabled={!round.placed.length}
                  aria-label={t.clear}
                >
                  <Icon name='clear' />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {view === 'settings' && (
        <footer className='footer'>
          <a href='/des-kids-games/'>{t.allGames}</a>
          <a href='https://github.com/mardesnic/des-words'>{t.source}</a>
        </footer>
      )}
      {celebrating && <Confetti onDone={() => setCelebrating(false)} />}
    </main>
  );
}
