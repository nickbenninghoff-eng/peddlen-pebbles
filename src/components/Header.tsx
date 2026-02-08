'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingBag, Menu, X, Gem } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(250, 245, 238, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--stone-light)',
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'var(--moss-medium)' }}>
            <Gem className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-display text-xl tracking-wide" style={{ color: 'var(--earth-dark)' }}>
              Peddle&apos;n Pebbles
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 text-sm tracking-wider uppercase transition-colors duration-300 hover:opacity-100 opacity-70"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.8rem', letterSpacing: '0.1em' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 rounded-full transition-colors duration-300"
            style={{ color: 'var(--earth-dark)' }}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center"
                style={{ background: 'var(--amber-warm)', fontSize: '0.65rem' }}>
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--earth-dark)' }}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--cream)', borderColor: 'var(--stone-light)' }}>
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm tracking-wider uppercase"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.85rem', letterSpacing: '0.1em' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
