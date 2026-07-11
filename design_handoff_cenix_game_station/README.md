# Handoff: Cenix Game Station — Blog game (Dark Magazine)

## Overview
Website blog game "Cenix Game Station": tin tức game, video (embed YouTube), tier-list game gacha (tương tác hover), và hướng dẫn/tutorial. Ngôn ngữ nội dung: **tiếng Việt**. Hướng visual đã chốt: **Dark Magazine** (nền đen, typo editorial lớn, accent lime).

Package này bàn giao **5 trang đã thiết kế**: Trang chủ (3a), Tin tức (4a), Video (4b), Tier-List (4c), Hướng dẫn (4d).

## About the Design Files
File `Cenix Home Options.dc.html` trong bundle là **design reference tạo bằng HTML** — prototype thể hiện look & behavior dự kiến, KHÔNG phải production code để copy trực tiếp. Nhiệm vụ là **tái tạo các thiết kế này trong môi trường codebase đích** (Next.js/React, Astro, Vue…) theo pattern và thư viện sẵn có của codebase — hoặc nếu chưa có codebase, chọn framework phù hợp nhất (đề xuất: Next.js + CMS headless hoặc markdown-based cho blog).

File chứa nhiều turn khám phá; **chỉ implement các option có id `3a`, `4a`, `4b`, `4c`, `4d`** (2 section trên cùng). Các option 1a–1c, 2a–2c là exploration đã loại.

## Fidelity
**High-fidelity (hifi)**: mockup pixel-perfect với màu, typography, spacing, copy cuối cùng. Recreate pixel-perfect bằng component system của codebase.

Lưu ý: mọi ảnh (key art, thumbnail, avatar nhân vật) hiện là **placeholder sọc chéo** — chờ asset thật. Nội dung bài viết là copy mẫu thể hiện tone (thẳng thắn, "không clickbait", meta-focused); cấu trúc dữ liệu là thật.

## Design Tokens

### Colors
- Background chính: `#0a0a0b`
- Surface card: `rgba(255,255,255,.02)` – `.03`; hover card popup: `#141416`
- Border: `rgba(255,255,255,.09)` (divider), `.12` (card), `.18`–`.2` (input/chip), `.25` (button outline)
- Text: `#fff` (heading), `rgba(255,255,255,.5–.65)` (body), `.35–.45` (meta), `.3` (footer)
- **Accent lime: `#c8f03c`** (link, badge, CTA, hover: `#e2ff70`); text trên nền lime: `#0a0a0b`
- Accent nhẹ: `rgba(200,240,60,.4)` (border highlight), `.06–.08` (gradient bg card)
- Tier colors: S `#ff5c5c`, A `#ffb347`, B `#c8f03c`, C `#7fb4ff` (text trên tier badge: `#0a0a0b`)
- Changelog: lên `#c8f03c` trên `rgba(200,240,60,.15)`, xuống `#ff5c5c` trên `rgba(255,92,92,.15)`

### Typography
- Display/heading: **Archivo** (Google Fonts), weight 800–900. Masthead 104px/-3px letter-spacing; page title 56px/-1.5px; section 22–26px; card title 13.5–20px, line-height 1.25–1.3
- Mono/label: **Space Mono**, 9–13px, letter-spacing 1–4px cho label uppercase; body meta 400
- Body text: Archivo 400, 12.5–15px, line-height 1.5–1.6

### Spacing & Shape
- Page gutter: 48px; canvas thiết kế 1280px
- Section padding-top: 36–52px; gap grid: 14–20px
- Border-radius rất nhỏ: 2–4px (đặc trưng phong cách); chip/pill filter: 16–20px full-round
- Layout: CSS grid (12 cột cho feature grid trang chủ; 1fr + 320–340px cho layout có sidebar)

## Screens / Views

