import { GoogleGenAI } from '@google/genai';

const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: VITE_GEMINI_API_KEY });

export async function getGeminiResponse(prompt) {
  try {
    const response = await ai.models.generateContent({ 
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    const text = response.text;
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}