/* GREEN18 model console.
 *
 * Left: a live draft room. Right: tabbed model controls (Preferences,
 * Settings, Scoring). Neither pane scrolls the page — the shell is fixed to
 * the viewport and each pane scrolls internally.
 *
 * Constants and formulas transcribed from the iOS sources, not invented:
 *   philosophy cards + dial specs -> Green18App/Onboarding/PreferenceSteps.swift
 *   -1...1 clamping               -> DraftEngine/Personalization/PreferenceWeights.swift
 *   queue strengths + adjustment  -> DraftEngine/User/QueuePreferenceMapping.swift
 *   +/-2.5 and +/-6.0 bounds      -> DraftEngine/Contracts/DraftModelArtifact.swift
 *   league + scoring shape        -> DraftEngine/Contracts/LeagueConfig.swift, ScoringRule.swift
 *
 * The model is REAL, not a mock: assets/engine.js is a line-for-line
 * transcription of PersonalizedBoard, PersonalizedBoardBounds, the season
 * points envelope, PhilosophyDerivation and the queue layer. Projections are
 * computed from each player's stat line through the Scoring tab, the position
 * curve is rebuilt from those projections, and the five dials move the board
 * through the engine's own contribution functions and its ±30% cap.
 */

'use strict';

const { clampDial, queueAdjustment, personalizedValue } = window.G18;

// ---- specs -------------------------------------------------------------

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

const STATUSES = ['NEUTRAL', 'FAVORITE', 'PREFER', 'AVOID'];

// ---- sample pool -------------------------------------------------------
// Stat lines only; every points figure on screen is computed from these
// through the Scoring tab, so changing a scoring rule really does re-rank
// the board.

const POOL = [
  { id:'p01', n:'J. Chase',    pos:'WR', tm:'CIN', adp:1.2,  age:25, band:{p10:1,  p90:6},   st:{ rec:105, recYd:1420, recTD:12, rushYd:40,  rushTD:0 } },
  { id:'p02', n:'B. Robinson', pos:'RB', tm:'ATL', adp:2.4,  age:26, band:{p10:1,  p90:8},   st:{ rec:52,  recYd:420,  recTD:3,  rushYd:1380,rushTD:12 } },
  { id:'p03', n:'C. Lamb',     pos:'WR', tm:'DAL', adp:3.1,  age:26, band:{p10:1,  p90:9},   st:{ rec:98,  recYd:1340, recTD:10, rushYd:30,  rushTD:0 } },
  { id:'p04', n:'J. Gibbs',    pos:'RB', tm:'DET', adp:4.0,  age:24, band:{p10:2,  p90:12},  st:{ rec:60,  recYd:500,  recTD:2,  rushYd:1180,rushTD:11 } },
  { id:'p05', n:'A. St. Brown',pos:'WR', tm:'DET', adp:6.5,  age:26, band:{p10:3,  p90:14},  st:{ rec:112, recYd:1250, recTD:9,  rushYd:10,  rushTD:0 } },
  { id:'p06', n:'S. LaPorta',  pos:'TE', tm:'DET', adp:14.2, age:24, band:{p10:8,  p90:30},  st:{ rec:86,  recYd:940,  recTD:8,  rushYd:0,   rushTD:0 } },
  { id:'p07', n:'T. McBride',  pos:'TE', tm:'ARI', adp:18.9, age:26, band:{p10:11, p90:34},  st:{ rec:92,  recYd:900,  recTD:6,  rushYd:0,   rushTD:0 } },
  { id:'p08', n:'J. Allen',    pos:'QB', tm:'BUF', adp:22.0, age:29, band:{p10:12, p90:40},  st:{ passYd:4100, passTD:31, int:11, rushYd:560, rushTD:12 } },
  { id:'p09', n:'J. Daniels',  pos:'QB', tm:'WAS', adp:24.6, age:24, band:{p10:14, p90:46},  st:{ passYd:3900, passTD:27, int:9,  rushYd:820, rushTD:8 } },
  { id:'p10', n:'D. Achane',   pos:'RB', tm:'MIA', adp:9.8,  age:24, band:{p10:4,  p90:24},  st:{ rec:74,  recYd:620,  recTD:4,  rushYd:960, rushTD:8 } },
  { id:'p11', n:'N. Collins',  pos:'WR', tm:'HOU', adp:12.4, age:26, band:{p10:7,  p90:26},  st:{ rec:84,  recYd:1180, recTD:8,  rushYd:0,   rushTD:0 } },
  { id:'p12', n:'B. Bowers',   pos:'TE', tm:'LV',  adp:20.5, age:23, band:{p10:12, p90:38},  st:{ rec:95,  recYd:1030, recTD:6,  rushYd:20,  rushTD:0 } },
  { id:'p13', n:'K. Walker',   pos:'RB', tm:'SEA', adp:26.1, age:25, band:{p10:16, p90:44},  st:{ rec:46,  recYd:340,  recTD:2,  rushYd:1010,rushTD:9 } },
  { id:'p14', n:'B. Purdy',    pos:'QB', tm:'SF',  adp:38.4, age:26, band:{p10:26, p90:62},  st:{ passYd:4050, passTD:29, int:12, rushYd:280, rushTD:4 } },
  { id:'p15', n:'Ravens D/ST', pos:'DST',tm:'BAL', adp:96.0, age:null,band:{p10:80, p90:120},st:{ dstSack:48, dstInt:16, dstTD:4 } },
  { id:'p16', n:'H. Butker',   pos:'K',  tm:'KC',  adp:132.0,age:30, band:{p10:120,p90:160}, st:{ fg:31, xp:44 } },
];

