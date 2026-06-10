# AI Workflow Setup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a complete Claude/AI workflow for `mega-win` (skills, rules, docs, commands, hooks, scripts, Jest toolchain) analogous to `plinko-game`, adapted to mega-win's real stack and to **regular-function** components/hooks.

**Architecture:** Port plinko's workflow files, applying mechanical transforms (arrow→regular functions, de-domaining, BFF→axios/TanStack). Net-new files (`api.md`, `git.md`, `code-quality.md`, `pages.md`, rewritten `testing.md`/`pitfalls.md`, Jest config) are authored in full here.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind v4, axios + @tanstack/react-query, react-hook-form + zod, zustand, shadcn (@base-ui), sonner. ESLint 9 (+boundaries/prettier/react-compiler), Prettier, Husky. Jest + Testing Library (added here).

**Spec:** `docs/superpowers/specs/2026-06-03-ai-workflow-design.md`

---

## Source paths (read these during execution)

- Global skills: `C:\Users\admit\.claude\skills\<name>\SKILL.md` — `component`, `hook`, `slice`, `commit`, `review`
- Plinko rules: `C:\Users\admit\Desktop\plinko-game\.claude\rules\<name>.md`
- Plinko docs: `C:\Users\admit\Desktop\plinko-game\.claude\docs\<name>.md`
- Plinko commands: `C:\Users\admit\Desktop\plinko-game\.claude\commands\<name>.md`
- Plinko scripts: `C:\Users\admit\Desktop\plinko-game\scripts\<name>.sh`
- Plinko hook: `C:\Users\admit\Desktop\plinko-game\.claude\hooks\check-inline-styles.sh`
- Plinko AGENTS: `C:\Users\admit\Desktop\plinko-game\AGENTS.md`

## Global transforms (referenced as "Apply T1–T6")

- **T1 — component arrow→regular:** `export const Name = (args) => { body }` → `export function Name(args) { body }`. Keep `'use client'`, `Props`, JSX.
- **T2 — hook arrow→regular:** `export const useName = (args): Ret => { body }` → `export function useName(args): Ret { body }`.
- **T3 — keep legitimate arrows:** event handlers, `useCallback(() => …)`, zustand selectors `(s) => s.x`, array callbacks, `cn()` conditionals. Do NOT convert these.
- **T4 — Next.js exception:** `page.tsx`/`layout.tsx`/`loading.tsx`/`error.tsx` keep `export default function`.
- **T5 — de-domain:** remove plinko vocabulary (ball, peg, bucket, drop, land, stake, risk, multiplier, payout, credits, BigInt money, Plinko, isBallAnimating, howler/sound, animation promise). Replace examples with neutral domains (`counter`, `user`, `profile`, `product`).
- **T6 — data layer:** replace BFF/`bffApi`/Server Actions/`getValidAccessToken` with axios instance `api` from `@/shared/api/client` + TanStack `useQuery`/`useMutation`. Current-user query key example: `['me']`.

> **Commit note:** `.claude/settings.json` forces `ask` on `git commit`/`git push`. Every "Commit" step will prompt the user for approval — this is expected; wait for it.

---

## Task 1: AGENTS.md + CLAUDE.md

**Files:**

- Modify: `AGENTS.md` (currently only the `nextjs-agent-rules` block)
- Verify: `CLAUDE.md` (already `@AGENTS.md` — no change expected)

- [ ] **Step 1: Read source.** Read plinko `AGENTS.md` and the current mega-win `AGENTS.md`.

