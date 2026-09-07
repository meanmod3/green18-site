export default {
  slug: 'tools/pick-horizon-calculator',
  pageType: 'tool',
  title: 'Pick Horizon Calculator for Snake Drafts | GREEN18',
  description: 'Work out how many players come off the board before your next turn in a snake draft, and what that distance means for the pick you are making now.',
  breadcrumb: 'Pick Horizon Calculator',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'Pick Horizon Calculator',
    lede: [
      'The distance to your next pick is not trivia. It is the length of the risk you take every time you decide to wait.',
      'Enter your league size and pick number to see how much board disappears before you choose again.',
    ],
    cta: 'Download GREEN18',
    micro: 'GREEN18 factors this into every recommendation.',
  },

  answer: 'In a snake draft, the number of picks between your turns alternates according to your draft slot: a manager near the turn faces a long gap after an early-round pick and a short one after a late-round pick, while a manager near the middle faces a roughly even gap every round. That distance is a direct input to player value, because waiting is only cheap when few alternatives can disappear while you wait.',

  claims: [
    'The number of picks between a manager’s turns in a snake draft is determined by draft slot and round direction, not by league size alone.',
    'An identical draft board can produce two different correct selections for two managers whose only difference is the distance to their next pick.',
    'Managers drafting from the turn face the longest single gap in a snake draft and the shortest one immediately after it, which is why back-to-back picks reward taking scarce positions together.',
    'Waiting on a position is a bet that a comparable player survives every pick between now and your next turn, so the length of that gap is the size of the bet.',
  ],

  blocks: [
    { type: 'calculator', id: 'calc', calc: 'horizon',
      h2: 'How long until you pick again?',
      sub: 'Snake draft. Enter your league size and the overall pick number you are on.',
      fields: [
        { name: 'teams', label: 'Teams in your league', value: 12, min: 4, max: 20 },
        { name: 'pick', label: 'Your current overall pick number', value: 3, min: 1, max: 300 },
      ],
      hint: 'Overall pick number, counting from the first pick of round one.',
      resultLabel: 'Result',
      defaultVerdict: '19 picks until your next selection',
      defaultExplanation: 'You are picking at slot 3 of 12 in round 1. 19 players will come off the board before you choose again. That is a full round or more of exposure, which is the situation where taking a scarce position early is most often correct: anything you are hoping will survive has to survive a long time.',
      note: 'Assumes a standard snake draft with no third-round reversal and no traded picks.' },

    { type: 'prose', h2: 'Why the gap alternates',
      body: [
        'A snake draft reverses order every round, so your two picks sit either side of a turn.',
        'Pick third of twelve and you select at 3, then not again until 22 — nineteen players gone. But from 22 you pick again at 27, only four later.',
        'Pick from the middle and your gaps are close to even every round.',
        'This is why draft position is not simply "better" or "worse". It changes the **shape** of your decisions, not just their quality.',
      ] },

    { type: 'prose', h2: 'What a long horizon should change',
      body: [
        'A long gap raises the cost of waiting on anything scarce, because more alternatives can disappear before you act again.',
        'It also makes back-to-back picks valuable: at the turn you can take two players who would each be gone if you split them across a full round.',
        'A short gap does the opposite. It makes waiting cheap and rewards taking the best value in front of you, because your next turn arrives before much can change.',
        'See [drafting from the turn](/scenarios/drafting-from-the-turn) for how this plays out concretely.',
      ] },

    { type: 'convert', h2: 'Distance to your next pick, applied automatically.',
      body: [
        'You should not have to hold this arithmetic in your head while a timer runs.',
        'GREEN18 knows your slot and your league, and prices the wait into every player on the board.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'How do you calculate picks until your next turn in a snake draft?', a: 'In a snake draft the gap depends on your slot within the round. From an odd-numbered round, the gap is twice the number of teams picking after you, plus one. From an even-numbered round, it is twice your slot number, minus one. This is why a manager at the turn alternates between a very long gap and a very short one.' },
    { q: 'Why does the distance to my next pick change a player’s value?', a: 'Because waiting is a bet that a comparable player will still be available when you pick again. The longer the gap, the more picks that bet has to survive, so the same player is worth more to a manager with a long wait ahead than to one picking again shortly.' },
    { q: 'Is an early draft slot better than a late one?', a: 'Neither is strictly better. An early slot gets the best individual player but faces the longest wait for its second pick. A late slot gets two picks close together at the turn. They are different shapes of decision rather than different amounts of value.' },
  ],

  links: ['draft-science/pick-horizon', 'scenarios/drafting-from-the-turn', 'tools/scarcity-calculator', 'fantasy-football-draft-assistant', 'live-fantasy-football-draft-assistant'],
};
