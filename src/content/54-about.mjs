// PAGE 54 — institutional page. Who publishes GREEN18, what it is, and what it
// is deliberately not. Scope honesty over puffery; no claims beyond the canon.
export default {
  slug: 'about',
  pageType: 'product',
  title: 'About GREEN18 | Who Makes It and What It Is',
  description: 'GREEN18 is an independent iPhone fantasy football live draft assistant published by Interplore. No accounts, no platform connection, nothing collected.',
  breadcrumb: 'About',

  hero: {
    eyebrow: 'About',
    h1: 'About GREEN18',
    lede: [
      'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
      'It is published by **Interplore**, and it is independent: not affiliated with, endorsed by or sponsored by the NFL, the NFL Players Association, any NFL club, or any fantasy platform.',
      'It does one job — the draft itself — and it does not pretend to do the rest of the season.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences. It is published by Interplore, runs on iPhone only, has no accounts or sign-in, and its App Store privacy label is \u201cData Not Collected\u201d. It is an independent application and is not affiliated with the NFL, the NFL Players Association, any NFL club, or any fantasy platform.',

  blocks: [
    { type: 'prose', h2: 'What Is GREEN18?', body: [
      'GREEN18 is a draft-day tool for a single purpose: deciding who to take when it is your turn.',
      'You enter your league — scoring, size, roster, draft order — and record picks as they happen. After each pick, the board is recomputed against the draft as it actually stands, not against a ranking written before anyone picked.',
      'The method behind that recomputation is **Draft-State Valuation**: valuing a fantasy football player according to the current state of a specific draft, rather than treating preseason rank or ADP as a fixed measure of player value.',
      'The full pipeline is written out on [how GREEN18 values a player](/how-green18-ranks-fantasy-players) and in the [methodology](/methodology).',
    ], quote: 'One job, done properly: the pick in front of you.' },

    { type: 'cards', h2: 'What GREEN18 Is Not.',
      sub: 'Being clear about the boundaries is more useful than a feature list.',
      cards: [
        { h3: 'Not a season manager', body: 'GREEN18 is a draft-day assistant. It does not manage lineups, waivers, trades or matchups after the draft ends.' },
        { h3: 'Not connected to a platform', body: 'There is no sync, no import and no login to any fantasy service. You record your picks yourself, which is why it works in a living-room draft as readily as an online one.' },
        { h3: 'Not an account-based service', body: 'There is no sign-up, no sign-in and no profile. Nothing about you is collected, because there is nothing about you to collect.' },
        { h3: 'Not an AI chatbot', body: 'There is no chat interface and no language model. Every number the app shows is a computed component of a deterministic model.' },
        { h3: 'Not a forecaster', body: 'GREEN18 does not predict injuries, does not forecast season outcomes, and guarantees nothing. It values the board in front of you.' },
        { h3: 'Not cross-platform', body: 'GREEN18 is an iPhone app. There is no Android version and no web version.' },
      ] },

    { type: 'prose', h2: 'Who Publishes GREEN18?', body: [
      'GREEN18 is published by **Interplore**, which holds the copyright in the app and this site.',
      'Interplore is independent of the NFL, the NFL Players Association, every NFL club, and every fantasy platform. No part of the product is licensed from, reviewed by, or endorsed by any of them.',
      'Correspondence of any kind goes to **manager@green18.app** — see [contact](/contact).',
    ]},

    { type: 'prose', h2: 'Where Does the Data Come From?', body: [
      'Player, team and schedule facts come from open football data, with the nflverse open-source community credited under its CC-BY licence. Attribution is shown inside the app under Settings → Data sources.',
      'The other two inputs are yours: the league you configure, and the picks you record.',
      'The app ships with the football data it needs inside it, so it works with airplane mode on. When the phone is online it may fetch a newer copy of that same shared data — the identical file everyone gets, requested anonymously.',
    ]},

    { type: 'prose', h2: 'What Does GREEN18 Know About You?', body: [
      'Nothing.',
      'Leagues, drafts, preferences and archived drafts are stored on your iPhone in the app’s own private storage, and GREEN18 never uploads any of it.',
      'There are no accounts, no analytics, no advertising and no third-party software in the app.',
      'The requests for shared player data carry nothing about you, your league, your roster, your picks or your preferences.',
      'The exact list of what is stored and where is in the [privacy policy](/privacy).',
    ], quote: 'The app has no idea who you are, by design.' },

    { type: 'prose', h2: 'Why Build It This Way?', body: [
      'Because a draft recommendation you cannot reproduce is a recommendation you cannot check.',
      'The model is deterministic: identical league settings and an identical sequence of recorded picks always produce an identical result. That is a deliberate constraint, and it rules out anything that would make the output vary run to run.',
      'It is also why your own preferences are kept in your personal rank and never folded into the objective values — a tool that quietly absorbs your bias into its "objective" number is only telling you what you already believe.',
    ]},

    { type: 'convert', h2: 'Use It on Draft Day.',
      body: ['GREEN18 is built for the ninety seconds you actually have on the clock.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Published by Interplore. Not affiliated with the NFL, the NFLPA, any club, or any fantasy platform.' },
  ],

  faq: [
    { q: 'Who makes GREEN18?', a: 'GREEN18 is published by Interplore, which holds the copyright in the app and the green18.app website. Interplore is independent and is not affiliated with, endorsed by or sponsored by the NFL, the NFL Players Association, any NFL club, or any fantasy platform.' },
    { q: 'Is GREEN18 available on Android or the web?', a: 'No. GREEN18 is an iPhone app only. There is no Android build and no browser version.' },
    { q: 'Does GREEN18 require an account?', a: 'No. GREEN18 has no accounts, no sign-in and no profile. The app can be used immediately after installation, and nothing needs to be created or verified.' },
    { q: 'Does GREEN18 connect to ESPN, Yahoo or Sleeper?', a: 'No. GREEN18 has no connection to any fantasy platform and cannot sync or import a draft. Picks are recorded by the user, which is why the app works for in-person drafts as well as online ones.' },
    { q: 'What data does GREEN18 collect about its users?', a: 'None. Leagues, drafts, preferences and archived drafts are stored only on the user’s iPhone and are never uploaded. The app contains no analytics, no advertising and no third-party software.' },
    { q: 'How do I contact the people behind GREEN18?', a: 'Email manager@green18.app. That address reaches the publisher directly and is the only contact channel for support, bug reports and data corrections.' },
  ],

  links: [
    'methodology',
    'contact',
    'privacy',
    'how-green18-ranks-fantasy-players',
    'fantasy-football-draft-assistant',
  ],

  disclaimer: 'GREEN18 is published by Interplore and is not affiliated with, endorsed by or sponsored by the NFL, the NFL Players Association, any NFL club or any fantasy platform.',
};