### 1. Trang chủ (id `3a`)
Thứ tự section, trên xuống:
1. **Ticker bar** — badge lime "MỚI" + headline, phải: ngày + giờ VN. Border-bottom divider.
2. **Nav** — logo (ô lime 32px chữ "C" + "CENIX / GAME STATION"), menu 5 mục Space Mono 11.5px (active: border-bottom 2px lime), search input outline + nút "THEO DÕI" lime.
3. **Masthead** — center, "EST. 2026 — BLOG GAME · TIER-LIST · HƯỚNG DẪN" (lime, tracking 4px), tiêu đề "CENIX GAME / STATION" 104px, dòng 2 outline-only (`-webkit-text-stroke: 2px #c8f03c; color: transparent`). Dưới: 3 số liệu (120+ bài viết / 15 tier-list / 8 game) ngăn bằng border-left. Bg: radial-gradient lime rất nhẹ từ đáy.
4. **Feature grid** — label "◆ NỔI BẬT HÔM NAY" + đường kẻ. Grid 12 cột, row 104px: lead story (span 7×4, ảnh full + gradient overlay từ đáy, badge "TIN NÓNG", title 34px, dek, author avatar); card tier-list tương tác (span 5×2, border lime .4, mini preview S/A/B avatar 22px, CTA "XEM TIER-LIST →"); card video (span 3×2, play button tròn outline, duration badge); card code (span 2×2, emoji 🎁, "NHẬN CODE →").
5. **Tin tức + sidebar** — trái: list 3 bài (thumb 180×110, kicker lime, title 19px, dek, meta). Phải (340px): "◆ ĐỌC NHIỀU NHẤT" top-5 đánh số (01 lime, còn lại mờ) + khối newsletter (border lime .4, gradient nhẹ, input + nút lime).
6. **Video** — 4 cột, thumb 126px + play button + duration badge góc, title dưới.
7. **Hướng dẫn** — 4 card border, kicker theo cấp (NGƯỜI MỚI/BUILD/FARM/ENDGAME), footer meta đẩy xuống bằng margin-top auto.
8. **Footer** — 4 cột: brand + tagline, Chuyên mục, Kết nối, Khác; bottom bar © 2026.

### 2. Tin tức (id `4a`)
- Nav (active: TIN TỨC), breadcrumb "TRANG CHỦ / TIN TỨC" (mục hiện tại lime)
- Page header: title 56px + đếm bài; filter chips (active = lime bg, còn lại outline); phải: sort "MỚI NHẤT ▾"
- Bài nổi bật: split 1.15fr/.85fr trong 1 border card — ảnh trái 340px cao, nội dung phải
- List bài: mỗi row = cột ngày (70px, mono mờ) + thumb 200×120 + nội dung (kicker/title 20px/dek/meta), divider giữa các row
- Pagination: ô 36px, trang hiện tại lime

### 3. Video (id `4b`)
- Page header + filter (GAMEPLAY/REVIEW/CỐT TRUYỆN/HƯỚNG DẪN)
- Featured: player 16:9 cao 460px (embed YouTube thật khi implement) + meta + title 26px + description; sidebar 340px "◆ TIẾP THEO" 4 item (thumb 120×68 + duration)
- Grid "TẤT CẢ VIDEO": 4 cột × 2 hàng, thumb + duration + title + meta; nút "TẢI THÊM VIDEO ↓" outline center
- **Video là YouTube embed, không tự host.** Duration + thumbnail lấy từ YouTube API/oEmbed.

### 4. Tier-List (id `4c`) — trang tương tác chính
- Page header; 2 hàng filter: GAME (A/B/C) và VAI TRÒ (DPS/SUPPORT/HEALER); active GAME = lime, active VAI TRÒ = bg trắng .12
- Layout: bảng tier (1fr) + sidebar 320px
- Bảng tier: mỗi hàng = badge chữ cái 64px (màu theo tier, chữ đen 26px) + track avatar (bg .03, border .08, avatar 72×72, flex-wrap)
- **Hover behavior (quan trọng):** hover avatar → outline 2px lime (offset 2px) + popup card 290px bên phải avatar: ảnh 52px + tên + "5★ · DPS · HỎA" (lime) + 3 dòng (Vũ khí / Đội hình / Vì sao tier S) + CTA "XEM BUILD ĐẦY ĐỦ →" nền lime. Popup bg `#141416`, border lime .5, shadow `0 12px 40px rgba(0,0,0,.7)`, z-index trên các hàng khác. Nên delay ~150ms khi hover, đóng khi rời chuột.
- Legend dưới bảng: S định hình meta / A rất mạnh / B ổn / C tình huống
- Sidebar: card "◆ THAY ĐỔI BẢN 2.5" (badge ▲ LÊN / ▼ XUỐNG / ＋ MỚI), list "◆ TIER-LIST KHÁC" 4 mục + ngày, card CTA Discord (border lime)

