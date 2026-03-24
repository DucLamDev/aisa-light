import Image from "next/image";
import Link from "next/link";
import { ProductRecord } from "@/types/catalog";

export function ProductCard({ product }: { product: ProductRecord }) {
  return (
    <Link
      className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-float"
      href={`/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-amber-50 via-white to-slate-50">
        <Image
          alt={product.name}
          className="object-contain p-7 transition duration-500 group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          src={product.image}
        />
      </div>
      <div className="px-5 -mt-5 relative z-10">
        <div className="rounded-full bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-soft transition group-hover:bg-orange-600">
          Liên hệ để nhận báo giá
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
          {product.subcategoryName}
        </p>
        <h3 className="mt-3 min-h-[4.5rem] text-xl font-bold leading-8 text-slate-900">
          {product.name}
        </h3>
        <p className="mt-4 text-sm text-slate-500">Mã: {product.modelCode}</p>
        <p className="mt-1 text-sm text-slate-500">Công suất: {product.wattage}</p>
      </div>
    </Link>
  );
}
