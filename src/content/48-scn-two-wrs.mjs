// PAGE 48 — scenario. Roster-construction question: does owning two starters at
// a position reduce the value of a third? The honest answer is "only through
// the lineup slots and the bench", which is a more interesting page than
// "diversify".
export default {
  slug: 'scenarios/already-have-two-wide-receivers',
  pageType: 'scenario',
  title: 'I Already Have Two Wide Receivers | GREEN18',
  description: 'Does owning two starters at a position lower the value of a third? How roster fit, flexible starting slots and bench value actually change the calculation.',
  breadcrumb: 'Already Have Two Receivers',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'I Already Have Two Wide Receivers. Should I Take a Third?',
    lede: [
      'The best player available plays a position you have already filled twice.',
      'Roster balance is a real constraint, but it is a much narrower one than most managers apply — and applying it too early is one of the most expensive habits in a draft.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Owning two starters at a position reduces the value of a third only to the extent that the third player has nowhere to start. If your format has a flexible slot that the position can occupy, the third player is still a starter and his value is barely diminished; if every eligible slot is full, his value falls to what a bench player is worth to you, which is real but much smaller. The mistake in either direction is to treat balance as a rule rather than as a consequence: a roster is not improved by spreading picks evenly across positions, it is improved by filling each starting slot with the largest possible margin over the player who would otherwise fill it.',

  claims: [
    'Owning two starters at a position lowers the value of a third only insofar as the third player has no starting slot to occupy.',
    'A flexible starting slot preserves most of the value of an additional player at any position eligible to fill it.',
    'Roster balance is an outcome of filling starting slots efficiently rather than a target to be pursued for its own sake.',
    'A bench player’s draft value comes from the chance he is needed, which makes it real but systematically smaller than a starter’s.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Just Changed?', body: [
      '**Your marginal starting slot moved.** Before the second receiver, another receiver upgraded a starting spot. After it, the next one upgrades whatever slot remains eligible — often a flexible one, sometimes only the bench.',
      '**Your replacement level at the position rose.** You now have two acceptable players there, so the worst outcome of never drafting another is much better than it was.',
      '**Your replacement level everywhere else did not.** The positions you have not touched still sit at whatever the waiver pool offers, which is usually a long way down.',
      '**Nothing about the available player changed.** He is as good as he was; only the slot he would occupy on your team is different.',
    ], quote: 'A roster is a set of slots, not a set of positions.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is "I have two, so I need something else." That reasoning treats positions as quotas, and quotas ignore magnitude. If the third receiver is far better than anything you could put in a flexible slot, and the alternative position offers a player barely above what you could find later, the balanced-looking pick is the worse team.',
      'The opposite wrong inference is that roster fit does not matter at all. It matters exactly where the slots run out. A player who can only sit on your bench contributes through insurance and trade value, and those are genuinely worth less than points in a lineup.',
      'A third mistake is applying the constraint too early. In the first handful of rounds, most rosters still have flexible slots open, so the discount for owning two of a position is small. The constraint binds late, not early, and managers who apply it in round three pay for a problem they do not yet have.',
      'A fourth is forgetting that a position you have not filled has a **worse** replacement than the one you have. Structural need is not superstition; it is the observation that your fallback at an empty position is terrible.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Find the slot the player would actually fill.', body: ['A dedicated slot, a flexible slot, or the bench. Everything else follows from this answer.'] },
      { h3: 'Name the player he would displace there.', body: ['If the flexible slot currently belongs to someone weak, the upgrade is large. If it already holds a strong player, the upgrade is small.'] },
      { h3: 'Do the same at your empty position.', body: ['Compare the best available player at a position you have not filled with the player you would end up with there if you keep waiting.'] },
      { h3: 'Compare the two upgrades directly.', body: ['Both numbers are margins over a realistic alternative, so they are on the same scale and can simply be ranked.'] },
      { h3: 'Apply the horizon.', body: ['If the empty position is thinning and your next pick is far away, its upgrade is worth more than it looks today.'] },
      { h3: 'Take the larger upgrade, then re-check the slots.', body: ['After any pick, recompute which slots are still open — the constraint tightens as the draft goes on, and every previous answer expires.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Flexible starting slots.** The more slots a position can legally occupy, the less a third player at that position is discounted.',
      '**Scoring.** Formats that reward receptions raise the value of pass-catching depth generally, which makes stacking that depth less costly.',
      '**Bench size.** A deep bench makes surplus players more useful, both as insurance and as trade material; a shallow one makes them nearly worthless.',
      '**League size.** In shallow leagues the waiver pool is strong, so an empty position is less dangerous and the third receiver looks better; in deep leagues the reverse holds.',
      '**How much of the draft is left.** Early, the constraint is weak and you should mostly take the best upgrade. Late, slots dominate and structural need wins more often.',
    ], after: [
      'The full treatment is in [roster construction](/draft-science/roster-construction); the comparison mechanic is [opportunity cost](/draft-science/opportunity-cost).',
    ]},

    { type: 'convert', h2: 'Balance Is a Result, Not a Rule.',
      body: ['GREEN18 values every available player against the slot he would actually occupy on your roster, in your format, so the third player at a position is priced rather than dismissed.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Should you draft a third wide receiver if two are already on your roster?', a: 'Take him when the upgrade he provides to the slot he would actually fill is larger than the upgrade available at a position still empty. If the format has a flexible slot he can occupy, that upgrade is often substantial; if every eligible slot is full, his value drops to bench value.' },
    { q: 'Does owning two players at a position reduce the value of a third?', a: 'Only through the starting slots. Value in a fantasy lineup comes from the margin a player provides over whoever would otherwise occupy his slot, so a third player at a position is discounted precisely when there is no eligible slot left for him and not before.' },
    { q: 'Is roster balance a draft strategy?', a: 'Balance is best understood as an outcome rather than a goal. A roster becomes balanced because filling each starting slot with the largest available margin eventually forces a manager to address empty positions, not because spreading picks evenly across positions is itself valuable.' },
    { q: 'When does roster need start to dominate a draft decision?', a: 'Late, once the flexible starting slots are gone. Early in a draft most rosters can still absorb an additional player at almost any position, so the discount for stacking a position is small; the constraint tightens as the number of unfilled eligible slots falls.' },
  ],

  links: [
    'draft-science/roster-construction',
    'draft-science/opportunity-cost',
    'scenarios/rb-zero-start',
    'ppr-draft-assistant',
    'personalized-fantasy-football-rankings',
  ],
};
