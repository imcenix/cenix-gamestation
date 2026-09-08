---
title: "Mod DLSS 5 đẩy Neural Rendering sang card thứ hai — gần như xoá sạch cái giá phải trả"
slug: dlss-5-mod-card-thu-hai-gan-mien-phi
category: tin-tuc
date: 2026-09-08
read_minutes: 4
featured: false
order:
author: Dave James - PCGamer
cover: cover.jpg
excerpt: "DLSS Neural Rendering đẹp thì đẹp nhưng ăn tới 50-60% khung hình. Một modder vừa nghĩ ra cách né: quăng hết phần đó sang GPU thứ hai. Một khi đã máu thì đừng hỏi bố cháu là ai nữa!"
---

Mấy pa mê phần cứng ngồi xuống uống miếng nước rồi nghe nè. DLSS 5 — hay đúng tên Nvidia đang gọi là DLSS Neural Rendering — đẹp thì khỏi bàn, nhưng cái giá thì kinh khủng: chính Nvidia thừa nhận mức hụt khung hình dự kiến là **50-60%**. Bật lên là máy khóc.

Và rồi cộng đồng mod làm điều mà cộng đồng mod luôn làm: tìm cách lách.

## Ý tưởng đơn giản đến khó chịu

Một dev vừa tung ra file add-on cho ReShade, cho phép **GPU thứ hai** nhận khung hình đã render xong, chạy riêng bước neural rendering trên card đó rồi xuất ra màn hình của chính nó. Nói cách khác: card chính lo dựng hình, card phụ lo phần AI làm đẹp. Cái hố hiệu năng khổng lồ kia gần như bị san phẳng.

Bộ dựng thử nghiệm dùng model chạy cục bộ (Qwen3.8-27B-Q6_K) trên LM Studio với **cặp RTX 5060 Ti 16 GB** — nghĩa là không cần hai con card đầu bảng, hai tấm tầm trung là đã có chuyện để kể.

## Nhưng khoan đã, đừng vội tháo thùng máy

Tác giả nói rất rõ: đây **chưa phải bản dùng được cho người dùng cuối**. Nó được công bố chủ yếu để cộng đồng nghiên cứu tiếp, và mới chỉ chạy thử trên đúng **một cỗ máy với ba tựa game**. Nghĩa là muốn biết nó có ổn với cấu hình của mấy ông hay không thì... hên xui.

Chi tiết vui nhất: phần lõi C++ được viết chủ yếu bằng AI, và chính tác giả kể lại rằng AI có tặng kèm vài chẩn đoán sai bét nhưng trình bày cực kỳ tự tin, định dạng đẹp đẽ. Nghe quen không mấy ông?

## Điều này nói gì về DLSS 5?

Chuyện một modder phải huy động cả GPU thứ hai mới gánh nổi bộ lọc AI cho thấy DLSS Neural Rendering ở thời điểm này vẫn còn rất nặng. Với người chơi bình thường chỉ có một card, lựa chọn vẫn là: bật để đẹp hơn và chấp nhận rớt hơn nửa khung hình, hoặc tắt cho lành.

Anh em có sẵn cắm thêm một card cũ vào máy chỉ để gánh DLSS 5 không? Hay đằng nào cũng tắt cho khỏe? Ai đang xài combo hai GPU thì khoe cấu hình dưới comment cho Cenix mở mang với!

*Nguồn tham khảo: [PC Gamer](https://www.pcgamer.com/hardware/graphics-cards/new-dlss-5-mod-offloads-neural-rendering-to-a-second-card-massively-cutting-the-ai-filters-performance-hit/)*
