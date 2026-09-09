# Model console (internal)

A single desktop page mirroring the iOS app's personalization inputs — the five
onboarding philosophy cards, the five `PreferenceWeights` dials, and the queue
preference / availability-pressure layer — with the engine's own arithmetic run
live in the browser.

**URL:** `/internal/d362616165bec7d89ef41fbd/`

## How it is gated, and what that is worth

- not linked from any page, nav or footer
- absent from every sitemap and from `llms.txt`
- `Disallow: /internal/` for every agent in `robots.txt`
- `noindex, nofollow, noarchive, nosnippet` and `referrer: no-referrer` on the page

**This is obscurity plus a crawl directive. It is NOT access control.** Anyone
who has the URL can open it, and a well-behaved crawler is the only kind that
honours robots.txt. Do not put anything on this page that would be harmful to
disclose.

Real authentication is available once the apex is served by Azure Static Web
Apps: SWA can require a logged-in principal for a route via `allowedRoles` on
`/internal/*` plus an invitation. That cannot be done on GitHub Pages, which
serves static files with no auth layer, and the apex is on Pages today.

## Fidelity

Every label, constant and formula is transcribed from the iOS sources rather
than reinvented:

| Console element | Source of truth |
|---|---|
| Five philosophy cards, prompts, verdict copy | `Green18App/Onboarding/PreferenceSteps.swift` |
| Five weight dials, end labels, `signFlip` | the same file's `makePreferenceWeightAxisSpecs()` |
| −1…1 clamping, neutral state | `DraftEngine/Personalization/PreferenceWeights.swift` |
| Queue strengths, `queueAdjustment`, reason templates | `DraftEngine/User/QueuePreferenceMapping.swift` |
| ±2.5 queue bound, ±6.0 total | `DraftEngine/Contracts/DraftModelArtifact.swift` |
| Colours, greys, position hues | `DesignSystem/Tokens.swift` (sRGB → hex, not re-picked) |

**Deliberately not reproduced:** the philosophy → weights derivation in
`PhilosophyDerivation.swift`. Guessing it would display a number the app would
not produce, so the two columns are independent inputs instead.

The page computes entirely in the browser and sends nothing anywhere, which
keeps it consistent with the site's no-analytics posture.

## Verified

Hand-checked against the Swift with evidence present and magnitude 0.8
(blend = 0.5 + 0.5 × 0.8 = 0.9): FAVORITE 1.0 × 0.9 × 2.5 = +2.25, PREFER
+1.13, AVOID −2.25, NEUTRAL 0. All four reason templates fire, including the
`UP` variant gated on evidence and magnitude ≥ 0.5.
