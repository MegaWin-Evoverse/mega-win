# Гра «Рулетка» — детальний розбір фічі

> Цей файл — для тебе, щоб розібратися, що саме було створено. У git він НЕ потрапляє (доданий у `.gitignore`).
> Усе описано по шарах FSD: `app → widgets → features → entities → shared`. Імпорти йдуть тільки зверху вниз.

---

## 1. Загальна картина (як працює гра)

```
Користувач відкриває /games/roulette
        │
        ▼
[app] page.tsx  ── збирає сторінку через <GameLayout>:
        ├─ ліва панель  →  <RouletteControls>      (widgets/roulette-game)
        └─ ігрове поле   →  <RouletteWheel>          (widgets/roulette-wheel)
                            <RouletteTable>          (features/roulette-table)
                            <LastResults> <SoundToggle> <RouletteResultOverlay>
```

Потік даних під час ставки:

1. Користувач **обирає фішку** (chip) у `ChipsGrid` → у стор записується `selectedChip`.
2. Користувач **клікає по клітинці** столу (`RouletteTable`) → фішка «кладеться» у зону, у стор додається `PlacedBet`, росте `placedBet` (сума).
3. Натискає **Bet** → `useRouletteBet.placeBet()` валідує суму (min/max) і відправляє `POST /games/house/roulette/bet`.
4. Бекенд повертає `randomPosition` (число, що випало), `multiplier`, `payout`.
5. `RouletteWheel` анімує колесо до цього числа, потім показує результат через `RouletteResultOverlay`.

Уся бізнес-логіка — у `model/` хуках і Zustand-сторі. Компоненти (`ui/`) лише малюють.

---

## 2. Shared (загальні цеглинки)

### `src/shared/api/client.ts`
Єдиний axios-інстанс `api` з `baseURL = '/api'`. Усі запити йдуть на цей префікс, а далі їх перехоплює проксі (див. нижче). `withCredentials: true` — щоб у запити підставлялися cookie (сесія користувача).

### `src/shared/api/query-keys.ts`
Централізовані ключі для TanStack Query (щоб не писати рядки-масиви в коді):
- `USER_QUERY_KEYS.me` → кеш профілю користувача.
- `ROULETTE_CONFIG_QUERY_KEYS.config` → кеш конфігу гри (min/max ставки).

### `src/shared/ui/game-result-card.tsx`
Generic-картка результату гри (виграш / частковий / програш). Не знає про рулетку конкретно — приймає `multiplier`, `payout` і сама обирає вигляд (`win` / `partial` / `loss`). Може перевикористовуватись іншими іграми.

### `src/app/api/[...path]/route.ts` — backend-проксі
Це **catch-all route** Next.js (ловить будь-який шлях під `/api/...`). Навіщо: фронт не б'є напряму в бекенд, а йде на свій же `/api`, а цей файл переадресовує запит на справжній бекенд (`NEXT_PUBLIC_API_URL`), **проксуючи cookie**. Так вирішується CORS і cookie передаються безпечно (server-to-server).
- `GET/HEAD` — без тіла, решта методів — з тілом.
- Повертає відповідь бекенда як є (статус + тіло).

---

## 3. Entities — `user` (бізнес-сутність «користувач»)

### `src/entities/user/model/types.ts`
Типи профілю: `UserProfile` містить масив `userBalances`, кожен баланс має `balanceType` (`WATCH_POINTS` | `GAME_POINTS`) і `value`.

### `src/entities/user/model/useUser.ts`
Хук, що тягне `GET /user/query/me` через TanStack Query і **дістає саме ігровий баланс**:
- знаходить запис з `balanceType === 'GAME_POINTS'`;
- повертає `gamePointsBalance` (число), `user`, `isFetchingUser`, `isUserFetchError`.
- `retry: false` — якщо користувач не залогінений (401), не довбимо бекенд повторами.

### `src/entities/user/index.ts`
Публічний API сутності — назовні видно тільки `useUser` і типи.

> **Чому entities, а не features?** Користувач — це бізнес-дані, які можуть знадобитись будь-якій грі, тому це окрема сутність нижнього рівня.

---

## 4. Features — `roulette-controls` (мозок гри: стан + логіка)

Це найважливіший зріз — тут увесь стан і робота з бекендом.

### `src/features/roulette-controls/config/constants.ts`
Усі константи в одному місці (щоб не було «магічних рядків»):
- `ROULETTE_LABELS` — підписи кнопок (Bet, Clear, Undo, Start/Stop Autobet…).
- `CHIP_NOMINALS` — список номіналів фішок (`'1'…'100K'`).
- `CHIP_STRIPES` — **єдина палітра кольорів фішок** (один номінал → один колір). `getChipStripe(nominal)` повертає колір. Це єдине джерело правди — і сітка фішок, і стопки на столі беруть колір звідси.
- `BET_TYPE`, `COLUMN`, `DOZEN`, `HALF`, `PARITY`, `COLOR` — enum-и типів ставок (замість рядків).
- `betZoneKey(type, value)` — будує ключ зони у форматі `<тип>-<значення>` (напр. `straight-17`). Стор, клітинки і збирач запиту мусять використовувати однаковий формат — тому це одна функція.
- `parseChipValue('1K') → 1000` — перетворює номінал-рядок у число.

