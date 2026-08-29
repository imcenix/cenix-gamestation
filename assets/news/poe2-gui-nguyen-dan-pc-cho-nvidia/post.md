---
title: "Path of Exile 2 gửi nguyên dàn PC sang Nvidia để chứng minh bug — 1,5 năm săn lỗi khép lại bằng chai champagne"
slug: poe2-gui-nguyen-dan-pc-cho-nvidia
category: tin-tuc
date: 2026-08-02
read_minutes: 4
featured: false
order:
author: Tyler Colp - PCGamer
cover: cover.jpg
excerpt: "Grinding Gear Games đóng thùng cả PC, màn hình, chuột lẫn bàn phím gửi cho Nvidia. Vì Nvidia không tin lỗi phổ biến tới mức đó. Một khi đã máu thì đừng hỏi bố cháu là ai nữa!"
---

Hội nghiện ARPG ơi, để Cenix kể cho nghe câu chuyện săn bug điên rồ nhất tháng này. Suốt gần **1,5 năm**, người chơi Path of Exile 2 phải sống chung với cảnh game đứng hình mỗi 20 phút, treo cứng khoảng 30 giây rồi mới hồi lại. Cả đống thread trên Reddit than trời. Giải pháp duy nhất là hạ một thiết lập đồ hoạ xuống mức xấu hơn hẳn.

Tuần này, cuộc chiến đó chính thức kết thúc.

## Bắt đầu từ những phát bắn trong bóng tối

Nguyên nhân là lỗi shader khiến GPU crash, rồi game phải nạp lại toàn bộ texture, shader và cả engine mà không đóng ứng dụng — đó là lý do màn hình đứng im hàng chục giây.

Ban đầu, GGG cử người ngồi chơi liên tục nhiều giờ với hy vọng game sẽ crash. Game director **Jonathan Rogers** mô tả:

> "Lúc đó bạn thật sự chỉ đang bắn đại trong bóng tối thôi."

Không tìm ra cách sửa, đội ngũ bèn xây một hệ thống ít nhất giúp game không sập hẳn. Rồi họ vẫn quyết đào tận gốc: bổ sung hàng loạt cơ chế để engine ghi lại dữ liệu, kèm một hệ thống replay chuyên dụng có thể phát lại các phiên chơi dài hàng giờ trên dàn PC khắp văn phòng.

> "Cuối cùng, với replay và một khối lượng công việc khủng khiếp từ đội engine, chúng tôi tái hiện được lỗi khá ổn định. Chúng tôi có một bản replay khiến lỗi xảy ra trung bình mỗi 5 đến 7 phút."

## Và rồi họ đóng thùng cả cái máy

Vấn đề là Nvidia sẽ không sửa nếu không có các bước tái hiện cụ thể. Mà theo Rogers, "những bước đó tiếc thay không thể là 'cứ cày lên map top tier đi'".

> "Dù rốt cuộc đây là bug trong driver Nvidia và nó ảnh hưởng tới rất nhiều người chơi cấp cao, thẳng thắn mà nói, họ chỉ là không thật sự tin rằng nó phổ biến như chúng tôi nói."

Nên GGG làm điều duy nhất còn lại: gói bản replay vào một file, rồi gửi luôn nguyên bộ máy đang chạy nó sang Nvidia — "PC, màn hình, quái, chúng tôi bỏ vào cả chuột và bàn phím luôn".

Vài tuần sau, Nvidia quay lại với lời giải: tăng shader heap size là hết crash. Và đầu tuần này, **Nvidia Game Ready Driver 610.88** ra mắt kèm dòng ghi chú gọn lỏn: "Path of Exile 2: đã sửa lỗi treo dài không liên tục có thể xảy ra sau các phiên chơi kéo dài ở chế độ DX12."

Rogers chốt lại: "Cuộc trường chinh kết thúc rồi, giờ mấy anh engine của chúng tôi có thể quay lại tối ưu mấy vấn đề hiệu năng bình thường hơn" — rồi khui champagne ăn mừng ngay tại chỗ.

Path of Exile 2 dự kiến lên **1.0** trong năm nay. Hy vọng từ giờ tới đó không có con bug nào nữa dám ló mặt.

Mấy ông từng gặp lỗi nào dai dẳng tới mức phải đổi cả thiết lập đồ hoạ để sống chung với nó chưa? Comment kể Cenix nghe con bug lì đòn nhất mà mấy pa từng chịu đựng nha!

*Nguồn tham khảo: [PC Gamer](https://www.pcgamer.com/games/rpg/after-a-year-and-a-half-of-rigorous-testing-path-of-exile-2-devs-finally-convinced-nvidia-to-fix-a-driver-bug-by-sending-it-an-entire-pc/)*
