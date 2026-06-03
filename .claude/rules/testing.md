---
paths: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/__tests__/**"]
---
# Testing Patterns (Jest + Testing Library)

## What to test
| Layer | Test target | Skip |
|-------|-------------|------|
| `shared/lib` | Pure functions | shadcn wrappers |
| `entities/*/model` | Zustand store actions | state shape |
| `features/*/model` | Hooks via `renderHook` | internal state details |
| `features/*/api` | Query/mutation hooks (mock `api`) | response shapes |
| `features/*/ui` | User interactions | visual layout |
| `widgets` | Integration smoke tests | CSS, exact text |

Do NOT test `shared/ui`, `app/` layout, or `index.ts` barrels.

## Hook tests — renderHook + Query wrapper

```tsx
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

it('increments the counter', () => {
  const { result } = renderHook(() => useCounter({ start: 0 }), { wrapper });
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

## Mocking the axios instance

```ts
import { api } from '@/shared/api/client';

jest.mock('@/shared/api/client', () => ({ api: { get: jest.fn(), post: jest.fn() } }));
const mockGet = api.get as jest.Mock;

beforeEach(() => mockGet.mockResolvedValue({ data: { id: '1' } }));
```

## Mocking a Zustand store

```ts
import { useCounterStore } from '@/entities/counter';

jest.mock('@/entities/counter', () => ({ useCounterStore: jest.fn() }));
const mockStore = useCounterStore as jest.Mock;

beforeEach(() => mockStore.mockReturnValue({ count: 0, increment: jest.fn() }));
```

## File placement
Co-locate `*.test.ts(x)` next to the unit. Use `__tests__/` only when a slice has more than 3 test files.

## Rules
- One `describe` per file, one `it` per behaviour.
- Mock at the module boundary (`jest.mock('@/shared/api/client')`) — never mock internal helpers.
- `act()` around every state mutation in `renderHook`.
- Reset mocks in `beforeEach`.
