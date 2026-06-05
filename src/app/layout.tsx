import { type ReactNode } from 'react';
import type { Metadata } from 'next';
import { Anek_Bangla, Space_Grotesk, Figtree, Outfit } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header, Footer, Sidebar } from '@/widgets';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { Toaster } from '@/shared/ui/sonner';
import { Providers } from './providers';
import './globals.css';

const anekBangla = Anek_Bangla({
  variable: '--font-anek-bangla-font',
  subsets: ['latin', 'bengali'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk-font',
  subsets: ['latin'],
  display: 'swap',
});

const figtree = Figtree({
  variable: '--font-figtree-font',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit-font',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mega Win',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark h-full ${anekBangla.variable} ${spaceGrotesk.variable} ${figtree.variable} ${outfit.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="h-full flex flex-col">
        <Providers>
          <SidebarProvider>
            <div className="w-full flex flex-col min-h-screen">
              <Header />
              <div className="flex-1 flex flex-row relative w-full pt-16">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col">{children}</div>
                  <Footer />
                </div>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
