/* GREEN18 engine — web transcription of the iOS DraftEngine.
 *
 * This is not an approximation. Every constant, guard, clamp and rounding
 * step below is transcribed line-for-line from the Swift, so the same inputs
 * produce the same numbers:
 *
 *   PersonalizedBoard.swift        — the five dial contributions, the ±30%
 *                                    total cap and its proportional rescale
 *   PersonalizedBoardBounds        — 0.10 / 0.15 / 0.05 fractions, 36-pick
 *                                    risk normalisation, age 27 ± 6, exp 4 ± 4,
 *                                    1.0 round shift, 0.75–1.25 aggression,
 *                                    0.30 total, 12 picks/round default
 *   RookieDraftCapitalPrior.SeasonPointsEnvelope — running-minimum isotonic
 *                                    build + interpolating points(forRank:)
 *   PhilosophyDerivation.swift     — five axes -> twelve profile dimensions,
 *                                    superflex gating, confidence
 *   PreferenceWeights.swift        — clampDial
 *   QueuePreferenceMapping.swift   — strengths, pressure blend, ±2.5 bound
 *   DraftModelArtifact.swift       — ±2.5 queue, ±6.0 personalization total
 *
 * Where the Swift returns nil ("un-fire, never guess"), this returns 0 rather
 * than substituting a default — the honest behaviour is no contribution, not
 * an invented one.
 */

'use strict';

