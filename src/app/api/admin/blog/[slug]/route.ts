import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  const { slug } = await params;
  const body = await req.json();

  const post = await prisma.blogPost.update({
    where: { slug },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.excerpt !== undefined && { excerpt: body.excerpt }),
      ...(body.content !== undefined && { content: body.content }),
      ...(body.author !== undefined && { author: body.author }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.image !== undefined && { image: body.image }),
      ...(body.readTime !== undefined && { readTime: body.readTime }),
      ...(body.published !== undefined && { published: body.published }),
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await requireAdmin())) return unauthorized();
  const { slug } = await params;

  await prisma.blogPost.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}
