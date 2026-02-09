'use client';

import { useRouter } from 'next/navigation';

const statuses = ['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export function OrderStatusUpdater({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();

  const update = async (status: string) => {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => update(e.target.value)}
      className="px-2 py-1 rounded text-xs outline-none cursor-pointer"
      style={{
        background: 'var(--cream)',
        border: '1px solid var(--stone-light)',
        color: 'var(--earth-dark)',
        fontFamily: 'var(--font-heading)',
      }}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
