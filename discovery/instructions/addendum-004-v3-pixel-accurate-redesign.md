# Addendum 004 — Version 3: pixel-accurate Gupta Wholesale rebuild

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-28

## Ask

Human pasted 6 more reference screenshots inline in chat (1 combined mobile
strip showing Shop/My purchases/Payments/Help & queries, 1 mobile Shop close-up,
3 desktop pages, 1 mobile Purchases/Payments/Help close-up set — not saved as
files, same as Addendum 003; described below as the text derivative). Ask:
build a **Version 3** that matches these references pixel-for-pixel — layout,
spacing, colours, typography, icons, shadows, borders — without touching V1 or
V2 at all, reusing existing business logic (the same data/interactions),
switching only the presentation layer. Add V3 to the version switcher. Fully
responsive, fully clickable, run locally to verify.

### What's actually different from Version 2 (the real work here)

The reference screens are visually very close to Addendum 003's V2 (same
"Gupta Wholesale Store" app) — because V2 was already built from an earlier
batch of the same reference set. Diffing this new, more complete batch against
the already-built V2 found concrete, fixable gaps:

| # | Gap found | Where |
| - | --- | --- |
| 1 | Logo is a stacked wordmark ("GUPTA" bold green / "WHOLESALE" small grey caps in a bordered box), not a single-letter avatar | Desktop + mobile header |
| 2 | Promo banner is a folded-ribbon badge on a soft sunburst, not a flat pill | Shop (both) |
| 3 | Product thumbnails are photographic bottles, not abstract placeholders | Shop grid/list |
| 4 | "Account summary" heading has an ⓘ info icon | Payments (mobile) |
| 5 | Purchases list order is newest-first by date (12 Jul → 05 Jul → 01 Jul); V2's `.reverse()` in `renderPurchases()` actually flips this backwards — a real bug, confirmed against the dates | My purchases (both) |
| 6 | Mobile Payments "due" chip reads "Next due in 5 days"; desktop's stat card reads "In 3 days" — the two references genuinely disagree with each other, not a copy-paste slip on one side | Payments |

## Analysis (R3 — table first)

| Aspect | Version 2 (Addendum 003) | Version 3 (this addendum) |
| --- | --- | --- |
| Data / interactions | `seed.json` + `seed.v2.json`, cart/orders/payments/help logic in each screen's own `<script>` | **Same** `seed.json` + `seed.v2.json` — no new seed file, no duplicated business rules; only the render/markup functions are rewritten |
| Purchases sort | Reversed (bug, item 5 above) | Fixed: newest-first, matching source dates |
| Logo | Single-letter avatar | Stacked wordmark box (item 1) |
| Promo banner | Flat badge pill | Ribbon-on-sunburst (item 2, best-effort CSS — see Outcome) |
| Product art | Grey diagonal-stripe placeholder | Flat-colour bottle silhouettes per product (item 3 — no real photography available, see Outcome) |
| Files | `screens/mobile-v2.html`, `screens/desktop-v2.html` | `screens/mobile-v3.html`, `screens/desktop-v3.html` (new, sibling files) |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| V3 fetches the same `seed.json` + `seed.v2.json` as V2, does not fork a `seed.v3.json` | Explicit ask: "use existing business logic wherever possible, only replace the presentation layer"; V3 is a skin, not a new domain | 02-domain-model |
| The purchases-sort bug (item 5) is fixed **only** in V3's `renderPurchases()`; V2's file is byte-for-byte untouched, bug and all | "Do NOT modify Version 2" is explicit and absolute, even to fix a bug found while building V3 — the fix ships forward, V2 stays a frozen snapshot | 07-collaboration-contract |
| Product art is CSS-drawn bottle silhouettes (colour-coded per product), not photography | No source image assets were provided (screenshots aren't extractable as usable product cutouts) or licensed for reuse; this is the closest honest substitute — flagged as a known gap against "pixel-perfect", not silently approximated | 03-ux-component-library |
| Promo ribbon is CSS `clip-path` + radial-gradient, not a traced vector | Same reasoning — best-effort recreation of the folded-ribbon-on-sunburst look without a source vector to trace | 03-ux-component-library |
| The version-switcher's `versions` array gets one new `{label:'V3', href:...}` line added to all 4 existing screen files (V1 ×2, V2 ×2) | The switcher was explicitly designed for this ("Add future versions here" comment, Addendum 003) and the human's own rule set carves out exactly this: *"Do NOT change existing routes unless adding Version 3 support"* — this is that. Nothing else in those 4 files changes | 05-workflow-model |

## Outcome

Built `discovery/screens/mobile-v3.html`, `discovery/screens/desktop-v3.html`.
Extended the `versions` array (one line each, nothing else touched) in
`mobile.html`, `desktop.html`, `mobile-v2.html`, `desktop-v2.html` so the
switcher offers V1 · V2 · V3 everywhere. Appended a V3 section to
`index.html` (additive, same pattern as Addendum 003 used for V2). Verified
with a headless-browser regression pass on V1/V2 (unchanged behaviour) plus a
V3 click-through — see instructions.md log.

Known gap against "pixel-perfect": product photography and the exact ribbon
vector aren't reproducible without source assets (raster screenshots only);
CSS approximations were used instead and are called out above rather than
presented as exact. Pending: human review, then accept as a version (R6).
