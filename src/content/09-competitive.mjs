// PAGE 09 — COMPETITIVE PLAYERS.
export default {
  slug: 'competitive-fantasy-football-draft',
  title: 'Competitive Fantasy Football Draft Tool | GREEN18',
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
      'Player evaluation matters. But once the draft begins, every pick changes the opportunity set.',
      'The margins you are hunting have precise names. **Opportunity cost** is what you give up at every other position by spending this pick here. **Margin over replacement** is what the player is actually worth once you subtract whoever you would have taken instead. **Tier collapse** is the moment a position’s remaining pool falls off a cliff and the price of waiting jumps in one pick.',
      'GREEN18 evaluates the remaining board through the state of the draft — [Draft-State Valuation](/draft-science/draft-state-valuation) — instead of relying exclusively on the consensus order everyone else can see.',
    ]},

    { type: 'prose', h2: 'Stop Drafting the Same Rankings as the Room.', body: [
      'Consensus is useful. Consensus is also available to everyone.',
      'GREEN18 layers your league, roster, preferences, availability and draft movement onto that baseline, which is why [ADP is the starting line, not the answer](/dynamic-fantasy-football-adp).',
      'The edge is not in knowing a name the room does not know. It is in pricing the same name differently, correctly, because your roster and your next pick are not theirs.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format that set replacement level at every position.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you instead of drafting from a universal list.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they are selected. GREEN18 recalculates the remaining board from the picks recorded in your room — survival odds, position velocity and tier structure across everyone still available.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter. The model is deterministic — same board in, same answer out, every time.'] },
    ]},

    { type: 'cards', h2: 'Where the Margins Are.', cards: [
      { h3: 'The Pick Horizon', body: 'The distance to your next selection is an input, not trivia. Scarcity that resolves before you pick again costs you nothing; scarcity that arrives during the eighteen picks in between must be paid for now or not at all.' },
      { h3: 'Tier Boundaries, Not Ranks', body: 'The best available player can change because of what happened five picks ago. What matters is whether the pick in front of you is the last one above a cliff.' },
      { h3: 'Your League, Not the Consensus One', body: 'Scoring and roster construction decide how deep a position stays startable in your league. A ranking has to assume one answer to that. Your board is built for the settings you actually entered.' },
    ]},

    { type: 'prose', h2: 'Best Player Available, or the Roster You Need?', body: [
      'This is the argument the format never settles, and it is a false one.',
      'Once value is measured as margin over replacement against **your** roster and **your** pick horizon, best-available and roster-need stop being two philosophies and become one calculation. The player who adds most is the answer to both.',
      'Where it gets genuinely hard is a live board on a ninety-second clock. [Best player available versus roster need](/scenarios/best-player-available-vs-roster-need) works a real instance through, and the [pick horizon calculator](/tools/pick-horizon-calculator) prices the wait before you sit down.',
    ], quote: 'Consensus prices the player. Your draft prices the pick.' },

    { type: 'prose', h2: 'Find the Edge Between Picks.', body: [
      'Your league is different.',
      'Your roster is different.',
      'Your draft is different.',
      'Your board should be different too.',
    ]},

    { type: 'convert', h2: 'Consensus Tells You the Price. Your Draft Tells You the Opportunity.',
      body: [],
      label: 'Download GREEN18', sub: 'Take a live draft board into your next fantasy football draft.' },
  ],

  links: [
    'draft-science/opportunity-cost',
    'draft-science/pick-horizon',
    'tools/pick-horizon-calculator',
    'dynamic-fantasy-football-adp',
    'superflex-draft-assistant',
  ],
};
