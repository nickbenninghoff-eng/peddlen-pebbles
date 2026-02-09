import prisma from '@/lib/prisma';
import Link from 'next/link';
import { BlogActions } from './BlogActions';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { date: 'desc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
          Blog Posts ({posts.length})
        </h1>
        <Link href="/admin/blog/new" className="btn-stone no-underline" style={{ padding: '0.625rem 1.5rem', fontSize: '0.8rem' }}>
          + New Post
        </Link>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
        {posts.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--earth-light)' }}>No blog posts yet</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Title</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Category</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Status</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Date</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.slug} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                  <td className="px-6 py-3">
                    <div className="font-medium" style={{ color: 'var(--earth-dark)' }}>{post.title}</div>
                    <div className="text-xs" style={{ color: 'var(--earth-light)' }}>{post.slug}</div>
                  </td>
                  <td className="px-6 py-3">{post.category}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-bold" style={{
                      background: post.published ? 'rgba(74,124,75,0.15)' : 'rgba(180,50,50,0.15)',
                      color: post.published ? 'var(--moss-dark)' : '#b33',
                    }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs" style={{ color: 'var(--earth-light)' }}>
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <BlogActions slug={post.slug} published={post.published} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
