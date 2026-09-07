# GREEN18 site — technical discovery audit

Date: 2026-09-07
Scope: `/Users/Ben/Developer/green18-site` @ working tree, plus live spot-checks against
`https://green18.app` (GitHub Pages) and `https://jolly-bay-0f7b9d60f.3.azurestaticapps.net`
(Azure Static Web Apps mirror).

Method: exhaustive local crawl of all 75 built HTML files with a GitHub-Pages-equivalent
resolver (exact file → `+.html` → `/index.html`), 4,763 internal `href`s followed and
fragment-checked; all six sitemaps parsed with `xml.etree`; every JSON-LD block parsed with
`json.loads` and cross-checked against the page's visible text; `curl` status checks on both
hosts; 375 px viewport measurement of ten pages spanning every page type in a real browser.

Counts: 75 HTML files → **73 indexable** (69 canonical destinations + 3 hub twins + 1 hub twin
set), 2 `noindex` (`/404`, the legacy redirect stub). 70 URLs across 5 section sitemaps.

---

## 1. Crawl & indexability

| Check | Status | Evidence |
|---|---|---|
| `robots.txt` correctness | PASS | `User-agent: *` `Allow: /`; 16 explicit named agents (Googlebot, GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Applebot, CCBot…) all `Allow: /`. All six `Sitemap:` lines present and absolute. No `Disallow` anywhere — nothing is accidentally blocked. |
| Sitemap index + 5 section sitemaps parse as valid XML | PASS | All six parse; `sitemap.xml` is a `sitemapindex` naming exactly the five section files, each of which resolves 200. Zero parse errors. |
| Sitemap completeness — indexable pages present | PASS | Every one of the 70 canonical URLs on the site appears in exactly one section sitemap. No canonical URL is missing. |
| Sitemap hygiene — no non-indexable page listed | PASS | Neither `/404` nor `/beat-your-coworkers-fantasy-football` is listed. |
| Sitemap hygiene — no 404s among listed URLs | PASS | All 70 listed URLs resolve 200 and none resolves via a directory redirect. |
| Sitemap URLs that are not any page's canonical | WARN | 2 of 70: `/privacy` and `/support`. They resolve 200 but declare no canonical at all (see §3, F2). |
| Canonical present on every indexable page | **FAIL** | 71/73 present. `/privacy` and `/support` have **no** `<link rel="canonical">`. |
| Canonical self-referencing | PASS (by design) | The 3 section-hub twins (`/draft-science` and `/draft-science/`, and the same for `/scenarios`, `/tools`) both canonicalise to the trailing-slash form. That is deliberate consolidation, not an error. All other 65 are strictly self-referencing. |
| No canonical points at a redirect or a 404 | PASS | All 71 canonicals resolve 200 directly. Verified live: `https://green18.app/scenarios/` → 200, no redirect. |
| `/beat-your-coworkers-fantasy-football` on both hosts | WARN | **Divergent.** Azure: `301 → /office-fantasy-football-draft` (from `staticwebapp.config.json`). green18.app: **`200`** serving a `<meta http-equiv="refresh">` stub with `noindex, follow` + canonical to the target. GitHub Pages cannot emit a 301, so the stub is the only available mechanism, but the two hosts do not behave the same. |
| Real 404 for unknown paths, both hosts | PASS | `GET /nope-does-not-exist` → `404` on green18.app **and** `404` on Azure (`responseOverrides.404` rewrites to `/404.html` with `statusCode: 404`). No soft-404. |
| Duplicate routes serving identical content | WARN (mitigated) | Exactly 3 pairs, byte-identical: `/draft-science` ≡ `/draft-science/`, `/scenarios` ≡ `/scenarios/`, `/tools` ≡ `/tools/`. Both forms return 200 live on both hosts. Consolidated correctly by canonical (both point at the slash form) and by the sitemap (only the slash form is listed). No other duplicate pair exists anywhere on the site. See F4 — the code comment asserting GitHub Pages 301s bare→slash is factually wrong today. |
| Crawl depth from `/` | PASS | Max depth **2**. Distribution: depth 0 = 1 page, depth 1 = 46, depth 2 = 26. Nothing deeper than 3. |
| Orphan pages | PASS | Only `/404` and the redirect stub have zero inbound internal links — both correct. All 69 content pages have inbound links (33 pages link to `/privacy` and `/support` from the footer). |
| **Broken internal links** | **FAIL** | 4,763 internal links followed. **One** broken target: **`/formats/`**, linked from all three `/formats/*` pages. Confirmed live: 404 on green18.app and 404 on Azure. Zero broken fragments (`#id`) across the whole site. |

