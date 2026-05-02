---
description: How to add a new product or subcategory to the catalog
---

# Add Product / Subcategory

Products are auto-generated from the file system. The catalog reads folders and images under `public/`.

## Add a new subcategory
1. Create a folder under the category root, e.g. `public/Trang-LED-chieu-sang/Ten-danh-muc-con/`
2. Folder name uses PascalCase with hyphens (e.g. `Den-led-am-tran`)
3. If the subcategory needs a custom Vietnamese display name, add it to `lib/catalog-labels.ts` in the `subcategoryLabels` map with its slug as the key

## Add product images
1. Place product images (`.jpg`, `.png`, `.webp`) inside the subcategory folder
2. **Naming convention**: Use the product name from the official website, hyphen-separated
   - Example: `OTG24-01-24W.png` → model code = `OTG24-01`, wattage = `24W`
   - Example: `Den-tron-cong-suat-nho-5W.jpg` → wattage = `5W`
3. The system auto-extracts model code (uppercase letters+numbers pattern) and wattage (number+W) from file names
4. Each image = one product entry in the catalog

## Add product via CMS
1. Edit `data/custom-products.json` to add products with full metadata (name, description, specs, etc.)
2. CMS products override file-system products and support richer data

## Verify
// turbo
1. Run `npm run build` to verify the new products appear correctly
