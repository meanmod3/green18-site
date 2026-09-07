// GREEN18 — page renderer. Turns a content module into a complete HTML page.
import { APP_STORE_URL, ORIGIN, BRAND, COPYRIGHT_OWNER, NAV, FOOTER,
         FOOTER_DISCLAIMER, LINK_TITLES, CANON, VERIFICATION } from './site.mjs';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

// Inline markup allowed in copy: **bold** and [text](/href).
const inline = (s) => esc(s)
  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// A run of short declarative lines, each its own <p class="beat">.
const beats = (lines) => lines.map((l) => `<p class="beat">${inline(l)}</p>`).join('\n        ');

const ctaGroup = (label, sub, { large = true, secondary = null } = {}) => `
        <div class="cta-group">
          <a class="btn${large ? ' btn-lg' : ''}" href="${APP_STORE_URL}">${esc(label)}</a>
          ${secondary ? `<a class="btn btn-ghost" href="${esc(secondary.href)}">${esc(secondary.label)}</a>` : ''}
        </div>
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
            <div class="calc-out" aria-live="polite">
              <p class="calc-label">${esc(b.resultLabel)}</p>
              <p class="calc-verdict" data-verdict>${esc(b.defaultVerdict)}</p>
              <p class="calc-why" data-why>${inline(b.defaultExplanation)}</p>
            </div>
          </div>
          ${b.note ? `<p class="calc-note measure">${inline(b.note)}</p>` : ''}
        </div>
      </section>`;

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
          <div class="table-scroll mt-md">
            <table>
              <thead><tr>${b.columns.map((c) => `<th>${esc(c)}</th>`).join('')}</tr></thead>
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
      return `      <section class="convert">
        <div class="wrap measure">
          <h2>${inline(b.h2)}</h2>
          ${b.body ? beats(b.body) : ''}
          ${ctaGroup(b.label || 'Download GREEN18', b.sub)}
        </div>
      </section>`;

    default:
      throw new Error(`unknown block type: ${b.type}`);
  }
}

// ------------------------------------------------------------- structured --

function structuredData(page, url) {
  const graph = [];

  // Organization identity, stated once per page so every surface agrees.
  graph.push({
    '@type': 'Organization',
    '@id': ORIGIN + '/#org',
    name: 'GREEN18',
    url: ORIGIN + '/',
    logo: ORIGIN + '/assets/icon.png',
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
        { '@type': 'ListItem', position: 2, name: page.breadcrumb || page.hero.h1, item: url },
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
  return `<div class="phone-wrap">
            <div class="phone" role="img" aria-label="${esc(media.alt)}">
              <div class="phone-screen">
                <video autoplay muted loop playsinline preload="metadata"
                       poster="${esc(media.poster)}">
                  <source src="${esc(media.webm)}" type="video/webm">
                  <source src="${esc(media.mp4)}" type="video/mp4">
                </video>
              </div>
            </div>
            <p class="phone-cap">${inline(media.caption)}</p>
          </div>`;
}

// ------------------------------------------------------------------- page --

export function render(page) {
  // A section hub canonicalises WITH a trailing slash. GitHub Pages 301s
  // /scenarios -> /scenarios/ whenever a scenarios/ directory exists, so the
  // bare form never serves; pointing the canonical at it would aim every
  // signal at a redirect. Verified live before this was written.
  const url = page.slug
    ? `${ORIGIN}/${page.slug}${page.isSectionHub ? '/' : ''}`
    : `${ORIGIN}/`;
  const ogTitle = page.ogTitle || page.title;
  const ogDesc = page.ogDescription || page.description;

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

  const crumbs = page.slug ? `    <nav class="crumbs" aria-label="Breadcrumb">
      <div class="wrap"><a href="/">GREEN18</a><span>/</span>${esc(page.breadcrumb || page.hero.h1)}</div>
    </nav>` : '';

  const disclaimer = page.disclaimer ? `      <section>
        <div class="wrap"><p class="disclaimer">${inline(page.disclaimer)}</p></div>
      </section>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="dark">
${VERIFICATION.bing ? `  <meta name="msvalidate.01" content="${esc(VERIFICATION.bing)}">\n` : ''}\
${VERIFICATION.google ? `  <meta name="google-site-verification" content="${esc(VERIFICATION.google)}">\n` : ''}\
  <meta name="theme-color" content="#041306">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${BRAND}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${esc(ogTitle)}">
  <meta property="og:description" content="${esc(ogDesc)}">
  <meta property="og:image" content="${ORIGIN}/assets/green18-card.png">
  <meta property="og:image:alt" content="GREEN18 — live fantasy football draft intelligence for iPhone.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(ogTitle)}">
  <meta name="twitter:description" content="${esc(ogDesc)}">
  <meta name="twitter:image" content="${ORIGIN}/assets/green18-card.png">
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
      <a class="wordmark" href="/">GREEN<b>18</b></a>
      <nav aria-label="Primary">
        ${nav}
      </nav>
      <a class="btn" href="${APP_STORE_URL}">Download</a>
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

${disclaimer}
  </main>

  <footer class="site">
    <div class="wrap">
      <div class="foot-top">
        <div class="foot-brand">
          <a class="wordmark" href="/">GREEN<b>18</b></a>
          <p>Live fantasy football draft intelligence for iPhone.</p>
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

  <div class="sticky-cta" id="stickyCta" aria-hidden="true">
    <span class="lbl">Get GREEN18<small>Open in App Store</small></span>
    <a class="btn" href="${APP_STORE_URL}" tabindex="-1">Get GREEN18</a>
  </div>

  <script src="/assets/site.js" defer></script>
${page.blocks.some((b) => b.type === "calculator") ? '  <script type="module" src="/assets/tools.js"></script>' : ''}
</body>
</html>
`;
}
