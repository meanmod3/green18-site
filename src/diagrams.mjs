// Animated explanatory diagrams — inline SVG, no dependencies, no build step.
//
// Each export is a pure function returning an SVG string. They are rendered by
// the `diagram` block in layout.mjs, inside an aria-hidden wrapper with a
// figcaption that states the same thing in words.
//
// RULES
//  - Colours come from the CSS custom properties, so the diagrams theme with
//    the page instead of hard-coding hex.
//  - Motion uses CSS animation defined in assets/site.css, NOT SMIL and NOT
//    inline style attributes — the page CSP forbids inline styles and
//    `style-src` is 'self'.
//  - Every animation must be disabled under prefers-reduced-motion. The
//    diagram must still make its point as a static image.
//  - No text smaller than 11px at the rendered size; these are read, not
//    decorative.
// ---------------------------------------------------------------- helpers --
// Rows, blocks and chips are authored in their FINAL state. The CSS keyframes
// start each element in its "before" state and land it on the authored one, so
// switching animation off leaves the explanatory frame on screen.

const row = (y, pos, name, cls, extra = '') => `
    <g${cls ? ` class="${cls}"` : ''}>
      <rect x="140" y="${y}" width="600" height="54" rx="9" fill="var(--bg-2)" stroke="var(--border)"/>
      <rect x="158" y="${y + 13}" width="56" height="28" rx="7" fill="var(--pill-fill)"/>
      <text class="dg-s" x="186" y="${y + 32}" text-anchor="middle" font-family="inherit" fill="var(--pill-ink)">${pos}</text>
      <text class="dg-m" x="232" y="${y + 33}" font-family="inherit" fill="var(--ink)">${name}</text>${extra}
    </g>`;

const block = (x, y, w, h, cls) => `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="var(--border-2)"/>
      <rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="var(--accent)"/>
    </g>`;

