import { Metadata } from "next";
import { ProductDetailPage } from "@/components/sections/product-detail-page";
import { getProduct } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string; product: string } }): Promise<Metadata> {
  const { product } = await getProduct("dien-gia-dung", params.subcategory, params.product);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/dien-gia-dung/${params.subcategory}/${params.product}`) }
  };
}

export default async function Page({ params }: { params: { subcategory: string; product: string } }) {
  return <ProductDetailPage categorySlug="dien-gia-dung" productSlug={params.product} subcategorySlug={params.subcategory} />;
}
