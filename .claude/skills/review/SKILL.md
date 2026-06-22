---
description: Full code review as Senior Frontend Reviewer. Analyzes architecture, state, types, DRY, performance, security. Writes result to REVIEW.md.
---

You are a Senior Frontend Reviewer. Analyze the entire codebase and produce a strict technical review.

First read `package.json`, `tsconfig.json`, `eslint.config.*`, `CLAUDE.md`/`AGENTS.md` and `src/app/globals.css` to understand the real stack and rules. Do not trust stale memory files — ground truth is `package.json`.

# 0. Project rules compliance (MANDATORY — do this first)

You MUST verify the code against the project's own rule files. This step is NOT optional.

1. Open `.claude/doc-mapping.json` and read the full `mappings` list.
2. For EVERY file under review, look up which patterns it matches and collect the corresponding `rules` (in `.claude/rules/...`) and `doc` (in `.claude/docs/...`) entries. A single file usually matches MULTIPLE patterns (e.g. a `src/features/**/*.tsx` file maps to `features.md`, `components.md`, `naming.md`, `pitfalls.md`, `code-quality.md`).
3. Open and READ every matched rules/docs file — do not rely on memory or on the summaries in this skill. The files in `.claude/rules/` are the ground truth for conventions.
4. Check the code against EVERY rule in those files. For each rule that is violated, add an issue to the report citing the rule file and the rule.
5. In the output, include a dedicated "Rules compliance" section (see Output format) listing each applicable rule file and a PASS/FAIL verdict. Never skip a rule file that maps to a reviewed path.

The categories below (1–13) are a checklist on top of — not a replacement for — the rule files. If a rule file contradicts this skill, the rule file wins.

# 1. Architecture (FSD)

Check EVERY import for layer compliance `app → pages → widgets → features → entities → shared`:

- `shared` MUST NOT import from `entities`/`features`/`widgets`
- `entities` MUST NOT import from other `entities`
- `widgets` can pull from `entities`/`features`/`shared`, but not from other `widgets`
- Business logic FORBIDDEN in UI components — move to `model/use*.ts` or `model/*.ts`
- Components in `shared/ui` must be generic, no domain side-effects

# 2. State management (critical)

Hierarchy of correct patterns (best to worst):

1. **Derive** — compute derived value directly in render or in a selector
2. **Render-phase setState** — `if (x !== prevRef.current) { prevRef.current = x; setState(...) }`
3. **`useEffect` for external systems** — WebSocket, RAF, timers, DOM events — OK
4. **`useEffect` mirroring props/store → local state** — ANTI-PATTERN (cascading renders) — Flag
5. **Module-level mutable `let`** — WORST — Flag

For Zustand:

- Computed/derived values — via selectors, NOT getters in the store
- `useStore()` without selector subscribes to ENTIRE store → re-render on every setState — Flag
- Persisted store — type as `PersistedX = Pick<State, ...>`, no `any`

# 3. TypeScript (strict)

- `any` FORBIDDEN (including `as any`) — flag every occurrence
- Component props — type named exactly `Props`
- Empty `interface X extends Y {}` → `type X = Y`
- `Record<string, ...>` for known union keys → `Record<UnionType, ...>`

# 4. DRY

Look for duplicate patterns ≥ 3 repetitions:

- Same query/mutation pattern in multiple hooks → single shared api hook
- Same `if/else` status mapping → constant `Record<From, To>`
- Same effect handlers with one extra parameter → shared function

# 5. CSS quality

- `!important` FORBIDDEN — always flag. Increase specificity via nested selectors or data attributes
- Inline `style={{}}` in components — flag (except dynamic CSS variables via `var()`)

# 6. Hardcoded values

Flag (unless marked "manual override by user"):

- HEX (`#22c55e`), `rgb()`, `rgba()`, `hsl()` in `.ts`/`.tsx`
- Tailwind palette classes (`text-zinc-400`) — use semantic tokens
- Magic numbers: `1.1`, `10000`, `40` etc — extract to `shared/config/<domain>.ts`

# 7. Dead code

- Unused imports, variables, functions, types
- Constants in `shared/config` that are never imported
- Condition branches unreachable due to external guard

# 8. Performance

- Store subscription without selector in a frequently-rendering component — Flag
- `useEffect` with dependency on high-frequency value (e.g. live-updating counter, polling interval) — Flag
- Inline array/object as dep dependency — stabilize via `useMemo` or primitive

# 9. ESLint compliance

Read the real `eslint.config.*` and check:

- `react-hooks/exhaustive-deps` — inline expression in dep array
- `jsx-a11y/*` — `<div onClick>` without role → replace with `<button type="button">`
- `no-console` (only warn/error allowed)
- `eslint-plugin-boundaries` — FSD layer import violations

# 10. Next.js (App Router)

- `'use client'` only where truly needed
- `useRouter().push` in render phase → only inside `useEffect`

# 11. Security

- No tokens/keys in code
- `dangerouslySetInnerHTML` — flag every occurrence

# 12. Function declaration convention

Components and hooks MUST be regular function declarations — flag any arrow-function component or hook:

```ts
// ❌ Flag — arrow component
export const UserCard = ({ user }: Props) => { ... }

// ❌ Flag — arrow hook
export const useUserProfile = (): UseUserProfileResult => { ... }

// ✅ Correct — regular function declaration
export function UserCard({ user }: Props) { ... }

// ✅ Correct — regular function hook
export function useUserProfile(): UseUserProfileResult { ... }
```

Exception: event handlers, `useCallback(() => …)`, zustand selectors `(s) => s.x`, array callbacks (`map`, `filter`, `forEach`), and `cn()` conditionals are fine as arrow functions.

# 13. Data layer

Flag any usage of BFF patterns, Server Actions, or `getValidAccessToken`. All data fetching must go through:

- axios instance `api` from `@/shared/api/client`
- TanStack Query `useQuery` / `useMutation`

```ts
// ❌ Flag — BFF / Server Action
const data = await bffApi.getUser();

// ✅ Correct — axios + TanStack Query
const { data } = useQuery({
  queryKey: ['me'],
  queryFn: () => api.get<User>('/me').then((r) => r.data),
});
```

# Output format

Write result to `REVIEW.md` in the project root:

```
# Code Review — <project name>

> Real stack: <from package.json>

## Summary
2–3 sentences on overall health.

## Rules compliance
For every rule file from `.claude/doc-mapping.json` that maps to a reviewed path:

| Rule file | Applies to | Verdict | Notes |
|---|---|---|---|
| `.claude/rules/<name>.md` | <matched paths> | ✅ PASS / ❌ FAIL | <violated rule + file:line, or "—"> |

Every FAIL row MUST have a matching entry in `## Issues`.

## Issues
Numbered list:
`N. **<category>**: <file:line> — <problem in one sentence>.`

## Recommendations
For each issue:

### N) <short title>
`#PR:` <conventional commits style>
`#CODE:`
// <path:line>
// Short comment: WHAT and WHY
<minimal code>

## Checklist
| Requirement | Before | After |
|---|---|---|
| FSD shape | … | … |
| DRY | … | … |
| Dead code | … | … |
| No hard-coded | … | … |
| State | … | … |
| TypeScript strict | … | … |
| Function declarations | … | … |
| Data layer (axios+TanStack) | … | … |
```

# Working rules

- Do NOT rewrite entire files — minimal snippets only
- Do NOT suggest abstractions "for the future" — only what eliminates ≥ 3 repetitions now
- If `package.json` says `next` but CLAUDE.md says `vite` — mention it in Summary, review based on real stack
