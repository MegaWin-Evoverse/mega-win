---
paths: ['**']
---

# Git Convention

## Branch naming

Lowercase, hyphen-separated, full words (no `fe`/`be`/`ui`/`upd` abbreviations).
`feature/add-user-profile-page` · `fix/incorrect-date-formatting` ·
`refactor/authentication-module` · `documentation/add-installation-instructions` ·
`test/add-auth-integration-tests` · `chore/configure-eslint-rules`

## Commit messages — `<type>(<scope>): <description>`

Types: `feat fix refactor docs test chore`. Scope = area/slice.

- `feat(auth): add Google login support`
- `fix(auth): handle expired access tokens`
- `refactor(auth): extract token validation logic`
- `docs(api): add authentication examples`
- `test(user-service): improve edge-case coverage`
- `chore: configure linting rules`
  Describe WHAT and WHY, not HOW.

## Rules

- NEVER `git commit` or `git push` without explicit user approval (enforced by `.claude/settings.json` `ask`).
