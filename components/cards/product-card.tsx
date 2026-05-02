import Image from "next/image";
import Link from "next/link";
import { ProductRecord } from "@/types/catalog";

interface ProductCardProps {
  product: ProductRecord;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-lg border-2 border-transparent bg-white shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_16px_rgba(249,115,22,0.25)]"
      href={`/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`}
    >
      <div className="flex items-center justify-center px-2 pt-3 pb-1 sm:px-3 sm:pt-4">
        <div className="relative mx-auto aspect-square w-[80%] overflow-hidden rounded-full bg-gradient-to-br from-orange-50 via-amber-50/60 to-white transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.35)]">
          <Image
            alt={product.name}
            className="object-contain p-2.5 sm:p-3 transition duration-500 group-hover:scale-110"
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            sizes="(max-width: 640px) 28vw, (max-width: 1024px) 20vw, 16vw"
            src={product.image}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-1.5 pb-2.5 pt-1 text-center sm:px-2 sm:pb-3">
        <h3 className="line-clamp-2 text-[10px] font-bold uppercase leading-3 text-orange-500 sm:text-xs sm:leading-4">
          {product.name}
        </h3>
      </div>
    </Link>
  );
}
