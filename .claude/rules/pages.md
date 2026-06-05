---
paths: ["src/pages/**"]
---
# Layer: pages

Page-level compositions. Assemble widgets, features and entities into a full page.

## Rules
- A page composes lower layers; it holds no standalone business logic.
- MUST NOT import from `app/`. May import `widgets`, `features`, `entities`, `shared` via their public `index.ts`.
- Keep pages thin — if a block is reused across pages or grows large, extract a `widget`.
- Route entry (`app/.../page.tsx`) delegates rendering to this layer.
- When creating or modifying components here, follow `.claude/rules/components.md`.
