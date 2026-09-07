// GREEN18 — page renderer. Turns a content module into a complete HTML page.
import { DIAGRAMS } from './diagrams.mjs';
import { APP_STORE_URL, ORIGIN, BRAND, COPYRIGHT_OWNER, NAV, FOOTER,
         FOOTER_DISCLAIMER, LINK_TITLES, CANON, VERIFICATION, TAGLINE } from './site.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Inline markup allowed in copy: **bold** and [text](/href).
const inline = (s) => esc(s)
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// A run of short declarative lines, each its own <p class="beat">.
const beats = (lines) => lines.map((l) => `<p class="beat">${inline(l)}</p>`).join('\n        ');

// The download CTA lives in the sticky header and persists on every screen,
// so repeating it in the hero and again at the foot of each page was three
// buttons doing one button's job (operator ruling, 2026-09-07). The App Store
// link now appears ONCE per page, in the header — plus `installUrl` in the
// schema, which is metadata rather than a visible call to action.
//
// The supporting line and any SECONDARY (internal, non-download) link are
// kept: they carry information and navigation, not a repeated ask.
const ctaGroup = (label, sub, { secondary = null } = {}) => `
        ${secondary ? `<div class="cta-group">
          <a class="btn btn-ghost" href="${esc(secondary.href)}">${esc(secondary.label)}</a>
        </div>` : ''}
        ${sub ? `<p class="cta-sub">${inline(sub)}</p>` : ''}`;

// ------------------------------------------------------------------ blocks --

