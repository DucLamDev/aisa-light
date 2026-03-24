import { Metadata } from "next";
import { ProductDetailPage } from "@/components/sections/product-detail-page";
import { getProduct } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { subcategory: string; product: string } }): Promise<Metadata> {
  const { product } = await getProduct("led-chieu-sang", params.subcategory, params.product);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/led-chieu-sang/${params.subcategory}/${params.product}`) },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: absoluteUrl(product.image), width: 1200, height: 630, alt: product.name }]
    }
  };
}

export default async function Page({ params }: { params: { subcategory: string; product: string } }) {
  return <ProductDetailPage categorySlug="led-chieu-sang" productSlug={params.product} subcategorySlug={params.subcategory} />;
}
