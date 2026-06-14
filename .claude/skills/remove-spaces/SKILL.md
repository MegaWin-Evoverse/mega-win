---
description: Checks for and removes redundant blank lines in import blocks and inside JSX markup, while preserving blank lines that aid readability (between functions, object/array groups, logical statement blocks).
---

# remove-spaces

Blank lines are not all equal. Some aid readability and MUST be kept; others are
pure noise. This skill removes only the noisy ones.

## Redundant — remove these

1. **Inside the import block** — imports are one contiguous block:
   - no blank line between two `import` statements
   - no blank line between a leading `'use client'` / `'use server'` directive and the first import
   - exactly one blank line separates the whole import block from the code below
2. **Inside JSX markup** — no blank lines between sibling JSX elements, or between
   a parent's opening tag and its first child, within a single `return ( … )`.

## Keep — never remove these

- Blank line **between top-level declarations** (functions, components, hooks, types).
- Blank line **between logical groups of statements** inside a function body
  (e.g. after the hooks block, before the `return`).
- Blank line **between grouped entries** in large object / array literals or config maps.
- The single blank line **between the import block and the code**.

## Steps

1. Determine the files to check. In pre-commit context, use staged files:
   ```bash
   git diff --staged --name-only --diff-filter=ACM -- 'src/**/*.ts' 'src/**/*.tsx'
   ```
2. **Import block (deterministic)** — run the checker:
   ```bash
   node scripts/check-blank-lines.mjs <files...>
   ```
   If it reports violations, auto-fix them:
   ```bash
   node scripts/check-blank-lines.mjs --fix <files...>
   ```
3. **JSX (judgment)** — open each changed `.tsx` and remove blank lines that sit
   between sibling JSX elements or directly inside a return's markup. Leave every
   blank line covered by the "Keep" list above untouched.
4. Re-run the checker until it prints `check-blank-lines: OK`, then `git add` the fixed files.

## Scope

Only `src/**/*.{ts,tsx}`. Do not reformat `shared/ui/` shadcn primitives beyond
blank-line collapsing — their structure is CLI-managed.