// ---- scoring -----------------------------------------------------------
// perUnit / event rules in the shape LeagueConfig carries them.

const DEFAULT_SCORING = [
  { id:'rec',     label:'Per reception',        statKey:'rec',     points:1.0,  step:0.5 },
  { id:'recYd',   label:'Receiving yards',      statKey:'recYd',   points:0.1,  step:0.01, per:1 },
  { id:'recTD',   label:'Receiving TD',         statKey:'recTD',   points:6,    step:1 },
  { id:'rushYd',  label:'Rushing yards',        statKey:'rushYd',  points:0.1,  step:0.01, per:1 },
  { id:'rushTD',  label:'Rushing TD',           statKey:'rushTD',  points:6,    step:1 },
  { id:'passYd',  label:'Passing yards',        statKey:'passYd',  points:0.04, step:0.01, per:1 },
  { id:'passTD',  label:'Passing TD',           statKey:'passTD',  points:4,    step:1 },
  { id:'int',     label:'Interception thrown',  statKey:'int',     points:-2,   step:1 },
  { id:'dstSack', label:'D/ST sack',            statKey:'dstSack', points:1,    step:1 },
  { id:'dstInt',  label:'D/ST interception',    statKey:'dstInt',  points:2,    step:1 },
  { id:'dstTD',   label:'D/ST touchdown',       statKey:'dstTD',   points:6,    step:1 },
  { id:'fg',      label:'Field goal',           statKey:'fg',      points:3,    step:1 },
  { id:'xp',      label:'Extra point',          statKey:'xp',      points:1,    step:1 },
];

const state = {
  philosophy: Object.fromEntries(PHILOSOPHY_CARDS.map(c => [c.id, 0])),
  weights: Object.fromEntries(WEIGHT_AXES.map(a => [a.id, 0])),
  scoring: DEFAULT_SCORING.map(r => ({ ...r })),
  league: { teams: 12, qbFormat: 'SINGLE', tePremium: 0, draftType: 'SNAKE', slot: 6, rounds: 15 },
  // Starting slots, which drive positionNeed for the positional-aggression dial.
  roster: { QB: 1, RB: 2, WR: 3, TE: 1, DST: 1, K: 1 },
  myTeam: new Set(),
  pressure: { magnitude: 0, hasEvidence: false },
  status: {},                   // playerId -> queue status
  drafted: new Set(),
  pick: 1,
  tab: 'preferences',
};
for (const p of POOL) state.status[p.id] = 'NEUTRAL';

// ---- computation -------------------------------------------------------

function scoringMap() {
  return Object.fromEntries(state.scoring.map(r => [r.statKey, r.points]));
}

/** Projected points = stat line x scoring rules, plus the TE-premium
 *  per-reception bonus when the league declares one. */
