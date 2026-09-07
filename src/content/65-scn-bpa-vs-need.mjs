// PAGE 65 — scenario. The BPA-vs-need reconciliation page. Answers one of the
// brief's own §1 target questions directly; the distinction is drawn as
// ranking-statement vs roster-statement, reconciled by margin over replacement.
export default {
  slug: 'scenarios/best-player-available-vs-roster-need',
  pageType: 'scenario',
  title: 'Best Player Available or Roster Need? | GREEN18',
  description: 'Best available describes a ranking; need describes your roster. What actually reconciles them is margin over replacement — and when the two genuinely conflict.',
  breadcrumb: 'Best Available vs Need',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Best Player Available, or the Position I Need?',
    lede: [
      'The highest-ranked player left plays a position you have already filled.',
      'The two ideas are not rivals. They are answers to different questions, and one quantity settles both.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Best player available and roster need are not competing strategies, because they are statements about different objects: "best available" is a claim about a ranking, while "need" is a claim about your roster. The quantity that reconciles them is margin over replacement — how much better a player is than the player who would fill the same slot if you passed. Ranking a player highly and needing his position are both only proxies for that margin. The two therefore conflict only in one specific case: when the higher-ranked player has a smaller margin over his own replacement than the lower-ranked player has over his. That happens when the higher-ranked player sits at a position with deep, similar alternatives, or when he duplicates a slot you have already filled so his true replacement is the player you already own. When the higher-ranked player also has the larger margin, there is no conflict to resolve and taking him is both the best-available pick and the need pick at once.',

  claims: [
    'Best player available is a statement about the ordering of a ranking, while roster need is a statement about the composition of a particular team.',
    'Margin over replacement reconciles ranking and need, because it measures how much a player improves the slot he would actually occupy.',
    'A ranking and a roster only genuinely conflict when the higher-ranked player has a smaller margin over his replacement than the lower-ranked player has over his.',
    'A player who duplicates a slot a manager has already filled is measured against the player already rostered, which lowers his margin without changing his rank.',
    'Positional need becomes decision-relevant precisely when the replacement quality behind a required slot is falling faster than elsewhere on the board.',
  ],

  blocks: [
    { type: 'prose', h2: 'What the Two Ideas Actually Claim.', body: [
      '**"Best available" is a property of a list.** It says a player is ordered above the others on some ranking. The ranking was produced without knowing your roster, your scoring, or the picks already spent.',
      '**"Need" is a property of a team.** It says a lineup slot is unfilled, or filled poorly. It says nothing about who is on the board.',
      '**Neither is a decision.** A decision requires comparing the improvement each candidate delivers, and improvement is always measured against the alternative you would otherwise use.',
      '**That alternative is the replacement.** For an empty slot it is the player likely available at your next turn. For a filled slot it is the player already on your roster, which is why a duplicate at a strong position often improves your lineup by very little.',
    ], quote: 'A ranking does not know your roster. Your roster does not know the board.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The common wrong inference is that "best player available" is the disciplined choice and "need" is the emotional one. Stated fairly, best-available discipline exists to stop managers reaching for a position out of anxiety, and it is a real corrective. But a ranking is only an estimate of margin over a **generic** replacement, and your replacement is not generic.',
      'The mirror mistake is treating need as a licence to reach. A slot being empty does not make the players who could fill it better. If the position is deep, an empty slot can be filled later at almost no cost, and the need is real but cheap.',
      'A third wrong inference is that need only refers to empty slots. A slot filled by a strong player is, for margin purposes, the hardest slot on your roster to improve — the bar you must clear is that player, not a waiver-level replacement.',
      'The fourth is assuming the two must be traded off at every pick. In most picks the higher-ranked player also has the larger margin, and the conflict is imaginary. The interesting case is narrow, and recognising that it is narrow is most of the skill.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Name the two candidates explicitly.', body: ['One is the highest-ranked player on the board. The other is the best player at a position your lineup still requires. Vague comparisons produce vague picks.'] },
      { h3: 'Identify each candidate’s real replacement.', body: ['For an empty slot, the replacement is who you expect to be available at that position at your next pick. For a filled slot, it is the player already occupying it.'] },
      { h3: 'Measure each margin.', body: ['Subtract each replacement from its candidate under your league’s scoring. You now hold two comparable numbers rather than a rank and a feeling.'] },
      { h3: 'Take the larger margin.', body: ['If the higher-ranked player also carries the larger margin, there is no conflict and the ranking was right. If not, the ranking was measuring somebody else’s roster.'] },
      { h3: 'Check the horizon before acting on a small difference.', body: ['If the margins are close, prefer the position whose replacement quality is falling faster before your next turn, because that gap will not still be available.'] },
      { h3: 'Recompute after every pick.', body: ['Each selection changes who your replacement would be, which changes both margins. A comparison made two rounds ago is describing a board that no longer exists.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Depth at the higher-ranked player’s position.** The deeper the position, the smaller his margin over replacement, and the more often the lower-ranked player wins the comparison.',
      '**Whether the slot is empty or filled.** A filled slot raises the bar the candidate must clear, so duplicating strength is worth less than the ranking implies.',
      '**Flex eligibility.** Formats with flexible starting slots let several positions compete for the same seat, which converts many apparent needs into a single, more forgiving one.',
      '**Roster size and bench depth.** Deep benches make late needs cheap to fill, which pushes decisions towards best available; shallow benches make an unfilled slot genuinely expensive.',
      '**Distance to your next pick.** A long wait makes the falling-replacement position more urgent, because the margin you can see now is the one most likely to disappear.',
      '**Scoring rules.** Scoring determines how much separation exists at each position, and therefore determines every margin in the comparison.',
    ], after: [
      'The underlying quantity is described in [replacement value](/draft-science/replacement-value), and the thing you give up is [opportunity cost](/draft-science/opportunity-cost).',
    ]},

    { type: 'convert', h2: 'One Quantity Settles Both Questions.',
      body: ['GREEN18 recalculates, after every pick, how thin each position has become under your league’s scoring — how fast quality is leaving it, how close the next tier cliff is, how much of it the room has already taken, and the chance each player survives to your next turn — so the ranking and your roster are read against one board.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is the difference between best player available and positional need?', a: 'Best player available is a statement about a ranking — that a player is ordered above the others on a list produced without knowledge of any particular roster. Positional need is a statement about a roster — that a lineup slot is unfilled or weakly filled. They are answers to different questions, and both are proxies for the same underlying quantity: how much a player improves the slot he would occupy.' },
    { q: 'When do best available and roster need genuinely conflict?', a: 'Only when the higher-ranked player has a smaller margin over his own replacement than the lower-ranked player has over his. That occurs when the higher-ranked player plays a deep position with similar alternatives behind him, or when he duplicates a slot already filled well, so the player he must beat is one already on the roster rather than a waiver-level substitute.' },
    { q: 'Is drafting for need always a mistake?', a: 'No. Need becomes decision-relevant when the replacement quality behind a required slot is falling faster than elsewhere on the board, because the improvement available at that slot is about to shrink. Need is a mistake only when it is used as a reason to ignore margin — an empty slot at a deep position can usually be filled later at very little cost.' },
    { q: 'Why is a duplicate at a strong position worth less than his rank suggests?', a: 'Because value is measured against the player who would otherwise occupy the slot. When a slot is already filled by a strong player, that player becomes the replacement, and the bar the new candidate must clear is much higher than the generic baseline a preseason ranking assumes.' },
  ],

  links: [
    'draft-science/replacement-value',
    'draft-science/opportunity-cost',
    'draft-science/roster-construction',
    'scenarios/choosing-between-two-similar-players',
    'fantasy-football-draft-assistant',
  ],
};
