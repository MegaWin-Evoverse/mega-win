# Fix Review Issues Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 21 issues from REVIEW.md on branch `ui/create-control-panel`.

**Architecture:** Changes progress from isolated/quick fixes (git, dead code) to CSS tokens, then logic improvements, then the large architecture refactor (moving domain components out of shared/ui).

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Zustand 5, Tailwind 4 (OKLCH tokens), lucide-react, FSD.

---

## Task 1: Git — видалити .next-dev.log з репозиторію (Issue 10)

**Files:**
- Modify: `.gitignore`
- Shell: `git rm --cached .next-dev.log`

- [ ] **Step 1: Додати до .gitignore**

Додай рядок перед секцією `# debug` в `.gitignore`:
```
# dev logs
.next-dev.log
```

- [ ] **Step 2: Видалити з трекінгу**

```bash
git rm --cached .next-dev.log
```

---

## Task 2: CSS-токени — додати нові OKLCH-змінні та виправити globals.css (Issue 21)

**Files:**
- Modify: `src/app/globals.css`

Всі наступні задачі потребують цих токенів у CSS.

- [ ] **Step 1: Додати нові змінні до `@theme inline` блоку**

Після рядка `--color-button-brand-bg-dark: var(--button-brand-bg-dark);` (line ~115) додати:
```css
  --color-surface-inset: var(--surface-inset);
  --color-chip-text-muted: var(--chip-text-muted);
  --color-btn-disabled-bg: var(--btn-disabled-bg);
  --color-risk-classic: var(--risk-classic);
  --color-risk-low: var(--risk-low);
  --color-risk-medium: var(--risk-medium);
  --color-risk-high: var(--risk-high);
  --color-chip-active-glow: var(--chip-active-glow);
```

- [ ] **Step 2: Замінити `--button-brand-bg-dark` та додати нові змінні в `:root`**

Знайти в `:root` (line ~183): `--button-brand-bg-dark: #14532d;`
Замінити на:
```css
  --button-brand-bg-dark: oklch(0.38 0.12 155);
  --surface-inset: oklch(0.16 0.02 263);
  --chip-text-muted: oklch(0.50 0.02 265);
  --btn-disabled-bg: oklch(0.34 0.03 255);
  --risk-classic: oklch(0.62 0.20 255);
  --risk-low: oklch(0.62 0.16 145);
  --risk-medium: oklch(0.87 0.17 92);
  --risk-high: oklch(0.54 0.22 27);
  --chip-active-glow: oklch(0.70 0.15 162);
```

- [ ] **Step 3: Так само в `.dark` блоку**

Знайти `--button-brand-bg-dark: #14532d;` в `.dark` та замінити тими ж OKLCH-значеннями.

- [ ] **Step 4: Виправити `.game-chip` та `.text-risk-*` класи в кінці globals.css**

Знайти і замінити весь блок від `.game-chip {` до кінця файлу:
```css
.game-chip {
  background: var(--border-default);
  border: 0.8px solid color-mix(in oklch, var(--btn-disabled-bg) 50%, transparent);
  color: var(--chip-text-muted);
}

.text-risk-classic {
  color: var(--risk-classic);
}

.text-risk-low {
  color: var(--risk-low);
}

.text-risk-medium {
  color: var(--risk-medium);
}

.text-risk-high {
  color: var(--risk-high);
}
```

Переконатися, що файл закінчується переносом рядка.

---

## Task 3: button.tsx — hex → семантичні токени (Issue 11)

**Files:**
- Modify: `src/shared/ui/button.tsx`

- [ ] **Step 1: Замінити hex у variant `main`**

Знайти: `disabled:bg-[#3f4a59]/50 disabled:text-[#566374]`
Замінити на: `disabled:bg-btn-disabled-bg/50 disabled:text-brand-text-muted`

---

## Task 4: Видалити мертві константи з feature configs (Issues 4, 5, 6, 7, 8)

**Files:**
- Modify: `src/shared/config/constants.ts`
- Modify: `src/shared/config/index.ts`
- Modify: `src/features/dice-controls/config/constants.ts`
- Modify: `src/features/keno-controls/config/constants.ts`
- Modify: `src/features/plinko-controls/config/constants.ts`
- Modify: `src/features/roulette-controls/config/constants.ts`

- [ ] **Step 1: Додати `GAME_BALANCE` до `src/shared/config/constants.ts`**

