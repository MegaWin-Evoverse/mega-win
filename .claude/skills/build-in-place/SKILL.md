---
description: Implement a feature/fix directly on the current single checkout (no git worktree), delegate the mechanical work to a subagent, and leave every change unstaged so the user can review the whole diff in one git tree. Trigger on requests like "реалізуй в одній гілці без ворктрі", "не комітив, хочу перевірити сам", "use a subagent but don't commit", or any request to implement something without creating a worktree and without committing.
---

# Build in place (no worktree, no commit, subagent does the typing)

Use this when the user wants an implementation done in the **single existing
checkout** (not a separate `git worktree`), executed by a **subagent**, with
**nothing committed** — so every changed/new file shows up as one diff in
`git status` / `git diff` for the user to review themselves.

This is the opposite default of `using-git-worktrees` (which isolates work in
a new worktree). Only follow this skill when the user explicitly asks for
single-checkout, no-worktree behavior — otherwise prefer the worktree skill.

## Workflow

### 1. Make sure the target branch is checked out in the one real working directory

- Run `git branch --show-current` and `git worktree list` in the main repo dir.
- If the target branch is already checked out in a *different* worktree, you
  cannot check it out again in the main dir until that worktree is freed.
  - Confirm the other worktree is clean (`git -C <worktree-path> status --porcelain`
    must be empty) before touching it — never discard dirty work.
  - Remove it: `git worktree remove <path>` (add `--force` only if it fails
    purely on a "directory not empty" error from stray ignored files, e.g.
    `node_modules`/`.next` — never force past actual uncommitted changes).
  - Then `git checkout <branch>` in the main repo dir.
- If the leftover worktree directory can't be deleted from disk afterward
  (Windows file lock / open editor handle), that's harmless — git no longer
  tracks it as a worktree, just leave it and mention it to the user.

### 2. Gather the full spec before delegating

Don't hand a subagent a vague paragraph. Collect (from the conversation, repo
docs, screenshots, or by reading files yourself first):
- Exact requirements (copy text, dimensions, colors, breakpoints, asset paths).
- The project's binding conventions: `CLAUDE.md` / `AGENTS.md` / `.claude/rules/*`
  relevant to the layer being touched (check `.claude/doc-mapping.json` first).
- Where assets/files already exist on disk (e.g. `public/...`) so the subagent
  doesn't recreate or move them.

### 3. Delegate to a subagent with explicit git constraints

In the subagent prompt, always state explicitly:
- The exact branch/working directory it's operating in, and that it must
  **not switch branches**.
- **Do NOT run `git add`, `git commit`, or `git push`.** Leave all changes
  unstaged/untracked for human review.
- Do not touch unrelated files; do not move or delete existing assets.
- Which project rule files it must follow (name the specific `.claude/rules/*`
  paths relevant to the task, not just "follow the rules").
- Ask it to report back: files created/changed, key decisions/deviations, in
  a short summary.

### 4. Verify yourself after the subagent returns

Don't take the subagent's summary at face value:
- `git status --porcelain` to see exactly what changed.
- Read the new/changed files yourself.
- Check them against the same rule files you handed the subagent — common
  misses: constants placed inline instead of in `model/constants.ts`, magic
  strings, wrong export style, missing public `index.ts`. Fix small
  violations directly rather than re-delegating for minor cleanup.

### 5. Stop — do not commit

Report what changed and that it's sitting unstaged in the working tree.
Never run `git add`/`git commit`/`git push` yourself unless the user
separately and explicitly asks for that in this turn.
