import ProductDetail from './ProductDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
