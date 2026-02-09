'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Category = { id: string; name: string };
type ProductData = {
  id?: string; name: string; price: string; description: string; longDescription: string;
  image: string; weight: string; origin: string; chakra: string; metaphysical: string;
  featured: boolean; inStock: boolean; categoryId: string;
};

const empty: ProductData = {
  name: '', price: '', description: '', longDescription: '', image: '',
  weight: '', origin: '', chakra: '', metaphysical: '', featured: false, inStock: true, categoryId: '',
};

export default function ProductForm({ product, isEdit }: { product?: any; isEdit?: boolean }) {
  const [form, setForm] = useState<ProductData>(empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
    if (product) {
      setForm({
        name: product.name, price: String(product.price), description: product.description,
        longDescription: product.longDescription || '', image: product.image || '',
        weight: product.weight || '', origin: product.origin || '', chakra: product.chakra || '',
        metaphysical: product.metaphysical || '', featured: product.featured, inStock: product.inStock,
        categoryId: product.categoryId,
      });
    }
  }, [product]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.url) setForm(f => ({ ...f, image: data.url }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products';
    const method = isEdit ? 'PUT' : 'POST';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    router.push('/admin/products');
  };

  const inputCls = "w-full px-4 py-2 rounded-lg border border-[#e8dcc8] bg-[#faf6ef] focus:outline-none focus:ring-2 focus:ring-amber-400 text-[#2c1810]";
  const labelCls = "block text-sm font-semibold text-[#2c1810] mb-1";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-[#e8dcc8] p-6 space-y-5 max-w-2xl">
      <div>
        <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Name *</label>
        <input className={inputCls} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Price *</label>
          <input type="number" step="0.01" className={inputCls} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
        </div>
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Category *</label>
          <select className={inputCls} value={form.categoryId} onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))} required>
            <option value="">Select...</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Short Description *</label>
        <textarea className={inputCls} rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
      </div>

      <div>
        <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Long Description</label>
        <textarea className={inputCls} rows={4} value={form.longDescription} onChange={e => setForm(f => ({ ...f, longDescription: e.target.value }))} />
      </div>

      <div>
        <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Image</label>
        {form.image && <img src={form.image} alt="Preview" className="w-24 h-24 rounded object-cover mb-2" />}
        <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
        {uploading && <span className="text-sm text-amber-600 ml-2">Uploading...</span>}
        <input className={`${inputCls} mt-2`} placeholder="Or paste image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Weight</label>
          <input className={inputCls} value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="e.g. 2.5 lbs" />
        </div>
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Origin</label>
          <input className={inputCls} value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} placeholder="e.g. Brazil" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Chakra</label>
          <input className={inputCls} value={form.chakra} onChange={e => setForm(f => ({ ...f, chakra: e.target.value }))} placeholder="e.g. Heart Chakra" />
        </div>
        <div>
          <label className={labelCls} style={{ fontFamily: 'Cinzel, serif' }}>Metaphysical Properties</label>
          <input className={inputCls} value={form.metaphysical} onChange={e => setForm(f => ({ ...f, metaphysical: e.target.value }))} />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4" />
          <span className="text-sm text-[#2c1810]">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} className="w-4 h-4" />
          <span className="text-sm text-[#2c1810]">In Stock</span>
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="px-6 py-2 bg-[#2c1810] text-[#faf6ef] rounded-lg hover:bg-[#3d2418] transition-colors disabled:opacity-50" style={{ fontFamily: 'Cinzel, serif' }}>
          {saving ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="px-6 py-2 border border-[#e8dcc8] rounded-lg hover:bg-[#faf6ef] transition-colors text-[#5a3825]">
          Cancel
        </button>
      </div>
    </form>
  );
}
