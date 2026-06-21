# Daily Claim Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the sidebar's "Daily Claimer" card functional: logged-out users see a `Login` button that opens the shared auth modal; logged-in users see a real `Claim` button (live points amount) that calls the backend, refreshes the balance, and then shows a live countdown until the next claim window.

**Architecture:** A new `features/daily-claim` slice owns all data (status query + claim mutation + countdown) behind a single hook, `useDailyClaim()`. The existing `src/app/api/[...path]/route.ts` catch-all already proxies any `/api/daily-claimer/*` call to the backend with cookies forwarded — no new BFF route files are needed. `widgets/sidebar/ui/SidebarHeaderSection.tsx` calls the hook once and passes its result as props into `DailyClaimerCard`, which becomes a pure render of `uiState`.

**Tech Stack:** Next.js App Router, TanStack Query (`useQuery`/`useMutation`), Zustand (`useAuthStore`, reused), Axios (`api` client), Sonner (`toast`), Jest + React Testing Library.

## Global Constraints

- No `any`, explicit types everywhere, `Props` interface name for component props (`.claude/rules/code-quality.md`).
- No magic strings/numbers — labels/messages/query keys go in `model/constants.ts` (`AGENTS.md`, `.claude/rules/code-quality.md`).
- Components/hooks: regular `function` declarations only, never arrow (`.claude/rules/components.md`).
- Import slices only via their public `index.ts`; features must not import `widgets/`; entities must not import other entities (`.claude/rules/features.md`, `.claude/rules/entities.md`).
- User-facing errors via `toast` from `sonner`, never `alert` (`.claude/rules/api.md`).
- Query keys centralized in `src/shared/api/query-keys.ts`, never inlined (`.claude/rules/api.md`).
- After a mutation, update cache via `invalidateQueries`/`setQueryData`, never manual refetch (`.claude/rules/api.md`).
- No blank lines inside JSX, no inline `style={}`, no hardcoded hex/rgb/oklch (`.claude/rules/components.md`, `.claude/rules/code-quality.md`).
- Tests: one `describe` per file, one `it` per behaviour, mock at the module boundary (`@/shared/api/client`, `@/entities/user`, `@/features/auth`), `act()` around `renderHook` mutations (`.claude/rules/testing.md`).
- Commit messages: Conventional Commits `type(scope): description` (`.claude/rules/git.md`). Branch already on `feat/daily-claim`.

---

## File Structure

```
src/features/daily-claim/
  model/
    types.ts              # ClaimStatus, ClaimResponse, DailyClaimUiState
    constants.ts           # query keys, error/success messages, countdown format pieces
    useClaimStatus.ts       # useQuery wrapper
    useClaimStatus.test.ts
    useCountdown.ts         # generic per-second countdown hook
    useCountdown.test.ts
    useDailyClaim.ts        # orchestrating hook (the slice's only export)
    useDailyClaim.test.ts
  api/
    fetchClaimStatus.ts
    claimDaily.ts
  index.ts                  # exports useDailyClaim + DailyClaimUiState type

src/shared/api/query-keys.ts        # MODIFY: add DAILY_CLAIM_QUERY_KEYS
src/widgets/sidebar/ui/SidebarHeaderSection.tsx  # MODIFY: call useDailyClaim, gate expanded group
src/widgets/sidebar/ui/DailyClaimerCard.tsx      # MODIFY: pure render of Props
src/widgets/sidebar/ui/DailyClaimerCard.test.tsx # NEW
```

---

### Task 1: Query keys + shared types/constants

**Files:**
- Modify: `src/shared/api/query-keys.ts`
- Create: `src/features/daily-claim/model/types.ts`
- Create: `src/features/daily-claim/model/constants.ts`

**Interfaces:**
- Produces: `DAILY_CLAIM_QUERY_KEYS.status` (`readonly ['daily-claim', 'status']`), `ClaimStatus`, `ClaimResponse`, `DailyClaimUiState`, `DAILY_CLAIM_ERROR_MESSAGE`, `DAILY_CLAIM_API_PATHS`.

- [ ] **Step 1: Add the query key**

Modify `src/shared/api/query-keys.ts`, adding a new exported const (keep existing exports untouched):

