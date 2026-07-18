// Tải ảnh cover còn thiếu cho bài viết (chạy lúc build trên GitHub Actions,
// nơi có network đầy đủ). Đọc manifest scripts/cover-manifest.json, mỗi entry:
//   { "path": "assets/news/<slug>/cover.jpg", "url": "https://...ảnh trực tiếp" }
//   hoặc { "path": "...", "page": "https://...bài viết" } -> tự lấy og:image.
// - Chỉ tải file chưa tồn tại.
// - Nếu chạy trong GitHub Actions và có file mới: commit ngược vào repo
//   ([skip ci]). Nếu push fail (thiếu quyền) thì bỏ qua — ảnh vẫn có cho build này.
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = resolve(root, 'scripts/cover-manifest.json');
if (!existsSync(manifestPath)) process.exit(0);

const UA = { 'user-agent': 'Mozilla/5.0 (CenixBot cover fetch)' };
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const downloaded = [];

for (const entry of manifest) {
  const abs = resolve(root, entry.path);
  if (existsSync(abs)) continue;
  try {
    let url = entry.url;
    if (!url && entry.page) {
      const html = await (await fetch(entry.page, { headers: UA })).text();
      const m = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/) ||
                html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/);
      if (!m) { console.warn(`[covers] no og:image on ${entry.page}, skip`); continue; }
      url = m[1];
      console.log(`[covers] og:image for ${entry.path}: ${url}`);
    }
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.warn(`[covers] ${url} -> HTTP ${res.status}, skip`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, buf);
    downloaded.push(entry.path);
    console.log(`[covers] downloaded ${entry.path} (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.warn(`[covers] failed ${entry.path}: ${e.message}`);
  }
}

if (downloaded.length && process.env.GITHUB_ACTIONS === 'true') {
  try {
    execSync('git config user.name "cenix-bot" && git config user.email "bot@imcenix.com"', { cwd: root });
    execSync(`git add ${downloaded.map((p) => `"${p}"`).join(' ')}`, { cwd: root });
    execSync('git commit -m "chore: fetch news covers [skip ci]"', { cwd: root });
    execSync('git pull --no-rebase -X ours origin main && git push origin HEAD:main', { cwd: root });
    console.log(`[covers] committed ${downloaded.length} cover(s) back to repo`);
  } catch (e) {
    console.warn(`[covers] commit-back skipped: ${e.message}`);
  }
}
