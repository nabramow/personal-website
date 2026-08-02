# Nicole Abramowski — personal site

A single static page. No build step, no framework, no dependencies to install. The whole
site is one file: `index.html`. Edit it in any text editor and refresh your browser to see
changes.

Two things load from the internet at runtime (so they need no setup, but do need a
connection): Google Fonts and the book cover images (from Open Library). If either is ever
unavailable, the site still works — fonts fall back to system fonts and missing covers fall
back to showing the book title as text.

## Contents

- `index.html` — the entire website
- `README.md` — this file
- Files you'll add yourself as you go: `photo.jpg`, app screenshots, `cv.pdf`

## Preview it locally

Just double-click `index.html` — it opens in your browser. That's it. (Optional: for a
"real" local server, run `python3 -m http.server` in this folder and visit
`http://localhost:8000`.)
