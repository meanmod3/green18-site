// PAGE 56 — institutional contact page. Short, real, and useful: one address,
// what to put in a bug report, and where the other questions already live.
// No phone numbers, no postal address, no social accounts, no SLA promises.
export default {
  slug: 'contact',
  pageType: 'product',
  title: 'Contact GREEN18',
  description: 'Reach GREEN18 at manager@green18.app — bug reports, data corrections and questions. What to include so a problem can be reproduced on the first reply.',
  breadcrumb: 'Contact',

  hero: {
    eyebrow: 'Contact',
    h1: 'Contact GREEN18',
    lede: [
      'One address, read by the people who build the app: **manager@green18.app**',
      'There is no ticket queue and no phone line. Email is the whole channel.',
      'What follows is simply how to write the email so the problem can be reproduced without a round trip.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'GREEN18 is contacted by email at manager@green18.app, which is the single channel for support questions, bug reports and player-data corrections. A bug report is most useful when it names the iPhone model, the iOS version, the app version from Settings → About, the league format, and what was expected compared with what actually happened.',

  blocks: [
    { type: 'prose', h2: 'How Do I Report a Bug?', body: [
      'Email **manager@green18.app** and include enough for the problem to be reproduced:',
    ],
      list: [
        '**Your iPhone model** — behaviour can differ on a smaller screen.',
        '**Your iOS version** — Settings → General → About.',
        '**The app version** — Settings → About, inside GREEN18.',
        '**Your league format** — size, scoring, roster and whether it is Superflex.',
        '**What you expected, and what actually happened** — in that order, as plainly as you can put it.',
        '**A screenshot**, if the problem is something you can see.',
      ],
      after: [
        'For a draft problem, an export of the league (Settings → Data → *Export league*) makes it reproducible exactly. Exports contain only what you entered — league settings, picks, preference answers — and nothing about you.',
      ] },

    { type: 'prose', h2: 'How Do I Report a Player-Data Error?', body: [
      'Send the player, what the app shows, what you believe is correct, and a link to a public source — a team announcement, the official injury report, or a beat report.',
      'Availability facts in the app come from official reports, so a correction needs a source that can be checked rather than an opinion about who should be listed where.',
    ]},

    { type: 'cards', h2: 'Before You Write, Two Pages May Already Answer It.', cards: [
      { h3: 'Support', body: 'Offline use, accounts, where your data lives, exporting and importing a league, and how the shared player data is refreshed are all answered on the [support page](/support).' },
      { h3: 'Privacy', body: 'What the app stores, where it stores it, what leaves the device and how to delete everything are set out in full in the [privacy policy](/privacy).' },
      { h3: 'Methodology', body: 'Questions about where a number comes from — the inputs, the determinism, and the limits — are answered on the [methodology page](/methodology).' },
    ]},

    { type: 'prose', h2: 'What This Page Deliberately Does Not List.', body: [
      'There is no phone number, no postal address and no social account, because none exists to publish.',
      'No response time is promised here, because a promise that cannot be kept during draft season is worse than no promise at all. Mail is read and answered by a person.',
      'GREEN18 is published by Interplore. Everything else about the publisher is on the [about page](/about).',
    ]},

    { type: 'convert', h2: 'Not a Question — Just Want the App?',
      body: ['GREEN18 is a draft-day assistant for iPhone, with no account to create before you use it.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Questions: manager@green18.app' },
  ],

  faq: [
    { q: 'How do I contact GREEN18?', a: 'Email manager@green18.app. That is the single contact channel for support questions, bug reports and player-data corrections, and it is read by the people who build the app.' },
    { q: 'What should a GREEN18 bug report include?', a: 'A useful bug report names the iPhone model, the iOS version, the app version shown in Settings → About, the league format including size and scoring, and what was expected compared with what actually happened. A screenshot, or a league export from Settings → Data, makes the problem reproducible.' },
    { q: 'How do I report an incorrect player fact?', a: 'Email manager@green18.app with the player, what the app currently shows, what the correct fact is, and a link to a public source such as a team announcement or an official injury report. Corrections need a checkable source.' },
    { q: 'Is there a phone number or mailing address for GREEN18?', a: 'No. Email at manager@green18.app is the only published contact channel for GREEN18.' },
  ],

  links: [
    'support',
    'privacy',
    'about',
    'methodology',
  ],
};
