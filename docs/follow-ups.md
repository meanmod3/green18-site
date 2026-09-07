# Queued follow-ups

## 1. `www.green18.app` certificate — AFTER App Review

**Status: deliberately deferred (Ben, 2026-09-07).**

`https://www.green18.app` presents no certificate. The GitHub Pages cert was
issued 2026-09-06 covering `['green18.app']` only, before the `www` CNAME
existed; Pages includes both names on a cert only when it sees the www DNS at
provisioning time. `http://www` already 301s to the apex correctly.

**Fix:** in the site repo's Settings → Pages, remove the custom domain and
re-add `green18.app`, then re-enable Enforce HTTPS. That makes Pages re-check
DNS and issue a cert covering both names.

**Why it is deferred:** re-provisioning takes `green18.app` off Pages briefly
and can leave HTTPS unenforced for up to an hour while the new certificate
issues. Those are the URLs App Store Connect has on file for privacy and
support, and a submission that hits an HTTPS failure at review time is
rejected. Nothing links to `www`, so the cost of waiting is a certificate
warning for someone who types a hostname the site never advertises.

**Do it when:** the app is through review. Then verify both
`https://green18.app/privacy` and `https://www.green18.app/` return 200 and
`gh api repos/meanmod3/green18-site/pages` shows the cert covering both names.

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
