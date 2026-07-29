# Addendum 019 — V5 product assets and 10% tax

> Linked from [instructions.md](./instructions.md)  
> Status: Built — pending human review  
> Created: 2026-07-29

## Resolution

| Area | V5 implementation |
| --- | --- |
| Product imagery | Replaced screenshot-sprite cropping with four dedicated transparent catalog PNGs: water, cola, lemon-lime, and orange. |
| Card alignment | Every product image uses a fixed visual box with `object-fit: contain` and centered positioning, preventing horizontal drift, adjacent-product bleed, and cap/base cropping. |
| Review Cart | Uses the same dedicated product asset as its corresponding card, in a taller contained thumbnail box so the complete bottle remains visible. |
| Tax | Adds `Tax (10%)` between Subtotal and Total in desktop/mobile Review Cart, checkout summary, and order details. |
| Calculations | Cart indicator, checkout allocation, placed-order total, and outstanding remainder all use `subtotal + tax + delivery`. |
| Isolation | V1–V4 remain unchanged; the assets and code are used by V5 only. |

## Generated asset provenance

Generated with the built-in image-generation tool as a four-product
photorealistic catalog contact sheet on a removable chroma background. The
sheet was split into individual assets and converted to alpha PNGs:

- `discovery/assets/v5-products/water.png`
- `discovery/assets/v5-products/cola.png`
- `discovery/assets/v5-products/lemon-lime.png`
- `discovery/assets/v5-products/orange.png`

