import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function GET() {
  if (!(await requireAdmin())) return unauthorized();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } }, user: true },
  });

  return NextResponse.json(orders);
}
