import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const items = [
  { href: siteConfig.phoneHref, label: "Goi ngay", icon: "/logo/phone.png", accent: true },
  { href: siteConfig.zaloHref, label: "Zalo", icon: "/logo/zalo.webp", accent: false },
  { href: siteConfig.messengerHref, label: "Messenger", icon: "/logo/messenger.webp", accent: false }
];

export function FloatingContact() {
  return (
    <>
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 gap-3 md:flex md:flex-col">
        {items.map((item) => (
          <a
            className={`group inline-flex h-14 w-14 items-center justify-center rounded-2xl border bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-float ${
              item.accent ? "border-orange-200 ring-4 ring-orange-100/70" : "border-slate-200"
            }`}
            href={item.href}
            key={item.label}
            rel="noreferrer"
            target={item.href.startsWith("http") ? "_blank" : undefined}
          >
            <Image alt={item.label} className="object-contain" height={30} src={item.icon} width={30} />
            <span className="sr-only">{item.label}</span>
          </a>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom,8px)+10px)] md:hidden">
        <div className="rounded-[1.6rem] border border-white/70 bg-white/92 p-2 shadow-[0_-10px_30px_rgba(15,23,42,0.14)] backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-2">
            {items.map((item) => (
              <a
                className={`flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-2 text-xs font-semibold transition active:scale-95 ${
                  item.accent
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-soft"
                    : "bg-slate-50 text-slate-700"
                }`}
                href={item.href}
                key={`mobile-${item.label}`}
                rel="noreferrer"
                target={item.href.startsWith("http") ? "_blank" : undefined}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    item.accent ? "bg-white/15" : "bg-white shadow-sm"
                  }`}
                >
                  <Image alt={item.label} className="object-contain" height={20} src={item.icon} width={20} />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
