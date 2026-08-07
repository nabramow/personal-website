// Zero-dependency local preview server. Run it with `npm start`.
// Serves this folder on http://localhost:8000 and opens your browser.
//
// Node strips the TypeScript types at runtime (Node 22.18+), so there is nothing
// to install and no build step — `node server.ts` just runs.

import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { exec } from 'node:child_process';

const PORT: number = Number(process.env.PORT) || 8000;
const ROOT: string = import.meta.dirname;

const TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  // Strip the query string, then resolve to a path inside this folder only.
  const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
  const relative = normalize(urlPath === '/' ? 'index.html' : urlPath.slice(1));

  if (relative.startsWith('..')) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const body = await readFile(join(ROOT, relative));
    const type = TYPES[extname(relative).toLowerCase()] ?? 'application/octet-stream';
    // No caching, so a refresh always shows your latest edit.
    res.writeHead(200, { 'content-type': type, 'cache-control': 'no-store' }).end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      .end(`Not found: ${relative}`);
  }
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: PORT=8001 npm start`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Serving this folder at ${url} — press Ctrl-C to stop.`);
  if (!process.env.NO_OPEN) exec(`open ${url}`);
});
