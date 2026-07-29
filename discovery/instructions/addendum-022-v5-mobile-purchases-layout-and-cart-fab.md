# Addendum 022 — V5 mobile Purchases layout and collapsible cart FAB

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human asked for two mobile-only fixes: (1) remove the "spend analyser" stat
strip (This month / Open orders / Delivered / Pending-Active) from the
Purchases page, and move the search field above the status filter pills,
per an attached reference; (2) the floating cart bar should default to a
small round icon-only button, expanding to the existing full bar (item
count, total, "Review Cart") only when tapped — explicitly keeping the
expanded state's design untouched.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1a | Remove the stat cards | Deleted the `.stats-strip` block and its four value spans from the Purchases view, its CSS, and the `renderPurchases()` lines that populated them |
| 1b | Search above filters | Reordered the Purchases view's markup: `#orderSearch` now precedes `.filter-scroll` (previously the reverse) |
| 2 | Collapsible cart bar | Added a `.collapsed` state to `#cartBar` (default), rendering it as a 56px round FAB (brand-coloured, cart icon + count badge) anchored bottom-right; the existing item-count/total/"Review Cart" bar renders unchanged when `.collapsed` is toggled off. Tapping the icon (`#cartBarToggle`, the icon+count wrapper) toggles the class; the "Review Cart" button's own click handler is untouched |

## Bug found and fixed during testing

The first collapsed-FAB implementation sized `.cart-badge` at `width:100%;
height:100%` to fill the circle. Because its flex-parent (`.cart-left`) has
no definite height of its own (`.cart-bar` uses `align-items: center`, which
sizes flex items to content rather than stretching them), the percentage
resolved to 0 and the whole FAB became unclickable — confirmed via
`getBoundingClientRect()` showing `0×0` before the fix. Fixed by sizing
`.cart-badge` (and its `.cart-left` wrapper) to the FAB's actual `56px`
pixel dimensions instead of a percentage.

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Toggle target is the icon+badge (`#cartBarToggle`), not the whole bar | The bar also contains the "Review Cart" button; listening on the whole bar would fire both the collapse toggle and the button's own navigation on every tap | 03-ux-component-library |
| No new close/collapse affordance added to the expanded bar | The ask was explicit about not changing the expanded look "1%"; tapping the same icon again collapses it, reusing the existing element instead of adding a new one | 03-ux-component-library |
| Mobile only | Both the reference screenshots and the explicit ask ("need this changes for mobile") scoped this to `mobile-v5.html`; desktop's Purchases stat cards and Review Cart drawer weren't touched | 07-collaboration-contract |
| V1-V4 untouched; only `mobile-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` only. Verified via Puppeteer:
stat cards gone, `#orderSearch` precedes `.filter-scroll` in the DOM, the
cart FAB is a real, clickable 56×56 circle collapsed by default, tapping it
expands to the unchanged full bar and tapping again re-collapses it, and
"Review Cart" still opens the Review Cart sheet correctly when expanded.
V1-V4 (and desktop V5) regression re-confirmed unaffected.
