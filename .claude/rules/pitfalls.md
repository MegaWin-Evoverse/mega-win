---
paths: ['src/**']
---

# Project-Specific Pitfalls

## React namespace — never `React.*`

Import types directly from `'react'` (`import { type ChangeEvent, type ReactNode } from 'react'`).
`import React from 'react'` is forbidden — use named imports.

## Public API — always through index.ts

Never import internal paths (`model/`, `ui/`, `api/`). Import slices via their `index.ts`:
`import { useCounterStore } from '@/entities/counter'` — not `.../model/store`.

## Zustand — useShallow for object selectors

A selector returning an object/array creates a new reference each render → infinite re-renders. Use `useShallow` for non-primitive selectors; primitives don't need it.

```ts
import { useShallow } from 'zustand/react/shallow';

const { count, increment } = useCounterStore(
  useShallow((s) => ({ count: s.count, increment: s.increment }))
);
const count = useCounterStore((s) => s.count); // primitive — no useShallow
```

## Zustand — no cross-entity imports

Entities must not import each other. Coordinate in `features/`.

## useEffect anti-pattern

Don't mirror props/store into local state (cascading renders). Derive, or render-phase sync.

## TanStack Query cache after mutation

Update via `queryClient.setQueryData`/`invalidateQueries`, not manual refetch. Keep query keys in `shared/api/query-keys.ts`.

## react-hook-form field names

No raw string literals for field names — define a `const FIELD = 'name' as const`.
