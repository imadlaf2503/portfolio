import { GraduationCap, Code2, Database, BrainCircuit, ShieldCheck } from 'lucide-react';

export default function SkillsEducation() {
  const skills = [
    { cat: "IA Générative", icon: <BrainCircuit size={18} />, items: ["Agentic AI", "LLM", "RAG", "LangChain", "NLP", "Computer Vision"] },
    { cat: "Software", icon: <Code2 size={18} />, items: ["FastAPI", "Node.js", "TypeScript", "SQL", "MongoDB", "Next.js"] },
    { cat: "Data Stack", icon: <Database size={18} />, items: ["PyTorch", "TensorFlow", "Scikit-learn", "Pandas", "FAISS"] },
    { cat: "Industrialisation", icon: <ShieldCheck size={18} />, items: ["Conformité AI Act", "GitHub", "Vercel", "Agile"] }
  ];

  const education = [
    { 
      s: "Ecole Centrale de Lille", 
      logoFile: "centralelille.png", 
      d: "Master Management de l’IA", 
      y: "2024-2026" 
    },
    { 
      s: "Univ. Aboubakr Belkaid", 
      logoFile: "uabt.png", 
      d: "Master IA", 
      y: "2023-2024" 
    },
    { 
      s: "Univ. Aboubakr Belkaid", 
      logoFile: "uabt.png", 
      d: "Licence Informatique", 
      y: "2020-2023" 
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-32">
      {/* COMPÉTENCES */}
      <div>
        <h2 className="text-3xl font-bold mb-12 text-white italic">03. Compétences</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((s, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 text-indigo-500 mb-4 font-bold uppercase text-xs">
                {s.icon} {s.cat}
              </div>
              <ul className="space-y-2">
                {s.items.map(item => <li key={item} className="text-gray-400 text-sm">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ÉDUCATION */}
      <div>
        <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3 italic">
          <GraduationCap className="text-indigo-500" /> 04. Éducation
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-white/10 shadow-lg">
                  <img 
                    src={`/logos/${edu.logoFile}`} 
                    alt={`Logo ${edu.s}`} 
                    className="object-contain p-2 w-full h-full"
                  />
               </div>
               <p className="text-indigo-500 font-mono text-[10px] uppercase">{edu.y}</p>
               <h4 className="text-white font-bold text-sm mt-1">{edu.s}</h4>
               <p className="text-gray-500 text-xs mt-1">{edu.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}