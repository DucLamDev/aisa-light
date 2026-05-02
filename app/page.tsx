import Image from "next/image";
import Link from "next/link";
import { BannerSlider } from "@/components/layout/banner-slider";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import {
  DeliveryIcon,
  FactoryIcon,
  HeadsetIcon,
  PhoneIcon,
  ShieldCheckIcon
} from "@/components/ui/icons";
import { getCatalog } from "@/lib/catalog";
import { keySubcategories, siteConfig } from "@/lib/site-config";

const features = [
  { icon: FactoryIcon, text: "Nhà máy sản xuất" },
  { icon: ShieldCheckIcon, text: "Chính hãng 100%" },
  { icon: DeliveryIcon, text: "Giao toàn quốc" },
  { icon: HeadsetIcon, text: "Tư vấn miễn phí" }
];

export default async function HomePage() {
  const catalog = await getCatalog();

  return (
    <>
      {/* Hero Banner */}
      <BannerSlider />

      {/* Feature bar */}
      <div className="border-b border-slate-100 bg-white">
        <Container className="py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {features.map((f) => (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm" key={f.text}>
                <f.icon className="h-4 w-4 text-orange-500 sm:h-5 sm:w-5" />
                {f.text}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Stats bar */}
      <div className="bg-slate-900">
        <Container className="py-4 sm:py-5">
          <div className="grid grid-cols-4 gap-2 text-center text-white">
            {[
              { end: 10, suffix: "+", label: "Năm kinh nghiệm" },
              { end: 1000, suffix: "+", label: "Sản phẩm" },
              { end: 5000, suffix: "+", label: "Khách hàng" },
              { end: 63, suffix: "", label: "Tỉnh thành" }
            ].map((s) => (
              <div key={s.label}>
                <CountUp className="text-lg font-black text-orange-400 sm:text-2xl" end={s.end} suffix={s.suffix} />
                <p className="mt-0.5 text-[10px] text-white/60 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Category Grid */}
      <Container className="py-8 sm:py-12">
        <AnimateOnScroll animation="fade-up">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">Danh mục sản phẩm</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Chọn nhóm sản phẩm phù hợp nhu cầu của bạn</p>
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll animation="fade-up" delay={100}>
          <CategoryGrid items={catalog} type="category" />
        </AnimateOnScroll>
      </Container>

      {/* Featured products per category */}
      {catalog.map((category) => {
        // Pick 1 product from each key subcategory to show a diverse set of key products
        const keySlugs = keySubcategories[category.slug] || [];
        const topProducts = category.subcategories
          .filter(sub => keySlugs.includes(sub.slug))
          .map((sub) => sub.products[0])
          .filter(Boolean)
          .slice(0, 10);
        if (topProducts.length === 0) return null;
        return (
          <div className="border-t border-slate-100" key={category.slug}>
            <Container className="py-6 sm:py-10">
              <AnimateOnScroll animation="fade-up">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-5 w-1 rounded-full bg-orange-500" />
                    <h2 className="text-sm font-bold text-slate-900 sm:text-lg">{category.label}</h2>
                  </div>
                  <Link className="text-xs font-semibold text-orange-500 hover:text-orange-600 sm:text-sm" href={`/${category.slug}`}>
                    Xem tất cả →
                  </Link>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up" delay={100}>
                <ProductGrid products={topProducts} />
              </AnimateOnScroll>
            </Container>
          </div>
        );
      })}

      {/* Why choose us */}
      <div className="bg-slate-50">
        <Container className="py-8 sm:py-12">
          <AnimateOnScroll animation="fade-up">
            <div className="mb-6 text-center">
              <h2 className="text-lg font-bold text-slate-900 sm:text-2xl">Tại sao chọn Asia Lighting?</h2>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              { icon: FactoryIcon, title: "Nhà máy sản xuất", desc: "Kiểm soát chất lượng từ đầu vào đến thành phẩm" },
              { icon: ShieldCheckIcon, title: "Chính hãng", desc: "Tem nhãn đầy đủ, chính sách bảo hành rõ ràng" },
              { icon: DeliveryIcon, title: "Giao hàng toàn quốc", desc: "Vận chuyển nhanh, đóng gói cẩn thận" },
              { icon: HeadsetIcon, title: "Tư vấn 24/7", desc: "Đội ngũ kỹ thuật sẵn sàng hỗ trợ mọi lúc" }
            ].map((item, i) => (
              <AnimateOnScroll animation="fade-up" delay={i * 80} key={item.title}>
                <div className="rounded-xl border border-slate-200 bg-white p-4 text-center transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:p-5">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-orange-500 sm:h-12 sm:w-12">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-3 text-xs font-bold text-slate-900 sm:text-sm">{item.title}</h3>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </div>

      {/* Process steps */}
      <div className="bg-slate-900 text-white">
        <Container className="py-8 sm:py-12">
          <AnimateOnScroll animation="fade-up">
            <h2 className="mb-6 text-center text-lg font-bold sm:text-2xl">Mua hàng dễ dàng</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { step: "01", title: "Chọn sản phẩm", desc: "Duyệt danh mục và chọn model" },
              { step: "02", title: "Liên hệ báo giá", desc: "Gọi điện hoặc nhắn Zalo" },
              { step: "03", title: "Xác nhận đơn", desc: "Thống nhất số lượng, model" },
              { step: "04", title: "Giao hàng", desc: "Đóng gói cẩn thận, giao nhanh" }
            ].map((item, i) => (
              <AnimateOnScroll animation="fade-up" delay={i * 100} key={item.step}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <span className="text-2xl font-black text-orange-500 sm:text-3xl">{item.step}</span>
                  <h3 className="mt-2 text-xs font-bold sm:text-sm">{item.title}</h3>
                  <p className="mt-1 text-[10px] text-white/60 sm:text-xs">{item.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col items-center gap-4 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-base font-bold sm:text-xl">Cần báo giá hoặc tư vấn chiếu sáng?</h2>
              <p className="mt-1 text-xs text-white/80 sm:text-sm">Liên hệ ngay để được hỗ trợ nhanh nhất</p>
            </div>
            <div className="flex gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-orange-600 shadow transition hover:shadow-lg"
                href={siteConfig.phoneHref}
              >
                <PhoneIcon className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-orange-600"
                href={siteConfig.zaloHref}
                rel="noreferrer"
                target="_blank"
              >
                <Image alt="Zalo" height={16} src="/logo/zalo.webp" width={16} />
                Zalo
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
