'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'var(--cream)', fontFamily: 'var(--font-body)' }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{
          background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-dark) 100%)',
          border: '2px solid var(--stone-light)',
          boxShadow: 'var(--shadow-warm-lg)',
        }}
      >
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🪨</div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--earth-dark)' }}
          >
            Peddle&apos;n Pebbles
          </h1>
          <p className="text-sm" style={{ color: 'var(--earth-light)' }}>
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div
              className="p-3 rounded-lg text-sm text-center"
              style={{
                background: 'rgba(200,50,50,0.1)',
                color: '#b33',
                border: '1px solid rgba(200,50,50,0.2)',
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--cream)',
                border: '1.5px solid var(--stone-light)',
                color: 'var(--earth-dark)',
                fontFamily: 'var(--font-body)',
              }}
              placeholder="admin@peddlenpebbles.com"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                background: 'var(--cream)',
                border: '1.5px solid var(--stone-light)',
                color: 'var(--earth-dark)',
                fontFamily: 'var(--font-body)',
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-bold tracking-wider uppercase cursor-pointer"
            style={{
              background: loading
                ? 'var(--stone-dark)'
                : 'linear-gradient(160deg, var(--moss-medium) 0%, var(--moss-dark) 100%)',
              color: 'var(--cream)',
              fontFamily: 'var(--font-heading)',
              border: '2px solid rgba(255,255,255,0.12)',
              letterSpacing: '0.08em',
            }}
          >
            {loading ? 'Signing in...' : 'Enter the Shire'}
          </button>
        </form>
      </div>
    </div>
  );
}
