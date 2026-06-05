---
description: Prepares and makes a git commit. Analyzes changes, writes a correct Conventional Commits message.
---

1. Run `git diff --staged` and `git status` to see changes
2. If nothing is staged — run `git diff HEAD` to see unstaged changes and suggest what to add
3. Analyze changes and determine type: `feat` / `fix` / `refactor` / `docs` / `test` / `chore`
4. Write commit message:
   - First line: `type(scope): short description` (max 72 chars)
   - Scope = FSD slice or area (e.g. `auth`, `shared`, `user-profile`, `product-list`)
   - If needed — add body explaining WHY (not what)
5. Check current branch (`git branch --show-current`) — if `main` or `master`, STOP and warn that commits to main are forbidden
6. Run `npm run build` — if errors, stop and report. Never commit broken code.
7. Run `npm run lint` — if errors, stop and report.
8. Ask for confirmation before committing
9. Make the commit

## Commit message format

```
<type>(<scope>): <description>
```

**Types:**
- `feat` — new feature or behavior
- `fix` — bug fix
- `refactor` — restructuring without behavior change
- `docs` — documentation only
- `test` — adding or updating tests
- `chore` — tooling, config, dependencies

**Examples:**
```
feat(auth): add Google login support
fix(shared): handle expired access token
refactor(user-profile): extract avatar upload to separate hook
docs(readme): add setup instructions
test(product-list): add unit tests for filter hook
chore: configure eslint rules
```

## Branch naming convention

Branches must follow the pattern `type/kebab-words`:

| Prefix          | When to use                    |
|-----------------|-------------------------------|
| `feature/`      | new feature work               |
| `fix/`          | bug fix                        |
| `refactor/`     | code restructuring             |
| `documentation/`| docs only                      |
| `test/`         | test additions/changes         |
| `chore/`        | tooling, config, dependencies  |

Examples: `feature/google-auth`, `fix/token-refresh`, `chore/eslint-setup`

## Rules

- Never use `git add .` — add specific files only
- Do not commit `.env`, secrets, `node_modules`
- One commit = one logical change
- Do NOT commit if build or lint failed
- Do NOT commit directly to `main` or `master`
