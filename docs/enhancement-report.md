# GREEN18 — AI retrieval & DSV authority enhancement

Delivered 2026-09-07. 70 pages live on green18.app and the Azure mirror.

## Executive summary

The site was already structurally close to what the brief asks for: every
concept in §2's taxonomy already had a canonical page, crawl depth was 2, and
all primary content was server-rendered. So this was **not** a build. It was an
audit that found the site was describing a model the code does not implement,
and a correction pass.

The headline finding: **the site claimed the board is ordered by each player's
"margin over replacement" on roughly ten pages, and that is false twice over.**

1. Value over replacement is never computed for any shipped player value.
   `DraftSessionStore.swift:1247` deliberately declines to call it — *"NOT
   ranking by value-above-replacement here … wiring it in is a deliberate,
   separate decision."* The capability exists and is tested; it is not wired in.
2. The default board is not ordered by any situational value.
   `HierarchySortMode` (`:3989`) defaults to `.adp` — live-adjusted market
   position — with MY RANK and Projected Points marked *"opt-in, never the
   default."* Ordering the board by model rank was itself a defect they fixed.

Two further claims were also unsupported, and one page created a false
inference. All are corrected. §24's twelve questions now answer from the site
alone; one of them could not before.

## DSV architecture

Canonical URL: `/draft-science/draft-state-valuation`. Canonical definition,
used verbatim wherever the concept is defined:

> Draft-State Valuation (DSV) is a fantasy-football draft valuation method that
> recalculates a player's value based on the current state of a specific draft.

The published pipeline is now the eight stages that map to shipped code:

| stage | implemented by |
|---|---|
| Baseline Value | `Value/LeagueProjections.swift` |
| League Scoring Adjustment | `ScoringEngine`, `Contracts/MarketContext.swift` |
| Positional Scarcity | `Live/PositionVelocity.swift` |
| **Availability Pressure** | `LiveScoreLedger` tierCliff / leagueConsumption / recentRun |
| Roster Fit | `LiveScoreLedger` rosterFit |
| Pick-Horizon Risk | `Live/SurvivalProbability.swift`, `Live/InterveningTeamDemand.swift` |
| Market Movement | live ADP |
| User Preference | `User/PersonalizationScoring.swift` |

Stage 4 was called **Replacement Availability** and described a computation
that does not exist. It is renamed and re-described.

**Opportunity cost was removed as a pipeline stage.** The only `opportunityCost`
in the codebase grades an *opponent's already-completed pick*. It remains a
first-class education page, linked as the idea that motivates the sequence
rather than claimed as a step in it.

## Content changes

**Corrected (23 files).** Every "GREEN18 computes / ranks by / orders by margin
over replacement" claim. The rule applied sentence by sentence: teaching
replacement value as a **concept** is true fantasy theory and stays;
claiming **GREEN18 computes it** does not. `/draft-science/replacement-value`
still owns the idea.

**Corrected.** "GREEN18 computes the cost of waiting one full turn at every
position and compares those costs against each other" — no such computation
exists (`costOfWaiting`, `nextBest`, `expectedBest`, `valueIfWait` appear
nowhere in `Sources/`). Replaced with what is computed: per-player survival
probability to the next turn, and per-position consumption rate.

**Disambiguated — and this is a strength.** `/dynamic-fantasy-football-adp`
defined ADP generically as an average of thousands of real drafts. Correct as a
definition, but on that page a reader infers GREEN18's numbers are that. They
are not: `ProjectionDerivedMarketBuilder.swift` states *"ZERO THIRD-PARTY
MARKET/ADP DATA OF ANY KIND FEEDS THIS FILE"*, and shipped real draft
observations are zero. The pages now say plainly that GREEN18 licenses no feed
and computes its own projected draft position. **No superiority claim is made** —
the repo's own backtest does not support one.

**Created.** `/formats/` (see below) and a `GREEN18` glossary term.

**Preserved deliberately.** §4's four protected statements survived a
site-wide rewrite and are now guarded. The determinism argument on the AI pages
— its entire thesis — is untouched; only the description of *what* is computed
changed.

## Technical discovery changes

**P0 fixed: `/formats/` was a 404 that three pages' structured data asserted as
a parent.** `formats` was in `SECTION_NAMES` without a hub, so every
`/formats/*` page emitted a breadcrumb — visible and in `BreadcrumbList` —
pointing at a URL returning 404 on both hosts. It was the only broken link
among 4,763 followed, and the only structured-data falsehood. Fixed with a real
hub, which also gave the section its missing entry point.

**P1 fixed.** `/privacy` and `/support` had no canonical, OpenGraph, Twitter
card or structured data while being listed in the sitemap. All added — **head
only**, 61 insertions and zero deletions per file, because the policy body is
pinned to the app repo and is what App Review reads.

**Also:** a `WebSite` node is emitted site-wide and articles declare
`isPartOf`, so every `@id` reference resolves across every graph.

**Mobile conversion (§19).** The sticky bottom CTA is removed, along with the
body padding reserved for it. The sticky header's Download button is now the
sole persistent mobile conversion surface. No conversion UI covers content.

## Internal-link changes

Zero orphans. 485+ internal links. Every `/draft-science/*` page is required by
the build to link a scenario, a tool and a product page.

## Validation

- `node src/build.mjs` — 70 pages, **28 enforced invariants**, green
- §24: **all twelve questions answerable** from the citable layer
- Claims: 11 of 16 verified true against Swift; 3 corrected; 2 partly-true
  sharpened
- Structured data: valid JSON on every page, zero dangling `@id` references,
  **zero fabricated authority** (no `aggregateRating`, `reviewCount`, `price`
  or `offers` anywhere in 75 graphs)
- Crawl: max depth 2; all crawlers receive identical 200s with full content
- Accessibility: WCAG 2.2.2 pause control added for the 32s hero loop

Guards added this pass, **each mutation-verified**: three claims regression
pins, §4 protected language, DSV acronym expansion, and the canon's presence in
the citable layer.

## Remaining opportunities (deferred, not forgotten)

1. **Ten underclaimed capabilities**, led by a measured Superflex displacement
   of a median 21 draft slots for QBs against 2–5 for every other position.
   Real original data from the repo's own test suite and exactly the
   information gain §8 wants — but publishing measured figures is a disclosure
   decision. **Operator ruling required.**
2. `/data/draft-market-index` — held on provenance.
3. `sameAs` on Organization — the App Store URL still 404s; adding it would
   repeat the `/formats/` defect. Queued for release.
4. `www.green18.app` certificate — queued for after App Review.
5. Measurement baseline — needs Bing Webmaster Tools and Search Console
   property access.

## Claims audit

Full evidence: `docs/claims-audit.md`. Summary of what could not be verified
and was therefore not published:

- **No accuracy or superiority claim appears anywhere on the site.** The repo's
  own backtest shows the live layer does not beat league-adjusted ADP on Brier
  score. No page claimed it did; none may.
- **No performance numbers** are published, though the acceptance suite proves
  generous budgets.
- **No injury or season prediction** is claimed — correctly: the only
  forward-looking element is a shrunk availability haircut whose own header
  reports holdout R² of 0.0004–0.0117 and states *"Next-season injury is MOSTLY
  NOISE."*
- One nuance left unchanged but worth knowing: preferences never move objective
  values (architecturally pinned), but they do reorder the **default** board by
  up to ±30% on a per-user copy. "A separate personal layer" slightly
  understates that.
