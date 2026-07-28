# Addendum 005 — Version 3 desktop reference pass

> Inputs: five desktop screenshots supplied by the human on 2026-07-28.
> Status: Built — pending human review

## Ask and analysis

| Scope | Finding | Decision |
| --- | --- | --- |
| Versions | V1/V2 and all mobile layouts are already acceptable | Change only `screens/desktop-v3.html` |
| Shared shell | V3 used a generic 1280px layout and its tab selector did not match the actual DOM | Rebuild the desktop shell at the reference proportions and fix the selector |
| Shop | Banner, four-product grid, filters, summary and support rail did not match the reference density | Apply a desktop-only presentation pass while retaining the existing cart/search/filter logic |
| Payments | Cards, tables and payment rail were undersized and dates displayed raw ISO values | Match the four-card/table/rail composition and format display dates |
| Help | Columns, query rows, topic cards and support block did not match the supplied desktop view | Match the two-column reference composition while retaining query actions |
| Purchases | No new desktop reference was supplied for this tab | Keep its existing data/actions, but bring it under the corrected desktop shell and styling |

## Outcome

`desktop-v3.html` now has a desktop-only (`min-width: 1001px`) reference pass,
working Shop/Purchases/Payments/Help navigation, functional cards and modals,
formatted dates, and optional hash deep links for direct review. Local browser
captures were checked at 1536 × 1024. No mobile screen, V1 screen, V2 screen,
seed fixture, or development application file was changed.
