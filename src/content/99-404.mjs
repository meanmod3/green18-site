// The 404. Generated like every other page so it carries the current design,
// the current navigation and the current links — the hand-written one still
// looked like the three-page pre-launch site, and its inline <style> block
// would now be blocked by the page CSP.
//
// noindex: a 404 should never be indexed, and it is excluded from the sitemap.
// Asset paths in the layout are absolute, so this renders correctly when served
// at any path depth.
export default {
  slug: '404',
  pageType: 'product',
  noindex: true,
  title: 'Page Not Found | GREEN18',
  description: 'That page does not exist. Here is where to find what you were probably looking for.',
  breadcrumb: 'Page not found',

  hero: {
    eyebrow: 'Error 404',
    h1: 'That Page Isn’t Here.',
    lede: [
      'The link is wrong, or the page moved. Either way, nothing you did caused it.',
      'The three places most things live are below.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  blocks: [
    { type: 'cards', h2: 'Where to go instead', cards: [
      { h3: 'Draft Science', body: 'How player value is actually calculated — [scarcity](/draft-science/positional-scarcity), [replacement value](/draft-science/replacement-value), [pick horizon](/draft-science/pick-horizon) and the rest of the [method](/draft-science/).' },
      { h3: 'Draft Scenarios', body: 'What to do when the board moves: [a run at one position](/scenarios/five-running-backs-go-in-a-row), [best available versus need](/scenarios/best-player-available-vs-roster-need), or [all twenty situations](/scenarios/).' },
      { h3: 'Calculators', body: 'Work a single variable: [positional scarcity](/tools/scarcity-calculator), [pick horizon](/tools/pick-horizon-calculator), or [every calculator](/tools/).' },
    ]},

    { type: 'prose', h2: 'Looking for something specific?', body: [
      'The [glossary](/glossary) defines every term the site uses, and [how GREEN18 values a player](/how-green18-ranks-fantasy-players) explains the whole method end to end.',
      'For the app itself, start at the [fantasy football draft assistant](/fantasy-football-draft-assistant) page.',
      'For data questions, the [privacy policy](/privacy) says exactly what the app stores, and [support](/support) has the common answers.',
    ]},

    { type: 'convert', h2: 'Your draft board should move when your draft moves.',
      body: ['That is the whole idea, and it is the one thing worth taking away from a page that does not exist.'],
      label: 'Download GREEN18', sub: 'Available for iPhone.' },
  ],

  links: ['fantasy-football-draft-assistant', 'draft-science', 'scenarios', 'glossary'],
};