function block(b) {
  switch (b.type) {
    case 'prose':
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap measure">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede">${inline(b.sub)}</p>` : ''}
          ${b.body ? beats(b.body) : ''}
          ${b.quote ? `<blockquote class="pull"><p>${inline(b.quote)}</p></blockquote>` : ''}
          ${b.list ? `<ul class="ticks">${b.list.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>` : ''}
          ${b.after ? beats(b.after) : ''}
        </div>
      </section>`;

    case 'cards':
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <div class="grid grid-3 mt-lg">
            ${b.cards.map((c) => `<div class="card"><h3>${inline(c.h3)}</h3><p>${inline(c.body)}</p></div>`).join('\n            ')}
          </div>
        </div>
      </section>`;

    case 'steps':
      return `      <section id="how-it-works">
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <ol class="steps mt-lg">
            ${b.steps.map((s) => `<li><h3>${inline(s.h3)}</h3>${beats(s.body)}</li>`).join('\n            ')}
          </ol>
        </div>
      </section>`;

    case 'calculator':
      // Server-rendered first: the default case's result AND its explanation
      // are in the initial HTML, so the reasoning is indexable and quotable
      // even though the controls only work with JS. Interactivity is an
      // enhancement, never the only way to read the page.
      return `      <section class="calc" id="${esc(b.id)}" data-calc="${esc(b.calc)}">
        <div class="wrap">
          <h2>${inline(b.h2)}</h2>
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <div class="calc-grid mt-lg">
            <form class="calc-form" novalidate>
              ${b.fields.map((f) => `<label class="calc-field">
                <span>${esc(f.label)}</span>
                ${f.options
                  ? `<select name="${esc(f.name)}">${f.options.map((o) =>
                      `<option value="${esc(String(o.value))}"${o.value === f.value ? ' selected' : ''}>${esc(o.label)}</option>`).join('')}</select>`
                  : `<input type="number" name="${esc(f.name)}" value="${esc(String(f.value))}" min="${esc(String(f.min))}" max="${esc(String(f.max))}" step="1" inputmode="numeric">`}
              </label>`).join('\n              ')}
              <p class="calc-hint">${inline(b.hint)}</p>
            </form>
            <div class="calc-out" aria-live="polite" aria-atomic="false">
              <p class="calc-label">${esc(b.resultLabel)}</p>
              <p class="calc-verdict" data-verdict>${esc(b.defaultVerdict)}</p>
              <p class="calc-why" data-why>${inline(b.defaultExplanation)}</p>
            </div>
          </div>
          ${b.note ? `<p class="calc-note measure">${inline(b.note)}</p>` : ''}
        </div>
      </section>`;

    case 'diagram': {
      // A named animated SVG from src/diagrams.mjs. Motion is decorative: the
      // caption below states the same thing in words, and the whole figure is
      // aria-hidden with the caption carrying the meaning, so nothing is lost
      // when animation is off or the image fails.
      const render = DIAGRAMS[b.name];
      if (!render) throw new Error(`unknown diagram: ${b.name}`);
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <figure class="diagram mt-lg">
            <div class="diagram-art" aria-hidden="true">${render()}</div>
            <figcaption>${inline(b.caption)}</figcaption>
          </figure>
        </div>
      </section>`;
    }

    case 'pipeline':
      // The public Draft-State Valuation pipeline. Rendered as an ordered
      // list, not an image, so the stages are readable by a crawler, a screen
      // reader and a quoting model alike. Weights are never exposed.
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <ol class="pipeline mt-lg">
            <li class="pipeline-start"><span class="pipe-name">${esc(b.start)}</span></li>
            ${b.stages.map((st) => `<li>
              <span class="pipe-name">${inline(st.name)}</span>
              <span class="pipe-desc">${inline(st.body)}</span>
            </li>`).join('\n            ')}
            <li class="pipeline-end"><span class="pipe-name">${esc(b.end)}</span></li>
          </ol>
          ${b.after ? `<div class="measure" style="margin-top:1.5rem">${beats(b.after)}</div>` : ''}
        </div>
      </section>`;

    case 'definitions':
      // Glossary entries. Each definition is one to two self-contained
      // sentences so it survives being quoted verbatim and out of context.
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          <dl class="glossary mt-md">
            ${b.terms.map((t) => `<div class="term" id="${esc(t.id)}">
              <dt>${inline(t.term)}</dt>
              <dd>${inline(t.definition)}</dd>
            </div>`).join('\n            ')}
          </dl>
        </div>
      </section>`;

    case 'table':
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <div class="table-scroll mt-md" tabindex="0" role="region"
               aria-label="${esc(b.h2 ? b.h2.replace(/\*\*/g, '') : 'Table')}">
            <table>
              ${b.h2 ? `<caption class="visually-hidden">${inline(b.h2)}</caption>` : ''}
              <thead><tr>${b.columns.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
              <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(String(c))}</td>`).join('')}</tr>`).join('')}</tbody>
            </table>
          </div>
          ${b.note ? `<p class="table-note">${inline(b.note)}</p>` : ''}
        </div>
      </section>`;

    case 'model':
      // The input -> revaluation -> output diagram (product-science doc §32).
      // Built from real elements rather than an image so it reflows on a
      // phone and stays readable to a screen reader in source order.
      return `      <section${b.id ? ` id="${b.id}"` : ''}>
        <div class="wrap">
          ${b.h2 ? `<h2>${inline(b.h2)}</h2>` : ''}
          ${b.sub ? `<p class="lede measure">${inline(b.sub)}</p>` : ''}
          <div class="model mt-lg">
            <div class="model-inputs">
              ${b.inputs.map((i) => `<div class="model-in">
                <h3>${inline(i.h3)}</h3>
                <ul>${i.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
              </div>`).join('\n              ')}
            </div>
            <div class="model-arrow" aria-hidden="true"></div>
            <div class="model-core">
              <p class="model-brand">GREEN<b>18</b></p>
              <p class="model-core-line">${inline(b.core)}</p>
            </div>
            <div class="model-arrow" aria-hidden="true"></div>
            <div class="model-out">
              <h3>${inline(b.output.h3)}</h3>
              <p>${inline(b.output.body)}</p>
            </div>
          </div>
        </div>
      </section>`;

    case 'trust':
      // Verified product facts only — each of these is checkable against the
      // App Privacy label and the privacy policy, and none is a performance
      // claim. See docs/privacy-consistency-audit.md.
      return `      <section class="trust">
        <div class="wrap">
          <ul class="trust-row">
            ${b.items.map((i) => `<li><strong>${inline(i.h)}</strong><span>${inline(i.body)}</span></li>`).join('\n            ')}
          </ul>
          ${b.note ? `<p class="trust-note">${inline(b.note)}</p>` : ''}
        </div>
      </section>`;

    case 'convert':
      // Kept as the page's closing statement. Its button is gone with the rest
      // of the repeated CTAs; the header carries the ask.
      return `      <section class="convert">
        <div class="wrap measure">
          <h2>${inline(b.h2)}</h2>
          ${b.body ? beats(b.body) : ''}
          ${b.sub ? `<p class="cta-sub">${inline(b.sub)}</p>` : ''}
        </div>
      </section>`;

    default:
      throw new Error(`unknown block type: ${b.type}`);
  }
}

// Section labels for breadcrumb trails, keyed by the first slug segment.
const SECTION_NAMES = {
  'draft-science': 'Draft Science',
  'scenarios': 'Draft Scenarios',
  'tools': 'Draft Calculators',
  'formats': 'League Formats',
};

/// The breadcrumb trail below the site root, deepest last.
function breadcrumbTrail(page) {
  if (!page.slug) return [];
  const parts = page.slug.split('/');
  const out = [];
  if (parts.length > 1 && SECTION_NAMES[parts[0]]) {
    out.push({ name: SECTION_NAMES[parts[0]], url: `${ORIGIN}/${parts[0]}/` });
  }
  out.push({ name: page.breadcrumb || page.hero.h1, url: `${ORIGIN}/${page.slug}` });
  return out;
}

// Share cards. One card per section rather than one for the whole site: every
// shared link used to render the same image, which wastes the strongest visual
// signal a link has. Generated by Tools/make-og-cards.mjs.
const REFERENCE_PAGES = new Set(['glossary', 'methodology', 'about', 'contact',
  'how-green18-ranks-fantasy-players', 'why-fantasy-rankings-change-during-a-draft']);

function shareCard(page) {
  const section = (page.slug || '').split('/')[0];
  if (['draft-science', 'scenarios', 'tools', 'formats'].includes(section)) {
    return { url: `${ORIGIN}/assets/og/${section}.png`,
             alt: `GREEN18 — ${SECTION_NAMES[section] || section}.` };
  }
  if (REFERENCE_PAGES.has(page.slug)) {
    return { url: `${ORIGIN}/assets/og/reference.png`,
             alt: 'GREEN18 — the method, the glossary and the limits.' };
  }
  return { url: `${ORIGIN}/assets/green18-card.png`,
           alt: 'GREEN18 — live fantasy football draft intelligence for iPhone.' };
}

// ------------------------------------------------------------- structured --

function structuredData(page, url) {
  const graph = [];

  // Organization and WebSite identity, stated once per page so every surface
  // agrees and every @id reference in the graph resolves.
  graph.push({
    '@type': 'Organization',
    '@id': ORIGIN + '/#org',
    name: 'GREEN18',
    url: ORIGIN + '/',
    logo: ORIGIN + '/assets/icon.png',
  });
  graph.push({
    '@type': 'WebSite',
    '@id': ORIGIN + '/#website',
    url: ORIGIN + '/',
    name: 'GREEN18',
    inLanguage: 'en-US',
    publisher: { '@id': ORIGIN + '/#org' },
  });

  // A glossary page publishes its terms as a DefinedTermSet so each
  // definition is machine-addressable on its own.
  const defs = page.blocks?.filter((b) => b.type === 'definitions') ?? [];
  if (defs.length) {
    graph.push({
      '@type': 'DefinedTermSet',
      '@id': url + '#glossary',
      name: page.title,
      url,
      hasDefinedTerm: defs.flatMap((b) => b.terms.map((t) => ({
        '@type': 'DefinedTerm',
        '@id': `${url}#${t.id}`,
        name: t.term,
        description: t.definition.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'),
        inDefinedTermSet: url + '#glossary',
      }))),
    });
  }

  // Explanatory pages are TechArticles: they teach a method, and the
  // canonical answer is the thing worth quoting.
  if (page.pageType === 'science' || page.pageType === 'scenario') {
    graph.push({
      '@type': 'TechArticle',
      '@id': url + '#article',
      headline: page.hero.h1.replace(/\*\*/g, ''),
      description: page.description,
      url,
      ...(page.answer ? { abstract: page.answer.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') } : {}),
      ...(page.dateModified ? { dateModified: page.dateModified } : {}),
      publisher: { '@id': ORIGIN + '/#org' },
      isPartOf: { '@id': ORIGIN + '/#website' },
      isAccessibleForFree: true,
    });
  }

  graph.push({
    '@type': 'MobileApplication',
    name: 'GREEN18',
    applicationCategory: 'SportsApplication',
    operatingSystem: 'iOS',
    url: ORIGIN + '/',
    installUrl: APP_STORE_URL,
    description: CANON,
    // No aggregateRating, no reviewCount, no price: fabricating them is banned.
    publisher: { '@id': ORIGIN + '/#org' },
  });

  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  if (page.slug) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'GREEN18', item: ORIGIN + '/' },
        ...breadcrumbTrail(page).map((c, i) => ({
          '@type': 'ListItem', position: i + 2, name: c.name, item: c.url,
        })),
      ],
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
}

