# Addendum 012 — Align Version 5's visual scale with Version 4

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-28

## Ask

Human flagged that V5's UI didn't read as "proper" — V4 has the right visual
scale/polish (from the as-is references) but is missing V5's functionality;
V5 has the functionality but its own UI drifted from that scale during the
Addendum 011 build. Ask: keep V5's functional additions, but restyle it to
match V4's actual visual language (V4 = V3's large-desktop CSS plus V4's
Purchases-page patches).

## Analysis (R3 — table first)

| Gap found (screenshot diff, V4 vs V5) | Fix |
| --- | --- |
| Desktop: header/logo/nav noticeably smaller than V4's (56px logo vs V4's 94×88, 18px name vs 28px) | Ported V3's `@media (min-width:1001px)` large-desktop scale into desktop-v5.html |
| Desktop: content capped at 1240px and centered, leaving dead margins V4 doesn't have | Same media query removes the cap (`main { max-width:none }`), matching V4's edge-to-edge layout |
| Desktop Purchases: V5's stat cards were plain text, V4's have a circular icon badge per KPI | Added `.stat-icon` badges (wallet/bag/box/clock) to the four Purchases KPI cards and the four Payments KPI cards |
| Desktop Purchases: V5's row actions were bare text links, V4's are bordered pill buttons | Renamed `.link-btn` → `.order-pill-btn` with V4's border/pill styling |
| Desktop Purchases: V4 has a right-rail "Need help with an order?" card (reorder / raise issue / WhatsApp); V5 had no right rail at all | Added the same three-row rail + trust strip, wired to the topic modal / WhatsApp / a toast |
| Mobile: product cards read smaller/tighter than V4's (13.5px names, 24px steppers) | Bumped card text/stepper sizes back to V3/V4's values (14px names, 26px steppers, `min-height:112px` rows) |
| Mobile: the version-switcher pill (top-right, from Addendum 011's tab-overlap fix) visually overlapped the store name text | Replaced the always-open pill with a compact "V5" toggle button that expands a small dropdown on tap — same links, no header collision |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| V5 keeps every Addendum 011 functional difference from V4 (no promo banner, no GST, Sort instead of Filters, Call/WhatsApp moved to Store Details, Review Cart rename, payment flow, Profile tab, first-login gate) — only the *sizing/spacing/component-styling* was brought back in line with V4 | The human's ask was about UI/UX polish reading "not proper," not about reverting the explicit, still-standing requirements from the prior instruction; conflating the two would silently undo real, requested functionality | 07-collaboration-contract |
| Desktop's version-switcher (bottom-left) was left untouched — only mobile's was redesigned | Desktop has no bottom tab bar to collide with; the pill already sits clear of interactive content there | 05-workflow-model |

## Outcome

Edited `discovery/screens/desktop-v5.html` (added the large-desktop media
query, KPI icon badges, pill action buttons, the Purchases help rail) and
`discovery/screens/mobile-v5.html` (card sizing, switcher redesign). No other
version touched. Re-ran the full Addendum 011 test suite plus a fresh
screenshot diff against V4 — all pass, and the two now read as the same
design language.
