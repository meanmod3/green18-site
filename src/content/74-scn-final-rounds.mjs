// PAGE 74 — scenario. The endgame. Margin over replacement is thinnest here,
// which is exactly why "best available" degrades and why doubling at a filled
// position can be correct.
export default {
  slug: 'scenarios/how-to-use-the-final-rounds',
  pageType: 'scenario',
  title: 'How Should I Use the Last Rounds of a Fantasy Draft? | GREEN18',
  description: 'In the final rounds every remaining player is near replacement level, which makes upside cheap and "best available" a rule that stops working. What to do instead.',
  breadcrumb: 'The Final Rounds',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'What Should I Actually Do With the Last Rounds?',
    lede: [
      'Late in a draft the remaining players are separated by very little, and most of them will never start for anyone.',
      'That is not a reason to stop paying attention — it is the reason the rules that worked earlier stop working here.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'The final rounds of a fantasy draft are the point at which the margin between the best available player and freely available replacement has shrunk close to zero, and every decision rule built on that margin changes behaviour accordingly. Because the downside of a late selection is nearly free, upside is at its cheapest, which makes the width of a player’s range of outcomes the most useful thing to buy there. It also means that a second player at a position the roster has already filled can be the correct pick, since the value of a late selection is measured by what it might become rather than by which empty slot it fills. The rule that degrades fastest is "take the best available player", because when every remaining player is within a negligible margin of every other, the ordering it depends on no longer carries enough information to decide anything.',

  claims: [
    'In the final rounds of a draft the margin between the best available player and freely available replacement approaches zero.',
    'A decision rule that ranks players by projected production loses its discriminating power once the differences between the remaining players fall below the uncertainty in the ranking itself.',
    'Upside is cheapest in the late rounds because the downside of a late selection is close to what a manager could obtain without spending a pick.',
    'Selecting a second player at an already-filled position can be correct late in a draft, because a late pick is valued by what it might become rather than by which empty slot it occupies.',
    'The final rounds of a draft decide a smaller share of a roster’s value than the opening rounds, but they are the rounds in which a manager’s method differs most from everyone else’s.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Actually True About the Endgame?', body: [
      '**Margin over replacement is nearly gone.** Whatever you take now is only slightly better than what will be available for free after the draft ends. That is the defining fact of the late rounds and everything else follows from it.',
      '**Downside is close to free.** If a late pick contributes nothing, you have lost very little, because the player you would have taken instead was also going to contribute close to nothing.',
      '**Upside is therefore cheap.** The one thing a late pick can do that a freely available player cannot is exceed expectations by a wide margin. Buying the chance of that is the point of the round.',
      '**Ordering carries less information than it looks like it does.** The remaining players are separated by less than the uncertainty in any ordering of them, which means a ranked list here is precise without being informative.',
      '**Roster slots stop being the organising question.** Early rounds fill slots; late rounds buy options. A pick that occupies no starting slot is not wasted if its range extends above a starter’s.',
    ], quote: 'When everything left is worth about the same, worth stops being the question.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that the late rounds do not matter and can be played on autopilot. They decide a smaller share of a roster than the opening rounds, but they are also the rounds where most managers stop thinking, which makes them the cheapest place to differ from the room.',
      'The second wrong inference is that "best available" remains a safe default. That rule works when the gaps between players are large relative to the uncertainty in ranking them. Late in the draft the gaps are smaller than that uncertainty, so the rule is choosing between options it cannot actually distinguish.',
      'A third is that every remaining slot must be filled before doubling at a position. Filling a slot with a player whose range never reaches starter quality buys nothing but the appearance of completeness; a second player at a filled position with a wide range can be worth strictly more.',
      'A fourth is that doubling is therefore always right. Concentrating several late picks at one position narrows the number of ways the roster can improve and leaves genuine holes uncovered where a format requires a body in a slot.',
      'A fifth is that upside means unfamiliarity. What makes a late pick valuable is the width of its range and the chance it becomes a starter, not whether the name is obscure.',
    ]},

    { type: 'steps', h2: 'How to Play the Final Rounds', steps: [
      { h3: 'Establish what replacement actually looks like.', body: ['Identify what you could obtain at each position without spending a pick at all. Every late selection is measured against that, and the comparison is what tells you whether a pick is doing anything.'] },
      { h3: 'Cover the slots your format genuinely requires.', body: ['Fill any position where being empty is a structural problem for your lineup. Do this first, because it is a constraint rather than an optimisation.'] },
      { h3: 'Switch from ranking to range.', body: ['Once the required slots are covered, stop asking which remaining player is rated highest and start asking which has the widest realistic range of outcomes, since that is the only thing that separates them meaningfully.'] },
      { h3: 'Prefer players attached to a path to a larger role.', body: ['A late pick is a claim on a possible future role. A player with a plausible route to more work has a wider range than one whose situation admits no change.'] },
      { h3: 'Allow a second player at a filled position.', body: ['If the widest range on the board sits at a position you have already filled, take it. Late picks are options, and an option is judged by its range, not by which slot it nominally occupies.'] },
      { h3: 'Spread the concentration.', body: ['Avoid stacking every late pick at one position, which reduces the number of independent ways the roster can improve and can leave a required slot unfilled.'] },
      { h3: 'Recompute after each selection.', body: ['Every pick raises your own replacement level somewhere, so the comparison that decided the last round is not the comparison in front of you now.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**League size.** Deeper leagues push replacement level lower, which makes late picks worth more in absolute terms because there is less available for free afterwards.',
      '**Bench depth.** More bench slots mean more room to hold options, which raises the value of buying range; a shallow bench forces late picks to be immediately useful instead.',
      '**Whether roster movement is available afterwards.** In leagues with meaningful in-season movement, a late pick is a cheap option you can abandon, which makes width even cheaper to buy. Where movement is restricted, late picks must be more reliable.',
      '**Roster requirements.** Formats that require a body in a particular slot convert that slot from an optimisation into a constraint, and constraints are satisfied before ranges are bought.',
      '**Scoring settings.** Settings that concentrate value in a particular kind of production change which late profiles have a realistic path above replacement.',
      '**What your roster already holds.** A roster already carrying several wide-range selections needs stability late; a roster full of narrow ones can afford the opposite.',
    ], after: [
      'The baseline these rounds are measured against is [replacement value](/draft-science/replacement-value); how late picks fit the shape of a whole team is [roster construction](/draft-science/roster-construction).',
    ]},

    { type: 'convert', h2: 'Make the Cheap Rounds the Ones You Win.',
      body: ['GREEN18 keeps measuring every remaining player against your roster, your league settings and the current board, so the late rounds stay a decision instead of becoming a list you read down. Every pick is still yours to make.', '**Download GREEN18 for iPhone and draft the endgame on purpose.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How should you use the last rounds of a fantasy football draft?', a: 'Cover any slot your format structurally requires, then buy range rather than rank. In the final rounds the margin between the best available player and freely available replacement is nearly zero, so the downside of a selection is close to free and the width of a player’s possible outcomes is the most valuable thing left to purchase.' },
    { q: 'Does "best available" work in the late rounds of a draft?', a: 'It degrades. That rule depends on the gaps between players being large relative to the uncertainty in ranking them, and late in a draft those gaps fall below that uncertainty. A ranked list of near-replacement players is precise without being informative, so it is choosing between options it cannot distinguish.' },
    { q: 'Is it a mistake to draft two players at the same position late?', a: 'Not necessarily. A late pick is valued by what it might become rather than by which empty slot it fills, so a second player at a filled position with a wide range of outcomes can be worth more than a player who completes the roster but whose range never reaches starter quality.' },
    { q: 'Do the final rounds of a draft matter?', a: 'They decide a smaller share of a roster’s value than the opening rounds, but they are the rounds in which most managers stop deliberating. That makes them the cheapest place for a manager’s method to differ from the rest of the room, since the cost of any single late selection is small.' },
  ],

  links: [
    'draft-science/replacement-value',
    'draft-science/roster-construction',
    'scenarios/rb-zero-start',
    'tools/league-value-calculator',
    'last-minute-fantasy-football-draft',
  ],
};
