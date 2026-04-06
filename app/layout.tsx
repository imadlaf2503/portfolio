import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
// --- 1. IMPORT DU CHATBOT ---
import ChatBot from "@/components/ai/ChatBot"; 

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

        {/* --- 2. AFFICHAGE DU CHATBOT --- */}
        {/* Il est en position 'fixed' dans son propre fichier, 
            donc il flottera au-dessus du contenu */}
        <ChatBot />
      </body>
    </html>
  );
}