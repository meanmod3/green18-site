# GREEN18 site claims audit

**Date:** 2026-09-07
**Method:** every model claim in `/Users/Ben/Developer/green18-site/src/content/*.mjs` verified against the shipped Swift implementation at `/Users/Ben/Developer/green18/Sources/` (and the data pipeline at `Tools/DataCompiler/`). Code is ground truth; `docs/` was used only for orientation and for measured test outputs that are themselves cited to test files.
**Governing rule under test:** the website must never claim the model uses a signal the implementation does not actually use.

**Headline:** 11 of the 16 named claims verify TRUE or TRUE-with-nuance. **3 must change** (one of them repeated on ~10 pages), 2 are partly true. Two further defects were found that were not on the list, both material.

---

## 1. The claim table

Paths are relative to `/Users/Ben/Developer/green18/` unless marked `site:` (relative to `green18-site/src/content/`).

| # | Claim | Site file | Verdict | Evidence (Swift) | Note |
|---|---|---|---|---|---|
| 1 | Valuation is deterministic — same league config + same recorded pick sequence ⇒ identical result | `55-methodology.mjs:25,40`; `30-how-green18-ranks.mjs:33`; `33-dsv.mjs:76` | **TRUE** | `Tests/DraftEngineTests/MarketDeterminismHashTests.swift:139,150,161`; `Live/SurvivalProbability.swift:8-13`; `Backtest/BacktestMetrics.swift:14-19`; `Personalization/PersonalizedBoard.swift:22-25` | Strongest-evidenced claim on the site. Determinism is machine-pinned, including against dictionary-iteration order and bundle array order. `Green18App/State/DraftSessionStore.swift:3786-3800` records a real past divergence (two fresh stores) found and fixed by device testing — the pin exists because it was earned. |
| 2 | The model uses league scoring and roster construction to condition value | `30-how-green18-ranks.mjs:55,58`; `55-methodology.mjs:47` | **TRUE** | `Scoring/ScoringEngine.swift`; `Scoring/TePremiumScoring.swift:113`; `Contracts/MarketContext.swift:75-111` (`teamCountBucket`, `scoring`, `qbFormat`, `qbSlots`, `flexSlots`, `rosterSize`, `starterCount`); `Market/LeaguePrior.swift:5-20`; `Live/LiveScoreLedger.swift:326-341` (rosterNeed / starterUpgrade / benchDepth / overfill, bound ±7.0) | Measured, not just implemented: the displacement sweep (`Market/LeagueConditioningDisplacement.swift`, `Tools/DataCompiler/Tests/DataCompilerTests/LeagueConditioningDisplacementSweepTests.swift`) shows every scoring and team-count axis moves the board by a median ≥ 3 draft slots. Site's "settings re-rank players; they do not merely relabel them" is measurably correct. |
| 3 | The model uses positional scarcity | `30-how-green18-ranks.mjs:56`; `34-scarcity.mjs`; `22-scarcity.mjs` | **PARTLY TRUE** | `Live/PositionVelocity.swift:100,210`; `Live/TiersSurvival.swift:58,75`; `Live/LiveScoreLedger.swift:348,363,368` (tierCliff / leagueConsumption / recentRun) | Scarcity is real and multi-signal, but it is expressed as **availability pressure** (velocity, tier cliff, room consumption, run detection), *not* as the site's specific "cost of waiting one full turn at every position, compared against each other" — see MUST CHANGE #2. |
| 4 | The model uses replacement level / value over replacement | `22-scarcity.mjs:32,80`; `21-without-research.mjs:47`; `16-ai-assistant.mjs:54`; `30-how-green18-ranks.mjs:57`; +7 more pages | **FALSE as stated** | `Value/ReplacementValue.swift:85-94` (exists, tested); **`Green18App/State/DraftSessionStore.swift:1247-1253`** — the shipped baseline explicitly declines to use it: *"NOT ranking by value-above-replacement here … The capability exists and is tested; wiring it in is a deliberate, separate decision"* | The single most serious inaccuracy. See MUST CHANGE #1. The only production consumer of a replacement value is `Competitive/IncompleteReplacement.swift` (opponent-roster grading). `Green18App/State/DraftSessionStoreArchetypes.swift:305` passes `baselineByEntityId` into a parameter *named* `valueOverReplacement` — a misnomer in the code, and the likely origin of the site claim. |
| 5 | The model uses pick horizon (distance to your next selection) as an input | `37-pick-horizon.mjs`; `55-methodology.mjs:49` | **TRUE** | `Live/SurvivalProbability.swift:56,83,98` (`fromOverallPickExclusive` → `targetPick`, product over intervening picks only); `Live/TiersSurvival.swift:92` (`picksUntilUserReturns`); `Live/PickFitScore.swift:85-91` | The horizon is derived from the replayed draft state's real slot ownership, not an assumed snake formula. |
| 6 | The model estimates probability a player survives to your next pick | `55-methodology.mjs:49`; `19-automated.mjs:39,71`; `32-glossary.mjs:71` | **TRUE** | `Live/SurvivalProbability.swift:34-56` (∏(1−hazard) over intervening picks); `Live/SelectionHazard.swift:14-25` (hazard from the live distribution's own survival curve, confidence-blended) | Genuinely quantitative, with named risk bands (`:38-40`) and named strongest factors. Caveat: the *score ledger* still consumes the older categorical LOW/MEDIUM/HIGH (`Live/LiveScoreLedger.swift:353-361`); the quantitative estimate drives the recommendation, tags and UI. |
| 7 | The model uses position velocity (rate a position is coming off the board) | `55-methodology.mjs:48`; `22-scarcity.mjs` | **TRUE** | `Live/PositionVelocity.swift:26-40,210`; expected count from `DistributionCDF.probabilitySelectedBy` (`:100`); empirical-Bayes shrinkage `n/(n+k)` (`:18-22`); `Live/PositionChronicDemand.swift` (per-position credibility from the league's own roster settings) | Notably careful: shrunk early ("Pick 5 must not radically redefine the market") and clamped. |
| 8 | The model uses intervening-team demand (what the teams between you and your next turn need) | `55-methodology.mjs:48`; `37-pick-horizon.mjs:95` | **TRUE** | `Live/InterveningTeamDemand.swift:43,126,144,165`; consumed at `Live/SurvivalProbability.swift:83,103,108` | Demand is derived purely from each team's rostered positions + the league's roster rules (`:6-10`) — no opponent-personality modelling, as the code states and the site does not overclaim. |
| 9 | The model uses tier structure / tier collapse | `38-tier-collapse.mjs` | **TRUE** | `Live/TiersSurvival.swift:58` (tiers from value gaps + a versioned threshold, never hard-coded names), `:24-31` (`remainingInTier`, `nextTierGap`, `expectedPicksConsumedBeforeUserReturns`); `Live/LiveScoreLedger.swift:348` (tierCliff term) | Site's "tier structure is not a fixed label attached before the draft … it is recomputed as picks are recorded" (`38-tier-collapse.mjs:92`) is correct for `tierState(for:position:)`, which reads the shrinking available pool. |
| 10 | The model uses opportunity cost | `36-opportunity-cost.mjs`; `33-dsv.mjs:53`; `75-hub-draft-science.mjs:44-52` | **PARTLY TRUE / mostly generic** | `Competitive/OpponentGrading.swift:32,92` is the **only** `opportunityCost` in the codebase, and it grades an *opponent's already-resolved pick*. The user-facing decision (`Live/MarketRecommendation.swift:133-178`) is survival + live-ADP movement + model rank — no next-best-alternative term. No `nextBest`/`expectedBest`/`valueIfWait` exists anywhere. | `36-opportunity-cost.mjs` is written as general fantasy-football education ("in a fantasy draft"), not as a product claim, so it is not itself false. The problem is that `33-dsv.mjs:53` and `75-hub-draft-science.mjs` list opportunity cost inside GREEN18's own pipeline. See MUST CHANGE #3. |
| 11 | Superflex / QB format materially re-prices quarterbacks structurally | `40-superflex-qb.mjs:89`; `41-format-superflex.mjs` | **TRUE — and underclaimed** | `Contracts/MarketContext.swift:40-42,89-94`; `Market/LeaguePrior.swift:5-6` (QB/Superflex structure is a rung of the prior hierarchy, applied when the prior is built); axis-partitioned bundles `Resources/bundles/draft-market-axis-{ONE_QB,SUPERFLEX}-*.json` | Measured: `LeagueConditioningDisplacementSweepTests` gives ONE_QB vs SUPERFLEX a **median 21.0 / p90 43.9 draft-slot** displacement for QBs, against 2–5 slots for every other position. The site's "applied before the board is built rather than as an adjustment afterward" is literally true — format selects the bundle. |
| 12 | User preferences are confined to a personal rank and never move objective/market values | `55-methodology.mjs:32,73-74`; `18-algorithm.mjs:132`; `30-how-green18-ranks.mjs:61` | **TRUE (architecturally pinned), with one nuance** | `User/PersonalizationScoring.swift:18-22`; pinned by `Tests/Green18AppTests/MarketSeparationTests.swift:93,144`, `Tests/DraftEngineTests/UserIntelligenceTests.swift:288-289`, `Tests/DraftEngineTests/MergeGate2IntegrationTests.swift:275,319-320` ("only MY RANK moves") | The claim is exactly right about *values*. Nuance: `Personalization/PersonalizedBoard.swift:163` re-scores a per-user **copy** of `baseValue` by up to ±30% and `Green18App/State/DraftSessionStorePersonalizedBoard.swift:125` re-sorts the **default board** with it. Objective values are untouched (so "never alter them" holds), but "a separate personal layer shown alongside" understates that preferences reorder the primary board. Worth a one-clause tightening, not a correction. |
| 13 | No auto-draft, no platform integration, no accounts | `55-methodology.mjs:84-94`; `19-automated.mjs:24-26`; `10-office.mjs:112` | **TRUE** | Zero occurrences of `autodraft`/`autoDraft`/`autopick` in `Sources/`; zero occurrences of CloudKit / Firebase / OAuth / signIn / login; `Green18App/Onboarding/LeagueSettingsSteps.swift:222` states the same in-app; platform names exist only as a UI colour enum (`Green18App/Shell/PlatformBrandColor.swift:7`) | One qualification on "there is no networking path that uploads anything" (`55-methodology.mjs:94`): there **is** one network path — `DraftEngine/Refresh/BoardTransport.swift:4-16`, an anonymous read-only GET for a shared board file, ephemeral session, no cookies, no cache. It uploads nothing, so the claim survives; `54-about.mjs:52,59` already discloses it correctly. |
| 14 | Player facts come from open football data (nflverse, CC-BY) + the user's own recorded picks; no third-party ADP vendor | `18-algorithm.mjs:30`; `55-methodology.mjs:46,62`; ~20 footers | **TRUE — and stronger than claimed** | `Data/SourceAllowlist.swift:134-142` — exactly three sources: `nflverse-fact` (CC-BY-4.0, attribution string carried in code), `green18-projection` (first-party), `user-owned` (first-party). `:150-159`: *"No fantasy-platform ADP/consensus feed of any kind is a member of this dictionary."* Enforced by `assertApproved` (`:208`) and `isShippable` (`:217`), plus a byte-level forbidden-dataset marker scan at `Data/LicenceFieldProvenance.swift:407` | **No vendor name needs crediting beyond nflverse.** Two things the site should know: (a) the shipped "Market ADP" is *not* observed draft behaviour — `Resources/bundles/draft-market-provenance.json` records `derivationMethod: GREEN18_PROJECTION_RANK_TO_PSEUDO_PICK_NORMAL_PARAMETRIC` and `fetchLog: []`, and `Tools/DataCompiler/Sources/DataCompiler/ProjectionDerivedMarketBuilder.swift:12-33` states *"this is a PROJECTION, not an observed market. It never claims to be an average of real human draft behavior."* Real draft observations shipped: **zero**. (b) `Tools/portrait-pipeline/export.py:82` queries `api.sleeper.app` dev-side for an id crosswalk; its output is not shipped and not compiled in, but it sits outside the allowlist. Neither is a site claim defect — (a) creates one, at MUST CHANGE #4. |
| 15 | No injury prediction, no season forecast | `55-methodology.mjs:84-85`; `18-algorithm.mjs:101-103` | **TRUE** | `Value/LeagueProjections.swift:4-22` — pure composition of *realized* stats through the scoring rules, no prediction; `Value/GamesActiveProjection.swift:33-52` — a measured population transition rate, explicitly *"not a per-player forecast"*, and its calibration table is `nil` at runtime; `Value/InjuryRiskProfile.swift:9-32,214` | The only forward-looking element is a heavily shrunk availability haircut capped at 25%, whose own header reports holdout R² of 0.0004–0.0117 and states *"Next-season injury is MOSTLY NOISE."* It predicts no injury event. The site's negative claim holds comfortably. |
| 16 | Recomputation after a pick is effectively instant | `18-algorithm.mjs:112`; `19-automated.mjs:38,71`; `16-ai-assistant.mjs:47` | **TRUE, not misleading** | `Tests/AcceptanceTests/PerformanceAcceptanceTests.swift:64` (full 140-pick replay < 100 ms), `:76` (core recommendation recompute across the full mid-draft pool < 150 ms), `:107` (full competitive recompute < 300 ms), `:116` (league map < 100 ms) | Budgets are asserted in CI against the real acceptance fixture, and the file honestly discloses (`:10-21`) that two of the seven budgets measure a DraftEngine-level proxy rather than the UI component. Qualitative "effectively instant" is well within what is proven. |

---

## 2. MUST CHANGE

### #1 — "The board is ordered by margin over replacement" — FALSE, and it is on ~10 pages

**Where:** `22-scarcity.mjs:32,80`; `21-without-research.mjs:47`; `16-ai-assistant.mjs:54`; `09-competitive.mjs:42`; `11-home-league.mjs:36`; `12-last-minute.mjs:27`; `13-espn.mjs:25`; `14-yahoo.mjs:25`; `15-sleeper.mjs:40`; `17-chatgpt.mjs:43,50`; `65-scn-bpa-vs-need.mjs:69`; `19-automated.mjs:14`; and the pipeline stage `30-how-green18-ranks.mjs:57`.

**Why it is false, in two independent places:**

1. Value over replacement is **not computed for any shipped player value.** `Green18App/State/DraftSessionStore.swift:1247-1253` passes no `teamCount`/`rosterSlots` to `LeagueProjections.indexes`, with the comment: *"NOT ranking by value-above-replacement here … The capability exists and is tested; wiring it in is a deliberate, separate decision because it changes a property intent 1127 promoted and pinned."* The `valueOverReplacement` function at `Value/LeagueProjections.swift:218` is therefore unreached from the app.
2. **The default board is not ordered by any situational value at all.** `Green18App/State/DraftSessionStore.swift:3989-3998` defines three sort modes and marks `.adp` the default, `myRank` and `projectedPoints` explicitly *"opt-in, never the default."* `:4022-4028` orders `.adp` by live ADP (`commitBoardOrder`, `:3798-3800`: *"ascending live ADP, id tie-break"*), then applies the bounded preference re-sort. `:4004-4006` records that sorting the board by `modelRank` **was the defect** that was fixed.

So the board's ordering key is *live-adjusted market position*, and the situational-value ledger drives MY RANK (opt-in), the model tags, and the player profile screen.

**Minimal wording change.** Replace every instance of "margin over replacement" with a description of what actually orders the board:

> *"the value of this player against the ones you could realistically still get, in your league's scoring"*

→

> **"its live draft position in your league's format, updated by the picks recorded in your room"**

and for `30-how-green18-ranks.mjs:57`, replace the "Replacement Availability" stage body:

> *"Estimates the quality of the best realistic substitute you could get instead, which is what determines the true cost of passing on this player."*

→

> **"Prices how thin the position has become — how fast quality is leaving it, how close the next tier cliff is, and how much of it the room has already consumed."**

(Alternatively: wire `LeagueProjections.indexes`' existing, tested VOR path into `computeBaselines` and the claim becomes true. That is a product decision, not a copy fix.)

### #2 — "GREEN18 computes the cost of waiting one full turn at every position and compares those costs against each other" — FALSE

**Where:** `22-scarcity.mjs:29,80`; `34-scarcity.mjs:67,103`; `68-scn-kicker-defense.mjs:70`.

No such computation exists. There is no per-position "expected best available at your next turn minus best available now" anywhere in `Sources/` (no `nextBest`, `expectedBest`, `valueIfWait`, `costOfWaiting`). What exists is per-*player* survival probability (`Live/SurvivalProbability.swift:56`) and per-position availability pressure terms (`Live/LiveScoreLedger.swift:348-371`). The site describes a cross-position comparison the model does not perform.

**Minimal wording change:**

> *"It computes, for every position, what one full turn of waiting costs you — and then compares those numbers against each other."*

→

> **"For every player still on the board it computes the chance he survives to your next turn, and it tracks how fast each position is being consumed — so you can see which position is thinning under you."**

### #3 — Opportunity cost listed as a GREEN18 pipeline component — OVERSTATED

**Where:** `33-dsv.mjs:53` (the `core` string) and `75-hub-draft-science.mjs:44-52` (the hub's eight-stage ordering).

`36-opportunity-cost.mjs` itself is fine — it is written as general draft education and makes no product claim. But listing "opportunity cost" as a stage of GREEN18's own pipeline asserts a component that does not exist for the user. The only `opportunityCost` in the codebase (`Competitive/OpponentGrading.swift:32`) grades an *opponent's* completed pick.

**Minimal change:** drop `opportunity cost` from the `75-hub-draft-science.mjs:44-52` pipeline ordering and from `33-dsv.mjs:53`, leaving the eight canonical stages of `30-how-green18-ranks.mjs:53-61` as the single published pipeline. Keep `36-opportunity-cost.mjs` as an education page and link to it, rather than claiming it as a computed stage.

### #4 — ADP described as an average of real drafts, on the page about GREEN18's own dynamic ADP

**Where:** `04-adp.mjs:23` (*"ADP compresses thousands of drafts into one number"*), `:70` (*"where a player tends to be selected across a collection of drafts"*), `33-dsv.mjs:83` (*"estimates what the market tends to pay"*).

These are correct as *generic definitions of ADP*. But on a page titled "Dynamic Fantasy Football ADP" describing GREEN18's board, a reader will reasonably infer GREEN18's ADP is that. It is not: `Resources/bundles/draft-market-provenance.json` has an empty `fetchLog` and `derivationMethod: GREEN18_PROJECTION_RANK_TO_PSEUDO_PICK_NORMAL_PARAMETRIC`; `ProjectionDerivedMarketBuilder.swift:12-33` states *"ZERO THIRD-PARTY MARKET/ADP DATA OF ANY KIND FEEDS THIS FILE"* and *"this is a PROJECTION, not an observed market."* Shipped real draft observations: zero (`Data/LicenceFieldProvenance.swift:165`).

This does **not** contradict `55-methodology.mjs:62` ("does not license a third-party draft-position feed") — that line is true and well-supported. The risk is the inference, not a contradiction.

**Minimal change:** add one disambiguating sentence to `04-adp.mjs` after `:23`:

> **"GREEN18 does not license anyone's ADP. It computes its own projected draft position from open football data, then moves it with the picks you record — so what you are watching is your room, not an average of strangers' drafts."**

This turns the site's biggest exposure into its best differentiator.

### #5 — Copy defect: the draft clock is three different lengths

`33-dsv.mjs:90`, `34-scarcity.mjs:102`, `36-opportunity-cost.mjs:86`, `09-competitive.mjs:55` say "ninety-second clock"; `19-automated.mjs:14` says "sixty-second clock"; `17-chatgpt.mjs:49` says "forty seconds". Not an implementation claim, but a published factual inconsistency. Pick one.

---

## 3. UNDERCLAIMED — real capability the site does not mention

1. **A measured league-conditioning displacement table.** `Market/LeagueConditioningDisplacement.swift` + `Tools/DataCompiler/Tests/DataCompilerTests/LeagueConditioningDisplacementSweepTests.swift` measure, over the real 419-player population, how far each format axis actually moves the board — and adopt a bright line (`:27-30,37`): a median under one full draft slot is reported as **NOT MOVING THE BOARD**. Every axis clears it. **QB displacement between 1QB and Superflex is a median 21 draft slots** against 2–5 for every other position; TE premium moves TEs 10 slots while moving everyone else 1–2. The site asserts formats matter; it could *prove* it with a number, and no competitor publishes one.
2. **The board is partitioned into 24 precompiled market axes** (`Resources/bundles/draft-market-axis-{ONE_QB,SUPERFLEX}-{STANDARD,HALF_PPR,PPR,TE_PREMIUM}-{10,12,14}.json`), so format is applied by *selecting a different market*, not by nudging one. This is the strongest possible version of the "applied before the board is built" claim and it is invisible on the site.
3. **A leakage-safe backtest with four ablation comparators.** `Backtest/BaselineComparators.swift:5-34` builds A/B/C/D as progressive ablations of the *same* promoted engine, and `:30-34` documents that a comparator physically cannot observe a pick at or after its own target. `Backtest/BacktestMetrics.swift:9-12` scores Brier, calibration overall / by position / by draft phase, and expected-pick MAE. Very few consumer tools have this at all. (Read the UNVERIFIABLE section before publishing a *result* from it.)
4. **Named, bounded, individually-reasoned score components.** `Contracts/ScoreLedger.swift:51-87` gives every contribution an owner, a correlation group, a bound, a confidence and a reason string; `Live/LiveScoreLedger.swift:118-119` bounds rosterFit and availabilityPressure at ±7.0 each. The site says "the weights are proprietary" — but the *anti-double-counting architecture* is publishable and is the more impressive fact.
5. **The recommendation reasons are extracted from the actual model components, never written.** `Live/MarketRecommendation.swift:87-105` composes the reason string from `LiveAdpResult.components` and `SurvivalEstimate.strongestFactors` verbatim, and falls back to an honest "no strong live market signal either way" rather than inventing one. The site's "nothing is generated prose" claim is true in a much more specific and defensible way than it states.
6. **An explicit self-contradiction guard.** `Live/MarketRecommendation.swift:124-127`: a player very likely to still be available can never read "TAKE NOW" on live-ADP movement alone, because the card would then show "TAKE NOW" beside a high "% available". A published example of the model refusing to contradict itself is unusually credible material.
7. **Fail-closed licence provenance, field by field.** `Data/LicenceFieldProvenance.swift` registers every top-level field of every shipped bundle and fails the build on an unregistered field, a non-shippable licence, or a byte-level marker for a forbidden dataset (`:407`). The site says "a hard allowlist"; the reality is stricter and more interesting.
8. **Preference dials are bounded so no single slider can invert the model.** `Personalization/PersonalizedBoard.swift:17-36` states the adversarial contract (explainable / deterministic / bounded / non-inverting), `:163` caps the five-dial sum at 30% of base value, and neutral dials reproduce the unpersonalized board *exactly* (`PreferenceWeights.swift:43-48`). The site's separation claim is good; this is the mechanism that makes it trustworthy.
9. **Determinism is enforced against real, found bugs.** `DraftSessionStore.swift:3786-3800` documents a genuine non-determinism (dictionary iteration order in a tie-break) discovered on device and fixed at the source. "We found and fixed a real one" is far more persuasive than "we are deterministic."
10. **The value substrate is realized production, not projections.** `Tools/DataCompiler/scripts/build_players_snapshot.py:5` — `consensusRank` is derived from realized 2025 REG-season fantasy production under the league's own scoring. This *supports* the "no season forecasting" claim, and is a cleaner story than the site currently tells. It also means `consensusRank` is not a consensus of pundits; if any page implies expert consensus, that should be corrected too.

---

## 4. UNVERIFIABLE

1. **"On every device"** (`55-methodology.mjs:40`). Determinism is pinned within a process and across two fresh stores on one architecture. Cross-architecture bit-identical floating-point reduction is not pinned. *What would settle it:* run `MarketDeterminismHashTests` on arm64 device + x86_64 simulator and compare the recommendation hash. Low risk (the code sums over sorted keys throughout), but currently unproven.
2. **Whether the live layer improves accuracy.** `docs/adp-audit.md:2445-2495` records the measured comparator table: on both a run-free and a run-bearing synthetic draft, **D (full live model: velocity + intervening demand + recent run) does not beat B (league-adjusted ADP alone) on Brier** — 0.0614 vs 0.0398 on the run-bearing set — and the repo says so plainly rather than burying it. The claims in this audit's table (#6, #7, #8) are that the model *uses* these signals, which is true and verified. **No site page currently claims the live layer is more accurate, and none should until this is resolved.** *What would settle it:* the 2b-4 investigation already routed, and a backtest against real recorded drafts rather than a synthetic fixture.
3. **"No third-party software in the app"** (`54-about.mjs:58`). No analytics/ad/crash SDK was found in `Sources/`, but I did not audit the linked binary or SPM/Xcode dependency graph. *What would settle it:* `otool -L` on the shipped `.app` plus the resolved package list.
4. **In-app surfaces referenced by the site.** `Settings → Data sources` exists (`Green18App/Settings/SettingsScreen.swift:168`). `Settings → Data → Export league` (`56-contact.mjs:38`) is plausible (`DraftEngine/Session/ImportExport.swift`) but I did not confirm the exact menu path. *What would settle it:* one pass through the running app.
5. **The five browser calculators (`60`–`64`).** These are self-contained JS heuristics on the website (e.g. `62-tool-league-value.mjs:23`, "teams × starting slots"). They are reasonable as standalone teaching tools, but they do **not** mirror the app's math — the app's replacement demand is fractional and flex-aware (`Value/ReplacementValue.swift:50-73`), and the app does not use replacement in its board at all (MUST CHANGE #1). *What would settle it:* decide and state whether these are "simplified teaching calculators" (recommended — one line of copy) or claimed to reproduce the app. Currently the site does not say, and a reader may assume the latter.

---

## 5. Summary

- **Verified TRUE (or TRUE with a noted nuance):** 11 of 16 — 1, 2, 5, 6, 7, 8, 9, 11, 13, 15, 16, plus 12 and 14 with qualifications.
- **Partly true:** 2 — claims 3 and 10.
- **Must change:** 3 substantive (#1 margin over replacement, #2 cost-of-waiting comparison, #3 opportunity cost as a pipeline stage), plus #4 an inference risk about ADP provenance and #5 a copy inconsistency.
- **Most serious:** "the board is ordered by margin over replacement," repeated across roughly ten pages, contradicted twice over by the code — replacement value is never computed for a shipped player value, and the default board is ordered by live ADP with model rank explicitly opt-in.

The general pattern is not dishonesty. It is a site written from a specification brief while the implementation made deliberate, documented, conservative choices to *not* ship parts of that brief. The codebase is markedly more honest about its own limits than the website is, and in several places (§3) considerably more impressive.
