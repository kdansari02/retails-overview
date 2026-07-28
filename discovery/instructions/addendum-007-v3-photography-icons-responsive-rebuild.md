# Addendum 007 — V3 photography, icons and responsive rebuild

> Inputs: the desktop Shop, Payments and Help references; the four-screen
> mobile reference; and individual Kinley, Coca-Cola, Sprite and Fanta product
> samples supplied by the human on 2026-07-28.
> Status: Built — pending live review

## Ask and analysis

| Scope | Previous V3 gap | Decision |
| --- | --- | --- |
| Product cards | Generic CSS bottle silhouettes | Use the supplied reference photography for Kinley, Coca-Cola, Sprite and Fanta |
| Promo | CSS-only bottle shapes | Use the supplied beverage composition while keeping live offer content and close interaction |
| Icons | Mixed emoji and text glyphs | Replace them with one embedded, Lucide-style SVG icon system |
| Mobile Shop | Card order, fixed navigation and cart state differed from the reference | Rebuild the product order/cards, keep the tab bar visible, and initialise a functional reference cart |
| Mobile Purchases | Cards were too condensed | Rebuild date, total, status and action rows to match the reference hierarchy |
| Mobile Payments | Summary values and recent payments were laid out differently | Use stacked account metrics and a unified recent-payments card |
| Mobile Help | Extra delivery card and condensed rows | Match the four reference actions plus WhatsApp support banner |
| Desktop | Banner art, product images and icons did not match | Apply the same photography/icon rebuild across Shop, Payments and Help |

## Outcome

Only `screens/mobile-v3.html` and `screens/desktop-v3.html` were rewritten.
Their existing search, category filters, steppers, cart/review/place-order,
tab navigation, payment flow, help topics, modals/sheets and version switcher
remain functional. V1, V2, seed fixtures and development code remain unchanged.
