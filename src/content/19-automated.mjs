// PAGE 19 — "automated draft tool". Leads with the honest limit: GREEN18 does
// not auto-draft and does not connect to any platform. Automate the math.
export default {
  slug: 'automated-fantasy-football-draft-tool',
  title: 'Automated Fantasy Football Draft Tool | GREEN18',
  description: 'GREEN18 automates the math, not the decision. It does not auto-draft or connect to any platform — you record picks and you make the call.',
  breadcrumb: 'Automated Draft Tool',

  hero: {
    eyebrow: 'Automate the Math, Not the Decision',
    h1: 'An Automated Draft Tool That Automates the Right Half of the Draft.',
    lede: [
      'Straight answer first: GREEN18 does not draft for you. It does not connect to your fantasy platform and it never submits a pick.',
      'What it automates is the part you cannot do on a sixty-second clock — recomputing what every remaining player is worth the instant the board changes.',
      '**The arithmetic is automatic. The pick is yours.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. An independent companion — no platform connection.',
    secondary: { label: 'See What Is Automated', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'What GREEN18 Does Not Do.', body: [
      'It does not auto-draft.',
      'It does not connect to, sync with, or import from any fantasy platform.',
      'It does not queue picks or submit them on your behalf.',
      'You record the picks as they happen. You make the call.',
      'Anyone promising the rest is promising something else.',
    ]},

    { type: 'prose', h2: 'Why Autopilot Is the Wrong Ask.', body: [
      'An autodraft already exists in every league. It is what happens when you fall asleep.',
      'Nobody wants it. They want the work removed, not the judgement.',
      'The work is the recalculation.',
    ], quote: 'You don’t want the pick made for you. You want the math done before you decide.' },

    { type: 'cards', h2: 'Automated. Manual. On Purpose.', cards: [
      { h3: 'Automated: Recomputation', body: 'Record a pick and every remaining player’s live value updates. It is effectively instant.' },
      { h3: 'Automated: Survival Odds', body: 'The chance a player lasts to your next turn is recalculated from the picks that sit between now and then.' },
      { h3: 'Manual: The Decision', body: 'You see take-now-or-wait and you choose. GREEN18 never selects for you.' },
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Scoring and quarterback format genuinely re-rank the pool before the first pick.'] },
      { h3: 'Shape Your Preferences.', body: ['Your own take lives in your personal rank. It never moves the objective values.'] },
      { h3: 'Record the Picks.', body: ['Tap each player off as they go. This is the one manual habit the tool asks of you, and it is what keeps the board honest.'] },
      { h3: 'Make the Pick.', body: ['Read the updated board, decide, and enter the pick in your league yourself.'] },
    ]},

    { type: 'prose', h2: 'Deterministic, So You Can Actually Check It.', body: [
      'The same board and the same league settings always produce the same output.',
      'Nothing is generated. Everything is computed from named components.',
      'That means a recommendation you disagree with can be inspected rather than argued with — the [full pipeline is documented](/fantasy-football-draft-algorithm).',
      'It also means [there is no chatbot in the loop](/ai-fantasy-football-draft-assistant) inventing a fresh opinion each time you look.',
    ]},

    { type: 'prose', h2: 'Independent by Design.', body: [
      'No account linking. No platform credentials. No import.',
      'Keep GREEN18 open beside whatever app your league drafts in.',
      'That is a smaller surface, and a clearer one.',
    ]},

    { type: 'convert', h2: 'Automate the Math.',
      body: ['Let the recalculation happen on its own. Keep the decision.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Independent of any fantasy platform.' },
  ],

  faq: [
    { q: 'Does GREEN18 automatically draft for me?', a: 'No. GREEN18 never makes or submits a pick. It recomputes the value of the remaining players after each pick you record, and you decide who to take and enter that pick in your own league.' },
    { q: 'Does GREEN18 connect to my fantasy football platform?', a: 'No. GREEN18 does not link accounts, sync drafts, or import picks from any fantasy platform. It is an independent companion app that you keep open beside wherever your league drafts, and you record picks yourself as they happen.' },
    { q: 'What part of the draft is actually automated?', a: 'The calculation. Each time a pick is recorded, GREEN18 recomputes every remaining player’s live value and their chance of surviving to your next pick, using your league’s settings and the picks that have already happened. The recomputation is effectively instant.' },
    { q: 'Why do I have to record picks manually?', a: 'Because GREEN18 has no connection to your league, recording each selection is how the model learns what has actually happened in your draft. It is a single tap per pick, and it is what keeps the board matched to the real draft rather than to a preseason estimate.' },
    { q: 'Will an automated draft tool guarantee a better team?', a: 'No tool can guarantee a draft outcome, and GREEN18 makes no such claim. What it provides is a repeatable, computed view of what the remaining players are worth in your specific league at the moment you are on the clock.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'ai-fantasy-football-draft-assistant',
    'fantasy-football-draft-algorithm',
    'live-fantasy-football-draft-assistant',
    'fantasy-football-draft-strategy-app',
  ],
};
