import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();
const port = 8000;
const openAiSecretKey = process.env.OPENAI_API_KEY;

const app = express();
const openai = new OpenAI({
    apiKey: openAiSecretKey
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function chatGPTConversation(req: Request, res: Response, next: NextFunction) {
    const prompt = req.query.prompt as string;

    const chatStream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {'role': 'user', 'content': prompt}
        ],
        stream: true
    });

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);

    for await (const chunk of chatStream){
        res.write(`data: ${chunk.choices[0]?.delta?.content}\n\n`);
        await sleep(20);
    }

    res.end();
}

app.get("/chatgpt", chatGPTConversation);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
