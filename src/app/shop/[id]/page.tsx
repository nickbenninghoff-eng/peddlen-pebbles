import { products } from '@/data/products';
import ProductDetail from './ProductDetail';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
