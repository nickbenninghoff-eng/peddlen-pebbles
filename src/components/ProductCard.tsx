'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);

  const categoryEmoji: Record<string, string> = {
    crystals: '💎',
    geodes: '🪨',
    'polished-stones': '✨',
    'raw-minerals': '⛏️',
    jewelry: '📿',
    'mystery-boxes': '🎁',
  };

  const categoryGradients: Record<string, string> = {
    crystals: 'linear-gradient(135deg, #7b5ea7 0%, #5b8fb9 40%, #8b7db8 100%)',
    geodes: 'linear-gradient(135deg, #8b8070 0%, #a89888 40%, #c4b8a8 100%)',
    'polished-stones': 'linear-gradient(135deg, #c77b8b 0%, #dda0b0 40%, #b89098 100%)',
    'raw-minerals': 'linear-gradient(135deg, #8b7555 0%, #a89070 40%, #c4a880 100%)',
    jewelry: 'linear-gradient(135deg, #c4883a 0%, #e8b86d 40%, #d4a050 100%)',
    'mystery-boxes': 'linear-gradient(135deg, #5b8fb9 0%, #7ba0c0 40%, #6090b0 100%)',
  };

  const hasImage = product.image && !imgError;

  return (
    <div className="card-parchment group relative">
      {/* Image */}
      <Link href={`/shop/${product.id}`}>
        <div className="aspect-[4/3] relative overflow-hidden product-card-image"
          style={{ background: categoryGradients[product.category] || categoryGradients.crystals }}>
          {hasImage ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              {/* Crystal shimmer fallback */}
              <div className="absolute inset-0" style={{
                background: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 40%),
                  radial-gradient(circle at 75% 75%, rgba(0,0,0,0.15) 0%, transparent 40%)
                `,
              }} />
              <div className="flex items-center justify-center w-full h-full">
                <span className="text-5xl relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 drop-shadow-lg">
                  {categoryEmoji[product.category] || '💎'}
                </span>
              </div>
            </>
          )}
          {/* Warm overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[2]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(196,136,58,0.08) 0%, transparent 60%)',
            }} />
          {product.featured && (
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-white z-10"
              style={{
                background: 'linear-gradient(135deg, var(--amber-warm) 0%, #a87030 100%)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 2px 8px rgba(196,136,58,0.4)',
              }}>
              Featured
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 relative z-10">
        <Link href={`/shop/${product.id}`}>
          <h3 className="text-sm mb-2 transition-colors duration-300 group-hover:opacity-70 leading-snug"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.95rem' }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--earth-light)' }}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--amber-warm)', fontWeight: 600 }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addItem(product)}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-6"
            style={{
              background: 'linear-gradient(135deg, var(--moss-medium) 0%, var(--moss-dark) 100%)',
              color: 'white',
              boxShadow: '0 3px 10px rgba(45,74,46,0.3)',
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
