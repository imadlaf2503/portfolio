// components/layout/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-[150] border-b border-white/10 bg-[#050505]/80 backdrop-blur-md"> {/* z-index 150 pour être au dessus de tout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-sm md:text-xl font-bold tracking-tighter text-white shrink-0">
          ABDALLAH IMAD <span className="text-indigo-500 hidden sm:inline">LAFENDI</span>
          <span className="text-indigo-500 sm:hidden"> L.</span> {/* Version courte pour iPhone */}
        </Link>
        {/* Réduction du gap de 8 à 4 sur mobile */}
        <div className="flex gap-4 md:gap-8 text-[11px] md:text-sm font-medium text-gray-400">
          <Link href="#projets" className="hover:text-indigo-500 transition-colors">Projets</Link>
          <Link href="#experience" className="hover:text-indigo-500 transition-colors">Expérience</Link>
          <Link href="#contact" className="hover:text-indigo-500 transition-colors font-bold text-indigo-400 md:text-gray-400">Contact</Link>
        </div>
      </div>
    </nav>
  );
}