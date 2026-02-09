import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Leaf, Gem, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden section-parchment page-hero-arch">
        <div className="absolute top-12 right-[10%] text-2xl opacity-[0.06] animate-leaf">🌿</div>
        <div className="absolute bottom-20 left-[8%] text-xl opacity-[0.06] animate-leaf" style={{ animationDelay: '1.5s' }}>🍃</div>
        <div className="deco-gem deco-gem--md deco-gem--purple" style={{ top: '25%', right: '20%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--amber" style={{ bottom: '35%', left: '15%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--blue" style={{ top: '45%', right: '8%' }} />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="font-accent text-2xl mb-3 stagger-in" style={{ color: 'var(--amber-warm)', animationDelay: '0.1s' }}>Our Story</p>
          <h1 className="text-4xl md:text-6xl mb-6 stagger-in" style={{ animationDelay: '0.2s' }}>A Little Hobbit Hole Full of Earth&apos;s Treasures</h1>
          <div className="section-ornament"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto stagger-in" style={{ color: 'var(--earth-medium)', animationDelay: '0.4s' }}>
            What started as a personal love affair with crystals and minerals has blossomed into a warm, cozy shop
            where every stone has a story and every visitor becomes family.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6 section-woodland">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative aspect-[4/5] round-door-frame crystal-image" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <Image src="/hero-opt.jpg" alt="The Peddle'n Pebbles shop" fill className="object-cover" />
          </div>
          <div>
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>How it all began</p>
            <h2 className="text-3xl mb-6">From Collection to Connection</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--earth-medium)' }}>
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
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 section-parchment relative overflow-hidden">
        <div className="deco-gem deco-gem--sm deco-gem--rose" style={{ top: '20%', right: '10%' }} />
        <div className="deco-gem deco-gem--md deco-gem--amber" style={{ bottom: '25%', left: '8%' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>What we believe</p>
            <h2 className="text-3xl md:text-4xl mb-4">Our Values</h2>
            <div className="divider-vine max-w-xs mx-auto">✦</div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Curated with Love',
                desc: 'Every single stone is hand-picked by us. We touch, feel, and connect with each piece before it ever reaches your hands.',
              },
              {
                icon: Leaf,
                title: 'Ethically Sourced',
                desc: 'We work with trusted suppliers who share our values of responsible mining and fair trade practices.',
              },
              {
                icon: Gem,
                title: 'Quality Over Quantity',
                desc: 'We\'d rather have 50 exceptional pieces than 500 mediocre ones. Our collection is always curated, never mass-produced.',
              },
              {
                icon: Users,
                title: 'Community First',
                desc: 'We\'re not just a shop — we\'re a community of crystal lovers, healers, and earth enthusiasts.',
              },
            ].map((value, i) => (
              <div key={i} className="value-card text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform duration-500 hover:scale-110 hover:rotate-3" style={{ background: 'linear-gradient(135deg, var(--moss-medium) 0%, var(--moss-dark) 100%)', boxShadow: '0 4px 12px rgba(45,74,46,0.25)' }}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--earth-light)' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Kind words</p>
            <h2 className="text-3xl md:text-4xl mb-4">From Our Crystal Family</h2>
            <div className="section-ornament"><span className="text-sm" style={{ color: 'var(--amber-warm)' }}>✦</span></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "The most beautiful amethyst I've ever seen. You can tell every piece is chosen with genuine love and care.", name: "Sarah M.", location: "Indiana" },
              { text: "I bought a mystery box for my daughter and she was absolutely thrilled! Every stone was unique and special.", name: "Mike T.", location: "Ohio" },
              { text: "Not just a shop — it's an experience. The energy of these crystals is unlike anything from a big box store.", name: "Luna R.", location: "Kentucky" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="text-base leading-relaxed mb-4 pt-6" style={{ color: 'var(--earth-medium)', fontStyle: 'italic' }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-sm" style={{ color: 'var(--amber-warm)' }}>★</span>)}
                  </div>
                </div>
                <p className="text-sm mt-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>{t.name}</p>
                <p className="text-xs" style={{ color: 'var(--earth-light)' }}>{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28 px-6 text-center section-dark relative overflow-hidden">
        <div className="deco-gem deco-gem--md deco-gem--purple" style={{ top: '20%', left: '15%' }} />
        <div className="deco-gem deco-gem--sm deco-gem--amber" style={{ bottom: '25%', right: '20%' }} />
        <div className="deco-gem deco-gem--lg deco-gem--rose" style={{ top: '50%', right: '10%' }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 120%, rgba(196,136,58,0.1) 0%, transparent 60%)',
        }} />
        <div className="relative">
          <p className="font-accent text-xl mb-3" style={{ color: 'var(--amber-glow)' }}>The earth is calling</p>
          <h2 className="text-3xl md:text-4xl mb-4" style={{ color: 'var(--cream)' }}>Ready to Find Your Crystal?</h2>
          <p className="mb-8 text-base" style={{ color: 'rgba(250,245,238,0.6)' }}>
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
