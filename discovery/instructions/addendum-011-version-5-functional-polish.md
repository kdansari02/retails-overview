# Addendum 011 — Version 5: functional polish pass

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-28

## Ask

Human asked for a 14-item functional/UX polish pass, explicitly as a **new
Version 5** built from a copy of V4's look — V1–V4 must not be touched. The
ask (verbatim scope, condensed): replace Filters with a working Sort menu;
make "View all products" actually load more; remove the promo banner; remove
GST-related display from customer-facing surfaces; redesign the Review Cart
modal; make "View details" open a full order-detail view; build a real
payment flow (cash/UPI/card/credit, partial + split payment, validation);
add a mobile Profile page + footer tab; move Call/WhatsApp off the header
into a Store Details page; rename "Review Order" → "Review Cart"; add a
first-login profile-completion gate before checkout; and reduce cognitive
load / improve card design and consistency throughout. Every interactive
element must do something real — no static/dead UI.

## Analysis (R3 — table first)

| # | Ask | Where it lives in V5 | Data source |
| - | --- | --- | --- |
| 1 | Sort not Filter | Shop toolbar: Sort dropdown (price ↑↓, name A–Z/Z–A, newest/oldest) drives `sortProducts()` | new `addedDate` per product in `productsV5` |
| 2 | "View all products" works | Paged reveal: 6 shown → button loads 6 more → "All products loaded" empty-state when exhausted | `productsV5` |
| 3 | Remove promo banner | `.promo` block deleted from markup entirely (not just hidden) — no reserved space left | — |
| 4 | Remove GST | No product/cart/checkout/order surface ever showed a tax %; the one GST-adjacent fact (seller GSTIN) is removed from the global footer and kept **only** inside the new Store Details page as a business-registration fact, not an order calculation | `seed.json`/`seed.v2.json` `store.gstin` (unchanged) |
| 5 | Review Cart redesign | Compact line rows (thumb + name + stepper + price), pinned summary/actions, "Proceed to Payment" primary / "Back to Shop" text-link secondary | cart state |
| 6 | View Details functional | Full modal: order id/date-time, customer, delivery address, itemised lines w/ image, discount, subtotal, delivery charge, total, payment status/mode, order status, store name, timeline | new `purchasesV5` (richer than V2's `purchasesV2`, API-shaped) |
| 7 | Full payment flow | Review Cart → Payment modal: per-row mode + amount, "add another method" (split), remove row, live remaining/overpaid validation, blocks overpayment, partial payment allowed (configurable flag) with remaining added to balance due | new `paymentConfig` |
| 8 | Mobile Profile page | 5th bottom tab; profile card, addresses, order-history link, notification toggles, edit/logout | new `customer` |
| 9 | Move Call/WhatsApp | Removed from header; live inside the Store Details modal with real `tel:`/`https://wa.me/` links + a generic maps-search link | `store` + `storeDetails` |
| 10 | Rename Review Order → Review Cart | All labels/titles/toasts | — |
| 11 | First-login profile gate | On load, `customer.profileComplete === false` opens a blocking-by-default completion form (name/mobile/email/address/city/state/postal/landmark, validated); "Proceed to Payment" re-opens the same form if still incomplete | new `customer.profileComplete` |
| 12–14 | Cognitive load / consistency / card redesign | Compact product cards (smaller photo, single price line, inline stepper), one accent colour, tightened spacing scale, no promo banner reclaiming space | — |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| V5 = two new standalone files (`mobile-v5.html`, `desktop-v5.html`), not an iframe-over-V3 patch like V4 | V4's iframe+DOM-patch approach can't safely host this much new stateful interaction (payment flow, profile gate, order-detail modal); a direct build is more robust while still visually starting from V3/V4's shipped look (wordmark logo, sprite-cropped product photography, SVG icon set) | 07-collaboration-contract |
| New `seed.v5.json`, additive only — `customer`, `productsV5`, `purchasesV5`, `paymentConfig`, `storeDetails` | V5 needs richer per-order and per-product fields (dates, delivery/payment breakdown, customer profile) that V1–V4's shared fixtures don't carry and shouldn't be forced to; nothing in `seed.json`/`seed.v2.json` is edited | 02-domain-model |
| GSTIN removed from every ubiquitous customer surface (footer) but kept in the dedicated Store Details page | The literal ask lists checkout/cart/order surfaces (none of which ever showed GST); the footer's GSTIN line is the one place GST-adjacent text appeared on every screen, so it's treated as in-scope; Store Details is a "who is this seller" fact page, not part of an order, so it stays there | design-principles.md |
| Partial/split payment defaults to **allowed** (`paymentConfig.allowPartialPayment = true`) | No business rule was confirmed either way; kept explicitly configurable (one flag) exactly as asked, with the remaining balance flowing into the existing Payments-tab "balance due" so the two features stay consistent | 05-workflow-model |
| First-login gate shows on every page load (no real auth/session in a static prototype) and offers "Complete later" so Shop stays browsable, but checkout re-opens the same form if still incomplete | Matches the literal rule ("required before placing an order", not before browsing) while still demoing the "shown at login" behaviour every time the prototype is opened | 01-state-machine |
| Version switcher gets one more line in all 8 existing screen files (V1×2, V2×2, V3×2, V4×2) | Same explicitly-carved-out exception used for V3→V4 ("don't change existing routes unless adding new-version support") | 05-workflow-model |

## Bug found and fixed during testing

The click-through test caught a real defect: V5 mobile's bottom tab bar has
five tabs spanning the full width, and the version-switcher pill (fixed,
bottom-left, inherited from earlier versions) sat directly on top of the
leftmost "Shop" tab. Clicking Shop actually hit the switcher's own link
underneath and reloaded the page instead of switching tabs. Fixed by moving
the mobile-v5 switcher to the header's top-right corner (free in V5 since
Call/WhatsApp moved into Store Details) — desktop-v5 keeps the original
bottom-left position since desktop has no bottom tab bar to conflict with.

## Outcome

Built `discovery/seed-data/seed.v5.json`, `discovery/screens/mobile-v5.html`,
`discovery/screens/desktop-v5.html`. Extended the switcher array/nav in
`mobile.html`, `desktop.html`, `mobile-v2.html`, `desktop-v2.html`,
`mobile-v3.html`, `desktop-v3.html`, `mobile-v4.html`, `desktop-v4.html`
(one line each). Appended a V5 section to `index.html`. Verified with a
headless click-through covering: sort, load-more, first-login gate (complete
+ "later" + re-prompt at checkout), Review Cart, split payment (over/under-
payment validation), View Details, Store Details (`tel:`/`wa.me` links),
mobile Profile tab, and confirmed no promo banner / no GST text renders
anywhere in V5. Pending: human review, then accept as a version (R6).