Після `GAME_PANEL_DEFAULTS` блоку додати:
```ts
export const GAME_BALANCE = 4593.24;
```

Видалити `GAME_PANEL_DEFAULTS` (воно не використовується, його BALANCE тепер — `GAME_BALANCE`).

- [ ] **Step 2: Оновити `src/shared/config/index.ts`**

Замінити `GAME_PANEL_DEFAULTS,` на `GAME_BALANCE,` в export-списку.

- [ ] **Step 3: Оновити `src/features/dice-controls/config/constants.ts`**

Додати імпорт на початку:
```ts
import { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP, GAME_BALANCE } from '@/shared/config';
```

У `DICE_LABELS` видалити поля:
- `NUMBER_OF_BETS: 'Number of bets',`
- `INFINITY_SYMBOL: '∞',`

У `DICE_DEFAULTS` замінити `BALANCE: 4593.24,` на `BALANCE: GAME_BALANCE,`.

Видалити локальні дублікати:
```ts
export const BET_AMOUNT_DECIMALS = 2;

export const BET_AMOUNT_STEP = {
  HALF: 0.5,
  DOUBLE: 2,
} as const;
```

Додати re-export для зворотної сумісності (щоб не ламати store):
```ts
export { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';
```

- [ ] **Step 4: Оновити `src/features/keno-controls/config/constants.ts`**

Так само як dice:
```ts
import { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP, GAME_BALANCE } from '@/shared/config';
```

У `KENO_LABELS` видалити:
- `NUMBER_OF_BETS: 'Number of bets',`
- `INFINITY_SYMBOL: '∞',`

У `KENO_DEFAULTS` замінити `BALANCE: 4593.24,` на `BALANCE: GAME_BALANCE,`.

Видалити локальні `BET_AMOUNT_DECIMALS` та `BET_AMOUNT_STEP`, додати re-export:
```ts
export { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';
```

- [ ] **Step 5: Оновити `src/features/plinko-controls/config/constants.ts`**

Так само як dice/keno. У `PLINKO_LABELS` видалити:
- `NUMBER_OF_BETS: 'Number of bets',`
- `INFINITY_SYMBOL: '∞',`

У `PLINKO_DEFAULTS` замінити `BALANCE: 4593.24,` на `BALANCE: GAME_BALANCE,`.

- [ ] **Step 6: Оновити `src/features/roulette-controls/config/constants.ts`**

Додати імпорт:
```ts
import { GAME_BALANCE } from '@/shared/config';
```

У `ROULETTE_LABELS` видалити:
- `NUMBER_OF_BETS: 'Number of bets',`
- `INFINITY_SYMBOL: '∞',`

У `ROULETTE_DEFAULTS` видалити:
- `BET_AMOUNT_TEXT: '0,00',` (мертва + з комою — баг)
- Замінити `BALANCE: 4593.24,` на `BALANCE: GAME_BALANCE,`

---

## Task 5: Видалити `play: () => { }` no-op зі сторів (Issue 9)

**Files:**
- Modify: `src/features/dice-controls/model/diceStore.ts`
- Modify: `src/features/keno-controls/model/kenoStore.ts`
- Modify: `src/features/plinko-controls/model/plinkoStore.ts`
- Modify: `src/features/roulette-controls/model/rouletteStore.ts`

У кожному з чотирьох сторів:
1. Видалити `play: () => void;` з interface
2. Замінити `play: () => { },` на рядок з TODO-коментарем:
   ```ts
   // TODO: integrate game engine
   ```
3. Видалити `play` з useShallow-вибірки у відповідних hooks (useDiceControls, useKenoControls, usePlinkoControls, useRouletteControls)
4. Видалити `play` з return-об'єктів hooks

- [ ] **Step 1: diceStore.ts** — видалити `play: () => void;` з DiceState та `play: () => { },` з create

- [ ] **Step 2: kenoStore.ts** — те саме

- [ ] **Step 3: plinkoStore.ts** — те саме

- [ ] **Step 4: rouletteStore.ts** — те саме

- [ ] **Step 5: useDiceControls.ts** — видалити `play` з useShallow та return

- [ ] **Step 6: useKenoControls.ts** — видалити `play` з useShallow та return

- [ ] **Step 7: usePlinkoControls.ts** — видалити `play` з useShallow та return

- [ ] **Step 8: useRouletteControls.ts** — видалити `play` з useShallow та return

- [ ] **Step 9: Оновити виклики в controls-компонентах**

