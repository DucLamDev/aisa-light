import { createCategoryMetadata, renderCategoryPage } from "@/app/shared/category-page";

export async function generateMetadata() {
  return createCategoryMetadata("thiet-bi-nuoc");
}

export default async function ThietBiNuocPage() {
  return renderCategoryPage("thiet-bi-nuoc");
}
