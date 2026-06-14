---
paths: ['src/**']
---

# Code Quality (enforced)

These are hard rules; the `review` skill audits against them.

## TypeScript

- NEVER `any` or `as any`. Type everything explicitly. Props interface named `Props`.
- Props MUST use `interface`. Elsewhere pick by situation: `interface` for object/data structures, `type` for unions/intersections/aliases; empty `interface X extends Y {}` → `type X = Y`.

## Styling

- NEVER inline `style={{}}` (exception: a dynamic CSS variable via `var()`).
- NEVER `!important` in CSS — raise specificity instead.
- NEVER hardcode hex/rgb/hsl/oklch or Tailwind palette classes (`text-zinc-400`) — use semantic OKLCH tokens.
- No magic numbers — extract to `shared/config/*`.

## Imports & blank lines

- Imports form a single contiguous block — NO blank lines between import statements, and none between a leading `'use client'`/`'use server'` directive and the first import. Exactly one blank line separates the import block from the code.
- No blank lines inside JSX markup (between sibling elements or right inside a `return ( … )`).
- KEEP blank lines that aid readability: between top-level declarations, between logical statement groups in a function body, and between grouped entries in large object/array literals.
- Enforced by the `remove-spaces` skill and `scripts/check-blank-lines.mjs`.

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
