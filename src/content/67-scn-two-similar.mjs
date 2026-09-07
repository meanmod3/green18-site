// PAGE 67 — scenario. The near-tie page. The point: when two valuations are
// equal, the decision moves off the players entirely and onto the board behind
// them, the horizon, and the roster.
export default {
  slug: 'scenarios/choosing-between-two-similar-players',
  pageType: 'scenario',
  title: 'Two Players You Value Almost Identically | GREEN18',
  description: 'When two players grade out the same, the decision moves off the players. The tie-breakers that matter: replacement slope, availability, roster fit, horizon.',
  breadcrumb: 'Two Similar Players',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'I Value These Two Players Almost the Same. How Do I Choose?',
    lede: [
      'Two names, two positions, one pick, and no meaningful difference between them on your board.',
      'When the players are tied, the answer is not in the players. It is in what happens behind each of them.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'When two players carry nearly identical valuations, the difference between them is too small to decide the pick, so the decision moves to the board behind them. Four quantities break the tie, in order of weight: which player’s position has replacement quality falling faster, so the gap you can capture now will not exist later; which player is more likely to still be available at your next selection, since taking the scarcer one first captures both; which player fits a starting slot you have not filled, because a player who displaces someone you already start delivers less improvement than his rating implies; and how far away your next pick is, because a long wait magnifies every one of the first three. If those four point in different directions, the tie is genuine and the remaining tiebreaker is flexibility — take the player who leaves more of your roster open to whatever the board does next.',

  claims: [
    'When two players carry equal valuations, the deciding information is the shape of the board behind each of them rather than any property of the players.',
    'The position whose replacement quality falls faster should be drafted first, because that gap is the one that will not survive to the next selection.',
    'Taking the player less likely to remain available captures both players when the other survives, which is the highest-value ordering of two equal picks.',
    'A player who would displace an existing starter delivers less lineup improvement than an equally rated player filling an unfilled slot.',
    'Distance to the next pick amplifies every tiebreaker, because a longer wait increases the chance that the fragile option disappears.',
  ],

  blocks: [
    { type: 'prose', h2: 'What a Near-Tie Actually Is.', body: [
      '**A tie is a statement about precision, not about equality.** Two valuations that sit within the noise of any projection are not measurably different, and forcing a distinction between them invents information.',
      '**The pick still has to be made, so the decision must come from somewhere else.** Everything downstream of the two players is still measurable: what is behind them, who wants them, and when you pick again.',
      '**Sequencing is the real question.** Very often you are not choosing which player to own — you are choosing which one to own **first**, and the second may still be there.',
      '**Your roster breaks symmetry.** Two equal players stop being equal the moment one of them lands in an empty slot and the other lands behind a starter.',
    ], quote: 'When the players are tied, draft the board.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The first wrong move is to break the tie with a more precise ranking. If two players are inside the error of your own estimate, a decimal place does not resolve anything; it only relabels a coin flip as a decision.',
      'The second is defaulting to the scarcer **position** rather than the steeper **slope**. Those are not the same thing. A position can be widely described as thin while the specific stretch of board behind your candidate is flat, in which case waiting costs you nothing.',
      'A third is treating personal preference as a tiebreaker of last resort. Preference is legitimate, but it should be applied consciously and last, after the measurable tiebreakers have failed — not used to avoid running them.',
      'A fourth is forgetting that you may get both. Managers routinely agonise over a choice that the next fifteen picks would have resolved for free. The question "which one is less likely to be here later" is usually more productive than "which one is better".',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Confirm the tie is real.', body: ['If one player is clearly ahead under your league’s scoring, there is no tie and no tiebreaker is needed. Only proceed when the difference is inside the noise.'] },
      { h3: 'Compare the slope behind each.', body: ['Look at the next few players at each position. Whichever position drops off faster is the one whose current gap is perishable.'] },
      { h3: 'Estimate survival for each.', body: ['Count the teams picking before your next turn and how many still need each position. Take the one less likely to last.'] },
      { h3: 'Apply roster fit.', body: ['Prefer the player who fills a slot you must start and have not filled. A player who sits behind an existing starter converts less of his rating into points.'] },
      { h3: 'Weight everything by the horizon.', body: ['A short wait lets you test the board and often take both. A long wait means the fragile option should be taken now, because it will not be tested — it will be gone.'] },
      { h3: 'Break a true tie with flexibility.', body: ['If the measures genuinely disagree, take the player who keeps more future options open, including eligibility for flexible starting slots.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Scoring rules.** Scoring changes the separation between players at each position, so a tie under one format is frequently not a tie under another.',
      '**League size.** Deeper leagues shorten survival for everybody, which raises the weight of the availability tiebreaker relative to the others.',
      '**Starting requirements.** A format that starts more of one position increases demand there, making that position’s candidate less likely to survive.',
      '**Flexible slots.** Broad flex eligibility softens roster fit as a tiebreaker, because more players can reach a startable seat.',
      '**Where you pick in the round.** From the turn, back-to-back picks make sequencing nearly free and the tie genuinely low-stakes. From mid-round, the wait does the deciding.',
      '**How much of the draft remains.** Early, flexibility is worth more than fit; late, fit is worth more, because there are fewer picks left to correct with.',
    ], after: [
      'The slope you are comparing is [positional scarcity](/draft-science/positional-scarcity); the timing weight is [pick horizon](/draft-science/pick-horizon).',
    ]},

    { type: 'convert', h2: 'Ties Are Broken by the Board, Not the Names.',
      body: ['GREEN18 shows the drop behind each available player and the likelihood he survives to your next pick, recalculated after every selection — which is exactly the information a tie needs.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How do you choose between two players you value the same?', a: 'Move the decision off the players and onto the board behind them. Draft the one whose position has replacement quality falling faster, or the one less likely to survive until the next pick, or the one filling a starting slot that is currently empty. Distance to the next selection determines how much weight each of those tiebreakers carries.' },
    { q: 'Why is availability a better tiebreaker than a more precise ranking?', a: 'Because two valuations inside the noise of a projection are not measurably different, while availability is a genuine difference between the two options. Taking the player less likely to remain on the board captures both players whenever the other one survives, which is strictly better than resolving the tie by inventing precision.' },
    { q: 'Does roster fit matter when two players are equally rated?', a: 'Yes, because equal ratings produce unequal lineup improvement. A player who fills an unfilled starting slot is measured against a weak replacement, while an identically rated player who sits behind an existing starter is measured against that starter, and therefore adds far less to the lineup that actually scores.' },
    { q: 'What if every tiebreaker points a different way?', a: 'Then the tie is genuine and the remaining criterion is flexibility. Prefer the player who keeps more of the roster open to whatever the board does next, including eligibility for flexible starting slots, since an option that can be used in more ways is worth more when nothing else separates the two.' },
  ],

  links: [
    'draft-science/positional-scarcity',
    'draft-science/pick-horizon',
    'scenarios/last-player-in-a-tier',
    'tools/pick-horizon-calculator',
    'fantasy-football-cheat-sheet-app',
  ],
};
