/* GREEN18 model console.
 *
 * Every constant, label and formula below is transcribed from the iOS app, not
 * invented for the web:
 *   - the five philosophy cards  -> Sources/Green18App/Onboarding/PreferenceSteps.swift
 *   - the five preference dials  -> the same file's makePreferenceWeightAxisSpecs()
 *   - PreferenceWeights clamping -> Sources/DraftEngine/Personalization/PreferenceWeights.swift
 *   - queue strengths + math     -> Sources/DraftEngine/User/QueuePreferenceMapping.swift
 *   - the ±2.5 / ±6.0 bounds     -> Sources/DraftEngine/Contracts/DraftModelArtifact.swift
 *
 * Where the app derives weights from the philosophy answers it does so in
 * PhilosophyDerivation.swift, which this page does NOT reproduce: that mapping
 * is engine internals, and guessing at it would put a number on screen the app
 * would not produce. The two columns are therefore shown as what they are —
 * independently editable inputs — and the derived column is left to the app.
 */

'use strict';

// ---- constants transcribed from the engine -----------------------------

const BOUNDS = { queue: 2.5, total: 6.0 };   // EngineeringDefaultBounds

const PHILOSOPHY_CARDS = [
  {
    id: 'risk', title: 'Risk',
    prompt: 'When two players are close, what should break the tie?',
    low: 'Stability', high: 'Ceiling',
    verdict: v => v < -0.33 ? 'You lean toward the safer, more available player.'
      : v > 0.33 ? 'You lean toward the higher-ceiling, higher-variance player.'
      : 'Balanced — stability and ceiling weigh about equally.',
  },
  {
    id: 'modelConviction', title: 'Model vs Market',
    prompt: 'How much do you trust the model over consensus ADP?',
    low: 'Stay near consensus', high: 'Trust the model',
    verdict: v => v < -0.33 ? 'You would rather stay close to market consensus.'
      : v > 0.33 ? 'You lean on the model where it disagrees with the market.'
      : 'Balanced — consensus and model conviction weigh about equally.',
  },
  {
    id: 'rosterAggression', title: 'Roster / Scarcity Aggression',
    prompt: 'How hard should an approaching tier cliff pull a pick forward?',
    low: 'Best player', high: 'Beat the cliff',
    verdict: v => v < -0.33 ? 'You lean toward taking the better player regardless of scarcity.'
      : v > 0.33 ? 'You lean toward reaching to beat an approaching tier cliff.'
      : 'Balanced — raw value and scarcity weigh about equally.',
  },
  {
    id: 'seasonHorizon', title: 'Season Horizon',
    prompt: 'How much should playoff-week schedule affect close decisions?',
    low: 'Season-long value', high: 'Playoff-week emphasis',
    verdict: v => v < -0.33 ? 'You weight season-long value over playoff-week schedule.'
      : v > 0.33 ? 'You give real weight to favorable playoff-week schedules.'
      : 'Balanced — season-long value and playoff timing weigh about equally.',
  },
  {
    id: 'benchConstruction', title: 'Bench Construction',
    prompt: 'Once starters are reasonably secure, what should the bench mainly do?',
    low: 'Protect starters', high: 'Chase breakouts',
    verdict: v => v < -0.33 ? 'Your bench mainly protects your starters.'
      : v > 0.33 ? 'Your bench mainly chases breakout upside.'
      : 'Balanced — protection and upside weigh about equally.',
  },
];

// signFlip mirrors the app: the model's positive youthVsVeterans is
// youth-leaning, while the dial reads Youth -> Veterans left to right.
const WEIGHT_AXES = [
  { id: 'riskTolerance',        title: 'Risk tolerance',          low: 'Play it safe',    high: 'Swing big' },
  { id: 'floorVsUpside',        title: 'Floor vs. upside',        low: 'Floor first',     high: 'Ceiling first' },
  { id: 'consensusVsContrarian',title: 'Consensus vs. contrarian',low: 'Trust consensus', high: 'Go contrarian' },
  { id: 'youthVsVeterans',      title: 'Youth vs. veterans',      low: 'Youth',           high: 'Veterans', signFlip: true },
  { id: 'positionalAggression', title: 'Positional aggression',   low: 'Balanced',        high: 'Attack needs' },
];

const QUEUE_STATUSES = ['FAVORITE', 'PREFER', 'NEUTRAL', 'AVOID'];

