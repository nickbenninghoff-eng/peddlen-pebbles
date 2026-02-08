import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Leaf, Gem, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--cream-dark)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-accent text-xl mb-2" style={{ color: 'var(--amber-warm)' }}>Our Story</p>
          <h1 className="text-4xl md:text-5xl mb-6">A Little Hobbit Hole Full of Earth&apos;s Treasures</h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--earth-medium)' }}>
            What started as a personal love affair with crystals and minerals has blossomed into a warm, cozy shop
            where every stone has a story and every visitor becomes family.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-warm-lg)' }}>
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
      <section className="py-20 px-6" style={{ background: 'var(--cream-dark)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
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
              <div key={i} className="p-6 rounded-2xl text-center" style={{ background: 'var(--cream)', border: '1px solid var(--stone-light)' }}>
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--moss-medium)' }}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{value.title}</h3>
                <p className="text-sm" style={{ color: 'var(--earth-light)' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl mb-4">Ready to Find Your Crystal?</h2>
        <p className="mb-8" style={{ color: 'var(--earth-light)' }}>
          Browse our collection and let the right stone find you.
        </p>
        <Link href="/shop" className="btn-stone text-base px-8">
          Visit the Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
