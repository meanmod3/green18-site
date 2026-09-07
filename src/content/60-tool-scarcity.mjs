export default {
  slug: 'tools/scarcity-calculator',
  pageType: 'tool',
  title: 'Positional Scarcity Calculator | GREEN18',
  description: 'Estimate whether a position is scarce enough to take now, from your league size, starting slots, players already drafted, and the gap to your next pick.',
  breadcrumb: 'Scarcity Calculator',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'Positional Scarcity Calculator',
    lede: [
      'Scarcity is not a property a position owns. It is a rate — how fast the quality behind a player is falling, measured against how long you have to wait.',
      'This calculator turns that into an estimate you can act on while you are on the clock.',
    ],
    cta: 'Download GREEN18',
    micro: 'GREEN18 does this continuously, for every available player.',
  },

  answer: 'A position is scarce for you when the number of starting slots still unfilled across your league is large relative to the players who can fill them, and enough picks separate you from your next turn for those slots to be filled before you choose again. Scarcity is therefore a function of four things — league size, starting slots per team, players already drafted at the position, and the distance to your next pick — not a fixed property of the position itself.',

  claims: [
    'Positional scarcity is a rate of decline measured across positions, not a permanent property that one position owns.',
    'The distance to a manager’s next selection is part of the scarcity calculation, because a position cannot become scarce to you in picks that never happen.',
    'A position with many unfilled starting slots across a league will keep being drafted regardless of how good the remaining players are, because starting requirements do not care about quality.',
    'Two managers in the same draft can face genuinely different scarcity at the same position if their next picks are different distances away.',
  ],

  blocks: [
    { type: 'calculator', id: 'calc', calc: 'scarcity',
      h2: 'Estimate scarcity at a position',
      sub: 'Set your league and the position you are weighing. The result updates as you type, and the URL captures your inputs so you can share the exact case.',
      fields: [
        { name: 'teams', label: 'Teams in your league', value: 12, min: 4, max: 20 },
        { name: 'starters', label: 'Starting slots per team at this position', value: 2, min: 1, max: 4 },
        { name: 'gone', label: 'Players already drafted at this position', value: 8, min: 0, max: 80 },
        { name: 'pick', label: 'Your current overall pick number', value: 18, min: 1, max: 300 },
      ],
      hint: 'Snake draft. The gap to your next pick is derived from your league size and pick number.',
      resultLabel: 'Result',
      defaultVerdict: 'Scarcity: HIGH',
      defaultExplanation: 'There are 7 picks before your next turn, and roughly 16 starting slots still unfilled across the league. Expect meaningful movement at this position before you choose again, so the cost of waiting is the difference between the player available now and a materially worse replacement.',
      note: 'This is an estimate of structural demand, not a projection of any individual manager’s behaviour. It assumes a snake draft and treats every team’s starting requirement as equal, which is true of most leagues and false of some.' },

    { type: 'prose', h2: 'How the estimate works',
      body: [
        'The calculation is deliberately simple, so you can check it.',
        'League-wide demand at a position is the number of teams multiplied by the starting slots each team must fill. Subtract the players already drafted, and what remains is the demand still outstanding.',
        'Your exposure is the number of picks between now and your next turn, which in a snake draft depends on your slot and whether the round runs forward or back.',
        'Scarcity is high when outstanding demand is large **and** your exposure is long. Either one alone is not enough — a position can be thin and still safe to wait on if you pick again in two selections.',
      ] },

    { type: 'prose', h2: 'What this does not tell you',
      body: [
        'It does not tell you the position is worth taking.',
        'Scarcity is one input. The decision also depends on how much better the player in front of you is than the replacement you would accept later, and on what you give up elsewhere by spending the pick here.',
        'A scarce position full of players who are barely distinguishable from each other is not urgent. Urgency comes from a **gap**, not from a shortage.',
        'Read [replacement value](/draft-science/replacement-value) for the other half of the decision.',
      ] },

    { type: 'convert', h2: 'The app does this for every player, continuously.',
      body: [
        'This calculator answers the question once, for one position, from numbers you type.',
        'GREEN18 answers it after every pick, for every available player, using your league’s real settings and the picks you have actually recorded.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'What makes a position scarce in fantasy football?', a: 'A position is scarce when the quality of the players available at it is declining faster than at the positions you could draft instead, and when enough selections will occur before your next turn for that decline to reach you. Scarcity depends on league size, starting requirements, how many players at the position are already gone, and how long you must wait to pick again.' },
    { q: 'Does league size change positional scarcity?', a: 'Yes. League size sets total starting demand at every position, and it also sets how many picks pass between your turns. A twelve-team league creates more demand and longer waits than an eight-team league, so the same position can be scarce in one and comfortable in the other.' },
    { q: 'Is a scarce position always worth drafting early?', a: 'No. Scarcity establishes that quality is disappearing, not that the disappearing quality is worth paying for. If the remaining players at a scarce position are close to identical, waiting costs little even though supply is short.' },
  ],

  links: ['draft-science/positional-scarcity', 'draft-science/replacement-value', 'tools/pick-horizon-calculator', 'fantasy-football-positional-scarcity', 'fantasy-football-draft-assistant'],
};
