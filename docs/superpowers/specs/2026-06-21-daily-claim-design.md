# Daily Claim — Design

## Goal

The sidebar's "Daily Claimer" card currently shows a static `Claim` button with a
hardcoded reward amount. It must become functional:

- Logged-out user → button becomes `Login`, opens the same auth modal as the header.
- Logged-in user, claim available → `Claim` button shows the real points amount and
  triggers the claim request.
- Logged-in user, already claimed today → button is replaced by a live countdown to
  the next available claim (`1h:46m:34s` style), matching the reference screenshot.
- Daily claimer disabled or misconfigured server-side → the whole card is hidden.

## Backend contract (already implemented server-side)

`GET /daily-claimer/status` (JWT-protected, read-only):

```json
{
  "available": true,
  "enabled": true,
  "pointsAmount": 0,
  "nextClaimAt": "2026-05-29T14:00:00.000Z",
  "secondsUntilNextClaim": 0,
  "invalidConfig": true
}
```

`POST /daily-claimer/claim` (JWT-protected):

- `200` → `{ "pointsAmount": 0 }`
- `401` missing/invalid JWT
- `403` `DAILY_CLAIMER_DISABLED`
- `409` `DAILY_CLAIMER_ALREADY_CLAIMED`
- `429` throttled
- `500` `DAILY_CLAIMER_INVALID_CONFIG`

## BFF layer (`src/app/api/daily-claimer/**`)

Following the existing proxy pattern (`src/app/api/user/query/me/route.ts`):

- `src/app/api/daily-claimer/status/route.ts` — `GET`, proxies to
  `${NEXT_PUBLIC_API_URL}/daily-claimer/status`, forwards the `Cookie` header,
  passes the upstream status code through on failure.
- `src/app/api/daily-claimer/claim/route.ts` — `POST`, proxies to
  `${NEXT_PUBLIC_API_URL}/daily-claimer/claim`, forwards the `Cookie` header,
  passes upstream status codes (403/409/429/500) through unchanged so the
  client mutation can branch on them.

## Feature slice — `src/features/daily-claim/`

```
features/daily-claim/
  api/
    fetchClaimStatus.ts   # api.get<ClaimStatus>('/api/daily-claimer/status')
    claimDaily.ts         # api.post<ClaimResponse>('/api/daily-claimer/claim')
  model/
    types.ts              # ClaimStatus, ClaimResponse
    constants.ts          # DAILY_CLAIM_QUERY_KEYS, ERROR_MESSAGE, SUCCESS_MESSAGE
    useClaimStatus.ts      # useQuery — status
    useCountdown.ts        # tick-per-second countdown formatter
    useDailyClaim.ts       # orchestrating hook consumed by the widget
  index.ts                 # exports useDailyClaim only
```

### `useClaimStatus`

- `useQuery({ queryKey: DAILY_CLAIM_QUERY_KEYS.status, queryFn: fetchClaimStatus, enabled: isAuthenticated })`.
- Not called at all while logged out (avoids a guaranteed 401).

### `useCountdown(nextClaimAt)`

- Generic per-second countdown hook (new — no existing equivalent in the codebase).
- Formats remaining time as `${h}h:${m}m:${s}s`, matching the reference screenshot.
- When it reaches zero, signals the caller (return value) so `useDailyClaim` can
  refetch the status query to flip back to the claimable state.

### `useDailyClaim` (the only thing the widget imports)

Reads:
- `useUserQuery()` from `@/entities/user` → determines `isAuthenticated`.
- `useAuthStore((s) => s.openAuthForm)` from `@/features/auth` → reused for the
  logged-out case, identical to the header's Login button.
- `useClaimStatus()` (this slice).
- `useMutation` wrapping `claimDaily`.

Returns a single discriminated shape for the widget to render:

```ts
type DailyClaimUiState = 'hidden' | 'login' | 'claim' | 'countdown';

interface UseDailyClaimResult {
  uiState: DailyClaimUiState;
  pointsAmount: number;
  countdownLabel: string; // only meaningful when uiState === 'countdown'
  isClaiming: boolean;
  onAction: () => void; // login → openAuthForm, claim → mutate, countdown → no-op
}
```

`uiState` derivation:
- `status.enabled === false || status.invalidConfig === true` → `'hidden'`
- `!isAuthenticated` → `'login'`
- `status.available === true` → `'claim'`
- otherwise → `'countdown'`

### Mutation side effects (`onSuccess`)

1. `queryClient.invalidateQueries({ queryKey: QUERY_KEYS.currentUser })` — refreshes
   the balance shown in the header, same call used by `useSignIn`.
2. `queryClient.invalidateQueries({ queryKey: DAILY_CLAIM_QUERY_KEYS.status })` —
   refetches status, which flips `uiState` to `'countdown'` automatically.

### Error handling (`onError`, via Sonner — project standard)

- `409` already claimed → `toast.error(ERROR_MESSAGE.alreadyClaimed)`, then still
  invalidate the status query so the UI resyncs to the countdown.
- `429` throttled → `toast.error(ERROR_MESSAGE.throttled)`.
- `403` / `500` (disabled / invalid config) → `toast.error(ERROR_MESSAGE.unavailable)`,
  then invalidate the status query so the card hides itself.

## Widget changes — `src/widgets/sidebar/`

- `SidebarHeaderSection.tsx` calls `useDailyClaim()` once and passes the result down
  as props, so it can skip rendering the expanded `SidebarGroup` entirely when
  `uiState === 'hidden'` (no empty padded wrapper left behind). The collapsed
  `SidebarGroup`/`DailyClaimerCardCollapsed` keeps rendering unconditionally — it
  stays decorative regardless of claim state (confirmed).
- `DailyClaimerCard.tsx` takes the `useDailyClaim()` result as `Props` and is a pure
  render of `uiState`:
  - `'login'` → `Button` labeled `BUTTON_LABELS.LOG`, `onClick={onAction}`.
  - `'claim'` → existing `Button` markup, `pointsAmount` from props replaces the
    hardcoded `10`, `onClick={onAction}`, disabled while `isClaiming`.
  - `'countdown'` → the button is replaced by a `countdownLabel` text element in the
    same position/sizing as the button, no click handler.
  (`'hidden'` is handled one level up, in `SidebarHeaderSection`, so this component
  never has to render `null`.)
- `DailyClaimerCardCollapsed.tsx` — unchanged, stays purely decorative (confirmed).

## Out of scope

- No new design for the auth modal — it is reused as-is via `openAuthForm`.
- No polling/websocket for status while the tab is in the `'claim'` state; status is
  only refetched on mutation success or countdown completion.
