import { GoogleGenAI } from "@google/genai";
import { error } from "console";


const apiKey = "AIzaSyCpTHWOd3Tm9HbkujSSU2cO4ZyePXGbNAA"

const ai = new GoogleGenAI({ apiKey: apiKey });

try {
  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: "Explain how AI works in a few words",
    });
    if (!response) {
      console.error("unable to get response", error)
    } else {
      console.log(response.text)
    }
  }
  
  await main();
} catch (error) {
  console.error("Failed to fetch api key", error)
}

