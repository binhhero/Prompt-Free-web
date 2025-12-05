import { GoogleGenAI } from "@google/genai";
import { GenerationResult } from "../types";

// Initialize Gemini Client
// WARNING: In a real production app, never expose API keys on the client side.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateText = async (prompt: string): Promise<GenerationResult> => {
  if (!apiKey) return { error: "API Key chưa được cấu hình." };
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return { text: response.text };
  } catch (error: any) {
    console.error("Gemini Text Error:", error);
    return { error: error.message || "Đã xảy ra lỗi khi tạo nội dung." };
  }
};

export const enhancePrompt = async (simplePrompt: string): Promise<GenerationResult> => {
  if (!apiKey) return { error: "API Key chưa được cấu hình." };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: simplePrompt,
      config: {
        systemInstruction: "You are an expert Prompt Engineer for generative AI models like Midjourney, Stable Diffusion, and DALL-E 3. Your task is to take a simple concept or short description and expand it into a highly detailed, professional image generation prompt. Include details about lighting, camera angle, art style (e.g., cyberpunk, oil painting, photorealistic), render engine (e.g., Unreal Engine 5, Octane Render), and resolution (e.g., 8k, 4k). Output ONLY the enhanced prompt text, no explanations.",
      }
    });
    return { text: response.text };
  } catch (error: any) {
    console.error("Gemini Enhance Error:", error);
    return { error: error.message || "Đã xảy ra lỗi khi tối ưu prompt." };
  }
};

export const generateImage = async (prompt: string): Promise<GenerationResult> => {
  if (!apiKey) return { error: "API Key chưa được cấu hình." };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        // Nano banana models do not support responseMimeType. 
        // We rely on extracting inlineData.
      }
    });

    let imageUrl = '';
    
    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
       for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            imageUrl = `data:image/png;base64,${base64EncodeString}`;
            break; 
          }
       }
    }

    if (imageUrl) {
      return { imageUrl };
    } else {
        return { error: "Không tìm thấy hình ảnh trong phản hồi của AI." };
    }

  } catch (error: any) {
    console.error("Gemini Image Error:", error);
    return { error: error.message || "Đã xảy ra lỗi khi tạo hình ảnh." };
  }
};