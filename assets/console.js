/* GREEN18 model console — the web build of the app.
 *
 * Model: assets/engine.js, a line-for-line transcription of the iOS
 * DraftEngine (PersonalizedBoard, its bounds, the season-points envelope,
 * PhilosophyDerivation, the queue layer).
 *
 * Data: assets/pool.json, extracted from the app's OWN shipped bundles —
 * players.bundle.json (422 entities: names, positions, teams, bye weeks,
 * rookie flags), player-intelligence.bundle.json (age at season start) and
 * draft-market-axis-ONE_QB-PPR-12.json (p10/p50/p90 in pick units for 343 of
 * them). Nothing in the pool is typed by hand.
 *
 * The ONE thing not transcribed is the projection pipeline that turns usage
 * and priors into projected points. `baseValue` is therefore derived from the
 * market's own p50 through a documented curve, and the UI labels the column
 * "Base (market)" rather than calling it a projection. Everything downstream
 * — the envelope, the five dials, the ±30% cap, the queue layer — is the real
 * model operating on that base.
 */

'use strict';

const { clampDial, queueAdjustment, personalizedValue } = window.G18;

const STATUSES = ['NEUTRAL', 'FAVORITE', 'PREFER', 'AVOID'];
const POSITIONS = ['QB', 'RB', 'WR', 'TE', 'DST', 'K'];

const PHILOSOPHY_CARDS = [
  { id: 'risk', title: 'Risk',
    prompt: 'When two players are close, what should break the tie?',
    low: 'Stability', high: 'Ceiling',
    verdict: v => v < -0.33 ? 'You lean toward the safer, more available player.'
      : v > 0.33 ? 'You lean toward the higher-ceiling, higher-variance player.'
      : 'Balanced — stability and ceiling weigh about equally.' },
  { id: 'modelConviction', title: 'Model vs Market',
    prompt: 'How much do you trust the model over consensus ADP?',
    low: 'Stay near consensus', high: 'Trust the model',
    verdict: v => v < -0.33 ? 'You would rather stay close to market consensus.'
      : v > 0.33 ? 'You lean on the model where it disagrees with the market.'
      : 'Balanced — consensus and model conviction weigh about equally.' },
  { id: 'rosterAggression', title: 'Roster / Scarcity Aggression',
    prompt: 'How hard should an approaching tier cliff pull a pick forward?',
    low: 'Best player', high: 'Beat the cliff',
    verdict: v => v < -0.33 ? 'You lean toward taking the better player regardless of scarcity.'
      : v > 0.33 ? 'You lean toward reaching to beat an approaching tier cliff.'
      : 'Balanced — raw value and scarcity weigh about equally.' },
  { id: 'seasonHorizon', title: 'Season Horizon',
    prompt: 'How much should playoff-week schedule affect close decisions?',
    low: 'Season-long value', high: 'Playoff-week emphasis',
    verdict: v => v < -0.33 ? 'You weight season-long value over playoff-week schedule.'
      : v > 0.33 ? 'You give real weight to favorable playoff-week schedules.'
      : 'Balanced — season-long value and playoff timing weigh about equally.' },
  { id: 'benchConstruction', title: 'Bench Construction',
    prompt: 'Once starters are reasonably secure, what should the bench mainly do?',
    low: 'Protect starters', high: 'Chase breakouts',
    verdict: v => v < -0.33 ? 'Your bench mainly protects your starters.'
      : v > 0.33 ? 'Your bench mainly chases breakout upside.'
      : 'Balanced — protection and upside weigh about equally.' },
];

const WEIGHT_AXES = [
  { id: 'riskTolerance',         title: 'Risk tolerance',           low: 'Play it safe',    high: 'Swing big' },
  { id: 'floorVsUpside',         title: 'Floor vs. upside',         low: 'Floor first',     high: 'Ceiling first' },
  { id: 'consensusVsContrarian', title: 'Consensus vs. contrarian', low: 'Trust consensus', high: 'Go contrarian' },
  { id: 'youthVsVeterans',       title: 'Youth vs. veterans',       low: 'Youth',           high: 'Veterans', signFlip: true },
  { id: 'positionalAggression',  title: 'Positional aggression',    low: 'Balanced',        high: 'Attack needs' },
];

// The COMPLETE shipped rule set (CurrentLeaguePreset), grouped for a compact
// two-column layout. `reception` is an EVENT rule in the app, not perUnit.
const SCORING_GROUPS = [
  { group: 'Passing', rules: [
    { label:'Yards',        statKey:'passing_yards', mode:'perUnit', pointsPerUnit:0.04, unitSize:1, step:0.01 },
    { label:'TD',           statKey:'passing_td',    mode:'event', points:4,  step:1 },
    { label:'2-pt',         statKey:'passing_2pt',   mode:'event', points:2,  step:1 },
    { label:'Interception', statKey:'interception',  mode:'event', points:-1, step:1 },
  ]},
  { group: 'Rushing', rules: [
    { label:'Yards', statKey:'rushing_yards', mode:'perUnit', pointsPerUnit:0.1, unitSize:1, step:0.01 },
    { label:'TD',    statKey:'rushing_td',    mode:'event', points:6, step:1 },
    { label:'2-pt',  statKey:'rushing_2pt',   mode:'event', points:2, step:1 },
  ]},
  { group: 'Receiving', rules: [
    { label:'Reception', statKey:'reception',       mode:'event', points:1, step:0.5 },
    { label:'Yards',     statKey:'receiving_yards', mode:'perUnit', pointsPerUnit:0.1, unitSize:1, step:0.01 },
    { label:'TD',        statKey:'receiving_td',    mode:'event', points:6, step:1 },
    { label:'2-pt',      statKey:'receiving_2pt',   mode:'event', points:2, step:1 },
    { label:'TE premium', statKey:'te_reception',   mode:'event', points:0, step:0.25 },
  ]},
  { group: 'Kicking', rules: [
    { label:'PAT made',   statKey:'pat_made',   mode:'event', points:1,  step:1 },
    { label:'PAT missed', statKey:'pat_missed', mode:'event', points:-1, step:1 },
    { label:'FG missed',  statKey:'fg_missed',  mode:'event', points:-1, step:1 },
  ]},
  { group: 'Fumbles', rules: [
    { label:'Lost',       statKey:'fumble_lost',        mode:'event', points:-2, step:1 },
    { label:'Recovery TD', statKey:'fumble_recovery_td', mode:'event', points:6, step:1 },
  ]},
  { group: 'Defense / ST', rules: [
    { label:'Touchdown',    statKey:'dst_td',                  mode:'event', points:6, step:1 },
    { label:'Sack',         statKey:'dst_sack',                mode:'event', points:1, step:1 },
    { label:'Interception', statKey:'dst_interception',        mode:'event', points:2, step:1 },
    { label:'Fumble rec.',  statKey:'dst_fumble_recovery',     mode:'event', points:2, step:1 },
    { label:'Safety',       statKey:'dst_safety',              mode:'event', points:2, step:1 },
    { label:'Forced fumble', statKey:'dst_forced_fumble',      mode:'event', points:1, step:1 },
    { label:'Blocked kick', statKey:'dst_blocked_kick',        mode:'event', points:2, step:1 },
    { label:'XP returned',  statKey:'dst_extra_point_returned', mode:'event', points:2, step:1 },
  ]},
  { group: 'Special teams', rules: [
    { label:'Def TD',        statKey:'st_def_td',                mode:'event', points:6, step:1 },
    { label:'Def forced fum', statKey:'st_def_forced_fumble',    mode:'event', points:1, step:1 },
    { label:'Def fum rec.',  statKey:'st_def_fumble_recovery',   mode:'event', points:1, step:1 },
    { label:'Player TD',     statKey:'st_player_td',             mode:'event', points:6, step:1 },
    { label:'Player forced fum', statKey:'st_player_forced_fumble', mode:'event', points:1, step:1 },
    { label:'Player fum rec.', statKey:'st_player_fumble_recovery', mode:'event', points:1, step:1 },
  ]},
];

