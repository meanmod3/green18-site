// PAGE 36 — /draft-science/opportunity-cost. Source: Product Science §16.
// The five costs: scarce position, falling value, duplicated strength, lost
// flexibility, a weaker future pick. The second-order question page.
export default {
  slug: 'draft-science/opportunity-cost',
  pageType: 'science',
  title: 'Opportunity Cost in a Fantasy Draft | GREEN18',
  description: 'What a pick actually costs: a scarce position, a falling value, duplicated roster strength, lost flexibility, a weaker future pick. The five costs, defined.',
  breadcrumb: 'Opportunity Cost',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Does a Fantasy Draft Pick Actually Cost You?',
    lede: [
      'Everyone knows taking Player A means not taking Player B. That is the smallest part of the bill.',
      'A pick also spends a position, a roster slot, a piece of your flexibility, and part of what your next pick will be able to do.',
      '**The real draft question is not “who is best?” — it is “what do I give up by taking him instead of waiting?”**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'The five things a pick spends', href: '#how-it-works' },
  },

  answer: 'Opportunity cost in a fantasy draft is everything a manager gives up by making one selection instead of another or instead of waiting, and it extends well beyond the specific player not taken. A single pick can simultaneously cost access to a position that is about to become scarce, the chance to take a player who has fallen below his expected draft position, the marginal value of a roster slot that is now filled with strength duplicated from elsewhere, the flexibility to respond to whatever the board does next, and the quality of the manager\'s own future picks, which must now cover the positions this one did not. Because these costs are paid in different currencies and only some of them show up as points, the correct pick is frequently not the highest-ranked available player but the one whose total cost is lowest given the roster, the format and the distance to the manager\'s next turn.',

  claims: [
    'Opportunity cost in a fantasy draft is everything a manager gives up by making one selection instead of another or instead of waiting.',
    'A single draft pick can cost access to a scarce position, a falling player, a roster slot, positional flexibility, and the quality of a future pick at the same time.',
    'Duplicating strength at a position a manager already starts converts a high-ranked player into a low-value pick, because only the marginal lineup slot he fills counts.',
    'A player falling below his expected draft position changes the opportunity cost of every other available player, without automatically becoming the correct selection.',
    'The correct pick is the one with the lowest total opportunity cost, which is frequently not the highest-ranked player still available.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Is “Who Is Best?” the Wrong First Question?', body: [
      'Because it is a first-order question, and drafting is a second-order problem.',
      '“Who is best?” has one answer for the whole room. Every manager sees the same board and, on a static list, the same top name. If that were the real question, drafting would be a formality and the order would be fixed before anyone sat down.',
      'The question that actually differs between managers — and therefore the one that decides drafts — is: *what does taking him cost me, that waiting would not?*',
      'That question has a different answer for every seat at the table, because every seat has a different roster, a different next pick, and a different set of things it can still afford to lose.',
    ], quote: 'What do I give up by taking this player instead of waiting?' },

    { type: 'cards', h2: 'What Are the Five Things a Pick Spends?', sub: 'A selection is charged against all five at once. Only the first is a player.',
      cards: [
        { h3: '1. The player you did not take', body: 'The visible cost, and usually the smallest. If the player you passed on is replaceable by a near-equivalent at your next turn, this cost rounds to nothing — which is why it is a poor basis for the decision on its own.' },
        { h3: '2. Access to a position about to go scarce', body: 'Spending a pick at a deep position while a thin one empties can cost you an entire tier. This is the cost that arrives late and is unrecoverable: by your next turn, the position you deferred may have no startable players left, and no later pick can undo that.' },
        { h3: '3. A falling player you can no longer take', body: 'When a player drops well below his expected draft position, he becomes available at a price the market does not usually offer. Passing does not merely cost the player — it costs the discount, which will not be there next round.' },
        { h3: '4. Duplicated roster strength', body: 'A third strong receiver on a team already starting two only fills a flex slot, so his contribution is measured against the best flex-eligible player of any position rather than against the next receiver. High rank, low marginal value, and the most common expensive mistake on this list.' },
        { h3: '5. Flexibility, and your next pick', body: 'Every filled slot narrows what you can do with the picks that follow. A roster locked into one shape must respond to a run, a fall or a collapse with whatever picks remain, so committing early to the wrong shape quietly downgrades every selection after it.' },
      ]},

    { type: 'prose', h2: 'How Can a Higher-Ranked Player Be the More Expensive Pick?', body: [
      'Take the case that recurs in every draft.',
      'Strong receivers keep falling. Your roster already starts two. Plenty of comparable receivers remain, and your next pick is close. Meanwhile the tight ends have thinned to a handful of startable names.',
      'The board says the receiver is the best player available, and the board is right about that. He is also the more expensive pick: he fills a flex slot you could fill later with an equivalent, and he spends the one selection standing between you and the far side of a tight-end cliff.',
      '**The player’s talent did not change. The opportunity cost of drafting him now changed.**',
      'That is the case a consensus ranking structurally cannot make, because it does not know your roster, your format, or when you pick again. It is worked through in [already having two wide receivers](/scenarios/already-have-two-wide-receivers).',
    ], quote: 'The player’s talent did not change. The opportunity cost of drafting him now changed.' },

    { type: 'prose', h2: 'Is a Falling Player Automatically Worth Taking?', body: [
      'No. A fall is information, not an instruction.',
      'A player dropping below his expected draft position tells you the market has repriced him. It does not tell you whether the repriced player fits a lineup slot you actually need, at a position whose cliff is near, at a moment when you can afford to spend the pick.',
      'The failure mode is well known and expensive: a roster of nothing but bargains, none of which start together, assembled by a manager who kept taking the largest discount rather than the largest gain.',
      'Evaluate the fall against your roster, the remaining depth, the league settings, the scarcity forming ahead of you, and the rest of the board. **The question is not whether the discount is real. It is whether the discount is a discount on something you need.** [Dynamic ADP](/dynamic-fantasy-football-adp) covers how those market moves are read.',
    ]},

    { type: 'steps', h2: 'How Do You Price a Pick Before You Make It?', steps: [
      { h3: 'Name the alternative honestly.', body: ['Not “the next name on the list” but the specific realistic other action: a different position, or the same position one turn later. A cost is only measurable against a stated alternative.'] },
      { h3: 'Ask which lineup slot each option actually fills.', body: ['A player who fills a starting hole and a player who fills a flex already covered are not comparable, whatever their ranks say. Marginal slot value comes before player value.'] },
      { h3: 'Check what disappears before your next turn.', body: ['Run the position pools forward across the intervening picks. Anything likely to be gone is something this pick either buys or forfeits, and forfeits are permanent.'] },
      { h3: 'Price the flexibility you are spending.', body: ['A pick that leaves you able to respond to two or three different board states is worth more than an equally ranked pick that commits you to one. Flexibility is only cheap when the board is calm.'] },
      { h3: 'Compare total costs, not player ranks.', body: ['The correct selection is the option with the lowest total cost across all five charges, which is frequently not the highest-ranked player still available.'] },
    ]},

    { type: 'prose', h2: 'Why Does Opportunity Cost Rise as My Next Pick Gets Further Away?', body: [
      'Because opportunity cost is a function of what you can still fix.',
      'If your next pick is three selections away, almost every cost on this page is recoverable. Pass on a position and you can take it in a moment; miss a falling player and you have lost one player, not a tier. Costs are small because the horizon is short.',
      'From the turn, with nineteen picks in front of you, every cost is charged at full price. Whatever you decline now, you decline through two full rounds of other managers taking exactly the players you were counting on.',
      'This is why the same board produces different correct picks at different seats — and why [pick horizon](/draft-science/pick-horizon) is a first-class input rather than a footnote.',
    ], quote: 'Opportunity cost is small when the mistake is cheap to fix, and largest at the turn.' },

    { type: 'prose', h2: 'How Does This Change How I Draft?', body: [
      'It replaces one habit with another.',
      'The habit it replaces: scanning for the highest name still on the board, then taking it unless something feels wrong.',
      'The habit it installs: for the two or three genuine candidates, asking what each one costs you — in position access, in slot value, in flexibility, in the strength of your next pick — and taking the cheapest.',
      'Nothing here requires knowing more players. It requires asking a better question about the ones already in front of you. GREEN18 exists because that question is arithmetic, and arithmetic is what a ninety-second clock is worst at.',
    ]},

    { type: 'convert', h2: 'Every Pick Sends You a Bill.',
      body: [
        'Most of a pick’s cost is invisible on a ranked list, because a list has no roster, no format and no next turn.',
        'GREEN18 continuously recalculates what each available player costs you given your league settings, your roster, the board as it actually stands, and how far away you pick again.',
        '**Download GREEN18 and pick by cost, not by rank.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is opportunity cost in a fantasy football draft?', a: 'Opportunity cost is everything a manager gives up by making one pick instead of another or instead of waiting. Beyond the specific player not taken, it includes losing access to a position about to become scarce, passing on a player who has fallen below his expected draft position, duplicating existing roster strength, reducing roster flexibility, and forcing a weaker pick later.' },
    { q: 'Why can the highest-ranked available player be the wrong pick?', a: 'Because rank measures a player while opportunity cost measures a decision. A highly ranked player at a deep position, filling a slot the roster already covers, can cost more than he adds when a thinner position is about to run out, since a comparable player at the deep position is likely to survive until the manager\'s next turn and the thin position\'s players are not.' },
    { q: 'Does duplicating a position always waste a pick?', a: 'Not always, but it sharply reduces the pick\'s marginal value. A player at a position the roster already starts competes only for a flex or bench slot, so his contribution is measured against the best flex-eligible player of any position rather than against the next player at his own position, which is usually a much higher bar.' },
    { q: 'Should a manager always draft a player who has fallen?', a: 'No. A fall is information rather than an instruction. It shows the market has repriced a player, but it does not establish that the player fills a needed lineup slot, that his position is scarce, or that the pick can be spared, and a roster assembled purely from discounts frequently cannot field a strong starting lineup.' },
    { q: 'How does the distance to the next pick change opportunity cost?', a: 'Opportunity cost rises with the distance to a manager\'s next selection, because a longer wait means more of what is declined now will be gone by the time the manager can act again. With a short wait most costs are recoverable, while from the turn nearly every cost is charged in full and cannot be undone later.' },
  ],

  links: [
    'scenarios/already-have-two-wide-receivers',
    'tools/pick-horizon-calculator',
    'draft-science/pick-horizon',
    'dynamic-fantasy-football-adp',
    'fantasy-football-draft-strategy-app',
  ],
};
