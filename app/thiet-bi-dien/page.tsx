import { createCategoryMetadata, renderCategoryPage } from "@/app/shared/category-page";

export async function generateMetadata() {
  return createCategoryMetadata("thiet-bi-dien");
}

export default async function ThietBiDienPage() {
  return renderCategoryPage("thiet-bi-dien");
}
