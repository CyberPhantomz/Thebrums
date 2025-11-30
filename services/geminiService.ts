import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { WasteAnalysis } from "../types";

// Access the API key using Vite's environment variable standard
const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("API Key is missing. Please ensure VITE_API_KEY or GEMINI_API_KEY is set in your .env file.");
}

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(apiKey || "");

const analysisSchema = {
  type: SchemaType.OBJECT,
  properties: {
    itemName: {
      type: SchemaType.STRING,
      description: "A short, concise name of the identified object.",
    },
    category: {
      type: SchemaType.STRING,
      enum: ["Recyclable", "Compost", "Trash", "Hazardous", "E-Waste", "Unknown"],
      description: "The primary waste category of the item.",
    },
    isRecyclable: {
      type: SchemaType.BOOLEAN,
      description: "True if the item is generally recyclable in municipal programs.",
    },
    disposalAdvice: {
      type: SchemaType.STRING,
      description: "Brief, actionable advice on how to prepare and dispose of the item (e.g., 'Rinse before binning').",
    },
    confidenceScore: {
      type: SchemaType.NUMBER,
      description: "A number between 0 and 100 indicating confidence in the identification.",
    },
  },
  required: ["itemName", "category", "isRecyclable", "disposalAdvice", "confidenceScore"],
} as any;

export const analyzeImage = async (base64Image: string): Promise<WasteAnalysis> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your .env.local file for VITE_API_KEY or GEMINI_API_KEY.");
  }

  try {
    // Remove the data URL prefix if present to get raw base64
    const base64Data = base64Image.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, "");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const prompt = "Analyze this image and determine if it is waste, recycling, compost, or something else. Identify the object and provide disposal instructions.";

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const analysisResult = JSON.parse(text) as WasteAnalysis;
    return analysisResult;

  } catch (error: any) {
    console.error("Gemini Analysis Error:", error);
    const errorMessage = error?.message || "Unknown error";
    throw new Error(`Analysis failed: ${errorMessage}`);
  }
};