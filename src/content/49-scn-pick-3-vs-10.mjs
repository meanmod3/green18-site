// PAGE 49 — scenario. Draft-slot question. Deliberately refuses the "early is
// better" folk answer and reframes the slot as a distribution of pick horizons.
export default {
  slug: 'scenarios/pick-three-vs-pick-ten',
  pageType: 'scenario',
  title: 'Is an Early Draft Pick Better Than a Late One? | GREEN18',
  description: 'Drawing an early or a late slot changes the shape of your draft, not its quality. How pick horizon, tier timing and the turn decide which slot suits which board.',
  breadcrumb: 'Early Pick vs Late Pick',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'I Drew an Early Pick Instead of a Late One. Does That Help?',
    lede: [
      'One manager gets the best player in the draft and then waits a long time. Another gets two players close together, twice per round pair.',
      'Those are different shapes, and which one is better is a property of the board, not of the slot.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'An early draft slot and a late one are not ranked outcomes; they are different distributions of the same total. An early slot buys access to the top of the board and pays for it with the longest gaps between selections, while a late slot buys paired picks at the turn and pays for it by never seeing the top tier. Which is preferable depends on the shape of the board: when the very top of the board is separated from the rest by a large margin, the early slot is worth more; when the top is flat and the meaningful separations happen further down, the paired picks at the turn are worth more, because they let a manager take both sides of a tier boundary before it closes.',

  claims: [
    'An early draft slot and a late one distribute the same number of selections differently rather than providing unequal total value.',
    'The value of an early slot rises when the top of the board is separated from the rest by a large margin.',
    'Paired picks at the turn allow a manager to take both sides of a tier boundary before other teams can select between them.',
    'A longer gap between selections raises the probability that any given player a manager intends to wait for is no longer available.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Actually Differs Between the Two Slots?', body: [
      '**Access to the top.** An early slot is the only way to hold a player from the highest tier. If that tier is genuinely separated from what follows, nothing else in the draft replaces it.',
      '**Gap length.** An early slot has the longest wait of anybody in the room after each pick. Every plan of the form "I will take that later" is least reliable from the front of the order.',
      '**Pick pairing.** A late slot selects twice in quick succession at the turn. Two adjacent picks are worth more than two distant picks of the same nominal value, because no other team can act between them.',
      '**Information.** A late slot sees almost a full round of picks before choosing, so it drafts with more knowledge of what the room needs and how it is behaving.',
    ], quote: 'The slot does not change how much you get. It changes when.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that the early slot is simply better because it takes the best player. Nominal draft order is compensated by design: the manager picking first also waits longest, and across the whole draft the totals are close. What differs is variance and shape.',
      'The second wrong inference is the fashionable inversion — that the turn is always better because you get two picks. Two picks at the turn are two picks; the pairing is an advantage only when there is a tier boundary near them that you can capture on both sides. When the board is flat there, the pairing is worth very little.',
      'A third mistake is planning a slot-specific strategy before seeing the board. A slot is a constraint on **timing**, and timing only matters relative to where the quality drops sit. The same slot rewards opposite approaches in two different formats.',
      'A fourth is treating the wait as fixed. The number of picks between your turns is fixed; the number of players you care about who disappear during it is not, and that is the quantity that actually costs you.',
    ]},

    { type: 'steps', h2: 'How to Play the Slot You Drew', steps: [
      { h3: 'Map the tier boundaries before the draft starts.', body: ['Find where the board drops rather than where the names rank. Those drops are the only structure a slot can be played against.'] },
      { h3: 'Locate your picks relative to those drops.', body: ['Ask which boundaries fall inside your gaps and which fall on your picks. A boundary inside a gap is a boundary you cannot control.'] },
      { h3: 'From an early slot, take the separation while it exists.', body: ['If the top tier is genuinely separated, the early pick is the reason you have the slot. Spend it there rather than on a marginal positional plan.'] },
      { h3: 'From an early slot, plan for the long gap.', body: ['Assume the players you are counting on at your next turn will not all be there, and prefer picks that leave you with more than one acceptable continuation.'] },
      { h3: 'From the turn, hunt boundaries you can straddle.', body: ['Look for a tier that will not survive the round and take both sides of it with your paired picks, since no team selects in between.'] },
      { h3: 'Recompute after every pick, from any slot.', body: ['The value of a slot is entirely a function of the current board, so it changes every time somebody selects.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Board shape.** A board with a large separation at the top favours the early slot; a flat top with sharp drops in the middle rounds favours the turn.',
      '**League size.** More teams means longer gaps for everybody, which raises the cost of waiting and makes the top-of-board access more valuable.',
      '**Format.** Formats that concentrate demand at a position — such as those allowing a quarterback in a flexible slot — create sharper tier boundaries, which is what the turn is best equipped to exploit.',
      '**Draft order rules.** Whether the order reverses each round, and whether the reversal is applied to the first round, changes how long the longest gap actually is.',
      '**Your own tolerance for variance.** The early slot concentrates your team’s outcome in fewer, larger decisions; the turn spreads it across more, smaller ones.',
    ], after: [
      'The quantity doing the work here is the [pick horizon](/draft-science/pick-horizon); the boundaries it is measured against are covered in [tier collapse](/draft-science/player-tier-collapse).',
    ]},

    { type: 'convert', h2: 'Play the Board You Have From the Seat You Drew.',
      body: ['GREEN18 accounts for where your next pick actually falls, so the cost of waiting is priced into every recommendation instead of being left to intuition.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is an early draft pick better than a late one?', a: 'Neither slot is better in general. An early slot buys access to the top of the board and pays with the longest waits between selections; a late slot buys paired picks at the turn and pays by never reaching the top tier. Which is preferable depends on whether the board’s largest quality separations sit at the top or further down.' },
    { q: 'What is the advantage of drafting from the turn?', a: 'Two picks in immediate succession, with no other team able to select between them. That lets a manager take both sides of a tier boundary that will not survive the round, which is a genuine advantage when such a boundary exists near the turn and worth very little when the board there is flat.' },
    { q: 'What is the disadvantage of an early draft slot?', a: 'The longest gap between selections in the room. Every plan that depends on a specific player still being available at the next turn is least reliable from the front of the order, because more teams choose in between than for any other slot.' },
    { q: 'Should draft strategy be chosen before seeing the board?', a: 'A slot constrains timing, and timing only matters relative to where quality drops on the board. Since those drops depend on format, scoring and league size, the same slot rewards different approaches in different leagues, which makes a strategy fixed in advance of the board unreliable.' },
  ],

  links: [
    'draft-science/pick-horizon',
    'draft-science/player-tier-collapse',
    'scenarios/drafting-from-the-turn',
    'fantasy-football-draft-assistant',
    'fantasy-football-draft-strategy-app',
  ],
};
