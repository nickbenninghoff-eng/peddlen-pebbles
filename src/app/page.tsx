'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, Shield, Truck, Star } from 'lucide-react';
import { categories } from '@/data/categories';

const categoryImages: Record<string, string> = {
  crystals: '/decor/cat-crystals.png',
  geodes: '/decor/cat-geodes.png',
  'polished-stones': '/decor/cat-polished.png',
  'raw-minerals': '/decor/cat-raw.png',
  jewelry: '/decor/cat-jewelry.png',
  'mystery-boxes': '/products/mystery-box.png',
};

const testimonials = [
  { name: 'Sarah M.', location: 'Portland, OR', text: 'The amethyst cluster I received was absolutely stunning — even more beautiful than the photos. You can tell every piece is hand-selected with love.', rating: 5 },
  { name: 'Jamie L.', location: 'Austin, TX', text: 'Ordered a mystery box for my daughter and she was over the moon! The packaging felt like opening a treasure chest. We will definitely be back.', rating: 5 },
  { name: 'Priya K.', location: 'Seattle, WA', text: 'Best crystal shop I have found online. The descriptions are so thoughtful, the stones arrive beautifully wrapped, and the energy is just right.', rating: 5 },
];

/* Reusable wave divider — each variant has a unique shape */
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
    3: (
      <>
        <path d="M0 100V60C120 40 360 55 600 48C840 41 1080 28 1320 38L1440 42V100H0Z" fill={fill} opacity="0.3" />
        <path d="M0 100V78C200 45 440 60 680 52C920 44 1160 32 1360 42L1440 46V100H0Z" fill={fill} opacity="0.5" />
        <path d="M0 100V88C280 55 560 70 840 60C1060 52 1280 42 1440 48V100H0Z" fill={fill} />
      </>
    ),
  };

  return (
    <div className="absolute left-0 right-0 z-20" style={{ [flip ? 'top' : 'bottom']: 0, transform: flip ? 'rotate(180deg)' : undefined }}>
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full block" preserveAspectRatio="none" style={{ height: '50px' }}>
        {waves[variant]}
      </svg>
    </div>
  );
}

