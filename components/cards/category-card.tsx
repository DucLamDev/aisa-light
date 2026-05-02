import Image from "next/image";
import Link from "next/link";
import { CategoryRecord, SubcategoryRecord } from "@/types/catalog";

type Item = CategoryRecord | SubcategoryRecord;

export function CategoryCard({
  item,
  href,
  productCount
}: {
  item: Item;
  href: string;
  productCount: number;
}) {
  const title = "name" in item ? item.name : item.label;

  return (
    <Link
      className="group flex flex-col overflow-hidden rounded-xl border-2 border-transparent bg-white shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(249,115,22,0.25)]"
      href={href}
    >
      <div className="flex items-center justify-center px-3 pt-4 pb-1 sm:px-4 sm:pt-5">
        <div className="relative mx-auto aspect-square w-[70%] overflow-hidden rounded-full bg-gradient-to-br from-orange-50 via-amber-50/60 to-white transition-shadow duration-300 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)]">
          <Image
            alt={title}
            className="object-contain p-3 transition duration-500 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 30vw, 120px"
            src={item.coverImage}
          />
        </div>
      </div>
      <div className="px-2 pb-3 pt-2 text-center sm:px-3 sm:pb-4">
        <h3 className="text-xs font-bold uppercase leading-4 text-orange-500 sm:text-sm">{title}</h3>
        <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{productCount} sản phẩm</p>
      </div>
    </Link>
  );
}
