// PAGE 31 — anchor citation surface. The canonical answer to the single most
// cited question in the cluster: why value moves during a draft.
export default {
  slug: 'why-fantasy-rankings-change-during-a-draft',
  pageType: 'science',
  title: 'Why Fantasy Rankings Change During a Draft | GREEN18',
  description: 'Drafting removes alternatives. Every pick changes scarcity, replacement quality, roster need and opportunity cost — so the correct ranking changes with it.',
  breadcrumb: 'Why Rankings Change',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'Why Should Fantasy Football Rankings Change During a Draft?',
    lede: [
      'Every manager has felt it: the list said take the best player available, and the list was clearly wrong.',
      'It was not wrong about the player. It was wrong about the moment.',
      'This page explains the mechanism — and why the ranking you started with cannot be the ranking you finish with.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Because drafting removes alternatives. Every selection changes the set of future choices — which changes scarcity, replacement quality, positional flexibility, roster need, opportunity cost, and future availability. The optimal ranking after Pick 40 should not necessarily be the ranking you had before Pick 1.',

  claims: [
    'Drafting removes alternatives, so every selection changes the set of choices available to every manager who picks after it.',
    'The optimal ranking after Pick 40 should not necessarily be the ranking a manager held before Pick 1.',
    'Positional scarcity increases when the expected quality of a player’s replacement declines faster than the quality of alternatives at other positions.',
    'A player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has increased.',
    'Distance until a manager’s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available.',
    'A run of selections at one position transfers value to the players remaining at that position and away from equivalent players at deeper positions.',
    'Two managers holding identical player projections should rank the remaining board differently once their rosters and draft positions differ.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Do Rankings Change Mid-Draft?', body: [
      '**Because drafting removes alternatives.**',
      'Every selection changes the set of future choices — which changes scarcity, replacement quality, positional flexibility, roster need, opportunity cost, and future availability.',
      '**The optimal ranking after Pick 40 should not necessarily be the ranking you had before Pick 1.**',
      'A preseason ranking is a statement about players. A draft is a competition for a shrinking supply of them. The moment supply starts shrinking unevenly, a fixed list stops describing your actual choice.',
    ], quote: 'The player did not change. The set of things you could have instead did.' },

    { type: 'prose', h2: 'Does a Player’s Value Change if His Projection Doesn’t?', body: [
      'Yes. Value is relative to the alternatives, and the alternatives are being consumed in front of you.',
      'A player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has increased.',
      'Think of it as the gap, not the number. What you gain by drafting a player is not his projected points — it is the difference between his projected points and those of the best player you could realistically get instead. Every time a comparable player is taken, that fallback gets worse, and the gap widens.',
      'The projection is a constant. The gap is a variable. Decisions are made on the gap.',
    ]},

    { type: 'prose', h2: 'What If Six Quarterbacks Disappear Before My Next Pick?', body: [
      'Then quarterback just became the most expensive thing on your board, and no quarterback got better.',
      'Six selections at one position remove six of the best remaining answers to that position. The seventh-best quarterback is now your realistic starter instead of your fallback, and the drop from the players you can still get to the players behind them is steeper than it was an hour ago.',
      'Positional scarcity increases when the expected quality of a player’s replacement declines faster than the quality of alternatives at other positions. That is exactly what a run does.',
      'The correct response is rarely to panic into the run and rarely to ignore it. It is to re-price the position — which is what [positional scarcity](/fantasy-football-positional-scarcity) and a live board are for. In [Superflex](/superflex-draft-assistant), where two quarterbacks can start, this effect is amplified rather than incidental.',
    ]},

    { type: 'prose', h2: 'Why Does My Next Pick Change What I Should Do Now?', body: [
      'Because waiting is a bet, and the size of the bet is the number of picks between your turns.',
      'Distance until a manager’s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available.',
      'From the middle of the round, four or five selections separate your turns and most positions survive the gap. From the turn, you may wait more than twenty picks — long enough for an entire tier to vanish. The same player is a comfortable wait in one seat and a must-take in the other.',
      'This is why "best player available" is incomplete advice: it answers who is best, and never answers what you can still get later.',
    ],
      list: [
        '**Short horizon.** Waiting is cheap; take the higher-upside option and revisit.',
        '**Long horizon.** Waiting is expensive; secure the position whose tier is thinnest.',
        '**A tier with one player left.** The horizon barely matters — the alternative behind him is a different class of player.',
      ] },

    { type: 'prose', h2: 'Should Two Managers With the Same Rankings Draft Differently?', body: [
      'Yes, and this is the clearest proof that a single universal ranking cannot be correct for everyone.',
      'Two managers holding identical player projections should rank the remaining board differently once their rosters and draft positions differ.',
      'One already has two wide receivers and a thin backfield. The other has none of either. They are looking at the same available players, and the value of those players to each of them is not the same. A shared list cannot express that, because it was written before either roster existed.',
      'Roster need is not a tiebreaker applied at the end. It is part of the valuation.',
    ]},

    { type: 'cards', h2: 'Six Things a Pick Changes.',
      sub: 'When any manager makes a selection, all of these move for everyone still drafting.',
      cards: [
        { h3: 'Scarcity', body: 'One more unit of quality has left a position, and the remaining supply at that position is thinner than it was a moment ago.' },
        { h3: 'Replacement Quality', body: 'The best realistic substitute for every similar player has moved one step down, which raises the cost of waiting.' },
        { h3: 'Positional Flexibility', body: 'The set of ways you can still fill your flex and starting slots has narrowed, constraining later rounds.' },
        { h3: 'Roster Need', body: 'For the manager who picked, one requirement is now satisfied and the priority of every remaining slot has shifted.' },
        { h3: 'Opportunity Cost', body: 'What you give up by taking any given player has changed, because what you would have taken instead has changed.' },
        { h3: 'Future Availability', body: 'The chance that any specific player survives to your next turn has fallen, and it falls faster during a run.' },
      ] },

    { type: 'prose', h2: 'Isn’t This Just Reacting to the Draft?', body: [
      'No — reacting is what happens when you have no method.',
      'Reacting means seeing four running backs go and grabbing the fifth because everyone else is. Revaluing means recomputing what the fifth is actually worth against your roster, your scoring, your next pick, and the depth still behind him — and then frequently concluding that he is not worth it.',
      'A moving board is not indecision. It is the same criterion applied to changed facts.',
      'The distinction matters because the two look identical from the outside and produce opposite drafts. See [ADP as a starting line, not an answer](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'prose', h2: 'When Should the Ranking You Prepared Stop Being Used?', body: [
      'The instant the first pick is recorded.',
      'That is not a criticism of preparation. A preseason ranking is the correct input — it is the only thing you have before information exists. It stops being the correct output the moment information starts arriving, which is Pick 1.',
      'Prepared rankings answer: who is good this year? A draft asks: what should I do right now, given everything that has already happened? Those are different questions, and only one of them has to be re-answered eleven times an hour.',
    ]},

    { type: 'convert', h2: 'Let the Board Do the Re-Ranking.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        'You record the picks. The board re-prices everyone still available before your turn comes back around.',
        '**Read the method behind it on [how GREEN18 values a player](/how-green18-ranks-fantasy-players).**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Why should fantasy football rankings change during a draft?', a: 'Because drafting removes alternatives. Every selection changes the set of future choices, which changes scarcity, replacement quality, positional flexibility, roster need, opportunity cost, and future availability. The optimal ranking after Pick 40 should not necessarily be the ranking a manager held before Pick 1.' },
    { q: 'Does a fantasy player\'s value change if his projection does not?', a: 'Yes. A player\'s value in a draft is the gap between his production and that of the best player a manager could realistically take instead. When comparable players are drafted, that fallback gets worse and the gap widens, so his situational draft value rises even though his projection is unchanged.' },
    { q: 'What happens to my board when six quarterbacks go before my next pick?', a: 'Quarterback scarcity rises sharply, because the six best remaining answers at the position have been removed and the drop from the players still available to the players behind them is now steeper. No quarterback improved; the cost of not having one increased.' },
    { q: 'Why does the distance to my next pick matter?', a: 'Distance until a manager\'s next selection affects current player value, because waiting carries a probability that viable alternatives will no longer be available. A manager picking again in four selections can afford to wait on a position that a manager picking again in twenty cannot.' },
    { q: 'Should two managers with identical rankings make the same picks?', a: 'No. Once their rosters and draft positions differ, the same available players are worth different amounts to each of them. A single universal ranking cannot express roster need, pick horizon, or league-specific scoring, all of which are part of the actual decision.' },
    { q: 'Is changing your rankings mid-draft the same as panicking?', a: 'No. Panicking means abandoning your criteria because of what other managers are doing. Revaluing means applying the same criteria to changed facts, and it frequently produces the opposite conclusion from the panic — such as declining to join a run because the remaining depth does not justify the price.' },
  ],

  links: [
    'how-green18-ranks-fantasy-players',
    'glossary',
    'fantasy-football-positional-scarcity',
    'dynamic-fantasy-football-adp',
    'live-fantasy-football-draft-assistant',
  ],
};
