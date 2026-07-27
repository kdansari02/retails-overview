# Design Principles — Foodbridge Module Retails

> Fill this in as discovery progresses. This document is the human-readable bridge
> between "what we role-played" and the SSOTs that will govern development.

<!-- Single file by default. If it outgrows one file, graduate to a
     design-principles/ folder with an index.md entry + fragments (tone.md,
     accessibility.md, decisions.md). Keep it focused on discovery-phase
     UX intent/tone/constraints/decisions — a shared design system belongs in the
     module-level resources/, human-provided research in instructions/inputs/, and
     ratified interaction/presentation semantics in SSOT-3 / SSOT-4 (SPEC §3.1). -->


## 1. Problem statement

A retailer needs a frictionless way to browse a wholesaler's catalog, place a
repeat/bulk order, and track it through delivery — without an account-creation
or login step getting in the way of a QR-code/link-driven flow.

## 2. Primary user(s) / actor(s)

- **Retailer (buyer)** — opens a QR/link, browses and orders on Shop, checks
  the wholesaler's Company Info, tracks Orders, manages Profile (addresses,
  payment, credit). No auth required to reach Shop.
- **Wholesaler (seller)** — implied owner of the catalog/company info shown;
  not yet a modeled actor with their own screens in this iteration.

## 3. What "good" looks like

Placing a repeat order should take seconds: search or filter, bump qty
steppers, review the cart, place it. Nothing should require a page reload —
Shop/Orders/Profile feel like one continuous app. Trust signals (company
rating, address, GST, live order status, invoice) should be one tap/click
away, never buried.

## 4. Constraints learned during discovery

- No login wall on entry — QR/link opens directly into Shop (Addendum 002).
- Company Info, Review Order, and Order Detail are always overlays (sheet on
  mobile, modal/panel on desktop) over the current screen, never their own
  route — mirrors the As-is reference screenshots exactly.
- Desktop is not a straight port of the legacy admin-table screen (superseded
  chrome); it reuses the mobile app's feature set and modern visual language.

## 5. Decisions carried into Development

| Decision | Rationale | Feeds into SSOT |
|---|---|---|
| e.g. "Status has 4 states, no skipping states" | Prevents invalid business states | 01-state-machine, 05-workflow-model |

## 6. Accepted version

- Version: `vN`
- Date accepted:
- Accepted by:
- Link/path: `discovery/versions/vN/index.html`
