// PAGE 35 — /draft-science/replacement-value. Source: Product Science §17.
// The core move: the comparison that matters is player vs. his likely replacement,
// not player vs. the next name on the list.
export default {
  slug: 'draft-science/replacement-value',
  pageType: 'science',
  title: 'Replacement Value in a Fantasy Draft | GREEN18',
  description: 'Replacement value is the quality of the player you can probably still get later. Why that gap decides picks better than the gap between two adjacent names on a list.',
  breadcrumb: 'Replacement Value',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Is Replacement Value in a Fantasy Draft?',
    lede: [
      'A ranking asks you to compare the player at number 18 with the player at number 19.',
      'That is almost never the comparison you are making. You are choosing between a player you can have now and a player you can probably still have in twenty picks.',
      '**Replacement value is the second half of that comparison — and it is the half rankings leave out.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'See the comparison that matters', href: '#how-it-works' },
  },

  answer: 'Replacement value is the expected quality of the player a manager could realistically still acquire at the same position later in the draft, and it is the correct baseline for judging any pick. A player is worth what he produces above his replacement, not what he produces in absolute terms, because the alternative to drafting him is not an empty roster slot — it is whoever fills that slot instead. This makes the decisive quantity the gap between a player and the player likely to survive until the manager\'s next turn, rather than the gap between two adjacent names on a ranked list, since two players separated by one rank can have nearly identical replacements while two players fifty ranks apart can have replacements that differ enormously. Replacement value therefore rises and falls during the draft even though projected production does not, and a player\'s situational value can increase without any change in his projected fantasy production, because the cost of replacing him has increased.',

  claims: [
    'Replacement value is the expected quality of the player a manager could realistically still acquire at the same position later in the same draft.',
    'A player\'s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has increased.',
    'The gap between a player and his likely replacement is a better basis for a draft decision than the gap between two adjacent names on a ranked list.',
    'Absolute projected points cannot rank two players at different positions, because the alternative to each player is a different replacement rather than an empty roster slot.',
    'Replacement level falls continuously during a draft, so the same player is worth progressively more above replacement as the pool behind him is consumed.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Is “Points Above Replacement” the Right Baseline?', body: [
      'Because you are never choosing between a player and nothing.',
      'If you draft a running back, you did not add his season to your team out of thin air. You added the difference between him and whichever running back would otherwise have occupied that lineup slot. Everything below that line is production you were going to get anyway.',
      'This is what makes absolute projections useless for cross-position comparison. A quarterback projected for a large total and a tight end projected for a much smaller one are not comparable numbers, because the quarterback you would have had instead is also large and the tight end you would have had instead may be very small.',
      '**Only the differences are comparable. The totals are noise plus a positional constant.**',
    ], quote: 'You never draft a player instead of nothing. You draft him instead of his replacement.' },

    { type: 'prose', h2: 'Why Not Just Compare the Next Two Names on the List?', body: [
      'Because adjacent names are almost never the real alternatives, and the list has no idea when you pick again.',
      'A ranked list is a sequence of one-rank comparisons. Your actual decision spans a turn: take this player at pick 30, or take someone else and try to get a comparable player at pick 51. The relevant comparison is player-at-30 versus best-survivor-at-51 — a twenty-one-pick gap the list never modelled.',
      'Two consequences follow, and both invert ordinary ranking intuition. First, a player ranked slightly above another can be far less urgent, if the pool behind him is flat and the pool behind the other one is a cliff. Second, a lower-ranked player can be the correct pick at a higher price, because his replacement is dramatically worse than the higher-ranked player\'s replacement.',
      'The gap that decides the pick is vertical — down through the position pool to your next turn — not horizontal across one line of a list.',
    ], quote: 'The list compares rank 18 with rank 19. Your draft compares rank 18 with whoever is left in twenty picks.' },

    { type: 'diagram', name: 'replacement',
      h2: 'The Answer Is Neither Bar',
      sub: 'A player, the best alternative at his position, and the only part of either that a pick actually buys you.',
      caption: 'The left bar is the player you are considering; the right bar is the best alternative still available at the same position. Both dim, because neither height is the decision. What the pick actually adds to your starting lineup is the band between their tops — everything below that line you were going to get anyway from the alternative. A taller bar with a small band is a worse pick than a shorter bar with a large one.' },

    { type: 'table', h2: 'What Does That Look Like With Real Numbers?',
      sub: 'Two players, adjacent on a list, at positions with different shapes behind them. All figures are illustrative and used only to show the arithmetic.',
      columns: ['', 'Player A', 'Player B'],
      rows: [
        ['Position', 'A position that is deep behind him', 'A position with a cliff behind him'],
        ['Rank on a generic list', '18', '19'],
        ['Best realistic replacement at your next turn', 'Nearly as good', 'Substantially worse'],
        ['Value above that replacement', 'Small', 'Large'],
        ['Correct action if you can only take one', 'Defer — a close equivalent should survive', 'Take him — nothing close survives'],
      ],
      note: 'Player A outranks Player B on the list and is the worse pick. The list is not wrong about talent; it is silent about replacement, which is the term that decides this.' },

    { type: 'prose', h2: 'Why Does Replacement Level Keep Falling?', body: [
      'Because a draft consumes a position pool from the top, and it never refills.',
      'At pick 1 the replacement for a running back is another very good running back. At pick 60 the replacement is whoever survived sixty picks. At pick 120 it is a backup with a plausible path to touches. The same player, with the same unchanged projection, is worth more above replacement at every one of those moments than he was at the last.',
      'Which is why the sentence at the centre of this whole method is true: a player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has increased.',
      'It also explains the underrated inverse. If nobody drafts a position for two rounds, the replacement level at that position barely moves while every other position\'s falls — and the players there quietly become *less* urgent even as they climb static rankings. [The last player in a tier](/scenarios/last-player-in-a-tier) is the sharpest case of the first effect.',
    ]},

    { type: 'steps', h2: 'How Do You Estimate a Replacement You Haven’t Drafted Yet?', steps: [
      { h3: 'Fix the horizon: your next pick, not the end of the draft.', body: ['Replacement value is always measured at a specific future moment. The right one is your next selection, because that is when you actually get to act again.'] },
      { h3: 'Count the selections between now and then.', body: ['In a snake draft from the turn, that is a handful. From the middle, it can be two full rounds. This count is the entire reason two managers value the same player differently.'] },
      { h3: 'Estimate how many of those picks land on this position.', body: ['Driven by how many teams still need it and how the format weights it. Positional runs, once started, raise this estimate sharply for everyone downstream.'] },
      { h3: 'Read that far down the remaining pool.', body: ['The player sitting at roughly that depth is your realistic replacement. Not the next name — the name that survives the intervening picks.'] },
      { h3: 'Subtract, in this league\'s scoring.', body: ['Player minus expected survivor, converted through the actual scoring rules, is the value of taking him now. Compare that number across positions, and the pick is decided.'] },
    ]},

    { type: 'prose', h2: 'Does This Mean I Should Never Take the Best Player Available?', body: [
      'It means “best player available” is an incomplete instruction, not a wrong one.',
      'Best available answers *who is the best football player left*. Replacement value answers *which selection buys the most production you could not have obtained anyway*. When the board is flat, the two agree, and best available is a perfectly good shortcut.',
      'They diverge exactly when it matters: at a tier cliff, during a run, and when your next pick is far away. In those moments the best player available and the largest gap above replacement are different players, and the gap wins.',
      'Replacement value is also the mechanism underneath [positional scarcity](/draft-science/positional-scarcity) — scarcity is what you call it when replacement value is falling faster at one position than at the others.',
    ], quote: 'Best available asks who is best. Replacement value asks what you could not have gotten anyway.' },

    { type: 'prose', h2: 'How Do Roster Slots Change Replacement Value?', body: [
      'They change who the replacement actually is, which changes everything downstream.',
      'If you already start two receivers and the league starts two plus a flex, a third receiver competes for one flex slot against a running back and a tight end. His replacement is not the next receiver — it is the best player of any position who could fill that flex. That is usually a much stronger replacement, so his value above it is much smaller.',
      'Bench slots invert the logic entirely. A bench player\'s replacement is a waiver-wire addition in week two, which is why depth picks are worth far less than their ranking implies and why hoarding a position you already start is expensive.',
      '**Replacement value is a lineup question before it is a player question.** [Already having two wide receivers](/scenarios/already-have-two-wide-receivers) is the ordinary version of this trap.',
    ]},

    { type: 'convert', h2: 'Draft the Gap, Not the Rank.',
      body: [
        'Estimating who survives twenty picks, at five positions, in your scoring, after every selection, is arithmetic — and it is more arithmetic than the clock allows.',
        'GREEN18 continuously recalculates each remaining player against the replacement you would realistically still get, and orders the board by the difference.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is replacement value in fantasy football?', a: 'Replacement value is the expected quality of the player a manager could realistically still acquire at the same position later in the draft. A player is worth what he produces above that replacement rather than what he produces in total, because the alternative to drafting him is not an empty roster slot but whoever ends up filling it.' },
    { q: 'Why is replacement value more useful than a player\'s ranking?', a: 'Because a ranking compares a player with the next name on the list, while a draft decision compares a player with whoever is likely to still be available at the manager\'s next turn. Two players one rank apart can have nearly identical replacements, in which case the ranking difference between them is nearly meaningless for the pick actually being made.' },
    { q: 'Why does a player\'s value rise during a draft when his projection has not changed?', a: 'Because replacement level falls as a position pool is consumed from the top. The same player produces the same points, but the player who would have filled that lineup slot instead gets progressively worse, so the production gained by drafting him grows even though nothing about him has changed.' },
    { q: 'How do you estimate the replacement before the picks have happened?', a: 'By counting the selections between now and the manager\'s next turn, estimating how many of them are likely to land on the position in question, and reading that far down the remaining pool. The player sitting at approximately that depth is the realistic replacement, and the difference between him and the player under consideration is the value of acting now.' },
    { q: 'Does replacement value change with roster construction?', a: 'Yes, because roster slots determine who the replacement actually is. A third receiver on a team that already starts two competes for a flex slot against running backs and tight ends, so his replacement is the best available flex-eligible player rather than the next receiver, which usually makes his value above replacement much smaller.' },
  ],

  links: [
    'scenarios/last-player-in-a-tier',
    'tools/league-value-calculator',
    'draft-science/positional-scarcity',
    'how-green18-ranks-fantasy-players',
    'fantasy-football-draft-algorithm',
  ],
};
