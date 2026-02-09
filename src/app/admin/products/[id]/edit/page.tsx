import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProductForm } from '../../ProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
        Edit: {product.name}
      </h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
