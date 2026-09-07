// PAGE 39 — draft-science/roster-construction. Source §15, §16, §12.
// Original angle: value is a function of the roster you already own, so two
// managers looking at the same board should NOT see the same order.
export default {
  slug: 'draft-science/roster-construction',
  pageType: 'science',
  title: 'Roster Construction and Fantasy Draft Value | GREEN18',
  description: 'How the players you already drafted change what the next player is worth to you — positional balance, flexibility, and why two managers should not share one board.',
  breadcrumb: 'Roster Construction',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'How Does Roster Construction Change What a Player Is Worth?',
    lede: [
      'Halfway through a draft, no two managers are answering the same question anymore.',
      'One has two running backs and no receivers. One has three receivers and a tight end. The available players are identical. The right pick is not.',
      '**A ranking that is correct for everyone is, by construction, tuned to no one.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the Worked Example', href: '#how-it-works' },
  },

  answer: 'Roster construction changes a player\'s draft value because a fantasy roster has a fixed number of starting slots, and each player a manager already owns reduces the marginal value of the next player at that same position while raising it everywhere else. A third strong wide receiver added to a roster that starts two contributes far less than the first strong tight end on a roster that starts none, even when the two players are ranked identically. Draft value is therefore personal: the same board, viewed by two managers with different rosters, should correctly produce two different orders.',

  claims: [
    'Roster construction changes player value because starting slots are finite, so each additional player at a position contributes less than the one before him.',
    'The marginal value of a player is the production he adds above the player he would displace in a manager\'s starting lineup, not his projection in isolation.',
    'Two managers with different rosters facing the same available players should correctly arrive at two different draft orders.',
    'A consensus ranking cannot express roster fit, because it is computed before any roster exists and is distributed unchanged to every manager in every league.',
    'Positional flexibility has value independent of production, because a roster with unfilled requirements at several positions retains more ways to respond to what falls.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Does the Third Receiver Count for Less?', body: [
      '**Because a lineup starts a fixed number of them, and the fourth one plays on your bench.**',
      'A fantasy roster is not a collection of good players. It is a set of slots that must be filled, and only the players in those slots score.',
      'Suppose your league starts two wide receivers and a flex. Your first receiver adds his full production to your starting lineup. So does your second. Your third competes for the flex, so he adds only the amount by which he beats whoever else you would have played there. Your fourth adds nothing at all until someone ahead of him is unavailable.',
      'That declining contribution is the whole of roster construction. The player did not get worse. The slot he would occupy did.',
    ], quote: 'Only starters score. A player’s value to you is the production he adds above the player he displaces.' },

    { type: 'prose', h2: 'What Does This Look Like at an Actual Pick?', id: 'how-it-works', body: [
      '**It looks like two managers correctly disagreeing about the same name.**',
      'Round six. The best available player on the consensus board is a wide receiver — clearly the top name left, by a visible margin.',
      'Manager A has drafted three wide receivers and nothing else. Manager B has drafted two running backs and a quarterback.',
    ], list: [
      'For Manager B, that receiver is his first, and slots into a required starting position. He adds his full production.',
      'For Manager A, the same receiver is his fourth. Two of them start, one takes the flex, and this one sits behind three players already on the roster.',
      'For Manager A, the third-best tight end — a name several rounds lower on the consensus list — fills an empty required slot and may add more starting production than the receiver does.',
    ], after: [
      '**Manager A taking the "best player available" here would be taking the worst pick on the board for his team.**',
      'This is the case a universal ranking structurally cannot make, because it does not know either roster. It is also why [personalized rankings](/personalized-fantasy-football-rankings) are a structural claim rather than a marketing one.',
    ]},

    { type: 'table', h2: 'How Much Does the Same Player Add?', sub: 'One wide receiver, four different rosters, in a league that starts two receivers plus a flex.',
      columns: ['Roster already holds', 'Slot he fills', 'Production he adds to the lineup', 'Effect on his value to you'],
      rows: [
        ['No receivers', 'Required starter', 'All of it', 'Highest'],
        ['One receiver', 'Required starter', 'All of it', 'High'],
        ['Two receivers', 'Flex, if he beats the alternative', 'Only the margin over your flex option', 'Reduced'],
        ['Three receivers', 'Bench', 'None, until someone is unavailable', 'Lowest'],
      ],
      note: 'The player’s projection is identical in every row. Only the roster changed.' },

    { type: 'prose', h2: 'What Is Positional Flexibility Worth?', body: [
      '**It is worth the options it preserves, which is real value that never appears in a projection.**',
      'Early in a draft, a roster with several unfilled positions can take whatever the board gives it. A roster that has already committed heavily to one position can only take what fits.',
      'That matters because you cannot control what falls to you. If an elite tight end slides two rounds past his expected position, an open roster can simply accept the gift. A roster with three receivers and one remaining flex slot may have to pass on the best value in the room.',
      'Flexibility is not a reason to avoid concentration forever — filling required slots is the point of the draft. It is a reason to notice that early concentration is a bet that the board will keep offering you what you still need.',
      'The classic version of this bet is [starting a draft without running backs](/scenarios/rb-zero-start): deliberate concentration elsewhere, paid for with reduced flexibility later.',
    ]},

    { type: 'prose', h2: 'Does Roster Need Mean You Should Reach?', body: [
      '**No. Roster need changes what a player is worth to you; it does not license paying more than he is worth.**',
      'The failure mode of roster-aware drafting is filling slots for the sake of filling them — taking a weak tight end in round four because the slot is empty, when a comparable tight end will be available in round nine and a genuinely scarce running back is on the board now.',
      'Need and scarcity are different quantities. Need is about your roster. [Scarcity](/draft-science/positional-scarcity) is about the pool. A need at a deep position is not urgent, because the position will still be there. A need at a thinning position is urgent, because it will not.',
      'Combining them is the actual work: a required empty slot at a position whose [tier is about to collapse](/draft-science/player-tier-collapse) is the strongest signal in a draft. A required empty slot at a position with forty viable players is barely a signal at all.',
    ], quote: 'Need tells you what you lack. Scarcity tells you whether you can wait for it.' },

    { type: 'prose', h2: 'Why Does Roster Fit Get Harder as the Draft Goes On?', body: [
      '**Because your roster accumulates constraints while the board loses options.**',
      'At pick one you have twenty-odd ways to build a team and the entire player pool. By round ten you have a handful of viable shapes and a thin pool, and every earlier decision has narrowed both.',
      'Each pick therefore has to satisfy more conditions than the one before it: the empty slots you still must fill, the ones you can still fill later, the positions the room is draining, and how many selections until your next turn.',
      'Managers do not usually get this wrong because they misunderstand it. They get it wrong because there are too many interacting conditions to recompute by hand, on the clock, while eleven other people wait.',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Use Your Roster?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'Your roster is an input to every valuation, not a filter applied afterward. As you add players, the marginal contribution of the next player at each position is recomputed against the starting requirements your league actually uses.',
      'The result is that the board changes shape after your own picks, not only after everyone else\'s — which is exactly what should happen, and exactly what a shared list cannot do.',
      'The model is deterministic: the same roster, league and sequence of picks always produce the same board, so the ordering is reproducible rather than a matter of opinion.',
    ]},

    { type: 'convert', h2: 'Your Board Should Know Your Team.',
      body: ['A consensus ranking was computed before your roster existed. By round six it is answering someone else\'s question.', '**Download GREEN18 for iPhone and draft against a board that knows what you already have.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is roster construction in fantasy football?', a: 'Roster construction is the shape of the team a manager has already drafted — how many players are held at each position relative to the starting slots the league requires. It changes draft value because starting slots are finite, so each additional player at a position adds less to the lineup than the one before him.' },
    { q: 'Why should two managers rank the same available players differently?', a: 'Because the value of a player is the production he adds above the player he would displace in that manager\'s starting lineup, and the two managers have different lineups. A wide receiver who fills a required empty slot for one manager may be a bench player for another, so the same name is correctly worth more to one than to the other.' },
    { q: 'Does drafting for need mean reaching for a player?', a: 'No. Roster need changes what a player is worth to a manager but does not justify paying more than that value. A need at a deep position can safely wait, because comparable players will still be available later, while a need at a thinning position is urgent because they will not.' },
    { q: 'What is positional flexibility worth in a fantasy draft?', a: 'Positional flexibility is worth the options it preserves. A roster with several unfilled requirements can accept whichever strong player falls, while a roster already concentrated at one position may have to pass on the best available value because it has no slot for him.' },
    { q: 'Should you draft the best player available regardless of roster?', a: 'Not once a roster has taken shape. Early in a draft, when most slots are empty, best-available and best-fit usually agree. As slots fill, they diverge, and the highest-ranked available player can become the lowest-value pick for a manager who already holds several players at that position.' },
  ],

  links: [
    'scenarios/already-have-two-wide-receivers',
    'scenarios/rb-zero-start',
    'tools/league-value-calculator',
    'personalized-fantasy-football-rankings',
    'draft-science/opportunity-cost',
  ],
};
