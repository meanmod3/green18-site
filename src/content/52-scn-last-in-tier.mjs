// PAGE 52 — scenario. The tier-boundary page: the sharpest single decision in a
// draft. Careful to attack the tier as a construct as well as use it.
export default {
  slug: 'scenarios/last-player-in-a-tier',
  pageType: 'scenario',
  title: 'The Last Player in a Tier Is on the Board | GREEN18',
  description: 'A tier is about to close. How to check whether the boundary is real, whether it will survive to your next pick, and what a genuine boundary is worth.',
  breadcrumb: 'Last Player in a Tier',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'The Last Player in a Tier Is Still There. Do I Take Him?',
    lede: [
      'One name stands between you and a visibly worse group of players.',
      'Tier boundaries are the sharpest decisions in a draft — and also the easiest to imagine where none exists.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Taking the last player in a tier is correct when the drop below the boundary is larger than the drop you would accept elsewhere by making the pick, and when the player is unlikely to survive until your next selection. A tier is only a decision-relevant object if the gap at its lower edge is genuinely larger than the gaps inside it; groupings drawn for readability rather than for separation create boundaries that cost nothing to cross. The two questions are therefore independent and both must be answered: is this boundary real, and is it about to close? A real boundary that will survive to your next pick requires no action now, and an urgent boundary that is not real is not worth reaching for.',

  claims: [
    'A tier boundary is decision-relevant only when the quality gap at its lower edge exceeds the gaps between players inside the tier.',
    'The urgency of a tier boundary depends on whether the last player inside it is likely to survive until the manager’s next selection.',
    'Groupings drawn for readability rather than for measured separation produce boundaries that cost nothing to cross.',
    'Taking the last player in a tier is worthwhile only if the drop below that boundary exceeds the drop accepted at the position being passed over.',
  ],

  blocks: [
    { type: 'prose', h2: 'What a Tier Is, and What It Is Not.', body: [
      'A tier is a claim that the players inside it are close enough to be treated as interchangeable, and that the players below it are not.',
      'That makes a tier boundary the one place in a draft where waiting has a **discontinuous** cost. Inside a tier, waiting costs almost nothing, because your alternative is nearly identical. At the boundary, waiting costs the entire step.',
      'But the claim can be false. Tiers are drawn by people, and people draw them for legibility as much as for separation. A grouping of convenience has a lower edge that is no steeper than its interior, and crossing it costs nothing.',
      'So the same board can present two boundaries that look identical and are worth wildly different amounts. Distinguishing them is the whole job.',
    ], quote: 'A tier boundary is a place where waiting stops being cheap.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that being the last player in a tier is itself a reason to draft someone. Position within a grouping is a label; the gap beneath the grouping is the quantity. If the next player down is nearly as good, "last in the tier" describes nothing worth acting on.',
      'The second wrong inference is that a real boundary demands an immediate pick. Urgency comes from the probability that the player is taken before your next turn, and that depends on who is choosing and what they need. A real boundary in front of a room that does not need the position may still be there when you return.',
      'A third mistake is applying the tier to the wrong question. A tier tells you about the players at one position. The pick is a comparison across positions, and a boundary at one position only matters relative to the boundaries at the others.',
      'A fourth is refusing to redraw. Tiers built before the draft assume a scoring format and a distribution of demand; when the room drafts differently from expectation, the boundaries move and the old picture becomes actively misleading.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Test whether the boundary is real.', body: ['Compare the gap below the player with the typical gap between players inside the tier. If the two are similar, there is no boundary to defend.'] },
      { h3: 'Estimate survival to your next turn.', body: ['Count the teams choosing before you again and how many still need the position. No credible demand means no urgency, whatever the board looks like.'] },
      { h3: 'Find the boundary you would cross instead.', body: ['Every pick forfeits something. Locate the tier edge at the position you would otherwise take and ask whether it closes before you return.'] },
      { h3: 'Compare the two drops.', body: ['The decision is the larger discontinuity, not the more visible one. Both must be measured on the same board.'] },
      { h3: 'Check the tier against the actual scoring.', body: ['A boundary derived under one scoring format can vanish under another, so confirm the separation exists in your league’s rules rather than in a generic list.'] },
      { h3: 'Redraw after every pick.', body: ['Tiers shrink as the draft consumes them, and a boundary two picks away can become the boundary in front of you without warning.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Scoring.** Scoring rules determine how much separation exists between players, so they determine where boundaries fall and how steep they are.',
      '**League size.** Deeper leagues exhaust tiers faster, which raises the probability that any given boundary closes before your next pick.',
      '**Starting requirements.** A format that starts more of a position increases the demand pressing on every boundary at that position.',
      '**Your roster.** A boundary at a position you have already filled is somebody else’s problem; a boundary at an empty position is worth more than the raw gap suggests.',
      '**Distance to your next pick.** Boundary decisions are almost entirely a function of the horizon, because a short wait makes even a real boundary safe to test.',
    ], after: [
      'The mechanism is described in [tier collapse](/draft-science/player-tier-collapse), and the value it creates is [positional scarcity](/draft-science/positional-scarcity).',
    ]},

    { type: 'convert', h2: 'Real Boundaries Are Worth a Lot. Imagined Ones Cost You.',
      body: ['GREEN18 recomputes the separation between remaining players under your league’s scoring after every pick, so a boundary is something you can see rather than something you have to trust.', '**Download GREEN18 for iPhone and cross the cheap boundaries on purpose.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Should you draft the last player in a tier?', a: 'Take him when the quality drop below the tier is larger than the drop accepted at the position being passed over, and when he is unlikely to survive until your next selection. Both conditions matter independently: a real boundary that will still be open later requires no action, and an urgent grouping with no real gap beneath it is not worth reaching for.' },
    { q: 'How can you tell whether a tier boundary is real?', a: 'Compare the gap below the last player in the tier with the typical gap between players inside it. A boundary is decision-relevant only when the lower edge is meaningfully steeper than the interior; a grouping drawn for readability has a lower edge no steeper than its own spacing.' },
    { q: 'Why do tier boundaries move during a draft?', a: 'Because tiers are drawn against expected demand and a particular scoring format. When the room drafts differently from expectation, the groupings consume unevenly and the separations shift, which makes a set of tiers fixed before the draft progressively less accurate as the draft proceeds.' },
    { q: 'Does a tier tell you which position to draft?', a: 'No. A tier describes the distribution of quality at one position, while a pick is a comparison across positions. A boundary becomes actionable only when it is measured against the boundaries at the other positions a manager could take instead.' },
  ],

  links: [
    'draft-science/player-tier-collapse',
    'draft-science/positional-scarcity',
    'scenarios/five-running-backs-go-in-a-row',
    'fantasy-football-cheat-sheet-app',
    'why-fantasy-rankings-change-during-a-draft',
  ],
};
