'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Category = {
  id: string; name: string; description: string; emoji: string; image?: string | null; sortOrder: number; productCount: number;
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

export function CategoryManager({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', description: '', emoji: '💎', image: '', sortOrder: 0 });

  const resetForm = () => {
    setForm({ id: '', name: '', description: '', emoji: '💎', image: '', sortOrder: 0 });
    setEditing(null);
    setShowNew(false);
  };

  const startEdit = (c: Category) => {
    setForm({ id: c.id, name: c.name, description: c.description, emoji: c.emoji, image: c.image || '', sortOrder: c.sortOrder });
    setEditing(c.id);
    setShowNew(false);
  };

  const save = async () => {
    const url = editing ? `/api/admin/categories/${editing}` : '/api/admin/categories';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { resetForm(); router.refresh(); }
    else { const err = await res.json(); alert(err.error || 'Failed'); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this category? Products in it must be reassigned first.')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    if (res.ok) router.refresh();
    else alert('Failed to delete. Make sure no products use this category.');
  };

  const formUI = (
    <div className="p-6 rounded-xl mb-6 space-y-4" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>{editing ? 'Edit Category' : 'New Category'}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label style={labelStyle} className="block mb-1">ID *</label>
          <input value={form.id} onChange={(e) => setForm(f => ({ ...f, id: e.target.value }))} disabled={!!editing} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} placeholder="tumbled-stones" />
        </div>
        <div>
          <label style={labelStyle} className="block mb-1">Name *</label>
          <input value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} className="block mb-1">Emoji *</label>
          <input value={form.emoji} onChange={(e) => setForm(f => ({ ...f, emoji: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle} className="block mb-1">Description *</label>
        <textarea value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-y" style={inputStyle} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={labelStyle} className="block mb-1">Image URL</label>
          <input value={form.image} onChange={(e) => setForm(f => ({ ...f, image: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle} className="block mb-1">Sort Order</label>
          <input type="number" value={form.sortOrder} onChange={(e) => setForm(f => ({ ...f, sortOrder: parseInt(e.target.value) || 0 }))} className="w-full px-3 py-2 rounded-lg text-sm outline-none" style={inputStyle} />
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={save} className="btn-stone" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
          {editing ? 'Update' : 'Create'}
        </button>
        <button onClick={resetForm} className="px-4 py-2 rounded-full text-sm cursor-pointer" style={{ background: 'transparent', border: '1.5px solid var(--stone-light)', color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {!showNew && !editing && (
        <button onClick={() => setShowNew(true)} className="btn-stone mb-6" style={{ padding: '0.625rem 1.5rem', fontSize: '0.8rem' }}>
          + Add Category
        </button>
      )}

      {(showNew || editing) && formUI}

      <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Category</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Products</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Sort</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                <td className="px-6 py-3">
                  <span className="text-lg mr-2">{c.emoji}</span>
                  <strong>{c.name}</strong>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--earth-light)' }}>{c.id}</div>
                </td>
                <td className="px-6 py-3">{c.productCount}</td>
                <td className="px-6 py-3">{c.sortOrder}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(c)} className="px-3 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(196,136,58,0.15)', color: 'var(--amber-warm)', border: 'none', fontFamily: 'var(--font-heading)' }}>Edit</button>
                    <button onClick={() => del(c.id)} className="px-3 py-1 rounded text-xs cursor-pointer" style={{ background: 'rgba(180,50,50,0.1)', color: '#b33', border: 'none', fontFamily: 'var(--font-heading)' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
