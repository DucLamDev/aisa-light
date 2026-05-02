/**
 * Auto-generated product data lookup from products_data.json.
 * Maps product slug → { name, specs, description } from the official website.
 * Also maps subcategory slugs → display names.
 */
import productsJson from "@/products_data.json";

type ProductData = {
  name: string;
  specs: Record<string, string>;
  description: string;
};

const productMap = new Map<string, ProductData>();
const subcategoryNameMap = new Map<string, string>();

function walkCategories(categories: any[]) {
  for (const cat of categories) {
    if (cat.slug && cat.name) {
      subcategoryNameMap.set(cat.slug, cat.name);
    }
    if (cat.products) {
      for (const p of cat.products) {
        productMap.set(p.slug, {
          name: p.name,
          specs: p.specs || {},
          description: p.description || ""
        });
      }
    }
    if (cat.subcategories) {
      walkCategories(cat.subcategories);
    }
  }
}

walkCategories(productsJson.categories);

/**
 * Normalize a slug for better matching.
 */
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Fix missing "đ" character in Vietnamese words.
 * When filenames are created, "đ" often gets dropped entirely instead of becoming "d".
 * e.g., "đèn" → "en" (wrong), should be "den"
 *       "điện" → "ien" (wrong), should be "dien"
 *       "đường" → "uong" (wrong), should be "duong"
 *       "đôi" → "oi" (wrong), should be "doi"
 */
function fixMissingD(slug: string): string {
  let fixed = slug;
  
  // Fix at start of slug: "en-" → "den-"
  if (fixed.startsWith("en-")) fixed = "d" + fixed;
  
  // Fix "ien" → "dien" (điện)
  fixed = fixed.replace(/([^a-z])ien($|-)/g, "$1dien$2");
  fixed = fixed.replace(/^ien(-|$)/, "dien$1");
  
  // Fix "uong" → "duong" (đường) - but not "truong", "cuong", etc.
  fixed = fixed.replace(/([^a-z])uong($|-)/g, "$1duong$2");
  fixed = fixed.replace(/^uong(-|$)/, "duong$1");
  
  // Fix "-oi-" → "-doi-" (đôi)
  fixed = fixed.replace(/-oi-/g, "-doi-");
  fixed = fixed.replace(/-oi$/g, "-doi");
  
  // Fix "-au-" → "-dau-" (đầu) - but not "mau", "cau", "sau"
  fixed = fixed.replace(/-au-/g, "-dau-");
  fixed = fixed.replace(/-au$/g, "-dau");
  
  // Fix "-en-" or "-en$" → "-den-" or "-den" (thân đen, etc.)
  fixed = fixed.replace(/-en-/g, "-den-");
  fixed = fixed.replace(/-en$/g, "-den");
  
  // Fix "ieu" → "dieu" (điều) - điều khiển
  fixed = fixed.replace(/-ieu-/g, "-dieu-");
  fixed = fixed.replace(/-ieu$/g, "-dieu");
  
  return fixed;
}

/**
 * Generate slug variations to handle common filename mismatches.
 */
function generateSlugVariations(slug: string): string[] {
  const normalized = normalizeSlug(slug);
  const variations: string[] = [normalized];
  
  // Apply the "đ" fix
  const withD = fixMissingD(normalized);
  if (withD !== normalized) {
    variations.push(withD);
  }
  
  // Also try recursive fix (in case multiple "đ"s are missing)
  let prev = normalized;
  let current = fixMissingD(prev);
  while (current !== prev) {
    variations.push(current);
    prev = current;
    current = fixMissingD(prev);
  }
  
  // Handle wattage variations: "-100w" vs "100w"
  const wattMatch = normalized.match(/[-]?(\d+)[-]?w$/i);
  if (wattMatch) {
    const watt = wattMatch[1];
    for (const v of [...variations]) {
      const base = v.replace(/[-]?(\d+)[-]?w$/i, "");
      variations.push(`${base}${watt}w`);
      variations.push(`${base}-${watt}w`);
    }
  }
  
  // Handle "-1" suffix (duplicate file markers)
  for (const v of [...variations]) {
    if (v.endsWith("-1")) {
      variations.push(v.slice(0, -2));
    }
  }
  
  // Handle model code variations
  for (const v of [...variations]) {
    // Remove "-led-" or "led-" in some patterns
    const cleaned = v.replace(/-led-/g, "-");
    if (cleaned !== v) variations.push(cleaned);
  }
  
  return [...new Set(variations)];
}

/**
 * Look up official product data by slug with smart matching.
 */
export function getOfficialProduct(slug: string): ProductData | undefined {
  // Try exact match first
  const exact = productMap.get(slug);
  if (exact) return exact;
  
  // Try variations
  const variations = generateSlugVariations(slug);
  for (const variation of variations) {
    const match = productMap.get(variation);
    if (match) return match;
  }
  
  // Try prefix matching: JSON slug might be a prefix of file slug
  // e.g., "den-suoi-lap-am-tran-02-bong" matches "den-suoi-lap-am-tran-02-bong-vang"
  for (const variation of variations) {
    for (const [key, value] of productMap.entries()) {
      if (variation.startsWith(key + "-") || variation === key) {
        return value;
      }
      // Also check if key starts with variation (reversed)
      if (key.startsWith(variation + "-")) {
        return value;
      }
    }
  }
  
  // Extract wattage for smarter matching
  const wattMatch = slug.match(/(\d+)w$/i);
  const wattage = wattMatch ? wattMatch[1] : null;
  
  // Try finding by key parts - must match wattage exactly if present
  for (const [key, value] of productMap.entries()) {
    const keyWatt = key.match(/(\d+)w$/i);
    if (wattage && keyWatt && keyWatt[1] === wattage) {
      const slugParts = slug.replace(/^[a-z]+-/, "").split("-");
      const keyParts = key.replace(/^[a-z]+-/, "").split("-");
      const common = slugParts.filter(p => keyParts.includes(p) && p.length > 1);
      if (common.length >= 3) {
        return value;
      }
    }
  }
  
  // Last resort: check if most slug parts match (for products without wattage)
  for (const variation of variations) {
    for (const [key, value] of productMap.entries()) {
      const varParts = variation.split("-").filter(p => p.length > 1);
      const keyParts = key.split("-").filter(p => p.length > 1);
      const common = varParts.filter(p => keyParts.includes(p));
      // Must match at least 60% of the shorter slug's parts
      const threshold = Math.min(varParts.length, keyParts.length) * 0.6;
      if (common.length >= threshold && common.length >= 3) {
        return value;
      }
    }
  }
  
  return undefined;
}

/**
 * Look up official subcategory display name by slug.
 */
export function getOfficialSubcategoryName(slug: string): string | undefined {
  return subcategoryNameMap.get(slug);
}

/**
 * Convert specs object { key: value } to array format [{ label, value }].
 * Cleans up keys that start with "- " prefix from the crawled data.
 */
export function specsToArray(specs: Record<string, string>): Array<{ label: string; value: string }> {
  return Object.entries(specs).map(([key, value]) => ({
    label: key.replace(/^-\s*/, "").trim(),
    value: value.replace(/\.$/, "").trim()
  }));
}
