# Queued follow-ups

## 1. `www.green18.app` certificate — RESOLVED 2026-09-08

Closed by the Azure Static Web Apps migration, not by the fix described here.
The original problem was a GitHub Pages certificate covering only
`['green18.app']`; the site no longer runs on Pages, and Azure issued
certificates for both hostnames.

Verified 2026-09-18: `https://www.green18.app/` returns 200 on a certificate
whose subject is `CN=www.green18.app`, valid to 2027-03-07, and `/privacy` and
`/support` return 200 on both hostnames. The Pages site itself is deleted
(`gh api repos/meanmod3/green18-site/pages` → 404), so the re-provisioning
steps this entry used to describe have nothing left to act on.

## 2. `sameAs` on the Organization schema — AFTER App Store release

§12/§13 of the AI-retrieval brief ask for `Organization` schema carrying
`sameAs` links to legitimate profiles. The strongest available external
identity is the App Store listing, `https://apps.apple.com/us/app/id6805706417`.

**That URL currently returns 404** — the app is not released. Adding it to
`sameAs` would assert an identity that does not resolve, which is exactly the
defect just fixed on `/formats/`: structured data telling a crawler something
untrue is worse than structured data omitting it.

**Do it when:** the App Store listing resolves. Add `sameAs: [<app store url>]`
to the Organization node in `src/layout.mjs` (`structuredData`), and check for
any other verifiable first-party profile at the same time. Verify with
`curl -s -o /dev/null -w '%{http_code}' -L <url>` before adding, not after.

Note the same release event unblocks nothing else: `APP_STORE_URL` in
`src/site.mjs` is already the correct id, so every CTA on all 70 pages starts
working the moment the listing goes live, with no code change.
