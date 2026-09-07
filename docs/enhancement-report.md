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

1. ~~Ten underclaimed capabilities~~ — **DONE**, with one deliberate exclusion.
   Published: the 24 separately compiled markets; the one-draft-slot bright
   line; owned/correlation-grouped/bounded score components; reasons extracted
   from the components that moved rather than written; the self-contradiction
   guard; fail-closed per-field licence provenance; determinism as a repaired
   and pinned property; realized production as the value substrate; bounded
   preference dials.

   **UPDATE 2026-09-07 — the figure is now published.** green18 PR #177
   (merged, `b036028`) pins every axis and position in
   `LeagueConditioningDisplacementSweepTests`, with ordering assertions and a
   `max(1.5 slots, 20%)` tolerance, mutation-verified. With the figure defended
   by a test it became safe to publish, and the site now states that Superflex
   displaces quarterbacks by a median of **19** draft slots against **6** for
   the next-largest position.

   **Note the figure was 19, not the 21 quoted in older docs — it had already
   drifted, unnoticed, exactly as predicted.** The site holds it in one
   constant (`DISPLACEMENT` in `src/site.mjs`) and the build now rejects any
   *other* figure appearing in copy, so the site cannot silently disagree with
   the code. Re-pinning in the app repo means changing that constant in the
   same sitting.

   Original reasoning, retained: **not published: any displacement figure.** The Superflex "median 21 draft
   slots" number is PRINTED by `LeagueConditioningDisplacementSweepTests`, not
   asserted by it — its only assertions are `n > 300` and `median > 0` — so the
   value moves whenever the shipped player data moves, and it moved on
   2026-09-04/05. A number on the site that no test defends is a number that
   rots silently. The method and the threshold are published; the figure is
   pinned out of the build in both digit and spelled-out form.

   *Recommended follow-up in the app repo:* pin the sweep's per-axis medians in
   the test. Then the figure becomes publishable, because the site and the code
   can no longer diverge without CI saying so. Patch for a publication-guard
   comment is at `/tmp/green18-publication-guard.patch` (operator's call).
2. `/data/draft-market-index` — held on provenance.
3. `sameAs` on Organization — the App Store URL still 404s; adding it would
   repeat the `/formats/` defect. Queued for release.
4. `www.green18.app` certificate — queued for after App Review.
5. Measurement baseline — needs Bing Webmaster Tools and Search Console
   property access.

## Claims audit

Full evidence: `docs/claims-audit.md`. Summary of what could not be verified
and was therefore not published:

- **No accuracy or superiority claim appears anywhere on the site, and none
  may be added.** The evidence has two dates and they disagree; the later one
  governs.

  **2026-08-30** — green18 `dd46757`, intent 1120 Wave-4 exit gate
  (`docs/dynamic-adp-completion-report.md` §39). One synthetic fixture, the §40
  acceptance draft:

  | comparator | Brier |
  |---|--:|
  | A static Market ADP | 0.0642 |
  | B league-adjusted | 0.0642 |
  | C league + velocity | 0.0482 |
  | D full live + demand | 0.0560 |

  On that single fixture the live comparators beat B.

  **2026-09-04** — `docs/adp-audit-2b4-comparator.md`, intent 1148 slice 2b-4.
  Three independent and more rigorous fixtures, read through the same promoted
  comparators. The 08-30 result does not replicate:

  | set | A | B | C | D |
  |---|--:|--:|--:|--:|
  | Run-free | 0.0363 | 0.0363 | 0.0366 | 0.0628 |
  | Run-bearing | 0.0398 | 0.0398 | 0.0410 | 0.0614 |
  | Realistic need-driven | 0.0149 | 0.0149 | 0.0150 | **0.0451** |

  The repo's own words: *"D loses to B on every set measured so far, including
  the one built specifically to give the live layer realistic, emergent,
  multi-team-correlated runs to detect."* C sits at parity with B, not ahead of
  it. A double-count was then found and fixed, closing 85–91% of D's excess
  error (realistic set 0.0451 → 0.0163) — but the report states plainly:
  *"D still does not formally beat B on any set (the honest headline stands)."*

  So: **the live layer does not currently beat league-adjusted ADP on Brier
  score**, on the best evidence available. Separately, no licensed historical
  dataset ships at all — every number above is synthetic — so even a favourable
  result would not support a product claim. Real draft data is the repo's own
  outstanding item 47.

  *Process note: this entry was wrong twice before it was right. It first
  repeated an audit summary without opening the numbers; the "correction" then
  used the 08-30 table, which a newer document had already superseded. Checking
  the first search hit is not checking.*

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
