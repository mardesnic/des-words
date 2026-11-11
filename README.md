# Words

A free spelling game for young kids that works offline. A picture is shown, and the child puts the letter tiles in order to spell its word. The words come in Croatian and English, so it helps a child learning to read and write either language.

Made for ages 5 and up. There is no timer and no way to lose. Undo takes back the last move, and Start over puts the letters back where they began.

## Demo

Check out the live demo at: https://mardesnic.github.io/des-words/

On your phone, open it and choose **Add to Home Screen** (Safari) or **Install app** (Chrome). It then opens like an app and works offline.

## Features

- Over 100 words in each language, at four levels: words of **3**, **4**, **5**, and **6 or more** letters
- Tap the letters in order: the right one jumps into the word, a wrong one just gives a little shake
- In Croatian, LJ, NJ and DŽ are one letter each, as taught at school
- Capital letters, as children learn first
- The phone says the word when it is spelled, or when the picture is tapped (where the phone has a voice for that language)
- A word does not come again until a dozen others have been played
- A count of words spelled at each level
- Picks up where you left off after a reload
- Keeps the screen on while you play
- In English and Croatian, following the phone's language unless you pick one
- Light and dark mode
- No ads, accounts or tracking

## Development

```bash
npm install
npm run dev        # local dev server
npm test           # game and translation tests
npm run build      # production build in dist/
```

`npm run deploy` builds the app and publishes it to GitHub Pages.
