# Layer: features

**Responsibility:** Interactive features — coordinate entities, call APIs, encapsulate user-facing business logic.

---

## Slice structure (pattern)

```
features/<name>/
  ui/
    SomeComponent.tsx  ← 'use client' UI component
  model/
    useSomeFeature.ts  ← logic hook (react-hook-form, mutations, state)
    constants.ts       ← labels, default state, domain enums, option lists
  api/
    useSomeQuery.ts    ← @tanstack/react-query useQuery / useMutation
    index.ts
  index.ts             ← public API barrel export
```

Not every slice needs all subdirectories — include only what the feature requires.

---

## Current state

The `src/features/` directory is an empty scaffold (`.gitkeep`). Feature slices will be added as the product grows.

---

## Conventions

- `ui/` components are `'use client'` and render-only — business logic lives in `model/` hooks.
- `model/` hooks use `useCallback` for all handlers; avoid `useEffect` for state mirroring.
- `api/` hooks wrap `useQuery` / `useMutation` from @tanstack/react-query and use the shared axios `api` client.
- Zod schemas for form validation live in `model/schemas.ts`.
- `index.ts` is the only public surface — external layers import from `features/<name>`, not from internal paths.
- Slice constants (labels, defaults, enums, option lists) live in `model/constants.ts`. Do **not** introduce a `config/` segment for them — `config/` is for feature flags / env config only. Global constants belong in `shared/config`.

---

## Dependencies

`features` → `entities`, `shared`. Must NOT import from `widgets`, `pages`, or `app`.
