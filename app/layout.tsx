import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Startup Showcase — Discover Amazing Startups",
  description:
    "Explore a curated directory of innovative startups and products. Filter by category, search by name, and deep-dive into every venture.",
  keywords: ["startups", "products", "showcase", "directory", "innovation"],
  openGraph: {
    title: "Startup Showcase",
    description: "Discover amazing startups and products powered by Contentstack.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">{children}</body>
    </html>
  );
}
