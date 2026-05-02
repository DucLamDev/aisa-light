import { CategoryCard } from "@/components/cards/category-card";
import { CategoryRecord, SubcategoryRecord } from "@/types/catalog";

export function CategoryGrid({
  items,
  type,
  basePath = ""
}: {
  items: Array<CategoryRecord | SubcategoryRecord>;
  type: "category" | "subcategory";
  basePath?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => {
        const href =
          type === "category"
            ? `/${(item as CategoryRecord).slug}`
            : `${basePath}/${(item as SubcategoryRecord).slug}`;
        const productCount =
          "products" in item ? item.products.length : (item as CategoryRecord).products.length;
        return <CategoryCard href={href} item={item} key={href} productCount={productCount} />;
      })}
    </div>
  );
}
