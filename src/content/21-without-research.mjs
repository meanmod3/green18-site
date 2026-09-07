// PAGE 21 — the casual / no-prep audience. Source doc §30 (verbatim yaml +
// copy), enriched with §8, §10, §26. Warm and lightly irreverent, never
// condescending. The "draft like an idiot" line is campaign-only — not used here.
export default {
  slug: 'fantasy-football-without-research',
  title: 'Fantasy Football Without Hours of Research | GREEN18',
  description: 'Joining a fantasy league without weeks of preparation? GREEN18 helps turn league settings and live draft context into a usable player board.',
  breadcrumb: 'Fantasy Football Without Research',

  hero: {
    eyebrow: 'For the Manager Who Didn’t Prepare',
    h1: 'Skip the Homework, Not the Draft.',
    lede: [
      'Your friends invited you to fantasy football. You said yes.',
      'Now the draft is tonight and apparently everyone else has been preparing since June.',
      '**You’re fine. GREEN18 turns the information that matters into a live player board while you draft.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Set up your league in a few minutes.',
    secondary: { label: 'What You Actually Need to Know', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'You Don’t Need to Know 300 Players.', body: [
      'You need to avoid bad decisions.',
      'GREEN18 helps narrow the player pool around:',
    ], list: [
      'who remains',
      'who fits your roster',
      'what your league rewards',
      'where positions are becoming scarce',
      'what may still be available later',
    ], after: ['That turns hundreds of names into a much smaller decision.'] },

    { type: 'prose', h2: 'Expertise Is Mostly Recognizing Context.', body: [
      'Fantasy football knowledge usually comes from accumulating hundreds of small observations over a summer.',
      'Which positions dry up quickly. Which stay deep. When a run matters and when it’s noise. When your roster can afford to wait, and when scarcity says it can’t.',
      'Experienced managers make those calls almost automatically. They aren’t reciting statistics — they’re recognizing relationships.',
      '**GREEN18 makes those relationships visible on the board.**',
      'You get the result of applying the expertise without first having to accumulate it.',
    ], quote: 'You don’t need more trivia. You need better decisions.' },

    { type: 'steps', h2: 'What Tonight Actually Looks Like', steps: [
      { h3: '1. Set the League.', body: ['Enter how your league scores and how many of each position you start. That is most of the setup.'] },
      { h3: '2. Say What Matters.', body: ['Add any players you want to target or avoid. If you have no opinions yet, skip it — the board works fine without them.'] },
      { h3: '3. Follow the Draft.', body: ['Record each player as they come off the board. GREEN18 recalculates what’s left after every pick.'] },
      { h3: '4. Make the Pick.', body: ['When your turn arrives, look at the top of the board. You don’t need to know every player — you need to know which of the available ones makes sense right now.'] },
    ]},

    { type: 'cards', h2: 'Look Prepared, Without Pretending You Were.', sub: 'Your friends can debate preseason depth charts. You can look at the live board.',
      cards: [
        { h3: 'No Summer Required', body: 'Setup takes minutes. The reasoning that usually takes months of listening is already built into the board.' },
        { h3: 'No Memorization', body: 'The board shows the players still available, ordered for your roster and your league. Reading it is the whole skill.' },
        { h3: 'No Nonsense', body: 'GREEN18 makes no season forecasts, predicts no injuries, and promises no outcome. It organizes the decision in front of you.' },
      ]},

    { type: 'prose', h2: 'Know Enough to Be Dangerous.', body: [
      'Sometimes you don’t want fantasy football to become a second job.',
      'You just want to join your friends, draft a competent team, understand what you’re doing, and avoid the pick everyone talks about for the next three years.',
      'That’s a completely reasonable goal, and GREEN18 is built for that person too.',
      'If it’s your first season, [start here](/fantasy-football-for-beginners). If the draft is in a few hours, [start here instead](/last-minute-fantasy-football-draft).',
    ]},

    { type: 'prose', h2: 'And If You Do Get Into It.', body: [
      'Plenty of people join a league casually and end up caring far more than they planned.',
      'The same board serves both. Newer managers use it to see which decisions make sense; experienced managers use it because [recomputing the board by hand after every pick](/fantasy-football-positional-scarcity) is the part nobody can actually do.',
      'Same engine. Different reason for wanting it.',
    ]},

    { type: 'convert', h2: 'Join the League. Keep Your Dignity.',
      body: ['You don’t have to have done the reading to draft a good team.', '**Download GREEN18 for iPhone and walk into tonight’s draft with a board that keeps up.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. No account required — your league stays on your device.' },
  ],

  faq: [
    { q: 'Can you draft a fantasy football team without doing research?', a: 'Yes. A draft is a series of choices between the players who are still available, so the practical requirement is being able to compare the remaining options rather than having memorized every player. A live draft board that accounts for league scoring, roster needs and the picks already made supplies that comparison during the draft itself.' },
    { q: 'How long does GREEN18 take to set up before a draft?', a: 'Setup is entering the league’s scoring rules and roster requirements, which typically takes a few minutes. Adding target players or players to avoid is optional. There is no account to create and no sign-in step.' },
    { q: 'Is GREEN18 useful if I have never played fantasy football?', a: 'Yes. GREEN18 shows the players still available ordered for the specific league and roster, so a first-time manager can make reasonable picks without first learning positional scarcity, tiers and replacement value. The manager still makes every selection themselves.' },
    { q: 'Does GREEN18 draft for me automatically?', a: 'No. GREEN18 does not auto-draft and does not connect to, sync with, or import from any fantasy platform. The user records each pick as it happens and makes every selection themselves in whichever platform hosts their league.' },
    { q: 'What do I actually need to know during the draft?', a: 'You need to know which of the currently available players best fits your roster and your league’s scoring, and whether waiting is likely to cost you. GREEN18 computes both from the picks recorded so far, so the decision on the clock is reading the board rather than recalling player research.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
    'last-minute-fantasy-football-draft',
    'fantasy-football-cheat-sheet-app',
    'personalized-fantasy-football-rankings',
  ],
};
