import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

type Post = {
  id: string;
  content: string;
  code: string | null;
  language: string | null;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
    username: string | null;
  };
  likes: { id: string }[];
  comments: { id: string }[];
};

export default function PostCard({ post }: { post: Post }) {
  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="border border-gray-800 rounded-xl p-4 bg-gray-900 mb-3 hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        {post.author.image && (
          <Image
            src={post.author.image}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        )}
        <div>
          <Link
            href={`/profile/${post.author.name}`}
            className="text-sm font-medium text-white hover:underline"
          >
            {post.author.name}
          </Link>
          <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      <p className="text-gray-200 text-sm leading-relaxed">{post.content}</p>

      {post.code && post.language && (
        <CodeBlock code={post.code} language={post.language} />
      )}

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-800">
        <span className="text-xs text-gray-500">
          {post.likes.length} likes
        </span>
        <span className="text-xs text-gray-500">
          {post.comments.length} comments
        </span>
      </div>
    </div>
  );
}