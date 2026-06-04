# Layer: entities

**Responsibility:** Business entities — isolated state (Zustand stores) and types with no cross-entity dependencies.

---

## Slice structure (pattern)

Each entity slice follows this layout:

```
entities/<name>/
  model/
    store.ts   ← Zustand store (useXxxStore)
    types.ts   ← entity-specific TypeScript types
  index.ts     ← public API barrel export
```

---

## Example slice: `counter`

```
entities/counter/
  model/
    store.ts   ← useCounterStore
    types.ts   ← CounterState
  index.ts
```

**Store:** `useCounterStore` (Zustand)

Typical store shape:

```ts
interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}
```

**`index.ts`** re-exports only what downstream layers need:

```ts
export { useCounterStore } from './model/store'
export type { CounterState } from './model/types'
```

---

## Rules

- One Zustand store per entity slice — keep stores small and focused.
- Stores contain state fields + action methods only — no async logic (that belongs in `features/`).
- Use `persist` middleware only when client-side persistence across sessions is required.
- Entities do **not** import from each other or from `features`/`widgets`/`pages`/`app`.

---

## Dependencies

`entities` → `shared` only.
