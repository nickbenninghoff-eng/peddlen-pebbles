import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;
  const body = await req.json();

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.price !== undefined && { price: parseFloat(body.price) }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.longDescription !== undefined && { longDescription: body.longDescription }),
      ...(body.image !== undefined && { image: body.image }),
      ...(body.weight !== undefined && { weight: body.weight }),
      ...(body.origin !== undefined && { origin: body.origin }),
      ...(body.chakra !== undefined && { chakra: body.chakra }),
      ...(body.metaphysical !== undefined && { metaphysical: body.metaphysical }),
      ...(body.featured !== undefined && { featured: body.featured }),
      ...(body.inStock !== undefined && { inStock: body.inStock }),
      ...(body.categoryId !== undefined && { categoryId: body.categoryId }),
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  const { id } = await params;

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