function projectedPoints(player) {
  const map = scoringMap();
  let total = 0;
  for (const [k, v] of Object.entries(player.st)) {
    if (map[k] !== undefined) total += v * map[k];
  }
  if (player.pos === 'TE' && state.league.tePremium) {
    total += (player.st.rec || 0) * state.league.tePremium;
  }
  return total;
}

/** Signals for one player, in the shape PlayerSignals carries them.
 *  positionCurve is built from THIS pool's own projections, so it moves with
 *  the scoring rules rather than being a frozen table. */
function signalsFor(player, ranks, needs) {
  return {
    entityId: player.id,
    baseValue: projectedPoints(player),
    outcomeBand: player.band,
    marketPickRank: Math.max(1, Math.round(player.adp)),
    modelRank: ranks.overall.get(player.id),
    leagueTeamCount: state.league.teams,
    ageAtSeasonStart: player.age,
    yearsExperience: null,
    positionNeed: needs[player.pos] ?? 0,
  };
}

/** Position curve: rank within position -> projected points, isotonic. */
function envelopeFor(pos, live) {
  const known = live
    .filter(p => p.pos === pos)
    .map(p => projectedPoints(p))
    .sort((a, b) => b - a)
    .map((points, i) => ({ rank: i + 1, points }));
  return G18.makeEnvelope(known);
}

/** How badly the roster still needs this position: unfilled starting slots
 *  at that position over its total, 0...1. */
function positionNeeds() {
  const needs = {};
  for (const [pos, total] of Object.entries(state.roster)) {
    const filled = [...state.myTeam].filter(id => POOL.find(p => p.id === id)?.pos === pos).length;
    needs[pos] = total === 0 ? 0 : Math.max(0, (total - filled) / total);
  }
  return needs;
}

/** The full valuation: base projection, the five dials through
 *  PersonalizedBoard, then the queue layer. */
function evaluate() {
  const live = POOL.filter(p => !state.drafted.has(p.id));

  // modelRank is the ordering by base value alone, before any dial fires.
  const byBase = [...live].sort((a, b) =>
    projectedPoints(b) - projectedPoints(a) || a.id.localeCompare(b.id));
  const overall = new Map(byBase.map((p, i) => [p.id, i + 1]));

  const needs = positionNeeds();
  const envs = {};
  for (const pos of new Set(live.map(p => p.pos))) envs[pos] = envelopeFor(pos, live);

  const rows = live.map(p => {
    const sig = signalsFor(p, { overall }, needs);
    const pv = G18.personalizedValue(sig, state.weights, envs[p.pos]);
    const qAdj = G18.queueAdjustment(state.status[p.id], state.pressure);
    return {
      player: p,
      base: sig.baseValue,
      personalized: pv.total,
      dialDelta: pv.total - pv.baseValue,
      contributions: pv.contributions,
      queueAdj: qAdj,
      total: pv.total + qAdj,
      modelRank: sig.modelRank,
      need: needs[p.pos] ?? 0,
    };
  });

  rows.sort((a, b) => b.total - a.total || a.player.id.localeCompare(b.player.id));
  return rows;
}

function orderedPool() {
  return POOL
    .filter(p => !state.drafted.has(p.id))
    .sort((a, b) => boardValue(b) - boardValue(a));
}

/** Snake order: which team is on the clock at this overall pick. */
function onClock() {
  const t = state.league.teams;
  const round = Math.floor((state.pick - 1) / t) + 1;
  const idx = (state.pick - 1) % t;
  const seat = (round % 2 === 1) ? idx + 1 : t - idx;
  return { round, seat, mine: seat === state.league.slot };
}

// ---- dom helpers -------------------------------------------------------

const fmt = n => (n >= 0 ? '+' : '') + n.toFixed(2);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

// ---- draft room --------------------------------------------------------

function renderClock() {
  const { round, seat, mine } = onClock();
  const c = document.getElementById('clock');
  c.textContent = '';
  c.append(
    document.createTextNode('Pick '),
    Object.assign(el('b', null, String(state.pick)), {}),
    document.createTextNode(`  ·  Round ${round}  ·  Seat ${seat}${mine ? ' (you)' : ''}`)
  );
}

const DIAL_ABBR = {
  riskTolerance: 'risk', floorVsUpside: 'floor/up', consensusVsContrarian: 'cons/con',
  youthVsVeterans: 'youth/vet', positionalAggression: 'pos',
};

