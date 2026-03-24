import { Metadata } from "next";
import { SubcategoryPage } from "@/components/sections/subcategory-page";
import { getSubcategory } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string } }): Promise<Metadata> {
  const { category, subcategory } = await getSubcategory("led-chieu-sang", params.subcategory);
  if (!category || !subcategory) return {};
  return {
    title: `${subcategory.name} | ${category.label}`,
    description: `Danh sách ${subcategory.name.toLowerCase()} với nhiều model thực tế, hình ảnh rõ ràng và thông tin hỗ trợ tư vấn nhanh.`,
    alternates: { canonical: absoluteUrl(`/led-chieu-sang/${subcategory.slug}`) }
  };
}

export default async function Page({ params }: { params: { subcategory: string } }) {
  return <SubcategoryPage categorySlug="led-chieu-sang" subcategorySlug={params.subcategory} />;
}
