import { AdminForm } from "@/components/ui/admin-form";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Quản trị sản phẩm",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">CMS nội bộ</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">Quản trị sản phẩm</h1>
        <p className="mt-4 text-slate-600">
          Form này cho phép admin thêm sản phẩm mới, upload ảnh vào `public/uploads` và lưu metadata vào JSON để site hiển thị ngay.
        </p>
        <div className="mt-8">
          <AdminForm />
        </div>
      </div>
    </Container>
  );
}
