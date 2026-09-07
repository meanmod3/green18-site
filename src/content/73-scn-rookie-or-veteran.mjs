// PAGE 73 — scenario. Rookie vs veteran is a VARIANCE question, not a talent
// question. Explicitly refuses to forecast which player will be better —
// GREEN18 does not project seasons.
export default {
  slug: 'scenarios/a-rookie-or-a-proven-veteran',
  pageType: 'scenario',
  title: 'Should I Draft an Unproven Player or a Proven One? | GREEN18',
  description: 'Unproven versus established is a variance decision, not a talent decision. How the roster slot and its alternative decide whether a wider range is worth paying for.',
  breadcrumb: 'Unproven vs Proven',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Do I Take the Unproven Player or the Proven One?',
    lede: [
      'Two players sit next to each other on the board. One has a track record; the other has almost none.',
      'The honest difference between them is not how good they will be — nobody knows that — but how widely their outcomes are spread, and whether the slot you are filling can afford that spread.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Choosing between an unproven player and an established one is a decision about variance rather than about talent. A player without a track record has a wider range of plausible outcomes in both directions, which means the choice is not between a better and a worse player but between a narrower and a wider distribution at the same approximate cost. Whether that width is worth paying for is decided by the roster slot being filled and by what would otherwise occupy it: a starting slot that the rest of the roster depends on rewards the narrower range, because a low outcome there cannot be absorbed, while a slot whose realistic alternative is close to replacement level rewards the wider range, because the downside is nearly free and the upside is the only thing that changes the roster.',

  claims: [
    'A player without an established track record has a wider range of plausible outcomes in both directions than a player with one, at the same approximate draft cost.',
    'The width of a player’s range of outcomes is a separate quantity from the centre of that range, and the two should be evaluated separately.',
    'Variance is worth paying for in proportion to how little the alternative at the same roster slot would have provided.',
    'A starting slot the rest of a roster depends on absorbs a poor outcome badly, which makes a narrower range more valuable in that slot.',
    'A roster composed entirely of wide-range selections and a roster composed entirely of narrow-range selections both concentrate risk rather than managing it.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Actually Being Compared?', body: [
      '**Two distributions, not two forecasts.** Each player has a range of outcomes. The established player’s range is narrower because more of it has been observed; the unproven player’s is wider because less of it has.',
      '**A wider range cuts both ways.** The same absence of evidence that permits an unusually good season permits an unusually poor one. Treating an unproven player as pure upside is only reading half the distribution.',
      '**The slot decides the price of width.** A wide range in a slot where a poor outcome sinks the lineup is expensive. The same range in a slot whose alternative is barely above replacement is nearly free.',
      '**The alternative is the real comparison.** What matters is not how good either player might be but what you would hold in that slot if you took the other one — and how far that is above replacement.',
      '**Cost is set by the room, not by the profile.** Where an unproven player is being taken relative to established players is a fact about the current board, and it changes as the room drafts.',
    ], quote: 'You are not choosing a better player. You are choosing a wider or a narrower range.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that an unproven player is a bet on upside. He is a bet on width, and width includes the bottom of the range. A selection framed as "the ceiling is enormous" has quietly deleted the other half of the same argument.',
      'The second wrong inference is the reverse — that an established player is safe. A narrower range is not a guaranteed one, and paying a premium for narrowness in a slot that could tolerate variance is its own error.',
      'A third is that either profile predicts the season. Nothing about a track record, or the absence of one, forecasts what will happen. GREEN18 does not project seasons and neither should the reasoning on this page; the only defensible statement concerns the shape of the range, not its outcome.',
      'A fourth is applying one answer to the whole roster. A roster made entirely of wide ranges and a roster made entirely of narrow ones are both concentrated. The width you want depends on the slot, and different slots on the same roster should get different answers.',
      'A fifth is treating the decision as fixed. What an unproven player costs is a property of the board at the moment you pick, and the same player is a different decision two rounds later.',
    ]},

    { type: 'steps', h2: 'How to Decide Between Them', steps: [
      { h3: 'Name the slot you are filling.', body: ['Decide whether this pick occupies a starting slot the roster depends on or a slot with limited expected contribution. The answer to the whole question follows from this.'] },
      { h3: 'Identify the realistic alternative in that slot.', body: ['Ask what you would hold there if you took the other player. That alternative, not the player in front of you, is the baseline you are measuring against.'] },
      { h3: 'Measure the alternative against replacement.', body: ['If the alternative sits barely above replacement level, the downside of a wide range costs you almost nothing, because you were not going to gain much there anyway.'] },
      { h3: 'Ask what the roster can absorb.', body: ['Count how many of your other slots are already wide. A roster that has already bought several wide ranges cannot absorb another one in a load-bearing slot.'] },
      { h3: 'Compare the cost the board is charging.', body: ['Check where each profile is going relative to the other in this specific draft. Width bought cheaply and width bought at a premium are different decisions about the same player.'] },
      { h3: 'Re-derive at your next pick.', body: ['Both the alternative and the price change every time the room selects, so the comparison is recomputed from the current board rather than carried forward.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**The roster slot.** A load-bearing starting slot favours the narrower range; a bench or late flexible slot favours the wider one, because there the downside is close to what you would have had anyway.',
      '**Where you are in the draft.** Early selections carry more of the roster’s value and are worse places to buy width; later selections are where width is cheapest.',
      '**Roster depth requirements.** Formats with more starting slots per position require more reliable production and shift the balance towards narrower ranges.',
      '**Scoring settings.** Settings that reward a particular kind of production sharpen or blunt the differences between profiles, which changes how much of the apparent gap is real.',
      '**League size.** Deeper leagues push replacement level down, which makes the downside of a wide range less costly because the alternative was weaker to begin with.',
      '**In-season roster movement.** Where a league permits meaningful movement afterwards, a poor outcome from a wide-range pick is recoverable, which makes width cheaper to buy.',
    ], after: [
      'The baseline this comparison rests on is [replacement value](/draft-science/replacement-value); how the choice trades against everything else on the board is [opportunity cost](/draft-science/opportunity-cost).',
    ]},

    { type: 'convert', h2: 'Price the Slot, Not the Story.',
      body: ['GREEN18 values each available player against the slot you are actually filling, your league settings and the board as it stands, so the comparison is made against a real alternative rather than a narrative. It does not forecast seasons — it recalculates what the current draft state is worth.', '**Download GREEN18 for iPhone and make the comparison explicit.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Should you draft an unproven player or an established one?', a: 'The choice is about variance rather than talent. An unproven player carries a wider range of outcomes in both directions, so the decision turns on the roster slot being filled: a load-bearing starting slot rewards the narrower range, while a slot whose realistic alternative is close to replacement level rewards the wider one.' },
    { q: 'Is an unproven player a high-upside pick?', a: 'A wider range of outcomes includes the bottom as well as the top. Describing an unproven player purely as upside reads only half of the distribution, because the same absence of an established record that permits an unusually strong season also permits an unusually weak one.' },
    { q: 'When is variance worth paying for in a fantasy draft?', a: 'Variance is worth paying for in proportion to how little the alternative would have provided. When the player you would otherwise hold in that slot sits barely above replacement level, a poor outcome costs almost nothing, and the wide range is the only thing capable of changing the roster.' },
    { q: 'Can a draft tool predict whether an unproven player will succeed?', a: 'No. GREEN18 does not forecast seasons or predict individual player outcomes. It recalculates what each available player is worth given league settings, roster construction and the current draft state, which informs how much a wider range of outcomes should cost in a particular slot.' },
  ],

  links: [
    'draft-science/replacement-value',
    'draft-science/opportunity-cost',
    'draft-science/roster-construction',
    'scenarios/last-player-in-a-tier',
    'fantasy-football-draft-assistant',
  ],
};
