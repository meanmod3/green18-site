// Homepage (§16). Deliberately more concise than the landing pages.
export default {
  slug: '',
  title: 'GREEN18 — Live Fantasy Football Draft Assistant for iPhone',
  description: 'GREEN18 is a live fantasy football draft board for iPhone. Set your league, start drafting, and watch the player board react as picks come off the board.',
  breadcrumb: 'Home',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'Your Draft Board Should Move When Your Draft Moves.',
    lede: [
      'Static rankings can’t see your draft. GREEN18 can.',
      'Configure your league, start drafting, and watch your player board react as picks come off the board.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone · Built for the 2026 fantasy football draft',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  // Real footage of the app driven through a live draft. The build renders the
  // device frame only when all three files exist (see build.mjs), so this is
  // safe to declare before the recording lands.
  heroMedia: {
    mp4: '/assets/green18-draft-demo.mp4',
    webm: '/assets/green18-draft-demo.webm',
    poster: '/assets/green18-draft-demo-poster.jpg',
    alt: 'The GREEN18 live draft board on iPhone, reordering as picks are recorded.',
    caption: '**Pick made. Board recalculated.** Real footage — each pick is recorded, and the remaining board re-ranks around it.',
  },

  blocks: [
    { type: 'prose', h2: 'The Draft Changes Everything.', body: [
      'Before the draft, rankings are predictions.',
      'Once the draft begins, every pick becomes information.',
      'GREEN18 uses that changing context to reorganize the players still available.',
    ]},

    { type: 'cards', h2: 'One Board. Three Inputs.', cards: [
      { h3: 'Your League', body: 'Draft according to the scoring and roster settings you’re actually playing.' },
      { h3: 'Your Draft', body: 'See the remaining player pool change as picks come off the board.' },
      { h3: 'Your Decision', body: 'Use the live board to decide who gives your roster the most value now.' },
    ]},

    { type: 'model', id: 'model',
      h2: 'Every Pick Changes the Math.',
      sub: 'A player’s value doesn’t exist in isolation. GREEN18 reads your league, your team, your preferences and the live draft together, and revalues what’s left.',
      inputs: [
        { h3: 'Your League', items: ['Scoring', 'Roster', 'Format'] },
        { h3: 'Your Preferences', items: ['Targets', 'Risk', 'Strategy'] },
        { h3: 'Your Team', items: ['Current roster', 'Position needs', 'Construction'] },
        { h3: 'The Live Draft', items: ['Players selected', 'Players remaining', 'Position movement'] },
      ],
      core: 'Continuous player revaluation',
      output: { h3: 'Your Live Draft Board',
                body: 'Who is most valuable to you right now?' } },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and league format that materially affect player value.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Players rise. Players fall. The board keeps moving.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter — instead of six browser tabs.'] },
    ]},

    { type: 'prose', h2: 'The Player Didn’t Change. Your Situation Did.', body: [
      'Three quarterbacks go in a row. The fourth didn’t suddenly get better.',
      'He got harder to replace.',
      'That is the difference between crossing a name off a list and [recalculating what’s left](/fantasy-football-positional-scarcity).',
    ], quote: 'ADP tells you what people expected. Your draft tells you what they’re doing.',
      after: ['Public rankings describe the average draft. GREEN18 helps you navigate yours.'] },

    { type: 'trust', items: [
      { h: 'No account.', body: 'No sign-up, no login, no email. Open the app and set up your league.' },
      { h: 'Nothing collected.', body: 'GREEN18’s App Store privacy label is “Data Not Collected”. Your leagues and drafts stay on your iPhone.' },
      { h: 'Works offline.', body: 'The draft room’s Wi-Fi doesn’t decide whether your board works.' },
    ], note: 'GREEN18 is an independent app. It is not affiliated with, endorsed by or sponsored by the NFL, the NFL Players Association, any NFL club, or any fantasy platform. Read the [privacy policy](/privacy).' },

    { type: 'convert', h2: 'Stop Drafting From Yesterday’s Board.',
      body: ['Take GREEN18 into your next draft.'],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'fantasy-football-for-beginners',
  ],
};
