---
paths: ['src/widgets/**']
---

# Layer: widgets

Complex UI blocks composed from features and entities — ready-to-place sections of a page.

## Structure

```
widgets/
  product-list/
    ui/
      ProductList.tsx
    index.ts
```

## Rules

- Widgets compose features and entities into a cohesive UI block; they contain no standalone business logic
- A widget is justified when the same composed block appears in more than one page, or when it's too large to live inside a page component
- MUST NOT import from `pages/` or `app/`
- Pass data down via props or read from stores — do not create new stores inside widgets
- Export only the top-level component through the slice's `index.ts`
- Import entities and features ONLY through their public `index.ts`
- **No layer-level barrel**: there is NO `src/widgets/index.ts`. Import widgets directly from their slice: `@/widgets/header`, `@/widgets/footer`, etc. — never from `@/widgets`
- Slice constants (labels, defaults, enums) go in `model/constants.ts`, not a `config/` segment — `config/` is only for feature flags / env config
- When creating or modifying components in this layer, refer to and follow `.claude/rules/components.md`.
