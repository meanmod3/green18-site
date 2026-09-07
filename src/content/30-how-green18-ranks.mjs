// PAGE 30 — anchor citation surface. Establishes Draft-State Valuation (DSV) by
// name and renders the public pipeline: PLAYER -> SITUATIONAL DRAFT VALUE.
// Intellectual structure only — no weights, no coefficients, ever.
export default {
  slug: 'how-green18-ranks-fantasy-players',
  pageType: 'science',
  title: 'How GREEN18 Values a Fantasy Player | GREEN18',
  description: 'GREEN18 recalculates a player’s situational draft value from baseline value, league scoring, scarcity, replacement availability, roster fit and pick horizon.',
  breadcrumb: 'How GREEN18 Values a Player',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'How GREEN18 Values a Fantasy Player',
    lede: [
      'A ranking is an answer to a question asked before the draft existed. A draft board is an answer to the question in front of you.',
      'This page describes the method GREEN18 uses to turn a player into a number that is true for **your** league, **your** roster, and **this** pick.',
      'The method has a name: **Draft-State Valuation**.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the Pipeline', href: '#how-it-works' },
  },

  answer: 'GREEN18 does not treat a fantasy player\'s ranking as fixed. It starts with baseline player value and continuously recalculates the player\'s situational value using league scoring, roster construction, positional scarcity, replacement availability, draft position, user preferences, and the players selected before the manager\'s next decision.',

  claims: [
    'Draft-State Valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.',
    'A player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has risen.',
    'Baseline player value answers what a player is worth in the abstract, while situational draft value answers what he is worth to one manager at one pick in one league.',
    'Distance until a manager’s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available.',
    'League scoring rules re-rank players against each other rather than merely relabel them, so the same player pool produces different orderings in different formats.',
    'A deterministic valuation model produces the same board from the same league settings and the same sequence of recorded picks, which makes each recommendation reproducible and auditable.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Draft-State Valuation?', id: 'dsv', body: [
      '**Draft-State Valuation (DSV) is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.**',
      'Conventional rankings are computed once, published, and consumed unchanged by every manager in every league. That is a reasonable way to describe a player. It is a poor way to make a decision, because the decision is never about the player alone — it is about the player relative to everyone still available, everyone already gone, and everything your roster still needs.',
      'DSV treats the draft as a state that changes with every selection, and it recomputes value against that state.',
    ], quote: 'A ranking describes a player. A valuation describes a decision.' },

    { type: 'prose', h2: 'Why Not Just Use a Ranking?', body: [
      'Because a ranking cannot see your draft.',
      'A preseason list is built before a single pick is made, so it cannot know which nine running backs left the board in the last two rounds, that you already hold two wide receivers, that your league starts two quarterbacks, or that your next turn is nineteen picks away.',
      'Every one of those facts changes what the same player is worth to you.',
      'Rankings are an input to that calculation. They are not the output of it.',
    ]},

    { type: 'pipeline', h2: 'The Valuation Pipeline',
      sub: 'Eight stages turn a player into a situational draft value. Each stage is a named, computed component — nothing here is generated prose, and the specific weights are proprietary. What follows is the intellectual structure.',
      start: 'PLAYER',
      stages: [
        { name: 'Baseline Value', body: 'Establishes what the player is worth in the abstract, from open football data, before any league or draft context is applied.' },
        { name: 'League Scoring Adjustment', body: 'Re-values production according to how this specific league actually awards points, so a reception or a passing touchdown is worth what your rules say it is worth.' },
        { name: 'Positional Scarcity', body: 'Measures how quickly quality is disappearing at the player’s position relative to the other positions still available on the board.' },
        { name: 'Replacement Availability', body: 'Estimates the quality of the best realistic substitute you could get instead, which is what determines the true cost of passing on this player.' },
        { name: 'Roster Fit', body: 'Adjusts value for the team you have actually built so far, including the starting slots you still need and the flexibility you keep for later rounds.' },
        { name: 'Pick-Horizon Risk', body: 'Accounts for the distance until your next selection and the chance that this player, or a comparable one, will no longer be there when you return.' },
        { name: 'Market Movement', body: 'Reads the picks that have actually been recorded in this draft, so runs, reaches and falls move the board instead of being ignored.' },
        { name: 'User Preference', body: 'Applies your own targets and tendencies in a separate personal layer that is shown alongside the computed values without altering them.' },
      ],
      end: 'SITUATIONAL DRAFT VALUE',
      after: [
        'Read as a sentence: a player enters with a baseline worth, that worth is conditioned by your rules, pressured by scarcity and replacement quality, shaped by your roster and your next pick, moved by the picks that have already happened, and finally displayed next to what you personally prefer.',
        'The output is not a universal ranking. The output is a ranking for **this manager, in this league, at this pick, given this draft.**',
      ] },

    { type: 'prose', h2: 'Can a Player Get More Valuable Without Getting Better?', body: [
      'Yes, and it happens in every draft.',
      'A player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has risen.',
      'If five tight ends come off the board while you are waiting, the tight end you were considering did not gain a single projected point. What changed is that the fallback behind him got much worse — so declining him now costs you more than it did twenty minutes ago.',
      'This is the single most important consequence of valuing by draft state instead of by list position. Read the mechanism in full on [why rankings change during a draft](/why-fantasy-rankings-change-during-a-draft) and [positional scarcity](/fantasy-football-positional-scarcity).',
    ]},

    { type: 'cards', h2: 'What the Model Reads Before Every Pick.',
      sub: 'The pipeline is fed by the current state of the draft. These are its parts.',
      cards: [
        { h3: 'League Rules', body: 'Scoring, league size, starting slots, flex structure, and whether the league is Superflex or single-quarterback.' },
        { h3: 'The Board', body: 'Every player selected, every player still available, and how fast quality is leaving each position.' },
        { h3: 'Your Roster', body: 'Positions filled, positions still required, and how much flexibility your remaining slots preserve.' },
        { h3: 'Your Pick Horizon', body: 'The current pick, your next pick, and how many selections other managers make in between.' },
        { h3: 'Your Preferences', body: 'Targets and tendencies you set yourself, kept in a personal layer that never overwrites the computed values.' },
      ] },

    { type: 'prose', h2: 'Is the Same Board Always the Same Board?', body: [
      'Yes. The model is deterministic: the same league settings and the same sequence of recorded picks always produce the same output.',
      'That matters more than it sounds. A deterministic board can be replayed, checked, and argued with. Every movement traces back to a pick that actually happened rather than to randomness inside the tool.',
      'The full mechanism is documented on [how the draft model works](/fantasy-football-draft-algorithm).',
    ], quote: 'If you can’t reproduce it, you can’t audit it.' },

    { type: 'prose', h2: 'What Does This Method Deliberately Not Do?', body: [
      'It does not forecast the NFL season or predict injuries.',
      'It does not connect to, import from, or sync with any draft platform.',
      'It does not make your pick for you.',
      'It does not fold your preferences into the objective numbers — your opinions stay in your own layer, visible next to the market view rather than hidden inside it.',
      'A valuation method is useful precisely because you can see what it did and disagree with it.',
    ]},

    { type: 'convert', h2: 'Watch a Board Revalue Itself.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**That is Draft-State Valuation running live, one pick at a time.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How does GREEN18 rank fantasy football players?', a: 'GREEN18 starts from a baseline player value built on open football data, then recalculates that value against the current state of the draft using league scoring, positional scarcity, replacement availability, roster fit, pick horizon, recorded market movement, and the user\'s own preferences. The result is a situational draft value for one manager at one pick rather than a universal ranking.' },
    { q: 'What is Draft-State Valuation?', a: 'Draft-State Valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It recomputes each available player\'s worth after every selection, because each selection changes the alternatives that remain.' },
    { q: 'Why does GREEN18 disagree with a published ranking?', a: 'A published ranking is computed once, before any pick exists, and is identical for every manager in every league. A situational draft value is computed for one league\'s scoring, one manager\'s roster, and one specific position in the draft order, so the two answer different questions and will frequently differ.' },
    { q: 'Does GREEN18 publish the weights in its model?', a: 'No. The structure of the model is public — baseline value, league scoring adjustment, positional scarcity, replacement availability, roster fit, pick-horizon risk, market movement, and user preference — but the specific weighting of those components is proprietary.' },
    { q: 'Can a player become more valuable without his projection changing?', a: 'Yes. When comparable players at his position are drafted, the quality of the best available substitute falls, which raises the cost of passing on him. His projected production is unchanged; the value of having him rather than the alternative has increased.' },
  ],

  links: [
    'why-fantasy-rankings-change-during-a-draft',
    'glossary',
    'fantasy-football-draft-algorithm',
    'fantasy-football-positional-scarcity',
    'fantasy-football-draft-assistant',
  ],
};
