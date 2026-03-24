import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageHeader } from "@/components/layout/page-header";
import { ProductJsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { ContactActions } from "@/components/ui/contact-actions";
import { getProduct } from "@/lib/catalog";

export async function ProductDetailPage({
  categorySlug,
  subcategorySlug,
  productSlug
}: {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
}) {
  const { category, subcategory, product } = await getProduct(categorySlug, subcategorySlug, productSlug);

  if (!category || !subcategory || !product) {
    notFound();
  }

  const related = subcategory.products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <ProductJsonLd product={product} />
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: category.label, href: `/${category.slug}` },
              { label: subcategory.name, href: `/${category.slug}/${subcategory.slug}` },
              { label: product.name }
            ]}
            variant="dark"
          />
        }
        description={product.description}
        title={product.name}
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
              <Image alt={product.name} className="object-contain p-8" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src={product.image} />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {product.gallery.slice(0, 6).map((image, index) => (
                <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white" key={`${image}-${index}`}>
                  <Image alt={`${product.name} ${index + 1}`} className="object-contain p-4" fill sizes="180px" src={image} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">{subcategory.name}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">{product.name}</h2>
            <p className="mt-6 text-base leading-8 text-slate-600">{product.description}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Mã sản phẩm</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{product.modelCode}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Công suất</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{product.wattage}</p>
              </div>
            </div>

            <div className="mt-8">
              <ContactActions />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-slate-950">Mô tả chi tiết</h3>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
              <p>{product.description}</p>
              <p>
                Sản phẩm phù hợp cho nhiều không gian sử dụng khác nhau, từ nhà ở đến cửa hàng, văn phòng và công trình. Thiết kế của từng model hướng đến độ bền, hiệu suất ổn định và tính thẩm mỹ hiện đại.
              </p>
              <p>
                Khách hàng có thể liên hệ trực tiếp qua các nút bên cạnh để được tư vấn model phù hợp với nhu cầu, môi trường lắp đặt và ngân sách thực tế.
              </p>
            </div>
          </article>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-slate-950">Thông số kỹ thuật</h3>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <tbody className="divide-y divide-slate-200">
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className="w-1/3 bg-slate-50 px-4 py-4 font-semibold text-slate-700">{spec.label}</td>
                      <td className="px-4 py-4 text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-slate-900">Ứng dụng thực tế</h4>
              <p className="mt-3 text-base leading-8 text-slate-600">{product.application}</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-slate-950">Sản phẩm liên quan</h3>
            <Link className="text-sm font-semibold text-orange-500" href={`/${category.slug}/${subcategory.slug}`}>
              Xem tất cả
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item) => (
              <Link
                className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-float"
                href={`/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`}
                key={item.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-50">
                  <Image alt={item.name} className="object-contain p-4" fill sizes="(max-width:768px) 100vw, 33vw" src={item.image} />
                </div>
                <p className="mt-4 text-base font-bold text-slate-900">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
