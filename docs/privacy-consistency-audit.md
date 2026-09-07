# GREEN18 marketing site — privacy consistency audit

verdict: pass

Audited 2026-09-07. Repo `/Users/Ben/Developer/green18-site`, branch `feat/topic-cluster-site`
(HEAD `5057340`). Governing handoff: `/Users/Ben/Downloads/privacyquestionnairehandoff.md`.
This was a verification lane: **no file in the repo was modified by this audit** except the
creation of this report.

## Findings

| # | Question | Result | Note |
|---|---|---|---|
| 1 | Zero-collection invariant (§4) | **PASS** | No third-party resource load, no analytics token, no network call in any page. |
| 2 | `privacy.html` / `support.html` unchanged (§5) | **PASS** | Byte-identical to `main` (SHA-1 match). |
| 3 | Policy covers §3's six points | **PASS** | 6 of 6 COVERED. |
| 4 | No overclaims (§3 last ¶) | **PASS** | Zero occurrences of encryption/certification/retention/GDPR/CCPA/DPO claims. |
| 5 | Marketing copy vs "Data Not Collected" | **PASS** | No sync/import/connect/account claim. The three platform pages explicitly *deny* integration. |
| — | Observation A (non-privacy) | note | 16 pages set `og:image` to a file that does not exist in `assets/`. |
| — | Observation B (non-privacy) | note | New pages are untracked in git; only `index.html` and `robots.txt` are modified-tracked. |

No defect was found within the audit's scope. Two non-privacy observations are recorded
below for the site owner; neither affects the App Privacy label or the policy page.

---

## Q1 — Zero-collection invariant

**Answer: the site collects nothing and makes no third-party request.**

### 1a. Every external-origin `src`/`href` in the generated HTML

```
grep -nEo '(src|href)="(https?:)?//[^"]*"' *.html | sort -u
```

Every hit falls into exactly two classes, and both are **navigation or metadata, not a
resource load**:

- `href="https://apps.apple.com/us/app/id6805706417"` — the App Store link (an `<a>` the
  visitor clicks). 60 occurrences across 15 pages. Expected per the brief.
- `href="https://green18.app/<slug>"` — `<link rel="canonical">` self-references, e.g.
  `index.html:10`. Same-origin, and a canonical link fetches nothing.

There is **no** off-origin `src` of any kind. The full set of resource-loading attributes
in the build is:

```
$ grep -nEo '<link[^>]*>' *.html | sort -u
… <link rel="icon"           href="/assets/icon.png" type="image/png">
… <link rel="apple-touch-icon" href="/assets/icon.png">
… <link rel="stylesheet"     href="/assets/site.css">
(privacy.html:10)  <link rel="stylesheet" href="style.css">
```

All root-relative, all same-origin. `assets/` contains exactly two files:

```
$ ls assets
icon.png  site.css
```

### 1b. No off-origin `<script src>`, `<iframe>`, `<img src>`, or web font

```
$ grep -n '<iframe' *.html          → (no output)
$ grep -nEo '<img[^>]*>' *.html     → (no output)
$ grep -nE '@import|url\(' assets/site.css style.css
rc=1   (no output — no CSS-side fetch, no @font-face URL)
```

Every `<script>` tag in the build is one of two inline forms, with **no `src` attribute on
any of them**:

```
$ grep -nEo '<script[^>]*>' *.html | sort -u
…:25:<script type="application/ld+json">      (JSON-LD structured data — inert)
…:203:<script>                                (the sticky-CTA snippet)
```

De-duplicating every inline `<script>` body across all 15 pages yields a **single** script,
identical everywhere (`index.html:203-217`):

```js
// Reveal the sticky CTA once the visitor leaves the hero viewport (§20).
(function () {
  var bar = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  var link = bar.querySelector('a');
  new IntersectionObserver(function (entries) {
    var on = !entries[0].isIntersecting;
    bar.classList.toggle('on', on);
    bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    link.tabIndex = on ? 0 : -1;
  }, { threshold: 0 }).observe(hero);
})();
```

It reads DOM geometry and toggles a class. It transmits nothing.

`privacy.html` and `support.html` contain **no `<script>` tag at all** (neither appears in
the `<script>` grep above).

### 1c. Analytics and beacon tokens — zero hits

Run over the generated HTML *and* the generator source, so a token cannot hide in a build
template:

```
$ grep -niE 'plausible|googletagmanager|gtag|google-analytics|segment\.|segment\.io|mixpanel|posthog|hotjar|clarity|fathom|cloudflareinsights|matomo|umami|beacon|sendBeacon|fetch\(|XMLHttpRequest|navigator\.send' *.html src/*.mjs src/content/*
rc=1
```

