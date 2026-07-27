# Addendum 002 — Mobile-first shop flow, desktop adaptation

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-27

## Ask

Human dropped 8 As-is reference screenshots (`inputs/RetailsModuleItteration/As-is/`)
and asked for a full clickable prototype of the retailer-facing ordering app:

- A landing choice: open the **desktop** experience or the **mobile** experience.
- **Mobile**: a QR/link opens straight into **Shop** — no login wall. Shop has
  search, category filter, catalog with qty steppers. Header ⓘ opens a
  **Company Info** bottom sheet. A floating cart bar opens a **Review Order**
  sheet → **Place Order**. **Orders** tab shows history with live status; tap
  an order opens an **Order Detail** sheet (items, timeline, invoice/reorder).
  **Profile** tab holds account, saved addresses, payment, credit.
- **Desktop**: same feature set, laid out for a larger screen (not a literal
  copy of the legacy admin table screenshot) — agent's design discretion.
- Both must be genuinely responsive, then run locally for a smoke test.

Inputs: `inputs/RetailsModuleItteration/As-is/*.png`, each with a sibling
`*.annotation.md` text derivative (added this iteration, per R8) describing:
image.png (Order Detail sheet), 14-26-59 (legacy desktop table — superseded
chrome, feature set only), 14-42-32 (Shop tab), 14-43-13 (Company Info sheet),
14-43-26 (Orders tab), 14-43-40 (Profile tab), 14-44-39 (Shop + floating cart
bar), 14-44-49 (Review Order sheet). Provenance: human, 2026-07-27.

## Analysis (R3 — table first)

| Screen / state | Real page or overlay? | Mobile | Desktop |
| --- | --- | --- | --- |
| Entry hub | Real page | `index.html` — choose Desktop / Mobile | same |
| Shop | Real page (default view) | Full-bleed list, bottom tab bar | Header + sidebar categories + product grid, persistent cart panel |
| Orders | Real page (tab) | List, tap row → sheet | Table, click row → modal |
| Profile | Real page (tab) | Stacked sections | Two-column layout |
| Company Info | Overlay | Bottom sheet (slide up, drag handle) | Centered modal dialog |
| Review Order | Overlay | Bottom sheet from floating cart bar | Slide-in cart drawer, always visible when cart non-empty |
| Order Detail | Overlay | Bottom sheet (timeline + items + invoice/reorder) | Modal dialog, same content |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| One SPA per device (`screens/mobile.html`, `screens/desktop.html`); Shop/Orders/Profile are in-page views, not separate URLs | Matches the As-is bottom-tab / top-nav pattern — no full reload between tabs; QR/link can deep-link straight to Shop with no auth | 05-workflow-model |
| Company Info, Review Order, Order Detail are always overlays, never their own route | As-is screenshots show them as sheets over the current screen, on both mobile (bottom sheet) and desktop (modal) | 01-state-machine |
| No login wall on entry — QR/link opens directly into Shop | Explicit ask; matches "no login wall" requirement | 01-state-machine, 07-collaboration-contract |
| Desktop reuses the mobile app's feature set and visual language (green brand, cards, pills), not the legacy table chrome in 14-26-59 | Legacy screenshot is explicitly superseded; human asked for "adjust it according to mobile but large, designed for desktop as you wish" | design-principles.md |
| Placing an order clears the cart and inserts a new "Processing" order at the top of Orders | Only way the Orders tab's live-status story is demonstrable in a disposable prototype with fake data | 05-workflow-model |

## Outcome

Built `discovery/index.html` (hub/chooser), `discovery/screens/mobile.html`,
`discovery/screens/desktop.html`, and rewrote `discovery/seed-data/seed.json`
with company/categories/products/orders/profile fixtures shared by both
screens. Removed the placeholder `screens/screen-01.html` stub (unused
template content, superseded by the two real screens above).

Served locally with `python3 -m http.server` and role-played both flows
end-to-end with a headless-browser click-through (qty steppers → cart
bar/panel appears → Company Info opens and dismisses on backdrop click →
Review Order → Place Order clears the cart, inserts a new "Processing" order,
and switches to Orders → Order Detail opens with timeline/items/invoice →
Profile tab renders credit/addresses/payment). No console or page errors on
either screen. Screenshots match the As-is reference screens.

Pending: human role-play + accept as a version (R6).
