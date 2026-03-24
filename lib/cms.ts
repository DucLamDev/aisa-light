import { promises as fs } from "fs";
import path from "path";
import { CmsProductInput, ProductRecord } from "@/types/catalog";
import { slugify } from "@/lib/utils";

const dataFile = path.join(process.cwd(), "data", "custom-products.json");

async function ensureFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, "[]", "utf8");
  }
}

export async function readCmsProducts() {
  await ensureFile();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content) as ProductRecord[];
}

export async function createCmsProduct(input: CmsProductInput) {
  const records = await readCmsProducts();
  const subcategorySlug = slugify(input.subcategoryName);
  const slug = slugify(input.name);
  const item: ProductRecord = {
    id: `cms-${Date.now()}`,
    slug,
    name: input.name,
    image: input.image,
    gallery: input.gallery?.length ? input.gallery : [input.image],
    modelCode:
      input.specs.find((spec) => slugify(spec.label) === "ma-san-pham")?.value ?? "CMS",
    wattage: input.wattage || "Liên hệ để nhận tư vấn",
    application: input.application || "Nhà ở, cửa hàng, văn phòng, công trình.",
    description: input.description,
    specs: input.specs,
    categorySlug: input.categorySlug,
    subcategorySlug,
    subcategoryName: input.subcategoryName,
    source: "cms"
  };

  records.unshift(item);
  await fs.writeFile(dataFile, JSON.stringify(records, null, 2), "utf8");
  return item;
}