// Two range tables ship as tables, not single values: FG distance and D/ST
// points allowed. They are shown read-only rather than edited as if they were
// one number, which would misrepresent them.
const RANGE_TABLES = [
  { label: 'FG made, by distance', statKey: 'fg_made_distance',
    ranges: [[0,19,3],[20,29,3],[30,39,3],[40,49,4],[50,null,5]] },
  { label: 'D/ST points allowed', statKey: 'dst_points_allowed',
    ranges: [[0,0,10],[1,6,7],[7,13,4],[14,20,1],[21,27,0],[28,34,-1],[35,null,-4]] },
];

const DEFAULT_SCORING = () => {
  const flat = SCORING_GROUPS.flatMap(g => g.rules.map(r => ({ ...r, group: g.group })));
  for (const t of RANGE_TABLES) {
    flat.push({ label: t.label, statKey: t.statKey, mode: 'rangeTable', group: 'Tables',
      ranges: t.ranges.map(([min, max, points]) => ({ min, max, points })) });
  }
  return flat;
};

/** The reception rule is perUnit, so its value lives in pointsPerUnit — not
 *  `points`, which only event rules carry. */
function receptionPoints() {
  return state.scoring.find(r => r.statKey === 'reception')?.points ?? 1;
}
function setReceptionPoints(v) {
  const r = state.scoring.find(x => x.statKey === 'reception');
  if (r) r.points = v;
}
function setTePremium(v) {
  const r = state.scoring.find(x => x.statKey === 'te_reception');
  if (r) r.points = v;
}

const ROSTER_DEFAULT = () => ({ QB: 1, RB: 2, WR: 3, TE: 1, DST: 1, K: 1 });

// ---- state -------------------------------------------------------------

let POOL = [];
let POOL_META = {};

const state = {
  leagues: [],                  // every league on this device
  leagueId: null,
  league: null,                 // the active one (a member of `leagues`)
  armed: null,                  // row armed for DRAFT confirmation
  profileId: null,              // player whose attributes panel is open
  philosophy: Object.fromEntries(PHILOSOPHY_CARDS.map(c => [c.id, 0])),
  weights: Object.fromEntries(WEIGHT_AXES.map(a => [a.id, 0])),
  scoring: DEFAULT_SCORING(),
  pressure: { magnitude: 0, hasEvidence: false },
  status: {},
  drafted: new Map(),
  pick: 1,
  filter: { pos: 'ALL', q: '', queuedOnly: false },
  tab: 'queue',
};

const LS_KEY = 'g18.console.v2';

function save() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({
      leagues: state.leagues, leagueId: state.leagueId, philosophy: state.philosophy, weights: state.weights,
      scoring: state.scoring, pressure: state.pressure, status: state.status,
      drafted: [...state.drafted], pick: state.pick,
    }));
  } catch { /* private window / blocked storage: the console still works */ }
}

function restore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    state.leagues = d.leagues ?? (d.league ? [d.league] : []);
    state.leagueId = d.leagueId ?? (state.leagues[0]?.id ?? null);
    state.league = state.leagues.find(l => l.id === state.leagueId) ?? state.leagues[0] ?? null;
    if (state.league) state.leagueId = state.league.id;
    state.philosophy = d.philosophy ?? state.philosophy;
    state.weights = d.weights ?? state.weights;
    state.scoring = d.scoring ?? state.scoring;
    state.pressure = d.pressure ?? state.pressure;
    state.status = d.status ?? {};
    state.drafted = new Map(d.drafted ?? []);
    state.pick = d.pick ?? 1;
  } catch { /* corrupt: start clean rather than fail to load */ }
}

// ---- valuation ---------------------------------------------------------

/** baseValue is `-liveAdpPick` — literally the negation of the player's live
 *  ADP pick, so a better (lower) pick is a HIGHER value. That is the app's own
 *  definition (DraftSessionStorePersonalizedBoard: `baseValue: -liveAdp`), not
 *  a projection. Before any pick is made the live distribution IS the market
 *  prior, so the median is p50; the live in-draft displacement (LiveMarketState
 *  + hysteresis) is not ported, and the UI says so. */
function baseValue(p) {
  if (p.p50 == null) return 0;
  return -p.p50;
}

/** Projected season points — a genuinely separate number from baseValue, and
 *  the one the scoring rules move. Null where no stat line ships. */
function projPoints(p) {
  return G18.projectedSeasonPoints(p, state.scoring);
}

function live() { return POOL.filter(p => !state.drafted.has(p.id)); }

function myPicks() {
  return [...state.drafted.entries()].filter(([, v]) => v.mine)
    .sort((a, b) => a[1].pick - b[1].pick)
    .map(([id, v]) => ({ p: POOL.find(x => x.id === id), pick: v.pick }))
    .filter(r => r.p);
}

function positionNeeds() {
  const needs = {};
  const roster = state.league?.roster ?? ROSTER_DEFAULT();
  const mine = myPicks();
  for (const [pos, total] of Object.entries(roster)) {
    const filled = mine.filter(r => r.p.pos === pos).length;
    needs[pos] = total === 0 ? 0 : Math.max(0, (total - filled) / total);
  }
  return needs;
}

