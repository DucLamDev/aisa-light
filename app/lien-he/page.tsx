import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ContactActions } from "@/components/ui/contact-actions";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ Asia Lighting để nhận báo giá, tư vấn model phù hợp và hỗ trợ kỹ thuật nhanh.",
  alternates: { canonical: absoluteUrl("/lien-he") }
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]}
            variant="dark"
          />
        }
        description="Khách có thể liên hệ trực tiếp qua Gọi, Zalo hoặc Messenger để nhận tư vấn và báo giá nhanh."
        title="Liên hệ tư vấn và mua hàng"
      />

      <Container className="py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">Thông tin doanh nghiệp</h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p><span className="font-semibold text-slate-900">Tên công ty:</span> {siteConfig.legalName}</p>
              <p><span className="font-semibold text-slate-900">Địa chỉ:</span> {siteConfig.address}</p>
              <p><span className="font-semibold text-slate-900">Điện thoại:</span> {siteConfig.phone}</p>
              <p><span className="font-semibold text-slate-900">Email:</span> {siteConfig.email}</p>
              <p><span className="font-semibold text-slate-900">Mã số thuế:</span> {siteConfig.taxCode}</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200">
              <iframe className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={siteConfig.mapEmbed} title="Bản đồ công ty" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-bold text-slate-950">Liên hệ nhanh để mua hàng</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Đây là website quảng bá sản phẩm, vì vậy luồng mua hàng được tối ưu theo hướng liên hệ trực tiếp. Chọn kênh phù hợp bên dưới để nhận báo giá và tư vấn model nhanh nhất.
            </p>
            <div className="mt-8">
              <ContactActions />
            </div>
            <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-6 text-sm leading-7 text-slate-600">
              <p className="font-semibold text-slate-900">Gợi ý khi nhắn tư vấn</p>
              <p className="mt-2">
                Gửi tên sản phẩm, hình mẫu bạn quan tâm hoặc nhu cầu lắp đặt để đội ngũ hỗ trợ báo đúng model nhanh hơn.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
