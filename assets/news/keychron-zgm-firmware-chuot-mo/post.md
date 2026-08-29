---
title: "Keychron làm firmware chuột gaming open-source — 'thứ bạn không đọc được, không kiểm tra được, không sửa được'"
slug: keychron-zgm-firmware-chuot-mo
category: tin-tuc
date: 2026-07-30
read_minutes: 3
featured: false
order:
author: James Bentley - PCGamer
cover: cover.jpg
excerpt: "Bàn phím có QMK và ZMK. Chuột thì có... không gì cả. Keychron quyết định tự làm, gọi tên ZGM, ra mắt Q1 2027."
---

Để Cenix kể cho nghe một tin mà dân mê tự vọc chắc chắn thích. Keychron — hãng đã có tiếng là người bảo vệ open-source suốt mấy năm qua — vừa tuyên bố sẽ mở luôn firmware chuột gaming.

## "Chuột thì có… không gì cả"

Keychron lâu nay đã có hẳn một **Open Source Design Project**, nơi hãng đăng file để anh em tuỳ biến bàn phím, và hãng còn dùng **ZMK và QMK** — các phần mềm open-source cho bàn phím. Nhưng firmware chuột thì bị bỏ rơi. Cho đến giờ.

Keychron công bố trên X rằng họ đang phát triển **ZGM (Zephyr Gaming Mouse)**, phần mềm chuột gaming open-source cho chuột của hãng, dự kiến **ra mắt đầu năm 2027 (Q1 2027)**.

Câu tuyên bố của hãng nghe khá gắt:

> "Mọi con chuột gaming trên thị trường đều chạy firmware mà bạn không thể đọc, không thể kiểm tra, không thể thay đổi. Nên chúng tôi tự làm luôn."

Và họ cà khịa thẳng: "Bàn phím có QMK. Có ZMK. Chuột thì có… không gì cả. 🔒"

## ZGM có gì trong ruột

Hãng đã lập một website riêng tại **zgm.gg** để giải thích lợi ích và nguồn gốc dự án. Phần mềm được xây trên **Zephyr RTOS**, thiết kế theo hướng **scalable và modular** — nghĩa là nó hỗ trợ nhiều biến thể hardware, và làm việc được với các sensor, nút, scroll wheel khác nhau **mà không phải viết lại từ đầu**.

Nó cũng được thiết kế cho **low-latency input**, hỗ trợ cả chuột **có dây và không dây**. Điểm hay nhất của open-source: anh em có thể **contribute hoặc fork** để tự build bản riêng.

Keychron cho biết ZGM sẽ chạy được với **G6 HE** vừa ra mắt — con chuột không dây **46 g** với pin tháo rời được, switch **hybrid optical/magnetic**, kèm một cái charging puck khá ngon.

## Nhưng đừng kỳ vọng cắm là chạy mọi nơi

Open-source tốt thật, nhưng nó không tự nhiên chạy với mọi thứ. Firmware thường cần fine-tune cho từng phần cứng cụ thể, và đó là lý do Keychron nói rõ nó sẽ hoạt động với G6 HE. Về lý thuyết, vì mã mở nên ai đó có thể tinh chỉnh cho hardware chưa tương thích.

Hiện dự án đã có **repo GitHub công khai** tại `github.com/Keychron/zgm`, nhưng Keychron lưu ý nó "đang ở giai đoạn thiết lập ban đầu" — phần lớn chỉ là project scaffolding, file policy và định hướng ban đầu.

Cenix thích cách nghĩ này: càng nhiều dự án open-source ngoài kia, càng nhiều khả năng các hãng khác phải làm theo. Và khi anh em có cùng một "ngôn ngữ" cho cả chuột lẫn bàn phím Keychron thì đời dễ hơn nhiều.

Mấy ông có bao giờ đổi firmware cho phím/chuột của mình chưa? Hay để nguyên bản cho lành? Kể Cenix nghe với!

*Nguồn tham khảo: [PC Gamer](https://www.pcgamer.com/hardware/gaming-mice/keychrons-gaming-mouse-firmware-is-going-open-source-while-the-company-critiques-firmware-you-cant-read-cant-audit-cant-change/)*
