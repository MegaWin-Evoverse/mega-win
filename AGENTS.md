<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Coding Style Rules
- NO magic strings or hardcoded string/number literals in code (e.g., `'auto'`, `'manual'`, `'HIGH'`, `12`). Use constants, enums, or configuration files instead.
- NO need to run a production build or typecheck (tsc) after minor edits (pre-commit checks remain mandatory).

---

# Rules & Documentation Synchronization
- We use a documentation mapping in `.claude/doc-mapping.json`.
- BEFORE analyzing or modifying code, look up the target path in `.claude/doc-mapping.json` to find its corresponding rules (in `.claude/rules/...`) and docs (in `.claude/docs/...`).
- You MUST open and read these matched rules/docs files to ensure you follow project-specific conventions and avoid context drift.
- Keep `CLAUDE.md` under 200 lines. If it gets close to or exceeds 200 lines, refactor/shorten it.

---

# Communication Rules
- Відповідай українською мовою.
- Код пиши англійською.
- Пояснюй коротко і по суті.
- Якщо задача складна — СПОЧАТКУ склади план, потім код.
- Якщо є сумніви — уточнюй, не вигадуй.
- Якщо я прошу код → давай код без пояснень.
- Якщо я прошу пояснення → будь лаконічним.
- Якщо я щось питаю або стверджую — СПОЧАТКУ дай відповідь/підтвердження, а вже потім переходь до дій або коду.

---

# Architecture (FSD)
- Follow Feature-Sliced Design STRICTLY.
- Layers (top → bottom, imports go downward only):
  - `app`       → routing, layout, global styles
  - `pages`     → page-level compositions
  - `widgets`   → complex UI blocks
  - `features`  → interactive features
  - `entities`  → business entities and stores
  - `shared`    → generic UI, utils, API clients
- DO NOT mix layers. DO NOT import across layers incorrectly.
- Business logic MUST NOT be inside UI components. Move logic to hooks or models.
- **Layer Isolation**: Entities MUST NOT import from other entities.
- **Feature Layer**: Use features to coordinate logic between entities to avoid tight coupling.
- **Shared UI Purity**: Components in `shared/ui` should be generic and free of domain-specific side-effects.

---

# Styling & UI/UX
- Use Tailwind CSS ONLY. No inline styles.
- Colors use **OKLCH** via CSS variables — use semantic classes (`bg-primary`, `text-foreground`), not raw `oklch(...)` values or hex/rgb/hsl.
- NEVER hardcode hex/rgb/hsl/oklch in components UNLESS manually added by the USER.
- **Respect User Styling**: NEVER revert or overwrite manual UI/UX changes made by the USER (colors, spacing, typography, etc.). The USER's recent manual tweaks are always "ground truth".
- **Code Formatting**: Always output code that adheres to the project's Prettier configuration.

---

# Strict TypeScript Rules
- NEVER use `any`. ALWAYS explicitly type everything.
- NO implicit types.
- Component props MUST use `interface`. Elsewhere choose by situation: `interface` for describing object/data structures, `type` for unions, intersections, and aliases.
- All component props MUST be typed and named `Props`.

---

# Components & State
- **Regular function declarations ONLY** for components AND hooks (`export function Component()` / `export function useThing()`). NO arrow-function components or hooks.
- No `export default` except Next.js file conventions (page/layout/loading/error).
- Keep components small and focused. Extract logic into hooks.
- DO NOT use React namespace for hooks (use `useState`, not `React.useState`). Use named imports from `'react'`.
- Use Zustand for state management. Keep stores simple and modular.
- **Avoid Cascading Renders**: Do not use `useEffect` to mirror props or external store changes into local state.
- **Render-Phase Synchronization**: Prefer adjusting state during the render phase to avoid double-renders.

---

# Naming Conventions
- Folders: `kebab-case`
- Components: `PascalCase`
- Hooks: `useSomething`
- Constants: `UPPER_SNAKE_CASE`

---

# Public API
- Every slice MUST expose a public `index.ts` file.
- Never import internal paths directly (e.g., `features/auth/model/`, `entities/user/ui/`). Always go through `index.ts`.

---

# Tooling
- **Prettier**: single quotes, semi, printWidth 100, arrowParens always, trailingComma es5.
- **ESLint**: `eslint-plugin-boundaries` enforces FSD layer import rules.
- **Husky**: `lint-staged` runs on pre-commit; full `lint` runs on pre-push.

---

# Git Strategy
- Commit messages follow Conventional Commits: `type(scope): description`.
- Branch naming: `type/kebab-words` — valid prefixes: `feature/`, `fix/`, `refactor/`, `documentation/`, `test/`, `chore/`.
- See `.claude/rules/git.md` for full details and examples.
