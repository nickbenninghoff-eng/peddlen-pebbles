import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { id: 'crystals', name: 'Crystals', description: 'Hand-selected crystal specimens with natural beauty and healing energy', emoji: '💎', image: '/decor/cat-crystals.png', sortOrder: 1 },
  { id: 'geodes', name: 'Geodes', description: 'Crack open the earth and discover hidden treasures within', emoji: '🪨', image: '/decor/cat-geodes.png', sortOrder: 2 },
  { id: 'polished-stones', name: 'Polished Stones', description: 'Tumbled and polished to reveal their inner radiance', emoji: '✨', image: '/decor/cat-polished.png', sortOrder: 3 },
  { id: 'raw-minerals', name: 'Raw Minerals', description: 'Uncut, untouched — straight from the earth to your hands', emoji: '⛏️', image: '/decor/cat-raw.png', sortOrder: 4 },
  { id: 'jewelry', name: 'Jewelry', description: 'Wearable treasures crafted with love and natural stones', emoji: '📿', image: '/decor/cat-jewelry.png', sortOrder: 5 },
  { id: 'mystery-boxes', name: 'Mystery Boxes', description: 'A surprise selection of gems and stones — every box is an adventure', emoji: '🎁', image: '/products/mystery-box.png', sortOrder: 6 },
];

