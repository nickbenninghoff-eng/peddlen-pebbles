'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Clock, MapPin, Send, Heart } from 'lucide-react';

/* Wave divider matching homepage */
function WaveDivider({ fill, variant = 1 }: { fill: string; variant?: number }) {
  const waves: Record<number, React.ReactNode> = {
    1: (
      <>
        <path d="M0 100V65C160 30 320 50 480 45C640 40 800 25 960 35C1120 45 1280 30 1380 38L1440 42V100H0Z" fill={fill} opacity="0.3" />
        <path d="M0 100V75C200 38 400 58 600 50C800 42 1000 22 1200 38C1320 48 1400 42 1440 46V100H0Z" fill={fill} opacity="0.5" />
        <path d="M0 100V85C240 48 480 66 720 56C960 46 1140 34 1300 44C1380 50 1420 46 1440 48V100H0Z" fill={fill} />
      </>
    ),
    2: (
      <>
        <path d="M0 100V70C240 35 480 55 720 42C960 29 1200 45 1440 38V100H0Z" fill={fill} opacity="0.35" />
        <path d="M0 100V80C180 50 360 65 540 55C720 45 900 30 1080 40C1260 50 1380 42 1440 45V100H0Z" fill={fill} opacity="0.55" />
        <path d="M0 100V88C300 58 600 72 900 62C1100 55 1300 48 1440 52V100H0Z" fill={fill} />
      </>
    ),
  };
  return (
    <div className="absolute left-0 right-0 z-20 bottom-0">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: '50px' }}>
        {waves[variant]}
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ═══ IMMERSIVE HERO ═══ */}
      <section className="relative overflow-hidden -mt-20" style={{ minHeight: '50vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/decor/contact-hero-banner.png"
            alt="A cozy writing desk with crystals and parchment"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(20,12,6,0.25) 0%, rgba(20,12,6,0.15) 30%, rgba(20,12,6,0.55) 65%, rgba(20,12,6,0.92) 100%)',
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-24 pt-40" style={{ minHeight: '50vh' }}>
          <p className="font-accent text-2xl md:text-3xl mb-3 stagger-in"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 20px rgba(0,0,0,0.7)', animationDelay: '0.2s' }}>
            Get in touch
          </p>
          <h1 className="text-5xl md:text-7xl mb-4 stagger-in"
            style={{ color: 'var(--cream)', textShadow: '0 3px 30px rgba(0,0,0,0.6)', animationDelay: '0.3s' }}>
            Contact Us
          </h1>
          <div className="section-ornament mb-2" style={{ opacity: 0.5 }}>
            <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
          </div>
          <p className="text-base md:text-lg stagger-in max-w-lg text-center"
            style={{ color: 'rgba(250,245,238,0.7)', textShadow: '0 1px 12px rgba(0,0,0,0.5)', animationDelay: '0.5s' }}>
            We&apos;d love to hear from you — questions, custom orders, or just to say hello!
          </p>
        </div>

        <WaveDivider fill="var(--cream)" variant={1} />
      </section>

      {/* ═══ CONTACT CONTENT ═══ */}
      <section className="pt-16 pb-28 px-6 relative">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(196,136,58,0.03) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(74,124,75,0.03) 0%, transparent 50%)',
        }} />

        <div className="max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-5 gap-10 lg:gap-14">
            {/* Form — takes 3 cols */}
            <div className="md:col-span-3 reveal-on-scroll" style={{ textAlign: 'left' }}>
              <div className="card-parchment p-8 md:p-10 relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4" style={{ color: 'var(--crystal-rose)' }} />
                  <h2 className="text-2xl" style={{ fontFamily: 'var(--font-heading)' }}>Send Us a Message</h2>
                </div>
                <p className="text-sm mb-8" style={{ color: 'var(--earth-light)' }}>
                  We read every message — usually with a cup of tea in hand ☕
                </p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <p className="text-5xl mb-4">💎</p>
                    <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--earth-light)' }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs uppercase tracking-widest mb-2"
                          style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.7rem' }}>
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-5 py-3.5 rounded-xl text-sm outline-none"
                          style={{ background: 'var(--cream)', border: '2px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
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
                          className="w-full px-5 py-3.5 rounded-xl text-sm outline-none"
                          style={{ background: 'var(--cream)', border: '2px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                          placeholder="frodo@theshire.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', fontSize: '0.7rem' }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full px-5 py-3.5 rounded-xl text-sm outline-none"
                        style={{ background: 'var(--cream)', border: '2px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                        placeholder="Custom order, question, or just saying hi..."
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
                        className="w-full px-5 py-3.5 rounded-xl text-sm outline-none resize-none"
                        style={{ background: 'var(--cream)', border: '2px solid var(--stone-light)', fontFamily: 'var(--font-body)', color: 'var(--earth-dark)' }}
                        placeholder="Tell us what you're looking for, ask about a stone, or just say hi..."
                      />
                    </div>
                    <button type="submit" className="btn-stone text-base">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info — takes 2 cols */}
            <div className="md:col-span-2 space-y-6 reveal-on-scroll" style={{ transitionDelay: '0.15s', textAlign: 'left' }}>
              <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Other Ways to Reach Us</h2>
              <p className="text-sm mb-4" style={{ color: 'var(--earth-light)' }}>
                We&apos;re always happy to chat about crystals, custom orders, or anything else!
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, title: 'Email', desc: 'hello@peddlenpebbles.com', color: '#5b8fb9' },
                  { icon: Clock, title: 'Response Time', desc: 'We usually respond within 24 hours', color: '#c4883a' },
                  { icon: MapPin, title: 'Location', desc: 'Shipping from The Shire (Indiana, USA) 🌿', color: '#4a7c4b' },
                ].map((item, i) => (
                  <div key={i} className="value-card flex gap-4 items-start" style={{ textAlign: 'left' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--earth-medium)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Section */}
              <div className="mt-8 p-6 rounded-2xl relative overflow-hidden" style={{ background: 'var(--earth-dark)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(196,136,58,0.1) 0%, transparent 60%)',
                }} />
                <div className="relative">
                  <h3 className="text-base mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--amber-light)' }}>
                    Follow Us
                  </h3>
                  <p className="text-sm mb-5" style={{ color: 'rgba(250,245,238,0.6)' }}>
                    New arrivals, crystal tips, and behind-the-scenes peeks!
                  </p>
                  <div className="flex gap-3">
                    {['Facebook', 'TikTok', 'Instagram'].map((name) => (
                      <a key={name} href="#" className="px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        style={{
                          border: '1px solid rgba(250,245,238,0.2)',
                          color: 'var(--cream)',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.7rem',
                          background: 'rgba(250,245,238,0.05)',
                        }}>
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative quote */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--stone-light)' }}>
                <p className="font-accent text-base" style={{ color: 'var(--amber-warm)' }}>
                  &ldquo;We believe the right crystal finds you at exactly the right time.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
