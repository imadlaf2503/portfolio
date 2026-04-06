import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";
import { getAllDocumentsContent } from "@/lib/documentLoader";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.1, // Précision maximale, zéro divagation.
});

/**
 * PROMPT SYSTÈME OPTIMISÉ (FULL STRUCTURE)
 * Ce prompt définit l'identité, les sources de données et les règles de logique.
 */
const SYSTEM_PROMPT = `
# IDENTITÉ ET MISSION
Tu es l'Expert-IA Personnel d'Abdallah Imad Lafendi. Ton rôle est de répondre aux recruteurs et visiteurs en utilisant EXCLUSIVEMENT les documents fournis (CV et Rapports).

# SOURCES DE DONNÉES DISPONIBLES
1. **CV :** État civil, soft skills, technologies (FastAPI, Next.js, RAG, etc.), et résumé du parcours.
2. **Rapport IAG-CARDIO :** Détails sur l'IA appliquée à la cardiologie, modèles de prédiction, et architectures.
3. **Rapport WASSELNI :** Détails sur l'application de transport, gestion des flux et backend.
4. **Rapport CHU DE LILLE :** Stage en milieu hospitalier, optimisation des blocs opératoires, analyse de données de santé.
5. **Parcours Académique :** Centrale Lille (Diplôme d'Ingénieur), Université de Lille (Master MIASHS).

# RÈGLES DE RÉPONSE (STRICTES)
- **Véracité :** Si une information (ex: un modèle spécifique comme Random Forest ou CNN) est présente dans un rapport, cite-la précisément. Si elle n'y est pas, ne l'invente jamais.
- **Contexte Académique :** Ne confonds pas "Parcours Patient" (santé) et "Parcours Académique" (études). 
- **Compétences :** Relie toujours une compétence technique à un projet concret mentionné dans les rapports.
- **Langue :** Réponds toujours en Français, de manière concise, élégante et professionnelle.
- **Citations :** Utilise des expressions comme "Selon son rapport sur..." ou "Son CV mentionne...".

# DIRECTIVES EN CAS D'ABSENCE D'INFORMATION
Si la question porte sur un sujet non couvert par les documents (ex: ses hobbies non écrits, sa vie privée), réponds : 
"Je ne dispose pas de cette information spécifique dans les rapports de projets ou le CV d'Abdallah. Je vous invite à le contacter directement pour plus de précisions."

# CONTEXTE FOURNI :
{context}

# QUESTION DU VISITEUR :
{question}

# RÉPONSE DE L'EXPERT :`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userQuestion = messages[messages.length - 1].content;

    // 1. Récupération du gros bloc de texte (depuis la RAM)
    const fullContext = await getAllDocumentsContent();

    // 2. LOGIQUE DE FENÊTRE DE CONTEXTE (SMART SEARCH)
    // On divise par paragraphes
    const paragraphs = fullContext.split('\n').filter(p => p.trim().length > 15);
    
    // Mots-clés étendus pour couvrir les synonymes
    const searchTerms = userQuestion.toLowerCase().replace(/[?.,!]/g, "").split(' ');
    const expandedTerms = [...searchTerms, "formation", "études", "modèle", "algorithme", "résultat", "technologie"];

    // On sélectionne les paragraphes les plus denses en informations pertinentes
    let matchedParagraphs = paragraphs.filter(para => {
      const pLower = para.toLowerCase();
      return expandedTerms.some(term => term.length > 3 && pLower.includes(term));
    });

    // 3. ASSEMBLAGE DU CONTEXTE (Priorité : CV au début + Extraits pertinents)
    // On prend les 4000 premiers caractères (généralement le CV) + les 15 meilleurs paragraphes trouvés
    const cvHeader = fullContext.substring(0, 4000);
    const bodyContext = matchedParagraphs.slice(0, 20).join('\n\n---\n\n');
    
    const finalContext = `${cvHeader}\n\n[EXTRAITS DE PROJETS CIBLÉS]\n${bodyContext}`;

    console.log("--- ENGINE LOG ---");
    console.log("Tokens envoyés (estimés) :", Math.round(finalContext.length / 4));

    // 4. APPEL AU MODÈLE
    const prompt = PromptTemplate.fromTemplate(SYSTEM_PROMPT);
    const chain = prompt.pipe(model);

    const result = await chain.invoke({
      context: finalContext,
      question: userQuestion,
    });

    const responseContent = typeof result === 'string' ? result : (result as any).content;

    return NextResponse.json({ content: responseContent });

  } catch (error: any) {
    console.error("Critical API Error:", error);
    return NextResponse.json(
      { error: "Désolé, une erreur technique empêche l'accès aux rapports." }, 
      { status: 500 }
    );
  }
}