### 5. Hướng dẫn (id `4d`)
- Page header
- "◆ LỘ TRÌNH ĐỀ XUẤT": 4 cell liền nhau trong 1 border (grid 4 cột, chia bằng border-right): số 01–04 (01 lime, còn lại mờ), tên cấp, mô tả, đếm bài "N BÀI →" lime đẩy đáy
- "GUIDE MỚI NHẤT" + filter chips phải; grid 3 cột × 2 hàng: thumb 140px + kicker lime + ngày + title 16px + tag chips (bg .07); nút "XEM THÊM GUIDE ↓"

## Interactions & Behavior
- Nav: active state = border-bottom 2px lime; hover: chữ sáng lên (`rgba(255,255,255,.55)` → `#fff`)
- Filter chips: single-select; active = bg lime chữ đen
- Tier-list hover: như mô tả 4c; trên mobile thay hover bằng tap → bottom sheet/modal
- Card/bài viết hover đề xuất: title chuyển lime hoặc ảnh scale 1.02, transition 150–200ms ease
- Link mặc định: `a { color: #c8f03c }`, hover `#e2ff70`
- Pagination, "Tải thêm" (infinite hoặc paged), sort dropdown
- Newsletter: validate email, success/error state (chưa thiết kế — dùng inline message cùng token)

## State Management
- Trang list: `activeCategory`, `sortOrder`, `page`
- Video: `activeVideo` (featured player), `activeFilter`
- Tier-list: `activeGame`, `activeRole`, `hoveredCharacterId` (popup); data theo game+role
- Data models đề xuất: Post {title, slug, category, excerpt, body, cover, publishedAt, readMinutes, author}; Video {youtubeId, title, category, duration, publishedAt}; TierList {game, role, updatedAt, tiers: [{rank, characters: [{name, rarity, role, element, avatar, weapon, team, reason, buildUrl}]}], changelog}; Guide {title, level, tags, cover, updatedAt}

## Assets
- Fonts: Archivo (400–900) + Space Mono (400/700) từ Google Fonts
- Toàn bộ ảnh là placeholder — cần: key art hero, thumbnail bài viết/video (YouTube), avatar nhân vật, logo. Logo hiện là ô lime + chữ "C" (tạm).
- Icon dùng ký tự text (◆ ▶ ⌕ ▲ ▼) — có thể thay bằng icon set của codebase (Lucide…)

## Files
- `Cenix Home Options.dc.html` — file thiết kế đầy đủ (mở trực tiếp trong browser). Các section cần implement: id `3a` (trang chủ), `4a`, `4b`, `4c`, `4d`. Style nằm inline trên từng element — đọc trực tiếp để lấy giá trị chính xác.
- `support.js` — runtime của file thiết kế, chỉ để mở file xem, không liên quan implement.

## Screenshots
Thư mục `screenshots/` chứa ảnh chụp từng trang, cắt theo đoạn cuộn từ trên xuống:
- `3a-home-1..6` — Trang chủ
- `4a-tintuc-1..4` — Tin tức
- `4b-video-1..4` — Video
- `4c-tierlist-1..3` — Tier-List (có hover card demo)
- `4d-huongdan-1..3` — Hướng dẫn
Ảnh chụp ở zoom 62% để tham khảo layout; giá trị chính xác lấy từ inline style trong file HTML.
