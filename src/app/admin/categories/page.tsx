import prisma from '@/lib/prisma';
import { CategoryManager } from './CategoryManager';

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
        Categories ({categories.length})
      </h1>
      <CategoryManager categories={categories.map(c => ({ ...c, productCount: c._count.products }))} />
    </div>
  );
}
