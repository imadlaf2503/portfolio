// components/sections/Experience.tsx
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: "VYV 3 IT",
    // C'est ici qu'on définit le nom du fichier image dans public/logos/
    logoFileName: "vyv3.png", 
    role: "Stagiaire Data Scientist",
    period: "MARS 2026 - SEPTEMBRE 2026",
    tasks: [
      "Structuration du cycle de vie de la donnée : cartographie et industrialisation des flux de collecte.",
      "Développement d'un Agent IA (RAG) exploitant l'ontologie métier pour automatiser l'accès à la documentation.",
      "Optimisation des processus d'exploitation via la clarification des rôles et le support fonctionnel."
    ]
  },
  {
    company: "CHU de Lille Claude Huriez",
    // C'est ici qu'on définit le nom du fichier image dans public/logos/
    logoFileName: "CHU_Lille_Logo.png", 
    role: "Stagiaire Data Scientist & Optimisation",
    period: "MARS 2025 - AOÛT 2025",
    tasks: [
      "Développement d'un système d'aide à la décision pour la planification des interventions dans le bloc opératoire.",
      "Analyse exploratoire des données hospitalières (EDA) et identification des goulots d'étranglement logistiques.",
      "Modélisation prédictive des durées d'intervention via l'algorithme Random Forest (Scikit-learn).",
      "Impact : Réduction du taux de dépassement horaire de 30% à 6,5% et augmentation de l'activité du bloc.",
      "Impact : Organisation optimale des équipes et réduction de la surcharge du personnel médical."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-white flex items-center gap-3 italic">
        <Briefcase className="text-indigo-500" /> 02. Expériences
      </h2>
      <div className="space-y-16">
        {experiences.map((exp, i) => (
          <div key={i} className="flex flex-col md:flex-row gap-8">
            
            {/* Zone Logo (Conteneur blanc) */}
            <div className="w-20 h-20 bg-white border border-white/10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-xl">
               {/* LA CORRECTION EST ICI :
                  On utilise des backticks `...` pour créer une chaîne de caractères dynamique.
                  Le chemin de l'image devient : "/logos/" + exp.logoFileName
               */}
               <img 
                  src={`/logos/${exp.logoFileName}`} 
                  alt={`Logo de ${exp.company}`} 
                  className="object-contain p-2 w-full h-full" 
               />
            </div>
            
            <div className="flex-grow border-l border-white/5 pl-8">
              <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest">{exp.period}</span>
              <h3 className="text-2xl font-bold text-white mt-1">{exp.role}</h3>
              <p className="text-gray-400 font-medium text-lg mb-4">{exp.company}</p>
              <ul className="space-y-3">
                {exp.tasks.map((task, j) => (
                  <li key={j} className="text-gray-500 text-sm flex items-start gap-3 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" /> {task}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}