// A device frame around the product demo. The video is real footage of the
// app driven through a live draft — it is decoration only in the sense that
// the page reads fine without it, so it carries no controls, no audio track
// and an empty alt-equivalent: the copy beside it already says what it shows.
function phoneMock(media) {
  // WCAG 2.2.2 (Pause, Stop, Hide) — Level A: anything that moves automatically
  // for more than five seconds must be pausable. This loop runs 32 seconds, so
  // the control below is required, not a nicety.
  //
  // The button sits OUTSIDE the role="img" element deliberately: that role
  // collapses the frame into a single image node for assistive tech, which
  // would swallow the control along with it.
  return `<div class="phone-wrap">
            <div class="phone" role="img" aria-label="${esc(media.alt)}">
              <div class="phone-screen">
                <video autoplay muted loop playsinline preload="metadata"
                       poster="${esc(media.poster)}" tabindex="-1">
                  <source src="${esc(media.webm)}" type="video/webm">
                  <source src="${esc(media.mp4)}" type="video/mp4">
                </video>
              </div>
            </div>
            <p class="phone-cap">
              <!-- A changing label ("Pause demo" / "Play demo") already states the
                   next action, so this must NOT also carry aria-pressed: a screen
                   reader would announce "Play demo, toggle button, pressed", which
                   mixes two different patterns and reads as a contradiction. -->
              <button type="button" class="vid-toggle" data-video-toggle>
                <span class="vid-icon" aria-hidden="true"></span>
                <span data-video-toggle-label>Pause demo</span>
              </button>
              ${inline(media.caption)}
            </p>
          </div>`;
}

