'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type PostData = {
  slug: string; title: string; excerpt: string; content: string; author: string;
  category: string; image?: string | null; readTime: string; published: boolean;
};

const inputStyle = {
  background: 'var(--cream)',
  border: '1.5px solid var(--stone-light)',
  color: 'var(--earth-dark)',
  fontFamily: 'var(--font-body)',
};

const labelStyle = {
  fontFamily: 'var(--font-heading)',
  color: 'var(--earth-dark)',
  fontSize: '0.85rem',
};

export function BlogForm({ post }: { post?: PostData }) {
  const router = useRouter();
  const isEdit = !!post;

  const [form, setForm] = useState({
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || 'Peddle\'n Pebbles',
    category: post?.category || '',
    image: post?.image || '',
    readTime: post?.readTime || '5 min read',
    published: post?.published !== false,
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEdit ? `/api/admin/blog/${post!.slug}` : '/api/admin/blog';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/blog');
      router.refresh();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to save');
      setSaving(false);
    }
  };

  const set = (key: string, val: string | boolean) => setForm(f => ({ ...f, [key]: val }));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="p-8 rounded-xl space-y-5" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Slug *</label>
            <input value={form.slug} onChange={(e) => set('slug', e.target.value)} required disabled={isEdit} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} placeholder="my-blog-post" />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Title *</label>
            <input value={form.title} onChange={(e) => set('title', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Author *</label>
            <input value={form.author} onChange={(e) => set('author', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Category *</label>
            <input value={form.category} onChange={(e) => set('category', e.target.value)} required className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} placeholder="Crystal Care" />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Read Time</label>
            <input value={form.readTime} onChange={(e) => set('readTime', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Image URL</label>
          <input value={form.image || ''} onChange={(e) => set('image', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Excerpt *</label>
          <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} required rows={2} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-y" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Content (Markdown) *</label>
          <textarea value={form.content} onChange={(e) => set('content', e.target.value)} required rows={15} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-y font-mono" style={{ ...inputStyle, fontFamily: 'monospace' }} />
        </div>

        <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
          <input type="checkbox" checked={form.published} onChange={(e) => set('published', e.target.checked)} />
          Published
        </label>
      </div>

      <div className="flex gap-4">
        <button type="submit" disabled={saving} className="btn-stone" style={{ padding: '0.625rem 2rem', fontSize: '0.8rem' }}>
          {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-full text-sm cursor-pointer" style={{ background: 'transparent', border: '1.5px solid var(--stone-light)', color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
