export default {
  slug: 'tools/ppr-value-adjustment-calculator',
  pageType: 'tool',
  title: 'PPR Value Adjustment Calculator | GREEN18',
  description: 'See how many points a scoring format’s reception rule adds to a player’s season, and why that changes the order of your board rather than just the numbers.',
  breadcrumb: 'PPR Value Calculator',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'PPR Value Adjustment Calculator',
    lede: [
      'A reception rule does not lift every pass-catcher equally. It re-sorts them.',
      'See how much a scoring setting separates two otherwise comparable players.',
    ],
    cta: 'Download GREEN18',
    micro: 'GREEN18 applies your league’s exact scoring.',
  },

  answer: 'A points-per-reception rule adds points in direct proportion to catch volume, so it separates players who are otherwise comparable in yardage and touchdowns. Because the adjustment is proportional rather than uniform, it changes which players clear the replacement baseline at their position, which reorders the board instead of simply inflating every score on it.',

  claims: [
    'A reception scoring rule adds points in proportion to catch volume, so it separates high-volume and low-volume players who are otherwise comparable.',
    'Reception scoring changes which players clear the replacement baseline at their position, which reorders a draft board rather than uniformly inflating it.',
    'A scoring format is a structural input to player valuation, because it determines how production converts into fantasy points before any ranking is formed.',
    'Two players with identical yardage and touchdown projections can have materially different value under reception scoring if their catch volumes differ.',
  ],

  blocks: [
    { type: 'calculator', id: 'calc', calc: 'ppr',
      h2: 'How much does the reception rule move a player?',
      sub: 'Compare two players whose difference is catch volume.',
      fields: [
        { name: 'perRec', label: 'Points per reception', value: 1,
          options: [{ value: '1', label: 'Full PPR (1.0)' }, { value: '0.5', label: 'Half PPR (0.5)' }, { value: '0', label: 'Standard (0)' }] },
        { name: 'rec', label: 'Player A — projected receptions', value: 95, min: 0, max: 200 },
        { name: 'comp', label: 'Player B — projected receptions', value: 45, min: 0, max: 200 },
      ],
      hint: 'Enter season-long reception projections. The rest of each player’s scoring is assumed comparable.',
      resultLabel: 'Result',
      defaultVerdict: '95 points from receptions',
      defaultExplanation: 'At 1 points per reception, 95 catches are worth 95 points across the season. A comparable player catching 45 is worth 45. The reception rule alone separates them by 50 points, in favour of the higher-volume player. That is why a scoring setting is not a cosmetic detail: it changes which players clear the replacement baseline at their position, and therefore changes the order of the board rather than just the size of the numbers on it.',
      note: 'Isolates the reception rule only. It assumes the two players are otherwise comparable, which is a simplification made deliberately so the effect of the setting is visible on its own.' },

    { type: 'prose', h2: 'Why this reorders rather than inflates',
      body: [
        'If a scoring rule added the same amount to everyone, it would change nothing. Ranks would be identical and only the totals would grow.',
        'Reception scoring is not uniform. It rewards a specific kind of production, so it moves some players a lot and others barely at all.',
        'That differential is the whole effect. It pushes catch-heavy players past players who were previously ahead of them, and it narrows or widens the gap to the replacement baseline at each position by different amounts.',
        'Which is why "is this a PPR league" is a structural question, not a detail to note and move on from.',
      ] },

    { type: 'prose', h2: 'Standard scoring is not simply PPR minus a rule',
      body: [
        'Removing the reception bonus does not just lower everyone’s totals.',
        'It concentrates value in production that does not depend on catch volume — bulk yardage and touchdowns — which changes which positions carry the widest gaps over their baselines.',
        'Read [standard scoring](/formats/standard) and [PPR](/formats/ppr) for what each format does to the shape of the board.',
      ] },

    { type: 'convert', h2: 'Your scoring, not a default.',
      body: [
        'Most rankings you can find were built for one assumed format.',
        'GREEN18 starts from the scoring rules you configured, so the board you draft from is the one your league actually plays.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'What does PPR mean in fantasy football?', a: 'PPR stands for points per reception, a scoring rule that awards a fixed number of fantasy points for each catch a player makes. Full PPR awards one point per reception and half PPR awards half a point; standard scoring awards none.' },
    { q: 'Does PPR scoring change draft rankings?', a: 'Yes. Because the bonus is proportional to catch volume rather than uniform, it separates players who are otherwise comparable and changes which of them clear the replacement baseline at their position. That reorders the board rather than raising every score equally.' },
    { q: 'How much is a reception actually worth over a season?', a: 'In full PPR, each reception is worth one point, so a player catching ninety-five passes gains ninety-five points from the rule alone. The number that matters for a draft is not that total but the difference it creates between two players you are choosing between.' },
  ],

  links: ['formats/ppr', 'formats/standard', 'draft-science/replacement-value', 'ppr-draft-assistant', 'fantasy-football-draft-assistant'],
};
