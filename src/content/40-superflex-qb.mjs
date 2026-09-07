// PAGE 40 — draft-science/superflex-quarterback-value. The structural argument:
// Superflex moves REPLACEMENT LEVEL for an entire position because starting
// demand exceeds the supply of viable starters. Not a "draft QBs early" page.
export default {
  slug: 'draft-science/superflex-quarterback-value',
  pageType: 'science',
  title: 'Why Superflex Reprices Quarterbacks | GREEN18',
  description: 'Superflex re-prices quarterbacks structurally, not cosmetically: more starting slots than viable starters moves replacement level for the whole position.',
  breadcrumb: 'Superflex QB Value',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'Why Does Superflex Change Quarterback Value So Much?',
    lede: [
      'The common explanation is that quarterbacks matter more in Superflex. That is true, and it explains nothing.',
      'The actual mechanism is arithmetic: the format creates more quarterback starting slots than there are quarterbacks worth starting.',
      '**When demand for a position exceeds its supply of viable starters, replacement level moves for every player at that position at once.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the Arithmetic', href: '#how-it-works' },
  },

  answer: 'Superflex changes quarterback value structurally rather than cosmetically because it creates more quarterback starting slots across the league than there are quarterbacks capable of filling them well. In a single-quarterback league, a twelve-team league needs twelve starters from a pool of roughly thirty-two, so the replacement quarterback is a competent professional starter and the gap between an elite quarterback and a replacement one is small. In Superflex, where a flex slot may also be filled by a quarterback, potential demand approaches twenty-four starters from the same pool, and the replacement quarterback becomes a backup or a committee starter. Every quarterback\'s value rises because the alternative to owning one has gotten much worse, not because any quarterback\'s projection changed.',

  claims: [
    'Superflex is a roster format in which a flex slot may be filled by a quarterback, allowing a team to start two quarterbacks in a single lineup.',
    'Superflex raises quarterback value by moving positional replacement level, not by increasing any individual quarterback\'s projected production.',
    'A twelve-team Superflex league can demand up to twenty-four starting quarterbacks from a pool of roughly thirty-two professional starters.',
    'The gap between an elite quarterback and a replacement-level quarterback is far wider in Superflex than in a single-quarterback league, because the replacement is a backup rather than a starter.',
    'Quarterback scarcity in Superflex is a property of league-wide demand, which means it can arrive before the position looks thin on a ranking list.',
    'In GREEN18 the Superflex market is compiled separately from the single-quarterback market rather than derived from it by a positional multiplier.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Superflex, Precisely?', body: [
      '**Superflex is a roster format in which one flex slot accepts a quarterback in addition to the usual running backs, wide receivers and tight ends.**',
      'It is a single line in the league settings. A team is not required to start two quarterbacks — it is permitted to, and in practice nearly every team wants to, because a starting quarterback almost always outscores a flex-level skill player.',
      'That optionality is the entire format. Everything that follows is a consequence of it.',
      'Note what Superflex is not: it is not a scoring change. No quarterback is projected for a single additional point. The players are unchanged and the board is transformed anyway — which makes it the cleanest demonstration in fantasy football that value is not the same thing as production.',
    ], quote: 'Superflex changes no player’s projection and reorders the entire first three rounds.' },

    { type: 'prose', h2: 'What Is the Actual Arithmetic?', id: 'how-it-works', body: [
      '**Count starting slots against the supply of viable starters. That ratio is the whole argument.**',
      'Take a twelve-team league. The professional league has thirty-two starting quarterbacks in any given week, and fewer than that who are genuinely reliable.',
      'In a single-quarterback format, the league needs twelve starters. Twelve of roughly thirty-two. Most teams will also carry a backup, so perhaps eighteen quarterbacks are rostered in total — and fourteen useful ones sit unowned. If you miss on a quarterback entirely, you can pick a starting professional quarterback off the waiver wire.',
      'In Superflex, potential demand is twenty-four. Add backups and essentially every startable quarterback in the sport is rostered before the draft ends.',
    ], list: [
      'Single-QB: 12 slots, ~32 viable starters. Supply comfortably exceeds demand.',
      'Superflex: up to 24 slots, the same ~32 viable starters. Supply barely exceeds demand.',
      'The pool did not shrink. The claim on it doubled.',
    ], after: [
      '**In a single-quarterback league you are competing for quality. In Superflex you are competing for existence.**',
    ]},

    { type: 'table', h2: 'How Far Does Replacement Level Actually Move?', sub: 'Twelve-team league. Same players, same projections, different format.',
      columns: ['Format', 'Starting QB slots demanded', 'Who your replacement QB is', 'Gap between elite and replacement'],
      rows: [
        ['Single quarterback', '12', 'A capable professional starter, often available on waivers', 'Modest'],
        ['Superflex', 'Up to 24', 'A backup, a committee starter, or an empty slot', 'Large'],
      ],
      note: 'The elite quarterback is identical in both rows. Only the thing you are comparing him against changed — and that is what determines his draft value.' },

    { type: 'prose', h2: 'Why Is This Structural Rather Than Cosmetic?', body: [
      '**Because it moves the baseline the whole position is measured against, rather than adjusting individual players.**',
      'Most format differences reprice players unevenly. Reception scoring, for example, lifts high-volume receivers more than it lifts low-volume ones — a change in the *ordering* within positions. That is described in [what PPR scoring actually does](/formats/ppr).',
      'Superflex does something different. It does not reorder quarterbacks against each other at all; the best quarterback in a single-quarterback league is still the best quarterback in Superflex, and by the same margin. What moves is the entire position relative to every other position, because the value of a player is measured against his replacement, and the quarterback replacement got dramatically worse.',
      'This is [replacement value](/draft-science/replacement-value) operating at the level of a whole position instead of an individual player. It is the reason Superflex boards look reorganized rather than merely re-sorted.',
    ]},

    { type: 'prose', h2: 'Does That Mean You Must Draft Quarterbacks Early?', body: [
      '**No, and treating it as a rule is the most common Superflex mistake.**',
      'The structural argument establishes that quarterbacks are worth more in Superflex. It does not establish what they are worth *at your pick, in your room, tonight*.',
      'The reason is that the demand which creates the scarcity is league-wide behavior, and league-wide behavior varies. Two twelve-team Superflex leagues can drain the position at completely different rates.',
      'If your room takes eight quarterbacks in the first two rounds, replacement level collapses immediately and the remaining quarterbacks are the most valuable assets on the board.',
      'If your room drafts as though the format were single-quarterback, [quarterbacks fall past their value](/scenarios/quarterbacks-falling-in-superflex) and you can build a skill-position core while collecting them later at a discount that would be impossible in a disciplined room.',
      'Both situations are Superflex. A preset script cannot tell them apart. Only the actual sequence of picks can.',
    ], quote: 'Superflex tells you the position is scarce. Only your room tells you when.' },

    { type: 'prose', h2: 'What Makes a Superflex Quarterback Run So Dangerous?', body: [
      '**Because unlike other positional runs, there is no second tier deep enough to absorb the managers who miss.**',
      'When a run drains a skill position, the managers who miss fall to a lower tier that still contains dozens of players. Someone always gets a starter.',
      'When a run drains quarterbacks in Superflex, the managers who miss can fall past the end of the useful supply entirely. There is no tier of thirty spare quarterbacks below, because there are only thirty-two in the sport.',
      'That is why a [Superflex quarterback run](/scenarios/superflex-quarterback-run) reprices the board faster than any other event in a fantasy draft, and why the [distance to your next pick](/draft-science/pick-horizon) matters more in this format than in any other. Waiting nineteen picks through a quarterback run and waiting three picks through one are not the same decision.',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Value Superflex Quarterbacks?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'The Superflex slot is a league setting, so it is applied before the board is built rather than as an adjustment afterward. Quarterback replacement level is computed against the supply that actually remains, and against how many teams in your specific league still need one.',
      'That phrase is literal. The Superflex market is compiled separately from the single-quarterback market — one of twenty-four GREEN18 ships across quarterback format, scoring rules and league size — so no quarterback multiplier is ever applied to a shared board. The arithmetic above is not a correction layered on top of a single-quarterback ranking; it is the assumption the Superflex board was built under. How each of those [format axes moves the board](/formats) is measured rather than assumed.',
      'That means the board responds to your room rather than to the format in general — rising when the position drains and easing when it does not, without being told in advance which of those drafts you are in.',
      'The calculation is deterministic: [the same board always produces the same answer](/fantasy-football-draft-algorithm). The conversion-focused version of this format is the [Superflex draft assistant](/superflex-draft-assistant) page.',
    ]},

    { type: 'convert', h2: 'Superflex Is an Arithmetic Problem Before It Is a Strategy.',
      body: ['Two dozen slots, thirty-two quarterbacks, and twelve managers all doing the math at the same time.', '**Download GREEN18 for iPhone and draft Superflex against the supply that is actually left.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is a Superflex league in fantasy football?', a: 'A Superflex league is one in which a flex roster slot may be filled by a quarterback as well as by a running back, wide receiver or tight end. A team is permitted but not required to start two quarterbacks, and because a starting quarterback usually outscores a flex-level skill player, most teams want to.' },
    { q: 'Why are quarterbacks worth more in Superflex?', a: 'Because Superflex creates far more quarterback starting slots than a single-quarterback league while the supply of viable starting quarterbacks is unchanged. That moves positional replacement level: the quarterback a manager can fall back on is a backup rather than a capable professional starter, so the gap between owning a good quarterback and not owning one is much larger.' },
    { q: 'How many quarterbacks does a twelve-team Superflex league need?', a: 'A twelve-team Superflex league can demand up to twenty-four starting quarterbacks each week, compared with twelve in a single-quarterback format. Because the professional league has roughly thirty-two starters, nearly every startable quarterback ends up rostered.' },
    { q: 'Should you always draft two quarterbacks early in Superflex?', a: 'No. Superflex establishes that quarterbacks are structurally more valuable, but the right timing depends on how quickly the specific league drafts the position. In a room that attacks quarterbacks immediately, waiting is expensive, while in a room that drafts as though the format were single-quarterback, quarterbacks can be acquired later at a substantial discount.' },
    { q: 'Is the Superflex board a scaled version of the single-quarterback board?', a: 'No. In GREEN18 the Superflex market is compiled separately rather than derived from the single-quarterback market by a positional multiplier. It is one of twenty-four precompiled markets spanning quarterback format, scoring rules and league size, so the doubled starting demand is an assumption the board was built under rather than a correction applied afterward.' },
    { q: 'Why is a quarterback run more damaging in Superflex than a run at other positions?', a: 'Because there is no deep second tier to absorb the managers who miss. A run on a skill position pushes managers into a tier that still contains dozens of players, while a quarterback run in Superflex can push managers past the end of the useful supply, since only about thirty-two starting quarterbacks exist.' },
  ],

  links: [
    'scenarios/superflex-quarterback-run',
    'scenarios/quarterbacks-falling-in-superflex',
    'tools/superflex-qb-demand-calculator',
    'superflex-draft-assistant',
    'draft-science/replacement-value',
  ],
};
