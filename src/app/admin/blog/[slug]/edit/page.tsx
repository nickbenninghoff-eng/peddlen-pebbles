import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { BlogForm } from '../../BlogForm';

export default async function EditBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
        Edit: {post.title}
      </h1>
      <BlogForm post={post} />
    </div>
  );
}