У кожному з 4 Controls-компонентів, де `play` передається в `onAction={play}`:
- Замінити `onAction={play}` на `onAction={() => {}}` (тимчасова заглушка)

---

## Task 6: Виправити rouletteStore — blank line та undo (Issue 20)

**Files:**
- Modify: `src/features/roulette-controls/model/rouletteStore.ts`

- [ ] **Step 1: Видалити зайвий порожній рядок**

У функції `undo`, знайти:
```ts
  undo: () =>
    set((state) => {

      if (state.selectedChip !== null) {
```

Замінити на:
```ts
  undo: () =>
    set((state) => {
      if (state.selectedChip !== null) {
```

---

## Task 7: isActionDisabled — перенести в hooks (Issue 15)

**Files:**
- Modify: `src/features/keno-controls/model/useKenoControls.ts`
- Modify: `src/features/plinko-controls/model/usePlinkoControls.ts`
- Modify: `src/widgets/keno-game/ui/KenoControls.tsx`
- Modify: `src/widgets/plinko-game/ui/PlinkoControls.tsx`

- [ ] **Step 1: useKenoControls.ts** — додати перед return:
```ts
const isActionButtonDisabled = !isBetActive || parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount));
```

І додати `isActionButtonDisabled` до return.

- [ ] **Step 2: usePlinkoControls.ts** — додати перед return:
```ts
const isActionButtonDisabled = parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount));
```

І додати `isActionButtonDisabled` до return.

- [ ] **Step 3: KenoControls.tsx** — деструктурувати `isActionButtonDisabled`, замінити:
```tsx
isActionDisabled={!isBetActive || parseFloat(betAmount) <= 0 || isNaN(parseFloat(betAmount))}
```
на:
```tsx
isActionDisabled={isActionButtonDisabled}
```

- [ ] **Step 4: PlinkoControls.tsx** — те саме:
```tsx
isActionDisabled={isActionButtonDisabled}
```

---

## Task 8: BetSummary — formatAmount замість ручного форматування (Issue 16)

**Files:**
- Modify: `src/widgets/roulette-game/ui/BetSummary.tsx`

- [ ] **Step 1: Додати імпорт**

```ts
import { formatAmount } from '@/shared/lib/format-amount';
```

- [ ] **Step 2: Замінити ручне форматування**

Знайти: `{placedBet.toFixed(2).replace('.', ',')} {ROULETTE_LABELS.COINS}`
Замінити на: `{formatAmount(placedBet)} {ROULETTE_LABELS.COINS}`

- [ ] **Step 3: Замінити hex кольору індикатора**

Знайти: `selectedChip ? 'bg-brand-green-to' : 'bg-[#6b7280]'`
Замінити на: `selectedChip ? 'bg-brand-green-to' : 'bg-chip-text-muted'`

---

## Task 9: ChooseActions — lucide-react замість inline SVG (Issue 14)

**Files:**
- Modify: `src/widgets/roulette-game/ui/ChooseActions.tsx`

- [ ] **Step 1: Замінити весь зміст файлу**

```tsx
'use client';

import { Trash2, Undo2 } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { ROULETTE_LABELS } from '@/features/roulette-controls';

interface Props {
  onClearTable: () => void;
  onUndo: () => void;
}

export function ChooseActions({ onClearTable, onUndo }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-outfit text-sm font-medium text-brand-text-light/80">
        {ROULETTE_LABELS.CHOOSE_ACTION}
      </span>
      <div className="flex w-full gap-2">
        <Button variant="action-muted" size="action" onClick={onClearTable} className="flex-1 gap-2">
          <Trash2 className="size-5 shrink-0" />
          {ROULETTE_LABELS.CLEAR}
        </Button>
        <Button variant="action-muted" size="action" onClick={onUndo} className="flex-1 gap-2">
          <Undo2 className="size-5 shrink-0" />
          {ROULETTE_LABELS.UNDO}
        </Button>
      </div>
    </div>
  );
}
```

---

## Task 10: ChipIcon — виправити типи та кольори (Issue 13)

**Files:**
- Modify: `src/widgets/roulette-game/ui/ChipIcon.tsx`
- Modify: `src/features/roulette-controls/index.ts`

- [ ] **Step 1: Експортувати CHIP_NOMINALS з roulette-controls**

Перевірити `src/features/roulette-controls/index.ts` і додати `CHIP_NOMINALS` до exports.

