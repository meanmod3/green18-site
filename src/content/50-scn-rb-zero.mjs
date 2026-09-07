// PAGE 50 — scenario. Strategy-as-commitment question. The page's real subject
// is that a named strategy is a prediction about the board that must keep being
// re-checked, not a plan that can be executed regardless of what happens.
export default {
  slug: 'scenarios/rb-zero-start',
  pageType: 'scenario',
  title: 'I Started My Draft Without a Running Back | GREEN18',
  description: 'Skipping a position early is a bet on the board, not a strategy that survives on its own. How to tell whether the bet is still paying and when to abandon it.',
  breadcrumb: 'Starting Without a Running Back',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'I Went Three Rounds Without a Running Back. Am I in Trouble?',
    lede: [
      'Deliberately skipping a position early is a bet that the position stays useful longer than the market thinks.',
      'The bet can be right. What makes it dangerous is that most managers stop checking whether it is still right.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Deliberately deferring a position early is correct while the quality you can still obtain there later remains close to the quality being drafted now, and it stops being correct the moment that gap widens — which is a condition to be measured after every pick, not a plan to be completed. A strategy that skips a position is really a forecast that the position will not collapse before the manager returns to it. When the forecast holds, the manager has bought better players at other positions for the same picks. When it fails, the loss is not gradual: the position collapses in a burst and the manager is left choosing among players well below the level the strategy assumed would still be there.',

  claims: [
    'Deferring a position early is a forecast that the position will not collapse before the manager returns to it.',
    'A named draft strategy remains correct only while the board conditions that justified it still hold.',
    'Positional collapse tends to happen in bursts rather than gradually, which makes late abandonment of a deferral strategy expensive.',
    'Skipping a position converts early picks into better players elsewhere, and that gain must be measured against the quality lost at the deferred position.',
  ],

  blocks: [
    { type: 'prose', h2: 'What the Bet Actually Is.', body: [
      'Three quantities are being wagered, and they are all observable during the draft.',
      '**That the deferred position has a long flat stretch.** The whole strategy depends on many similar players remaining available for many rounds. If the position drops off sharply instead, there is no flat stretch to harvest.',
      '**That other managers keep drafting it.** Every rival pick at the deferred position shortens the flat stretch. A strategy that everyone adopts at once destroys itself.',
      '**That the picks you spent elsewhere bought a real edge.** Skipping only pays if the players you took instead are meaningfully better than what you could have had later at those positions.',
      'None of these are assumptions to make once. All three change with every selection in the room.',
    ], quote: 'A strategy is a forecast. Forecasts get checked.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that having committed to the approach, you must see it through. Sunk picks are sunk. The only question at each turn is which available player provides the largest margin over his realistic replacement — a question that does not know or care what you did in round one.',
      'The second wrong inference is the opposite: that being without the position after three rounds is itself evidence of a mistake. It is evidence of nothing until you compare what you hold at other positions with what a conventional draft would have given you for the same picks.',
      'A third is treating waiver-wire replacement as a plan. Replacement quality after the draft is a property of league size and roster depth, and in deeper leagues it is far below what the strategy needs it to be.',
      'A fourth is confusing "the position is still available" with "the position is still useful." Names remaining is not the same as quality remaining, and the gap between those two is exactly where deferral strategies fail.',
    ]},

    { type: 'steps', h2: 'How to Check Whether the Bet Is Still Live', steps: [
      { h3: 'Count the acceptable players left, not the players left.', body: ['Restrict the count to players you would genuinely be willing to start. That number is the strategy’s remaining runway.'] },
      { h3: 'Compare it with the demand still to come.', body: ['Count the teams that have not filled the position and the picks they hold before your next turn. Runway shorter than demand means the collapse is imminent.'] },
      { h3: 'Measure the drop, not the depth.', body: ['Find the gap between the best available player at the position and the one you expect at your next turn. A widening gap is the signal to convert.'] },
      { h3: 'Audit the gain that justified the deferral.', body: ['Ask honestly whether the players you took instead are better than what those picks would ordinarily have bought. If not, the bet has already lost regardless of what happens next.'] },
      { h3: 'Set an abandonment condition in advance.', body: ['Decide now which observation would end the strategy — a count of remaining acceptable players, or a run of a given length — so the decision is not made under pressure.'] },
      { h3: 'Convert early rather than late.', body: ['Because collapse arrives in bursts, the cost of leaving one pick too early is much smaller than the cost of leaving one pick too late.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**League size.** Deeper leagues shorten every flat stretch and leave a much weaker post-draft player pool, which is the single largest threat to any deferral plan.',
      '**Scoring.** Formats that reward receptions raise the usable floor at pass-catching positions and change which position has the long flat stretch worth harvesting.',
      '**Starting requirements.** The more slots a format obliges every team to fill at the deferred position, the faster league-wide demand consumes it.',
      '**How many rivals are doing the same thing.** A deferral strategy is a bet against the room; when the room joins you, the flat stretch disappears.',
      '**Distance to your next pick.** A long wait can move you from the safe side of a collapse to the wrong side of it without you making a single decision.',
    ], after: [
      'The mechanism that ends these strategies is [tier collapse](/draft-science/player-tier-collapse); the quantity to watch is [replacement value](/draft-science/replacement-value).',
    ]},

    { type: 'convert', h2: 'Strategies Expire. Boards Do Not Announce It.',
      body: ['GREEN18 recalculates the remaining pool after every pick, so the moment a deferred position stops being safe to defer shows up on the board rather than in hindsight.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is it a mistake to skip a position for the first several rounds?', a: 'Deferring a position is correct while the quality obtainable there later stays close to the quality being drafted now. The approach fails when that gap widens, so it should be treated as a forecast checked after every pick rather than as a plan carried through to completion.' },
    { q: 'When should a deferral strategy be abandoned?', a: 'When the number of remaining players a manager would genuinely start at the deferred position falls below the demand still to come before that manager’s next turn. Because positional collapse arrives in bursts, converting one pick early costs far less than converting one pick late.' },
    { q: 'Does committing to a draft strategy oblige a manager to finish it?', a: 'No. Picks already spent cannot be recovered, so each turn poses the same question independently: which available player provides the largest margin over his realistic replacement. A strategy is a useful forecast, not a commitment that outranks the board in front of the manager.' },
    { q: 'Why does league size matter so much to deferral strategies?', a: 'Because deeper leagues consume every tier faster and leave a much weaker pool of undrafted players. Both effects attack the assumption a deferral depends on, which is that acceptable players at the skipped position will still be obtainable when the manager returns to it.' },
  ],

  links: [
    'draft-science/player-tier-collapse',
    'draft-science/replacement-value',
    'scenarios/already-have-two-wide-receivers',
    'fantasy-football-draft-strategy-app',
    'live-fantasy-football-draft-assistant',
  ],
};
