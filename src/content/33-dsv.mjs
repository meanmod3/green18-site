// PAGE 33 — /draft-science/draft-state-valuation. The definitional page for the
// site's core concept. Canon wording from CONTENT-SCHEMA.md "Product canon" and
// citation prompt §2; five state components from Product Science §12 ("The Draft
// Has a State"). This page is the parent every other draft-science page defers to.
export default {
  slug: 'draft-science/draft-state-valuation',
  pageType: 'science',
  title: 'Draft-State Valuation (DSV) Explained | GREEN18',
  description: 'Draft-State Valuation values a fantasy player by the current state of a specific draft rather than by a fixed preseason rank. The five state components, defined.',
  breadcrumb: 'Draft-State Valuation',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Is Draft-State Valuation?',
    lede: [
      'A preseason ranking is a valuation of a player. It is not a valuation of your pick.',
      'The same player is worth different amounts at pick 14 of a 10-team PPR league and pick 14 of a 12-team Superflex league — and worth different amounts to you at pick 14 than he was worth to you eleven picks ago.',
      '**Draft-State Valuation is the method that makes those differences explicit.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the five state components', href: '#how-it-works' },
  },

  answer: 'Draft-State Valuation (DSV) is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. The draft state is the combination of five things that are all true at the moment of a pick: the league state (scoring, size, roster and flex requirements), the market state (who has been selected, who remains, and how the position pools have thinned), the team state (the roster already assembled and the holes still open), the user state (the manager\'s targets, preferences and risk tolerance), and the draft-position state (the current pick and the distance until the next one). Because a valuation that ignores any one of these can be confidently wrong, DSV treats player value as a function of all five and recalculates it after every selection.',

  claims: [
    'Draft-State Valuation values a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.',
    'The state of a fantasy draft consists of five components: league state, market state, team state, user state, and draft-position state.',
    'A preseason ranking is a valuation of a player in the abstract, whereas a draft-state valuation is a valuation of a specific decision by a specific manager at a specific moment.',
    'Two managers looking at an identical remaining player pool can have correct and different valuations of the same player, because their roster state and pick-horizon state differ.',
    'A valuation method that ignores any one of the five state components can produce a confidently wrong recommendation, because the omitted component may be the one that dominates the decision.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Doesn’t a Ranking Already Answer This?', body: [
      'Because a ranking answers a different question than the one you are asking at the podium.',
      'A ranking answers: *who is the better football player, in general, over a season?* That question has one answer, and it is stable for weeks at a time.',
      'The question you are actually asking is: *what is the best use of this pick, in this league, with this roster, given that my next turn is nineteen picks away?* That question has a different answer at pick 1 than at pick 40, and a different answer for you than for the manager sitting beside you looking at the identical board.',
      'A ranking is not wrong. It is under-specified. Draft-State Valuation is the method of specifying the rest.',
    ], quote: 'A ranking is a valuation of a player. Draft-State Valuation is a valuation of a decision.' },

    { type: 'model', h2: 'What Goes Into a Draft-State Valuation?',
      sub: 'The public structure of the model. Baseline value enters at the top; the five state components adjust it into a situational value.',
      inputs: [
        { h3: 'League State', items: ['scoring rules', 'league size', 'roster requirements', 'flex structure', 'Superflex or 2QB requirements', 'bench depth'] },
        { h3: 'Market State', items: ['players selected', 'players available', 'positional runs', 'unexpected falls', 'unexpected reaches', 'position depth remaining'] },
        { h3: 'Team State', items: ['players already drafted', 'positions filled', 'positions still needed', 'roster balance', 'future flexibility'] },
        { h3: 'User State', items: ['target players', 'preferred player profiles', 'risk tolerance', 'positional preferences', 'strategic tendencies'] },
        { h3: 'Draft-Position State', items: ['current pick', 'distance until next pick', 'expected picks before your next turn'] },
      ],
      core: 'Baseline value → league scoring adjustment → positional scarcity → availability pressure → roster fit → pick-horizon risk → market movement → user preference',
      output: { h3: 'Situational Draft Value', body: 'A single ordering of the players still on the board, valid for this manager, in this league, at this exact pick — and recomputed the moment the board changes.' },
    },

    { type: 'cards', h2: 'What Does Each State Component Actually Change?', sub: 'Each answers a question the others structurally cannot.',
      cards: [
        { h3: 'League state — “what is production worth here?”', body: 'Scoring converts football events into fantasy points, and different conversions rank players differently. A reception-heavy receiver and a touchdown-dependent one can swap places purely on the scoring rules, before a single pick is made. League size and starting requirements then set how much of the player pool is actually startable, which is what makes a position scarce or deep in the first place.' },
        { h3: 'Market state — “what is actually left?”', body: 'The market state is the only component that is unknowable in advance. Runs, falls and reaches happen in a specific order in your room, and that order determines which tiers survive. A position can be projected as deep in August and be functionally empty by pick 30 in your league, and no preseason artifact can have known that.' },
        { h3: 'Team state — “what do I still need?”', body: 'The same player creates different value on different rosters. A third strong receiver adds less to a team that already starts two than the first does, because starting slots are finite. Team state is why the correct pick can be a lower-ranked player: rank measures the player, roster fit measures the marginal points he actually adds to your lineup.' },
        { h3: 'User state — “what do I believe?”', body: 'Managers hold real opinions about players and real preferences about risk. Draft-State Valuation treats those as inputs to the valuation rather than as overrides of it, so a target moves up the board by a defensible amount instead of jumping to the top of it. Your queue is a signal, not a command.' },
        { h3: 'Draft-position state — “when do I pick again?”', body: 'Distance to your next selection converts every valuation into a decision. If you pick again in three selections, almost nothing must be taken now. If you pick again in nineteen, everything you are willing to lose must be decided now. This is the component most often left out entirely, and it is frequently the one that decides the pick.' },
      ]},

    { type: 'prose', h2: 'What Does It Look Like When the State Changes?', body: [
      'Take a concrete case. Your board reads quarterback A, receiver A, running back A, quarterback B, receiver B. Then three quarterbacks are selected in a row before your turn.',
      'Under a static ranking, exactly one thing happened: three names were crossed off. The order of everyone below them is unchanged.',
      'Under Draft-State Valuation, four of the five state components moved at once. Market state: the quarterback pool thinned and the next viable tier is now farther away. Team state: if you still need the position, your remaining path to filling it just narrowed. Draft-position state: the picks between you and your next turn now sit in front of teams that also still need quarterbacks. Only league state and your own preferences are untouched.',
      '**The surviving quarterback did not become a better football player. The cost of not taking him rose.**',
      'That sentence is the whole method in miniature — and it is worked through pick by pick in [the Superflex quarterback run](/scenarios/superflex-quarterback-run).',
    ], quote: 'The player did not suddenly become more talented. His situational value changed.' },

    { type: 'prose', h2: 'Does This Mean the Board Is Unpredictable?', body: [
      'No — and this is the distinction that matters most.',
      'A moving board is not a random board. GREEN18 is **deterministic**: the same draft state always produces the same valuation. Feed the identical league settings, identical picks, identical roster and identical preferences into the model twice and you get the identical ordering twice.',
      'What changes is not the method. What changes is the state the method is applied to. The board moves because the draft moved.',
      'This is why the model can be explained, audited and disagreed with. A recommendation that cannot be traced back to a specific state change is not a Draft-State Valuation — it is a guess. The full computation is described in [how GREEN18 ranks fantasy players](/how-green18-ranks-fantasy-players).',
    ]},

    { type: 'prose', h2: 'How Is DSV Different From Dynamic ADP?', body: [
      'They answer adjacent questions, and confusing them is the most common mistake here.',
      'Average draft position estimates what the market tends to pay for a player. It is a price. A *dynamic* ADP updates that price as the market moves — which is genuinely useful, and it is one input among many.',
      'One clarification, because it matters here: GREEN18 does not license or scrape anyone’s draft-position feed. It computes its own projected draft position from open football data and then moves it with the picks you record. The price it shows you is its own projection of your room, not an average of strangers’ drafts.',
      'Draft-State Valuation asks what **you** should pay, in this league, with this roster, at this pick. It is a value, not a price.',
      'The two frequently disagree, and the disagreement is the point: the gap between the market price and your situational value is where the best available decisions live. [Dynamic ADP](/dynamic-fantasy-football-adp) covers the market side of that gap in full.',
    ], quote: 'ADP is a price. Draft-State Valuation is a value. The gap between them is the opportunity.' },

    { type: 'prose', h2: 'Who Needs This If They Already Understand Draft Theory?', body: [
      'Experienced managers usually already know all of it — scarcity, tiers, replacement level, roster construction, the value of the turn.',
      'Their constraint is not conceptual. It is computational, and it is enforced by a ninety-second clock.',
      'Recomputing five interacting state components across roughly two hundred remaining players, after every single selection, in a room full of people waiting on you, is not a thing a human does reliably at pick 84 on a Tuesday night.',
      'Draft-State Valuation does not supply the philosophy. It supplies the arithmetic, continuously, so the philosophy can actually be applied.',
    ]},

    { type: 'convert', h2: 'Draft Against the Board You Actually Have.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**Download GREEN18 and draft against the state of your draft, not against a ranking written in August.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is Draft-State Valuation?', a: 'Draft-State Valuation (DSV) is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It combines five components — league state, market state, team state, user state and draft-position state — into a single situational value for each remaining player, and recalculates that value after every selection.' },
    { q: 'What are the five components of a draft state?', a: 'The five components are league state (scoring, league size, roster and flex requirements), market state (which players have been selected, which remain, and how each position pool has thinned), team state (the roster already assembled and the positions still needed), user state (the manager\'s targets, preferences and risk tolerance), and draft-position state (the current pick and the distance to the next one).' },
    { q: 'Why can two managers correctly value the same player differently?', a: 'Because valuation depends on state that differs between them. Two managers can face an identical remaining player pool while holding different rosters, different scoring settings and different distances to their next pick, and each of those differences changes what the same player is worth as a use of the next selection.' },
    { q: 'Is Draft-State Valuation the same thing as dynamic ADP?', a: 'No. Average draft position estimates what the market tends to pay for a player, so a dynamic ADP is a moving price. GREEN18 computes its own projected draft position from open football data rather than licensing a feed, and moves it with the picks recorded in the room. Draft-State Valuation estimates what a specific manager should pay given their league, roster and pick position, so it is a value. Market movement is one input into a draft-state valuation rather than the whole of it.' },
    { q: 'If the board keeps changing, is the model unpredictable?', a: 'No. The model is deterministic: the same draft state always produces the same valuation. The board changes because the draft state changes with every selection, not because the calculation is uncertain, which means any movement on the board can be traced back to a specific change in the draft.' },
  ],

  links: [
    'draft-science/positional-scarcity',
    'scenarios/superflex-quarterback-run',
    'tools/scarcity-calculator',
    'how-green18-ranks-fantasy-players',
    'dynamic-fantasy-football-adp',
  ],
};
