'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { categories } from '@/data/categories';

const featured = products.filter(p => p.featured).slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="Peddle'n Pebbles - A cozy hobbit-hole crystal shop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(61,43,31,0.85) 0%, rgba(61,43,31,0.6) 40%, rgba(61,43,31,0.3) 100%)',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-accent text-2xl md:text-3xl mb-4" style={{ color: 'var(--amber-light)' }}>
              Welcome to
            </p>
            <h1 className="font-display text-5xl md:text-7xl mb-6 leading-tight" style={{ color: 'var(--cream)' }}>
              Peddle&apos;n<br />Pebbles
            </h1>
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-lg" style={{ color: 'rgba(250,245,238,0.85)' }}>
              Treasures from the earth, curated with love. Hand-selected gems, crystals, and minerals from our cozy little shop to your home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-stone text-base px-8 py-4">
                Explore the Shop <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/about" className="btn-amber text-base px-8 py-4">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80V40C240 0 480 20 720 40C960 60 1200 20 1440 40V80H0Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* Featured Gems */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Hand-picked treasures</p>
            <h2 className="text-3xl md:text-4xl mb-4">Featured Gems</h2>
            <div className="divider-vine max-w-xs mx-auto">✦</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-stone">
              View All Treasures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 px-6" style={{ background: 'var(--cream-dark)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Browse our collection</p>
            <h2 className="text-3xl md:text-4xl mb-4">Shop by Category</h2>
            <div className="divider-vine max-w-xs mx-auto">✦</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}
                className="group relative overflow-hidden rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:scale-[1.02]"
                style={{ background: 'var(--cream)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
                <span className="text-4xl md:text-5xl block mb-3 transition-transform duration-500 group-hover:scale-110">
                  {cat.emoji}
                </span>
                <h3 className="text-sm md:text-base mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                  {cat.name}
                </h3>
                <p className="text-xs hidden md:block" style={{ color: 'var(--earth-light)' }}>
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>A little about us</p>
              <h2 className="text-3xl md:text-4xl mb-6">From Our Hobbit Hole to Your Home</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--earth-medium)' }}>
                Peddle&apos;n Pebbles started as a passion project — a love of the earth&apos;s hidden treasures that turned into a cozy little shop
                bursting with crystals, geodes, and hand-selected minerals.
              </p>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--earth-medium)' }}>
                Every stone in our collection is personally chosen for its beauty, energy, and story. We believe that the right crystal
                finds you at exactly the right time.
              </p>
              <Link href="/about" className="btn-amber">
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Sparkles, title: 'Hand-Selected', desc: 'Every stone personally chosen for quality and energy' },
                { icon: Heart, title: 'With Love', desc: 'Curated with care from our family to yours' },
                { icon: Shield, title: 'Ethically Sourced', desc: 'Responsibly sourced from trusted suppliers' },
                { icon: ArrowRight, title: 'Fast Shipping', desc: 'Carefully packed and shipped with love' },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                  <item.icon className="w-6 h-6 mb-3" style={{ color: 'var(--moss-medium)' }} />
                  <h4 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                    {item.title}
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--earth-light)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6" style={{ background: 'var(--earth-dark)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-light)' }}>Stay in the loop</p>
          <h2 className="text-3xl md:text-4xl mb-4" style={{ color: 'var(--cream)' }}>
            Join the Crystal Circle
          </h2>
          <p className="mb-8" style={{ color: 'rgba(250,245,238,0.7)' }}>
            Get first access to new arrivals, exclusive deals, and crystal wisdom delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none"
              style={{
                background: 'rgba(250,245,238,0.1)',
                border: '1px solid rgba(250,245,238,0.2)',
                color: 'var(--cream)',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button type="submit" className="btn-amber px-8">
              Subscribe ✨
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
