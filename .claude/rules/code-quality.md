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
