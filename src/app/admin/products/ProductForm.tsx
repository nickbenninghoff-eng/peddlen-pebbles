'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Category = { id: string; name: string; emoji: string };
type ProductData = {
  id: string; name: string; price: number; description: string; longDescription?: string | null;
  image?: string | null; weight?: string | null; origin?: string | null; chakra?: string | null;
  metaphysical?: string | null; featured: boolean; inStock: boolean; categoryId: string;
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
  letterSpacing: '0.03em',
};

export function ProductForm({ categories, product }: { categories: Category[]; product?: ProductData }) {
  const router = useRouter();
  const isEdit = !!product;

  const [form, setForm] = useState({
    id: product?.id || '',
    name: product?.name || '',
    price: product?.price?.toString() || '',
    description: product?.description || '',
    longDescription: product?.longDescription || '',
    image: product?.image || '',
    weight: product?.weight || '',
    origin: product?.origin || '',
    chakra: product?.chakra || '',
    metaphysical: product?.metaphysical || '',
    featured: product?.featured || false,
    inStock: product?.inStock !== false,
    categoryId: product?.categoryId || categories[0]?.id || '',
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `image=${encodeURIComponent(base64)}`,
        });
        const data = await res.json();
        if (data.data?.url) {
          setForm((f) => ({ ...f, image: data.data.url }));
        }
      } catch {
        alert('Image upload failed');
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to save');
      setSaving(false);
    }
  };

  const set = (key: string, val: string | boolean) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div
        className="p-8 rounded-xl space-y-5"
        style={{
          background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)',
          border: '1px solid var(--stone-light)',
          boxShadow: 'var(--shadow-warm)',
        }}
      >
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Slug / ID *</label>
            <input
              value={form.id} onChange={(e) => set('id', e.target.value)} required disabled={isEdit}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
              placeholder="amethyst-cluster"
            />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Name *</label>
            <input
              value={form.name} onChange={(e) => set('name', e.target.value)} required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
              placeholder="Amethyst Cluster"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Price *</label>
            <input
              type="number" step="0.01" value={form.price} onChange={(e) => set('price', e.target.value)} required
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Category *</label>
            <select
              value={form.categoryId} onChange={(e) => set('categoryId', e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Short Description *</label>
          <textarea
            value={form.description} onChange={(e) => set('description', e.target.value)} required rows={2}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-y" style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Long Description</label>
          <textarea
            value={form.longDescription || ''} onChange={(e) => set('longDescription', e.target.value)} rows={4}
            className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-y" style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle} className="block mb-1">Image</label>
          <div className="flex items-center gap-4">
            <input
              value={form.image || ''} onChange={(e) => set('image', e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle}
              placeholder="URL or upload below"
            />
            <label
              className="px-4 py-2.5 rounded-lg text-xs cursor-pointer"
              style={{ background: 'rgba(196,136,58,0.15)', color: 'var(--amber-warm)', fontFamily: 'var(--font-heading)' }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          {form.image && <img src={form.image} alt="" className="mt-3 w-32 h-32 rounded-lg object-cover" />}
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Weight</label>
            <input value={form.weight || ''} onChange={(e) => set('weight', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Origin</label>
            <input value={form.origin || ''} onChange={(e) => set('origin', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} className="block mb-1">Chakra</label>
            <input value={form.chakra || ''} onChange={(e) => set('chakra', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle} className="block mb-1">Metaphysical</label>
            <input value={form.metaphysical || ''} onChange={(e) => set('metaphysical', e.target.value)} className="w-full px-4 py-2.5 rounded-lg text-sm outline-none" style={inputStyle} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
            <input type="checkbox" checked={form.inStock} onChange={(e) => set('inStock', e.target.checked)} />
            In Stock
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit" disabled={saving}
          className="btn-stone" style={{ padding: '0.625rem 2rem', fontSize: '0.8rem' }}
        >
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button
          type="button" onClick={() => router.back()}
          className="px-6 py-2.5 rounded-full text-sm cursor-pointer"
          style={{ background: 'transparent', border: '1.5px solid var(--stone-light)', color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
