import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OrderStatusUpdater } from '../OrderStatusUpdater';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: true },
  });

  if (!order) notFound();

  const statusColors: Record<string, string> = {
    PENDING: '#c4883a', PAID: '#4a7c4b', SHIPPED: '#5b8fb9', DELIVERED: '#2d4a2e', CANCELLED: '#b33',
  };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/orders" className="text-sm no-underline mb-4 inline-block" style={{ color: 'var(--amber-warm)' }}>
        ← Back to Orders
      </Link>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
          Order {order.id.slice(0, 8)}...
        </h1>
        <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid gap-6">
        {/* Customer Info */}
        <div className="p-6 rounded-xl" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>Customer</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span style={{ color: 'var(--earth-light)' }}>Name:</span> {order.name}</div>
            <div><span style={{ color: 'var(--earth-light)' }}>Email:</span> {order.email}</div>
            <div>
              <span style={{ color: 'var(--earth-light)' }}>Status:</span>{' '}
              <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: `${statusColors[order.status]}15`, color: statusColors[order.status] }}>{order.status}</span>
            </div>
            <div><span style={{ color: 'var(--earth-light)' }}>Date:</span> {new Date(order.createdAt).toLocaleString()}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 rounded-xl" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>Items</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--stone-light)' }}>
                <th className="text-left pb-2" style={{ color: 'var(--earth-light)' }}>Product</th>
                <th className="text-right pb-2" style={{ color: 'var(--earth-light)' }}>Qty</th>
                <th className="text-right pb-2" style={{ color: 'var(--earth-light)' }}>Price</th>
                <th className="text-right pb-2" style={{ color: 'var(--earth-light)' }}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                  <td className="py-2">{item.product.name}</td>
                  <td className="py-2 text-right">{item.quantity}</td>
                  <td className="py-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="py-2 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2" style={{ borderColor: 'var(--earth-light)' }}>
                <td colSpan={3} className="py-3 text-right font-bold" style={{ fontFamily: 'var(--font-heading)' }}>Total</td>
                <td className="py-3 text-right font-bold text-lg">${order.total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
