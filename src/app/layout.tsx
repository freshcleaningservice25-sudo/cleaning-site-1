import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cleaning",
  description: "Book professional home cleaning quickly and securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-black/[.06] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/book" className="flex items-center gap-2">
              <span className="inline-block h-7 w-7 rounded-md bg-brand" aria-hidden />
              <span className="text-xl font-semibold tracking-tight">Fresh</span>
            </a>
            <nav className="text-sm flex gap-4">
              <a href="/book" className="hover:underline">Book now</a>
              <a href="/admin" className="hover:underline">Admin</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-black/[.06] py-8 text-center text-sm text-black/60">
          © {new Date().getFullYear()} Fresh Cleaning. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
