#!/usr/bin/env node
/**
 * check-blank-lines — flags (and optionally fixes) redundant blank lines in the
 * import section of TS/TSX files:
 *   - blank lines BETWEEN import statements
 *   - a blank line between a leading 'use client' / 'use server' directive and
 *     the first import
 *
 * It deliberately does NOT touch blank lines elsewhere (between functions,
 * object groups, JSX-vs-logic boundaries) — those aid readability. JSX-internal
 * blank lines are reviewed by the `remove-spaces` skill, not this script.
 *
 * Usage:
 *   node scripts/check-blank-lines.mjs [--fix] [files...]
 * With no file args it scans all tracked src/**.{ts,tsx}.
 * Exit code 1 if violations remain (0 when --fix resolved them).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const fix = args.includes('--fix');
let files = args.filter((a) => a !== '--fix');
if (files.length === 0) {
  files = execSync('git ls-files "src/**/*.ts" "src/**/*.tsx"', { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean);
}
files = files.filter((f) => /\.(ts|tsx)$/.test(f) && existsSync(f));

const directive = /^['"]use (client|server)['"];?\s*$/;
const isImportStart = (l) => /^import\b/.test(l);
const completesImport = (l) =>
  /from\s+['"].*['"];?\s*$/.test(l) || /^import\s+['"].*['"];?\s*$/.test(l);

const violations = [];

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const lines = src.split('\n');

  // 1) blank between a leading directive and the first import
  if (directive.test(lines[0] ?? '')) {
    let j = 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (j > 1 && isImportStart(lines[j] ?? '')) {
      for (let k = 1; k < j; k++) violations.push(`${f}:${k + 1} blank line after directive`);
      if (fix) lines.splice(1, j - 1);
    }
  }

  // 2) blank lines between import statements
  let start = lines.findIndex(isImportStart);
  if (start !== -1) {
    let i = start;
    let inMultiline = false;
    let lastImportIdx = start;
    while (i < lines.length) {
      const l = lines[i];
      if (inMultiline) {
        lastImportIdx = i;
        if (completesImport(l) || /^\s*['"];?\s*$/.test(l)) inMultiline = false;
        i++;
        continue;
      }
      if (isImportStart(l)) {
        lastImportIdx = i;
        if (!completesImport(l)) inMultiline = true;
        i++;
        continue;
      }
      if (l.trim() === '') {
        i++;
        continue;
      }
      break;
    }
    for (let k = start; k <= lastImportIdx; k++) {
      if (lines[k].trim() === '') violations.push(`${f}:${k + 1} blank line inside import block`);
    }
    if (fix) {
      const before = lines.slice(0, start);
      const region = lines.slice(start, lastImportIdx + 1).filter((l) => l.trim() !== '');
      const after = lines.slice(lastImportIdx + 1);
      lines.length = 0;
      lines.push(...before, ...region, ...after);
    }
  }

  if (fix) writeFileSync(f, lines.join('\n'));
}

if (fix) {
  console.log('check-blank-lines: applied fixes to import sections.');
  process.exit(0);
}

if (violations.length) {
  console.error('check-blank-lines: redundant blank lines found:\n');
  violations.forEach((v) => console.error('  ' + v));
  console.error(`\n${violations.length} violation(s). Run: node scripts/check-blank-lines.mjs --fix`);
  process.exit(1);
}
console.log('check-blank-lines: OK');
