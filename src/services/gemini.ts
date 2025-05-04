import { GoogleGenAI } from "@google/genai";

const apiKey = ""

const ai = new GoogleGenAI({ apiKey: apiKey });

interface TranslationParames {
  text: string,
  sourceLanguage: string,
  targetLanguage: string,
  model?: string,
};

interface PolishParames {
  text: string,
  style: string,
  model?: string,
};

/* switch to tun mode when using node.js to fetch gemini api.  */

export async function TranslationView({ // function to translate text
  text,
  sourceLanguage,
  targetLanguage,
  model = 'gemini-2.0-flash',
}: TranslationParames): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: [{text: text}], // make sure contents is an array.
      config: {
        systemInstruction: `Translate directly the following text from ${sourceLanguage} to ${targetLanguage}, do not use markdown`
      },
    });
    const translated_text = response.text
    if (! translated_text) {
      console.error('response failed')
      throw new Error('Internet Error, try again later')
    } else {
      console.log('response success')
      return translated_text
    }
  } catch (error: any) {
    console.log("Error during API call", error);
    throw new Error("Failed to translate text")
  }
};

export async function PolishView({
  text,
  style,
  model = 'gemini-2.0-flash'
}:PolishParames): Promise<string> {
  try {
    const response = await ai.models.generateContent({ // function to polish text
      model: model,
      contents: [{text: text}], // make sure contents is an array.
      config: {
        systemInstruction: `improve directly the text like ${style}, do not use markdown in text`
      },
    });
    const translated_text = response.text
    if (! translated_text) {
      console.error('response failed')
      throw new Error('Internet Error, try again later')
    } else {
      console.log('response success')
      return translated_text
    }
  } catch (error: any) {
    console.error("Error during API call", error);
    throw new Error("Failed to polish text")
  }
};