(function () {


// ---- bounds ------------------------------------------------------------

const Bounds = {
  riskToleranceValueFraction: 0.10,
  riskNormalizationPicks: 36,
  floorVsUpsideValueFraction: 0.15,
  youthVsVeteransValueFraction: 0.05,
  youthReferenceAge: 27,
  youthAgeSpread: 6,
  youthReferenceYearsExperience: 4,
  youthExperienceSpread: 4,
  roundShiftPicks: 1.0,
  positionalAggressionFloor: 0.75,
  positionalAggressionCeiling: 1.25,
  positionalAggressionSwing: 0.25,
  totalValueFraction: 0.30,
  defaultPicksPerRound: 12,
};

const EngineeringDefaultBounds = { personalizationTotal: 6.0, personalizationQueue: 2.5 };

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** PreferenceWeights.clampDial */
function clampDial(raw) {
  if (!Number.isFinite(raw)) return 0;
  return clamp(raw, -1, 1);
}

// ---- SeasonPointsEnvelope ----------------------------------------------

/** Isotonic by running minimum, exactly as the Swift init builds it: points
 *  may never rise as rank worsens. */
function makeEnvelope(known) {
  const sumByRank = new Map();
  for (const e of known) {
    const cur = sumByRank.get(e.rank) || { total: 0, count: 0 };
    sumByRank.set(e.rank, { total: cur.total + e.points, count: cur.count + 1 });
  }
  const averaged = [...sumByRank.entries()]
    .map(([rank, v]) => ({ rank, points: v.total / v.count }))
    .sort((a, b) => a.rank - b.rank);

  const ranks = [], points = [];
  let runningMin = Infinity;
  for (const e of averaged) {
    runningMin = Math.min(runningMin, e.points);
    ranks.push(e.rank);
    points.push(runningMin);
  }
  return { ranks, points, isEmpty: ranks.length === 0 };
}

/** points(forRank:) — exact rank, else linear interpolation between the
 *  bracketing known ranks, clamped to the ends. Returns null where the Swift
 *  returns nil. */
function envelopePoints(env, rank) {
  if (env.isEmpty) return null;
  let lowerIndex = null;
  for (let i = 0; i < env.ranks.length; i++) {
    const knownRank = env.ranks[i];
    if (knownRank === rank) return env.points[i];
    if (knownRank < rank) { lowerIndex = i; continue; }
    if (lowerIndex === null) return env.points[0];
    const lowerRank = env.ranks[lowerIndex];
    const fraction = (rank - lowerRank) / (knownRank - lowerRank);
    return env.points[lowerIndex] + (env.points[i] - env.points[lowerIndex]) * fraction;
  }
  return env.points[env.ranks.length - 1];
}

// ---- the five dial contributions ---------------------------------------

function riskToleranceContribution(s, w) {
  if (w.riskTolerance === 0 || !s.outcomeBand) return 0;
  const width = s.outcomeBand.p90 - s.outcomeBand.p10;
  const normalizedWidth = clamp(Math.max(0, width) / Bounds.riskNormalizationPicks, 0, 1);
  return w.riskTolerance * normalizedWidth * Bounds.riskToleranceValueFraction * s.baseValue;
}

function floorVsUpsideContribution(s, w, env) {
  if (w.floorVsUpside === 0 || !s.outcomeBand || env.isEmpty || s.baseValue === 0) return 0;
  const ceilingRank = Math.max(1, Math.round(s.outcomeBand.p10));
  const floorRank = Math.max(1, Math.round(s.outcomeBand.p90));
  const ceilingValue = envelopePoints(env, ceilingRank);
  const floorValue = envelopePoints(env, floorRank);
  if (ceilingValue === null || floorValue === null) return 0;

  const target = w.floorVsUpside > 0 ? ceilingValue : floorValue;
  const rawFraction = (target - s.baseValue) / s.baseValue;
  const bound = Bounds.floorVsUpsideValueFraction;
  const boundedFraction = clamp(rawFraction, -bound, bound);
  return boundedFraction * Math.abs(w.floorVsUpside) * s.baseValue;
}

function consensusVsContrarianContribution(s, w, env) {
  if (w.consensusVsContrarian === 0 || s.marketPickRank == null || s.modelRank == null
      || env.isEmpty || s.baseValue === 0) return 0;

  const picksPerRound = Math.max(1, s.leagueTeamCount ?? Bounds.defaultPicksPerRound);
  const roundBound = Bounds.roundShiftPicks * picksPerRound;
  const gap = s.modelRank - s.marketPickRank;
  const rawShift = w.consensusVsContrarian * gap;
  const boundedShift = clamp(rawShift, -roundBound, roundBound);
  const targetRank = Math.max(1, s.modelRank + Math.round(boundedShift));

  const targetValue = envelopePoints(env, targetRank);
  if (targetValue === null) return 0;
  return targetValue - s.baseValue;
}

function youthVsVeteransContribution(s, w) {
  if (w.youthVsVeterans === 0 || s.baseValue === 0) return 0;
  let youthScore;
  if (s.ageAtSeasonStart != null) {
    youthScore = clamp((Bounds.youthReferenceAge - s.ageAtSeasonStart) / Bounds.youthAgeSpread, -1, 1);
  } else if (s.yearsExperience != null) {
    youthScore = clamp((Bounds.youthReferenceYearsExperience - s.yearsExperience) / Bounds.youthExperienceSpread, -1, 1);
  } else {
    return 0;   // neither shipped: un-fire, never guess.
  }
  return w.youthVsVeterans * youthScore * Bounds.youthVsVeteransValueFraction * s.baseValue;
}

function positionalAggressionContribution(s, w, env) {
  if (w.positionalAggression === 0 || s.positionNeed == null || s.modelRank == null
      || env.isEmpty || s.baseValue === 0) return 0;

  const picksPerRound = Math.max(1, s.leagueTeamCount ?? Bounds.defaultPicksPerRound);
  const roundBound = Bounds.roundShiftPicks * picksPerRound;
  const clampedNeed = clamp(s.positionNeed, 0, 1);
  const aggressionMultiplier = 1.0 + w.positionalAggression * Bounds.positionalAggressionSwing;
  const boundedMultiplier = clamp(aggressionMultiplier,
    Bounds.positionalAggressionFloor, Bounds.positionalAggressionCeiling);
  const rawShift = clampedNeed * roundBound * boundedMultiplier;
  const boundedShift = clamp(rawShift, 0, roundBound);
  const targetRank = Math.max(1, s.modelRank - Math.round(boundedShift));

  const targetValue = envelopePoints(env, targetRank);
  if (targetValue === null) return 0;
  return targetValue - s.baseValue;
}

// ---- PersonalizedBoard.value(for:weights:) ------------------------------

/** Returns { baseValue, total, contributions[] }. The raw sum is capped at
 *  ±30% of |baseValue| and, when capped, every contribution is rescaled
 *  proportionally so the parts still sum to the whole. */
function personalizedValue(signals, weights, env) {
  const contributions = [];
  const push = (dial, adjustment) => { if (adjustment !== 0) contributions.push({ dial, adjustment }); };

  push('riskTolerance', riskToleranceContribution(signals, weights));
  push('floorVsUpside', floorVsUpsideContribution(signals, weights, env));
  push('consensusVsContrarian', consensusVsContrarianContribution(signals, weights, env));
  push('youthVsVeterans', youthVsVeteransContribution(signals, weights));
  push('positionalAggression', positionalAggressionContribution(signals, weights, env));

  const rawTotal = contributions.reduce((a, c) => a + c.adjustment, 0);
  const cap = Bounds.totalValueFraction * Math.abs(signals.baseValue);
  const boundedTotal = clamp(rawTotal, -cap, cap);

  let finalContributions = contributions;
  if (boundedTotal !== rawTotal && rawTotal !== 0) {
    const scale = boundedTotal / rawTotal;
    finalContributions = contributions.map(c => ({ dial: c.dial, adjustment: c.adjustment * scale }));
  }

  return {
    entityId: signals.entityId,
    baseValue: signals.baseValue,
    total: signals.baseValue + boundedTotal,
    contributions: finalContributions,
  };
}

// ---- queue layer -------------------------------------------------------

function explicitPreferenceStrength(status) {
  switch (status) {
    case 'FAVORITE': return 1.0;
    case 'PREFER':   return 0.5;
    case 'NEUTRAL':  return 0.0;
    case 'AVOID':    return -1.0;
    default:         return 0.0;
  }
}

function queueAdjustment(status, pressure) {
  if (status === 'NEUTRAL') return 0;
  const strength = explicitPreferenceStrength(status);
  const blend = pressure.hasEvidence ? (0.5 + 0.5 * pressure.magnitude) : 0.5;
  const b = EngineeringDefaultBounds.personalizationQueue;
  return clamp(strength * blend * b, -b, b);
}

function queueReason(status, pressure) {
  switch (status) {
    case 'NEUTRAL':
      return 'NEUTRAL — No explicit queue preference is set for this player.';
    case 'AVOID':
      return 'DOWN — You marked this player to avoid; the objective values are close enough for that preference to matter.';
    case 'FAVORITE':
      return (pressure.hasEvidence && pressure.magnitude >= 0.5)
        ? 'UP — You marked this player as a favorite, and the current tier is unlikely to survive to your next pick.'
        : 'WAIT — This player is in your queue, but the model expects comparable options to remain available through your next turn.';
    case 'PREFER':
      return 'WAIT — This player is in your queue, but the model expects comparable options to remain available through your next turn.';
    default: return '';
  }
}

// ---- PhilosophyDerivation ----------------------------------------------

/** Five answered axes fan out to twelve profile dimensions. Deliberately not
 *  twelve independent computations — the user answered five questions.
 *  superflexAggression is gated to 0 outside a superflex league. */
function deriveProfile(axes, qbFormat) {
  const isSuperflexRelevant = qbFormat === undefined ? true : qbFormat === 'SUPERFLEX';
  return {
    availabilityRiskTolerance: axes.risk,
    volatilityTolerance: axes.risk,
    roleSecurityPreference: axes.risk,
    youthUpsidePreference: axes.risk,
    marketDeviationTolerance: axes.modelConviction,
    scheduleEmphasis: axes.seasonHorizon,
    playoffScheduleEmphasis: axes.seasonHorizon,
    scarcityAggression: axes.rosterAggression,
    superflexAggression: isSuperflexRelevant ? axes.rosterAggression : 0,
    benchUpsidePreference: axes.benchConstruction,
    handcuffPreference: axes.benchConstruction,
    starsVsDepthPreference: axes.benchConstruction,
  };
}

/** computeConfidence: cards drive the base, each override adds a capped bump. */
function computeConfidence(answeredCards, advancedOverrides) {
  const base = clamp(answeredCards, 0, 5) / 5.0;
  const overrideBump = clamp(advancedOverrides, 0, 12) * 0.02;
  return { answeredCards, advancedOverrides, overall: Math.min(1.0, base + overrideBump) };
}


// ---- Chain A: projected season points ----------------------------------
// GamesActiveProjection + LeagueProjections + ScoringEngine, transcribed.
// The app always takes the fallback branch (no calibration table ships) and
// never passes ageHazard, so agePrior is 1.0 — reproduced, not guessed.

const GamesActive = {
  regularSeasonGameCount: 17,
  minimumGamesForRateProjection: 3,
  rbExperienceHaircutStartYear: 6,
  rbExperienceHaircutPerYear: 0.02,
  rbExperienceMaximumHaircut: 0.15,
};

function experienceAdjustment(position, yearsExperience) {
  if (position !== 'RB' || yearsExperience == null
      || yearsExperience <= GamesActive.rbExperienceHaircutStartYear) return 1.0;
  const extraYears = yearsExperience - GamesActive.rbExperienceHaircutStartYear;
  const haircut = Math.min(GamesActive.rbExperienceMaximumHaircut,
    GamesActive.rbExperienceHaircutPerYear * extraYears);
  return 1.0 - haircut;
}

/** AvailabilityModel.estimate — fallback branch only, which is the branch the
 *  shipped app always takes. availabilityMultiplier is the injury model's
 *  output; absent, it is 1.0. */
function expectedGames(position, actualGamesPlayed, yearsExperience, availabilityMultiplier) {
  const experiencePrior = experienceAdjustment(position, yearsExperience);
  const agePrior = 1.0;                       // ageHazard is never passed at runtime
  const injuryRiskPrior = (availabilityMultiplier != null
    && Number.isFinite(availabilityMultiplier) && availabilityMultiplier > 0)
    ? availabilityMultiplier : 1.0;
  const adjustment = experiencePrior * agePrior * injuryRiskPrior;
  const fullSeason = GamesActive.regularSeasonGameCount;
  const shortfall = Math.max(0, fullSeason - actualGamesPlayed);
  const halfCredited = fullSeason - 0.5 * shortfall;
  return Math.min(fullSeason, Math.min(fullSeason, Math.max(8, halfCredited)) * adjustment);
}

/** GamesActiveProjection.projectedStatLine — returns the ACTUAL line
 *  unprojected when games are missing or under 3 (every D/ST, and anyone with
 *  two games or fewer). */
function projectedStatLine(actual, position, gamesPlayed, yearsExperience, availabilityMultiplier) {
  if (gamesPlayed == null || gamesPlayed < GamesActive.minimumGamesForRateProjection) return actual;
  const est = expectedGames(position, gamesPlayed, yearsExperience, availabilityMultiplier);
  const factor = est / gamesPlayed;
  if (!Number.isFinite(factor) || factor <= 0) return actual;
  const out = {};
  for (const [k, v] of Object.entries(actual)) out[k] = v * factor;
  return out;
}

/** TePremiumScoring.augmentedStatLine */
function augmentedStatLine(line, position) {
  if (position !== 'TE' || line.reception === undefined) return line;
  return { ...line, te_reception: line.reception };
}

/** ScoringEngine.score — iterates the RULES in order, skipping any stat the
 *  line does not carry. Order matters for float reproducibility. */
function scoreStatLine(line, rules) {
  let total = 0;
  for (const rule of rules) {
    const v = line[rule.statKey];
    if (v === undefined) continue;
    switch (rule.mode) {
      case 'perUnit': {
        const unit = rule.unitSize ?? 1;
        if (unit === 0) break;
        total += (v / unit) * rule.pointsPerUnit;
        break;
      }
      case 'rangeTable': {
        for (const r of rule.ranges) {
          const lo = r.min == null || v >= r.min;
          const hi = r.max == null || v <= r.max;
          if (lo && hi) { total += r.points; break; }
        }
        break;
      }
      case 'thresholdBonus': {
        if (rule.comparison === 'LTE') { if (v <= rule.threshold) total += rule.points; break; }
        if (v < rule.threshold) break;
        if (rule.threshold === 0) { total += rule.points; break; }
        total += rule.stackable ? Math.trunc(v / rule.threshold) * rule.points : rule.points;
        break;
      }
      default:  // event
        total += v * rule.points;
    }
  }
  return total;
}

/** LeagueProjections.projectedSeasonPoints. Returns null where the Swift
 *  returns nil: no stat line means no number, never a zero. */
function projectedSeasonPoints(player, rules, availMultiplier = null) {
  if (!player.st) return null;
  const line = projectedStatLine(player.st, player.pos, player.gp, player.yrs, availMultiplier);
  return scoreStatLine(augmentedStatLine(line, player.pos), rules);
}

// ---- survival to next pick ---------------------------------------------
// DistributionCDF + SelectionHazard + SurvivalProbability, transcribed.

const Hazard = {
  interveningTeamDemandWeight: 0.35,
  tierPressureWeight: 0.25,
  recentRunWeight: 0.20,
};
const Survival = { lowThreshold: 0.65, mediumThreshold: 0.35, highThreshold: 0.15 };

/** DistributionCDF.probabilitySelectedBy — piecewise-linear over the seven
 *  percentile points, sorted by pick. */
function probabilitySelectedBy(pick, d) {
  const points = [[d.min, 0.0], [d.p10, 0.10], [d.p25, 0.25], [d.p50, 0.50],
                  [d.p75, 0.75], [d.p90, 0.90], [d.max, 1.0]].sort((a, b) => a[0] - b[0]);
  const first = points[0], last = points[points.length - 1];
  if (pick < first[0]) return 0.0;
  if (pick >= last[0]) return 1.0;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1], cur = points[i];
    if (pick > cur[0]) continue;
    if (cur[0] <= prev[0]) return cur[1];
    const fraction = (pick - prev[0]) / (cur[0] - prev[0]);
    const value = prev[1] + fraction * (cur[1] - prev[1]);
    return Number.isFinite(value) ? clamp(value, 0, 1) : prev[1];
  }
  return 1.0;
}
const probabilityAvailableAt = (pick, d) => clamp(1 - probabilitySelectedBy(pick, d), 0, 1);