function evaluate() {
  const pool = live();
  const teams = state.league?.teams ?? 12;
  const picksElapsed = state.pick - 1;

  // Live market displacement. For each position: how many are actually gone
  // versus how many the market expected by now, turned into a shift that moves
  // every remaining player at that position. This is what makes the board move
  // DURING a draft rather than only between settings changes.
  const roster = state.league?.roster ?? ROSTER_DEFAULT();
  const maxDemand = Math.max(1, ...Object.values(roster));
  const shiftByPos = {};
  for (const pos of new Set(POOL.map(p => p.pos))) {
    const priors = POOL.filter(p => p.pos === pos && p.dist).map(p => p.dist);
    if (!priors.length) { shiftByPos[pos] = 0; continue; }
    const actualCount = [...state.drafted.keys()]
      .filter(id => POOL.find(p => p.id === id)?.pos === pos).length;
    // PositionChronicDemand.scale: this position's per-team demand over the
    // most-demanded position's, floored at 1/6.
    const chronic = Math.max(1 / 6, Math.min(1, (roster[pos] ?? 0) / maxDemand));
    const v = G18.positionVelocity({ picksElapsed, actualCount, priors, chronicDemandScale: chronic });
    shiftByPos[pos] = state.league?.launched ? G18.liveShiftFraction(v.boundedMultiplier) : 0;
  }
  const liveDist = new Map(pool.map(p => [p.id, G18.liveDistribution(p.dist, shiftByPos[p.pos] ?? 0)]));
  const livePick = id => liveDist.get(id) ? liveDist.get(id).p50 : null;

  // Projected points drive the position curve and the tier tables, the way the
  // app builds them (baselines, then TiersSurvival's 4.0-point gap rule).
  const proj = new Map(pool.map(p => [p.id, projPoints(p)]));

  // modelRank must be the rank on the board the model actually presents —
  // the SAME partition commitBoardOrder uses. Ranking the raw pool by
  // baseValue put every player with no market evidence (baseValue 0, which
  // beats every real player's negative pick) in the first eighty rows, which
  // pushed everyone else ~79 ranks below their market rank and made almost the
  // whole board read OVERPRICED.
  const byBase = pool.filter(p => livePick(p.id) != null)
    .sort((a, b) => baseValue(b) - baseValue(a) || a.id.localeCompare(b.id))
    .concat(pool.filter(p => livePick(p.id) == null)
      .sort((a, b) => (proj.get(b.id) ?? -Infinity) - (proj.get(a.id) ?? -Infinity) || a.id.localeCompare(b.id)));
  const modelRank = new Map(byBase.map((p, i) => [p.id, i + 1]));

  const withMkt = pool.filter(p => p.p50 != null).sort((a, b) => a.p50 - b.p50 || a.id.localeCompare(b.id));  // market rank stays the PRE-draft ordinal
  const marketRank = new Map(withMkt.map((p, i) => [p.id, i + 1]));

  const needs = positionNeeds();

  const envs = {}, tierOf = new Map(), tierMedian = new Map(), bestAt = new Map(), remainingInTier = new Map();
  for (const pos of new Set(pool.map(p => p.pos))) {
    const at = pool.filter(p => p.pos === pos);
    const withPts = at.filter(p => proj.get(p.id) != null)
      .sort((a, b) => proj.get(b.id) - proj.get(a.id) || a.id.localeCompare(b.id));
    envs[pos] = G18.makeEnvelope(withPts.map((p, i) => ({ rank: i + 1, points: proj.get(p.id) })));

    const tiers = G18.tierNumbers(withPts.map(p => proj.get(p.id)));
    const counts = {};
    tiers.forEach(t => { counts[t] = (counts[t] || 0) + 1; });
    const byTier = {};
    withPts.forEach((p, i) => {
      tierOf.set(p.id, tiers[i]);
      remainingInTier.set(p.id, counts[tiers[i]]);
      (byTier[tiers[i]] ||= []).push(p.p50);
    });
    for (const [t, picks] of Object.entries(byTier)) {
      const v = picks.filter(x => x != null).sort((a, b) => a - b);
      if (!v.length) continue;
      const m = v.length % 2 ? v[(v.length - 1) / 2] : (v[v.length / 2 - 1] + v[v.length / 2]) / 2;
      withPts.forEach((p, i) => { if (tiers[i] === Number(t)) tierMedian.set(p.id, m); });
    }
    const best = at.slice().sort((a, b) => baseValue(b) - baseValue(a) || a.id.localeCompare(b.id))[0];
    if (best) bestAt.set(pos, best.id);
  }

  // Survival window: this pick through the on-clock seat's next turn.
  const from = Math.max(0, state.pick - 1);
  const to = state.pick + teams;
  const conf = POOL_META.axisConfidence ?? 0.25;
  const launched = !!state.league?.launched;

  const rows = pool.map(p => {
    const sig = {
      entityId: p.id, baseValue: livePick(p.id) == null ? 0 : -livePick(p.id),
      outcomeBand: liveDist.get(p.id) ? { p10: liveDist.get(p.id).p10, p90: liveDist.get(p.id).p90 } : null,
      marketPickRank: livePick(p.id) == null ? null : Math.max(1, Math.round(livePick(p.id))),
      modelRank: modelRank.get(p.id), leagueTeamCount: teams,
      ageAtSeasonStart: p.age, yearsExperience: p.yrs ?? null,
      positionNeed: needs[p.pos] ?? 0,
    };
    const pv = personalizedValue(sig, state.weights, envs[p.pos]);
    const qAdj = queueAdjustment(state.status[p.id] || 'NEUTRAL', state.pressure);

    const rem = remainingInTier.get(p.id);
    const tierPressure = rem == null ? 0 : (rem <= 1 ? 1.0 : rem <= 2 ? 0.5 : 0.0);
    const surv = launched
      ? G18.survivalToNextPick({ dist: liveDist.get(p.id), fromPickExclusive: from, toPick: to,
          tierPressure, confidence: conf, drafted: false })
      : null;

    const decision = G18.marketDecision({
      modelRank: sig.modelRank, survival: surv ? surv.probabilityAvailable : null,
      movement: G18.adpMovementDirection(livePick(p.id), p.p50) ?? 'stable',
    });

    const tag = G18.computeModelTag({
      decision,
      survivalToNextPick: surv ? surv.probabilityAvailable : null,
      tierNumber: tierOf.get(p.id) ?? null,
      movement: G18.adpMovementDirection(livePick(p.id), p.p50),
      modelRank: sig.modelRank ?? 0,
      marketAdpRank: marketRank.get(p.id) ?? 0,
      picksPerRound: teams,
      positionNeedOfOnClockTeam: needs[p.pos] ?? 0,
      isBestAvailableAtPosition: bestAt.get(p.pos) === p.id,
      isRookieNoProduction: !!p.dcp,
      hasPostInjuryDiscount: false,      // injury bundle not shipped to the console
      injuryRiskTier: null,
      distributionWidth: liveDist.get(p.id) ? (liveDist.get(p.id).p90 - liveDist.get(p.id).p10) : null,
      p10Pick: liveDist.get(p.id) ? liveDist.get(p.id).p10 : null,
      tierMedianPick: tierMedian.get(p.id) ?? null,
      gamesProjected: null,              // needs the injury model
    });

    return {
      p, base: sig.baseValue, proj: proj.get(p.id), dialDelta: pv.total - pv.baseValue,
      contributions: pv.contributions, queueAdj: qAdj, total: pv.total + qAdj,
      tier: tierOf.get(p.id) ?? null, survival: surv, decision, tag,
      livePick: livePick(p.id), movement: G18.adpMovementDirection(livePick(p.id), p.p50),
      shift: shiftByPos[p.pos] ?? 0,
    };
  });

  // commitBoardOrder partitions: everyone WITH a live ADP first (best value
  // first), then everyone without, ordered by baseline projection. Without
  // this, a player with no market evidence has baseValue 0 — which outranks
  // every real player, whose value is a NEGATIVE pick number.
  const withAdp = rows.filter(r => r.livePick != null)
    .sort((a, b) => b.total - a.total || a.p.id.localeCompare(b.p.id));
  const withoutAdp = rows.filter(r => r.livePick == null)
    .sort((a, b) => (b.proj ?? -Infinity) - (a.proj ?? -Infinity) || a.p.id.localeCompare(b.p.id));
  const ordered = withAdp.concat(withoutAdp);
  ordered.forEach((r, i) => { r.rank = i + 1; });
  return ordered;
}

// ---- helpers -----------------------------------------------------------

const fmt = n => (n >= 0 ? '+' : '') + n.toFixed(2);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
const DIAL_ABBR = {
  riskTolerance: 'risk', floorVsUpside: 'floor/up', consensusVsContrarian: 'cons/con',
  youthVsVeterans: 'youth/vet', positionalAggression: 'pos',
};

