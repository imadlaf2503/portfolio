// app/page.tsx
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import SkillsEducation from '@/components/sections/Skills';
import Footer from '@/components/layout/Footer';
import BackgroundIcons from '@/components/visual/BackgroundIcons'; 

export default function Home() {
  return (
    // On met le fond noir UNIQUEMENT ici
    <main className="relative bg-[#050505] w-full min-h-screen overflow-x-hidden">
      
      {/* 1. Les icônes de fond */}
      <BackgroundIcons />

      {/* 2. Le contenu SANS fond propre (transparent) pour laisser voir les icônes */}
      <div className="relative z-10 w-full">
        <Navbar />
        <Hero />
        <Projects />
        <Experience />
        <SkillsEducation />
        <Footer />
      </div>
    </main>
  );
}