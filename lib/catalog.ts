import { promises as fs } from "fs";
import path from "path";
import {
  formatProductDisplayName,
  getSubcategoryDisplayName
} from "@/lib/catalog-labels";
import { readCmsProducts } from "@/lib/cms";
import { getOfficialProduct, getOfficialSubcategoryName, specsToArray } from "@/lib/products-data";
import { categoryConfigs, siteConfig } from "@/lib/site-config";
import { getModelCode, getWattage, slugify } from "@/lib/utils";
import { CategoryRecord, ProductRecord, SubcategoryRecord } from "@/types/catalog";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function isImage(file: string) {
  return imageExtensions.has(path.extname(file).toLowerCase());
}

function publicPathFromAbsolute(fullPath: string) {
  const relative = path.relative(path.join(process.cwd(), "public"), fullPath);
  return `/${relative.replace(/\\/g, "/")}`;
}

function createProductDescription(name: string, subcategory: string, category: string) {
  return `${name} thuộc nhóm ${subcategory} của ${siteConfig.name}, phù hợp cho ${category.toLowerCase()}, nhà ở, showroom, văn phòng và công trình. Sản phẩm được lựa chọn theo tiêu chí bền, vận hành ổn định, dễ thi công và tối ưu chi phí sử dụng.`;
}

function createSpecs(name: string, modelCode: string, wattage: string) {
  return [
    { label: "Tên sản phẩm", value: name },
    { label: "Mã sản phẩm", value: modelCode },
    { label: "Công suất", value: wattage },
    { label: "Điện áp", value: "220V / 50Hz hoặc theo model" },
    { label: "Ứng dụng", value: "Nhà ở, cửa hàng, showroom, công trình" },
    { label: "Bảo hành", value: "Liên hệ để nhận chính sách bảo hành" }
  ];
}

