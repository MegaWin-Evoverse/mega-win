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

3. **Remove redundant blank lines** — invoke the `remove-spaces` skill.

   ```bash
   node scripts/check-blank-lines.mjs $(git diff --staged --name-only --diff-filter=ACM -- 'src/**/*.ts' 'src/**/*.tsx')
   ```

   If it reports violations, run the skill to fix import blocks (`--fix`) and review JSX, then `git add` the result. Do not proceed until it prints `OK`.

4. **Forbidden native elements check**

   Native `<button>` and `<img>` are banned in favour of shared UI components.

   ```bash
   grep -rn '<button' src --include='*.tsx'
   grep -rn '<img' src --include='*.tsx'
   ```

   - `<button` must be replaced with `Button` from `@/shared/ui`
   - `<img` must be replaced with Next.js `Image` from `next/image`

   If any matches are found — list each `file:line` and **stop**. Do not proceed to commit.

5. **Run tests** (if any exist)

   ```bash
   npm run test:related
   ```

   If tests fail — stop and explain which ones and why.

6. **Check doc freshness** (automated)

   ```bash
   npm run doc:check
   ```

   This script automatically:
   - Compares changed `src/` files against `.claude/doc-mapping.json`
   - Calls `claude "Update file [doc] based on [src]"` for any stale doc or rules file
   - Stages updated documentation files via `git add`
   - Checks that `CLAUDE.md` does not exceed 200 lines; shortens it via Claude CLI if needed

   **Environment flags:**
   - `SKIP_DOC_CHECK=1 git commit` — bypass the hook entirely for one commit
   - `SKIP_AI_UPDATE=1 npm run doc:check` — dry-run: reports stale docs without calling Claude

7. **Commit**

   Only after lint, blank-line, element checks, and tests pass:

   ```bash
   git commit -m "<type(scope): description>"
   ```

   Message describes WHAT and WHY, not HOW. Follow Conventional Commits.

---

## Automatic git hook

`.git/hooks/pre-commit` calls `scripts/check-doc-freshness.sh` before every commit.

The hook is **non-blocking for missing claude CLI** — it warns but does not abort the commit. It only aborts if the script itself crashes.

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