/** SelectionHazard.hazard for one intervening pick. recentRunMultiplier is
 *  always null in the shipped app (a deliberate double-count ruling), so it is
 *  not wired here either. */
function selectionHazard(pick, d, teamProbabilityWeight, tierPressure, confidence) {
  const before = probabilityAvailableAt(pick - 1, d);
  const at = probabilityAvailableAt(pick, d);
  const rawBase = before > 1e-9 ? (before - at) / before : 0;
  const baseHazard = Number.isFinite(rawBase) ? clamp(rawBase, 0, 1) : 0;
  let adjusted = baseHazard;
  if (teamProbabilityWeight != null) {
    adjusted += (clamp(teamProbabilityWeight, 0, 1) - 0.5) * 2.0 * Hazard.interveningTeamDemandWeight * baseHazard;
  }
  if (tierPressure != null) {
    adjusted += (clamp(tierPressure, 0, 1) - 0.5) * 2.0 * Hazard.tierPressureWeight * baseHazard;
  }
  const safeConfidence = Number.isFinite(confidence) ? clamp(confidence, 0, 1) : 0;
  const blended = safeConfidence * adjusted + (1 - safeConfidence) * baseHazard;
  return Number.isFinite(blended) ? clamp(blended, 0, 1) : baseHazard;
}

