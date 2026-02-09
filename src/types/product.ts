// Shared Product type used across frontend components
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription?: string | null;
  category: string; // categoryId mapped to "category" for frontend compat
  image: string;
  properties?: {
    weight?: string;
    origin?: string;
    chakra?: string;
    metaphysical?: string;
  };
  featured?: boolean;
  inStock?: boolean;
}

// Convert a DB product (with flat fields + categoryId) to frontend Product shape
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeProduct(p: any): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    description: p.description,
    longDescription: p.longDescription,
    category: p.categoryId ?? p.category?.id ?? p.category,
    image: p.image || '',
    properties: (p.weight || p.origin || p.chakra || p.metaphysical) ? {
      weight: p.weight ?? undefined,
      origin: p.origin ?? undefined,
      chakra: p.chakra ?? undefined,
      metaphysical: p.metaphysical ?? undefined,
    } : undefined,
    featured: p.featured ?? false,
    inStock: p.inStock ?? true,
  };
}
