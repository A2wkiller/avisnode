# Branding Update: BelyxHost → AvixNode

## Overview
Complete rebranding from "BelyxHost" to "AvixNode" across the entire project.

## Changes Made

### 1. Brand Name Updates
- **Old**: BelyxHost, Belyx
- **New**: AvixNode

### 2. Files Updated

#### HTML & Meta Tags
- `index.html`
  - Page title: "AvixNode - High Performance Game Hosting"
  - Open Graph tags updated
  - Twitter card tags updated
  - All URLs changed to avixnode.com

#### Components
- `src/app/components/ui/Layout.tsx`
  - Logo references updated
  - Footer copyright updated
  - Navigation branding updated

- `src/app/components/Testimonials.tsx`
  - Testimonial section text updated

#### Pages
- `src/app/pages/Cart.tsx`
  - localStorage key: `belyx_cart` → `avixnode_cart`

- `src/app/pages/GameHosting.tsx`
  - localStorage key: `belyx_cart` → `avixnode_cart`

- `src/app/pages/Shared.tsx`
  - localStorage key: `belyx_cart` → `avixnode_cart`
  - Logo reference updated

- `src/app/pages/Dedicated.tsx`
  - localStorage key: `belyx_cart` → `avixnode_cart`

- `src/app/pages/PrivacyPolicy.tsx`
  - All brand references updated
  - Company name in policy text updated

- `src/app/pages/TermsOfService.tsx`
  - All brand references updated
  - Company name in terms updated

#### Assets
- `src/app/assets.ts`
  - Asset key: `imgBelyxHostLogo` → `imgAvixNodeLogo`
  - Asset path: `/assets/belyxhost-logo.png` → `/assets/avixnode-logo.png`

#### SEO & Sitemap
- `public/sitemap.xml`
  - All URLs updated to avixnode.com
  - Image captions updated
  - License URLs updated

- `scripts/generate-sitemap.js`
  - BASE_URL updated to avixnode.com
  - Caption text updated

### 3. LocalStorage Key Changes
All cart functionality now uses `avixnode_cart` instead of `belyx_cart`:
- Cart items storage
- Cart retrieval
- Cart clearing on checkout

### 4. Logo Asset Requirements
**Action Required**: Update or create logo file
- **Old path**: `/public/assets/belyxhost-logo.png`
- **New path**: `/public/assets/avixnode-logo.png`

You'll need to:
1. Create/upload the AvixNode logo to `/public/assets/avixnode-logo.png`
2. Ensure it's optimized for web (PNG format, transparent background recommended)
3. Recommended size: 200x200px minimum for retina displays

### 5. Domain References
All domain references updated:
- **Old**: belyxhost.com
- **New**: avixnode.com

This includes:
- Meta tags (Open Graph, Twitter)
- Sitemap URLs
- Image URLs
- License URLs

## Testing Checklist

- [ ] Verify logo displays correctly in navigation
- [ ] Check footer branding
- [ ] Test cart functionality with new localStorage key
- [ ] Verify meta tags in browser dev tools
- [ ] Check sitemap.xml renders correctly
- [ ] Test all pages for remaining "BelyxHost" references
- [ ] Verify Privacy Policy and Terms of Service text
- [ ] Check mobile navigation logo
- [ ] Test social media sharing (Open Graph preview)

## Migration Notes

### For Existing Users
Users with items in their cart under the old `belyx_cart` key will have an empty cart after this update. This is expected behavior as the localStorage key has changed.

If you want to migrate existing cart data:
```javascript
// Run this once in browser console after deployment
const oldCart = localStorage.getItem('belyx_cart');
if (oldCart && !localStorage.getItem('avixnode_cart')) {
  localStorage.setItem('avixnode_cart', oldCart);
  localStorage.removeItem('belyx_cart');
  console.log('Cart migrated to AvixNode');
}
```

## Files Requiring Logo Asset
The following files reference the logo and will need the actual logo file:
- `/public/assets/avixnode-logo.png` (main logo file)

## Verification
All TypeScript files compile without errors. No diagnostics found.

---

**Status**: ✅ Complete
**Date**: March 9, 2026
**Branding**: BelyxHost → AvixNode