- [ ] **Step 2: Виправити ChipIcon.tsx**

```tsx
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CHIP_NOMINALS } from '@/features/roulette-controls';

type ChipNominal = (typeof CHIP_NOMINALS)[number];

interface ChipTheme {
  stripe: string;
}

interface Props {
  valueText: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const CHIP_BASE_COLOR = '#1b1f26';
const CHIP_CORE_COLOR = '#151924';
const CHIP_TEXT_COLOR = '#FDFDFD';

const CHIP_STRIPES: Record<ChipNominal, string> = {
  '1': '#FFFFFF',
  '5': '#75D2FD',
  '10': '#018BCB',
  '25': '#FFBABA',
  '50': '#FF4D4D',
  '100': '#EC0303',
  '250': '#9CFFC5',
  '500': '#35FF89',
  '1K': '#35FF89',
  '2K': '#F3FF9C',
  '5K': '#B2C807',
  '10K': '#B2C807',
  '25K': '#CDB1FE',
  '50K': '#9A5FFF',
  '100K': '#6208FF',
};

export function ChipIcon({ valueText, isActive, onClick, className }: Props) {
  const stripe = CHIP_STRIPES[valueText as ChipNominal] ?? CHIP_STRIPES['1'];

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      className={cn(
        'relative size-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 select-none outline-none border-0 bg-transparent shrink-0',
        isActive ? 'scale-105' : 'hover:scale-105',
        className
      )}
      aria-label={`Chip ${valueText}`}
    >
      <svg viewBox="0 0 100 100" className="size-full select-none pointer-events-none">
        <circle cx="50" cy="50" r="48" fill={CHIP_BASE_COLOR} />
        <circle cx="50" cy="50" r="43" fill="none" stroke={stripe} strokeWidth="10" strokeDasharray="16 26.9" />
        <circle cx="50" cy="50" r="38" fill={CHIP_BASE_COLOR} />
        <circle cx="50" cy="50" r="33.5" fill={CHIP_CORE_COLOR} />
        <circle cx="50" cy="50" r="31" fill="none" stroke={stripe} strokeWidth="1.8" strokeDasharray="6 5.5" />
        <text
          x="50"
          y="51.5"
          fill={CHIP_TEXT_COLOR}
          fontSize={valueText.length > 3 ? '13' : valueText.length > 2 ? '15' : '20'}
          fontWeight="600"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {valueText}
        </text>
        {isActive && (
          <>
            <circle cx="50" cy="50" r="49" fill="none" stroke="var(--chip-active-glow)" strokeWidth="2" className="animate-pulse" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--chip-active-glow)" strokeWidth="1" opacity="0.6" className="animate-pulse" />
          </>
        )}
      </svg>
    </Button>
  );
}
```

---

## Task 11: RiskSelector — hex → токени (Issue 12)

**Files:**
- Modify: `src/widgets/keno-game/ui/RiskSelector.tsx`
- Modify: `src/widgets/plinko-game/ui/RiskSelector.tsx`

У обох файлах замінити:
- `'bg-[#111622] border border-border-default/50 shadow-sm'` → `'bg-surface-inset border border-border-default/50 shadow-sm'`
- `'bg-transparent border border-transparent hover:bg-[#111622]/25'` → `'bg-transparent border border-transparent hover:bg-surface-inset/25'`

- [ ] **Step 1: keno-game/ui/RiskSelector.tsx**
- [ ] **Step 2: plinko-game/ui/RiskSelector.tsx**

---

## Task 12: RowsSlider — hex → токени (Issue 12)

**Files:**
- Modify: `src/widgets/plinko-game/ui/RowsSlider.tsx`

- [ ] **Step 1: Замінити `bg-[#1b1f26]`**

Знайти: `[&_[data-slot=slider-track]]:bg-[#1b1f26]`
Замінити на: `[&_[data-slot=slider-track]]:bg-border-default`

---

## Task 13: profitOnWin — зробити похідним (Issue 17)

**Files:**
- Modify: `src/features/dice-controls/model/diceStore.ts`
- Modify: `src/features/dice-controls/model/useDiceControls.ts`
- Modify: `src/features/dice-controls/index.ts`

- [ ] **Step 1: Оновити diceStore.ts**

