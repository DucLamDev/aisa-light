import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageHeader } from "@/components/layout/page-header";
import { CategoryGrid } from "@/components/sections/category-grid";
import { ProductGrid } from "@/components/sections/product-grid";
import { Container } from "@/components/ui/container";
import { getSubcategory } from "@/lib/catalog";

export async function SubcategoryPage({
  categorySlug,
  subcategorySlug
}: {
  categorySlug: string;
  subcategorySlug: string;
}) {
  const { category, subcategory } = await getSubcategory(categorySlug, subcategorySlug);

  if (!category || !subcategory) {
    notFound();
  }

  const hasChildren = subcategory.children && subcategory.children.length > 0;

  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb
            items={[
              { label: "Trang chủ", href: "/" },
              { label: category.label, href: `/${category.slug}` },
              { label: subcategory.name }
            ]}
            variant="dark"
          />
        }
        title={subcategory.name}
      />

      <Container className="py-8 sm:py-10">
        {hasChildren ? (
          <CategoryGrid
            basePath={`/${category.slug}/${subcategory.slug}`}
            items={subcategory.children!}
            type="subcategory"
          />
        ) : (
          <ProductGrid products={subcategory.products} />
        )}
      </Container>
    </>
  );
}