- [ ] **Step 2: Write the new `AGENTS.md`.** Start from plinko's, keep the existing `<!-- BEGIN/END:nextjs-agent-rules -->` block at the top, then port these sections with edits:
  - **Coding Style** — keep "no magic strings/literals" rule.
  - **Rules & Doc sync** — keep; reference `.claude/doc-mapping.json`; keep "CLAUDE.md under 200 lines".
  - **Communication** — keep verbatim (Ukrainian replies, English code, answer-before-action).
  - **Architecture (FSD)** — 6 layers `app → pages → widgets → features → entities → shared`; imports downward only; entities don't import entities; business logic out of UI.
  - **Styling & UI/UX** — Tailwind only, OKLCH semantic classes, no inline styles, respect user manual tweaks, Prettier-conformant output.
  - **Strict TypeScript** — no `any`, `interface` over `type`, props named `Props`.
  - **Components & State** — **CHANGE the arrow rule to:** "Regular function declarations ONLY for components AND hooks (`export function Component()` / `export function useThing()`). No arrow-function components or hooks. No `export default` except Next.js file conventions." Keep: no `React.*` namespace, zustand simple/modular, no `useEffect` to mirror props/store, render-phase sync.
  - **ADD — Naming conventions:** folders `kebab-case`, components `PascalCase`, hooks `useSomething`, constants `UPPER_SNAKE_CASE`.
  - **ADD — Public API:** every slice/module exposes `index.ts`; never import internal paths.
  - **ADD — Tooling:** Prettier (single quotes, semi, printWidth 100, arrowParens always); ESLint with `eslint-plugin-boundaries` enforces FSD imports; Husky runs lint-staged pre-commit and lint pre-push.
  - **ADD — Git strategy (short):** Conventional Commits `type(scope): description`; branch naming `type/kebab-words` (`feature/ fix/ refactor/ documentation/ test/ chore/`). Point to `.claude/rules/git.md` for details.
  - **Remove** all plinko-domain content (game/auth/bff/Zustand `isPlaying` examples specific to plinko).

- [ ] **Step 3: Verify line count.**
      Run: `node -e "console.log(require('fs').readFileSync('AGENTS.md','utf8').split('\n').length + ' lines')"`
      Expected: under ~200 lines.

- [ ] **Step 4: Verify CLAUDE.md.** Read `CLAUDE.md`; confirm it is just `@AGENTS.md`. No change.

- [ ] **Step 5: Commit** (will prompt for approval).
  ```bash
  git add AGENTS.md
  git commit -m "docs: rewrite AGENTS.md for mega-win stack and regular-function convention"
  ```

---

## Task 2: Project-local skills

**Files (create each):**

- `.claude/skills/component/SKILL.md`
- `.claude/skills/hook/SKILL.md`
- `.claude/skills/slice/SKILL.md`
- `.claude/skills/commit/SKILL.md`
- `.claude/skills/review/SKILL.md`

Each file mirrors its global source's frontmatter shape (a `description:` line) and folder name.

- [ ] **Step 1: `component` skill.** Read global `component/SKILL.md`. Copy it, then:
  - Apply **T1, T3, T4, T5**.
  - Replace every `export const X = () => {}` template/example with `export function X(props: Props) {}`.
  - Section 6 "Export": rewrite the ✅/❌ examples — ✅ `export function BetDetailDrawer(...)` becomes ✅ `export function UserCard({ user }: Props) { … }`; ❌ list `export default function` and `const X = () => {}; export default X` and **add** ❌ `export const X = () => {}` (arrow) as forbidden.
  - Update the description to end with: "regular function with named export."
  - Keep shadcn-first, clean-JSX, React-19-`ref`-as-prop, size-split guidance. De-domain examples (no Bet/Drop).

- [ ] **Step 2: `hook` skill.** Read global `hook/SKILL.md`. Copy it, then:
  - Apply **T2, T3, T5, T6**.
  - Template becomes `export function useHookName(props: Props): UseHookNameResult { … }`.
  - Keep: explicit return interface, `useCallback` for handlers, no `useEffect` state-mirroring. Replace any bff/game examples with axios+TanStack neutral ones.

- [ ] **Step 3: `slice` skill.** Read global `slice/SKILL.md`. Copy it, then:
  - Apply **T1, T2, T4, T5, T6**.
  - Every `ui/` template uses `export function`; every `model/` hook uses `export function use…`.
  - Keep the `features|entities|widgets|shared` folder shapes and `index.ts` public-API guidance.

- [ ] **Step 4: `commit` skill.** Read global `commit/SKILL.md`. Copy it, then align to the team convention:
  - Format: `<type>(<scope>): <description>` (Conventional Commits). Types: `feat fix refactor docs test chore`. Scope = slice/area (e.g. `auth`, `shared`, `entities`).
  - Add the branch-naming convention reference (`type/kebab-words`).
  - Examples: `feat(auth): add Google login support`, `fix(shared): handle expired access token`, `chore: configure eslint rules`.

