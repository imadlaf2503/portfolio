"use client";
import { motion } from 'framer-motion';
import { 
  Code2, Cpu, Database, Binary, Terminal, 
  Blocks, Network, BrainCircuit 
} from 'lucide-react';

export default function BackgroundIcons() {
  const icons = [
    { Icon: Code2, top: '10%', left: '5%', size: 80, delay: 0 },
    { Icon: Cpu, top: '15%', left: '85%', size: 150, delay: 2 },
    { Icon: Database, top: '40%', left: '90%', size: 100, delay: 1 },
    { Icon: Binary, top: '60%', left: '2%', size: 120, delay: 3 },
    { Icon: Terminal, top: '85%', left: '8%', size: 80, delay: 1.5 },
    { Icon: Blocks, top: '20%', left: '12%', size: 130, delay: 0.5 },
    { Icon: Network, top: '55%', left: '5%', size: 140, delay: 2.5 },
    { Icon: BrainCircuit, top: '75%', left: '88%', size: 110, delay: 1.2 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none min-h-full w-full overflow-hidden select-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ 
            top: item.top, 
            left: item.left,
            color: 'rgba(99, 102, 241, 0.18)', // Opacité légèrement augmentée pour être vue
          }}
          // --- ANIMATION DE FLOTTAISON ---
          animate={{
            y: [0, -20, 0], // Monte et descend de 20px
            rotate: [index * 45, index * 45 + 10, index * 45], // Légère rotation
          }}
          transition={{
            duration: 5 + index, // Vitesse différente pour chaque icône
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
          // --- EFFET AU SURVOL (Optionnel mais stylé) ---
          whileHover={{ 
            scale: 1.1, 
            color: 'rgba(99, 102, 241, 0.4)',
            filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.3))' 
          }}
        >
          <item.Icon size={item.size} strokeWidth={0.5} />
        </motion.div>
      ))}

      {/* Un masque de dégradé pour que les icônes disparaissent doucement vers le bas */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] h-full w-full" />
    </div>
  );
}