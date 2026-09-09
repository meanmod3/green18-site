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

  window.G18 = {
  Bounds, EngineeringDefaultBounds,
  clampDial, makeEnvelope, envelopePoints,
  riskToleranceContribution, floorVsUpsideContribution, consensusVsContrarianContribution,
  youthVsVeteransContribution, positionalAggressionContribution,
  personalizedValue,
  explicitPreferenceStrength, queueAdjustment, queueReason,
  deriveProfile, computeConfidence,
};
})();
