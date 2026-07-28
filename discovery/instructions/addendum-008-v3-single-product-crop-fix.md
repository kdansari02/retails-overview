# Addendum 008 — V3 single-product crop fix

> Status: Built — pending live verification
> Created: 2026-07-28

## Analysis

| Problem | Cause | Fix |
| --- | --- | --- |
| A second product appeared at the right edge of each desktop product card | The reference screenshot was used as a full-width card background, exposing the neighbouring product crop | Constrain photography to one centered 120px viewport and retune the Kinley, Coca-Cola, Sprite and Fanta background positions |

## Scope

Only the desktop V3 product-photo crop CSS changed. Mobile, V1, V2, data and
all interactions remain untouched.
