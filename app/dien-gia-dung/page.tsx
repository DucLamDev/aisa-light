import { createCategoryMetadata, renderCategoryPage } from "@/app/shared/category-page";

export async function generateMetadata() {
  return createCategoryMetadata("dien-gia-dung");
}

export default async function DienGiaDungPage() {
  return renderCategoryPage("dien-gia-dung");
}
