# green18-site

The public legal and support pages for **Green18**, the iPhone fantasy-football draft assistant.
Plain static HTML, no framework, no build step, no scripts, no analytics, no cookies.
Served by GitHub Pages from the `main` branch root; custom domain **green18.app**.

| Page | Path | Purpose |
| --- | --- | --- |
| `index.html` | `/` | One paragraph on what Green18 is, links to the two pages below |
| `privacy.html` | `/privacy` | The Privacy Policy — the App Store Connect **Privacy Policy URL** |
| `support.html` | `/support` | Contact email + FAQ — the App Store Connect **Support URL** |
| `404.html` | — | Not-found page (GitHub Pages serves it automatically) |
| `style.css` | — | Shared stylesheet; colours mirror the app's `Sources/DesignSystem/Tokens.swift` |
| `CNAME` | — | **Not present yet, on purpose** — see "DNS records" below |
| `robots.txt` | — | Allows all crawlers |
| `.nojekyll` | — | Disables Jekyll processing; files are served as-is |

GitHub Pages serves `privacy.html` at both `/privacy` and `/privacy.html`.

## URLs

- Custom domain (once DNS is pointed): `https://green18.app/privacy`, `https://green18.app/support`
- GitHub default (live now): `https://meanmod3.github.io/green18-site/privacy`,
  `https://meanmod3.github.io/green18-site/support`

The moment a `CNAME` file exists GitHub 301-redirects the default URL to the custom domain, so the
`CNAME `green18.app` committed 2026-09-06 once DNS resolved; HTTPS enforced.

## DNS records (registrar for green18.app)

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME (optional) | `www` | `meanmod3.github.io` |

After DNS propagates (`dig +short green18.app` shows the four addresses):

1. Add the domain: `gh api -X PUT repos/meanmod3/green18-site/pages -f cname=green18.app`
   (GitHub commits the `CNAME` file), or commit a `CNAME` file containing `green18.app` to `main`.
2. Repository **Settings → Pages** → confirm the custom domain shows a green check, then tick
   **Enforce HTTPS** (GitHub provisions the certificate; up to an hour after DNS is visible).
3. Verify with `curl -sI https://green18.app/privacy` → `HTTP/2 200`, then switch the App Store Connect
   URLs from the GitHub default to `https://green18.app/privacy` and `https://green18.app/support`.

## Updating the Privacy Policy

The source of truth for the policy text is `docs/privacy-policy.md` in the (private) `meanmod3/green18`
repo — it is cross-checked there against the app's privacy manifest and App Store privacy answers.

1. Edit `docs/privacy-policy.md` in `green18` and merge it.
2. Re-render the same text into `privacy.html` here, section for section (headings, tables and lists map
   1:1; the two operator tokens become the effective date and `manager@green18.app`).
3. **Change the effective date whenever the text changes** (`<time datetime="YYYY-MM-DD">` in
   `privacy.html`, and the corresponding line in the markdown source).
4. Commit and push `main`; Pages redeploys in about a minute.

The two copies must say the same thing — the markdown is the reviewed source, the HTML is what Apple
and users read. `green18/docs/legal-site.md` documents this from the app repo's side.

## Contact

`manager@green18.app` — appears on the support page and in the policy.
