import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { ProductRecord } from "@/types/catalog";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.domain,
    logo: absoluteUrl("/Trang-LED-chieu-sang/en-led-am-tran.png"),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressCountry: "VN"
    },
    sameAs: [siteConfig.zaloHref, siteConfig.messengerHref]
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}

export function ProductJsonLd({ product }: { product: ProductRecord }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery.map((item) => absoluteUrl(item)),
    description: product.description,
    sku: product.modelCode,
    brand: {
      "@type": "Brand",
      name: siteConfig.name
    },
    category: product.subcategoryName,
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value
    }))
  };

  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />;
}
