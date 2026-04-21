'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Session } from 'next-auth';

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="border-b border-gray-800 bg-gray-950 sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        <Link href="/feed" className="font-bold text-lg tracking-tight text-white">
          DevFeed
        </Link>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link
                href={`/profile/${session.user?.name}`}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {session.user?.name}
              </Link>

              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}

              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}