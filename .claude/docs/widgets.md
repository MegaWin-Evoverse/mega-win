# Layer: widgets

**Responsibility:** Complex UI blocks that compose features and entities into ready-to-use page sections.

---

## Slice structure (pattern)

```
widgets/<name>/
  SomeWidget.tsx       ← 'use client' render-only component
  model/
    useSomeWidget.ts   ← aggregates feature hooks into a single interface
  ui/
    SubComponent.tsx   ← internal sub-components
  index.ts             ← public API barrel export
```

---

## Current state

The `src/widgets/` directory is an empty scaffold (`.gitkeep`). Widget slices will be added as page sections are built.

---

## Conventions

- Widgets are **compositions** — they aggregate features and entities, not implement logic themselves.
- The main widget component is render-only: it receives data/handlers from a `useXxxWidget` model hook.
- The `model/` hook aggregates multiple feature hooks into one interface for the widget component.
- Internal sub-components live in `ui/` and are not exported publicly.
- `index.ts` is the only public surface.

---

## Dependencies

`widgets` → `features`, `entities`, `shared`. Must NOT import from `pages` or `app`.
