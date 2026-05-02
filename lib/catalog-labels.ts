import { titleFromSlug } from "@/lib/utils";

const subcategoryLabels: Record<string, string> = {
  // === Điện gia dụng ===
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

  // === LED chiếu sáng - Danh mục con cấp 1 ===
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

  // === Đèn LED tròn - Sub-subcategories ===
  "den-tron-trang-tri": "Đèn tròn trang trí",
  "den-tron-e14": "Đèn tròn E14",
  "den-tron-cong-xuat-nho": "Đèn tròn công suất nhỏ",
  "den-tron-cong-suat-lon": "Đèn tròn công suất lớn",
  "den-tron-cam-ung": "Đèn tròn cảm ứng",
  "den-tron-cong-suat-lon-kieu-tru-model-dob": "Đèn tròn trụ model DOB",
  "den-tron-cong-suat-lon-kieu-tru-model-dt": "Đèn tròn trụ model DT",
  "den-tron-cong-suat-lon-kieu-tru-model-dtr": "Đèn tròn trụ model DTR",

  // === Đèn LED âm trần - Sub-subcategories ===
  "am-tran-mat-kinh-cob": "Âm trần mặt kính COB",
  "am-tran-mat-kinh-mo-dob": "Âm trần mặt kính mờ DOB",
  "am-tran-mat-lom-cob": "Âm trần mặt lõm COB",
  "am-tran-mat-lom-cob-chong-loa": "Âm trần mặt lõm COB chống lóa",
  "am-tran-mat-lom-thau-kinh-dob": "Âm trần mặt lõm thấu kính DOB",
  "am-tran-mat-lom-vien-trang": "Âm trần mặt lõm viền trắng",
  "am-tran-mat-lom-vien-vang": "Âm trần mặt lõm viền vàng",
  "am-tran-mat-lom-vien-vang-nhat": "Âm trần mặt lõm viền vàng nhạt",
  "am-tran-mat-trang": "Âm trần mặt trắng",
  "am-tran-mat-trang-nguon-lien-than": "Âm trần mặt trắng nguồn liền thân",
  "am-tran-mat-trang-than-nhom-dob": "Âm trần mặt trắng thân nhôm DOB",
  "am-tran-mat-trang-tron-dob": "Âm trần mặt trắng tròn DOB",
  "am-tran-mat-trang-tron-nguon-lien-than": "Âm trần mặt trắng tròn nguồn liền thân",
  "am-tran-mat-trang-vuong": "Âm trần mặt trắng vuông",
  "am-tran-mat-vang": "Âm trần mặt vàng",
  "am-tran-mat-vang-nguon-lien-than": "Âm trần mặt vàng nguồn liền thân",
  "am-tran-mat-vang-than-nhom-dob": "Âm trần mặt vàng thân nhôm DOB",
  "am-tran-than-nhua-dob": "Âm trần thân nhựa DOB",
  "am-tran-tron-mat-den": "Âm trần tròn mặt đen",
  "am-tran-vien-mau": "Âm trần viền màu",
  "am-tran-vien-trang-than-nhom-nguon-roi": "Âm trần viền trắng thân nhôm nguồn rời",
  "am-tran-vien-trang-tron-than-nhom-nguon-roi": "Âm trần viền trắng tròn thân nhôm nguồn rời",
  "am-tran-vien-vang-than-nhom-nguon-roi": "Âm trần viền vàng thân nhôm nguồn rời",
  "am-tran-vuong": "Âm trần vuông",
  "am-tran-vuong-than-trang-choa-den": "Âm trần vuông thân trắng chóa đen",
  "am-tran-vuong-than-trang-choa-trang": "Âm trần vuông thân trắng chóa trắng",
  "am-trann-vuong-mat-den": "Âm trần vuông mặt đen",

  // === Đèn pha LED - Sub-subcategories ===
  "den-pha-led-fl-bao-hanh-24-thang": "Đèn pha LED FL bảo hành 24 tháng",
  "den-pha-led-fle-bao-hanh-24-thang": "Đèn pha LED FLE bảo hành 24 tháng",
  "den-pha-led-flh-bao-hanh-12-thang": "Đèn pha LED FLH bảo hành 12 tháng",
  "den-pha-led-fls-smd-chip": "Đèn pha LED FLS SMD chip",
  "den-pha-led-flx-smd-chip": "Đèn pha LED FLX SMD chip",
  "den-pha-nang-luong-mat-troi": "Đèn pha năng lượng mặt trời",

  // === Đèn rọi ray, rọi ngồi LED - Sub-subcategories ===
  "den-roi-dai-vo-den": "Đèn rọi dài vỏ đen",
  "den-roi-dai-vo-trang": "Đèn rọi dài vỏ trắng",
  "den-roi-ngoi-vo-trang-vo-den-rnt-rnd": "Đèn rọi ngồi vỏ trắng/đen RNT-RND",
  "den-roi-ray-vo-den-rd01": "Đèn rọi ray vỏ đen RD01",
  "den-roi-ray-vo-den-thau-kinh-rd02": "Đèn rọi ray vỏ đen thấu kính RD02",
  "den-roi-ray-vo-trang-den-rt03-rd03-rtd": "Đèn rọi ray RT03/RD03/RTD",
  "den-roi-ray-vo-trang-rt01": "Đèn rọi ray vỏ trắng RT01",
  "den-roi-ray-vo-trang-thau-kinh-rt02": "Đèn rọi ray vỏ trắng thấu kính RT02",
  "den-roi-vo-den-rd04": "Đèn rọi vỏ đen RD04",
  "den-roi-vo-den-rd06": "Đèn rọi vỏ đen RD06",
  "den-roi-vo-trang-rt04": "Đèn rọi vỏ trắng RT04",
  "den-roi-vo-trang-rt06": "Đèn rọi vỏ trắng RT06",
  "phu-kien-den-roi-ray": "Phụ kiện đèn rọi ray",

  // === Đèn đường LED - Sub-subcategories ===
  "den-duong-led-cob-chip": "Đèn đường LED COB chip",
  "den-duong-led-smd-chip": "Đèn đường LED SMD chip",
  "den-duong-nang-luong-mat-troi": "Đèn đường năng lượng mặt trời",

  // === Đèn bàn học sinh - Sub-subcategories ===
  "den-ban-hoc-sinh-db01": "Đèn bàn học sinh DB01",
  "den-ban-hoc-sinh-db02": "Đèn bàn học sinh DB02",
  "den-ban-hoc-sinh-db03": "Đèn bàn học sinh DB03",
  "den-ban-hoc-sinh-db04": "Đèn bàn học sinh DB04",
  "den-ban-hoc-sinh-db05": "Đèn bàn học sinh DB05",
  "den-ban-hoc-sinh-db06": "Đèn bàn học sinh DB06",
  "den-ban-hoc-sinh-db07": "Đèn bàn học sinh DB07",
  "den-ban-hoc-sinh-db08": "Đèn bàn học sinh DB08",

  // === Thiết bị điện ===
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

  // === Thiết bị nước ===
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
  index: number,
  rawFileName?: string
) {
  // If the filename already contains a readable product name (from crawl), use it
  if (rawFileName) {
    const cleaned = rawFileName
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    // If it looks like a real product name (has Vietnamese-like words or meaningful text)
    if (cleaned.length > 5 && /[a-zA-Z]{2,}/.test(cleaned)) {
      return cleaned;
    }
  }

  const normalizedModel = modelCode.trim();
  if (normalizedModel && normalizedModel !== "Liên hệ để nhận mã") {
    return `${subcategoryName} ${normalizedModel}`;
  }

  return `${subcategoryName} mẫu ${String(index + 1).padStart(2, "0")}`;
}
