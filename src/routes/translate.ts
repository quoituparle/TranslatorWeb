// this page is the router of translating function
import  { Request, Response, Router } from 'express';
import {TranslationView} from '../services/gemini.js'

const router = Router()

interface TranslateRequestParames { // body of Request
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    model?: string,
};

//POST route
router.post('/', async (req: Request<{},{},TranslateRequestParames>, res: Response) => {
    const { text, sourceLanguage, targetLanguage, model} = req.body // recieve frontend request. req.body is the body part of a http request.
    try {
        const translation = await TranslationView({ // using json form
            text,
            sourceLanguage,
            targetLanguage,
            model,
        });
        res.json({translation}) // Requests are sent here to the frontend.
    } catch (error) {
        console.log("Translation request failed", error);
        res.sendStatus(500)
    }
});

export default router