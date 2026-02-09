'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface OrderData {
  id: string;
  email: string;
  name: string;
  total: number;
  status: string;
  items: { product: { name: string }; quantity: number; price: number }[];
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/order?session_id=${sessionId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setOrder(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-3xl font-bold text-[#2d5016] mb-2" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
          Order Confirmed!
        </h1>
        <p className="text-[#6b5e50] mb-6">
          Thank you for your purchase! Your crystals are being prepared with care.
        </p>

        {loading && <p className="text-[#6b5e50]">Loading order details...</p>}

        {order && (
          <div className="text-left bg-[#faf6f0] rounded-xl p-4 mb-6">
            <p className="text-sm text-[#6b5e50] mb-1">Order #{order.id.slice(-8).toUpperCase()}</p>
            <p className="text-sm text-[#6b5e50] mb-3">Confirmation sent to {order.email}</p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#d4c5a9] mt-3 pt-3 flex justify-between font-bold text-[#2d5016]">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <Link
          href="/shop"
          className="inline-block bg-[#2d5016] text-white px-6 py-3 rounded-lg hover:bg-[#3a6b1e] transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf6f0] flex items-center justify-center"><p>Loading...</p></div>}>
      <SuccessContent />
    </Suspense>
  );
}
