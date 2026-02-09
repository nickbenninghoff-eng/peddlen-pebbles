import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json();
  const { id, name, description, emoji, image, sortOrder } = body;

  if (!id || !name || !description || !emoji) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: { id, name, description, emoji, image, sortOrder: sortOrder ?? 0 },
  });

  return NextResponse.json(category);
}
