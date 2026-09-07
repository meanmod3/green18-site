// PAGE 72 — scenario. Recovery after a pick you did not intend to make. The
// point is that a roster is a state, and state has no memory of intention.
// NOTE: autodraft here is always the LEAGUE PLATFORM's behaviour, never GREEN18's.
export default {
  slug: 'scenarios/you-missed-your-pick',
  pageType: 'scenario',
  title: 'My Draft Timer Ran Out — What Now? | GREEN18',
  description: 'A pick you did not choose changes your roster, not your method. How to re-evaluate from the state you are actually in instead of trying to undo it.',
  breadcrumb: 'You Missed Your Pick',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'The Timer Ran Out and I Got a Player I Did Not Want. Now What?',
    lede: [
      'A pick was made for you, or you made one in a hurry that you would not make again.',
      'The roster in front of you is now the only starting point that exists, and the correct next move is a function of that roster rather than of the one you meant to have.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A pick made by a league platform’s timer, or made in haste, does not require a corrective pick — it requires a recalculation. The board does not record what a manager intended; it records which players are gone and which roster slots are filled, and every subsequent decision should be derived from that current state alone. The common and costly response is to force the position that was missed at the next selection, which converts one unwanted player into two suboptimal picks, because the value of a position is set by what remains available at it and by what the roster still needs, not by the fact that a plan was interrupted. The correct procedure is to re-read the roster as it now stands, re-derive the scarcity at every position from the players still on the board, and select the pick with the largest remaining margin over its replacement.',

  claims: [
    'A draft board records which players have been selected and which roster slots are filled, and carries no record of what any manager intended to do.',
    'Forcing the position that was missed converts a single unwanted selection into two suboptimal selections, because the second is chosen against a plan rather than against the board.',
    'The value of a roster slot after an unplanned selection is determined by the players still available at that position, not by the order in which the roster was assembled.',
    'A roster assembled in an unintended order can be equivalent in quality to one assembled as planned, provided each subsequent pick is evaluated against the current board.',
    'An unplanned selection changes which positions are scarce for a manager without changing which players remain available to the room.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Actually Happened to Your Draft?', body: [
      '**One roster slot is now filled differently than planned.** That is the entire material change. A player you did not choose occupies a spot, and the players you did want are either still available or not.',
      '**Your positional needs changed; the board did not.** Everyone else faces the same remaining pool. What moved is the shape of your own roster and therefore which positions you are still short at.',
      '**Your replacement level at that position rose.** Whatever the unwanted player provides, you now have it, and the next player you take at that position is worth only the margin above what you already hold.',
      '**Nothing about your remaining picks changed.** The number of selections left and the distance to each of them is unaffected by how the last one was made.',
    ], quote: 'The board is a function of state, not of intent.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that the draft now needs correcting. There is no mechanism by which a later pick undoes an earlier one; there is only the roster you hold and the players still available. Treating the next selection as a repair is the single most expensive response available.',
      'The second wrong inference is that the position you meant to take is now urgent. If the pick you intended was correct because of scarcity at that position, that scarcity is measurable right now from the board — and if the board no longer shows it, the urgency was inherited from a plan rather than observed.',
      'A third is judging the unwanted player by how he was acquired. A player selected by a timer and the same player selected deliberately contribute identically. The acquisition method is not an attribute of the asset.',
      'A fourth is abandoning the draft emotionally after an interruption. Most of the selections are still ahead, and the majority of a roster’s eventual quality is decided by picks that have not happened yet.',
      'A fifth is assuming the unwanted player must be the one who leaves. If the roster now holds surplus at one position, the right adjustment may be to stop drafting that position rather than to replace the specific player.',
    ]},

    { type: 'steps', h2: 'How to Re-Enter the Draft', steps: [
      { h3: 'Read the roster you actually have.', body: ['List the filled slots and the empty ones as they stand now. Do not annotate them with what was supposed to happen — the plan is no longer an input.'] },
      { h3: 'Recompute replacement level at every position.', body: ['For each position, ask what the best still-available player provides beyond what your roster already holds there. The unwanted pick raised that floor at its own position and left every other position untouched.'] },
      { h3: 'Re-derive scarcity from the remaining board.', body: ['Count how many players sit above the next meaningful drop at each position and compare that against how many teams still need one. Do this from the board in front of you rather than from a pre-draft plan.'] },
      { h3: 'Rank the open slots by margin, not by regret.', body: ['The slot worth filling next is the one where the gap between the best available player and his replacement is largest, which is frequently not the position that was missed.'] },
      { h3: 'Check whether the missed position is genuinely thinner.', body: ['If it is, it will show up as a steep drop in the current board and will win the comparison honestly. If it does not win, taking it anyway is paying twice for one interruption.'] },
      { h3: 'Reset the timer discipline for the next pick.', body: ['Decide your first and second choice before the clock reaches you, so the next selection is one you made rather than one that was made for you.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**When it happened.** An unplanned pick in the opening rounds displaces a large share of the roster’s expected value and is worth reorganising around; the same event in the late rounds is close to noise.',
      '**Whether the position is scarce right now.** If the board genuinely shows a steep drop at the missed position, taking it next is correct — but it is correct because of the drop, not because of the miss.',
      '**How much surplus the unwanted player creates.** A duplicate at a position where only one starter is required is a bigger distortion than a duplicate at a position with several starting slots.',
      '**Roster requirements.** Formats with more starting slots at a position absorb an unintended pick more easily, because the player has somewhere to go.',
      '**Distance to your next selection.** A long wait raises the cost of leaving a genuinely scarce position open, which can justify addressing the missed position sooner than pure margin would suggest.',
      '**Whether trading or waiver movement exists in your league.** Where roster movement is possible afterwards, a surplus player is a tradeable asset rather than a permanent misallocation.',
    ], after: [
      'The quantity that decides this is [replacement value](/draft-science/replacement-value); the principle that the board is read from its current state is [draft-state valuation](/draft-science/draft-state-valuation).',
    ]},

    { type: 'convert', h2: 'Restart From the Board In Front of You.',
      body: ['GREEN18 values every remaining player against the roster you actually hold and the board as it actually stands, so an interrupted plan does not become a second bad pick. You make every selection yourself; GREEN18 shows you what the current state is worth.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What should you do after your fantasy draft timer runs out?', a: 'Re-evaluate from the roster you now hold rather than trying to correct the pick. The board records which players are gone and which slots are filled, so the next selection should be the one with the largest margin over replacement given the current state, which is often not the position that was missed.' },
    { q: 'Should you draft the position you missed with your next pick?', a: 'Only if the current board still shows that position as scarce. Scarcity is measurable from the players who remain, so if the position no longer shows a steep drop, taking it anyway turns one unwanted selection into two, because the second pick is chosen against an interrupted plan rather than against the board.' },
    { q: 'Does an unwanted draft pick ruin a fantasy roster?', a: 'A single unplanned selection changes one roster slot and raises replacement level at that one position. It does not change which players remain available to the room or how many selections a manager has left, so the majority of the roster’s eventual quality is still decided by picks that have not yet happened.' },
    { q: 'Is a player selected automatically worth less than one you chose?', a: 'No. A player contributes the same regardless of how he was acquired, so the method of acquisition is not an attribute of the asset. What changes is the roster’s shape, and that is evaluated by looking at which slots are now filled and what the remaining board offers at each position.' },
  ],

  links: [
    'draft-science/draft-state-valuation',
    'draft-science/replacement-value',
    'scenarios/already-have-two-wide-receivers',
    'live-fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
  ],
};
