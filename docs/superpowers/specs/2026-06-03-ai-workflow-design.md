# AI Workflow Setup — Design Spec

**Date:** 2026-06-03
**Branch:** `chore/setup-ai-workflow`
**Status:** Approved design — ready for implementation plan

## Goal

Set up a Claude/AI workflow for the `mega-win` project, analogous to the one already
in the `plinko-game` (`crash-game`) project, but adapted to mega-win's real stack,
conventions, and a key style change: **components and hooks are written as regular
function declarations (`export function`), not arrow functions.**

## Scope

**In scope (this branch):** AI workflow files only — `AGENTS.md`, project-local skills,
`.claude/rules/`, `.claude/docs/`, `.claude/commands/`, `.claude/hooks/`,
`doc-mapping.json`, doc/test scripts, and the **Jest test toolchain** (explicitly
requested) plus its config and scripts.

**Out of scope (other branches):** the FSD scaffold (`feat/setup-project`) and the
ESLint/Prettier/Husky setup (`chore/linting-formatting-setup`) already exist. We only
*align with* them — we do not redo them.

## Source of truth: the real project

Rules/docs are written against the **actual** structure from `feat/setup-project` and
`chore/linting-formatting-setup`, NOT plinko's domain.

### Stack (already installed in the project branches)
- Next.js 16.2.7, React 19.2.4, TypeScript 5, Tailwind v4 (OKLCH tokens)
- **axios** + **@tanstack/react-query** (+ devtools) — client-side data (NOT plinko's BFF/Server Actions)
- react-hook-form + zod, sonner, zustand, shadcn (on `@base-ui/react`), geist
- ESLint 9 with `eslint-plugin-boundaries` (FSD import enforcement), `eslint-plugin-prettier`, `eslint-plugin-react-compiler`
- Prettier: printWidth 100, singleQuote, semi, arrowParens always, trailingComma es5
- Husky: `pre-commit` → `npx lint-staged` (eslint --fix + prettier --write on `src/**/*.{ts,tsx}`); `pre-push` → `npm run lint`
- **No test framework yet** → we add Jest in this branch.

### FSD structure (real, `src/`-based)
```
src/
  app/        routing, layout, providers, global styles
  pages/      page-level compositions
  widgets/    large page blocks
  features/   user scenarios
  entities/   business entities + zustand stores (example: entities/counter)
  shared/     ui (shadcn), lib, api (axios client), config, types
```

## Key conventions (project ground truth)
- **Components:** `export function ComponentName(props: Props) {}` — named function
  declaration, never `export default` (exception: Next.js `page.tsx`/`layout.tsx`/etc.).
- **Hooks:** `export function useThing(props: Props): Result {}` — also regular functions.
- **Naming:** folders `kebab-case`, components `PascalCase`, hooks `useSomething`,
  constants `UPPER_SNAKE_CASE`.
- **Public API:** every slice/module exposes an `index.ts`.
- **Imports:** higher layers import lower only; no cross-imports between features without need (enforced by `eslint-plugin-boundaries`).
- **Styling:** Tailwind only, no inline styles; OKLCH via semantic classes; shadcn-first, never native `<button>`/`<img>`.
- **TypeScript:** no `any`, `interface` over `type`, props interface named `Props`.
- **Git:** Conventional Commits with scope (`feat(scope): ...`); branch naming
  `type/kebab-words` (`feature/`, `fix/`, `refactor/`, `documentation/`, `test/`, `chore/`).

## Deliverables

### 1. `AGENTS.md` (project root)
Port plinko's AGENTS.md, adapted:
- Keep `nextjs-agent-rules` block.
- Communication rules (Ukrainian replies, English code).
- FSD architecture: 6 layers incl. `pages`.
- Styling (Tailwind/OKLCH), strict TS, components & state.
- **Change:** "Regular function declarations ONLY (`export function`)" for components AND hooks.
- Add: naming conventions, public API (`index.ts`), Prettier style summary, git strategy.
- Keep under 200 lines. `CLAUDE.md` stays `@AGENTS.md`.

### 2. Project-local skills (`.claude/skills/`, override globals of same name)
- `component` — regular-function template, shadcn-first, clean JSX, `Props`, React 19 `ref` as prop, generic examples (no bet/game vocabulary).
- `hook` — regular-function `model/` hook, explicit return interface, `useCallback` for handlers, no `useEffect` state-mirroring.
- `slice` — full FSD slice with regular-function `ui/` + `model/`, optional `api/`, `index.ts`.
- `commit` — Conventional Commits with scope + the project's branch-naming convention.
- Global skills left untouched: `naming`, `perf`, `review`, `explain`.

### 3. `.claude/rules/`
Generic scaffold (no plinko domain):
- `app.md` — Next.js App Router, providers, server vs client, layout/route handlers.
- `components.md` — regular functions, server/client, export style, `Props`, React 19 `ref`, no inline styles, shadcn-first, a11y, size limit.
- `naming.md` — project naming conventions, generic (no plinko vocabulary), anti-patterns.
- `shared.md` — shadcn/ui purity, `lib`, axios client, config/types.
- `entities.md` — zustand stores, layer isolation (entities don't import entities).
- `features.md` — feature composition, forms (`ui/` + `model/schema.ts` + `model/types.ts`).
- `widgets.md` — composed page blocks.
- `pages.md` — page-level compositions.
- `pitfalls.md` — project gotchas (axios/query keys, server-only, zustand selectors).
- `git.md` — branch naming + Conventional Commits convention (from team doc).
- `api.md` — axios instance + interceptors, TanStack Query (`shared/api/query-keys.ts`, invalidation), error handling (401 / refresh token / global errors / Sonner toasts), forms data flow.
- `testing.md` — Jest + Testing Library conventions (renderHook, store mocks, pure-function tests).
- **Skipped:** plinko `game.md`, `auth.md`, `bff.md`.

### 4. `.claude/docs/` + `doc-mapping.json`
- Docs: `app.md`, `shared.md`, `entities.md`, `features.md`, `widgets.md`, `pages.md` — generic architecture descriptions of mega-win's real layout.
- `doc-mapping.json`: map `src/**` patterns → matching rules + docs (no plinko entities/features); include `api`, `git`, `testing`, `naming`, `pitfalls` mappings.

### 5. `.claude/commands/`
- `pre-commit.md` — **skill/command like plinko**: check staged diff → `npm run lint` → forbid native `<button>`/`<img>` → run related tests (`npm run test:related`) → `npm run doc:check` → Conventional Commit. Aligned with Husky's `lint-staged` (no duplication).
- `naming-review.md` — generic naming audit against `naming.md` (no plinko vocabulary).
- `deploy.md` — `git status` → lint → build → push (Ukrainian, as in plinko).

### 6. `.claude/hooks/` + `scripts/`
- `.claude/hooks/check-inline-styles.sh` — ported.
- `scripts/audit-docs.sh`, `scripts/check-doc-freshness.sh` — doc integrity/freshness (framework-agnostic); wired as `doc:audit` / `doc:check` npm scripts.
- `scripts/run-related-tests.sh`, `scripts/check-test-coverage.sh` — ported (now active because Jest is added).

### 7. Jest test toolchain (explicitly requested)
- Dev deps: `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@types/jest`, and a TS transform (`ts-jest` or `@swc/jest`).
- Config: `jest.config.ts`, `jest.setup.ts`.
- Scripts: `test`, `test:watch`, `test:related`, `test:coverage` in `package.json`.

## Non-goals
- No redo of FSD scaffold, ESLint/Prettier/Husky config, or dependency install for the app stack.
- No plinko domain content (ball/peg/bucket/drop, auth Server Actions, BFF proxy).
- No app feature code.

## Notes / open alignment
- `pre-commit` command coexists with Husky: Husky handles mechanical git-level lint/format; the command drives the AI-assisted flow (lint + native-element check + doc:check + conventional commit + tests). No settings.json PreToolUse agent-hook (avoids triple redundancy).
- All new workflow files land on `chore/setup-ai-workflow`; they describe `src/**` which is fully present once `feat/setup-project` / `chore/linting-formatting-setup` merge into the integration branch.
