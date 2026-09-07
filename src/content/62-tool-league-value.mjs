export default {
  slug: 'tools/league-value-calculator',
  pageType: 'tool',
  title: 'Replacement Level Calculator by League Size | GREEN18',
  description: 'Find the replacement baseline at any position for your league size and starting lineup, and see why that line decides what a player is actually worth.',
  breadcrumb: 'League Value Calculator',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'Replacement Level Calculator',
    lede: [
      'A player is not worth his projection. He is worth the difference between his projection and the player you could have had instead.',
      'That second player is the replacement baseline, and your league settings decide exactly where it sits.',
    ],
    cta: 'Download GREEN18',
    micro: 'GREEN18 computes this from your real league settings.',
  },

  answer: 'The replacement baseline at a position is roughly the last player guaranteed a starting job across the league: the number of teams multiplied by the starting slots each team must fill at that position. A player’s draft value is the margin by which he beats that baseline, not his raw projected total, which is why the same player is worth more in a league whose baseline is weak than in one whose baseline is strong.',

  claims: [
    'The replacement baseline at a position is approximately the number of teams multiplied by the starting slots each team fills at that position.',
    'A player’s draft value is the margin by which he exceeds the replacement baseline at his position, not the size of his projected total.',
    'Flex slots push effective demand deeper than the base starting requirement, because flex-eligible players compete for the same slot across several positions.',
    'A position whose replacement baseline is nearly as productive as its best players offers little draft value, no matter how high those players project.',
  ],

  blocks: [
    { type: 'calculator', id: 'calc', calc: 'replacement',
      h2: 'Find your league’s replacement baseline',
      sub: 'Set the position’s starting requirement and how many flex slots could absorb it.',
      fields: [
        { name: 'teams', label: 'Teams in your league', value: 12, min: 4, max: 20 },
        { name: 'starters', label: 'Starting slots per team at this position', value: 2, min: 1, max: 4 },
        { name: 'flex', label: 'Flex slots per team this position can fill', value: 1, min: 0, max: 3 },
      ],
      hint: 'Set flex to 0 for a position no flex slot accepts, such as quarterback in most single-QB leagues.',
      resultLabel: 'Result',
      defaultVerdict: 'Replacement baseline: about the 30th player at the position',
      defaultExplanation: 'In a 12-team league starting 2 players at this position, roughly the 24th-best player at the position is the last one guaranteed a starting job. Flex slots push real demand deeper — call it around 30 — because flex-eligible players compete across positions. Players drafted above that line are worth the gap between them and that baseline, not their raw projection.',
      note: 'A structural estimate from starting requirements. Real leagues vary: bench depth, bye-week hoarding and how aggressively your particular league drafts a position all move the practical line.' },

    { type: 'prose', h2: 'Why the baseline decides value',
      body: [
        'Only starters score. A player on your bench contributes nothing to a given week.',
        'So the question a draft pick actually answers is not "how good is this player" but "how much better is he than the player who would otherwise occupy that slot".',
        'That comparison player is the replacement baseline, and it sits at a different depth for every position, because every position has a different starting requirement.',
        'This is why a quarterback projected for more total points than a running back can still be the worse pick: the quarterback you could get later may be much closer to him than the running back you could get later is to his.',
      ] },

    { type: 'prose', h2: 'What moves the line',
      body: [
        'League size moves it directly — more teams, deeper baseline, more valuable everyone above it.',
        'Starting requirements move it. A league starting three receivers has a much deeper receiver baseline than one starting two.',
        'Flex slots blur it, because a flex-eligible player is competing for a slot several positions could fill.',
        '[Superflex](/formats/superflex) is the most dramatic case: it can nearly double the quarterback requirement without doubling the supply of viable ones.',
      ] },

    { type: 'convert', h2: 'Your real settings, not a generic assumption.',
      body: [
        'This calculator takes a rough structural estimate from numbers you type.',
        'GREEN18 starts from the league you actually configured — every scoring rule and every roster slot — and prices each player against the baseline that produces.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'What is replacement level in fantasy football?', a: 'Replacement level is the production you could expect from the best player at a position who is still freely available once every starting slot in the league is filled. A drafted player is worth the amount by which he exceeds that level, because that margin is what he adds over the alternative you would otherwise have used.' },
    { q: 'How does league size change player value?', a: 'League size sets how many players at each position are needed as starters, which sets the depth of the replacement baseline. In a larger league the baseline is deeper and weaker, so every player above it is worth more; in a smaller league the baseline is stronger and the same players are worth less.' },
    { q: 'Why can a higher-projected player be the worse pick?', a: 'Because value is measured against the replacement baseline at that player’s own position. If the player available later at his position is nearly as productive, his high projection converts into a small advantage, while a lower-projected player at a position with a weak baseline can deliver a larger one.' },
  ],

  links: ['draft-science/replacement-value', 'draft-science/roster-construction', 'scenarios/already-have-two-wide-receivers', 'formats/superflex', 'fantasy-football-draft-assistant'],
};
