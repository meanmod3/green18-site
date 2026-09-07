// GREEN18 — page renderer. Turns a content module into a complete HTML page.
import { APP_STORE_URL, ORIGIN, BRAND, COPYRIGHT_OWNER, NAV, FOOTER,
         FOOTER_DISCLAIMER, LINK_TITLES } from './site.mjs';

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
  const graph = [{
    '@type': 'MobileApplication',
    name: 'GREEN18',
    applicationCategory: 'SportsApplication',
    operatingSystem: 'iOS',
    url: ORIGIN + '/',
    installUrl: APP_STORE_URL,
    description: 'A live fantasy football draft assistant for iPhone that reorganizes the '
      + 'remaining player board as the draft develops.',
    // No aggregateRating, no reviewCount, no price: §24 forbids fabricating them.
  }];

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

// ------------------------------------------------------------------- page --

export function render(page) {
  const url = page.slug ? `${ORIGIN}/${page.slug}` : `${ORIGIN}/`;
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
      <section class="hero">
        <div class="wrap">
          <div class="measure">
            ${page.hero.eyebrow ? `<p class="eyebrow">${esc(page.hero.eyebrow)}</p>` : ''}
            <h1>${inline(page.hero.h1)}</h1>
            <div class="lede">
              ${page.hero.lede.map((l) => `<p>${inline(l)}</p>`).join('\n              ')}
            </div>
            ${ctaGroup(page.hero.cta || 'Download GREEN18', page.hero.micro,
              { secondary: page.hero.secondary })}
          </div>
        </div>
      </section>

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
</body>
</html>
`;
}
