// GREEN18 calculator maths — the SINGLE source of truth.
//
// Imported by the browser (assets/tools.js) AND by the build (src/build.mjs),
// which renders each calculator's default case from these same functions. The
// server-rendered explanation therefore cannot drift from the interactive one:
// a hand-written default did drift, and shipped a wrong pick count into the
// indexable copy, which is exactly the text an AI would quote.
//
// Plain arithmetic. No data fetching, no analytics, no hidden coefficients.

const n = function (v) { return parseFloat(v) || 0; };
const plural = function (c, s, p) { return c === 1 ? '1 ' + s : c + ' ' + (p || s + 's'); };

// Picks between your current selection and your next one in a snake draft.
export function picksUntilNext(teams, pick) {
  var round = Math.ceil(pick / teams);
  var slot = pick - (round - 1) * teams;              // 1..teams
  var fromEnd = teams - slot + 1;
  // Snake: the gap alternates between 2*fromEnd-1 and 2*slot-1.
  return (round % 2 === 1) ? (2 * fromEnd - 1) : (2 * slot - 1);
}

export const CALCS = {
  scarcity: function (f) {
    var teams = n(f.teams), gone = n(f.gone), pick = n(f.pick);
    var starters = n(f.starters);                     // starting slots per team
    var gap = picksUntilNext(teams, pick) - 1;        // players drafted BEFORE your next turn
    var demand = teams * starters;                    // league-wide starting demand
    var outstanding = Math.max(0, demand - gone);
    // Share of the remaining league-wide need likely met before your next turn.
    var rate = demand > 0 ? outstanding / Math.max(demand, 1) : 0;
    var expected = Math.round(gap * (outstanding / Math.max(teams * 3, 1)) * 10) / 10;
    var verdict, why;
    if (outstanding <= 0) {
      verdict = 'LOW';
      why = 'Every team that needs a starter at this position already has one. '
          + 'Waiting costs little, because the league has no structural reason to keep drafting it.';
    } else if (expected >= 2 || rate > 0.6) {
      verdict = 'HIGH';
      why = 'There are ' + plural(gap, 'pick') + ' before your next turn, and roughly '
          + plural(Math.max(0, Math.round(outstanding)), 'starting slot')
          + ' still unfilled across the league. Expect meaningful movement at this position before you choose again, '
          + 'so the cost of waiting is the difference between the player available now and a materially worse replacement.';
    } else if (expected >= 0.8) {
      verdict = 'MODERATE';
      why = 'With ' + plural(gap, 'pick') + ' until your next turn, some movement at this position is likely, '
          + 'but not enough to assume the tier empties. The decision turns on whether the player in front of you '
          + 'is meaningfully better than the one you expect to survive.';
    } else {
      verdict = 'LOW';
      why = 'Only ' + plural(gap, 'pick') + ' separate you from your next turn and league-wide demand is largely met, '
          + 'so a comparable player is likely to still be there. Spending this pick elsewhere is the cheaper option.';
    }
    return { verdict: 'Scarcity: ' + verdict, why: why };
  },

  horizon: function (f) {
    var teams = n(f.teams), pick = n(f.pick);
    // picksUntilNext returns the OFFSET to your next pick; the number of
    // players drafted in between is one fewer. Conflating the two shipped a
    // wrong count into indexable copy once already.
    var gap = picksUntilNext(teams, pick);
    var between = gap - 1;
    var round = Math.ceil(pick / teams);
    var slot = pick - (round - 1) * teams;
    var why = 'You are picking at slot ' + slot + ' of ' + teams + ' in round ' + round + ', '
      + 'so your next selection is overall pick ' + (pick + gap) + '. '
      + plural(between, 'player') + ' will come off the board before you choose again. '
      + (between >= teams
          ? 'That is a full round or more of exposure, which is the situation where taking a scarce position early is most often correct: '
            + 'anything you are hoping will survive has to survive a long time.'
          : 'That is a short gap, which favours taking the best value now and letting positional need resolve on your next turn, '
            + 'because fewer alternatives can disappear in the meantime.');
    return { verdict: plural(between, 'player') + ' come off the board before your next pick', why: why };
  },

  replacement: function (f) {
    var teams = n(f.teams), starters = n(f.starters), flex = n(f.flex);
    var baseline = teams * starters;
    var withFlex = baseline + Math.round(teams * flex * 0.5);
    var why = 'In a ' + teams + '-team league starting ' + plural(starters, 'player') + ' at this position, '
      + 'roughly the ' + baseline + 'th-best player at the position is the last one guaranteed a starting job. '
      + (flex > 0
          ? 'Flex slots push real demand deeper — call it around ' + withFlex + ' — because flex-eligible players compete across positions. '
          : '')
      + 'Players drafted above that line are worth the gap between them and that baseline, not their raw projection. '
      + 'A player who beats the baseline by a wide margin is worth more than a higher-projected player at a position whose baseline is nearly as good.';
    return { verdict: 'Replacement baseline: about the ' + (flex > 0 ? withFlex : baseline) + 'th player at the position', why: why };
  },

  qbdemand: function (f) {
    var teams = n(f.teams), superflex = f.superflex === '1', gone = n(f.gone);
    var slots = teams * (superflex ? 2 : 1);
    var remaining = Math.max(0, slots - gone);
    var why = superflex
      ? 'A ' + teams + '-team Superflex league can start up to ' + slots + ' quarterbacks. '
        + 'With ' + gone + ' already drafted, about ' + remaining + ' starting slots remain. '
        + 'Superflex demand routinely exceeds the number of quarterbacks who are clearly better than a replacement-level one, '
        + 'which is why the position re-prices structurally rather than cosmetically: the last viable starter is worth far more than his overall rank suggests.'
      : 'A ' + teams + '-team league starting one quarterback needs ' + slots + ' of them. '
        + 'With ' + gone + ' gone, about ' + remaining + ' starting jobs remain. '
        + 'In a single-quarterback league, supply usually exceeds demand, so the gap between the best available quarterback '
        + 'and the one still there several rounds later is normally smaller than the gap at other positions.';
    return { verdict: remaining + ' of ' + slots + ' starting quarterback slots unfilled', why: why };
  },

  ppr: function (f) {
    var perRec = n(f.perRec), rec = n(f.rec), comp = n(f.comp);
    var added = Math.round(perRec * rec * 10) / 10;
    var addedComp = Math.round(perRec * comp * 10) / 10;
    var diff = Math.round((added - addedComp) * 10) / 10;
    var why = 'At ' + perRec + ' points per reception, ' + rec + ' catches are worth ' + added + ' points across the season. '
      + 'A comparable player catching ' + comp + ' is worth ' + addedComp + '. '
      + 'The reception rule alone separates them by ' + Math.abs(diff) + ' points'
      + (diff >= 0 ? ', in favour of the higher-volume player. ' : ', against the higher-volume player. ')
      + 'That is why a scoring setting is not a cosmetic detail: it changes which players clear the replacement baseline at their position, '
      + 'and therefore changes the order of the board rather than just the size of the numbers on it.';
    return { verdict: added + ' points from receptions', why: why };
  },
};
