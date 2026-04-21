import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevFeed',
  description: 'A social platform for developers',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar session={session} />
          <main className="max-w-2xl mx-auto px-4 py-6">
            {children}
          </main>
        </SessionProvider>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"
          async
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"
          async
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js"
          async
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"
          async
        />
      </body>
    </html>
  );
}