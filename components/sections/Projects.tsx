"use client";
import { useState } from 'react';
import { Layout, Cpu, Database, Smartphone, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Projects() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const cardioImages = [
    "/projects/cardio/ECGinterface.png",
    "/projects/cardio/diagnosticexemple.png",
    "/projects/cardio/dossierpatients.png",
    "/projects/cardio/ajouterpatient.png"
  ];

  const wasselniImages = [
    "/projects/wasselni/splashV2.PNG",
    "/projects/wasselni/rechercheV2.PNG",
    "/projects/wasselni/resultatRechercheV2.PNG",
    "/projects/wasselni/ConnexionV2.PNG",
    "/projects/wasselni/inscriptionV2.PNG",
    "/projects/wasselni/detailsResultatV2.PNG",
    "/projects/wasselni/mesAnnoncesV2.PNG",
    "/projects/wasselni/vehiculeV2.PNG"
  ];

  return (
    <section id="projets" className="py-20 px-6 max-w-7xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3 italic">
        <Layout className="text-indigo-500" /> 01. Projets & Lab
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-auto">
        {/* IAG-CARDIO */}
        <div className="md:col-span-4 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 overflow-hidden relative group">
          <div className="flex flex-col h-full relative z-10">
            <div>
              <span className="text-indigo-500 text-xs font-mono mb-2 block uppercase flex items-center gap-2">
                <Cpu size={14} /> Full-stack & Santé
              </span>
              <h3 className="text-3xl font-bold text-white mb-4">IAG-CARDIO / CARDIO-SPECTRA V4</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-6">
                Plateforme d'aide au diagnostic d'ECG exploitant un dataset de 32k examens. 
                Intégration d'Agents IA et de techniques XAI pour l'explicabilité médicale.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Next.js", "Python", "Llama-3", "NeonDB", "XAI", "FastAPI"].map(tech => (
                  <span key={tech} className="text-[10px] font-mono text-indigo-400 border border-indigo-400/20 bg-indigo-500/5 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {cardioImages.map((img, idx) => (
                <div key={idx} onClick={() => setSelectedImg(img)} className="relative min-w-[160px] h-24 rounded-xl overflow-hidden border border-white/10 cursor-zoom-in hover:border-indigo-500 transition-all hover:scale-105">
                  <img src={img} className="object-cover w-full h-full" alt="Cardio detail" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Assistant Medical RAG */}
        <div className="md:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 flex flex-col justify-between group">
          <div>
            <Database className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold text-white mb-4">Assistant Médical RAG</h3>
            <p className="text-gray-400 text-xs italic leading-relaxed">
              Système de recherche sémantique médicale avec FAISS et Zephyr LLM.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex gap-2">
             <span className="text-[9px] text-gray-500 font-mono">#Streamlit</span>
             <span className="text-[9px] text-gray-500 font-mono">#FAISS</span>
          </div>
        </div>

        {/* WASSELNI */}
        <div className="md:col-span-6 bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="text-indigo-500" />
                <h3 className="text-2xl font-bold text-white">Wasselni</h3>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Application mobile de transport en temps réel avec matching automatisé. 
              </p>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Firebase", "Laravel", "Google Maps API"].map(t => (
                  <span key={t} className="text-[10px] font-mono text-indigo-400 border border-indigo-400/30 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-2/3 flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-thin scrollbar-thumb-indigo-500/20">
              {wasselniImages.map((img, idx) => (
                <motion.div key={idx} whileHover={{ y: -10 }} onClick={() => setSelectedImg(img)} className="min-w-[150px] h-[300px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden cursor-zoom-in shrink-0 shadow-2xl transition-all">
                  <img src={img} className="w-full h-full object-cover" alt={`Screen ${idx}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- AVATAR "ALORS" POSITIONNÉ À DROITE --- */}
      <div className="absolute -bottom-10 right-0 md:right-10 z-20 flex items-center gap-4">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Bulle de texte */}
          <div className="absolute -top-16 right-0 bg-[#0a0a0a] border border-white/10 px-4 py-2 rounded-2xl rounded-tr-none shadow-xl whitespace-nowrap">
            <p className="text-white text-xs font-medium">
              Alors ! vous pensez quoi ? 😂
            </p>
            <div className="absolute -bottom-1.5 right-0 w-3 h-3 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45"/>
          </div>

          {/* Avatar 50x50 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] flex items-center justify-center bg-gradient-to-t from-indigo-500/10 to-transparent rounded-full"
          >
            <img 
              src="/Alors.png" 
              alt="Alors ?" 
              className="w-full h-full object-contain" 
            />
          </motion.div>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              src={selectedImg} className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/20" alt="Zoomed view"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}