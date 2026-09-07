// PAGE 45 — scenario. The canonical "run at a position" page, written from the
// running-back side. Deliberately the most general treatment of runs on the
// site; the superflex page (44) handles the format-specific case.
export default {
  slug: 'scenarios/five-running-backs-go-in-a-row',
  pageType: 'scenario',
  title: 'Five Running Backs Just Went in a Row | GREEN18',
  description: 'A run cleared the running backs off the board. How to work out whether the position actually got scarcer, or whether the room simply moved together.',
  breadcrumb: 'Five Running Backs in a Row',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Five Running Backs Just Went in a Row. What Now?',
    lede: [
      'The board emptied at one position while you watched, and your pick is next.',
      'The useful question is not whether to panic. It is whether the run took quality with it, or only names.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A run at one position raises the value of the remaining players at that position only if the replacement quality behind them is falling faster than at the positions you could take instead. When five running backs are drafted in a row, the question is not whether to panic — it is whether the sixth-best remaining running back is closer to the fifth than your best available alternative is to its replacement. If the run passed through a flat stretch of the board, the players behind it are worth what they were worth before, and the correct response is to take the position the room just stopped drafting. If the run emptied a tier, the drop behind the next running back is now real, and the position has genuinely become urgent.',

  claims: [
    'A positional run raises remaining player value only when it removes a tier, because value is measured against the replacement rather than against the players already drafted.',
    'The correct response to a run depends on the shape of the board behind it, not on the number of consecutive picks that produced it.',
    'Consecutive picks at one position frequently reflect managers imitating each other rather than independent reads of remaining supply.',
    'A run that empties a tier makes every position outside that tier cheaper, because the managers who just drafted are no longer competing for those players.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Just Changed?', body: [
      '**Replacement level at running back moved down by exactly the quality of the five players taken — no more.** If those five were separated from the sixth by a small margin, your replacement barely moved.',
      '**Demand at every other position fell.** Five teams just filled a running-back slot. Those teams are now less likely to compete with you for receivers, tight ends or quarterbacks in the coming picks.',
      '**Your pick horizon changed asymmetrically.** The picks between you and your next turn are now more likely to be spent on the positions the run skipped, and less likely to be spent on running backs.',
      '**Your roster need did not change.** Whatever your lineup was missing before the run, it is missing now.',
    ], quote: 'Five names left the board. Ask what left with them.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is "running backs are going, so I need one." That reasoning uses the picks that already happened as evidence about the picks still to come, which is exactly backwards: a pick that has occurred is spent demand, not future demand.',
      'The five managers who just drafted running backs have, in most formats, largely satisfied their need at that position. Their next picks will be somewhere else. So a run can simultaneously make the position **thinner** and make the competition for it **weaker**, and those two effects work in opposite directions.',
      'A second wrong inference is that the run makes the whole remaining pool more valuable. Scarcity is local. A run near the top of a position steepens the board immediately behind it and leaves the deep part of the pool almost untouched, because the players down there always had abundant replacements.',
      'A third is that being the sixth manager to draft a running back is inherently a reach. It is a reach only if the drop behind the player you take is shallower than the drop behind your alternative. That is a measurement, not a mood.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Look behind the run, not at it.', body: ['Find the best running back still available, then find the running back you would expect to be there at your next turn. The distance between those two is the only running-back number that matters.'] },
      { h3: 'Measure the same distance at your best alternative.', body: ['Take the strongest player available at another position you still need and compare him with his own likely replacement. Now you have two comparable quantities.'] },
      { h3: 'Ask who is still hungry.', body: ['Count how many teams pick before you again and how many of them have already filled the position the run just drained. Spent demand does not compete with you.'] },
      { h3: 'Check the tier boundary.', body: ['If the next running back sits at the bottom of a tier and the players below him are noticeably different, waiting is expensive. If the tier continues, waiting is nearly free.'] },
      { h3: 'Price your roster need.', body: ['A position you must eventually fill costs more to defer than a position you could fill from depth. Structural need is a real input, not a tiebreaker.'] },
      { h3: 'Take the steeper drop, and say why.', body: ['Whichever comparison produced the larger gap is the pick. If the two are close, take the one that keeps more of your roster flexible.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Scoring.** Formats that reward receptions flatten the distinction between running backs and receivers, which usually makes running-back runs less threatening.',
      '**Starting requirements.** A league that starts more running-back-eligible slots consumes the position faster, so a run there is more likely to have taken real quality.',
      '**League size.** A deeper league exhausts tiers sooner and makes replacement quality fall faster everywhere, which raises the cost of ignoring any run.',
      '**Distance to your next pick.** From the turn, you can often let a run pass and take two of whatever survives. From the middle of the round, a long wait can turn a shallow drop into a deep one.',
      '**Your existing roster.** If you already hold the running backs the format requires, a run at that position is a gift: it removes competition for everything else.',
    ], after: [
      'The underlying mechanics are covered in [replacement value](/draft-science/replacement-value) and [tier collapse](/draft-science/player-tier-collapse).',
    ]},

    { type: 'convert', h2: 'Runs Are Loud. Replacement Level Is Not.',
      body: ['GREEN18 recomputes the remaining board after every pick, so the gap behind each available player — and the gap behind his alternative — is on screen while the run is still happening.', '**Download GREEN18 for iPhone and answer the question the run actually asked.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What should you do when five running backs are drafted in a row?', a: 'Compare the gap between the best remaining running back and the one likely to survive until your next pick with the same gap at your best alternative position. Whichever gap is larger identifies the position under genuine pressure. A run that passed through a flat stretch of the board has removed names without removing quality.' },
    { q: 'Does a run at one position make that position more valuable?', a: 'Only if the run removed a tier. Player value in a draft is measured against the quality of the likely replacement, so drafted players matter only through the effect they had on what remains. A run through a region where many similar players are available leaves remaining value roughly unchanged.' },
    { q: 'Why can a positional run make other positions cheaper?', a: 'Because the managers who drafted during the run have spent their need at that position and will look elsewhere next. A run simultaneously thins one position and removes competitors for the others, and those two effects push the decision in opposite directions.' },
    { q: 'Is it a reach to be the sixth manager to take a running back?', a: 'Not inherently. A pick is a reach only when the quality drop behind the selected player is shallower than the drop behind the player who was passed over. That is a comparison between two measurable gaps rather than a judgement about draft-order convention.' },
  ],

  links: [
    'draft-science/replacement-value',
    'draft-science/player-tier-collapse',
    'scenarios/last-player-in-a-tier',
    'fantasy-football-positional-scarcity',
    'live-fantasy-football-draft-assistant',
  ],
};
