---
paths: ['src/**']
---

# Naming Conventions

## Core principle

Names must reflect **what happens in this domain**, not what pattern was used to write the code.
A reader should understand the business domain from the name alone — without reading the implementation.

---

## Conventions

| Category                         | Convention         | Example                                |
| -------------------------------- | ------------------ | -------------------------------------- |
| Folders                          | kebab-case         | `user-profile/`, `product-list/`       |
| Components                       | PascalCase         | `UserCard`, `ProductList`              |
| Hooks                            | `useSomething`     | `useUserProfile`, `useProductList`     |
| Zustand stores                   | `use<Domain>Store` | `useAuthStore`, `useCounterStore`      |
| Constants                        | UPPER_SNAKE_CASE   | `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE` |
| Boolean props/state              | positive form      | `canSubmit`, `isVisible`, `hasError`   |
| Event handlers (DOM/library)     | `handle*`          | `handleSubmit`, `handleKeyDown`        |
| Event callbacks (props/business) | `on*`              | `onEmailChange`, `onFormSubmit`        |
| Prop callback names              | subject + verb     | `handleEmailChange` not `handleChange` |

---

## File names

- **Folders** → kebab-case: `dice-controls/`, `game-panel/`
- **Component files** → PascalCase, matching the component: `GamePanel.tsx`, `BalanceDisplay.tsx`
- **All other files** → lowerCamelCase, matching their primary export: `useNumberOfBets.ts`, `useDiceControls.ts`, `diceStore.ts`, `betAmount.ts`, `getSocialIcon.tsx`, `selectors.ts`
- **Exception** — `shared/ui/` shadcn primitives keep shadcn's own kebab-case file names (`dropdown-menu.tsx`, `scroll-area.tsx`); they are CLI-managed (`npx shadcn add`), so renaming them breaks regeneration.

---

## Anti-patterns — never use these

```ts
// ❌ Generic handlers
handleChange        → handleEmailChange / handleNameChange
handleClick         → handleFormSubmit / handleItemSelect

// ❌ Vague state
isLoading           → isFetchingUser / isSubmittingForm
data                → userData / productList / profileDetails
result              → submitResult / fetchOutcome
response            → apiResponse / serverData
value               → inputValue / selectedOption / pageCount
items               → products / users / categories

// ❌ Negative boolean flags
isDisabled          → canSubmit / isEditable
isNotVisible        → isVisible (flip the logic)
isManualDisabled    → canManualSubmit

// ❌ Weak prop names
onChange            → onEmailChange / onNameChange / onPageChange
onClick             → onSubmit / onSelect / onDismiss
onClose             → onDrawerClose / onDialogDismiss
min / max           → minLength / maxCount / minPrice / maxPrice
items               → products / results / entries
```

---

## Patterns to follow

### Hooks

```ts
// ✅ Name = what the hook manages, not what it does
useUserProfile(); // manages the user profile state
useProductList(); // orchestrates product listing with filters
useContactForm(); // form for contact/email submission
useInfiniteScroll(); // infinite scroll pagination
```

### Event handlers

```ts
// ✅ on + specific noun + specific verb (if needed)
onEmailChange(email); // user edits email input
onCategorySelect(cat); // user picks a category
onPageChange(page); // user navigates pages
onFormSubmit(); // user submits the form
onDrawerClose(); // user closes a drawer
```

### `handle*` vs `on*`

- **`handle*`** — DOM event handlers and library callbacks (`handleSubmit` from react-hook-form, `handleKeyDown`, `handleScroll`)
- **`on*`** — callbacks passed through props or used as business-logic hooks (`onEmailChange`, `onCategorySelect`)

```ts
// ✅ handleSubmit — react-hook-form returns this method, keep as-is
form.handleSubmit(onFormSubmit);

// ✅ onFormSubmit — business callback in props
interface Props {
  onFormSubmit: () => void;
}
```

### State variables

```ts
// ✅ Precise, affirmative, domain-rooted
isSubmitting; // form submission in progress
isFetchingUser; // not isLoading (for user query)
selectedCategory; // currently active category
emailInput; // not inputValue
pageCount; // not count
```

### Props interfaces

```ts
// ✅ Specific, never generic
interface Props {
  minPrice: number;
  maxPrice: number;
  onCategorySelect: (category: Category) => void;
  onPageChange: (page: number) => void;
  email: string;
}
```

---

## Scope rules

- **Single-letter variables** only in math/geometry: `x`, `y`, `r` (radius), `i` (loop index over known small range)
- **`current*` prefix** — only when contrasting with a previous/next value. Do not use as a generic qualifier (`currentUser` → `user`)
- **`get*` functions** — pure derivations only. Side-effectful functions use a verb: `submit()`, `fetch*()`, `update*()`
