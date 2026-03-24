import { createCategoryMetadata, renderCategoryPage } from "@/app/shared/category-page";

export async function generateMetadata() {
  return createCategoryMetadata("led-chieu-sang");
}

export default async function LedPage() {
  return renderCategoryPage("led-chieu-sang");
}
