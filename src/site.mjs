// GREEN18 topic-cluster site — global configuration.
// Brand tokens mirror green18 repo Sources/DesignSystem/Tokens.swift (dark scheme).

// ---------------------------------------------------------------------------
// THE APP STORE URL.
// The app is not released yet (this id 404s until it is). This is the ONLY
// place the URL is written; every CTA on every page resolves through it, so
// release day is a one-line change here + a rebuild.
// ---------------------------------------------------------------------------
export const APP_STORE_URL = 'https://apps.apple.com/us/app/id6805706417';

// THE PRODUCT CANON. Every surface that describes the product — schema,
// llms.txt, OG tags, the homepage meta description — resolves through this or a
// faithful compression of it. Three surfaces had drifted into three different
// wordings before this constant existed.
export const CANON = 'GREEN18 is an iPhone fantasy football live draft assistant that '
  + 'continuously recalculates player valuations according to league settings, roster '
  + 'construction, player availability, draft state, and user preferences.';

// The <=165-character compression, for meta descriptions. A strict subset of
// CANON's claims — it may say less, never anything different.
export const CANON_SHORT = 'GREEN18 is an iPhone fantasy football live draft assistant that '
  + 'continuously recalculates player valuations from your league, your roster and the live draft.';

// ---------------------------------------------------------------------------
// SEARCH CONSOLE VERIFICATION
//
// Paste the code from each console here and rebuild — the build emits both the
// meta tag and the verification file for whichever methods are filled in, so
// no other file needs touching. Empty string = that method is not used.
// Step-by-step instructions: docs/measurement-setup.md
// ---------------------------------------------------------------------------
export const VERIFICATION = {
  // Bing Webmaster Tools -> Add site -> "HTML Meta Tag": the content="..." value.
  // Also used for BingSiteAuth.xml, which the build emits from the same code.
  bing: '',
  // Google Search Console -> URL prefix property -> "HTML tag": the content="..." value.
  google: '',
  // Google Search Console -> "HTML file" method: the full filename it gives you,
  // e.g. 'google1a2b3c4d5e6f7890.html'. Leave empty if using the meta tag.
  googleFile: '',
};

export const ORIGIN = 'https://green18.app';
export const BRAND = 'GREEN18';
export const COPYRIGHT_OWNER = 'Interplore';
export const CONTACT = 'manager@green18.app';

// Primary navigation (§17: do not overload with every SEO page).
export const NAV = [
  { label: 'How It Works', href: '/how-green18-ranks-fantasy-players' },
  { label: 'Draft Science', href: '/draft-science/' },
  { label: 'Scenarios', href: '/scenarios/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Glossary', href: '/glossary' },
];

// Footer clusters (§18).
export const FOOTER = [
  { heading: 'Product', links: [
    ['How GREEN18 Works', '/fantasy-football-draft-assistant'],
    ['Live Draft Assistant', '/live-fantasy-football-draft-assistant'],
    ['Dynamic ADP', '/dynamic-fantasy-football-adp'],
    ['Fantasy Cheat Sheet', '/fantasy-football-cheat-sheet-app'],
    ['Personalized Rankings', '/personalized-fantasy-football-rankings'],
    ['Positional Scarcity', '/fantasy-football-positional-scarcity'],
    ['Draft Strategy', '/fantasy-football-draft-strategy-app'],
  ]},
  { heading: 'Draft Formats', links: [
    ['All league formats', '/formats/'],
    ['Superflex format', '/formats/superflex'],
    ['PPR format', '/formats/ppr'],
    ['Standard scoring', '/formats/standard'],
    ['Superflex draft assistant', '/superflex-draft-assistant'],
    ['PPR draft assistant', '/ppr-draft-assistant'],
  ]},
  { heading: 'Draft Help', links: [
    ['Beginners', '/fantasy-football-for-beginners'],
    ['Competitive Players', '/competitive-fantasy-football-draft'],
    ['Office Leagues', '/office-fantasy-football-draft'],
    ['Home Leagues', '/home-league-draft-assistant'],
    ['Last-Minute Drafts', '/last-minute-fantasy-football-draft'],
    ['Without the Research', '/fantasy-football-without-research'],
  ]},
  { heading: 'The Model', links: [
    ['AI Draft Assistant', '/ai-fantasy-football-draft-assistant'],
    ['How It Decides', '/fantasy-football-draft-algorithm'],
    ['ChatGPT vs GREEN18', '/chatgpt-fantasy-football-draft'],
    ['Automated Draft Tool', '/automated-fantasy-football-draft-tool'],
  ]},
  { heading: 'Platforms', links: [
    ['ESPN Draft Helper', '/espn-fantasy-football-draft-helper'],
    ['Yahoo Draft Helper', '/yahoo-fantasy-football-draft-helper'],
    ['Sleeper Draft Helper', '/sleeper-fantasy-football-draft-helper'],
  ]},
  { heading: 'Draft Science', links: [
    ['All draft science', '/draft-science/'],
    ['Draft-State Valuation', '/draft-science/draft-state-valuation'],
    ['Positional Scarcity', '/draft-science/positional-scarcity'],
    ['Replacement Value', '/draft-science/replacement-value'],
    ['Opportunity Cost', '/draft-science/opportunity-cost'],
    ['Pick Horizon', '/draft-science/pick-horizon'],
    ['Tier Collapse', '/draft-science/player-tier-collapse'],
    ['Roster Construction', '/draft-science/roster-construction'],
    ['Superflex QB Value', '/draft-science/superflex-quarterback-value'],
  ]},
  { heading: 'Tools', links: [
    ['All calculators', '/tools/'],
    ['Scarcity Calculator', '/tools/scarcity-calculator'],
    ['Pick Horizon Calculator', '/tools/pick-horizon-calculator'],
    ['Replacement Level', '/tools/league-value-calculator'],
    ['Superflex QB Demand', '/tools/superflex-qb-demand-calculator'],
    ['PPR Value Adjustment', '/tools/ppr-value-adjustment-calculator'],
  ]},
  { heading: 'Reference', links: [
    ['Draft Scenarios', '/scenarios/'],
    ['How GREEN18 Ranks Players', '/how-green18-ranks-fantasy-players'],
    ['Why Rankings Change', '/why-fantasy-rankings-change-during-a-draft'],
    ['Glossary', '/glossary'],
    ['Methodology', '/methodology'],
    ['About', '/about'],
  ]},
  { heading: 'Legal', links: [
    ['Privacy', '/privacy'],
    ['Support', '/support'],
    ['Contact', '/contact'],
  ]},
];