### `src/features/roulette-controls/model/types.ts`
Типи: `PlacedBet` (одна поставлена ставка: `key`, `type`, `amount`), `BetResponse` (відповідь бекенда), `BetResult` (результат для оверлею).

### `src/features/roulette-controls/model/rouletteStore.ts` — Zustand-стор
Серце стану. Зберігає:
- `placedBets[]` — поставлені ставки, `placedBet` — їх сума;
- `selectedChip` — обрана фішка;
- `isSpinning`, `lastResult`, `betHistory`, `betResult`, `pendingBetResult`;
- стан автогри: `isAutoRunning`, `autoBetsRemaining`.

Та дії (actions): `placeBetOnZone`, `selectChip`, `clearTable`, `undo`, `setSpinning`, `setLastResult`, `startAutoBet`, `decrementAutoBet`, `stopAutoBet` тощо. **Тільки через ці дії змінюється стан.**

`useRouletteStore(selector)` — обгортка, яка дозволяє підписуватись на окремі поля (щоб не було зайвих ре-рендерів).

### `src/features/roulette-controls/model/useRouletteControls.ts`
Хук для **панелі керування**. Через `useShallow` дістає зі стору набір полів і дій (вкладка Manual/Auto, обрана фішка, сума, чи йде спін). Додає:
- `isAutoMode` — чи активна вкладка Auto;
- `handleNumberOfBetsChange` / `handleInfinityClick` — з shared-хука `useNumberOfBets` (керування кількістю автоставок, кнопка «∞»).

### `src/features/roulette-controls/model/useRouletteConfig.ts`
Тягне `GET /games/house/roulette/config` (мін/макс ставки). `staleTime: Infinity` — конфіг не змінюється, тому кешується назавжди. Якщо бекенд недоступний — підставляє дефолти (1 / 100000).

### `src/features/roulette-controls/model/useRouletteBet.ts` — відправка ставки
Найскладніший хук. Що робить:
- `buildBetParams(placedBets)` — перетворює список ставок у формат, який чекає бекенд (окремі масиви `straightValues`, `halfValues`, `colorValues`…). Типи `splitValues`/`cornerValues`/`streetValues` бекенд приймає, але UI поки їх не ставить — шлються порожні.
- `useMutation` — `POST /bet`. На старті (`onMutate`) вмикає спін; на успіху (`onSuccess`) записує `lastResult` і `pendingBetResult`; на помилці (`onError`) — зупиняє спін і показує `toast`: при **401** — «Please log in», інакше — загальна помилка.
- `validateBet()` — перевіряє: чи є ставки, чи сума в межах min/max (інакше toast і стоп).
- `placeBet()` — ручна ставка. `startAuto(count)` / `stopAuto()` — автогра.
- `useEffect` (авто-цикл): коли спін відстрілявся (`betResult` зʼявився) і автогра активна — через паузу `AUTO_BET_DELAY_MS` запускає наступний спін, або завершує серію, коли ставки скінчились.

> ⚠️ Тут eslint лишив warning `exhaustive-deps` (рядок ~201): ефект свідомо не включає всі залежності, бо це драйвер автоциклу. Не баг, але задокументовано як можливе майбутнє покращення.

### `src/features/roulette-controls/model/useBetResultAutoDismiss.ts`
Маленький хук: коли зʼявився `betResult`, через `RESULT_OVERLAY_DURATION_MS` автоматично ховає оверлей результату (`setBetResult(null)`). Чистить таймер на розмонтуванні.

### `src/features/roulette-controls/index.ts`
Публічний API: всі хуки + константи назовні.

---

## 5. Features — `roulette-table` (ігровий стіл зі ставками)

### `src/features/roulette-table/model/rouletteLayout.ts`
Розкладка чисел столу: `ROULETTE_ROWS` — 3 рядки (TOP/MIDDLE/BOTTOM) по 12 чисел. `getNumberColor(n)` — колір числа (`green` для 0, інакше `red`/`black` за класичним набором червоних чисел рулетки).

### `src/features/roulette-table/model/chipStack.ts`
`decomposeIntoChips(amount)` — **жадібно** розкладає суму ставки на мінімум фішок (найбільші спершу). Напр. `15 → [10, 5]`. Номінали беруться з єдиного `CHIP_NOMINALS`.

### `src/features/roulette-table/model/useBettingTable.ts`
Хук-«пульт» столу. Дає клітинкам обробники:
- `handleStraightBet(n)` — ставка на конкретне число;
- `handleColumnBet`, `handleDozenBet`, `handleHalfBet`, `handleParityBet`, `handleColorBet` — зовнішні ставки.
- `getZoneBet(key)` — знаходить ставку в зоні (щоб намалювати на ній стопку фішок).
Усі дії делегуються у стор через `placeBetOnZone`.