/** SurvivalProbability.estimate — the product of (1 - hazard) across every
 *  intervening pick. Already drafted short-circuits to 0 available. */
function survivalToNextPick({ dist, fromPickExclusive, toPick, teamWeights, tierPressure, confidence, drafted }) {
  if (drafted) return { probabilityAvailable: 0, probabilitySelected: 1, band: 'critical' };
  if (!dist) return null;
  let survival = 1.0;
  for (let pick = fromPickExclusive + 1; pick < toPick; pick++) {
    const w = teamWeights ? teamWeights(pick) : null;
    survival *= clamp(1 - selectionHazard(pick, dist, w, tierPressure, confidence), 0, 1);
  }
  const safe = Number.isFinite(survival) ? clamp(survival, 0, 1) : 0;
  return {
    probabilityAvailable: safe,
    probabilitySelected: 1 - safe,
    band: safe >= Survival.lowThreshold ? 'low'
        : safe >= Survival.mediumThreshold ? 'medium'
        : safe >= Survival.highThreshold ? 'high' : 'critical',
  };
}

// ---- MarketRecommendation ----------------------------------------------

const MarketRec = { takeSurvivalThreshold: 0.35, waitSurvivalThreshold: 0.60, strongModelRankThreshold: 24 };

function marketDecision({ modelRank, survival, movement }) {
  const eliteModelRank = modelRank > 0 && modelRank <= MarketRec.strongModelRankThreshold;
  const withConviction = () => movement === 'earlier' ? 'take'
    : movement === 'later' ? 'wait'
    : (eliteModelRank ? 'take' : 'neutral');
  if (survival != null) {
    if (survival <= MarketRec.takeSurvivalThreshold) return 'take';
    if (survival >= MarketRec.waitSurvivalThreshold) return 'wait';
    return withConviction();
  }
  return movement === 'earlier' ? 'take' : movement === 'later' ? 'wait' : 'neutral';
}