```ts
export const DAILY_CLAIM_QUERY_KEYS = {
  status: ['daily-claim', 'status'] as const,
};
```

- [ ] **Step 2: Write `model/types.ts`**

```ts
export interface ClaimStatus {
  available: boolean;
  enabled: boolean;
  pointsAmount: number;
  nextClaimAt: string;
  secondsUntilNextClaim: number;
  invalidConfig: boolean;
}

export interface ClaimResponse {
  pointsAmount: number;
}

export type DailyClaimUiState = 'hidden' | 'login' | 'claim' | 'countdown';
```

- [ ] **Step 3: Write `model/constants.ts`**

```ts
export const DAILY_CLAIM_API_PATHS = {
  status: '/api/daily-claimer/status',
  claim: '/api/daily-claimer/claim',
} as const;

export const DAILY_CLAIM_HTTP_STATUS = {
  DISABLED: 403,
  ALREADY_CLAIMED: 409,
  THROTTLED: 429,
  INVALID_CONFIG: 500,
} as const;

export const DAILY_CLAIM_ERROR_MESSAGE = {
  ALREADY_CLAIMED: "You've already claimed today",
  THROTTLED: 'Too many attempts, please slow down',
  UNAVAILABLE: 'Daily claimer is unavailable right now',
} as const;

export const DAILY_CLAIM_COUNTDOWN_UNIT = {
  HOUR: 'h',
  MINUTE: 'm',
  SECOND: 's',
} as const;
```

- [ ] **Step 4: Commit**

```bash
git add src/shared/api/query-keys.ts src/features/daily-claim/model/types.ts src/features/daily-claim/model/constants.ts
git commit -m "feat(daily-claim): add query keys, types and constants"
```

---

### Task 2: API request functions

**Files:**
- Create: `src/features/daily-claim/api/fetchClaimStatus.ts`
- Create: `src/features/daily-claim/api/claimDaily.ts`

**Interfaces:**
- Consumes: `ClaimStatus`, `ClaimResponse` from `../model/types` (Task 1); `DAILY_CLAIM_API_PATHS` from `../model/constants` (Task 1); `api` from `@/shared/api/client`.
- Produces: `fetchClaimStatus(): Promise<ClaimStatus>`, `claimDaily(): Promise<ClaimResponse>`.

- [ ] **Step 1: Write `api/fetchClaimStatus.ts`**

```ts
import { api } from '@/shared/api/client';
import { DAILY_CLAIM_API_PATHS } from '../model/constants';
import type { ClaimStatus } from '../model/types';

export async function fetchClaimStatus(): Promise<ClaimStatus> {
  const { data } = await api.get<ClaimStatus>(DAILY_CLAIM_API_PATHS.status);

  return data;
}
```

- [ ] **Step 2: Write `api/claimDaily.ts`**

```ts
import { api } from '@/shared/api/client';
import { DAILY_CLAIM_API_PATHS } from '../model/constants';
import type { ClaimResponse } from '../model/types';

export async function claimDaily(): Promise<ClaimResponse> {
  const { data } = await api.post<ClaimResponse>(DAILY_CLAIM_API_PATHS.claim);

  return data;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/features/daily-claim/api/fetchClaimStatus.ts src/features/daily-claim/api/claimDaily.ts
git commit -m "feat(daily-claim): add claim status and claim API request functions"
```

