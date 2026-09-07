// PAGE 51 — scenario. The "how long can I wait" question, generalised properly:
// the answer is a survival question about a tier, not a round number. Kept
// distinct from 46 (a fall already in progress) and 44 (a run in progress).
export default {
  slug: 'scenarios/waiting-on-quarterback',
  pageType: 'scenario',
  title: 'How Long Can I Wait to Draft a Quarterback? | GREEN18',
  description: 'The answer is not a round number. How to convert “can I wait” into a survival question about the tier you intend to draft from, and read the answer live.',
  breadcrumb: 'Waiting on Quarterback',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'How Long Can I Wait to Draft a Quarterback?',
    lede: [
      'Every answer phrased as a round number is answering a different draft from yours.',
      'The real question is narrower and much easier to check: will the group of quarterbacks I would be content to start survive until my next pick?',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'How long a manager can wait at a position is determined by whether the group of players he would be content to start there will survive until his next selection, not by any round number. The calculation has three inputs: how many acceptable players remain, how many teams choosing before his next turn still need that position, and how much worse the group below the current one is. Waiting is free while the acceptable group is larger than the demand that will be exercised before the manager picks again; waiting becomes expensive the moment those two numbers cross, and it is the crossing point rather than the calendar of rounds that should trigger the pick.',

  claims: [
    'How long a manager can defer a position is determined by the survival of the tier he intends to draft from, not by a round number.',
    'Waiting is inexpensive while the number of acceptable remaining players exceeds the demand that will be exercised before the manager’s next selection.',
    'Round-number advice about when to draft a position assumes a league size, a scoring format and a draft slot that may not match the reader’s league.',
    'The cost of waiting at a position rises sharply once the group below the current tier is materially worse than the group inside it.',
  ],

  blocks: [
    { type: 'prose', h2: 'Turn the Question Into a Countable One.', body: [
      '"How long can I wait" is not answerable as asked, because it hides the thing you actually care about: which quarterback you will end up with.',
      'Restate it as: **will the group I am willing to start still contain someone when I pick again?** That question has three countable inputs.',
      '**Supply.** How many quarterbacks remain that you would genuinely start every week. Not how many are undrafted — how many are acceptable.',
      '**Demand before your next turn.** How many teams pick before you again, and how many of them still have a quarterback slot to fill in this format.',
      '**The cliff.** How much worse the group below your acceptable group is. A shallow step down makes waiting cheap even when it fails; a large one makes failure costly.',
    ], quote: 'Do not ask how long you can wait. Ask what survives.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that a round number from a strategy article transfers to your draft. Any such number is the output of a specific league size, scoring format, starting lineup and slot. Change any of those and the answer moves, sometimes by several rounds.',
      'The second wrong inference is that surviving supply is the same as remaining names. A position can look deep on the board while the group you would actually start is nearly exhausted, and that difference is where most waiting goes wrong.',
      'A third is treating the demand estimate as fixed. Managers who have not drafted a quarterback are not all planning to draft one soon; some are running the same deferral you are. Demand before your next turn is a range, and prudence means using the unfavourable end of it when the cliff below you is large.',
      'A fourth is assuming that being wrong is symmetric. Taking the position one pick early costs you the small difference between two similar players elsewhere. Taking it one pick late can cost you the entire step down to the next group.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Define your acceptable group explicitly.', body: ['Draw a line on the board: these players I would start, those I would not. The line is the object the whole calculation is about.'] },
      { h3: 'Count what is inside it.', body: ['Supply is the number of players above your line, not the number of players at the position.'] },
      { h3: 'Count competing demand before your next pick.', body: ['Teams choosing before you again that still need the position. Use the unfavourable end of the estimate when the step below your line is steep.'] },
      { h3: 'Measure the step down.', body: ['Compare the worst player above your line with the best player below it. A small step means waiting is nearly free; a large one means it is a gamble.'] },
      { h3: 'Compare waiting with the alternative.', body: ['Waiting is only worthwhile if the pick spent elsewhere buys a larger margin than the step down risks losing.'] },
      { h3: 'Re-run the count after every pick.', body: ['Supply falls, demand is exercised, and the step below your line moves. The answer that was right two picks ago is not automatically right now.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Format.** A format allowing a quarterback in a flexible starting slot roughly doubles league-wide demand and shortens every waiting window at the position.',
      '**League size.** More teams means both more demand and more picks between your turns, and both effects push in the direction of waiting less.',
      '**Scoring.** Scoring rules change where your acceptable line sits, because they change how much separation exists between players at the position.',
      '**Your draft slot.** From the turn you can often wait one more round and still take two players; from the middle of a round the same wait exposes you to a full lap of picks.',
      '**Roster requirements.** A format that starts more of a position forces every team to act sooner, which compresses the window for everyone including you.',
    ], after: [
      'The general quantity is the [pick horizon](/draft-science/pick-horizon); the format-specific version of this question is [quarterback value in superflex](/draft-science/superflex-quarterback-value).',
    ]},

    { type: 'convert', h2: 'The Answer Is a Count, Not a Round.',
      body: ['GREEN18 tracks the remaining pool against your league’s demand and the distance to your next pick, so “can I still wait” is answered with the board in front of you rather than with a rule of thumb.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'How long can you wait to draft a quarterback?', a: 'Until the number of quarterbacks a manager would be content to start falls to the level of demand that will be exercised before his next selection. Because that crossing point depends on league size, format, starting requirements and draft slot, it cannot be expressed as a round number that applies to every league.' },
    { q: 'Why is round-number advice about draft timing unreliable?', a: 'Because any such number is the output of one specific combination of league size, scoring, starting lineup and draft slot. Changing any of those inputs moves the correct timing, sometimes by several rounds, so the number transfers only to leagues that match the one it was derived from.' },
    { q: 'What is the risk of waiting one pick too long at a position?', a: 'The cost is the full step down from the group a manager intended to draft from to the group below it. That is asymmetric with the cost of acting one pick early, which is only the small difference between two comparable players at the position being passed over.' },
    { q: 'How do you tell whether a position is still safe to defer?', a: 'Count the players remaining that would genuinely start, count the teams picking before your next turn that still need the position, and compare the two. Deferral remains safe while supply exceeds that demand and stops being safe as soon as the two numbers converge.' },
  ],

  links: [
    'draft-science/pick-horizon',
    'draft-science/superflex-quarterback-value',
    'scenarios/superflex-quarterback-run',
    'superflex-draft-assistant',
    'why-fantasy-rankings-change-during-a-draft',
  ],
};
