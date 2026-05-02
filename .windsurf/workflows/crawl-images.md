---
description: Crawl product images from the official asialighting.vn website
---

# Crawl Product Images

## Prerequisites
- Node.js installed
- The crawl script at `scripts/crawl-images.mjs`

## Run the crawl
1. Run `node scripts/crawl-images.mjs` from the project root
2. The script will:
   - Fetch each category page from asialighting.vn
   - Find all subcategory links
   - For each subcategory, find all product links
   - Download product images into `public/Trang-{category}/{subcategory}/`
   - Name images using the product title from the website (hyphenated, e.g. `OTG24-01-24W.png`)
3. Only product images are downloaded (no logos, banners, or icons)
4. Existing images are skipped (not re-downloaded)

## After crawling
// turbo
1. Run `npm run build` to verify the new products appear correctly
2. Check the subcategory folders under `public/` to confirm images are properly organized
