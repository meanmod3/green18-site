export default {
  slug: 'tools/superflex-qb-demand-calculator',
  pageType: 'tool',
  title: 'Superflex Quarterback Demand Calculator | GREEN18',
  description: 'See how many starting quarterback slots your Superflex league still has to fill, and why that number re-prices the position rather than just raising it.',
  breadcrumb: 'Superflex QB Demand',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'Superflex Quarterback Demand Calculator',
    lede: [
      'Superflex does not make quarterbacks fashionable. It changes the arithmetic of how many must be drafted.',
      'Enter your league and see how much starting demand is still outstanding.',
    ],
    cta: 'Download GREEN18',
    micro: 'GREEN18 applies your real quarterback format automatically.',
  },

  answer: 'A Superflex league allows each team to start a second quarterback, so league-wide starting demand can reach twice the number of teams, while the supply of quarterbacks who are clearly better than a replacement-level starter does not double. That gap between slots and viable starters is what re-prices the position structurally, and it is why the last clearly-startable quarterback in a Superflex league is worth far more than his overall rank suggests.',

  claims: [
    'A Superflex league can require up to twice as many starting quarterbacks as a single-quarterback league of the same size.',
    'Superflex raises quarterback demand without raising the supply of quarterbacks who clearly exceed replacement level, which is what moves the position’s value.',
    'In a single-quarterback league the supply of startable quarterbacks normally exceeds demand, so the cost of waiting at the position is comparatively low.',
    'Quarterback scarcity in Superflex is driven by starting requirements rather than by how good the remaining quarterbacks are in isolation.',
  ],

  blocks: [
    { type: 'calculator', id: 'calc', calc: 'qbdemand',
      h2: 'How much quarterback demand is left?',
      sub: 'Set your format and how many quarterbacks have already been drafted.',
      fields: [
        { name: 'teams', label: 'Teams in your league', value: 12, min: 4, max: 20 },
        { name: 'superflex', label: 'Quarterback format', value: '1',
          options: [{ value: '1', label: 'Superflex (second QB allowed)' }, { value: '0', label: 'Single quarterback' }] },
        { name: 'gone', label: 'Quarterbacks already drafted', value: 6, min: 0, max: 60 },
      ],
      hint: 'Superflex assumes every team eventually starts a second quarterback, which most do when the slot exists.',
      resultLabel: 'Result',
      defaultVerdict: '18 of 24 starting quarterback slots unfilled',
      defaultExplanation: 'A 12-team Superflex league can start up to 24 quarterbacks. With 6 already drafted, about 18 starting slots remain. Superflex demand routinely exceeds the number of quarterbacks who are clearly better than a replacement-level one, which is why the position re-prices structurally rather than cosmetically: the last viable starter is worth far more than his overall rank suggests.',
      note: 'An upper bound on demand. Some managers choose not to start a second quarterback, and a 2QB league — where the second is mandatory rather than optional — is stricter still.' },

    { type: 'prose', h2: 'Slots against supply',
      body: [
        'The league has a fixed number of starting quarterback slots. The professional game has a roughly fixed number of quarterbacks worth starting.',
        'In a single-quarterback league of twelve teams, twelve slots draw on a supply comfortably larger than twelve. Waiting is cheap.',
        'Double the slots and that comfort disappears. The same supply now has to cover twice the demand, and the bottom of the requirement reaches players who would not otherwise start anywhere.',
        'That is a change in [replacement level](/draft-science/replacement-value), not a change in opinion about quarterbacks.',
      ] },

    { type: 'prose', h2: 'What this does not settle',
      body: [
        'High demand does not mean you should take a quarterback with your next pick.',
        'It means the cost of being last to the position is higher than it would be otherwise.',
        'If your league is drafting quarterbacks slowly, the opportunity may be to wait while everyone else overpays elsewhere. If a run has started, the calculation changes within a single round.',
        'See [what to do when a quarterback run starts](/scenarios/superflex-quarterback-run).',
      ] },

    { type: 'convert', h2: 'Format applied, not assumed.',
      body: [
        'A universal ranking has to guess at your quarterback format. Yours is not a guess.',
        'GREEN18 starts from the format you configured and prices quarterbacks against the demand it actually creates.',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  faq: [
    { q: 'What is Superflex in fantasy football?', a: 'Superflex is a roster slot that accepts a quarterback in addition to the positions a normal flex accepts, which lets each team start a second quarterback if it chooses. It differs from a 2QB league, where starting two quarterbacks is mandatory rather than optional.' },
    { q: 'Why are quarterbacks more valuable in Superflex?', a: 'Because a Superflex league can require up to twice as many starting quarterbacks as a single-quarterback league, while the number of quarterbacks who clearly outproduce a replacement-level starter does not double. The extra demand reaches deeper into a supply that runs out, which raises the value of every quarterback above that line.' },
    { q: 'Should I draft two quarterbacks early in Superflex?', a: 'Not necessarily. High structural demand raises the cost of being last to the position, but the correct timing still depends on league size, how quickly your particular league is drafting quarterbacks, your roster, and how far away your next pick is.' },
  ],

  links: ['draft-science/superflex-quarterback-value', 'formats/superflex', 'scenarios/superflex-quarterback-run', 'superflex-draft-assistant', 'fantasy-football-draft-assistant'],
};
