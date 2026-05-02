---
description: Update contact phone numbers or company info
---

# Update Contact Info

## Central config
All contact info is in `lib/site-config.ts`:
- `phone` / `phoneHref` — main phone number
- `phoneSouth` / `phoneSouthHref` — southern branch phone
- `zaloHref` — Zalo deep link
- `messengerHref` — Facebook Messenger link
- `email` — business email
- `address`, `factoryAddress`, `branchAddress` — office addresses

## Steps
1. Edit `lib/site-config.ts` to update the relevant fields
2. Search for any hardcoded phone numbers across the codebase:
   - `components/layout/header.tsx` — phone button in header
   - `app/page.tsx` — CTA section on homepage
   - `components/layout/footer.tsx` — footer hotline cards
   - `components/layout/floating-contact.tsx` — floating contact buttons
3. Replace all hardcoded numbers with the new value
// turbo
4. Run `npm run build` to verify
