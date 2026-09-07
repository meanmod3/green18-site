// PAGE 68 — scenario. Kicker/defense. The honest version: the conventional
// advice is right, and the page explains WHY in margin-over-replacement terms
// rather than repeating it as a slogan — then names the conditions that flip it.
export default {
  slug: 'scenarios/when-to-draft-a-kicker-and-defense',
  pageType: 'scenario',
  title: 'When Should You Draft a Kicker and Defense? | GREEN18',
  description: 'Why the advice to wait on kicker and defense is usually right, stated as margin over replacement rather than a slogan — and the conditions that reverse it.',
  breadcrumb: 'Kicker and Defense',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'When Should I Draft a Kicker and a Defense?',
    lede: [
      'Everyone says wait. Almost everyone is right, and almost nobody says why.',
      'The reason is a measurement about the shape of those positions, not a rule of etiquette.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'The usual advice to draft a kicker and a defense last is generally correct, and the reason is margin over replacement rather than convention: at both positions the spread between the best available option and the option still available many rounds later is small, so a pick spent there buys very little improvement compared with the same pick spent at a position where the drop behind the next player is steep. A draft pick is not paid for in rank, it is paid for in the improvement it produces over the alternative you would otherwise have used, and a shallow replacement gap makes that improvement small by construction. The advice reverses under conditions that widen the gap or remove the alternative: scoring rules that create real separation at those positions, a roster limit that leaves no bench seat to stream from, formats that start more than one of them, or the final picks of a draft where every remaining option at every position is equally interchangeable and the pick costs nothing anyway.',

  claims: [
    'Kicker and defense typically carry compressed value spreads, which means the difference between the best available option and a much later one is small.',
    'A draft pick is paid for in improvement over the alternative, so a position with a shallow replacement gap consumes a pick without producing much lineup gain.',
    'Waiting on a position is cheap exactly when the quality available later is close to the quality available now, which is a measurable property rather than a convention.',
    'The case for drafting a kicker or defense early strengthens when league scoring creates genuine separation between the options at those positions.',
    'A roster with no spare bench seat cannot replace a weak defense or kicker during the season, which raises the cost of taking the last option available.',
    'The final picks of a draft cost almost nothing regardless of position, because every remaining player is close to his own replacement.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Makes These Positions Different.', body: [
      '**The spread is compressed.** At most positions, the players at the top are separated from the players in the middle by a wide margin. At kicker and defense, in typical scoring, that separation is much narrower.',
      '**A narrow spread means a shallow replacement gap.** The option you can get many rounds later is close in expected value to the option available now — so the improvement a pick buys there is small.',
      '**Everyone needs exactly one, usually.** Uniform demand and a single required slot means the position is consumed predictably late, and supply lasts as long as demand is deferred.',
      '**These are the two positions where week-to-week substitution is most practical**, which further lowers the cost of a weak selection when a bench seat is available.',
    ], quote: 'Waiting is cheap when the player you can get later is nearly the player you can get now.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The first wrong inference is that these positions do not matter. They score points, and those points count exactly as much as any others. The argument is not that they are unimportant — it is that the improvement available by picking one **earlier** is small, which is a completely different claim.',
      'The second is that "never draft a kicker early" is a rule. It is a conclusion drawn from a measurement, and it holds only while the measurement holds. A format that creates real separation at those positions changes the input, and the conclusion should change with it.',
      'A third is treating the compressed spread as evidence that the options are identical. They are not identical; they are close. Close matters very little when you are spending a valuable pick, and matters more at the end of a draft when every alternative is also close.',
      'A fourth is assuming you can always stream a replacement in-season. That assumption depends on having a bench seat and on the pool outside your roster being live. Where roster limits are tight or every option is already owned, the last available choice is the choice you keep.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Measure the spread under your actual scoring.', body: ['Compare the best available option at each of these positions with the one you would expect to be available near the end of the draft. That distance is the entire case.'] },
      { h3: 'Compare that distance with the drop at your other candidates.', body: ['If the gap at another position is larger — and it usually is early — the pick belongs there. This is the same comparison every other pick uses.'] },
      { h3: 'Check your starting requirements.', body: ['A format that starts more than one of either position doubles the demand and consumes the supply faster, which shortens how long waiting stays cheap.'] },
      { h3: 'Check whether you can replace in-season.', body: ['If roster limits leave no spare seat, or if the outside pool is thin, the option you draft is the option you are stuck with, and its quality matters more.'] },
      { h3: 'Watch when the room starts.', body: ['These positions are consumed in a burst. Once the run begins, the remaining supply falls quickly, and being the last team to fill both can leave you with no choice at all.'] },
      { h3: 'Take them when the pick is genuinely free.', body: ['At the end of the draft, every remaining player at every position is close to his own replacement. That is the point at which spending a pick here costs nothing.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Scoring rules.** Formats that reward these positions more heavily, or in more varied ways, widen the spread — and a wider spread is exactly the condition that justifies an earlier pick.',
      '**Number of required slots.** A format starting more than one defense or kicker raises total demand, accelerates the run, and shortens the window in which waiting is safe.',
      '**Roster limits.** Tight benches remove in-season substitution as a fallback, which makes the quality of the drafted option matter far more than the usual advice assumes.',
      '**League size.** Deeper leagues exhaust the usable supply, so the last team to address these positions may face options that are genuinely worse rather than merely later.',
      '**Whether substitution is permitted freely.** Where in-season additions are restricted, every position behaves more like a locked roster slot, which raises the cost of taking whatever is left.',
      '**How the room behaves.** If several managers start early, the compressed spread stops being the binding constraint and simple supply does — being last then costs more than the spread suggests.',
    ], after: [
      'The measurement underneath all of this is [replacement value](/draft-science/replacement-value); how it distributes across positions is [positional scarcity](/draft-science/positional-scarcity).',
    ]},

    { type: 'convert', h2: 'A Rule of Thumb Is a Measurement Someone Stopped Taking.',
      body: ['GREEN18 computes, under your own league’s scoring, the chance each remaining player survives to your next turn and how fast each position is being consumed — so whether waiting is safe at kicker and defense is something your board shows you rather than something you assume.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Why is the advice to wait on a kicker and defense usually right?', a: 'Because both positions typically have a compressed spread of value, meaning the option available many rounds later is close in expected value to the best option available now. A draft pick is paid for in improvement over the alternative you would otherwise use, so a shallow replacement gap makes an early pick at those positions buy very little compared with the same pick spent where the drop behind the next player is steep.' },
    { q: 'Under what conditions should you draft a defense or kicker earlier?', a: 'When something widens the gap or removes the fallback. Scoring rules that create genuine separation at those positions raise the improvement an early pick buys. A format that starts more than one accelerates demand. Tight roster limits remove in-season substitution, so the drafted option is the one that is kept. Deep leagues can exhaust the usable supply entirely.' },
    { q: 'Does waiting on a kicker mean the position does not matter?', a: 'No. Points scored at those positions count exactly as much as any others. The argument concerns the improvement available from picking earlier, not the importance of the position. A position can be fully necessary to a lineup while offering almost no advantage to the manager who addresses it first.' },
    { q: 'When is the right moment to take them?', a: 'At the point where the pick is genuinely free — the end of the draft, when every remaining player at every position is close to his own replacement, so nothing is given up by spending the selection there. The one caution is supply: these positions are consumed in a burst, and the last team to fill both can be left without a meaningful choice.' },
  ],

  links: [
    'draft-science/replacement-value',
    'draft-science/positional-scarcity',
    'draft-science/roster-construction',
    'scenarios/waiting-on-quarterback',
    'fantasy-football-for-beginners',
  ],
};