function onClock() {
  const t = state.league?.teams ?? 12;
  const round = Math.floor((state.pick - 1) / t) + 1;
  const idx = (state.pick - 1) % t;
  const seat = (state.league?.draftType === 'LINEAR')
    ? idx + 1
    : (round % 2 === 1 ? idx + 1 : t - idx);
  return { round, seat, mine: seat === (state.league?.slot ?? 1) };
}

// ---- league setup ------------------------------------------------------

function renderSetup() {
  document.getElementById('setup').hidden = false;
  document.getElementById('app').hidden = true;
  const host = document.getElementById('setup-form');
  host.textContent = '';

  const draft = {
    name: 'My League', teams: 12, slot: 6, rounds: 15,
    qbFormat: 'SINGLE', draftType: 'SNAKE', scoring: 'PPR', tePremium: 0,
    roster: ROSTER_DEFAULT(),
  };

  const field = (label, node) => {
    const f = el('div', 'field');
    f.append(el('label', null, label), node);
    return f;
  };
  const num = (key, min, max, obj = draft) => {
    const i = document.createElement('input');
    i.type = 'number'; i.value = obj[key]; i.min = min; i.max = max;
    i.addEventListener('change', () => {
      obj[key] = Math.max(min, Math.min(max, parseInt(i.value, 10) || min));
    });
    return i;
  };

  host.append(el('p', 'section-label', 'League'));
  const nameInput = document.createElement('input');
  nameInput.type = 'text'; nameInput.value = draft.name;
  nameInput.addEventListener('input', () => { draft.name = nameInput.value; });
  host.append(field('League name', nameInput));
  host.append(field('Teams', num('teams', 4, 20)));
  host.append(field('Your seat', num('slot', 1, 20)));
  host.append(field('Rounds', num('rounds', 1, 30)));

  const mkSel = (key, opts) => {
    const s = document.createElement('select');
    for (const [v, t] of opts) {
      const o = document.createElement('option'); o.value = v; o.textContent = t;
      if (v === draft[key]) o.selected = true; s.append(o);
    }
    s.addEventListener('change', () => { draft[key] = s.value; });
    return s;
  };
  host.append(field('Scoring', mkSel('scoring', [['PPR', 'Full PPR'], ['HALF', 'Half PPR'], ['STANDARD', 'Standard'], ['TE_PREMIUM', 'TE premium']])));
  host.append(field('QB format', mkSel('qbFormat', [['SINGLE', 'Single QB'], ['SUPERFLEX', 'Superflex'], ['TWO_QB', 'Two QB']])));
  host.append(field('Draft type', mkSel('draftType', [['SNAKE', 'Snake'], ['LINEAR', 'Linear']])));

  host.append(el('p', 'section-label', 'Starting roster'));
  for (const pos of Object.keys(draft.roster)) {
    host.append(field(pos, num(pos, 0, 6, draft.roster)));
  }

  const row = el('div', 'row');
  const create = el('button', 'pill', 'Create league');
  create.type = 'button';
  create.addEventListener('click', () => {
    draft.slot = Math.min(draft.slot, draft.teams);
    draft.id = 'lg_' + Date.now().toString(36);
    draft.drafted = []; draft.pick = 1; draft.status = {};
    draft.launched = false;   // the app's own gate: setup must be COMPLETED, never inferred
    state.leagues.push(draft);
    state.leagueId = draft.id;
    state.league = draft;
    state.scoring = DEFAULT_SCORING();
    setReceptionPoints({ PPR: 1, HALF: 0.5, STANDARD: 0, TE_PREMIUM: 1 }[draft.scoring] ?? 1);
    state.league.tePremium = draft.scoring === 'TE_PREMIUM' ? 0.5 : 0;
    setTePremium(state.league.tePremium);
    state.drafted = new Map(); state.pick = 1; state.status = {};
    save(); boot();
  });
  row.append(create);
  host.append(row);
}

// ---- draft room --------------------------------------------------------

function renderBoard() {
  const tbody = document.getElementById('board-body');
  tbody.textContent = '';
  let rows = evaluate();

  const f = state.filter;
  if (f.pos !== 'ALL') rows = rows.filter(r => r.p.pos === f.pos);
  if (f.queuedOnly) rows = rows.filter(r => (state.status[r.p.id] || 'NEUTRAL') !== 'NEUTRAL');
  if (f.q) {
    const q = f.q.toLowerCase();
    rows = rows.filter(r => r.p.n.toLowerCase().includes(q) || (r.p.tm || '').toLowerCase().includes(q));
  }

  const { mine } = onClock();
  const shown = rows.slice(0, 200);

  for (const [i, r] of shown.entries()) {
    const p = r.p;
    const st = state.status[p.id] || 'NEUTRAL';
    const tr = document.createElement('tr');
    if (st !== 'NEUTRAL') tr.classList.add('queued');
    tr.append(el('td', 'num', String(i + 1)));

    const tdN = document.createElement('td');
    tdN.append(el('span', `pos ${p.pos}`, p.pos), document.createTextNode(' '));
    tdN.append(el('span', 'nm', p.n), document.createTextNode(' '));
    tdN.append(el('span', 'team', `${p.tm || '—'}${p.bye ? ' · bye ' + p.bye : ''}`));
    if (p.rookie) tdN.append(el('span', 'rk', ' R'));
    if (r.contributions.length) {
      const why = r.contributions.slice()
        .sort((a, b) => Math.abs(b.adjustment) - Math.abs(a.adjustment))
        .map(c => `${DIAL_ABBR[c.dial] || c.dial} ${fmt(c.adjustment)}`).join('  ');
      tdN.append(el('div', 'why', why));
    }
    tr.append(tdN);

    tr.append(el('td', 'num', r.proj == null ? '—' : r.proj.toFixed(1)));
    tr.append(el('td', 'num', r.base.toFixed(1)));
    const dd = r.dialDelta;
    tr.append(el('td', `num delta ${dd > 0.005 ? 'up' : dd < -0.005 ? 'down' : 'flat'}`,
      Math.abs(dd) < 0.005 ? '—' : fmt(dd)));
    const qa = r.queueAdj;
    tr.append(el('td', `num delta ${qa > 0 ? 'up' : qa < 0 ? 'down' : 'flat'}`, qa === 0 ? '—' : fmt(qa)));
    tr.append(el('td', 'num tot', r.total.toFixed(1)));
    tr.append(el('td', 'num', p.p50 == null ? '—' : p.p50.toFixed(0)));
    tr.append(el('td', 'num surv', r.survival ? Math.round(r.survival.probabilityAvailable * 100) + '%' : '—'));

    // QUEUE / QUEUED — membership, exactly as the app's pill reads it:
    // tapping a queued player removes it.
    const tdQ = document.createElement('td');
    const qb = el('button', 'pill-q', st === 'NEUTRAL' ? 'QUEUE' : (st === 'AVOID' ? 'AVOID' : 'QUEUED'));
    qb.type = 'button'; qb.dataset.on = st;
    qb.title = G18.queueReason(st, state.pressure);
    qb.setAttribute('aria-label', `Queue preference for ${p.n}: ${st}`);
    if (!state.league.launched) qb.disabled = true;
    qb.addEventListener('click', ev => {
      ev.stopPropagation();
      if (!state.league.launched) return;
      state.status[p.id] = STATUSES[(STATUSES.indexOf(st) + 1) % STATUSES.length];
      save(); renderBoard(); renderQueue();
    });
    tdQ.append(qb); tr.append(tdQ);

    // The dynamic pill. Unarmed it shows this player's ATTRIBUTE; a first tap
    // ARMS the row and the tag morphs into DRAFT without touching draft state;
    // a second tap confirms. Arming a different row simply re-arms.
    const tdD = document.createElement('td');
    const armed = state.armed === p.id;
    const pill = el('button', 'pill-d', armed ? 'DRAFT' : r.tag.toUpperCase());
    pill.type = 'button';
    if (armed) pill.classList.add('armed');
    pill.title = armed
      ? `Confirm ${p.n} at pick ${state.pick}`
      : `${r.tag} — tap to arm, tap again to draft`;
    pill.setAttribute('aria-label', armed
      ? `Draft ${p.n}, double tap to confirm`
      : `${r.tag}. Draft ${p.n}.`);
    if (!state.league.launched) pill.disabled = true;
    pill.addEventListener('click', ev => {
      ev.stopPropagation();
      if (!state.league.launched) return;
      if (!armed) { state.armed = p.id; renderBoard(); return; }
      state.drafted.set(p.id, { pick: state.pick, mine: onClock().mine });
      state.pick += 1; state.armed = null;
      save(); renderAll();
    });
    tdD.append(pill); tr.append(tdD);

    // The row itself opens the attributes panel, the app's profile route.
    tr.addEventListener('click', () => { state.profileId = p.id; selectTab('player'); renderPlayer(); });

    tbody.append(tr);
  }

}