(No dedicated tests for these — they are one-line axios wrappers; covered indirectly by the hook tests in Tasks 3 and 5, per `.claude/rules/testing.md`'s "Skip: response shapes" guidance for `features/*/api`.)

---

### Task 3: `useClaimStatus` query hook

**Files:**
- Create: `src/features/daily-claim/model/useClaimStatus.ts`
- Test: `src/features/daily-claim/model/useClaimStatus.test.ts`

**Interfaces:**
- Consumes: `fetchClaimStatus` from `../api/fetchClaimStatus` (Task 2); `DAILY_CLAIM_QUERY_KEYS` from `@/shared/api/query-keys` (Task 1).
- Produces: `useClaimStatus(isAuthenticated: boolean): UseQueryResult<ClaimStatus>` (re-exports TanStack Query's return shape — callers use `.data`, `.isPending`, etc.).

- [ ] **Step 1: Write the failing test**

```ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useClaimStatus } from './useClaimStatus';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

jest.mock('../api/fetchClaimStatus', () => ({ fetchClaimStatus: jest.fn() }));
const mockFetchClaimStatus = fetchClaimStatus as jest.Mock;

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

describe('useClaimStatus', () => {
  beforeEach(() => {
    mockFetchClaimStatus.mockReset();
  });

  it('fetches the claim status when authenticated', async () => {
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderHook(() => useClaimStatus(true), { wrapper });

    await waitFor(() => expect(result.current.data?.pointsAmount).toBe(10));
    expect(mockFetchClaimStatus).toHaveBeenCalledTimes(1);
  });

  it('does not fetch when not authenticated', () => {
    renderHook(() => useClaimStatus(false), { wrapper });

    expect(mockFetchClaimStatus).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useClaimStatus`
Expected: FAIL with "Cannot find module './useClaimStatus'"

- [ ] **Step 3: Write minimal implementation**

```ts
'use client';
import { useQuery } from '@tanstack/react-query';
import { DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

export function useClaimStatus(isAuthenticated: boolean) {
  return useQuery({
    queryKey: DAILY_CLAIM_QUERY_KEYS.status,
    queryFn: fetchClaimStatus,
    enabled: isAuthenticated,
    retry: false,
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useClaimStatus`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/features/daily-claim/model/useClaimStatus.ts src/features/daily-claim/model/useClaimStatus.test.ts
git commit -m "feat(daily-claim): add useClaimStatus query hook"
```

---

### Task 4: `useCountdown` hook

**Files:**
- Create: `src/features/daily-claim/model/useCountdown.ts`
- Test: `src/features/daily-claim/model/useCountdown.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks (pure, generic).
- Produces: `useCountdown(targetIso: string | undefined): { label: string; isComplete: boolean }`. `label` is formatted as `${h}h:${m}m:${s}s`. `isComplete` becomes `true` once the target time has passed (callers use this to trigger a status refetch).

- [ ] **Step 1: Write the failing test**

```ts
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-21T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('formats the remaining time as h:m:s', () => {
    const target = new Date('2026-06-21T01:46:34.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.label).toBe('1h:46m:34s');
    expect(result.current.isComplete).toBe(false);
  });

  it('ticks down every second', () => {
    const target = new Date('2026-06-21T00:00:05.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.label).toBe('0h:00m:04s');
  });

  it('marks complete once the target time has passed', () => {
    const target = new Date('2026-06-21T00:00:01.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.label).toBe('0h:00m:00s');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useCountdown`
Expected: FAIL with "Cannot find module './useCountdown'"

- [ ] **Step 3: Write minimal implementation**

```ts
'use client';
import { useEffect, useState } from 'react';
import { DAILY_CLAIM_COUNTDOWN_UNIT } from './constants';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';

interface UseCountdownResult {
  label: string;
  isComplete: boolean;
}

function formatRemaining(secondsRemaining: number): string {
  const hours = Math.floor(secondsRemaining / SECONDS_PER_HOUR);
  const minutes = Math.floor((secondsRemaining % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = secondsRemaining % SECONDS_PER_MINUTE;
  const paddedMinutes = String(minutes).padStart(PAD_LENGTH, PAD_CHAR);
  const paddedSeconds = String(seconds).padStart(PAD_LENGTH, PAD_CHAR);

  return `${hours}${DAILY_CLAIM_COUNTDOWN_UNIT.HOUR}:${paddedMinutes}${DAILY_CLAIM_COUNTDOWN_UNIT.MINUTE}:${paddedSeconds}${DAILY_CLAIM_COUNTDOWN_UNIT.SECOND}`;
}

function secondsUntil(targetIso: string | undefined): number {
  if (!targetIso) return 0;

  const diffMs = new Date(targetIso).getTime() - Date.now();

  return Math.max(0, Math.round(diffMs / MILLISECONDS_PER_SECOND));
}

export function useCountdown(targetIso: string | undefined): UseCountdownResult {
  const [secondsRemaining, setSecondsRemaining] = useState(() => secondsUntil(targetIso));

  useEffect(() => {
    setSecondsRemaining(secondsUntil(targetIso));

    const intervalId = setInterval(() => {
      setSecondsRemaining(secondsUntil(targetIso));
    }, MILLISECONDS_PER_SECOND);

    return () => clearInterval(intervalId);
  }, [targetIso]);

  return {
    label: formatRemaining(secondsRemaining),
    isComplete: targetIso !== undefined && secondsRemaining <= 0,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useCountdown`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/features/daily-claim/model/useCountdown.ts src/features/daily-claim/model/useCountdown.test.ts
git commit -m "feat(daily-claim): add useCountdown hook"
```

---

### Task 5: `useDailyClaim` orchestrating hook + public API

**Files:**
- Create: `src/features/daily-claim/model/useDailyClaim.ts`
- Test: `src/features/daily-claim/model/useDailyClaim.test.ts`
- Create: `src/features/daily-claim/index.ts`

**Interfaces:**
- Consumes: `useClaimStatus` (Task 3), `useCountdown` (Task 4), `claimDaily` from `../api/claimDaily` (Task 2), `DAILY_CLAIM_QUERY_KEYS` from `@/shared/api/query-keys` (Task 1), `DAILY_CLAIM_HTTP_STATUS`/`DAILY_CLAIM_ERROR_MESSAGE` from `./constants` (Task 1), `useUserQuery` from `@/entities/user`, `useAuthStore` from `@/features/auth`, `QUERY_KEYS` from `@/shared/api/query-keys`.
- Produces (the slice's only public export):

```ts
interface UseDailyClaimResult {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  countdownLabel: string;
  isClaiming: boolean;
  onAction: () => void;
}

function useDailyClaim(): UseDailyClaimResult
```

- [ ] **Step 1: Write the failing test**

```tsx
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { toast } from 'sonner';
import { useDailyClaim } from './useDailyClaim';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';
import { claimDaily } from '../api/claimDaily';
import { fetchClaimStatus } from '../api/fetchClaimStatus';

jest.mock('@/entities/user', () => ({ useUserQuery: jest.fn() }));
jest.mock('@/features/auth', () => ({ useAuthStore: jest.fn() }));
jest.mock('../api/claimDaily', () => ({ claimDaily: jest.fn() }));
jest.mock('../api/fetchClaimStatus', () => ({ fetchClaimStatus: jest.fn() }));
jest.mock('sonner', () => ({ toast: { error: jest.fn() } }));

const mockUseUserQuery = useUserQuery as jest.Mock;
const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockClaimDaily = claimDaily as jest.Mock;
const mockFetchClaimStatus = fetchClaimStatus as jest.Mock;
const mockOpenAuthForm = jest.fn();

function renderDailyClaim() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return { ...renderHook(() => useDailyClaim(), { wrapper }), queryClient };
}

describe('useDailyClaim', () => {
  beforeEach(() => {
    mockUseAuthStore.mockImplementation((selector) => selector({ openAuthForm: mockOpenAuthForm }));
    mockOpenAuthForm.mockReset();
    mockClaimDaily.mockReset();
    mockFetchClaimStatus.mockReset();
    (toast.error as jest.Mock).mockReset();
  });

  it('returns uiState "login" and opens the auth form when not authenticated', () => {
    mockUseUserQuery.mockReturnValue({ data: undefined });

    const { result } = renderDailyClaim();

    expect(result.current.uiState).toBe('login');
    act(() => result.current.onAction());
    expect(mockOpenAuthForm).toHaveBeenCalledTimes(1);
  });

  it('returns uiState "hidden" when the backend reports the feature disabled', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: false,
      enabled: false,
      pointsAmount: 0,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderDailyClaim();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.uiState).toBe('hidden');
  });

  it('returns uiState "claim" with the points amount when available', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });

    const { result } = renderDailyClaim();

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.uiState).toBe('claim');
    expect(result.current.pointsAmount).toBe(10);
  });

  it('claims and switches to "countdown" on success', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus
      .mockResolvedValueOnce({
        available: true,
        enabled: true,
        pointsAmount: 10,
        nextClaimAt: '2026-06-22T00:00:00.000Z',
        secondsUntilNextClaim: 0,
        invalidConfig: false,
      })
      .mockResolvedValueOnce({
        available: false,
        enabled: true,
        pointsAmount: 10,
        nextClaimAt: '2026-06-22T00:00:00.000Z',
        secondsUntilNextClaim: 3600,
        invalidConfig: false,
      });
    mockClaimDaily.mockResolvedValue({ pointsAmount: 10 });

    const { result } = renderDailyClaim();

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      result.current.onAction();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(mockClaimDaily).toHaveBeenCalledTimes(1);
    expect(result.current.uiState).toBe('countdown');
  });

  it('toasts an error and resyncs status on 409 already-claimed', async () => {
    mockUseUserQuery.mockReturnValue({ data: { id: '1' } });
    mockFetchClaimStatus.mockResolvedValue({
      available: true,
      enabled: true,
      pointsAmount: 10,
      nextClaimAt: '2026-06-22T00:00:00.000Z',
      secondsUntilNextClaim: 0,
      invalidConfig: false,
    });
    mockClaimDaily.mockRejectedValue({ isAxiosError: true, response: { status: 409 } });

    const { result } = renderDailyClaim();

    await act(async () => {
      await Promise.resolve();
    });

    await act(async () => {
      result.current.onAction();
      await Promise.resolve();
    });

    expect(toast.error).toHaveBeenCalledWith('You\'ve already claimed today');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- useDailyClaim`
Expected: FAIL with "Cannot find module './useDailyClaim'"

- [ ] **Step 3: Write minimal implementation**

```ts
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS, DAILY_CLAIM_QUERY_KEYS } from '@/shared/api/query-keys';
import { useUserQuery } from '@/entities/user';
import { useAuthStore } from '@/features/auth';
import { useClaimStatus } from './useClaimStatus';
import { claimDaily } from '../api/claimDaily';
import { DAILY_CLAIM_HTTP_STATUS, DAILY_CLAIM_ERROR_MESSAGE } from './constants';
import type { DailyClaimUiState } from './types';

interface UseDailyClaimResult {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  nextClaimAt: string | undefined;
  isClaiming: boolean;
  onAction: () => void;
}

function resolveErrorMessage(error: unknown): string {
  if (!isAxiosError(error)) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;

  const status = error.response?.status;
  if (status === DAILY_CLAIM_HTTP_STATUS.ALREADY_CLAIMED) return DAILY_CLAIM_ERROR_MESSAGE.ALREADY_CLAIMED;
  if (status === DAILY_CLAIM_HTTP_STATUS.THROTTLED) return DAILY_CLAIM_ERROR_MESSAGE.THROTTLED;
  if (status === DAILY_CLAIM_HTTP_STATUS.DISABLED) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;
  if (status === DAILY_CLAIM_HTTP_STATUS.INVALID_CONFIG) return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;

  return DAILY_CLAIM_ERROR_MESSAGE.UNAVAILABLE;
}

function resolveUiState(
  isAuthenticated: boolean,
  status: { enabled: boolean; invalidConfig: boolean; available: boolean } | undefined
): DailyClaimUiState {
  if (!isAuthenticated) return 'login';
  if (!status) return 'hidden';
  if (status.enabled === false || status.invalidConfig) return 'hidden';
  if (status.available) return 'claim';

  return 'countdown';
}

export function useDailyClaim(): UseDailyClaimResult {
  const queryClient = useQueryClient();
  const openAuthForm = useAuthStore((state) => state.openAuthForm);
  const { data: user } = useUserQuery();
  const isAuthenticated = user !== undefined;
  const { data: status } = useClaimStatus(isAuthenticated);

  const { mutate, isPending } = useMutation({
    mutationFn: claimDaily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser });
      queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status });
    },
    onError: (error) => {
      toast.error(resolveErrorMessage(error));
      queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status });
    },
  });

  const uiState = resolveUiState(isAuthenticated, status);

  function onAction(): void {
    if (uiState === 'login') {
      openAuthForm();
      return;
    }
    if (uiState === 'claim') {
      mutate();
    }
  }

  return {
    uiState,
    pointsAmount: status?.pointsAmount ?? 0,
    nextClaimAt: status?.nextClaimAt,
    isClaiming: isPending,
    onAction,
  };
}
```

While `status` is still loading for an authenticated user, `uiState` resolves to
`'hidden'` rather than flashing `'login'` — `SidebarHeaderSection` (Task 6) already
hides the card on `'hidden'`, so this is just a brief, invisible loading state.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- useDailyClaim`
Expected: PASS (5 tests)

