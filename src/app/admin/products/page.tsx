import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ProductActions } from './ProductActions';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
          Products ({products.length})
        </h1>
        <Link
          href="/admin/products/new"
          className="btn-stone no-underline"
          style={{ padding: '0.625rem 1.5rem', fontSize: '0.8rem' }}
        >
          + Add Product
        </Link>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)',
          border: '1px solid var(--stone-light)',
          boxShadow: 'var(--shadow-warm)',
        }}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Product</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Category</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Price</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Stock</th>
              <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    {product.image && (
                      <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    )}
                    <div>
                      <div className="font-medium" style={{ color: 'var(--earth-dark)' }}>{product.name}</div>
                      <div className="text-xs" style={{ color: 'var(--earth-light)' }}>{product.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-3">{product.category.emoji} {product.category.name}</td>
                <td className="px-6 py-3 font-medium">${product.price.toFixed(2)}</td>
                <td className="px-6 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: product.inStock ? 'rgba(74,124,75,0.15)' : 'rgba(180,50,50,0.15)',
                      color: product.inStock ? 'var(--moss-dark)' : '#b33',
                    }}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <ProductActions productId={product.id} inStock={product.inStock} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
