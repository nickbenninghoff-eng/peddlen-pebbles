import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: "Admin Panel | Peddle'n Pebbles",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const user = session?.user as { role?: string; name?: string; email?: string } | undefined;

  // Don't redirect on login page
  const isLoginPage = false; // layout wraps all admin pages including login

  if (!user || user.role !== 'ADMIN') {
    // Let login page render without redirect
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)', fontFamily: 'var(--font-body)' }}>
      {/* Admin Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-64 z-50 flex flex-col"
        style={{
          background: 'linear-gradient(180deg, var(--earth-dark) 0%, #2a1d14 100%)',
          borderRight: '2px solid var(--earth-medium)',
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(196,136,58,0.2)' }}>
          <Link href="/admin" className="block text-center no-underline">
            <h1
              className="text-xl font-bold"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--amber-light)' }}
            >
              🪨 Peddle&apos;n Pebbles
            </h1>
            <p className="text-xs mt-1" style={{ color: 'var(--stone-dark)' }}>Admin Panel</p>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin', icon: '📊', label: 'Dashboard' },
            { href: '/admin/products', icon: '💎', label: 'Products' },
            { href: '/admin/categories', icon: '📁', label: 'Categories' },
            { href: '/admin/orders', icon: '📦', label: 'Orders' },
            { href: '/admin/blog', icon: '📝', label: 'Blog Posts' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm no-underline transition-all"
              style={{
                color: 'var(--cream)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.03em',
              }}
              onMouseEnter={undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'rgba(196,136,58,0.2)' }}>
          <div className="text-xs mb-2" style={{ color: 'var(--stone-dark)' }}>
            Signed in as <br />
            <strong style={{ color: 'var(--amber-light)' }}>{user.email}</strong>
          </div>
          <Link
            href="/"
            className="block text-center px-4 py-2 rounded-lg text-xs no-underline"
            style={{
              background: 'rgba(196,136,58,0.15)',
              color: 'var(--amber-light)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">{children}</main>
    </div>
  );
}
