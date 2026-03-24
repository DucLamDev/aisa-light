import { titleFromSlug } from "@/lib/utils";

const subcategoryLabels: Record<string, string> = {
  "am-sieu-toc": "Ấm siêu tốc",
  "bep-dien-tu": "Bếp điện từ",
  "bep-dien-tu-doi": "Bếp điện từ đôi",
  "den-pin-cam-tay": "Đèn pin cầm tay",
  "den-pin-doi-dau-cao-cap": "Đèn pin đội đầu cao cấp",
  "den-suoi-cao-cap": "Đèn sưởi cao cấp",
  "quat-cay-cao-cap": "Quạt cây cao cấp",
  "quat-tran-cao-cap": "Quạt trần cao cấp",
  "tu-say-quan-ao": "Tủ sấy quần áo",
  "vot-muoi-cao-cap-den-diet-con-trung": "Vợt muỗi cao cấp đèn diệt côn trùng",
  "den-am-tuong": "Đèn âm tường",
  "den-ban-hoc-sinh": "Đèn bàn học sinh",
  "den-duong-led": "Đèn đường LED",
  "den-guong-cao-cap": "Đèn gương cao cấp",
  "den-led-am-tran": "Đèn LED âm trần",
  "den-led-day-trang-tri": "Đèn LED dây trang trí",
  "den-led-op-noi-mat-phang": "Đèn LED ốp nổi mặt phẳng",
  "den-led-op-noi-pha-le": "Đèn LED ốp nổi pha lê",
  "den-led-op-noi-sieu-sang": "Đèn LED ốp nổi siêu sáng",
  "den-led-op-noi-than-nhua-dob": "Đèn LED ốp nổi thân nhựa DOB",
  "den-led-panel-tron-sieu-mong": "Đèn LED panel tròn siêu mỏng",
  "den-led-panel-vuong-sieu-mong": "Đèn LED panel vuông siêu mỏng",
  "den-led-tron": "Đèn LED tròn",
  "den-nha-xuong-led": "Đèn nhà xưởng LED",
  "den-pha-led": "Đèn pha LED",
  "den-roi-ngoai-troi": "Đèn rọi ngoài trời",
  "den-roi-ray-roi-ngoi-led": "Đèn rọi ray, rọi ngồi LED",
  "den-su-co-den-chi-dan-exit": "Đèn sự cố, đèn chỉ dẫn Exit",
  "den-tran-noi-led-den-ong-bo-led": "Đèn trần nổi LED, đèn ống bơ LED",
  "den-tuong-1-dau": "Đèn tường 1 đầu",
  "den-tuong-2-dau": "Đèn tường 2 đầu",
  "den-tuong-nang-luong-mat-troi-02-03-tia-sang":
    "Đèn tường năng lượng mặt trời 2-3 tia sáng",
  "den-tuong-trang-tri": "Đèn tường trang trí",
  "den-tuyp-led": "Đèn tuýp LED",
  "mang-den-tuyp-led": "Máng đèn tuýp LED",
  "op-noi-da-nang": "Ốp nổi đa năng",
  "op-noi-tron-van-go-thiet-ke-moi": "Ốp nổi tròn vân gỗ thiết kế mới",
  "bang-keo-cach-dien": "Băng keo cách điện",
  "but-thu-dien-cao-cap-asia-lighting": "Bút thử điện cao cấp Asia Lighting",
  "cam-bien-dui-den-cam-ung": "Cảm biến đui đèn cảm ứng",
  "cau-dao-bo-cau-dao-tu-dong-vo-den": "Cầu dao, bộ cầu dao tự động vỏ đen",
  "cau-dao-bo-cau-dao-tu-dong-vo-trang": "Cầu dao, bộ cầu dao tự động vỏ trắng",
  "cau-dau-nhanh": "Cầu đấu nhanh",
  "day-den-trang-tri": "Dây đèn trang trí",
  "o-cam-da-nang-lien-day": "Ổ cắm đa năng liền dây",
  "quat-hut-gio-am-tran": "Quạt hút gió âm trần",
  "quat-hut-gio-gan-tuong": "Quạt hút gió gắn tường",
  "quat-hut-gio-noi-ong": "Quạt hút gió nối ống",
  "thuoc-cuon": "Thước cuộn",
  "tu-dien-am-tuong-mat-kinh-mat-cat-kim-cuong":
    "Tủ điện âm tường mặt kính mặt cắt kim cương",
  "tu-dien-am-tuong-mat-mo": "Tủ điện âm tường mặt mờ",
  "cai-voi-xit-ve-sinh": "Cài vòi xịt vệ sinh",
  "day-cap-voi-xit-ve-sinh": "Dây cấp vòi xịt vệ sinh",
  "voi-xit-cao-cap": "Vòi xịt cao cấp"
};

export function getSubcategoryDisplayName(slug: string) {
  return subcategoryLabels[slug] ?? titleFromSlug(slug);
}

export function formatProductDisplayName(
  subcategoryName: string,
  modelCode: string,
  index: number
) {
  const normalizedModel = modelCode.trim();
  if (normalizedModel && normalizedModel !== "Liên hệ để nhận mã") {
    return `${subcategoryName} ${normalizedModel}`;
  }

  return `${subcategoryName} mẫu ${String(index + 1).padStart(2, "0")}`;
}
