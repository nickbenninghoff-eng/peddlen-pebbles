import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');
  const sort = searchParams.get('sort') || 'featured';

  const where: Record<string, unknown> = { inStock: true };

  if (category && category !== 'all') {
    where.categoryId = category;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (featured === 'true') {
    where.featured = true;
  }

  const orderBy: Record<string, string> =
    sort === 'price-low' ? { price: 'asc' } :
    sort === 'price-high' ? { price: 'desc' } :
    sort === 'name' ? { name: 'asc' } :
    { featured: 'desc' };

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: { category: true },
  });

  return NextResponse.json(products);
}
