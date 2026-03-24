"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { BoltIcon, DropletsIcon, MenuGridIcon, PhoneIcon } from "@/components/ui/icons";
import { SearchDialog } from "@/components/ui/search-dialog";
import { ProductRecord } from "@/types/catalog";

const links = [
  { href: "/", label: "Trang chu", icon: MenuGridIcon },
  { href: "/led-chieu-sang", label: "LED chieu sang", icon: BoltIcon },
  { href: "/dien-gia-dung", label: "Dien gia dung", icon: MenuGridIcon },
  { href: "/thiet-bi-dien", label: "Thiet bi dien", icon: BoltIcon },
  { href: "/thiet-bi-nuoc", label: "Thiet bi nuoc", icon: DropletsIcon },
  { href: "/lien-he", label: "Lien he", icon: PhoneIcon }
];

export function Header({ products }: { products: ProductRecord[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl">
      <Container className="py-2.5 sm:py-3">
        <div className="flex min-h-16 items-center justify-between gap-3">
          <Link className="flex min-w-0 items-center gap-3" href="/">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-orange-100 sm:h-12 sm:w-12">
              <Image alt="Asia Lighting" height={42} src="/logo/logo_8470.webp" width={42} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.28em] text-orange-500 sm:text-sm">
                Asia Lighting
              </p>
              <p className="truncate text-xs text-slate-500 sm:text-sm">Thiet bi dien va den LED</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  className={`group relative py-2 text-sm font-medium transition ${
                    active ? "text-slate-950" : "text-slate-700 hover:text-slate-950"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-orange-500 transition duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              className="hidden items-center gap-2 rounded-full bg-orange-100 px-4 py-2.5 text-sm font-semibold text-orange-700 shadow-soft ring-1 ring-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-200 lg:inline-flex"
              href="tel:0862921001"
            >
              <PhoneIcon className="h-4 w-4" />
              0862.921.001
            </a>
            <SearchDialog products={products} />
          </div>
        </div>

        <nav className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1.5 lg:hidden">
          {links.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium shadow-sm transition ${
                  active
                    ? "border-orange-200 bg-orange-50 text-orange-600"
                    : "border-slate-200 bg-gradient-to-b from-white to-slate-50 text-slate-700 hover:border-orange-300 hover:text-orange-500"
                }`}
                href={item.href}
                key={`mobile-${item.href}`}
              >
                <item.icon className={`h-4 w-4 ${active ? "text-orange-600" : "text-orange-500"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
