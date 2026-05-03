import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUXE BELANJA | Immersive 3D Shopping Experience",
  description: "Discover the future of e-commerce with our aesthetic 3D shopping platform. Premium products, smooth transitions, and world-class design.",
  keywords: ["e-commerce", "3D shopping", "luxury", "minimalist", "Next.js", "Three.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
