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
  api/
    bets/latest/
      route.ts            ← GET /api/bets/latest
      high-rollers/route.ts
      lucky/route.ts
      my/route.ts
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

## api/

Route Handlers that proxy requests to the backend API. Each `route.ts` follows the same shape:

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bets/latest`);

  if (!response.ok) {
    return NextResponse.json({}, { status: response.status });
  }

  const data = await response.json();

  return NextResponse.json(data);
}
```

- Forward to `${NEXT_PUBLIC_API_URL}/<backend-path>`
- On a non-OK upstream response, return an empty body with the upstream status
- On success, forward the parsed JSON body as-is

---

## Dependencies

`app` → `pages` → `widgets` → `features` → `entities` → `shared`
