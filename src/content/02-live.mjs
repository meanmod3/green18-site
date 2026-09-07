// PAGE 02 — LIVE DRAFT ASSISTANT.
export default {
  slug: 'live-fantasy-football-draft-assistant',
  title: 'Live Fantasy Football Draft Assistant | GREEN18',
  description: 'Use GREEN18 during your fantasy football draft and watch your player board adjust as picks come off the board.',
  breadcrumb: 'Live Draft Assistant',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'A Draft Assistant That Changes While You Draft.',
    lede: [
      'Your fantasy draft isn’t static.',
      'Your draft tool shouldn’t be either.',
      'GREEN18 is built to stay open beside you while the picks are happening.',
      'When another player is selected, the available board changes.',
      'When a position starts disappearing, the context changes.',
      'When your roster takes shape, your priorities change.',
      '**GREEN18 keeps up.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'The Draft Is the Data.', body: [
      'Before the draft, everyone has projections.',
      'During the draft, you gain something more valuable:',
      '**information about your actual league.**',
      'Every pick tells you something.',
      'GREEN18 uses the evolving player pool and your team context to help organize the decisions that remain — including how far away your next selection is, which is the input most tools leave out entirely. That distance is your [pick horizon](/draft-science/pick-horizon).',
      'It is the live half of the [fantasy football draft assistant](/fantasy-football-draft-assistant).',
    ]},

    { type: 'prose', h2: 'See the Board Change.', body: [
      'Players shouldn’t stay locked into the same order simply because that was their ranking yesterday.',
      'A run does not just remove names; it drops the replacement level behind them, and the board re-ranks because replacement level moved. GREEN18 is designed so the live board can respond as:',
    ],
      list: [
        'players are drafted',
        'a [tier collapses](/scenarios/last-player-in-a-tier) and the next one is a real step down',
        'positions become scarce',
        'roster needs develop',
        'alternative players disappear',
        'value remains available',
        'the draft moves into new stages',
      ],
      after: ['Which is also why [ADP is a starting point rather than the final answer](/dynamic-fantasy-football-adp).'] },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how your league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you before the first pick is made.'] },
      { h3: 'Draft Alongside It.', body: ['As players come off the board, remove them. The remaining pool reorganizes.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter when your turn arrives.'] },
    ]},

    { type: 'convert', h2: 'Draft With the Room.',
      body: ['Not against a preseason PDF.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Does GREEN18 update during the draft?', a: 'Yes. GREEN18 is designed around a live draft workflow where selected players are removed and the remaining board adjusts around the changing draft state.' },
    { q: 'Do I have to constantly rebuild my rankings?', a: 'No. The purpose of GREEN18 is to keep the board responsive without forcing you to manually reconstruct your rankings after every pick.' },
    { q: 'Can I use GREEN18 at an in-person draft?', a: 'Yes. GREEN18 can be used as the draft companion beside the platform, computer, television, or physical draft board where your league is drafting.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-cheat-sheet-app',
    'dynamic-fantasy-football-adp',
    'fantasy-football-draft-strategy-app',
    'draft-science/pick-horizon',
  ],
};
