import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [totalProducts, totalOrders, totalBlogPosts, revenueResult, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.blogPost.count(),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }),
      prisma.order.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
    ]);

  const totalRevenue = revenueResult._sum.total ?? 0;

  const stats = [
    { label: 'Products', value: totalProducts, icon: '💎', href: '/admin/products' },
    { label: 'Orders', value: totalOrders, icon: '📦', href: '/admin/orders' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: '💰', href: '/admin/orders' },
    { label: 'Blog Posts', value: totalBlogPosts, icon: '📝', href: '/admin/blog' },
  ];

  const statusColors: Record<string, string> = {
    PENDING: '#c4883a',
    PAID: '#4a7c4b',
    SHIPPED: '#5b8fb9',
    DELIVERED: '#2d4a2e',
    CANCELLED: '#b33',
  };

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-8"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}
      >
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="block p-6 rounded-xl no-underline transition-transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)',
              border: '1px solid var(--stone-light)',
              boxShadow: 'var(--shadow-warm)',
            }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}
            >
              {stat.value}
            </div>
            <div className="text-sm mt-1" style={{ color: 'var(--earth-light)' }}>
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: '+ New Product', href: '/admin/products/new' },
          { label: '+ New Category', href: '/admin/categories' },
          { label: '+ New Blog Post', href: '/admin/blog/new' },
          { label: 'View Store →', href: '/' },
        ].map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-center py-3 px-4 rounded-lg text-sm no-underline font-medium"
            style={{
              background: 'rgba(74,124,75,0.1)',
              color: 'var(--moss-dark)',
              fontFamily: 'var(--font-heading)',
              border: '1px solid rgba(74,124,75,0.2)',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)',
          border: '1px solid var(--stone-light)',
          boxShadow: 'var(--shadow-warm)',
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'var(--stone-light)' }}>
          <h2
            className="text-xl font-bold"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}
          >
            Recent Orders
          </h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center" style={{ color: 'var(--earth-light)' }}>
            No orders yet
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.03)' }}>
                <th className="px-6 py-3 font-medium" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Order</th>
                <th className="px-6 py-3 font-medium" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Customer</th>
                <th className="px-6 py-3 font-medium" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Status</th>
                <th className="px-6 py-3 font-medium" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Total</th>
                <th className="px-6 py-3 font-medium" style={{ color: 'var(--earth-light)', fontFamily: 'var(--font-heading)' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t" style={{ borderColor: 'var(--stone-light)' }}>
                  <td className="px-6 py-3 font-mono text-xs">{order.id.slice(0, 8)}...</td>
                  <td className="px-6 py-3">{order.name}</td>
                  <td className="px-6 py-3">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${statusColors[order.status]}15`,
                        color: statusColors[order.status],
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-medium">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-3 text-xs" style={{ color: 'var(--earth-light)' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
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
