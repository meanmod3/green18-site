// PAGE 16 — AI-intent pillar. Meets the search intent, then lands the
// determinism thesis: GREEN18 computes, it does not generate.
export default {
  slug: 'ai-fantasy-football-draft-assistant',
  title: 'AI Fantasy Football Draft Assistant, Computed | GREEN18',
  description: 'Looking for an AI draft assistant? GREEN18 is a deterministic draft model for iPhone — the same board always produces the same answer.',
  breadcrumb: 'AI Draft Assistant',

  hero: {
    eyebrow: 'Computed, Not Generated',
    h1: 'You Don’t Want a Draft Assistant That Improvises. You Want One That Computes.',
    lede: [
      'Most people searching for an AI draft assistant want the same thing: something that keeps up with the draft instead of handing them a list.',
      'GREEN18 does that. It is not a chatbot and it does not generate text. It is a model that recalculates the remaining board from your league settings and the picks that have actually happened.',
      '**Same board in, same answer out. Every time.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  claims: [
    'GREEN18 does not write its explanations. The reason shown beside a recommendation is extracted from the components of the calculation that actually moved, so there is no prose template and no generated sentence anywhere in the path.',
    'GREEN18 is built so it cannot contradict itself: a player who is very likely to still be available cannot be shown as an urgent take on board movement alone, because availability is decided on its own thresholds before movement is allowed to break a tie.',
    'When the evidence is genuinely middling, GREEN18 stays neutral for a non-elite player rather than manufacturing a confident call — a text generator has no equivalent way to decline.',
    'Determinism in GREEN18 is an enforced property rather than an aspiration: a real source of run-to-run variation was found and removed, and the resulting ordering is pinned by an automated regression test so it cannot silently return.',
  ],

  blocks: [
    { type: 'prose', h2: 'What People Actually Mean by “AI Draft Assistant”.', body: [
      'They rarely mean they want to have a conversation.',
      'They mean the pre-draft list stopped being true four picks ago.',
      'They mean three quarterbacks went in a row and nothing on their sheet moved — even though [the cost of waiting](/scenarios/superflex-quarterback-run) had just doubled.',
      'They mean they have ninety seconds and six tabs open.',
      'That is a computation problem, not a writing problem.',
    ]},

    { type: 'prose', h2: 'GREEN18 Is a Deterministic Model.', body: [
      'Deterministic means exactly one thing: the same inputs always produce the same output.',
      'Ask GREEN18 twice with the same board and you get the same answer twice.',
      'Hand the same board to a text generator twice and you may not — it composes a fresh answer each time, and there is no reason for two of them to agree.',
      'On draft day, repeatability is not a technicality. It is the whole point: a deterministic result can be traced back to the specific pick that moved it. The full computation is set out in [the GREEN18 methodology](/methodology).',
    ], quote: 'A model that can’t repeat itself can’t be checked.' },

    { type: 'cards', h2: 'Computed vs. Generated.', cards: [
      { h3: 'Repeatable', body: 'Every recommendation is replayable from the board that produced it. Nothing is improvised on the spot.' },
      { h3: 'Accountable', body: 'The result is assembled from named components — your league’s scoring and roster requirements, board movement, position velocity, survival to your next pick — not from prose about a player. Each is inspectable in [how GREEN18 ranks fantasy players](/how-green18-ranks-fantasy-players).' },
      { h3: 'Current', body: 'It reads the draft in front of you. Not a snapshot of the internet from some earlier date.' },
    ]},

    { type: 'prose', h2: 'The Reason Is Read Off the Model, Not Written About It.', body: [
      'This is the concrete difference, and it is worth being precise about.',
      'A text generator produces a sentence and then supplies a justification for it. The justification is written after the fact, and it is prose either way.',
      'GREEN18 works the other way around. The recommendation is computed first, and the explanation beside it is **extracted from the components that actually moved** — the terms of the calculation itself. There is no phrase template, and no generated text anywhere in that path.',
      'So the explanation cannot drift away from the maths, because it is not a separate thing from the maths.',
    ], quote: 'The explanation is not a description of the calculation. It is part of it.' },

    { type: 'prose', h2: 'It Is Built So It Cannot Contradict Itself.', body: [
      'Consider the failure a draft tool must never ship: a card that shouts **take him now** while, an inch below, reporting that he is very likely to still be there at your next turn.',
      'GREEN18 forbids that case explicitly. How likely a player is to survive to your pick is decided on its own thresholds **first**. Only when that answer is genuinely middling are board movement and model rank allowed to break the tie — and never to overturn it.',
      'And when the case stays middling for a non-elite player, the board says neutral rather than fabricating a confident call.',
      'A model can be built with a rule like that. A sentence-writer cannot promise one, because nothing in it is checking the sentence against anything else.',
    ]},

    { type: 'prose', h2: 'Determinism Was Repaired, Then Pinned.', body: [
      'Determinism is easy to claim and easy to lose. GREEN18 lost it once.',
      'A real source of run-to-run variation was found in how one internal collection was walked, fixed, and the resulting order specified exactly — ascending live draft position, with a stable tie-break so equal players never swap.',
      'That order is now held by an automated regression test, so the defect cannot return quietly. **Same board in, same answer out** is a property the build checks, not a promise the copy makes.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Scoring and quarterback format genuinely re-rank the board. They are inputs, not labels.'] },
      { h3: 'Shape Your Preferences.', body: ['Your own opinions live in your personal rank. They never move the objective market values.'] },
      { h3: 'Record the Picks.', body: ['As players come off the board, GREEN18 recomputes. The update is effectively instant.'] },
      { h3: 'Take Now or Wait.', body: ['You see how likely a player is to survive to your next pick — your pick horizon against the [tier collapse](/draft-science/player-tier-collapse) behind him — and you make the call.'] },
    ]},

    { type: 'prose', h2: 'Where the Numbers Come From.', body: [
      'Player facts come from open football data — nflverse, credited under CC-BY — plus the picks you record during your own draft.',
      'A hard allowlist rejects unapproved sources at build time.',
      'GREEN18 computes its own projected draft position from that base, for your league’s scoring and roster requirements, and updates it from the picks recorded in your room.',
      'It does not scrape a chatbot and it does not guess.',
      'If you want the mechanism in full, read [how the draft model works](/fantasy-football-draft-algorithm).',
    ]},

    { type: 'prose', h2: 'What It Will Not Do.', body: [
      'GREEN18 will not tell you a player is going to get hurt.',
      'It will not promise you a title.',
      'It will not draft for you — see [automated draft tools](/automated-fantasy-football-draft-tool) for where that line sits.',
      'It tells you what the board is worth right now, given your league and the picks already made.',
      'That is a smaller claim. It is also a true one.',
    ]},

    { type: 'convert', h2: 'Bring a Model, Not a Guess.',
      body: ['Stop asking for a fresh opinion every time the board changes.', '**Download GREEN18 and take a computed board into your next draft.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'Does GREEN18 use artificial intelligence?', a: 'No. GREEN18 is a deterministic draft model, not an AI or machine-learning product. It computes recommendations from named components — your league settings, current player value, and how likely a player is to survive to your next pick — so the same draft board always produces the same output. Nothing is generated as text.' },
    { q: 'What does deterministic mean for a fantasy draft assistant?', a: 'Deterministic means identical inputs always produce identical results. In GREEN18, if you replay the same league settings and the same sequence of recorded picks, you get exactly the same recommendation every time. A text-generating assistant can return a different answer to the same question on different attempts.' },
    { q: 'Why does repeatability matter during a live draft?', a: 'Because a recommendation you cannot reproduce is a recommendation you cannot check. With a deterministic model, the reason a player moved up or down is traceable to a change in the board or in your league settings, rather than to variation in how an answer happened to be written that time.' },
    { q: 'Where does the reason beside a recommendation come from?', a: 'It is extracted from the calculation itself — the specific components that moved. GREEN18 does not fill a phrase template and does not generate text at any point in that path, so the explanation cannot drift away from the numbers it is reporting.' },
    { q: 'Can GREEN18 tell you to take a player it also says is likely to be available?', a: 'No. That case is forbidden explicitly. How likely a player is to survive to your next pick is resolved on its own thresholds first, and board movement is only allowed to break a genuinely middling tie. Where the case stays middling for a non-elite player, GREEN18 reports neutral rather than producing a confident call.' },
    { q: 'Can GREEN18 answer questions in a chat window?', a: 'No. GREEN18 has no chat interface and does not converse. It presents a live player board that reorganizes as you record the picks in your draft, and shows the components behind each player’s current value.' },
    { q: 'Does GREEN18 predict what will happen in the NFL season?', a: 'No. GREEN18 makes no forecast about the season, and makes no injury predictions. It values the players still available to you right now, based on your league’s settings and the picks that have already happened in your draft.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'how-green18-ranks-fantasy-players',
    'chatgpt-fantasy-football-draft',
    'automated-fantasy-football-draft-tool',
    'draft-science/draft-state-valuation',
  ],
};
