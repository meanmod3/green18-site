// PAGE 75 — SECTION HUB for /draft-science. This is the methodology hub: it must
// explain how the eight concept pages compose into ONE valuation, not merely list them.
export default {
  slug: 'draft-science',
  pageType: 'science',
  title: 'The Science of Draft-State Valuation | GREEN18',
  description: 'How these ideas — scarcity, replacement, horizon, tiers, roster, format — compose into a single valuation of a player at one pick.',
  breadcrumb: 'Draft Science',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'The Science of Draft-State Valuation',
    lede: [
      'Draft-state valuation is not a collection of tips. It is one calculation, assembled from parts, run again after every pick.',
      'The pages in this section are the parts. Read in order, they describe a single model rather than a set of separate ideas.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It is computed in stages: a baseline projection is converted into a margin over replacement level, that margin is weighted by how fast quality is falling behind the player at his position, discounted by the probability he survives to the manager’s next pick, corrected for tier structure rather than rank order, and finally conditioned on the roster already built and the scoring format in force. The concepts documented in this section are the ideas behind those stages, not a set of alternative theories.',

  claims: [
    'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.',
    'Replacement value, positional scarcity, pick horizon, tier structure, roster construction and scoring format are stages of one valuation rather than competing draft strategies.',
    'A projection alone cannot rank players across positions, because a projected total says nothing about what a manager would have received from the next player at the same position.',
    'Every selection made by any manager changes the valuation of every player still available, because a selection removes an alternative from the set that all remaining values are measured against.',
    'Two managers looking at an identical draft board can hold different correct valuations of the same player, because roster state, scoring format and distance to the next pick differ between them.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Is Draft-State Valuation?',
      body: [
        'Draft-state valuation values a player by the state of the draft in front of you, not by a number printed before the season started.',
        'A preseason ranking answers one question: who is expected to score the most. That question is answered once, for everyone, and never asked again. A draft asks a different question at every pick — **what is this player worth to me, here, given what is gone and what I still need** — and the answer moves whether or not any projection does.',
        'The distinction matters because value in a draft is relative. A player is worth the gap between what he produces and what you would otherwise have had. Drafting destroys the "otherwise", so every pick edits the gap. That is the whole idea; the rest of this section is how the gap is computed.',
      ],
    },

    { type: 'prose', h2: 'How Do the Eight Concepts Fit Together?',
      body: [
        'They are stages of one calculation, applied in order, and each stage consumes the output of the last.',
        'Read as a list they look like strategies you might choose between. They are not. Skipping one does not simplify the model — it silently substitutes a default, usually a wrong one. A manager who ignores pick horizon has not opted out of it; he has assumed the horizon is zero.',
      ],
      list: [
        '**Stage 1 — a baseline becomes a margin.** [Replacement value](/draft-science/replacement-value) converts a projection into the only number that can be compared across positions: how far a player beats the player you would have taken instead.',
        '**Stage 2 — the margin is weighted by decline.** [Positional scarcity](/draft-science/positional-scarcity) measures how fast that replacement is getting worse, which is what makes one margin more urgent than an equal margin elsewhere.',
        '**Stage 3 — the decision is discounted by time.** [Pick horizon](/draft-science/pick-horizon) sets how many selections stand between you and your next turn, which is the length of the risk you accept by waiting.',
        '**Stage 4 — rank is replaced by structure.** [Player tier collapse](/draft-science/player-tier-collapse) corrects for the fact that the board falls in steps, so the cost of waiting is concentrated at a few specific picks rather than spread evenly.',
        '**Stage 5 — the result is conditioned on your team.** [Roster construction](/draft-science/roster-construction) re-weights every position by the starting slots you have already filled and the ones you have not.',
        '**Stage 6 — the format re-prices the pool.** [Superflex quarterback value](/draft-science/superflex-quarterback-value) is the sharpest case of a scoring or lineup rule changing demand without changing supply.',
        '**The assembled result** is [draft-state valuation](/draft-science/draft-state-valuation) itself — the composite number, recomputed after every selection.',
      ],
      after: [
        'The order is not arbitrary. Scarcity is meaningless before replacement level is defined, because scarcity is a statement about how fast replacement quality is falling. And none of it is actionable before the pick horizon says how long the board has to stay intact. [Opportunity cost](/draft-science/opportunity-cost) is the idea that makes the whole sequence worth performing — it is what you are trying to avoid paying — rather than a stage of it.',
      ],
    },

    { type: 'cards', h2: 'Which Page Answers Which Question?',
      sub: 'Each concept page is written to be read alone, but the model only holds when they are read together.',
      cards: [
        { h3: 'Draft-State Valuation', body: 'The composite method itself: why a player’s worth is recalculated after every selection instead of fixed before the draft. Start here or finish here — [read it](/draft-science/draft-state-valuation).' },
        { h3: 'Replacement Value', body: 'What a player is worth is the gap to the best realistic alternative at his position, not his projected total. [Read it](/draft-science/replacement-value).' },
        { h3: 'Positional Scarcity', body: 'Scarcity is a rate of decline behind a player, not a property that a position permanently owns. [Read it](/draft-science/positional-scarcity).' },
        { h3: 'Opportunity Cost', body: 'Every selection is also a refusal, and the value of the refusal changes with every pick that precedes it. [Read it](/draft-science/opportunity-cost).' },
        { h3: 'Pick Horizon', body: 'The distance to your next turn is the size of the bet you place whenever you decide to wait. [Read it](/draft-science/pick-horizon).' },
        { h3: 'Player Tier Collapse', body: 'Boards fall in steps rather than slopes, so the last player in a group is worth more than the first player below it. [Read it](/draft-science/player-tier-collapse).' },
        { h3: 'Roster Construction', body: 'The same player is worth different amounts to two differently built teams, because unfilled slots carry the demand. [Read it](/draft-science/roster-construction).' },
        { h3: 'Superflex Quarterback Value', body: 'A lineup rule that doubles quarterback demand without doubling supply re-prices the position structurally. [Read it](/draft-science/superflex-quarterback-value).' },
      ],
    },

    { type: 'prose', h2: 'Where Does the Theory Meet a Real Board?',
      body: [
        'In two places: the situations that force the decision, and the calculators that isolate one variable of it.',
        'The [draft scenarios](/scenarios) section takes the model to specific board states — [a run of five running backs](/scenarios/five-running-backs-go-in-a-row), [a quarterback run in Superflex](/scenarios/superflex-quarterback-run), [the last player in a tier](/scenarios/last-player-in-a-tier), [drafting from the turn](/scenarios/drafting-from-the-turn). Those pages are conditional: they state what changes, not what to do.',
        'The [draft calculators](/tools) let you put numbers on a single stage — [scarcity](/tools/scarcity-calculator), [pick horizon](/tools/pick-horizon-calculator), [replacement level](/tools/league-value-calculator), [Superflex quarterback demand](/tools/superflex-qb-demand-calculator) and [reception scoring](/tools/ppr-value-adjustment-calculator). Each isolates one variable, which is exactly why no one of them settles a pick.',
        'For the vocabulary itself, the [fantasy draft glossary](/glossary) defines every term used here in a form that stands alone, and [why fantasy rankings change during a draft](/why-fantasy-rankings-change-during-a-draft) states the consequence in a sentence.',
      ],
    },

    { type: 'prose', h2: 'Why Is Any of This Better Than a Ranking?',
      body: [
        'Because a ranking is a valuation with every draft-dependent input removed, and those inputs are the ones that move.',
        'A published list is not wrong so much as unfinished. It is correct for an average league, an average roster and an average pick slot — a combination that describes no actual manager on the clock. The stages above are the arithmetic a good manager performs in their head between the pick landing and the timer running out.',
        '**The method is deterministic: the same board, roster and settings always produce the same valuation.** That is the point. A valuation you cannot reproduce is an opinion with a number attached to it.',
      ],
    },

    { type: 'convert', h2: 'The Model, Running on Your Draft.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**Every stage on this page runs again after every pick, in the seconds you actually have.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is draft-state valuation?', a: 'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It recalculates each available player’s worth after every selection, because every selection changes the alternatives that remain.' },
    { q: 'Are these separate draft strategies?', a: 'No. Replacement value, positional scarcity, pick horizon, tier structure, roster construction and format effects are stages of one valuation. Omitting a stage does not simplify the model; it substitutes a default assumption, such as treating the distance to your next pick as zero.' },
    { q: 'In what order should the concepts be applied?', a: 'Replacement value comes first, because it converts a projection into a comparable margin. Scarcity weights that margin by how fast replacement quality is falling. Pick horizon discounts for time, tier structure corrects for step-shaped drops, and roster construction and scoring format condition the result on the specific team and league.' },
    { q: 'Why does a player’s value change when his projection has not?', a: 'Because value in a draft is the gap between a player and the alternative a manager would otherwise take. Drafting removes alternatives, so the gap widens or narrows without any change to the player’s expected production.' },
  ],

  links: [
    'draft-science/draft-state-valuation',
    'draft-science/replacement-value',
    'draft-science/positional-scarcity',
    'glossary',
    'why-fantasy-rankings-change-during-a-draft',
  ],
};
