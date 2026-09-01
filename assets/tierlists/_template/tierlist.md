---
game_label: "Tên game"
genre: "Thể loại"
blurb: "Giới thiệu sơ lược"
version: "1.0"
updated: 2026-07-11
order: 100
# Cột dọc mặc định (vai trò). Bỏ trống -> mỗi tier là 1 hàng duy nhất như cũ.
# Game không chia vai trò thì để 1 cột, vd: columns: PVE
columns: DPS, Support, Healer, Tank
---
{
  "boards": [
    {
      "id": "pve",
      "label": "PVE",
      "note": "Ghi chú riêng của bảng này (không bắt buộc).",
      "tiers": [
        { "label": "SSS", "sublabel": "", "color": "#ff4d4d", "cols": {
          "DPS":     [ { "name": "Tên nhân vật", "image": "ten-file.webp", "element": "Hệ", "desc": "Giới thiệu (hover mới thấy)", "role": "knight" } ],
          "Support": [], "Healer": [], "Tank": []
        }},
        { "label": "SS", "sublabel": "", "color": "#ff8c42", "cols": { "DPS": [], "Support": [], "Healer": [], "Tank": [] } }
      ]
    },
    {
      "id": "pvp",
      "label": "PVP",
      "columns": ["DPS", "Support", "Tank"],
      "tiers": []
    }
  ]
}

<!--
GHI CHÚ FORMAT

1. Nhiều bảng (PVE / PVP / Raid...) -> dùng { "boards": [...] } như trên.
   Có từ 2 bảng trở lên thì trang tự hiện nút chuyển ở đầu bảng.
   Mỗi bảng có thể tự khai "columns" riêng; không khai thì lấy `columns` ở frontmatter.
   "note" là dòng ghi chú riêng cho bảng đó (vd điều kiện xếp hạng), bỏ được.

2. Một bảng duy nhất -> ghi thẳng mảng tier, không cần "boards":
   [ { "label": "SSS", "color": "#ff4d4d", "cols": { "DPS": [...] } } ]

3. Không chia cột (kiểu cũ nhất) -> bỏ `columns` ở frontmatter và dùng "chars":
   [ { "label": "SSS", "sublabel": "Top Tier", "color": "#ff4d4d", "chars": [ ... ] } ]

Giá trị "role" hợp lệ (quyết định icon class): warrior, knight, tank, wizard,
mage, archer, assassin, rogue, healer, support.
-->
