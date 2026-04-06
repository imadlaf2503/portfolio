// components/sections/Skills.tsx
const skillCategories = [
  { title: "IA & Machine Learning", items: ["Agentic AI", "LLM / RAG", "Computer Vision", "PyTorch", "NLP"] },
  { title: "Software & Backend", items: ["FastAPI", "Node.js", "TypeScript", "Next.js", "React Native"] },
  { title: "Data Stack", items: ["SQL / MongoDB", "FAISS", "Scikit-learn", "Pandas"] },
  { title: "Industriel", items: ["AI Act", "Vercel / GitHub", "Agile", "UML"] }
];

export default function Skills() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-white italic">02. Compétences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillCategories.map((cat, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-primary font-mono text-sm uppercase tracking-widest border-b border-primary/20 pb-2">{cat.title}</h3>
            <ul className="space-y-2">
              {cat.items.map(item => (
                <li key={item} className="text-gray-400 text-sm hover:text-white transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}