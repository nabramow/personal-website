# Nicole Abramowski — personal site

A single static page. No build step, no framework, no dependencies to install. The whole site is one file: `index.html`. Edit it in any text editor and refresh your browser to see changes.

Two things load from the internet at runtime (so they need no setup, but do need a
connection): Google Fonts and the book cover images (from Open Library). If either is ever unavailable, the site still works — fonts fall back to system fonts and missing covers fall back to showing the book title as text.

## Contents

- `index.html` — the entire website
- `robots.txt` — tells crawlers (including AI scrapers) what they may index
- `server.ts` — tiny local preview server (only used while developing)
- `package.json` — just holds the `npm start` script
- `README.md` — this file
- Files you'll add yourself as you go: `photo.jpg`, app screenshots, `cv.pdf`

## View it locally

**You need Node installed** (version 22.18 or newer) — that's the only prerequisite.
Check with:

```sh
node --version           # want v22.18.0 or higher
```

If that errors or shows an older version, install the current LTS from [nodejs.org](https://nodejs.org) (or `brew install node` if you use Homebrew).

Then, from this folder:

```sh
npm start                # serve the site and open it in your browser
```

That's it — no `npm install`, no build step. Leave it running while you work, then
`Ctrl-C` to stop. Edit `index.html`, save, refresh the browser (`Cmd-R`) to see changes.

Other commands, if you need them:

```sh
PORT=8001 npm start      # use a different port (if 8000 is taken)
open index.html          # no Node needed — just opens the file in a browser
```

Why 22.18: the server is `server.ts`, and Node strips TypeScript types by itself from that version on, so nothing has to be installed or compiled. **The published site needs none of this** — Node is only for previewing locally. What goes live is `index.html` alone.

### What to check when you preview

- All three book covers in **Reading** show artwork, not just the title as text. They load live from Open Library, so you need an internet connection.
- Fonts look right (they come from Google Fonts at runtime — offline, the page falls back to system fonts and will look different but still fine).
- Resize the window narrow to check the phone layout, and try scrolling the screenshot rows in the project cards sideways.
