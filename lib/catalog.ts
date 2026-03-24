import { promises as fs } from "fs";
import path from "path";
import {
  formatProductDisplayName,
  getSubcategoryDisplayName
} from "@/lib/catalog-labels";
import { readCmsProducts } from "@/lib/cms";
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
          const subcategoryPath = path.join(categoryRoot, entry.name);
          const productFiles = (await readDirectorySafe(subcategoryPath))
            .filter((file) => file.isFile() && isImage(file.name))
            .map((file) => file.name);

          const gallery = productFiles.map((file) =>
            publicPathFromAbsolute(path.join(subcategoryPath, file))
          );
          const subcategorySlug = slugify(entry.name);
          const subcategoryName = getSubcategoryDisplayName(subcategorySlug);

          const products: ProductRecord[] = productFiles.map((file, index) => {
            const rawName = file.replace(path.extname(file), "");
            const modelCode = getModelCode(rawName);
            const wattage = getWattage(rawName);
            const productName = formatProductDisplayName(subcategoryName, modelCode, index);
            const image = publicPathFromAbsolute(path.join(subcategoryPath, file));

            return {
              id: `${config.slug}-${subcategorySlug}-${index}`,
              slug: slugify(rawName),
              name: productName,
              image,
              gallery,
              modelCode,
              wattage,
              application:
                "Phù hợp cho nhà ở, cửa hàng, văn phòng, showroom hoặc công trình theo từng model.",
              description: createProductDescription(productName, subcategoryName, config.label),
              specs: createSpecs(productName, modelCode, wattage),
              categorySlug: config.slug,
              subcategorySlug,
              subcategoryName,
              source: "public"
            };
          });

          const cmsInSubcategory = cmsProducts.filter(
            (product) =>
              product.categorySlug === config.slug &&
              product.subcategorySlug === subcategorySlug
          );

          const mergedProducts = [...cmsInSubcategory, ...products];

          const subcategoryRecord: SubcategoryRecord = {
            slug: subcategorySlug,
            name: subcategoryName,
            coverImage:
              mergedProducts[0]?.image ??
              gallery[0] ??
              (coverImageFile
                ? publicPathFromAbsolute(path.join(categoryRoot, coverImageFile.name))
                : "/Trang-LED-chieu-sang/en-led-am-tran.png"),
            products: mergedProducts
          };

          return subcategoryRecord;
        })
      );

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

export async function getProduct(
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string
) {
  const { category, subcategory } = await getSubcategory(categorySlug, subcategorySlug);
  const product = subcategory?.products.find((item) => item.slug === productSlug) ?? null;
  return { category, subcategory, product };
}

export async function getAllProducts() {
  const catalog = await getCatalog();
  return catalog.flatMap((category) => category.products);
}