- [ ] **Step 5: `review` skill.** Read global `review/SKILL.md`. Copy it, then adapt:
  - Section 1 (Architecture): keep FSD layer order `app → pages → widgets → features → entities → shared`; mention `eslint-plugin-boundaries` enforces this.
  - Section 2 (State): keep zustand selector/`useShallow` and `useEffect`-mirroring anti-patterns; **remove** module-level `let` plinko-specifics that don't apply; keep generic.
  - Section 3 (TS): keep — flag every `any`/`as any`, props named `Props`.
  - Sections 4–11: keep DRY, CSS (`!important`, inline `style`), hardcoded values, **dead code**, performance, ESLint, Next.js App Router, security. Replace socket/multiplier/BigInt examples (T5/T6) with axios/TanStack/zustand neutral ones.
  - Keep "Output format → writes `REVIEW.md`" and working rules (minimal snippets, no future abstractions).
  - **Add** a check: "Components/hooks must be regular function declarations, not arrow — flag `export const X = () => {}` for components/hooks."

- [ ] **Step 6: Verify skills are well-formed.**
      Run: `node -e "['component','hook','slice','commit','review'].forEach(n=>{const f='.claude/skills/'+n+'/SKILL.md';const s=require('fs').readFileSync(f,'utf8');if(!s.startsWith('---'))throw new Error('no frontmatter: '+n);console.log('OK',n)})"`
      Expected: `OK component … OK review`.

- [ ] **Step 7: Grep for leaked arrow components / plinko domain.**
      Run: `grep -rnE "export const [A-Z][A-Za-z]* = .*=>|\b(plinko|bucket|peg|isBallAnimating|bffApi)\b" .claude/skills/ || echo "CLEAN"`
      Expected: `CLEAN` (no arrow components, no plinko vocabulary). Fix any hits.

- [ ] **Step 8: Commit** (will prompt).
  ```bash
  git add .claude/skills
  git commit -m "feat(skills): add project-local component/hook/slice/commit/review skills"
  ```

---

## Task 3: Rules — ported (generic)

**Files (create each `.claude/rules/<name>.md`):** `app.md`, `shared.md`, `entities.md`, `features.md`, `widgets.md`, `components.md`, `naming.md`.

- [ ] **Step 1: Port the five layer rules nearly verbatim.** Copy plinko `app.md`, `shared.md`, `entities.md`, `features.md`, `widgets.md`. Edits:
  - Replace "game logic" / domain phrasing with neutral "business logic".
  - In `features.md`/`widgets.md` replace `place-bet`/`game-board` example slice names with neutral ones (`user-profile`, `product-list`).
  - Keep the `paths:` frontmatter and the "refer to `.claude/rules/components.md`" footer.
  - Keep `entities.md` zustand `useShallow` note (points to `pitfalls.md`).

- [ ] **Step 2: Port `components.md`.** Copy plinko `components.md`, then:
  - Apply **T1, T3, T4, T5**.
  - Rewrite the Server/Client examples to `export function` (e.g. `export function UserCard({ user }: Props) { return <div>{user.name}</div> }`).
  - "Export style" section: ✅ `export function SliceComponent(...)`; keep Next.js `export default function Page()` exception; **add** ❌ `export const X = () => {}`.
  - Keep: React 19 `ref` as prop, clean-JSX table, no inline styles, shadcn-first + `<button>`→`Button` mapping (generic variants — drop plinko `betModeOption` cva names, keep `icon`/`ghost`), a11y, size limit.

- [ ] **Step 3: Port `naming.md` (skeleton).** Copy plinko `naming.md` structure but **replace the domain-vocabulary table** with the team convention:
  - Core principle: names reflect the domain, not the pattern.
  - Conventions table: folders `kebab-case`; components `PascalCase`; hooks `useSomething`; constants `UPPER_SNAKE_CASE`; booleans positive (`canSubmit` not `isDisabled`); handlers named by subject (`handleEmailChange` not `handleChange`).
  - Keep the "Anti-patterns" list (generic handlers, vague state `data`/`result`/`value`, negative booleans) — **remove** plinko `drop`/`land`/`stake` vocabulary.

