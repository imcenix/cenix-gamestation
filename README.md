# Cenix Game Station

Blog game "Dark Magazine" tại **game.imcenix.com** — tin tức, video (embed YouTube), tier-list game gacha (tương tác hover) và hướng dẫn. Cùng kiến trúc với `yum.imcenix.com`: **Astro static + SFTP qua GitHub Actions**, nội dung là markdown do CMS (`imcenix.com/cms`) commit vào repo.

## Chạy local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build ra dist/
npm run preview    # xem thử bản build
```

`predev` / `prebuild` tự chạy `scripts/link-assets.mjs` để symlink `assets/*` → `public/*`, nhờ đó ảnh trong bài phục vụ tĩnh tại `/news/<slug>/cover.jpg`, `/characters/<slug>/avatar.png`, `/images/...`.

## Cấu trúc nội dung (`assets/`)

Mỗi bài là **1 folder** chứa file markdown + ảnh đi kèm:

| Collection | Đường dẫn | File | Ghi chú |
|---|---|---|---|
| Tin tức | `assets/news/<slug>/` | `post.md` | `category`: tin-tuc / su-kien / gioi-thieu-game / phan-tich |
| Video | `assets/videos/<slug>/` | `video.md` | `youtube_url` — embed, không tự host |
| Nhân vật (tier-list) | `assets/characters/<slug>/` | `character.md` | 1 nhân vật/entry; trang tier-list tự gom theo `game` + `role` + `tier` |
| Meta tier-list | `assets/tierlists/<game>/` | `tierlist.md` | version + changelog + nhãn game hiển thị trên chip |
| Hướng dẫn | `assets/guides/<slug>/` | `guide.md` | `level`: tan-thu / build / farm / endgame |

Ảnh bìa: đặt file cạnh `.md` rồi khai báo tên trong frontmatter (`cover: cover.jpg`, `avatar: avatar.png`). Chưa có ảnh thì để trống — site hiển thị placeholder sọc chéo. Ảnh chèn trong thân bài dùng đường dẫn tương đối (`![](photos/01.jpg)`) và được `scripts/remark-rewrite-images.mjs` tự đổi thành đường dẫn tuyệt đối.

Xem `assets/*/_template/` để biết đầy đủ các field.

### Tier-list hoạt động thế nào

Không có "bảng tier" cứng. Mỗi **nhân vật** là 1 entry mang `game`, `role` (dps/support/healer) và `tier` (S/A/B/C). Trang `/tier-list` gom tất cả nhân vật, lọc theo chip **GAME + VAI TRÒ** và dựng bảng ngay trên trình duyệt; hover/tap avatar hiện popup build tóm tắt. Đổi tier một nhân vật = sửa `tier:` trong file của nhân vật đó. `assets/tierlists/<game>/tierlist.md` chỉ giữ version + changelog + tên game.

## Deploy → game.imcenix.com

Giống FoodStation: chạy `./Publish.command` (hoặc `git push`) → **GitHub Actions** build và SFTP `dist/` vào `web/imcenix.com/public_html/game`.

**Thiết lập lần đầu:**

1. Tạo repo GitHub `imcenix/cenix-gamestation`, push code này lên nhánh `main`.
2. Trỏ subdomain `game.imcenix.com` về thư mục `.../public_html/game` trên host (như đã làm với `yum`).
3. Thêm secrets cho repo (Settings → Secrets and variables → Actions). Cách nhanh: 1 secret gộp `CENIX_HOSTING`:
   ```
   SFTP_HOST=45.32.110.164
   SFTP_PORT=22
   SFTP_USER=cenix
   SFTP_PASSWORD=••••••
   SFTP_REMOTE_PATH=web/imcenix.com/public_html
   ```
   Hoặc thêm từng secret rời cùng tên. `PROJECT_SLUG=game` đã cố định trong workflow nên deploy vào đúng `/game`.
4. Push → mở tab **Actions** theo dõi. Job xanh (~1–2 phút) là xong.

## Kết nối CMS (làm sau)

CMS dùng chung ở `imcenix.com/cms`. Để quản lý nội dung game qua CMS, thêm 1 project `cenix-game-station` (5 collection ở trên) vào `Cenix CMS/src/config/projects.ts` và trỏ repo `imcenix/cenix-gamestation`. CMS commit markdown vào `assets/`, Actions build lại — không cần đụng gì thêm ở site này.

## Ghi chú

- Cần thay ảnh thật: logo nav, `public/images/og-cover.png` (OG 1200×630), key art, thumbnail, avatar nhân vật.
- Fonts: Archivo + Space Mono (Google Fonts). Accent lime `#c8f03c`, nền `#0a0a0b`.
