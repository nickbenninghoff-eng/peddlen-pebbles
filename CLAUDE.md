# CLAUDE.md — Peddle'n Pebbles

## Project Overview
E-commerce website for **Peddle'n Pebbles**, a rock/gem/crystal selling store run from the owner's home. She currently sells on Facebook Marketplace and wants a proper online presence.

## Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Neon PostgreSQL (via Prisma ORM) — set up later
- **Auth:** NextAuth v5 — set up later
- **Payments:** Stripe Checkout — set up later
- **Icons:** Lucide React
- **Deployment:** Netlify

## Design Direction — COZY HOBBIT AESTHETIC

### Theme: "The Hobbit's Gem Shop"
Think Bag End meets crystal shop. Warm, inviting, magical, earthy. Like walking into a cozy burrow filled with glowing crystals.

### Color Palette (CSS Variables)
```
--earth-dark: #3d2b1f        /* Rich dark brown — primary text, headers */
--earth-medium: #6b4c3b      /* Warm brown — secondary elements */
--earth-light: #8b6f5e       /* Lighter brown — borders, muted text */
--moss-dark: #2d4a2e         /* Deep forest green — primary accent */
--moss-medium: #4a7c4b       /* Hobbit door green — buttons, links */
--moss-light: #7ab07c        /* Soft green — hover states */
--amber-warm: #c4883a        /* Warm amber/gold — highlights, gem accents */
--amber-light: #e8b86d       /* Light gold — subtle highlights */
--cream: #faf5ee             /* Warm cream — page background */
--cream-dark: #f0e8d8        /* Darker cream — card backgrounds */
--stone-light: #e8e0d4       /* Light stone — borders, dividers */
--stone-dark: #b8a898        /* Warm stone gray */
--crystal-purple: #7b5ea7    /* Amethyst accent */
--crystal-blue: #5b8fb9      /* Aquamarine accent */
--crystal-rose: #c77b8b      /* Rose quartz accent */
```

### Typography
- **Display font:** Use a fantasy/serif font — something like "Cinzel Decorative", "MedievalSharp", or "Uncial Antiqua" for the logo and headings. Something that feels handcrafted and elvish.
- **Body font:** "Crimson Pro", "Libre Baskerville", or similar warm serif for body text. NOT sans-serif — this is a cozy shop, not a tech startup.
- **Accent font:** A script/handwritten font for special callouts.

### Visual Elements
- Rounded corners everywhere (hobbit doors are round!)
- Subtle paper/parchment texture on backgrounds
- Warm shadows (brown-tinted, not gray)
- Decorative borders with a vine/nature motif where appropriate
- The hero image (in /assets/) shows the actual shop — a hobbit-hole style entrance with crystals inside
- Gem/crystal emoji or SVG icons as decorative accents scattered naturally
- Warm gradient overlays on images

### Key Design Rules
- NO cold/corporate feeling
- NO stark white backgrounds — always warm cream/ivory
- NO sharp angular designs — keep things rounded and organic
- Buttons should look like smooth stones or have a gem-like quality
- Cards should feel like parchment or wooden display boxes
- Navigation should feel like a wooden sign or tavern menu board

## Hero Image
Located at: `/assets/Gemini_Generated_Image_ywhjdjywhjdjywhj.png`
- Move/copy to `/public/hero.png` (optimized)
- This is a hobbit-hole style shop entrance with crystals inside, warm amber lighting
- Use as the main hero image on the homepage

## Pages to Build (Phase 1 — Frontend Only)

### 1. Homepage (`/`)
- Hero section with the shop photo, overlaid text: "Peddle'n Pebbles" + tagline like "Treasures from the Earth, Curated with Love"
- "Featured Gems" section — 4-6 product cards (use placeholder data for now)
- "Our Story" teaser section with a warm paragraph about the shop
- "Shop by Category" section with visual category cards (Crystals, Geodes, Polished Stones, Raw Minerals, Jewelry, Mystery Boxes)
- Newsletter signup section
- Testimonials/reviews section

### 2. Shop Page (`/shop`)
- Product grid with filtering sidebar (by category, price range, sort)
- Product cards: image, name, price, "Add to Cart" button
- Search bar
- Use mock product data (15-20 items) with placeholder images
- Pagination or "Load More"

### 3. Product Detail Page (`/shop/[id]`)
- Large product image(s)
- Name, price, description, properties (weight, origin, metaphysical properties)
- "Add to Cart" button
- Related products section
- Use a mock single product for now

### 4. About Page (`/about`)
- The shop's story — how it started, the passion for gems
- Owner section (use placeholder — pink-haired woman from the hero image)
- Values: sustainable sourcing, hand-selected, community
- Photo gallery section

### 5. Contact Page (`/contact`)
- Contact form (name, email, message)
- Social media links (Facebook, TikTok, Instagram) — use "#" placeholder hrefs
- Business hours
- Location info (general area, not exact address)

### 6. Blog Page (`/blog`)
- Blog post listing with featured images, titles, excerpts, dates
- Use 3-4 mock blog posts (topics: "How to Cleanse Your Crystals", "Birthstone Guide", etc.)
- Category tags

### 7. Blog Post Page (`/blog/[slug]`)
- Full article layout
- Social sharing buttons
- Related posts

## Shared Components
- **Header/Nav:** Logo + nav links (Home, Shop, About, Blog, Contact) + Cart icon with count
- **Footer:** Logo, quick links, social media icons (FB/TikTok/IG), newsletter signup, copyright
- **Product Card:** Reusable card with image, name, price, add-to-cart
- **Cart Drawer:** Slide-out cart panel (client-side state for now)

## Mock Data
Create mock data files in `/src/data/` for:
- `products.ts` — 15-20 gems/stones with name, price, description, category, image placeholder, properties
- `categories.ts` — 6 categories with names and descriptions
- `blog-posts.ts` — 3-4 sample posts
- Categories: Crystals, Geodes, Polished Stones, Raw Minerals, Jewelry, Mystery Boxes

## Technical Notes
- Use Next.js App Router (all pages in `/src/app/`)
- Client components only where needed (cart state, interactive elements)
- Image optimization via next/image
- Mobile-first responsive design
- Accessible (proper heading hierarchy, alt text, ARIA labels)
- The `.claude` settings should have `Skill(frontend-design)` permission enabled

## What NOT to Build Yet
- Database integration (Phase 3)
- Auth/Admin panel (Phase 5)
- Stripe checkout (Phase 4)
- Real product images (will add later)
- Social media API integration (Phase 6)