- [ ] **Step 5: Write `index.ts`**

```ts
export { useDailyClaim } from './model/useDailyClaim';
export type { DailyClaimUiState } from './model/types';
```

- [ ] **Step 6: Commit**

```bash
git add src/features/daily-claim/model/useDailyClaim.ts src/features/daily-claim/model/useDailyClaim.test.ts src/features/daily-claim/index.ts
git commit -m "feat(daily-claim): add useDailyClaim orchestrating hook and public API"
```

---

### Task 6: Wire the sidebar widget

**Files:**
- Modify: `src/widgets/sidebar/ui/SidebarHeaderSection.tsx`
- Modify: `src/widgets/sidebar/ui/DailyClaimerCard.tsx`
- Test: `src/widgets/sidebar/ui/DailyClaimerCard.test.tsx`

**Interfaces:**
- Consumes: `useDailyClaim` and `DailyClaimUiState` from `@/features/daily-claim` (Task 5); `useCountdown` is NOT imported into the widget — re-export it from the slice instead (see Step 0).
- Produces: `DailyClaimerCard(props: Props)` where:

```ts
interface Props {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  nextClaimAt: string | undefined;
  isClaiming: boolean;
  onAction: () => void;
}
```

- [ ] **Step 0: Export `useCountdown` from the slice's public API**

