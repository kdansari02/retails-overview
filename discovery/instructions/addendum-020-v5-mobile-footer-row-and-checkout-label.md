# Addendum 020 — V5 mobile footer button row and "Checkout" label

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human reviewed the deployed mobile V5 (profile-gate modal, Review Cart
sheet, payment sheet) and asked for three fixes, all mobile: (1) rename
Review Cart's "Proceed to Payment" button to "Checkout"; (2) the primary
action button and its accompanying "Back to Shop"/"Cancel" link should sit
in one row, not stacked as two rows; (3) stop using a "Back to Shop" text
link — use a proper "‹ Back" icon button instead.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1 | "Proceed to Payment" → "Checkout" | Relabeled to "Checkout →" on the Review Cart sheet |
| 2 | One row, not two | `.btn-row.stack` (`flex-direction: column`) was the cause — used on the profile-gate modal, Review Cart sheet, and payment sheet footers, each rendering the primary button full-width with the back/cancel link centered on its own line below. Dropped `.stack` on all three, so they use the plain `.btn-row` (flex row) already used elsewhere in the file |
| 3 | Icon back button, not a text link | Added a `.btn-back-icon` class (48px, fixed-width, "‹" glyph) and swapped it in for "Back to Shop" (profile gate, Review Cart) and "Cancel" (payment sheet) — same `data-close`/click behaviour as before, just a compact icon button sharing the row with the primary CTA instead of a full-width text link underneath it |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Scoped to mobile only | All three reference screenshots were mobile, and the two-row wrapping only happens at mobile's narrower width — desktop's equivalent footers weren't flagged and weren't touched | 07-collaboration-contract |
| Same icon glyph and behaviour ("‹", `data-close`) reused across all three footers instead of three different treatments | The three footers are functionally the same pattern (secondary dismiss + primary continue); one consistent component reads better than three variants | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` only. Verified via Puppeteer that
all three footers now render their two buttons on the same row (matching
`top` coordinates) and that the Review Cart button reads "Checkout →".
Screenshot-verified visually. V1-V4 regression re-confirmed unaffected.
