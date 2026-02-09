'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/product';
import { normalizeProduct } from '@/types/product';

interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  _count?: { products: number };
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'featured';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(r => r.json()),
      fetch('/api/categories').then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods.map(normalizeProduct));
      setCategories(cats);
      setLoading(false);
    });
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4 animate-pulse">💎</p>
          <p style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Loading treasures...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-24 px-6 text-center section-parchment page-hero-arch relative overflow-hidden">
        <div className="deco-gem deco-gem--md deco-gem--purple" style={{ top: '20%', left: '12%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--amber" style={{ bottom: '28%', right: '18%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--blue" style={{ top: '40%', left: '6%' }} />
        <div className="deco-gem deco-gem--lg deco-gem--rose" style={{ top: '30%', right: '8%' }} />
        <div className="absolute top-10 right-[12%] text-xl opacity-[0.05] animate-leaf">🌿</div>

        <p className="font-accent text-2xl mb-3 stagger-in" style={{ color: 'var(--amber-warm)', animationDelay: '0.1s' }}>Browse our collection</p>
        <h1 className="text-4xl md:text-6xl mb-4 stagger-in" style={{ animationDelay: '0.2s' }}>The Shop</h1>
        <div className="section-ornament"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
        <p className="text-lg stagger-in" style={{ color: 'var(--earth-light)', animationDelay: '0.4s' }}>Every stone has been hand-selected with care and intention</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--stone-dark)' }} />
            <input
              type="text"
              placeholder="Search for crystals, stones, gems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full text-sm outline-none transition-shadow focus:shadow-lg"
              style={{
                background: 'var(--cream-dark)',
                border: '1px solid var(--stone-light)',
                fontFamily: 'var(--font-body)',
                color: 'var(--earth-dark)',
              }}
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 rounded-full text-sm cursor-pointer outline-none"
              style={{
                background: 'var(--cream-dark)',
                border: '1px solid var(--stone-light)',
                fontFamily: 'var(--font-heading)',
                color: 'var(--earth-dark)',
                fontSize: '0.8rem',
              }}
            >
              <option value="featured">Featured</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-4 py-3 rounded-full flex items-center gap-2 text-sm"
              style={{
                background: 'var(--cream-dark)',
                border: '1px solid var(--stone-light)',
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
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-60 flex-shrink-0`}>
            <div className="sidebar-wooden">
            <h3 className="text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
              Categories
            </h3>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${selectedCategory === 'all' ? 'font-semibold' : ''}`}
                style={{
                  background: selectedCategory === 'all' ? 'var(--moss-medium)' : 'transparent',
                  color: selectedCategory === 'all' ? 'white' : 'var(--earth-medium)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                All Treasures ({products.length})
              </button>
              {categories.map((cat) => {
                const count = cat._count?.products ?? products.filter(p => p.category === cat.id).length;
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
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🔮</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>No treasures found</h3>
                <p style={{ color: 'var(--earth-light)' }}>Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <p className="text-sm mb-6" style={{ color: 'var(--earth-light)' }}>
                  Showing {filtered.length} treasure{filtered.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading shop...</p></div>}>
      <ShopContent />
    </Suspense>
  );
}