Видалити `profitOnWin: string;` з `DiceState` interface.
Видалити `profitOnWin: DICE_DEFAULTS.PROFIT_ON_WIN_TEXT,` з initial state.
Видалити функцію `calculateProfit`.
Видалити `profitOnWin: calculateProfit(...)` з усіх `set(...)` викликів.
Додати селектор після store:
```ts
export function selectProfitOnWin(state: DiceState): string {
  const amount = Number.parseFloat(state.betAmount) || 0;
  const profit = amount * DICE_DEFAULTS.MULTIPLIER;
  return profit > 0 ? profit.toFixed(BET_AMOUNT_DECIMALS) : '0.00';
}
```

- [ ] **Step 2: Оновити useDiceControls.ts**

Видалити `profitOnWin` з useShallow-вибірки.
Додати після деструктуризації:
```ts
const profitOnWin = useDiceStore(selectProfitOnWin);
```

Переконатися що `selectProfitOnWin` імпортується з `./diceStore`.

- [ ] **Step 3: Додати selectProfitOnWin до exports**

У `src/features/dice-controls/index.ts` додати `selectProfitOnWin` до exports (якщо він потрібний ззовні).

---

## Task 14: aria-label — перенести в константи (Issue 19)

**Files:**
- Modify: `src/shared/config/constants.ts`
- Modify: `src/shared/ui/number-of-bets-field.tsx`

- [ ] **Step 1: Додати в GAME_PANEL_LABELS**

У `GAME_PANEL_LABELS` додати:
```ts
INFINITY_ARIA_LABEL: 'Set infinite bets',
```

- [ ] **Step 2: Замінити magic string в number-of-bets-field.tsx**

Замінити `aria-label="Set infinite bets"` на `aria-label={GAME_PANEL_LABELS.INFINITY_ARIA_LABEL}`.

- [ ] **Step 3: Замінити hex**

Знайти: `bg-[#111622]` в number-of-bets-field.tsx
Замінити на: `bg-surface-inset`

---

## Task 15: DRY — спільна bet-amount бібліотека (Issues 2, 3)

**Files:**
- Create: `src/shared/lib/bet-amount.ts`
- Create: `src/shared/lib/hooks/use-number-of-bets.ts`
- Modify: `src/features/dice-controls/model/diceStore.ts`
- Modify: `src/features/keno-controls/model/kenoStore.ts`
- Modify: `src/features/plinko-controls/model/plinkoStore.ts`
- Modify: `src/features/dice-controls/model/useDiceControls.ts`
- Modify: `src/features/keno-controls/model/useKenoControls.ts`
- Modify: `src/features/plinko-controls/model/usePlinkoControls.ts`
- Modify: `src/features/roulette-controls/model/useRouletteControls.ts`

- [ ] **Step 1: Створити `src/shared/lib/bet-amount.ts`**

```ts
import { BET_AMOUNT_DECIMALS, BET_AMOUNT_STEP } from '@/shared/config';

export function toBetText(value: number): string {
  return value.toFixed(BET_AMOUNT_DECIMALS);
}

export function sanitizeBetInput(val: string, balance: number): string {
  let cleaned = val.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }
  const parsed = parseFloat(cleaned);
  if (!isNaN(parsed) && parsed > balance) {
    return balance.toFixed(BET_AMOUNT_DECIMALS);
  }
  return cleaned;
}

export function normalizeBetValue(raw: string): string {
  const parsed = parseFloat(raw);
  if (isNaN(parsed) || parsed <= 0) return '1.00';
  return parsed.toFixed(BET_AMOUNT_DECIMALS);
}

export function calcHalfBet(current: string, balance: number): string {
  const parsed = Number.parseFloat(current) || 0;
  return toBetText(Math.max(1.0, parsed * BET_AMOUNT_STEP.HALF));
}

export function calcDoubleBet(current: string, balance: number): string {
  const parsed = Number.parseFloat(current) || 0;
  return toBetText(Math.min(balance, parsed * BET_AMOUNT_STEP.DOUBLE));
}

export function calcMaxBet(balance: number): string {
  return toBetText(balance);
}
```

- [ ] **Step 2: Створити `src/shared/lib/hooks/use-number-of-bets.ts`**

```ts
import { type ChangeEvent, useCallback } from 'react';

interface UseNumberOfBetsReturn {
  handleNumberOfBetsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleInfinityClick: () => void;
}

export function useNumberOfBets(
  setNumberOfBets: (val: string) => void,
  infinityValue: string
): UseNumberOfBetsReturn {
  const handleNumberOfBetsChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNumberOfBets(event.target.value.replace(/\D/g, ''));
    },
    [setNumberOfBets]
  );

  const handleInfinityClick = useCallback(() => {
    setNumberOfBets(infinityValue);
  }, [setNumberOfBets, infinityValue]);

  return { handleNumberOfBetsChange, handleInfinityClick };
}
```

