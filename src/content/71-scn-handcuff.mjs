// PAGE 71 — scenario. The handcuff. Framed strictly as exposure management:
// concentrated workload makes a roster fragile to an outcome nobody forecasts,
// and the backup is insurance with a price. NO injury prediction anywhere —
// the page never estimates whether or when anyone misses time.
export default {
  slug: 'scenarios/drafting-a-backup-for-your-own-running-back',
  pageType: 'scenario',
  title: 'Should I Draft My Own Running Back’s Backup? | GREEN18',
  description: 'Drafting the backup behind your own starter is insurance with a price. How workload concentration and the pick you would otherwise spend decide it.',
  breadcrumb: 'Drafting Your Own Backup',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Should I Spend a Pick on the Backup Behind My Own Running Back?',
    lede: [
      'The backup behind one of your starters is available, and taking him feels like protecting an investment.',
      'It is insurance, and insurance has a price: the pick itself. The decision is about how exposed that slot already is, not about forecasting anything.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Drafting the backup behind your own starter is a way of reducing your exposure to a single uncertain outcome, and it is worth doing when the price of the pick is lower than the value of that reduction. Two conditions decide it: how concentrated the workload in that backfield is, because a highly concentrated role is what makes the backup a plausible replacement rather than a spare part, and what else the pick could buy, because the slot spent has an alternative use that is often a player who would contribute regardless. Nothing in the decision requires estimating whether any player will miss time — the point is that the outcome cannot be forecast, which is precisely why exposure to it is worth pricing.',

  claims: [
    'Drafting the backup behind an owned starter reduces a roster’s exposure to a single uncertain outcome rather than predicting that outcome.',
    'The value of a backup rises with how concentrated the workload is in the role he would inherit.',
    'A pick spent on insurance carries the full cost of whatever that pick could otherwise have acquired.',
    'Concentrated workload makes a roster fragile in a way that owning both players in the same role directly offsets.',
    'A backup drafted from a committee role inherits only part of a workload, which weakens the protection the pick was meant to buy.',
    'The correct round for an insurance pick is the one where the alternatives on the board no longer offer meaningful contribution.',
  ],

  blocks: [
    { type: 'prose', h2: 'What You Are Actually Buying.', body: [
      'The pick buys a reduction in exposure. Everything else follows from how large that exposure is.',
      '**Concentration of the role.** A backfield where one player would absorb nearly all of the work if the arrangement changed is concentrated. One where the work would split among several is not, and the backup there inherits a fraction rather than a role.',
      '**How much of your roster rides on the slot.** A starter you spent an early pick on represents a larger share of your team, so the same uncertainty costs you more.',
      '**Your fallback if the slot empties.** In a shallow league the undrafted pool can cover it; in a deep one there is nothing to cover it with, which is what makes the insurance worth more.',
      '**The alternative use of the pick.** Every insurance pick is also a declined player. That declined player is the premium you are paying, and it is the number most managers never look at.',
      'Note what is absent from that list: any estimate of whether the arrangement will change. That is not knowable, and the case for the pick does not depend on it.',
    ], quote: 'Insurance is priced on exposure, not on prophecy.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that the pick is a forecast. It is not a statement that anything will happen to anyone. It is a statement that one of your slots is unusually dependent on a single arrangement holding, and that you would rather not be exposed to a change you cannot see coming.',
      'The second wrong inference is that owning a starter obliges you to own his backup. The obligation runs the other way: the backup has to earn the pick against every other player on the board, and in most rounds he does not.',
      'A third is treating all backups as equivalent insurance. A backup in a committee inherits a share of the work rather than the role, so the same pick buys much less protection — the structure of the backfield changes the product you are buying.',
      'A fourth is paying an early price for it. The premium is the player you decline, so the same insurance is cheap late and expensive early, even though the protection it provides is identical.',
      'A fifth is ignoring that the pick is concentrated in the opposite direction too. Both players occupy one situation, so a slot spent this way narrows the range of things your roster can be good at.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Judge how concentrated the role is.', body: ['Ask what share of the work would move to this backup if the arrangement changed. A near-complete inheritance is the case worth insuring; a split is not.'] },
      { h3: 'Measure your exposure at that slot.', body: ['Weigh how much of your roster’s expected contribution sits with that one starter. Large exposure justifies a larger premium.'] },
      { h3: 'Name the player you would decline.', body: ['Write down who else you would take with the pick. That player is the price, and comparing insurance against nothing always flatters the insurance.'] },
      { h3: 'Check what the undrafted pool would offer.', body: ['If your league is shallow enough that the slot could be refilled after the draft, the pick is buying protection you already have for free.'] },
      { h3: 'Delay until the alternatives thin out.', body: ['Hold the idea until the board no longer offers players who would contribute in normal circumstances. The premium falls every round while the protection does not.'] },
      { h3: 'Re-check when the backup’s own cost moves.', body: ['If other managers begin taking backups, the price of this one rises. Insurance is worth buying at some prices and not at others.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Backfield structure.** A concentrated role makes the backup a genuine replacement; a committee makes him a partial one, and that single distinction moves the decision more than anything else.',
      '**Where your starter was drafted.** The earlier the pick you have committed to that slot, the more of your roster is exposed to one arrangement holding.',
      '**League size.** Deep leagues have no post-draft safety net, which raises the value of owning the replacement in advance; shallow leagues supply one for free.',
      '**Bench size.** Insurance needs a place to sit. A shallow bench means the pick displaces a player you would actually use week to week.',
      '**How late it is.** In the rounds where the remaining players would rarely enter a lineup anyway, the premium approaches zero and the case becomes easy.',
      '**Whether the backup has standalone value.** A backup who would contribute even with the arrangement unchanged is not purely insurance, and that changes the calculation from a hedge into an ordinary pick.',
    ], after: [
      'The pick you decline is the real price — see [opportunity cost](/draft-science/opportunity-cost) — and the fallback you are insuring against is [replacement value](/draft-science/replacement-value).',
    ]},

    { type: 'convert', h2: 'Price the Insurance. Then Decide.',
      body: ['GREEN18 values every available player against the slot he would occupy and the alternative you would otherwise hold, so a hedge shows up with its price attached rather than as a reflex.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is drafting your own starter’s backup a good idea?', a: 'It is worth doing when the pick costs less than the exposure it removes. The decision turns on how concentrated the workload in that role is and on which player you would otherwise take with the pick, so the same move can be clearly correct late and clearly wasteful early.' },
    { q: 'What makes one backup better insurance than another?', a: 'The structure of the role he would inherit. A backup positioned to absorb nearly all of the work if the arrangement changes provides close to full protection, while a backup in a committee inherits only a share and therefore buys much less coverage for the same pick.' },
    { q: 'What does a handcuff pick actually cost?', a: 'The cost is the player declined to make room for it, plus the bench slot it occupies. Insurance evaluated against nothing always looks free, which is why naming the specific alternative on the board is the step that makes the price visible.' },
    { q: 'When is the right time in a draft to take a backup behind your own starter?', a: 'Once the remaining board no longer offers players who would contribute under normal circumstances. The protection the pick provides does not change from round to round, but the premium falls steadily, so waiting improves the exchange without weakening the hedge.' },
    { q: 'Does taking a backup require predicting that something will happen?', a: 'No. The move is a response to uncertainty rather than a forecast of any particular outcome. Its logic is that a slot depending entirely on one arrangement is fragile, and that owning both players in that role removes the fragility whether or not anything changes.' },
  ],

  links: [
    'draft-science/opportunity-cost',
    'draft-science/replacement-value',
    'draft-science/roster-construction',
    'scenarios/already-have-two-wide-receivers',
    'fantasy-football-draft-assistant',
  ],
};