// ---- tabs --------------------------------------------------------------

function renderQueue() {
  const host = document.getElementById('tab-queue');
  host.textContent = '';
  const queued = POOL.filter(p => (state.status[p.id] || 'NEUTRAL') !== 'NEUTRAL' && !state.drafted.has(p.id));
  if (!queued.length) {
    host.append(el('p', 'hint', 'Nothing queued. Use the queue button on any row to cycle a player through Favorite, Prefer and Avoid.'));
    return;
  }
  const order = { FAVORITE: 0, PREFER: 1, AVOID: 2 };
  queued.sort((a, b) => order[state.status[a.id]] - order[state.status[b.id]] || (a.p50 ?? 999) - (b.p50 ?? 999));
  for (const p of queued) {
    const st = state.status[p.id];
    const row = el('div', 'qrow');
    row.append(el('span', `pos ${p.pos}`, p.pos));
    row.append(el('span', 'qn', p.n));
    const adj = queueAdjustment(st, state.pressure);
    row.append(el('span', `qa delta ${adj > 0 ? 'up' : adj < 0 ? 'down' : 'flat'}`, fmt(adj)));
    const x = el('button', 'qbtn', '×');
    x.type = 'button'; x.title = `Clear ${p.n} from the queue`;
    x.setAttribute('aria-label', `Clear ${p.n} from the queue`);
    x.addEventListener('click', () => { state.status[p.id] = 'NEUTRAL'; save(); renderBoard(); renderQueue(); });
    row.append(x);
    host.append(row);
    host.append(el('p', 'qreason', G18.queueReason(st, state.pressure)));
  }
}

/** Attributes / profile for one player — what the app's profile route shows,
 *  plus the engine's own per-dial contribution breakdown for this board. */
function renderPlayer() {
  const host = document.getElementById('tab-player');
  host.textContent = '';
  if (!state.profileId) {
    host.append(el('p', 'hint', 'Select any row to see that player’s attributes.'));
    return;
  }
  const row = evaluate().find(r => r.p.id === state.profileId)
    || { p: POOL.find(x => x.id === state.profileId) };
  const p = row.p;
  if (!p) { host.append(el('p', 'hint', 'That player is no longer available.')); return; }

  const head = el('div', 'phead');
  head.append(el('span', `pos ${p.pos}`, p.pos));
  head.append(el('span', 'pname', p.n));
  host.append(head);
  if (row.tag) {
    const t = el('span', 'pill-d tagline', row.tag.toUpperCase());
    host.append(t);
  }

  const facts = [
    ['Team', p.tm || '—'],
    ['Bye week', p.bye ?? '—'],
    ['Age at season start', p.age ?? 'not shipped'],
    ['Rookie', p.rookie ? 'yes' : 'no'],
    ['Status', p.status || '—'],
    ['Market p10 / p50 / p90', p.band ? `${p.band.p10} / ${p.p50} / ${p.band.p90}` : 'no market evidence'],
    ['Outcome band width', p.band ? (p.band.p90 - p.band.p10) + ' picks' : '—'],
  ];
  if (row.tier != null) facts.push(['Tier', '#' + row.tier]);
  if (row.survival) {
    facts.push(['Survives to your next pick', Math.round(row.survival.probabilityAvailable * 100) + '%']);
    facts.push(['Risk band', row.survival.band]);
    facts.push(['Market decision', row.decision.toUpperCase()]);
  }
  if (row.proj != null) facts.push(['Projected season points', row.proj.toFixed(1)]);
  if (row.base != null) {
    facts.push(['Base (market)', row.base.toFixed(1)]);
    facts.push(['Board rank', '#' + row.rank]);
    facts.push(['Value', row.total.toFixed(1)]);
  }
  const dl = el('dl', 'kv');
  for (const [k, v] of facts) { dl.append(el('dt', null, k), el('dd', null, String(v))); }
  host.append(dl);

  host.append(el('p', 'section-label', 'Dial contributions'));
  if (!row.contributions || !row.contributions.length) {
    host.append(el('p', 'hint', 'No dial fires on this player: every weight is neutral, or the evidence each dial reads is not shipped for him.'));
  } else {
    for (const c of row.contributions.slice().sort((a, b) => Math.abs(b.adjustment) - Math.abs(a.adjustment))) {
      const r2 = el('div', 'prow');
      r2.append(el('span', 'pk', c.dial.replace(/([A-Z])/g, ' $1').toLowerCase()));
      const bar = el('span', 'pbar'); const fill = el('i');
      const mag = Math.min(1, Math.abs(c.adjustment) / (0.3 * Math.abs(row.base || 1)));
      fill.style.width = (mag * 50) + '%';
      fill.style.left = c.adjustment >= 0 ? '50%' : (50 - mag * 50) + '%';
      if (c.adjustment < 0) fill.classList.add('neg');
      bar.append(fill);
      r2.append(bar, el('span', 'pv', fmt(c.adjustment)));
      host.append(r2);
    }
  }

  host.append(el('p', 'section-label', 'Queue'));
  const st = state.status[p.id] || 'NEUTRAL';
  host.append(el('p', 'qreason', G18.queueReason(st, state.pressure)));
  const row3 = el('div', 'row');
  for (const s2 of STATUSES) {
    const b = el('button', 'pill', s2);
    b.type = 'button';
    if (s2 === st) b.classList.add('on');
    b.addEventListener('click', () => { state.status[p.id] = s2; save(); renderBoard(); renderQueue(); renderPlayer(); });
    row3.append(b);
  }
  host.append(row3);
}

