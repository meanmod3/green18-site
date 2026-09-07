// GREEN18 site build: content modules -> static HTML at the repo root.
import { readdir, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { render } from './layout.mjs';
import { ORIGIN } from './site.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

const files = (await readdir(join(here, 'content'))).filter((f) => f.endsWith('.mjs')).sort();
const pages = [];
for (const f of files) {
  const mod = await import(join(here, 'content', f));
  pages.push({ ...mod.default, _file: f });
}

// ---- invariants (§23). A page that violates these must not ship. ----------
const problems = [];
const seen = { slug: new Map(), title: new Map(), description: new Map() };
const slugs = new Set(pages.map((p) => p.slug));
// pages that exist outside the generator but are legitimate link targets
for (const s of ['privacy', 'support']) slugs.add(s);

for (const p of pages) {
  const id = p._file;
  if (p.slug === undefined) problems.push(`${id}: missing slug`);
  if (!p.title) problems.push(`${id}: missing title`);
  if (!p.description) problems.push(`${id}: missing description`);
  if (!p.hero?.h1) problems.push(`${id}: missing hero.h1`);
  if (!p.hero?.lede?.length) problems.push(`${id}: missing hero.lede`);
  if (!p.blocks?.length) problems.push(`${id}: no blocks`);
  if (p.description && p.description.length > 165) {
    problems.push(`${id}: description ${p.description.length} chars (>165)`);
  }
  for (const k of ['slug', 'title', 'description']) {
    const v = p[k];
    if (v === undefined) continue;
    if (seen[k].has(v)) problems.push(`${id}: duplicate ${k} with ${seen[k].get(v)} -> "${v}"`);
    seen[k].set(v, id);
  }
  // every final block should be a conversion section (§23)
  if (p.blocks?.at(-1)?.type !== 'convert') {
    problems.push(`${id}: last block is not a conversion section`);
  }
  for (const l of p.links || []) {
    if (!slugs.has(l)) problems.push(`${id}: internal link to unknown slug "${l}"`);
    if (l === p.slug) problems.push(`${id}: links to itself`);
  }
  if (p.slug && (p.links || []).length < 2) problems.push(`${id}: fewer than 2 internal links`);
  // forbidden brand renderings (§1)
  const text = JSON.stringify(p);
  for (const bad of ['Green 18', 'Draft Buddy', 'DraftBuddy', 'Green18 ']) {
    if (text.includes(bad)) problems.push(`${id}: forbidden brand rendering "${bad.trim()}"`);
  }
}

if (problems.length) {
  console.error('BUILD FAILED — content invariants:\n' + problems.map((s) => '  - ' + s).join('\n'));
  process.exit(1);
}

// ---- emit -----------------------------------------------------------------
let written = 0;
for (const p of pages) {
  const html = render(p);
  const out = p.slug ? join(root, `${p.slug}.html`) : join(root, 'index.html');
  await writeFile(out, html, 'utf8');
  written++;
  // exactly one H1
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  if (h1s !== 1) { console.error(`FAILED ${p.slug}: ${h1s} H1 elements`); process.exit(1); }
}

// ---- sitemap + robots -----------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const urls = [...pages.map((p) => (p.slug ? `/${p.slug}` : '/')), '/privacy', '/support'];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(root, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, 'utf8');

// ---- Azure Static Web Apps routing ----------------------------------------
// SWA does not strip `.html` on its own, so every clean URL gets an explicit
// rewrite. GitHub Pages already serves these extensionless, so the same tree
// works on both hosts.
const routes = urls
  .filter((u) => u !== '/')
  .map((u) => ({ route: u, rewrite: `${u}.html` }));

const swa = {
  trailingSlash: 'auto',
  routes,
  // No navigationFallback: this is a multi-page static site, not a SPA. A
  // fallback rewrite would serve 404.html with a 200 (a soft 404), which
  // search engines treat as a duplicate page rather than a missing one.
  responseOverrides: { 404: { rewrite: '/404.html', statusCode: 404 } },
  globalHeaders: {
    // No analytics, no third-party resources: the CSP states that as policy,
    // not just as current fact (privacy handoff §4).
    'content-security-policy':
      "default-src 'self'; img-src 'self' data:; style-src 'self'; " +
      "script-src 'self'; form-action 'none'; " +
      "frame-ancestors 'none'; base-uri 'self'",
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  },
  mimeTypes: { '.json': 'application/json', '.webmanifest': 'application/manifest+json' },
};
await writeFile(join(root, 'staticwebapp.config.json'), JSON.stringify(swa, null, 2) + '\n', 'utf8');

console.log(`OK: ${written} pages + sitemap (${urls.length} urls) + robots.txt + SWA config (${routes.length} routes)`);
