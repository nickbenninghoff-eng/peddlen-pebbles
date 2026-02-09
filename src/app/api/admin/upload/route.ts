import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, unauthorized } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) return unauthorized();

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'IMGBB_API_KEY not configured' }, { status: 500 });

  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) return NextResponse.json({ error: 'No image provided' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString('base64');

  const imgbbForm = new FormData();
  imgbbForm.append('key', apiKey);
  imgbbForm.append('image', base64);

  const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: imgbbForm });
  const data = await res.json();

  if (!data.success) return NextResponse.json({ error: 'Upload failed' }, { status: 500 });

  return NextResponse.json({ url: data.data.url, thumb: data.data.thumb?.url, delete_url: data.data.delete_url });
}
