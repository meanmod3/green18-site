// PAGE 07 — PPR. CONVERSION page: using GREEN18 in a PPR league.
// The scoring RULES and their valuation mechanics live on /formats/ppr — link
// there rather than restating how reception scoring is computed.
export default {
  slug: 'ppr-draft-assistant',
  title: 'PPR Fantasy Football Draft Assistant | GREEN18',
  description: 'Draft for your PPR league using a live fantasy football player board that accounts for your league and changing draft.',
  breadcrumb: 'PPR Draft Assistant',

  hero: {
    eyebrow: 'PPR Scoring Format',
    h1: 'Draft for Your PPR League. Not a Generic League.',
    lede: [
      'Reception scoring changes player value.',
      'So does roster construction. So does positional availability.',
      'So does everything your league drafts before your next pick.',
      '**GREEN18 combines those realities into one live draft board.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'PPR Is a Setting. Not a Strategy.', body: [
      'Knowing that receptions are valuable is only the beginning. [How PPR scoring re-prices a player pool](/formats/ppr) is settled before anyone picks.',
      'The real questions happen during the draft.',
      'Which receiver?',
      'Which running back?',
      'How much depth is left above the next tier?',
      'Should you take the value now?',
      'Can you afford to wait until your next pick?',
      'GREEN18 is built around those decisions — which is what a [live draft assistant](/live-fantasy-football-draft-assistant) is for.',
    ]},

    { type: 'prose', h2: 'Static Rankings Stop at the Starting Line.', body: [
      'Most fantasy football rankings answer one question:',
    ], quote: 'Who looked valuable before the draft started?',
      after: [
        'Your real draft creates different questions.',
        'Which positions are thinning fastest — and how does that compare to every other position?',
        'Who is likely to survive to your next pick?',
        'Did the last five picks collapse a tier and change what the board is worth?',
        'That is **Draft-State Valuation**: pricing a player by the state of the draft in front of you rather than by a rank set weeks ago.',
      ] },

    { type: 'cards', h2: 'Why a PPR Board Has to Move.', cards: [
      { h3: 'Live, Not Static', body: 'The board responds to the draft instead of presenting the same rankings from Pick 1 through Pick 150.' },
      { h3: 'Built Around Your League', body: 'Reception scoring changes where replacement level sits at every position, so a player can be worth very different amounts in two leagues drafting the same night. GREEN18 starts with the league you’re actually playing.' },
      { h3: 'Margin Over Replacement', body: 'The number that matters is not a player’s projection but how far it sits above the player you could take instead. That margin is what shrinks while you wait.' },
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Configure the scoring — full PPR, half, or your own — plus roster structure and format.'] },
      { h3: 'Shape Your Draft.', body: ['Set the preferences that matter to you, instead of drafting from one universal list.'] },
      { h3: 'Start Drafting.', body: ['As players are selected, remove them. Players rise. Players fall. Tiers collapse. Roster needs change.'] },
      { h3: 'Make the Pick.', body: ['One live view of the players that still matter, instead of six browser tabs. The same board always produces the same answer.'] },
    ]},

    { type: 'prose', h2: 'Your Scoring Belongs in the Board.', body: [
      'A universal ranking cannot represent every league, because it has to assume one replacement level and your league has its own.',
      'GREEN18 starts from the premise that your scoring system should materially influence the players you are considering — the [PPR value adjustment calculator](/tools/ppr-value-adjustment-calculator) shows how far the same pool moves between formats.',
      'Once the draft begins, the opportunity cost of every pick is measured against what your own board says is still available. It is the same principle behind treating [ADP as a starting line](/dynamic-fantasy-football-adp) rather than the answer.',
    ]},

    { type: 'prose', h2: 'When You Already Have the Receivers.', body: [
      'PPR pushes rooms toward receivers, and that creates the most common mid-draft question in the format: the best player available is a fourth receiver and your roster no longer needs one.',
      'Scarcity is measured against **your** roster, not the league’s. A cliff you are already standing above costs you nothing. [When you already have two wide receivers](/scenarios/already-have-two-wide-receivers) walks that decision through.',
    ]},

    { type: 'convert', h2: 'Draft the League You Joined.',
      body: ['Reception scoring is your league’s rule. Your board should know it.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Built for the 2026 fantasy football draft.' },
  ],

  links: [
    'formats/ppr',
    'draft-science/replacement-value',
    'tools/ppr-value-adjustment-calculator',
    'live-fantasy-football-draft-assistant',
    'superflex-draft-assistant',
  ],
};
