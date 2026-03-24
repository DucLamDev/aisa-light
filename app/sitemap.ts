import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { getCatalog } from "@/lib/catalog";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await getCatalog();

  const staticPages = ["", "/tin-tuc", "/lien-he"].map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified: new Date()
  }));

  const categoryPages = catalog.flatMap((category) => [
    {
      url: `${siteConfig.domain}/${category.slug}`,
      lastModified: new Date()
    },
    ...category.subcategories.map((subcategory) => ({
      url: `${siteConfig.domain}/${category.slug}/${subcategory.slug}`,
      lastModified: new Date()
    })),
    ...category.products.map((product) => ({
      url: `${siteConfig.domain}/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`,
      lastModified: new Date()
    }))
  ]);

  const newsPages = blogPosts.map((post) => ({
    url: `${siteConfig.domain}/tin-tuc/${post.slug}`,
    lastModified: new Date(post.publishedAt)
  }));

  return [...staticPages, ...categoryPages, ...newsPages];
}
