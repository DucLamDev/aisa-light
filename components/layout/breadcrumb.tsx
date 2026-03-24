import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({
  items,
  variant = "light"
}: {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}) {
  const isLight = variant === "light";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-sm ${
        isLight ? "text-white/80" : "text-slate-500"
      }`}
    >
      {items.map((item, index) => (
        <span className="flex items-center gap-2" key={`${item.label}-${index}`}>
          {item.href ? (
            <Link
              className={`transition ${isLight ? "hover:text-white" : "hover:text-slate-900"}`}
              href={item.href}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`font-medium ${isLight ? "text-white" : "text-slate-900"}`}>
              {item.label}
            </span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </span>
      ))}
    </nav>
  );
}
