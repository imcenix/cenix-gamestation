// Safety net: a former CMS bug double-escaped quotes in frontmatter — review
// text containing " got saved as \\" (or worse on repeated saves), which is
// invalid YAML and breaks the whole Astro build/deploy. This collapses any run
// of 2+ backslashes before a double-quote down to a single \" inside the
// frontmatter block of every assets/**/*.md. Runs in prebuild.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', 'assets');

async function walk(dir) {
  let out = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(await walk(full));
    else if (e.name.endsWith('.md')) out.push(full);
  }
  return out;
}

let fixed = 0;
for (const f of await walk(ASSETS)) {
  const raw = await readFile(f, 'utf-8');
  const m = raw.match(/^---\n[\s\S]*?\n---/);
  if (!m) continue;
  const fm = m[0];
  const clean = fm.replace(/\\{2,}"/g, '\\"');
  if (clean !== fm) {
    await writeFile(f, raw.replace(fm, clean), 'utf-8');
    console.log('Repaired frontmatter:', path.relative(ASSETS, f));
    fixed++;
  }
}
if (fixed) console.log(`fix-frontmatter: repaired ${fixed} file(s)`);
