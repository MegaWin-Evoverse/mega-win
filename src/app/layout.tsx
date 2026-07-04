import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Anek_Bangla, Space_Grotesk, Figtree, Outfit } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Sidebar } from '@/widgets/sidebar';
import { BottomNav } from '@/widgets/bottom-nav';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { Toaster } from '@/shared/ui/sonner';
import { PageTransition } from '@/shared/ui/PageTransition';
import { Providers } from './providers';
import './globals.css';
import { AuthForm } from '@/widgets/auth-form';

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
              <AuthForm />
              <Header />
              <div className="app-shell flex-1 flex flex-row relative w-full pt-16 max-[639px]:pb-16">
                <Sidebar />
                <div className="flex-1 min-w-0 flex flex-col">
                  <PageTransition>{children}</PageTransition>
                  <Footer />
                </div>
              </div>
              <BottomNav />
            </div>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
