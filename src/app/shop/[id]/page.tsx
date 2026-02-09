'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <p className="text-5xl mb-4">🔮</p>
          <h1 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Crystal Not Found</h1>
          <p className="mb-6" style={{ color: 'var(--earth-light)' }}>This treasure has vanished into the mist...</p>
          <Link href="/shop" className="btn-stone">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const categoryEmoji: Record<string, string> = {
    crystals: '💎', geodes: '🪨', 'polished-stones': '✨',
    'raw-minerals': '⛏️', jewelry: '📿', 'mystery-boxes': '🎁',
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative" style={{ background: 'var(--cream)' }}>
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3"
          style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative">
        {/* Subtle ambient gem dots */}
        <div className="deco-gem deco-gem--sm deco-gem--purple" style={{ top: '5%', right: '3%' }} />
        <div className="deco-gem deco-gem--md deco-gem--amber" style={{ top: '40%', right: '0%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--blue" style={{ bottom: '15%', left: '2%' }} />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image — hobbit round door frame */}
          <div className="aspect-square round-door-frame relative"
            style={{ boxShadow: 'var(--shadow-warm-xl)' }}>
            {product.image && !imgError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImgError(true)}
                priority
              />
            ) : (
              <div className="w-full h-full product-image-placeholder flex items-center justify-center">
                <span className="text-8xl md:text-9xl drop-shadow-lg relative z-[3]">{categoryEmoji[product.category] || '💎'}</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--moss-medium)' }}>
              {product.category.replace(/-/g, ' ')}
            </p>
            <h1 className="text-3xl md:text-4xl mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--amber-warm)' }}>
                ${product.price.toFixed(2)}
              </span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: 'var(--amber-warm)' }} />
                ))}
              </div>
            </div>

            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--earth-medium)' }}>
              {product.longDescription || product.description}
            </p>

            {/* Properties */}
            {product.properties && (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.properties.weight && (
                  <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem' }}>Weight</p>
                    <p className="text-sm" style={{ color: 'var(--earth-dark)' }}>{product.properties.weight}</p>
                  </div>
                )}
                {product.properties.origin && (
                  <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem' }}>Origin</p>
                    <p className="text-sm" style={{ color: 'var(--earth-dark)' }}>{product.properties.origin}</p>
                  </div>
                )}
                {product.properties.chakra && (
                  <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem' }}>Chakra</p>
                    <p className="text-sm" style={{ color: 'var(--earth-dark)' }}>{product.properties.chakra}</p>
                  </div>
                )}
                {product.properties.metaphysical && (
                  <div className="px-4 py-3 rounded-xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)', fontSize: '0.65rem' }}>Energy</p>
                    <p className="text-sm" style={{ color: 'var(--earth-dark)' }}>{product.properties.metaphysical}</p>
                  </div>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <button onClick={() => addItem(product)} className="btn-stone text-base px-10 py-4 mb-6">
              <ShoppingBag className="w-5 h-5" /> Add to Cart
            </button>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Truck, label: 'Free shipping over $75' },
                { icon: Shield, label: 'Secure checkout' },
                { icon: RotateCcw, label: '30-day returns' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--earth-light)' }}>
                  <badge.icon className="w-4 h-4" style={{ color: 'var(--moss-medium)' }} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20 pt-16" style={{ borderTop: '1px solid var(--stone-light)' }}>
            <p className="font-accent text-xl mb-2 text-center" style={{ color: 'var(--amber-warm)' }}>More treasures</p>
            <h2 className="text-2xl md:text-3xl mb-2 text-center">You Might Also Love</h2>
            <div className="section-ornament mb-8"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
