// PAGE 05 — DRAFT STRATEGY APP.
export default {
  slug: 'fantasy-football-draft-strategy-app',
  title: 'Fantasy Football Draft Strategy App | GREEN18',
  description: 'Build your fantasy draft strategy around the players still available, your roster, league settings, and live draft conditions.',
  breadcrumb: 'Draft Strategy App',

  hero: {
    eyebrow: 'Strategy That Adapts',
    h1: 'Strategy Isn’t a List of Players.',
    lede: [
      'Fantasy football draft strategy is deciding what to do when the board doesn’t unfold the way you expected.',
      '**GREEN18 is designed for that exact moment.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'The Plan Changes.', body: [
      'Maybe your target disappears one pick before you.',
      'Maybe value falls into your lap.',
      'Maybe everyone starts drafting quarterbacks.',
      'Maybe nobody does.',
      'Maybe your roster unexpectedly becomes RB-heavy.',
      'A real strategy has to survive contact with the draft room.',
      'GREEN18 helps you adapt without abandoning the logic behind your draft — the point of a [live draft assistant](/live-fantasy-football-draft-assistant).',
    ]},

    { type: 'prose', h2: 'Make Decisions, Not Predictions.', body: [
      'You don’t need to predict every pick before the draft starts.',
      'You need to recognize the best decision when your turn arrives.',
      'Every pick spends two things: the slot and the players you will no longer be able to take with it. That second cost is [opportunity cost](/draft-science/opportunity-cost), and it is decided by how far away your next pick is.',
      'GREEN18 keeps the remaining player pool organized around the draft that’s actually happening, and it is **deterministic** — the same board always produces the same answer.',
      'Which is why [ADP is the starting line, not the answer](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'cards', h2: 'What Your Strategy Runs On.', cards: [
      { h3: 'League Settings', body: 'Scoring and roster structure define what a good pick even means.' },
      { h3: 'Remaining Pool', body: 'The players still on the board are the only ones you can draft — and what each is worth depends on how fast his tier is emptying versus everyone else’s.' },
      { h3: 'Your Roster', body: 'Every pick you make changes the value of the next one, which is why [best player available and roster need](/scenarios/best-player-available-vs-roster-need) stop being opposites once you measure the margin each adds.' },
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format you actually play.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences behind your plan before the first pick.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they go. The board reorganizes around what’s left.'] },
      { h3: 'Adapt the Plan.', body: ['Make the best decision available instead of defending a pre-draft script.'] },
    ]},

    { type: 'convert', h2: 'Bring a Strategy That Can Adapt.',
      body: ['A plan is only as good as the board it meets.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'fantasy-football-cheat-sheet-app',
    'draft-science/opportunity-cost',
  ],
};
