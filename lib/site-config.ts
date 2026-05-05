import { CategoryConfig } from "@/types/catalog";

export const siteConfig = {
  name: "Asia Lighting",
  legalName: "Công ty TNHH THƯƠNG MẠI HOÀNG MAI LINH",
  domain: "https://asialighting.vn",
  phone: "086.292.1001",
  phoneHref: "tel:0862921001",
  phoneSouth: "0901.861.161",
  phoneSouthHref: "tel:0901861161",
  zaloHref: "https://zalo.me/0862921001",
  messengerHref: "https://m.me/asialighting.vn",
  email: "kinhdoanh@asialighting.vn",
  address: "Số nhà 27, ngõ 40, ngách 65 phố Ngọc Trục, Phường Đại Mỗ, Thành phố Hà Nội, Việt Nam",
  factoryAddress: "Cụm Công Nghiệp Duyên Thái, xã Ngọc Hồi, Hà Nội, Việt Nam",
  branchAddress: "71/1G Khu phố Đông An 2, phường Bình Hòa, Hồ Chí Minh, Việt Nam",
  taxCode: "0111444177",
  mapEmbed:
    "https://www.google.com/maps?q=20.9856,105.8372&z=15&output=embed",
  defaultDescription:
    "Asia Lighting chuyên cung cấp đèn LED, thiết bị điện, điện gia dụng và thiết bị nước chất lượng cao cho nhà ở, công trình và dự án.",
  keywords: [
    "đèn led",
    "thiết bị điện",
    "điện gia dụng",
    "thiết bị nước",
    "asia lighting",
    "asialighting.vn"
  ],
  socialLinks: {
    instagram: "https://instagram.com/asialighting",
    tiktok: "https://tiktok.com/@asialighting",
    youtube: "https://youtube.com/@asialighting",
    facebook: "https://facebook.com/asialighting"
  },
  policies: [
    { label: "Điều khoản và quy định chung", href: "/chinh-sach/dieu-khoan" },
    { label: "Chính sách thanh toán", href: "/chinh-sach/thanh-toan" },
    { label: "Chính sách đổi - trả hàng", href: "/chinh-sach/doi-tra" },
    { label: "Chính sách kiểm hàng", href: "/chinh-sach/kiem-hang" },
    { label: "Chính sách bảo mật thông tin", href: "/chinh-sach/bao-mat" },
    { label: "Chính sách xử lý khiếu nại", href: "/chinh-sach/khieu-nai" },
    { label: "Chính sách bảo hành", href: "/chinh-sach/bao-hanh" },
    { label: "Chính sách vận chuyển", href: "/chinh-sach/van-chuyen" }
  ]
};

export const categoryConfigs: CategoryConfig[] = [
  {
    slug: "led-chieu-sang",
    rootFolder: "Trang-LED-chieu-sang",
    label: "Đèn LED",
    shortDescription: "Giải pháp chiếu sáng LED cho nhà ở, showroom và dự án.",
    heroTitle: "Đèn LED chiếu sáng chất lượng cao",
    seoDescription:
      "Danh mục đèn LED chiếu sáng với nhiều mẫu âm trần, ốp nổi, panel, tuýp, ngoài trời và trang trí."
  },
  {
    slug: "dien-gia-dung",
    rootFolder: "Trang-dien-gia-dung",
    label: "Điện gia dụng",
    shortDescription: "Thiết bị gia dụng tiện nghi, bền bỉ và dễ lắp đặt.",
    heroTitle: "Thiết bị điện gia dụng tiện lợi cho mọi không gian",
    seoDescription:
      "Tổng hợp sản phẩm điện gia dụng phục vụ gia đình, văn phòng và cửa hàng với mẫu mã đa dạng."
  },
  {
    slug: "thiet-bi-dien",
    rootFolder: "Trang-thiet-bi-dien",
    label: "Thiết bị điện",
    shortDescription: "Thiết bị điện dân dụng và công trình tối ưu vận hành.",
    heroTitle: "Thiết bị điện an toàn, ổn định và thẩm mỹ",
    seoDescription:
      "Danh mục thiết bị điện phục vụ công trình dân dụng và thương mại với nhiều tùy chọn theo nhu cầu."
  },
  {
    slug: "thiet-bi-nuoc",
    rootFolder: "Trang-thiet-bi-nuoc",
    label: "Thiết bị nước",
    shortDescription: "Phụ kiện và thiết bị nước phù hợp nhà ở, khách sạn, dự án.",
    heroTitle: "Thiết bị nước bền đẹp, dễ thi công",
    seoDescription:
      "Thiết bị nước và phụ kiện vệ sinh với nhiều mẫu cao cấp, tối ưu thẩm mỹ và độ bền."
  }
];

export const keySubcategories: Record<string, string[]> = {
  "led-chieu-sang": [
    "den-op-tran-noi",
    "den-trang-tri-gan-tuong",
    "den-led-am-tran-tong-hop",
    "den-tran-noi-led-den-ong-bo-led",
    "den-pha-led",
    "den-duong-led",
    "den-nha-xuong-led",
    "den-roi-ray-roi-ngoi-led",
    "den-su-co-den-chi-dan-exit",
    "den-led-panel-vuong-sieu-mong",
    "den-tuyp-led",
    "mang-den-tuyp-led",
    "den-led-day-trang-tri",
    "den-am-tuong",
    "den-ban-hoc-sinh",
    "den-led-tron",
    "den-roi-ngoai-troi",
    "den-guong-cao-cap",
    "den-tuong-nang-luong-mat-troi-02-03-tia-sang"
  ],
  "thiet-bi-dien": [
    "quat-hut-gio-am-tran",
    "quat-hut-gio-gan-tuong",
    "quat-hut-gio-noi-ong"
  ],
  "dien-gia-dung": [
    "quat-tran-cao-cap",
    "den-suoi-cao-cap",
    "vot-muoi-cao-cap-den-diet-con-trung"
  ]
};
