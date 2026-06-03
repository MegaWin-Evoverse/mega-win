# Layer: pages

**Responsibility:** Page-level compositions — assemble widgets into full page layouts.

---

## Structure

```
src/pages/
  (empty scaffold — .gitkeep)
```

---

## Current state

The `src/pages/` directory is an empty scaffold. Page composition components will be added here as routes are built out.

---

## Slice structure (pattern)

```
pages/<name>/
  <Name>Page.tsx   ← composes widgets into a full page layout
  index.ts         ← public API barrel export
```

---

## Conventions

- Page components are thin — they only arrange widgets, not implement logic.
- No business logic, API calls, or state management in page components.
- One page slice per route or route group.
- `index.ts` exports the page component for use in `src/app/`.

---

## Dependencies

`pages` → `widgets`, `features`, `entities`, `shared`. Must NOT import from `app`.
