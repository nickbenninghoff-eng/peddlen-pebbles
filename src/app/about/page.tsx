import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Leaf, Gem, Users, Star } from 'lucide-react';

/* Wave divider matching homepage */
function WaveDivider({ fill, variant = 1, flip = false }: { fill: string; variant?: number; flip?: boolean }) {
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
    3: (
      <>
        <path d="M0 100V60C120 40 360 55 600 48C840 41 1080 28 1320 38L1440 42V100H0Z" fill={fill} opacity="0.3" />
        <path d="M0 100V78C200 45 440 60 680 52C920 44 1160 32 1360 42L1440 46V100H0Z" fill={fill} opacity="0.5" />
        <path d="M0 100V88C280 55 560 70 840 60C1060 52 1280 42 1440 48V100H0Z" fill={fill} />
      </>
    ),
  };
  return (
    <div className="absolute left-0 right-0 z-20" style={{ [flip ? 'top' : 'bottom']: 0, transform: flip ? 'rotate(180deg)' : undefined }}>
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: '50px' }}>
        {waves[variant]}
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ═══ IMMERSIVE HERO ═══ */}
      <section className="relative overflow-hidden -mt-20" style={{ minHeight: '55vh' }}>
        <div className="absolute inset-0">
          <Image
            src="/decor/about-hero-banner.png"
            alt="Hands selecting crystals in a cozy hobbit shop"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(20,12,6,0.2) 0%, rgba(20,12,6,0.1) 30%, rgba(20,12,6,0.5) 65%, rgba(20,12,6,0.92) 100%)',
          }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end h-full px-6 pb-24 pt-40" style={{ minHeight: '55vh' }}>
          <p className="font-accent text-2xl md:text-3xl mb-3 stagger-in"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 20px rgba(0,0,0,0.7)', animationDelay: '0.2s' }}>
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl mb-4 stagger-in max-w-3xl text-center"
            style={{ color: 'var(--cream)', textShadow: '0 3px 30px rgba(0,0,0,0.6)', animationDelay: '0.3s' }}>
            A Little Hobbit Hole Full of Earth&apos;s Treasures
          </h1>
          <div className="section-ornament mb-2" style={{ opacity: 0.5 }}>
            <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
          </div>
          <p className="text-base md:text-lg stagger-in max-w-xl text-center"
            style={{ color: 'rgba(250,245,238,0.7)', textShadow: '0 1px 12px rgba(0,0,0,0.5)', animationDelay: '0.5s' }}>
            Where every stone has a story and every visitor becomes family.
          </p>
        </div>

        <WaveDivider fill="var(--cream)" variant={1} />
      </section>

      {/* ═══ STORY ═══ */}
      <section className="pt-20 md:pt-32 pb-40 md:pb-56 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 20% 30%, rgba(74,124,75,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(196,136,58,0.03) 0%, transparent 50%)',
        }} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          <div className="relative w-full aspect-[4/5] round-door-frame crystal-image" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <Image src="/hero-opt.jpg" alt="The Peddle'n Pebbles shop" fill className="object-cover" />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>How it all began</p>
            <h2 className="text-3xl md:text-4xl mb-8">From Collection to Connection</h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--earth-medium)' }}>
              <p>
                It started the way most beautiful things do — with a single stone. A piece of amethyst found at a yard sale
                that caught the light just right and sparked something inside. That was over a decade ago, and the collection
                hasn&apos;t stopped growing since.
              </p>
              <p>
                What began as boxes of crystals stacked in a spare room eventually outgrew the house. Friends started asking
                to buy pieces. Then friends of friends. Then strangers on Facebook Marketplace. Somewhere along the way,
                a hobby became a calling.
              </p>
              <p>
                Peddle&apos;n Pebbles was born from a simple belief: <strong>the right crystal finds you at exactly the right time.</strong> We
                don&apos;t just sell rocks — we help people connect with the earth&apos;s energy in a way that feels personal and magical.
              </p>
              <p>
                Every stone in our collection is hand-selected. We hold each piece, feel its weight, admire its colors, and
                imagine whose life it&apos;s meant to brighten. If it doesn&apos;t spark joy in us, it doesn&apos;t make it to the shelf.
              </p>
            </div>
          </div>
        </div>

        <WaveDivider fill="var(--cream-dark)" variant={2} />
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="pt-20 md:pt-32 pb-40 md:pb-56 px-6 section-parchment relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="font-accent text-2xl md:text-3xl mb-3" style={{ color: 'var(--amber-warm)' }}>What we believe</p>
            <h2 className="text-4xl md:text-5xl mb-2">Our Values</h2>
            <div className="section-ornament">
              <span className="gem-sparkle text-lg" style={{ color: 'var(--amber-warm)' }}>✦</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Curated with Love', desc: 'Every stone is hand-picked by us. We connect with each piece before it reaches your hands.', color: '#c77b8b' },
              { icon: Leaf, title: 'Ethically Sourced', desc: 'We work with trusted suppliers who share our values of responsible mining and fair trade.', color: '#4a7c4b' },
              { icon: Gem, title: 'Quality Over Quantity', desc: 'We\'d rather have 50 exceptional pieces than 500 mediocre ones. Always curated, never mass-produced.', color: '#7b5ea7' },
              { icon: Users, title: 'Community First', desc: 'We\'re not just a shop — we\'re a family of crystal lovers, healers, and earth enthusiasts.', color: '#c4883a' },
            ].map((value, i) => (
              <div key={i} className="value-card" style={{ textAlign: 'center' }}>
                <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center transition-transform duration-500 hover:scale-110"
                  style={{ background: `${value.color}20`, border: `1px solid ${value.color}40` }}>
                  <value.icon className="w-6 h-6" style={{ color: value.color }} />
                </div>
                <h3 className="text-sm mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--earth-medium)' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveDivider fill="var(--cream)" variant={3} />
      </section>

      {/* ═══ IMAGE BREAK ═══ */}
      <section className="image-break relative h-56 md:h-72 overflow-hidden">
        <Image
          src="/decor/crystal-collection.png"
          alt="A curated collection of crystals"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="font-accent text-3xl md:text-4xl px-6"
            style={{ color: 'var(--amber-glow)', textShadow: '0 2px 24px rgba(0,0,0,0.6)', textAlign: 'center' }}>
            Every stone tells a story&hellip;
          </p>
        </div>
        <WaveDivider fill="var(--cream)" variant={1} />
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="pt-20 md:pt-32 pb-40 md:pb-56 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,136,58,0.03) 0%, transparent 60%)',
        }} />

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="font-accent text-2xl md:text-3xl mb-3" style={{ color: 'var(--amber-warm)' }}>Kind words</p>
            <h2 className="text-4xl md:text-5xl mb-2">From Our Crystal Family</h2>
            <div className="section-ornament">
              <span className="gem-sparkle text-lg" style={{ color: 'var(--amber-warm)' }}>✦</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {[
              { text: "The most beautiful amethyst I've ever seen. You can tell every piece is chosen with genuine love and care.", name: 'Sarah M.', location: 'Indiana' },
              { text: "I bought a mystery box for my daughter and she was absolutely thrilled! Every stone was unique and special.", name: 'Mike T.', location: 'Ohio' },
              { text: "Not just a shop — it's an experience. The energy of these crystals is unlike anything from a big box store.", name: 'Luna R.', location: 'Kentucky' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card" style={{ textAlign: 'center' }}>
                <div className="flex justify-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" style={{ color: 'var(--amber-warm)' }} />)}
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--earth-medium)', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="text-sm mb-0.5" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)', letterSpacing: '0.04em' }}>
                  {t.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--earth-light)' }}>{t.location}</p>
              </div>
            ))}
          </div>
        </div>

        <WaveDivider fill="#1e120a" variant={2} />
      </section>

      {/* ═══ CTA ═══ */}
      <section className="pt-28 md:pt-32 pb-20 md:pb-24 px-6 relative overflow-hidden" style={{ textAlign: 'center' }}>
        <div className="absolute inset-0">
          <Image src="/decor/crystal-glow.png" alt="" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(30,18,10,0.75) 0%, rgba(30,18,10,0.55) 50%, rgba(30,18,10,0.75) 100%)',
          }} />
        </div>
        <div className="relative" style={{ maxWidth: '550px', margin: '0 auto' }}>
          <p className="font-accent text-2xl mb-3" style={{ color: 'var(--amber-glow)' }}>The earth is calling</p>
          <h2 className="text-3xl md:text-5xl mb-4" style={{ color: 'var(--cream)' }}>Ready to Find Your Crystal?</h2>
          <div className="section-ornament mb-6">
            <span className="text-lg" style={{ color: 'var(--amber-glow)' }}>✦</span>
          </div>
          <p className="mb-10 text-base leading-relaxed" style={{ color: 'rgba(250,245,238,0.55)' }}>
            Browse our collection and let the right stone find you.
          </p>
          <Link href="/shop" className="btn-amber text-base px-10">
            Visit the Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
