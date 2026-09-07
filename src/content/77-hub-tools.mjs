// PAGE 77 — SECTION HUB for /tools. Must state what each calculator computes AND the
// limit of a calculator: each isolates one variable; a real pick combines several.
export default {
  slug: 'tools',
  pageType: 'tool',
  title: 'Fantasy Draft Calculators | GREEN18',
  description: 'Five free calculators for scarcity, pick horizon, replacement level, Superflex QB demand and reception scoring — and what a single-variable tool cannot settle.',
  breadcrumb: 'Tools',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Tools',
    h1: 'Fantasy Draft Calculators',
    lede: [
      'Five calculators, each isolating one input to a draft decision so you can see what it is actually worth.',
      'They are deliberately narrow. Knowing what each one cannot settle is as useful as the number it returns.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'These five calculators each compute one input to a fantasy draft decision: the scarcity calculator estimates how urgent a position is from league size, starting slots, players already drafted and distance to your next pick; the pick horizon calculator counts the selections between your turns in a snake draft; the league value calculator locates the replacement baseline at a position from your league size and starting lineup; the Superflex QB demand calculator measures how much starting quarterback demand a league has left to fill; and the PPR value adjustment calculator shows how much a reception rule separates two players of differing catch volume. Each isolates a single variable while holding the others fixed, which is why a calculator can tell you what one factor is worth but cannot tell you which player to take.',

  claims: [
    'A calculator that isolates one variable can measure that variable precisely while remaining silent on the decision the variable is an input to.',
    'The scarcity of a position depends on league size, starting slots, players already drafted at the position, and the distance to the manager’s next pick.',
    'The number of picks between a manager’s turns in a snake draft is determined by draft slot and round direction, not by league size alone.',
    'The replacement baseline at a position is approximately the number of teams multiplied by the starting slots each team fills at that position, extended by any flex slots that position can occupy.',
    'A points-per-reception rule adds points in proportion to catch volume, so it reorders comparable players rather than uniformly inflating every score.',
  ],

  blocks: [
    { type: 'cards', h2: 'What Does Each Calculator Compute?',
      sub: 'Every tool runs in the browser, updates as you type, and captures its inputs in the URL so a specific case can be shared or cited.',
      cards: [
        { h3: 'Scarcity Calculator', body: 'Computes how urgent a position is from league size, starting slots per team, players already drafted there, and the gap to your next pick. Answers "is this position running out before I pick again?" — [open it](/tools/scarcity-calculator).' },
        { h3: 'Pick Horizon Calculator', body: 'Computes how many selections happen between your current pick and your next one in a snake draft. Answers "how long does anything I am waiting on have to survive?" — [open it](/tools/pick-horizon-calculator).' },
        { h3: 'League Value Calculator', body: 'Computes the replacement baseline at a position from your league size, starting requirement and flex slots. Answers "which player at this position am I actually being compared against?" — [open it](/tools/league-value-calculator).' },
        { h3: 'Superflex QB Demand Calculator', body: 'Computes how many starting quarterback slots your league still has to fill, given format and quarterbacks already gone. Answers "how much demand is left in the room?" — [open it](/tools/superflex-qb-demand-calculator).' },
        { h3: 'PPR Value Adjustment Calculator', body: 'Computes how many points a reception rule adds to a player over a season, and how far it separates two players of differing catch volume. Answers "how much does my scoring setting move this player?" — [open it](/tools/ppr-value-adjustment-calculator).' },
      ],
    },

    { type: 'prose', h2: 'What Can a Calculator Actually Settle?',
      body: [
        'One variable, exactly, while holding every other variable still.',
        'That is a real service and a real limit at the same time. The [scarcity calculator](/tools/scarcity-calculator) can tell you a position is thinning quickly. It cannot tell you that the position you would otherwise draft is thinning faster, because you did not give it that position. The [pick horizon calculator](/tools/pick-horizon-calculator) can tell you nineteen picks separate your turns. It cannot tell you whether nineteen picks is long enough for the specific player you are hoping survives, because survival depends on how the room is drafting.',
        'Each tool is a well-formed question with one input held open. A draft pick is several of those questions answered simultaneously, and the answers interact: a long pick horizon makes scarcity expensive, a weak replacement baseline makes scarcity cheap, and a scoring format can reverse which of two positions is scarce at all.',
      ],
    },

    { type: 'prose', h2: 'What Does a Real Decision Combine?',
      body: [
        'At minimum: replacement baseline, scarcity, pick horizon, tier structure, roster state and scoring format — all at once, for every available player, after every selection.',
        'Consider a single ordinary pick. You want the tight end. To know what he is worth you need his margin over the [replacement baseline](/tools/league-value-calculator) at tight end, how fast that baseline is [falling](/tools/scarcity-calculator) relative to the baseline at your other open slot, whether the drop behind him is a step or a slope, whether your [pick horizon](/tools/pick-horizon-calculator) is long enough for the step to arrive before you return, and what your [scoring format](/tools/ppr-value-adjustment-calculator) does to everyone in the comparison.',
        'Five tools, one pick, and you still have to combine the outputs by hand — for one player, once. Then the next selection lands and every input has changed.',
        '**This is the honest case for the calculators and against relying on them.** They exist to build intuition for what each factor is worth, so that a recommendation is something you can interrogate rather than something you must trust.',
      ],
    },

    { type: 'prose', h2: 'Which Tool Should I Reach For?',
      body: [
        'Start from the question you are stuck on, not from the tool.',
      ],
      list: [
        '**"Should I take this position now or wait?"** — [scarcity](/tools/scarcity-calculator) first, then [pick horizon](/tools/pick-horizon-calculator). The pair is the whole take-now-or-wait decision.',
        '**"Is this player as good as his rank says?"** — [league value](/tools/league-value-calculator). Rank hides the baseline; the baseline is the answer.',
        '**"Why is everyone taking quarterbacks?"** — [Superflex QB demand](/tools/superflex-qb-demand-calculator), which shows demand as arithmetic rather than fashion.',
        '**"Does my league’s scoring change my board?"** — [PPR value adjustment](/tools/ppr-value-adjustment-calculator), which usually says yes and by more than expected.',
      ],
      after: [
        'The theory behind each number is documented in [the science of draft-state valuation](/draft-science), and the board states where these variables collide are worked through in the [draft scenarios](/scenarios) — [drafting from the turn](/scenarios/drafting-from-the-turn) and [the last player in a tier](/scenarios/last-player-in-a-tier) are the two that most directly exercise these tools.',
      ],
    },

    { type: 'convert', h2: 'Five Variables, Every Player, Every Pick.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**The calculators isolate one input each. GREEN18 combines them, deterministically, for every player still on the board.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What do these fantasy draft calculators compute?', a: 'Five separate inputs to a draft decision: positional scarcity from league size, starting slots, players drafted and pick distance; pick horizon as the number of selections between your turns in a snake draft; the replacement baseline at a position from league size and starting lineup; outstanding starting quarterback demand in a Superflex league; and the points a reception rule adds to a player over a season.' },
    { q: 'Can a calculator tell me which player to draft?', a: 'No. Each calculator isolates a single variable while holding the others fixed, so it can price that variable precisely but cannot resolve a decision that combines several of them. A real pick requires replacement baseline, scarcity, pick horizon, tier structure, roster state and scoring format to be weighed together.' },
    { q: 'Which calculator answers take-now-or-wait?', a: 'The scarcity calculator and the pick horizon calculator together. Scarcity measures how fast quality is leaving the position, and pick horizon measures how long it has to keep leaving before you can act again. Neither is sufficient alone.' },
    { q: 'Are the calculators free to use?', a: 'Yes. The five calculators on this website are free and require no account. They are separate from the GREEN18 iPhone app, which is a one-time US$9.99 purchase on the App Store. The calculators run in the browser, they update as you type, and each one records its inputs in the page URL so a specific case can be shared or referenced.' },
  ],

  links: [
    'tools/scarcity-calculator',
    'tools/pick-horizon-calculator',
    'tools/league-value-calculator',
    'draft-science',
    'scenarios',
  ],
};
