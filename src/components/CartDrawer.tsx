'use client';

import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice, cartOpen, setCartOpen } = useCart();

  if (!cartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={() => setCartOpen(false)} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
        style={{ background: 'var(--cream)', borderLeft: '1px solid var(--stone-light)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--stone-light)' }}>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" style={{ color: 'var(--earth-dark)' }} />
            <h2 className="text-lg" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
              Your Cart ({totalItems})
            </h2>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-black/5 transition-colors">
            <X className="w-5 h-5" style={{ color: 'var(--earth-dark)' }} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50 text-center">
              <ShoppingBag className="w-16 h-16 mb-4" style={{ color: 'var(--stone-dark)' }} />
              <p style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>Your cart is empty</p>
              <p className="text-sm mt-2" style={{ color: 'var(--earth-light)' }}>Time to find some treasures!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 rounded-xl" style={{ background: 'var(--cream-dark)' }}>
                  {/* Image placeholder */}
                  <div className="w-20 h-20 rounded-lg product-image-placeholder flex-shrink-0 flex items-center justify-center text-2xl">
                    💎
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                      {item.product.name}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--amber-warm)', fontWeight: 600 }}>
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ border: '1px solid var(--stone-light)' }}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ border: '1px solid var(--stone-light)' }}>
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1 opacity-40 hover:opacity-100 transition-opacity">
                        <Trash2 className="w-4 h-4" style={{ color: 'var(--crystal-rose)' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} className="text-xs uppercase tracking-wider opacity-40 hover:opacity-70 transition-opacity mt-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: '1px solid var(--stone-light)' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>
                Total
              </span>
              <span className="text-xl" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="btn-stone w-full justify-center text-base">
              Proceed to Checkout
            </button>
            <p className="text-xs text-center mt-3 opacity-40">Shipping calculated at checkout</p>
          </div>
        )}
      </div>
    </>
  );
}
