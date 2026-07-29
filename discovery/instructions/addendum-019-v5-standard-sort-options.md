# Addendum 019 — V5 standard sort dropdown options

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human attached a reference screenshot of a standard e-commerce sort dropdown
(Sort: Relevance / Price: Low to High / Price: High to Low / Name: A to Z /
Name: Z to A / Newest First / Oldest First) and asked for the Shop page's
sort control to match it exactly, on both platforms, then be published.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1 | Sort options should match the attached list | Addendum 018 had replaced the sort dropdown with wholesale-trade terminology ("Recommended for retailers", "Best retailer margin", "Stock availability", etc.); this ask supersedes that with the plain, standard set from the reference. Swapped the `<option>` list on both `desktop-v5.html` and `mobile-v5.html` to the seven exact labels/order shown |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Removed the now-unreachable `margin-desc`/`stock-desc` sort branches from `renderProducts()`'s comparator instead of leaving them as dead code | No `<option>` can produce those values anymore, so the branches could never execute; `name-asc`/`name-desc`/`oldest` comparators were already implemented and just needed exposing as options, so no new sorting logic was required | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`
only. Verified via Puppeteer that both platforms render the exact seven
options in the requested order/labels, and that Name: A-Z, Name: Z-A,
Newest First, Oldest First and Price: Low/High-to-Low all reorder the grid
correctly. V1-V4 regression re-confirmed unaffected.
