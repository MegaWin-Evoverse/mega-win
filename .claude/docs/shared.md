# Layer: shared

**Responsibility:** Domain-agnostic building blocks — UI components, utilities, API client, configuration.

---

## Structure

```
src/shared/
  ui/             ← shadcn components (built on @base-ui/react)
  lib/            ← utilities and custom hooks
  api/            ← axios instance and interceptors
  config/         ← constants and app-wide configuration
  types/          ← shared TypeScript types
```

---

## ui/ — shadcn components

Components are built on `@base-ui/react` and follow shadcn conventions.

| Component                  | File         | Notes                         |
| -------------------------- | ------------ | ----------------------------- |
| `Button`                   | `button.tsx` | Variants: default, icon, etc. |
| `Input`                    | `input.tsx`  | Text input field              |
| `Card`                     | `card.tsx`   | Container card                |
| `Dialog` / `DialogTrigger` | `dialog.tsx` | Modal dialog                  |
| `Select`                   | `select.tsx` | Dropdown select               |

All imported via barrel: `import { Button, Input } from '@/shared/ui'`

---

## lib/

| File                  | Exports       | Purpose                                                   |
| --------------------- | ------------- | --------------------------------------------------------- |
| `cn.ts`               | `cn()`        | clsx + tailwind-merge utility for conditional class names |
| `hooks/use-mobile.ts` | `useMobile()` | Detects mobile viewport via media query                   |

---

## api/

### `client.ts` — axios instance

```ts
import api from '@/shared/api/client';
```

Exports a configured `axios` instance (`api`) with:

- Base URL from environment config
- Request/response interceptors (auth headers, error normalization)

Use this instance in all feature-level API calls — do not create new axios instances elsewhere.

---

## config/

App-wide constants and configuration types. Barrel-exported via `config/index.ts`.

---

## types/

Shared TypeScript types used across layers. Do not put domain-specific types here — those belong in `entities/`.

---

## Dependencies

`shared` does not import from any other project layer.
