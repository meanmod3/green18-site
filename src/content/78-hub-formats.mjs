// The League Formats hub.
//
// This page existed as a breadcrumb and in three BreadcrumbList graphs before
// it existed as a page: `formats` was added to SECTION_NAMES in layout.mjs, so
// every /formats/* page rendered a crumb pointing at /formats/ — which
// returned 404 on both hosts. A structured-data graph asserting a URL that
// does not resolve is worse than a missing link, because it tells a crawler
// something untrue.
export default {
  slug: 'formats',
  pageType: 'science',
  title: 'Fantasy Football League Formats | GREEN18',
  description: 'How scoring rules and roster requirements change what a fantasy player is worth, and why format is a valuation input rather than a detail.',
  breadcrumb: 'League Formats',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'League Formats',
    h1: 'Your League’s Format Is a Valuation Input.',
    lede: [
      'A format is not a preference setting. It decides how production converts into points, and how many players at each position must be started.',
      'Both of those change which players clear replacement level — which changes the order of the board, not just the size of the numbers on it.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A fantasy football league format is the combination of scoring rules and roster requirements that determines how on-field production becomes fantasy points and how many players at each position every team must start. Format changes player value in two distinct ways: scoring changes which players clear the replacement baseline at their position, and roster requirements change how deep that baseline sits. Both reorder a draft board rather than merely scaling it.',

  claims: [
    'A league format changes player value through two separate mechanisms: scoring converts production into points, and roster requirements set how many players at each position must be started.',
    'Scoring rules reorder players within a position by rewarding a specific kind of production, rather than raising every player at that position equally.',
    'Roster requirements set the depth of the replacement baseline, so the same scoring rules produce different player values in leagues of different sizes or starting configurations.',
    'A format that changes only how many quarterbacks may be started can move quarterback value more than any scoring rule, because it changes demand rather than points.',
  ],

  blocks: [
    { type: 'cards', h2: 'The two mechanisms, kept separate',
      sub: 'Most format confusion comes from treating these as one thing. They are not, and they can pull in opposite directions.',
      cards: [
        { h3: 'Scoring changes WHO clears the bar',
          body: 'A per-reception rule rewards catch volume, so it separates players who are otherwise comparable. See [PPR](/formats/ppr) and [standard scoring](/formats/standard).' },
        { h3: 'Roster rules change WHERE the bar sits',
          body: 'Starting requirements multiplied by league size set how deep [replacement level](/draft-science/replacement-value) reaches at each position.' },
        { h3: 'Quarterback format changes DEMAND',
          body: '[Superflex](/formats/superflex) can nearly double how many quarterbacks must be started without doubling how many are worth starting.' },
      ]},

    { type: 'prose', h2: 'Why format is not a detail',
      body: [
        'A universal ranking has to assume a format. Yours is not an assumption.',
        'If a ranking was built for full PPR and your league is standard, it is not slightly wrong — it is answering a different question, because the production it rewarded most is production your league does not pay for.',
        'This is why [draft-state valuation](/draft-science/draft-state-valuation) treats league configuration as an input rather than a filter applied afterwards.',
      ] },

    { type: 'prose', h2: 'The three formats explained here',
      body: [
        '**[Superflex](/formats/superflex)** — what the slot actually permits, how it differs from a 2QB league, and why it re-prices quarterbacks structurally.',
        '**[PPR](/formats/ppr)** — how a per-catch bonus re-sorts players within a position instead of lifting all pass-catchers.',
        '**[Standard scoring](/formats/standard)** — why removing the reception bonus is not simply PPR minus a rule.',
        'For the quarterback mechanism in depth, see [Superflex quarterback value](/draft-science/superflex-quarterback-value). To work a specific case, use the [replacement level calculator](/tools/league-value-calculator) or the [PPR value adjustment calculator](/tools/ppr-value-adjustment-calculator).',
      ] },

    { type: 'convert', h2: 'Draft the league you actually joined.',
      body: [
        'GREEN18 starts from the scoring and roster settings you configure, so the board reflects your format rather than an assumed one.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'What is a fantasy football league format?', a: 'A league format is the combination of scoring rules and roster requirements a league plays under. Scoring determines how on-field production converts into fantasy points; roster requirements determine how many players at each position each team must start. Together they decide what any given player is worth in that league.' },
    { q: 'Does league format change fantasy rankings?', a: 'Yes. Scoring rules change which players clear the replacement baseline at their position, and roster requirements change how deep that baseline sits. Both effects reorder a board rather than scaling every value equally, so a ranking built for one format can be materially wrong in another.' },
    { q: 'Which format setting changes player value the most?', a: 'The quarterback configuration usually has the largest single effect. A Superflex or 2QB league changes how many quarterbacks must be started rather than how many points they score, and demand that exceeds the supply of clearly startable quarterbacks moves the position further than most scoring rules move any position.' },
  ],

  links: ['formats/superflex', 'formats/ppr', 'formats/standard',
          'draft-science/superflex-quarterback-value', 'tools/league-value-calculator'],
};
