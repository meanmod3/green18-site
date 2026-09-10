// PAGE 06 — SUPERFLEX. League-format CONVERSION page: using GREEN18 in Superflex.
// The format's RULES and repricing mechanics live on /formats/superflex and
// /draft-science/superflex-quarterback-value — link there, never restate them.
export default {
  slug: 'superflex-draft-assistant',
  title: 'Superflex Fantasy Football Draft Assistant | GREEN18',
  description: 'Draft quarterbacks and skill players in context with a live Superflex fantasy football draft board from GREEN18.',
  breadcrumb: 'Superflex Draft Assistant',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Superflex Draft Format',
    h1: 'Superflex Changes Everything.',
    lede: [
      'In Superflex, quarterback value doesn’t exist in isolation.',
      'It depends on how many quarterbacks are already gone, how aggressively your league is drafting them, and what’s still available everywhere else.',
      '**That’s exactly why a static overall ranking can become dangerous.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'Quarterback Value Is a Moving Target.', body: [
      'In a Superflex league, one pick can reprice the entire quarterback room.',
      'The format does that by moving **replacement level** — the format itself creates more starting slots than there are quarterbacks worth starting, so the alternative to owning one gets much worse. [Why Superflex reprices the position](/draft-science/superflex-quarterback-value) works through the arithmetic; [the format rules](/formats/superflex) cover eligibility and settings.',
      'What is left for the draft room is everything that ranking cannot fix in advance:',
    ], list: [
      'how many quarterbacks are already gone',
      'how aggressively your league is drafting them',
      'how many viable starters remain above the next tier',
      'your roster',
      'your pick horizon — how many picks until you choose again',
      'the skill-position value still available',
    ], after: ['A single overall ranking cannot see any of that. GREEN18 is built for it — the way a [live draft assistant](/live-fantasy-football-draft-assistant) should be.'] },

    { type: 'prose', h2: 'Don’t Automatically Draft the Quarterback.', body: [
      'Don’t automatically fade the quarterback either.',
      'Superflex strategy is contextual. If the league attacks quarterback early, **positional scarcity** changes — the drop behind the best remaining quarterback steepens relative to every other position. If quarterbacks slide, the **opportunity cost** of taking one falls instead.',
      'Both are the same measurement running in opposite directions, and both are answered by the board in front of you rather than by a preset script. [When quarterbacks fall in Superflex](/scenarios/quarterbacks-falling-in-superflex) is the second case, pick by pick.',
      'GREEN18 keeps the board responsive instead of forcing every Superflex draft into the same plan.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring, roster structure and format — including the Superflex spot that moves replacement level for the whole quarterback position.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Position groups tighten. Tiers collapse. The board keeps moving.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of rankings, notes and tabs. Same board in, same answer out — the model is deterministic.'] },
    ]},

    { type: 'prose', h2: 'React to the QB Room.', body: [
      'Your league tells you how aggressively you need to respond.',
      'A quarterback run is scarcity becoming visible in real time, and the cost of missing it is paid at your next pick, not at this one. GREEN18 keeps that information in the player board while the draft is unfolding, and the [Superflex quarterback demand calculator](/tools/superflex-qb-demand-calculator) shows how deep your league’s settings push the startable pool before you ever sit down.',
      'Public expectations are only where the room started — [ADP is a starting line, not the answer](/dynamic-fantasy-football-adp).',
    ], quote: 'How many viable starters are actually left?' },

    { type: 'convert', h2: 'Superflex Requires a Live Board.',
      body: ['Quarterback scarcity moves faster than a printed ranking.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Is GREEN18 built for Superflex leagues?', a: 'Yes. GREEN18 supports league-contextual drafting, including Superflex formats where the number of quarterback starting slots moves replacement level for the entire position and therefore changes every quarterback valuation on the board.' },
    { q: 'Should I always draft quarterbacks early in Superflex?', a: 'Not necessarily. Quarterback value is high in many Superflex formats, but the correct decision still depends on league size, scoring, the players actually remaining, your roster, how many picks until your next selection, and how the room is drafting.' },
    { q: 'Why is a live board useful in Superflex?', a: 'Quarterback scarcity can change within a handful of picks in Superflex, because a single run removes the top of a pool the whole league must start from twice. A board that recalculates after each recorded pick makes that change visible while there is still time to respond to it.' },
  ],

  links: [
    'formats/superflex',
    'draft-science/superflex-quarterback-value',
    'tools/superflex-qb-demand-calculator',
    'live-fantasy-football-draft-assistant',
    'ppr-draft-assistant',
  ],
};
