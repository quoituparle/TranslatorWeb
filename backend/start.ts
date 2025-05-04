import { GoogleGenAI } from "@google/genai";

const apiKey = "AIzaSyCpTHWOd3Tm9HbkujSSU2cO4ZyePXGbNAA"

const ai = new GoogleGenAI({ apiKey: apiKey });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

await main();