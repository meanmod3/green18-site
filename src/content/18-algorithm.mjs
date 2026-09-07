// PAGE 18 — methodology / trust page. Written to be citable: the pipeline in
// plain language, determinism, the objective/personal split, source discipline.
export default {
  slug: 'fantasy-football-draft-algorithm',
  title: 'How a Fantasy Football Draft Algorithm Works | GREEN18',
  description: 'The GREEN18 draft model in plain language: open football data, your league settings, recorded picks, survival odds, and take-now-or-wait.',
  breadcrumb: 'How the Draft Model Works',

  hero: {
    eyebrow: 'Methodology',
    h1: 'How a Fantasy Football Draft Algorithm Actually Works.',
    lede: [
      'Most draft tools ask you to trust a number. This page explains where the number comes from.',
      'GREEN18 runs a deterministic pipeline: open football data becomes player value, your league settings condition that value, recorded picks move it, and survival odds turn it into take now or wait.',
      '**No step in that chain is generated prose. Every step is computed.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See the Pipeline', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Determinism First.', body: [
      'The model is deterministic. The same inputs always produce the same output.',
      'Replay a draft and you replay the recommendations exactly.',
      'That is what makes the model checkable rather than merely persuasive.',
    ], quote: 'If you can’t reproduce it, you can’t audit it.' },

    { type: 'steps', h2: 'The Pipeline', steps: [
      { h3: '1. Open Football Data.', body: ['Player facts come from open football data — nflverse, credited under its CC-BY licence — plus the picks you record yourself. A hard allowlist rejects unapproved sources at build time.'] },
      { h3: '2. Your League Conditions Value.', body: ['Scoring rules and quarterback format are applied to the player pool. Superflex does not put a badge on quarterbacks; it genuinely re-ranks them against everyone else.'] },
      { h3: '3. Recorded Picks Move Live Value.', body: ['Each pick you record changes the value of everyone still on the board, driven by how fast that position is coming off the board and what the teams picking before your next turn actually need.'] },
      { h3: '4. Survival to Your Next Pick.', body: ['The model estimates each remaining player’s chance of still being there when you pick again, given the picks that sit between now and then.'] },
      { h3: '5. Take Now or Wait.', body: ['Value and survival combine into the only question that matters on the clock: is this player worth the pick now, or can you come back for them?'] },
    ]},

    { type: 'cards', h2: 'Three Properties Worth Naming.', cards: [
      { h3: 'Replayable', body: 'Every recommendation can be reproduced from the board that produced it.' },
      { h3: 'Separated', body: 'Your subjective preferences live in your personal rank only. They never move the objective market values.' },
      { h3: 'Sourced', body: 'Player facts come from open football data and your own recorded observations. Nothing else gets in.' },
    ]},

    { type: 'prose', h2: 'Objective and Personal Are Not the Same Column.', body: [
      'You will always like some players more than the numbers do. That is fine.',
      'GREEN18 keeps those opinions in your own personal rank.',
      'They never leak into the objective values the model computes.',
      'So you can see both at once: what the board says, and what you think.',
      'A tool that quietly folds your bias into its “objective” number is telling you what you already believe.',
    ]},

    { type: 'prose', h2: 'What the Model Does Not Do.', body: [
      'It does not forecast the NFL season.',
      'It does not predict injuries.',
      'It does not guarantee an outcome.',
      'It does not generate explanations as text — the components are named and shown, not written.',
      'It does not make the pick. See [automated draft tools](/automated-fantasy-football-draft-tool) for exactly where that line is drawn.',
    ]},

    { type: 'prose', h2: 'Why This Beats a Static Ranking.', body: [
      'A preseason ranking answers one question, once, before any information exists.',
      'This pipeline answers it again after every pick.',
      'That is the difference between [a ranking and a live board](/live-fantasy-football-draft-assistant) — and why [ADP is the starting line, not the answer](/dynamic-fantasy-football-adp).',
      'Recomputation after a pick is effectively instant, so the board is never behind your draft.',
    ]},

    { type: 'convert', h2: 'See the Model Run.',
      body: ['The methodology is only useful in a draft.', '**Download GREEN18 for iPhone and watch the board recompute pick by pick.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How does a fantasy football draft algorithm work?', a: 'A draft model turns player data into a value for each available player, adjusts that value for the specific league’s scoring and roster rules, updates it as picks are recorded, and then estimates whether each player will still be available at the user’s next pick. The output is a take-now-or-wait decision rather than a fixed ranking.' },
    { q: 'What data does the GREEN18 model use?', a: 'Player facts come from open football data — nflverse, credited under its CC-BY licence — combined with the draft picks the user records during their own draft. A hard allowlist rejects any source that has not been approved, and it is enforced when the app is built.' },
    { q: 'Is the GREEN18 model deterministic?', a: 'Yes. The same league settings and the same sequence of recorded picks always produce the same recommendation. Recommendations are replayable, which means any change in the board can be traced to a change in the inputs rather than to randomness in the model.' },
    { q: 'Do a user’s own player preferences change the objective values?', a: 'No. Subjective preferences are confined to the user’s personal rank. They are displayed alongside the computed values but never alter them, so the objective view of the market stays independent of what the user hopes is true.' },
    { q: 'How do league settings change player value?', a: 'Scoring rules and quarterback format are applied before the board is built, so they re-rank players rather than relabel them. A Superflex league, for example, changes how quarterbacks compare against every other position, not just how they are grouped.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'ai-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'superflex-draft-assistant',
    'automated-fantasy-football-draft-tool',
  ],
};
