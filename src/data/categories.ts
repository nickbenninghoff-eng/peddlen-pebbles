export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  image?: string;
}

export const categories: Category[] = [
  {
    id: 'crystals',
    name: 'Crystals',
    description: 'Hand-selected crystal specimens with natural beauty and healing energy',
    emoji: '💎',
  },
  {
    id: 'geodes',
    name: 'Geodes',
    description: 'Crack open the earth and discover hidden treasures within',
    emoji: '🪨',
  },
  {
    id: 'polished-stones',
    name: 'Polished Stones',
    description: 'Tumbled and polished to reveal their inner radiance',
    emoji: '✨',
  },
  {
    id: 'raw-minerals',
    name: 'Raw Minerals',
    description: 'Uncut, untouched — straight from the earth to your hands',
    emoji: '⛏️',
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Wearable treasures crafted with love and natural stones',
    emoji: '📿',
  },
  {
    id: 'mystery-boxes',
    name: 'Mystery Boxes',
    description: 'A surprise selection of gems and stones — every box is an adventure',
    emoji: '🎁',
  },
];
