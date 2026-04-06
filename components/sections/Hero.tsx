// components/sections/Hero.tsx
"use client";
import { Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const MessageBubble = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0, opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 1.2 }}
      className="absolute -top-16 -left-20 z-[60] pointer-events-none" // Augmentation du z-index
    >
      <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl rounded-bl-lg px-6 py-4 shadow-[0_10px_40px_rgba(99,102,241,0.2)]">
        <p className="text-white text-sm font-medium leading-relaxed tracking-tight whitespace-nowrap">
          Salut ! Bienvenue dans <br/>
          mon <span className="text-indigo-500 font-bold">portfolio.</span>
        </p>
      </div>
      <div className="absolute -bottom-2.5 left-6 w-5 h-5 bg-[#0a0a0a] border-l border-b border-white/10 rotate-[-45deg]"/>
    </motion.div>
  );
};

export default function Hero() {
  const [showAvatar, setShowAvatar] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => setShowAvatar(true), 500);
    const closeTimer = setTimeout(() => setShowAvatar(false), 6000);
    return () => { clearTimeout(openTimer); clearTimeout(closeTimer); };
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[90vh] px-6 text-center relative overflow-hidden">
      {/* Modification : z-50 et position relative forcée pour iOS */}
      <div className="h-52 mb-4 mt-20 flex items-center justify-center z-[50] relative"> 
        <AnimatePresence>
          {showAvatar && (
            <motion.div
              initial={{ y: 50, scale: 0, opacity: 0 }}
              animate={{ y: 0, scale: 1.3, opacity: 1 }}
              exit={{ y: 100, scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative z-[51]"
            >
              <MessageBubble />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-indigo-500 bg-[#0a0a0a] overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.4)]"
              >
                <img src="/Salut.png" alt="Salut" className="w-full h-full object-cover scale-110" />
              </motion.div>
              <motion.div 
                animate={{ rotate: [0, 20, -20, 20, 0] }} 
                transition={{ delay: 0.8, duration: 1, repeat: 1, repeatDelay: 0.5 }}
                className="absolute -bottom-2 -right-2 text-5xl select-none"
              >
                👋
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-6 px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono tracking-widest uppercase mt-4">
        Ingénieur IA & Data Scientist • Centrale Lille
      </div>
      <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6">
        Bâtir le futur, <br />
        <span className="text-indigo-500">une ligne à la fois.</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mb-10 leading-relaxed relative z-10">
        Ingénieur en Intelligence Artificielle / Data Scientist en Master 2 à l’École Centrale de Lille. 
        Spécialisé dans le cycle de vie complet de la donnée, de la modélisation (LLM, RAG, Deep Learning) 
        au déploiement de solutions scalables.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 relative z-10">
        <a href="#projets" className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/20">
          Voir mes projets
        </a>
        <a href="mailto:lafendiabdallahimad@gmail.com" className="flex items-center justify-center gap-2 border border-gray-700 hover:border-indigo-500/50 text-white px-10 py-4 rounded-full font-semibold transition-all">
          <Mail size={18} /> Me contacter
        </a>
      </div>
      <div className="mt-12 flex items-center gap-2 text-gray-500 text-sm font-mono uppercase tracking-tighter relative z-10">
        <MapPin size={14} className="text-indigo-500" /> Villeneuve d'Ascq, France
      </div>
    </section>
  );
}