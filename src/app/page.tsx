'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Shield, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const featured = products.filter(p => p.featured).slice(0, 6);

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-opt.jpg"
            alt="Peddle'n Pebbles - A cozy hobbit-hole crystal shop"
            fill
            className="object-cover"
            priority
          />
          {/* Dramatic overlay — warm gradient from left */}
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(to right, rgba(35,22,12,0.92) 0%, rgba(35,22,12,0.75) 35%, rgba(35,22,12,0.4) 60%, rgba(35,22,12,0.2) 100%),
              linear-gradient(to top, rgba(35,22,12,0.6) 0%, transparent 40%)
            `,
          }} />
          {/* Amber glow accent */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 30% 60%, rgba(196,136,58,0.15) 0%, transparent 60%)',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-2xl">
            {/* Decorative top element */}
            <div className="flex items-center gap-3 mb-6 opacity-60">
              <div className="h-px w-12" style={{ background: 'var(--amber-light)' }} />
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--amber-light)', fontFamily: 'var(--font-heading)' }}>
                Est. with love & earth magic
              </span>
            </div>

            <p className="font-accent text-3xl md:text-4xl mb-2" style={{ color: 'var(--amber-glow)' }}>
              Welcome to
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-[1.05]" style={{ color: 'var(--cream)', textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}>
              Peddle&apos;n<br />Pebbles
            </h1>
            <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: 'rgba(250,245,238,0.8)', fontStyle: 'italic' }}>
              Treasures from the earth, curated with love. Hand-selected gems, crystals, and minerals from our cozy little shop to your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-stone text-base px-10 py-5">
                Explore the Shop <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-amber text-base px-10 py-5">
                Our Story
              </Link>
            </div>

            {/* Trust line */}
            <div className="flex flex-wrap gap-6 mt-12 opacity-50">
              {['✦ Hand-Selected', '✦ Ethically Sourced', '✦ Shipped with Love'].map((item) => (
                <span key={item} className="text-xs uppercase tracking-wider" style={{ color: 'var(--cream)', fontFamily: 'var(--font-heading)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 100V50C200 10 400 30 600 50C800 70 1000 20 1200 40C1320 52 1400 45 1440 50V100H0Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ═══ FEATURED GEMS ═══ */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-accent text-2xl mb-3" style={{ color: 'var(--amber-warm)' }}>Hand-picked treasures</p>
            <h2 className="text-4xl md:text-5xl mb-4">Featured Gems</h2>
            <div className="divider-vine max-w-xs mx-auto">
              <span className="gem-sparkle">✦</span>
            </div>
            <p className="mt-4 max-w-md mx-auto" style={{ color: 'var(--earth-light)' }}>
              Each stone personally chosen for its beauty, energy, and story
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product, i) => (
              <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/shop" className="btn-stone text-base px-10">
              View All Treasures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SHOP BY CATEGORY ═══ */}
      <section className="py-24 px-6 section-parchment">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-accent text-2xl mb-3" style={{ color: 'var(--amber-warm)' }}>Browse our collection</p>
            <h2 className="text-4xl md:text-5xl mb-4">Shop by Category</h2>
            <div className="divider-vine max-w-xs mx-auto">✦</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}
                className="category-card group p-8 md:p-10 text-center rounded-2xl"
                style={{ background: 'var(--cream)', border: '2px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
                <span className="text-5xl md:text-6xl block mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {cat.emoji}
                </span>
                <h3 className="text-base md:text-lg mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                  {cat.name}
                </h3>
                <p className="text-sm hidden md:block leading-relaxed" style={{ color: 'var(--earth-light)' }}>
                  {cat.description}
                </p>
                <span className="inline-block mt-3 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: 'var(--moss-medium)', fontFamily: 'var(--font-heading)' }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT TEASER ═══ */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle at 70% 50%, var(--amber-warm) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4 opacity-60">
                <div className="h-px w-12" style={{ background: 'var(--amber-warm)' }} />
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--amber-warm)', fontFamily: 'var(--font-heading)' }}>
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 leading-tight">
                From Our Hobbit Hole<br />to Your Home
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: 'var(--earth-medium)' }}>
                Peddle&apos;n Pebbles started as a passion project — a love of the earth&apos;s hidden treasures that turned into a cozy little shop
                bursting with crystals, geodes, and hand-selected minerals.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--earth-medium)', fontStyle: 'italic' }}>
                &ldquo;Every stone in our collection is personally chosen for its beauty, energy, and story. We believe that the right crystal
                finds you at exactly the right time.&rdquo;
              </p>
              <Link href="/about" className="btn-amber">
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Value cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Sparkles, title: 'Hand-Selected', desc: 'Every stone personally chosen for quality and energy', color: 'var(--crystal-purple)' },
                { icon: Heart, title: 'With Love', desc: 'Curated with care from our family to yours', color: 'var(--crystal-rose)' },
                { icon: Shield, title: 'Ethically Sourced', desc: 'Responsibly sourced from trusted suppliers', color: 'var(--moss-medium)' },
                { icon: Truck, title: 'Fast Shipping', desc: 'Carefully packed and shipped within 24 hours', color: 'var(--amber-warm)' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px]"
                  style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
                  <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: `${item.color}15` }}>
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h4 className="text-sm mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--earth-light)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-24 px-6 section-dark relative overflow-hidden">
        {/* Decorative gems */}
        <div className="absolute top-10 left-10 text-4xl opacity-10 gem-sparkle">💎</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-10 gem-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute top-1/2 right-1/4 text-2xl opacity-10 gem-sparkle" style={{ animationDelay: '0.8s' }}>🔮</div>

        <div className="max-w-2xl mx-auto text-center relative">
          <p className="font-accent text-2xl mb-3" style={{ color: 'var(--amber-glow)' }}>Stay in the loop</p>
          <h2 className="text-3xl md:text-5xl mb-5" style={{ color: 'var(--cream)' }}>
            Join the Crystal Circle
          </h2>
          <p className="mb-10 text-base" style={{ color: 'rgba(250,245,238,0.65)' }}>
            Get first access to new arrivals, exclusive deals, and crystal wisdom delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 rounded-full text-sm outline-none"
              style={{
                background: 'rgba(250,245,238,0.08)',
                border: '2px solid rgba(250,245,238,0.15)',
                color: 'var(--cream)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
              }}
            />
            <button type="submit" className="btn-amber px-8 py-4">
              Subscribe ✨
            </button>
          </form>
          <p className="text-xs mt-4 opacity-30" style={{ color: 'var(--cream)' }}>No spam, ever. Just crystal vibes.</p>
        </div>
      </section>
    </>
  );
}