The widget needs to turn `nextClaimAt` into a live label; per FSD rules the widget
may only import through `@/features/daily-claim`'s `index.ts`. Modify
`src/features/daily-claim/index.ts` to also export it:

```ts
export { useDailyClaim } from './model/useDailyClaim';
export { useCountdown } from './model/useCountdown';
export type { DailyClaimUiState } from './model/types';
```

- [ ] **Step 1: Write the failing test for `DailyClaimerCard`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DailyClaimerCard } from './DailyClaimerCard';

describe('DailyClaimerCard', () => {
  it('renders a Login button and calls onAction when logged out', () => {
    const onAction = jest.fn();
    render(
      <DailyClaimerCard
        uiState="login"
        pointsAmount={0}
        nextClaimAt={undefined}
        isClaiming={false}
        onAction={onAction}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Log In' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders the points amount on the Claim button when claimable', () => {
    render(
      <DailyClaimerCard
        uiState="claim"
        pointsAmount={25}
        nextClaimAt={undefined}
        isClaiming={false}
        onAction={jest.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /claim daily reward/i })).toHaveTextContent('25');
  });

  it('renders a countdown instead of a button when not available', () => {
    render(
      <DailyClaimerCard
        uiState="countdown"
        pointsAmount={10}
        nextClaimAt={new Date(Date.now() + 3661 * 1000).toISOString()}
        isClaiming={false}
        onAction={jest.fn()}
      />
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText(/1h:01m:0[01]s/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- DailyClaimerCard`
Expected: FAIL — `Props` mismatch / `uiState` prop not handled yet.

- [ ] **Step 3: Rewrite `DailyClaimerCard.tsx`**

```tsx
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { BUTTON_LABELS } from '@/shared/config';
import { useCountdown, type DailyClaimUiState } from '@/features/daily-claim';

interface Props {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  nextClaimAt: string | undefined;
  isClaiming: boolean;
  onAction: () => void;
}

export function DailyClaimerCard({ uiState, pointsAmount, nextClaimAt, isClaiming, onAction }: Props) {
  const { label: countdownLabel } = useCountdown(nextClaimAt);

  return (
    <Card className="daily-claimer-card relative h-[124px] w-[195px] flex-none gap-0 self-stretch overflow-hidden rounded-[7.619px] bg-daily-claimer-bg py-0 ring-0">
      <div
        aria-hidden
        className="absolute left-1/2 top-[115px] h-[43px] w-[318px] -translate-x-1/2 bg-daily-claimer-glow blur-[69px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-7 w-[calc(100%+7px)] bg-gradient-to-t from-daily-claimer-overlay to-transparent"
      />
      <Image
        src="/daily-claimer-chest.png"
        width={111}
        height={118}
        alt=""
        aria-hidden
        unoptimized
        className="absolute -bottom-[9px] -right-[29px]"
      />
      <p className="absolute left-3 top-3 w-[100px] font-outfit text-base font-semibold leading-5 text-brand-text-white">
        DAILY CLAIMER!
      </p>
      {uiState === 'countdown' ? (
        <span className="absolute bottom-3 left-3 font-outfit text-sm font-medium text-brand-text-white">
          {countdownLabel}
        </span>
      ) : (
        <Button
          variant="main"
          className="absolute bottom-3 left-3 h-8 w-24 gap-1 px-3 text-sm"
          aria-label="Claim daily reward"
          disabled={isClaiming}
          onClick={onAction}
        >
          {uiState === 'login' ? (
            BUTTON_LABELS.LOG
          ) : (
            <>
              {BUTTON_LABELS.CLAIM}
              <Image src="/icons/coin.svg" width={14} height={14} alt="" aria-hidden />
              <span>{pointsAmount}</span>
            </>
          )}
        </Button>
      )}
    </Card>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- DailyClaimerCard`
Expected: PASS (3 tests)

- [ ] **Step 5: Wire `SidebarHeaderSection.tsx`**

```tsx
'use client';
import { SidebarGroup } from '@/shared/ui/sidebar';
import { useDailyClaim } from '@/features/daily-claim';
import { DailyClaimerCard } from './DailyClaimerCard';
import { DailyClaimerCardCollapsed } from './DailyClaimerCardCollapsed';

export function SidebarHeaderSection() {
  const dailyClaim = useDailyClaim();

  return (
    <>
      {dailyClaim.uiState !== 'hidden' && (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden px-4 pt-6 pb-0">
          <DailyClaimerCard {...dailyClaim} />
        </SidebarGroup>
      )}
      <SidebarGroup className="hidden items-center justify-center group-data-[collapsible=icon]:flex px-4 pt-6 pb-0">
        <DailyClaimerCardCollapsed />
      </SidebarGroup>
    </>
  );
}
```

Note the added `'use client'` directive — `SidebarHeaderSection` now calls a hook
(`useDailyClaim`), so it must become a Client Component per `.claude/rules/app.md`
/ `.claude/rules/components.md`.

- [ ] **Step 6: Run the full test suite**

Run: `npm test`
Expected: PASS, all suites green.

- [ ] **Step 7: Commit**

```bash
git add src/widgets/sidebar/ui/DailyClaimerCard.tsx src/widgets/sidebar/ui/DailyClaimerCard.test.tsx src/widgets/sidebar/ui/SidebarHeaderSection.tsx src/features/daily-claim/index.ts
git commit -m "feat(daily-claim): wire DailyClaimerCard to login/claim/countdown states"
```

---

### Task 7: Manual verification

**Files:** none (manual QA pass, no code changes).

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify logged-out state**

Open the app while logged out. Confirm the sidebar's Daily Claimer card shows a
`Log In` button, and clicking it opens the same auth modal the header's `Log In`
button opens.

- [ ] **Step 3: Verify claim flow**

Log in. If the status response has `available: true`, confirm the card shows
`Claim` with the real `pointsAmount` and a coin icon. Click it; confirm the header
balance updates and the card switches to a live countdown (`Xh:XXm:XXs`) without a
page reload.

- [ ] **Step 4: Verify countdown persistence**

Reload the page while in the countdown state. Confirm the card still shows the
countdown (not the `Claim` button) and the value is consistent with
`secondsUntilNextClaim` from the status endpoint.

- [ ] **Step 5: Verify collapsed sidebar**

Collapse the sidebar. Confirm `DailyClaimerCardCollapsed` still renders (chest icon
only) in every auth/claim state, unchanged from before this feature.
