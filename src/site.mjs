// GREEN18 topic-cluster site — global configuration.
// Brand tokens mirror green18 repo Sources/DesignSystem/Tokens.swift (dark scheme).

// ---------------------------------------------------------------------------
// THE APP STORE URL.
// The app is not released yet (this id 404s until it is). This is the ONLY
// place the URL is written; every CTA on every page resolves through it, so
// release day is a one-line change here + a rebuild.
// ---------------------------------------------------------------------------
export const APP_STORE_URL = 'https://apps.apple.com/us/app/id6805706417';

export const ORIGIN = 'https://green18.app';
export const BRAND = 'GREEN18';
export const COPYRIGHT_OWNER = 'Interplore';
export const CONTACT = 'manager@green18.app';

// Primary navigation (§17: do not overload with every SEO page).
export const NAV = [
  { label: 'How It Works', href: '/fantasy-football-draft-assistant#how-it-works' },
  { label: 'Draft Assistant', href: '/live-fantasy-football-draft-assistant' },
  { label: 'Draft Formats', href: '/superflex-draft-assistant' },
  { label: 'How It Decides', href: '/fantasy-football-draft-algorithm' },
  { label: "Who It's For", href: '/fantasy-football-for-beginners' },
];

// Footer clusters (§18).
export const FOOTER = [
  { heading: 'Product', links: [
    ['How GREEN18 Works', '/fantasy-football-draft-assistant'],
    ['Live Draft Assistant', '/live-fantasy-football-draft-assistant'],
    ['Dynamic ADP', '/dynamic-fantasy-football-adp'],
    ['Fantasy Cheat Sheet', '/fantasy-football-cheat-sheet-app'],
    ['Draft Strategy', '/fantasy-football-draft-strategy-app'],
  ]},
  { heading: 'Draft Formats', links: [
    ['Superflex', '/superflex-draft-assistant'],
    ['PPR', '/ppr-draft-assistant'],
  ]},
  { heading: 'Draft Help', links: [
    ['Beginners', '/fantasy-football-for-beginners'],
    ['Competitive Players', '/competitive-fantasy-football-draft'],
    ['Office Leagues', '/office-fantasy-football-draft'],
    ['Home Leagues', '/home-league-draft-assistant'],
    ['Last-Minute Drafts', '/last-minute-fantasy-football-draft'],
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
  { heading: 'Legal', links: [
    ['Privacy', '/privacy'],
    ['Support', '/support'],
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
  'ai-fantasy-football-draft-assistant': 'AI Fantasy Football Draft Assistant',
  'chatgpt-fantasy-football-draft': 'ChatGPT and Your Fantasy Draft',
  'fantasy-football-draft-algorithm': 'How the Draft Model Works',
  'automated-fantasy-football-draft-tool': 'Automated Draft Tool',
  'espn-fantasy-football-draft-helper': 'ESPN Draft Helper',
  'yahoo-fantasy-football-draft-helper': 'Yahoo Draft Helper',
  'sleeper-fantasy-football-draft-helper': 'Sleeper Draft Helper',
};