// -------------------------------------------------------------- diagrams --
export const DIAGRAMS = {
  // §33 Draft-State Valuation. A pick is recorded, a row leaves, and the rows
  // below RE-ORDER rather than merely closing up. The site's thesis in one
  // image: the surviving quarterback did not improve, his situational value did.
  boardReorders: () => `<svg viewBox="0 0 880 400" role="img" xmlns="http://www.w3.org/2000/svg">
    <text class="dg-s" x="140" y="34" font-family="inherit" fill="var(--ink-3)" letter-spacing="2">YOUR BOARD</text>
    <g class="dg-flash">
      <rect x="470" y="14" width="270" height="30" rx="15" fill="var(--pill-fill)" stroke="var(--border)"/>
      <text class="dg-s" x="605" y="34" text-anchor="middle" font-family="inherit" fill="var(--pill-ink)">Pick recorded: Quarterback A</text>
    </g>
${row(76, 'RB', 'Running back A')}
${row(204, 'QB', 'Quarterback B', 'br-qbb', `
      <text class="dg-s dg-in-late" x="722" y="${204 + 33}" text-anchor="end" font-family="inherit" fill="var(--accent)">value up</text>`)}
${row(268, 'WR', 'Receiver A', 'br-wra')}
${row(332, 'WR', 'Receiver B')}
${row(204, 'QB', 'Quarterback A', 'br-out')}
  </svg>`,

  // §34 Positional scarcity. Two pools of equal size drain at different RATES.
  // The end state is the comparison: one column nearly empty, one nearly full.
  scarcity: () => {
    const col = (x, label, fades) => {
      let out = `
    <text class="dg-s" x="${x + 90}" y="34" text-anchor="middle" font-family="inherit" fill="var(--ink-3)" letter-spacing="2">${label}</text>`;
      for (let i = 0; i < 8; i++) {
        out += block(x, 56 + i * 36, 180, 28, fades[i] ? `dg-fade-${fades[i]}` : 'dg-held');
      }
      return out;
    };
    return `<svg viewBox="0 0 880 400" role="img" xmlns="http://www.w3.org/2000/svg">
${col(120, 'POSITION A', [1, 2, 3, 4, 5, 6, 0, 0])}
${col(580, 'POSITION B', [4, 0, 0, 0, 0, 0, 0, 8])}
    <text class="dg-m dg-in-late" x="210" y="376" text-anchor="middle" font-family="inherit" fill="var(--accent)">draining fast</text>
    <text class="dg-m dg-in-late" x="670" y="376" text-anchor="middle" font-family="inherit" fill="var(--ink-2)">draining slowly</text>
    <text class="dg-s" x="440" y="216" text-anchor="middle" font-family="inherit" fill="var(--ink-3)">same</text>
    <text class="dg-s" x="440" y="240" text-anchor="middle" font-family="inherit" fill="var(--ink-3)">start</text>
  </svg>`;
  },

  // §35 Replacement level. Two bars, and the answer is neither of them: it is
  // the band between their tops. The end state dims both bars and keeps the
  // band lit, so the eye lands on the gap.
  replacement: () => `<svg viewBox="0 0 880 400" role="img" xmlns="http://www.w3.org/2000/svg">
    <line x1="120" y1="320" x2="800" y2="320" stroke="var(--border-2)"/>
    <rect class="rp-dim" x="180" y="180" width="150" height="140" rx="4" fill="var(--accent)"/>
    <rect class="rp-gap" x="180" y="90" width="150" height="90" rx="4" fill="var(--accent)"/>
    <rect class="rp-dim" x="470" y="180" width="150" height="140" rx="4" fill="var(--accent)"/>
    <text class="dg-s" x="255" y="348" text-anchor="middle" font-family="inherit" fill="var(--ink-2)">this player</text>
    <text class="dg-s" x="545" y="348" text-anchor="middle" font-family="inherit" fill="var(--ink-2)">best alternative,</text>
    <text class="dg-s" x="545" y="372" text-anchor="middle" font-family="inherit" fill="var(--ink-2)">same position</text>
    <g class="dg-in-late">
      <line x1="180" y1="180" x2="700" y2="180" stroke="var(--ink-3)" stroke-dasharray="5 6"/>
      <line x1="330" y1="90" x2="700" y2="90" stroke="var(--ink-3)" stroke-dasharray="5 6"/>
      <path d="M690 90 L690 180" stroke="var(--accent)" stroke-width="2"/>
      <path d="M682 98 L690 90 L698 98" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <path d="M682 172 L690 180 L698 172" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text class="dg-m" x="716" y="130" font-family="inherit" fill="var(--accent)">the gap</text>
      <text class="dg-s" x="716" y="156" font-family="inherit" fill="var(--ink-2)">is the pick</text>
    </g>
    <text class="dg-s" x="120" y="34" font-family="inherit" fill="var(--ink-3)" letter-spacing="2">PROJECTED POINTS</text>
  </svg>`,

  // §37 Pick horizon. Two of your selections on a timeline, the intervening
  // picks between them, and the players who do not survive the wait.
  pickHorizon: () => {
    let ticks = '';
    for (let i = 0; i < 18; i++) {
      const x = 90 + i * 42;
      const mine = i === 1 || i === 15;
      ticks += `
    <line x1="${x}" y1="${mine ? 236 : 250}" x2="${x}" y2="${mine ? 296 : 282}" stroke="var(--${mine ? 'accent' : 'border-2'})" stroke-width="${mine ? 4 : 2}"/>`;
    }
    let chips = '';
    const fades = [1, 0, 2, 3, 0, 4, 5, 6];
    for (let i = 0; i < 8; i++) {
      chips += block(112 + i * 84, 84, 66, 46, fades[i] ? `dg-fade-${fades[i]}` : 'dg-held');
    }
    return `<svg viewBox="0 0 880 400" role="img" xmlns="http://www.w3.org/2000/svg">
    <text class="dg-s" x="90" y="52" font-family="inherit" fill="var(--ink-3)" letter-spacing="2">PLAYERS YOU WOULD TAKE</text>
${chips}
    <rect class="ph-band" x="132" y="236" width="588" height="60" rx="8" fill="var(--pill-fill)"/>
    <line x1="70" y1="266" x2="830" y2="266" stroke="var(--border-2)" stroke-width="2"/>
${ticks}
    <text class="dg-s" x="132" y="330" text-anchor="middle" font-family="inherit" fill="var(--accent)">your pick</text>
    <text class="dg-s" x="720" y="330" text-anchor="middle" font-family="inherit" fill="var(--accent)">your next pick</text>
    <text class="dg-m dg-in-late" x="426" y="366" text-anchor="middle" font-family="inherit" fill="var(--ink-2)">everything you are willing to lose is decided here</text>
  </svg>`;
  },

  // §38 Tier collapse. A tier empties to its last member; then the drop to the
  // tier beneath it becomes the whole story.
  tierCollapse: () => {
    let t1 = '';
    const fades = [1, 2, 3, 4];
    for (let i = 0; i < 4; i++) t1 += block(130 + i * 132, 70, 112, 62, `dg-fade-${fades[i]}`);
    let t2 = '';
    for (let i = 0; i < 5; i++) t2 += block(130 + i * 132, 268, 112, 62, 'dg-held');
    return `<svg viewBox="0 0 880 400" role="img" xmlns="http://www.w3.org/2000/svg">
    <text class="dg-s" x="90" y="46" text-anchor="end" font-family="inherit" fill="var(--ink-3)">TIER 1</text>
    <text class="dg-s" x="90" y="244" text-anchor="end" font-family="inherit" fill="var(--ink-3)">TIER 2</text>
${t1}
    <g>
      <rect x="658" y="70" width="112" height="62" rx="5" fill="none" stroke="var(--border-2)"/>
      <rect x="658" y="70" width="112" height="62" rx="5" fill="var(--accent)"/>
      <rect class="dg-pulse" x="650" y="62" width="128" height="78" rx="9" fill="none" stroke="var(--accent)" stroke-width="2"/>
    </g>
    <text class="dg-s dg-in-late" x="714" y="168" text-anchor="middle" font-family="inherit" fill="var(--accent)">the last one</text>
${t2}
    <g class="dg-in-late">
      <path d="M300 152 L300 250" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 6"/>
      <path d="M292 242 L300 250 L308 242" fill="none" stroke="var(--accent)" stroke-width="2"/>
      <text class="dg-m" x="322" y="196" font-family="inherit" fill="var(--accent)">the cliff</text>
      <text class="dg-s" x="322" y="222" font-family="inherit" fill="var(--ink-2)">no one bridges it</text>
    </g>
  </svg>`;
  },
};

