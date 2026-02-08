'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const categoryEmoji: Record<string, string> = {
    crystals: '💎',
    geodes: '🪨',
    'polished-stones': '✨',
    'raw-minerals': '⛏️',
    jewelry: '📿',
    'mystery-boxes': '🎁',
  };

  return (
    <div className="card-parchment group">
      {/* Image */}
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-square product-image-placeholder relative overflow-hidden">
          <span className="text-5xl transition-transform duration-500 group-hover:scale-110">
            {categoryEmoji[product.category] || '💎'}
          </span>
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs uppercase tracking-wider text-white"
              style={{ background: 'var(--amber-warm)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem' }}>
              ⭐ Featured
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm mb-1 transition-colors duration-300 hover:opacity-70"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', lineHeight: 1.4 }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--earth-light)' }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--amber-warm)' }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'var(--moss-medium)', color: 'white' }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
