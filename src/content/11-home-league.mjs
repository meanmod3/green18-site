// PAGE 11 — HOME LEAGUES.
export default {
  slug: 'home-league-draft-assistant',
  title: 'Fantasy Football Draft Assistant for Home Leagues | GREEN18',
  description: 'Give your long-running fantasy football league a smarter live draft board with GREEN18 for iPhone.',
  breadcrumb: 'Home Leagues',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'Your League Isn’t an Average League.',
    lede: [
      'You’ve been drafting with these people for years.',
      'You know who reaches.',
      'You know who hoards running backs.',
      'You know who starts the quarterback run.',
      'You know who drafts three players from the same NFL team.',
      'Your draft has its own personality.',
      '**GREEN18 is built for drafts like that.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Every Home League Creates Its Own Market.', body: [
      'Public rankings can tell you how the fantasy football world values a player.',
      'Your draft tells you how your league values him.',
      'The difference creates opportunity — and it is a real, measurable one, because your league’s habits move **replacement level** away from where the consensus assumed it was. When the same three managers reach for running backs every August, the running back you can actually get at your next pick is worse than the one a ranking implies, and every other position is quietly cheaper.',
      'That is [Draft-State Valuation](/draft-science/draft-state-valuation): pricing a player by the board in front of you rather than by a number set weeks ago. GREEN18 helps you operate inside that changing market — the same reason [ADP is a starting line, not the answer](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format your league has always used.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you rather than assuming every manager drafts from the same list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. GREEN18 recalculates the board from the picks you record — survival odds, position velocity and tier structure across everyone still available.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, notes and tabs. Deterministic: the same board always produces the same answer.'] },
    ]},

    { type: 'prose', h2: 'Keep the Tradition. Upgrade the Board.', body: [
      'The league doesn’t need to change.',
      'The draft doesn’t need to move platforms.',
      'Bring GREEN18 beside whatever you’re already using and make better decisions inside the same draft you’ve always had.',
      'It is the [fantasy football draft assistant](/fantasy-football-draft-assistant) for the league you already have.',
    ]},

    { type: 'prose', h2: 'Know the Room, Then Price the Wait.', body: [
      'Knowing who reaches is only half of it. The other half is your **pick horizon** — how many selections happen before you are back on the clock.',
      'A tendency you can predict is only worth money if it lands between your picks. If the quarterback run always starts at the turn and you sit at the turn, that is not trivia, that is [drafting from the turn](/scenarios/drafting-from-the-turn) with two picks of leverage. If it lands right after you, it costs you nothing at all.',
      'Every league draws its own replacement line too, and it moves with size, scoring and starting slots. The [league value calculator](/tools/league-value-calculator) shows where yours actually sits.',
    ], quote: 'A tendency you can predict is only worth money if it lands between your picks.' },

    { type: 'cards', h2: 'What Changes at the Table.', cards: [
      { h3: 'Live, Not Static', body: 'The board responds to the draft instead of presenting the same rankings from Pick 1 through Pick 150.' },
      { h3: 'Built Around Your League', body: 'A player can have dramatically different value depending on scoring and roster construction, because those settings decide where replacement level sits. GREEN18 starts with the league you’re actually playing.' },
      { h3: 'Scarcity Is Yours, Not Theirs', body: 'A cliff at a position you already have covered costs you nothing, while the same board is an emergency for the manager across the table. Scarcity is a property of the board and your roster together.' },
    ]},

    { type: 'convert', h2: 'Stop Drafting From Yesterday’s Board.',
      body: [
        'Your league is different.',
        'Your roster is different.',
        'Your draft is different.',
      ],
      label: 'Download GREEN18', sub: 'Take a live draft board into your next fantasy football draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'draft-science/draft-state-valuation',
    'scenarios/drafting-from-the-turn',
    'tools/league-value-calculator',
    'dynamic-fantasy-football-adp',
  ],
};
