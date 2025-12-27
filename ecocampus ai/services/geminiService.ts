
import { GoogleGenAI } from "@google/genai";
import { WASTE_DATA, ENERGY_DATA } from "../constants";

export const getGeminiResponse = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const context = `
      You are the EcoCampus AI Sustainability Assistant.
      You have access to current campus data:
      - Waste Data: ${JSON.stringify(WASTE_DATA.slice(-7))}
      - Energy Data: ${JSON.stringify(ENERGY_DATA.slice(-7))}
      
      Your goal is to help university students and administrative staff optimize sustainability.
      Be concise, actionable, and friendly. Use data from the provided arrays when possible.
      
      Structure your response with bullet points if providing multiple tips.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: context,
        temperature: 0.7,
        thinkingConfig: { thinkingBudget: 1000 },
      },
    });

    return response.text || "I'm sorry, I couldn't process that request at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Eco Assistant is having trouble reaching the brain center. Please try again in a moment.";
  }
};

export const analyzeWasteImage = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/jpeg' } },
          { text: "Identify this waste item. Which bin does it go in: DRY, WET, or RECYCLABLE? Give a very brief reason. Format: BIN: [Bin Type]. Reason: [Reason]." }
        ]
      },
      config: {
        temperature: 0.4
      }
    });
    
    return response.text || "Could not identify item.";
  } catch (error) {
    console.error("Vision API Error:", error);
    return "Error analyzing image. Please try again.";
  }
};

export const getProactiveInsight = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const dataSummary = `Energy: ${JSON.stringify(ENERGY_DATA)}, Waste: ${JSON.stringify(WASTE_DATA)}`;
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this campus data and provide one "Proactive Insight" and one "Action of the Day". Keep it professional and inspiring. Data: ${dataSummary}`,
        config: {
          thinkingConfig: { thinkingBudget: 2000 }
        }
      });
      return response.text;
    } catch (e) {
      return "Focus on reducing lighting in the Academic block today!";
    }
};