async function readDirectorySafe(directoryPath: string) {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

/**
 * Recursively collect ALL product images from a directory and its descendants.
 * Returns flat list of { file, dirPath } for each image found.
 */
async function collectImagesRecursive(
  dirPath: string
): Promise<Array<{ file: string; dirPath: string }>> {
  const entries = await readDirectorySafe(dirPath);
  const results: Array<{ file: string; dirPath: string }> = [];

  for (const entry of entries) {
    if (entry.isFile() && isImage(entry.name)) {
      results.push({ file: entry.name, dirPath });
    } else if (entry.isDirectory()) {
      const nested = await collectImagesRecursive(path.join(dirPath, entry.name));
      results.push(...nested);
    }
  }
  return results;
}

/**
 * Build a SubcategoryRecord from a directory, recursively scanning children.
 * If the dir has subdirectories, they become `children`.
 * Products are collected from ALL descendants (flattened for the parent).
 */
async function buildSubcategoryRecord(
  dirPath: string,
  dirName: string,
  categorySlug: string,
  categoryLabel: string,
  parentSubcategorySlug: string
): Promise<SubcategoryRecord> {
  const entries = await readDirectorySafe(dirPath);
  const imageFiles = entries.filter((e) => e.isFile() && isImage(e.name)).map((e) => e.name);
  const childDirs = entries.filter((e) => e.isDirectory());

  const thisSlug = slugify(dirName);
  const thisName = getOfficialSubcategoryName(thisSlug) ?? getSubcategoryDisplayName(thisSlug);

  // Build children recursively
  let children: SubcategoryRecord[] | undefined;
  if (childDirs.length > 0) {
    children = await Promise.all(
      childDirs.map((child) =>
        buildSubcategoryRecord(
          path.join(dirPath, child.name),
          child.name,
          categorySlug,
          categoryLabel,
          parentSubcategorySlug
        )
      )
    );
    children.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }

  // Collect ALL images from this dir and all descendants (flattened)
  const allImages = await collectImagesRecursive(dirPath);

  // Filter out duplicate marker files (ending with -1, -2, etc.) and non-product images
  const filteredImages = allImages.filter(({ file }) => {
    const name = file.replace(path.extname(file), "").toLowerCase();
    // Skip duplicate markers like "product-1", "product-2"
    if (/^product-\d+$/.test(name)) return false;
    // Skip files that are just "-1", "-2" suffixed duplicates
    if (/-\d+$/.test(name) && allImages.some(img => {
      const baseName = img.file.replace(path.extname(img.file), "").toLowerCase();
      return baseName === name.replace(/-\d+$/, "") && img.file !== file;
    })) return false;
    return true;
  });

  // Build gallery from direct images only
  const gallery = imageFiles.map((file) => publicPathFromAbsolute(path.join(dirPath, file)));

  // Build product records from ALL descendant images
  const products: ProductRecord[] = filteredImages.map(({ file, dirPath: imgDir }, index) => {
    const rawName = file.replace(path.extname(file), "");
    const productSlug = slugify(rawName);
    const official = getOfficialProduct(productSlug);
    const modelCode = getModelCode(rawName);
    const wattage = official?.specs?.["Công suất"] ?? getWattage(rawName);
    const productName = official?.name ?? formatProductDisplayName(thisName, modelCode, index, rawName);
    const image = publicPathFromAbsolute(path.join(imgDir, file));
    const officialDesc = official?.description?.replace(/\r\n/g, " ").replace(/\s+/g, " ").trim();

    return {
      id: `${categorySlug}-${thisSlug}-${index}`,
      slug: productSlug,
      name: productName,
      image,
      gallery: gallery.length > 0 ? gallery : [image],
      modelCode,
      wattage,
      application:
        "Phù hợp cho nhà ở, cửa hàng, văn phòng, showroom hoặc công trình theo từng model.",
      description: officialDesc && officialDesc.length > 10
        ? officialDesc
        : createProductDescription(productName, thisName, categoryLabel),
      specs: official?.specs && Object.keys(official.specs).length > 0
        ? specsToArray(official.specs)
        : createSpecs(productName, modelCode, wattage),
      categorySlug,
      subcategorySlug: parentSubcategorySlug,
      subcategoryName: thisName,
      source: "public"
    };
  });

  // Deduplicate products by name (keep first occurrence)
  const seenNames = new Set<string>();
  const uniqueProducts = products.filter(product => {
    const normalizedName = product.name.toLowerCase().trim();
    if (seenNames.has(normalizedName)) return false;
    seenNames.add(normalizedName);
    return true;
  });

  // Cover image: first direct image or first product image
  const coverImage =
    imageFiles.length > 0
      ? publicPathFromAbsolute(path.join(dirPath, imageFiles[0]))
      : uniqueProducts[0]?.image ?? "/Trang-LED-chieu-sang/en-led-am-tran.png";

  return {
    slug: thisSlug,
    name: thisName,
    coverImage,
    products: uniqueProducts,
    children: children && children.length > 0 ? children : undefined
  };
}

export async function getCatalog() {
  const cmsProducts = await readCmsProducts();

  const categories = await Promise.all(
    categoryConfigs.map(async (config) => {
      const categoryRoot = path.join(process.cwd(), "public", config.rootFolder);
      const entries = await readDirectorySafe(categoryRoot);

      const coverImageFile = entries.find((entry) => entry.isFile() && isImage(entry.name));
      const subcategoryDirs = entries.filter((entry) => entry.isDirectory());

      const subcategories = await Promise.all(
        subcategoryDirs.map(async (entry) => {
          const subcategorySlug = slugify(entry.name);
          const record = await buildSubcategoryRecord(
            path.join(categoryRoot, entry.name),
            entry.name,
            config.slug,
            config.label,
            subcategorySlug
          );
          // Override subcategorySlug on all products so they belong to this top-level subcategory
          for (const product of record.products) {
            product.subcategorySlug = subcategorySlug;
          }

          // Merge CMS products
          const cmsInSubcategory = cmsProducts.filter(
            (product) =>
              product.categorySlug === config.slug &&
              product.subcategorySlug === subcategorySlug
          );
          if (cmsInSubcategory.length > 0) {
            record.products = [...cmsInSubcategory, ...record.products];
          }

          return record;
        })
      );

      // CMS orphans (products with no matching subcategory folder)
      const cmsOrphans = cmsProducts.filter(
        (product) =>
          product.categorySlug === config.slug &&
          !subcategories.some((item) => item.slug === product.subcategorySlug)
      );

      const extraSubcategories = cmsOrphans.reduce<SubcategoryRecord[]>((items, product) => {
        const found = items.find((item) => item.slug === product.subcategorySlug);
        if (found) {
          found.products.push(product);
          return items;
        }
        items.push({
          slug: product.subcategorySlug,
          name: product.subcategoryName,
          coverImage: product.image,
          products: [product]
        });
        return items;
      }, []);

      const allSubcategories = [...subcategories, ...extraSubcategories].sort((a, b) =>
        a.name.localeCompare(b.name, "vi")
      );

      const categoryRecord: CategoryRecord = {
        ...config,
        coverImage: coverImageFile
          ? publicPathFromAbsolute(path.join(categoryRoot, coverImageFile.name))
          : allSubcategories[0]?.coverImage ?? "/Trang-LED-chieu-sang/en-led-am-tran.png",
        subcategories: allSubcategories,
        products: allSubcategories.flatMap((item) => item.products)
      };

      return categoryRecord;
    })
  );

  return categories;
}

export async function getCategoryBySlug(categorySlug: string) {
  const catalog = await getCatalog();
  return catalog.find((category) => category.slug === categorySlug) ?? null;
}

export async function getSubcategory(categorySlug: string, subcategorySlug: string) {
  const category = await getCategoryBySlug(categorySlug);
  const subcategory =
    category?.subcategories.find((item) => item.slug === subcategorySlug) ?? null;
  return { category, subcategory };
}

/**
 * Find a child (sub-subcategory) within a subcategory by slug recursively.
 */
export async function getChildSubcategory(
  categorySlug: string,
  subcategorySlug: string,
  childSlug: string
) {
  const { category, subcategory } = await getSubcategory(categorySlug, subcategorySlug);
  
  function findChild(children: SubcategoryRecord[] | undefined, slug: string): SubcategoryRecord | null {
    if (!children) return null;
    for (const child of children) {
      if (child.slug === slug) return child;
      const found = findChild(child.children, slug);
      if (found) return found;
    }
    return null;
  }

  const child = findChild(subcategory?.children, childSlug);
  return { category, subcategory, child };
}

export async function getProduct(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
) {
  const { category, subcategory } = await getSubcategory(categorySlug, subcategorySlug);
  const product = subcategory?.products.find((item) => item.slug === productSlug) ?? null;

  // Also check in children's products if not found at top level
  if (!product && subcategory?.children) {
    for (const child of subcategory.children) {
      const found = child.products.find((item) => item.slug === productSlug);
      if (found) return { category, subcategory, product: found };
    }
  }

  return { category, subcategory, product };
}

export async function getAllProducts() {
  const catalog = await getCatalog();
  return catalog.flatMap((category) => category.products);
}
