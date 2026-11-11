# Words

A free spelling game for young kids that works offline. A picture is shown, and the child puts the letter tiles in order to spell its word. The words come in Croatian and English, so it helps a child learning to read and write either language.

Made for ages 5 and up. There is no timer and no way to lose. Undo takes back the last move, and Start over puts the letters back where they began.

## Demo

Check out the live demo at: https://mardesnic.github.io/des-words/

On your phone, open it and choose **Add to Home Screen** (Safari) or **Install app** (Chrome). It then opens like an app and works offline.

## Features

- A picture to spell, with the letters to put in order
- Words in English and Croatian, following the phone's language unless you pick one
- Picks up where you left off after a reload
- Keeps the screen on while you play
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
