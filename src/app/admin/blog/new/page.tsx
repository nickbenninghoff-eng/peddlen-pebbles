import { BlogForm } from '../BlogForm';

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'var(--font-heading)', color: 'var(--earth-dark)' }}>
        New Blog Post
      </h1>
      <BlogForm />
    </div>
  );
}
