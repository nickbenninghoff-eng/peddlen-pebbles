'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock, BookOpen } from 'lucide-react';
import { blogPosts as mockPosts } from '@/data/blog-posts';

/* Wave divider matching homepage */
function WaveDivider({ fill, variant = 1 }: { fill: string; variant?: number }) {
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
    <div className="absolute left-0 right-0 z-20 bottom-0">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: '50px' }}>
        {waves[variant]}
      </svg>
    </div>
  );
}

function BlogImage({ src, fallback }: { src: string; fallback: string }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className="w-full h-full product-image-placeholder flex items-center justify-center text-4xl">
        {fallback}
      </div>
    );
  }
  return <Image src={src} alt="" fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" onError={() => setError(true)} sizes="(max-width: 768px) 100vw, 50vw" />;
}

export default function BlogPage() {
  const blogPosts = mockPosts;
  const blogEmojis = ['🌙', '💎', '🔮', '✨'];
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

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

  return (
    <div className="min-h-screen">
      {/* ═══ IMMERSIVE HERO ═══ */}
      <section className="relative overflow-hidden -mt-20" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/decor/blog-hero-banner.png"
            alt="Crystal wisdom — an open book surrounded by gemstones"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(20,12,6,0.3) 0%, rgba(20,12,6,0.15) 30%, rgba(20,12,6,0.55) 65%, rgba(20,12,6,0.92) 100%)',
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-24 pt-40" style={{ minHeight: '50vh' }}>
          <p className="font-accent text-2xl md:text-3xl mb-3 stagger-in"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 20px rgba(0,0,0,0.7)', animationDelay: '0.2s' }}>
            Crystal wisdom
          </p>
          <h1 className="text-5xl md:text-7xl mb-4 stagger-in"
            style={{ color: 'var(--cream)', textShadow: '0 3px 30px rgba(0,0,0,0.6)', animationDelay: '0.3s' }}>
            The Blog
          </h1>
          <div className="section-ornament mb-2" style={{ opacity: 0.5 }}>
            <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
          </div>
          <p className="text-base md:text-lg stagger-in max-w-lg text-center"
            style={{ color: 'rgba(250,245,238,0.7)', textShadow: '0 1px 12px rgba(0,0,0,0.5)', animationDelay: '0.5s' }}>
            Guides, tips, and stories from the world of crystals and minerals
          </p>
        </div>

        <WaveDivider fill="var(--cream)" variant={1} />
      </section>

      {/* ═══ FEATURED POST ═══ */}
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="reveal-on-scroll">
            <Link href={`/blog/${featured.slug}`} className="group block card-parchment overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden crystal-image">
                  <BlogImage src={featured.image} fallback={blogEmojis[0]} />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1.5 rounded-full text-xs uppercase tracking-wider"
                      style={{ background: 'var(--amber-warm)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.6rem' }}>
                      <BookOpen className="w-3 h-3 inline -mt-0.5 mr-1" />
                      Latest Post
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                      style={{ background: 'var(--moss-medium)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.6rem' }}>
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--earth-light)' }}>
                      <Calendar className="w-3 h-3" />
                      {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="blog-card-title">{featured.title}</span>
                  </h2>
                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--earth-medium)' }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--moss-medium)', fontFamily: 'var(--font-heading)' }}>
                      Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--earth-light)' }}>
                      <Clock className="w-3 h-3" /> {featured.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ POST GRID ═══ */}
      <section className="pt-8 pb-28 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(196,136,58,0.03) 0%, transparent 50%)',
        }} />

        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group block card-parchment reveal-on-scroll"
                style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="relative h-48 overflow-hidden crystal-image rounded-t-xl">
                  <BlogImage src={post.image} fallback={blogEmojis[(i + 1) % blogEmojis.length]} />
                </div>
                <div className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs uppercase tracking-wider"
                      style={{ background: 'var(--moss-medium)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.55rem' }}>
                      {post.category}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--earth-light)' }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="blog-card-title">{post.title}</span>
                  </h3>
                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--earth-light)' }}>
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--moss-medium)', fontFamily: 'var(--font-heading)' }}>
                    Read More <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