const products = [
  { id: 'amethyst-cluster-1', name: 'Amethyst Cathedral Cluster', price: 89.99, description: 'A stunning deep purple amethyst cluster with cathedral-like formations. Perfect for meditation spaces.', longDescription: 'This magnificent amethyst cathedral cluster features deep violet crystals with natural terminations. Each point catches the light differently, creating a mesmerizing display. Sourced from the rich mineral deposits of Uruguay, this piece has been carefully selected for its exceptional color saturation and crystal clarity. Amethyst is known as the stone of spiritual wisdom and intuition.', categoryId: 'crystals', image: '/products/amethyst-cluster.png', weight: '2.3 lbs', origin: 'Uruguay', chakra: 'Crown & Third Eye', metaphysical: 'Spiritual wisdom, intuition, calm', featured: true },
  { id: 'rose-quartz-heart', name: 'Rose Quartz Heart', price: 34.99, description: 'A hand-carved rose quartz heart radiating gentle pink energy. The stone of unconditional love.', longDescription: 'Carved from a single piece of premium rose quartz, this heart-shaped stone glows with a soft, translucent pink hue. Rose quartz is revered as the stone of unconditional love, promoting self-love, deep inner healing, and feelings of peace.', categoryId: 'polished-stones', image: '/products/rose-quartz-heart.png', weight: '0.8 lbs', origin: 'Madagascar', chakra: 'Heart', metaphysical: 'Unconditional love, self-care, emotional healing', featured: true },
  { id: 'citrine-point', name: 'Natural Citrine Point', price: 124.99, description: "A rare natural citrine point with warm golden hues. Known as the merchant's stone for attracting abundance.", longDescription: 'Unlike heat-treated citrine, this natural citrine point displays the authentic warm honey-gold color that comes from millions of years of geological processes. Natural citrine is increasingly rare and highly sought after by collectors.', categoryId: 'crystals', image: '/products/citrine-point.png', weight: '1.1 lbs', origin: 'Congo', chakra: 'Solar Plexus', metaphysical: 'Abundance, creativity, confidence', featured: true },
  { id: 'geode-pair-1', name: 'Agate Geode Bookend Pair', price: 159.99, description: 'A matched pair of sliced agate geodes with crystal-lined cavities. Functional art for your shelves.', longDescription: 'These matched geode bookends were cut from the same original stone, ensuring a perfectly paired set. The interior reveals layers of banded agate surrounding a sparkling quartz crystal cavity.', categoryId: 'geodes', image: '/products/geode-bookends.png', weight: '6.2 lbs (pair)', origin: 'Brazil', chakra: 'All', metaphysical: 'Balance, harmony, grounding', featured: true },
  { id: 'labradorite-freeform', name: 'Labradorite Freeform', price: 67.99, description: 'A polished labradorite freeform that flashes with brilliant blue, gold, and green iridescence.', categoryId: 'polished-stones', image: '/products/labradorite.png', weight: '1.4 lbs', origin: 'Madagascar', chakra: 'Third Eye & Throat', metaphysical: 'Transformation, intuition, protection' },
  { id: 'smoky-quartz-tower', name: 'Smoky Quartz Tower', price: 45.99, description: 'A hand-polished smoky quartz tower with beautiful translucent brown coloring.', categoryId: 'crystals', image: '/products/smoky-quartz.png', weight: '0.9 lbs', origin: 'Brazil', chakra: 'Root', metaphysical: 'Grounding, protection, stress relief' },
  { id: 'raw-pyrite-cluster', name: 'Raw Pyrite Cluster', price: 29.99, description: "A raw pyrite cluster with brilliant metallic luster. Known as \"fool's gold\" but truly golden in energy.", categoryId: 'raw-minerals', image: '/products/pyrite.png', weight: '0.6 lbs', origin: 'Peru', chakra: 'Solar Plexus', metaphysical: 'Willpower, abundance, vitality' },
  { id: 'moonstone-pendant', name: 'Rainbow Moonstone Pendant', price: 52.99, description: 'A sterling silver pendant featuring a luminous rainbow moonstone cabochon.', categoryId: 'jewelry', image: '/products/moonstone-pendant.png', weight: '0.1 lbs', origin: 'India', chakra: 'Crown', metaphysical: 'New beginnings, intuition, inner growth' },
  { id: 'crystal-mystery-box', name: 'Crystal Mystery Box — Small', price: 39.99, description: 'A curated surprise box with 5-7 hand-selected crystals and stones. Every box is unique!', categoryId: 'mystery-boxes', image: '/products/mystery-box.png', weight: '1.5 lbs approx', metaphysical: 'Surprise & delight!', featured: true },
  { id: 'large-mystery-box', name: 'Crystal Mystery Box — Large', price: 79.99, description: 'Our premium mystery box with 10-15 specimens including at least one statement piece.', categoryId: 'mystery-boxes', image: '/products/mystery-box-lg.png', weight: '3.5 lbs approx', metaphysical: 'Surprise & delight!' },
  { id: 'fluorite-octahedron', name: 'Fluorite Octahedron Set', price: 24.99, description: 'A set of 5 naturally formed fluorite octahedrons in various shades of green and purple.', categoryId: 'raw-minerals', image: '/products/fluorite.png', weight: '0.3 lbs', origin: 'China', chakra: 'Heart & Third Eye', metaphysical: 'Focus, clarity, mental order' },
  { id: 'selenite-wand', name: 'Selenite Charging Wand', price: 19.99, description: 'A polished selenite wand perfect for cleansing other crystals and spaces.', categoryId: 'polished-stones', image: '/products/selenite.png', weight: '0.4 lbs', origin: 'Morocco', chakra: 'Crown', metaphysical: 'Cleansing, clarity, higher connection' },
  { id: 'black-tourmaline-raw', name: 'Raw Black Tourmaline', price: 18.99, description: 'A chunky raw black tourmaline specimen — the ultimate protection stone.', categoryId: 'raw-minerals', image: '/products/tourmaline.png', weight: '0.7 lbs', origin: 'Brazil', chakra: 'Root', metaphysical: 'Protection, grounding, EMF shielding' },
  { id: 'lapis-lazuli-sphere', name: 'Lapis Lazuli Sphere', price: 94.99, description: 'A hand-polished lapis lazuli sphere with brilliant blue color and golden pyrite flecks.', categoryId: 'polished-stones', image: '/products/lapis-sphere.png', weight: '1.2 lbs', origin: 'Afghanistan', chakra: 'Throat & Third Eye', metaphysical: 'Truth, wisdom, inner vision' },
  { id: 'amethyst-bracelet', name: 'Amethyst Bead Bracelet', price: 22.99, description: 'A stretch bracelet made with genuine 8mm amethyst beads. One size fits most.', categoryId: 'jewelry', image: '/products/amethyst-bracelet.png', weight: '0.05 lbs', origin: 'Brazil', chakra: 'Crown', metaphysical: 'Peace, intuition, calm' },
  { id: 'desert-rose-selenite', name: 'Desert Rose Selenite', price: 27.99, description: 'A beautiful desert rose selenite formation resembling a blooming flower made of stone.', categoryId: 'raw-minerals', image: '/products/desert-rose.png', weight: '0.5 lbs', origin: 'Mexico', chakra: 'Crown & Root', metaphysical: 'Mental clarity, past life recall' },
  { id: 'mini-geode-set', name: 'Break-Your-Own Geode Set (6 pack)', price: 34.99, description: "Six uncracked geodes ready for you to discover what's hiding inside! Great for kids and adults alike.", categoryId: 'geodes', image: '/products/geode-set.png', weight: '3.0 lbs', origin: 'Morocco', metaphysical: 'Discovery & wonder', featured: true },
];

