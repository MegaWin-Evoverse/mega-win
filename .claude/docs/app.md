# Layer: app

**Responsibility:** Next.js App Router — routing, global layout, SSR provider initialization, global styles.

---

## Structure

```
src/app/
  layout.tsx        ← root layout: wraps children in global providers
  page.tsx          ← root page (entry point)
  providers.tsx     ← 'use client': QueryClientProvider + TooltipProvider
  globals.css       ← Tailwind v4 imports, OKLCH CSS custom properties
  favicon.ico
```

---

## providers.tsx

Client Component (`'use client'`) that wraps the app in:

- `QueryClientProvider` — @tanstack/react-query client instance
- `TooltipProvider` — global tooltip context

Used in `layout.tsx` to wrap `{children}`.

---

## globals.css

- Tailwind v4 `@import` directives
- OKLCH CSS variable token definitions (colors, radii, spacing)
- No component styles here — only design tokens and Tailwind setup

---

## layout.tsx

Server Component. Sets `<html>` lang, applies font variables, renders `<Providers>` around `{children}`.

---

## page.tsx

Root page component. Defines the home route (`/`).

---

## Dependencies

`app` → `pages` → `widgets` → `features` → `entities` → `shared`
