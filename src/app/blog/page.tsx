import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-6 text-center" style={{ background: 'var(--cream-dark)' }}>
        <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Crystal wisdom</p>
        <h1 className="text-4xl md:text-5xl mb-4">The Blog</h1>
        <p style={{ color: 'var(--earth-light)' }}>Guides, tips, and stories from the world of crystals and minerals</p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8">
          {blogPosts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className={`block card-parchment group ${i === 0 ? '' : ''}`}>
              <div className="flex flex-col md:flex-row">
                {/* Image placeholder */}
                <div className="md:w-72 h-48 md:h-auto product-image-placeholder flex-shrink-0 flex items-center justify-center text-4xl rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
                  {i === 0 ? '🌙' : i === 1 ? '💎' : i === 2 ? '🔮' : '✨'}
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

                  <h2 className="text-xl md:text-2xl mb-2 transition-colors group-hover:opacity-70" style={{ fontFamily: 'var(--font-heading)' }}>
                    {post.title}
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
