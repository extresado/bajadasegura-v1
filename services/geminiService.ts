
import { GoogleGenAI, Type } from "@google/genai";

// Instrucciones del sistema para definir la personalidad de @BajadaSegura
export const getSystemInstruction = (userName?: string) => {
    return `Actúa como @BajadaSegura, el asistente de IA de la iniciativa Bajada Segura. Tu rol es ser un colega de apoyo, alguien cercano y de confianza. Tienes unos 26 años, así que tu tono es relajado, directo y empático, pero siempre muy informado y responsable. Estás especializado en chemsex, con información contrastada sobre sustancias, riesgos y reducción de daños. Tu propósito es ofrecer un espacio seguro y sin prejuicios.

**Instrucciones Clave:**
1.  **Contexto del Usuario:** ${userName ? `El usuario se llama "${userName}". Salúdale directamente por su nombre de forma cercana.` : 'Preséntate como "@BajadaSegura" y pregunta enseguida cómo llamar al usuario.'}
2.  **Interacción:** Mantén una conversación fluida. Haz preguntas abiertas y suaves.
3.  **Tono:** Lenguaje natural, cercano, tutea siempre. Usa emojis (😊, 👍, 🤔, 🙏, ✨).
4.  **Concisión:** Respuestas cortas y directas.

**Principios:**
1.  **Empatía:** Valida sentimientos. Espacio sin juicios.
2.  **Evidencia:** Información basada en reducción de daños contrastada.
3.  **No Eres Médico:** No des diagnósticos ni recetas. Emergencias al 112.
4.  **Idioma:** Responde siempre en español.`;
};

const prepareContents = (messages: any[]) => {
  return messages.map(m => ({
    role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
};

export const chatCompletion = async (messages: any[], jsonMode = false, userName?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents = prepareContents(messages);

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: getSystemInstruction(userName),
      responseMimeType: jsonMode ? "application/json" : undefined,
      temperature: 0.8,
    },
  });

  return response.text || '';
};

export async function* chatCompletionStream(messages: any[], userName?: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const contents = prepareContents(messages);

  const result = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: getSystemInstruction(userName),
      temperature: 0.8,
    },
  });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
}

/**
 * Busca noticias reales y recientes usando Google Search Grounding.
 */
export const getRecentChemsexNews = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Busca y resume las 4 noticias más recientes e importantes sobre chemsex en España (últimos 6 meses). 
  Para cada noticia, estructura la respuesta exactamente así:
  ### [TÍTULO DE LA NOTICIA]
  [RESUMEN DE 2 LÍNEAS]
  [URL DE LA FUENTE]
  ---`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  return response.text || "";
};

/**
 * Busca recursos de emergencia cercanos utilizando la herramienta específica de Google Maps.
 */
export const getNearbyUrgentResourcesWithMaps = async (lat: number, lng: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Estoy en una situación de urgencia. Necesito localizar EXACTAMENTE los 3 recursos más cercanos a mi ubicación actual:
  1. La Comisaría de Policía más cercana.
  2. La Farmacia de guardia 24h más cercana.
  3. El Hospital o Centro Médico de urgencias más cercano.

  Proporciona el nombre del lugar, la dirección y un número de teléfono si está disponible. Explica brevemente por qué es la mejor opción en este momento.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: lat,
            longitude: lng
          }
        }
      }
    },
  });

  // Extraemos el texto y los chunks de Maps
  const text = response.text || "";
  const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  // Extraemos solo los enlaces de mapas
  const mapsLinks = groundingChunks
    .filter((chunk: any) => chunk.maps)
    .map((chunk: any) => ({
      title: chunk.maps.title,
      uri: chunk.maps.uri
    }));

  return { text, mapsLinks };
};
