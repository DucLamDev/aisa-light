"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { normalizeSearchText } from "@/lib/utils";
import { ProductRecord } from "@/types/catalog";

export function SearchDialog({ products }: { products: ProductRecord[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) {
      return products.slice(0, 8);
    }

    const normalized = normalizeSearchText(query);
    return products
      .filter((product) => normalizeSearchText(product.name).includes(normalized))
      .slice(0, 8);
  }, [products, query]);

  return (
    <>
      <button
        aria-label="Tim kiem san pham"
        className="rounded-full border border-white/20 bg-white/90 p-3 text-slate-900 shadow-soft transition hover:scale-105 hover:bg-white"
        onClick={() => setOpen(true)}
        type="button"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] bg-slate-950/45 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-20 max-w-2xl overflow-hidden rounded-4xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <SearchIcon className="h-5 w-5 text-slate-400" />
              <input
                autoFocus
                className="w-full border-0 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tim theo ten san pham..."
                value={query}
              />
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.map((product) => (
                <Link
                  className="flex items-center justify-between rounded-3xl px-4 py-3 transition hover:bg-slate-50"
                  href={`/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`}
                  key={product.id}
                  onClick={() => setOpen(false)}
                >
                  <div>
                    <p className="font-semibold text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">
                      {product.subcategoryName} • {product.wattage}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-orange-500">Xem ngay</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
