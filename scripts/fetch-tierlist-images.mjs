// Tải ảnh tier-list còn thiếu (chạy trong workflow deploy trên GitHub Actions,
// nơi có network đầy đủ). Đọc manifest scripts/tierlist-image-manifest.json:
//   [{ "path": "assets/tierlists/<game>/images/<slug>.webp", "url": "https://..." }]
// - Chỉ tải file chưa tồn tại (không bao giờ ghi đè assets/** có sẵn).
// - Nếu có file mới: commit ngược vào repo ([skip ci]) để ảnh nằm hẳn trong
//   assets/** như ảnh đăng qua CMS. Push fail thì bỏ qua — ảnh vẫn có mặt
//   cho lần build này.
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'scripts/tierlist-image-manifest.json');
if (!existsSync(manifestPath)) process.exit(0);

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const downloaded = [];

for (const { path, url } of manifest) {
  const abs = resolve(root, path);
  if (existsSync(abs)) continue;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (CenixBot tierlist fetch)' } });
    if (!res.ok) { console.warn(`[tierlist] ${url} -> HTTP ${res.status}, skip`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, buf);
    downloaded.push(path);
    console.log(`[tierlist] downloaded ${path} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.warn(`[tierlist] failed ${url}: ${e.message}`);
  }
}

if (downloaded.length && process.env.GITHUB_ACTIONS === 'true') {
  try {
    execSync('git config user.name "cenix-bot" && git config user.email "bot@imcenix.com"', { cwd: root });
    execSync(`git add ${downloaded.map((p) => `"${p}"`).join(' ')}`, { cwd: root });
    execSync('git commit -m "chore: fetch tierlist images [skip ci]"', { cwd: root });
    execSync('git pull --no-rebase -X ours origin main && git push origin HEAD:main', { cwd: root });
    console.log(`[tierlist] committed ${downloaded.length} image(s) back to repo`);
  } catch (e) {
    console.warn(`[tierlist] commit-back skipped: ${e.message}`);
  }
}
