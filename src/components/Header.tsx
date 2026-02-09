'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Gem } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(250, 245, 238, 0.96)' : 'rgba(250, 245, 238, 0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '2px solid var(--stone-light)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(61,43,31,0.08), 0 1px 3px rgba(61,43,31,0.04)' : 'none',
      }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
            style={{ background: 'linear-gradient(135deg, var(--moss-medium) 0%, var(--moss-dark) 100%)', boxShadow: '0 3px 10px rgba(45,74,46,0.3)' }}>
            <Gem className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-lg md:text-xl tracking-wide" style={{ color: 'var(--earth-dark)' }}>
            Peddle&apos;n Pebbles
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-2 transition-all duration-300 group/link"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-medium)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
            >
              <span className="group-hover/link:text-[var(--earth-dark)] transition-colors">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover/link:w-full"
                style={{ background: 'var(--amber-warm)' }} />
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 rounded-full transition-all duration-300 hover:scale-110"
            style={{ color: 'var(--earth-dark)' }}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center animate-bounce"
                style={{ background: 'linear-gradient(135deg, var(--amber-warm) 0%, #a87030 100%)', fontSize: '0.6rem', boxShadow: '0 2px 6px rgba(196,136,58,0.4)' }}>
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

      {/* Mobile Menu — parchment feel */}
      {mobileOpen && (
        <div className="md:hidden wood-grain" style={{
          background: 'linear-gradient(180deg, var(--cream) 0%, var(--cream-dark) 100%)',
          borderTop: '2px solid var(--stone-light)',
          boxShadow: 'inset 0 2px 8px rgba(61,43,31,0.04)',
        }}>
          <nav className="flex flex-col px-6 py-4 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 transition-all duration-300 hover:pl-3 hover:opacity-80"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid var(--stone-light)' }}
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
