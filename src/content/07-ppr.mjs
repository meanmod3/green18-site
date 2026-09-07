// PAGE 07 — PPR. No FAQ in the source doc; body fleshed out from §4/§5/§6 only.
export default {
  slug: 'ppr-draft-assistant',
  title: 'PPR Fantasy Football Draft Assistant | GREEN18',
  description: 'Draft for your PPR league using a live fantasy football player board that accounts for your league and changing draft.',
  breadcrumb: 'PPR Draft Assistant',

  hero: {
    eyebrow: 'PPR Scoring Format',
    h1: 'Draft for Your PPR League. Not a Generic League.',
    lede: [
      'Reception scoring changes player value.',
      'So does roster construction. So does positional availability.',
      'So does everything your league drafts before your next pick.',
      '**GREEN18 combines those realities into one live draft board.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'PPR Is a Setting. Not a Strategy.', body: [
      'Knowing that receptions are valuable is only the beginning.',
      'The real questions happen during the draft.',
      'Which receiver?',
      'Which running back?',
      'How much depth is left?',
      'Should you take the value now?',
      'Can you afford to wait?',
      'GREEN18 is built around those decisions — which is what a [live draft assistant](/live-fantasy-football-draft-assistant) is for.',
    ]},

    { type: 'prose', h2: 'Static Rankings Stop at the Starting Line.', body: [
      'Most fantasy football rankings answer one question:',
    ], quote: 'Who looked valuable before the draft started?',
      after: [
        'Your real draft creates different questions.',
        'What positions are disappearing?',
        'Who is likely to reach your next pick?',
        'Did the last five picks change the value of the board?',
        'As your draft develops, the remaining player board develops with it.',
      ] },

    { type: 'cards', h2: 'Why a PPR Board Has to Move.', cards: [
      { h3: 'Live, Not Static', body: 'The board responds to the draft instead of presenting the same rankings from Pick 1 through Pick 150.' },
      { h3: 'Built Around Your League', body: 'A player can have dramatically different value depending on scoring and roster construction. GREEN18 starts with the league you’re actually playing.' },
      { h3: 'Less Tab Switching', body: 'Your rankings, player pool, positional context and draft decisions belong in the same place.' },
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring — full PPR, half, or your own — plus roster structure and format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Players rise. Players fall. Roster needs change.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of six browser tabs.'] },
    ]},

    { type: 'prose', h2: 'Your Scoring Belongs in the Board.', body: [
      'A universal ranking cannot perfectly represent every league.',
      'GREEN18 starts from the premise that your scoring system should materially influence the players you’re considering.',
      'It is the same principle behind treating [ADP as a starting line](/dynamic-fantasy-football-adp) rather than the answer.',
    ]},

    { type: 'convert', h2: 'Draft the League You Joined.',
      body: ['Reception scoring is your league’s rule. Your board should know it.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'superflex-draft-assistant',
    'fantasy-football-cheat-sheet-app',
  ],
};
