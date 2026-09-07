// PAGE 22 — the COMMERCIAL scarcity page: drafting *with* scarcity in mind,
// using GREEN18. The concept itself is defined at /draft-science/positional-
// scarcity (page 34) and the valuation method at /draft-science/draft-state-
// valuation (page 33); this page defers all conceptual explanation to them and
// keeps only what a manager does about it on the clock. Retrofit 2026-09-07:
// removed the three-concept explainer cards and the concept FAQs that
// duplicated page 34 verbatim.
export default {
  slug: 'fantasy-football-positional-scarcity',
  title: 'Drafting With Positional Scarcity | GREEN18',
  description: 'Scarcity is easy to understand and hard to compute on the clock. How GREEN18 prices the cost of waiting at every position, after every pick.',
  breadcrumb: 'Drafting With Scarcity',

  hero: {
    eyebrow: 'Draft With the Slope, Not the List',
    h1: 'You Already Understand Scarcity. The Problem Is Computing It on a Ninety-Second Clock.',
    lede: [
      'Every manager knows the idea: when the useful players at a position start disappearing, waiting gets expensive.',
      'Knowing that does not tell you which position is steepening right now, in your league, with your roster, nineteen picks from your next turn.',
      '**GREEN18 prices the cost of waiting at every position, after every pick.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Prices Waiting', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'What Does GREEN18 Actually Do About Scarcity?', body: [
      'It computes, for every position, what one full turn of waiting costs you — and then compares those numbers against each other.',
      'That comparison is the whole of [positional scarcity](/draft-science/positional-scarcity): a rate of decline measured across positions, never a property that a position permanently owns. The definition, the four value-and-scarcity quadrants and the measurement steps live on that page, and this one does not repeat them.',
      'What GREEN18 adds is that the comparison is re-run after every recorded selection, across the whole board, faster than you can read a name off a printed sheet.',
      'The number it hands you is a **margin over replacement**: this player, minus the one you can realistically still get at your next turn, in your league’s scoring.',
    ], quote: 'Understanding scarcity is free. Recomputing it after every pick is the work.' },

    { type: 'prose', h2: 'What Changes on Your Board During a Run?', body: [
      'Three quarterbacks go in a row. A static sheet crosses off three names and leaves the order below them untouched.',
      'GREEN18 moves the surviving quarterbacks up — not because they became better players, but because **replacement level** at the position just fell and the next viable tier moved farther away.',
      '**The player did not suddenly become more talented. His situational value changed.**',
      'That is [Draft-State Valuation](/draft-science/draft-state-valuation) doing its job, and [the Superflex quarterback run](/scenarios/superflex-quarterback-run) walks the same sequence through pick by pick.',
    ]},

    { type: 'prose', h2: 'What About the Position That Is Getting *Cheaper*?', body: [
      'The mirror case decides as many picks, and almost nobody plays it.',
      'Strong receivers keep falling. You already start two. Plenty remain and your next pick is close. A highly ranked receiver moves **down** your board, because his margin over replacement is small — a comparable player will survive your **pick horizon**.',
      'The talent did not change. The opportunity cost of spending this pick on him did.',
      'A consensus ranking structurally cannot make this call: it does not know your roster and it does not know when you pick again. [How far away your next turn is](/draft-science/pick-horizon) is the input that converts every valuation into a decision.',
    ], quote: 'The scarce position is not the one with the best players. It is the one where waiting hurts most.' },

    { type: 'steps', h2: 'How GREEN18 Prices a Pick', steps: [
      { h3: 'How good is the player?', body: ['Start with fundamental player value, computed from open football data.'] },
      { h3: 'How does this league score him?', body: ['Scoring changes the value of production, so it is applied before the board is built.'] },
      { h3: 'How badly does your roster need him?', body: ['The same player creates different value for different [roster constructions](/draft-science/roster-construction).'] },
      { h3: 'What happens if you wait?', body: ['The model estimates who is likely to survive until your next turn, and takes the difference. That difference is the margin over replacement.'] },
      { h3: 'How scarce is the position?', body: ['Remaining depth is measured as a slope and compared against every other position, not judged on its own.'] },
      { h3: 'What has the league been doing?', body: ['Runs, reaches and falls are all recorded picks, and each one moves a tier.'] },
      { h3: 'When do you pick again?', body: ['Your pick horizon sets what you can afford to defer and what must be decided now.'] },
      { h3: 'What do you prefer?', body: ['Your strategy matters. Preferences are an input to the valuation, [never an override](/personalized-fantasy-football-rankings).'] },
    ]},

    { type: 'prose', h2: 'Is a Falling Player a Bargain or a Trap?', body: [
      'Neither, on its own. A player dropping below his expected draft position is information, not an instruction.',
      'GREEN18 evaluates the fall against your roster, the alternatives still on the board, the slope behind him, your league settings and your next turn.',
      'The model is not chasing discounts. It is deciding whether a discount actually matters to you — the difference between a market price and your value, which is the subject of [dynamic ADP](/dynamic-fantasy-football-adp).',
      'The calculation is **deterministic**: [the same board always produces the same answer](/fantasy-football-draft-algorithm), so a move on your board is always traceable to a specific pick.',
    ]},

    { type: 'prose', h2: 'Who Is This Actually For?', body: [
      'Managers who already know the theory and cannot execute it at pick 84 on a Tuesday night.',
      'There are too many interacting variables to recompute by hand after every selection, on the clock, in a room full of people waiting on you.',
      'The manager supplies the philosophy. The model keeps recalculating the board.',
      'It reads the same either way — in a [competitive league where everyone prepared](/competitive-fantasy-football-draft), or a [home league where nobody did](/home-league-draft-assistant).',
    ]},

    { type: 'convert', h2: 'Every Selection Creates a New Draft.',
      body: ['A static sheet can tell you who was best in August. It cannot tell you what waiting costs tonight.', '**Download GREEN18 for iPhone and draft against the board as it actually is.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How does GREEN18 handle positional scarcity during a draft?', a: 'GREEN18 computes the cost of waiting one full turn at every position and compares those costs against each other, then recomputes the comparison each time a pick is recorded. The board is ordered by each remaining player’s margin over replacement in the league’s own scoring, so the position whose slope is steepening rises without the manager having to notice it.' },
    { q: 'Why does a player rise on my board when nobody drafted him?', a: 'Because his replacement got worse. When several players at a position are selected, the best player still available at that position after the manager’s next turn drops several tiers, which widens the gap between the player and his likely replacement. The player’s expected production is unchanged; the cost of not taking him has risen.' },
    { q: 'Should a highly ranked player ever move down my board?', a: 'Yes, when his position stays deep and the manager’s next pick is close. If a comparable player is likely to survive until the next turn, the margin over replacement is small and the pick is better spent where the drop-off is steeper, even though a consensus ranking places the first player higher.' },
    { q: 'Does GREEN18 tell me which position to draft?', a: 'No. GREEN18 orders the players still available by what they are worth to a specific roster at a specific pick and shows the components behind each valuation, including the cost of waiting. The manager makes every selection and enters it in whichever platform hosts the league.' },
    { q: 'Do I need to understand scarcity to use GREEN18?', a: 'No. The board is ordered by the calculation, so a manager can read the top of it without first learning how the slope is measured. Managers who want the underlying definitions can read the draft-science pages, which set out positional scarcity, replacement value, opportunity cost and pick horizon in full.' },
  ],

  links: [
    'draft-science/positional-scarcity',
    'draft-science/draft-state-valuation',
    'fantasy-football-draft-algorithm',
    'dynamic-fantasy-football-adp',
    'personalized-fantasy-football-rankings',
  ],
};