export default function Home() {
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="firelight-glow" />

      {/* ═══════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative -mt-20 overflow-hidden" style={{ minHeight: '130vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/hero-shop.png"
            alt="Peddle'n Pebbles — a cozy hobbit-hole crystal shop"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(20,12,6,0.15) 0%, rgba(20,12,6,0.1) 40%, rgba(20,12,6,0.55) 70%, rgba(20,12,6,0.92) 100%)',
          }} />
        </div>

        {/* "Welcome to" positioned above the shop sign */}
        <div className="absolute left-0 right-0 z-10 px-6 stagger-in"
          style={{ textAlign: 'center', top: '15%', animationDelay: '0.2s' }}>
          <p className="font-accent text-2xl md:text-3xl lg:text-4xl"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 20px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.3)' }}>
            Welcome to
          </p>
        </div>

        {/* Tagline above the wave */}
        <div className="absolute left-0 right-0 z-10 px-6"
          style={{ textAlign: 'center', bottom: '100px' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <p className="text-base md:text-lg leading-relaxed stagger-in"
              style={{ color: 'rgba(250,245,238,0.75)', animationDelay: '0.4s', textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}>
              Hand-selected gems, crystals &amp; minerals — every stone has a story.
            </p>
          </div>
        </div>

        <WaveDivider fill="var(--cream)" variant={1} />
      </section>


      {/* ═══════════════════════════════════════════════
          EXPLORE OUR COLLECTION
          ═══════════════════════════════════════════════ */}
      <section className="pt-24 md:pt-32 pb-56 md:pb-72 px-6 relative overflow-hidden" style={{ textAlign: 'center' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(196,136,58,0.04) 0%, transparent 50%)',
        }} />

        <div style={{ maxWidth: '1024px', margin: '0 auto', position: 'relative' }}>
          <div className="mb-14 md:mb-18 reveal-on-scroll">
            <p className="font-accent text-2xl md:text-3xl mb-3" style={{ color: 'var(--amber-warm)' }}>
              Hand-picked treasures
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] mb-2">Explore Our Collection</h2>
            <div className="section-ornament">
              <span className="gem-sparkle text-lg" style={{ color: 'var(--amber-warm)' }}>✦</span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: 'var(--earth-light)', maxWidth: '420px', margin: '0 auto' }}>
              Each stone personally chosen for its beauty, energy, and character
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6" style={{ textAlign: 'center' }}>
            {categories.map((cat, i) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden reveal-on-scroll"
                style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="aspect-[4/3] relative">
                  <Image
                    src={categoryImages[cat.id]}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(25,15,8,0.88) 0%, rgba(25,15,8,0.35) 55%, rgba(25,15,8,0.15) 100%)',
                  }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(196,136,58,0.12) 0%, transparent 70%)' }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-5 md:p-6" style={{ textAlign: 'center' }}>
                    <span className="text-3xl mb-2 transition-transform duration-500 group-hover:scale-110">{cat.emoji}</span>
                    <h3 className="text-base md:text-lg mb-1"
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>
                      {cat.name}
                    </h3>
                    <p className="text-xs leading-relaxed mb-2"
                      style={{ color: 'rgba(250,245,238,0.55)', maxWidth: '200px' }}>
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[0.6rem] uppercase tracking-wider opacity-0 translate-y-2 group-hover:opacity-70 group-hover:translate-y-0 transition-all duration-500"
                      style={{ color: 'var(--amber-light)', fontFamily: 'var(--font-heading)' }}>
                      Browse <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="reveal-on-scroll" style={{ marginTop: '2.5rem' }}>
            <Link href="/shop" className="btn-stone text-base px-10">
              View All Treasures <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div style={{ height: '80px' }} />
        </div>

        <WaveDivider fill="var(--cream-dark)" variant={2} />
      </section>


      {/* ═══════════════════════════════════════════════
          OUR STORY
          ═══════════════════════════════════════════════ */}
      <section className="pt-28 md:pt-36 pb-64 md:pb-80 px-6 section-parchment relative overflow-hidden" style={{ textAlign: 'center', borderTop: 'none', borderBottom: 'none' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', position: 'relative' }}>
          <div className="mb-12 md:mb-16 reveal-on-scroll">
            <p className="font-accent text-2xl md:text-3xl mb-3" style={{ color: 'var(--amber-warm)' }}>
              Our Story
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] mb-2">
              From Our Hobbit Hole to Your Home
            </h2>
            <div className="section-ornament">
              <span className="gem-sparkle text-lg" style={{ color: 'var(--amber-warm)' }}>✦</span>
            </div>
          </div>

          <div className="reveal-on-scroll mb-12 md:mb-16">
            <div className="crystal-image rounded-2xl overflow-hidden"
              style={{ boxShadow: 'var(--shadow-warm-xl)', border: '3px solid var(--stone-light)', maxWidth: '900px', margin: '0 auto' }}>
              <Image
                src="/decor/shop-interior.png"
                alt="Inside our cozy hobbit-hole crystal shop"
                width={900}
                height={500}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="reveal-on-scroll" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--earth-medium)' }}>
              Peddle&apos;n Pebbles started as a passion project — a love of the earth&apos;s hidden
              treasures that turned into a cozy little shop bursting with crystals, geodes, and
              hand-selected minerals.
            </p>
            <blockquote className="text-base md:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--earth-medium)', fontStyle: 'italic', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
              &ldquo;Every stone in our collection is personally chosen for its beauty, energy,
              and story. We believe the right crystal finds you at exactly the right time.&rdquo;
            </blockquote>
            <Link href="/about" className="btn-amber">
              Read Our Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6" style={{ marginTop: '4rem' }}>
            {[
              { icon: Sparkles, title: 'Hand-Selected', desc: 'Every stone personally chosen', color: '#7b5ea7' },
              { icon: Heart, title: 'With Love', desc: 'Curated with care from our family', color: '#c77b8b' },
              { icon: Shield, title: 'Ethically Sourced', desc: 'Responsibly sourced materials', color: '#4a7c4b' },
              { icon: Truck, title: 'Fast Shipping', desc: 'Packed and shipped within 24 hours', color: '#c4883a' },
            ].map((item, i) => (
              <div key={i} className="value-card reveal-on-scroll" style={{ textAlign: 'center', transitionDelay: `${(i * 0.08) + 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform duration-500 hover:scale-110"
                  style={{ background: `${item.color}12`, border: `1px solid ${item.color}20`, margin: '0 auto' }}>
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h4 className="text-sm mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--earth-light)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '80px' }} />
        </div>

        <WaveDivider fill="var(--cream)" variant={3} />
      </section>


      {/* ═══════════════════════════════════════════════
          IMAGE BREAK
          ═══════════════════════════════════════════════ */}
      <section className="image-break relative h-56 md:h-72 overflow-hidden">
        <Image
          src="/decor/crystal-collection.png"
          alt="A curated collection of crystals and candles"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="font-accent text-3xl md:text-4xl px-6"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 24px rgba(0,0,0,0.6)', textAlign: 'center' }}>
            Every stone tells a story&hellip;
          </p>
        </div>
        <WaveDivider fill="var(--cream)" variant={1} />
      </section>


      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════ */}
      <section className="pt-28 md:pt-32 pb-60 md:pb-76 px-6 relative overflow-hidden" style={{ textAlign: 'center' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,136,58,0.03) 0%, transparent 60%)',
        }} />

        <div style={{ maxWidth: '1024px', margin: '0 auto', position: 'relative' }}>
          <div className="mb-16 md:mb-20 reveal-on-scroll">
            <p className="font-accent text-2xl md:text-3xl mb-3" style={{ color: 'var(--amber-warm)' }}>
              Kind words
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] mb-2">From Our Crystal Family</h2>
            <div className="section-ornament">
              <span className="gem-sparkle text-lg" style={{ color: 'var(--amber-warm)' }}>✦</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
            {testimonials.map((review, i) => (
              <div key={i} className="testimonial-card reveal-on-scroll"
                style={{ textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
                <div className="flex justify-center gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: 'var(--amber-warm)' }} />
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6"
                  style={{ color: 'var(--earth-medium)', fontStyle: 'italic' }}>
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', letterSpacing: '0.04em' }}>
                  {review.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--earth-light)' }}>{review.location}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '80px' }} />
        </div>

        <WaveDivider fill="#1e120a" variant={2} />
      </section>


      {/* ═══════════════════════════════════════════════
          NEWSLETTER
          ═══════════════════════════════════════════════ */}
      <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-6 relative overflow-hidden" style={{ textAlign: 'center' }}>
        <div className="absolute inset-0">
          <Image src="/decor/crystal-glow.png" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{
            background: `
              linear-gradient(to bottom, rgba(30,18,10,0.75) 0%, rgba(30,18,10,0.55) 50%, rgba(30,18,10,0.75) 100%),
              radial-gradient(ellipse at 50% 50%, rgba(30,18,10,0.2) 0%, rgba(30,18,10,0.6) 100%)
            `,
          }} />
        </div>

        <div className="relative" style={{ maxWidth: '550px', margin: '0 auto' }}>
          <div className="reveal-on-scroll">
            <p className="font-accent text-2xl mb-3" style={{ color: 'var(--amber-glow)' }}>Stay in the loop</p>
            <h2 className="text-3xl md:text-5xl mb-4" style={{ color: 'var(--cream)' }}>
              Join the Crystal Circle
            </h2>
            <div className="section-ornament mb-6">
              <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
            </div>
            <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(250,245,238,0.55)' }}>
              Get first access to new arrivals, exclusive deals, and crystal wisdom delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" style={{ maxWidth: '420px', margin: '0 auto' }} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-6 py-4 rounded-full outline-none"
                style={{
                  background: 'rgba(250,245,238,0.07)',
                  border: '2px solid rgba(250,245,238,0.12)',
                  color: 'var(--cream)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  textAlign: 'center',
                }}
              />
              <button type="submit" className="btn-amber px-8 py-4">
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-6 opacity-25" style={{ color: 'var(--cream)' }}>
              No spam, ever. Just crystal vibes.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
