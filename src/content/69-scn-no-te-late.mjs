// PAGE 69 — scenario. The anxiety is about an unfilled slot; the real question
// is whether the remaining pool at that position is differentiated at all. A
// slot you can fill from a flat pool is not urgent, however loudly it feels so.
export default {
  slug: 'scenarios/still-no-tight-end-in-the-late-rounds',
  pageType: 'scenario',
  title: 'Still No Tight End Late in the Draft | GREEN18',
  description: 'An unfilled slot late in a draft is only urgent if the players left at that position differ from each other. How to test whether the gap you fear is real.',
  breadcrumb: 'Still No Tight End',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'It Is Late and I Still Have No Tight End. How Worried Should I Be?',
    lede: [
      'Most of your slots are filled. One is not, and it has been nagging at you for several rounds.',
      'Before treating it as an emergency, test the only thing that makes an empty slot expensive: whether the players still available there are actually different from one another.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'An unfilled position late in a draft is urgent only when the remaining players at that position are meaningfully distinguishable from each other, because the cost of waiting is the difference between the player you could take now and the player you will end up with instead. When the remaining pool is flat — many players a manager would evaluate as roughly interchangeable — that difference is close to zero, and the slot can be filled at almost any point without loss. The feeling of urgency comes from the slot being visibly empty, not from the pool being scarce, and those are separate facts that need to be checked separately.',

  claims: [
    'An empty roster slot is expensive only when the players remaining at that position differ measurably from one another.',
    'The cost of waiting at any position equals the quality difference between the best player available now and the player realistically obtainable later.',
    'A flat remaining pool makes the timing of a pick nearly irrelevant, because every ordering of those picks produces a similar roster.',
    'Visible emptiness on a roster creates urgency that the underlying player pool may not justify.',
    'Positions whose remaining players are undifferentiated should be filled with leftover picks rather than with contested ones.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Actually in Play Here?', body: [
      'Two quantities decide this, and only one of them is the empty slot.',
      '**The spread of the remaining pool at that position.** If the next several players you would accept there look interchangeable to you, the position has no scarcity left to exploit and no premium left to pay.',
      '**The spread of the remaining pool everywhere else.** A late-round pick spent on a flat position is a pick not spent on a position that still has separation in it.',
      '**The number of rounds still available.** Late in a draft you have few picks left, which raises the cost of using one on a decision that does not change your team.',
      '**Whether the slot must be filled at all before the draft ends.** Some formats oblige it, some do not, and that obligation is a constraint rather than a valuation.',
    ], quote: 'An empty slot is a fact about your roster. Scarcity is a fact about the board.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that a long-unfilled position has become your biggest weakness. Weakness is measured against the rest of the league, and if every other manager will also be choosing from the same flat pool, the slot is not a weakness at all — it is a place where nobody gains anything.',
      'The second wrong inference is that having waited this long, you should now reach to end the discomfort. Reaching converts a cheap problem into an expensive one: you pay a contested pick for a player whose near-equivalent would still have been there later.',
      'A third is treating a run at the position as proof of scarcity. A run tells you other managers felt the same discomfort at the same time. It changes the pool only if the players taken were the ones that actually stood apart from the rest.',
      'A fourth is assuming a flat pool stays flat. Flatness is a description of the board right now, and one departure from a short list of genuinely distinguishable players can end it.',
    ]},

    { type: 'steps', h2: 'How to Test Whether the Gap Is Real', steps: [
      { h3: 'List the players you would genuinely accept at the position.', body: ['Not everyone still available — only the ones you would be willing to start without complaint. That list is the real pool.'] },
      { h3: 'Ask whether you could tell them apart blind.', body: ['If you could not confidently rank the list without their names attached, the pool is flat and the slot is not urgent.'] },
      { h3: 'Count how far the flat stretch runs.', body: ['A flat pool of many players survives several more rounds of league-wide demand. A flat pool of two does not survive a single turn of the room.'] },
      { h3: 'Run the same test at every other open slot.', body: ['Compare the spread you found here with the spread available elsewhere. Spend the pick where the difference between now and later is largest.'] },
      { h3: 'Check the obligation separately from the value.', body: ['If the format requires the slot filled, reserve a late pick for it as a formality — but do not let a requirement inflate what you pay.'] },
      { h3: 'Re-test after each pick that touches the position.', body: ['Flatness expires. The moment the short list of distinguishable players is consumed, the answer changes and waiting stops being free.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**How many players still stand apart.** One or two genuinely separated players left is scarcity; a dozen similar ones is not, and the whole decision turns on which of those you are looking at.',
      '**League size.** Deeper leagues consume flat stretches faster and leave a weaker undrafted pool, so a position that is safe to defer in a shallow league may not be in a deep one.',
      '**Scoring.** Formats that reward receptions spread the position out and can restore separation to a pool that would otherwise look flat.',
      '**Starting requirements.** The more teams obliged to fill the slot, the faster league-wide demand arrives, regardless of how flat the pool looks today.',
      '**Distance to your next pick.** A long wait can consume the last distinguishable players without you making a single decision.',
      '**Bench depth.** A deep bench lets you hold two undifferentiated players and decide later, which lowers the cost of being wrong now.',
    ], after: [
      'The underlying quantity is [positional scarcity](/draft-science/positional-scarcity); the mechanism that ends a flat stretch is [tier collapse](/draft-science/player-tier-collapse).',
    ]},

    { type: 'convert', h2: 'Fill Slots Where the Board Is Flat. Spend Picks Where It Is Not.',
      body: ['GREEN18 recalculates the remaining pool at every position after every pick, so a slot that only looks urgent is visible as flat instead of frightening.', '**Download GREEN18 for iPhone and price your empty slots instead of fearing them.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is it a problem to reach the late rounds without filling a position?', a: 'Only if the players remaining at that position differ meaningfully from one another. The cost of waiting equals the quality difference between the best player available now and the one realistically obtainable later, so a flat remaining pool makes the delay close to free.' },
    { q: 'How do you tell whether a remaining player pool is flat?', a: 'List only the players you would genuinely be willing to start at that position, then ask whether you could rank them confidently without their names attached. A list you cannot confidently order is a flat pool, and the timing of a pick from it barely changes the roster.' },
    { q: 'Does a run at a position prove that the position is scarce?', a: 'No. A run shows that several managers acted on the same discomfort at the same time. It reduces the pool only if the players selected were among the few that stood apart, so the relevant question is what remains rather than how many were taken.' },
    { q: 'Should a required roster slot be filled early to be safe?', a: 'A format requirement is a constraint on the final roster, not a statement about player value. The efficient approach is to reserve a late pick for the obligation while spending contested picks at positions where the difference between the best available player and his later replacement is still large.' },
  ],

  links: [
    'draft-science/positional-scarcity',
    'draft-science/player-tier-collapse',
    'scenarios/rb-zero-start',
    'tools/scarcity-calculator',
    'fantasy-football-cheat-sheet-app',
  ],
};
