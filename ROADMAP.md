# Peddle'n Pebbles — Roadmap

## Phase 1: Project Setup & Foundation ✅
- [x] Initialize Next.js 15 project (App Router, TypeScript, Tailwind CSS v4)
- [x] Set up project structure (components, lib, types, data, context)
- [x] Configure Tailwind with hobbit/cozy theme (earthy greens, warm ambers, cream, stone textures)
- [x] Set up Google Fonts (Cinzel Decorative, Cinzel, Crimson Pro, Dancing Script)
- [x] Optimize and place hero image asset (10MB PNG → 800KB JPG via sharp)
- [x] Create base layout (Header with scroll effect + mobile menu, Footer with social links + categories + newsletter)
- [x] Fix Turbopack root resolution (`turbopack.root: "."` in next.config.ts)

## Phase 2: Frontend Pages & Design ✅
- [x] **Home page** — Hero section, welcome copy, featured products grid, about teaser, newsletter signup
- [x] **Shop/Catalog page** — Product grid with category filtering, search, sort by price/name
- [x] **Product detail page** — Large images, description, price, add to cart, related products, glow pulse effect
- [x] **About page** — Store story, owner bio, values section, testimonials
- [x] **Contact page** — Contact form, location info, social media links, hover effect cards
- [x] **Blog page** — Blog post listing with featured image, excerpt, date
- [x] **Blog post page** — Full article view with related posts
- [x] **Cart drawer** — Add/remove/update quantities, running total
- [x] **Cart context** — Client-side cart state management (CartContext.tsx)
- [x] **ProductCard component** — Category gradients, shimmer animation
- [x] **Mock data** — 17 products, 6 categories, 4 blog posts (src/data/)
- [x] **Design system** — Parchment textures, crystal gradients, shimmer animations, warm shadows, wooden frames
- [x] **Section headers** — Enhanced with floating decorative emoji, ornament dividers
- [x] **Shop sidebar** — Wooden frame styling for category filters

## Phase 2.5: Product & Blog Images ✅
- [x] Generate product images for all 17 products (public/products/)
- [x] Generate category images for all 6 categories (public/decor/cat-*.png)
- [x] Generate blog post images for all 4 posts (public/blog/)
- [x] Generate decorative images (crystal collection, gem amethyst, scattered gems, shop interior, crystal glow)
- [x] Shop hero image (public/hero-shop.png)

## Phase 3: Initial Deployment ✅
- [x] Git repository created (github.com/nickbenninghoff-eng/peddlen-pebbles)
- [x] Deployed to Netlify (peddlen-pebbles.netlify.app)
- [x] Static export configured (output: "export")

## Phase 4: Database & Backend ✅
- [x] Set up Neon PostgreSQL database `p:high`
- [x] Configure Prisma ORM with schema (Products, Categories, Orders, OrderItems, BlogPosts, Users) `p:high`
- [x] Migrate product data from mock files to database (seed script) `p:high`
- [x] Create API routes: products (list, detail, search), categories, blog posts `p:high`
- [x] Set up NextAuth for admin authentication (credentials provider, JWT sessions) `p:medium`
- [x] Migrate frontend pages from static mock data to API fetches `p:medium`
- [x] Remove static export, switch to server-rendered `p:medium`

## Phase 5: Shopping Cart & Checkout ✅
- [x] Cart syncs to checkout via API (sends cart items + customer info to server) `p:high`
- [x] Stripe Checkout integration (Stripe hosted checkout via CheckoutSessions API) `p:high`
- [x] Order confirmation page (`/order/success?session_id=...`) `p:high`
- [x] Order stored in database after successful payment (webhook `checkout.session.completed`) `p:high`
- [ ] Email confirmation on order (Resend) `p:medium`

## Phase 6: Admin Panel
- [ ] Admin login (protected routes) `p:high`
- [ ] Product management — CRUD (add, edit, delete, toggle in-stock/out-of-stock) `p:high`
- [ ] Image upload for products (ImgBB API) `p:medium`
- [ ] Category management `p:medium`
- [ ] Order viewing (list orders, status updates) `p:medium`
- [ ] Blog post management — CRUD with rich text editor `p:medium`
- [ ] Dashboard with basic stats (total products, orders, revenue) `p:low`

## Phase 7: Blog & Social Integration
- [ ] Dynamic blog from database (replace static mock data) `p:medium`
- [ ] Social sharing buttons on blog posts `p:low`
- [ ] Open Graph meta tags for social sharing `p:medium`
- [ ] RSS feed for blog `p:low`
- [ ] Facebook Marketplace integration or link-out `p:low`

## Phase 8: Polish & SEO
- [ ] SEO optimization (meta tags, sitemap.xml, robots.txt) `p:medium`
- [ ] Mobile responsive testing & fixes `p:high`
- [ ] Performance optimization (image lazy loading, compression) `p:medium`
- [ ] Favicon and PWA manifest `p:low`
- [ ] Custom 404 page `p:low`
- [ ] Loading states and skeleton screens `p:low`
