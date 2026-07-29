# Instructions — Foodbridge Module Retails (discovery)

> **Single point of collaboration for the Discovery phase.** Any coding agent
> iterating on the HTML prototypes reads this first, logs every instruction it is
> given as an addendum, and continues from where the last iteration left off.
> This is the append-only record of the *build → measure → learn* loop.

## Scope

Discovery is **HTML only** — no frameworks, no real data layer (SPEC §3.1). Each
instruction here shapes a prototype iteration or the problem framing. When the
human marks an iteration as a version ("this is the one"), that acceptance is
logged as an addendum and snapshotted under `versions/`.

## Context / file definitions

| Ref | Path | What it is |
| --- | ---- | ---------- |
| Prototype | `../index.html` | Current/latest discovery prototype |
| Versions | `../versions/` | Accepted snapshots, one folder per accepted iteration |
| Seed data | `../seed-data/seed.json` | Fake but representative data driving the prototype |
| Design principles | `../design-principles.md` | UX intent, tone, constraints learned during discovery |
| Inputs | `inputs/` | Human-provided discovery source material — briefs, research, personas, walkthroughs, screenshots (§12.5) |

## Working rules

Standing rules are in **[Addendum 001 — Working Rules](./addendum-001-working-rules.md)**.

## Addenda

- [Addendum 001 — Working Rules](./addendum-001-working-rules.md) — standing rules for how we work in discovery (addendum-first, table summaries, iteration-as-version, gradual context build-up)
- [Addendum 002 — Mobile-first shop flow, desktop adaptation](./addendum-002-mobile-desktop-shop-flow.md) — full Shop/Orders/Profile app from the As-is screenshots, desktop + mobile entry points
- [Addendum 003 — Version 2 UI (Gupta Wholesale reference) + version switcher](./addendum-003-v2-gupta-wholesale-redesign.md) — Shop/My purchases/Payments/Help & queries redesign as a new, switchable Version 2 alongside the untouched Version 1
- [Addendum 004 — Version 3: pixel-accurate Gupta Wholesale rebuild](./addendum-004-v3-pixel-accurate-redesign.md) — closes visual gaps against a fuller reference set (wordmark logo, ribbon promo, purchases-sort fix) as a new, switchable Version 3; V1 and V2 remain untouched
- [Addendum 005 — Version 3 desktop reference pass](./addendum-005-v3-desktop-reference-pass.md) — desktop-only correction of the V3 shell and all four clickable sections against the supplied 1536px reference views
- [Addendum 006 — Short root landing URL](./addendum-006-short-root-landing-url.md) — keeps the public repository-root URL visible while rendering the complete V1/V2/V3 discovery hub
- [Addendum 007 — V3 photography, icons and responsive rebuild](./addendum-007-v3-photography-icons-responsive-rebuild.md) — replaces placeholder bottles and emoji with supplied product photography and Lucide-style SVGs, and rebuilds desktop/mobile V3 card layouts
- [Addendum 008 — V3 single-product crop fix](./addendum-008-v3-single-product-crop-fix.md) — constrains desktop product photography to one centered crop so neighbouring products cannot appear inside a card
- [Addendum 009 — Version 4 pixel-reference implementation](./addendum-009-version-4-pixel-reference.md) — adds isolated desktop/mobile V4 routes, rebuilds desktop Purchases, and documents the screenshot-derived FoodBridge UI guidelines
- [Addendum 010 — V4 Payments reference correction](./addendum-010-v4-payments-reference-fix.md) — corrects V4 desktop payment icons, typography, history details, balance-card structure and 1620px canvas against the supplied reference
- [Addendum 011 — Version 5: functional polish pass](./addendum-011-version-5-functional-polish.md) — sort, working pagination, no promo banner, no GST on customer pages, redesigned Review Cart, full order-detail view, split/partial payment flow, mobile Profile tab, Store Details page, "Review Cart" rename, first-login profile gate; V1–V4 untouched
- [Addendum 012 — Align Version 5's visual scale with Version 4](./addendum-012-v5-ux-alignment-with-v4.md) — ports V4's large-desktop header/nav/card scale, KPI icon badges, pill action buttons and Purchases help-rail into V5; fixes the mobile switcher overlapping the header
- [Addendum 013 — V5 payment-flow redesign + dedicated onboarding page](./addendum-013-v5-payment-flow-and-onboarding-page.md) — rebuilds the payment flow against a supplied reference (outstanding stats, split payment, allocation bar, order-summary rail), converts first-login profile capture to a dedicated page, adds a Review Cart savings line, promotes Profile to a desktop top-nav tab
- [Addendum 014 — V5 header, cart drawer, and scale fixes](./addendum-014-v5-header-drawer-and-scale-fixes.md) — restores Call/WhatsApp to the header, moves desktop Review Cart to a right-side drawer, enlarges product photos and fonts to match V4, removes the footer bar, and makes desktop Profile dropdown-only again
- [Addendum 015 — V5 "Pay now" drawer, product pagination, Payments-page fonts](./addendum-015-v5-pay-now-drawer-and-payments-page-fonts.md) — wires the Payments-page "Pay now" button to the same split/cash/UPI/card payment flow as checkout (desktop as a right-side drawer, mobile as a bottom sheet), fixes desktop's product-grid page size back to 8, and re-scales the Payments page's table/summary/help-row fonts that had shrunk below the rest of the page
