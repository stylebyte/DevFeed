import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content, code, language } = await req.json();

  if (!content || content.trim() === '') {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content,
      code: code || null,
      language: language || 'javascript',
      authorId: session.user.id,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json(posts);
}