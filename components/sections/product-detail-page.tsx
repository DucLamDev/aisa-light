import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageHeader } from "@/components/layout/page-header";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { ProductJsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { ContactActions } from "@/components/ui/contact-actions";
import { PhoneIcon } from "@/components/ui/icons";
import { getChildSubcategory, getProduct } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export async function ProductDetailPage({
  categorySlug,
  subcategorySlug,
  productSlug
}: {
  categorySlug: string;
  subcategorySlug: string;
  productSlug: string;
}) {
  // First check if slug is a child subcategory
  const { category, subcategory, child } = await getChildSubcategory(
    categorySlug,
    subcategorySlug,
    productSlug
  );

  if (category && subcategory && child) {
    return (
      <ChildSubcategoryView
        category={category}
        child={child}
        subcategory={subcategory}
      />
    );
  }

  // Otherwise treat as product detail
  const result = await getProduct(categorySlug, subcategorySlug, productSlug);
  const { product } = result;

  if (!result.category || !result.subcategory || !product) {
    notFound();
  }

  const cat = result.category;
  const sub = result.subcategory;
  const related = sub.products.filter((item) => item.slug !== product.slug).slice(0, 6);

  return (
    <>
      <ProductJsonLd product={product} />
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: cat.label, href: `/${cat.slug}` },
              { label: sub.name, href: `/${cat.slug}/${sub.slug}` },
              { label: product.name }
            ]}
            variant="dark"
          />
        }
        title={product.name}
      />

      <Container className="py-6 sm:py-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="space-y-3">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image alt={product.name} className="object-contain p-6 sm:p-10" fill priority sizes="(max-width: 1024px) 100vw, 50vw" src={product.image} />
            </div>
            {product.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {product.gallery.slice(0, 5).map((image, index) => (
                  <div className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white" key={`${image}-${index}`}>
                    <Image alt={`${product.name} ${index + 1}`} className="object-contain p-2" fill sizes="80px" src={image} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-orange-500 sm:text-sm">{sub.name}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{product.name}</h2>

            {/* Specs inline */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <tbody className="divide-y divide-slate-100">
                  {product.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className="w-2/5 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-700 sm:px-4 sm:py-3 sm:text-sm">{spec.label}</td>
                      <td className="px-3 py-2.5 text-xs text-slate-600 sm:px-4 sm:py-3 sm:text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">{product.description}</p>

            {/* CTA buttons matching official site */}
            <div className="mt-5 space-y-3">
              <a
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                href={siteConfig.phoneHref}
              >
                <PhoneIcon className="h-5 w-5" />
                Hotline tư vấn: {siteConfig.phone}
              </a>
              <a
                className="flex w-full items-center justify-center rounded-lg bg-slate-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-slate-700"
                href={siteConfig.zaloHref}
                target="_blank"
              >
                Đăng ký tư vấn sản phẩm
              </a>
            </div>

            <div className="mt-5">
              <ContactActions />
            </div>
          </div>
        </div>

        {/* MÔ TẢ SẢN PHẨM section */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <h3 className="text-base font-bold uppercase text-slate-900 sm:text-lg">Mô tả sản phẩm</h3>
          <div className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <p className="font-semibold uppercase text-slate-800">{product.name}:</p>
            <p>– Chip LED nhập khẩu. Góc sáng rộng.</p>
            <p>– Bảo hành: Liên hệ để nhận chính sách bảo hành.</p>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-8 border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="inline-block h-5 w-1 rounded-full bg-orange-500" />
                Sản phẩm liên quan
              </h3>
              <Link className="text-sm font-semibold text-orange-500 hover:text-orange-600" href={`/${cat.slug}/${sub.slug}`}>
                Xem tất cả →
              </Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {related.map((item) => (
                <Link
                  className="group rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md sm:p-3"
                  href={`/${item.categorySlug}/${item.subcategorySlug}/${item.slug}`}
                  key={item.id}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-50">
                    <Image alt={item.name} className="object-contain p-3 transition group-hover:scale-105" fill sizes="(max-width:768px) 50vw, 200px" src={item.image} />
                  </div>
                  <p className="mt-2 text-xs font-bold leading-4 text-slate-900 sm:text-sm">{item.name}</p>
                  <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">Mã: {item.modelCode}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

/**
 * Renders a child subcategory (sub-subcategory) page.
 * Shows its children grid if it has deeper nesting, otherwise shows products.
 */
function ChildSubcategoryView({
  category,
  subcategory,
  child
}: {
  category: { slug: string; label: string };
  subcategory: { slug: string; name: string };
  child: { slug: string; name: string; products: Array<{ id: string; slug: string; name: string; image: string; modelCode: string; categorySlug: string; subcategorySlug: string }>; children?: Array<{ slug: string; name: string; coverImage: string; products: Array<{ id: string }> }> };
}) {
  const hasChildren = child.children && child.children.length > 0;

  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: category.label, href: `/${category.slug}` },
              { label: subcategory.name, href: `/${category.slug}/${subcategory.slug}` },
              { label: child.name }
            ]}
            variant="dark"
          />
        }
        title={child.name}
      />
      <Container className="py-8 sm:py-10">
        {hasChildren ? (
          <CategoryGrid
            basePath={`/${category.slug}/${subcategory.slug}`}
            items={child.children as any}
            type="subcategory"
          />
        ) : (
          <ProductGrid products={child.products as any} />
        )}
      </Container>
    </>
  );
}
