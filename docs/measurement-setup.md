# Measurement setup — what Ben does, what I do

Goal: a baseline for **AI citation share** — how often green18.app is used as a
grounding source in AI answers. Neither console can be set up from this repo;
both need account access. Everything else is already done.

**What I need back from you: one or two short code strings. That is all.**
Paste them into `VERIFICATION` in `src/site.mjs`, or just send them to me and
I will paste, rebuild and deploy.

---

## 1. Bing Webmaster Tools — the important one

Bing's **AI Performance** report is the only place that shows AI citations
directly. It covers Microsoft Copilot, Bing's AI answers and select partner
integrations, and it reports:

- **Total Citations** — times the site was cited as a source in an AI answer
- **Average Cited Pages**
- **Grounding Queries** — *the phrases the AI actually used when retrieving your
  content*. This is the most valuable field on the site: it tells you what
  questions you are being retrieved for, which is the whole objective.
- Per-page citation counts

Data lags roughly 2–3 days, and grounding queries are a sample rather than a
complete list.

### Steps

1. Go to **https://www.bing.com/webmasters** and sign in with a Microsoft
   account. (Any Microsoft account works — it does not need to be the green18
   Azure one, though using that one keeps things tidy.)
2. You will be offered two paths:
   - **Import from Google Search Console** — fastest, but only if you do
     section 2 first. It carries the verification across.
   - **Add site manually** — enter `https://green18.app`.
3. If adding manually, choose **HTML Meta Tag** verification. It shows you:
   ```html
   <meta name="msvalidate.01" content="THE-CODE-YOU-WANT" />
   ```
   **Send me `THE-CODE-YOU-WANT`.** I set `VERIFICATION.bing`, and the build
   emits both the meta tag on every page and `BingSiteAuth.xml` at the root, so
   either verification method Bing tries will succeed.
4. Once I have deployed, click **Verify** in Bing.
5. Then submit the sitemap: **Sitemaps → Submit sitemap →**
   `https://green18.app/sitemap.xml`
   (It is a sitemap index; Bing will follow it to all five section sitemaps.)

### After verification

- **IndexNow is already live.** The key file is served at
  `https://green18.app/a7f3c1e9b48d4a2f9c6e0b5d3a81f742.txt` and 70 URLs have
  been submitted and accepted. Bing associates it with the property
  automatically once verified — nothing more to do. Re-submit after any content
  deploy with `Tools/indexnow.sh`.
- The **AI Performance** report needs a few days of data before it shows
  anything. Do not read an empty report on day one as a bad sign.

---

## 2. Google Search Console

Google's generative-AI performance reporting lives inside Search Console. It is
less direct than Bing's — Google does not expose AI Overview citations as
cleanly — but it is where impressions and AI-surface data appear.

### Two ways to verify; pick one

**Option A — Domain property (recommended).** Covers every subdomain and both
protocols, and never breaks if hosting moves.

1. **https://search.google.com/search-console** → Add property → **Domain** →
   `green18.app`
2. Google gives you a TXT record. Add it at your **domain registrar's DNS**,
   alongside the four GitHub Pages A records already there:
   | Type | Host | Value |
   |---|---|---|
   | TXT | `@` | `google-site-verification=...` |
3. Wait for propagation (`dig +short TXT green18.app`), then click Verify.

**This one is entirely yours** — it is a DNS change and I have no registrar
access.

**Option B — URL-prefix property.** If you would rather not touch DNS:

1. Add property → **URL prefix** → `https://green18.app`
2. Choose **HTML tag** and send me the `content="..."` value → I set
   `VERIFICATION.google`.
   Or choose **HTML file**, send me the filename it offers
   (`google<hash>.html`) → I set `VERIFICATION.googleFile` and the build emits
   the file with the correct contents.
3. Deploy, then Verify.

### After verification

- Submit `https://green18.app/sitemap.xml` under **Sitemaps**.
- Note: Google has stated `llms.txt` is **not** used by Google Search. Ours is
  published for third-party agents only and is not an SEO lever — do not expect
  it to show up here.

---

## 3. The tracking baseline

Once both are verified, this table gets its first real numbers. Until then
every row is unmeasured, not zero.

| Topic | AI citations | Target |
|---|---:|---:|
| Draft-state valuation | — | ↑ |
| Dynamic ADP | — | ↑ |
| Fantasy draft assistant | — | ↑ |
| Superflex strategy | — | ↑ |
| Positional scarcity | — | ↑ |
| Fantasy cheat sheet | — | ↑ |
| Personalized rankings | — | ↑ |
| Live draft rankings | — | ↑ |

Read **grounding queries** in Bing first. They tell you which questions the
retrieval layer is actually asking, which is better guidance for what to write
next than any keyword tool.

---

## 4. Already done, for reference

- 68 pages, all server-rendered; every crawler tested receives an identical 200
  with full content (`docs/crawler-audit.md`).
- `robots.txt` allows both grounding and training crawlers, grouped by purpose.
- Five section sitemaps behind a sitemap index.
- IndexNow key published; 70 URLs submitted and accepted.
- `llms.txt`, generated from the same content modules the pages render.
- Organization, MobileApplication, TechArticle, FAQPage, BreadcrumbList and
  DefinedTermSet structured data.
