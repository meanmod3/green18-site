# Crawler audit and AI-crawler policy — green18.app

Audited 2026-09-07. Live production tests against `https://green18.app` (GitHub
Pages, custom domain) and the Azure Static Web Apps mirror.

## 1. Live audit findings

Every crawler user-agent tested received an **identical HTTP 200 with the full
server-rendered page**. There is no bot management, no CDN challenge, no JS
interstitial and no rate limiting in front of either host: GitHub Pages and
Azure Static Web Apps both serve plain static HTML to every agent equally.

| Agent | `/` | `/fantasy-football-draft-algorithm` | Content in raw HTML |
|---|---|---|---|
| Googlebot | 200 | 200 | yes |
| Bingbot | 200 | 200 | yes |
| OAI-SearchBot | 200 | 200 | yes |
| PerplexityBot | 200 | 200 | yes |
| GPTBot | 200 | 200 | yes |
| ClaudeBot | 200 | 200 | yes |
| Desktop browser (control) | 200 | 200 | yes |

The site is fully static: there is no client-side rendering of primary content
anywhere, so the `curl`-visible body is the whole page. This satisfies the
brief's §3.5 and §14 requirements by construction rather than by remediation.

**Nothing needs unblocking.** No WAF or bot-protection change is required.

## 2. Crawler classification

Verified against operator documentation on 2026-09-07. Crawler names and
policies change — re-verify before relying on this table.

| Crawler | Operator | Purpose | Source |
|---|---|---|---|
| Googlebot | Google | Search indexing (and the source of AI Overviews) | [docs](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) |
| Bingbot | Microsoft | Search indexing | [docs](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0) |
| OAI-SearchBot | OpenAI | **Search grounding** — surfaces sites in ChatGPT search | [docs](https://developers.openai.com/api/docs/bots) |
| PerplexityBot | Perplexity | **Search grounding** — explicitly *not* training | [docs](https://docs.perplexity.ai/guides/bots) |
| Claude-SearchBot | Anthropic | **Search grounding** | [docs](https://support.claude.com/en/articles/8896518) |
| Applebot | Apple | Search indexing (Siri, Spotlight, Safari) | [docs](https://support.apple.com/en-us/119829) |
| ChatGPT-User | OpenAI | User-triggered fetch; robots.txt "may not apply" | [docs](https://developers.openai.com/api/docs/bots) |
| Perplexity-User | Perplexity | User-triggered fetch; "generally ignores robots.txt" | [docs](https://docs.perplexity.ai/guides/bots) |
| Claude-User | Anthropic | User-triggered fetch | [docs](https://support.claude.com/en/articles/8896518) |
| GPTBot | OpenAI | **Training** — foundation models | [docs](https://developers.openai.com/api/docs/bots) |
| ClaudeBot | Anthropic | **Training** | [docs](https://support.claude.com/en/articles/8896518) |
| Google-Extended | Google | **Training + Gemini grounding** opt-out token (not a crawler) | [docs](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) |
| Applebot-Extended | Apple | **Training** opt-out token (does not crawl) | [docs](https://support.apple.com/en-us/119829) |
| CCBot | Common Crawl | Open crawl corpus, widely used as training input | — |
| anthropic-ai | Anthropic | Legacy/deprecated token, not in current docs | — |

### Two findings that matter

**Google-Extended does not control AI Overviews.** Google states it "does not
impact a site's inclusion in Google Search nor is it used as a ranking signal".
AI Overviews are served from the regular Search index via Googlebot, so the only
way out of AI Overviews is out of Search (or `nosnippet` / `max-snippet` /
`data-nosnippet`). Blocking Google-Extended therefore costs no search
visibility — it is purely a training/Gemini-grounding decision.

**A blanket "block AI" posture would destroy citation share.** OpenAI,
Perplexity, Anthropic and Apple all now separate training from
search-grounding. Blocking the grounding crawlers removes the site from AI
answers entirely, which is the opposite of this project's objective.

## 3. Policy — ruled by Ben, 2026-09-07

**Allow both grounding and training.**

Grounding access is what AI citation share depends on and was never in doubt.
Training access was ruled as a deliberate bet rather than left as a default:
being present in training data is how a model knows the product exists without
live retrieval, which compounds for a site with no existing reputation. The
trade-off accepted is that training use is irrevocable — content already
absorbed cannot be withdrawn.

`robots.txt` is generated from `src/build.mjs`, where the agent list is grouped
by purpose so the policy stays legible. Do not hand-edit the published file.

## 4. llms.txt — what it is and is not for

Published at `/llms.txt`, generated from the same content modules the pages
render so it cannot drift.

**Google has stated it does not use `llms.txt` for Search.** It is not an SEO
lever and is not treated as one here. Its value is with third-party agents that
voluntarily read it. It is deliberately written to state what GREEN18 is *not*
as prominently as what it is, because the misreadings worth pre-empting are
"it's a chatbot", "it syncs with my league" and "it drafts for me".

## 5. IndexNow

The key is published at `/<key>.txt` (generated by the build; the filename and
body are both the key). Submission is a separate step — see
`Tools/indexnow.sh`, which POSTs the changed URL list to
`https://api.indexnow.org/indexnow`. Fantasy content decays in hours, so
submission should run on every content deploy during draft season.

## 6. Measurement — operator setup required

AI citation share cannot be measured from this repo. Both reports need account
access:

- **Bing Webmaster Tools → AI Performance** — total citations, average cited
  pages, grounding queries (the phrases the AI used when retrieving cited
  content) and page-level citation counts, across Copilot and Bing AI answers.
  Data lags roughly 2–3 days and grounding queries are a sample.
- **Google Search Console** — generative AI performance reporting.

Verify the property, then baseline the topics in the brief's §11 table.
