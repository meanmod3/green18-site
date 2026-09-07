// PAGE 55 — institutional methodology page. Earns trust by disclosing limits,
// not by asserting quality. Inputs, determinism, the objective/personal split,
// and an explicit list of what the model does not do.
export default {
  slug: 'methodology',
  pageType: 'science',
  title: 'GREEN18 Methodology | Inputs, Determinism and Limits',
  description: 'How GREEN18 arrives at a number: open football data, your league settings and your recorded picks, computed deterministically — and what the model cannot do.',
  breadcrumb: 'Methodology',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Methodology',
    h1: 'GREEN18 Methodology',
    lede: [
      'This page describes how GREEN18 arrives at a number, what goes into it, and — just as importantly — what it cannot tell you.',
      'The model is **deterministic**: identical league settings and an identical sequence of recorded picks always produce an identical result.',
      'A page that only listed strengths would be marketing. The limits are stated here in the same detail as the method.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
    secondary: { label: 'Honest Limits', href: '#limits' },
  },

  answer: 'GREEN18 computes a player’s situational draft value deterministically from three inputs: open football data for player facts, the league configuration the user enters, and the picks the user records during the draft. Identical league settings and an identical sequence of recorded picks always produce an identical result, so any recommendation can be reproduced from the board that produced it. The model does not predict injuries, forecast season outcomes, guarantee results, or use any machine-learning or language model.',

  claims: [
    'A deterministic draft model produces the same recommendation every time it is given the same league settings and the same sequence of recorded picks, which makes each recommendation reproducible and therefore checkable.',
    'A draft recommendation that cannot be reproduced from the board that produced it cannot be audited, because there is no way to distinguish a change in the inputs from variation in the model itself.',
    'GREEN18 derives player facts from open football data, including the nflverse open-source community credited under its CC-BY licence, combined with the league configuration and the draft picks entered by the user.',
    'Subjective user preferences in GREEN18 are confined to the individual user’s own personal ranking and never alter the objective values the model computes for the market.',
    'Draft picks are recorded by the user rather than imported, because GREEN18 has no connection to any fantasy platform and cannot read a draft in progress from an external service.',
    'GREEN18 contains no machine-learning model, no language model and no chat interface, so every displayed value is a named computed component rather than generated prose.',
    'Predicting injuries and forecasting full-season outcomes are outside what GREEN18 attempts, and no result the model produces is a guarantee of fantasy performance.',
    'Every contribution to a GREEN18 player score is a named component with an identified owner, a correlation group and its own explicit bound, so no part of a score is a free-floating weight.',
    'GREEN18 registers every top-level field of every shipped data bundle against the licence it came from, and an unapproved source fails the build rather than shipping quietly.',
    'The baseline value signal in GREEN18 is derived from realized regular-season fantasy production rather than from a forecast of future production.',
    'Season-varying player facts such as team, roster status, retirement and bye week are overlaid onto the realized production record without altering that record.',
    'Determinism in GREEN18 is a repaired property rather than an aspiration: a real ordering defect was found, fixed by pinning an explicit sort order, and held in place by a regression test.',
    'A league-format effect is reported as moving the draft board only when the measured median displacement across the player population exceeds one full draft slot.',
  ],

  blocks: [
    { type: 'prose', h2: 'Why Does Determinism Matter?', body: [
      'Because a recommendation you cannot reproduce is a recommendation you cannot check.',
      'GREEN18 is deterministic. Give it the same league settings and the same sequence of recorded picks and it returns the same board, every time, on every device.',
      'That has a practical consequence: when the board changes, the change is traceable to a change in the inputs. It is never noise, and it is never a different answer to the same question.',
      'Replay a draft and you replay the recommendations exactly.',
    ], quote: 'If you can’t reproduce it, you can’t audit it.' },

    { type: 'prose', h2: 'What Is a Score Actually Made Of?', body: [
      'Named parts, each one bounded.',
      'A GREEN18 player score is not a single opaque number arrived at by mixing weights. Every contribution to it is a discrete component that carries three things: an owner — the part of the model entitled to produce it — a correlation group, so that components measuring the same underlying effect cannot silently stack, and its own explicit bound on how far it is allowed to move the score.',
      'Nothing in the score is a free-floating weight, and nothing can quietly dominate it. The components themselves are listed on [how GREEN18 values a player](/how-green18-ranks-fantasy-players); the specific weighting of them stays proprietary.',
    ]},

    { type: 'prose', h2: 'Is Determinism Real, or Just Claimed?', body: [
      'It is real because it was broken once and then repaired.',
      'During development the draft store was found to produce a result that depended on the iteration order of an internal dictionary — the kind of defect that shows up as a board that is subtly different on a replay and identical almost every other time.',
      'The fix was not a note in a document. The ordering was pinned explicitly — ascending live draft position, with the player identifier breaking ties — and a regression test now fails if that ordering is ever removed.',
      'That is the honest version of the claim: determinism here is a property that was tested for, found missing, restored, and is now held in place mechanically.',
    ], quote: 'A property nothing tests for is a property you do not have.' },

    { type: 'steps', h2: 'What Goes In, and In What Order', steps: [
      { h3: '1. Open football data.', body: ['Player, team and schedule facts come from open football data. The nflverse open-source community is credited under its CC-BY licence, and attribution is shown in the app under Settings → Data sources. A hard allowlist rejects unapproved sources when the app is built.'] },
      { h3: '2. Your league configuration.', body: ['Scoring rules, league size, roster and flex requirements, quarterback format and draft position are applied to the player pool before any board is built. Settings re-rank players; they do not merely relabel them.'] },
      { h3: '3. The picks you record.', body: ['Each pick you enter changes the value of everyone still available — driven by how quickly a position is coming off the board and what the teams picking before your next turn still need.'] },
      { h3: '4. Survival to your next pick.', body: ['The model estimates each remaining player’s chance of still being available when you pick again, given the picks that sit between now and then.'] },
      { h3: '5. Take now or wait.', body: ['Value and survival combine into the decision that is actually in front of you on the clock: take this player now, or come back for someone comparable later.'] },
    ]},

    { type: 'prose', h2: 'Where Do the Numbers Come From?', body: [
      'Three inputs, and only three.',
    ],
      list: [
        '**Open football data** for player facts — nflverse credited under CC-BY.',
        '**Your league configuration** — the scoring, size, roster and draft order you enter.',
        '**Your recorded picks** — the draft as it actually unfolds in front of you.',
      ],
      after: [
        'GREEN18 does not license a third-party draft-position feed and does not ship one.',
        'Nothing else gets in. If a fact is not in an approved source or in what you entered, the model does not have it.',
      ] },

    { type: 'prose', h2: 'How Is the Data Provenance Enforced?', body: [
      'Field by field, and the build fails rather than the app shipping.',
      'Every top-level field of every data bundle shipped inside GREEN18 is registered against the licence it came from. It is not a bundle-level assertion that a file is fine; it is a per-field record of where that field is entitled to come from.',
      'Alongside it, a byte-level scan runs over the shipped data looking for markers of datasets that are not approved for use. If an unapproved source ever reaches the bundle, the build fails.',
      'The failure mode matters more than the mechanism. A provenance check that merely warns lets an unlicensed field ship on a busy day. This one is fail-closed: the release does not happen.',
    ]},

    { type: 'prose', h2: 'Is the Baseline Value a Projection?', body: [
      'No. It is realized production.',
      'The value signal each player enters the pipeline with is derived from what actually happened on the field in the most recently completed regular season, not from a forecast of what a player is expected to do next.',
      'Facts that genuinely change between seasons — team, roster status, retirement, rookie status, bye week — are overlaid on top from current roster data. The overlay updates who a player is and where he plays. It does not touch the production record underneath.',
      'That split is deliberate. It means the number is auditable against a season that already exists, and that no season forecast is smuggled in under the name of a baseline.',
    ]},

    { type: 'prose', h2: 'Why Do You Record Picks by Hand?', body: [
      'Because the app has no connection to any fantasy platform.',
      'There is no sync, no import and no login to an external service, so the only way the model learns what has been taken is that you tell it.',
      'That is a real cost — you tap picks in — and it buys two things. The app works in a draft with no online platform at all, and it never needs an account, a credential, or permission to read anything of yours.',
    ]},

    { type: 'prose', h2: 'Do Your Preferences Change the Objective Values?', body: [
      'No, and this is an architectural property rather than a stylistic promise.',
      'The values the model computes for the market are not moved by any user’s preferences. Preferences affect only that user’s own personal ranking, which is displayed alongside the objective values.',
      'So you see both columns at once: what the board computes, and what you think.',
      'A tool that folds your bias into its "objective" number is telling you what you already believe, in the voice of a machine that supposedly disagrees with you.',
      'This is the same separation described on [personalized rankings](/personalized-fantasy-football-rankings).',
    ]},

    { type: 'prose', h2: 'When Does a League Setting Actually Move the Board?', body: [
      'Only when it can be measured moving it.',
      'It is easy to claim that a format setting re-ranks players, and hard to show it. GREEN18 holds itself to a falsifiable line: every format axis is measured, position by position, across the real player population, and the effect is reported as **not** moving the board unless the median player is displaced by more than one full draft slot.',
      'A median displacement below one slot is a difference you could never act on at the table, however elegant the underlying mathematics. It is reported as no effect.',
      'The line is published; the measured figures are not, because they move with the player data and a number quoted out of date is worse than no number. What is fixed is the standard the effect has to clear.',
    ], quote: 'Below one draft slot is not an effect. It is arithmetic you cannot use.' },

    { type: 'prose', h2: 'Is the Model Tested Against Anything?', body: [
      'Yes — against itself, stripped down.',
      'GREEN18 carries a leakage-safe backtest harness with a set of deliberately simpler comparators: baselines that have parts of the model removed, so a component has to earn its place against the version of the model that does without it.',
      'No result from that harness is published here, and no accuracy or superiority claim is made anywhere on this site. Its existence is a methodological fact — that the model is evaluated against ablated baselines rather than only against intuition — and that is the whole of the claim.',
    ]},

    { type: 'prose', h2: 'What GREEN18 Does Not Do.', id: 'limits', body: [
      'Every one of these is a real boundary, not a modesty gesture.',
    ],
      list: [
        '**No injury prediction.** The model does not forecast who will get hurt, or when.',
        '**No season forecasting.** It values a draft board, not a season outcome.',
        '**No guarantees.** No recommendation is a promise about fantasy performance.',
        '**No AI or machine learning.** There is no model that was trained, tuned or fine-tuned on anything.',
        '**No chat interface.** There is nothing to converse with; the components are named and shown, not written.',
        '**No training on user data.** Your leagues, drafts and preferences never leave your iPhone, so they cannot be used to train anything.',
        '**No platform connection.** No sync, no import, no reading of a draft from an external service.',
        '**No auto-drafting.** The model never makes a pick for you.',
      ],
      after: [
        'The last four are enforced by the way the app is built, not by policy: there is no networking path that uploads anything, and no account under which anything of yours could be stored. See the [privacy policy](/privacy) for the full accounting.',
      ] },

    { type: 'prose', h2: 'How Do Recommendations Get Checked?', body: [
      'By replay.',
      'Because the model is deterministic, any board can be rebuilt from the league settings and the pick sequence that produced it. A recommendation that looks wrong can be examined against the exact state it was made in.',
      'The step-by-step pipeline, with the components named individually, is on [how GREEN18 values a player](/how-green18-ranks-fantasy-players) and in more depth on [how the draft model works](/fantasy-football-draft-algorithm).',
    ]},

    { type: 'convert', h2: 'Watch the Method Run.',
      body: ['A methodology page is only worth as much as the board it produces.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player facts from open football data; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is the GREEN18 model deterministic?', a: 'Yes. Identical league settings and an identical sequence of recorded picks always produce an identical result. Because every recommendation can be reproduced from the board that produced it, a change in the board is always traceable to a change in the inputs rather than to randomness in the model.' },
    { q: 'What data does GREEN18 use?', a: 'GREEN18 uses three inputs: open football data for player, team and schedule facts, with the nflverse open-source community credited under its CC-BY licence; the league configuration the user enters; and the picks the user records during the draft.' },
    { q: 'Does GREEN18 use artificial intelligence or machine learning?', a: 'No. GREEN18 contains no machine-learning model, no language model and no chat interface. Every value the app displays is a named, computed component of a deterministic model rather than generated text.' },
    { q: 'Does GREEN18 train on user data?', a: 'No. Leagues, drafts, preferences and archived drafts are stored only on the user’s iPhone and are never uploaded, so there is no user data available to train anything with.' },
    { q: 'Can GREEN18 predict injuries or forecast the season?', a: 'No. GREEN18 does not predict injuries and does not forecast season outcomes. Its scope is the value of the players still available in the draft in front of the user, and it guarantees no result.' },
    { q: 'Do a user’s preferences affect other users or the objective values?', a: 'No. Preferences affect only that user’s own personal ranking. The objective values the model computes for the market are not moved by any user’s preferences, and the two are shown side by side rather than merged.' },
    { q: 'Is the baseline player value in GREEN18 a projection?', a: 'No. The baseline value signal is derived from realized regular-season fantasy production rather than from a forecast. Season-varying facts such as team, roster status, retirement, rookie status and bye week are overlaid from current roster data without altering the underlying production record.' },
    { q: 'How does GREEN18 control where its data comes from?', a: 'Every top-level field of every shipped data bundle is registered against the licence it came from, and a byte-level scan checks the shipped data for markers of datasets that are not approved. The check is fail-closed: an unapproved source fails the build rather than shipping quietly.' },
    { q: 'What is inside a GREEN18 player score?', a: 'Named components. Every contribution to a score has an identified owner, a correlation group so that components measuring the same effect cannot stack silently, and its own explicit bound on how far it may move the score. No part of a score is a free-floating weight.' },
    { q: 'When does GREEN18 treat a league setting as actually changing the board?', a: 'Only when the effect is measured, position by position, across the real player population and the median player is displaced by more than one full draft slot. A median displacement below one slot is reported as not moving the board, however elegant the underlying mathematics.' },
    { q: 'Why does GREEN18 require picks to be entered manually?', a: 'GREEN18 has no connection to any fantasy platform, so it cannot import or sync a draft in progress. Picks are recorded by the user, which is also why the app works in a draft that has no online platform behind it at all.' },
  ],

  links: [
    'how-green18-ranks-fantasy-players',
    'fantasy-football-draft-algorithm',
    'personalized-fantasy-football-rankings',
    'privacy',
    'about',
  ],

  disclaimer: 'GREEN18 is published by Interplore and is not affiliated with, endorsed by or sponsored by the NFL, the NFL Players Association, any NFL club or any fantasy platform.',
};
