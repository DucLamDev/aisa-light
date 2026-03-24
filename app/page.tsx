import Image from "next/image";
import { BannerSlider } from "@/components/layout/banner-slider";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import {
  BadgeIcon,
  DeliveryIcon,
  FactoryIcon,
  HeadsetIcon,
  PhoneIcon,
  ShieldCheckIcon,
  WalletIcon,
  WrenchIcon
} from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

const quickStats = [
  { end: 10, suffix: "+", label: "Năm kinh nghiệm" },
  { end: 1000, suffix: "+", label: "Sản phẩm đa dạng" },
  { end: 5000, suffix: "+", label: "Khách hàng tin dùng" },
  { end: 63, suffix: "", label: "Tỉnh thành giao hàng" }
];

const trustStats = [
  { end: 10, suffix: "+", label: "Năm hoạt động", color: "from-orange-500 to-orange-600" },
  { end: 5000, suffix: "+", label: "Khách hàng", color: "from-slate-900 to-slate-800" },
  { end: 100, suffix: "%", label: "Chính hãng", color: "from-slate-900 to-slate-800" },
  { end: 63, suffix: "", label: "Tỉnh thành", color: "from-orange-500 to-orange-600" }
];

const benefits = [
  {
    icon: FactoryIcon,
    title: "Nhà máy sản xuất",
    desc: "Chủ động sản xuất và kiểm soát chất lượng ngay từ đầu vào cho đến thành phẩm."
  },
  {
    icon: ShieldCheckIcon,
    title: "Sản phẩm chính hãng",
    desc: "Nguồn gốc rõ ràng, tem nhãn đầy đủ và chính sách bảo hành minh bạch."
  },
  {
    icon: DeliveryIcon,
    title: "Giao hàng toàn quốc",
    desc: "Hỗ trợ vận chuyển nhanh và đóng gói cẩn thận cho đơn lẻ lẫn dự án."
  },
  {
    icon: HeadsetIcon,
    title: "Tư vấn miễn phí",
    desc: "Đội ngũ kỹ thuật luôn sẵn sàng tư vấn giải pháp phù hợp từng nhu cầu."
  }
];

const commitments = [
  {
    icon: BadgeIcon,
    title: "Bảo hành chính hãng",
    desc: "Tất cả sản phẩm được bảo hành theo chính sách chính hãng, hỗ trợ đổi trả nhanh."
  },
  {
    icon: WalletIcon,
    title: "Giá cạnh tranh",
    desc: "Mức giá ổn định, tối ưu cho mua lẻ, công trình và đơn hàng số lượng lớn."
  },
  {
    icon: WrenchIcon,
    title: "Hỗ trợ kỹ thuật",
    desc: "Đồng hành từ tư vấn thông số, lựa chọn model đến hỗ trợ lắp đặt và sử dụng."
  }
];

