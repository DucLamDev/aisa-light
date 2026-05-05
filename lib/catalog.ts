import { promises as fs } from "fs";
import path from "path";
import {
  formatProductDisplayName,
  getSubcategoryDisplayName
} from "@/lib/catalog-labels";
import { readCmsProducts } from "@/lib/cms";
import { getOfficialProduct, getOfficialSubcategoryName, specsToArray } from "@/lib/products-data";
import { categoryConfigs, keySubcategories, siteConfig } from "@/lib/site-config";
import { getModelCode, getWattage, slugify } from "@/lib/utils";
import { CategoryRecord, ProductRecord, SubcategoryRecord } from "@/types/catalog";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const mergedSubcategoryConfigs: Record<
  string,
  Array<{
    slug: string;
    name: string;
    sourceSlugs: string[];
  }>
> = {
  "led-chieu-sang": [
    {
      slug: "den-op-tran-noi",
      name: "Đèn ốp trần nổi",
      sourceSlugs: [
        "den-led-op-noi-pha-le",
        "den-led-op-noi-sieu-sang",
        "den-led-op-noi-than-nhua-dob",
        "den-led-op-noi-mat-phang",
        "op-noi-da-nang",
        "op-noi-tron-van-go-thiet-ke-moi"
      ]
    },
    {
      slug: "den-trang-tri-gan-tuong",
      name: "Đèn trang trí gắn tường",
      sourceSlugs: ["den-tuong-1-dau", "den-tuong-2-dau", "den-tuong-trang-tri"]
    },
    {
      slug: "den-led-am-tran-tong-hop",
      name: "Đèn led âm trần",
      sourceSlugs: ["den-led-am-tran", "den-led-panel-tron-sieu-mong"]
    }
  ]
};

const subcategoryCoverImageOverrides: Record<string, string> = {
  "led-chieu-sang/den-led-tron":
    "/Trang-LED-chieu-sang/den-led-tron/den-tron-cong-xuat-nho/en-tron-cong-suat-nho-9W.jpg",
  "led-chieu-sang/den-roi-ray-roi-ngoi-led":
    "/Trang-LED-chieu-sang/den-roi-ray-roi-ngoi-led/den-roi-ray-vo-den-rd01/en-roi-ray-vo-en-10W.jpg"
};

function isImage(file: string) {
  return imageExtensions.has(path.extname(file).toLowerCase());
}

function publicPathFromAbsolute(fullPath: string) {
  const relative = path.relative(path.join(process.cwd(), "public"), fullPath);
  return `/${relative.replace(/\\/g, "/")}`;
}

function dedupeProductsBySlug(products: ProductRecord[]) {
  const seen = new Set<string>();
  return products.filter((product) => {
    if (seen.has(product.slug)) return false;
    seen.add(product.slug);
    return true;
  });
}

function remapSubcategoryTree(
  subcategory: SubcategoryRecord,
  parentSlug: string,
  parentName: string
): SubcategoryRecord {
  return {
    ...subcategory,
    products: subcategory.products.map((product) => ({
      ...product,
      subcategorySlug: parentSlug,
      subcategoryName: parentName
    })),
    children: subcategory.children?.map((child) =>
      remapSubcategoryTree(child, parentSlug, parentName)
    )
  };
}

function applyMergedSubcategories(
  categorySlug: string,
  subcategories: SubcategoryRecord[]
) {
  const mergeConfigs = mergedSubcategoryConfigs[categorySlug];
  if (!mergeConfigs?.length) {
    return subcategories;
  }

  const sourceMap = new Map(subcategories.map((item) => [item.slug, item]));
  const consumedSlugs = new Set<string>();
  const mergedRecords: SubcategoryRecord[] = [];

  for (const config of mergeConfigs) {
    const matched = config.sourceSlugs
      .map((slug) => sourceMap.get(slug))
      .filter((item): item is SubcategoryRecord => Boolean(item));
    if (matched.length === 0) {
      continue;
    }

    for (const slug of config.sourceSlugs) {
      consumedSlugs.add(slug);
    }

    const mergedChildren = matched.map((item) =>
      remapSubcategoryTree(item, config.slug, config.name)
    );
    const mergedProducts = dedupeProductsBySlug(
      mergedChildren.flatMap((item) =>
        item.products.map((product) => ({
          ...product
        }))
      )
    );

    mergedRecords.push({
      slug: config.slug,
      name: config.name,
      coverImage: mergedChildren[0].coverImage,
      products: mergedProducts,
      children: mergedChildren
    });
  }

  const remaining = subcategories.filter((item) => !consumedSlugs.has(item.slug));
  return [...mergedRecords, ...remaining];
}

function applySubcategoryCoverOverrides(categorySlug: string, subcategories: SubcategoryRecord[]) {
  return subcategories.map((subcategory) => {
    const override = subcategoryCoverImageOverrides[`${categorySlug}/${subcategory.slug}`];
    return override ? { ...subcategory, coverImage: override } : subcategory;
  });
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

      const keySlugs = keySubcategories[config.slug] || [];
      const mergedSubcategories = applyMergedSubcategories(config.slug, [
        ...subcategories,
        ...extraSubcategories
      ]);
      const subcategoriesWithCovers = applySubcategoryCoverOverrides(
        config.slug,
        mergedSubcategories
      );
      const allSubcategories = subcategoriesWithCovers.sort((a, b) => {
        const aIndex = keySlugs.indexOf(a.slug);
        const bIndex = keySlugs.indexOf(b.slug);
        
        // If both are key subcategories, maintain their relative order as in keySlugs
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        // If a is key subcategory, it comes first
        if (aIndex !== -1) return -1;
        // If b is key subcategory, it comes first
        if (bIndex !== -1) return 1;
        
        // Otherwise sort alphabetically
        return a.name.localeCompare(b.name, "vi");
      });

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

  if (!product && subcategory?.children) {
    const findProductInChildren = (children: SubcategoryRecord[]): ProductRecord | null => {
      for (const child of children) {
        const found = child.products.find((item) => item.slug === productSlug);
        if (found) return found;
        if (child.children) {
          const nested = findProductInChildren(child.children);
          if (nested) return nested;
        }
      }
      return null;
    };

    const found = findProductInChildren(subcategory.children);
    if (found) {
      return { category, subcategory, product: found };
    }
  }

  return { category, subcategory, product };
}

export async function getAllProducts() {
  const catalog = await getCatalog();
  return catalog.flatMap((category) => category.products);
}