// ---- ModelTag ----------------------------------------------------------

const TagBounds = {
  takeSurvivalGate: MarketRec.takeSurvivalThreshold,
  positionNeedTopBand: 0.67,
  eliteTierNumber: 1, strongTierNumber: 2, solidTierNumber: 3,
  safeAvailabilityThreshold: Survival.lowThreshold,
  narrowDistributionWidthPicks: 6.0,
  wideDistributionWidthPicks: 18.0,
  reliableMinimumGamesProjected: 16.0,
};

/** ModelTag.compute — the complete ordered rule list, first match wins.
 *  A rule whose evidence is missing simply does not fire. */
function computeModelTag(i) {
  const B = TagBounds;
  if (i.decision === 'take' && i.survivalToNextPick != null
      && i.survivalToNextPick <= B.takeSurvivalGate) return 'Priority';
  if (i.positionNeedOfOnClockTeam >= B.positionNeedTopBand && i.isBestAvailableAtPosition) return 'Fit';
  if (i.tierNumber === B.eliteTierNumber) return 'Elite';
  if (i.movement === 'later') return 'Falling';
  if (i.movement === 'earlier') return 'Rising';
  if (i.isRookieNoProduction) return 'Emerging';
  if (i.modelRank > 0 && i.marketAdpRank > 0 && i.picksPerRound > 0
      && i.modelRank - i.marketAdpRank >= i.picksPerRound) return 'Overpriced';
  if (i.modelRank > 0 && i.marketAdpRank > 0 && i.picksPerRound > 0
      && i.marketAdpRank - i.modelRank >= i.picksPerRound) return 'Value';
  if ((i.hasPostInjuryDiscount || i.injuryRiskTier === 'high') && i.survivalToNextPick != null
      && i.survivalToNextPick < B.safeAvailabilityThreshold) return 'Risky';
  if (i.distributionWidth != null && i.distributionWidth > B.wideDistributionWidthPicks
      && i.p10Pick != null && i.tierMedianPick != null && i.p10Pick < i.tierMedianPick) return 'Upside';
  if (i.distributionWidth != null && i.distributionWidth > B.wideDistributionWidthPicks) return 'Volatile';
  if (i.tierNumber === B.strongTierNumber) return 'Strong';
  if (i.tierNumber === B.solidTierNumber) return 'Solid';
  if (i.distributionWidth != null && i.distributionWidth < B.narrowDistributionWidthPicks
      && i.survivalToNextPick != null && i.survivalToNextPick >= B.safeAvailabilityThreshold
      && i.gamesProjected != null && i.gamesProjected >= B.reliableMinimumGamesProjected) return 'Reliable';
  if (i.survivalToNextPick != null && i.survivalToNextPick >= B.safeAvailabilityThreshold) return 'Safe';
  return 'Wait';
}

