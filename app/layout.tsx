import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import de ton nouveau composant Navbar
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Engineer Portfolio",
  description: "Portfolio d'ingénieur en Intelligence Artificielle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans">
        {/* La Navbar s'affiche en haut de chaque page */}
        <Navbar />
        
        {/* Le contenu de la page commence après la Navbar (pt-16) */}
        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}