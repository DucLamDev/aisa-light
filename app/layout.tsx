import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Header } from "@/components/layout/header";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { getAllProducts } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | Thiết bị điện và đèn LED`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.defaultDescription,
  keywords: siteConfig.keywords,
  openGraph: {
    title: `${siteConfig.name} | Thiết bị điện và đèn LED`,
    description: siteConfig.defaultDescription,
    url: siteConfig.domain,
    siteName: siteConfig.name,
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: absoluteUrl("/Trang-LED-chieu-sang/en-led-am-tran.png"),
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  alternates: {
    canonical: siteConfig.domain
  },
  icons: {
    icon: [
      { url: "/logo/logo_8470.webp", type: "image/webp" },
      { url: "/logo/logo_8470.webp", rel: "shortcut icon", type: "image/webp" }
    ],
    apple: [{ url: "/logo/logo_8470.webp", type: "image/webp" }]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getAllProducts();

  return (
    <html lang="vi">
      <body className="antialiased">
        <OrganizationJsonLd />
        <Header products={products} />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
