import prisma from '@/lib/prisma';
import Link from 'next/link';
import { OrderStatusUpdater } from './OrderStatusUpdater';

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } },
  });

  const statusColors: Record<string, string> = {
    PENDING: '#c4883a', PAID: '#4a7c4b', SHIPPED: '#5b8fb9', DELIVERED: '#2d4a2e', CANCELLED: '#b33',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
        Orders ({orders.length})
      </h1>

      <div className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
        {orders.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--earth-light)' }}>No orders yet</div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Order</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Customer</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Items</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Total</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Status</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Date</th>
                <th className="px-6 py-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-light)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                  <td className="px-6 py-3">
                    <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs no-underline" style={{ color: 'var(--amber-warm)' }}>
                      {order.id.slice(0, 8)}...
                    </Link>
                  </td>
                  <td className="px-6 py-3">
                    <div>{order.name}</div>
                    <div className="text-xs" style={{ color: 'var(--earth-light)' }}>{order.email}</div>
                  </td>
                  <td className="px-6 py-3">{order.items.length} items</td>
                  <td className="px-6 py-3 font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: `${statusColors[order.status]}15`, color: statusColors[order.status] }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-xs" style={{ color: 'var(--earth-light)' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
