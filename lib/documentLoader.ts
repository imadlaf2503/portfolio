"use server";
import fs from 'fs';
import path from 'path';
import PDFParser from 'pdf2json';

// Variable globale pour stocker le texte en mémoire vive (RAM)
let cachedContent: string | null = null;

export async function getAllDocumentsContent(): Promise<string> {
  // Si le texte est déjà chargé, on le renvoie instantanément
  if (cachedContent) return cachedContent;

  const docsDir = path.join(process.cwd(), 'data/documents');
  if (!fs.existsSync(docsDir)) return "";

  const files = fs.readdirSync(docsDir).filter(file => file.endsWith('.pdf'));
  let allContent = "";

  const parsePdf = (filePath: string): Promise<string> => {
    return new Promise((resolve) => {
      const pdfParser = new (PDFParser as any)(null, 1);
      pdfParser.on("pdfParser_dataError", () => resolve(""));
      pdfParser.on("pdfParser_dataReady", () => {
        // @ts-ignore
        const rawText = pdfParser.getRawTextContent();
        // Nettoyage safe des caractères URI malformés
        const cleanText = rawText.replace(/%(?![0-9A-Fa-f]{2})/g, "%25");
        try {
          resolve(decodeURIComponent(cleanText));
        } catch {
          resolve(rawText);
        }
      });
      pdfParser.loadPDF(filePath);
    });
  };

  for (const file of files) {
    console.log(`⏳ Lecture de : ${file}...`);
    const text = await parsePdf(path.join(docsDir, file));
    allContent += `\n[DOCUMENT: ${file}]\n${text}\n`;
  }

  cachedContent = allContent; // Sauvegarde en mémoire
  console.log("✅ Tous les rapports sont chargés en mémoire.");
  return allContent;
}