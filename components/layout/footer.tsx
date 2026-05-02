import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/led-chieu-sang", label: "LED chiếu sáng" },
  { href: "/dien-gia-dung", label: "Điện gia dụng" },
  { href: "/thiet-bi-dien", label: "Thiết bị điện" },
  { href: "/thiet-bi-nuoc", label: "Thiết bị nước" },
  { href: "/lien-he", label: "Liên hệ" }
];

const socialLinks = [
  { href: siteConfig.socialLinks.facebook, label: "Facebook", icon: FacebookIcon },
  { href: siteConfig.socialLinks.youtube, label: "YouTube", icon: YoutubeIcon },
  { href: siteConfig.socialLinks.tiktok, label: "TikTok", icon: TiktokIcon },
  { href: siteConfig.socialLinks.instagram, label: "Instagram", icon: InstagramIcon }
];

export function Footer() {
  return (
    <footer className="mt-16 sm:mt-20">
      {/* <div className="bg-orange-500">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-center text-sm font-semibold text-white sm:text-left sm:text-base">
            Cần tư vấn? Gọi ngay <a className="underline underline-offset-2" href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </p>
          <div className="flex gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-orange-600 transition hover:shadow-lg"
              href={siteConfig.phoneHref}
            >
              <Image alt="Goi" className="object-contain" height={20} src="/logo/phone.png" width={20} />
              Gọi tư vấn
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-orange-600 transition hover:shadow-lg"
              href={siteConfig.zaloHref}
              rel="noreferrer"
              target="_blank"
            >
              <Image alt="Zalo" height={20} src="/logo/zalo.webp" width={20} />
              Zalo
            </a>
          </div>
        </Container>
      </div> */}

      <div className="bg-slate-900 text-white">
        <Container className="grid gap-10 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link className="flex items-center gap-3" href="/">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image alt="Asia Lighting" height={32} src="/logo/logo_8470.webp" width={32} />
              </div>
              <span className="text-lg font-bold tracking-wide">ASIA LIGHTING</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">{siteConfig.legalName}</p>
            <p className="mt-2 text-xs text-slate-500">MST: {siteConfig.taxCode}</p>

            <div className="mt-5 flex gap-2">
              {socialLinks.map((item) => (
                <a
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition hover:bg-orange-500 hover:text-white"
                  href={item.href}
                  key={item.label}
                  rel="noreferrer"
                  target="_blank"
                  title={item.label}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Sản phẩm</h4>
            <nav className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  className="text-sm text-slate-400 transition hover:translate-x-1 hover:text-white"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Liên hệ</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <div>
                <p className="text-xs text-slate-500">Trụ sở</p>
                <p>{siteConfig.address}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Nhà máy</p>
                <p>{siteConfig.factoryAddress}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">CN Miền Nam</p>
                <p>{siteConfig.branchAddress}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <a className="text-orange-400 hover:text-orange-300" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-400">Hotline</h4>
            <div className="mt-4 space-y-3">
              <a className="block rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700" href={siteConfig.phoneHref}>
                <p className="text-xs text-slate-500">Tư vấn & Báo giá</p>
                <p className="mt-1 text-xl font-black text-orange-400">{siteConfig.phone}</p>
              </a>
              <a className="block rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700" href={siteConfig.phoneSouthHref}>
                <p className="text-xs text-slate-500">Chi nhánh Miền Nam</p>
                <p className="mt-1 text-xl font-black text-orange-400">{siteConfig.phoneSouth}</p>
              </a>
            </div>

            <h4 className="mt-6 text-xs font-bold uppercase tracking-widest text-orange-400">Chính sách</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {siteConfig.policies.slice(0, 4).map((p) => (
                <Link
                  className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-400 transition hover:bg-slate-700 hover:text-white"
                  href={p.href}
                  key={p.href}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className="border-t border-slate-800 bg-slate-950">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Asia Lighting. All rights reserved.</p>
          <p>{siteConfig.domain.replace("https://", "")}</p>
        </Container>
      </div>
    </footer>
  );
}