function renderRoster() {
  const host = document.getElementById('roster-footer');
  host.textContent = '';
  const roster = state.league?.roster ?? ROSTER_DEFAULT();
  const mine = myPicks();

  host.append(el('p', 'group-label', 'Your roster'));
  const used = new Set();
  for (const [pos, total] of Object.entries(roster)) {
    const have = mine.filter(r => r.p.pos === pos);
    for (let i = 0; i < total; i++) {
      const row = el('div', 'qrow');
      row.append(el('span', `pos ${pos}`, pos));
      if (have[i]) {
        used.add(have[i].p.id);
        row.append(el('span', 'qn', have[i].p.n));
        row.append(el('span', 'qa', `#${have[i].pick}`));
      } else {
        row.append(el('span', 'qn', '—'));
        row.classList.add('empty');
      }
      host.append(row);
    }
  }

  const bench = mine.filter(r => !used.has(r.p.id));
  host.append(el('p', 'group-label', `Bench (${bench.length})`));
  if (!bench.length) host.append(el('p', 'hint', 'No bench players yet.'));
  for (const r of bench) {
    const row = el('div', 'qrow');
    row.append(el('span', `pos ${r.p.pos}`, r.p.pos));
    row.append(el('span', 'qn', r.p.n));
    row.append(el('span', 'qa', `#${r.pick}`));
    host.append(row);
  }

}

function dialRow(spec, value, onInput, verdict) {
  const wrap = el('div', 'dial');
  const head = el('div', 'head');
  head.append(el('span', 'title', spec.title));
  const val = el('span', 'val', fmt(value)); head.append(val);
  wrap.append(head);
  if (spec.prompt) wrap.append(el('p', 'prompt', spec.prompt));
  const input = document.createElement('input');
  input.type = 'range'; input.min = '-1'; input.max = '1'; input.step = '0.01';
  input.value = String(value);
  input.setAttribute('aria-label', `${spec.title}: ${spec.low} to ${spec.high}`);
  input.addEventListener('input', () => {
    const v = clampDial(parseFloat(input.value));
    val.textContent = fmt(v); onInput(v);
    if (wrap._v) wrap._v.textContent = verdict(v);
  });
  wrap.append(input);
  const ends = el('div', 'ends');
  ends.append(el('span', null, spec.low), el('span', null, spec.high));
  wrap.append(ends);
  if (verdict) { const v = el('p', 'verdict', verdict(value)); wrap.append(v); wrap._v = v; }
  return wrap;
}

function renderPreferences() {
  const host = document.getElementById('tab-preferences');
  host.textContent = '';
  host.append(el('p', 'section-label', 'Draft philosophy'));
  for (const c of PHILOSOPHY_CARDS) {
    host.append(dialRow(c, state.philosophy[c.id], v => {
      state.philosophy[c.id] = v; save(); renderProfile();
    }, c.verdict));
  }
  host.append(el('p', 'section-label', 'Derived profile'));
  const prof = el('div', 'profile'); prof.id = 'profile'; host.append(prof);

  host.append(el('p', 'section-label', 'Preference weights'));
  for (const a of WEIGHT_AXES) {
    host.append(dialRow(a, state.weights[a.id], v => { state.weights[a.id] = v; save(); renderBoard(); }));
  }

  host.append(el('p', 'section-label', 'Availability pressure'));
  const pr = el('div', 'dial');
  const h = el('div', 'head'); h.append(el('span', 'title', 'Pressure magnitude'));
  const pv = el('span', 'val', state.pressure.magnitude.toFixed(2)); h.append(pv); pr.append(h);
  const inp = document.createElement('input');
  inp.type = 'range'; inp.min = '0'; inp.max = '1'; inp.step = '0.01';
  inp.value = String(state.pressure.magnitude);
  inp.setAttribute('aria-label', 'Availability pressure magnitude');
  inp.addEventListener('input', () => {
    state.pressure.magnitude = Math.min(1, Math.max(0, parseFloat(inp.value)));
    pv.textContent = state.pressure.magnitude.toFixed(2);
    save(); renderBoard(); renderQueue();
  });
  pr.append(inp);
  const ends = el('div', 'ends');
  ends.append(el('span', null, 'No pressure'), el('span', null, 'Tier collapsing'));
  pr.append(ends);
  const lab = el('label', 'prompt');
  const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = state.pressure.hasEvidence;
  cb.addEventListener('change', () => { state.pressure.hasEvidence = cb.checked; save(); renderBoard(); renderQueue(); });
  lab.append(cb, document.createTextNode(' Ledger reports pressure evidence'));
  pr.append(lab); host.append(pr);
  renderProfile();
}

function renderProfile() {
  const host = document.getElementById('profile');
  if (!host) return;
  host.textContent = '';
  const prof = G18.deriveProfile(state.philosophy, state.league?.qbFormat);
  const conf = G18.computeConfidence(
    Object.values(state.philosophy).filter(v => v !== 0).length,
    Object.values(state.weights).filter(v => v !== 0).length);
  for (const [k, v] of Object.entries(prof)) {
    const row = el('div', 'prow');
    row.append(el('span', 'pk', k.replace(/([A-Z])/g, ' $1').toLowerCase()));
    const bar = el('span', 'pbar'); const fill = el('i');
    fill.style.width = (Math.abs(v) * 50) + '%';
    fill.style.left = v >= 0 ? '50%' : (50 - Math.abs(v) * 50) + '%';
    if (v < 0) fill.classList.add('neg');
    bar.append(fill); row.append(bar, el('span', 'pv', (v >= 0 ? '+' : '') + v.toFixed(2)));
    host.append(row);
  }
  host.append(el('p', 'hint', `Profile confidence ${(conf.overall * 100).toFixed(0)}% — ${conf.answeredCards}/5 cards answered, ${conf.advancedOverrides} overrides.`));
}

function numberField(label, value, step, min, max, onChange, hint) {
  const f = el('div', 'field');
  const id = 'f_' + Math.random().toString(36).slice(2, 8);
  const l = el('label', null, label); l.htmlFor = id;
  const i = document.createElement('input');
  i.type = 'number'; i.id = id; i.value = String(value); i.step = String(step);
  if (min !== undefined) i.min = String(min);
  if (max !== undefined) i.max = String(max);
  i.addEventListener('change', () => onChange(parseFloat(i.value)));
  f.append(l, i);
  if (hint) f.append(el('p', 'hint', hint));
  return f;
}

function buildLeagueFields(host) {
  const L = state.league;
  const t = document.createElement('input');
  t.type = 'text'; t.value = L.name;
  t.addEventListener('input', () => { L.name = t.value; save(); renderLeagueMenu(); });
  const f = el('div', 'field'); f.append(el('label', null, 'League name'), t); host.append(f);

  // Compact pairs, the way the iOS panels group them, instead of one tall
  // column of full-width rows.
  const grid = el('div', 'sgrid');
  const cell = (label, node) => { const c = el('label', 'scell'); c.append(el('span', 'sk', label), node); grid.append(c); };
  const num = (key, min, max, obj = L) => {
    const i = document.createElement('input');
    i.type = 'number'; i.value = obj[key]; i.min = min; i.max = max;
    i.addEventListener('change', () => {
      obj[key] = Math.max(min, Math.min(max, parseInt(i.value, 10) || min));
      if (key === 'teams') L.slot = Math.min(L.slot, L.teams);
      save(); refresh();
    });
    return i;
  };
  const sel = (key, opts) => {
    const x = document.createElement('select');
    for (const [v, txt] of opts) {
      const o = document.createElement('option'); o.value = v; o.textContent = txt;
      if (L[key] === v) o.selected = true; x.append(o);
    }
    x.addEventListener('change', () => { L[key] = x.value; save(); refresh(); });
    return x;
  };
  cell('Teams', num('teams', 4, 20));
  cell('Your slot', num('slot', 1, 20));
  cell('Rounds', num('rounds', 1, 30));
  cell('Draft type', sel('draftType', [['SNAKE', 'Snake'], ['LINEAR', 'Linear']]));
  cell('QB format', sel('qbFormat', [['SINGLE', '1 QB'], ['SUPERFLEX', 'Superflex'], ['TWO_QB', '2 QB']]));
  host.append(grid);
}

