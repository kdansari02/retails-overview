# Addendum 017 — V5 payment, profile gate, and order-status reference pass

> Linked from [instructions.md](./instructions.md)  
> Status: Built — pending human review  
> Created: 2026-07-29

## Ask

Keep V1–V4 unchanged and correct V5 against the supplied FoodBridge screenshots:
align the Payments page and recent-payment rows; do not interrupt first entry
with profile capture; request missing profile data only after Pay/Proceed to
Payment; show order progress horizontally; and support only Cash on Delivery
and shop UPI QR, including split, partial, and ₹0-now payment.

## Implementation contract

| Area | V5 rule |
| --- | --- |
| Entry | Shop opens immediately. No first-entry form or onboarding redirect. |
| Profile | If incomplete, Pay/Proceed opens an in-context modal on desktop and bottom sheet on mobile. Successful save resumes the interrupted payment action. |
| Methods | Cash on Delivery and Pay Online are offered. Pay Online communicates support for Card, UPI, Net Banking, and Wallets without embedding a provider-specific gateway. |
| Confirmation | UPI submissions and cash promises remain pending until the shop owner confirms them. The prototype does not claim instant settlement. |
| Allocation | Cash and UPI can be split. Partial and ₹0-now allocation remain valid; the unpaid remainder becomes outstanding. |
| Payments UI | Mobile recent rows use the reference date/mode, amount, and chevron columns. Desktop retains the FoodBridge KPI/history/balance layout. |
| Order status | Detail progress is a horizontal connected stepper on desktop and mobile. |
| Isolation | Only V5 screens and V5 seed data change; V1–V4 remain untouched. |

## FoodBridge component guidance

- Use FoodBridge green `#17a34a` for active navigation, primary actions,
  completed progress, allocation progress, and selected payment states.
- Use white cards, neutral `#e7e8eb` borders, 10–12px radii, and the existing
  system sans-serif typography.
- Payment method cards contain a selection control, method icon, title,
  description, supported online-payment types, and amount field.
- Never claim a success state before the shop-owner confirmation step.
