// PAGE 47 — scenario. An elite tight end slips past his expected slot. The
// interesting content is the positional-advantage argument and its honest
// counter: advantage measured against replacement, not against the field.
export default {
  slug: 'scenarios/elite-tight-end-falls',
  pageType: 'scenario',
  title: 'An Elite Tight End Just Fell to Me | GREEN18',
  description: 'A top tight end slipped past his expected pick. How to value a positional edge honestly: against the tight end you would otherwise start, not the whole field.',
  breadcrumb: 'Elite Tight End Falls',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'An Elite Tight End Just Fell to Me. Is That a Trap?',
    lede: [
      'The board says he should be gone. He is not, and you are on the clock.',
      'The question is how much the edge at a thin position is genuinely worth, measured the only way that counts: against the player you would otherwise be starting there.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'The value of taking an elite tight end who has fallen is the gap between him and the tight end you would otherwise start, minus the gap between the player you pass over and that player’s own replacement. A thin position produces a large edge only when the drop behind its top players is steep and stays steep — if the position flattens quickly after the top, the advantage is smaller than it appears, because your alternative was never far away. The fall itself is not the argument for the pick; it only means the same edge is now available at a lower cost, and a cheaper edge is still worth nothing if the edge was small to begin with.',

  claims: [
    'The advantage of drafting a scarce-position starter equals his margin over the player who would otherwise fill that slot, not his margin over the position’s field.',
    'A position with a steep drop after its top players creates a larger and more durable draft edge than a position that flattens immediately.',
    'A player falling below his expected draft position lowers the cost of an advantage without changing the size of that advantage.',
    'Taking a positional edge always requires giving up the edge available at the position being passed over, so the comparison must be run on both sides.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Just Changed?', body: [
      '**The cost of the edge fell.** The player is the same; the pick required to acquire him is later than expected. That is the entire content of a fall.',
      '**Your opportunity cost changed with it.** A later pick spent here is a later pick not spent elsewhere, and the players you would have taken instead are also later players now.',
      '**Replacement level at tight end did not move.** However many managers passed, the depth behind the top of the position is exactly what it was.',
      '**The room revealed its priorities.** Several managers just told you that they value other positions more right now, which is information about what will still be available when you pick again.',
    ], quote: 'A fall changes the price of an edge, never its size.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The most common wrong inference is that an elite player at a thin position is automatically worth more than a comparable player at a deep one. That framing compares him with the average of his position, which is not a player you would ever have started. The honest comparison is with the tight end you would actually roster if you passed — which, in most formats, is a real starter, not a replacement-level body.',
      'The second wrong inference is that the fall proves the room is wrong. Managers pass on a scarce-position star for structural reasons that may be sound in their own drafts: full rosters at the position, formats where the slot matters less, or simply having spent their early picks differently. A fall is a description of other people’s constraints.',
      'The third is treating the advantage as permanent. A single-slot positional edge is a weekly margin against one opposing lineup slot. It compounds far less than an edge at a position where the format starts several players.',
      'And the fourth: forgetting that taking the fall means passing something. If the player you skip sits at the boundary of a collapsing tier, you may be trading a modest permanent edge for a large immediate loss.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Name your alternative at the position.', body: ['Identify the tight end you would realistically start if you pass now. Not the worst available — the one you would actually end up with.'] },
      { h3: 'Measure the edge against that player, not the field.', body: ['The margin over your realistic alternative is the only advantage the pick actually buys you.'] },
      { h3: 'Measure what you give up.', body: ['Take the best player you would otherwise select and compare him with his own likely replacement at your next turn. That gap is the cost of the edge.'] },
      { h3: 'Check how many slots the format starts.', body: ['An edge at a position the league starts once is worth less than an equivalent edge at a position it starts two or three times, because it applies to less of your lineup.'] },
      { h3: 'Test how long the edge survives your bench.', body: ['If the position is shallow enough that a season-long absence would be unrecoverable, the pick carries concentration risk that a deep position does not.'] },
      { h3: 'Take the larger number.', body: ['If the edge over your realistic alternative exceeds what you surrender elsewhere, the fall is a genuine gift. If not, the discount was on something you did not need.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Scoring.** Formats that reward receptions raise the floor of every pass-catching position and usually compress the tight-end edge, because your realistic alternative becomes better.',
      '**Starting slots.** A format that allows a tight end in a flexible spot changes both the demand for the position and how much of your lineup the edge covers.',
      '**League size.** In deeper leagues your realistic alternative is materially worse, which widens the edge; in shallow leagues it can nearly vanish.',
      '**Your roster.** If you have already secured strong starters at the positions the format starts most often, the concentration risk of a thin-position pick is easier to carry.',
      '**Distance to your next pick.** A long wait raises the chance that the player you pass over is also gone, which raises the cost side of the comparison.',
    ], after: [
      'The general form of the trade being made here is [opportunity cost](/draft-science/opportunity-cost), measured against [replacement value](/draft-science/replacement-value).',
    ]},

    { type: 'convert', h2: 'Edges Are Measured Against Your Alternative.',
      body: ['GREEN18 values every available player against the player you would realistically hold instead, given your roster, your scoring and your next pick — which is what turns a fall into a decision instead of a temptation.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is an elite tight end worth an early pick?', a: 'The pick is worth making when the player’s margin over the tight end you would realistically start otherwise is larger than the margin you surrender at the position you pass over. Comparing him with the average of his position overstates the edge, because a positional average is not a player any manager would actually start.' },
    { q: 'Why do elite players at thin positions sometimes fall?', a: 'Because the managers ahead have their own constraints: rosters already filled at that position, formats in which the slot matters less, or early picks committed elsewhere. A fall describes the situations of the teams that passed rather than any change in the player.' },
    { q: 'Does a positional advantage compound over a season?', a: 'An advantage applies only to the lineup slots it fills, so an edge at a position the format starts once covers less of a roster than an equivalent edge at a position started two or three times. Scarcity raises the size of the edge; starting requirements determine how much of the lineup it reaches.' },
    { q: 'What is the cost of taking a player who has fallen?', a: 'The cost is the gap between the player being passed over and that player’s own likely replacement at the manager’s next turn. A fall lowers the price of an advantage but never removes the requirement to compare it with what the same pick could have bought elsewhere.' },
  ],

  links: [
    'draft-science/opportunity-cost',
    'draft-science/replacement-value',
    'scenarios/last-player-in-a-tier',
    'ppr-draft-assistant',
    'fantasy-football-draft-assistant',
  ],
};
