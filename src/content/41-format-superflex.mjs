// PAGE 41 — formats/superflex. Deliberately NOT the QB-valuation argument
// (that is draft-science/superflex-quarterback-value) and NOT the conversion
// page (/superflex-draft-assistant). This is the FORMAT: the exact rule, its
// variants, and the knock-on effect on the positions that are not quarterback.
export default {
  slug: 'formats/superflex',
  pageType: 'science',
  title: 'Superflex Format Explained | GREEN18',
  description: 'What the Superflex roster rule is, how it differs from 2QB and standard flex, and how one extra eligible slot reorders every position on the draft board.',
  breadcrumb: 'Superflex',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'League Formats',
    h1: 'What Is the Superflex Format in Fantasy Football?',
    lede: [
      'Superflex is one line in a league\'s roster settings: a flex slot that also accepts a quarterback.',
      'It changes no scoring rule and no player projection. It changes which players a team is allowed to start — and that is enough to reorder the entire draft.',
      '**Superflex is a roster rule with the consequences of a scoring rule.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See What Changes by Position', href: '#how-it-works' },
  },

  answer: 'Superflex is a fantasy football roster format in which one flex starting slot may be filled by a quarterback as well as by a running back, wide receiver or tight end. It is a roster-eligibility rule rather than a scoring rule: no player scores differently in Superflex than in a single-quarterback league. Because a starting quarterback typically outscores a flex-level skill player, nearly every team chooses to use the slot on a second quarterback, which roughly doubles league-wide demand for a position whose supply is fixed. The result is a draft board reordered across every position, not merely a quarterback board moved upward.',

  claims: [
    'Superflex is a roster-eligibility rule that permits a flex slot to be filled by a quarterback, rather than a change to how any player scores.',
    'A Superflex team is permitted but never required to start a second quarterback, which distinguishes the format from a 2QB league that mandates two.',
    'The Superflex rule changes the number of players eligible for one starting slot, and therefore changes league-wide demand rather than individual player production.',
    'Skill positions become comparatively cheaper in Superflex, because roster capital that would otherwise buy running backs and receivers is spent on quarterbacks.',
    'League size interacts with the Superflex rule, since demand for quarterbacks scales with the number of teams while the supply of viable starters does not.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Exactly Does the Rule Say?', body: [
      '**A Superflex slot is a starting position whose eligible positions are quarterback, running back, wide receiver and tight end.**',
      'An ordinary flex slot accepts running backs, wide receivers and tight ends. Superflex adds quarterback to that list. That is the complete difference.',
      'Everything else in the league is untouched. Scoring is whatever your league already uses. Bench size, waiver rules, and every other roster slot are unchanged.',
      'The rule is permissive, not mandatory. A Superflex team may start one quarterback and a running back in the flex if that is what its roster supports. Almost none do, because a starting quarterback in most scoring systems outproduces a flex-level skill player by a wide margin — and that voluntary, near-universal choice is what gives the rule its force.',
    ], quote: 'The rule permits a second quarterback. Economics makes it compulsory.' },

    { type: 'prose', h2: 'How Is Superflex Different From a 2QB League?', body: [
      '**A 2QB league requires two quarterbacks in the lineup. Superflex allows a second one.**',
      'The distinction sounds academic and matters in exactly one situation: when a team\'s second quarterback is unavailable or has a bad matchup.',
      'In a 2QB league, that team must start a quarterback anyway, however poor. In Superflex, it can start a skill player in the slot instead and lose less.',
      'That escape hatch slightly reduces the desperation of the format. It puts a floor under how badly a Superflex team can be punished for missing the position, and it is the reason Superflex has become the more common of the two.',
      'Superflex should also not be confused with a league that simply starts a flex. A standard flex increases demand for skill players marginally. A Superflex slot introduces demand for a position that previously had none to spare.',
    ]},

    { type: 'table', h2: 'What Changes for Each Position?', id: 'how-it-works', sub: 'The knock-on effects of one eligibility change, in a twelve-team league.',
      columns: ['Position', 'What changes', 'Why'],
      rows: [
        ['Quarterback', 'Rises sharply and gets drafted far earlier', 'Starting demand can double against a fixed supply of viable starters'],
        ['Running back', 'Becomes comparatively cheaper', 'Roster capital that would have bought backs is spent on quarterbacks'],
        ['Wide receiver', 'Becomes comparatively cheaper, with depth surviving longer', 'The deepest position absorbs the delay best, so quality lasts into later rounds'],
        ['Tight end', 'Least affected in absolute terms, most affected in timing', 'The position is already thin, and the rounds it is usually drafted in are now contested by quarterbacks'],
      ],
      note: 'No player in this table scores a single extra point in Superflex. Every movement here is a change in what the alternatives cost.' },

    { type: 'prose', h2: 'Why Do Skill Positions Get Cheaper?', body: [
      '**Because a draft is a fixed budget of picks, and Superflex forces more of that budget into one position.**',
      'Every manager has the same number of selections regardless of format. If quarterbacks now consume two of the first six rounds for most teams, then running backs and receivers who would have gone in those rounds are still on the board later.',
      'The players did not decline. The competition for them thinned, because a large share of the room is busy elsewhere.',
      'This is the most reliably underused edge in the format. Managers arrive at a Superflex draft focused on not missing quarterbacks — correctly — and then treat the skill positions with single-quarterback urgency, paying single-quarterback prices for players the room is no longer bidding on.',
      'The mechanism by which a position gets cheaper as competition for it declines is [opportunity cost](/draft-science/opportunity-cost) working in your favor.',
    ]},

    { type: 'prose', h2: 'How Does League Size Change a Superflex Draft?', body: [
      '**Demand scales with the number of teams. Supply does not.**',
      'The supply of quarterbacks capable of starting is a property of professional football, and it is the same number in a ten-team league and a fourteen-team league.',
      'Starting demand is not. Each additional team adds up to two more quarterback slots, so a fourteen-team Superflex league is materially more constrained than a ten-team one — even though the format setting reads identically.',
      'In a smaller Superflex league the position is genuinely scarce but survivable, and a manager who misses early can still assemble two functional starters. In a larger one, the useful supply can be exhausted, and the last teams to address the position may be starting quarterbacks who are not starters in real life.',
      'This is why "Superflex strategy" advice that does not mention league size is incomplete: the same format produces different degrees of scarcity depending on how many claims are made on the same pool.',
    ], quote: 'Superflex scarcity is not a property of the format. It is a property of the format times the number of teams.' },

    { type: 'prose', h2: 'Where Should You Read Next?', body: [
      'The mechanism behind all of this — why doubling the slots reprices the whole position instead of merely raising it — is set out in [Superflex quarterback value](/draft-science/superflex-quarterback-value). That page explains replacement level; this one explains the rule that moves it.',
      'For the situation where the room drains the position faster than you expected, see [the Superflex quarterback run](/scenarios/superflex-quarterback-run). For the opposite and more profitable situation, see [quarterbacks falling in Superflex](/scenarios/quarterbacks-falling-in-superflex).',
      'If you want to compare the format against scoring-driven formats, [PPR](/formats/ppr) changes which players clear replacement level, while Superflex changes how many players must clear it.',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Handle the Superflex Setting?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'Superflex is a league setting, so it is applied before the board is built. The number of quarterback slots your league can demand is part of the valuation from the first pick, not a modifier applied to a single-quarterback ranking.',
      'From there the board responds to your actual room: how many quarterbacks have gone, how many teams still need one, how deep the remaining supply is, and how far away your next pick is.',
      'If you are looking for the product overview rather than the format explanation, that is the [Superflex draft assistant](/superflex-draft-assistant) page.',
    ]},

    { type: 'convert', h2: 'One Extra Eligible Position. A Different Draft.',
      body: ['Superflex does not need a new set of rankings. It needs a board that knows how many quarterbacks your league can start.', '**Download GREEN18 for iPhone and set the format before the first pick.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What does Superflex mean in fantasy football?', a: 'Superflex means a league has a flex starting slot that accepts a quarterback in addition to running backs, wide receivers and tight ends. It is a roster-eligibility rule rather than a scoring rule, so no player scores differently, but nearly every team uses the slot on a second quarterback because a starting quarterback usually outproduces a flex-level skill player.' },
    { q: 'What is the difference between Superflex and a 2QB league?', a: 'A 2QB league requires two quarterbacks in every starting lineup, while a Superflex league permits a second quarterback but allows a skill player in the slot instead. The difference matters when a team\'s second quarterback is unavailable, because a Superflex team can substitute a skill player and a 2QB team cannot.' },
    { q: 'Do running backs and wide receivers lose value in Superflex?', a: 'They become comparatively cheaper to acquire rather than less productive. Every manager has the same number of picks in any format, so when a large share of early selections is spent on quarterbacks, skill players who would otherwise be gone remain available in later rounds.' },
    { q: 'Does league size change how scarce quarterbacks are in Superflex?', a: 'Yes. The supply of quarterbacks capable of starting is fixed by professional football, while demand rises with each additional team, so a fourteen-team Superflex league is meaningfully more constrained than a ten-team league using the identical format setting.' },
    { q: 'Is Superflex the same as having a standard flex slot?', a: 'No. A standard flex slot accepts running backs, wide receivers and tight ends, and adds marginal demand to positions that already have depth. A Superflex slot adds quarterback to that list, creating demand for a position whose supply of viable starters is small relative to the number of teams.' },
  ],

  links: [
    'draft-science/superflex-quarterback-value',
    'superflex-draft-assistant',
    'formats/ppr',
    'scenarios/superflex-quarterback-run',
    'tools/superflex-qb-demand-calculator',
  ],
};
