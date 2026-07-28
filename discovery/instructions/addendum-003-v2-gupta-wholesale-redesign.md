# Addendum 003 — Version 2 UI (Gupta Wholesale reference) + version switcher

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-28

## Ask

Human pasted 7 reference screenshots inline in chat (3 desktop, 4 mobile — not
saved as files on disk, so no sibling `.annotation.md` could be attached under
`inputs/`; the full description below is the text derivative, kept here per
R8's intent since the source images aren't persistable as files this time).
Provenance: human, 2026-07-28, no filename/link — described from the pasted
images directly.

Ask, verbatim intent: build this reference as a **Version 2** UI, without
touching the Addendum-002 build (**Version 1**) at all. Add a switcher so
both are reachable and comparable side by side, designed so V3/V4 can be
added later the same way. Reuse data/functionality where the two designs
overlap; only the UI/UX should differ. Fully clickable, responsive on mobile
and desktop, then run locally to verify.

### What the screenshots show (text derivative)

**Desktop — Shop**: Header row: "G" logo mark, "Gupta Wholesale Store" +
verified badge, subtitle "Authorised distributor for ABC Beverages", location
"Amritsar, Punjab"; right side Call / WhatsApp / Store info buttons + "RA"
avatar "My account" dropdown. Second row: tab nav **Shop / My purchases /
Payments / Help & queries** (icons, green active underline) + a cart summary
pill ("3 items · ₹1,680 ›"). A dismissible green promo banner ("SUMMER
STOCK-UP OFFER", "Save up to 15% on selected beverages", valid-till / offer
count / free-delivery-threshold chips, bottle imagery, × close). Search bar +
"Filters" button. Category pills: All / Offers / Water / Soda / Juices /
Energy Drinks / New Arrivals. A 4-column product grid: image, name, pack size,
price/case with struck-through MRP + "N% off", "N cases available", qty
stepper. "View all products" dropdown button, centered. Right sidebar: "My
account summary" card (purchased this month, paid, balance due in red, open
orders, open queries, "View details" link), a "Need help?" card (three
rows: ask seller / report issue / payment query, each with icon + chevron),
a 3-up trust-badge strip (Genuine / Secure / On-time). A thin footer bar:
"You are shopping with {store}" · GSTIN · support hours · © year.

**Desktop — Help & queries**: same header/tabs. Left: "How can we help you
today?" — 5 topic cards (ask seller, report damaged/missing, payment query,
delivery query, chat on WhatsApp with a "Quick response" chip), then a
"We're here to help" banner. Right: "My open queries" — rows with icon,
title, subtitle, date/time, a status chip (In Progress / Resolved), "View"
link; a "Common help topics" 4-up icon grid below (Ordering / Delivery /
Returns / Payments).

**Desktop — Payments**: same header/tabs. 4 stat cards (purchased this month
w/ vs-last-month delta, paid w/ delta, balance due w/ "N invoices pending",
next due date w/ "in N days"). Left: "Recent payment history" table (date,
reference/mode, amount, Paid chip) and "Outstanding invoices" table (invoice
no., date, due date, amount, status chip: Due in N days / Overdue / Paid).
Right: "Pay your outstanding balance" card (total due, next due date, green
"Pay now" button, "Download statement" / "Share receipt" buttons), and a
"Payment query" card (WhatsApp / call / report-issue rows).

**Mobile** (4 screens, iOS status-bar chrome): **Help & queries** — stacked
topic cards (ask seller, report an issue, payment query, "view previous
queries"), a green WhatsApp quick-help banner; bottom tab bar Shop / Purchases
/ Payments / Help. **Payments** — "Account summary" card (purchased, paid,
balance due in red, "Next due in N days" chip, "Pay now" button), "Recent
payments" list (date, amount, mode, chevron). **My purchases** — stats strip
(this month total, open orders), order cards (id, date, total, status chip:
Delivered / In transit / Pending, "Reorder" on delivered / "View details" on
the rest). **Shop** — store header (logo, name, subtitle, location, Call /
WhatsApp), the same promo banner condensed, search + filter icon, category
pills (All / Offers / Buy again / Water), product list rows with qty
steppers, a light floating cart bar (cart icon + count badge, total,
"Review order" button), bottom tab bar.

## Analysis (R3 — table first)

| Aspect | Version 1 (Addendum 002) | Version 2 (this addendum) |
| --- | --- | --- |
| IA | Shop / Orders / Profile | Shop / My purchases / Payments / Help & queries |
| Seller identity | "Role Play Wholesale", plain header + ⓘ sheet | "Gupta Wholesale Store", verified badge, Call/WhatsApp/Store-info actions |
| Merchandising | None | Dismissible promo banner, MRP+discount pricing, pack sizing |
| Money | Credit bar only (Profile) | Full Payments page: stat cards, payment history, invoices, pay-now flow |
| Support | None | Dedicated Help & queries: topics + open-query tracker |
| Desktop chrome | Sidebar cart panel only | Header actions, account-summary sidebar, need-help card, trust badges, footer bar |
| Files | `screens/mobile.html`, `screens/desktop.html` | `screens/mobile-v2.html`, `screens/desktop-v2.html` (new, sibling files) |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| V2 lives entirely in new files (`mobile-v2.html`, `desktop-v2.html`, `seed-data/seed.v2.json`); zero bytes of `mobile.html`/`desktop.html`/`seed.json` touched except one appended, self-contained version-switcher block | Explicit "don't modify V1" requirement; append-only keeps V1's existing code/behaviour byte-identical while still surfacing a same-screen switcher | 07-collaboration-contract |
| `seed.v2.json` is additive only — new keys (`store`, `promo`, `productsV2`, `purchasesV2`, `payments`, `help`) — never edits `seed.json` | V1 and V2 read the same `seed.json` for anything they'd otherwise duplicate (e.g. would break V1's rendered categories/products if shared keys were mutated); V2-only concepts (invoices, queries, promo) have no V1 equivalent to reuse, so they get their own file | 02-domain-model |
| Version switcher = a small fixed corner control, same tiny script in all 4 screens + a "Versions" section appended to `index.html`; array-of-{label,href} so V3/V4 is a one-line addition | Matches "switch instantly," "coexist," "easy to extend" asks without a build step or router (still HTML/CSS/vanilla JS only, SPEC §3.1) | 05-workflow-model |
| Every V2 surface stays interactive with demo semantics identical in spirit to V1 (toast confirmations, sheets/modals, in-memory state) rather than dead visuals | "Fully clickable and interactive" ask; consistent with V1's existing place-order/close-sheet pattern | 01-state-machine |

## Outcome

Built `discovery/seed-data/seed.v2.json`, `discovery/screens/mobile-v2.html`,
`discovery/screens/desktop-v2.html`; appended an isolated version-switcher
widget to `index.html`, `mobile.html`, `desktop.html`, `mobile-v2.html`,
`desktop-v2.html` (new code only, nothing existing edited or removed).
Role-played both V2 screens end-to-end with a headless-browser click-through
(no console/page errors) — see instructions.md log. Pending: human review,
then accept as a version (R6).
