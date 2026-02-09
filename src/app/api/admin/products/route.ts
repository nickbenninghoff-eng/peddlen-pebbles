import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();

  const body = await req.json();
  const { id, name, price, description, longDescription, image, weight, origin, chakra, metaphysical, featured, inStock, categoryId } = body;

  if (!id || !name || !price || !description || !categoryId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: { id, name, price: parseFloat(price), description, longDescription, image, weight, origin, chakra, metaphysical, featured: !!featured, inStock: inStock !== false, categoryId },
  });

  return NextResponse.json(product);
}