function buildRosterFields(host) {
  const L = state.league;
  const grid = el('div', 'sgrid');
  for (const pos of Object.keys(L.roster)) {
    const c = el('label', 'scell');
    c.append(el('span', 'sk', pos));
    const i = document.createElement('input');
    i.type = 'number'; i.value = L.roster[pos]; i.min = 0; i.max = 6;
    i.addEventListener('change', () => {
      L.roster[pos] = Math.max(0, parseInt(i.value, 10) || 0); save(); refresh();
    });
    c.append(i); grid.append(c);
  }
  host.append(grid);
}

function buildScoringFields(host, markTouched) {
  const L = state.league;
  const row = el('div', 'row');
  for (const [name, rec] of [['Standard', 0], ['Half PPR', 0.5], ['Full PPR', 1]]) {
    const b = el('button', 'pill', name); b.type = 'button';
    if (receptionPoints() === rec) b.classList.add('on');
    b.addEventListener('click', () => {
      setReceptionPoints(rec);
      if (markTouched) L.touchedScoring = true;
      save(); refresh();
    });
    row.append(b);
  }
  host.append(row);

  const byGroup = {};
  for (const r of state.scoring) (byGroup[r.group] ||= []).push(r);

  for (const [group, rules] of Object.entries(byGroup)) {
    if (group === 'Tables') continue;
    host.append(el('p', 'group-label', group));
    const grid = el('div', 'sgrid');
    for (const rule of rules) {
      const cell = el('label', 'scell');
      cell.append(el('span', 'sk', rule.label));
      const i = document.createElement('input');
      i.type = 'number'; i.step = String(rule.step);
      i.value = String(rule.mode === 'perUnit' ? rule.pointsPerUnit : rule.points);
      i.addEventListener('change', () => {
        const v = parseFloat(i.value);
        const val = Number.isFinite(v) ? v : 0;
        if (rule.mode === 'perUnit') rule.pointsPerUnit = val; else rule.points = val;
        if (rule.statKey === 'te_reception') L.tePremium = val;
        if (markTouched) L.touchedScoring = true;
        save(); renderBoard();
      });
      cell.append(i);
      grid.append(cell);
    }
    host.append(grid);
  }

  // The two range tables are tables, not single numbers.
  for (const rule of (byGroup['Tables'] || [])) {
    host.append(el('p', 'group-label', rule.label));
    const t = el('div', 'rtable');
    for (const r of rule.ranges) {
      const band = el('span', 'rband');
      band.append(el('span', 'rr', r.max == null ? `${r.min}+` : (r.min === r.max ? `${r.min}` : `${r.min}–${r.max}`)));
      band.append(el('span', 'rp', (r.points > 0 ? '+' : '') + r.points));
      t.append(band);
    }
    host.append(t);
  }
}

function buildPrefFields(host) {
  for (const c of PHILOSOPHY_CARDS) {
    host.append(dialRow(c, state.philosophy[c.id], v => { state.philosophy[c.id] = v; save(); }, c.verdict));
  }
  for (const a of WEIGHT_AXES) {
    host.append(dialRow(a, state.weights[a.id], v => { state.weights[a.id] = v; save(); renderBoard(); }));
  }
}

/** One entry point so a field edit updates whichever surface is on screen. */
function refresh() {
  renderLeagueMenu();
  if (state.league && !state.league.launched) { renderStepper(); renderBoard(); return; }
  renderAll();
}

function renderSettings() {
  const host = document.getElementById('tab-settings');
  host.textContent = '';
  if (!state.league) return;
  host.append(el('p', 'group-label', 'League'));
  buildLeagueFields(host);
  host.append(el('p', 'group-label', 'Starting roster'));
  buildRosterFields(host);

  host.append(el('p', 'group-label', 'Danger zone'));
  const row = el('div', 'row');
  const reset = el('button', 'pill', 'Reset draft');
  reset.type = 'button';
  reset.addEventListener('click', () => { state.drafted = new Map(); state.pick = 1; save(); renderAll(); });
  const nuke = el('button', 'pill', 'Delete league');
  nuke.type = 'button';
  nuke.addEventListener('click', () => {
    if (!confirm('Delete this league and everything recorded in it?')) return;
    state.leagues = state.leagues.filter(l => l.id !== state.leagueId);
    state.league = null; state.leagueId = null;
    state.drafted = new Map(); state.pick = 1; state.status = {};
    save(); boot();
  });
  row.append(reset, nuke); host.append(row);
}

function renderScoring() {
  const host = document.getElementById('tab-scoring');
  host.textContent = '';
  host.append(el('p', 'hint', 'Every shipped scoring rule. Changes re-rank the board immediately.'));
  buildScoringFields(host, false);
}

function selectTab(name) {
  state.tab = name;
  for (const b of document.querySelectorAll('.tabs button')) b.setAttribute('aria-selected', String(b.dataset.tab === name));
  for (const p of document.querySelectorAll('.tabpanel')) p.hidden = (p.id !== 'tab-' + name);
}

// ---- shell -------------------------------------------------------------

/** Each league owns its own draft. Persist the active one back into the list
 *  before switching, so leagues do not share a board. */
function stashLeagueState() {
  if (!state.league) return;
  state.league.drafted = [...state.drafted];
  state.league.pick = state.pick;
  state.league.status = state.status;
}

function activateLeague(id) {
  stashLeagueState();
  const L = state.leagues.find(l => l.id === id);
  if (!L) return;
  state.leagueId = id;
  state.league = L;
  state.drafted = new Map(L.drafted ?? []);
  state.pick = L.pick ?? 1;
  state.status = L.status ?? {};
  state.armed = null; state.profileId = null;
  save(); boot();
}

function renderLeagueMenu() {
  const host = document.getElementById('leaguemenu');
  if (!host) return;
  host.textContent = '';
  const sel = document.createElement('select');
  sel.setAttribute('aria-label', 'Active league');
  for (const L of state.leagues) {
    const o = document.createElement('option');
    o.value = L.id; o.textContent = L.name;
    if (L.id === state.leagueId) o.selected = true;
    sel.append(o);
  }
  const nw = document.createElement('option');
  nw.value = '__new'; nw.textContent = '＋ New league…';
  sel.append(nw);
  sel.addEventListener('change', () => {
    if (sel.value === '__new') {
      stashLeagueState(); save();
      state.league = null; state.leagueId = null;
      state.drafted = new Map(); state.pick = 1; state.status = {};
      boot();
      return;
    }
    activateLeague(sel.value);
  });
  host.append(sel);
}

