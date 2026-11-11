import type { Lang } from './i18n';

// Says a word with the phone's own voice, when it has one for the language.
// Many phones speak offline; when there is no voice, nothing happens.

const LOCALES: Record<Lang, string> = { en: 'en-US', hr: 'hr-HR' };

const voiceFor = (lang: Lang) =>
  window.speechSynthesis
    ?.getVoices()
    .find((v) => v.lang.toLowerCase().replace('_', '-').startsWith(lang));

// Some browsers load their voices late; asking early gets them going.
export function warmUpSpeech() {
  try {
    window.speechSynthesis?.getVoices();
  } catch {
    // No speech; the game works without it.
  }
}

export function speak(word: string, lang: Lang) {
  try {
    const voice = voiceFor(lang);
    if (!voice) return;
    // In lower case, so CAT is said as a word and not spelled out.
    const say = new SpeechSynthesisUtterance(word.toLocaleLowerCase(lang));
    say.voice = voice;
    say.lang = LOCALES[lang];
    say.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(say);
  } catch {
    // Speaking is nice to have; never let it break the game.
  }
}
