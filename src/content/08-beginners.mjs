// PAGE 08 — BEGINNERS. Audience intent (§22 lateral link: Last-Minute Draft).
// Register stays warm and reassuring; precision only where something is explained.
export default {
  slug: 'fantasy-football-for-beginners',
  title: 'Fantasy Football Draft Help for Beginners | GREEN18',
  description: 'New to fantasy football? GREEN18 helps simplify your draft by keeping the best remaining options organized as picks happen.',
  breadcrumb: 'Fantasy Football for Beginners',

  hero: {
    eyebrow: 'Your First Draft',
    h1: 'Your First Fantasy Draft Doesn’t Need 37 Browser Tabs.',
    lede: [
      'You don’t need to memorize every depth chart.',
      'You don’t need ten years of fantasy football experience.',
      'And you definitely don’t need to panic because everyone else looks like they know what they’re doing.',
      '**GREEN18 gives you a live player board designed to help answer the question that matters.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'One Question, All Draft Long.', body: [
      'You don’t have to know everything.',
      'You have to know what to do on the clock.',
    ], quote: 'Who should I be considering right now?',
      after: ['GREEN18 keeps the remaining player pool organized around that one question — the job of a [live draft assistant](/live-fantasy-football-draft-assistant).'] },

    { type: 'prose', h2: 'Set the League. Follow the Draft.', body: [
      'Fantasy football gets complicated because player value depends on the rules of the league.',
      'GREEN18 starts there.',
      'Configure the league.',
      'Start the draft.',
      'Mark players as they’re selected.',
      'Use the changing board to understand the strongest remaining options.',
    ]},

    { type: 'prose', h2: 'The One Idea Worth Learning First.', body: [
      'Here it is, and it is the whole game: **a player is only worth what he gives you over the player you could take instead.**',
      'That second player is the **replacement** — the next-best option at the same position when your turn comes back around. The gap between them is your **margin over replacement**, and it is the only number that actually wins you a week.',
      'This is why the loudest name is not always the right pick. Six equally good running backs on the board means taking one costs you almost nothing in the way of missed opportunity. Two good ones left and a steep drop after them means waiting is expensive. That drop-off is [positional scarcity](/draft-science/positional-scarcity), and it moves every single pick.',
      'You do not have to compute any of this. You just have to know that it is what the board is doing while you look at it. Anything you want spelled out is in the [glossary](/glossary).',
    ], quote: 'Not “is he good?” — “how much better is he than what I’d get instead?”' },

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how your league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you. No fantasy vocabulary test required.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. GREEN18 recalculates what the remaining players are worth to your roster.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of six browser tabs.'] },
    ]},

    { type: 'prose', h2: 'You Still Make the Pick.', body: [
      'GREEN18 isn’t trying to play fantasy football instead of you.',
      'It gives you a clearer board so you can make decisions without trying to hold the entire player pool in your head.',
      'And it is **deterministic** — a fancy word for a reassuring thing. The same board always gives you the same answer. No mood, no mystery, no different advice depending on when you opened it.',
      'Nothing dramatic happens if you fumble one. Every draft has a pick that goes sideways; [here is what to do when you miss yours](/scenarios/you-missed-your-pick).',
    ]},

    { type: 'prose', h2: 'Playing With People Who’ve Done This for Years?', body: [
      'That is most first drafts, and it is more survivable than it looks.',
      'Long-running leagues develop habits — the guy who always reaches for a quarterback, the one who hoards running backs — and those habits move the board in ways no ranking ever predicted. Being new mostly means you have no bad habits yet.',
      'If your league is one of those, the [home league draft assistant](/home-league-draft-assistant) page is written for exactly that table.',
    ]},

    { type: 'convert', h2: 'Walk Into the Draft Prepared.',
      body: ['Even if you started preparing five minutes ago — which is exactly what a [last-minute draft](/last-minute-fantasy-football-draft) looks like.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Can I use GREEN18 if I’ve never played fantasy football?', a: 'Yes. The product is designed to make the available player pool easier to navigate during the draft, and it applies the league rules and the current draft state on the manager’s behalf rather than requiring the manager to reason about them.' },
    { q: 'Does GREEN18 automatically make my picks?', a: 'No. You remain the manager. GREEN18 helps organize the decision.' },
    { q: 'Do I need to know fantasy football terminology?', a: 'Some basic understanding helps, but GREEN18 is designed to reduce the amount of information you need to manually process during the draft.' },
    { q: 'What is the single most useful idea for a first-time drafter?', a: 'A player is worth what he produces above the player you would otherwise take at the same position, which is called margin over replacement. A position with several similar players remaining is cheap to wait on, while a position with a steep quality drop after the next few players is expensive to wait on.' },
  ],

  links: [
    'draft-science/positional-scarcity',
    'home-league-draft-assistant',
    'last-minute-fantasy-football-draft',
    'live-fantasy-football-draft-assistant',
    'glossary',
  ],
};
