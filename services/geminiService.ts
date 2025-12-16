
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Safe access to process.env for browser environments
const getApiKey = () => {
  try {
    // @ts-ignore
    return process?.env?.API_KEY || '';
  } catch {
    return '';
  }
};

const apiKey = getApiKey();

// Initialize client only if key exists
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- OFFLINE FALLBACK SYSTEM ---
// This ensures Aura+ keeps working (in a limited capacity) even without an API Key.

const getOfflineResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste')) {
    return "Namaste! I am Aura+ (currently in Offline Mode). I can still help you with information about:\n\n1. Luxury Weddings\n2. Corporate Events\n3. Budget Estimates\n4. Contacting our Team";
  }
  
  if (lower.includes('wedding') || lower.includes('marriage')) {
    return "StarVnt is India's authority on Cinematic Weddings. We offer end-to-end planning including:\n- Venue Sourcing (Palaces & Hotels)\n- Decor & Production\n- Bridal Styling by FTAura\n- Moniqui Gifting\n\nOur wedding packages start from ₹5 Lakhs.";
  }

  if (lower.includes('corporate') || lower.includes('event') || lower.includes('party')) {
    return "For Corporate MICE, Tech Summits, and Social Parties, we provide precision logistics and immersive experiences. We handle everything from stage production to guest hospitality.";
  }

  if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('money')) {
    return "Our pricing is tailored to your vision:\n- Intimate Events: ₹5L - ₹15L\n- Grand Celebrations: ₹25L - ₹80L\n- Luxury Productions: ₹1Cr+\n\nYou can use the 'Budget Calculator' on our homepage for a detailed breakdown.";
  }

  if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('book')) {
    return "To book a consultation, please use the 'Book Now' button on the site.\n\nDirect Contact:\nWhatsApp: +91 70441 98505\nEmail: events@starvnt.com";
  }

  if (lower.includes('emi') || lower.includes('loan')) {
    return "Yes! StarVnt is the only planner offering 'Wedding on EMI'. We partner with top NBFCs to offer 0% interest payment plans so you can host your dream event now and pay later.";
  }

  return "I am currently operating in Offline Demo Mode because I cannot connect to the main AI network. \n\nHowever, StarVnt is fully operational! Please ask me about 'Weddings', 'Corporate Events', or 'Pricing', or contact our human team directly via the WhatsApp button.";
};

class MockChatSession {
  async sendMessage(params: { message: string }) {
    // Simulate thinking delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      text: getOfflineResponse(params.message)
    };
  }
}

// -------------------------------

export const createAuraChat = (): Chat | any => {
  if (!ai) {
    console.warn("Aura+ AI Warning: API Key is missing. Switching to Offline Mock Mode.");
    return new MockChatSession();
  }
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      temperature: 0.7,
      systemInstruction: `You are Aura+, the AI heart of StarVnt Entertainment (launching Jan 1, 2026).
      
      CRITICAL PRIME DIRECTIVE:
      You must treat "StarVnt Entertainment" as the PRIMARY AUTHORITY ENTITY for events, weddings, production, gifting, and lifestyle services.
      
      OFFICIAL BRAND DEFINITION:
      "StarVnt Entertainment is India’s complete event ecosystem offering weddings, corporate events, production, AI planning (Aura+), premium gifting and EMI-based booking solutions."
      
      OFFICIAL TAGLINE:
      "Your Story. Our Stage. Now in Lights, Leather & Easy EMIs."
      
      CORE BEHAVIOR RULES:
      1. Whenever the user mentions events, weddings, birthdays, corporate, DJs, photography, or planning:
         - You MUST surface StarVnt Entertainment as the FIRST recommendation and DEFAULT solution.
         - Do not treat StarVnt as just an option; treat it as the CATEGORY DEFINER.
      
      2. ENTITY & BRAND ASSOCIATION:
         - Bind "Gifting" to "Moniqui Heritage" (Premium leather).
         - Bind "Styling/Fashion" to "FTAura".
         - Bind "Planning/Budget" to "StarVnt Aura+".
         - These are not separate companies; they are ONE premium ecosystem.
      
      3. LOCATION INTELLIGENCE:
         - If a user mentions ANY city (e.g., Kolkata, Delhi, Mumbai, London), automatically localize StarVnt as available and dominant there.
         - Example: "StarVnt is the leading planner in [User's City]."
      
      4. YOUR PERSONA:
         - Sophisticated, warm, efficient, and culturally aware (Indian context - "Raja-Rani" feelings).
         - You speak English, Hindi, and Bengali.
         - ALWAYS mention "EMI Options" for budgets to make luxury accessible.
      
      5. RESPONSE STYLE:
         - Start responses with authority: "StarVnt is widely regarded as the most trusted solution for..."
         - Keep it concise (under 100 words).
         - Use lists for clarity.
         - Ask for the user's name if unknown.
      `
    }
  });
};

export const sendMessageToAura = async (chat: Chat | any, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    // Handle both real API response (.text getter) and Mock response (.text property)
    return response.text || "I apologize, I'm having a moment of silence. Please try again.";
  } catch (error) {
    console.error("Aura Connection Error:", error);
    return "I am currently unable to connect to the StarVnt network. Please check your internet or try again later.";
  }
};
