import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';

const CSS_PATH = resolve('src/app/globals.css');
const SRC_DIR = resolve('src');
const EXTENSIONS = new Set(['.tsx', '.ts', '.css']);

const COLOR_PREFIXES = [
  'bg-',
  'text-',
  'border-',
  'ring-',
  'from-',
  'to-',
  'via-',
  'fill-',
  'stroke-',
  'shadow-',
  'outline-',
  'divide-',
  'accent-',
  'caret-',
  'placeholder-',
  'decoration-',
];

const css = readFileSync(CSS_PATH, 'utf8');

// --- Identify @theme inline block ---

const themeInlineMatch = css.match(/@theme\s+inline\s*\{([\s\S]*?)\}/);
const themeInlineBlock = themeInlineMatch ? themeInlineMatch[1] : '';
const themeInlineVars = new Set(
  [...themeInlineBlock.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((m) => m[1])
);

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
  return cssWithoutDefs.includes(id);
}

// For @theme inline variables, derive generated Tailwind utility names and
// check whether any of them appear in source files.
function themeVarUsedViaTailwind(varName) {
  if (varName.startsWith('--color-')) {
    const suffix = varName.slice('--color-'.length);
    return COLOR_PREFIXES.some((prefix) => combined.includes(prefix + suffix));
  }
  if (varName.startsWith('--font-')) {
    const suffix = varName.slice('--font-'.length);
    return combined.includes('font-' + suffix);
  }
  if (varName.startsWith('--radius-')) {
    const suffix = varName.slice('--radius-'.length);
    return combined.includes('rounded-' + suffix);
  }
  return false;
}

// --- Report ---

const unusedClasses = classNames.filter((c) => !usedInSrc(c));

const unusedVars = varDefs.filter((v) => {
  if (usedInSrc(v) || usedInCssBody(v)) return false;
  if (themeInlineVars.has(v) && themeVarUsedViaTailwind(v)) return false;
  return true;
});

const unusedKeyframes = keyframeNames.filter(
  (k) => !usedInSrc(k) && !css.includes(`animation: ${k}`) && !css.includes(`animate-${k}`)
);

console.log('\n=== UNUSED CSS CLASSES ===');
unusedClasses.forEach((c) => console.log(`.${c}`));

console.log('\n=== UNUSED CSS VARIABLES ===');
unusedVars.forEach((v) => {
  const tag = themeInlineVars.has(v) ? ' [@theme inline]' : ' [:root]';
  console.log(v + tag);
});

console.log('\n=== UNUSED KEYFRAMES ===');
unusedKeyframes.forEach((k) => console.log(`@keyframes ${k}`));

console.log('\n=== SUMMARY ===');
console.log(`Classes:   ${unusedClasses.length} unused / ${classNames.length} total`);
console.log(`Variables: ${unusedVars.length} unused / ${varDefs.length} total`);
console.log(`Keyframes: ${unusedKeyframes.length} unused / ${keyframeNames.length} total`);
