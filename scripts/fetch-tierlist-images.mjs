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

const UA = { headers: { 'user-agent': 'Mozilla/5.0 (CenixBot tierlist fetch)' } };
async function grab(url) {
  const res = await fetch(url, UA);
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}
for (const { path, url, page } of manifest) {
  const abs = resolve(root, path);
  if (existsSync(abs)) continue;
  try {
    let buf = url ? await grab(url) : null;
    if (!buf && page) {
      // fallback: lấy og:image từ trang nhân vật
      const html = await (await fetch(page, UA)).text();
      const m = html.match(/property="og:image"\s+content="([^"]+)"/) || html.match(/content="([^"]+)"\s+property="og:image"/);
      if (m) buf = await grab(m[1]);
    }
    if (!buf) { console.warn(`[tierlist] ${url} (+page fallback) -> failed, skip`); continue; }
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
