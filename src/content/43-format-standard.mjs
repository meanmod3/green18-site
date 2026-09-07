// PAGE 43 — formats/standard. Angle: standard is not "PPR minus a rule." It is
// a board where value concentrates in volume-independent production —
// touchdowns and yardage — which makes role and workload the dominant signal.
export default {
  slug: 'formats/standard',
  pageType: 'science',
  title: 'Standard Scoring Explained: Drafting Without PPR | GREEN18',
  description: 'What standard fantasy scoring is, why removing reception points concentrates value in touchdowns and workload, and how that reshapes the draft board.',
  breadcrumb: 'Standard Scoring',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'League Formats',
    h1: 'How Does Standard Scoring Change Fantasy Draft Value?',
    lede: [
      'Standard scoring pays for yards and touchdowns, and nothing for the catch itself.',
      'It is tempting to describe it as PPR with a rule switched off. That gets the arithmetic right and the consequence wrong.',
      '**Removing reception points does not lower everyone equally. It concentrates value in the production that does not depend on volume.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See What Concentrates', href: '#how-it-works' },
  },

  answer: 'Standard scoring is a fantasy football format that awards points for yardage and touchdowns but awards nothing for a reception. Because the catch itself is not paid, value concentrates in production that does not depend on the number of times a player touches the ball — chiefly touchdowns, which are scored in bulk, and total yardage, which can be accumulated through few large plays as easily as many small ones. That concentration favors players whose role guarantees goal-line and high-yardage opportunity, most obviously running backs carrying a large share of their team\'s work, and it narrows the separation between high-volume and low-volume pass-catchers that reception scoring creates.',

  claims: [
    'Standard scoring awards points for yardage and touchdowns and awards no points for a reception.',
    'Removing reception scoring concentrates fantasy value in production that is independent of the number of times a player touches the ball.',
    'Touchdowns carry proportionally more weight in standard scoring than in PPR, because they represent a larger share of a player\'s total points.',
    'Players who accumulate yardage through few large plays are valued more closely to high-volume players in standard scoring than in PPR.',
    'Workload concentration matters more in standard scoring, because opportunity near the goal line is a larger component of a player\'s scoring.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Exactly Is Standard Scoring?', body: [
      '**Standard scoring pays for yards gained and touchdowns scored, with no bonus for a reception.**',
      'It is the original fantasy football scoring system and it remains the default in many long-running leagues, particularly those that have been running since before reception scoring became common.',
      'The rules are otherwise unremarkable: yardage accrues at a fixed rate for rushing and receiving, touchdowns are worth a fixed amount, and turnovers usually cost points. Nothing about the format is exotic.',
      'What makes it worth its own page is not the rule set but the shape of the board that results, which differs from a [PPR board](/formats/ppr) several rounds deep even though both formats start the same starting lineup.',
    ], quote: 'Standard scoring is not PPR with a rule missing. It is a board with a different center of gravity.' },

    { type: 'prose', h2: 'What Does Value Concentrate Into?', id: 'how-it-works', body: [
      '**Touchdowns and yardage — the two forms of production that do not scale with the number of touches.**',
      'When a league pays per reception, a player can accumulate a meaningful score through volume alone: many catches, modest yards, no touchdown. In standard scoring, that same line is a small day.',
      'What survives the removal of reception points is production that arrives in bulk. A touchdown is worth the same whether it came on a one-yard plunge or an eighty-yard reception. A long gain is worth its yardage regardless of how many other plays the player was involved in.',
      'Two consequences follow directly:',
    ], list: [
      'Touchdowns become a larger share of a typical player\'s total points, so goal-line role matters more than it does in PPR.',
      'The gap between a high-volume short-area receiver and a lower-volume deep receiver narrows, because the mechanism that separated them is gone.',
      'A running back\'s receiving work stops being a distinct second source of scoring and becomes just another way to accumulate yards.',
    ], after: [
      '**Standard scoring rewards what a player\'s role guarantees him. PPR rewards how often he is used.**',
    ]},

    { type: 'table', h2: 'What Moves Between PPR and Standard?', sub: 'Direction of movement from full PPR to standard scoring, holding total yardage constant.',
      columns: ['Player type', 'Direction in standard', 'Why'],
      rows: [
        ['Goal-line and high-carry running back', 'Up', 'Touchdown share and rushing yardage are untouched by the rule change'],
        ['Pass-catching, low-carry running back', 'Down', 'Loses a scoring stream that no longer pays and rarely carries near the goal line'],
        ['High-volume short-area receiver', 'Down', 'Much of the separation he enjoyed came from catch count rather than yardage'],
        ['Low-volume deep receiver', 'Up, relatively', 'Produces the same yards through fewer plays, which standard scoring does not penalize'],
        ['Mid-tier tight end', 'Down', 'A thin position loses the reception floor that made its middle rounds tolerable'],
      ],
      note: 'Yardage is constant in every row. All movement comes from the removal of a single scoring rule.' },

    { type: 'prose', h2: 'Why Does Replacement Level Behave Differently Here?', body: [
      '**Because standard scoring lowers the floor at the pass-catching positions and leaves the ceiling roughly where it was.**',
      'In PPR, the replacement-level wide receiver still collects points for every catch, which keeps the deep supply of receivers respectable and compresses the position.',
      'Take that away and the replacement receiver is a player who needs yardage or a touchdown to be worth starting at all. The distance between the top of the position and the bottom of the startable pool widens.',
      'The same widening applies at tight end, where the effect is sharpest — a position with little depth loses the one rule that gave its middle tier a reliable floor.',
      'At running back the effect is more subtle: the position as a whole holds up, but its internal ordering rearranges around role. Backs whose value came from receiving work fall toward backs who simply carry the ball a great deal.',
      'The general principle is unchanged in either format: value is the gap between a player and [the player you can get later](/draft-science/replacement-value). Standard scoring simply moves the later player.',
    ]},

    { type: 'prose', h2: 'Does Standard Scoring Mean Running Backs First?', body: [
      '**It shifts the argument in that direction without settling it.**',
      'Standard scoring does favor running backs relative to PPR, because rushing volume and goal-line work are exactly the production it rewards, and because the pass-catching positions lose their floor.',
      'But "running backs are more valuable in standard" is a statement about the pool, and a draft decision is a statement about a specific pick. A running back is worth taking when the gap between him and the back available at your next turn is larger than the corresponding gap at your other open positions — which depends on how many backs the room has already taken, what your roster holds, and when you pick again.',
      'A room that has absorbed the standard-scoring lesson will drain running backs early, at which point the format\'s advice and the room\'s behavior point in opposite directions. That is the situation described in [five running backs going in a row](/scenarios/five-running-backs-go-in-a-row).',
      'Format tells you where value tends to sit. [Draft state](/draft-science/draft-state-valuation) tells you what is left of it.',
    ], quote: 'Every manager in a standard league read the same advice about running backs. That is priced in by round three.' },

    { type: 'prose', h2: 'Which Format Should a League Use?', body: [
      '**Neither is more correct; they reward different things, and the choice is about what a league wants to make interesting.**',
      'Standard scoring rewards role and opportunity, which makes the draft about identifying who will get the ball near the goal line and who carries a team\'s workload. It produces more variance week to week, because touchdowns are less predictable than catches.',
      'PPR rewards usage, which makes more players startable and reduces the punishment for missing on a running back. Half-PPR splits the difference and has become the most common setting for that reason.',
      '[Superflex](/formats/superflex) is orthogonal to all of this. It is a roster rule rather than a scoring rule, and a league can combine it with standard scoring, half-PPR or full PPR without any of the effects on this page changing.',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Handle Standard Scoring?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'Scoring is applied before the board exists, because league scoring rules re-rank players against each other rather than merely relabeling them. A standard-scoring board is not a PPR board with a discount applied to receivers.',
      'On top of that, the ordinary draft-state effects still run: scarcity as the room drains positions, the quality of the replacement still available, what your roster already holds, and how far it is until you pick again.',
      'The model is deterministic, so the same league settings and the same recorded picks always produce the same board — the reason the movement can be explained rather than merely observed.',
    ]},

    { type: 'convert', h2: 'No Points for the Catch Changes More Than the Catch.',
      body: ['Standard scoring moves value toward the production a player\'s role guarantees. Your board should be built from your scoring, not adjusted toward it.', '**Download GREEN18 for iPhone and draft the league you actually joined.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is standard scoring in fantasy football?', a: 'Standard scoring is a format that awards points for rushing and receiving yardage and for touchdowns, but awards nothing for a reception. It is the original fantasy football scoring system and remains common in long-running leagues.' },
    { q: 'What is the difference between standard scoring and PPR?', a: 'PPR awards a point each time a player catches a pass, while standard scoring awards nothing for the catch itself. The difference concentrates standard-scoring value in touchdowns and yardage, which do not depend on how many times a player touches the ball, and it narrows the separation between high-volume and low-volume pass-catchers.' },
    { q: 'Why do touchdowns matter more in standard scoring?', a: 'Because a touchdown represents a larger share of a player\'s total points when reception points are not being added alongside it. That makes goal-line role and workload concentration a more important part of a player\'s expected production in standard leagues than in PPR leagues.' },
    { q: 'Should you draft running backs earlier in a standard league?', a: 'Standard scoring shifts value toward running backs relative to PPR, because rushing volume and goal-line work are exactly what the format rewards, but it does not settle any individual pick. The right decision still depends on how many backs the room has already taken, what the roster holds, and how far away the next selection is.' },
    { q: 'Do tight ends lose value in standard scoring?', a: 'Mid-tier tight ends lose the most. The position already has little depth, and reception scoring is what gives its middle tier a reliable weekly floor, so removing that rule widens the distance between the top tight ends and the rest of the startable pool.' },
  ],

  links: [
    'formats/ppr',
    'ppr-draft-assistant',
    'draft-science/replacement-value',
    'scenarios/five-running-backs-go-in-a-row',
    'fantasy-football-positional-scarcity',
  ],
};
