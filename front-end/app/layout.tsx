import { RocketIcon } from '@/common/icons/rocket';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SpaceX Dashboard',
  description: 'Dashboard das missões realizadas pela Space X',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="flex items-center justify-center py-4 gap-2">
          <RocketIcon />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Space X
          </h1>
        </header>
        {children}
        <footer className="py-5 flex justify-center items-center text-gray-400">
          Challenge Coodesh &copy;
        </footer>
      </body>
    </html>
  );
}
