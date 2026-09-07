// PAGE 14 — YAHOO. Third-party platform page: independent companion only (§26).
export default {
  slug: 'yahoo-fantasy-football-draft-helper',
  title: 'Yahoo Fantasy Football Draft Helper | GREEN18',
  description: 'Use GREEN18 beside your Yahoo Fantasy Football draft and keep a live player board organized around your league.',
  breadcrumb: 'Yahoo Draft Helper',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'Drafting on Yahoo? Add a Smarter Draft Board.',
    lede: [
      'Your league can stay on Yahoo.',
      'Your decision system can live in GREEN18.',
      'Configure the league, follow the picks, and keep a changing view of the players still available.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Yahoo Handles the League. GREEN18 Handles Your Board.', body: [
      'Keep GREEN18 open beside your Yahoo draft and use it to evaluate the remaining player landscape as your league makes its picks.',
      'Nothing about your league has to change.',
      'The board beside it does the moving — the way a [live draft assistant](/live-fantasy-football-draft-assistant) should. Every recorded pick updates each remaining player’s **projected draft position** for your league’s format, and the odds he survives to your next turn — because a position empties fast once a tier thins, which is what [replacement level](/draft-science/replacement-value) describes.',
    ]},

    { type: 'prose', h2: 'The Draft Creates New Questions.', body: [
      'Pre-draft rankings answer what looked valuable before anyone picked.',
      'Then three quarterbacks disappear and [positional scarcity](/draft-science/positional-scarcity) at the position steepens without a single player changing.',
      'A position run begins — the case worked through in [five running backs going in a row](/scenarios/five-running-backs-go-in-a-row).',
      'A player you expected to lose falls another round, and the opportunity cost of passing shifts.',
      'Your roster develops differently than expected.',
      'GREEN18 is built for everything that happens after the first pick.',
    ], quote: 'Static rankings are built before your draft starts. GREEN18 helps you make decisions inside the draft you’re actually in.' },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how your league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you rather than assuming every manager drafts from the same list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Position groups tighten. Roster needs change.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of six browser tabs.'] },
    ]},

    { type: 'cards', h2: 'Why a Second Board Helps.', cards: [
      { h3: 'Built Around Your League', body: 'Scoring and roster construction change what a player is worth. GREEN18 starts with the league you joined.' },
      { h3: 'Pick-by-Pick Context', body: 'The best available player can change because of what happened five picks ago. Your pick horizon — the distance to your next turn — decides how much of that movement you can afford to wait out.' },
      { h3: 'Less Tab Switching', body: 'Your rankings, player pool, positional context and draft decisions belong in the same place.' },
    ]},

    { type: 'convert', h2: 'Same League. Better Draft Setup.',
      body: [
        'Your league is different. Your roster is different. Your draft is different.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Take a live draft board into your next fantasy football draft.' },
  ],

  faq: [
    { q: 'Does GREEN18 sync with my Yahoo draft?', a: 'No. GREEN18 has no platform integration. You configure your league inside GREEN18 and use it as an independent board beside your draft.' },
    { q: 'Can I keep my league on Yahoo?', a: 'Yes. GREEN18 is not a league platform. It is a live decision board you use alongside the draft you are already in.' },
    { q: 'What do I need to set up before the draft?', a: 'Enter your scoring, roster structure and league format in GREEN18 so the board reflects the league you are actually playing.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'draft-science/positional-scarcity',
    'espn-fantasy-football-draft-helper',
    'sleeper-fantasy-football-draft-helper',
  ],

  disclaimer: 'GREEN18 is an independent product and is not affiliated with, endorsed by, or sponsored by Yahoo.',
};
