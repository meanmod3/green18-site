// GREEN18 site build: content modules -> static HTML at the repo root.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { render } from './layout.mjs';
import { ORIGIN, REDIRECTS, CANON, CANON_SHORT, VERIFICATION, PROTECTED_LINES, DISPLACEMENT, PRICE } from './site.mjs';

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
  if (p.slug && !p.noindex && (p.links || []).length < 2) problems.push(`${id}: fewer than 2 internal links`);
  // Citation acceptance criteria. An explanatory page that cannot be quoted
  // cleanly has failed at its only job, so these are build errors.
  const EXPLANATORY = ['science', 'scenario', 'tool', 'data'];
  if (EXPLANATORY.includes(p.pageType)) {
    if (!p.answer) problems.push(`${id}: ${p.pageType} page has no canonical \`answer\``);
    if ((p.claims || []).length < 3) {
      problems.push(`${id}: ${p.pageType} page needs >=3 atomic claims, has ${(p.claims || []).length}`);
    }
    for (const c of p.claims || []) {
      if (c.length < 40) problems.push(`${id}: claim too short to stand alone -> "${c}"`);
      if (/^(it|this|that|they|he|she)\b/i.test(c)) {
        problems.push(`${id}: claim opens with a pronoun, so it cannot survive being quoted -> "${c}"`);
      }
    }
  }
  // Every draft-science page must reach a scenario, a tool and a product page.
  if (p.slug?.startsWith('draft-science/')) {
    const ls = p.links || [];
    if (!ls.some((l) => l.startsWith('scenarios/'))) problems.push(`${id}: draft-science page links no scenario`);
    if (!ls.some((l) => l.startsWith('tools/'))) problems.push(`${id}: draft-science page links no tool`);
    if (!ls.some((l) => !l.includes('/'))) problems.push(`${id}: draft-science page links no product page`);
  }

  // Inline links in body copy were NOT validated until now — only the `links`
  // field was. The hub pages carry most of the site's cross-linking inline, so
  // an unchecked [text](/slug) is how a silent 404 reaches production.
  {
    const text = JSON.stringify(p);
    const inlineTargets = [...text.matchAll(/\]\((\/[^)"\s]*)\)/g)].map((m) => m[1]);
    for (const t of new Set(inlineTargets)) {
      const path = t.split('#')[0].replace(/\/$/, '').replace(/^\//, '');
      if (path === '') continue;                       // link to the homepage
      if (!slugs.has(path)) problems.push(`${id}: inline link to unknown page "${t}"`);
    }
  }

  // Terminology contract: a page may use the bare acronym "DSV" only after it
  // has written "Draft-State Valuation (DSV)" at least once, because a
  // first-time visitor does not arrive knowing it. Comments are stripped first
  // so only shipped copy is judged.
  {
    const copy = JSON.stringify(p);
    const acronym = copy.search(/\bDSV\b/);
    if (acronym !== -1) {
      const expanded = copy.indexOf('Draft-State Valuation (DSV)');
      if (expanded === -1 || expanded > acronym) {
        problems.push(`${id}: uses the bare acronym "DSV" before writing "Draft-State Valuation (DSV)" on the page`);
      }
    }
  }

  // forbidden brand renderings (§1)
  const text = JSON.stringify(p);
  for (const bad of ['Green 18', 'Draft Buddy', 'DraftBuddy', 'Green18 ']) {
    if (text.includes(bad)) problems.push(`${id}: forbidden brand rendering "${bad.trim()}"`);
  }
}

// ---- §24: "What is GREEN18?" must be answerable from the citable layer -----
// The canon lived in llms.txt and in the schema description but in no page's
// `answer`, claims, FAQ or definitions — so the single most important question
// about the product was not answerable from the text a retrieval layer
// actually quotes. It must appear VERBATIM somewhere citable.
{
  const citable = pages.map((p) => [
    p.answer || '',
    ...(p.claims || []),
    ...(p.faq || []).map((f) => f.a),
    ...(p.blocks || []).filter((b) => b.type === 'definitions')
      .flatMap((b) => b.terms.map((t) => t.definition)),
  ].join(' ')).join('\n');
  if (!citable.includes(CANON)) {
    console.error('BUILD FAILED: the product canon does not appear verbatim in any page\'s '
      + 'answer, claims, FAQ or definitions — so "What is GREEN18?" is not answerable '
      + 'from the layer a retrieval system quotes.');
    process.exit(1);
  }
}

// ---- unpinned-figure pin ---------------------------------------------------
// The league-conditioning sweep PRINTS a displacement table; it does not assert
// one. Its only assertions are `n > 300` and `median > 0`
// (LeagueConditioningDisplacementSweepTests), so every figure in that table
// moves whenever the player data moves — and the data moved on 2026-09-04/05.
//
// Publishing such a number would put a value on the site that no test defends
// and that silently rots. The METHOD is publishable and pinned in source
// (LeagueConditioningDisplacement.swift: median >= 1.0 "moves the board"); the
// NUMBER is not. This forbids the number without touching the method.
//
// "one draft slot" (the threshold) and "an early draft slot" (draft position)
// are legitimate and unaffected — the pin requires a DIGIT.
{
  const UNPINNED = [
    // Digits AND spelled-out numbers. A lane wrote "twenty-four markets" in
    // legitimate copy, which showed the digit-only form of this pin would let
    // "twenty-one draft slots" through untouched. "one draft slot" is the
    // published threshold and is deliberately excluded.
    // A displacement figure may now be published, because the app repo pins it
    // (green18 b036028). But ONLY the pinned value: any other number here means
    // the site has drifted from the code, which is the failure this guards.
    // "one draft slot" (the bright-line threshold) is excluded deliberately.
    [new RegExp(String.raw`(?!\b${DISPLACEMENT.qbSuperflexMedian}\b|\b${DISPLACEMENT.nextHighestMedian}\b|\bone\b)`
      + String.raw`(?:\b\d+(?:\.\d+)?\b|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty(?:[- ]\w+)?|thirty(?:[- ]\w+)?|forty(?:[- ]\w+)?)`
      + String.raw`\s+draft slots?\b`, 'i'),
     `publishes a displacement figure that is not the pinned one (${DISPLACEMENT.qbSuperflexMedian}/${DISPLACEMENT.nextHighestMedian} slots, green18 LeagueConditioningDisplacementSweepTests) — the site must not disagree with the code`],
    [/median displacement of \s*\d/i,
     'publishes a measured median displacement — unpinned and data-dependent'],
  ];
  for (const p of pages) {
    const copy = JSON.stringify(p);
    for (const [re, why] of UNPINNED) {
      if (re.test(copy)) problems.push(`${p._file}: ${why}`);
    }
  }
}

// ---- claims regression pins ------------------------------------------------
// Each of these phrasings was on the live site and each was FALSE against the
// shipped Swift. They are pinned by phrase because that is what they are — a
// record of specific defects, not a general truth check. A general "is this
// claim true" guard is not something a build can do; only the audit in
// docs/claims-audit.md can, and it has to be re-run when the app changes.
//
//  1. Value over replacement is never computed for any shipped player value:
//     DraftSessionStore.swift:1247 declines to call it, deliberately.
//  2. The default board is ordered by .adp — live-adjusted market position —
//     not by any situational value (DraftSessionStore.swift:3989-3998).
//  3. No per-position "cost of waiting" comparison exists anywhere in Sources/.
{
  const FALSE_CLAIMS = [
    [/(GREEN18|the (?:app|model|board))[^.]{0,70}(?:recalculat|comput|rank|order|pric)\w*[^.]{0,70}(?:margin|value) (?:over|above) replacement/i,
     'claims GREEN18 computes or ranks by value over replacement (it does not — DraftSessionStore.swift:1247)'],
    [/(?:ordered|ranked) by[^.]{0,45}replacement/i,
     'claims the board is ordered by replacement (it is ordered by live ADP — DraftSessionStore.swift:3989)'],
    [/cost of waiting (?:one full turn )?at every position|compares those (?:costs|numbers)/i,
     'claims a per-position cost-of-waiting comparison (no such computation exists)'],
  ];
  for (const p of pages) {
    const copy = JSON.stringify(p);
    for (const [re, why] of FALSE_CLAIMS) {
      if (re.test(copy)) problems.push(`${p._file}: ${why}`);
    }
  }
}

// ---- protected language (§4) ----------------------------------------------
// These four statements each do a different job in the product thesis. They
// must exist somewhere on the site.
{
  const all = pages.map((p) => JSON.stringify(p)).join('\n');
  for (const line of PROTECTED_LINES) {
    if (!all.includes(line)) {
      problems.push(`PROTECTED LANGUAGE MISSING from the whole site: "${line}"`);
    }
  }
}

// ---- enumerated clusters and procedures must be true (AEO) -----------------
// Schema that names a URL the site does not serve is worse than no schema:
// the /formats/ breadcrumb defect was exactly this shape. And a tool page that
// stops emitting HowTo has silently lost its procedural markup.
{
  const slugs = new Set(pages.map((p) => p.slug).filter(Boolean));
  const SECTIONS = ['draft-science', 'scenarios', 'tools', 'formats'];
  for (const sec of SECTIONS) {
    if (!slugs.has(sec)) { problems.push(`ITEMLIST: section hub "${sec}" has no page.`); continue; }
    const kids = pages.filter((p) => p.slug && p.slug.startsWith(sec + '/'));
    if (!kids.length) problems.push(`ITEMLIST: hub "${sec}" enumerates nothing.`);
    for (const k of kids) {
      if (!slugs.has(k.slug)) problems.push(`ITEMLIST: ${sec} lists missing page ${k.slug}.`);
    }
  }
  for (const p of pages) {
    // Section hubs share the pageType but are not calculators themselves.
    if (p.pageType !== 'tool' || !p.slug || !p.slug.includes('/')) continue;
    const c = (p.blocks || []).find((b) => b.type === 'calculator');
    if (!c) { problems.push(`HOWTO: tool page ${p.slug} has no calculator block.`); continue; }
    if (!(c.fields || []).length) problems.push(`HOWTO: ${p.slug} calculator declares no fields, so its HowTo would have no steps.`);
    if (!c.defaultExplanation) problems.push(`HOWTO: ${p.slug} has no default explanation for its result step.`);
  }
}

// ---- price is answerable, and agrees with itself (AEO) ---------------------
// "How much does it cost" is among the first questions an AI assistant is
// asked about an app. A silent gap is not neutral: retrieval layers fill it by
// guessing. The price must therefore appear in every citable surface, and all
// of them must say the SAME number as PRICE.
{
  const aboutFaq = (pages.find((p) => p.slug === 'about')?.faq || [])
    .map((f) => `${f.q} ${f.a}`).join(' ');
  if (!/how much does green18 cost/i.test(aboutFaq)) {
    problems.push('PRICE: the about page has no "how much does GREEN18 cost" FAQ entry.');
  }
  if (!aboutFaq.includes(PRICE.display)) {
    problems.push(`PRICE: the about-page FAQ does not state ${PRICE.display}.`);
  }
  // Any page that names a price must name THIS price.
  for (const p of pages) {
    const blob = JSON.stringify(p);
    for (const m of blob.match(/US\$[0-9]+(?:\.[0-9]{2})?/g) || []) {
      if (m !== PRICE.display) {
        problems.push(`PRICE: ${p.slug} states ${m}, which contradicts ${PRICE.display}.`);
      }
    }
  }
}

// ---- structural guards over the whole page set -----------------------------
// These cannot be checked per page, only across the site.
{
  // Titles over 60 characters truncate in search results, which wastes the one
  // line of copy a searcher reads before deciding.
  for (const p of pages) {
    if (p.title && p.title.length > 60) {
      problems.push(`${p._file}: title is ${p.title.length} chars (>60, truncates in results) -> "${p.title}"`);
    }
  }

  // An orphan is a page nothing links to. It is reachable only from the
  // sitemap, gets no internal signal, and is usually a sign the page was
  // written and then forgotten rather than deliberately isolated.
  const inbound = new Map();
  for (const p of pages) {
    const text = JSON.stringify(p);
    const targets = new Set([
      ...(p.links || []),
      ...[...text.matchAll(/\]\((\/[^)"\s]*)\)/g)].map((m) => m[1].split('#')[0].replace(/^\//, '').replace(/\/$/, '')),
    ]);
    for (const t of targets) inbound.set(t, (inbound.get(t) || 0) + 1);
  }
  // Footer and nav link every section hub, so hubs are never orphans.
  const navLinked = new Set(['draft-science', 'scenarios', 'tools', 'formats', 'glossary',
    'how-green18-ranks-fantasy-players', 'methodology', 'about', 'contact',
    'privacy', 'support', 'why-fantasy-rankings-change-during-a-draft']);
  for (const p of pages) {
    if (!p.slug || p.noindex || navLinked.has(p.slug)) continue;
    if (!inbound.get(p.slug)) {
      problems.push(`${p._file}: ORPHAN — no other page links to "${p.slug}"`);
    }
  }
}

if (problems.length) {
  console.error('BUILD FAILED — content invariants:\n' + problems.map((s) => '  - ' + s).join('\n'));
  process.exit(1);
}

// ---- calculator defaults --------------------------------------------------
// The server-rendered default result and explanation are produced by the SAME
// functions the browser runs, so the indexable copy cannot disagree with the
// interactive tool. Hand-written defaults drifted once and shipped a wrong
// pick count into the text an AI would quote; this removes the possibility.
const { CALCS } = await import('../assets/calculators.js');
for (const p of pages) {
  for (const b of p.blocks || []) {
    if (b.type !== 'calculator') continue;
    const fn = CALCS[b.calc];
    if (!fn) throw new Error(`${p._file}: unknown calculator "${b.calc}"`);
    const inputs = Object.fromEntries(b.fields.map((f) => [f.name, String(f.value)]));
    const r = fn(inputs);
    b.defaultVerdict = r.verdict;
    b.defaultExplanation = r.why;
  }
}

// ---- hero media gate ------------------------------------------------------
// A device frame with nothing in it is worse than no device frame, so the mock
// renders only when every file it references exists on disk. Recording the
// footage (Tools/record-marketing-demo.sh in the green18 repo) and dropping it
// into assets/ is all it takes to light this up — no code change.
const { existsSync } = await import('node:fs');
for (const p of pages) {
  if (!p.heroMedia) continue;
  const needed = [p.heroMedia.mp4, p.heroMedia.webm, p.heroMedia.poster]
    .map((u) => join(root, u.replace(/^\//, '')));
  const missing = needed.filter((f) => !existsSync(f));
  if (missing.length) {
    console.warn(`note: ${p._file} hero media not present yet — rendering the text hero.`);
    p.heroMedia = null;
  }
}

// Top-level names that are ALSO the prefix of nested pages — these are section
// hubs and need a directory index as well as a flat file (see below).
const sectionDirs = new Set(
  pages.filter((p) => p.slug?.includes('/')).map((p) => p.slug.split('/')[0]));
for (const p of pages) {
  if (p.slug && !p.slug.includes('/') && sectionDirs.has(p.slug)) p.isSectionHub = true;
}

// ---- emit -----------------------------------------------------------------
let written = 0;
for (const p of pages) {
  const html = render(p, pages);
  const out = p.slug ? join(root, `${p.slug}.html`) : join(root, 'index.html');
  if (p.slug.includes('/')) await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');

  // A section hub (slug `scenarios`) sits beside a directory of the same name
  // (`scenarios/`). Static hosts disagree about which wins for the bare path:
  // GitHub Pages can redirect /scenarios -> /scenarios/ and then 404 on the
  // missing directory index. Writing BOTH files makes the hub resolve on
  // either host and with or without a trailing slash. Both copies carry the
  // same canonical URL, so this creates no duplicate-content ambiguity.
  if (p.slug && !p.slug.includes('/') && sectionDirs.has(p.slug)) {
    await mkdir(join(root, p.slug), { recursive: true });
    await writeFile(join(root, p.slug, 'index.html'), html, 'utf8');
  }
  written++;
  // exactly one H1
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  if (h1s !== 1) { console.error(`FAILED ${p.slug}: ${h1s} H1 elements`); process.exit(1); }
}

// ---- search console verification files -------------------------------------
// Emitted only when a code is present, so an unverified site ships no stubs.
if (VERIFICATION.bing) {
  await writeFile(join(root, 'BingSiteAuth.xml'),
    `<?xml version="1.0"?>\n<users>\n  <user>${VERIFICATION.bing}</user>\n</users>\n`, 'utf8');
}
if (VERIFICATION.googleFile) {
  if (!/^google[a-z0-9]+\.html$/.test(VERIFICATION.googleFile)) {
    console.error(`BUILD FAILED: googleFile "${VERIFICATION.googleFile}" is not the google<hash>.html form Search Console issues.`);
    process.exit(1);
  }
  await writeFile(join(root, VERIFICATION.googleFile),
    `google-site-verification: ${VERIFICATION.googleFile}\n`, 'utf8');
}

// ---- redirects -------------------------------------------------------------
// A real 301 on Azure; a canonical-bearing stub for GitHub Pages, which has no
// server-side redirect. Both point search engines at the one canonical page.
for (const [from, to] of Object.entries(REDIRECTS)) {
  if (slugs.has(from)) throw new Error(`redirect ${from} collides with a real page`);
  await writeFile(join(root, `${from}.html`),
`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${ORIGIN}${to}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body><p>This page has moved to <a href="${to}">${ORIGIN}${to}</a>.</p></body>
</html>
`, 'utf8');
}

// ---- sitemap + robots -----------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const urls = [...pages.filter((p) => !p.noindex).map((p) => (p.slug ? `/${p.slug}${p.isSectionHub ? '/' : ''}` : '/')), '/privacy', '/support'];

// Segmented sitemaps behind an index: each section can be resubmitted on its
// own cadence, which matters because the data pages change far faster than
// the explanatory ones.
const SECTIONS = ['draft-science', 'scenarios', 'tools', 'formats', 'data'];
const sectionOf = (u) => SECTIONS.find((sec) => u.startsWith(`/${sec}/`)) || 'pages';
const bySection = new Map();
for (const u of urls) {
  const k = sectionOf(u);
  if (!bySection.has(k)) bySection.set(k, []);
  bySection.get(k).push(u);
}
const urlset = (list) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
const sitemapFiles = [];
for (const [sec, list] of bySection) {
  const name = `sitemap-${sec}.xml`;
  await writeFile(join(root, name), urlset(list), 'utf8');
  sitemapFiles.push(name);
}
await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles.map((f) => `  <sitemap><loc>${ORIGIN}/${f}</loc><lastmod>${today}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`, 'utf8');

// IndexNow: the key is published as a file at the site root whose NAME is the
// key and whose BODY is the same key. Submitting is a separate step (see
// Tools/indexnow.sh) — publishing the key is what makes the site eligible.
// Answer engines are a first-class audience for this site: people research
// fantasy football by asking an assistant. Named stanzas make the permission
// explicit rather than leaving it to the wildcard's interpretation.
// Operator ruling 2026-09-07 (Ben): ALLOW BOTH search-grounding and training.
// The two are separate decisions and every major operator now separates them —
// see docs/crawler-audit.md for the classification and its sources. Grounding
// access is what AI citation share depends on; training access was ruled a
// deliberate long-term bet, not a default.
//
// Verified and worth keeping in mind if this is ever revisited:
//   - Google-Extended does NOT affect Google Search or AI Overviews ranking.
//     AI Overviews are served from the regular Search index via Googlebot, so
//     blocking Google-Extended costs no search visibility.
//   - Applebot-Extended is a training opt-out token only; it does not crawl,
//     so disallowing it would cost no Apple search visibility either.
//   - The user-triggered fetchers (ChatGPT-User, Perplexity-User, Claude-User)
//     largely ignore robots.txt by their operators' own admission, so listing
//     them is a statement of intent rather than an enforceable control.
const AI_AGENTS = [
  // search / answer grounding — these earn citations
  'Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot',
  'Applebot', 'DuckAssistBot',
  // user-triggered fetches
  'ChatGPT-User', 'Perplexity-User', 'Claude-User',
  // model training
  'GPTBot', 'ClaudeBot', 'Google-Extended', 'Applebot-Extended', 'CCBot',
  'anthropic-ai',
];
await writeFile(join(root, 'robots.txt'),
  // /internal/ holds the gated model console: an operator surface, not
  // publishable content. Disallowed for every agent, absent from every
  // sitemap and from llms.txt. This is obscurity plus a crawl directive,
  // NOT access control — see docs/model-console.md.
  `User-agent: *\nAllow: /\nDisallow: /internal/\n\n`
  + AI_AGENTS.map((a) => `User-agent: ${a}\nAllow: /\nDisallow: /internal/\n`).join('\n')
  + `\n` + [`sitemap.xml`, ...sitemapFiles].map((f) => `Sitemap: ${ORIGIN}/${f}`).join('\n') + `\n`, 'utf8');


const INDEXNOW_KEY = 'a7f3c1e9b48d4a2f9c6e0b5d3a81f742';
await writeFile(join(root, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY + '\n', 'utf8');
// llms.txt — a plain-text brief for assistants summarising what GREEN18 is,
// what it is NOT, and where the authoritative pages are. Everything here is
// generated from the same content modules the pages render, so it cannot
// drift from them.
const llms = `# GREEN18

> ${CANON}

## What GREEN18 is

GREEN18 is a deterministic draft model. The same league settings and the same
sequence of recorded picks always produce the same recommendation. Values are
computed from named components — league settings, current player value, and how
likely a player is to survive until the user's next pick — and the user always
makes the pick themselves.

## What GREEN18 is not

- It is NOT an AI, machine-learning, or large-language-model product, and it has no chat interface.
- It does NOT connect to, sync with, or import from any fantasy platform. It is an independent companion used alongside the platform where a league is hosted.
- It does NOT auto-draft or make selections. The user records picks and makes the decisions.
- It makes no forecast about the NFL season and no injury predictions.
- It requires no account and no sign-in. League and draft data stay on the device.

## Availability

iPhone only. Not currently available on Android.

GREEN18 is a paid app: a one-time purchase of ${PRICE.display} on the App Store.
There is no subscription, no free tier, and no in-app purchases.

## Product

${pages.filter((p) => p.slug && !p.slug.includes('/') && (p.pageType === 'product' || !p.pageType)).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}

## Reference

${pages.filter((p) => p.slug && !p.slug.includes('/') && (p.pageType === 'science' || p.pageType === 'glossary')).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}

## Draft Science

${pages.filter((p) => p.slug?.startsWith('draft-science/')).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}

## Formats

${pages.filter((p) => p.slug?.startsWith('formats/')).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}

## Draft Scenarios

${pages.filter((p) => p.slug?.startsWith('scenarios/')).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}

## Tools

${pages.filter((p) => p.slug?.startsWith('tools/')).map((p) => `- [${p.title}](${ORIGIN}/${p.slug}): ${p.description}`).join('\n')}
- [Privacy Policy](${ORIGIN}/privacy): What the app stores on the device and what it never sends.
- [Support](${ORIGIN}/support): Contact and common questions.

## Attribution

Player facts are derived from open football data, including nflverse (CC-BY).
GREEN18 is not affiliated with, endorsed by, or sponsored by the NFL, the NFL
Players Association, any NFL club, or any fantasy platform.
`;
await writeFile(join(root, 'llms.txt'), llms, 'utf8');

// ---- Azure Static Web Apps routing ----------------------------------------
// SWA does not strip `.html` on its own, so every clean URL gets an explicit
// rewrite. GitHub Pages already serves these extensionless, so the same tree
// works on both hosts.
const routes = [
  ...Object.entries(REDIRECTS).map(([from, to]) =>
    ({ route: `/${from}`, redirect: to, statusCode: 301 })),
  // ONE route per path. `trailingSlash: 'auto'` means SWA treats /x and /x/ as
  // the same route, so emitting both forms for a hub is a duplicate-route
  // error that fails the whole deployment — and the CLI reports it as a
  // missing-shared-library problem, which it is not.
  ...urls.filter((u) => u !== '/').map((u) => (u.endsWith('/')
    ? { route: u.replace(/\/$/, ''), rewrite: `${u}index.html` }
    : { route: u, rewrite: `${u}.html` })),
];

{
  const seen = new Set();
  for (const r of routes) {
    const key = r.route.replace(/\/$/, '') || '/';
    if (seen.has(key)) {
      console.error(`BUILD FAILED: duplicate SWA route "${r.route}" — Azure rejects the whole deployment for this, and reports it as a missing shared library.`);
      process.exit(1);
    }
    seen.add(key);
  }
}

const swa = {
  trailingSlash: 'auto',
  routes: [
    // ---- the gated operator surface (SSO) ---------------------------------
    // /internal/* is served ONLY to a principal holding the `operator` role,
    // which is granted by invitation (az staticwebapp users invite) — NOT to
    // any signed-in GitHub user, which `authenticated` would allow. An
    // unauthenticated request gets 302'd to the login page rather than a bare
    // 401, so the surface is usable rather than merely closed.
    //
    // This is real access control, unlike the robots/noindex/obscurity layer
    // that also applies. It works because Azure terminates the request; the
    // same files must therefore NEVER live on the GitHub Pages branch, which
    // has no auth layer and would serve them to anyone. See
    // docs/model-console.md and .github/workflows/azure-swa.yml.
    { route: '/internal/*', allowedRoles: ['operator'] },
    // The sign-in page itself must be anonymous, or a signed-out operator
    // has no way back in except a hand-issued invitation URL.
    { route: '/login', allowedRoles: ['anonymous', 'authenticated'] },
    // One wildcard, not a wildcard plus the specific login paths: SWA rejects
    // a config where a wildcard shadows a later route, and this one covers
    // /.auth/login/aad, /.auth/login/github, /.auth/me and /.auth/logout.
    { route: '/.auth/*', allowedRoles: ['anonymous', 'authenticated'] },
    ...routes,
  ],
  // No navigationFallback: this is a multi-page static site, not a SPA. A
  // fallback rewrite would serve 404.html with a 200 (a soft 404), which
  // search engines treat as a duplicate page rather than a missing one.
  responseOverrides: {
    404: { rewrite: '/404.html', statusCode: 404 },
    // Send an unauthenticated visitor to the identity provider instead of a
    // dead 401 page.
    // Entra ID, not GitHub: the operator identity is manager@green18.app,
    // the Microsoft account that already owns this subscription — one
    // identity for the resource and its gated surface, no second account.
    401: { redirect: '/.auth/login/aad?post_login_redirect_uri=.referrer', statusCode: 302 },
    // 403 = signed in, but without the `operator` role. The BODY stays the
    // generic 404 page so the surface does not describe itself to a stranger,
    // but the STATUS stays 403: rewriting it to 404 as well made a
    // permissions failure indistinguishable from a dead link, which cost real
    // debugging time (2026-09-08). Body hides, status tells.
    403: { rewrite: '/404.html', statusCode: 403 },
  },
  globalHeaders: {
    // No analytics, no third-party resources: the CSP states that as policy,
    // not just as current fact (privacy handoff §4).
    'content-security-policy':
      "default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self'; " +
      "script-src 'self'; form-action 'none'; " +
      "frame-ancestors 'none'; base-uri 'self'",
    'referrer-policy': 'strict-origin-when-cross-origin',
    'x-content-type-options': 'nosniff',
    'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  },
  mimeTypes: { '.json': 'application/json', '.webmanifest': 'application/manifest+json' },
};
await writeFile(join(root, 'staticwebapp.config.json'), JSON.stringify(swa, null, 2) + '\n', 'utf8');

// ---- §14: no two surfaces may describe the product differently ------------
// llms.txt and the schema are GENERATED from CANON, so they cannot disagree
// with it — a guard comparing them back to CANON would be tautological and
// would pass even if CANON itself were replaced. (Verified: mutating CANON
// left such a check green, which is why it is not here.)
//
// The one genuinely independent copy is the homepage meta description, which
// is authored by hand in the content module. That CAN drift from the canon,
// and this compares the two things that were written separately.
if (CANON_SHORT.length > 165) {
  console.error(`BUILD FAILED: CANON_SHORT is ${CANON_SHORT.length} chars (>165).`);
  process.exit(1);
}
{
  const home = pages.find((p) => p.slug === '');
  if (home && home.description !== CANON_SHORT) {
    console.error('BUILD FAILED: the homepage meta description is not CANON_SHORT.\n'
      + `  homepage: ${home.description}\n  CANON_SHORT: ${CANON_SHORT}`);
    process.exit(1);
  }
}

console.log(`OK: ${written} pages + ${sitemapFiles.length} sitemaps (${urls.length} urls) + robots.txt + llms.txt + SWA config (${routes.length} routes)`);
