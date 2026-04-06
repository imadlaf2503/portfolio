import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";

// 1. Initialisation du modèle avec LangChain
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-4o-mini", // Très rapide et efficace
  temperature: 0.7,
});

// 2. Définition du Template de réponse (Le cerveau de l'assistant)
const TEMPLATE = `
Tu es l'assistant virtuel expert d'Abdallah Imad Lafendi. 
Ton rôle est de répondre aux recruteurs et aux visiteurs de son portfolio de manière professionnelle, chaleureuse et concise.

Voici les informations clés sur Abdallah :
- ÉDUCATION : Étudiant en G3 (Master 2) à l'École Centrale de Lille, parcours IA Engineer.
- STAGE ACTUEL : VYV 3 IT (Secteur Santé & IT), spécialisé dans les solutions numériques pour la santé.
- PROJETS PHARES : 
    * IAG-CARDIO (Diagnostic ECG avec IA & XAI)
    * WASSELNI (Application mobile de transport)
- COMPÉTENCES : LLM, RAG, Python, Next.js, Deep Learning.

INSTRUCTIONS :
- Si on te pose une question sur ses projets, sois précis.
- Si tu ne connais pas la réponse, propose au visiteur de contacter Abdallah directement via le bouton "Contact".
- Ne réponds jamais à des questions qui ne concernent pas Abdallah ou l'IA.

Question du visiteur : {input}
Assistant :`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // On récupère la dernière question de l'utilisateur
    const lastUserMessage = messages[messages.length - 1].content;

    // 3. Création de la chaîne de prompt
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const chain = prompt.pipe(model);

    // 4. Exécution de la chaîne
    const response = await chain.invoke({
      input: lastUserMessage,
    });

    return NextResponse.json({ content: response.content });

  } catch (error: any) {
    console.error("Erreur LangChain:", error);
    return NextResponse.json(
      { error: "Désolé, j'ai un petit souci technique." }, 
      { status: 500 }
    );
  }
}