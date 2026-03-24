import { Metadata } from "next";
import { SubcategoryPage } from "@/components/sections/subcategory-page";
import { getSubcategory } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string } }): Promise<Metadata> {
  const { category, subcategory } = await getSubcategory("thiet-bi-dien", params.subcategory);
  if (!category || !subcategory) return {};
  return {
    title: `${subcategory.name} | ${category.label}`,
    description: `Danh sách ${subcategory.name.toLowerCase()} với thông tin phục vụ SEO danh mục và nhu cầu tư vấn kỹ thuật.`,
    alternates: { canonical: absoluteUrl(`/thiet-bi-dien/${subcategory.slug}`) }
  };
}

export default async function Page({ params }: { params: { subcategory: string } }) {
  return <SubcategoryPage categorySlug="thiet-bi-dien" subcategorySlug={params.subcategory} />;
}
