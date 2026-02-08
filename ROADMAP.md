# Peddle'n Pebbles — Roadmap

## Phase 1: Project Setup & Foundation ✅
- [ ] Initialize Next.js project (App Router, TypeScript, Tailwind CSS)
- [ ] Set up project structure (components, lib, types)
- [ ] Configure Tailwind with hobbit/cozy theme (earthy greens, warm ambers, cream, stone textures)
- [ ] Set up Google Fonts (display + body fonts — fantasy/serif + clean body)
- [ ] Optimize and place hero image asset
- [ ] Create base layout (Header, Footer, navigation)

## Phase 2: Frontend Pages — Core 🚧
- [ ] **Home page** — Hero section with shop photo, welcome copy, featured products grid, about teaser, newsletter signup
- [ ] **Shop/Catalog page** — Product grid with category filtering, search, sort by price/name, pagination
- [ ] **Product detail page** — Large images, description, price, add to cart, related products
- [ ] **About page** — Store story, owner bio, the hobbit-hole aesthetic, values
- [ ] **Contact page** — Contact form, location info, social media links, hours
- [ ] **Blog page** — Blog post listing with featured image, excerpt, date
- [ ] **Blog post page** — Full article view with social sharing buttons

## Phase 3: Database & Backend
- [ ] Set up Neon PostgreSQL database
- [ ] Configure Prisma ORM with schema (Products, Categories, Orders, OrderItems, BlogPosts, Users, CartItems)
- [ ] Seed database with sample gems/stones products (10-15 items)
- [ ] Create API routes: products (list, detail, search), categories, blog posts
- [ ] Set up NextAuth for admin authentication

## Phase 4: Shopping Cart & Checkout
- [ ] Shopping cart (add/remove/update quantities) — client-side state + persistence
- [ ] Cart drawer/page with running total
- [ ] Stripe Checkout integration (redirect to Stripe hosted checkout)
- [ ] Order confirmation page
- [ ] Order stored in database after successful payment

## Phase 5: Admin Panel
- [ ] Admin login (protected routes)
- [ ] Product management — CRUD (add, edit, delete, toggle in-stock/out-of-stock)
- [ ] Image upload for products (ImgBB)
- [ ] Category management
- [ ] Order viewing (list orders, status)
- [ ] Blog post management — CRUD with rich text editor
- [ ] Dashboard with basic stats (total products, orders, revenue)

## Phase 6: Blog & Social Integration
- [ ] Blog with rich content (markdown or rich text)
- [ ] Social sharing buttons on blog posts
- [ ] Social media link placeholders (Facebook, TikTok, Instagram) in footer/header
- [ ] Open Graph meta tags for social sharing
- [ ] RSS feed for blog

## Phase 7: Polish & Deploy
- [ ] SEO optimization (meta tags, sitemap, robots.txt)
- [ ] Mobile responsive testing
- [ ] Performance optimization (image lazy loading, compression)
- [ ] Favicon and PWA manifest
- [ ] Deploy to Netlify
- [ ] Git repository setup and push
