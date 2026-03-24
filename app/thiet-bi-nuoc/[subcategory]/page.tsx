import { Metadata } from "next";
import { SubcategoryPage } from "@/components/sections/subcategory-page";
import { getSubcategory } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string } }): Promise<Metadata> {
  const { category, subcategory } = await getSubcategory("thiet-bi-nuoc", params.subcategory);
  if (!category || !subcategory) return {};
  return {
    title: `${subcategory.name} | ${category.label}`,
    description: `Danh sách ${subcategory.name.toLowerCase()} dành cho doanh nghiệp và khách hàng cần thiết bị nước chất lượng.`,
    alternates: { canonical: absoluteUrl(`/thiet-bi-nuoc/${subcategory.slug}`) }
  };
}

export default async function Page({ params }: { params: { subcategory: string } }) {
  return <SubcategoryPage categorySlug="thiet-bi-nuoc" subcategorySlug={params.subcategory} />;
}
