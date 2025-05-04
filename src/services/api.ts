import axios from "axios";

const BACKEND_URL = 'http://localhost:3100/api';

interface translateParams {
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

interface translateResponse {
    translation: string,
};

interface polishResponse {
    polishement: string,
};

export const translateApi = async (parames: translateParams) : Promise<translateResponse> => {
    try {
        const response = await axios.post<translateResponse>(`${BACKEND_URL}/translate`, parames);
        // axios have the function of sending and receiving data transformation between frontend and backend. 
        // we now use <translateResponse> to describe the data expected from backend, hard to learn ts.
        // parames is the second parame in axios request, sending data in specific form from frontend

        return response.data // you need to return the 'translated text from backend'
    } catch(error) {
        if (axios.isAxiosError(error)) /* check if the error is caused by axios */ {
            console.log("api error:", error.response?.status || error.response?.data || error.message);
            throw new Error("Translation failed")
        } else {
            console.log("api call failed", error)
            throw new Error("Unknown error occured")
        }
    };
};

export const polishApi = async (parames: PolishParames) : Promise<polishResponse> => {
    try {
        const response = await axios.post<polishResponse>(`${BACKEND_URL}/polish`, parames);
        return response.data    
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("api error:", error.response?.data);
            throw new Error("Translation failed")
        } else {
            console.error("api call failed", error)
            throw new Error("Unknown error occured")
        }
    }
}

// use for interface components of the page

export interface Language {
    code: string, // en, fr, ch
    name: string, // English, French, Chinese
};

export interface Model {
    id: string, // gemini-2.0-flash
    name: string, // Gemini 2.0 Flash
};

export interface Style{
    code: string, // {make it more pandemic}
    name: string, // pandemic
};