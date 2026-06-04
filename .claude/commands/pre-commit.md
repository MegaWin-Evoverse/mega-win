# Pre-commit

Run pre-commit checks: lint, forbidden elements, tests, doc freshness, and commit.

> **Note:** Husky's `lint-staged` already runs eslint+prettier on staged files automatically.
> This command covers the **full flow** + AI-level checks (forbidden elements, tests, doc freshness).

## Steps

1. **Check what changed**
   ```bash
   git diff --staged --name-only
   git diff --name-only
   ```

2. **Run lint**
   ```bash
   npm run lint
   ```
   If errors — fix them before continuing.

3. **Forbidden native elements check**

   Native `<button>` and `<img>` are banned in favour of shared UI components.

   ```bash
   grep -rn '<button' src --include='*.tsx'
   grep -rn '<img' src --include='*.tsx'
   ```

   - `<button` must be replaced with `Button` from `@/shared/ui`
   - `<img` must be replaced with Next.js `Image` from `next/image`

   If any matches are found — list each `file:line` and **stop**. Do not proceed to commit.

4. **Run tests** (if any exist)
   ```bash
   npm run test:related
   ```
   If tests fail — stop and explain which ones and why.

5. **Check doc freshness** (warn-only)

   ```bash
   npm run doc:check
   ```

   This script is **warn-only by default** — it never edits or stages files, so AI-flow
   docs never leak into feature commits/PRs. It:
   - Compares changed `src/` files against `.claude/doc-mapping.json`
   - Reports any stale doc/rules file (and whether `CLAUDE.md` exceeds 200 lines)

   Refreshing docs is a **separate, deliberate step** — not part of feature commits:
   - `DOC_AUTO_UPDATE=1 npm run doc:check` — let Claude rewrite stale docs and `git add` them.
     Run this on its own and commit the result as a dedicated `chore(docs)` change.

6. **Commit**

   Only after lint, element checks, and tests pass:
   ```bash
   git commit -m "<type(scope): description>"
   ```
   Message describes WHAT and WHY, not HOW. Follow Conventional Commits.

---

## Doc freshness is not a git hook

Only `lint-staged` runs on the git pre-commit hook (`.husky/pre-commit`). Doc freshness
runs **only when invoked** — via this command's step 5 or `npm run doc:check` — and is
**warn-only**, so it never mutates files behind a commit. Auto-update is opt-in via
`DOC_AUTO_UPDATE=1` and should be committed separately as `chore(docs)`.

---

## Manual audit

For a full integrity report (CI or manual):

```bash
npm run doc:audit
```

Reports:
- Missing doc/rules files listed in `doc-mapping.json`
- `src/` directories not covered by any mapping pattern
- Orphan rule files in `.claude/rules/` not referenced in the mapping
- `CLAUDE.md` line count vs 200-line limit
