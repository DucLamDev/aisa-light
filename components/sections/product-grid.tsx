import { ProductCard } from "@/components/cards/product-card";
import { ProductRecord } from "@/types/catalog";

export function ProductGrid({ products }: { products: ProductRecord[] }) {
  return (
    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
