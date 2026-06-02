import type { Metadata } from "next";
import {
  Anek_Bangla,
  Space_Grotesk,
  Figtree,
  Outfit,
} from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import "./globals.css";

const anekBangla = Anek_Bangla({
  variable: "--font-anek-bangla-font",
  subsets: ["latin", "bengali"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-font",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree-font",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit-font",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mega Win",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${anekBangla.variable} ${spaceGrotesk.variable} ${figtree.variable} ${outfit.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="h-full">
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
