# AGENTS.md

Notes for AI agents working in this repo.

## What this is

A personal site that is **one static page**: `index.html`. All CSS and JS are inline in
that file. There is no framework, no bundler, and no dependency to install.

Hosted on **GitHub Pages**, deployed from the `main` branch root. Pages serves the repo's
files verbatim — there is no server and no build step at deploy time.

## Running it locally

```sh
npm start          # serves on http://localhost:8000 and opens a browser
```

Needs Node 22.18+. `server.ts` runs directly because Node strips TypeScript types itself,
so there is nothing to `npm install` and nothing to compile.

## Hard constraints — don't break these

- **`index.html` must stand alone.** It is the entire published site. Anything it needs at
  runtime has to be inline, a committed file, or an external URL.
- **No build step.** Don't introduce one, and don't move inline CSS/JS into a pipeline that
  requires compiling. The edit-save-refresh loop is the point.
- **`server.ts` and `package.json` are local-dev only.** They are never involved in serving
  the live site. Never make the page depend on them.
- **A static site cannot hold a secret.** No `.env`, no env vars, no API keys. Everything
  shipped is readable by anyone. If a task seems to need a secret, the design is wrong.
- **Every root file is publicly fetchable** at the live URL, including this one. Don't put
  anything in the repo that shouldn't be public.

## Conventions

- **Contact link**: the "Email me" `href` in the footer is HTML-entity encoded on purpose,
  to keep an email-shaped string out of the page source. Browsers decode it natively, so it
  works without JS. **Do not "simplify" it to a plain address** — that silently undoes it.
  Leave no comment near it explaining the encoding either; the comment is itself a clue.
- **Theme**: all colours, fonts, and layout constants are CSS custom properties in the
  `:root` block under the `THEME:` banner comment near the top. Change a value there rather
  than hardcoding it at a use site. Keep it inline — extracting it to JS/TS would need a
  build step or would flash unstyled content.
- **Punctuation**: body text uses HTML entities for curly quotes (`&rsquo;` `&ldquo;`
  `&rdquo;` `&lsquo;`). Match that when editing copy.
- **Graceful degradation**: book covers load from Open Library and fonts from Google Fonts.
  Both have fallbacks (cover → title as text, font → system font). Preserve that pattern —
  don't add a hard dependency on a third-party request.
- **Repeated blocks** are copy-paste units: books are `.cover` divs, likes are
  `span.like`, screenshots are `.shot` divs, bucket-list items are `li` with `span.check`.

## Not in the repo

`TODO.md` is gitignored — it's the owner's private working list. Don't commit it or
reference its contents in tracked files.
