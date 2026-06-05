# Naming Review

Audit naming in the current diff or specified files against `.claude/rules/naming.md`.

## Steps

1. **Identify scope**
   ```bash
   git diff --staged --name-only
   git diff --name-only
   ```
   If no args — review the diff. If a path is given — review that file.

2. **Check each file against naming rules**

   Flag any of these (driven by `.claude/rules/naming.md`):

   - **Generic handlers without subject** — `handleChange`, `handleClick` (no noun indicating what changes/is clicked)
   - **Vague state** — `data`, `result`, `value`, `items`, `isLoading` used without domain context (e.g. `isLoading` instead of `isFetchingUser`)
   - **Negative boolean flags** — `isDisabled`, `isNotVisible`, `isManualDisabled` (flip to affirmative: `canSubmit`, `isVisible`, `canManualSubmit`)
   - **Weak prop names without subject** — `onClick`, `onChange`, `onClose` without a domain noun (e.g. `onEmailChange`, `onDrawerClose`)
   - **Vague response/output variables** — `response`, `result` used as final variable names instead of `apiResponse`, `submitResult`, etc.
   - **Generic `items`/`data` props** — should reflect the domain (`products`, `users`, `categories`)
   - **`min`/`max` without context** — replace with `minPrice`, `maxCount`, `minLength`, etc.

3. **Report findings**

   Format:
   ```
   file.ts:42  handleChange → handleEmailChange   (generic handler — missing subject)
   store.ts:8  isLoading → isFetchingUser         (vague — loading what?)
   hooks.ts:15 data → userData                    (vague — data of what?)
   props.ts:7  onClick → onSubmit                 (weak prop — missing domain verb)
   ```

4. **Propose renames**

   List exact search→replace for each finding.
   Do **not** rename automatically — wait for approval unless the user says "fix it".
