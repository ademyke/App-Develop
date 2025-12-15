import { GoogleGenAI, Type } from "@google/genai";
import { CardContent } from "../types";

// Initialize Gemini Client
// CRITICAL: process.env.API_KEY is handled by the build system/environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHolidayText = async (mood: string): Promise<CardContent> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a peaceful, philosophical, and reflective Christmas/Holiday quote and a short social media caption based on the mood: "${mood}". 
      The tone should be mature, calm, and heartwarming. Avoid cliché jolly phrasing. Focus on peace, silence, love, and time.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: {
              type: Type.STRING,
              description: "A profound 1-2 sentence quote about the holiday season.",
            },
            caption: {
              type: Type.STRING,
              description: "A short, modern social media caption (max 20 words).",
            },
          },
          required: ["quote", "caption"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned from Gemini");
    
    return JSON.parse(text) as CardContent;
  } catch (error) {
    console.error("Text generation error:", error);
    throw new Error("Failed to generate holiday thoughts. Please try again.");
  }
};

export const generateHolidayImage = async (mood: string): Promise<string> => {
  try {
    const prompt = `A cinematic, peaceful, high-quality Christmas photography shot. 
    Theme: ${mood}. 
    Style: Warm lighting, cozy atmosphere, photorealistic, deep depth of field, minimalist, elegant, holiday aesthetic. 
    No text, no watermarks.`;

    // Using gemini-2.5-flash-image for speed and efficiency as requested
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { text: prompt }
        ]
      }
    });

    // Extract image
    // The response for image generation in generateContent usually comes in inlineData within parts
    // We need to iterate to find it.
    let base64Image = "";
    
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (!base64Image) {
      throw new Error("No image data found in response");
    }

    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Image generation error:", error);
    throw new Error("Failed to conjure an image. Please try again.");
  }
};