function renderBoard() {
  const tbody = document.getElementById('board-body');
  tbody.textContent = '';
  const rows = evaluate();
  const { mine } = onClock();

  for (const [i, r] of rows.entries()) {
    const p = r.player;
    const tr = document.createElement('tr');

    tr.append(el('td', 'num', String(i + 1)));

    const tdN = document.createElement('td');
    tdN.append(el('span', `pos ${p.pos}`, p.pos), document.createTextNode(' '));
    tdN.append(el('span', 'nm', p.n), document.createTextNode(' '));
    tdN.append(el('span', 'team', p.tm));
    // Which dials actually fired, and by how much — the engine's own
    // contribution list, not a re-derivation.
    if (r.contributions.length) {
      const why = r.contributions
        .slice().sort((a, b) => Math.abs(b.adjustment) - Math.abs(a.adjustment))
        .map(c => `${DIAL_ABBR[c.dial] || c.dial} ${fmt(c.adjustment)}`).join('  ');
      tdN.append(el('div', 'why', why));
    }
    tr.append(tdN);

    tr.append(el('td', 'num', r.base.toFixed(1)));

    const dd = r.dialDelta;
    tr.append(el('td', `num delta ${dd > 0.005 ? 'up' : dd < -0.005 ? 'down' : 'flat'}`,
      Math.abs(dd) < 0.005 ? '—' : fmt(dd)));

    const qa = r.queueAdj;
    tr.append(el('td', `num delta ${qa > 0 ? 'up' : qa < 0 ? 'down' : 'flat'}`, qa === 0 ? '—' : fmt(qa)));

    tr.append(el('td', 'num tot', r.total.toFixed(1)));
    tr.append(el('td', 'num', p.adp.toFixed(1)));

    const tdQ = document.createElement('td');
    const b = el('button', 'qbtn', state.status[p.id] === 'NEUTRAL' ? '·' : state.status[p.id][0]);
    b.type = 'button';
    b.dataset.on = state.status[p.id];
    b.title = G18.queueReason(state.status[p.id], state.pressure);
    b.setAttribute('aria-label', `Queue preference for ${p.n}: ${state.status[p.id]}`);
    b.addEventListener('click', () => {
      state.status[p.id] = STATUSES[(STATUSES.indexOf(state.status[p.id]) + 1) % STATUSES.length];
      renderBoard();
    });
    tdQ.append(b);
    tr.append(tdQ);

    const tdD = document.createElement('td');
    const d = el('button', 'qbtn', mine ? 'Take' : 'Off');
    d.type = 'button';
    d.title = mine ? 'Record as your pick' : 'Record as another team’s pick';
    d.setAttribute('aria-label', `Record ${p.n} as drafted`);
    d.addEventListener('click', () => {
      state.drafted.add(p.id);
      if (onClock().mine) state.myTeam.add(p.id);
      state.pick += 1;
      renderClock(); renderBoard(); renderRoster();
    });
    tdD.append(d);
    tr.append(tdD);

    tbody.append(tr);
  }
  document.getElementById('remaining').textContent = `${rows.length} available`;
}

/** Your roster so far, and therefore what positionNeed is reading. */
function renderRoster() {
  const host = document.getElementById('roster');
  if (!host) return;
  host.textContent = '';
  const needs = positionNeeds();
  for (const [pos, total] of Object.entries(state.roster)) {
    const filled = [...state.myTeam].filter(id => POOL.find(p => p.id === id)?.pos === pos).length;
    const chip = el('span', 'chip');
    chip.append(el('span', `pos ${pos}`, pos));
    chip.append(document.createTextNode(` ${filled}/${total}`));
    if (needs[pos] === 0) chip.classList.add('done');
    host.append(chip);
  }
}

// ---- tabs --------------------------------------------------------------

