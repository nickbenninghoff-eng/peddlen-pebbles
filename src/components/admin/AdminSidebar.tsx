'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/products', label: 'Products', icon: '💎' },
  { href: '/admin/categories', label: 'Categories', icon: '📂' },
  { href: '/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/admin/blog', label: 'Blog Posts', icon: '📝' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#2c1810] text-[#faf6ef] min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#5a3825]">
        <Link href="/admin" className="text-xl font-bold" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
          🪨 Admin Panel
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#5a3825] text-amber-300'
                  : 'hover:bg-[#3d2418] text-[#d4c5a9]'
              }`}
            >
              <span>{item.icon}</span>
              <span style={{ fontFamily: 'Cinzel, serif' }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#5a3825]">
        <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-[#d4c5a9] hover:text-amber-300 transition-colors">
          ← Back to Store
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="flex items-center gap-2 px-4 py-2 text-sm text-[#d4c5a9] hover:text-red-400 transition-colors w-full text-left">
            🚪 Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
