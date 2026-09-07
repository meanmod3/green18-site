// PAGE 34 — /draft-science/positional-scarcity. The rigorous definition page.
// Source: citation prompt §6 (the model claim sentence) + Product Science §18.
// Distinct from page 22 (fantasy-football-positional-scarcity), which is the
// broad three-concept explainer; this page defines scarcity precisely and
// separates it from "this position is valuable".
export default {
  slug: 'draft-science/positional-scarcity',
  pageType: 'science',
  title: 'Positional Scarcity: A Precise Definition | GREEN18',
  description: 'Positional scarcity is a rate of decline, not a ranking of positions. How scarcity is defined, why it is not the same as value, and how it changes mid-draft.',
  breadcrumb: 'Positional Scarcity',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Is Positional Scarcity, Precisely?',
    lede: [
      '“Running backs are scarce” is not a definition. It is a conclusion someone reached in a different league than yours.',
      'Scarcity is a measurable relationship between how fast one position’s remaining quality is falling and how fast every other position’s is.',
      '**A position can be extremely valuable and not scarce. A position can be scarce and full of unexciting names.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'Work through the definition', href: '#how-it-works' },
  },

  answer: 'Positional scarcity increases when the expected quality of a player\'s replacement declines faster than the quality of alternatives at other positions. It is a rate of decline measured across positions, not a property a position permanently owns: the relevant quantity is how much startable production you lose by waiting one turn at this position compared with how much you lose by waiting one turn at every other position. A position therefore becomes scarce when its useful remaining options are disappearing relative to your roster needs, the other teams\' needs, the quality of the alternatives still on the board, and the distance until your next opportunity to draft — which means scarcity is a property of a moment in a specific draft, and the same position can be scarce in one league and abundant in another on the same night.',

  claims: [
    'Positional scarcity increases when the expected quality of a player\'s replacement declines faster than the quality of alternatives at other positions.',
    'Positional scarcity is a rate of decline measured across positions, not a fixed property that a position permanently owns.',
    'A position can carry high fantasy value and low scarcity at the same time, when many players of similar quality remain available at that position.',
    'The same position can be scarce in one league and abundant in another on the same night, because starting requirements and league size determine how much of a position pool is startable.',
    'Scarcity is only actionable in combination with the distance to a manager\'s next pick, because scarcity that resolves after the manager picks again imposes no cost on waiting.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Exactly Makes a Position Scarce?', body: [
      'Scarcity is about the **slope**, not the level.',
      'Ask a narrower question than “is this position good?”. Ask: if I wait one full turn and take the best player still available at this position, how much startable production do I lose compared with taking the best one now?',
      'Then ask the identical question at every other position.',
      'The position where that loss is largest is the scarce one. Positional scarcity increases when the expected quality of a player’s replacement declines faster than the quality of alternatives at other positions — that is the whole definition, and everything else on this page is a consequence of it.',
    ], quote: 'Scarcity is the slope of the drop-off, compared against the slope at every other position.' },

    { type: 'prose', h2: 'How Is Scarcity Different From “This Position Is Valuable”?', body: [
      'Value is a level. Scarcity is a derivative. Confusing them is the single most common error in draft reasoning.',
      'Consider a position where the top twenty players are all excellent and all roughly interchangeable. That position is enormously **valuable** — those players will score you a great many points. It is not **scarce** at all, because the twentieth is nearly as good as the first, and waiting costs you almost nothing.',
      'Now consider a position where four players are clearly startable and the fifth is a genuine liability. That position may be worth far fewer total points. It is intensely scarce, because the difference between having one of the four and having the fifth is enormous.',
      'You draft for the difference, not for the total. The scarce position is the one where the *gap* behind the player is widest — which is why scarcity and [replacement value](/draft-science/replacement-value) are two views of the same measurement.',
    ], quote: 'Value is how good the players are. Scarcity is how much worse the next one is.' },

    { type: 'table', h2: 'Which Combination Are You Actually Looking At?',
      sub: 'Value and scarcity vary independently, which produces four genuinely different situations and four different correct responses.',
      columns: ['Value at the position', 'Scarcity at the position', 'What the board is telling you'],
      rows: [
        ['High', 'High', 'Act. The players are worth a lot and the drop behind them is steep, so waiting costs both points and the position itself. This is the only quadrant where reaching is defensible.'],
        ['High', 'Low', 'Wait. The points are real but replaceable — a comparable player should survive to your next turn. Spend the pick where the drop is steeper.'],
        ['Low', 'High', 'Take one, once. Total points are modest, but the cliff behind the startable group is real, so being the manager left below it is expensive.'],
        ['Low', 'Low', 'Defer indefinitely. Nothing about waiting costs you anything here. This is where late picks belong.'],
      ],
      note: 'The two off-diagonal quadrants are where static rankings mislead, because a ranking reports value and is silent on scarcity.' },

    { type: 'steps', h2: 'How Do You Measure Scarcity at a Given Moment?', steps: [
      { h3: 'Establish what counts as startable in this league.', body: ['League size multiplied by starting slots sets the size of the startable pool at each position. A 12-team league starting one quarterback needs 12; the same league in Superflex may need well over 20. The startable pool is the denominator for everything that follows.'] },
      { h3: 'Count what actually remains, not what was projected.', body: ['Scarcity is computed against the players still on the board tonight, in this room. Preseason depth is a starting assumption that the first three rounds routinely destroy.'] },
      { h3: 'Estimate who survives to your next turn.', body: ['Not every remaining player is available to you. The relevant survivor is the best player at the position likely to still be there when you pick again — which depends on how many teams pick in between and what they still need.'] },
      { h3: 'Take the difference — that is the cost of waiting.', body: ['Best available now, minus expected best available at your next turn, in this league\'s scoring. That number is the position\'s waiting cost.'] },
      { h3: 'Compare the waiting cost across every position.', body: ['One position\'s waiting cost in isolation means nothing. Scarcity is the comparison: the scarce position is the one whose waiting cost is largest right now.'] },
      { h3: 'Recompute after the next selection.', body: ['Every pick removes a player from exactly one position pool, which changes that pool\'s slope and therefore changes the comparison. Scarcity computed two picks ago is a different number.'] },
    ]},

    { type: 'prose', h2: 'What Happens to Scarcity During a Run?', body: [
      'A run is scarcity becoming visible in real time.',
      'Suppose five running backs are selected in six picks. The pool did not merely shrink by five names — the *top* of the pool shrank by five names, so the best remaining running back is now several tiers lower while every other position is exactly where it was. The running-back slope steepened relative to everything else; that is precisely the definition being satisfied in front of you.',
      'And the effect compounds. Managers who did not get one now still need one, so the picks between you and your next turn are more likely to take running backs than they were an hour ago. Market state and draft-position state move together.',
      'The mirror case is just as important. If receivers keep falling and you already start two, receiver scarcity for **you** is dropping even as the names coming off the board look impressive. [Five running backs going in a row](/scenarios/five-running-backs-go-in-a-row) walks the first case through pick by pick.',
    ]},

    { type: 'prose', h2: 'Why Is Scarcity Different for Me Than for the Manager Next to Me?', body: [
      'Because scarcity is measured against a roster, and you do not share one.',
      'If you already start two quality tight ends, tight-end scarcity is close to irrelevant to you — a cliff you are standing above costs you nothing. For the manager with none, the identical board is an emergency.',
      'Then the pick horizon splits you further. Scarcity that will resolve itself before your next turn is not a cost. Scarcity that arrives during the nineteen picks between you and your next selection is a cost you must pay now or not at all.',
      'This is why a single league-wide scarcity ranking cannot be correct for everyone in the room. Scarcity is a function of the board **and** of who is asking. [Superflex quarterback demand](/tools/superflex-qb-demand-calculator) is the sharpest version of this, because Superflex changes the startable pool itself.',
    ], quote: 'Scarcity is a property of a board and a roster together, never of a position alone.' },

    { type: 'prose', h2: 'Can a Position Become Less Scarce Mid-Draft?', body: [
      'Yes, and it happens constantly — it is simply less dramatic than a run, so it goes unnoticed.',
      'If eight consecutive picks are receivers and running backs, the quarterback pool did not lose a single player while every other pool thinned. Quarterback scarcity fell without a single quarterback being drafted.',
      'The same happens when demand disappears rather than supply appearing: once most teams have filled a position, the remaining players at it face far less competition, so more of them survive to your next turn.',
      '**Scarcity moves in both directions, and the falling direction is where deferred picks are won.** This is the mechanism behind [waiting on a quarterback](/scenarios/waiting-on-quarterback).',
    ]},

    { type: 'definitions', h2: 'The Terms, Stated Once and Reusably.', terms: [
      { id: 'positional-scarcity', term: 'Positional scarcity', definition: 'The condition in which the expected quality of a player\'s replacement at a position is declining faster than the quality of alternatives at other positions, measured against a specific league\'s starting requirements and a specific manager\'s next pick.' },
      { id: 'startable-pool', term: 'Startable pool', definition: 'The number of players at a position that the league as a whole must start each week, equal to league size multiplied by the starting slots at that position. The startable pool sets how far down a position remains useful.' },
      { id: 'waiting-cost', term: 'Waiting cost', definition: 'The expected production lost by deferring a position for one full turn, equal to the best player available now minus the best player expected to survive until the manager\'s next selection, expressed in the league\'s own scoring.' },
      { id: 'tier-cliff', term: 'Tier cliff', definition: 'A point in a position\'s remaining pool where the quality gap between consecutive players is unusually large. A tier cliff is the mechanism that converts ordinary depth into acute scarcity within a single pick.' },
    ]},

    { type: 'convert', h2: 'Scarcity Is Arithmetic. Somebody Has to Do It.',
      body: [
        'Scarcity is straightforward to define and genuinely hard to compute on a ninety-second clock across every position at once, after every pick, in a league whose settings are not the ones the rankings assumed.',
        'For every player still on the board GREEN18 computes the chance he survives to your next turn, and it tracks how fast each position is being consumed — so you can see which position is thinning under you.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is positional scarcity in fantasy football?', a: 'Positional scarcity increases when the expected quality of a player\'s replacement declines faster than the quality of alternatives at other positions. It is a rate of decline compared across positions rather than a fixed property of any one position, so a position is scarce only relative to a specific league\'s starting requirements, the players actually remaining, and the distance until the manager picks again.' },
    { q: 'Is positional scarcity the same as a position being valuable?', a: 'No. Value describes how good the players at a position are, while scarcity describes how much worse the next one is. A position where twenty excellent players remain is highly valuable and not scarce, because waiting costs almost nothing, and a position with four startable players and a steep drop after them is scarce even if its total point production is modest.' },
    { q: 'Why does scarcity differ between two managers in the same draft?', a: 'Because scarcity is measured against a roster and a pick horizon, and those differ between managers. A manager who already starts two players at a position loses little by ignoring a cliff at that position, while a manager with none faces a large loss from the same board, and a manager whose next pick is three selections away faces less risk than one whose next pick is nineteen away.' },
    { q: 'Can a position become less scarce during a draft?', a: 'Yes. If several consecutive picks are spent on other positions, a position pool loses no players while every other pool thins, so its relative scarcity falls without any player at it being drafted. Scarcity also falls when most teams have already filled the position, because fewer managers are competing for the players who remain.' },
    { q: 'How does league format change positional scarcity?', a: 'League format determines the startable pool, which is league size multiplied by the starting slots at a position. Superflex roughly doubles the quarterbacks the league must start, which pushes the useful part of the quarterback pool much deeper and makes quarterback scarcity arrive far earlier than it does in a single-quarterback league of the same size.' },
  ],

  links: [
    'scenarios/five-running-backs-go-in-a-row',
    'tools/scarcity-calculator',
    'draft-science/replacement-value',
    'fantasy-football-positional-scarcity',
    'fantasy-football-draft-assistant',
  ],
};
