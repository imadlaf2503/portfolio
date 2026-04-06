"use client";
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

// --- COMPOSANT INTERNE : BULLE DE MESSAGE FIXE ---
const ContactBubble = () => {
  return (
    <motion.div
      // Animation de flottaison douce synchronisée avec l'avatar
      animate={{ y: [0, -5, 0] }}
      transition={{ 
        repeat: Infinity, 
        duration: 3, // Plus lent pour le footer
        ease: "easeInOut" 
      }}
      className="absolute -top-12 -right-28 z-50 pointer-events-none"
    >
      <div className="bg-[#0a0a0a] border border-white/10 rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(99,102,241,0.15)]">
        <p className="text-white text-xs font-medium tracking-tight whitespace-nowrap">
          N'hésitez pas à me <span className="text-indigo-400 font-bold">contacter !</span>
        </p>
      </div>
      
      {/* La petite pointe de la bulle (orientée vers l'avatar) */}
      <div className="absolute -bottom-1.5 left-8 w-4 h-4 bg-[#0a0a0a] border-l border-b border-white/10 rotate-[-45deg]"/>
    </motion.div>
  );
};

export default function Footer() {
  return (
    <footer id="contact" className="py-20 border-t border-white/5 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        <div className="flex flex-col items-start relative">
          
          {/* ZONE AVATAR : z-10 pour passer devant le décor */}
          <div className="relative mb-6 z-10">
            
            {/* --- 1. AJOUT DE LA BULLE --- */}
            <ContactBubble />

            {/* --- 2. L'AVATAR EXISTANT (Stylisé et Animé en boucle) --- */}
            <motion.div
              // Flottaison continue
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 3, 
                ease: "easeInOut" 
              }}
              className="w-40 h-40 bg-indigo-500/10 rounded-2xl p-2 border border-white/5 shadow-inner"
            >
              <img 
                src="/Contactez.png" 
                alt="Contactez-moi" 
                className="w-full h-full object-contain" 
              />
            </motion.div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6 italic z-10 relative">
            Travaillons <span className="text-indigo-500 font-serif">ensemble.</span>
          </h2>
          <p className="text-gray-500 leading-relaxed max-w-md z-10 relative">
            Basé à Villeneuve d'Ascq, je suis disponible pour des opportunités en IA Engineer ou Data Science dès Octobre 2026 pour un contrat CDI.
          </p>
        </div>
        
        <div className="space-y-8 flex flex-col justify-center z-10 relative">
          <a href="mailto:lafendiabdallahimad@gmail.com" className="group flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
              <Mail className="text-indigo-500" size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-gray-500 tracking-[0.2em]">Email</p>
              <p className="text-white text-lg font-medium">lafendiabdallahimad@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center">
              <Phone className="text-indigo-500" size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-mono text-gray-500 tracking-[0.2em]">Téléphone</p>
              <p className="text-white text-lg font-medium">+33 7 80 83 49 93</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em] z-10 relative">
        <span>© 2026 Abdallah Imad Lafendi</span>
        <span>Centrale Lille • IA Engineer</span>
      </div>
    </footer>
  );
}