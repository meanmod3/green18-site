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
  ],

  blocks: [
    { type: 'prose', h2: 'Why Does Determinism Matter?', body: [
      'Because a recommendation you cannot reproduce is a recommendation you cannot check.',
      'GREEN18 is deterministic. Give it the same league settings and the same sequence of recorded picks and it returns the same board, every time, on every device.',
      'That has a practical consequence: when the board changes, the change is traceable to a change in the inputs. It is never noise, and it is never a different answer to the same question.',
      'Replay a draft and you replay the recommendations exactly.',
    ], quote: 'If you can’t reproduce it, you can’t audit it.' },

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
      body: ['A methodology page is only worth as much as the board it produces.', '**Download GREEN18 for iPhone and see the board recompute after every pick.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player facts from open football data; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Is the GREEN18 model deterministic?', a: 'Yes. Identical league settings and an identical sequence of recorded picks always produce an identical result. Because every recommendation can be reproduced from the board that produced it, a change in the board is always traceable to a change in the inputs rather than to randomness in the model.' },
    { q: 'What data does GREEN18 use?', a: 'GREEN18 uses three inputs: open football data for player, team and schedule facts, with the nflverse open-source community credited under its CC-BY licence; the league configuration the user enters; and the picks the user records during the draft.' },
    { q: 'Does GREEN18 use artificial intelligence or machine learning?', a: 'No. GREEN18 contains no machine-learning model, no language model and no chat interface. Every value the app displays is a named, computed component of a deterministic model rather than generated text.' },
    { q: 'Does GREEN18 train on user data?', a: 'No. Leagues, drafts, preferences and archived drafts are stored only on the user’s iPhone and are never uploaded, so there is no user data available to train anything with.' },
    { q: 'Can GREEN18 predict injuries or forecast the season?', a: 'No. GREEN18 does not predict injuries and does not forecast season outcomes. Its scope is the value of the players still available in the draft in front of the user, and it guarantees no result.' },
    { q: 'Do a user’s preferences affect other users or the objective values?', a: 'No. Preferences affect only that user’s own personal ranking. The objective values the model computes for the market are not moved by any user’s preferences, and the two are shown side by side rather than merged.' },
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
