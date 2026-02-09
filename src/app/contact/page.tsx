'use client';

import { useState } from 'react';
import { Mail, Clock, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 md:py-24 px-6 text-center section-parchment page-hero-arch relative overflow-hidden">
        <div className="deco-gem deco-gem--md deco-gem--amber" style={{ top: '25%', left: '10%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--purple" style={{ bottom: '30%', right: '15%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--rose" style={{ top: '40%', right: '8%' }} />
        <div className="absolute bottom-16 left-[6%] text-lg opacity-[0.05] animate-leaf">🌿</div>

        <p className="font-accent text-2xl mb-3 stagger-in" style={{ color: 'var(--amber-warm)', animationDelay: '0.1s' }}>Get in touch</p>
        <h1 className="text-4xl md:text-6xl mb-4 stagger-in" style={{ animationDelay: '0.2s' }}>Contact Us</h1>
        <div className="section-ornament"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
        <p className="text-lg stagger-in" style={{ color: 'var(--earth-light)', animationDelay: '0.4s' }}>We&apos;d love to hear from you — questions, custom orders, or just to say hello!</p>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl mb-2">Send Us a Message</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--earth-light)' }}>We read every message — usually with a cup of tea in hand ☕</p>
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
              {[
                { icon: Mail, title: 'Email', desc: 'hello@peddlenpebbles.com' },
                { icon: Clock, title: 'Response Time', desc: 'We usually respond within 24 hours' },
                { icon: MapPin, title: 'Location', desc: 'Shipping from The Shire (Indiana, USA) 🌿' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:translate-y-[-3px]" style={{ background: 'var(--cream-dark)', border: '1px solid var(--stone-light)', boxShadow: 'var(--shadow-warm)' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--moss-medium) 0%, var(--moss-dark) 100%)', boxShadow: '0 3px 10px rgba(45,74,46,0.25)' }}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--earth-light)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
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