### `src/features/roulette-table/ui/`
- `RouletteTable.tsx` — обгортка: обирає вертикальну чи горизонтальну розкладку.
- `RouletteTableHorizontal.tsx` / `RouletteTablePortrait.tsx` — дві адаптивні розкладки столу (десктоп / мобільний портрет). Тут уся сітка чисел + зовнішні ставки.
- `BettingCell.tsx` — одна клітинка ставки (число або зона) з підсвіткою і стопкою фішок.
- `ChipStack.tsx` — стопка фішок на клітинці (бере кольори з єдиного `getChipStripe`).
- `TableActions.tsx` — кнопки Clear / Undo для столу.

> ⚠️ Reviewer відзначив: `RouletteTableHorizontal/Portrait` великі (>120 рядків) і частково дублюють «зовнішні ставки». Це **рекомендація на майбутнє** — не чіпав, щоб не зламати робочу адаптивну верстку.

---

## 6. Widgets — `roulette-wheel` (колесо + результати)

### `src/widgets/roulette-wheel/ui/RouletteWheel.tsx`
Анімоване SVG-колесо. Через `requestAnimationFrame` крутить колесо й кульку до числа `lastResult`, плавно сповільнюючись. Коли зупиняється — запускає показ результату й оновлює баланс (`invalidateQueries`).

> ⚠️ Тут навмисно лишилися: нативний `<img>` для центральної шапки (крутиться через ref — швидкий DOM-шлях) і кілька SVG-кольорів inline. Це **warning, не помилка**; рефакторинг (винести анімацію в окремий хук, `<img>`→`next/image`) задокументовано як наступний крок, бо колесо вже працює на 60fps і ризиковано переписувати.

### `src/widgets/roulette-wheel/ui/LastResults.tsx`
Смужка останніх результатів (історія чисел, що випали), з кольорами.

### `src/widgets/roulette-wheel/ui/RouletteResultOverlay.tsx`
Оверлей із карткою результату (`game-result-card`). Сам автоховається через `useBetResultAutoDismiss`.

### `src/widgets/roulette-wheel/ui/SoundToggle.tsx`
Кнопка увімкнення/вимкнення звуку (з `aria-label`, локальний стан).

---

## 7. Widgets — `roulette-game` (панель керування)

### `src/widgets/roulette-game/ui/RouletteControls.tsx`
Збирає ліву панель через спільний `GamePanel` (з гілки control-panel): вкладки Manual/Auto, баланс, кнопка дії, всередині — `BetSummary`, `ChipsGrid`, поле кількості автоставок, дії Clear/Undo. Логіку бере з `useRouletteControls` + `useRouletteBet`, баланс — з `useUser`.

### Решта `ui/`
- `ChipsGrid.tsx` — сітка фішок для вибору.
- `ChipIcon.tsx` — одна фішка (SVG). Колір смужки — з `getChipStripe`, структурні кольори — з токенів (`--color-border-default` тощо).
- `BetSummary.tsx` — підсумок поточної ставки.
- `ChooseActions.tsx` — кнопки Clear/Undo для панелі.

---

## 8. App — сторінка

### `src/app/games/roulette/page.tsx`
Серверний компонент-композиція. Через `<GameLayout>` ставить `RouletteControls` у бічну панель, а в ігрове поле — колесо, стіл, останні результати, звук і оверлей. Експортує `metadata` (title) замість хардкоду `<title>`.

### `src/app/globals.css`
Додано **+59 рядків** дизайн-токенів рулетки (OKLCH): кольори столу (`--roulette-red`, `--roulette-cell-border`), світіння фішок, активна підсвітка, анімації колеса, клас `.roulette-vector-glow` тощо.

---

## 9. Зміна конфігу (інфраструктура)

### `eslint.config.mjs`
Дозволено **feature → feature** імпорти через публічний `index.ts`. Чому: `roulette-table` легально використовує публічний API `roulette-controls` (стор, константи, типи). Документація проєкту (`features.md`) це **дозволяє**, а eslint-конфіг раніше — ні (була розсинхронізація). Виправлено, щоб код проходив pre-commit без обходу хуків.

---

## 10. Що НЕ увійшло в PR (свідомо)

- `feature/auth` (логін/реєстрація/recaptcha), сторінка `dev-login`, роути `/api/auth/*` — це інша гілка.
- `dice` / `keno` / `plinko`, `game-panel`, `segmented-tabs` тощо — це гілка `ui/create-control-panel` (база цього PR), не робота рулетки.
- Зміни в `.claude/**`, `AGENTS.md`, `docs/superpowers/**` — внутрішні правила/доки для AI.

---

## 11. Залишені на майбутнє покращення (з ревʼю)

1. Винести анімаційний рушій `RouletteWheel` в окремий `model/` хук.
2. Розбити великі `RouletteTableHorizontal/Portrait` на під-компоненти, прибрати дублювання «зовнішніх ставок».
3. `<img>` центральної шапки → `next/image`.
4. Доглянути `exhaustive-deps` у авто-циклі `useRouletteBet`.

Усе це — **warning-и, не помилки**; гра повністю робоча.
