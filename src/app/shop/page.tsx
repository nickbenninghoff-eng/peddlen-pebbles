'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products as mockProducts } from '@/data/products';
import { categories as mockCategories } from '@/data/categories';
import type { Product } from '@/data/products';

type SortOption = 'name' | 'price-low' | 'price-high' | 'featured';

/* Wave divider matching homepage */
function WaveDivider({ fill, variant = 1, flip = false }: { fill: string; variant?: number; flip?: boolean }) {
  const waves: Record<number, React.ReactNode> = {
    1: (
      <>
        <path d="M0 100V65C160 30 320 50 480 45C640 40 800 25 960 35C1120 45 1280 30 1380 38L1440 42V100H0Z" fill={fill} opacity="0.3" />
        <path d="M0 100V75C200 38 400 58 600 50C800 42 1000 22 1200 38C1320 48 1400 42 1440 46V100H0Z" fill={fill} opacity="0.5" />
        <path d="M0 100V85C240 48 480 66 720 56C960 46 1140 34 1300 44C1380 50 1420 46 1440 48V100H0Z" fill={fill} />
      </>
    ),
    2: (
      <>
        <path d="M0 100V70C240 35 480 55 720 42C960 29 1200 45 1440 38V100H0Z" fill={fill} opacity="0.35" />
        <path d="M0 100V80C180 50 360 65 540 55C720 45 900 30 1080 40C1260 50 1380 42 1440 45V100H0Z" fill={fill} opacity="0.55" />
        <path d="M0 100V88C300 58 600 72 900 62C1100 55 1300 48 1440 52V100H0Z" fill={fill} />
      </>
    ),
  };
  return (
    <div className="absolute left-0 right-0 z-20" style={{ [flip ? 'top' : 'bottom']: 0, transform: flip ? 'rotate(180deg)' : undefined }}>
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: '50px' }}>
        {waves[variant]}
      </svg>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  /* Scroll-reveal observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const products: Product[] = mockProducts;
  const categories = mockCategories;

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'featured': result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen">
      {/* ═══ IMMERSIVE HERO ═══ */}
      <section className="relative overflow-hidden -mt-20" style={{ minHeight: '55vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/decor/shop-hero-banner.png"
            alt="The crystal shop — shelves of glowing gems"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(20,12,6,0.25) 0%, rgba(20,12,6,0.15) 30%, rgba(20,12,6,0.5) 65%, rgba(20,12,6,0.92) 100%)',
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-24 pt-40" style={{ minHeight: '55vh' }}>
          <p className="font-accent text-2xl md:text-3xl mb-3 stagger-in"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 20px rgba(0,0,0,0.7)', animationDelay: '0.2s' }}>
            Browse our collection
          </p>
          <h1 className="text-5xl md:text-7xl mb-4 stagger-in"
            style={{ color: 'var(--cream)', textShadow: '0 3px 30px rgba(0,0,0,0.6)', animationDelay: '0.3s' }}>
            The Shop
          </h1>
          <div className="section-ornament mb-2" style={{ opacity: 0.5 }}>
            <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
          </div>
          <p className="text-base md:text-lg stagger-in max-w-lg text-center"
            style={{ color: 'rgba(250,245,238,0.7)', textShadow: '0 1px 12px rgba(0,0,0,0.5)', animationDelay: '0.5s' }}>
            Every stone has been hand-selected with care and intention
          </p>
        </div>

        <WaveDivider fill="var(--cream)" variant={1} />
      </section>

      {/* ═══ SHOP CONTENT ═══ */}
      <section className="pt-10 pb-20 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(196,136,58,0.03) 0%, transparent 50%)',
        }} />

        <div className="max-w-7xl mx-auto relative">
          {/* Search & Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 reveal-on-scroll">
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--stone-dark)' }} />
              <input
                type="text"
                placeholder="Search for crystals, stones, gems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-full text-sm outline-none transition-shadow"
                style={{
                  background: 'var(--cream-dark)',
                  border: '2px solid var(--stone-light)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--earth-dark)',
                  boxShadow: 'var(--shadow-warm)',
                }}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-5 py-3.5 rounded-full text-sm cursor-pointer outline-none"
                style={{
                  background: 'var(--cream-dark)',
                  border: '2px solid var(--stone-light)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--earth-dark)',
                  fontSize: '0.8rem',
                  boxShadow: 'var(--shadow-warm)',
                }}
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden px-5 py-3.5 rounded-full flex items-center gap-2 text-sm"
                style={{
                  background: 'var(--cream-dark)',
                  border: '2px solid var(--stone-light)',
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--earth-dark)',
                }}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Categories */}
            <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
              <div className="sidebar-wooden reveal-on-scroll">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--amber-warm)' }} />
                  <h3 className="text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                    Categories
                  </h3>
                </div>
                <nav className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${selectedCategory === 'all' ? 'font-semibold' : 'hover:pl-5 hover:bg-[var(--cream-dark)]'}`}
                    style={{
                      background: selectedCategory === 'all' ? 'var(--moss-medium)' : 'transparent',
                      color: selectedCategory === 'all' ? 'white' : 'var(--earth-medium)',
                      fontFamily: 'var(--font-body)',
                      boxShadow: selectedCategory === 'all' ? '0 2px 8px rgba(45,74,46,0.25)' : 'none',
                    }}
                  >
                    All Treasures ({products.length})
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${selectedCategory === cat.id ? 'font-semibold' : 'hover:pl-5 hover:bg-[var(--cream-dark)]'}`}
                        style={{
                          background: selectedCategory === cat.id ? 'var(--moss-medium)' : 'transparent',
                          color: selectedCategory === cat.id ? 'white' : 'var(--earth-medium)',
                          fontFamily: 'var(--font-body)',
                          boxShadow: selectedCategory === cat.id ? '0 2px 8px rgba(45,74,46,0.25)' : 'none',
                        }}
                      >
                        {cat.emoji} {cat.name} ({count})
                      </button>
                    );
                  })}
                </nav>

                {/* Decorative sidebar accent */}
                <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--stone-light)' }}>
                  <p className="font-accent text-sm" style={{ color: 'var(--amber-warm)' }}>
                    &ldquo;The right crystal finds you at exactly the right time.&rdquo;
                  </p>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="text-center py-20 reveal-on-scroll">
                  <p className="text-5xl mb-4">🔮</p>
                  <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No treasures found</h3>
                  <p style={{ color: 'var(--earth-light)' }}>Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  <p className="text-sm mb-6 reveal-on-scroll" style={{ color: 'var(--earth-light)' }}>
                    Showing {filtered.length} treasure{filtered.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product, i) => (
                      <div key={product.id} className="reveal-on-scroll" style={{ transitionDelay: `${(i % 6) * 0.06}s` }}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4 animate-pulse">💎</p>
          <p style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Loading treasures...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
