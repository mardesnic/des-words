import type { Lang } from './i18n';

// A picture (emoji) and its word, in lower case. Every emoji here is in
// Unicode 13 or older, so it shows on phones a few years old too.
export type Word = { emoji: string; word: string };

const list = (pairs: string): Word[] =>
  pairs
    .trim()
    .split(/\s+/)
    .map((pair) => {
      const [emoji, word] = pair.split(':');
      return { emoji, word };
    });

const en = list(`
  🐱:cat 🐶:dog 🐷:pig 🐮:cow 🐔:hen 🦊:fox 🐝:bee 🐜:ant 🦇:bat 🦉:owl
  🐏:ram 🥚:egg 🥧:pie ☀️:sun 🚌:bus 🚗:car 🎩:hat ☕:cup 🔑:key 🛏️:bed
  👁️:eye 👂:ear 🦵:leg 📦:box 🗺️:map 🖊️:pen 🧊:ice 🍵:tea 🕸️:web 🎀:bow
  🐟:fish 🐸:frog 🐻:bear 🦁:lion 🦆:duck 🐐:goat 🦌:deer 🐺:wolf 🦀:crab
  🌳:tree 🍃:leaf 🌙:moon ⭐:star 🌧️:rain ❄️:snow 🔥:fire 🎂:cake 🥛:milk
  🍐:pear 🌽:corn 🥝:kiwi 📖:book ⚽:ball ⛵:boat 🚢:ship 🚲:bike 🥁:drum
  🔔:bell 🧦:sock 👟:shoe ✋:hand 👃:nose 🦴:bone 🌹:rose 🐴:horse
  🐭:mouse 🐑:sheep 🐯:tiger 🦓:zebra 🐫:camel 🐍:snake 🐌:snail 🐋:whale
  🦈:shark 🐼:panda 🐨:koala 🦙:llama 🍎:apple 🍋:lemon 🍑:peach 🍞:bread
  🍕:pizza 🍬:candy 🏠:house 🚂:train ✈️:plane 🚚:truck 🕰️:clock 👑:crown
  ❤️:heart ☁️:cloud 👻:ghost 🤖:robot 👗:dress 📱:phone 🥄:spoon 🦷:tooth
  🐰:rabbit 🐒:monkey 🐢:turtle 🕷️:spider 🐧:penguin 🦒:giraffe
  🐬:dolphin 🐙:octopus 🐓:rooster 🐘:elephant 🦋:butterfly 🐿️:squirrel
  🦘:kangaroo 🐊:crocodile 🦕:dinosaur 🍌:banana 🍒:cherry 🍊:orange
  🥕:carrot 🥔:potato 🍅:tomato 🧀:cheese 🍪:cookie 🚀:rocket 🎸:guitar
  🎈:balloon 🌈:rainbow 🌸:flower 🌵:cactus ✏️:pencil ✂️:scissors
  🚜:tractor 🔨:hammer 🍇:grapes 🧸:teddy 🍯:honey 🌻:sunflower
`);

const hr = list(`
  🐶:pas 🐭:miš 🐰:zec 🦁:lav 🐺:vuk 🦀:rak 🦔:jež 🐋:kit 🧀:sir 🧃:sok
  🍯:med 🧂:sol 🧊:led 👃:nos 👁️:oko 👂:uho 🦷:zub 🧣:šal ⌚:sat 🚌:bus
  🌲:bor 🧅:luk 🍵:čaj 🐴:konj 🐌:puž 🐐:koza 🐑:ovca 🐟:riba 🐸:žaba
  🦉:sova 🐜:mrav 🍞:kruh 🥚:jaje 🍪:keks 🌧️:kiša 🏠:kuća 🚗:auto 🚂:vlak
  🚢:brod 🍃:list 🌉:most 🔑:ključ 🦵:noga ✋:ruka 🧢:kapa 🐉:zmaj
  🦙:lama 🥝:kivi 🌹:ruža 🌈:duga ❤️:srce 🌳:drvo 🕷️:pauk 🐘:slon
  🐤:pile 🦃:pura 💧:voda 🦴:kost 🐱:mačka 🐯:tigar 🍋:limun 🥕:mrkva
  ☀️:sunce ☁️:oblak 🔥:vatra 📚:knjiga 👑:kruna 🍄:gljiva 🐝:pčela
  🐍:zmija 🐬:dupin 🦓:zebra 🐷:svinja 🦌:jelen ✈️:avion 🎈:balon
  🔨:čekić ✂️:škare 🎂:torta 🥥:kokos 🎩:šešir 👖:hlače 🔔:zvono
  🥁:bubanj 🎺:truba 🦆:patka 🐔:kokoš 🐮:krava 🍇:grožđe 🍎:jabuka
  🍐:kruška 🍌:banana 🍒:trešnja ❄️:snijeg 🌙:mjesec 🌸:cvijet 🌵:kaktus
  🦋:leptir 🐒:majmun 🦒:žirafa 🦊:lisica 🦘:klokan 🚀:raketa 🚲:bicikl
  🚚:kamion 🎁:poklon 🎸:gitara 🍬:bombon 🍓:jagoda 🍍:ananas 🧺:košara
  🧦:čarapa 👗:haljina 👕:majica 🐢:kornjača 🐧:pingvin 🛴:romobil
  🚜:traktor 🥛:mlijeko 🥔:krumpir 🍅:rajčica 📱:telefon 👓:naočale
  🐊:krokodil 🦕:dinosaur 🍦:sladoled 🍉:lubenica 🍫:čokolada
  ⭐:zvijezda 🐙:hobotnica 🐿️:vjeverica 🚁:helikopter
`);

export const WORDS: Record<Lang, Word[]> = { en, hr };
