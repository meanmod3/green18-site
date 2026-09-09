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

const DEFAULT_SCORING = () => [
  { id:'rec',    label:'Per reception',       statKey:'rec',    points:1.0,  step:0.5 },
  { id:'recYd',  label:'Receiving yards',     statKey:'recYd',  points:0.1,  step:0.01 },
  { id:'recTD',  label:'Receiving TD',        statKey:'recTD',  points:6,    step:1 },
  { id:'rushYd', label:'Rushing yards',       statKey:'rushYd', points:0.1,  step:0.01 },
  { id:'rushTD', label:'Rushing TD',          statKey:'rushTD', points:6,    step:1 },
  { id:'passYd', label:'Passing yards',       statKey:'passYd', points:0.04, step:0.01 },
  { id:'passTD', label:'Passing TD',          statKey:'passTD', points:4,    step:1 },
  { id:'int',    label:'Interception thrown', statKey:'int',    points:-2,   step:1 },
];

const ROSTER_DEFAULT = () => ({ QB: 1, RB: 2, WR: 3, TE: 1, DST: 1, K: 1 });

// ---- state -------------------------------------------------------------

let POOL = [];

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

/** Market-derived base value.
 *
 *  The app's projection pipeline is not transcribed, so points come from the
 *  market's own p50 pick through a decay curve, plus the parts of scoring that
 *  actually differ between formats (receptions, passing volume) weighted by
 *  positional exposure. Labelled "Base (market)" in the UI: it is NOT the
 *  app's projection and is never presented as one. */
function baseValue(p) {
  if (p.p50 == null) return 0;
  const sc = Object.fromEntries(state.scoring.map(r => [r.statKey, r.points]));
  const recWeight  = { WR: 5.5, RB: 3.0, TE: 5.0, QB: 0, DST: 0, K: 0 }[p.pos] ?? 0;
  const passWeight = { QB: 1.0 }[p.pos] ?? 0;
  const decay = 300 * Math.exp(-p.p50 / 90);
  const recPts = recWeight * (sc.rec ?? 0) * 10;
  const passPts = passWeight * ((sc.passTD ?? 0) * 7 + (sc.passYd ?? 0) * 1000);
  const te = (p.pos === 'TE' && state.league?.tePremium) ? state.league.tePremium * 55 : 0;
  return Math.max(1, decay + recPts + passPts + te);
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
  const byBase = [...pool].sort((a, b) => baseValue(b) - baseValue(a) || a.id.localeCompare(b.id));
  const modelRank = new Map(byBase.map((p, i) => [p.id, i + 1]));
  const needs = positionNeeds();

  const envs = {};
  for (const pos of new Set(pool.map(p => p.pos))) {
    const known = pool.filter(p => p.pos === pos)
      .map(p => baseValue(p)).sort((a, b) => b - a)
      .map((points, i) => ({ rank: i + 1, points }));
    envs[pos] = G18.makeEnvelope(known);
  }

  const rows = pool.map(p => {
    const sig = {
      entityId: p.id,
      baseValue: baseValue(p),
      outcomeBand: p.band,
      marketPickRank: p.p50 == null ? null : Math.max(1, Math.round(p.p50)),
      modelRank: modelRank.get(p.id),
      leagueTeamCount: state.league?.teams ?? 12,
      ageAtSeasonStart: p.age,
      yearsExperience: null,
      positionNeed: needs[p.pos] ?? 0,
    };
    const pv = personalizedValue(sig, state.weights, envs[p.pos]);
    const qAdj = queueAdjustment(state.status[p.id] || 'NEUTRAL', state.pressure);
    return {
      p, base: sig.baseValue, dialDelta: pv.total - pv.baseValue,
      contributions: pv.contributions, queueAdj: qAdj, total: pv.total + qAdj,
    };
  });

  rows.sort((a, b) => b.total - a.total || a.p.id.localeCompare(b.p.id));

  // Attributes need board context: this row's rank, the best player left at
  // each position, and the on-the-clock team's top need.
  const bestAtPos = new Map();
  for (const r of rows) if (!bestAtPos.has(r.p.pos)) bestAtPos.set(r.p.pos, r.p.id);
  const topNeed = Object.entries(needs).sort((a, b) => b[1] - a[1])[0];
  rows.forEach((r, i) => {
    r.rank = i + 1;
    r.tag = modelTag(r, { rank: i + 1, bestAtPos, topNeed: topNeed && topNeed[1] > 0 ? topNeed[0] : null });
  });
  return rows;
}

