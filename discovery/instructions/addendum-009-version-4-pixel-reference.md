# Addendum 009 — Version 4 pixel-reference implementation

> Inputs: all desktop Payments, Purchases and Help references; the four-screen
> mobile reference; and the FoodBridge UI screenshots supplied on 2026-07-28.
> Status: Built — pending human review

## Analysis

| Area | V4 decision |
| --- | --- |
| Versioning | Add isolated desktop/mobile V4 routes and add V4 to every switcher |
| Source of truth | Use only the supplied screenshots; no visual reinterpretation |
| Desktop Purchases | Four KPI cards, order tabs/search/filter, six-row order table and order-help rail |
| Desktop Payments/Help/Shop | Reuse the verified V3 presentation and interactions as the matching reference base |
| Mobile | Preserve the verified reference-matched four-tab V3 presentation inside the isolated V4 route |
| Guidelines | Add a reference-derived FoodBridge design-system document |

## Outcome

Created `screens/desktop-v4.html`, `screens/mobile-v4.html` and
`foodbridge-v4-design-guidelines.md`. V1–V3 presentation and behaviour remain
unchanged except for the additive V4 switcher link.
