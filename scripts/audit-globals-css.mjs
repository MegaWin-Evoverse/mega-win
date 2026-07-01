import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';

const CSS_PATH = resolve('src/app/globals.css');
const SRC_DIR = resolve('src');
const EXTENSIONS = new Set(['.tsx', '.ts', '.css']);

const css = readFileSync(CSS_PATH, 'utf8');

// --- Extract identifiers from globals.css ---

// CSS classes: lines like ".foo {", ".foo," , ".foo:hover"
const classNames = [
  ...new Set([...css.matchAll(/^\.([\w-]+)[\s{,:]/gm)].map((m) => m[1])),
];

// CSS variable definitions: "--foo:" anywhere in the file
const varDefs = [
  ...new Set([...css.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1])),
];

// @keyframes names
const keyframeNames = [
  ...new Set([...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1])),
];

// --- Collect all source files (excluding globals.css itself) ---

function collectFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectFiles(full));
    } else if (EXTENSIONS.has(extname(entry)) && full !== CSS_PATH) {
      results.push(full);
    }
  }
  return results;
}

const sourceFiles = collectFiles(SRC_DIR);
const combined = sourceFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

// Also include globals.css itself for intra-file var references,
// but strip definition lines so only usages (e.g., var(--foo)) remain.
const cssWithoutDefs = css.replace(/^\s*--[\w-]+\s*:[^;]+;/gm, '');

function usedInSrc(id) {
  return combined.includes(id);
}

function usedInCssBody(id) {
  // Check if the var is referenced in CSS values (not as a definition)
  return cssWithoutDefs.includes(id);
}

// --- Report ---

const unusedClasses = classNames.filter((c) => !usedInSrc(c));
const unusedVars = varDefs.filter((v) => !usedInSrc(v) && !usedInCssBody(v));
const unusedKeyframes = keyframeNames.filter(
  (k) => !usedInSrc(k) && !css.includes(`animation: ${k}`) && !css.includes(`animate-${k}`)
);

console.log('\n=== UNUSED CSS CLASSES ===');
unusedClasses.forEach((c) => console.log(`.${c}`));

console.log('\n=== UNUSED CSS VARIABLES ===');
unusedVars.forEach((v) => console.log(v));

console.log('\n=== UNUSED KEYFRAMES ===');
unusedKeyframes.forEach((k) => console.log(`@keyframes ${k}`));

console.log('\n=== SUMMARY ===');
console.log(`Classes:   ${unusedClasses.length} unused / ${classNames.length} total`);
console.log(`Variables: ${unusedVars.length} unused / ${varDefs.length} total`);
console.log(`Keyframes: ${unusedKeyframes.length} unused / ${keyframeNames.length} total`);