- [ ] **Step 3: Оновити diceStore.ts**

Замінити `toBetText` та inline bet-логіку на виклики з `@/shared/lib/bet-amount`:
```ts
import { sanitizeBetInput, normalizeBetValue, calcHalfBet, calcDoubleBet, calcMaxBet } from '@/shared/lib/bet-amount';
```

Оновити `setBetAmount`:
```ts
setBetAmount: (val) => {
  if (val === '') {
    set({ betAmount: '', isBetActive: false });
    return;
  }
  const finalVal = sanitizeBetInput(val, get().balance);
  set({ betAmount: finalVal, isBetActive: (Number.parseFloat(finalVal) || 0) > 0 });
},
normalizeBetAmount: () => {
  const finalVal = normalizeBetValue(get().betAmount);
  set({ betAmount: finalVal, isBetActive: true });
},
betHalf: () =>
  set((state) => {
    const nextBet = calcHalfBet(state.betAmount, state.balance);
    return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
  }),
betDouble: () =>
  set((state) => {
    const nextBet = calcDoubleBet(state.betAmount, state.balance);
    return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
  }),
betMax: () =>
  set((state) => {
    const nextBet = calcMaxBet(state.balance);
    return { betAmount: nextBet, isBetActive: (Number.parseFloat(nextBet) || 0) > 0 };
  }),
```

- [ ] **Step 4: Оновити kenoStore.ts та plinkoStore.ts аналогічно**

Для keno/plinko bet-методи без isBetActive:
```ts
setBetAmount: (val) => {
  if (val === '') { set({ betAmount: '' }); return; }
  set({ betAmount: sanitizeBetInput(val, get().balance) });
},
normalizeBetAmount: () => {
  set({ betAmount: normalizeBetValue(get().betAmount) });
},
betHalf: () => set((state) => ({ betAmount: calcHalfBet(state.betAmount, state.balance) })),
betDouble: () => set((state) => ({ betAmount: calcDoubleBet(state.betAmount, state.balance) })),
betMax: () => set((state) => ({ betAmount: calcMaxBet(state.balance) })),
```

- [ ] **Step 5: Оновити всі 4 hooks — замінити handleNumberOfBetsChange та handleInfinityClick**

У кожному хуку замінити локальні `handleNumberOfBetsChange` та `handleInfinityClick` на виклик `useNumberOfBets`:
```ts
import { useNumberOfBets } from '@/shared/lib/hooks/use-number-of-bets';

// Всередині хука:
const { handleNumberOfBetsChange, handleInfinityClick } = useNumberOfBets(
  setNumberOfBets,
  DICE_DEFAULTS.NUMBER_OF_BETS // або відповідне значення для кожної гри
);
```

Для roulette (де `infinityValue = ROULETTE_DEFAULTS.NUMBER_OF_BETS`).

---

## Task 16: Архітектура — перенести доменні компоненти з shared/ui (Issues 1, 18)

**Files:**
- Create: `src/features/game-panel/ui/GamePanel.tsx`
- Create: `src/features/game-panel/ui/BetAmountField.tsx`
- Create: `src/features/game-panel/ui/BalanceDisplay.tsx`
- Create: `src/features/game-panel/ui/NumberOfBetsField.tsx`
- Create: `src/features/game-panel/ui/SummaryCard.tsx`
- Create: `src/features/game-panel/index.ts`
- Delete: `src/shared/ui/game-panel.tsx`
- Delete: `src/shared/ui/bet-amount-field.tsx`
- Delete: `src/shared/ui/balance-display.tsx`
- Delete: `src/shared/ui/number-of-bets-field.tsx`
- Delete: `src/shared/ui/summary-card.tsx`
- Delete: `src/shared/ui/game-tabs.tsx`
- Modify: `src/widgets/dice-game/ui/DiceControls.tsx`
- Modify: `src/widgets/dice-game/ui/AutoBetSummaryGrid.tsx`
- Modify: `src/widgets/keno-game/ui/KenoControls.tsx`
- Modify: `src/widgets/plinko-game/ui/PlinkoControls.tsx`
- Modify: `src/widgets/roulette-game/ui/RouletteControls.tsx`

