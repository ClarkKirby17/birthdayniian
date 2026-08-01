# Ya's Birthday Site

Black, heavy type, bouncing faces in the background. Landing screen → slam transition → the site
itself, with Greetings, Gallery, Shot Puno (the drinking queue) and Message.

Plain HTML + Tailwind v4 + one JavaScript file. No React, no build complexity.

## Run it

```powershell
npm install
npm run dev
```

Open the localhost link it prints.

## The only files you edit

**`src/app.js`** — the `CONFIG` block at the very top. All names, all copy, all file lists,
the queue. Nothing below that block needs touching.

**`index.html`** — the page structure, if you want to move sections around or add new ones.

**`src/style.css`** — the four colors and two fonts, in the `@theme` block at the top.

## Adding your photos and videos

Drop the files in `/public`, then list them in `CONFIG`:

| Where the file goes | What to add in CONFIG |
| --- | --- |
| `public/images/avatar.png` | `avatar: "/images/avatar.png"` |
| `public/images/hero.jpg` | `heroPhoto: "/images/hero.jpg"` |
| `public/images/face1.png` | `faces: ["/images/face1.png"]` |
| `public/images/gallery/01.jpg` | `gallery: ["/images/gallery/01.jpg"]` |
| `public/videos/kevin.mp4` | `videos: [{ src: "/videos/kevin.mp4", name: "Kevin" }]` |

Until you add real files, the site shows grey placeholder blocks and a smiley face bounces in the
background — so you can see the layout working straight away.

## Bouncing background

In `CONFIG`:

```js
faces: ["/images/face1.png", "/images/face2.png"],
faceCount: 5,      // how many bounce at once
faceSize: 130,     // pixels
faceOpacity: 0.18, // 0 = invisible, 1 = solid
faceSpeed: 0.55,   // higher = faster
```

They bounce off the edges of the window like an old screensaver and never sit on top of the UI.

## Shot Puno

- **Tagay!** — adds a shot to the current person, logs it, moves to the next
- **Balik** — back one turn
- **Pass** — skip without counting a shot
- **Reset** — clear the counts and start from the top
- Timer with Start / Pause / Reset above it

Queue position, shot counts, log and timer are saved in the browser, so refreshing loses nothing.
To wipe it, clear site data for localhost (the key is `shotpuno-v1`).

## Notes

- Change the queue names in `CONFIG.queue`.
- The copy is in Taglish to match the mockups — rewrite it in `CONFIG` however you like.
- Video thumbnails are the first frame of each video.
