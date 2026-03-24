import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const actions = [
  {
    href: siteConfig.phoneHref,
    label: "Goi tu van",
    icon: "/logo/phone.png",
    target: undefined,
    description: siteConfig.phone
  },
  {
    href: siteConfig.zaloHref,
    label: "Zalo",
    icon: "/logo/zalo.webp",
    target: "_blank",
    description: "Chat nhanh de nhan bao gia"
  },
  {
    href: siteConfig.messengerHref,
    label: "Messenger",
    icon: "/logo/messenger.webp",
    target: "_blank",
    description: "Nhan tin truc tiep voi tu van"
  }
];

export function ContactActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {actions.map((action) => (
        <a
          className={`group flex items-center gap-4 rounded-[1.75rem] border ${
            compact ? "border-white/15 bg-white/10 px-4 py-4 text-white" : "border-slate-200 bg-white px-5 py-4 text-slate-900"
          } shadow-soft backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-float`}
          href={action.href}
          key={action.label}
          rel={action.target ? "noreferrer" : undefined}
          target={action.target}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl ${
              compact ? "bg-white/90" : "bg-slate-50"
            }`}
          >
            <Image alt={action.label} className="object-contain" height={32} src={action.icon} width={32} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold">{action.label}</span>
            <span className={`block text-xs ${compact ? "text-white/75" : "text-slate-500"}`}>{action.description}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
