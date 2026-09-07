// PAGE 44 — scenario. Mid-draft question: a quarterback run has started in
// superflex and the manager wants to know whether to join it. Conditional
// framework only; no players, no numbers, no dated facts.
export default {
  slug: 'scenarios/superflex-quarterback-run',
  pageType: 'scenario',
  title: 'A Quarterback Run Just Started in Superflex | GREEN18',
  description: 'A superflex quarterback run has begun. How to tell whether joining it is correct, using replacement quality, pick horizon and the number of starting slots left.',
  breadcrumb: 'Superflex Quarterback Run',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'A Quarterback Run Just Started in Superflex. Do I Join It?',
    lede: [
      'Two or three quarterbacks have gone back to back, the room has noticed, and you are on the clock.',
      'The decision is not about the run. It is about what the run did to the quality of the quarterback you can still get later.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'Joining a superflex quarterback run is correct when the drop in quality between the best quarterback available now and the best one likely to survive until your next pick is larger than the equivalent drop at any other position you could take instead. A run only creates urgency if it is consuming a tier rather than passing through one: if several comparable quarterbacks remain behind the ones just taken, the run has removed names without removing quality, and the correct response is to keep taking value elsewhere. In a superflex league the count that matters is not how many quarterbacks are gone, but how many startable quarterbacks remain relative to the number of quarterback-capable starting slots the league still has to fill.',

  claims: [
    'A run at one position creates urgency only when it consumes a quality tier, not merely when it removes several names from the board.',
    'Superflex formats raise quarterback demand because the league collectively needs close to two startable quarterbacks per team rather than one.',
    'The cost of joining a positional run is the value forgone at every other position where the drop to the next comparable player is shallower.',
    'Distance to a manager’s next selection changes the correct response to a run, because a longer wait raises the probability that the remaining tier is gone.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Just Changed?', body: [
      'Four quantities moved, and only one of them is the number of quarterbacks drafted.',
      '**Replacement quality at quarterback fell** — by however much the players just taken were better than the ones behind them. If the gap is small, almost nothing changed.',
      '**Scarcity became visible to the room.** A run is public information. Other managers now anticipate the same shortage you do, which shortens how long the remaining tier survives.',
      '**Your pick horizon got more expensive.** The same number of picks until your next turn now carries a higher probability that quarterback-capable managers use them on quarterbacks.',
      '**Your roster need did not move at all.** If you already hold the quarterbacks a superflex lineup requires, the run is somebody else’s problem.',
    ], quote: 'A run changes what waiting costs. It does not change who is best.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The common wrong inference is that a run proves the position is scarce and therefore you are behind.',
      'A run is evidence about **behaviour**, not about supply. Managers imitate each other; three quarterbacks going in a row is often three people reacting to the first pick rather than three people independently reading the board. The supply behind those picks is unchanged by the fact they happened consecutively.',
      'The second wrong inference is that the run raises the value of every remaining quarterback equally. It does not. It raises the value of the quarterbacks at the boundary of the tier that is emptying, and leaves the quarterbacks far below that boundary roughly where they were, because their replacements are still plentiful.',
      'The third is that reaching now protects you. Taking a quarterback whose replacement is nearly as good, in order to feel safe, converts a small positional saving into a large loss at whichever position you skipped.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Count startable quarterbacks, not drafted ones.', body: ['Ignore the names that just left. Ask how many quarterbacks remain that you would be content to start every week in this format.'] },
      { h3: 'Measure the drop behind the best one available.', body: ['Compare the best remaining quarterback with the quarterback you would realistically get one full round later. A shallow drop means the run has not reached you yet.'] },
      { h3: 'Do the same measurement at your best alternative position.', body: ['The pick is a comparison, not a verdict on quarterbacks. Whichever position has the steeper drop between now and your next turn is the position under real pressure.'] },
      { h3: 'Weigh the horizon.', body: ['Count the picks until you choose again and how many of those teams still need a quarterback in this format. A long wait in a quarterback-hungry room converts a shallow drop into a deep one.'] },
      { h3: 'Check what your roster already owns.', body: ['A manager who already holds the quarterbacks the format requires gains nothing from the run except the chance to take what everybody else is ignoring.'] },
      { h3: 'Take the steeper drop.', body: ['If quarterback has it, join the run. If it does not, let the run pass and collect the position the room has stopped valuing.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Format.** In a single-quarterback league the same run is far less threatening, because the league needs roughly half as many startable quarterbacks and the tier behind the run usually stretches much further.',
      '**League size.** Larger leagues exhaust every tier faster, so a run in a deep league is more likely to be consuming quality rather than passing through it.',
      '**Your roster.** Holding one strong quarterback already in superflex converts the second one from a necessity into a comparison against your other open slots.',
      '**Distance to your next pick.** Picking again immediately makes almost every run safe to ignore; picking again after a long wrap makes almost every run worth respecting.',
      '**Who is between you and your next turn.** A run is only durable if the teams picking next still need the position.',
    ], after: [
      'The general form of this reasoning is [positional scarcity](/draft-science/positional-scarcity), and the superflex-specific version is [quarterback value in superflex](/draft-science/superflex-quarterback-value).',
    ]},

    { type: 'convert', h2: 'The Run Is Loud. The Math Is Quiet.',
      body: ['GREEN18 recalculates the remaining board after every pick, so the question "is the drop behind this quarterback steeper than the drop behind my alternative" is answered while you are still on the clock.'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Should you join a quarterback run in superflex?', a: 'Joining is correct when the quality gap between the best quarterback available now and the best one likely to survive until the manager’s next pick is larger than the equivalent gap at every other position on the roster. If several comparable quarterbacks remain behind the ones just drafted, the run removed names without removing quality and there is no need to react.' },
    { q: 'Why do quarterback runs happen more often in superflex?', a: 'Superflex leagues allow a quarterback in a flexible starting slot, so the league collectively needs close to two startable quarterbacks per team instead of one. That roughly doubles demand against an unchanged supply, which makes the point where quarterback quality falls off arrive earlier and makes managers more likely to react to each other.' },
    { q: 'Does a positional run prove the position is scarce?', a: 'No. A run is evidence about manager behaviour rather than about remaining supply. Consecutive picks at one position are frequently imitation of the first pick, and the quality of the players still available is unaffected by whether the picks ahead of them happened consecutively or spread out.' },
    { q: 'What matters more, the number of quarterbacks drafted or the quality left?', a: 'The quality left. A draft decision compares a player with his likely replacement, so the count of players already gone matters only insofar as it changed what remains. Ten quarterbacks off the board with a deep tier behind them creates less urgency than three off the board that emptied a tier.' },
  ],

  links: [
    'draft-science/superflex-quarterback-value',
    'draft-science/positional-scarcity',
    'scenarios/quarterbacks-falling-in-superflex',
    'superflex-draft-assistant',
    'live-fantasy-football-draft-assistant',
  ],
};