// ---- engine functions, transcribed ------------------------------------

/** PreferenceWeights.clampDial: non-finite -> 0, otherwise clamp to -1...1. */
function clampDial(raw) {
  if (!Number.isFinite(raw)) return 0;
  return Math.min(1, Math.max(-1, raw));
}

/** QueuePreferenceMapping.explicitPreferenceStrength */
function explicitPreferenceStrength(status) {
  switch (status) {
    case 'FAVORITE': return 1.0;
    case 'PREFER':   return 0.5;
    case 'NEUTRAL':  return 0.0;
    case 'AVOID':    return -1.0;
    default:         return 0.0;
  }
}

/** QueuePreferenceMapping.queueAdjustment */
function queueAdjustment(status, pressure) {
  if (status === 'NEUTRAL') return 0;
  const strength = explicitPreferenceStrength(status);
  const blend = pressure.hasEvidence ? (0.5 + 0.5 * pressure.magnitude) : 0.5;
  const bound = BOUNDS.queue;
  const raw = strength * blend * bound;
  return Math.min(bound, Math.max(-bound, raw));
}

/** QueuePreferenceMapping.reason */
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
    default:
      return '';
  }
}

// ---- state -------------------------------------------------------------

const state = {
  philosophy: Object.fromEntries(PHILOSOPHY_CARDS.map(c => [c.id, 0])),
  weights: Object.fromEntries(WEIGHT_AXES.map(a => [a.id, 0])),
  pressure: { magnitude: 0.0, hasEvidence: false },
  queue: [
    { name: 'Sample QB',  pos: 'QB',  status: 'FAVORITE' },
    { name: 'Sample RB',  pos: 'RB',  status: 'PREFER' },
    { name: 'Sample WR',  pos: 'WR',  status: 'NEUTRAL' },
    { name: 'Sample TE',  pos: 'TE',  status: 'AVOID' },
    { name: 'Sample DST', pos: 'DST', status: 'NEUTRAL' },
    { name: 'Sample K',   pos: 'K',   status: 'NEUTRAL' },
  ],
};

const fmt = n => (n >= 0 ? '+' : '') + n.toFixed(2);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

// ---- rendering ---------------------------------------------------------

function dialRow(spec, value, onInput, verdictText) {
  const wrap = el('div', 'dial');
  const head = el('div', 'head');
  head.append(el('span', 'title', spec.title));
  const val = el('span', 'val', fmt(value));
  head.append(val);
  wrap.append(head);
  if (spec.prompt) wrap.append(el('p', 'prompt', spec.prompt));

  const input = document.createElement('input');
  input.type = 'range';
  input.min = '-1'; input.max = '1'; input.step = '0.01';
  input.value = String(value);
  input.setAttribute('aria-label', `${spec.title}: ${spec.low} to ${spec.high}`);
  input.addEventListener('input', () => {
    const v = clampDial(parseFloat(input.value));
    val.textContent = fmt(v);
    onInput(v);
  });
  wrap.append(input);

  const ends = el('div', 'ends');
  ends.append(el('span', null, spec.low), el('span', null, spec.high));
  wrap.append(ends);

  if (verdictText) {
    const v = el('p', 'verdict', verdictText(value));
    wrap.append(v);
    wrap._verdict = v;
  }
  return wrap;
}

function renderPhilosophy() {
  const host = document.getElementById('philosophy');
  host.textContent = '';
  for (const card of PHILOSOPHY_CARDS) {
    const row = dialRow(card, state.philosophy[card.id], v => {
      state.philosophy[card.id] = v;
      row._verdict.textContent = card.verdict(v);
      renderReadout();
    }, card.verdict);
    host.append(row);
  }
}

function renderWeights() {
  const host = document.getElementById('weights');
  host.textContent = '';
  for (const axis of WEIGHT_AXES) {
    const row = dialRow(axis, state.weights[axis.id], v => {
      state.weights[axis.id] = v;
      renderReadout();
    });
    host.append(row);
  }
}