Exit status 1 = **no match**. Note this also proves there is no `fetch()`, no
`XMLHttpRequest`, and no `navigator.sendBeacon` anywhere on the site.

### Conclusion for Q1

The site is fully static and fully self-hosted. A visitor's browser issues requests to
`green18.app` only. Nothing is measured, stored, or transmitted to any party. Handoff §4's
escape hatch (*"if you do add site analytics, say so explicitly"*) **does not apply** — no
analytics were added, so the policy page's "we collect nothing" framing remains true and
needs no app/website split.

---

## Q2 — Policy and support pages unchanged

```
$ cd /Users/Ben/Developer/green18-site && git diff main --stat -- privacy.html support.html
(no output)   exit:0
```

Empty diff. Confirmed independently by content hash rather than by diff alone:

```
$ for f in privacy.html support.html; do
    a=$(git show main:$f | shasum | cut -d' ' -f1)
    b=$(shasum $f | cut -d' ' -f1)
    echo "$f main=$a work=$b"
  done
privacy.html main=cffa843370164e47ddefcabff1b7d65db8e0f183 work=cffa843370164e47ddefcabff1b7d65db8e0f183  IDENTICAL
support.html main=038171cf62fb3570d38400dca60667205cc3e2a0 work=038171cf62fb3570d38400dca60667205cc3e2a0  IDENTICAL
```

The full change surface of this branch against `main` is:

```
$ git diff main --stat
 index.html | 227 ++++++++++++++++++++++++++++++++++++++++-----------
 robots.txt |   2 +
 2 files changed, 199 insertions(+), 30 deletions(-)
```

**Neither registered URL was touched.** `https://green18.app/privacy` and
`https://green18.app/support` keep resolving exactly as Apple already has them (§5).

---

## Q3 — Policy content vs handoff §3

All six required points are COVERED. Quotes are from `privacy.html`.

**1. Device-local storage / no accounts / no server-side copy — COVERED**
`privacy.html:41-42`: *"Green18 is a local-first app. The following is stored **on your device only**, in the app's own private storage"*
`privacy.html:80-81`: *"**No accounts.** There is nothing to sign in to. Deleting the app's local data is the only 'sign out'"*
`privacy.html:138`: *"There is no copy anywhere else to delete."*
`privacy.html:60`: *"None of this is transmitted anywhere by Green18."*

**2. Anonymous public data fetch, no logs kept — COVERED**
`privacy.html:98-100`: *"Those requests are anonymous. They ask for the same file everyone gets and carry nothing about you, your league, your roster, your picks or your preferences — no account, no identifier, no cookies, no query."*
`privacy.html:115-117`: *"Green18's server keeps **no request logs**: request logging on the storage that serves the shared data is switched off, so your IP address and the headers above are used only to answer the request and are not retained."*
The page also enumerates exactly the three in-flight items the handoff names — IP
(`:103`), User-Agent (`:105-106`), `If-None-Match` (`:109-111`) — matching §1 precisely.

**3. No analytics / advertising / tracking / selling — COVERED**
`privacy.html:70-71`: *"**No collection.** No name, email address, phone number, identifier, usage data, diagnostics or crash reports are collected by the developer."*
`privacy.html:76-77`: *"**No tracking.** No advertising identifier, no tracking across other companies' apps or websites, no tracking domains."*
`privacy.html:84-85`: *"**No third-party software.** Green18 links no third-party SDKs, advertising, analytics or crash-reporting libraries."*
`privacy.html:32-33` (summary): *"Green18 collects **no** personal data. It has no accounts, no sign-in, no analytics, no advertising and no third-party software."*
*Minor observation, not a defect:* there is no literal "we do not sell your data" sentence.
It is entailed — nothing leaves the device, so there is nothing to sell — and adding a
selling clause is not required to be consistent with the label. Left unchanged, per the
verification-lane instruction.

**4. How to delete data, including the in-app control — COVERED**
`privacy.html:136-138`: *"**Delete.** Settings → Data → *Delete all local data* removes every league, draft, archived draft and preference from the device. Uninstalling the app also removes all of it."*

**5. Contact route `manager@green18.app` — COVERED**
`privacy.html:182-183`: *"manager@green18.app — the same address entered in App Store Connect."* (a live `mailto:` link)

**6. Effective date — COVERED**
`privacy.html:28`: *"**Effective date:** 2026-09-06"* (marked up as `<time datetime="2026-09-06">`)

---

## Q4 — Overclaim check

```
$ grep -niE 'encrypt|AES|TLS|SSL|certif|SOC ?2|ISO ?27001|GDPR|CCPA|complian|Data Protection Officer|DPO|retention|retain(ed|ing)? for|we retain' privacy.html
rc=1
```

