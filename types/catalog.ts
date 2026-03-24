export type CategoryConfig = {
  slug: string;
  rootFolder: string;
  label: string;
  shortDescription: string;
  heroTitle: string;
  seoDescription: string;
};

export type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  image: string;
  gallery: string[];
  modelCode: string;
  wattage: string;
  application: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  categorySlug: string;
  subcategorySlug: string;
  subcategoryName: string;
  source: "public" | "cms";
};

export type SubcategoryRecord = {
  slug: string;
  name: string;
  coverImage: string;
  products: ProductRecord[];
};

export type CategoryRecord = CategoryConfig & {
  coverImage: string;
  subcategories: SubcategoryRecord[];
  products: ProductRecord[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  content: string[];
};

export type CmsProductInput = {
  categorySlug: string;
  subcategoryName: string;
  name: string;
  description: string;
  application: string;
  wattage: string;
  specs: Array<{ label: string; value: string }>;
  image: string;
  gallery?: string[];
};
