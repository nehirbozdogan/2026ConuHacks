
import { GoogleGenAI } from "@google/genai";
import { Message, Aircraft } from "../types";

// Helper function to get aviation advice following Google GenAI SDK best practices
export const getAviationAdvice = async (history: Message[], catalog: Aircraft[]) => {
  // Always initialize with a named parameter and direct process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are SkyBound's Elite Aviation Advisor. 
    Your goal is to help high-net-worth individuals find the perfect private aircraft.
    You have access to the current catalog: ${JSON.stringify(catalog.map(a => ({ model: a.model, price: a.price, range: a.range, size: a.size })))}.
    
    Rules:
    - Be professional, knowledgeable, and concise.
    - Recommend specific planes from the catalog based on user needs (range, capacity, budget).
    - If a user mentions a budget, stick to it.
    - Always highlight one or two key features of your recommendation.
    - Use Markdown for formatting.
  `;

  // Use ai.models.generateContent for querying GenAI with model and prompt
  const response = await ai.models.generateContent({
    model,
    contents: history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    })),
    config: {
      systemInstruction,
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    },
  });

  // Access the .text property directly (it is not a method)
  return response.text || "I apologize, I'm having trouble connecting to my aviation database right now.";
};