/** TiersSurvival: a new tier starts wherever the descending baseline values
 *  gap by 4.0 or more. */
const TIER_GAP_THRESHOLD = 4.0;
function tierNumbers(sortedDescendingValues) {
  const tiers = [];
  let tier = 1;
  for (let i = 0; i < sortedDescendingValues.length; i++) {
    if (i > 0 && sortedDescendingValues[i - 1] - sortedDescendingValues[i] >= TIER_GAP_THRESHOLD) tier += 1;
    tiers.push(tier);
  }
  return tiers;
}


// ---- live market displacement -------------------------------------------
// LiveMarketState + PositionVelocity, transcribed. This is what makes the
// board MOVE during a draft: as a position goes faster or slower than the
// market expected, every remaining player at that position shifts.
//
// Only the positionVelocity component is wired, because the app supplies only
// that one (interveningTeamDemand and poolDepletion are deliberately omitted
// there). recentRunMultiplier is likewise never passed.

const Velocity = {
  defaultMinimumObservedPicks: 24.0,
  defaultMaximumMultiplier: 3.0,
  minimumExpectedFloor: 0.05,
  runThreshold: 1.15,
  droughtThreshold: 0.85,
  minimumChronicScale: 1.0 / 6.0,
};
const LiveShift = {
  velocityComponentWeight: 0.65,
  movementThreshold: 0.02,
  maximumLiveShift: 0.25,      // model.shrinkage.maximumLiveShift, as shipped
};

/** LeaguePrior.credibilityWeight */
function credibilityWeight(n, k) {
  if (!(n > 0) || !(k >= 0)) return 0;
  const denominator = n + k;
  if (!(denominator > 0)) return 1;
  const value = n / denominator;
  return Number.isFinite(value) ? clamp(value, 0, 1) : 0;
}

/** PositionVelocity.expectedCount — how many at this position the market
 *  expected to be gone by now, summed over every prior's CDF. */
function expectedCount(pick, priors) {
  let total = 0;
  for (const d of priors) total += probabilitySelectedBy(pick, d);
  return Number.isFinite(total) ? Math.max(0, total) : 0;
}

/** PositionVelocity.compute */
function positionVelocity({ picksElapsed, actualCount, priors, chronicDemandScale = 1.0, rosterPseudoCount = 0 }) {
  const priorExpected = expectedCount(picksElapsed, priors);
  const safeM = Number.isFinite(rosterPseudoCount) ? Math.max(0, rosterPseudoCount) : 0;

  let rawMultiplier;
  if (actualCount === 0 && priorExpected <= Velocity.minimumExpectedFloor) {
    rawMultiplier = 1.0;                       // the market has nothing to say yet
  } else {
    const denominator = Math.max(priorExpected + safeM, Velocity.minimumExpectedFloor);
    rawMultiplier = (actualCount + safeM) / denominator;
  }
  const safeRaw = Number.isFinite(rawMultiplier) ? Math.max(0, rawMultiplier) : 1.0;

  const safeScale = Number.isFinite(chronicDemandScale)
    ? clamp(chronicDemandScale, Velocity.minimumChronicScale, 1.0) : 1.0;
  const scaledMinimumObserved = Velocity.defaultMinimumObservedPicks / safeScale;
  const scaledMaximumMultiplier = 1.0 + (Velocity.defaultMaximumMultiplier - 1.0) * safeScale;

  const credibility = credibilityWeight(Math.max(0, picksElapsed), scaledMinimumObserved);
  const shrunk = 1.0 + credibility * (safeRaw - 1.0);
  const boundedMultiplier = Number.isFinite(shrunk)
    ? clamp(shrunk, 1.0 / scaledMaximumMultiplier, scaledMaximumMultiplier) : 1.0;

  return {
    picksElapsed, expectedCount: priorExpected, actualCount,
    rawMultiplier: safeRaw, boundedMultiplier,
    isRun: boundedMultiplier > Velocity.runThreshold,
    isDrought: boundedMultiplier < Velocity.droughtThreshold,
  };
}

