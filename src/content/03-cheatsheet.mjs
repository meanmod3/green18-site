// PAGE 03 — CHEAT SHEET.
export default {
  slug: 'fantasy-football-cheat-sheet-app',
  title: 'Fantasy Football Cheat Sheet App for 2026 | GREEN18',
  description: 'Replace the static fantasy football cheat sheet with a live iPhone draft board that changes as your draft unfolds.',
  breadcrumb: 'Cheat Sheet App',

  hero: {
    eyebrow: 'The Cheat Sheet, Rebuilt',
    h1: 'The Fantasy Football Cheat Sheet That Doesn’t Stay Still.',
    lede: [
      'A cheat sheet is useful until reality starts changing it.',
      'GREEN18 turns the traditional fantasy football cheat sheet into a live draft board.',
      'Players disappear.',
      'Values change.',
      'Positions tighten.',
      'Your roster develops.',
      '**The board responds.**',
    ],
    cta: 'Get the GREEN18 Cheat-Sheet Edge',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'A Cheat Sheet That Understands What Just Happened.', body: [
      'Traditional cheat sheets are snapshots.',
      'Someone does the research before the draft.',
      'Players are ranked.',
      'The list gets printed, downloaded, screenshotted, or opened in another tab.',
      'Then the draft starts.',
      'And the sheet immediately begins falling behind reality.',
      'GREEN18 starts with the same basic purpose:',
    ], quote: 'Help me know who to draft.',
      after: [
        'But instead of freezing the answer before Pick 1, GREEN18 keeps recalculating it through the entire draft.',
        '**A cheat sheet that recalculates after every pick.**',
      ] },

    { type: 'cards', h2: 'The Old Cheat Sheet vs. the GREEN18 Cheat Sheet',
      sub: 'Same purpose. Four steps against eight — and the last one is the difference.',
      cards: [
        { h3: 'The Old Cheat Sheet', body: '1. Rank players. 2. Start the draft. 3. Cross names off. 4. Keep following approximately the same order.' },
        { h3: 'The GREEN18 Cheat Sheet', body: '1. Understand the league. 2. Understand your preferences. 3. Establish the available player market. 4. Start the draft. 5. Observe every selection. 6. Recalculate the remaining opportunity. 7. Re-rank the board. 8. Repeat after every pick.' },
        { h3: 'Why the Extra Steps Matter', body: 'Crossing a player off the board isn’t enough. The players below him just changed too. The sheet becomes part of the draft instead of merely being brought into it.' },
      ] },

    { type: 'prose', h2: 'Your Screenshot Can’t React.', body: [
      'A printed ranking can’t see that [six running backs just disappeared](/scenarios/five-running-backs-go-in-a-row), or that the replacement level behind them dropped a full tier when they did.',
      'A screenshot can’t see your roster.',
      'A spreadsheet doesn’t know which players your league has already drafted unless you rebuild it yourself.',
      'GREEN18 is built to solve that problem — the same idea behind the [live draft assistant](/live-fantasy-football-draft-assistant).',
    ]},

    { type: 'prose', h2: 'Start With Rankings. Finish With Context.', body: [
      'A good draft still needs player value.',
      'GREEN18 simply refuses to stop there.',
      'The available board changes around the actual state of the draft so you’re evaluating players in context instead of blindly following a numbered list.',
    ]},

    { type: 'prose', h2: 'Built for the Person Who Usually Shows Up With Notes.', body: [
      'If your draft preparation normally includes:',
    ],
      list: [
        'screenshots',
        'rankings',
        'notes',
        'sleeper lists',
        'handwritten targets',
        'multiple browser tabs',
        'printed cheat sheets',
      ],
      after: [
        'GREEN18 gives you one live place to organize the decision.',
        'New to all of this? Start with [fantasy football for beginners](/fantasy-football-for-beginners).',
      ] },

    { type: 'prose', h2: 'Every Name Removed Changes the Value of the Names That Remain.', body: [
      'That is the whole argument for a sheet that moves.',
      'A run at one position thins the depth behind it, lowers the [replacement value](/draft-science/replacement-value) you would settle for later, and makes waiting more expensive.',
      'A player who falls further than expected becomes a different decision than he was two picks ago.',
      'Your own roster keeps changing what you still need.',
      'Your cheat sheet shouldn’t stop thinking when the draft starts.',
      'The board is re-ranked using your league settings and the picks you record — the full method is on [how the draft model works](/fantasy-football-draft-algorithm).',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Enter the scoring and roster settings your league actually uses.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you instead of one universal list.'] },
      { h3: 'Start Drafting.', body: ['Remove players as they’re selected. The remaining board reorganizes.'] },
      { h3: 'Make the Pick.', body: ['One live sheet, instead of seven static ones.'] },
    ]},

    { type: 'convert', h2: 'Upgrade the Cheat Sheet.',
      body: ['Stop drafting from a page that can’t change.', '**Download GREEN18 for iPhone.**'],
      label: 'Get the GREEN18 Cheat-Sheet Edge', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  faq: [
    { q: 'What is the difference between a fantasy football cheat sheet and GREEN18?', a: 'A traditional cheat sheet is a snapshot: players are ranked before the draft, and the list stays in that order while names are crossed off. GREEN18 keeps recalculating instead. It applies the league settings, records each selection, recalculates the remaining opportunity, and re-ranks the available board after every pick.' },
    { q: 'Why does removing one player change the rest of the cheat sheet?', a: 'Because value on a draft board is relative. Removing a player reduces the depth remaining at his position, changes which alternatives are left, and changes the odds that a comparable player is still available at the next pick. The names that remain are worth something different than they were a pick earlier.' },
    { q: 'Is GREEN18 a fantasy football cheat sheet?', a: 'GREEN18 can serve the same purpose, but it is designed to be more responsive than a traditional static cheat sheet.' },
    { q: 'Do the rankings change?', a: 'The product is built around a changing player board that responds to the draft as available players and team context change.' },
    { q: 'Can beginners use it?', a: 'Yes. GREEN18 can simplify the draft by concentrating the available player pool into one decision-focused view.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'fantasy-football-for-beginners',
    'live-fantasy-football-draft-assistant',
    'dynamic-fantasy-football-adp',
    'draft-science/replacement-value',
  ],
};
