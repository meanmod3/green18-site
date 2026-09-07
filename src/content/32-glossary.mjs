// PAGE 32 — glossary. Every definition is one to two complete sentences and must
// stand alone: these are emitted as DefinedTerm structured data and quoted verbatim.
export default {
  slug: 'glossary',
  pageType: 'glossary',
  title: 'Fantasy Draft Glossary | GREEN18',
  description: 'Plain-language definitions of the fantasy draft terms that actually govern decisions: scarcity, replacement value, pick horizon, tiers, formats and more.',
  breadcrumb: 'Glossary',

  hero: {
    eyebrow: 'Reference',
    h1: 'Fantasy Draft Glossary',
    lede: [
      'Most fantasy glossaries define the vocabulary of the sport. This one defines the vocabulary of the **decision**.',
      'Each entry stands on its own and can be quoted without the page around it.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'This glossary defines the terms that govern fantasy football draft decisions, grouped into four areas: valuation concepts such as draft-state valuation, replacement value and opportunity cost; scarcity concepts such as positional scarcity, tiers and tier collapse; draft mechanics such as snake drafts, the turn, positional runs and reaches; and league formats such as PPR, half PPR, standard scoring, flex and Superflex. Each definition is written to be complete on its own.',

  claims: [
    'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.',
    'Replacement value is the production a manager would get from the best realistic alternative at a position, and it is the baseline against which any individual player’s worth is measured.',
    'Positional scarcity increases when the expected quality of a player’s replacement declines faster than the quality of alternatives at other positions.',
    'Average draft position describes where a player has historically been selected, which is a record of past market behaviour rather than a measure of that player’s value.',
    'A snake draft reverses the selection order every round, which means the distance between a manager’s consecutive picks varies systematically by draft slot.',
  ],

  blocks: [
    { type: 'definitions', h2: 'Valuation', terms: [
      { id: 'draft-state-valuation', term: 'Draft-State Valuation (DSV)',
        definition: 'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It recalculates each available player’s worth after every selection, because every selection changes the alternatives that remain.' },
      { id: 'situational-draft-value', term: 'Situational Draft Value',
        definition: 'Situational draft value is what a specific player is worth to one manager at one pick in one league, given that manager’s roster, scoring rules, draft position and the players already selected. It differs from a published ranking, which states what a player is worth in the abstract to everyone at once.' },
      { id: 'baseline-value', term: 'Baseline Value',
        definition: 'Baseline value is a player’s worth before any league settings or draft context are applied to it. It is the starting input to a valuation model, not the model’s output.' },
      { id: 'replacement-value', term: 'Replacement Value',
        definition: 'Replacement value is the production a manager would get from the best realistic alternative at a position if they passed on the player under consideration. A player’s true value in a draft is the gap between his expected production and his replacement’s, not his expected production alone.' },
      { id: 'replacement-level', term: 'Replacement Level',
        definition: 'Replacement level is the quality of the marginal starter at a position — roughly the last player at that position who would be started in a given league size and format. It falls as a position is drafted, which is why passing on a position becomes more expensive as a draft progresses.' },
      { id: 'opportunity-cost', term: 'Opportunity Cost',
        definition: 'Opportunity cost is the value of the best player a manager gives up by making a particular selection. Because the alternatives change with every pick, the opportunity cost of the same player is different at different points in the same draft.' },
      { id: 'value-based-drafting', term: 'Value-Based Drafting (VBD)',
        definition: 'Value-based drafting is a method that ranks players by how much they exceed replacement level at their own position rather than by raw projected points. It allows players at different positions to be compared on a single scale.' },
      { id: 'best-player-available', term: 'Best Player Available (BPA)',
        definition: 'Best player available is a strategy of selecting the highest-ranked remaining player regardless of roster need. It answers who is best but not what a manager will still be able to get at that position later, which is why it is usually combined with scarcity and pick-horizon reasoning.' },
      { id: 'adp', term: 'Average Draft Position (ADP)',
        definition: 'Average draft position is the average pick number at which a player has been selected across a sample of drafts. It describes where the market has historically taken a player, which is a record of past behaviour rather than a measure of that player’s value.' },
      { id: 'dynamic-adp', term: 'Dynamic ADP',
        definition: 'Dynamic ADP is a running measure of where players are actually being selected as market behaviour changes, rather than a single figure fixed before the season. It updates as new draft results arrive, so it reflects the current market instead of an earlier one.' },
      { id: 'personalized-rankings', term: 'Personalized Rankings',
        definition: 'Personalized rankings are player orderings adjusted for one manager’s league scoring, roster construction, draft position and stated preferences. They exist because a single universal ranking cannot be simultaneously correct for a Superflex league, a PPR league and a standard league.' },
    ]},

    { type: 'definitions', h2: 'Scarcity and Tiers', terms: [
      { id: 'positional-scarcity', term: 'Positional Scarcity',
        definition: 'Positional scarcity increases when the expected quality of a player’s replacement declines faster than the quality of alternatives at other positions. It is a statement about the depth remaining behind a player, not about the player himself.' },
      { id: 'tier', term: 'Tier',
        definition: 'A tier is a group of players whose expected production is close enough that a manager should be roughly indifferent between them. Tiers matter more than exact ranks, because the meaningful decision is when to move down a tier rather than which player within one to take.' },
      { id: 'tier-collapse', term: 'Tier Collapse',
        definition: 'Tier collapse is the point at which the last players in a quality group are drafted, leaving only clearly inferior options at that position. The player just below a collapsed tier is worth substantially less than his rank position suggests, because the drop behind him is a step rather than a slope.' },
      { id: 'positional-run', term: 'Positional Run',
        definition: 'A positional run is a sequence of consecutive or near-consecutive selections at the same position. A run transfers value to the players still available at that position and away from equivalent players at deeper positions.' },
      { id: 'scarcity-cliff', term: 'Scarcity Cliff',
        definition: 'A scarcity cliff is a sharp drop in expected production between adjacent players at a position, rather than the gradual decline seen elsewhere on the board. Drafting immediately before a cliff is far more valuable than drafting immediately after it.' },
      { id: 'pick-horizon', term: 'Pick Horizon',
        definition: 'Pick horizon is the number of selections between a manager’s current pick and their next one. It determines the cost of waiting, because a longer horizon carries a higher probability that viable alternatives will no longer be available.' },
      { id: 'survival', term: 'Survival (Availability Odds)',
        definition: 'Survival is the likelihood that a specific player will still be undrafted when a manager’s next pick arrives. It is the quantity that converts a ranking into a take-now-or-wait decision.' },
    ]},

    { type: 'definitions', h2: 'Draft Mechanics', terms: [
      { id: 'snake-draft', term: 'Snake Draft',
        definition: 'A snake draft reverses the selection order every round, so a manager picking first in one round picks last in the next. This means the distance between a manager’s consecutive picks varies systematically depending on their draft slot.' },
      { id: 'the-turn', term: 'The Turn',
        definition: 'The turn is the point in a snake draft where a manager makes two picks close together at the end of one round and the start of the next. Managers at the turn face the longest gap between their other selections, which raises the cost of waiting on any position.' },
      { id: 'reach', term: 'Reach',
        definition: 'A reach is a selection made noticeably earlier than the player’s market price would suggest. A reach is not automatically a mistake, because scarcity, roster need and pick horizon can justify paying above market for a specific manager.' },
      { id: 'falling-player', term: 'Falling Player',
        definition: 'A falling player is one still available well past the point where the market usually selects him. A fall creates genuine value only when the reason for it is market drift rather than information the manager does not have.' },
      { id: 'roster-construction', term: 'Roster Construction',
        definition: 'Roster construction is the combination of positions a manager has already drafted and the starting slots they still have to fill. It changes the value of every remaining player, because the same player contributes differently to different partially built teams.' },
      { id: 'handcuff', term: 'Handcuff',
        definition: 'A handcuff is the backup to a player a manager already rosters, drafted so that the manager retains the role’s production if the starter is unavailable. Handcuffing reduces downside risk at the cost of a roster spot that could hold an independent contributor.' },
      { id: 'bye-week', term: 'Bye Week',
        definition: 'A bye week is the week in which an NFL team does not play, meaning its players score nothing for their fantasy managers. Bye weeks are a scheduling constraint on a roster rather than a measure of player quality, and they matter mainly when several starters share one.' },
      { id: 'streaming', term: 'Streaming',
        definition: 'Streaming is the practice of repeatedly changing the player used at a position each week based on matchup, rather than drafting one player to hold the slot all season. A position that can be streamed is worth less at the draft table, because its replacement cost during the season is low.' },
    ]},

    { type: 'definitions', h2: 'League Formats', terms: [
      { id: 'ppr', term: 'PPR (Points Per Reception)',
        definition: 'PPR is a scoring format that awards one fantasy point for every reception a player makes, in addition to yardage and touchdown scoring. It raises the value of high-volume pass catchers relative to players whose production comes mainly from rushing.' },
      { id: 'half-ppr', term: 'Half PPR',
        definition: 'Half PPR is a scoring format that awards half a fantasy point per reception. It narrows the gap between reception-heavy and rushing-heavy players compared with full PPR, without removing the reception premium entirely as standard scoring does.' },
      { id: 'standard-scoring', term: 'Standard Scoring',
        definition: 'Standard scoring awards no points for receptions, valuing players purely on yardage, touchdowns and other scoring plays. It shifts value toward high-volume rushers and away from players whose value is concentrated in reception count.' },
      { id: 'superflex', term: 'Superflex',
        definition: 'Superflex is a format containing a roster slot that may be filled by a quarterback in addition to the usual positions, allowing most managers to start two quarterbacks. It sharply increases quarterback demand and scarcity, because there are fewer starting-quality quarterbacks than there are slots that can hold one.' },
      { id: 'flex', term: 'Flex',
        definition: 'A flex is a starting roster slot that may be filled by more than one position, most commonly a running back, wide receiver or tight end. Flex slots increase the value of positional flexibility, because a player who can fill several slots gives a manager more ways to build a lineup.' },
      { id: 'league-size', term: 'League Size',
        definition: 'League size is the number of managers drafting from a single player pool. Larger leagues push replacement level further down the player pool, which makes every starting-quality player scarcer and raises the cost of waiting at any position.' },
    ]},

    { type: 'prose', h2: 'Why These Terms and Not the Usual List?', body: [
      'Because most fantasy vocabulary describes the game, and these terms describe the choice.',
      'A glossary that defines "touchdown" does not help anyone on the clock. A glossary that defines replacement value, pick horizon and tier collapse does, because those are the quantities that actually determine whether taking a player now is right.',
      'The method that ties them together is documented on [how GREEN18 values a player](/how-green18-ranks-fantasy-players), and the consequence is explained on [why rankings change during a draft](/why-fantasy-rankings-change-during-a-draft).',
    ]},

    { type: 'convert', h2: 'See the Terms in Motion.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**Scarcity, replacement value and pick horizon stop being vocabulary once a board applies them to your draft.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is draft-state valuation?', a: 'Draft-state valuation is a method of valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value. It recalculates each available player\'s worth after every selection.' },
    { q: 'What is the difference between ADP and dynamic ADP?', a: 'ADP is the average pick number at which a player has been selected across a sample of drafts, usually fixed at a point in time. Dynamic ADP is a running measure that updates as new draft results arrive, so it reflects current market behaviour rather than an earlier snapshot.' },
    { q: 'What is replacement value in fantasy football?', a: 'Replacement value is the production a manager would get from the best realistic alternative at a position if they passed on the player under consideration. A player\'s value in a draft is the gap between his expected production and his replacement\'s.' },
    { q: 'What is tier collapse?', a: 'Tier collapse is the point at which the last players in a quality group are drafted, leaving only clearly inferior options at that position. The player just below a collapsed tier is worth substantially less than his rank suggests, because the drop behind him is a step rather than a slope.' },
    { q: 'Why does Superflex change quarterback value so much?', a: 'Superflex adds a roster slot that a quarterback may fill, so most managers start two quarterbacks. Demand roughly doubles while supply does not, which makes starting-quality quarterbacks scarce and re-ranks them against every other position rather than merely grouping them differently.' },
  ],

  links: [
    'how-green18-ranks-fantasy-players',
    'why-fantasy-rankings-change-during-a-draft',
    'fantasy-football-positional-scarcity',
    'dynamic-fantasy-football-adp',
    'fantasy-football-for-beginners',
  ],
};
