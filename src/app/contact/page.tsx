'use client';

import { useState } from 'react';
import { Mail, Clock, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-6 text-center" style={{ background: 'var(--cream-dark)' }}>
        <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Get in touch</p>
        <h1 className="text-4xl md:text-5xl mb-4">Contact Us</h1>
        <p style={{ color: 'var(--earth-light)' }}>We&apos;d love to hear from you — questions, custom orders, or just to say hello!</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="p-8 rounded-2xl text-center" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                <p className="text-4xl mb-4">💎</p>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent!</h3>
                <p style={{ color: 'var(--earth-light)' }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.7rem' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-3 rounded-xl text-sm outline-none transition-shadow focus:shadow-lg"
                    style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                    placeholder="Frodo Baggins"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.7rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-3 rounded-xl text-sm outline-none transition-shadow focus:shadow-lg"
                    style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                    placeholder="frodo@theshire.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.7rem' }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-5 py-3 rounded-xl text-sm outline-none transition-shadow focus:shadow-lg resize-none"
                    style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                    placeholder="Tell us what you're looking for, ask about a stone, or just say hi..."
                  />
                </div>
                <button type="submit" className="btn-stone text-base">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl mb-6">Other Ways to Reach Us</h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-5 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--moss-medium)' }}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Email</h3>
                  <p className="text-sm" style={{ color: 'var(--earth-light)' }}>hello@peddlenpebbles.com</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--moss-medium)' }}>
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Response Time</h3>
                  <p className="text-sm" style={{ color: 'var(--earth-light)' }}>We usually respond within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--moss-medium)' }}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Location</h3>
                  <p className="text-sm" style={{ color: 'var(--earth-light)' }}>Shipping from The Shire (Indiana, USA)</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 p-6 rounded-2xl" style={{ background: 'var(--earth-dark)' }}>
              <h3 className="text-base mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--amber-light)' }}>
                Follow Us
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(250,245,238,0.7)' }}>
                New arrivals, crystal tips, and behind-the-scenes peeks!
              </p>
              <div className="flex gap-3">
                {['Facebook', 'TikTok', 'Instagram'].map((name) => (
                  <a key={name} href="#" className="px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-opacity hover:opacity-80"
                    style={{ border: '1px solid rgba(250,245,238,0.3)', color: 'var(--cream)', fontFamily: 'var(--font-heading)', fontSize: '0.7rem' }}>
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
