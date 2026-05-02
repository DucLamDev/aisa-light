/**
 * Audit script to check product name matching between file system and products_data.json
 * Run: node scripts/audit-products.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Load products_data.json
const productsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'products_data.json'), 'utf-8'));

// Build lookup maps
const productsBySlug = new Map();
const productsByName = new Map();
const subcategoriesBySlug = new Map();

function walkCategories(categories) {
  for (const cat of categories) {
    if (cat.slug && cat.name) {
      subcategoriesBySlug.set(cat.slug, cat.name);
    }
    if (cat.products) {
      for (const p of cat.products) {
        productsBySlug.set(p.slug, p);
        // Also index by normalized name parts
        const nameParts = p.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
        productsByName.set(nameParts.join('-'), p);
      }
    }
    if (cat.subcategories) {
      walkCategories(cat.subcategories);
    }
  }
}

walkCategories(productsData.categories);

console.log(`Loaded ${productsBySlug.size} products from products_data.json\n`);

// Slugify function (same as in utils.ts)
function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Fix missing "đ" character
function fixMissingD(slug) {
  let fixed = slug;
  
  // Fix at start: "en-" → "den-"
  if (fixed.startsWith('en-')) fixed = 'd' + fixed;
  
  // Fix "ien" → "dien" (điện)
  fixed = fixed.replace(/([^a-z])ien($|-)/g, '$1dien$2');
  fixed = fixed.replace(/^ien(-|$)/, 'dien$1');
  
  // Fix "uong" → "duong" (đường)
  fixed = fixed.replace(/([^a-z])uong($|-)/g, '$1duong$2');
  fixed = fixed.replace(/^uong(-|$)/, 'duong$1');
  
  // Fix "-oi-" → "-doi-" (đôi)
  fixed = fixed.replace(/-oi-/g, '-doi-');
  fixed = fixed.replace(/-oi$/g, '-doi');
  
  // Fix "-au-" → "-dau-" (đầu)
  fixed = fixed.replace(/-au-/g, '-dau-');
  fixed = fixed.replace(/-au$/g, '-dau');
  
  // Fix "-en-" or "-en$" → "-den-" or "-den"
  fixed = fixed.replace(/-en-/g, '-den-');
  fixed = fixed.replace(/-en$/g, '-den');
  
  // Fix "-ieu-" → "-dieu-" (điều)
  fixed = fixed.replace(/-ieu-/g, '-dieu-');
  fixed = fixed.replace(/-ieu$/g, '-dieu');
  
  return fixed;
}

// Generate slug variations
function generateVariations(slug) {
  const variations = [slug];
  
  // Apply đ fix recursively
  let prev = slug;
  let current = fixMissingD(prev);
  while (current !== prev) {
    variations.push(current);
    prev = current;
    current = fixMissingD(prev);
  }
  
  // Handle "-1" suffix (duplicate markers)
  for (const v of [...variations]) {
    if (v.endsWith('-1')) {
      variations.push(v.slice(0, -2));
    }
  }
  
  // Handle wattage variations
  const wattMatch = slug.match(/(\d+)w$/i);
  if (wattMatch) {
    const watt = wattMatch[1];
    for (const v of [...variations]) {
      const base = v.replace(/[-]?\d+w$/i, '');
      variations.push(`${base}${watt}w`);
      variations.push(`${base}-${watt}w`);
    }
  }
  
  // Remove "-led-" variations
  for (const v of [...variations]) {
    const cleaned = v.replace(/-led-/g, '-');
    if (cleaned !== v) variations.push(cleaned);
  }
  
  return [...new Set(variations)];
}

// Try to find matching product
function findProduct(slug) {
  // Try exact match first
  if (productsBySlug.has(slug)) {
    return { match: 'exact', product: productsBySlug.get(slug) };
  }
  
  // Try variations
  const variations = generateVariations(slug);
  for (const v of variations) {
    if (productsBySlug.has(v)) {
      return { match: 'variation', variation: v, product: productsBySlug.get(v) };
    }
  }
  
  // Try prefix matching
  for (const v of variations) {
    for (const [key, product] of productsBySlug.entries()) {
      if (v.startsWith(key + '-') || v === key) {
        return { match: 'prefix', key, product };
      }
      if (key.startsWith(v + '-')) {
        return { match: 'prefix', key, product };
      }
    }
  }
  
  // Try partial match by wattage + key parts
  const wattMatch = slug.match(/(\d+)w$/i);
  if (wattMatch) {
    const watt = wattMatch[1];
    const slugParts = slug.split('-').filter(p => p.length > 1);
    
    for (const [key, product] of productsBySlug.entries()) {
      const keyWatt = key.match(/(\d+)w$/i);
      if (keyWatt && keyWatt[1] === watt) {
        const keyParts = key.split('-').filter(p => p.length > 1);
        const common = slugParts.filter(p => keyParts.includes(p));
        if (common.length >= 2) {
          return { match: 'partial', key, product };
        }
      }
    }
  }
  
  // Last resort: percentage-based matching
  for (const v of variations) {
    for (const [key, product] of productsBySlug.entries()) {
      const varParts = v.split('-').filter(p => p.length > 1);
      const keyParts = key.split('-').filter(p => p.length > 1);
      const common = varParts.filter(p => keyParts.includes(p));
      const threshold = Math.min(varParts.length, keyParts.length) * 0.6;
      if (common.length >= threshold && common.length >= 3) {
        return { match: 'fuzzy', key, product };
      }
    }
  }
  
  return null;
}

// Scan public folder for images
function scanPublicFolder() {
  const publicDir = path.join(ROOT, 'public');
  const results = { matched: [], unmatched: [] };
  
  function scanDir(dir, category = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip non-product directories
        if (!entry.name.startsWith('Trang-') && !entry.name.startsWith('Den-') && 
            !entry.name.startsWith('den-') && !entry.name.startsWith('am-') &&
            !entry.name.startsWith('Am-') && !entry.name.startsWith('op-') &&
            !entry.name.startsWith('Quat-') && !entry.name.startsWith('quat-') &&
            !entry.name.startsWith('Bep-') && !entry.name.startsWith('bep-') &&
            !entry.name.startsWith('Tu-') && !entry.name.startsWith('tu-') &&
            !entry.name.startsWith('Vot-') && !entry.name.startsWith('vot-') &&
            !entry.name.startsWith('Voi-') && !entry.name.startsWith('voi-') &&
            !entry.name.startsWith('Cai-') && !entry.name.startsWith('cai-') &&
            !entry.name.startsWith('Day-') && !entry.name.startsWith('day-') &&
            !entry.name.startsWith('O-') && !entry.name.startsWith('o-') &&
            !entry.name.startsWith('Bang-') && !entry.name.startsWith('bang-') &&
            !entry.name.startsWith('But-') && !entry.name.startsWith('but-') &&
            !entry.name.startsWith('Cam-') && !entry.name.startsWith('cam-') &&
            !entry.name.startsWith('Cau-') && !entry.name.startsWith('cau-') &&
            !entry.name.startsWith('Thuoc-') && !entry.name.startsWith('thuoc-') &&
            !entry.name.startsWith('Phu-') && !entry.name.startsWith('phu-') &&
            !entry.name.startsWith('Mang-') && !entry.name.startsWith('mang-') &&
            dir.includes('Trang-')) {
          scanDir(fullPath, category || entry.name);
        } else if (entry.name.startsWith('Trang-')) {
          scanDir(fullPath, entry.name);
        } else {
          scanDir(fullPath, category);
        }
      } else if (entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
        const rawName = entry.name.replace(/\.[^.]+$/, '');
        const slug = slugify(rawName);
        const match = findProduct(slug);
        
        const info = {
          file: entry.name,
          path: fullPath.replace(ROOT, ''),
          slug,
          rawName
        };
        
        if (match) {
          results.matched.push({
            ...info,
            matchType: match.match,
            productName: match.product.name,
            productSlug: match.product.slug
          });
        } else {
          results.unmatched.push(info);
        }
      }
    }
  }
  
  scanDir(publicDir);
  return results;
}

// Run audit
console.log('Scanning public folder...\n');
const results = scanPublicFolder();

console.log('='.repeat(80));
console.log(`MATCHED: ${results.matched.length} files`);
console.log('='.repeat(80));

// Group by match type
const byMatchType = {};
for (const m of results.matched) {
  byMatchType[m.matchType] = (byMatchType[m.matchType] || 0) + 1;
}
console.log('Match types:', byMatchType);

console.log('\n' + '='.repeat(80));
console.log(`UNMATCHED: ${results.unmatched.length} files`);
console.log('='.repeat(80));

// Group unmatched by pattern
const patterns = {};
for (const u of results.unmatched) {
  // Extract pattern prefix
  const prefix = u.slug.split('-').slice(0, 2).join('-');
  if (!patterns[prefix]) {
    patterns[prefix] = [];
  }
  patterns[prefix].push(u);
}

// Show unmatched patterns
for (const [prefix, items] of Object.entries(patterns).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n[${prefix}] - ${items.length} files:`);
  for (const item of items.slice(0, 5)) {
    console.log(`  ${item.slug}`);
  }
  if (items.length > 5) {
    console.log(`  ... and ${items.length - 5} more`);
  }
}

// Suggest fixes for common patterns
console.log('\n' + '='.repeat(80));
console.log('SUGGESTED FIXES:');
console.log('='.repeat(80));

const suggestions = new Map();
for (const u of results.unmatched) {
  // Try to find similar products in JSON
  const slugParts = u.slug.split('-');
  for (const [key, product] of productsBySlug.entries()) {
    const keyParts = key.split('-');
    const common = slugParts.filter(p => keyParts.includes(p) && p.length > 2);
    if (common.length >= 2) {
      suggestions.set(u.slug, { jsonSlug: key, productName: product.name });
      break;
    }
  }
}

let sugCount = 0;
for (const [fileSlug, suggestion] of suggestions.entries()) {
  if (sugCount++ < 20) {
    console.log(`${fileSlug} → ${suggestion.jsonSlug} (${suggestion.productName})`);
  }
}
if (suggestions.size > 20) {
  console.log(`... and ${suggestions.size - 20} more suggestions`);
}

// Export results for further analysis
fs.writeFileSync(
  path.join(ROOT, 'audit-results.json'),
  JSON.stringify({ matched: results.matched, unmatched: results.unmatched }, null, 2)
);
console.log('\nResults saved to audit-results.json');
