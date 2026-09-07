// PAGE 22 — the deepest explanatory page on the site. Source doc §13–§18, §20,
// §23, §24. Title/description authored here (none supplied). Pivot line is §14:
// "The player did not suddenly become more talented. His situational value changed."
export default {
  slug: 'fantasy-football-positional-scarcity',
  title: 'Positional Scarcity and Replacement Value in Fantasy Drafts | GREEN18',
  description: 'How positional scarcity, replacement value and opportunity cost decide a fantasy draft pick — and why every selection changes the value of the players left.',
  breadcrumb: 'Positional Scarcity',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'Positional Scarcity, Replacement Value, and the Real Cost of a Pick.',
    lede: [
      'A fantasy player’s value does not exist in isolation. The moment another player is drafted, something changes.',
      'One fewer starting quarterback remains. A running-back tier nearly empties. Receiver depth stays unusually strong. Your next turn moves further away.',
      '**Every pick changes the value of the next one.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'Start With the Quarterback Run', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'One Player Leaves. More Than One Player Changes.', body: [
      'Suppose the last strong quarterback in a tier is selected.',
      'The obvious result: that quarterback disappears.',
      'The less obvious result: every remaining quarterback may become more important. A running back may become relatively less urgent. A wide receiver might stay valuable but become easier to defer.',
      'Your expected options at your next pick change. Your roster’s flexibility changes.',
      'This is why crossing a name off a static ranking is incomplete. The removal changes the relationships between the players who remain.',
    ], quote: 'Every name removed changes the value of the names that remain.' },

    { type: 'prose', h2: 'Example: The Quarterback Run.', body: [
      'Say your board reads quarterback A, receiver A, running back A, quarterback B, receiver B.',
      'Then three quarterbacks are selected in a row.',
      'A static sheet simply removes those three names. The order below them is unchanged.',
      'GREEN18 reevaluates the surviving quarterback pool instead. The remaining quarterback may rise because:',
    ], list: [
      'replacement quality has fallen',
      'the next viable tier is farther away',
      'competing teams may also need quarterbacks',
      'your next pick is distant',
      'your roster still requires the position',
    ], after: [
      '**The player did not suddenly become more talented. His situational value changed.**',
      'That distinction is central to GREEN18.',
    ]},

    { type: 'prose', h2: 'Example: Position Depth.', body: [
      'The opposite happens just as often.',
      'Imagine strong wide receivers keep falling. Your roster already has two. Plenty remain. Your next pick is relatively close.',
      'A highly ranked receiver may move **down** your recommendation board — because the cost of waiting is low.',
      'Again, the player’s talent did not change. The opportunity cost of drafting him now changed.',
      'This is the case a consensus ranking structurally cannot make, because it does not know your roster or when you pick again.',
    ]},

    { type: 'cards', h2: 'Three Ideas Doing the Work.', sub: 'Scarcity, replacement value and opportunity cost are the same question asked from three directions.',
      cards: [
        { h3: 'Positional Scarcity', body: 'Scarcity isn’t “running backs are valuable.” A position becomes scarce when the useful remaining options are disappearing relative to your roster needs, the league’s needs, your next opportunity to draft, and the quality of what is left behind.' },
        { h3: 'Replacement Value', body: 'A player’s value rises when the alternatives behind him are weak and falls when similar options remain abundant. The gap between a player and the one you can probably still get later often matters more than the gap between him and the next name on a generic list.' },
        { h3: 'Opportunity Cost', body: 'Taking player A means not taking player B. It can also mean losing access to a scarce position, passing on a falling value, duplicating roster strength, sacrificing flexibility, or forcing a weaker future pick.' },
      ]},

    { type: 'prose', h2: 'The Question Isn’t Just “Who Is Best?”', body: [
      'The real draft question is: what do I give up by taking this player instead of waiting?',
      'Draft value is relational. GREEN18 is built around that second-order question rather than the first-order one.',
      'Scarcity is also contextual and live. GREEN18 responds to scarcity as it develops, not only as it was predicted before the draft began.',
    ], quote: 'What do I give up by taking this player instead of waiting?' },

    { type: 'prose', h2: 'A Falling Player Is Information.', body: [
      'A player dropping below his expected draft position does not automatically make him the right pick. But it changes the calculation.',
      'GREEN18 evaluates the fall against your roster, the other available players, positional depth, your league settings, upcoming scarcity, and the rest of the board.',
      'The model is not chasing discounts. It is deciding whether a discount actually matters to you.',
      'That is the difference between a market price and your value — the subject of [dynamic ADP](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'steps', h2: 'How GREEN18 Thinks About a Pick', steps: [
      { h3: 'How good is the player?', body: ['Start with fundamental player value, computed from open football data.'] },
      { h3: 'How does this league score him?', body: ['Scoring changes the value of production, so it is applied before the board is built.'] },
      { h3: 'How badly does your roster need him?', body: ['The same player creates different value for different team constructions.'] },
      { h3: 'What happens if you wait?', body: ['Replacement options matter. The model estimates who is likely to survive until your next turn.'] },
      { h3: 'How scarce is the position?', body: ['Remaining depth matters, measured against the league’s needs as well as your own.'] },
      { h3: 'What has the league been doing?', body: ['The actual draft matters — runs, reaches and falls are all recorded picks.'] },
      { h3: 'When do you pick again?', body: ['Opportunity matters. The distance to your next turn changes what you can afford to defer.'] },
      { h3: 'What do you prefer?', body: ['Your strategy matters. Preferences are an input to the valuation, [never an override](/personalized-fantasy-football-rankings).'] },
    ]},

    { type: 'prose', h2: 'Why Does the Board Keep Moving?', body: [
      'Because fantasy value is relative.',
      'A player’s expected production matters. So do the alternatives available, the scarcity behind him, your roster, your scoring, your next pick, the managers drafting between your picks, and the players already gone.',
      'GREEN18 recalculates the remaining board as those variables change.',
      '**The player didn’t change. Your situation did.** And that changes his value to you.',
      'The calculation itself is deterministic — [the same board always produces the same answer](/fantasy-football-draft-algorithm).',
    ]},

    { type: 'prose', h2: 'Experts Have This Problem Too.', body: [
      'Experienced managers usually already understand scarcity, tiers, replacement value and roster construction.',
      'Their problem isn’t conceptual. It’s computational.',
      'There are too many interacting variables to manually recompute after every single pick, on the clock, in a room full of people waiting.',
      'The manager supplies the philosophy. The model keeps recalculating the board.',
    ]},

    { type: 'convert', h2: 'Every Selection Creates a New Draft.',
      body: ['A static sheet can tell you who was best in August. It cannot tell you what waiting costs tonight.', '**Download GREEN18 for iPhone and draft against the board as it actually is.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is positional scarcity in fantasy football?', a: 'Positional scarcity is the condition in which the useful remaining players at a position are running out relative to demand. It is contextual rather than fixed: a position is scarce when the remaining options are disappearing compared with a manager’s roster needs, the other teams’ needs, how long until that manager picks again, and the quality of the alternatives still on the board.' },
    { q: 'What is replacement value in a fantasy draft?', a: 'Replacement value is the quality of the player a manager could realistically get at the same position later in the draft. A player is worth more when the alternatives behind him are weak and worth less when similar options remain plentiful, so the gap between a player and his likely replacement often matters more than his position in a generic ranking.' },
    { q: 'What is opportunity cost in a fantasy football draft?', a: 'Opportunity cost is everything a manager gives up by making one pick instead of another or instead of waiting. Beyond the specific player not taken, it can include losing access to a scarce position, passing on a player who has fallen below his expected draft position, duplicating existing roster strength, reducing roster flexibility, or being forced into a weaker pick later.' },
    { q: 'Why does a player’s value change when other players are drafted?', a: 'Because fantasy draft value is relative rather than absolute. When several players at one position are selected, the remaining players at that position become harder to replace, which raises their situational value even though their talent and expected production are unchanged. The same logic works in reverse when a position stays deep.' },
    { q: 'Should you always draft the best player available?', a: 'Not necessarily, because the best available player is a moving target that depends on the roster, the league’s scoring, and when the manager picks again. A highly ranked player at a deep position can be the wrong pick if a similar player is likely to be available at the next turn, while a lower-ranked player at a thinning position can be the right one.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-draft-algorithm',
    'dynamic-fantasy-football-adp',
    'personalized-fantasy-football-rankings',
    'fantasy-football-draft-strategy-app',
  ],
};
