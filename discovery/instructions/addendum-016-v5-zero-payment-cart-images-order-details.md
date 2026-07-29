# Addendum 016 — V5 zero-value payments, cart thumbnails, order/query details

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human reviewed the deployed V5 payment drawer, Review Cart, Purchases table,
Store Info modal, and Help & queries panel, and asked for five fixes: (1)
allow submitting a payment with ₹0 allocated — the customer may want to pay
nothing now and settle later, with the full order amount rolling into the
outstanding balance, instead of the flow blocking the button; (2) show a
product image next to each line in Review Cart, on both platforms; (3) stop
showing "Reorder" on delivered orders in the Purchases table — always show
"View details" and make it actually open the order's details; (4) the Store
Info modal's text was too small, and Call/WhatsApp/Map inside it are
redundant now that Call/WhatsApp live in the header — remove them from the
modal on desktop; (5) the "View →" links under "My open queries" on the Help
page didn't open anything.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1 | Accept ₹0 payment, defer the rest to outstanding | `updateAllocation()`'s "nothing entered" branch previously showed "Select a payment method" and disabled Confirm/Pay Now unconditionally; changed to always allow it, with a status line explaining the amount is being deferred. Order records now get `paymentStatus: 'Unpaid'` (distinct from `'Partially Paid'`) when nothing was paid at confirm time |
| 2 | Product image per Review Cart line | The `.thumb` element and its background-position values already existed in the markup — the bug was that the crop offsets were calibrated for a 100×100 `.product-photo` box but reused as-is on the 48×48 (desktop) / 40×40 (mobile) `.thumb` box, at the same zoom level, so each thumbnail showed a mostly-blank corner of the sprite instead of the bottle. Recalculated the offsets to re-center the same crop within the smaller box (`old - (100-boxSize)/2` in both axes) |
| 3 | Always "View details", make it work | The order-row button showed "Reorder ↻" for delivered orders and, when clicked, only fired a toast — it never opened `openOrderDetail()`. Removed the status-conditional label and the early-return branch; every row now always says "View details ›" and opens the real order detail view/sheet |
| 4 | Store Info modal: bigger text, drop redundant Call/WhatsApp/Map (desktop only) | Removed the three action links and their now-dead `href`-setting JS (kept the plain-text phone/WhatsApp line that already existed above them); added a `#storeModal`-scoped override inside the desktop scale-up block for larger heading/label/value text |
| 5 | "My open queries" → View not opening | Was wired to a placeholder toast. Added a real `queryDetailModal` (query ID, category, raised-on timestamp, status pill, a short status note) and wired each row's "View →" to open it with that query's data — mobile's Help page has no open-queries list, so no mobile change was needed here |

## Bug found and fixed during testing

The new `queryDetailModal` was first built with its own top-right ✕ button
(copying the `paymentModal`/`cartModal` drawer-close pattern) *and* a status
pill in the header row — the two collided, clipping the pill's text behind
the ✕. `orderDetailModal` (the existing, similar detail view) never had this
problem because it relies on its bottom "Close" button only. Removed the
redundant ✕ from `queryDetailModal` to match that existing convention.

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| ₹0 is valid at confirm time regardless of `allowPartialPayment` | The flag governs *partial* payment (something entered, something deferred); paying nothing now is a distinct, always-allowed case per this ask, not a partial payment | 03-ux-component-library |
| Cart-thumb crop offsets are computed from the existing 100×100 baseline, not re-derived from scratch | Keeps a single source of truth for "where the bottle is" in the sprite sheet; only the box-size-dependent centering math changes per usage site | 03-ux-component-library |
| Query detail modal shows only fields present in seed data (id, type, title, timestamp, status) plus a generic status note — no fabricated conversation thread | The seed has no message/description field; inventing one would be fake data with nothing behind it | 07-collaboration-contract |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`
only. Re-ran the full regression + feature suite (V1-V4 untouched, onboarding
gate, header, footer, drawers, product/font scale, balance-pay flow from
Addenda 014-015) plus new checks for: ₹0-allocation acceptance and the
resulting balance-due increase, cart-thumbnail crop no longer blank, the
Purchases table's uniform "View details" opening the real detail view/sheet
for every status, the Store Info modal's missing action links and larger
text, and the query-detail modal opening with correct data — all pass.
Screenshot-verified visually on desktop.