- [ ] **Step 4: Verify frontmatter + no plinko leakage.**
      Run: `grep -rnE "\b(plinko|bucket|peg|stake|drop the ball|isBallAnimating)\b" .claude/rules/app.md .claude/rules/shared.md .claude/rules/entities.md .claude/rules/features.md .claude/rules/widgets.md .claude/rules/components.md .claude/rules/naming.md || echo "CLEAN"`
      Expected: `CLEAN`.

- [ ] **Step 5: Commit** (will prompt).
  ```bash
  git add .claude/rules/app.md .claude/rules/shared.md .claude/rules/entities.md .claude/rules/features.md .claude/rules/widgets.md .claude/rules/components.md .claude/rules/naming.md
  git commit -m "docs(rules): add generic FSD layer, component and naming rules"
  ```

---

## Task 4: Rules — net-new (`pages.md`, `api.md`, `git.md`, `code-quality.md`)

**Files:** `.claude/rules/pages.md`, `.claude/rules/api.md`, `.claude/rules/git.md`, `.claude/rules/code-quality.md`

- [ ] **Step 1: `pages.md`.** Create:

  ```markdown
  ---
  paths: ['src/pages/**']
  ---

  # Layer: pages

  Page-level compositions. Assemble widgets, features and entities into a full page.

  ## Rules

  - A page composes lower layers; it holds no standalone business logic.
  - MUST NOT import from `app/`. May import `widgets`, `features`, `entities`, `shared` via their public `index.ts`.
  - Keep pages thin — if a block is reused across pages or grows large, extract a `widget`.
  - Route entry (`app/.../page.tsx`) delegates rendering to this layer.
  - When creating or modifying components here, follow `.claude/rules/components.md`.
  ```

- [ ] **Step 2: `api.md`.** Create:

  ```markdown
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
  ```

- [ ] **Step 3: `git.md`.** Create with the team Git convention (branch naming + Conventional Commits):

  ```markdown
  ---
  paths: ['**']
  ---

  # Git Convention

  ## Branch naming

  Lowercase, hyphen-separated, full words (no `fe`/`be`/`ui`/`upd` abbreviations).
  `feature/add-user-profile-page` · `fix/incorrect-date-formatting` ·
  `refactor/authentication-module` · `documentation/add-installation-instructions` ·
  `test/add-auth-integration-tests` · `chore/configure-eslint-rules`

  ## Commit messages — `<type>(<scope>): <description>`

  Types: `feat fix refactor docs test chore`. Scope = area/slice.

  - `feat(auth): add Google login support`
  - `fix(auth): handle expired access tokens`
  - `refactor(auth): extract token validation logic`
  - `docs(api): add authentication examples`
  - `test(user-service): improve edge-case coverage`
  - `chore: configure linting rules`
    Describe WHAT and WHY, not HOW.

  ## Rules

  - NEVER `git commit` or `git push` without explicit user approval (enforced by `.claude/settings.json` `ask`).
  ```

