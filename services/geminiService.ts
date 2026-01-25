
import { GoogleGenAI, Type } from "@google/genai";
import { Message, Aircraft, IntakeFormData, IntakeRecommendation } from "../types";

export const getAviationAdvice = async (history: Message[], catalog: Aircraft[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are SkyBound's Elite Aviation Advisor. 
    Your goal is to help high-net-worth individuals find the perfect private aircraft.
    You have access to the current catalog: ${JSON.stringify(catalog.map(a => ({ model: a.model, price: a.price, range: a.range, size: a.size, opCost: a.operatingCostPerHour, capacity: a.capacity })))}.
    
    Rules:
    - Be professional, knowledgeable, and concise.
    - Recommend specific planes from the catalog based on user needs.
    - Factor in operational costs based on hourly data provided in the catalog.
    - Factor in passenger capacity based on specific class constraints:
      * Light Jet: 4–7 seats
      * Midsize Jet: 6–9 seats
      * Super-Midsize Jet: 8–10 seats
      * Large Cabin Jet: 10–14 seats
    - If a user asks for seat counts exceeding these realistic class limits (e.g., 12 seats in a Light Jet), explain the mismatch and suggest a larger class.
    - Use Markdown for formatting.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: history.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    })),
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });

  return response.text || "I apologize, I'm having trouble connecting to my aviation database.";
};

export const analyzeIntake = async (formData: IntakeFormData): Promise<IntakeRecommendation> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-pro-preview';

  const systemInstruction = `
    You are an expert aviation acquisition broker. Your task is to recommend aircraft that match the buyer’s mission, budget, and operational cost expectations. 

    Seat Count and Class Logic (MUST FOLLOW):
    - Light Jet (1,200–2,000 nm): 4–7 seats.
    - Midsize Jet (2,000–3,000 nm): 6–9 seats.
    - Super-Midsize Jet (3,000–4,000+ nm): 8–10 seats.
    - Large Cabin Jet (4,000–6,000+ nm): 10–14 seats.
    
    CRITICAL MISMATCH LOGIC:
    - If the buyer’s seat request does not match their preferred class (e.g., requesting 12 seats for a Super-Midsize which typically supports 8-10), you MUST explain the mismatch in the "red_flags" section.
    - Recommend the closest realistic options, likely suggesting they move up one class or compromise on seating.

    Strict Operational Cost Interpretation:
    - LOW = Cheap to operate. Avoid high fuel burn, expensive maintenance, large crews.
    - MEDIUM = Balanced. Moderate fuel burn, standard maintenance.
    - HIGH = Premium. Large cabin/Ultra-long-range jets, high burn, larger crews acceptable.

    Produce a structured JSON recommendation following the specified schema.
  `;

  const buyerProfile = {
    acquisition_budget: formData.budget,
    preferred_class: formData.aircraftClass,
    requested_seats: formData.numSeats,
    required_range: `${formData.requiredRange} nm`,
    operational_cost_expectation: formData.operationalCostExpectation
  };

  const prompt = `BUYER MISSION PROFILE:
  ${JSON.stringify(buyerProfile, null, 2)}

  ADDITIONAL MISSION DETAILS:
  - TYPICAL ROUTES: ${formData.routes}
  - MISSION FREQUENCY: ${formData.flightFrequency}
  - ENVIRONMENT: ${formData.operationalEnvironment}
  - CARGO/STORAGE: ${formData.storageNeeds}
  - TECH/CONNECTIVITY: ${formData.techLevel}
  - DESIRED TIMELINE: ${formData.timeline}
  - BROKER NOTES: ${formData.additionalNotes}
  `;

  const response = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          buyer_summary: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                aircraft: { type: Type.STRING },
                why_it_fits: { type: Type.STRING },
                specs: { type: Type.STRING },
                estimated_price: { type: Type.STRING },
                operating_cost_per_hour: { type: Type.STRING },
                maintenance_program: { type: Type.STRING },
                crew_requirements: { type: Type.STRING },
                strengths: { type: Type.STRING },
                weaknesses: { type: Type.STRING }
              },
              required: ["aircraft", "why_it_fits", "specs", "estimated_price", "operating_cost_per_hour", "maintenance_program", "crew_requirements", "strengths", "weaknesses"]
            }
          },
          cost_analysis: { type: Type.STRING },
          red_flags: { type: Type.STRING },
          broker_summary: { type: Type.STRING }
        },
        required: ["buyer_summary", "recommendations", "cost_analysis", "red_flags", "broker_summary"]
      }
    },
  });

  try {
    const jsonStr = response.text || "{}";
    return JSON.parse(jsonStr.trim());
  } catch (e) {
    throw new Error("Failed to parse broker recommendation.");
  }
};
