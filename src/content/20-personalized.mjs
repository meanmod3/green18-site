// PAGE 20 — personalization. Source doc §29 (verbatim yaml + copy), enriched
// with §4, §5, §6, §7, §19, §21, §22. The load-bearing nuance: preferences are
// an input, not an override. Never describe this as model fine-tuning (§22).
export default {
  slug: 'personalized-fantasy-football-rankings',
  title: 'Personalized Fantasy Football Rankings | GREEN18',
  description: 'GREEN18 creates a live player board calibrated to your league, roster, preferences, and the players still available.',
  breadcrumb: 'Personalized Rankings',

  hero: {
    eyebrow: 'Personalized Valuation',
    h1: 'Rankings for Your League, Not Everyone Else’s.',
    lede: [
      'A generic fantasy ranking has to make assumptions. GREEN18 doesn’t have to make as many.',
      'Tell it how your league works. Tell it what matters to you. Start drafting.',
      '**As your roster and the available player pool change, your board changes with them.**',
    ],
    cta: 'Build Your Board',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'How the Board Is Calibrated', href: '#how-it-works' },
  },

  claims: [
    'Every preference dial in GREEN18 is bounded, so no single setting can invert the board — the adversarial case of one slider being pushed to its limit is handled by design rather than left to the manager’s restraint.',
    'Preferences never move the objective player values or the market values in GREEN18; that separation is architectural and is held in place by automated tests.',
    'Preferences do reorder the manager’s own board, by a bounded amount, on a copy that belongs to that manager — the personal board is the board they draft from, not a second list shown alongside the real one.',
    'Because the reordering is bounded and the underlying values are untouched, a personalized GREEN18 board stays replayable: the same league settings, preferences and recorded picks produce the same board every time.',
  ],

  blocks: [
    { type: 'prose', h2: 'Your League Is a Variable.', body: [
      'Scoring matters.',
      'Roster construction matters.',
      'League format matters.',
      'The players your opponents select matter.',
      'Your next pick matters.',
      'GREEN18 recalculates player value in that context instead of assuming one universal ranking should fit every manager.',
    ], quote: 'A player board calibrated to your league, roster, and draft.' },

    { type: 'prose', h2: 'Two Managers. Same Three Players. Different Order.', body: [
      'Imagine two managers looking at the exact same three players.',
      'One already drafted two wide receivers. The other has none.',
      'One picks again in six selections. The other waits nineteen.',
      'One prefers volatility and upside. The other wants a safer roster.',
      'Those three players should not necessarily appear in the same order for both of them — that is [Draft-State Valuation](/draft-science/draft-state-valuation) rather than a ranking, and both orderings can be correct.',
      'GREEN18 is not trying to produce the world’s single perfect ranking. It is trying to produce the right ranking for the decision in front of you.',
    ]},

    { type: 'steps', h2: 'What Shapes Your Board', steps: [
      { h3: '1. Your League.', body: ['Scoring rules, roster requirements, flex structure and quarterback format are applied to the player pool before the board is built, so they re-rank players rather than relabel them.'] },
      { h3: '2. Your Preferences.', body: ['Targets, players you would rather avoid, and how much risk you want become part of your draft profile — one input among many, tuned to your preferences.'] },
      { h3: '3. Your Roster.', body: ['The same player creates different value for different team constructions. As your roster fills, positional need and future flexibility move with it.'] },
      { h3: '4. Your Draft.', body: ['Every pick you record changes the remaining pool, the [positional scarcity](/draft-science/positional-scarcity) behind each position, and how far away your next opportunity is.'] },
    ]},

    { type: 'prose', h2: 'Your Preferences Are a Variable Too.', body: [
      'Like upside? Prefer safer players? Have targets? Have players you’d rather avoid?',
      'GREEN18 can use those preferences as part of your draft profile.',
      '**The model stays analytical. The board becomes yours.**',
      'A draft tool should not pretend you have no opinions. It also should not pretend your opinions are the whole answer.',
    ]},

    { type: 'prose', h2: 'Personalized Doesn’t Mean Random.', body: [
      'GREEN18 doesn’t move players simply because you like them.',
      'Preferences are one input among many. Your board remains anchored to:',
    ], list: [
      'player value',
      'league value',
      'projected draft position for your league’s format',
      'positional scarcity',
      'survival to your pick horizon',
      '[roster construction](/draft-science/roster-construction)',
    ], after: [
      'Your player queue becomes a signal. Not a command.',
      '**Your preferences shape the decision. They don’t replace the math.**',
      'The valuation stays **deterministic** and replayable — [same board in, same board out](/fantasy-football-draft-algorithm) — and your preferences never move the objective or market values themselves. They reorder your own board, by a bounded amount, on your copy.',
    ]},

    { type: 'prose', h2: 'How “Shapes, Doesn’t Replace” Is Actually Enforced.', body: [
      'That line is easy to write. Here is the mechanism underneath it.',
      'Every preference control in GREEN18 has a **bounded** authority. The design starts from the adversarial case — a manager who pushes a single dial as far as it goes — and answers it structurally: no one setting has enough reach to invert the board. You can lean the board; you cannot flip it.',
      'The second half is a separation. Preferences do not touch the objective player values or the market values at all. That boundary is architectural, and automated tests hold it in place, so a preference cannot leak into the numbers everyone else is being measured by.',
      'What preferences do move is **your own board** — a copy that belongs to you — reordered by a bounded amount. That is the board you draft from. It is not a second opinion parked next to the real one.',
    ], quote: 'Bounded reach on your copy. No reach at all on the underlying values.' },

    { type: 'cards', h2: 'The Market Has a Price. You Have a Value.', sub: 'Average draft position approximates what other managers tend to pay. GREEN18 asks a different question: what should you pay?',
      cards: [
        { h3: 'Where They Agree', body: 'When the market price and your situational value line up, the decision is easy and the board says so.' },
        { h3: 'Where They Diverge', body: 'A player can be a bargain for the league and still be wrong for your roster — what your roster still has to fill, and who survives to your next turn, is what decides it. The gap is where the interesting decisions live, as in [best player available versus need](/scenarios/best-player-available-vs-roster-need).' },
        { h3: 'Why It Moves', body: 'Market value comes from how the draft is actually going. Personal value comes from your league, roster and next pick. Both update as picks are recorded.' },
      ]},

    { type: 'prose', h2: 'Start With Consensus. Finish With Your Board.', body: [
      'Consensus rankings are designed for everyone. That is their strength and their ceiling.',
      'The more specific your draft becomes, the more specific your rankings should become.',
      'GREEN18 begins with broad player value and then narrows it — by [league format](/fantasy-football-draft-strategy-app), by [scoring](/ppr-draft-assistant), by roster, and by [everything that has already happened on the board](/live-fantasy-football-draft-assistant).',
      'The best player for everyone isn’t necessarily the best player for you.',
    ]},

    { type: 'convert', h2: 'Your Draft Creates the Final Ranking.',
      body: ['A ranking built before your draft can’t know your draft.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What are personalized fantasy football rankings?', a: 'Personalized fantasy football rankings are player rankings calculated for one specific team rather than for every manager at once. They account for the league’s scoring and roster rules, the players a manager has already drafted, how long until that manager picks again, and which players are still available. Two managers in the same draft can correctly see the same players in a different order.' },
    { q: 'How does GREEN18 personalize a draft board?', a: 'GREEN18 applies the league settings to the player pool, incorporates the manager’s stated preferences and target players as inputs to the valuation, accounts for the current roster and remaining positional needs, and updates the board as each pick is recorded. It is a deterministic calculation, not a machine-learning model, and it has no chat interface.' },
    { q: 'Do my player preferences override the model?', a: 'No. Preferences are one input among many. The board stays anchored to player value, league value, positional value, scarcity, availability and roster construction. A queued or favorited player is treated as a signal that contributes to the valuation, not as a command that forces a recommendation.' },
    { q: 'Can one preference setting take over my board?', a: 'No. Each preference control has a bounded authority by design, so no single setting has enough reach to invert the board. Preferences reorder your own copy of the board by a bounded amount, and they do not move the objective player values or the market values at all — that separation is architectural and covered by automated tests.' },
    { q: 'Is personalization the same as machine-learning fine-tuning?', a: 'No. GREEN18 does not train or fine-tune a model on user data. Personalization means the same deterministic calculation is run with the manager’s own league settings, roster and preferences as inputs, which produces a board calibrated to that specific draft.' },
    { q: 'Does GREEN18 need an account to personalize my board?', a: 'No. GREEN18 requires no account and no sign-in. League settings, preferences and recorded picks stay on the device, and the board is calibrated from that local information.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-positional-scarcity',
    'draft-science/roster-construction',
    'dynamic-fantasy-football-adp',
    'home-league-draft-assistant',
  ],
};
