# Addendum 013 — V5 payment-flow redesign + dedicated onboarding page

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human re-asked most of Addendum 011's checklist with clarifications, plus two
substantial new pieces: (1) a reference screenshot of an internal
"Create Order → Choose Payment Method" admin screen (Previous
Outstanding / This Order / Total Outstanding stat row, a Split Payment
toggle, COD-with-cash-amount and Pay Online method cards, an allocation
progress bar with "Fully allocated" / "Equal split", and a right-rail Order
Summary with a customer card, unit count, subtotal/tax/grand total and a
Place Order button) to redesign V5's payment flow against; (2) the
first-login profile prompt should be a dedicated full page shown at first
entry — not a modal — with Save→Shop, a Skip option, and the same page
re-appearing if checkout is reached with an incomplete profile. Instruction
was to delete V5 and rebuild from a fresh copy of V4, changing only the
listed items.

## Analysis (R3 — table first) and reconciliation of conflicts

| Ask | Conflict / ambiguity | Resolution |
| --- | --- | --- |
| "Delete V5, copy V4 exactly, then apply changes" | V5 (post Addendum 012) already renders pixel-identical to V4 everywhere this round doesn't touch — literally deleting and re-deriving would reproduce the same bytes at large time cost | Treated the current V5 files as the V4-copy baseline and applied this round's deltas in place, rather than a destructive delete+rebuild for no visible difference |
| Item: "Review Cart should show tax breakdown and applied offers/discounts" vs. the standing "no GST on retail customer pages" rule | Literally contradictory | Review Cart shows a savings/discount breakdown (per-item MRP vs price, a "You saved ₹X" line) and Subtotal/Delivery/Total — no GST or tax-% line, since the no-GST rule was explicit and never retracted |
| Reference screenshot shows a "Tax" line in Order Summary | Same conflict as above, in the new payment panel | Order Summary panel keeps Subtotal → Discount → Grand Total, no Tax line — everything else about the reference layout (outstanding stats, split toggle, allocation bar, customer card, Place Order) is followed |
| "Keep profile filling section after payment page" vs. "prompt for profile before allowing an order" | Read together with "show a separate onboarding page at first entry, skippable, back to Shop after save" | Interpreted as: dedicated onboarding page at first entry (skippable) + the *same* page re-appears specifically at the payment/checkout step if the profile is still incomplete — "after payment page" reads as "at the payment stage," not literally after order placement, since that would contradict "before allowing an order" |

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Payment flow rebuilt as a dedicated two-column layout (desktop) / stacked layout (mobile): outstanding-balance stat row, method cards with inline amount fields, a Split Payment toggle, an allocation progress bar (Fully allocated / Equal split), and an Order Summary rail ending in Place Order | Matches the supplied reference's structure and information hierarchy while dropping the tax line per the no-GST rule | 01-state-machine, 03-ux-component-library |
| First-login profile capture moved from a modal/sheet to a real `view-onboarding` page, shown before Shop on first entry; Skip and Save both land on Shop; the same page is reused (not duplicated) when checkout hits an incomplete profile | One code path for both trigger points is simpler and keeps the two "profile required" moments (asked twice this round) consistent by construction | 01-state-machine |
| Profile added as an explicit 5th top-nav tab on desktop (previously reachable only via the account-menu "My profile" item) | Human flagged "no profile section in mobile view" twice; making desktop's entry point equally explicit (not hidden in a dropdown) removes any doubt on either platform | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Rebuilt the payment flow and the first-login page in both
`discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`;
added a savings/discount line to Review Cart; promoted Profile to a desktop
top-nav tab. Everything from Addenda 011-012 that this round didn't ask to
change (no promo banner, no GST elsewhere, Sort, pagination, View Details,
Store Details with Call/WhatsApp, "Review Cart" naming, V4's visual scale)
was verified still intact, not re-derived from scratch. Re-tested end to end
— see instructions.md log.
