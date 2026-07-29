# Addendum 015 — V5 "Pay now" drawer, product pagination, Payments-page fonts

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human reviewed the deployed V5 Payments page and pointed at three concrete
issues: (1) the "Pay now" button on the Payments page just marked the balance
paid instantly instead of opening the payment-method flow shown in the
reference (split / cash / pay-online cards), on both platforms; (2) desktop's
product grid should show 8 products up front, with "View all" loading 8 more
at a time; (3) "fonts on the right side and some tables" had shrunk back
below the rest of the page's scale.

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1 | "Pay now" should open the split/cash/UPI/card drawer | Desktop's `#paymentModal` is rebuilt as a `.pay-drawer` (800px, full height, right-docked) using the same mechanics as the Addendum-014 cart drawer; mobile's `#paymentSheet` already used the bottom-sheet pattern, it just wasn't wired up. Both `payBalanceBtn` (desktop) and `payNowBtn` (mobile) now call a new `openBalancePaymentFlow()` that reuses the existing method-card/split/allocation UI, sourced from `seed2.payments.balanceDue` instead of the cart |
| 2 | Show 8 products, "View all" adds 8 more | `PAGE_SIZE` on desktop was `4` (a leftover from an earlier density); changed to `8`. The current V5 seed only has 8 products total, so "View all products" correctly disappears once they're all shown — there's nothing left to page through; the increment logic itself is untouched and correct for whenever more products are added |
| 3 | Right-side / table fonts too small | The Payments page had a *second*, later `table.paytable th/td` rule inside the desktop scale-up block that re-shrank the table below the Purchases page's table (12–13px vs 14px); bumped to match. `.summary-row` (My account summary panel) and `.help-row .t/.s` (Need help / Payment query rows) were still at their pre-scale-up sizes; bumped alongside |

## Bug found and fixed during testing

Reusing one drawer for both "pay outstanding balance" and "checkout" meant
the drawer's title/subtitle/button-label/summary-row visibility had to be
reset per use. `openPaymentFlow()` (the checkout path) originally did that
reset *after* its profile-completeness check — but that check `return`s
immediately when the profile isn't complete yet, so if a customer had just
used "Pay now" and then started a checkout before finishing their profile,
the payment drawer would reopen still reading "Pay Outstanding Balance" /
"Pay Now" once they came back from the onboarding page. Fixed by moving the
reset lines to the top of `openPaymentFlow()`, before the profile check, in
both `desktop-v5.html` and `mobile-v5.html`.

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| One payment drawer/sheet, driven by a `payingBalance` flag, instead of a second copy of the UI | The method-card/split/allocation UI is identical for both flows; only the amount source, labels, and what happens on confirm differ | 03-ux-component-library |
| Balance-pay "After" figure subtracts what's entered from the current balance, instead of reusing the checkout "previous + remaining unpaid" formula | The checkout formula assumes `balanceDue` is a starting point being added to; for a balance repayment it's the amount being drawn down, so the two need different arithmetic or "Total Outstanding" double-counts | 03-ux-component-library |
| Did not fabricate extra products to force-demonstrate 8-then-8 pagination | The seed's 8 products are all the sprite sheet has real crops for (Addendum 008); duplicating a bottle to pad the count would be fake data with no backing photography | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`
only. Re-ran the full test suite (V1-V4 regression, onboarding gate, header
links, footer removal, cart drawer, product/font scale from Addendum 014)
plus new checks for: 8 products shown with "View all" correctly hidden,
Payments-page table/summary/help-row font sizes, the balance-pay drawer/sheet
opening with all four methods and split/equal-split working, balance
correctly zeroing after payment, and the checkout drawer correctly resetting
its title/button/row-visibility after a prior balance payment — all pass.
Screenshot-verified visually on both platforms.