function dialRow(spec, value, onInput, verdict) {
  const wrap = el('div', 'dial');
  const head = el('div', 'head');
  head.append(el('span', 'title', spec.title));
  const val = el('span', 'val', fmt(value));
  head.append(val);
  wrap.append(head);
  if (spec.prompt) wrap.append(el('p', 'prompt', spec.prompt));

  const input = document.createElement('input');
  input.type = 'range'; input.min = '-1'; input.max = '1'; input.step = '0.01';
  input.value = String(value);
  input.setAttribute('aria-label', `${spec.title}: ${spec.low} to ${spec.high}`);
  input.addEventListener('input', () => {
    const v = clampDial(parseFloat(input.value));
    val.textContent = fmt(v);
    onInput(v);
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
      state.philosophy[c.id] = v; renderProfile();
    }, c.verdict));
  }
  // The five answers fan out to twelve profile dimensions, exactly as
  // PhilosophyDerivation does it — including the superflex gate.
  host.append(el('p', 'section-label', 'Derived profile'));
  const prof = el('div', 'profile'); prof.id = 'profile';
  host.append(prof);

  host.append(el('p', 'section-label', 'Preference weights'));
  for (const a of WEIGHT_AXES) {
    // These five ARE the model's dials: each one re-runs PersonalizedBoard.
    host.append(dialRow(a, state.weights[a.id], v => { state.weights[a.id] = v; renderBoard(); }));
  }

  host.append(el('p', 'section-label', 'Availability pressure'));
  const pr = el('div', 'dial');
  const h = el('div', 'head');
  h.append(el('span', 'title', 'Pressure magnitude'));
  const pv = el('span', 'val', state.pressure.magnitude.toFixed(2));
  h.append(pv); pr.append(h);
  const inp = document.createElement('input');
  inp.type = 'range'; inp.min = '0'; inp.max = '1'; inp.step = '0.01';
  inp.value = String(state.pressure.magnitude);
  inp.setAttribute('aria-label', 'Availability pressure magnitude');
  inp.addEventListener('input', () => {
    state.pressure.magnitude = Math.min(1, Math.max(0, parseFloat(inp.value)));
    pv.textContent = state.pressure.magnitude.toFixed(2);
    renderBoard();
  });
  pr.append(inp);
  const ends = el('div', 'ends');
  ends.append(el('span', null, 'No pressure'), el('span', null, 'Tier collapsing'));
  pr.append(ends);

  const lab = el('label', 'prompt');
  const cb = document.createElement('input');
  cb.type = 'checkbox'; cb.checked = state.pressure.hasEvidence;
  cb.addEventListener('change', () => { state.pressure.hasEvidence = cb.checked; renderBoard(); });
  lab.append(cb, document.createTextNode(' Ledger reports pressure evidence'));
  pr.append(lab);
  host.append(pr);
}

