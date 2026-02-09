import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Get related products from same category
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, inStock: true },
    take: 3,
  });

  return NextResponse.json({ ...product, related });
}
