// PAGE 13 — ESPN. Third-party platform page: independent companion only (§26).
export default {
  slug: 'espn-fantasy-football-draft-helper',
  title: 'ESPN Fantasy Football Draft Helper | GREEN18',
  description: 'Use GREEN18 alongside your ESPN fantasy football draft for a live player board that responds as players are selected.',
  breadcrumb: 'ESPN Draft Helper',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'Drafting on ESPN? Bring Your Own Live Board.',
    lede: [
      'ESPN runs the league.',
      'GREEN18 helps you think through the draft.',
      'Use GREEN18 alongside your ESPN fantasy football draft to keep a responsive view of the players still available.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Your League Platform and Your Draft Assistant Don’t Have to Be the Same Thing.', body: [
      'Keep your league where it is.',
      'Configure GREEN18 around your league settings and use it as the decision layer beside your draft.',
      'As players come off the board, keep GREEN18 aligned with the remaining player pool.',
      'That is what a [live draft assistant](/live-fantasy-football-draft-assistant) is for.',
    ]},

    { type: 'prose', h2: 'Static Rankings Stop at the Starting Line.', body: [
      'Most fantasy football rankings answer one question:',
    ], quote: 'Who looked valuable before the draft started?',
      after: [
        'Your real draft creates different questions.',
        'What positions are disappearing?',
        'Who is likely to reach your next pick?',
        'What does your roster need?',
        'Which player is worth taking now instead of later?',
        'GREEN18 is built for those questions.',
        'As your draft develops, the remaining player board develops with it.',
      ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and league format that materially affect player value.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. Players rise. Players fall. The board keeps moving.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, notes and browser tabs.'] },
    ]},

    { type: 'cards', h2: 'What the Second Screen Adds.', cards: [
      { h3: 'Live, Not Static', body: 'The board responds to the draft instead of presenting the same rankings from Pick 1 through Pick 150.' },
      { h3: 'Built Around Your League', body: 'A player can have dramatically different value depending on scoring and roster construction. GREEN18 starts with the league you’re actually playing.' },
      { h3: 'Pick-by-Pick Context', body: 'The best available player can change because of what happened five picks ago. GREEN18 is designed around that reality.' },
    ]},

    { type: 'convert', h2: 'Don’t Change Platforms. Change the Way You Draft.',
      body: [
        'Your league can stay exactly where it is.',
        '**Download GREEN18 for iPhone and keep a live board beside your draft.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Does GREEN18 connect to my ESPN league?', a: 'No. GREEN18 is an independent app with no platform integration. You configure your league settings in GREEN18 and use it alongside your draft.' },
    { q: 'How do I use GREEN18 during an ESPN draft?', a: 'Set up your league in GREEN18 before the draft, then keep it open beside your draft room and remove players from the board as they are selected.' },
    { q: 'Do I have to move my league to use GREEN18?', a: 'No. GREEN18 is a decision layer for the draft, not a league platform. Your league stays where it already is.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'yahoo-fantasy-football-draft-helper',
    'sleeper-fantasy-football-draft-helper',
  ],

  disclaimer: 'GREEN18 is an independent product and is not affiliated with, endorsed by, or sponsored by ESPN.',
};
