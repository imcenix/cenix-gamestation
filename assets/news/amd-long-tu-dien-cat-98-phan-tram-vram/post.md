---
title: "AMD nhốt cây cối vào lồng tứ diện — 80 GB VRAM ray tracing rớt còn 1,7 GB"
slug: amd-long-tu-dien-cat-98-phan-tram-vram
category: tin-tuc
date: 2026-09-22
read_minutes: 4
featured: false
order:
author: Jess Kinghorn - PCGamer
cover: cover.jpg
excerpt: "Một cảnh 25.000 cây cỏ động đậy có thể ngốn 80 GB bộ nhớ GPU. Nghiên cứu mới của AMD cắt con số đó xuống 98%, và cách làm thì đơn giản đến bực mình."
---

Mấy ông nghe tin gì chưa? Cây cỏ trong game — thứ tưởng vô hại nhất — lại đang là kẻ ngốn VRAM khủng khiếp nhất khi bật ray tracing. Và AMD vừa công bố một nghiên cứu cắt phăng **98%** lượng bộ nhớ đó.

## Con số trước và sau

Theo AMD, một cảnh khoảng **25.000 cây cỏ** được animate độc lập, tạo thành hàng trăm nghìn tam giác, có thể hút tới **80 GB** bộ nhớ GPU. Chưa hết: một chiếc **Radeon RX 9070 XT** cần tới **300 ms mỗi frame** chỉ để kiểm tra bề mặt nào trong cảnh đang giao với tia sáng (cấu trúc dữ liệu quản lý việc này gọi là Bounding Volume Hierarchy — BVH). Nói ngắn gọn: chậm và giật kinh khủng.

**Holger Gruen**, Fellow thuộc chương trình Advanced Graphics của AMD, chia sẻ trên GPUOpen rằng bản demo dùng "lồng tứ diện" (tetrahedral cage) của họ chỉ tốn:

> "1,7 GB bộ nhớ BVH và khoảng 3,3 ms cho toàn bộ cập nhật BVH mỗi frame."

Từ 80 GB xuống **1,7 GB**, từ 300 ms xuống **3,3 ms**. Số đẹp tới mức phải đọc lại hai lần.

## Mẹo nằm ở chỗ đừng đuổi theo từng cái lá

Ý tưởng thế này: thay vì để tia sáng đi truy từng cái lá đang rung rinh trong gió, người ta bọc cả cụm cây bằng một cái "lồng" tứ diện đơn giản. Khi animate, **chỉ có cái lồng biến dạng**, còn hình học dày đặc bên trong đứng yên và tái sử dụng được. Tia sáng được đưa ngược về hệ quy chiếu tĩnh rồi mới tính giao cắt với đám tam giác.

> "Chi phí animation chỉ tăng theo độ phức tạp của lồng, chứ không theo số lượng tam giác. Đánh đổi là mất quyền kiểm soát animation ở từng đỉnh, nhưng điều đó ổn với nhiều loại animation," Gruen giải thích.

Nghĩa là với một cánh đồng cây cỏ rung rinh, dev gần như chẳng tiếc gì. Nhưng với một cái cây "có cá tính" cần animate tỉ mỉ từng nhánh thì kỹ thuật này không hợp.

## Đừng vội hí hửng

Tỉnh táo một chút: đây vẫn là **demo nghiên cứu**, chưa phải tính năng sắp có trong game nào. Dù vậy đội ngũ nói họ đang "làm việc cật lực" để cho ra các mẫu DXR và một thư viện C++ header-only, giúp dựng lồng tứ diện chất lượng cao cho vật thể skinned, vật thể animate theo keyframe lẫn vật thể tĩnh. Bài nghiên cứu mở cũng đã có tên: *Ray Tracing Massive Amounts of Animated Geometry*.

Nếu kỹ thuật này đi được vào engine thật, nó có nghĩa là ray tracing đám cây cối bớt là đặc quyền của card đầu bảng. Trong bối cảnh giá GPU và RAM đang leo thang như mấy tháng qua, bất kỳ thứ gì tiết kiệm được VRAM đều đáng hoan nghênh.

Anh em nghĩ sao — ray tracing cây cối có đáng để ngành đổ công sức tối ưu tới mức này không, hay thà dành sức cho thứ khác? Comment cho Cenix nghe ý mấy pa với.

*Nguồn tham khảo: [PC Gamer](https://www.pcgamer.com/hardware/graphics-cards/touch-grass-not-when-amd-has-whittled-down-ray-tracing-memory-usage-by-98-percent-for-these-hardware-sapping-bushes-and-trees/)*