/** LiveMarketState.saturatedShift — tanh, so the shift approaches the bound
 *  asymptotically and never exceeds it. */
function saturatedShift(raw, bound) {
  if (!(bound > 0) || !Number.isFinite(raw)) return 0;
  return bound * Math.tanh(raw / bound);
}

/** The shift fraction from position velocity alone: a position going FASTER
 *  than expected (multiplier > 1) produces a NEGATIVE shift, pulling every
 *  remaining player at it EARLIER. */
function liveShiftFraction(boundedMultiplier) {
  const raw = -(boundedMultiplier - 1.0) * LiveShift.velocityComponentWeight;
  return saturatedShift(raw, LiveShift.maximumLiveShift);
}

/** Every pick-valued field scaled by (1 + shift), floored at 1.0. */
function liveDistribution(dist, shiftFraction) {
  if (!dist) return null;
  const factor = 1.0 + shiftFraction;
  const scale = v => {
    const shifted = v * factor;
    return Number.isFinite(shifted) ? Math.max(1.0, shifted) : v;
  };
  return { min: scale(dist.min), p10: scale(dist.p10), p25: scale(dist.p25),
           p50: scale(dist.p50), p75: scale(dist.p75), p90: scale(dist.p90), max: scale(dist.max) };
}

/** adpMovementDirection — 0.5-pick dead band against the pre-draft baseline. */
const ADP_MOVEMENT_DEAD_BAND = 0.5;
function adpMovementDirection(livePick, baselinePick) {
  if (livePick == null || baselinePick == null) return null;
  const delta = livePick - baselinePick;
  if (delta <= -ADP_MOVEMENT_DEAD_BAND) return 'earlier';
  if (delta >= ADP_MOVEMENT_DEAD_BAND) return 'later';
  return 'stable';
}


// ---- injury risk --------------------------------------------------------
// InjuryRiskProfile, transcribed. The bundle ships expectedGamesMissed and
// historyDelta already computed by the same linear model the app runs, so
// those are read rather than refitted — identical numbers, no re-derivation.

const Injury = {
  historyShrinkageM: 1.0,
  maximumAvailabilityHaircut: 0.25,
  defaultSeasonScale: 17.0,
  lowTierQuantile: 0.40,
  moderateTierQuantile: 0.70,
  elevatedTierQuantile: 0.90,
};

/** shrunkDelta: credibility on seasons observed, k/(k+m). */
function shrunkDelta(historyDelta, seasonsObserved, m = Injury.historyShrinkageM) {
  const k = Math.max(0, seasonsObserved || 0);
  if (!(k > 0)) return 0;
  return historyDelta * k / (k + m);
}

/** availabilityMultiplier — how much of a full season this player is expected
 *  to be available for, relative to the population. postInjuryYear1Discount is
 *  never passed at runtime, so the simple branch is the one that runs. */
function availabilityMultiplier(historyDelta, seasonsObserved, scale = Injury.defaultSeasonScale) {
  if (!(scale > 0) || historyDelta == null || !Number.isFinite(historyDelta)) return 1.0;
  const haircut = shrunkDelta(historyDelta, seasonsObserved) / scale;
  const cap = Injury.maximumAvailabilityHaircut;
  return 1 - clamp(haircut, -cap, cap);
}

/** InjuryRiskProfile.quantile — ceil-rank, not interpolated. */
function injuryQuantile(sorted, q) {
  if (!sorted.length) return 0;
  const rank = Math.ceil(q * sorted.length);
  return sorted[clamp(rank - 1, 0, sorted.length - 1)];
}

/** Tier cuts are computed PER POSITION over the pool's own expected-games-
 *  missed values, so "high risk" means high relative to that position. */
function injuryTierThresholds(entriesByPosition) {
  const out = {};
  for (const [pos, values] of Object.entries(entriesByPosition)) {
    const sorted = values.slice().sort((a, b) => a - b);
    out[pos] = {
      low: injuryQuantile(sorted, Injury.lowTierQuantile),
      moderate: injuryQuantile(sorted, Injury.moderateTierQuantile),
      elevated: injuryQuantile(sorted, Injury.elevatedTierQuantile),
      n: sorted.length,
    };
  }
  return out;
}

