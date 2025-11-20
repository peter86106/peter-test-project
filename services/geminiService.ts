import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Restaurant, District, PriceLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const restaurantSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The name of the restaurant." },
    district: { type: Type.STRING, description: "The district in Kaohsiung where it is located." },
    cuisineType: { type: Type.STRING, description: "The type of food (e.g., Hot Pot, Street Food, Japanese)." },
    priceRange: { type: Type.STRING, description: "Price level symbols, e.g., $, $$, $$$." },
    rating: { type: Type.NUMBER, description: "Estimated rating out of 5." },
    description: { type: Type.STRING, description: "A short, fun 8-bit style description of the vibe." },
    address: { type: Type.STRING, description: "Approximate address or street name." },
    highlightDish: { type: Type.STRING, description: "One must-order dish." },
  },
  required: ["name", "district", "cuisineType", "priceRange", "rating", "description", "address", "highlightDish"],
};

export const fetchRandomRestaurant = async (district: string, priceLevel: PriceLevel): Promise<Restaurant> => {
  try {
    const districtPrompt = district === District.ALL ? "Kaohsiung City" : `${district}, Kaohsiung City`;
    
    let priceInstruction = "";
    switch (priceLevel) {
        case PriceLevel.CHEAP:
            priceInstruction = "Focus strictly on cheap eats, street food, night market stalls, or bento shops under 200 TWD.";
            break;
        case PriceLevel.MODERATE:
            priceInstruction = "Focus on mid-range restaurants, casual dining, or cafes (approx 200-800 TWD).";
            break;
        case PriceLevel.EXPENSIVE:
            priceInstruction = "Focus on high-end, fine dining, hotel buffets, or upscale restaurants (over 800 TWD).";
            break;
        default:
            priceInstruction = "Any price range is acceptable, from street food to fancy restaurants.";
            break;
    }

    const prompt = `
      You are a local foodie guide for Kaohsiung, Taiwan. 
      Recommend ONE random, highly-rated dinner spot in ${districtPrompt}.
      
      User Budget Preference: ${priceInstruction}
      
      It can be a night market stall, a local favorite, or a nice restaurant depending on the budget.
      Focus on places locals love.
      Provide the response in Traditional Chinese (Taiwan).
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: restaurantSchema,
        temperature: 1.2, // High temperature for more randomness
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Restaurant;
    }
    
    throw new Error("No data returned from Gemini");

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback mock data in case of API failure/quota limits to keep the UI working
    return {
      name: "API 連線失敗麵攤",
      district: "未知領域",
      cuisineType: "除錯料理",
      priceRange: "$$$$$",
      rating: 0.0,
      description: "通訊中斷，請檢查你的網路連線或 API 金鑰。",
      address: "404 錯誤大道",
      highlightDish: "重試按鈕",
    };
  }
};