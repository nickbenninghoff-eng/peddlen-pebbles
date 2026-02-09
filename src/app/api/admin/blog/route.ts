import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();
  const body = await req.json();
  const { slug, title, excerpt, content, author, category, image, readTime, published } = body;

  if (!slug || !title || !excerpt || !content || !author || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const post = await prisma.blogPost.create({
    data: {
      slug,
      title,
      excerpt,
      content,
      date: new Date(),
      author,
      category,
      image,
      readTime: readTime || '5 min read',
      published: published !== false,
    },
  });

  return NextResponse.json(post);
}
