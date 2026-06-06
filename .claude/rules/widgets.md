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
    model/
      types.ts        ← domain/data types for the slice
      useProductList.ts
    config/
      constants.ts    ← static values only (IDs, labels, data arrays)
    index.ts
```

## Rules

- Widgets compose features and entities into a cohesive UI block; they contain no standalone business logic
- **Types live in `model/types.ts`, not in `config/`.** `config/` holds only static values (constants, IDs, data arrays); the `interface`/`type` definitions that describe their shape go to `model/types.ts`. If `config/` needs a type to annotate its data, it imports it from `model/types`.
- A widget is justified when the same composed block appears in more than one page, or when it's too large to live inside a page component
- MUST NOT import from `pages/` or `app/`
- Pass data down via props or read from stores — do not create new stores inside widgets
- Export only the top-level component through `index.ts`
- Import entities and features ONLY through their public `index.ts`
- Widget-to-widget imports go through the shared barrel `@/widgets` — never directly from `@/widgets/slice-name/Component`
- When creating or modifying components in this layer, refer to and follow `.claude/rules/components.md`.