// ---- attributes (ModelTag vocabulary) ----------------------------------
//
// The app's ModelTag.compute is an ORDERED rule list whose first two rules
// (Priority, Wait) need a survival-to-next-pick curve and a market decision
// that are not transcribed here. The rules below are the ones this build can
// actually satisfy, evaluated in the app's own order and using its own
// vocabulary; where the evidence is absent the tag simply does not fire,
// rather than being guessed.
function modelTag(r, ctx) {
  const p = r.p;
  const band = p.band ? (p.band.p90 - p.band.p10) : null;
  const mkt = p.p50;

  // Fit — this position is the on-the-clock team's top need AND this player
  // is the best available there.
  if (ctx.topNeed && p.pos === ctx.topNeed && ctx.bestAtPos.get(p.pos) === p.id) return 'Fit';
  // Elite — top of the board outright.
  if (ctx.rank <= 5) return 'Elite';
  // Value / Overpriced — the model's own rank against the market's.
  if (mkt != null) {
    const gap = mkt - ctx.rank;               // + == model likes him better than market
    if (gap >= 12) return 'Value';
    if (gap <= -12) return 'Overpriced';
  }
  // Emerging — a rookie the market has not settled on.
  if (p.rookie) return 'Emerging';
  // Outcome-band shape.
  if (band != null) {
    if (band >= 60) return 'Volatile';
    if (band >= 40) return 'Risky';
    if (band <= 12) return 'Reliable';
    if (band <= 20) return 'Safe';
  }
  if (ctx.rank <= 24) return 'Strong';
  if (ctx.rank <= 60) return 'Solid';
  return 'Upside';
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
    state.leagues.push(draft);
    state.leagueId = draft.id;
    state.league = draft;
    state.scoring = DEFAULT_SCORING();
    state.scoring.find(r => r.statKey === 'rec').points =
      { PPR: 1, HALF: 0.5, STANDARD: 0, TE_PREMIUM: 1 }[draft.scoring] ?? 1;
    state.league.tePremium = draft.scoring === 'TE_PREMIUM' ? 0.5 : 0;
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

    tr.append(el('td', 'num', r.base.toFixed(1)));
    const dd = r.dialDelta;
    tr.append(el('td', `num delta ${dd > 0.005 ? 'up' : dd < -0.005 ? 'down' : 'flat'}`,
      Math.abs(dd) < 0.005 ? '—' : fmt(dd)));
    const qa = r.queueAdj;
    tr.append(el('td', `num delta ${qa > 0 ? 'up' : qa < 0 ? 'down' : 'flat'}`, qa === 0 ? '—' : fmt(qa)));
    tr.append(el('td', 'num tot', r.total.toFixed(1)));
    tr.append(el('td', 'num', p.p50 == null ? '—' : p.p50.toFixed(0)));

    // QUEUE / QUEUED — membership, exactly as the app's pill reads it:
    // tapping a queued player removes it.
    const tdQ = document.createElement('td');
    const qb = el('button', 'pill-q', st === 'NEUTRAL' ? 'QUEUE' : (st === 'AVOID' ? 'AVOID' : 'QUEUED'));
    qb.type = 'button'; qb.dataset.on = st;
    qb.title = G18.queueReason(st, state.pressure);
    qb.setAttribute('aria-label', `Queue preference for ${p.n}: ${st}`);
    qb.addEventListener('click', ev => {
      ev.stopPropagation();
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
    pill.addEventListener('click', ev => {
      ev.stopPropagation();
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
  document.getElementById('remaining').textContent =
    `${rows.length} shown · ${live().length} available`;
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
  const host = document.getElementById('tab-roster');
  host.textContent = '';
  const roster = state.league?.roster ?? ROSTER_DEFAULT();
  const mine = myPicks();

  host.append(el('p', 'section-label', 'Starters'));
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
  host.append(el('p', 'section-label', `Bench (${bench.length})`));
  if (!bench.length) host.append(el('p', 'hint', 'No bench players yet.'));
  for (const r of bench) {
    const row = el('div', 'qrow');
    row.append(el('span', `pos ${r.p.pos}`, r.p.pos));
    row.append(el('span', 'qn', r.p.n));
    row.append(el('span', 'qa', `#${r.pick}`));
    host.append(row);
  }

  host.append(el('p', 'section-label', 'Positional need'));
  for (const [pos, n] of Object.entries(positionNeeds())) {
    const row = el('div', 'prow');
    row.append(el('span', 'pk', pos));
    const bar = el('span', 'pbar'); const fill = el('i');
    fill.style.left = '0'; fill.style.width = (n * 100) + '%';
    bar.append(fill); row.append(bar, el('span', 'pv', n.toFixed(2)));
    host.append(row);
  }
  host.append(el('p', 'hint', 'Need feeds the positional-aggression dial: 1.00 is an entirely unfilled position, 0.00 a filled one.'));
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

function renderSettings() {
  const host = document.getElementById('tab-settings');
  host.textContent = '';
  const L = state.league;
  if (!L) return;
  host.append(el('p', 'section-label', L.name));
  host.append(numberField('Teams', L.teams, 1, 4, 20, v => { L.teams = Math.max(4, Math.min(20, v || 12)); save(); renderAll(); }));
  host.append(numberField('Your seat', L.slot, 1, 1, L.teams, v => { L.slot = Math.max(1, Math.min(L.teams, v || 1)); save(); renderAll(); }));
  host.append(numberField('Rounds', L.rounds, 1, 1, 30, v => { L.rounds = v || 15; save(); }));
  host.append(numberField('TE premium (pts / reception)', L.tePremium, 0.25, 0, 2, v => {
    L.tePremium = Math.max(0, v || 0); save(); renderBoard();
  }));

  host.append(el('p', 'section-label', 'Starting roster'));
  for (const pos of Object.keys(L.roster)) {
    host.append(numberField(pos, L.roster[pos], 1, 0, 6, v => {
      L.roster[pos] = Math.max(0, v || 0); save(); renderAll();
    }));
  }

  host.append(el('p', 'section-label', 'Danger zone'));
  const row = el('div', 'row');
  const reset = el('button', 'pill', 'Reset draft');
  reset.type = 'button';
  reset.addEventListener('click', () => { state.drafted = new Map(); state.pick = 1; save(); renderAll(); });
  const nuke = el('button', 'pill', 'Delete league');
  nuke.type = 'button';
  nuke.addEventListener('click', () => {
    if (!confirm('Delete this league and everything recorded in it?')) return;
    state.league = null; state.drafted = new Map(); state.pick = 1; state.status = {};
    save(); boot();
  });
  row.append(reset, nuke); host.append(row);
}

function renderScoring() {
  const host = document.getElementById('tab-scoring');
  host.textContent = '';
  host.append(el('p', 'section-label', 'Scoring rules'));
  host.append(el('p', 'hint', 'Reception and passing rules move the market-derived base, so a format change re-ranks the board.'));
  for (const rule of state.scoring) {
    host.append(numberField(rule.label, rule.points, rule.step, undefined, undefined, v => {
      rule.points = Number.isFinite(v) ? v : 0; save(); renderBoard();
    }));
  }
  host.append(el('p', 'section-label', 'Presets'));
  const row = el('div', 'row');
  for (const [name, rec] of [['Standard', 0], ['Half PPR', 0.5], ['Full PPR', 1]]) {
    const b = el('button', 'pill', name); b.type = 'button';
    b.addEventListener('click', () => {
      state.scoring.find(r => r.statKey === 'rec').points = rec;
      save(); renderScoring(); renderBoard();
    });
    row.append(b);
  }
  host.append(row);
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

function renderClock() {
  const { round, seat, mine } = onClock();
  const c = document.getElementById('clock');
  c.textContent = '';
  c.append(document.createTextNode(`Pick `), el('b', null, String(state.pick)),
    document.createTextNode(`  ·  R${round}  ·  Seat ${seat}${mine ? ' (you)' : ''}`));
}

function renderAll() {
  renderLeagueMenu(); renderClock(); renderBoard(); renderQueue(); renderRoster(); renderSettings(); renderPlayer();
}

function renderFilters() {
  const host = document.getElementById('filters');
  host.textContent = '';
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
  renderFilters();
  renderPreferences();
  renderScoring();
  renderAll();
  for (const b of document.querySelectorAll('.tabs button')) b.onclick = () => selectTab(b.dataset.tab);
  selectTab(state.tab);
  document.getElementById('undo').onclick = () => {
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
    document.getElementById('poolmeta').textContent = `${POOL.length} players · season ${d.season}`;
  } catch {
    document.getElementById('poolmeta').textContent = 'player pool failed to load';
    return;
  }
  boot();
}

document.addEventListener('DOMContentLoaded', init);