## 2. Content availability (JavaScript disabled)

| Check | Status | Evidence |
|---|---|---|
| Primary explanatory content in raw HTML | PASS | Verified by `curl` against production. Hero, `answer`, `In short` claims, prose beats, pipelines, glossary `<dl>`, tables and the "Keep reading" links are all server-rendered text. No definition is reachable only via interaction. |
| FAQ answer text present in raw HTML | PASS | 66 pages carry a FAQ. Every question **and** answer is in the raw markup inside `<details><summary>Q</summary><div><p>A</p></div></details>` — collapsed but present. Machine-verified: all `FAQPage.mainEntity` question strings and answer prefixes were found in the page's stripped visible text on all 66 pages, 0 mismatches. Live confirmation on `https://green18.app/draft-science/positional-scarcity`. |
| Calculator default result AND explanation server-rendered | PASS | All 5 calculators emit a non-empty `data-verdict` and `data-why` in the initial HTML. Live: `https://green18.app/tools/scarcity-calculator` returns `data-verdict>Scarcity: HIGH<` and a full prose `data-why` before any JS runs. |

## 3. Metadata

| Check | Status | Evidence |
|---|---|---|
| Title present | PASS | All 75 pages. |
| Title ≤ 60 chars | PASS | Longest is exactly **60**. Zero over. |
| Title unique | WARN (mitigated) | 3 duplicate pairs — only the hub twins, which canonicalise to one URL. Uniqueness across canonical URLs is 100%. |
| Meta description present | PASS on all content pages | Only exception is the redirect stub (`/beat-your-coworkers-fantasy-football`), which is `noindex`. |
| Meta description ≤ 165 chars | PASS | Zero over. |
| Meta description unique | WARN (mitigated) | Same 3 hub-twin pairs only. |
| Exactly one `h1` | PASS | 74/75 have exactly one. The redirect stub has zero — correct for a stub. |
| No skipped heading levels | PASS | Zero `h(n) → h(n+2)` jumps anywhere. |
| `lang` attribute | PASS | `lang="en"` on all 75. |
| `charset` | PASS | `<meta charset="utf-8">` on all 75. |
| `viewport` | WARN | 74/75. Missing only on the redirect stub. |
| OpenGraph completeness | **FAIL** | 71/74 content pages carry the full set (`og:type`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`, `og:image:width/height`). **`/privacy` and `/support` carry none of it**; the redirect stub carries none (acceptable). |
| Twitter card completeness | **FAIL** | Same split: 71/74 have `twitter:card` (`summary_large_image`), `title`, `description`, `image`. `/privacy` and `/support` have none. |
| `og:image` resolves 200 | PASS where present | 6 distinct cards, all present on disk and served: `green18-card.png` (95 KB), and `og/{draft-science,scenarios,tools,formats,reference}.png` (171–178 KB each). Correct per-section routing verified against `shareCard()`. |
| `og:url` agrees with canonical | PASS | Identical on every page that has both. |
| Image alt text | PASS (vacuous) | The site contains **zero `<img>` elements**. The one media element is a `<video>` inside a `role="img"` wrapper carrying a real `aria-label`, with a WCAG 2.2.2 pause control. Stated honestly: this check passes because there is nothing to fail, not because alt text was authored. |

## 4. Structured data

| Check | Status | Evidence |
|---|---|---|
| Every page's JSON-LD parses as valid JSON | PASS | 75/75 blocks parsed with `json.loads`. Zero failures. |
| `FAQPage` truthfulness | PASS | 66 pages. Every one has a genuine `<details>`-based Q&A section, and every `Question.name` was located in the page's visible text. No `FAQPage` on a page without Q&A; no `<details>` block without matching `FAQPage`. |
| `TechArticle` truthfulness | PASS | 38 pages, gated in code to `pageType === 'science' \|\| 'scenario'` — i.e. only the explanatory Draft-Science and Scenario articles, plus their hubs. Not applied to calculators, landing pages, or the homepage. |
| `DefinedTerm` matches visible glossary | PASS | Every `DefinedTerm.description` in the `DefinedTermSet` was found verbatim in the rendered glossary text. Zero drift. |
| Breadcrumb agrees with visible trail | **FAIL (formats only)** | `BreadcrumbList` is emitted from the same `breadcrumbTrail()` that renders the visible crumbs, so they always agree — but on the three `/formats/*` pages both point at `https://green18.app/formats/`, which is a 404. Structured data asserts a parent that does not exist. |
| No fabricated authority | **PASS** | Machine-checked across all 75 JSON-LD blocks for the keys `aggregateRating`, `reviewCount`, `ratingValue`, `price`, `priceCurrency`, `award`, `offers`, `review` and the types `Offer`/`AggregateRating`/`Review`/`Rating`: **zero occurrences**. The `MobileApplication` node deliberately omits rating and price, with a comment saying so. (A naive substring scan flags "offer" on three scenario pages — that is the English word *offering* in body prose, not a schema key.) |

## 5. Performance / rendering

| Check | Status | Evidence |
|---|---|---|
| Homepage total weight | WARN | **940 KB** with the hero video, **142 KB** without it. Under the 1.5 MB threshold, but the video is 87% of it. |
| Heaviest page weight | PASS | `/glossary` = 87 KB total (48.5 KB HTML + 22.8 KB CSS + 1.4 KB JS + 16.8 KB icon). Calculator pages ≈ 70 KB. Nothing approaches 1.5 MB. |
| Hero video bytes | WARN | `green18-draft-demo.webm` **818 KB**, `green18-draft-demo.mp4` **795 KB** (alternate source, only one is fetched), poster JPG 87 KB. 32-second loop. |
| Video blocks render? | PASS | No. `preload="metadata"` (not `auto`), `muted playsinline loop`, poster supplied, sits in the hero's second grid column after the copy in source order. It autoplays but only metadata is fetched eagerly. |
| Render-blocking resources | PASS | One stylesheet (`/assets/site.css`, 22.8 KB). `site.js` is `defer`; `tools.js` is `type="module"` (deferred by spec); `calculators.js` is a module import. No synchronous script anywhere. No third-party requests at all — CSP is `default-src 'self'`. |
| Horizontal overflow at 375 px | PASS | Measured in-browser on 10 pages spanning every type (home, glossary, calculator, draft-science article, scenario, format, hub, privacy, methodology, 404): `documentElement.scrollWidth === clientWidth` on all ten — **zero page-level horizontal scroll**. Wide tables exceed the viewport but are contained in `.table-scroll` / `.table-wrap` (`overflow-x: auto`, `tabindex="0"`, `role="region"` with an accessible name), which is the correct pattern. |

---

## Prioritised findings

### P0 — incorrect, misleading, broken, or inaccessible

**F1 — `/formats/` is a 404 that three pages link to and three JSON-LD graphs assert as a parent.**
`src/layout.mjs` `SECTION_NAMES` declares `'formats': 'League Formats'`, so `breadcrumbTrail()`
emits a `/formats/` crumb on every page whose slug starts with `formats/`. But unlike
`draft-science`, `scenarios` and `tools` — each of which has a hub content module
(`75-hub-draft-science.mjs`, `76-hub-scenarios.mjs`, `77-hub-tools.mjs`) — **there is no
`formats` hub module and no `formats/index.html`**. Consequences, all confirmed live on both
hosts:

- `/formats/` → **404** on `https://green18.app` and **404** on the Azure mirror.
- `/formats/ppr`, `/formats/standard`, `/formats/superflex` each render a visible breadcrumb
  link `GREEN18 / League Formats / …` where "League Formats" is a dead link.
- Each of those three pages' `BreadcrumbList` names `https://green18.app/formats/` as
  `ListItem` position 2 — structured data pointing a crawler at a 404.
- `llms.txt` has a `## Formats` heading but (correctly) lists no hub URL, so the section is
  the only one on the site with no entry point.
- The three format pages are reachable only via cross-links from each other and from the body
  copy; there is no hub to collect them.

This is the site's **only** broken internal link out of 4,763, and the only structured-data
falsehood. Fix: add a `formats` hub content module mirroring `77-hub-tools.mjs`, or remove
`formats` from `SECTION_NAMES` so the crumb collapses to `GREEN18 / <page>`. The hub is the
better fix — it also gives the three format pages the inbound-link parity the other sections
have.

### P1 — major retrieval / entity / semantic issue

**F2 — `/privacy` and `/support` are legacy hand-built pages with no canonical, no OpenGraph,
no Twitter card and no JSON-LD, yet they are in the sitemap.**
Both are pre-build-system artefacts: they load the orphaned root `style.css` rather than
`/assets/site.css`, carry a three-link nav (`Home / Privacy / Support`) instead of the site
header and 5-column footer, and are not produced by `src/build.mjs`. They are submitted to
Google in `sitemap-pages.xml` (2 of 70 URLs) while declaring no canonical — the only two
indexable pages on the site in that state. Shared links to them render a bare card. They are
also the only pages that do not link back into the 69-page body, so a crawler arriving there
from the footer of any page hits a dead end.

**F3 — the redirect for `/beat-your-coworkers-fantasy-football` behaves differently on the two
hosts.** Azure returns a clean `301`; the canonical host returns `200` plus a `meta refresh`.
The stub is correctly `noindex, follow` with a canonical at the target, so the signal is not
lost, but a `200` for a retired URL is weaker than a `301` and the two hosts disagree. GitHub
Pages cannot send a 301, so this is a host limitation rather than a code defect — worth
recording as a known divergence rather than treating as fixable in place. The stub is also the
only page on the site with no `viewport` meta.

**F4 — a load-bearing code comment is now false.** `src/layout.mjs` `render()` states: *"GitHub
Pages 301s `/scenarios` → `/scenarios/` whenever a `scenarios/` directory exists, so the bare
form never serves … Verified live before this was written."* Verified live today, **both**
`/scenarios` and `/scenarios/` return `200` and serve byte-identical content (GitHub Pages
serves `scenarios.html` for the bare path because that file also exists). The canonical
strategy that comment justifies is still correct and still consolidates the pair — but the
stated reason for it no longer holds, so the next person to touch hub canonicals will reason
from a false premise. Correct the comment to say the duplicate is real and canonical is what
resolves it.

### P2 — meaningful improvement

**F5 — the hero video is 87% of the homepage's 940 KB.** 818 KB webm + 795 KB mp4 on disk
(one fetched), for a 32-second silent decorative loop. It does not block render and it is
correctly pausable, but a shorter loop or a lower bitrate would cut the homepage to roughly
300–400 KB. Nothing here is broken; this is headroom.

**F6 — `style.css` (23 KB at the repo root) is a second, divergent design system** referenced
only by `privacy.html` and `support.html`. Folding those two pages into `src/content/` would
retire the file and resolve F2 at the same time.

**F7 — three duplicate title/description pairs** from the hub twins. Harmless given the
canonical, but a crawler that fetches both forms sees identical `<title>` and
`<meta name="description">` before it reads the canonical. Emitting only `x/index.html` for
hubs (dropping the bare `x.html`) would remove the duplicate at source.

### P3 — optional

**F8 — `/privacy` and `/support` nav is a three-link dead end.** Adding the standard header
and footer when they are folded into the build (F6) resolves this as a side effect.

**F9 — the `MobileApplication` node is repeated on all 75 pages.** Truthful and harmless, but
it could be stated once on `/` and referenced by `@id` from the rest, as `Organization`
already is.

---

## Summary

| Section | PASS | WARN | FAIL |
|---|---|---|---|
| Crawl & indexability | 8 | 4 | 2 |
| Content availability | 3 | 0 | 0 |
| Metadata | 9 | 4 | 2 |
| Structured data | 4 | 0 | 1 |
| Performance / rendering | 4 | 2 | 0 |

**Findings: 1 × P0, 3 × P1, 3 × P2, 2 × P3.**

The single most impactful fix is **F1** — create the missing `formats` hub. It is the only
broken link on the site, it is in the breadcrumb of three pages, and it is the only place where
the structured data asserts something untrue.
