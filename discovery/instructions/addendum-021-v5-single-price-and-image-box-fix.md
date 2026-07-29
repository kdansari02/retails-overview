# Addendum 021 — V5 single-price display and product-image box fix

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human asked for two fixes, both platforms: (1) simplify pricing throughout —
remove Review Cart's "You saved" line, remove the struck-through MRP / "X%
off" badge from product cards so only the actual charged price is shown,
and drop Review Cart's "Delivery charge" line, leaving Subtotal then Total;
(2) product images are misaligned — pointed at the Shop page's bottle photo
specifically, with a reference screenshot of a properly boxed/centred
product image from another app for comparison.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1a | Remove MRP/"% off" from product cards | Product cards now render only `<span class="p-price">` — the struck-through MRP and orange "X% off" badge are gone; `.p-mrp`/`.p-off` CSS rules removed as now-dead |
| 1b | Remove "You saved" from Review Cart | Removed the row and its savings calculation on both platforms |
| 1c | Remove "Delivery charge" | Removed the row everywhere it appeared (Review Cart, the payment flow's Order Summary rail, and the Order Detail view) — and made delivery genuinely free (`cartDeliveryCharge()` now always returns 0) rather than just hiding a charge that still applied, which would have been misleading |
| 2 | Product image alignment | Root-caused: mobile's `.product-photo` box was missing `background-color: #fafafa` (present on desktop's equivalent and on both platforms' Review Cart thumbnails) — without it, the sprite-cropped bottle sat with no visual container, reading as "floating"/misaligned against the card background rather than sitting in a defined box. Restored the missing property to match the other three photo containers in the app |

## Note — a business-rule conflict was NOT applied as literally written

The request also included, in the same sentence, showing a "Tax" line in the
summary. Addendum 011 established — and every round since has
reconfirmed — that no GST/tax may appear anywhere on customer-facing pages.
Since this round didn't state a clear, standalone intent to reverse that
rule, **no Tax line was added**; the summary is Subtotal → Total only.
Flagged back to the human for an explicit decision rather than guessed at
silently, since it's a business-rule change, not a UI preference.

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Delivery charge set to always ₹0 (not just hidden) | Removing a line item while still silently charging for it would be deceptive; if delivery isn't to be shown, it shouldn't be charged either | 03-ux-component-library |
| Removed `orderDiscount`/`discount` tracking entirely rather than computing-but-hiding it | Once nothing in the UI reads it, keeping the computation is dead code | 03-ux-component-library |
| `.p-mrp`/`.p-off` DOM spans and CSS removed rather than hidden via a class | Nothing in the app re-enables them; a dead, unused code path is worse than deleting it | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`
only. Verified via Puppeteer on both platforms: product cards show a single
price with no MRP/off badge; Review Cart, the payment flow, and Order
Detail all show no Discount/Delivery rows and Subtotal equals Grand Total;
the product-photo box now has the correct background color; and the full
checkout round-trip (profile gate → payment → order placed → order detail)
still works end to end. V1-V4 regression re-confirmed unaffected.
