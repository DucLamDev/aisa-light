import { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageHeader } from "@/components/layout/page-header";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { Container } from "@/components/ui/container";
import { getCategoryBySlug } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function createCategoryMetadata(categorySlug: string): Promise<Metadata> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    return {};
  }

  return {
    title: category.heroTitle,
    description: category.seoDescription,
    alternates: { canonical: absoluteUrl(`/${category.slug}`) },
    openGraph: {
      title: category.heroTitle,
      description: category.seoDescription,
      url: absoluteUrl(`/${category.slug}`),
      images: [{ url: absoluteUrl(category.coverImage), width: 1200, height: 630, alt: category.label }]
    }
  };
}

export async function renderCategoryPage(categorySlug: string) {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    return null;
  }

  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Sản phẩm", href: "/" },
              { label: category.label }
            ]}
            variant="dark"
          />
        }
        description={category.seoDescription}
        title={category.heroTitle}
      />

      <Container className="py-8 sm:py-10">
        <div className="mt-0">
          <CategoryGrid basePath={`/${category.slug}`} items={category.subcategories} type="subcategory" />
        </div>
      </Container>

      {category.products.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/50">
          <Container className="py-8 sm:py-10">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span className="inline-block h-5 w-1 rounded-full bg-orange-500" />
              Sản phẩm {category.label.toLowerCase()}
            </h2>
            <ProductGrid products={category.products.slice(0, 12)} />
          </Container>
        </div>
      )}
    </>
  );
}