Exit status 1 = **no match**. The page claims **no** encryption standard, **no**
certification, **no** retention period, **no** GDPR/CCPA compliance, and names **no** Data
Protection Officer. The only appearance of the retention concept is the negative form
—`privacy.html:117` *"are not retained"*— which is a factual denial, not a retention-period
claim, and is exactly what §1 established.

---

## Q5 — Marketing copy vs the label

```
$ grep -niE 'sync|syncing|import your|connect (your|to)|log ?in|login|sign ?in|sign ?up|create an account|your account|link your|integrat' *.html \
    | grep -vE '^(privacy|support)\.html'
```

Seven hits, on three pages, and **every one of them is a denial**. Each appears twice
(once in the page's JSON-LD FAQ block, once in the rendered `<details>`), so there are
three distinct sentences:

- `espn-fantasy-football-draft-helper.html:46, :203` — Q: *"Does GREEN18 connect to my ESPN league?"* A: *"No. GREEN18 is an independent app with no platform integration. You configure your league settings in GREEN18 and use it alongside your draft."*
- `yahoo-fantasy-football-draft-helper.html:46, :201` — Q: *"Does GREEN18 sync with my Yahoo draft?"* A: *"No. GREEN18 has no platform integration. You configure your league inside GREEN18 and use it as an independent board beside your draft."*
- `sleeper-fantasy-football-draft-helper.html:46, :200` — Q: *"Does GREEN18 import my Sleeper draft?"* A: *"No. GREEN18 does not integrate with any league platform. You enter your league settings in GREEN18 and use it alongside your draft."*

The platform-named pages are positioned as *"alongside"* / *"beside"* / *"Bring Your Own
Live Board"* throughout, never as an integration:

```
espn-…:113   <h1>Drafting on ESPN? Bring Your Own Live Board.</h1>
espn-…:9     description: "Use GREEN18 alongside your ESPN fantasy football draft…"
yahoo-…:113  <h1>Drafting on Yahoo? Add a Smarter Draft Board.</h1>
sleeper-…:113 <h1>Drafting on Sleeper? Give Yourself Another Layer.</h1>
```

There is **no** account, sign-up, sign-in or "your account" claim anywhere on the site.
Nothing on the new pages implies the app collects, uploads, or syncs anything, so nothing
contradicts "Data Not Collected".

**No content module was modified**, because no false claim was found.

Two related checks, both clean:

- `dynamic-fantasy-football-adp.html` is worded around *"market value"* and *"broad player
  value"* and never asserts the app ships or displays an ADP number, which keeps it
  consistent with `privacy.html:161-163` (*"This build carries no data from Fantasy Football
  Calculator or any other market-data provider — Average Draft Position is not shipped or
  shown"*) and with the standing "own draft value, no platform references" rule. Its FAQ
  defines ADP as a general fantasy-football term, not as a GREEN18 feature. Close to the
  line but not over it; flagging for the copy owner's awareness only.
- The pages carry an affiliation disclaimer route via the policy page
  (`privacy.html:168-170`): *"Green18 is not affiliated with, endorsed by or sponsored by
  the NFL, the NFL Players Association, any NFL club or any fantasy platform."*

---

## Non-privacy observations (outside audit scope, for the site owner)

**A. Missing social-card image.** 16 pages declare
`<meta property="og:image" content="https://green18.app/assets/green18-card.png">`
(e.g. `dynamic-fantasy-football-adp.html:16`), but the file does not exist:

```
$ ls assets/green18-card.png
ls: assets/green18-card.png: No such file or directory
```

Same-origin, so it is not a privacy problem — a social crawler simply gets a 404 and the
link preview renders without an image. Worth fixing before promoting the pages.

**B. New pages are untracked.** `git status --porcelain` shows the 14 topic pages,
`assets/`, `src/`, `sitemap.xml` and `staticwebapp.config.json` as `??`. Only `index.html`
and `robots.txt` are tracked modifications. The build is not yet committed.

---

## Operator-only task (handoff §2) — not doable from this lane

App Store Connect → GREEN18 → **App Privacy** → Edit:

> **"Do you or your third-party partners collect data from this app?"** → **No**

That single answer completes the questionnaire and yields the **"Data Not Collected"**
label. Do **not** answer "Yes" and declare Diagnostics or Usage Data out of caution — that
would require naming a purpose, a linkage and a tracking answer that are all false, and it
would contradict `privacy.html`.

This audit confirms the site side of that answer holds: the app collects nothing, the
policy page says so accurately without overclaiming, and the marketing site adds no
collection of its own.
