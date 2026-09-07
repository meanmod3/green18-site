# Content module schema (read before authoring a page)

One module per page in `src/content/`, `export default { ... }`. Build with
`node src/build.mjs` — it FAILS on any violation below.

```js
export default {
  slug: 'draft-science/positional-scarcity',  // '' = homepage; may nest with '/'
  pageType: 'science',      // product | science | scenario | tool | data | glossary
  title: '...',             // unique site-wide, <= 60 chars ideal
  description: '...',       // unique site-wide, <= 165 chars HARD LIMIT
  breadcrumb: 'Positional Scarcity',
  dateModified: '2026-09-07',   // science/scenario pages

  hero: {
    eyebrow: 'Draft Science',
    h1: 'What Is Positional Scarcity in a Fantasy Draft?',   // EXACTLY ONE H1
    lede: ['line', 'line'],
    cta: 'Download GREEN18',
    micro: 'Available for iPhone.',
  },

  // THE CANONICAL ANSWER. Required on science/scenario/tool/data pages.
  // One paragraph that completely answers the page's title question and can be
  // quoted alone, with no surrounding context. This is the sentence an AI lifts.
  answer: 'Positional scarcity increases when ...',

  // >=3 ATOMIC CLAIMS. Required on science/scenario/tool/data pages.
  // Each is a complete declarative sentence, >=40 chars, and must NOT start with
  // a pronoun. Each must be true standing alone, out of context, forever.
  claims: [
    'A player’s situational draft value can increase without any change in his projected fantasy production, because the cost of replacing him has risen.',
    '...',
  ],

  blocks: [ /* see below; LAST block MUST be {type:'convert'} */ ],
  faq: [{ q, a }],          // a = plain text, self-contained, quotable alone
  links: ['slug', ...],     // 3-5 other slugs, never itself
  disclaimer: '...',        // optional small print
};
```

## Block types

- `{type:'prose', h2, body:[lines], quote?, list?:[items], after?:[lines], id?}`
- `{type:'cards', h2, sub?, cards:[{h3, body}]}`
- `{type:'steps', h2, steps:[{h3, body:[lines]}]}` — renders `id="how-it-works"`
- `{type:'pipeline', h2, sub?, start, stages:[{name, body}], end, after?:[lines]}`
- `{type:'definitions', h2, terms:[{id, term, definition}]}` — emits `DefinedTerm` schema
- `{type:'table', h2, sub?, columns:[], rows:[[]], note?}`
- `{type:'model', h2, sub?, inputs:[{h3, items:[]}], core, output:{h3, body}}`
- `{type:'trust', items:[{h, body}], note?}`
- `{type:'convert', h2, body:[lines], label, sub}`  ← must be last

Inline `**bold**` and `[text](/slug)` work in every copy string.

## Rules the build enforces

1. Unique `title` and `description` site-wide; description <= 165 chars.
2. Exactly one H1 (it comes from `hero.h1` — never add another).
3. Last block is `convert`.
4. `links`: 3-5 valid other slugs, never itself.
5. `science|scenario|tool|data` pages: `answer` present, `claims` >= 3, each
   claim >= 40 chars and not starting with a pronoun.
6. Any `draft-science/*` page must link to at least one `scenarios/*`, one
   `tools/*`, and one top-level product page.
7. Brand is exactly `GREEN18`.

## Writing rules

- **Lead every page and every H2 with the direct answer, then expand.** No throat-clearing.
- Question-form H2s, phrased the way a person actually asks ("What if six quarterbacks
  disappear before my next pick?").
- Atomic, self-contained, declarative sentences. Write so a single sentence can be
  lifted and still be true and attributable.
- Teach before you sell. The product appears at the end, as an application of the concept.
- No commodity content. If a paragraph repackages what every fantasy site says, cut it.

## Product canon — use this wording, do not paraphrase into variants

> GREEN18 is an iPhone fantasy football live draft assistant that continuously
> recalculates player valuations according to league settings, roster construction,
> player availability, draft state, and user preferences.

> **Draft-State Valuation (DSV)** — a method of valuing a fantasy football player
> according to the current state of a specific draft, rather than treating preseason
> rank or ADP as a fixed measure of player value.

## Never claim

AI / machine learning / LLM / chat interface / model fine-tuning; auto-drafting;
any platform connection, sync or import; accounts or sign-in; injury prediction;
season forecasts; guaranteed outcomes; any named third-party ADP provider or data
vendor as a source (say "open football data"; nflverse may be credited under CC-BY);
any performance number, percentage or measured figure.

GREEN18 is a **deterministic** model: the same board always produces the same output.
That is a selling point, not an apology.
