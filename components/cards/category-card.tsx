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
      className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-orange-300 hover:shadow-float"
      href={href}
    >
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-50 ring-8 ring-orange-50">
        <Image
          alt={title}
          className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-110"
          height={112}
          sizes="112px"
          src={item.coverImage}
          width={112}
        />
      </div>
      <div className="mt-5 text-center">
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{productCount} sản phẩm / model</p>
      </div>
    </Link>
  );
}
