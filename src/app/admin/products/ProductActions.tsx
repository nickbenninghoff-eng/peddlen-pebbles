'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function ProductActions({ productId, inStock }: { productId: string; inStock: boolean }) {
  const router = useRouter();

  const toggleStock = async () => {
    await fetch(`/api/admin/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !inStock }),
    });
    router.refresh();
  };

  const deleteProduct = async () => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${productId}/edit`}
        className="px-3 py-1 rounded text-xs no-underline"
        style={{ background: 'rgba(196,136,58,0.15)', color: 'var(--amber-warm)', fontFamily: 'var(--font-heading)' }}
      >
        Edit
      </Link>
      <button
        onClick={toggleStock}
        className="px-3 py-1 rounded text-xs cursor-pointer"
        style={{
          background: inStock ? 'rgba(180,50,50,0.1)' : 'rgba(74,124,75,0.1)',
          color: inStock ? '#b33' : 'var(--moss-dark)',
          border: 'none',
          fontFamily: 'var(--font-heading)',
        }}
      >
        {inStock ? 'Mark OOS' : 'Mark In Stock'}
      </button>
      <button
        onClick={deleteProduct}
        className="px-3 py-1 rounded text-xs cursor-pointer"
        style={{ background: 'rgba(180,50,50,0.1)', color: '#b33', border: 'none', fontFamily: 'var(--font-heading)' }}
      >
        Delete
      </button>
    </div>
  );
}
