# FoodBridge Retail UI Guidelines — Version 4

These guidelines are derived only from the supplied Gupta Wholesale desktop
and mobile reference screens. They document the visual system used by V4; they
do not introduce a new design direction.

## Foundations

| Token | Reference value |
| --- | --- |
| Brand green | `#16A34A` |
| Brand dark | `#128A43` |
| Pale green | `#EAF7EC` |
| Canvas | `#FFFFFF` desktop, `#F7F8F9` mobile |
| Primary text | `#16181D` |
| Secondary text | `#667085` |
| Border | `#E5E9E7` |
| Orange | `#F97316` |
| Red | `#F12D16` |
| Blue | `#1680FF` |
| Amber tint | `#FFF2DF` |
| Green tint | `#E5F7EB` |

Typography uses the system sans stack (`-apple-system`, BlinkMacSystemFont,
`Segoe UI`, Roboto, Helvetica, Arial). Body text is 13–16px/1.4; labels are
11–13px/1.35; card values are 22–30px/1.15; page titles are 20–28px/1.2.
Weights are 400 regular, 500 medium, 600 semibold and 700 bold.

The spacing scale is 4, 8, 10, 12, 14, 16, 20, 24, 28, 32 and 40px. Desktop
uses a 12-column fluid grid with 20–24px gutters and 40–48px page edges.
Mobile uses one column, 16px page edges and 10–14px vertical gaps.

## Shape and elevation

- Inputs and buttons: 8–10px radius.
- Cards and panels: 12–14px radius.
- Pills and statuses: 999px radius.
- Borders: 1px solid border token.
- Desktop cards are primarily border-defined with no visible elevation.
- Mobile cards use `0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.08)`.

## Components

- Primary buttons use brand green, white semibold text, 44–48px height.
- Secondary buttons use white, a grey/green border and dark text.
- Inputs use white, 44–56px height, a 1px border and left icon.
- Tabs use text/icon pairs and a 3–4px green underline on desktop; mobile uses
  a fixed bottom bar with 20px line icons and 11px labels.
- Cards preserve a label → value → supporting-note hierarchy.
- Tables use 12px muted headers, 13–14px rows, horizontal dividers and inline
  status pills. Row actions are green outlined buttons.
- Badges/statuses use tinted backgrounds: green Delivered/Paid, blue Active/In
  transit, amber Pending/Due, grey Cancelled.
- Modals use a centred white 18px-radius panel and dim backdrop on desktop.
  Mobile uses a bottom sheet with a 20px top radius and drag handle.
- Dropdowns match button/input shape and use 44px rows.
- Tooltips use dark charcoal, white 12px text and 6–8px padding.
- Forms use 8px label-to-control spacing and 16px field-to-field spacing.
- Empty states centre a line icon, 16px semibold title, 13px muted copy and one
  green primary action.
- Loaders use a 20–24px brand-green circular spinner.
- Toasts use charcoal, white 13–14px text and a 10px radius.
- Icons use one outline family matching Lucide: 1.8–2px stroke, round caps and
  joins, 20–24px controls, 28–36px KPI illustrations.

## Responsive behaviour

- ≥1440px: full four-card KPI row and table/help two-column composition.
- 1024–1439px: KPI cards may wrap to two columns; table/help stays fluid until
  the rail can no longer retain its reference width.
- 768–1023px: content becomes one column while preserving card hierarchy.
- <768px: dedicated mobile composition, fixed bottom navigation, horizontally
  scrollable category pills and single-column cards.

## Purchase page

Desktop uses four KPI cards, then a table/rail split. The table contains status
tabs, search, Filters, five columns and green row actions. The rail contains
three order-help actions and the genuine-products trust panel. Mobile uses the
reference summary strip followed by vertically stacked order cards with order
number/date, Total, status and a separated action row.
