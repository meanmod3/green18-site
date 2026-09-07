// PAGE 04 — DYNAMIC ADP. Lateral link to the live draft assistant (§22).
export default {
  slug: 'dynamic-fantasy-football-adp',
  title: 'Dynamic Fantasy Football ADP for Live Drafts | GREEN18',
  description: 'GREEN18 treats ADP as a starting point, not the final answer. Watch player value adjust as your fantasy football draft develops.',
  breadcrumb: 'Dynamic ADP',

  hero: {
    eyebrow: 'Market Value, Live',
    h1: 'ADP Is the Starting Line. Not the Answer.',
    lede: [
      'Average Draft Position tells you what the market expected.',
      'Your live draft tells you what the market is doing.',
      '**GREEN18 is designed around the difference.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Average Doesn’t Mean Your League.', body: [
      'ADP compresses thousands of drafts into one number.',
      'But you’re not drafting in thousands of leagues.',
      'You’re drafting in one.',
      'Your league has:',
    ],
      list: [
        'its own scoring',
        'its own roster settings',
        'its own managers',
        'its own position runs',
        'its own mistakes',
        'its own opportunities',
      ],
      after: [
        'GREEN18 does not license or scrape anyone’s draft-position feed. It computes its own projected draft position from open football data, then moves it with the picks you record — a deliberate choice, so that what you are watching is your room rather than an average of strangers’ drafts.',
        'ADP is a price — what the market tends to pay. What you need is a value: what this pick is worth to **your** roster. [Draft-State Valuation](/draft-science/draft-state-valuation) is the difference, and the gap between the two is where the best decisions live.',
      ] },

    { type: 'prose', h2: 'When the Market Moves, Your Board Should Move.', body: [
      'Imagine a quarterback run starts earlier than expected.',
      'Or everyone ignores running backs.',
      'Or a wide receiver keeps falling.',
      'The useful question isn’t what this player’s ADP was.',
    ], quote: 'What is this player worth now?',
      after: [
        'That’s the problem GREEN18 is built to address.',
        'It is the same engine behind the [live fantasy football draft assistant](/live-fantasy-football-draft-assistant).',
      ] },

    { type: 'cards', h2: 'Three Things ADP Can’t See.', cards: [
      { h3: 'Your Settings', body: 'Scoring and roster structure change what a player is worth to you.' },
      { h3: 'Your Room', body: 'Position runs and reaches are local to the draft you’re in, and they move [positional scarcity](/draft-science/positional-scarcity) — a rate of decline across positions, not a property any one position owns.' },
      { h3: 'Your Roster', body: 'What you already own changes what you should take next. Every pick spends something besides the player — the [opportunity cost](/draft-science/opportunity-cost) of the slot you didn’t fill.' },
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Scoring, roster structure and format go in before the draft starts.'] },
      { h3: 'Shape Your Draft.', body: ['Market value becomes a starting point rather than a verdict.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they’re taken. The remaining value reorganizes.'] },
      { h3: 'Make the Pick.', body: ['Decide with the draft in front of you, not the average one.'] },
    ]},

    { type: 'convert', h2: 'Don’t Draft the Average League.',
      body: ['Draft yours.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'What does ADP mean in fantasy football?', a: 'ADP means Average Draft Position. As a general term it represents approximately where a player tends to be selected across a collection of drafts. GREEN18 does not license or scrape such a feed: it computes its own projected draft position from open football data and then moves it with the picks recorded in your draft.' },
    { q: 'Why isn’t ADP enough?', a: 'ADP reflects an average market. Your particular scoring format, roster structure, picks, and available players can create opportunities that an average number cannot fully represent.' },
    { q: 'Does GREEN18 ignore ADP?', a: 'No. Market value can be useful. The GREEN18 philosophy is that market value should be combined with live draft context rather than treated as an unquestionable final ranking.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'fantasy-football-cheat-sheet-app',
    'fantasy-football-draft-strategy-app',
    'draft-science/draft-state-valuation',
  ],
};
