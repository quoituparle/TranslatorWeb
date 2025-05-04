// this file is used for backend setup 
import express from 'express';
import cors from 'cors'
import translateRouter from '../src/routes/translate.js'
import polishRouter from '../src/routes/polish.js'

// write middleware
const app = express();
const port = 3100;

/* write middleware to set origin url and handle json request */
app.use(cors({
    origin: 'http://localhost:3000' // this means the url which is permitted to visit backend data. port 3000 is the frontend url
}));
app.use(express.json()) // use for handle json request and response, important for sending json information to req.body in routes. 
// express.json Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option. 
// This parser accepts any Unicode encoding of the body and supports automatic inflation of gzip and deflate encodings.
//A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body), 
// or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.

/* Routes for functions */
app.use('/api/translate/', translateRouter);
app.use('/api/polish/', polishRouter);
// we have created a Router() in routes folder. so no more need for creating another express.Router(). same function of urlpatterns in django

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});

// listen port can paradoxally definite the backend url