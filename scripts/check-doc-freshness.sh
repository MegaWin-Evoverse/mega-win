#!/usr/bin/env bash
# Checks whether documentation is stale relative to changed source files.
# WARN-ONLY by default: it reports stale docs but never edits or stages files,
# so AI-flow files don't leak into feature commits/PRs.
# Opt in to auto-update (Claude CLI rewrites docs + stages them) with DOC_AUTO_UPDATE=1.
#
# Usage:
#   bash scripts/check-doc-freshness.sh                    # warn-only (default)
#   DOC_AUTO_UPDATE=1 bash scripts/check-doc-freshness.sh  # auto-update via Claude + git add

set -euo pipefail

# ── Constants ─────────────────────────────────────────────────────────────────
export DOC_MAPPING=".claude/doc-mapping.json"
export CLAUDE_MD="CLAUDE.md"
export BASE_BRANCH="main"
export MAX_CLAUDE_MD_LINES=200
# Warn-only by default; set DOC_AUTO_UPDATE=1 to let Claude rewrite & stage docs.
# Back-compat: SKIP_AI_UPDATE=1 still forces a dry-run (warn-only is now the default anyway).
readonly DOC_AUTO_UPDATE="${DOC_AUTO_UPDATE:-0}"

# ── Helpers ───────────────────────────────────────────────────────────────────
log_info()  { echo "  $*"; }
log_ok()    { echo "✅ $*"; }
log_warn()  { echo "⚠️  $*"; }
log_error() { echo "❌ $*" >&2; }
log_step()  { echo ""; echo "── $* ──────────────────────────────────────"; }

has_node()   { command -v node  &>/dev/null; }
has_claude() { command -v claude &>/dev/null; }

# ── Guards ────────────────────────────────────────────────────────────────────
if [[ ! -f "$DOC_MAPPING" ]]; then
  log_warn "Doc mapping not found at $DOC_MAPPING — skipping freshness check."
  exit 0
fi

if ! has_node; then
  log_warn "node not found — skipping freshness check."
  exit 0
fi

# ── Collect changed source files ──────────────────────────────────────────────
log_step "Collecting changed source files"

STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || true)
DIFF_MAIN_FILES=$(git diff "$BASE_BRANCH" --name-only 2>/dev/null || true)

# Union of staged and diff-vs-main, filtered to src/ (no test files, no docs)
ALL_CHANGED=$(
  printf '%s\n%s' "$STAGED_FILES" "$DIFF_MAIN_FILES" \
  | sort -u \
  | grep -E '^src/.*\.(ts|tsx|js|jsx)$' \
  | grep -vE '\.(test|spec)\.(ts|tsx)$' \
  | grep -v '__tests__' \
  || true
)

if [[ -z "$ALL_CHANGED" ]]; then
  log_ok "No source file changes — docs are up to date."
  exit 0
fi

log_info "Changed source files:"
echo "$ALL_CHANGED" | sed 's/^/    /'

# ── Find stale doc/rules files ────────────────────────────────────────────────
log_step "Checking doc freshness against $DOC_MAPPING"

# Use node to match patterns and find stale docs; output: "docPath|triggerFile"
STALE_ENTRIES=$(ALL_CHANGED="$ALL_CHANGED" node - << 'NODEEOF'
const fs  = require('fs');
const mapping = JSON.parse(fs.readFileSync(process.env.DOC_MAPPING || '.claude/doc-mapping.json', 'utf8'));
const changedFiles = (process.env.ALL_CHANGED || '').split('\n').filter(Boolean);
const changedSet   = new Set(changedFiles);

// Deduplicate by docPath to avoid calling claude twice for the same file
const seenDocs = new Set();
const results  = [];

for (const entry of mapping.mappings) {
  // "src/app/**" → prefix "src/app"
  const prefix = entry.pattern.replace(/\/\*\*.*$/, '');

  const trigger = changedFiles.find(f => f.startsWith(prefix + '/') || f === prefix);
  if (!trigger) continue;

  for (const docKey of ['doc', 'rules']) {
    const docPath = entry[docKey];
    if (!docPath) continue;
    if (seenDocs.has(docPath)) continue;
    if (changedSet.has(docPath)) { seenDocs.add(docPath); continue; } // already updated

    seenDocs.add(docPath);
    results.push(docPath + '|' + trigger);
  }
}

results.forEach(r => console.log(r));
NODEEOF
)

if [[ -z "$STALE_ENTRIES" ]]; then
  log_ok "All docs are up to date."
else
  # ── Auto-update stale docs via Claude CLI ──────────────────────────────────
  log_step "Updating stale documentation"

  while IFS='|' read -r DOC_PATH SRC_FILE; do
    [[ -z "$DOC_PATH" ]] && continue

    log_warn "Stale: $DOC_PATH  (trigger: $SRC_FILE)"

    if [[ "$DOC_AUTO_UPDATE" != "1" ]]; then
      log_info "  warn-only — leaving $DOC_PATH unchanged (run DOC_AUTO_UPDATE=1 npm run doc:check to update)."
      continue
    fi

    if ! has_claude; then
      log_warn "  claude CLI not found — update $DOC_PATH manually."
      continue
    fi

    log_info "  Calling Claude CLI to update $DOC_PATH ..."
    claude "Update file $DOC_PATH based on recent changes in $SRC_FILE. Read both files and update the documentation to stay accurate and current."

    if [[ -f "$DOC_PATH" ]]; then
      git add "$DOC_PATH"
      log_ok "Updated and staged: $DOC_PATH"
    else
      log_error "Expected $DOC_PATH to exist after update — skipping git add."
    fi

  done <<< "$STALE_ENTRIES"
fi

# ── Check CLAUDE.md line count ────────────────────────────────────────────────
log_step "Checking $CLAUDE_MD size"

if [[ ! -f "$CLAUDE_MD" ]]; then
  log_warn "$CLAUDE_MD not found — skipping line count check."
  exit 0
fi

LINE_COUNT=$(wc -l < "$CLAUDE_MD")
log_info "$CLAUDE_MD: $LINE_COUNT lines (limit: $MAX_CLAUDE_MD_LINES)"

if (( LINE_COUNT > MAX_CLAUDE_MD_LINES )); then
  log_warn "$CLAUDE_MD exceeds $MAX_CLAUDE_MD_LINES lines ($LINE_COUNT found)."

  if [[ "$DOC_AUTO_UPDATE" != "1" ]]; then
    log_info "warn-only — leaving $CLAUDE_MD unchanged (run DOC_AUTO_UPDATE=1 npm run doc:check to shorten)."
  elif has_claude; then
    log_info "Calling Claude CLI to shorten $CLAUDE_MD ..."
    claude "Shorten and optimize $CLAUDE_MD so it contains at most $MAX_CLAUDE_MD_LINES lines without losing critical instructions. Edit the file in place."

    NEW_COUNT=$(wc -l < "$CLAUDE_MD")
    git add "$CLAUDE_MD"
    log_ok "$CLAUDE_MD shortened to $NEW_COUNT lines and staged."
  else
    log_warn "claude CLI not found — shorten $CLAUDE_MD manually."
  fi
else
  log_ok "$CLAUDE_MD is within the $MAX_CLAUDE_MD_LINES-line limit."
fi

echo ""
log_ok "Doc freshness check complete."
