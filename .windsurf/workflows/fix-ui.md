---
description: Fix UI issues or match the official website design
---

# Fix UI / Match Official Website

## Key files
- **Header**: `components/layout/header.tsx` — sticky header with nav, logo, phone
- **Footer**: `components/layout/footer.tsx` — dark modern footer with 4 columns
- **Page Header**: `components/layout/page-header.tsx` — compact breadcrumb + title for category/subcategory pages
- **Category Page**: `app/shared/category-page.tsx` — renders category with subcategory grid + product grid
- **Subcategory Page**: `components/sections/subcategory-page.tsx` — product listing for a subcategory
- **Product Card**: `components/cards/product-card.tsx` — individual product card with image, name, model code
- **Category Card**: `components/cards/category-card.tsx` — subcategory card with cover image
- **Banner Slider**: `components/layout/banner-slider.tsx` — homepage slider
- **Floating Contact**: `components/layout/floating-contact.tsx` — mobile bottom bar + desktop side buttons
- **Scroll Animation**: `components/ui/animate-on-scroll.tsx` — intersection observer based animations

## Design system
- **Colors**: Orange (#f97316) as primary, slate for text, white backgrounds
- **Tailwind config**: `tailwind.config.ts` — custom shadows, colors, animations
- **Global CSS**: `app/globals.css` — base styles, mobile bottom padding
- **Theme**: White + orange, mobile-first, clean and modern

## Reference
- Official website: https://asialighting.vn
- Sample HTML files in `UI-led-chieu-sang/` folder show the original website structure
- The official website uses WOW.js for scroll animations (we use `AnimateOnScroll` component)

## Steps
1. Compare current UI with the official website or reference screenshots
2. Edit the relevant component files listed above
3. Test on mobile viewport (most users are on mobile)
// turbo
4. Run `npm run build` to verify no errors
