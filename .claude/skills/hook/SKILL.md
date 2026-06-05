---
description: Creates a model/ hook following FSD patterns. Explicit return interface, useCallback for all handlers, no useEffect for state mirroring.
---

## Input

If not provided — ask before creating:
- Hook name (e.g. `useUserProfile`, `useProductList`)
- Slice location (e.g. `features/user-profile/model/`, `widgets/product-sidebar/model/`)
- What state it manages and what it returns

---

## Algorithm

### 1. Determine dependencies

Before writing — identify what the hook needs:
- Zustand stores → import from entity `index.ts` (never from `model/store.ts` directly)
- API calls → `useQuery` / `useMutation` via `@tanstack/react-query` + axios instance `api` from `@/shared/api/client`
- Other hooks → from same slice's `model/` or feature's `api/`

### 2. File structure

```ts
import { useCallback, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '@/shared/api/client'
// store/type imports

interface Props {
  // explicit — no implicit args
}

interface UseHookNameResult {
  // every returned value typed
  // callbacks typed as () => void or (arg: Type) => void
}

export function useHookName({ prop1, prop2 }: Props): UseHookNameResult {
  // state
  // store selectors
  // derived values (no useMemo unless expensive computation)

  const handleSomething = useCallback(() => {
    // logic
  }, [/* deps */])

  return {
    // flat object — no nested objects unless they're data types
  }
}
```

### 3. Rules

**useCallback** — wrap every function that will be passed as a prop or used in a dependency array:
```ts
// ✅
const handleSubmit = useCallback(() => { ... }, [dep])

// ❌ — new reference every render
const handleSubmit = () => { ... }
```

**No useEffect for state mirroring** (from AGENTS.md):
```ts
// ❌ cascading renders
useEffect(() => { setMode('manual') }, [isEditing])

// ✅ render-phase sync
if (!isEditing && mode !== 'manual') setMode('manual')
```

**useEffect is OK for:**
- Subscriptions (WebSocket, DOM events)
- Timers / RAF
- Calling external APIs after a user action (side-effects, not state sync)

**Return interface** — always explicit, never inferred:
```ts
// ✅
export function useX(): UseXResult { ... }

// ❌
export function useX() { ... }
```

**Callbacks signatures** — no `any`, no broad types:
```ts
// ✅
handleNameChange: (value: string) => void

// ❌
handleNameChange: (value: any) => void
```

### 4. Data fetching with axios + TanStack Query

For GET requests use `useQuery`; for mutations use `useMutation`:

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/shared/api/client'

// GET
const { data: user, isPending } = useQuery({
  queryKey: ['me'],
  queryFn: () => api.get<User>('/me').then((r) => r.data),
})

// POST / PATCH / DELETE
const queryClient = useQueryClient()
const { mutate: updateProfile } = useMutation({
  mutationFn: (payload: UpdateProfilePayload) =>
    api.patch<User>('/me', payload).then((r) => r.data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['me'] })
  },
})
```

Never use BFF patterns, Server Actions, or `getValidAccessToken` — always go through the axios `api` instance.

### 5. After creating

- If the hook has API calls → create `api/useApiHook.ts` separately and import it
- Add to slice's `index.ts` only if other layers need it
- Component using this hook should have zero logic — only pass values through
