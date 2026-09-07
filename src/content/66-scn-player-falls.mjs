// PAGE 66 — scenario. The falling-player page. The discipline here is separating
// what a fall is evidence OF from what it is evidence ABOUT, then pricing the
// discount against the slot the player would actually occupy.
export default {
  slug: 'scenarios/a-player-falls-past-his-expected-draft-position',
  pageType: 'scenario',
  title: 'A Player Fell Past Where You Expected | GREEN18',
  description: 'A player is still on the board well past his expected draft position. What the fall does and does not tell you, and when the discount is worth taking.',
  breadcrumb: 'A Player Falls',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'A Player Fell Way Past Where I Expected. Do I Take Him?',
    lede: [
      'A name you thought was long gone is still sitting there when your pick arrives.',
      'A fall is information about a room, not a verdict on a player — and a discount only pays if it lands in a slot you can use.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A player falling past his expected draft position tells you that the managers picking before you valued him below that expectation, which is evidence about the room and only weak evidence about the player. The fall is worth acting on when the player still beats the alternative at the slot he would actually occupy on your roster; it is not worth acting on merely because the gap between his expectation and his current cost is large. A discount is only real if you can spend it — a fallen player who duplicates a slot you have already filled well is measured against the player you already own, so a large nominal discount can deliver almost no improvement. The correct test is therefore the same as for any other pick: compare his margin over the replacement he would displace with the margin of the best alternative on the board, and let the fall influence only your estimate of how likely he is to survive to your next turn.',

  claims: [
    'A player falling past his expected draft position is direct evidence about how the managers ahead valued him, and only indirect evidence about the player himself.',
    'A discount measured against an expected draft position is only realisable if the player improves a slot the roster can actually start him in.',
    'Expected draft positions are averages drawn from many rooms, so a single room departing from one is an ordinary outcome rather than an anomaly.',
    'A fall changes the estimate of whether a player survives until the next pick, which is a separate question from whether he is worth taking now.',
    'The size of a fall does not measure the improvement a player delivers, because improvement is measured against the replacement rather than against an expectation.',
  ],

  blocks: [
    { type: 'prose', h2: 'What the Fall Actually Tells You.', body: [
      '**Every manager who passed had a reason, and you cannot see it.** Some of those reasons are about the player. Many are about rosters — a room that has already filled his position will pass on him regardless of quality.',
      '**Expectations are averages across many drafts.** A single room is one draw. Departing from an average is the normal behaviour of a sample, not a signal that something is wrong.',
      '**His price fell; his projected production did not move.** The board changed, not the player. That is exactly the condition under which situational value rises.',
      '**Demand ahead of you is now partly spent.** The teams that passed have filled other slots, which changes who competes with you for the rest of the board.',
    ], quote: 'A fall is a fact about the room. Price it as one.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The first wrong inference is that the room knows something. Sometimes it does — but a fall is consistent with dozens of causes, most of them structural, and treating it as hidden negative information means discarding a player because other people had different rosters.',
      'The opposite inference is just as wrong: that a fall is automatically free value. A discount is only worth what you can spend it on. If the player occupies a slot you have already filled well, his real replacement is the player you already own, and the improvement can be near zero no matter how far he fell.',
      'A third mistake is treating the size of the fall as the size of the gain. The distance between an expectation and the current pick measures surprise, not improvement. Improvement is the distance between this player and the player you would otherwise start.',
      'A fourth is urgency by anchoring. Because he "should" have gone earlier, taking him feels time-critical. But if the room has demonstrated that it does not want him, the same demonstration is evidence he may still be there at your next turn — the fall argues against urgency at least as often as for it.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Ignore the expectation and re-price him from scratch.', body: ['Ask what he is worth to your lineup under your scoring, as if you had never seen a projected draft position for him.'] },
      { h3: 'Identify the slot he would occupy.', body: ['A starting slot you have not filled, a flexible slot, or a bench seat behind somebody you already start. Each implies a different replacement.'] },
      { h3: 'Measure him against that replacement, not against the fall.', body: ['The gain is his production minus the player he displaces in your lineup. That number is unaffected by how far he slid.'] },
      { h3: 'Compare with the best alternative on the board.', body: ['Run the same measurement for the strongest other candidate. The larger margin is the pick, whatever the more dramatic story is.'] },
      { h3: 'Use the fall only to estimate survival.', body: ['A room that has repeatedly passed on a player may keep passing. If he is likely to be there next turn, the discount is available later and costs you nothing to defer.'] },
      { h3: 'Check for a structural explanation before assuming a hidden one.', body: ['Count how many teams ahead had already filled his position. If most of them had, the fall is fully explained by roster composition and carries no information about him.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Whether the slot is empty.** A fallen player who fills an unfilled starting slot converts the whole discount into lineup improvement; one who sits behind a starter converts very little of it.',
      '**Format and scoring.** A player can fall in a room whose scoring devalues his position while remaining strong under yours, which is the most common benign explanation for a fall.',
      '**Flexible starting slots.** More flexible seats mean more ways to use an unexpected player, which raises the value of taking a discount at a position you had considered settled.',
      '**Distance to your next pick.** From the turn you can often let him fall one more round and take him alongside someone else; from mid-round a long wait makes deferring riskier.',
      '**How many teams still need his position.** Spent demand behind you means the fall is likely to continue; live demand means the discount closes quickly.',
      '**Bench depth.** Deep benches make it cheap to take a fallen player speculatively; shallow benches mean every seat must earn its place in a starting lineup.',
    ], after: [
      'The mechanism behind a price moving without production moving is [draft-state valuation](/draft-science/draft-state-valuation); the timing question is [pick horizon](/draft-science/pick-horizon).',
    ]},

    { type: 'convert', h2: 'A Discount Is Only Worth What You Can Spend.',
      body: ['GREEN18 re-prices every remaining player against your roster and your league’s scoring after each pick, so a fallen player is valued by the slot he would fill rather than by the expectation he missed.', '**Download GREEN18 for iPhone and take the falls that actually improve your lineup.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What does it mean when a player falls past his expected draft position?', a: 'It means the managers picking before that point valued him below the expectation, which is evidence about those rosters and preferences rather than about the player. Expected draft positions are averages across many rooms, so a single room departing from one is an ordinary sampling outcome and often has a fully structural explanation, such as the teams ahead having already filled his position.' },
    { q: 'Should you always take a player who falls?', a: 'No. A fall is only worth acting on when the player beats the alternative at the slot he would actually occupy. If he duplicates a position already filled well, his real replacement is the player already rostered, and a large nominal discount can produce almost no lineup improvement. The comparison to run is margin over replacement, not distance from an expectation.' },
    { q: 'Does a big fall mean other managers know something negative?', a: 'Not reliably. A fall is consistent with many causes, most of them structural — differing scoring rules, rosters that no longer need the position, or a room simply drafting in a different order. Treating every fall as concealed negative information discards players for reasons that belong to other people’s teams.' },
    { q: 'How should a fall change the timing of a pick?', a: 'A fall is most useful as evidence about survival. A room that has repeatedly declined a player may continue to decline him, which means the discount may still be available at the next turn. The fall therefore argues against urgency roughly as often as for it, and the decision should rest on how many teams picking next still need that position.' },
  ],

  links: [
    'draft-science/draft-state-valuation',
    'draft-science/pick-horizon',
    'scenarios/best-player-available-vs-roster-need',
    'why-fantasy-rankings-change-during-a-draft',
    'live-fantasy-football-draft-assistant',
  ],
};
