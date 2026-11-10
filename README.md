# A little love for Ann

A lightweight, static birthday surprise site for GitHub Pages.

## Pages
- `index.html` — public landing page. The main call to action opens the Google Form: https://forms.gle/VQ83KbcbLWa13foe7
- `scrapbook.html` — unlinked scrapbook reveal page. It is intentionally not linked from the landing page or top navigation.

## Privacy and reveal reminder
Google Form responses are collected by Google, not this website. The landing page never reads or displays form responses. The scrapbook is an ordinary public static page—not password protected. Keeping it off navigation only makes it unlinked; anyone with or who discovers its URL can access it. Do not add private submissions until you are ready for them to be public. To reveal it, publish the site and share its URL or make it the homepage yourself.

## Add approved memories
1. Add approved images to an `assets/` folder.
2. Edit `scrapbook-data.js` and fill `window.SCRAPBOOK_MEMORIES` with entries. Example:

```js
window.SCRAPBOOK_MEMORIES = [
  {
    name: 'Jamie',
    message: 'Happy birthday, Ann! I still laugh whenever I think about our beach day.',
    photo: 'assets/beach-day.jpg', // optional
    photoAlt: 'Ann and friends at the beach' // optional
  }
];
```

The counter, contributor list, polaroid-style cards, and random-memory button update from this data automatically. The form does not collect voice notes; this site does not store submissions.

## Music
The scrapbook music button uses the YouTube video you provided: https://youtu.be/F7A3bPg1lJ4?si=U5_rlSdB1zl4P1yQ. Music is off by default and starts only after the visitor presses the button. The YouTube player remains visible while active and includes YouTube's playback controls.

## Publish with GitHub Pages
In the repository, open **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish `index.html` as the home page. The scrapbook URL will be `https://saleneuniceaneeza-web.github.io/love-ann/scrapbook.html` once Pages is enabled.

The site uses only HTML, CSS, and vanilla JavaScript; no build step or backend is needed. The YouTube player loads the YouTube IFrame API when a visitor opts into music.
