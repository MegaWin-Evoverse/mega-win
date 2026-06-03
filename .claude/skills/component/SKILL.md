---
description: Creates a React component following FSD architecture. Clean JSX, logic in hooks, shadcn/ui by default, regular function with named export.
---

## Input

If not provided — ask before creating:
- Component name
- Layer and slice (e.g. `features/user-profile/ui/`, `widgets/product-list/`, `shared/ui/`)
- What props it receives and what it renders

---

## Algorithm

### 1. Determine component type

- Needs hooks, events, or browser APIs → `'use client'` at the top
- Otherwise → Server Component (no directive)

### 2. Check shadcn/ui first

Before writing any JSX — check `src/shared/ui/` for existing components:
- Button → `Button`
- Input → `Input`
- Card → `Card`
- Dialog → `Dialog`
- Toggle → `Switch`, `Tabs`
- Form → `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`

Use shadcn/ui **whenever a matching component exists**. Do not write custom alternatives.

### 3. File structure

```tsx
'use client' // only if needed

import { ... } from 'react'
import { ... } from '@/shared/ui/...'
// other imports

interface Props {
  // all props explicitly typed
}

export function ComponentName({ prop1, prop2 }: Props) {
  return (
    // JSX only — ZERO business logic here
  )
}
```

### 4. Component purity

**Must NOT be in JSX:**
- `fetch`, `async/await`
- Computations or data transformations
- Complex conditional logic (simple `condition ? A : B` is ok; complex → extract to hook)
- Direct store calls (if in `shared/ui` — forbidden entirely)

**Where it lives instead:**
- Business logic → `model/useComponentName.ts` in the same slice
- Data transformations → utils in `shared/lib/`
- Store reads → in the hook, not in the component (except simple `store((s) => s.value)`)

### 5. Splitting large components

If a component exceeds ~80 lines or contains multiple independent blocks — split into sub-components:

```
features/user-profile/ui/
  UserProfile.tsx         ← main
  UserAvatar.tsx          ← sub-component
  UserActions.tsx         ← sub-component
```

Each sub-component is its own file with the same structure (regular function declaration + named export + Props interface).

### 6. Export

Always `export function`, never `export default` (except Next.js file conventions: page/layout/loading/error):

```tsx
// ✅
export function UserCard({ user }: Props) {
  return ( /* JSX */ )
}

// ❌
export default function UserCard() { ... }

// ❌
const UserCard = () => { ... }
export default UserCard

// ❌
export const UserCard = () => { ... }
```

### 7. Props

- Interface always named `Props`
- All props explicitly typed
- Callbacks: `() => void`, `(value: string) => void` — no `any`

### 8. React 19 ref

In React 19, `ref` is a plain prop — no `forwardRef` wrapper needed:

```tsx
import { type Ref } from 'react'

interface Props {
  ref?: Ref<HTMLDivElement>
}

export function MyComponent({ ref, ...props }: Props) {
  return <div ref={ref} {...props} />
}
```

---

## After creating

- If there is logic to extract → create `model/useComponentName.ts` next to it
- If the slice needs an `index.ts` → add re-export
- Do not commit — only create files
