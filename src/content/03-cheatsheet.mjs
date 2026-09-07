// PAGE 03 — CHEAT SHEET.
export default {
  slug: 'fantasy-football-cheat-sheet-app',
  title: 'Fantasy Football Cheat Sheet App for 2026 | GREEN18',
  description: 'Replace the static fantasy football cheat sheet with a live iPhone draft board that changes as your draft unfolds.',
  breadcrumb: 'Cheat Sheet App',

  hero: {
    eyebrow: 'The Cheat Sheet, Rebuilt',
    h1: 'The Fantasy Football Cheat Sheet That Doesn’t Stay Still.',
    lede: [
      'A cheat sheet is useful until reality starts changing it.',
      'GREEN18 turns the traditional fantasy football cheat sheet into a live draft board.',
      'Players disappear.',
      'Values change.',
      'Positions tighten.',
      'Your roster develops.',
      '**The board responds.**',
    ],
    cta: 'Get the GREEN18 Cheat-Sheet Edge',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Your Screenshot Can’t React.', body: [
      'A printed ranking can’t see that six running backs just disappeared.',
      'A screenshot can’t see your roster.',
      'A spreadsheet doesn’t know which players your league has already drafted unless you rebuild it yourself.',
      'GREEN18 is built to solve that problem — the same idea behind the [live draft assistant](/live-fantasy-football-draft-assistant).',
    ]},

    { type: 'prose', h2: 'Start With Rankings. Finish With Context.', body: [
      'A good draft still needs player value.',
      'GREEN18 simply refuses to stop there.',
      'The available board changes around the actual state of the draft so you’re evaluating players in context instead of blindly following a numbered list.',
    ]},

    { type: 'prose', h2: 'Built for the Person Who Usually Shows Up With Notes.', body: [
      'If your draft preparation normally includes:',
    ],
      list: [
        'screenshots',
        'rankings',
        'notes',
        'sleeper lists',
        'handwritten targets',
        'multiple browser tabs',
        'printed cheat sheets',
      ],
      after: [
        'GREEN18 gives you one live place to organize the decision.',
        'New to all of this? Start with [fantasy football for beginners](/fantasy-football-for-beginners).',
      ] },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Enter the scoring and roster settings your league actually uses.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you instead of one universal list.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they’re selected. The remaining board reorganizes.'] },
      { h3: 'Make the Pick.', body: ['One live sheet, instead of seven static ones.'] },
    ]},

    { type: 'convert', h2: 'Upgrade the Cheat Sheet.',
      body: ['Stop drafting from a page that can’t change.', '**Download GREEN18 for iPhone.**'],
      label: 'Get the GREEN18 Cheat-Sheet Edge', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Is GREEN18 a fantasy football cheat sheet?', a: 'GREEN18 can serve the same purpose, but it is designed to be more responsive than a traditional static cheat sheet.' },
    { q: 'Do the rankings change?', a: 'The product is built around a changing player board that responds to the draft as available players and team context change.' },
    { q: 'Can beginners use it?', a: 'Yes. GREEN18 can simplify the draft by concentrating the available player pool into one decision-focused view.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
  ],
};