- [ ] **Step 1: Створити `src/features/game-panel/ui/BalanceDisplay.tsx`**

Скопіювати з `shared/ui/balance-display.tsx` без змін (вже не використовує домен-специфічного з shared).

- [ ] **Step 2: Створити `src/features/game-panel/ui/BetAmountField.tsx`**

Скопіювати з `shared/ui/bet-amount-field.tsx`, змінити імпорт BalanceDisplay:
```ts
import { BalanceDisplay } from './BalanceDisplay';
```

- [ ] **Step 3: Створити `src/features/game-panel/ui/SummaryCard.tsx`**

Скопіювати з `shared/ui/summary-card.tsx` без змін.

- [ ] **Step 4: Створити `src/features/game-panel/ui/NumberOfBetsField.tsx`**

Скопіювати з `shared/ui/number-of-bets-field.tsx` (з уже виправленими hex та aria-label з Task 14).

- [ ] **Step 5: Створити `src/features/game-panel/ui/GamePanel.tsx`**

Скопіювати з `shared/ui/game-panel.tsx`, з такими змінами:
- Замінити `import { BetAmountField } from '@/shared/ui/bet-amount-field';` на `import { BetAmountField } from './BetAmountField';`
- Замінити `import { GameTabs } from '@/shared/ui/game-tabs';` на `import { SegmentedTabs } from '@/shared/ui/segmented-tabs';`
- У JSX замінити `<GameTabs ... />` на `<SegmentedTabs ... />`

Тип items для `GAME_PANEL_TABS` — `Array<{ value: GamePanelTab; label: string }>` — сумісний із `SegmentedTabs`.

- [ ] **Step 6: Створити `src/features/game-panel/index.ts`**

```ts
export { GamePanel } from './ui/GamePanel';
export { BetAmountField } from './ui/BetAmountField';
export { BalanceDisplay } from './ui/BalanceDisplay';
export { NumberOfBetsField } from './ui/NumberOfBetsField';
export { SummaryCard } from './ui/SummaryCard';
```

- [ ] **Step 7: Оновити imports у widgets**

`widgets/dice-game/ui/DiceControls.tsx`:
```ts
import { GamePanel, NumberOfBetsField } from '@/features/game-panel';
```
Видалити старі імпорти з `@/shared/ui/game-panel` та `@/shared/ui/number-of-bets-field`.

`widgets/dice-game/ui/AutoBetSummaryGrid.tsx`:
```ts
import { SummaryCard } from '@/features/game-panel';
```

`widgets/keno-game/ui/KenoControls.tsx`, `widgets/plinko-game/ui/PlinkoControls.tsx`, `widgets/roulette-game/ui/RouletteControls.tsx` — аналогічно.

- [ ] **Step 8: Видалити старі файли з shared/ui**

```bash
git rm src/shared/ui/game-panel.tsx
git rm src/shared/ui/bet-amount-field.tsx
git rm src/shared/ui/balance-display.tsx
git rm src/shared/ui/number-of-bets-field.tsx
git rm src/shared/ui/summary-card.tsx
git rm src/shared/ui/game-tabs.tsx
```

---

## Checklist of Issues

| Issue | Задача    |
|-------|-----------|
| 1 - Shared purity | Task 16 |
| 2 - DRY stores | Task 15 |
| 3 - DRY hooks | Task 15 |
| 4 - Dead exports shared | Task 4 |
| 5 - BALANCE ×5 | Task 4 |
| 6 - INFINITY_SYMBOL ×4 | Task 4 |
| 7 - NUMBER_OF_BETS ×4 | Task 4 |
| 8 - BET_AMOUNT_TEXT roulette | Task 4 |
| 9 - play no-ops | Task 5 |
| 10 - .next-dev.log | Task 1 |
| 11 - hex button.tsx | Task 3 |
| 12 - hex RiskSelector/RowsSlider/NumberOfBetsField | Tasks 11,12,14 |
| 13 - hex ChipIcon + types | Task 10 |
| 14 - lucide-react icons | Task 9 |
| 15 - isActionDisabled in UI | Task 7 |
| 16 - BetSummary formatAmount | Task 8 |
| 17 - profitOnWin derived | Task 13 |
| 18 - GameTabs wrapper | Task 16 |
| 19 - aria-label magic string | Task 14 |
| 20 - rouletteStore blank line | Task 6 |
| 21 - globals.css hex | Task 2 |