export const FOOTER_DISCLAIMER =
  'GREEN18 is an independent fantasy football application. References to third-party fantasy ' +
  'platforms, leagues, teams, players, or trademarks are descriptive only and do not imply ' +
  'affiliation, sponsorship, or endorsement.';

// Human-readable titles for internal cross-links, keyed by slug.
export const LINK_TITLES = {
  '': 'GREEN18',
  'fantasy-football-draft-assistant': 'Fantasy Football Draft Assistant',
  'live-fantasy-football-draft-assistant': 'Live Draft Assistant',
  'fantasy-football-cheat-sheet-app': 'Fantasy Football Cheat Sheet App',
  'dynamic-fantasy-football-adp': 'Dynamic Fantasy Football ADP',
  'fantasy-football-draft-strategy-app': 'Draft Strategy App',
  'superflex-draft-assistant': 'Superflex Draft Assistant',
  'ppr-draft-assistant': 'PPR Draft Assistant',
  'fantasy-football-for-beginners': 'Fantasy Football for Beginners',
  'competitive-fantasy-football-draft': 'Competitive Fantasy Football Draft',
  'office-fantasy-football-draft': 'Office League Draft',
  'home-league-draft-assistant': 'Home League Draft Assistant',
  'last-minute-fantasy-football-draft': 'Last-Minute Fantasy Football Draft',
  'personalized-fantasy-football-rankings': 'Personalized Fantasy Football Rankings',
  'fantasy-football-without-research': 'Fantasy Football Without the Research',
  'fantasy-football-positional-scarcity': 'Positional Scarcity and Replacement Value',
  'ai-fantasy-football-draft-assistant': 'AI Fantasy Football Draft Assistant',
  'chatgpt-fantasy-football-draft': 'ChatGPT and Your Fantasy Draft',
  'fantasy-football-draft-algorithm': 'How the Draft Model Works',
  'automated-fantasy-football-draft-tool': 'Automated Draft Tool',
  'espn-fantasy-football-draft-helper': 'ESPN Draft Helper',
  'yahoo-fantasy-football-draft-helper': 'Yahoo Draft Helper',
  'sleeper-fantasy-football-draft-helper': 'Sleeper Draft Helper',
};

export const REDIRECTS = {
  'beat-your-coworkers-fantasy-football': '/office-fantasy-football-draft',
};

// ---------------------------------------------------------------------------
// PROTECTED LANGUAGE (§4 of the AI-retrieval brief).
//
// Each of these carries a different part of the product thesis, and the brief
// asks explicitly that they not be collapsed into repetitive marketing copy.
// They survived a site-wide accuracy rewrite; the build now checks they still
// exist so a future edit cannot quietly drop one.
// ---------------------------------------------------------------------------
export const PROTECTED_LINES = [
  'Your Draft Board Should Move When Your Draft Moves.',
  'Static rankings can\u2019t see your draft. GREEN18 can.',
  'The Player Didn\u2019t Change. Your Situation Did.',
  'ADP tells you what people expected. Your draft tells you what they\u2019re doing.',
];
