'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
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
  return <Image src={src} alt="" fill className="object-cover" onError={() => setError(true)} sizes="(max-width: 768px) 100vw, 288px" />;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const blogEmojis = ['🌙', '💎', '🔮', '✨'];

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(posts => {
      setBlogPosts(posts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4 animate-pulse">📖</p>
          <p style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-24 px-6 text-center section-parchment page-hero-arch relative overflow-hidden">
        <div className="deco-gem deco-gem--md deco-gem--purple" style={{ top: '22%', right: '15%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--amber" style={{ bottom: '28%', left: '12%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--blue" style={{ top: '45%', left: '6%' }} />
        <div className="absolute top-10 right-[10%] text-lg opacity-[0.05] animate-leaf">🌿</div>

        <p className="font-accent text-2xl mb-3 stagger-in" style={{ color: 'var(--amber-warm)', animationDelay: '0.1s' }}>Crystal wisdom</p>
        <h1 className="text-4xl md:text-6xl mb-4 stagger-in" style={{ animationDelay: '0.2s' }}>The Blog</h1>
        <div className="section-ornament"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
        <p className="text-lg stagger-in" style={{ color: 'var(--earth-light)', animationDelay: '0.4s' }}>Guides, tips, and stories from the world of crystals and minerals</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {blogPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block card-parchment group">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 h-48 md:h-auto flex-shrink-0 relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none crystal-image">
                  <BlogImage src={post.image} fallback={blogEmojis[i] || '✨'} />
                </div>

                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider"
                      style={{ background: 'var(--moss-medium)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.6rem' }}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--earth-light)' }}>
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--earth-light)' }}>
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    <span className="blog-card-title">{post.title}</span>
                  </h2>

                  <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--earth-light)' }}>
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--moss-medium)', fontFamily: 'var(--font-heading)' }}>
                    Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
