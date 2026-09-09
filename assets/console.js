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
 * Projected points ARE computed here, from each player's stat line times the
 * scoring rules in the Scoring tab — that is ordinary fantasy scoring
 * arithmetic and is honest to compute. The philosophy->weights derivation in
 * PhilosophyDerivation.swift is NOT reproduced: guessing it would move the
 * board by a rule the app does not use. The dials therefore hold and display
 * operator intent; they do not silently reorder the board.
 */

'use strict';

const BOUNDS = { queue: 2.5, total: 6.0 };

// ---- engine functions, transcribed ------------------------------------

function clampDial(raw) {
  if (!Number.isFinite(raw)) return 0;
  return Math.min(1, Math.max(-1, raw));
}

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
  const b = BOUNDS.queue;
  return Math.min(b, Math.max(-b, strength * blend * b));
}

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
  { id:'p01', n:'J. Chase',    pos:'WR', tm:'CIN', adp:1.2,  st:{ rec:105, recYd:1420, recTD:12, rushYd:40,  rushTD:0 } },
  { id:'p02', n:'B. Robinson', pos:'RB', tm:'ATL', adp:2.4,  st:{ rec:52,  recYd:420,  recTD:3,  rushYd:1380,rushTD:12 } },
  { id:'p03', n:'C. Lamb',     pos:'WR', tm:'DAL', adp:3.1,  st:{ rec:98,  recYd:1340, recTD:10, rushYd:30,  rushTD:0 } },
  { id:'p04', n:'J. Gibbs',    pos:'RB', tm:'DET', adp:4.0,  st:{ rec:60,  recYd:500,  recTD:2,  rushYd:1180,rushTD:11 } },
  { id:'p05', n:'A. St. Brown',pos:'WR', tm:'DET', adp:6.5,  st:{ rec:112, recYd:1250, recTD:9,  rushYd:10,  rushTD:0 } },
  { id:'p06', n:'S. LaPorta',  pos:'TE', tm:'DET', adp:14.2, st:{ rec:86,  recYd:940,  recTD:8,  rushYd:0,   rushTD:0 } },
  { id:'p07', n:'T. McBride',  pos:'TE', tm:'ARI', adp:18.9, st:{ rec:92,  recYd:900,  recTD:6,  rushYd:0,   rushTD:0 } },
  { id:'p08', n:'J. Allen',    pos:'QB', tm:'BUF', adp:22.0, st:{ passYd:4100, passTD:31, int:11, rushYd:560, rushTD:12 } },
  { id:'p09', n:'J. Daniels',  pos:'QB', tm:'WAS', adp:24.6, st:{ passYd:3900, passTD:27, int:9,  rushYd:820, rushTD:8 } },
  { id:'p10', n:'D. Achane',   pos:'RB', tm:'MIA', adp:9.8,  st:{ rec:74,  recYd:620,  recTD:4,  rushYd:960, rushTD:8 } },
  { id:'p11', n:'N. Collins',  pos:'WR', tm:'HOU', adp:12.4, st:{ rec:84,  recYd:1180, recTD:8,  rushYd:0,   rushTD:0 } },
  { id:'p12', n:'B. Bowers',   pos:'TE', tm:'LV',  adp:20.5, st:{ rec:95,  recYd:1030, recTD:6,  rushYd:20,  rushTD:0 } },
  { id:'p13', n:'K. Walker',   pos:'RB', tm:'SEA', adp:26.1, st:{ rec:46,  recYd:340,  recTD:2,  rushYd:1010,rushTD:9 } },
  { id:'p14', n:'B. Purdy',    pos:'QB', tm:'SF',  adp:38.4, st:{ passYd:4050, passTD:29, int:12, rushYd:280, rushTD:4 } },
  { id:'p15', n:'Ravens D/ST', pos:'DST',tm:'BAL', adp:96.0, st:{ dstSack:48, dstInt:16, dstTD:4 } },
  { id:'p16', n:'H. Butker',   pos:'K',  tm:'KC',  adp:132.0,st:{ fg:31, xp:44 } },
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

/** What the board is ordered by: the computed projection plus the queue
 *  layer's real adjustment. Nothing else is invented. */
function boardValue(player) {
  return projectedPoints(player) + queueAdjustment(state.status[player.id], state.pressure);
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

function renderBoard() {
  const tbody = document.getElementById('board-body');
  tbody.textContent = '';
  const rows = orderedPool();

  for (const [i, p] of rows.entries()) {
    const tr = document.createElement('tr');

    tr.append(el('td', 'num', String(i + 1)));

    const tdN = document.createElement('td');
    tdN.append(el('span', `pos ${p.pos}`, p.pos), document.createTextNode(' '));
    tdN.append(el('span', 'nm', p.n), document.createTextNode(' '));
    tdN.append(el('span', 'team', p.tm));
    tr.append(tdN);

    tr.append(el('td', 'num', projectedPoints(p).toFixed(1)));
    tr.append(el('td', 'num', p.adp.toFixed(1)));

    const adj = queueAdjustment(state.status[p.id], state.pressure);
    tr.append(el('td', `num delta ${adj > 0 ? 'up' : adj < 0 ? 'down' : 'flat'}`, adj === 0 ? '—' : fmt(adj)));

    const tdQ = document.createElement('td');
    const b = el('button', 'qbtn', state.status[p.id] === 'NEUTRAL' ? '·' : state.status[p.id][0]);
    b.type = 'button';
    b.dataset.on = state.status[p.id];
    b.title = `Queue: ${state.status[p.id]} — click to cycle`;
    b.setAttribute('aria-label', `Queue preference for ${p.n}: ${state.status[p.id]}`);
    b.addEventListener('click', () => {
      const next = STATUSES[(STATUSES.indexOf(state.status[p.id]) + 1) % STATUSES.length];
      state.status[p.id] = next;
      renderBoard();
    });
    tdQ.append(b);
    tr.append(tdQ);

    const tdD = document.createElement('td');
    const d = el('button', 'qbtn', 'Draft');
    d.type = 'button';
    d.setAttribute('aria-label', `Record ${p.n} as drafted`);
    d.addEventListener('click', () => {
      state.drafted.add(p.id);
      state.pick += 1;
      renderClock(); renderBoard();
    });
    tdD.append(d);
    tr.append(tdD);

    tbody.append(tr);
  }
  document.getElementById('remaining').textContent = `${rows.length} available`;
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
    host.append(dialRow(c, state.philosophy[c.id], v => { state.philosophy[c.id] = v; }, c.verdict));
  }

  host.append(el('p', 'section-label', 'Preference weights'));
  for (const a of WEIGHT_AXES) {
    host.append(dialRow(a, state.weights[a.id], v => { state.weights[a.id] = v; }));
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
  renderSettings();
  renderScoring();
  renderClock();
  renderBoard();

  for (const b of document.querySelectorAll('.tabs button')) {
    b.addEventListener('click', () => selectTab(b.dataset.tab));
  }
  selectTab('preferences');

  document.getElementById('undo').addEventListener('click', () => {
    if (state.pick > 1) { state.pick -= 1; }
    const last = [...state.drafted].pop();
    if (last) state.drafted.delete(last);
    renderClock(); renderBoard();
  });
}

document.addEventListener('DOMContentLoaded', init);
