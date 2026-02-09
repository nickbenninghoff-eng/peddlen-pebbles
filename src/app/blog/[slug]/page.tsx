import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) notFound();

  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} className="text-2xl mt-8 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>{block.replace('## ', '')}</h2>;
      }
      if (block.startsWith('- ')) {
        const items = block.split('\n').filter(l => l.startsWith('- '));
        return (
          <ul key={i} className="list-none space-y-2 my-4">
            {items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-base" style={{ color: 'var(--earth-medium)' }}>
                <span style={{ color: 'var(--amber-warm)' }}>✦</span>
                <span>{item.replace('- ', '')}</span>
              </li>
            ))}
          </ul>
        );
      }
      // Check for bold text
      const parts = block.split(/(\*\*[^*]+\*\*)/);
      return (
        <p key={i} className="text-base leading-relaxed my-4" style={{ color: 'var(--earth-medium)' }}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} style={{ color: 'var(--earth-dark)' }}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-24 px-6 section-parchment page-hero-arch relative overflow-hidden">
        <div className="deco-gem deco-gem--sm deco-gem--purple" style={{ top: '20%', right: '12%' }} />
        <div className="deco-gem deco-gem--md deco-gem--amber" style={{ bottom: '30%', left: '10%' }} />
        <div className="max-w-3xl mx-auto relative">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-6 transition-all duration-300 hover:gap-3"
            style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <span className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4"
            style={{ background: 'var(--moss-medium)', color: 'white', fontFamily: 'var(--font-heading)', fontSize: '0.6rem' }}>
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4 stagger-in" style={{ animationDelay: '0.15s' }}>{post.title}</h1>

          <div className="flex items-center gap-4 stagger-in" style={{ animationDelay: '0.3s' }}>
            <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--earth-light)' }}>
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--earth-light)' }}>
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {renderContent(post.content)}

        {/* Share */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--stone-light)' }}>
          <div className="flex items-center gap-4">
            <Share2 className="w-4 h-4" style={{ color: 'var(--earth-light)' }} />
            <span className="text-sm" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Share this article:</span>
            {['Facebook', 'Twitter', 'Pinterest'].map((platform) => (
              <a key={platform} href="#" className="text-sm px-3 py-1 rounded-full transition-opacity hover:opacity-70"
                style={{ border: '1px solid var(--stone-light)', color: 'var(--earth-medium)', fontFamily: 'var(--font-heading)', fontSize: '0.75rem' }}>
                {platform}
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 px-6" style={{ background: 'var(--cream-dark)' }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl mb-8 text-center">More Crystal Wisdom</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card-parchment group p-5">
                  <span className="text-xs uppercase tracking-wider mb-2 block"
                    style={{ color: 'var(--moss-medium)', fontFamily: 'var(--font-heading)', fontSize: '0.6rem' }}>
                    {p.category}
                  </span>
                  <h3 className="text-base mb-2 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'var(--font-heading)' }}>
                    {p.title}
                  </h3>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--earth-light)' }}>{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
