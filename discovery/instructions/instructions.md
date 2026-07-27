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
