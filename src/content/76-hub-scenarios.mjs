// PAGE 76 — SECTION HUB for /scenarios. Must explain WHY these pages are written as
// conditions rather than commands, and group all 20 by the decision they turn on.
export default {
  slug: 'scenarios',
  pageType: 'science',
  title: 'Fantasy Draft Scenarios | GREEN18',
  description: 'Twenty in-draft situations answered as conditions, not commands: runs, roster state, draft position and the endgame, each with the variable that decides it.',
  breadcrumb: 'Scenarios',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenarios',
    h1: 'Fantasy Draft Scenarios: What To Do When The Board Moves',
    lede: [
      'A draft goes wrong in a small number of recognisable ways. These are those ways.',
      'Each page answers one situation with a condition — what has to be true for each option to be right — because the same board rewards different picks for different managers.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'A fantasy draft scenario is a specific board state — a positional run, a player falling, a roster imbalance, a long gap until your next pick — that changes what your remaining players are worth without changing anything about the players themselves. Each scenario page in this section names the situation, identifies the one or two variables that actually decide it, and states the answer as a condition rather than an instruction, because the correct response depends on league size, scoring format, roster already built and distance to the next selection, all of which differ between managers looking at the same board.',

  claims: [
    'A positional run transfers value to the players still available at that position and away from equivalent players at deeper positions.',
    'The correct response to a draft situation depends on league format, roster state and distance to the next pick, which is why a single universal instruction cannot be right for every manager facing it.',
    'Scenario advice written as a command hides the variable that actually decides the pick, whereas advice written as a condition exposes it.',
    'A player falling past his usual selection point creates real value only when the cause is market drift rather than information the manager does not have.',
    'Roster construction changes the value of every remaining player, because unfilled starting slots carry demand that filled slots no longer do.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Are These Pages?',
      body: [
        'Conditional decision frameworks for specific in-draft situations — one page per situation, each built around the variable that decides it.',
        'They are not a strategy guide read before the draft. They are written for the ninety seconds when something has already happened: five running backs have gone, the tight end you wrote off has fallen to you, you are on the clock with no quarterback and two rounds left.',
        'Every page follows the same shape. What just happened, what it actually changed on the board, the condition under which each response is correct, and what the situation looks like from the other draft slots.',
      ],
    },

    { type: 'prose', h2: 'Why Conditions Instead of Commands?',
      body: [
        'Because a command is only ever correct for one manager, and it never says which one.',
        '"Take a running back after the run" is either good advice or bad advice depending on your league size, your scoring format, how many starting slots you have already filled, and how many picks stand between you and your next turn. An instruction that does not mention those things has not simplified the decision — it has concealed it, and left you no way to tell whether it applies to you.',
        'A condition does the opposite. "**Take the position now if the drop to the next tier is larger than the drop you will face at your other open slot, and your next pick is more than a round away**" is longer, and it can be checked. You can look at the board and see whether it is true. When it is false, you also know exactly which of your inputs made it false.',
        'This is the same reason [rankings change during a draft](/why-fantasy-rankings-change-during-a-draft): fixed advice and fixed rankings fail for the same structural reason, which is that they were computed before the information that decides them existed.',
      ],
    },

    { type: 'prose', h2: 'When a Position Runs: What Do Consecutive Picks at One Position Change?',
      body: [
        'They compress the tier behind the run, which raises the price of everyone left at that position and lowers the urgency everywhere else.',
        'A run is the clearest case of value moving without a projection moving. These four pages cover the runs that actually happen and the fall that follows one.',
      ],
      list: [
        '[Five running backs go in a row](/scenarios/five-running-backs-go-in-a-row) — whether to join a run or let it price you out.',
        '[A Superflex quarterback run](/scenarios/superflex-quarterback-run) — the run with the sharpest cliff behind it, because demand is structural.',
        '[Quarterbacks falling in Superflex](/scenarios/quarterbacks-falling-in-superflex) — what it means when the run does not start on schedule.',
        '[An elite tight end falls](/scenarios/elite-tight-end-falls) — a positional cliff arriving early rather than a bargain arriving late.',
        '[A player falls past his expected draft position](/scenarios/a-player-falls-past-his-expected-draft-position) — separating market drift from information you do not have.',
        '[The last player in a tier](/scenarios/last-player-in-a-tier) — the single most reliably mispriced pick in a draft.',
      ],
    },

    { type: 'prose', h2: 'When Your Roster Decides It: What If the Board and My Team Disagree?',
      body: [
        'Your unfilled starting slots carry the demand, so the best player available and the most valuable player available stop being the same player once your roster is lopsided.',
        'These pages handle the situations where the answer is on your roster rather than on the board.',
      ],
      list: [
        '[Best player available versus roster need](/scenarios/best-player-available-vs-roster-need) — the conflict every other page in this group is a special case of.',
        '[Already have two wide receivers](/scenarios/already-have-two-wide-receivers) — when a filled position is still the right pick.',
        '[Choosing between two similar players](/scenarios/choosing-between-two-similar-players) — what breaks a tie once value does not.',
        '[Drafting a backup for your own running back](/scenarios/drafting-a-backup-for-your-own-running-back) — insurance priced against an independent contributor.',
        '[Two starters share a bye week](/scenarios/two-starters-share-a-bye-week) — a scheduling constraint, and how little it should move a pick.',
        '[A rookie or a proven veteran](/scenarios/a-rookie-or-a-proven-veteran) — deciding under a wider distribution rather than a lower one.',
      ],
    },

    { type: 'prose', h2: 'When Your Slot Decides It: Does My Draft Position Change the Answer?',
      body: [
        'Yes, and mostly through one variable: how many picks separate your turns.',
        'Draft slot is the reason two managers can watch the same run and be correct to respond differently. These pages are about the structural position you drafted from, not about the players in front of you.',
      ],
      list: [
        '[Pick three versus pick ten](/scenarios/pick-three-vs-pick-ten) — the same board, two different correct openings.',
        '[Drafting from the turn](/scenarios/drafting-from-the-turn) — the longest gap in a snake draft, immediately followed by the shortest.',
        '[An RB-zero start](/scenarios/rb-zero-start) — a plan that is a bet on replacement level, not on running backs.',
        '[Waiting on a quarterback](/scenarios/waiting-on-quarterback) — the wait that is usually right, and the format in which it is not.',
        '[You missed your pick](/scenarios/you-missed-your-pick) — recovering when the board moved without you.',
      ],
    },

    { type: 'prose', h2: 'The Endgame: What Should the Last Rounds Be For?',
      body: [
        'Filling the slots whose in-season replacement cost is high, and nothing else.',
        'Late rounds are where drafts are most often wasted, because the picks feel low-stakes and are therefore made without a criterion.',
      ],
      list: [
        '[How to use the final rounds](/scenarios/how-to-use-the-final-rounds) — the criterion that makes a late pick worth its roster spot.',
        '[Still no tight end in the late rounds](/scenarios/still-no-tight-end-in-the-late-rounds) — when a position can be left to the waiver wire.',
        '[When to draft a kicker and defense](/scenarios/when-to-draft-a-kicker-and-defense) — positions whose replacement cost during the season is near zero.',
      ],
    },

    { type: 'prose', h2: 'What Sits Underneath Every Scenario?',
      body: [
        'One model, applied to twenty board states.',
        'Every page here is an instance of the same valuation described in [the science of draft-state valuation](/draft-science). Runs are [positional scarcity](/draft-science/positional-scarcity) moving fast; falls are [tier collapse](/draft-science/player-tier-collapse) arriving at a different pick than expected; roster conflicts are [roster construction](/draft-science/roster-construction) re-weighting demand; draft-slot questions are [pick horizon](/draft-science/pick-horizon) under another name.',
        'If you want to put numbers on the variable a scenario turns on, the [draft calculators](/tools) isolate them one at a time — [pick horizon](/tools/pick-horizon-calculator) and [scarcity](/tools/scarcity-calculator) are the two most scenarios reduce to.',
      ],
    },

    { type: 'convert', h2: 'The Board Moves Faster Than You Can Read.',
      body: [
        'GREEN18 is an iPhone fantasy football live draft assistant that continuously recalculates player valuations according to league settings, roster construction, player availability, draft state, and user preferences.',
        '**These pages teach you the conditions. GREEN18 evaluates them while the pick is still yours.**',
      ],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'What is a fantasy draft scenario?', a: 'A fantasy draft scenario is a specific board state — a positional run, a player falling, a roster imbalance, or a long gap until your next pick — that changes what the remaining players are worth without changing anything about the players themselves.' },
    { q: 'Why is scenario advice written as a condition rather than an instruction?', a: 'Because the correct response depends on league size, scoring format, the roster already built and the distance to the next pick. An instruction that omits those inputs conceals the variable that decides the pick, while a condition exposes it and can be checked against the actual board.' },
    { q: 'What does a positional run actually change?', a: 'A positional run compresses the quality remaining at that position, so it transfers value to the players still available there and away from equivalent players at deeper positions. No projection changes; the cost of replacement does.' },
    { q: 'Do two managers in the same draft face the same scenario?', a: 'No. Two managers watching an identical run can be correct to respond differently, because their rosters, their scoring format and the number of picks until their next turn differ. Draft slot alone changes how long any player has to survive before they can take him.' },
  ],

  links: [
    'draft-science',
    'scenarios/five-running-backs-go-in-a-row',
    'scenarios/last-player-in-a-tier',
    'scenarios/drafting-from-the-turn',
    'why-fantasy-rankings-change-during-a-draft',
  ],
};
