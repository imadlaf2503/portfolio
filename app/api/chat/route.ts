import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";
import { getAllDocumentsContent } from "@/lib/documentLoader";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.1, // Baissé à 0.1 pour un maximum de fidélité aux textes
});

const TEMPLATE = `
Tu es l'assistant strictement professionnel d'Abdallah Imad Lafendi. 
Ton objectif est de fournir des informations EXACTES basées uniquement sur les extraits fournis.

RÈGLES CRITIQUES DE RÉPONSE :
1. NE MÉLANGE PAS LES PROJETS : Si on pose une question sur le CHU de Lille, n'utilise pas les technologies du projet IAG-CARDIO (comme FastAPI, RAG ou Agents) SAUF si elles sont explicitement écrites dans l'extrait concernant le CHU.
2. PAS D'INVENTION : Si l'extrait ne mentionne pas un outil, une date ou une mission spécifique, réponds : "D'après les rapports disponibles, cette précision n'est pas mentionnée."
3. RIGUEUR : Ne dis pas "J'ai utilisé" mais "Abdallah a utilisé" ou "Le rapport mentionne l'utilisation de...".
4. SOURCE : Si possible, précise de quel document vient l'info (ex: "D'après son rapport de stage au CHU...").

CONTEXTE EXTRAIT DES DOCUMENTS D'ABDALLAH :
{context}

QUESTION DU VISITEUR : {question}
ASSISTANT (Réponse précise et sourcée) :`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const userQuestion = messages[messages.length - 1].content;

    // 1. Récupération du contenu (via le cache mémoire du loader)
    const fullContext = await getAllDocumentsContent();
    
    // 2. FILTRAGE RAG OPTIMISÉ
    const questionLower = userQuestion.toLowerCase();
    const keywords = questionLower
      .replace(/[?.,!]/g, "")
      .split(' ')
      .filter(w => w.length > 3);

    // Découpage en paragraphes et nettoyage des espaces inutiles
    const paragraphs = fullContext.split('\n').map(p => p.trim()).filter(p => p.length > 40);
    
    let relevantParagraphs = paragraphs.filter(para => {
      const pLower = para.toLowerCase();
      
      // Priorisation contextuelle : Si on parle du CHU, on évite de prendre les paragraphes du CV
      if (questionLower.includes("chu") && !pLower.includes("chu") && !pLower.includes("lille")) {
          return false;
      }
      
      return keywords.some(key => pLower.includes(key));
    });

    // 3. CONSTRUCTION DU CONTEXTE FINAL
    // On limite à 12 paragraphes max pour éviter que l'IA ne se mélange les pinceaux
    let contextForAi = relevantParagraphs.length > 0 
      ? relevantParagraphs.slice(0, 12).join('\n\n---\n\n')
      : fullContext.substring(0, 5000); // Fallback sur le début (souvent le CV)

    console.log("--- DEBUG RAG ---");
    console.log("Mots-clés détectés :", keywords);
    console.log("Paragraphes pertinents trouvés :", relevantParagraphs.length);
    console.log("Volume envoyé (caractères) :", contextForAi.length);

    // 4. CHAÎNE LANGCHAIN
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const chain = prompt.pipe(model);

    const result = await chain.invoke({
      context: contextForAi,
      question: userQuestion,
    });

    const responseContent = typeof result === 'string' ? result : (result as any).content;

    return NextResponse.json({ content: responseContent });

  } catch (error: any) {
    console.error("Erreur Chat API:", error);
    return NextResponse.json(
      { error: "L'assistant rencontre une difficulté technique." }, 
      { status: 500 }
    );
  }
}