export default async function HomePage() {
  const catalog = await getCatalog();
  const featuredProducts = catalog.flatMap((category) => category.products).slice(0, 6);

  return (
    <>
      <BannerSlider />

      <div className="border-b border-orange-100 bg-white">
        <Container className="py-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickStats.map((stat, i) => (
              <AnimateOnScroll animation="fade-up" delay={i * 80} key={stat.label}>
                <div className="rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50 to-white p-4 text-center shadow-[0_12px_30px_rgba(249,115,22,0.08)]">
                  <CountUp
                    className="text-xl font-black tracking-tight text-orange-600 sm:text-3xl"
                    end={stat.end}
                    suffix={stat.suffix}
                  />
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <AnimateOnScroll animation="fade-up">
          <SectionHeading
            description="Chọn nhóm sản phẩm phù hợp nhu cầu của bạn để xem chi tiết và nhận báo giá nhanh nhất."
            eyebrow="Danh mục sản phẩm"
            title="Khám phá các nhóm sản phẩm"
          />
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={200}>
          <div className="mt-8">
            <CategoryGrid items={catalog} type="category" />
          </div>
        </AnimateOnScroll>
      </Container>

      <div className="bg-gradient-to-b from-orange-50/60 to-white">
        <Container className="py-10 sm:py-14">
          <AnimateOnScroll animation="fade-up">
            <SectionHeading
              description="Các mẫu sản phẩm bán chạy được khách hàng lựa chọn nhiều, phù hợp cho nhà ở và công trình."
              eyebrow="Sản phẩm nổi bật"
              title="Những model được quan tâm nhiều"
            />
          </AnimateOnScroll>
          <AnimateOnScroll animation="slide-up" delay={150}>
            <div className="mt-8">
              <ProductGrid products={featuredProducts} />
            </div>
          </AnimateOnScroll>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <AnimateOnScroll animation="fade-up">
          <SectionHeading
            description="Hơn 10 năm kinh nghiệm cung cấp thiết bị điện và chiếu sáng cho hàng nghìn công trình trên toàn quốc."
            eyebrow="Về chúng tôi"
            title="Tại sao nên chọn Asia Lighting?"
          />
        </AnimateOnScroll>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, i) => (
            <AnimateOnScroll animation="zoom-in" delay={i * 120} key={item.title}>
              <div className="h-full rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-float sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>

      <div className="bg-slate-900 text-white">
        <Container className="py-10 sm:py-14">
          <AnimateOnScroll animation="fade-up">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-400">
                Quy trình
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Mua hàng dễ dàng chỉ với 4 bước</h2>
            </div>
          </AnimateOnScroll>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Chọn sản phẩm", desc: "Duyệt danh mục và chọn đúng model bạn cần." },
              { step: "02", title: "Liên hệ báo giá", desc: "Gọi điện, nhắn Zalo hoặc Messenger để nhận giá tốt." },
              { step: "03", title: "Xác nhận đơn hàng", desc: "Thống nhất số lượng, model và địa chỉ giao." },
              { step: "04", title: "Giao hàng tận nơi", desc: "Đóng gói cẩn thận và giao nhanh trên toàn quốc." }
            ].map((item, i) => (
              <AnimateOnScroll animation="fade-up" delay={i * 150} key={item.step}>
                <div className="relative rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur sm:p-6">
                  <span className="text-3xl font-black text-orange-500 sm:text-4xl">{item.step}</span>
                  <h3 className="mt-3 text-base font-bold sm:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        <AnimateOnScroll animation="fade-up">
          <SectionHeading
            description="Asia Lighting cam kết mang đến sản phẩm chất lượng cao và dịch vụ hậu mãi rõ ràng."
            eyebrow="Cam kết"
            title="Giá trị mà chúng tôi mang lại"
          />
        </AnimateOnScroll>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {commitments.map((item, i) => (
            <AnimateOnScroll animation="fade-up" delay={i * 120} key={item.title}>
              <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-orange-50/40 p-5 shadow-soft sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>

      <div className="bg-gradient-to-br from-orange-50 via-white to-slate-50">
        <Container className="py-10 sm:py-14">
          <AnimateOnScroll animation="fade-up">
            <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-[0_22px_60px_rgba(15,23,42,0.08)] sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-semibold text-orange-600">
                    Uy tín hàng đầu
                  </span>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-4xl">
                    Được hàng nghìn khách hàng và đối tác tin tưởng
                  </h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Từ hộ gia đình đến dự án lớn, Asia Lighting luôn đồng hành cung cấp giải pháp chiếu sáng và
                    thiết bị điện tối ưu.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-orange-600"
                      href={siteConfig.phoneHref}
                    >
                      <Image alt="Gọi" className="object-contain" height={18} src="/logo/phone.png" width={18} />
                      Gọi tư vấn
                    </a>
                    <a
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:border-orange-300"
                      href={siteConfig.zaloHref}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Image alt="Zalo" height={18} src="/logo/zalo.webp" width={18} />
                      Chat Zalo
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {trustStats.map((item, i) => (
                    <AnimateOnScroll animation="zoom-in" delay={i * 100} key={item.label}>
                      <div className={`rounded-[1.6rem] bg-gradient-to-br ${item.color} p-5 text-center text-white shadow-soft`}>
                        <CountUp className="text-2xl font-black sm:text-4xl" end={item.end} suffix={item.suffix} />
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70 sm:text-sm">{item.label}</p>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </div>

      <AnimateOnScroll animation="fade-up">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600">
          <Container className="py-10 sm:py-14">
            <div className="text-center text-white">
              <h2 className="text-xl font-bold sm:text-3xl">Bạn cần báo giá hoặc tư vấn giải pháp chiếu sáng?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/90 sm:text-base">
                Liên hệ ngay với đội ngũ Asia Lighting để được hỗ trợ nhanh và đề xuất đúng nhu cầu của bạn.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-orange-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:px-8 sm:py-3.5"
                  href={siteConfig.phoneHref}
                >
                  <PhoneIcon className="h-4 w-4" />
                  Gọi ngay: {siteConfig.phone}
                </a>
                <a
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-orange-600 sm:w-auto sm:px-8 sm:py-3.5"
                  href={siteConfig.zaloHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Image alt="Zalo" height={18} src="/logo/zalo.webp" width={18} />
                  Chat Zalo ngay
                </a>
              </div>
            </div>
          </Container>
        </div>
      </AnimateOnScroll>
    </>
  );
}
