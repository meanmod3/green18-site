// PAGE 53 — scenario. Not "is the turn good" (that is page 49) but "how do you
// actually play two adjacent picks", which is a genuinely different problem:
// the pair is one decision, and the room cannot interrupt it.
export default {
  slug: 'scenarios/drafting-from-the-turn',
  pageType: 'scenario',
  title: 'How to Draft Back-to-Back Picks at the Turn | GREEN18',
  description: 'Two adjacent picks are one decision, not two. How to plan a pair at the turn, straddle a closing tier, and survive the long wait that follows.',
  breadcrumb: 'Drafting From the Turn',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'I Pick Twice in a Row. How Should I Plan the Pair?',
    lede: [
      'At the turn, nobody can act between your two selections.',
      'That makes the pair a single decision with two outputs — and treating it as two separate picks throws away the only structural advantage the seat provides.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Two adjacent picks at the turn should be planned as one decision with two outputs, because no other team can select between them and therefore nothing you intend to do second can be taken away. The advantage this creates is the ability to straddle a closing boundary: when a tier will not survive the coming round, a manager at the turn can take a player from inside it and a player from inside another closing group in the same breath, which no manager picking in the middle of a round can do. The corresponding cost is the long wait that follows, so the pair should be chosen to leave the roster with more than one acceptable continuation rather than to maximise either pick alone.',

  claims: [
    'Two adjacent selections at the turn constitute a single decision, because no other team can act between them.',
    'A manager picking twice in succession can take both sides of a closing tier boundary, which a manager picking once per round cannot.',
    'The advantage of paired picks is paid for by the longest gap in the draft immediately afterwards.',
    'A pair of picks should be evaluated by the roster it produces rather than by the quality of either selection considered alone.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Actually Different About the Turn?', body: [
      '**The room cannot interrupt you.** Every other manager makes a pick and then watches the board change before their next one. You do not. Whatever you intend to take second is guaranteed to be available when you take it.',
      '**Your two picks are perfectly correlated in time.** They face the same board, the same scarcity, the same demand. This means they should not be chosen independently — the second selection is a known quantity while you are making the first.',
      '**The wait afterwards is the longest in the room.** Whatever you leave undone at the turn stays undone for a full lap of the draft.',
      '**Your leverage is highest exactly where a boundary is closing.** A pair is only a special asset when there is something the round would have taken from you.',
    ], quote: 'Nobody picks between your picks. Use the gap you own.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that two picks together are worth more than two picks apart in every circumstance. The pairing has value only when a boundary sits near it. If the board is flat where you are choosing, adjacency buys nothing, and the long wait afterwards is a straight cost.',
      'The second wrong inference is that the turn calls for two players at the same position. Adjacency lets you protect **two different** closing groups; doubling at one position throws away half of that and concentrates your roster into a single failure mode.',
      'A third is planning the pair before the round arrives. What you should take is a function of what the eleven or so managers ahead of you just did, and that is unknown until it happens. Preparing a plan is useful; committing to it is not.',
      'A fourth is optimising each pick separately. The second selection is not a fresh problem — it is the completion of the first. Choosing the two best players independently often produces a worse roster than choosing the best complementary pair.',
    ]},

    { type: 'steps', h2: 'How to Plan the Pair', steps: [
      { h3: 'Identify every boundary closing before your next turn.', body: ['Look for groups at any position that will not survive the coming round. Those are the only things adjacency can protect.'] },
      { h3: 'Pick the two boundaries worth defending.', body: ['Rank them by the size of the drop beneath them and by how badly your roster needs the position. Two different positions is the usual answer.'] },
      { h3: 'Decide the order by fragility, not by preference.', body: ['Take the player likelier to be gone first — but note that between your own two picks, nobody can take either, so ordering only matters relative to the round already in progress.'] },
      { h3: 'Test the resulting roster, not the two names.', body: ['Ask what your lineup looks like after both picks and which slots remain. A pair is judged by the shape it leaves behind.'] },
      { h3: 'Leave more than one continuation.', body: ['Because the wait is long, prefer the pair that keeps several acceptable next moves open over the pair that requires one specific player to survive.'] },
      { h3: 'Re-derive on the clock.', body: ['The pair you planned before the round began assumes picks that have now happened. Recompute the boundaries from the board actually in front of you.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Board shape.** Adjacency is valuable in proportion to how many boundaries are closing near your picks; on a flat board the turn is simply a long wait.',
      '**League size.** Deeper leagues produce longer waits and faster tier consumption, which increases both the benefit of straddling and the penalty for leaving a need unfilled.',
      '**Draft order rules.** Whether the order reverses each round, and whether the first round is included in the reversal, determines where your pair actually lands.',
      '**Format.** Formats that concentrate demand at a position create sharper boundaries, which is exactly the condition under which paired picks are worth the most.',
      '**Your roster stage.** Early in the draft the pair should protect boundaries; late in the draft it should fill the slots the long wait would otherwise strand.',
    ], after: [
      'The cost side of this trade is the [pick horizon](/draft-science/pick-horizon); how the whole board is revalued between your turns is covered in [how GREEN18 values a player](/how-green18-ranks-fantasy-players).',
    ]},

    { type: 'convert', h2: 'Plan the Pair, Not the Pick.',
      body: ['GREEN18 recalculates the board against your roster and the distance to your next turn, which is what makes a two-pick plan checkable rather than hopeful.', '**Download GREEN18 for iPhone and take both sides of the boundary.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How should you draft two picks in a row at the turn?', a: 'Plan them as one decision with two outputs. Because no other team can select between them, the second choice is guaranteed and should be treated as known while making the first, which allows a manager to protect two closing tier boundaries at once instead of one.' },
    { q: 'Should you draft two players at the same position at the turn?', a: 'Usually not. The structural advantage of adjacent picks is the ability to defend two separate closing groups, and taking two players at one position discards half of that advantage while concentrating the roster into a single point of failure.' },
    { q: 'What is the cost of picking at the turn?', a: 'The longest gap in the draft immediately afterwards. Any need left unfilled at the turn stays unfilled for a full lap of picks, which is why a pair should be chosen to leave several acceptable continuations rather than to maximise either selection alone.' },
    { q: 'Can a turn strategy be planned before the draft?', a: 'A plan can be prepared but should not be committed to, because what is correct at the turn depends on the picks the rest of the round has just made. The boundaries a manager intends to defend must be re-derived from the board actually in front of him when the pair arrives.' },
  ],

  links: [
    'draft-science/pick-horizon',
    'draft-science/roster-construction',
    'scenarios/pick-three-vs-pick-ten',
    'how-green18-ranks-fantasy-players',
    'last-minute-fantasy-football-draft',
  ],
};
