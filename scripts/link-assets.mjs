// Symlink content folders under `assets/` into `public/` so Astro serves
// their images as static files, e.g.:
//   /news/<slug>/cover.jpg
//   /characters/<slug>/avatar.png
//   /images/<file>
//
// Runs automatically before `npm run dev` and `npm run build`.
// Falls back to a recursive copy when the platform blocks symlinks.

import { symlink, rm, mkdir, cp, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'assets');
const PUBLIC = path.join(ROOT, 'public');

// Each folder in assets/ that holds servable images.
const NAMES = ['images', 'news', 'videos', 'characters', 'guides', 'tierlists', 'reviews'];

await mkdir(PUBLIC, { recursive: true });

for (const name of NAMES) {
  const from = path.join(ASSETS, name);
  const to = path.join(PUBLIC, name);

  try {
    await stat(from);
  } catch {
    console.warn(`Skipping: assets/${name} does not exist`);
    continue;
  }

  await rm(to, { recursive: true, force: true });

  try {
    await symlink(from, to, 'dir');
    console.log(`Linked: public/${name} -> assets/${name}`);
  } catch {
    await cp(from, to, { recursive: true });
    console.log(`Copied: assets/${name} -> public/${name}`);
  }
}
