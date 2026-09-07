// PAGE 12 — LAST MINUTE.
export default {
  slug: 'last-minute-fantasy-football-draft',
  title: 'Draft Tonight? Get Fantasy Football Help Fast | GREEN18',
  description: 'Have a fantasy football draft tonight? Set up GREEN18, configure your league and take a live player board into the draft.',
  breadcrumb: 'Last-Minute Drafts',

  hero: {
    eyebrow: 'Live Fantasy Draft Intelligence',
    h1: 'Your Draft Is Tonight. That’s Enough Time.',
    lede: [
      'You don’t need to read 200 player profiles before your league starts drafting.',
      'You need a way to make better decisions when you’re on the clock.',
      '**GREEN18 was built for exactly that.**',
    ],
    cta: 'Download GREEN18 Now',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Skip the Crash Course.', body: [
      'Set up the league.',
      'Set your preferences.',
      'Open the draft.',
      'Start removing players as they’re selected.',
      'GREEN18 keeps the remaining options organized as the board develops, ordered by its own projected draft position for your league format and updated by every pick you record.',
      'Drafting for the first time? Read [fantasy football for beginners](/fantasy-football-for-beginners).',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Tell GREEN18 how your league actually works — scoring, roster structure, format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you. No universal list required.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them from the board. GREEN18 recalculates the remaining opportunity.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of tabs opened an hour ago.'] },
    ]},

    { type: 'prose', h2: 'Preparation Is Great. Adaptation Is Better.', body: [
      'Everyone enters the draft with a plan.',
      'Then the picks start, and a plan built on preseason ranks starts describing a board that no longer exists.',
      'A run empties the top of one position while every other position stays where it was. That is **positional scarcity** arriving in real time, and no amount of overnight reading would have told you when. GREEN18 handles what actually happens — [why rankings change during a draft](/why-fantasy-rankings-change-during-a-draft) is the same idea at rest.',
    ]},

    { type: 'prose', h2: 'Draft Starts Soon?', body: [
      'Good.',
      'You do not need to know the whole player pool. You need to know your next decision, and one number does most of the work: your **pick horizon**, the number of selections before you are back on the clock.',
      'A long horizon means the position thinning in front of you may be gone entirely by your turn, so waiting is expensive. A short one means you can take the steepest value now and clean up in two picks. The [pick horizon calculator](/tools/pick-horizon-calculator) prices that before you sit down.',
      'GREEN18 keeps the focus on the players who are still available — and it is deterministic, so the board never changes its mind on you mid-clock.',
    ]},

    { type: 'prose', h2: 'And If Tonight Goes Sideways?', body: [
      'It happens to prepared managers too. The clock runs out, the connection drops, someone takes the player you were three seconds from selecting.',
      'None of it is fatal, because value is recalculated from the board that exists, not the one you planned for. [If you missed your pick](/scenarios/you-missed-your-pick) covers the recovery.',
    ]},

    { type: 'convert', h2: 'Draft the Board That’s Actually in Front of You.',
      body: [
        'Not the one someone ranked three weeks ago.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Can I set up GREEN18 the day of my draft?', a: 'Yes. Configure your league settings and preferences in GREEN18, then open it beside your draft and start removing players as they are selected.' },
    { q: 'Do I need to study rankings before I use GREEN18?', a: 'Some basic understanding helps, but GREEN18 is designed to reduce the amount of information you need to manually process during the draft.' },
    { q: 'Can I use GREEN18 with the league I already play in?', a: 'GREEN18 is designed to work alongside the league where you already play. Configure the relevant league settings in GREEN18 and use it during your draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
    'live-fantasy-football-draft-assistant',
    'draft-science/pick-horizon',
    'tools/pick-horizon-calculator',
    'scenarios/you-missed-your-pick',
  ],
};
