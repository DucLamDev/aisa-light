import { Metadata } from "next";
import { SubcategoryPage } from "@/components/sections/subcategory-page";
import { getSubcategory } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string } }): Promise<Metadata> {
  const { category, subcategory } = await getSubcategory("dien-gia-dung", params.subcategory);
  if (!category || !subcategory) return {};
  return {
    title: `${subcategory.name} | ${category.label}`,
    description: `Danh sách ${subcategory.name.toLowerCase()} với nhiều mẫu thực tế và CTA liên hệ rõ ràng cho website catalog.`,
    alternates: { canonical: absoluteUrl(`/dien-gia-dung/${subcategory.slug}`) }
  };
}

export default async function Page({ params }: { params: { subcategory: string } }) {
  return <SubcategoryPage categorySlug="dien-gia-dung" subcategorySlug={params.subcategory} />;
}
