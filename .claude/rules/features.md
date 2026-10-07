---
paths: ['src/features/**']
---

# Layer: features

Interactive features — user actions that involve business logic and may coordinate multiple entities.

## Structure

Each feature lives in its own slice:

```
features/
  user-profile/
    ui/          ← React components for this feature
    model/       ← hooks, local state, side-effects, constants.ts (labels, defaults, enums)
    api/         ← feature-specific API calls (if any)
    index.ts     ← public API
```

> **Constants live in `model/`.** UI labels, default state values, domain enums, and option lists are part of the slice's data model — put them in `model/constants.ts`, NOT in a `config/` segment. The `config/` segment is reserved for genuine configuration (feature flags, env-driven settings), rare at the slice level. App-wide constants belong in `shared/config`.

## Rules

- This is the correct place to **coordinate between entities** (e.g. reading data from `user`, updating state from another entity)
- Import entities ONLY through their public `index.ts` — never reach into `entity/model/store.ts` directly
- Import other features ONLY through their public `index.ts` — never reach into `feature/model/` or `feature/ui/` directly
- Features MUST NOT import from `widgets/` or `pages/`
- Keep UI components in `ui/`, business logic in `model/` — no logic inside JSX
- Slice constants (labels, defaults, enums, option lists) go in `model/constants.ts` — do not create a `config/` segment for them
- Each feature exposes a single public API via `index.ts`
- When creating or modifying components in this layer, refer to and follow `.claude/rules/components.md`.
