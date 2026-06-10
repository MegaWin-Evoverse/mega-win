---
paths: ['src/shared/api/**', 'src/features/**/api/**']
---

# Data & API Layer

## Axios instance

- One shared instance in `src/shared/api/client.ts` (`export const api = axios.create(...)`).
- Interceptors live in `src/shared/api/interceptors.ts` (or alongside the client): attach auth, handle 401 + refresh token, surface global errors.
- Components/hooks NEVER call `axios` directly — always go through `api`.

## Request functions

- Per-feature request functions live in that feature's `api/` folder and call `api`.
- Return typed data (`interface`), never `any`.

## TanStack Query

- Reads via `useQuery`, writes via `useMutation` — inside `model/` or `api/` hooks, never in JSX.
- Query keys are centralized in `src/shared/api/query-keys.ts` — never inline string-array keys at call sites.
- After a mutation, update cache via `queryClient.setQueryData` or `invalidateQueries` — do not refetch manually.

## Error handling

- 401 → refresh-token flow in the response interceptor; on failure, clear session.
- User-facing errors → `toast` via **Sonner** (`import { toast } from 'sonner'`). Never `alert`.
- Never swallow errors with empty `catch {}` — log or toast.

## Forms

- react-hook-form + zod. Per feature: `model/schema.ts` (zod schema) and `model/types.ts` (inferred types).
- Validate with `zodResolver(schema)`; never validate by hand.