// ------------------------------------------------------------------- page --

export function render(page) {
  // A section hub canonicalises WITH a trailing slash.
  //
  // The original reason: GitHub Pages 301'd /scenarios -> /scenarios/ whenever
  // a scenarios/ directory existed with no index, so the bare form never
  // served. That is NO LONGER what happens — the build now emits both
  // scenarios.html and scenarios/index.html, so both forms return 200 with
  // identical bytes and neither redirects. Re-verified 2026-09-07.
  //
  // The trailing-slash canonical still stands, and now for a different reason:
  // two URLs serve the same page, so one of them must be declared canonical,
  // and the slashed form is the one that works identically on both hosts.
  const url = page.slug
    ? `${ORIGIN}/${page.slug}${page.isSectionHub ? '/' : ''}`
    : `${ORIGIN}/`;
  const ogTitle = page.ogTitle || page.title;
  const ogDesc = page.ogDescription || page.description;

  const card = shareCard(page);
  const nav = NAV.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('\n          ');

  const foot = FOOTER.map((c) => `<div>
              <h2>${esc(c.heading)}</h2>
              <ul>${c.links.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul>
            </div>`).join('\n            ');

  const related = page.links?.length ? `      <section class="related">
        <div class="wrap">
          <h2>Keep reading</h2>
          <ul class="mt-md">
            ${page.links.map((s) => `<li><a href="/${s}">${esc(LINK_TITLES[s] || s)}</a></li>`).join('\n            ')}
          </ul>
        </div>
      </section>` : '';

  const faq = page.faq?.length ? `      <section>
        <div class="wrap measure">
          <h2>Questions</h2>
          <div class="faq mt-md">
            ${page.faq.map((f) => `<details><summary>${inline(f.q)}</summary><div><p>${inline(f.a)}</p></div></details>`).join('\n            ')}
          </div>
        </div>
      </section>` : '';

  // A nested page gets its whole trail, not just "GREEN18 / this page". The
  // section is a real hub with its own URL, so it belongs in the path.
  const trail = breadcrumbTrail(page);
  const crumbs = page.slug ? `    <nav class="crumbs" aria-label="Breadcrumb">
      <div class="wrap"><a href="/">GREEN18</a>${trail.map((c, i) =>
        `<span>/</span>${i === trail.length - 1
          ? esc(c.name)
          : `<a href="${c.url.replace(ORIGIN, '')}">${esc(c.name)}</a>`}`).join('')}</div>
    </nav>` : '';

  // A visible review date. Schema alone is invisible to a reader deciding
  // whether to trust an explanation, and freshness is part of that judgement.
  const reviewed = (page.dateModified && ['science', 'scenario', 'tool', 'data'].includes(page.pageType))
    ? `      <section class="reviewed">
        <div class="wrap measure">
          <p>Last reviewed <time datetime="${esc(page.dateModified)}">${esc(
            new Date(page.dateModified + 'T00:00:00Z').toLocaleDateString('en-US',
              { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }))}</time>.
          GREEN18 explains its method in full on the <a href="/methodology">methodology page</a>.</p>
        </div>
      </section>` : '';

  const disclaimer = page.disclaimer ? `      <section>
        <div class="wrap"><p class="disclaimer">${inline(page.disclaimer)}</p></div>
      </section>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="dark">
  <!-- GitHub Pages cannot send custom response headers, so the policy is
       declared in-document. The Azure mirror ALSO sends these as real headers
       (see staticwebapp.config.json); a header wins where both exist.
       frame-ancestors and X-Content-Type-Options are header-only and cannot be
       expressed here — that gap is a limitation of the host, recorded in
       docs/crawler-audit.md. -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self'; script-src 'self'; form-action 'none'; base-uri 'self'">
  <meta name="referrer" content="strict-origin-when-cross-origin">
${VERIFICATION.bing ? `  <meta name="msvalidate.01" content="${esc(VERIFICATION.bing)}">\n` : ''}\
${VERIFICATION.google ? `  <meta name="google-site-verification" content="${esc(VERIFICATION.google)}">\n` : ''}\
  <meta name="theme-color" content="#041306">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
${page.noindex ? '  <meta name="robots" content="noindex, follow">\n' : `  <link rel="canonical" href="${url}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(ogDesc)}">
  <meta property="og:image" content="${card.url}">
  <meta property="og:image:alt" content="${esc(card.alt)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(ogDesc)}">
  <meta name="twitter:image" content="${card.url}">
  <link rel="icon" href="/assets/icon.png" type="image/png">
  <link rel="apple-touch-icon" href="/assets/icon.png">
  <link rel="stylesheet" href="/assets/site.css">
  <script type="application/ld+json">
${structuredData(page, url)}
  </script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="site">
    <div class="wrap">
      <a class="wordmark" href="/" aria-label="GREEN18 — home"><img src="/assets/mark.png" alt="" width="40" height="26" decoding="async"></a>
      <nav aria-label="Primary">
        ${nav}
      </nav>
      <a class="btn" href="${APP_STORE_URL}">iOS App</a>
    </div>
  </header>

${crumbs}

  <main id="main">
      <section class="hero${page.heroMedia ? ' hero-split' : ''}">
        <div class="wrap">
          <div class="${page.heroMedia ? 'hero-grid' : ''}">
          <div class="measure">
            ${page.hero.eyebrow ? `<p class="eyebrow">${esc(page.hero.eyebrow)}</p>` : ''}
            <h1>${inline(page.hero.h1)}</h1>
            <div class="lede">
              ${page.hero.lede.map((l) => `<p>${inline(l)}</p>`).join('\n              ')}
            </div>
            ${ctaGroup(page.hero.cta || 'Download GREEN18', page.hero.micro,
              { secondary: page.hero.secondary })}
          </div>
          ${page.heroMedia ? phoneMock(page.heroMedia) : ''}
          </div>
        </div>
      </section>

${page.answer ? `      <section class="answer-wrap">
        <div class="wrap measure">
          <p class="answer">${inline(page.answer)}</p>
        </div>
      </section>` : ''}

${page.claims?.length ? `      <section class="keypoints-wrap">
        <div class="wrap measure">
          <h2 class="keypoints-h">In short</h2>
          <ul class="keypoints">
            ${page.claims.map((c) => `<li>${inline(c)}</li>`).join('\n            ')}
          </ul>
        </div>
      </section>` : ''}

${page.blocks.map(block).join('\n\n')}

${faq}

${related}

${reviewed}

${disclaimer}
  </main>

  <footer class="site">
    <div class="wrap">
      <div class="foot-top">
        <div class="foot-brand">
          <a class="wordmark" href="/" aria-label="GREEN18 — home"><img src="/assets/mark.png" alt="" width="34" height="22" decoding="async"></a>
          <p>${esc(TAGLINE)}</p>
        </div>
        <div class="foot-cols">
            ${foot}
        </div>
      </div>
      <div class="foot-legal">
        <p>${esc(FOOTER_DISCLAIMER)}</p>
        <p>&copy; 2026 ${esc(COPYRIGHT_OWNER)}. All rights reserved.</p>
      </div>
    </div>
  </footer>


  <script src="/assets/site.js" defer></script>
${page.blocks.some((b) => b.type === "calculator") ? '  <script type="module" src="/assets/tools.js"></script>' : ''}
</body>
</html>
`;
}
