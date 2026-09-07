// PAGE 37 — /draft-science/pick-horizon. Source: Product Science §12
// (Draft Position State) + §14. The component most often omitted entirely:
// distance to your next selection as a first-class valuation input.
export default {
  slug: 'draft-science/pick-horizon',
  pageType: 'science',
  title: 'Pick Horizon: Why the Turn Changes Everything | GREEN18',
  description: 'Distance to your next selection is a valuation input, not a scheduling detail. Why pick 3 and pick 10 produce different correct picks from an identical board.',
  breadcrumb: 'Pick Horizon',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'Why Does Your Draft Position Change Which Pick Is Correct?',
    lede: [
      'Two managers see the identical board. One picks again in four selections. The other picks again in nineteen.',
      'They should not make the same pick — and not because one of them is a better drafter.',
      '**Distance to your next turn is not scheduling. It is an input to what every player is worth.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'Pick 3 against pick 10', href: '#how-it-works' },
  },

  answer: 'Pick horizon is the number of selections between a manager\'s current pick and their next one, and it is a first-class input to player valuation rather than a scheduling detail. Distance until a manager\'s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available: a short horizon makes deferring a position cheap, since a comparable player is likely to survive, while a long horizon makes every deferral expensive, since two full rounds of other managers will pick from the same pools first. This is why an identical board produces genuinely different correct selections at pick 3 and pick 10 of the same round — the boards are the same, the horizons are not — and why the turn, where a manager picks twice in immediate succession and then waits the maximum possible interval, inverts the usual advice about taking the best player available.',

  claims: [
    'Pick horizon is the number of selections between a manager\'s current pick and their next one, measured in the actual draft order.',
    'Distance until a manager\'s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available.',
    'An identical draft board can produce two different correct selections for two managers whose only difference is the distance to their next pick.',
    'A short pick horizon makes deferring a position inexpensive, because a comparable player is likely to survive until the manager picks again.',
    'Drafting from the turn produces the longest possible wait between picks, which makes every deferred position more expensive than the same deferral made from the middle of a round.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is a Pick Horizon?', body: [
      'Your pick horizon is simply the number of selections that will be made between this pick and your next one.',
      'In a 12-team snake draft it is fixed by your seat and the round parity. From pick 3, the horizon alternates between 19 and 5. From pick 10, it alternates between 5 and 19. From pick 12 — the turn — it is 23 and then 1.',
      'That number is not a piece of trivia about the schedule. It is the interval over which every player you decline is exposed to eleven other managers.',
      '**The horizon converts a ranking into a decision, because it is the only thing that says how much of the board you are actually allowed to wait for.**',
    ], quote: 'Your pick horizon is how much of the board you are allowed to wait for.' },

    { type: 'diagram', name: 'pickHorizon',
      h2: 'What the Wait Costs',
      sub: 'Your two selections on the draft clock, and the picks that happen in between them.',
      caption: 'The two tall marks are your turns; every mark between them belongs to somebody else. Above the timeline sit the players you would happily take. As the intervening picks are made, most of them go, and only the ones nobody else wanted are still there when you are back on the clock. The longer the span between your marks, the more of that row you have to write off in advance — which is why the same board is a different decision from a different seat.' },

    { type: 'table', h2: 'What Do the Horizons Actually Look Like?',
      sub: 'Selections between consecutive picks, 12-team snake draft. The alternation is what makes seats behave differently even in the same round.',
      columns: ['Seat', 'Round 1 → 2', 'Round 2 → 3', 'What it feels like'],
      rows: [
        ['Pick 1', '22', '2', 'A very long first wait, then two picks almost back to back.'],
        ['Pick 3', '19', '5', 'Long wait first. What you skip in round 1 is largely gone by round 2.'],
        ['Pick 6', '13', '11', 'The most even seat — no wait is unusually long or short.'],
        ['Pick 10', '5', '19', 'Short wait first. You can defer once cheaply, then the door closes hard.'],
        ['Pick 12', '1', '23', 'Two picks in a row, then the longest wait in the draft.'],
      ],
      note: 'Every seat gets 12 picks. What differs is when the waiting happens, and waiting is where players disappear.' },

    { type: 'prose', h2: 'Why Do Pick 3 and Pick 10 Play the Same Board Differently?', body: [
      'Because the same board is a different set of options at each seat.',
      'At **pick 3**, nineteen selections follow before you act again. Anything you can see and want in round 1, you must take in round 1 — because that is very close to two entire rounds of other managers drafting from exactly the pools you were planning to use. From pick 3, deferral is close to forfeiture.',
      'At **pick 10**, only five selections separate you from your next pick. You can decline a position at low risk, watch what happens, and take it a moment later — but then a 19-pick wait follows, so the decision you defer once must be resolved on your second pick or not at all.',
      'The consequence is precise, not vague. Pick 3 should take the scarce, cliff-adjacent players early and let deep positions wait. Pick 10 should take the deep-position value first and fill scarcity across its short-horizon pair. **Same board. Different correct answers. Neither manager is wrong.**',
      '[Pick three versus pick ten](/scenarios/pick-three-vs-pick-ten) runs this side by side, round by round.',
    ], quote: 'Same board, different horizons, different correct picks — and neither manager made a mistake.' },

    { type: 'prose', h2: 'What Makes the Turn Special?', body: [
      'The turn is where the horizon reaches both of its extremes back to back, and that changes the shape of the decision rather than just its difficulty.',
      'Picking at the end of one round and the start of the next means you make two selections with almost no interval between them, and then wait longer than anyone else in the league.',
      'Two things follow. First, the pair should be treated as **one decision about two slots**, not two independent picks — nobody can take a player between them, so you are choosing a combination. That is what makes the turn genuinely advantageous: you can take both sides of a cliff, or pair a scarce position with the best available.',
      'Second, everything you decline across that pair is exposed to more than twenty selections. From the turn, the cost of waiting is at its highest in the entire draft, which is why the standard advice to take the best player available is least reliable here. [Drafting from the turn](/scenarios/drafting-from-the-turn) covers the pairing logic.',
    ]},

    { type: 'steps', h2: 'How Do You Use the Horizon at an Actual Pick?', steps: [
      { h3: 'Count the selections until your next pick.', body: ['The exact number, from the real draft order. Not “a couple of rounds” — the count is the input, and 5 and 19 are not the same decision.'] },
      { h3: 'For each candidate, ask whether an equivalent survives that span.', body: ['Not whether the player himself survives, but whether a player you would be similarly happy with does. Equivalence, not identity, is what makes waiting safe.'] },
      { h3: 'Weight by how many teams ahead of you need that position.', body: ['Ten intervening picks from teams that all still need a quarterback is a far more dangerous span than ten picks from teams that have already filled the position.'] },
      { h3: 'Take what does not survive; defer what does.', body: ['This is the whole rule. The pick belongs to the candidate least likely to have a viable equivalent when you return, not to the highest-ranked name.'] },
      { h3: 'Recount after every selection, because the horizon shrinks.', body: ['A horizon of 19 becomes 18, then 17. Mid-round, the same position that was unsafe to defer at the start of the wait may be perfectly safe near the end of it.'] },
    ]},

    { type: 'prose', h2: 'How Does the Horizon Interact With a Run?', body: [
      'It multiplies it, and this is where drafts are actually lost.',
      'Scarcity and horizon are not independent risks that add together. A run means the intervening managers are all taking from one pool; a long horizon means there are many intervening managers. The number of players removed from that pool before you return is roughly the product of the two.',
      'Which is why a quarterback run is survivable from pick 10 with a 5-pick horizon and can be decisive from pick 3 with a 19-pick horizon, on the very same night, in the same league, off the same board.',
      '**The run tells you the pool is draining. The horizon tells you how much of it drains before you can act.** Together they are the reason a board moves — the [Superflex quarterback run](/scenarios/superflex-quarterback-run) is the canonical case.',
    ], quote: 'A run tells you the pool is draining. Your horizon tells you how much drains before you can act.' },

    { type: 'prose', h2: 'Why Do Static Rankings Ignore This Entirely?', body: [
      'Because a ranking is written before the draft order exists, for every seat at once.',
      'A list published in August cannot know which seat you drew, so it must be written as though horizon does not exist — which is equivalent to assuming everyone picks again immediately. That assumption is exactly right for one seat in the middle of a round and increasingly wrong toward both ends.',
      'This is not a flaw in the ranking. It is a boundary of what a ranking is. Rank is a property of a player; horizon is a property of your seat, and no artifact that describes only players can contain it.',
      'Pick horizon is one of the five components of a [draft-state valuation](/draft-science/draft-state-valuation), and it is the one most often omitted altogether.',
    ]},

    { type: 'convert', h2: 'Draft From Your Seat, Not From the Middle of the Round.',
      body: [
        'Your horizon is knowable before the draft starts and decisive at every pick — and it is the input generic rankings structurally cannot carry.',
        'GREEN18 recalculates the board against your actual pick position, the selections between you and your next turn, and what those teams still need.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is a pick horizon in a fantasy draft?', a: 'A pick horizon is the number of selections between a manager\'s current pick and their next one. It functions as a valuation input rather than a scheduling detail, because it determines how much of the board other managers will consume before that manager can act again, and therefore how much a deferred decision costs.' },
    { q: 'Why does distance to the next pick change what a player is worth?', a: 'Because waiting carries a probability that viable alternatives will no longer be available. A player is worth more when the manager cannot realistically obtain a comparable player before their next turn, and worth less when the wait is short enough that an equivalent player is likely to survive it.' },
    { q: 'Why do pick 3 and pick 10 make different correct selections from the same board?', a: 'Because their pick horizons differ. In a 12-team snake draft, pick 3 waits 19 selections before picking again while pick 10 waits only 5, so pick 3 must secure anything scarce immediately while pick 10 can defer a position at low risk and address it a few selections later.' },
    { q: 'What makes drafting from the turn different?', a: 'Drafting from the turn means making two selections in immediate succession and then waiting longer than any other seat in the league. The paired picks should be treated as one decision about two roster slots, since no other manager can select between them, and everything declined across that pair is exposed to the longest wait in the draft.' },
    { q: 'Why do static rankings not account for pick horizon?', a: 'Because a ranking is produced before the draft order exists and must apply to every seat at once, so it is written as though every manager picks again immediately. That assumption is approximately correct in the middle of a round and increasingly wrong toward either end, which is why the same ranking suits some seats far better than others.' },
  ],

  links: [
    'scenarios/pick-three-vs-pick-ten',
    'scenarios/drafting-from-the-turn',
    'tools/pick-horizon-calculator',
    'draft-science/draft-state-valuation',
    'live-fantasy-football-draft-assistant',
  ],
};
