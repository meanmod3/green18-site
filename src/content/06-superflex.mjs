// PAGE 06 — SUPERFLEX. League-format intent (§22 lateral link: Dynamic ADP).
export default {
  slug: 'superflex-draft-assistant',
  title: 'Superflex Fantasy Football Draft Assistant | GREEN18',
  description: 'Draft quarterbacks and skill players in context with a live Superflex fantasy football draft board from GREEN18.',
  breadcrumb: 'Superflex Draft Assistant',

  hero: {
    eyebrow: 'Superflex Draft Format',
    h1: 'Superflex Changes Everything.',
    lede: [
      'In Superflex, quarterback value doesn’t exist in isolation.',
      'It depends on how many quarterbacks are already gone, how aggressively your league is drafting them, and what’s still available everywhere else.',
      '**That’s exactly why a static overall ranking can become dangerous.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Quarterback Value Is a Moving Target.', body: [
      'In a Superflex league, one pick can reprice the entire quarterback room.',
      'Value depends on:',
    ], list: [
      'how many quarterbacks are already gone',
      'how aggressively your league is drafting them',
      'how many viable starters remain',
      'your roster',
      'your next pick',
      'the skill-position value still available',
    ], after: ['A single overall ranking cannot see any of that. GREEN18 is built for it — the way a [live draft assistant](/live-fantasy-football-draft-assistant) should be.'] },

    { type: 'prose', h2: 'Don’t Automatically Draft the Quarterback.', body: [
      'Don’t automatically fade the quarterback either.',
      'Superflex strategy is contextual.',
      'If the league attacks quarterback early, scarcity changes.',
      'If quarterbacks slide, opportunity changes.',
      'GREEN18 keeps the board responsive instead of forcing every Superflex draft into the same preset script.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format — including the Superflex spot that changes quarterback value.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Position groups tighten. The board keeps moving.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, notes and tabs.'] },
    ]},

    { type: 'prose', h2: 'React to the QB Room.', body: [
      'Your league tells you how aggressively you need to respond.',
      'GREEN18 helps keep that information visible in the player board while the draft is unfolding.',
      'Public expectations are only where the room started — [ADP is a starting line, not the answer](/dynamic-fantasy-football-adp).',
    ], quote: 'How many viable starters are actually left?' },

    { type: 'convert', h2: 'Superflex Requires a Live Board.',
      body: ['Quarterback scarcity moves faster than a printed ranking.', '**Download GREEN18 for iPhone and draft your Superflex league in context.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Is GREEN18 built for Superflex leagues?', a: 'GREEN18 supports league-contextual drafting, including formats where quarterback value is materially affected by Superflex roster construction.' },
    { q: 'Should I always draft quarterbacks early in Superflex?', a: 'Not necessarily. Quarterback value is high in many Superflex formats, but the correct decision still depends on league size, scoring, available players, your roster, and how the room is drafting.' },
    { q: 'Why is a live board useful in Superflex?', a: 'Quarterback scarcity can change quickly. A responsive board makes it easier to recognize when the available position landscape changes.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'live-fantasy-football-draft-assistant',
    'ppr-draft-assistant',
    'fantasy-football-draft-strategy-app',
  ],
};
