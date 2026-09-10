// PAGE 01 — PILLAR. Links directly to every major supporting cluster (§22).
export default {
  slug: 'fantasy-football-draft-assistant',
  title: 'Fantasy Football Draft Assistant for 2026 | GREEN18',
  description: 'GREEN18 is a live fantasy football draft assistant for iPhone that adjusts your player board as your real draft unfolds.',
  breadcrumb: 'Fantasy Football Draft Assistant',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'A Fantasy Football Draft Assistant Built for the Draft You’re Actually In.',
    lede: [
      'Most draft tools give you a ranking. GREEN18 gives you a board that reacts.',
      'Configure your league, start the draft, record the players coming off the board, and watch the remaining player pool reorganize around what is actually happening.',
      '**Your draft board should move when your draft moves.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Rankings Before the Draft Aren’t Enough.', body: [
      'Pre-draft rankings are useful.',
      'Then your league starts drafting.',
      'Three quarterbacks disappear.',
      'A position run begins.',
      'A player you expected to lose falls another round.',
      'Your roster develops differently than expected.',
      'The manager next to you starts attacking one position.',
      'The assumptions behind the original ranking are already changing.',
      'GREEN18 is designed for everything that happens next.',
    ]},

    { type: 'prose', h2: 'A Live View of the Remaining Draft.', body: [
      'GREEN18 keeps the focus where it belongs: **the players who are still available.**',
      'Use your league settings, roster construction, player availability, positional context, and your own preferences to navigate the draft pick by pick — the way a [live draft assistant](/live-fantasy-football-draft-assistant) should.',
      'The method has a name: **[Draft-State Valuation](/draft-science/draft-state-valuation)** — valuing a player by the current state of a specific draft instead of treating a preseason rank as fixed. The model is **deterministic**: the same board always produces the same answer.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how your league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you rather than assuming every manager drafts from the same list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. GREEN18 recalculates the remaining opportunity.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, cheat sheets, notes and tabs.'] },
    ]},

    { type: 'prose', h2: 'Why GREEN18?', body: ['Because there is no universal best pick.', 'There is only the best decision for:'],
      list: ['this league', 'this roster', 'this draft position', 'this moment', 'this remaining player pool'],
      after: [
        'GREEN18 is built around that distinction — and it holds whether you are in a [competitive league](/competitive-fantasy-football-draft) or a [home league with friends](/home-league-draft-assistant).',
      ] },

    { type: 'prose', h2: 'From First Pick to Final Bench Spot.', body: [
      'The same question follows you through the entire draft:',
    ], quote: 'Who gives my team the most value now?',
      after: [
        'The answer is a margin, not a rank: a player is worth the amount by which he beats the player who would otherwise fill that slot — his [margin over replacement](/draft-science/replacement-value) — measured against how far away your next pick is.',
        'GREEN18 keeps answering that question using the state of the draft instead of freezing your decision-making at preseason rankings — which is why [ADP is a starting line, not the answer](/dynamic-fantasy-football-adp).',
      ] },

    { type: 'convert', h2: 'Download GREEN18.',
      body: ['Stop treating a live draft like a static spreadsheet.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'What is a fantasy football draft assistant?', a: 'A fantasy football draft assistant helps managers evaluate available players while their draft is happening. GREEN18 goes beyond a static ranking by reorganizing the remaining player board as the draft develops.' },
    { q: 'Does GREEN18 replace fantasy football rankings?', a: 'GREEN18 uses player valuation as a starting point, but the product is designed around the changing context of the live draft rather than treating an initial ranking as the final answer.' },
    { q: 'Is GREEN18 available on Android?', a: 'GREEN18 is currently focused on iPhone.' },
    { q: 'Can I use GREEN18 with my existing fantasy league?', a: 'GREEN18 is designed to work alongside the league where you already play. Configure the relevant league settings in GREEN18 and use it during your draft.' },
  ],

  links: [
    'live-fantasy-football-draft-assistant',
    'fantasy-football-cheat-sheet-app',
    'dynamic-fantasy-football-adp',
    'superflex-draft-assistant',
    'ppr-draft-assistant',
    'fantasy-football-for-beginners',
    'draft-science/draft-state-valuation',
  ],
};
