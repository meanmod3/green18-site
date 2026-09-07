// PAGE 70 — scenario. Bye-week overlap. Honest framing: a real but small,
// bounded, in-season cost that is usually a roster-management problem rather
// than a draft problem. The page's value is telling readers when it genuinely
// should move a pick and when treating it as a tie-breaker is overcorrecting.
export default {
  slug: 'scenarios/two-starters-share-a-bye-week',
  pageType: 'scenario',
  title: 'Two of My Starters Share a Bye Week | GREEN18',
  description: 'A shared bye week is a real but bounded cost, and mostly a roster-management problem. When it should move a draft pick and when it is an overcorrection.',
  breadcrumb: 'Shared Bye Week',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Two of My Starters Have the Same Bye Week. Does That Change My Pick?',
    lede: [
      'You notice the overlap mid-draft, and the instinct is to avoid stacking a third player onto the same week.',
      'The cost is real, but it is bounded, it lands once, and it is usually solvable after the draft — which is why it deserves a small weight rather than a veto.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A shared bye week is a real cost, but a bounded one: it concentrates a known absence into a single week rather than creating a season-long weakness, and in most formats it is absorbed by the roster moves available during that week rather than by the draft. The condition that makes it worth acting on during a draft is whether a replacement will realistically be available when the week arrives — which depends on league size, bench depth and how thin the position is — not on the overlap itself. When a viable in-season replacement exists, a bye conflict is a scheduling problem and should never outrank a meaningful difference in player quality; when no such replacement exists at a thin position, the overlap becomes a genuine input and can correctly break a close call.',

  claims: [
    'A shared bye week concentrates a known absence into one week rather than creating a season-long roster weakness.',
    'The cost of a bye conflict depends on whether a viable replacement will be obtainable during the affected week.',
    'Bye-week overlap is primarily a roster-management problem and only secondarily a draft-time consideration.',
    'Using bye weeks to break a decision between players of clearly different quality trades a large permanent difference for a small one-week one.',
    'Thin positions and shallow replacement pools are the conditions under which a bye conflict legitimately moves a draft decision.',
  ],

  blocks: [
    { type: 'prose', h2: 'What the Cost Actually Is.', body: [
      'Naming the quantity precisely is most of the work, because the intuition badly overstates it.',
      '**It is one week, known in advance.** Unlike most roster problems, this one arrives on a schedule you can see from the day the draft ends, which makes it the easiest kind of problem to plan around.',
      '**It is the gap between your starters and their replacements, for that week only.** If a competent replacement is obtainable, the cost is that gap. If none is, the cost is a slot you cannot fill.',
      '**It scales with how many of your starters overlap.** Two is an inconvenience most rosters absorb. Several at once, at positions with no depth, is a week you may simply lose.',
      '**It does not compound.** The overlap does not make your team worse in any other week, which is what separates it from a genuine structural weakness.',
    ], quote: 'A bye conflict is a scheduled absence, not a flaw in the roster.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that bye weeks should be used as a tie-breaker whenever two players look close. Players who look close on your board still usually differ, and that difference applies to every week of the season while the bye applies to one. Trading a season-long edge for a single-week convenience is a bad exchange even when it feels tidy.',
      'The second wrong inference is that overlap is harmless. At a position where you carry no usable backup and the undrafted pool is thin, an overlap can leave you fielding an incomplete lineup, and that is a real loss rather than a theoretical one.',
      'A third is treating even distribution across weeks as a goal in itself. Spreading byes evenly costs you player quality every time it changes a pick, and it buys nothing in the weeks that were never a problem.',
      'A fourth is deciding this during the draft when it can be decided after it. Most bye conflicts are solved by the roster moves available in the week they land, which means the draft is the wrong place to pay for them.',
    ]},

    { type: 'steps', h2: 'How to Weigh It, in Order', steps: [
      { h3: 'Establish the quality difference first.', body: ['Compare the players on their own merits. If one is clearly better, the decision is already made and the bye is not an input.'] },
      { h3: 'Only then check the overlap.', body: ['Bye weeks belong at the end of the process. Letting them in early lets a one-week factor reorder a whole board.'] },
      { h3: 'Ask what a replacement would look like in that week.', body: ['Judge the depth at that position and the size of your league. A strong undrafted pool means the conflict resolves itself.'] },
      { h3: 'Count how many starters the week would cost you.', body: ['One or two is a manageable week. Beyond that, the week starts to look like a loss you cannot manage around.'] },
      { h3: 'Check whether your bench can cover it.', body: ['A bench with a usable player at the affected position converts the conflict into a lineup change and removes the cost almost entirely.'] },
      { h3: 'Break ties with it, and nothing more.', body: ['When two options remain genuinely indistinguishable on quality, taking the one that avoids the pile-up is free. That is the whole of its legitimate use.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**League size.** Shallow leagues leave a strong undrafted pool, so a bye conflict is close to free; deep leagues leave nothing to replace an absent starter with, which is when overlap starts to matter.',
      '**Position depth.** At a position where usable players are plentiful, the conflict is trivial. At a thin one, it is the case where the overlap earns a place in the decision.',
      '**Bench size.** A deep bench absorbs byes as a matter of routine; a shallow one leaves no slack, and every conflict has to be solved by acquiring someone.',
      '**How many starters already share the week.** The cost is not linear — the third and fourth overlapping starter hurt far more than the second, because they exhaust whatever slack the roster had.',
      '**In-season roster rules.** Formats with free and frequent roster moves make byes a scheduling exercise; formats that restrict moves push the cost back onto the draft.',
      '**How large the quality gap is.** The smaller the real difference between the two players, the more legitimate it is to let the bye decide.',
    ], after: [
      'The comparison mechanic is [opportunity cost](/draft-science/opportunity-cost); the slot logic behind it is [roster construction](/draft-science/roster-construction).',
    ]},

    { type: 'convert', h2: 'Small Costs Deserve Small Weights.',
      body: ['GREEN18 values players against the slot they would fill and the alternative you would realistically hold, so a one-week scheduling quirk stays a tie-breaker instead of quietly reordering your board.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Should a shared bye week change which player you draft?', a: 'Only as a tie-breaker between options that are genuinely close in quality, or when the affected position is thin enough that no viable replacement will be obtainable during that week. A bye applies to one week while a difference in player quality applies to every week, so the bye should carry the smaller weight.' },
    { q: 'How costly is it to have several starters on the same bye week?', a: 'The cost is the gap between those starters and whatever fills their slots for that single week, and it does not compound into any other week. It grows sharply once the number of overlapping starters exceeds what the bench and the available player pool can cover.' },
    { q: 'Is it worth spreading bye weeks evenly across a roster?', a: 'Even distribution is not valuable on its own. Pursuing it costs player quality on every pick it changes while buying nothing in the weeks that were never at risk, so it is better treated as a pleasant side effect than as an objective.' },
    { q: 'Are bye weeks a draft problem or a roster-management problem?', a: 'Mostly a roster-management problem. The conflict is known in advance and lands in a single, predictable week, which is exactly the kind of issue in-season roster moves are suited to solve — unless league depth or restricted roster rules make a replacement unrealistic.' },
  ],

  links: [
    'draft-science/roster-construction',
    'draft-science/opportunity-cost',
    'scenarios/already-have-two-wide-receivers',
    'tools/league-value-calculator',
    'fantasy-football-for-beginners',
  ],
};
