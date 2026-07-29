# Addendum 014 — V5 header, cart drawer, and scale fixes

> Linked from [instructions.md](./instructions.md)
> Status: Built — pending human review
> Created: 2026-07-29

## Ask

Human reviewed the deployed V5 and asked for nine concrete fixes: restore
Call/WhatsApp to the header (reversing part of Addendum 011 item 9 — the
repeated reference screenshots and the "match V4" instruction both show them
there); the payment modal's card/split UX was already built (Addendum 013)
but re-confirmed as the target; increase font sizes across V5 to match V4's
scale; remove the footer bar; enlarge product images; open desktop's Review
Cart as a right-side drawer instead of a centered modal; keep V4's font sizes
consistent; keep the profile-after-payment sequencing from Addendum 013
unchanged; and make Profile desktop-dropdown-only (remove the top-nav tab
added in Addendum 013, mobile keeps its bottom tab).

## Analysis (R3 — table first)

| # | Ask | Resolution |
| - | --- | --- |
| 1 | Call/WhatsApp back in the header | Restored as real `tel:`/`wa.me` links, both platforms — reverses that one part of Addendum 011 item 9; Store Info button and the Store Details sheet/modal (with the same links) stay as-is |
| 2 | Payment modal cards/split UX | Already matches the reference (Addendum 013); no further change needed beyond the font-size pass below |
| 3, 7 | Fonts too small / match V4 | Bumped font sizes on every V5-only component (payment method cards, outstanding stats, allocation bar, order summary, onboarding form fields, review-cart summary rows) that hadn't been cross-checked against V4's scale when first built |
| 4 | Remove the footer | Deleted `<footer>`, its render function, and the `switchView()` line that referenced it (that line would have thrown once the footer element was gone — caught during testing, see below) |
| 5 | Bigger product images | Scaled the product-photo sprite crop by 1.3x — container **and** `background-size` **and** `background-position` together, recalculated from the Addendum-008-fixed baseline, so the crop stays centred on the same bottle instead of bleeding into its neighbour |
| 6 | Desktop cart as a right-side drawer | Rebuilt Review Cart as a fixed, full-height, right-docked panel (`.cart-drawer`) with its own close icon, separate from the shared `.modal` centering system; `closeModals()` updated to also clear it |
| 8 | Profile-after-payment sequencing | Unchanged from Addendum 013 (dedicated onboarding page, shown first, reused at checkout if skipped) — no concrete conflict was raised against the current behaviour |
| 9 | Profile menu placement | Removed the desktop top-nav "Profile" tab added in Addendum 013; desktop Profile is reachable only via "My account ▾ → My profile"; mobile's bottom Profile tab is unchanged |

## Bug found and fixed during testing

Removing the footer left `switchView()`'s `el('footContextText').textContent = ...`
line pointing at a now-nonexistent element — `el()` returns `null` for a
missing id, so every view switch would have thrown `Cannot set properties of
null`. Removed that line; `switchView()` re-tested across every view on both
platforms afterward.

## Decisions

| Decision | Rationale | Feeds into SSOT |
| --- | --- | --- |
| Product photo scaling recomputes `background-size` and every `background-position` from the original Addendum-008 baseline (not compounded on the already-enlarged Addendum-012 values) | Sprite-sheet crops don't scale safely by just resizing the container — recomputing from the known-good baseline is the only way to guarantee the crop window still lands on the same bottle | 03-ux-component-library |
| Cart drawer is a new `.cart-drawer` class, not a `.modal` variant | The two need incompatible positioning/animation systems (fixed-right-slide vs. centered-scale); reusing `.modal` would have required conditional CSS that's more fragile than a separate, small class | 03-ux-component-library |
| V1-V4 untouched; only `mobile-v5.html` / `desktop-v5.html` edited | Same standing rule as every prior V2-V5 addendum | 07-collaboration-contract |

## Outcome

Edited `discovery/screens/mobile-v5.html` and `discovery/screens/desktop-v5.html`
only. Re-ran the full Addendum 011-013 test suite (all pass) plus new checks
for the header links, the removed footer, the drawer's position/size/close
behaviour, and the enlarged product photos. Screenshot-verified visually on
both platforms.
