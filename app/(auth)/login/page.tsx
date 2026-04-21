import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import LoginButton from '@/components/LoginButton';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect('/feed');

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="text-center w-full max-w-sm px-4">

        <h1 className="text-3xl font-bold text-white mb-2">DevFeed</h1>
        <p className="text-gray-400 text-sm mb-8">
          A social platform for developers
        </p>

        <LoginButton />

        <p className="text-xs text-gray-600 mt-6">
          By signing in you agree to share your GitHub profile info.
        </p>
      </div>
    </div>
  );
}