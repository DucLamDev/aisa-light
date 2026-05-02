import { ProductCard } from "@/components/cards/product-card";
import { ProductRecord } from "@/types/catalog";

export function ProductGrid({ products }: { products: ProductRecord[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-5 xl:grid-cols-5">
      {products.map((product, index) => (
        <ProductCard key={product.id} priority={index < 10} product={product} />
      ))}
    </div>
  );
}