function renderQueue() {
  const tbody = document.getElementById('queue-body');
  tbody.textContent = '';
  for (const [i, entry] of state.queue.entries()) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    const badge = el('span', `pos ${entry.pos}`, entry.pos);
    tdName.append(badge, document.createTextNode(' ' + entry.name));
    tr.append(tdName);

    const tdSel = document.createElement('td');
    const sel = document.createElement('select');
    sel.setAttribute('aria-label', `Queue preference for ${entry.name}`);
    for (const s of QUEUE_STATUSES) {
      const o = document.createElement('option');
      o.value = s; o.textContent = s;
      if (s === entry.status) o.selected = true;
      sel.append(o);
    }
    sel.addEventListener('change', () => {
      state.queue[i].status = sel.value;
      renderQueue();
      renderReadout();
    });
    tdSel.append(sel);
    tr.append(tdSel);

    const strength = explicitPreferenceStrength(entry.status);
    tr.append(el('td', 'num', fmt(strength)));

    const adj = queueAdjustment(entry.status, state.pressure);
    const tdAdj = el('td', 'num ' + (adj > 0 ? 'up' : adj < 0 ? 'down' : 'flat'), fmt(adj));
    tr.append(tdAdj);

    tbody.append(tr);
  }
  renderReasons();
}

function renderReasons() {
  const host = document.getElementById('reasons');
  host.textContent = '';
  const seen = new Set();
  for (const entry of state.queue) {
    if (seen.has(entry.status)) continue;
    seen.add(entry.status);
    const adj = queueAdjustment(entry.status, state.pressure);
    const p = el('p', 'verdict', queueReason(entry.status, state.pressure));
    p.style.borderLeftColor = adj > 0 ? 'var(--accent)' : adj < 0 ? 'var(--danger)' : 'var(--divider)';
    host.append(p);
  }
}

function renderReadout() {
  const host = document.getElementById('readout');
  host.textContent = '';

  const dl = el('dl', 'kv');
  const rows = [
    ['Queue bound (±)', BOUNDS.queue.toFixed(2)],
    ['Personalization total bound (±)', BOUNDS.total.toFixed(2)],
    ['Pressure evidence', state.pressure.hasEvidence ? 'present' : 'absent'],
    ['Pressure magnitude', state.pressure.magnitude.toFixed(2)],
    ['Pressure blend', (state.pressure.hasEvidence ? 0.5 + 0.5 * state.pressure.magnitude : 0.5).toFixed(2)],
  ];
  for (const [k, v] of rows) { dl.append(el('dt', null, k), el('dd', null, v)); }
  host.append(dl);

  const bar = el('div', 'bound');
  const maxAdj = Math.max(...state.queue.map(q => Math.abs(queueAdjustment(q.status, state.pressure))), 0);
  const i = el('i');
  i.style.left = '50%';
  i.style.width = `${(maxAdj / BOUNDS.queue) * 50}%`;
  bar.append(i);
  host.append(el('p', 'note', 'Largest queue adjustment currently in play, against the ±2.5 bound:'), bar);

  const pre = el('pre', 'json', JSON.stringify({
    philosophyAnswers: state.philosophy,
    preferenceWeights: state.weights,
    availabilityPressure: state.pressure,
    queue: state.queue.map(q => ({
      player: q.name, position: q.pos, status: q.status,
      strength: explicitPreferenceStrength(q.status),
      queueAdjustment: Number(queueAdjustment(q.status, state.pressure).toFixed(4)),
    })),
  }, null, 2));
  host.append(pre);
}

// ---- wiring ------------------------------------------------------------

function init() {
  renderPhilosophy();
  renderWeights();
  renderQueue();
  renderReadout();

  const mag = document.getElementById('pressure-mag');
  const has = document.getElementById('pressure-has');
  const magVal = document.getElementById('pressure-mag-val');

  mag.addEventListener('input', () => {
    state.pressure.magnitude = Math.min(1, Math.max(0, parseFloat(mag.value)));
    magVal.textContent = state.pressure.magnitude.toFixed(2);
    renderQueue();
    renderReadout();
  });
  has.addEventListener('change', () => {
    state.pressure.hasEvidence = has.checked;
    renderQueue();
    renderReadout();
  });

  document.getElementById('reset').addEventListener('click', () => {
    for (const c of PHILOSOPHY_CARDS) state.philosophy[c.id] = 0;
    for (const a of WEIGHT_AXES) state.weights[a.id] = 0;
    state.pressure = { magnitude: 0, hasEvidence: false };
    mag.value = '0'; magVal.textContent = '0.00'; has.checked = false;
    renderPhilosophy(); renderWeights(); renderQueue(); renderReadout();
  });
}

document.addEventListener('DOMContentLoaded', init);
