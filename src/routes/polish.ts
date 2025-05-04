// this page is the router of Polish function
import { Request, Response, Router } from 'express';
import {PolishView} from '../services/gemini.js'

const router = Router()

interface PolishRequestParames { // body of Request
    text: string,
    style: string,
    model?: string,
};

//POST route
router.post('/', async (req: Request<{},{},PolishRequestParames>, res: Response) => {
    const { text, style, model} = req.body // recieve frontend request. req.body is the body part of a http request.
    try {
        const polishment = await PolishView({ // using json form
            text,
            style,
            model,
        });
        res.json({polishment}) // Requests are sent here to the frontend.
    } catch (error) {
        console.log("Polish request failed", error);
        res.sendStatus(500)
    }
});

export default router