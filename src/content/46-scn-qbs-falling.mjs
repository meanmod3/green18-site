// PAGE 46 — scenario. The inverse of page 44: in a superflex league the
// quarterbacks are NOT going, and the manager wants to know whether that is an
// opportunity or a warning. Distinguishes market signal from board reality.
export default {
  slug: 'scenarios/quarterbacks-falling-in-superflex',
  pageType: 'scenario',
  title: 'Quarterbacks Are Falling in My Superflex Draft | GREEN18',
  description: 'Nobody in your superflex league is drafting quarterbacks. How to tell whether the room is misvaluing the position, and when to be the manager who corrects it.',
  breadcrumb: 'Quarterbacks Falling',
  dateModified: '2026-09-07',

  hero: {
    eyebrow: 'Draft Scenario',
    h1: 'Nobody Is Drafting Quarterbacks in My Superflex League.',
    lede: [
      'The format says the position should be going early. The room is ignoring it.',
      'A price below expectation is information about the buyers, not about the player — and in a draft, the buyers are the ones you have to pick around.',
    ],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  answer: 'When quarterbacks fall past their expected draft position in a superflex league, the discount is real but temporary, and its size is set by how many quarterback-capable starting slots the league has left to fill rather than by how far the players have slipped. Superflex demand does not disappear when it is deferred; it accumulates. The correct response is therefore to take the fall only when the quarterback available now is better than the quarterback you would need to reach for once the room corrects, and to keep taking value elsewhere while the discount persists — accepting that being the manager who corrects first means paying a price nobody else has paid yet.',

  claims: [
    'Deferred positional demand in a draft accumulates rather than disappearing, because every team must still fill its starting requirements before the draft ends.',
    'A player falling below his expected draft position is evidence about how the room is behaving, not evidence that his production has changed.',
    'Superflex leagues cannot leave quarterbacks undrafted indefinitely, because the format creates roughly two quarterback-capable starting slots per team.',
    'The manager who corrects a market first captures the discount and also absorbs the cost of no longer being able to wait.',
  ],

  blocks: [
    { type: 'prose', h2: 'What Just Changed?', body: [
      '**The price fell, and the supply did not.** Every quarterback still on the board is exactly as good as before; you can simply acquire one for a later pick than expected.',
      '**Latent demand grew.** Each round that passes without quarterbacks going leaves the same number of starting slots to fill from a shrinking number of remaining picks. Pressure is being stored, not released.',
      '**Your pick horizon became less reliable.** A market that is mispricing a position tends to correct suddenly rather than gradually, so the assumption "one of these will still be here next round" is weaker than the current pace suggests.',
      '**Nothing about your roster changed.** The fall is an opportunity only in proportion to how much your lineup still needs the position.',
    ], quote: 'Deferred demand does not vanish. It queues.' },

    { type: 'prose', h2: 'What It Does Not Mean.', body: [
      'The wrong inference is that the room has discovered something you have not, and that quarterbacks must therefore be worth less in this league than the format implies. Starting requirements are written down. They do not change because managers are slow to act on them.',
      'The opposite wrong inference is just as costly: that a fall automatically makes the player the correct pick. A discount only matters if the thing being discounted is something you need. Taking a falling quarterback when you already hold the quarterbacks the format requires converts a bargain into a bench player.',
      'A third mistake is treating the fall as durable. Markets inside a draft correct in bursts, usually when one manager acts and several others reprice at once. Planning three more rounds of quarterback patience on the evidence of two quiet rounds is planning on the room continuing to be wrong.',
      'And a fourth: assuming the fall is uniform. Often only the middle of the position is falling while the top has already been taken, which means the discount exists exactly where the replacements were plentiful anyway.',
    ]},

    { type: 'steps', h2: 'How to Decide, in Order', steps: [
      { h3: 'Count unfilled quarterback-capable slots league-wide.', body: ['Multiply the teams by the quarterback-eligible starting spots the format allows, subtract what has been drafted, and you have the demand that must still be served.'] },
      { h3: 'Compare that number with the startable supply.', body: ['If remaining demand exceeds the number of quarterbacks you would be willing to start, the fall is a mispricing and it will end.'] },
      { h3: 'Ask what your own lineup still requires.', body: ['A discount is only worth capturing at a position you are obliged to fill. Otherwise it is somebody else’s bargain.'] },
      { h3: 'Estimate how long the discount survives.', body: ['Look at the teams picking before your next turn. One of them acting is usually enough to end the fall for everybody behind them.'] },
      { h3: 'Price the correction, not the fall.', body: ['Compare the quarterback available now with the quarterback you would realistically have to settle for after a correction — not with the one who was taken three rounds ago.'] },
      { h3: 'Act when the two prices cross.', body: ['Keep taking value elsewhere while the post-correction quarterback is still acceptable. Take the fall the moment it is not.'] },
    ]},

    { type: 'prose', h2: 'What Changes the Answer?', body: [
      '**Format.** In a single-quarterback league a quarterback fall is much weaker evidence of mispricing, because total demand is roughly halved and the position genuinely can be deferred a long way.',
      '**League size.** More teams means more unfilled slots chasing the same supply, which shortens how long any positional discount can last.',
      '**Roster and bench depth.** Deep benches let managers hoard the position once they notice, which makes the correction sharper when it comes.',
      '**Your position in the order.** From the turn you can often let one more round pass and still take two; from the middle of a round you get one shot per correction.',
      '**Who is between you and your next pick.** A fall persists only while the teams on the clock are the ones ignoring the position.',
    ], after: [
      'For why a board price and a player’s value to you are different quantities, see [draft-state valuation](/draft-science/draft-state-valuation) and [dynamic ADP](/dynamic-fantasy-football-adp).',
    ]},

    { type: 'convert', h2: 'A Discount Is Only a Discount If You Need It.',
      body: ['GREEN18 values every remaining quarterback against your roster, your format and your next pick, so a fall shows up as a number rather than as a feeling that you might be missing out.', '**Download GREEN18 for iPhone and price the correction before it happens.**'],
      label: 'Download GREEN18', sub: 'Available for iPhone. Player data from open football sources; nflverse credited under CC-BY.' },
  ],

  faq: [
    { q: 'Why do quarterbacks sometimes fall in a superflex draft?', a: 'Because managers carry habits formed in single-quarterback leagues, where the position can be deferred safely. Those habits produce a room in which nobody wants to be first, so the position slips below the level the format implies until one manager acts and several others reprice at the same time.' },
    { q: 'Should you draft a falling quarterback in superflex?', a: 'Take the fall when the quarterback available now is better than the one you would have to settle for after the market corrects, and when the format still obliges you to fill the slot. A discount at a position already covered on the roster is not a saving, because the player will not start.' },
    { q: 'Does deferred demand for a position disappear?', a: 'No. Every team must fill its starting requirements before the draft ends, so demand that is not exercised in one round is still present in later rounds. A position that is being ignored is accumulating pressure that is usually released suddenly rather than gradually.' },
    { q: 'How long does a positional discount last inside a draft?', a: 'Usually until one manager acts on it. Drafts correct in bursts because a single pick makes the mispricing visible to everyone still to choose, so a fall that has lasted two quiet rounds is not evidence it will last a third.' },
  ],

  links: [
    'draft-science/superflex-quarterback-value',
    'draft-science/draft-state-valuation',
    'scenarios/waiting-on-quarterback',
    'superflex-draft-assistant',
    'dynamic-fantasy-football-adp',
  ],
};
