// PAGE 17 — "can ChatGPT draft for me". Fair, descriptive, non-disparaging;
// draws the honest line at live board state.
export default {
  slug: 'chatgpt-fantasy-football-draft',
  title: 'Can ChatGPT Do Your Fantasy Football Draft? | GREEN18',
  description: 'A general chatbot is good at explaining fantasy football and blind to your live draft board. Here is the honest line, and what to use instead.',
  breadcrumb: 'ChatGPT and Your Draft',
  disclaimer: 'GREEN18 is an independent application. It is not affiliated with, endorsed by, or connected to OpenAI or ChatGPT. Product names are referenced descriptively only.',

  hero: {
    eyebrow: 'An Honest Answer',
    h1: 'Can ChatGPT Do Your Fantasy Football Draft? Partly — and Not the Part That Matters Most.',
    lede: [
      'A general chatbot is genuinely useful before your draft. It explains scoring formats, roster construction and terminology on demand, in plain language.',
      'Then the draft starts, and it has no idea which eleven players came off the board in the last four minutes.',
      '**Concepts before the draft. Computation during it.**',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone. Built for the 2026 fantasy football draft.',
    secondary: { label: 'See How GREEN18 Works', href: '#how-it-works' },
  },

  blocks: [
    { type: 'prose', h2: 'What a Chatbot Is Actually Good At.', body: [
      'Explaining what a half-PPR league does to receiver value.',
      'Talking you through why Superflex changes quarterback demand.',
      'Summarising a strategy you half-remember from last season.',
      'Answering a beginner’s question without making them feel like a beginner.',
      'That is real value, and none of it needs a draft board.',
      'If that is where you are, start with [fantasy football for beginners](/fantasy-football-for-beginners).',
    ]},

    { type: 'prose', h2: 'Where It Runs Out.', body: [
      'Your draft is a moving state.',
      'Every pick changes what is left, what your roster needs, and what the seven managers between you and your next turn will take. That is your [pick horizon](/draft-science/pick-horizon), and it decides more picks than talent does.',
      'A chatbot does not see that state unless you type all of it in, every round, on the clock.',
      'And typing it in is the work.',
    ], quote: 'You would spend your pick clock describing the draft instead of drafting.' },

    { type: 'cards', h2: 'Two Different Jobs.', cards: [
      { h3: 'Explaining', body: 'Natural language is the right tool for concepts, formats and terminology. Ask away.' },
      { h3: 'Recording', body: 'A live draft needs picks captured as they happen, not narrated after the fact.' },
      { h3: 'Computing', body: 'Ranking what is left is arithmetic — each remaining player’s **projected draft position** for your league’s scoring and roster requirements, recomputed after every pick. GREEN18 does that part, by the method set out in [how GREEN18 ranks fantasy players](/how-green18-ranks-fantasy-players).' },
    ]},

    { type: 'prose', h2: 'The Repeatability Problem.', body: [
      'Ask a text generator the same question twice and you can get two different answers. It is composing prose, so nothing obliges the second answer to match the first.',
      'That is fine for a paragraph of explanation.',
      'It is not fine when you have forty seconds and one pick.',
      'GREEN18 is **deterministic**: the same board and the same league settings always produce the same recommendation, because the recommendation is computed from the recorded board rather than written as an opinion. The whole calculation is published in [the GREEN18 methodology](/methodology).',
      'GREEN18 also does not chat. It shows you a board.',
    ]},

    { type: 'steps', h2: 'How GREEN18 Works', steps: [
      { h3: 'Set Your League.', body: ['Scoring and quarterback format re-rank the player pool rather than relabelling it.'] },
      { h3: 'Shape Your Preferences.', body: ['Your opinions stay in your personal rank and never distort the objective values.'] },
      { h3: 'Record the Picks.', body: ['Tap players off as they go. The board recomputes immediately.'] },
      { h3: 'Take Now or Wait.', body: ['See how likely your target is to last until your next turn, then decide.'] },
    ]},

    { type: 'prose', h2: 'Use Both. Just Use Them for the Right Thing.', body: [
      'Ask the chatbot what a Superflex league rewards.',
      'Then let GREEN18 tell you what your Superflex draft is doing right now — how fast [quarterback demand](/draft-science/superflex-quarterback-value) is emptying the position, and how likely your target is to survive one more turn.',
      'The mechanism behind that is [documented in plain language](/fantasy-football-draft-algorithm).',
    ]},

    { type: 'convert', h2: 'Take a Live Board Into the Draft.',
      body: ['Learn the concepts anywhere. Draft with something that can see your board.', '**Download GREEN18 for iPhone.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Independent of any fantasy platform.' },
  ],

  faq: [
    { q: 'Can ChatGPT run my fantasy football draft for me?', a: 'Not effectively. A general chatbot has no view of your live draft board, so it only knows the players already taken if you type them in yourself before each pick. It is well suited to explaining scoring formats, roster construction and strategy concepts, and poorly suited to tracking a draft in progress.' },
    { q: 'Is GREEN18 a chatbot?', a: 'No. GREEN18 has no conversational interface and generates no text. It is a deterministic model that displays a live player board and recomputes the value of the remaining players each time you record a pick.' },
    { q: 'Is GREEN18 affiliated with OpenAI or ChatGPT?', a: 'No. GREEN18 is an independent iPhone application and is not affiliated with, endorsed by, or connected to OpenAI. Those product names are referenced only to describe a common way people search for draft help.' },
    { q: 'What can a chatbot do that GREEN18 does not?', a: 'A general chatbot answers open-ended questions in natural language — what half-PPR scoring means, how Superflex changes quarterback value, what a strategy is called. GREEN18 does not converse; it computes and displays the value of the players still available in your specific draft.' },
    { q: 'Why does a deterministic model suit a live draft better?', a: 'Because you are on a clock and need an answer you can trust and reproduce. A deterministic model returns the same recommendation for the same board every time, so any change you see comes from the draft itself rather than from variation in how the answer was produced.' },
  ],

  links: [
    'fantasy-football-draft-assistant',
    'ai-fantasy-football-draft-assistant',
    'fantasy-football-draft-algorithm',
    'draft-science/draft-state-valuation',
    'methodology',
  ],
};
