// PAGE 10 — OFFICE / COWORKER LEAGUES.
export default {
  slug: 'office-fantasy-football-draft',
  title: 'Beat Your Coworkers at Fantasy Football | GREEN18',
  description: 'Drafting against your coworkers? Bring GREEN18 to the draft and use a live player board that adjusts as your league makes picks.',
  breadcrumb: 'Office Leagues',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'You Have to Work With Them Tomorrow. You Don’t Have to Lose to Them Tonight.',
    lede: [
      'The office league has consequences.',
      'Months of Slack messages.',
      'Questionable trade offers.',
      'Monday morning commentary.',
      'The coworker who auto-drafted and somehow won’t stop talking about being 3–0.',
      '**Bring GREEN18.**',
    ],
    cta: 'Beat Your Coworkers',
    micro: 'Download GREEN18 for iPhone.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'They Had All Summer. You Have GREEN18.', body: [
      'Your coworker has rankings.',
      'A podcast queue.',
      'A spreadsheet.',
      'Several opinions nobody asked for.',
      'You have a board that recalculates after every pick.',
      'He knows 200 players. You know which player makes sense **right now**.',
      'That is often enough.',
    ]},

    { type: 'prose', h2: 'You Don’t Need to Be the Fantasy Guy.', body: [
      'You just need to draft better than the fantasy guy.',
      'Set up your league.',
      'Start the draft.',
      'Let GREEN18 keep track of the player landscape while everyone else tries to remember who they planned on drafting three rounds ago.',
      'Never played before? Start with [fantasy football for beginners](/fantasy-football-for-beginners).',
    ]},

    { type: 'prose', h2: 'Expertise Is Mostly Recognizing Context.', body: [
      'Experienced managers are not remembering more names. They are reading conditions.',
      'They notice when:',
    ],
      list: [
        'a position is drying up',
        'value is falling',
        'a roster is becoming unbalanced',
        'waiting is dangerous',
        'waiting is smart',
      ],
      after: [
        'GREEN18 keeps evaluating those conditions as picks are recorded.',
        'You don’t have to know every rule of thumb before the draft begins.',
        'It is the same structure behind an expert decision, made visible — see [how the draft model works](/fantasy-football-draft-algorithm).',
      ] },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how the office league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you rather than drafting from a universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. GREEN18 recalculates the remaining opportunity.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of tabs and group chats.'] },
    ]},

    { type: 'prose', h2: 'Let Them Know More Players. You Need to Make Better Picks.', body: [
      'Fantasy football is not a trivia contest.',
      'Your lineup does not receive bonus points because you remembered a player’s college target share.',
      'When your pick arrives, the decision still reduces to one question:',
    ], quote: 'Which available player creates the most value for my roster?',
      after: [
        'GREEN18 keeps the answer focused there.',
        'Draft the roster.',
        'You can do it [without spending the summer on research](/fantasy-football-without-research).',
      ] },

    { type: 'cards', h2: 'Thirty Hours of Podcasts Meet Five Minutes of Setup.',
      sub: 'What each side of the office draft actually brings to the table.',
      cards: [
        { h3: 'He Memorized the Rankings', body: 'A ranking is a snapshot taken before anyone picked. It answers one question, once, and then the draft starts changing the answer.' },
        { h3: 'You Brought the Board That Changes', body: 'Every name removed changes the value of the names that remain. GREEN18 re-ranks what is left after each recorded pick.' },
        { h3: 'Your Coworker Knows Every Player', body: 'GREEN18 knows your draft — your scoring, your roster so far, and how long it is until you pick again.' },
      ] },

    { type: 'prose', h2: 'Quietly Bring the Better Board.', body: [
      'No 40-page spreadsheet required.',
      'No printed rankings.',
      'No pretending you’ve watched preseason snap counts for three straight weeks.',
      'Just draft — with a [live draft assistant](/live-fantasy-football-draft-assistant) beside you.',
    ]},

    { type: 'prose', h2: 'Make Monday Easier.', body: [
      'Your league is different.',
      'Your roster is different.',
      'Your draft is different.',
      'Your board should be different too.',
      'Monday morning is coming. Give yourself something to talk about.',
    ]},

    { type: 'convert', h2: 'Be Humble Tomorrow. Draft Ruthlessly Tonight.',
      body: ['**Download GREEN18 before your office draft.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'How can someone with no fantasy football preparation compete in an office league draft?', a: 'Most of the advantage in a draft comes from reading the current situation rather than from memorizing players. GREEN18 applies the league’s scoring and roster rules to the available player pool and re-ranks it as picks are recorded, so a manager who has done no offseason research can still see which available player fits their roster at the moment they are on the clock.' },
    { q: 'How long does it take to set GREEN18 up before an office draft?', a: 'Setup is entering the league’s scoring and roster settings and any personal preferences. It is a short configuration step done before the draft, not a research project, and the settings can be reused for the same league.' },
    { q: 'Does GREEN18 connect to the platform where the office league is hosted?', a: 'No. GREEN18 does not connect to, sync with, or import from any fantasy platform. It is an independent companion used alongside whatever platform the league runs on, and picks are recorded in GREEN18 as they happen.' },
    { q: 'Does GREEN18 draft for you?', a: 'No. GREEN18 does not auto-draft or make selections. It reorganizes the remaining player board and shows which available players fit the roster; the manager makes every pick themselves.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
    'live-fantasy-football-draft-assistant',
    'fantasy-football-without-research',
    'fantasy-football-draft-algorithm',
  ],
};
