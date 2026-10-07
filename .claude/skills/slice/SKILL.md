---
description: Creates a complete FSD slice — ui/ component, model/ hook, optional api/ hooks, and index.ts with public API. Use when adding a new feature, entity, or widget.
---

## Input

If not provided — ask before creating:

- Slice name (e.g. `user-profile`, `product-list`, `auth`)
- Layer: `features/` | `entities/` | `widgets/` | `shared/`
- What it does (one sentence)
- What it exposes to other layers

---

## Algorithm

### 1. Determine layer and structure

**`features/<name>/`** — user-facing feature with logic:

```
features/<name>/
  ui/
    FeatureName.tsx       ← 'use client', regular function, named export
  model/
    useFeatureName.ts     ← business logic hook
  api/                    ← only if it makes API calls
    useApiHook.ts
  index.ts                ← re-exports only what other layers need
```

**`entities/<name>/`** — isolated state/types, no cross-entity deps:

```
entities/<name>/
  model/
    store.ts              ← Zustand store
    types.ts              ← domain types
  index.ts
```

**`widgets/<name>/`** — composed UI block:

```
widgets/<name>/
  ui/
    WidgetName.tsx
  model/                  ← only if complex aggregation needed
    useWidgetName.ts
  index.ts
```

### 2. Create files in order

1. **Types** (`model/types.ts` or inline in store)
2. **Store or hook** (`model/`)
3. **UI component** (`ui/`)
4. **API hooks** (`api/`) if needed
5. **`index.ts`** — export only the public surface

### 3. index.ts — export only what other layers need

```ts
// features/user-profile/index.ts
export { UserProfile } from './ui/UserProfile';
export { useProfileForm } from './model/useProfileForm';
// do NOT export internal helpers
```

### 4. Component (ui/) rules

- Regular function declaration + named export
- Zero business logic in JSX
- All logic via the slice's model/ hook
- shadcn/ui first for UI primitives
- Next.js file conventions (page/layout/loading/error) use `export default function`

```tsx
'use client'

import { useFeatureName } from '../model/useFeatureName'

interface Props { ... }

export function FeatureName({ ... }: Props) {
  const { value, handleAction } = useFeatureName({ ... })
  return ( /* JSX only */ )
}
```

### 5. Hook (model/) rules

- Regular function declaration: `export function useHookName(): UseHookNameResult { ... }`
- Explicit `interface UseXResult`
- `useCallback` for all handlers
- No `useEffect` for state mirroring
- Import entities only through their `index.ts`
- API calls: use axios `api` from `@/shared/api/client` + TanStack `useQuery`/`useMutation`

```ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/shared/api/client'

export function useFeatureName(): UseFeatureNameResult {
  const { data } = useQuery({
    queryKey: ['resource'],
    queryFn: () => api.get('/resource').then((r) => r.data),
  })

  const handleAction = useCallback(() => { ... }, [])

  return { data, handleAction }
}
```

### 6. Checklist before finishing

- [ ] `index.ts` exists and exports only the public API
- [ ] Component uses `export function`, not `export const X = () => {}`
- [ ] Component has no logic — only renders
- [ ] Hook uses `export function useX(): UseXResult`
- [ ] Hook has explicit return type
- [ ] No imports from other entities' `model/` internals
- [ ] No imports from `widgets/` or `pages/` (if in features/)
- [ ] New slice added to parent layer's `index.ts` if needed
- [ ] No BFF / Server Actions / `getValidAccessToken` usage
