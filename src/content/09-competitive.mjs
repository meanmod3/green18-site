// PAGE 09 — COMPETITIVE PLAYERS.
export default {
  slug: 'competitive-fantasy-football-draft',
  title: 'Fantasy Football Draft Tool for Competitive Players | GREEN18',
  description: 'Turn league context, player availability, roster construction and live draft movement into a more responsive fantasy football board.',
  breadcrumb: 'Competitive Drafts',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'You Already Know the Players. Now Win the Decisions.',
    lede: [
      'Competitive fantasy drafts aren’t usually lost because someone never heard of a top-30 player.',
      'They’re lost at the margins.',
      'Waiting one round too long.',
      'Overreacting to a position run.',
      'Ignoring roster architecture.',
      'Taking market price when value was falling.',
      'Missing the moment when scarcity changed.',
      '**GREEN18 is built around those margins.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'The Edge Is Context.', body: [
      'Player evaluation matters.',
      'But once the draft begins, every pick changes the opportunity set.',
      'GREEN18 helps you evaluate the remaining board through the state of the draft instead of relying exclusively on the consensus order everyone else can see.',
      'That is the whole idea behind the [fantasy football draft assistant](/fantasy-football-draft-assistant).',
    ]},

    { type: 'prose', h2: 'Stop Drafting the Same Rankings as the Room.', body: [
      'Consensus is useful.',
      'Consensus is also available to everyone.',
      'GREEN18 is designed to layer your league, roster, preferences, availability, and draft movement onto that baseline.',
      'Which is why [ADP is the starting line, not the answer](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format that materially affect player value.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you instead of drafting from a universal list.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they are selected. GREEN18 recalculates the remaining opportunity.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, notes and tabs.'] },
    ]},

    { type: 'cards', h2: 'Where the Margins Are.', cards: [
      { h3: 'Live, Not Static', body: 'The board responds to the draft instead of presenting the same rankings from Pick 1 through Pick 150.' },
      { h3: 'Pick-by-Pick Context', body: 'The best available player can change because of what happened five picks ago. GREEN18 is designed around that reality.' },
      { h3: 'Built Around Your League', body: 'A player can have dramatically different value depending on scoring and roster construction. GREEN18 starts with the league you’re actually playing.' },
    ]},

    { type: 'prose', h2: 'Find the Edge Between Picks.', body: [
      'Your league is different.',
      'Your roster is different.',
      'Your draft is different.',
      'Your board should be different too.',
    ]},

    { type: 'convert', h2: 'Consensus Tells You the Price. Your Draft Tells You the Opportunity.',
      body: ['**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Take a live draft board into your next fantasy football draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'live-fantasy-football-draft-assistant',
    'fantasy-football-draft-strategy-app',
    'superflex-draft-assistant',
  ],
};