function renderProfile() {
  const host = document.getElementById('profile');
  if (!host) return;
  host.textContent = '';
  const prof = G18.deriveProfile(state.philosophy, state.league.qbFormat);
  const conf = G18.computeConfidence(
    Object.values(state.philosophy).filter(v => v !== 0).length,
    Object.values(state.weights).filter(v => v !== 0).length);
  for (const [k, v] of Object.entries(prof)) {
    const row = el('div', 'prow');
    row.append(el('span', 'pk', k.replace(/([A-Z])/g, ' $1').toLowerCase()));
    const bar = el('span', 'pbar');
    const fill = el('i');
    fill.style.width = (Math.abs(v) * 50) + '%';
    fill.style.left = v >= 0 ? '50%' : (50 - Math.abs(v) * 50) + '%';
    if (v < 0) fill.classList.add('neg');
    bar.append(fill);
    row.append(bar, el('span', 'pv', (v >= 0 ? '+' : '') + v.toFixed(2)));
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
  i.addEventListener('change', () => { onChange(parseFloat(i.value)); });
  f.append(l, i);
  if (hint) f.append(el('p', 'hint', hint));
  return f;
}

function selectField(label, value, options, onChange) {
  const f = el('div', 'field');
  const id = 'f_' + Math.random().toString(36).slice(2, 8);
  const l = el('label', null, label); l.htmlFor = id;
  const s = document.createElement('select'); s.id = id;
  for (const [v, t] of options) {
    const o = document.createElement('option');
    o.value = v; o.textContent = t; if (v === value) o.selected = true;
    s.append(o);
  }
  s.addEventListener('change', () => onChange(s.value));
  f.append(l, s);
  return f;
}

function renderSettings() {
  const host = document.getElementById('tab-settings');
  host.textContent = '';

  host.append(el('p', 'section-label', 'League'));
  host.append(numberField('Teams', state.league.teams, 1, 4, 20, v => {
    state.league.teams = Math.min(20, Math.max(4, v || 12)); renderClock(); renderBoard();
  }));
  host.append(numberField('Your seat', state.league.slot, 1, 1, state.league.teams, v => {
    state.league.slot = Math.max(1, v || 1); renderClock();
  }));
  host.append(numberField('Rounds', state.league.rounds, 1, 1, 30, v => { state.league.rounds = v || 15; }));
  host.append(selectField('QB format', state.league.qbFormat, [
    ['SINGLE', 'Single QB'], ['SUPERFLEX', 'Superflex'], ['TWO_QB', 'Two QB'],
  ], v => { state.league.qbFormat = v; renderBoard(); }));
  host.append(selectField('Draft type', state.league.draftType, [
    ['SNAKE', 'Snake'], ['LINEAR', 'Linear'], ['AUCTION', 'Auction'],
  ], v => { state.league.draftType = v; renderClock(); }));

  host.append(el('p', 'section-label', 'Format'));
  host.append(numberField('TE premium (pts / reception)', state.league.tePremium, 0.25, 0, 2, v => {
    state.league.tePremium = Math.max(0, v || 0); renderBoard();
  }, 'Added to a TE’s per-reception value on top of the reception rule below.'));

  const reset = el('button', 'pill', 'Reset model to neutral');
  reset.type = 'button';
  reset.addEventListener('click', () => {
    for (const c of PHILOSOPHY_CARDS) state.philosophy[c.id] = 0;
    for (const a of WEIGHT_AXES) state.weights[a.id] = 0;
    state.pressure = { magnitude: 0, hasEvidence: false };
    state.scoring = DEFAULT_SCORING.map(r => ({ ...r }));
    for (const p of POOL) state.status[p.id] = 'NEUTRAL';
    state.drafted = new Set(); state.pick = 1;
    renderPreferences(); renderSettings(); renderScoring(); renderClock(); renderBoard();
  });
  const wrap = el('div', 'field'); wrap.append(reset);
  host.append(el('p', 'section-label', 'Reset'), wrap);
}

function renderScoring() {
  const host = document.getElementById('tab-scoring');
  host.textContent = '';
  host.append(el('p', 'section-label', 'Scoring rules'));
  const hint = el('p', 'hint', 'Every projection on the board is computed from these rules. Change one and the board re-ranks.');
  hint.style.margin = '0 0 .5rem';
  host.append(hint);

  for (const rule of state.scoring) {
    host.append(numberField(rule.label, rule.points, rule.step, undefined, undefined, v => {
      rule.points = Number.isFinite(v) ? v : 0;
      renderBoard();
    }));
  }

  host.append(el('p', 'section-label', 'Presets'));
  const row = el('div', 'field');
  for (const [name, rec] of [['Standard', 0], ['Half PPR', 0.5], ['Full PPR', 1]]) {
    const b = el('button', 'pill', name);
    b.type = 'button';
    b.style.marginRight = '.3rem';
    b.addEventListener('click', () => {
      const r = state.scoring.find(x => x.statKey === 'rec');
      if (r) r.points = rec;
      renderScoring(); renderBoard();
    });
    row.append(b);
  }
  host.append(row);
}

function selectTab(name) {
  state.tab = name;
  for (const b of document.querySelectorAll('.tabs button')) {
    b.setAttribute('aria-selected', String(b.dataset.tab === name));
  }
  for (const p of document.querySelectorAll('.tabpanel')) {
    p.hidden = (p.id !== 'tab-' + name);
  }
}

// ---- init --------------------------------------------------------------

function init() {
  renderPreferences();
  renderProfile();
  renderSettings();
  renderScoring();
  renderClock();
  renderBoard();
  renderRoster();

  for (const b of document.querySelectorAll('.tabs button')) {
    b.addEventListener('click', () => selectTab(b.dataset.tab));
  }
  selectTab('preferences');

  document.getElementById('undo').addEventListener('click', () => {
    if (state.pick > 1) { state.pick -= 1; }
    const last = [...state.drafted].pop();
    if (last) state.drafted.delete(last);
    renderClock(); renderBoard(); renderRoster();
  });
}

document.addEventListener('DOMContentLoaded', init);
