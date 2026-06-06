---
paths: ["src/shared/**"]
---
# Layer: shared

Generic, reusable building blocks with zero domain knowledge.

## Structure

- `ui/` — shadcn/ui components (Button, Input, etc.)
- `lib/cn.ts` — `cn()` helper (clsx + tailwind-merge)
- `hooks/` — generic hooks (useMobile, useDebounce, etc.) — kept directly under `shared/`, not nested in `lib/`
- `api/client.ts` — base axios API client

## Rules

- Components here MUST be **domain-agnostic** — no business logic, no store imports
- NEVER import from `entities/`, `features/`, `widgets/`, or `pages/` here
- Add shadcn components via CLI — they land here automatically:
  ```bash
  npx shadcn@latest add [component-name]
  ```
- All imports within the app use the alias `@/shared/...` — never relative `../`
- `cn()` is the only way to merge class names — import from `@/shared/lib/cn`
- When creating or modifying components in this layer, refer to and follow `.claude/rules/components.md`.