/** Pre-draft setup, as a stepper.
 *
 *  Mirrors the app's gate: a league is launchable only when setup has been
 *  explicitly completed, never merely because defaults exist. Steps 1 and 2
 *  are required and ship with working defaults; 3 and 4 are optional tuning
 *  the drafter can skip entirely. */
const STEPS = [
  { id: 'league',  n: 1, title: 'League',      required: true,
    blurb: 'Size, your seat, and how the draft runs. Defaults are a standard 12-team snake.' },
  { id: 'roster',  n: 2, title: 'Roster',      required: true,
    blurb: 'Starting slots. These drive positional need during the draft.' },
  { id: 'scoring', n: 3, title: 'Scoring',     required: false,
    blurb: 'Optional. Full PPR unless you change it.' },
  { id: 'prefs',   n: 4, title: 'Preferences', required: false,
    blurb: 'Optional. Every dial sits at neutral, which reproduces the base board exactly.' },
];

function stepDone(id) {
  const L = state.league;
  if (!L) return false;
  if (id === 'league') return !!(L.name && L.name.trim()) && L.teams >= 4 && L.slot >= 1 && L.slot <= L.teams && L.rounds >= 1;
  if (id === 'roster') return Object.values(L.roster).reduce((a, b) => a + b, 0) > 0;
  if (id === 'scoring') return L.touchedScoring === true;
  if (id === 'prefs') return Object.values(state.philosophy).some(v => v !== 0)
    || Object.values(state.weights).some(v => v !== 0);
  return false;
}

function canLaunch() {
  return STEPS.filter(s => s.required).every(s => stepDone(s.id));
}

function renderStepper() {
  const host = document.getElementById('stepper');
  host.textContent = '';
  const L = state.league;

  for (const step of STEPS) {
    const done = stepDone(step.id);
    const open = state.openStep === step.id;

    const card = el('section', 'step' + (open ? ' open' : '') + (done ? ' done' : ''));
    const head = el('button', 'step-head');
    head.type = 'button';
    head.setAttribute('aria-expanded', String(open));
    const badge = el('span', 'step-n', done ? '✓' : String(step.n));
    head.append(badge);
    const t = el('span', 'step-t');
    t.append(el('span', 'step-title', step.title));
    t.append(el('span', 'step-blurb', step.required ? 'Required' : 'Optional'));
    head.append(t);
    head.append(el('span', 'step-chev', open ? '▾' : '▸'));
    head.addEventListener('click', () => {
      state.openStep = open ? null : step.id;
      renderStepper();
    });
    card.append(head);

    if (open) {
      const body = el('div', 'step-body');
      body.append(el('p', 'hint', step.blurb));
      if (step.id === 'league') buildLeagueFields(body);
      if (step.id === 'roster') buildRosterFields(body);
      if (step.id === 'scoring') buildScoringFields(body, true);
      if (step.id === 'prefs') buildPrefFields(body);
      card.append(body);
    }
    host.append(card);
  }

  const foot = el('div', 'launch-wrap');
  const btn = el('button', 'launch', canLaunch() ? 'LAUNCH DRAFT' : 'FINISH SETUP TO LAUNCH');
  btn.type = 'button';
  btn.disabled = !canLaunch();
  btn.addEventListener('click', () => {
    if (!canLaunch()) { state.openStep = STEPS.find(s => s.required && !stepDone(s.id)).id; renderStepper(); return; }
    state.league.launched = true;
    state.armed = null;
    save(); boot();
  });
  foot.append(btn);
  if (!canLaunch()) foot.append(el('p', 'hint', 'Complete the required steps above to launch.'));
  host.append(foot);
}

function renderClock() {
  const c = document.getElementById('clock');
  if (!c || !state.league) return;
  const { round, seat, mine } = onClock();
  c.textContent = '';
  if (!state.league.launched) {
    c.append(el('b', null, 'Not started'),
      document.createTextNode(`  ·  ${state.league.teams}-team ${state.league.draftType.toLowerCase()}  ·  seat ${state.league.slot}`));
    return;
  }
  c.append(document.createTextNode(`Pick `), el('b', null, String(state.pick)),
    document.createTextNode(`  ·  R${round}  ·  Seat ${seat}${mine ? ' (you)' : ''}`));
}

function renderAll() {
  renderFilters(); renderLeagueMenu(); renderClock(); renderBoard(); renderQueue(); renderRoster(); renderSettings(); renderPlayer();
}

function renderFilters() {
  const host = document.getElementById('filters');
  host.textContent = '';
  const lm = el('span', 'leaguemenu'); lm.id = 'leaguemenu';
  host.append(lm);
  const q = document.createElement('input');
  q.type = 'search'; q.placeholder = 'Search player or team'; q.value = state.filter.q;
  q.setAttribute('aria-label', 'Search players');
  q.addEventListener('input', () => { state.filter.q = q.value; renderBoard(); });
  host.append(q);
  for (const pos of ['ALL', ...POSITIONS]) {
    const b = el('button', 'fbtn', pos);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(state.filter.pos === pos));
    b.addEventListener('click', () => { state.filter.pos = pos; renderFilters(); renderBoard(); });
    host.append(b);
  }
  const qb = el('button', 'fbtn', 'Queued');
  qb.type = 'button';
  qb.setAttribute('aria-pressed', String(state.filter.queuedOnly));
  qb.addEventListener('click', () => { state.filter.queuedOnly = !state.filter.queuedOnly; renderFilters(); renderBoard(); });
  host.append(qb);
}

function boot() {
  if (!state.league) { renderSetup(); return; }
  document.getElementById('setup').hidden = true;
  document.getElementById('app').hidden = false;

  // Two live states: pre-draft (stepper, board is a read-only preview) and
  // drafting (tabs, board is interactive). The board renders in both so the
  // drafter can see the pool their settings actually produce before starting.
  const launched = !!state.league.launched;
  document.body.classList.toggle('predraft', !launched);
  document.getElementById('stepper-pane').hidden = launched;
  document.getElementById('tabs-pane').hidden = !launched;
  if (!launched) {
    if (!state.openStep) state.openStep = 'league';
    renderFilters(); renderLeagueMenu(); renderStepper(); renderBoard(); renderClock();
    return;
  }
  renderFilters();
  renderLeagueMenu();
  renderPreferences();
  renderScoring();
  renderAll();
  renderRoster();
  for (const b of document.querySelectorAll('.tabs button')) b.onclick = () => selectTab(b.dataset.tab);
  selectTab(state.tab);
  const undo = document.getElementById('undo');
  if (!undo) return;
  undo.hidden = false;
  undo.onclick = () => {
    if (state.pick <= 1) return;
    let lastId = null, lastPick = 0;
    for (const [id, v] of state.drafted) if (v.pick > lastPick) { lastPick = v.pick; lastId = id; }
    if (lastId) state.drafted.delete(lastId);
    state.pick -= 1; save(); renderAll();
  };
}

async function init() {
  restore();
  try {
    const r = await fetch('/assets/pool.json');
    const d = await r.json();
    POOL = d.players.filter(p => p.pos && p.pos !== 'NA');
    POOL_META = d;

  } catch {
    document.body.textContent = 'Player pool failed to load.';
    return;
  }
  boot();
}

document.addEventListener('DOMContentLoaded', init);
