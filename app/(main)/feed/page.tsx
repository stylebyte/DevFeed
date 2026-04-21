import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';

export default async function FeedPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const following = await prisma.follow.findMany({
    where: { followerId: session.user.id },
    select: { followingId: true },
  });

  const followingIds = following.map((f) => f.followingId);

  const posts = await prisma.post.findMany({
    where: {
      authorId: { in: [...followingIds, session.user.id] },
    },
    include: {
      author: true,
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return (
    <div>
      <CreatePost userImage={session.user?.image ?? undefined} />

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-sm">No posts yet.</p>
          <p className="text-gray-600 text-xs mt-1">
            Be the first to post or follow some developers!
          </p>
        </div>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              createdAt: post.createdAt.toISOString(),
            }}
          />
        ))
      )}
    </div>
  );
}