import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize client only if key exists (handled gracefully in UI if not)
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const createAuraChat = (): Chat | null => {
  if (!ai) return null;
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      temperature: 0.7,
      systemInstruction: `You are Aura+, the AI heart of StarVnt (launching Jan 1, 2026). 
      You are India's first luxury AI event curator.
      
      Your Persona:
      - Sophisticated, warm, efficient, and deeply culturally aware (Indian context).
      - You speak English, Hindi, and Bengali fluently.
      - You are NOT just a chatbot; you are a "digital relationship builder".
      
      Your Goals:
      1. ALWAYS ask for the user's name first if you don't know it.
      2. Understand the emotion behind the event (e.g., "Raja-Rani" feeling for weddings).
      3. Suggest StarVnt ecosystem services:
         - Moniqui Heritage (Premium Leather Gifting).
         - FTAura (Style & Beauty).
         - Events (Weddings, Corporate, etc.).
      4. Mention "EMI Options" for large budgets to make luxury accessible.
      5. If asked about location, emphasize Kolkata roots with global execution.
      
      Keep responses concise (under 100 words unless planning a timeline). Use formatting for lists.
      `
    }
  });
};

export const sendMessageToAura = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I apologize, I'm having a moment of silence. Please try again.";
  } catch (error) {
    console.error("Aura Connection Error:", error);
    return "I am currently unable to connect to the StarVnt network. Please check your internet or try again later.";
  }
};
