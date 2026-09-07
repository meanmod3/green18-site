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
