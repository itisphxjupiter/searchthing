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

export const metadata = {
  title: 'SearchThing - Simple Search & Bang Commands',
  description: 'A minimalist search engine with powerful bang commands for quick access to your favorite sites',
  metadataBase: new URL('https://searchthing.xyz'),
  openGraph: {
    title: 'SearchThing - Simple Search with Bang Commands',
    description: 'A minimalist search engine with powerful bang commands for quick access to your favorite sites',
    url: 'https://searchthing.xyz',
    siteName: 'SearchThing',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SearchThing - Simple Search & Bang Commands',
    description: 'A minimalist search engine with powerful bang commands for quick access to your favorite sites',
  },
  verification: {
    google: 'your-google-verification-code', // You'll get this from Google Search Console
  },
}

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
        {children}
      </body>
    </html>
  );
}
