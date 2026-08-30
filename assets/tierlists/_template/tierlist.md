---
game_label: "Tên game"
genre: "Thể loại"
blurb: "Giới thiệu sơ lược"
version: "1.0"
updated: 2026-07-11
order: 100
# Cột dọc (vai trò). Bỏ trống -> mỗi tier là 1 hàng duy nhất như cũ.
# Game không chia vai trò thì để 1 cột, vd: columns: PVE
columns: DPS, Support, Healer, Tank
---
[
  { "label": "SSS", "sublabel": "Top Tier", "color": "#ff4d4d", "cols": {
    "DPS":     [ { "name": "Tên nhân vật", "image": "", "element": "Hệ", "desc": "Giới thiệu (hover mới thấy)", "role": "knight" } ],
    "Support": [],
    "Healer":  [],
    "Tank":    []
  }},
  { "label": "SS", "sublabel": "Tier 1", "color": "#ff8c42", "cols": { "DPS": [], "Support": [], "Healer": [], "Tank": [] } }
]

<!--
Kiểu cũ (1 hàng, không chia cột) vẫn chạy bình thường — bỏ `columns` ở trên và dùng "chars":
  { "label": "SSS", "sublabel": "Top Tier", "color": "#ff4d4d", "chars": [ ... ] }
-->