function injuryTier(expectedGamesMissed, position, thresholds) {
  const cuts = thresholds[position];
  if (!cuts || expectedGamesMissed == null) return null;
  if (expectedGamesMissed <= cuts.low) return 'low';
  if (expectedGamesMissed <= cuts.moderate) return 'moderate';
  if (expectedGamesMissed <= cuts.elevated) return 'elevated';
  return 'high';
}

/** DraftSessionStore.gamesProjected — the availability estimate in games. */
function gamesProjected(player, availMultiplier) {
  if (player.gp == null) return null;
  return expectedGames(player.pos, player.gp, player.yrs, availMultiplier);
}


// ---- PickFitScore + the spectrum ----------------------------------------
// How well this player fits THIS pick, and the hue that expresses it.

const PickFit = {
  needWeight: 0.45, urgencyWeight: 0.25, valueWeight: 0.20, archetypeSignWeight: 0.10,
  benchOnlyCap: 0.40,
};

function pickFitScore({ starterNeed, survivalToNextPick, modelRank, marketAdpRank, picksPerRound, isOverpricedTag, benchOnly }) {
  const need = clamp(starterNeed ?? 0, 0, 1);
  // Missing survival is neither urgent nor calm: it resolves to the midpoint,
  // never a fabricated extreme.
  const urgency = survivalToNextPick == null ? 0.5 : clamp(1 - survivalToNextPick, 0, 1);
  let value = 0.5;
  if (modelRank > 0 && marketAdpRank > 0 && picksPerRound > 0) {
    const rawRounds = (marketAdpRank - modelRank) / picksPerRound;
    value = (clamp(rawRounds, -1, 1) + 1) / 2;
  }
  // Archetypes are not shipped to this build, so the sign sub-score carries
  // only the one input that is: the overpriced tag.
  const archetypeSign = (clamp(isOverpricedTag ? -1 : 0, -1, 1) + 1) / 2;

  const raw = PickFit.needWeight * need + PickFit.urgencyWeight * urgency
    + PickFit.valueWeight * value + PickFit.archetypeSignWeight * archetypeSign;
  const clamped = clamp(raw, 0, 1);
  return benchOnly ? Math.min(clamped, PickFit.benchOnlyCap) : clamped;
}

/** PickFitSpectrum: red at 0, orange at .33, yellow at .60, green at 1. */
const SPECTRUM_STOPS = [
  { score: 0.0, hue: 0 }, { score: 0.33, hue: 30 }, { score: 0.60, hue: 60 }, { score: 1.0, hue: 120 },
];
const SPECTRUM_SATURATION = 0.85;

function spectrumHue(score) {
  const c = clamp(score, 0, 1);
  const first = SPECTRUM_STOPS[0], last = SPECTRUM_STOPS[SPECTRUM_STOPS.length - 1];
  if (c <= first.score) return first.hue;
  if (c >= last.score) return last.hue;
  for (let i = 1; i < SPECTRUM_STOPS.length; i++) {
    const lower = SPECTRUM_STOPS[i - 1], upper = SPECTRUM_STOPS[i];
    if (c > upper.score) continue;
    const span = upper.score - lower.score;
    const t = span > 0 ? (c - lower.score) / span : 1;
    return lower.hue + (upper.hue - lower.hue) * t;
  }
  return last.hue;
}

function spectrumColor(score) {
  return `hsl(${spectrumHue(score).toFixed(1)} ${SPECTRUM_SATURATION * 100}% 55%)`;
}

  window.G18 = {
  Bounds, EngineeringDefaultBounds,
  clampDial, makeEnvelope, envelopePoints,
  riskToleranceContribution, floorVsUpsideContribution, consensusVsContrarianContribution,
  youthVsVeteransContribution, positionalAggressionContribution,
  personalizedValue,
  explicitPreferenceStrength, queueAdjustment, queueReason,
  deriveProfile, computeConfidence,
  projectedSeasonPoints, scoreStatLine, projectedStatLine, augmentedStatLine,
  probabilitySelectedBy, probabilityAvailableAt, selectionHazard, survivalToNextPick,
  marketDecision, computeModelTag, tierNumbers, Survival, MarketRec, TagBounds,
  credibilityWeight, expectedCount, positionVelocity, saturatedShift,
  liveShiftFraction, liveDistribution, adpMovementDirection, Velocity, LiveShift,
  shrunkDelta, availabilityMultiplier, injuryQuantile, injuryTierThresholds,
  injuryTier, gamesProjected, Injury,
  pickFitScore, spectrumHue, spectrumColor, PickFit,
};
})();
