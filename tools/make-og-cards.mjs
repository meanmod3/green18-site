#!/usr/bin/env node
/**
 * make-og-cards.mjs — generate per-section Open Graph share cards for green18.app.
 *
 * Renders one HTML file per card and screenshots it with headless Chrome at
 * 1200x630, matching the design of the default card (assets/green18-card.png).
 *
 * Usage:  node Tools/make-og-cards.mjs
 *
 * Self-contained: no network, no npm dependencies. The app icon is inlined as a
 * base64 data URI (a file:// page will not reliably load a relative <img>).
 * Temporary HTML is written to an OS temp dir and removed on exit.
 *
 * The default card assets/green18-card.png is NOT touched — it remains the
 * share image for the homepage and commercial pages.
 */

import { mkdtemp, writeFile, rm, mkdir, readFile, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'assets', 'og');
const ICON = path.join(ROOT, 'assets', 'icon.png');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const BG = '#041306';
const ACCENT = '#75DC49';
const CREME = '#F5F2E3';
const MUTED = '#B4BFB2';

/** Cards. `size` is the headline font-size in px (default 84), tuned per card
 *  so nothing wraps awkwardly or overflows the 1200x630 frame. */
const CARDS = [
  { file: 'draft-science.png', eyebrow: 'Draft Science',      headline: 'How player value is actually calculated.', size: 78 },
  { file: 'scenarios.png',     eyebrow: 'Draft Scenarios',    headline: 'What to do when the board moves.',         size: 84 },
  { file: 'tools.png',         eyebrow: 'Draft Calculators',  headline: 'Work the variable that decides the pick.', size: 78 },
  { file: 'formats.png',       eyebrow: 'League Formats',     headline: 'Your scoring changes the board.',          size: 84 },
  { file: 'reference.png',     eyebrow: 'Reference',          headline: 'The method, the glossary, the limits.',    size: 84 },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html({ eyebrow, headline, size }, iconDataUri) {
  return `<!doctype html>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: ${BG};
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
  }
  .card {
    position: relative;
    width: 1200px; height: 630px;
    padding: 72px 76px 0;
    border-bottom: 10px solid ${ACCENT};
    background:
      radial-gradient(900px 520px at 8% -10%, rgba(117,220,73,0.16), rgba(117,220,73,0) 62%),
      radial-gradient(760px 620px at 104% 46%, rgba(117,220,73,0.11), rgba(117,220,73,0) 60%),
      ${BG};
    display: flex; flex-direction: column;
  }
  .brand { display: flex; align-items: center; gap: 22px; }
  .brand img { width: 76px; height: 76px; border-radius: 17px; display: block; }
  .wordmark {
    font-size: 42px; font-weight: 800; letter-spacing: -0.5px;
    color: ${CREME}; line-height: 1;
  }
  .wordmark span { color: ${ACCENT}; }
  .body { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-bottom: 34px; }
  .eyebrow {
    color: ${ACCENT}; text-transform: uppercase; font-size: 21px; font-weight: 700;
    letter-spacing: 5px; margin-bottom: 26px;
  }
  h1 {
    color: ${CREME}; font-weight: 800; font-size: ${size}px; line-height: 1.06;
    letter-spacing: -2.4px; max-width: 1010px;
  }
  .footer {
    position: absolute; left: 76px; right: 76px; bottom: 66px;
    display: flex; align-items: baseline; justify-content: space-between;
    color: ${MUTED}; font-size: 23px; line-height: 1;
  }
  .footer b { color: ${CREME}; font-weight: 700; }
</style>
<div class="card">
  <div class="brand">
    <img src="${iconDataUri}" alt="">
    <div class="wordmark">GREEN<span>18</span></div>
  </div>
  <div class="body">
    <div class="eyebrow">${esc(eyebrow)}</div>
    <h1>${esc(headline)}</h1>
  </div>
  <div class="footer">
    <div><b>Download GREEN18</b> — available for iPhone</div>
    <div>green18.app</div>
  </div>
</div>
`;
}

async function main() {
  const iconDataUri = 'data:image/png;base64,' + (await readFile(ICON)).toString('base64');
  await mkdir(OUT_DIR, { recursive: true });
  const tmp = await mkdtemp(path.join(tmpdir(), 'green18-og-'));

  try {
    for (const card of CARDS) {
      const page = path.join(tmp, card.file.replace(/\.png$/, '.html'));
      await writeFile(page, html(card, iconDataUri), 'utf8');
      const out = path.join(OUT_DIR, card.file);
      await execFileAsync(CHROME, [
        '--headless',
        '--disable-gpu',
        '--hide-scrollbars',
        `--screenshot=${out}`,
        '--window-size=1200,630',
        `--default-background-color=${BG.replace('#', '')}`,
        `file://${page}`,
      ]);
      const { size } = await stat(out);
      console.log(`wrote assets/og/${card.file}  1200x630  ${(size / 1024).toFixed(1)} KB`);
    }
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
