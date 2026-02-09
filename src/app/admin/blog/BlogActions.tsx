'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function BlogActions({ slug, published }: { slug: string; published: boolean }) {
  const router = useRouter();

  const togglePublished = async () => {
    await fetch(`/api/admin/blog/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !published }),
    });
    router.refresh();
  };

  const deletePost = async () => {
    if (!confirm('Delete this blog post?')) return;
    await fetch(`/api/admin/blog/${slug}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/blog/${slug}/edit`}
        className="px-3 py-1 rounded text-xs no-underline"
        style={{ background: 'rgba(196,136,58,0.15)', color: 'var(--amber-warm)', fontFamily: 'var(--font-heading)' }}
      >
        Edit
      </Link>
      <button
        onClick={togglePublished}
        className="px-3 py-1 rounded text-xs cursor-pointer"
        style={{
          background: published ? 'rgba(180,50,50,0.1)' : 'rgba(74,124,75,0.1)',
          color: published ? '#b33' : 'var(--moss-dark)',
          border: 'none', fontFamily: 'var(--font-heading)',
        }}
      >
        {published ? 'Unpublish' : 'Publish'}
      </button>
      <button
        onClick={deletePost}
        className="px-3 py-1 rounded text-xs cursor-pointer"
        style={{ background: 'rgba(180,50,50,0.1)', color: '#b33', border: 'none', fontFamily: 'var(--font-heading)' }}
      >
        Delete
      </button>
    </div>
  );
}
