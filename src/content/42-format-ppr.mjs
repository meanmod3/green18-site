// PAGE 42 — formats/ppr. NOT the conversion page (/ppr-draft-assistant).
// Angle: reception scoring is a change in WHAT PRODUCTION COUNTS, which moves
// which skill players clear replacement level — a re-sorting within positions.
export default {
  slug: 'formats/ppr',
  pageType: 'science',
  title: 'PPR Scoring: How Receptions Reprice a Draft | GREEN18',
  description: 'What PPR scoring is, why a point per catch reorders players within positions rather than lifting everyone, and how it moves replacement level for skill players.',
  breadcrumb: 'PPR',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'League Formats',
    h1: 'How Does PPR Scoring Change Fantasy Draft Value?',
    lede: [
      'PPR awards a point for every reception. Everyone knows that. The interesting part is what it does to the board.',
      'A point per catch does not lift all pass-catchers equally. It rewards players by the number of times they touch the ball, which is a different quality from the number of yards they gain with it.',
      '**PPR changes which players clear replacement level, not how many have to.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See Which Players Move', href: '#how-it-works' },
  },

  answer: 'PPR, or points per reception, is a fantasy football scoring rule that awards a point each time a player catches a pass, in addition to the yardage and touchdown scoring the league already uses. Because the bonus is paid per catch rather than per yard, it rewards volume of targets rather than efficiency with them, and it therefore reorders players within positions instead of raising every pass-catcher equally. A high-volume receiver of short passes gains more from PPR than a lower-volume receiver of long ones, and pass-catching running backs and tight ends gain relative to those who mostly run or block. The practical effect is that a different set of skill players clears replacement level, which changes the draft order even though the format demands exactly the same starting lineup.',

  claims: [
    'PPR is a scoring rule that awards one point for each reception in addition to standard yardage and touchdown scoring.',
    'Half-PPR awards half a point per reception and produces a board positioned between full PPR and standard scoring.',
    'Reception scoring rewards target volume rather than yardage efficiency, so it reorders players within a position instead of lifting every pass-catcher equally.',
    'Pass-catching running backs gain more from PPR than running backs of similar overall production who are used primarily as runners.',
    'PPR changes which players clear replacement level at a position, which changes the draft order without changing the number of starters a league requires.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Exactly Is PPR Scoring?', body: [
      '**PPR adds one point per reception on top of the league\'s existing yardage and touchdown scoring.**',
      'It is a pure addition. Nothing is subtracted, and no other rule changes. A player who caught six passes for sixty yards scores six more points in full PPR than he does in standard scoring.',
      'Half-PPR awards half a point per catch and sits exactly between the two. It is the most common setting in modern leagues precisely because it moderates the effect described on this page rather than eliminating it or maximizing it.',
      'Some leagues go further and use position-specific reception values — a common variant awards tight ends a larger bonus than receivers, deliberately correcting for the thinness of the position. That is a different rule with a different purpose, and it stacks on top of everything here.',
    ], quote: 'PPR is not a different game. It is a different definition of what counts as production.' },

    { type: 'prose', h2: 'Why Doesn\'t PPR Just Raise Every Pass-Catcher?', id: 'how-it-works', body: [
      '**Because the bonus is paid per catch, and catches are distributed very differently from yards.**',
      'Two receivers can finish a season with nearly identical yardage by completely different routes. One catches many short passes. The other catches fewer long ones.',
      'In standard scoring those two are close to interchangeable. In full PPR they are not, because one of them is paid for every one of the extra times he touched the ball and the other is not.',
      'Work it through concretely. Consider two receivers over a season:',
    ], list: [
      'Receiver A: high target volume, mostly short receptions, moderate yards per catch.',
      'Receiver B: lower target volume, fewer but longer receptions, the same total yards.',
      'In standard scoring, they finish close together and rank close together.',
      'In full PPR, Receiver A gains a point for every additional catch and separates from Receiver B without gaining a single yard.',
    ], after: [
      '**Neither receiver got better. The league started paying for something one of them does more of.**',
      'That is the whole mechanism, and it applies at every skill position at once.',
    ]},

    { type: 'table', h2: 'Which Player Types Move, and Which Way?', sub: 'Direction of movement from standard scoring to full PPR, holding total yardage constant.',
      columns: ['Player type', 'Direction in PPR', 'Why'],
      rows: [
        ['High-volume short-area receiver', 'Up', 'Paid for every additional catch he was already making'],
        ['Low-volume deep receiver', 'Down, relatively', 'Produces the same yards through fewer scoring events'],
        ['Pass-catching running back', 'Up sharply', 'Receives a second stream of scoring events his position peers do not have'],
        ['Early-down and goal-line running back', 'Down, relatively', 'Production is concentrated in carries and touchdowns, which PPR does not touch'],
        ['High-target tight end', 'Up', 'Gains reception points at a position where replacement level is already low'],
      ],
      note: 'Every row holds yardage constant. The movement is caused entirely by how that yardage was accumulated.' },

    { type: 'prose', h2: 'How Does PPR Move Replacement Level?', body: [
      '**By changing the identity of the last startable player at a position, not the number of them.**',
      '[Replacement value](/draft-science/replacement-value) is measured against the player a manager could realistically get later at the same position. PPR does not change how many receivers a league starts, so the count of players who must clear that bar is unchanged.',
      'What changes is who those players are. Reception scoring compresses the distance between the elite receivers and the deep supply of high-volume secondary receivers behind them, because the replacement receiver is now also collecting a point per catch.',
      'At running back the effect runs the other way. A back who catches passes is separated from the many backs who do not, and the replacement-level running back — typically a runner rather than a receiver — falls further behind. PPR therefore tends to widen the gap at running back while narrowing it at wide receiver.',
      'That divergence, not any single player\'s rise, is why PPR and standard boards look different several rounds deep.',
    ]},

    { type: 'prose', h2: 'Does PPR Mean You Should Draft Receivers Earlier?', body: [
      '**Not automatically, and the reasoning is more interesting than the rule of thumb.**',
      'Receivers score more points in PPR. That is not the same as being worth more, because every manager\'s receivers score more too. Only the gap between a player and his replacement determines draft value, and PPR narrows that gap at wide receiver by lifting the deep supply behind the top of the position.',
      'The stronger PPR conclusion is about running backs: the format sharpens the difference between backs who catch passes and backs who do not, which is a real and durable edge because it is a difference in role rather than in ranking.',
      'And as always, format sets the starting conditions rather than the answer. What you should do at a given pick still depends on your roster, on how the room has drafted, and on how far away your next selection is. [Roster construction](/draft-science/roster-construction) does not stop applying because the scoring changed.',
    ], quote: 'PPR changes everyone’s point totals. Only the gaps between players change anyone’s value.' },

    { type: 'prose', h2: 'How Does PPR Compare With Other Formats?', body: [
      'PPR and [standard scoring](/formats/standard) are the same board with a different definition of production: standard pushes value back toward yardage and touchdowns, which are less dependent on volume.',
      '[Superflex](/formats/superflex) is a different kind of change entirely. It is a roster rule, not a scoring rule, and it changes how many starters a position must supply rather than which players qualify. The two are independent and frequently combined — a Superflex PPR league applies both effects at once, with no interaction between them beyond the shared draft budget.',
      'Half-PPR sits between full PPR and standard on every axis described here, in the direction you would expect. There is no separate strategy for half-PPR; there is a smaller version of the PPR effect.',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Apply Reception Scoring?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'Scoring is applied before the board is built rather than as an adjustment on top of a generic ranking, because reception scoring re-ranks players against each other rather than relabeling them. Full PPR, half PPR, and custom per-position reception values all produce genuinely different orderings from the same player pool.',
      'From there the usual draft-state effects apply on top of the format: scarcity, replacement level, your roster and your pick horizon.',
      'If you want the product overview for this format rather than the scoring explanation, that is the [PPR draft assistant](/ppr-draft-assistant) page.',
    ]},

    { type: 'convert', h2: 'A Point per Catch Reorders the Board.',
      body: ['Reception scoring is a rule about which production counts. A board that applies it after the fact is answering the wrong question.', '**Download GREEN18 for iPhone and set your scoring before the first pick.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What does PPR mean in fantasy football?', a: 'PPR stands for points per reception, a scoring rule that awards a point every time a player catches a pass, in addition to the league\'s existing yardage and touchdown scoring. Half-PPR awards half a point per catch and produces a board between full PPR and standard scoring.' },
    { q: 'Why does PPR change fantasy rankings rather than just raising scores?', a: 'Because the bonus is paid per reception rather than per yard, so it rewards players by how often they touch the ball rather than by how far they carry it. Two players with identical yardage can separate substantially in PPR if one accumulated that yardage through many short catches and the other through fewer long ones.' },
    { q: 'Do running backs matter less in PPR leagues?', a: 'The position does not matter less, but it divides more sharply. Running backs who catch passes gain a second stream of scoring events, while backs used primarily as runners gain nothing from the rule, so the gap between the two groups widens in PPR relative to standard scoring.' },
    { q: 'Should you draft wide receivers earlier in PPR?', a: 'Not automatically, because reception scoring lifts every receiver including the ones available late. Draft value depends on the gap between a player and his likely replacement, and PPR tends to narrow that gap at wide receiver by improving the deep supply behind the elite tier, while widening it at running back.' },
    { q: 'What is the difference between full PPR and half-PPR?', a: 'Full PPR awards one point per reception and half-PPR awards half a point. Half-PPR produces a board positioned between full PPR and standard scoring, with the same directional effects applied less strongly, so it requires no separate strategy of its own.' },
  ],

  links: [
    'ppr-draft-assistant',
    'formats/standard',
    'draft-science/replacement-value',
    'tools/ppr-value-adjustment-calculator',
    'fantasy-football-positional-scarcity',
  ],
};