- [ ] **Step 4: `code-quality.md`.** Create — the reviewer checklist as enforceable rules:

  ```markdown
  ---
  paths: ['src/**']
  ---

  # Code Quality (enforced)

  These are hard rules; the `review` skill audits against them.

  ## TypeScript

  - NEVER `any` or `as any`. Type everything explicitly. Props interface named `Props`.
  - Prefer `interface`; empty `interface X extends Y {}` → `type X = Y`.

  ## Styling

  - NEVER inline `style={{}}` (exception: a dynamic CSS variable via `var()`).
  - NEVER `!important` in CSS — raise specificity instead.
  - NEVER hardcode hex/rgb/hsl/oklch or Tailwind palette classes (`text-zinc-400`) — use semantic OKLCH tokens.
  - No magic numbers — extract to `shared/config/*`.

  ## Dead code

  - No unused imports, variables, functions, types, or never-imported `shared/config` constants.
  - No unreachable branches.

  ## DRY

  - Extract a shared helper/constant when a pattern repeats ≥ 3 times. Do not abstract earlier ("YAGNI").

  ## State

  - No `useEffect` mirroring props/store into local state (cascading renders) — derive or render-phase sync.
  - No `useStore()` without a selector; object/array selectors use `useShallow`.

  ## Architecture

  - FSD layer imports downward only; entities never import entities; import slices via their public `index.ts`.

  ## Components/hooks

  - Regular function declarations only (`export function`) — never arrow for components/hooks.
  ```

- [ ] **Step 5: Verify all rule files parse (frontmatter present).**
      Run: `grep -L "^---" .claude/rules/*.md || echo "ALL HAVE FRONTMATTER"`
      Expected: `ALL HAVE FRONTMATTER`.

- [ ] **Step 6: Commit** (will prompt).
  ```bash
  git add .claude/rules/pages.md .claude/rules/api.md .claude/rules/git.md .claude/rules/code-quality.md
  git commit -m "docs(rules): add pages, api, git and code-quality rules"
  ```

---

## Task 5: Rules — rewritten testing & pitfalls

**Files:** `.claude/rules/testing.md`, `.claude/rules/pitfalls.md` (rewrite from scratch — plinko versions are too domain-specific).

- [ ] **Step 1: `testing.md`.** Create:

  ````markdown
  ---
  paths: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/__tests__/**']
  ---

  # Testing Patterns (Jest + Testing Library)

  ## What to test

  | Layer              | Test target                       | Skip                   |
  | ------------------ | --------------------------------- | ---------------------- |
  | `shared/lib`       | Pure functions                    | shadcn wrappers        |
  | `entities/*/model` | Zustand store actions             | state shape            |
  | `features/*/model` | Hooks via `renderHook`            | internal state details |
  | `features/*/api`   | Query/mutation hooks (mock `api`) | response shapes        |
  | `features/*/ui`    | User interactions                 | visual layout          |
  | `widgets`          | Integration smoke tests           | CSS, exact text        |

  Do NOT test `shared/ui`, `app/` layout, or `index.ts` barrels.

  ## Hook tests — renderHook + Query wrapper

  ```tsx
  import { renderHook, act } from '@testing-library/react';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import type { ReactNode } from 'react';

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      {children}
    </QueryClientProvider>
  );

  it('increments the counter', () => {
    const { result } = renderHook(() => useCounter({ start: 0 }), { wrapper });
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
  ```
  ````

  ## Mocking the axios instance

  ```ts
  import { api } from '@/shared/api/client';
  jest.mock('@/shared/api/client', () => ({ api: { get: jest.fn(), post: jest.fn() } }));
  const mockGet = api.get as jest.Mock;
  beforeEach(() => mockGet.mockResolvedValue({ data: { id: '1' } }));
  ```

  ## Mocking a Zustand store

  ```ts
  import { useCounterStore } from '@/entities/counter';
  jest.mock('@/entities/counter', () => ({ useCounterStore: jest.fn() }));
  const mockStore = useCounterStore as jest.Mock;
  beforeEach(() => mockStore.mockReturnValue({ count: 0, increment: jest.fn() }));
  ```

  ## File placement

  Co-locate `*.test.ts(x)` next to the unit. Use `__tests__/` only when a slice has > 3 test files.

  ## Rules
  - One `describe` per file, one `it` per behaviour.
  - Mock at the module boundary (`jest.mock('@/shared/api/client')`) — never mock internal helpers.
  - `act()` around every state mutation in `renderHook`.
  - Reset mocks in `beforeEach`.

  ```

  ```

- [ ] **Step 2: `pitfalls.md`.** Create — keep only the generic, still-applicable items:

  ````markdown
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
  ````

  ## Zustand — no cross-entity imports

  Entities must not import each other. Coordinate in `features/`.

  ## useEffect anti-pattern

  Don't mirror props/store into local state (cascading renders). Derive, or render-phase sync.

  ## TanStack Query cache after mutation

  Update via `queryClient.setQueryData`/`invalidateQueries`, not manual refetch. Keep query keys in `shared/api/query-keys.ts`.

  ## react-hook-form field names

  No raw string literals for field names — define a `const FIELD = 'name' as const`.

  ```

  ```

- [ ] **Step 3: Commit** (will prompt).
  ```bash
  git add .claude/rules/testing.md .claude/rules/pitfalls.md
  git commit -m "docs(rules): add testing and pitfalls rules for the real stack"
  ```

---

## Task 6: Docs + doc-mapping.json

**Files:** `.claude/docs/{app,shared,entities,features,widgets,pages}.md`, `.claude/doc-mapping.json`

- [ ] **Step 1: Port docs.** Read plinko `.claude/docs/{app,shared,entities,features,widgets}.md`. For each, write a generic mega-win equivalent describing the **real** layout (from `feat/setup-project`): `app` has `layout.tsx`/`page.tsx`/`providers.tsx`/`globals.css`; `shared` has `ui/`(shadcn), `lib/cn.ts`, `lib/hooks/`, `api/client.ts`, `config/`, `types/`; `entities` has the `counter` example slice; `features`/`widgets`/`pages` are currently empty scaffolds. Remove all plinko domain. Add a new `pages.md` doc (short, describing the pages layer).

- [ ] **Step 2: Write `doc-mapping.json`.** Generic mapping, no plinko entities/features:

  ```json
  {
    "version": "1.0",
    "description": "Maps file path patterns to FSD layer rules and docs.",
    "mappings": [
      {
        "pattern": "src/app/**",
        "doc": ".claude/docs/app.md",
        "rules": ".claude/rules/app.md",
        "layer": "app"
      },
      {
        "pattern": "src/pages/**",
        "doc": ".claude/docs/pages.md",
        "rules": ".claude/rules/pages.md",
        "layer": "pages"
      },
      {
        "pattern": "src/widgets/**",
        "doc": ".claude/docs/widgets.md",
        "rules": ".claude/rules/widgets.md",
        "layer": "widgets"
      },
      {
        "pattern": "src/features/**",
        "doc": ".claude/docs/features.md",
        "rules": ".claude/rules/features.md",
        "layer": "features"
      },
      {
        "pattern": "src/entities/**",
        "doc": ".claude/docs/entities.md",
        "rules": ".claude/rules/entities.md",
        "layer": "entities"
      },
      {
        "pattern": "src/shared/**",
        "doc": ".claude/docs/shared.md",
        "rules": ".claude/rules/shared.md",
        "layer": "shared"
      },
      {
        "pattern": "src/shared/api/**",
        "doc": ".claude/docs/shared.md",
        "rules": ".claude/rules/api.md",
        "layer": "shared/api"
      },
      { "pattern": "src/**", "doc": null, "rules": ".claude/rules/naming.md", "layer": "global" },
      { "pattern": "src/**", "doc": null, "rules": ".claude/rules/pitfalls.md", "layer": "global" },
      {
        "pattern": "src/**",
        "doc": null,
        "rules": ".claude/rules/code-quality.md",
        "layer": "global"
      },
      {
        "pattern": "src/**/*.test.ts",
        "doc": null,
        "rules": ".claude/rules/testing.md",
        "layer": "tests"
      },
      {
        "pattern": "src/**/*.test.tsx",
        "doc": null,
        "rules": ".claude/rules/testing.md",
        "layer": "tests"
      }
    ]
  }
  ```

- [ ] **Step 3: Validate JSON.**
      Run: `node -e "require('./.claude/doc-mapping.json').mappings.forEach(m=>console.log(m.pattern,'->',m.rules)); console.log('VALID')"`
      Expected: prints mappings then `VALID`.

- [ ] **Step 4: Verify every referenced rule/doc file exists.**
      Run: `node -e "const m=require('./.claude/doc-mapping.json').mappings,fs=require('fs');let bad=0;m.forEach(x=>{['doc','rules'].forEach(k=>{if(x[k]&&!fs.existsSync(x[k])){console.log('MISSING',x[k]);bad++}})});console.log(bad?'FAIL':'ALL EXIST')"`
      Expected: `ALL EXIST`.

- [ ] **Step 5: Commit** (will prompt).
  ```bash
  git add .claude/docs .claude/doc-mapping.json
  git commit -m "docs: add FSD layer docs and doc-mapping for mega-win"
  ```

---

## Task 7: Commands

**Files:** `.claude/commands/{pre-commit,naming-review,deploy}.md`

- [ ] **Step 1: `pre-commit.md`.** Read plinko `commands/pre-commit.md`. Adapt:
  - Steps: check staged diff → `npm run lint` → **forbidden native elements check** (`grep -rn '<button' src --include='*.tsx'` and `<img`; require `Button`/`next/image`) → **tests** `npm run test:related` (now exists) → `npm run doc:check` → Conventional Commit (`<type(scope): desc>`).
  - Note that Husky `lint-staged` already runs eslint+prettier on staged files, so this command focuses on the full-flow + AI checks.
  - Keep the `SKIP_DOC_CHECK=1` / `SKIP_AI_UPDATE=1` env-flag notes and `npm run doc:audit` manual-audit section.

- [ ] **Step 2: `naming-review.md`.** Read plinko `commands/naming-review.md`. Replace the plinko "Domain vocabulary" quick-ref and plinko flag examples with generic naming checks driven by `.claude/rules/naming.md`: flag generic handlers (`handleChange`), vague state (`data`/`result`/`value`/`items`), negative booleans (`isDisabled`), weak props. Keep the report format and "propose renames, don't auto-rename" rule.

- [ ] **Step 3: `deploy.md`.** Read plinko `commands/deploy.md`. Port nearly verbatim (Ukrainian): `git status`/branch → `npm run lint` → `npm run build` → `git push origin <branch>` → report. (Push will prompt per `ask`.)

- [ ] **Step 4: Commit** (will prompt).
  ```bash
  git add .claude/commands
  git commit -m "feat(commands): add pre-commit, naming-review and deploy commands"
  ```

---

## Task 8: Hooks + doc scripts

**Files:** `.claude/hooks/check-inline-styles.sh`; `scripts/{audit-docs,check-doc-freshness}.sh`

- [ ] **Step 1: Port `check-inline-styles.sh`.** Copy plinko `.claude/hooks/check-inline-styles.sh` verbatim (it already targets `src/*.tsx` and is generic).

- [ ] **Step 2: Port doc scripts.** Copy plinko `scripts/audit-docs.sh` and `scripts/check-doc-freshness.sh`. Read each; confirm they only depend on `.claude/doc-mapping.json`, `.claude/docs`, `.claude/rules`, `git`, and (optionally) the `claude` CLI — no plinko-specific paths. Adjust any hardcoded project name/path if present.

- [ ] **Step 3: Add npm scripts.** In `package.json` add to `scripts`: `"doc:check": "bash scripts/check-doc-freshness.sh"`, `"doc:audit": "bash scripts/audit-docs.sh"`.

- [ ] **Step 4: Smoke-run the audit.**
      Run: `bash scripts/audit-docs.sh; echo "exit=$?"`
      Expected: runs and reports mapping coverage (non-crash). It may warn about uncovered `src/` dirs — that's informational.

- [ ] **Step 5: Commit** (will prompt).
  ```bash
  git add .claude/hooks scripts/audit-docs.sh scripts/check-doc-freshness.sh package.json
  git commit -m "chore: add inline-style hook and doc freshness/audit scripts"
  ```

---

## Task 9: Jest toolchain

**Files:** `package.json` (deps+scripts), `jest.config.ts`, `jest.setup.ts`, `scripts/{run-related-tests,check-test-coverage}.sh`, plus one smoke test.

- [ ] **Step 1: Install dev deps.**
      Run: `npm install -D jest@^30 jest-environment-jsdom@^30 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14 @types/jest@^30`
      Expected: installs without peer-dep errors (React 19 / Next 16).

- [ ] **Step 2: Create `jest.config.ts`** (uses `next/jest`):

  ```ts
  import type { Config } from 'jest';
  import nextJest from 'next/jest.js';

  const createJestConfig = nextJest({ dir: './' });

  const config: Config = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
    testMatch: [
      '<rootDir>/src/**/*.test.ts',
      '<rootDir>/src/**/*.test.tsx',
      '<rootDir>/src/**/__tests__/**/*.ts',
      '<rootDir>/src/**/__tests__/**/*.tsx',
    ],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.d.ts',
      '!src/**/index.ts',
      '!src/app/globals.css',
    ],
    coverageThreshold: { global: { branches: 70, functions: 70, lines: 70, statements: 70 } },
    coverageReporters: ['text', 'lcov', 'html'],
    coverageDirectory: 'coverage',
  };

  export default createJestConfig(config);
  ```

- [ ] **Step 3: Create `jest.setup.ts`:**

  ```ts
  import '@testing-library/jest-dom';
  ```

- [ ] **Step 4: Add test scripts to `package.json`:**

  ```json
  "test": "jest",
  "test:watch": "jest --watch",
  "test:related": "bash scripts/run-related-tests.sh",
  "test:coverage": "bash scripts/check-test-coverage.sh"
  ```

- [ ] **Step 5: Port test scripts.** Copy plinko `scripts/run-related-tests.sh` and `scripts/check-test-coverage.sh`. Read each; fix any hardcoded project path; confirm they call `jest`/`npm test` and `git` only.

- [ ] **Step 6: Write a failing smoke test.** Create `src/shared/lib/cn.test.ts`:

  ```ts
  import { cn } from '@/shared/lib/cn';

  describe('cn', () => {
    it('merges class names and dedupes tailwind conflicts', () => {
      expect(cn('p-2', 'p-4')).toBe('p-4');
      expect(cn('text-sm', false && 'hidden', 'font-bold')).toBe('text-sm font-bold');
    });
  });
  ```

  > Note: this test targets `src/shared/lib/cn.ts`, which exists on `feat/setup-project`. If executing before that merge, create a minimal `src/shared/lib/cn.ts` re-exporting `clsx`+`tailwind-merge`, or point the test at an existing util. Confirm the path before running.

- [ ] **Step 7: Run it — verify PASS.**
      Run: `npm test -- cn.test.ts`
      Expected: 1 passing test (the toolchain works end-to-end). If `cn.ts` is absent on this branch, create it first (per Step 6 note).

- [ ] **Step 8: Commit** (will prompt).
  ```bash
  git add package.json package-lock.json jest.config.ts jest.setup.ts scripts/run-related-tests.sh scripts/check-test-coverage.sh src/shared/lib/cn.test.ts
  git commit -m "chore(test): add Jest + Testing Library toolchain and smoke test"
  ```

---

## Task 10: Final verification

- [ ] **Step 1: doc-mapping integrity.** Run: `npm run doc:audit` — review report; fix any orphan rule files or uncovered patterns.
- [ ] **Step 2: Lint clean.** Run: `npm run lint` — expected: no errors from the new files (markdown/json/sh are not linted; jest config/test must pass eslint).
- [ ] **Step 3: Tests pass.** Run: `npm test` — expected: smoke test passes.
- [ ] **Step 4: Skills sanity.** Confirm `.claude/skills/{component,hook,slice,commit,review}/SKILL.md` exist and start with `---`.
- [ ] **Step 5: Grep final leakage.** Run: `grep -rnE "\b(plinko|bucket\b|peg\b|isBallAnimating|bffApi|stake)\b" .claude AGENTS.md || echo "CLEAN"` — expected `CLEAN`.
- [ ] **Step 6: Update spec status.** In the spec doc, mark status "Implemented". Commit (will prompt): `git commit -am "docs: mark AI workflow spec implemented"`.

---

## Self-review notes (author)

- **Spec coverage:** AGENTS.md (T1), skills incl. review (T2), all rules incl. api/git/code-quality/testing/pitfalls (T3–T5), docs+mapping (T6), commands (T7), hooks+doc scripts (T8), Jest toolchain (T9), settings.json `ask` (done earlier), branch rename (done earlier). All spec deliverables mapped.
- **Type/name consistency:** axios instance is `api` from `@/shared/api/client`; query key example `['me']`; store example `useCounterStore` from `@/entities/counter`; util `cn` from `@/shared/lib/cn` — used consistently across rules, testing examples, and the smoke test.
- **Known dependency:** rules describe `src/**` which fully exists once `feat/setup-project` (and `chore/linting-formatting-setup`) merge. Workflow files are valid metadata regardless; only Task 9 Step 6/7 touch real `src/` code (guarded with a note).
