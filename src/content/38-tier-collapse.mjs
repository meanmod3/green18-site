// PAGE 38 — draft-science/player-tier-collapse. Source §13, §14, §17, §18.
// Original angle: the cliff is an EDGE effect. The last player in a tier is
// priced by the gap BELOW him, not by his own rank.
export default {
  slug: 'draft-science/player-tier-collapse',
  pageType: 'science',
  title: 'Player Tier Collapse in a Fantasy Draft | GREEN18',
  description: 'Why the last player in a fantasy tier is worth more than his rank suggests, and what happens to every remaining player once that tier empties.',
  breadcrumb: 'Tier Collapse',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Is Player Tier Collapse in a Fantasy Draft?',
    lede: [
      'Players at a position are not evenly spaced. They cluster into groups of roughly interchangeable value, separated by gaps.',
      'A tier collapses when the last player in one of those clusters is drafted, and everyone still available at the position drops to the next cluster down.',
      '**The cliff is not where the tier starts. It is where the tier ends.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the Worked Example', href: '#how-it-works' },
  },

  answer: 'Player tier collapse is the moment the last player in a value tier is drafted, after which every manager who still needs that position must fall to the next tier down. A tier is a group of players at one position whose expected production is close enough that choosing between them changes little, and the meaningful loss happens not when a tier is entered but when it is emptied. Because of that structure, the final player in a tier carries more situational draft value than his rank suggests: he is priced by the size of the gap beneath him, not by the small distance between him and the player above him.',

  claims: [
    'Player tier collapse occurs when the last player in a value tier is drafted and every remaining option at that position falls to the next tier down.',
    'The last player in a tier carries more situational draft value than his rank implies, because the drop below him is larger than the drop above him.',
    'Tier boundaries matter more than ordinal rank, since the difference between the fifth and sixth player at a position can be trivial while the difference between the sixth and seventh is a cliff.',
    'A tier with eight remaining players and a tier with one remaining player produce different draft urgency even when the players themselves are identically ranked.',
    'Every manager still needing a position is repriced simultaneously when that position\'s current tier empties, which is why runs on a position tend to follow a collapse rather than precede it.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Exactly Is a Tier?', body: [
      '**A tier is a group of players at one position whose expected production is close enough that the choice between them is close to arbitrary.**',
      'Ranking forces a total order onto players. Tiers restore the truth that order hides: the gap between adjacent ranks is not constant.',
      'Between two players inside a tier, a manager can take either and lose almost nothing. Between the bottom of one tier and the top of the next, a manager loses real production.',
      'This is why a ranked list is a poor decision instrument on its own. Rank 6 and rank 7 look one step apart. Sometimes they are a cliff apart.',
    ], quote: 'Ranking tells you the order. Tiers tell you where the order stops mattering.' },

    { type: 'prose', h2: 'Why Is the Last Player in a Tier Worth More Than His Rank?', id: 'how-it-works', body: [
      '**Because his value is set by what comes after him, not by what came before him.**',
      'Work through a concrete case. Suppose the running back board has a tier of four players — call them RB4, RB5, RB6 and RB7 — who project within a couple of points of each other over a season. Below them, the next running back projects meaningfully lower, and the six after that are lower still.',
      'Three of those four backs are drafted. RB7 is now the last member of the tier.',
      'A static ranking still shows him seventh. Nothing about his projection changed. But the decision facing you did:',
    ], list: [
      'Take RB7 and you get essentially the same production as RB4 would have given you.',
      'Miss RB7 and your next running back comes from the tier below, which is a real downgrade rather than a rounding difference.',
      'Every other manager who still needs a running back is looking at exactly the same two options.',
    ], after: [
      '**The cost of missing him is the entire gap to the next tier. That is what he is actually worth right now.**',
      'This is the same mechanism as [replacement value](/draft-science/replacement-value), observed at its sharpest point. Replacement quality usually declines gradually. At a tier boundary it declines all at once.',
    ]},

    { type: 'diagram', name: 'tierCollapse',
      h2: 'The Tier Empties, Then the Cliff Appears',
      sub: 'A tier drains to its final member, and the drop to the tier beneath it becomes the whole decision.',
      caption: 'The top row is a tier: players close enough in value that which one you get barely matters. They go one at a time, and nothing about the position changes while several remain. Then one is left. Taking him is worth far more than his rank suggests, because the alternative is no longer the player beside him — it is the row below, across a gap that nobody in the draft can bridge. When the last block goes, everyone still waiting on the position starts the round at the lower row.' },

    { type: 'table', h2: 'What Changes When a Tier Empties?', sub: 'The same eight players, before and after the tier above them is exhausted.',
      columns: ['Board state', 'Best available at the position', 'Cost of waiting one round', 'Urgency'],
      rows: [
        ['Tier has 4 players left', 'Tier-2 quality', 'Low — a comparable player very likely survives', 'Defer'],
        ['Tier has 2 players left', 'Tier-2 quality', 'Rising — one of two must survive several picks', 'Watch'],
        ['Tier has 1 player left', 'Tier-2 quality', 'High — the gap to the next tier is the whole cost', 'Act'],
        ['Tier has 0 players left', 'Tier-3 quality', 'Low again — the cliff already happened', 'Defer'],
      ],
      note: 'Urgency is highest just before a collapse and lowest just after one. A position is rarely more deferrable than in the minutes after its tier empties.' },

    { type: 'prose', h2: 'What Happens to Everyone Below After the Collapse?', body: [
      '**They rise, but not evenly, and not because they got better.**',
      'When a tier empties, every remaining player at the position becomes the new best available. That raises their market price immediately — but their situational value depends on how deep the *next* tier is.',
      'If the next tier holds nine near-identical players, remaining depth is enormous. The position just became cheap to defer, because missing one of the nine costs almost nothing. Managers who panic into that tier are paying tier-2 prices for tier-3 production.',
      'If the next tier holds two players, the position just became the most urgent thing on the board, and a second collapse is minutes away.',
      'The collapse itself carries no information about which of those two worlds you are in. The shape of what remains does.',
    ]},

    { type: 'prose', h2: 'Why Does One Collapse Trigger a Run?', body: [
      '**Because the collapse reprices every manager at the same instant.**',
      'Tiers are broadly visible. When the last clearly-better player at a position disappears, every roster still missing that position sees its replacement quality fall in the same pick.',
      'The result is a cluster of selections at one position over the following few picks — the phenomenon a manager experiences as [five running backs going in a row](/scenarios/five-running-backs-go-in-a-row) or a [quarterback run](/scenarios/superflex-quarterback-run).',
      'Reading it as herd behavior is a mistake. It is a shared, correct reaction to a shared change in the board. Understanding that lets you get in front of it once, instead of chasing it for three rounds.',
    ], quote: 'A run is usually not panic. It is a dozen managers responding to the same cliff at the same time.' },

    { type: 'prose', h2: 'When Should You Deliberately Let a Tier Collapse?', body: [
      '**When the tier below it is deep enough that the cliff is small, or when your next pick is close enough to make the risk cheap.**',
      'Tier collapse is a reason to act, not an order to act. Two conditions cancel the urgency.',
      'The first is depth below the cliff. A shallow drop into an eight-player tier is not a cliff at all — it is a small step, and paying a premium to avoid it is how managers overdraft positions.',
      'The second is [pick horizon](/draft-science/pick-horizon). If you pick again in three selections, one tier player only has to survive three picks. If you pick again in nineteen, the same tier is effectively already gone. Two managers can face an identical collapse and correctly reach opposite conclusions.',
      'Both of those conditions are also affected by what your roster already holds, which is the subject of [roster construction](/draft-science/roster-construction).',
    ]},

    { type: 'prose', h2: 'How Does GREEN18 Handle Tier Collapse?', body: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'Tier structure is not a fixed label attached to a player before the draft. It is a property of the pool that is still available, so it is recomputed as picks are recorded.',
      'When a tier thins, the remaining members of it move in your board because the cost of missing them has risen. When it empties, the players below stop being urgent because the cliff has already been paid.',
      'The calculation is deterministic: [the same board always produces the same answer](/fantasy-football-draft-algorithm), which is what makes the movement explainable rather than mysterious.',
    ]},

    { type: 'convert', h2: 'The Cliff Is at the End of the Tier.',
      body: ['A printed cheat sheet shows you rank 7. It cannot show you that rank 7 is the last one before the drop.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is a tier in fantasy football rankings?', a: 'A tier is a group of players at one position whose projected production is close enough that the choice between them changes little. Tiers exist because players are not evenly spaced along a ranking: the gap between two adjacent ranks inside a tier can be negligible, while the gap between the last player of one tier and the first player of the next can be substantial.' },
    { q: 'What is tier collapse in a fantasy draft?', a: 'Tier collapse is the moment the last player in a value tier is drafted, after which every manager who still needs that position must select from the next tier down. The collapse is the point at which replacement quality at the position falls sharply rather than gradually.' },
    { q: 'Why is the last player in a tier worth more than his ranking suggests?', a: 'Because his value is determined by the size of the drop below him rather than by his distance from the player above him. Missing the last player in a tier costs a manager the entire gap to the next tier, while missing a player in the middle of a deep tier costs almost nothing.' },
    { q: 'Should you always draft the last player in a tier?', a: 'No, because the correct decision depends on how deep the next tier is and how soon the manager picks again. A shallow drop into a deep tier is not worth a premium, and a manager who picks again within a few selections can often let the tier run and still get comparable production.' },
    { q: 'Why do positional runs happen after a tier empties?', a: 'Because a tier collapse reprices every manager at once. Tier boundaries are broadly visible, so when the last clearly-better player at a position is drafted, every roster still missing that position experiences the same drop in replacement quality in the same pick, and several of them respond within the next few selections.' },
  ],

  links: [
    'scenarios/last-player-in-a-tier',
    'scenarios/five-running-backs-go-in-a-row',
    'tools/scarcity-calculator',
    'draft-science/replacement-value',
    'fantasy-football-positional-scarcity',
  ],
};