const blogPosts = [
  {
    slug: 'how-to-cleanse-your-crystals',
    title: "How to Cleanse Your Crystals: A Beginner's Guide",
    excerpt: "Your crystals work hard for you — here's how to return the favor. Learn the most popular methods for cleansing and recharging your stones.",
    content: `Your crystals absorb energy from their environment and from you. Over time, they can become energetically "full" and need to be cleansed to restore their natural vibrations.\n\n## Moonlight Bath\nPlace your crystals outside or on a windowsill during a full moon. The gentle lunar energy cleanses and recharges most stones. This is one of the safest methods for all crystal types.\n\n## Running Water\nHold your crystal under cool running water for 1-2 minutes while setting the intention to wash away negativity. **Note:** Some crystals like selenite, halite, and malachite are water-soluble — avoid this method for soft stones.\n\n## Smoke Cleansing\nPass your crystals through the smoke of sage, palo santo, or incense. This ancient practice is gentle and works for all crystal types.\n\n## Selenite Charging\nPlace your crystals on or near a selenite plate or wand overnight. Selenite is self-cleansing and can recharge other stones.\n\n## Sound Cleansing\nUse a singing bowl, tuning fork, or even a bell near your crystals. Sound vibrations can break up stagnant energy.\n\n## How Often?\nCleanse your crystals whenever they feel "heavy" or after intense use. A good rule of thumb is once a month, or after any particularly emotional experience.`,
    date: new Date('2026-02-01'),
    author: "Peddle'n Pebbles",
    category: 'Crystal Care',
    image: '/blog/cleansing-crystals.png',
    readTime: '4 min read',
  },
  {
    slug: 'birthstone-guide-2026',
    title: 'Your Birthstone Guide: Find Your Perfect Crystal Match',
    excerpt: 'Every month has a gemstone guardian. Discover which crystal was meant for you and what it reveals about your journey.',
    content: `Birthstones have been associated with each month of the year for centuries. Here's your guide to finding the stone that resonates with your birth month.\n\n## January — Garnet\nDeep red and full of passion. Garnet energizes and revitalizes, bringing courage and hope.\n\n## February — Amethyst\nThe royal purple stone of spiritual wisdom. Perfect for meditation and calming the mind.\n\n## March — Aquamarine\nThe pale blue stone of the sea. Promotes courage, clarity, and communication.\n\n## April — Diamond (or Herkimer Diamond)\nBrilliance and strength. Clear quartz or Herkimer diamonds are wonderful natural alternatives.\n\n## May — Emerald\nThe lush green stone of the heart. Symbolizes rebirth, love, and wisdom.\n\n## June — Moonstone\nLuminous and mysterious. Connected to intuition, new beginnings, and feminine energy.\n\n## July — Ruby\nThe king of gems. Represents passion, protection, and vitality.\n\n## August — Peridot\nBright olive green. Brings good health, restful sleep, and peace.\n\n## September — Sapphire (or Lapis Lazuli)\nDeep blue wisdom. Promotes truth, sincerity, and faithfulness.\n\n## October — Opal (or Tourmaline)\nA kaleidoscope of color. Inspires creativity, hope, and love.\n\n## November — Citrine\nWarm golden abundance. The merchant's stone attracts prosperity and joy.\n\n## December — Turquoise\nThe sky stone. Brings protection, good fortune, and healing.`,
    date: new Date('2026-01-20'),
    author: "Peddle'n Pebbles",
    category: 'Guides',
    image: '/blog/birthstones.png',
    readTime: '5 min read',
  },
  {
    slug: 'crystal-grids-for-beginners',
    title: 'Crystal Grids for Beginners: Amplify Your Intentions',
    excerpt: "One crystal is powerful. A grid of crystals working together? That's magic. Learn how to create your first crystal grid.",
    content: `Crystal grids combine the energy of multiple stones in sacred geometric patterns to amplify your intentions. Here's how to create your first one.\n\n## What You'll Need\n- A center stone (your "master" crystal — usually the largest)\n- Supporting stones (6-12 smaller crystals)\n- A grid template or cloth (optional but helpful)\n- A clear intention\n\n## Choosing Your Stones\n- **For abundance:** Citrine center, pyrite and green aventurine support\n- **For love:** Rose quartz center, rhodonite and moonstone support\n- **For protection:** Black tourmaline center, smoky quartz and obsidian support\n- **For clarity:** Clear quartz center, fluorite and selenite support\n\n## Setting Up\n1. Cleanse all your crystals first\n2. Find a quiet, undisturbed space\n3. Set your intention clearly in your mind\n4. Place your center stone first\n5. Work outward, placing supporting stones in a symmetric pattern\n6. Use a quartz point to "activate" the grid by drawing invisible lines connecting each stone\n\n## Maintaining Your Grid\nLeave your grid undisturbed for as long as you feel called to. Some people keep grids active for days, others for weeks. Trust your intuition — you'll know when the work is complete.`,
    date: new Date('2026-01-10'),
    author: "Peddle'n Pebbles",
    category: 'How-To',
    image: '/blog/crystal-grids.png',
    readTime: '6 min read',
  },
  {
    slug: 'top-5-crystals-every-beginner-needs',
    title: 'Top 5 Crystals Every Beginner Needs in Their Collection',
    excerpt: "Starting your crystal journey? These five stones are the foundation of any great collection — and they won't break the bank.",
    content: `Starting a crystal collection can feel overwhelming with so many beautiful options. Here are the five essential stones that every beginner should start with.\n\n## 1. Clear Quartz — The Master Healer\nClear quartz amplifies energy and intention. It's the most versatile crystal and can be programmed for any purpose. Think of it as the "Swiss Army knife" of the crystal world.\n\n## 2. Amethyst — The Calming Stone\nPerfect for stress relief, better sleep, and spiritual growth. Place one on your nightstand for more peaceful dreams.\n\n## 3. Rose Quartz — The Love Stone\nPromotes self-love, romantic love, and compassion. A gentle stone that everyone can benefit from.\n\n## 4. Black Tourmaline — The Protector\nAbsorbs negative energy like a sponge. Keep one near your front door or at your workspace.\n\n## 5. Citrine — The Abundance Stone\nAttracts prosperity, success, and joy. Place one in your wallet or on your desk.\n\n## Where to Start?\nPick the one that calls to you most. Seriously — your intuition knows which stone you need right now. Hold them, look at them, and notice which one makes you feel something. That's your crystal talking.`,
    date: new Date('2026-01-05'),
    author: "Peddle'n Pebbles",
    category: 'Guides',
    image: '/blog/beginner-crystals.png',
    readTime: '4 min read',
  },
];

async function main() {
  console.log('🌱 Seeding Peddle\'n Pebbles database...\n');

  // Categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  // Products
  for (const prod of products) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: { ...prod, inStock: true },
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  // Blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log(`✅ ${blogPosts.length} blog posts seeded`);

  // Admin user
  const { default: bcrypt } = await import('bcryptjs');
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  await prisma.user.upsert({
    where: { email: 'admin@peddlenpebbles.com' },
    update: {},
    create: {
      email: 'admin@peddlenpebbles.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created (admin@peddlenpebbles.com / Admin123!)');

  console.log('\n🎉 Seed complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
