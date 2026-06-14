---
paths: ['src/**']
---

# Code Quality (enforced)

These are hard rules; the `review` skill audits against them.

## TypeScript

- NEVER `any` or `as any`. Type everything explicitly. Props interface named `Props`.
- Props MUST use `interface`. Elsewhere pick by situation: `interface` for object/data structures, `type` for unions/intersections/aliases; empty `interface X extends Y {}` → `type X = Y`.
- Type-only imports: when a statement imports only types, use `import type { X } from '…'`. Use the inline `type` qualifier (`import { value, type X }`) ONLY when a single statement mixes values and types.

## Styling

- NEVER inline `style={{}}` (exception: a dynamic CSS variable via `var()`).
- NEVER `!important` in CSS — raise specificity instead.
- NEVER hardcode hex/rgb/hsl/oklch or Tailwind palette classes (`text-zinc-400`) — use semantic OKLCH tokens.
- No magic numbers/strings. App-wide values → `shared/config/*`; slice-local values (UI labels, default state, domain enums, option lists) → the slice's `model/constants.ts`.

## Imports

- Imports form a single contiguous block — NO blank lines between import statements, and none between a leading `'use client'`/`'use server'` directive and the first import. Exactly one blank line separates the import block from the code below.

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
- Segments group by purpose: `model` = data model (stores, types, defaults, enums, **constants**); `ui` = presentation; `api` = backend calls. The `config/` segment is ONLY for feature flags / env-driven config — NOT a generic constants bucket. Slice constants live in `model/constants.ts`.

## Components/hooks

- Regular function declarations only (`export function`) — never arrow for components/hooks.
