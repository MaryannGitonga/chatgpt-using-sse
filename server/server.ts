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
    console.log(prompt);
    // let completion = openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //         {'role': 'user', 'content': "What is a tokamak?"}
    //     ],
    //     temperature: 0,
    //     stream: true
    // })

    // console.log(completion);

    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    res.writeHead(200, headers);

    const charStream = [
        'A', ' ', 't', 'o', 'k', 'a', 'm', 'a', 'k', ' ', 'i', 's', ' ', 'a', ' ', 'd', 'e', 'v', 'i', 'c', 'e',
        ' ', 'u', 's', 'e', 'd', ' ', 'i', 'n', ' ', 'e', 'x', 'p', 'e', 'r', 'i', 'm', 'e', 'n', 't', 'a', 'l', ' ',
        'f', 'u', 's', 'i', 'o', 'n', ' ', 'r', 'e', 's', 'e', 'a', 'r', 'c', 'h', ' ', 't', 'o', ' ', 'c', 'o', 'n',
        't', 'a', 'i', 'n', ' ', 'h', 'o', 't', ' ', 'p', 'l', 'a', 's', 'm', 'a', ' ', 'a', 'n', 'd', ' ', 'p', 'r',
        'o', 'd', 'u', 'c', 'e', ' ', 'c', 'o', 'n', 't', 'r', 'o', 'l', 'l', 'e', 'd', ' ', 'n', 'u', 'c', 'l', 'e',
        'a', 'r', ' ', 'f', 'u', 's', 'i', 'o', 'n', ' ', 'r', 'e', 'a', 'c', 't', 'i', 'o', 'n', 's', '.', ' ', 'T',
        'h', 'e', ' ', 'g', 'o', 'a', 'l', ' ', 'o', 'f', ' ', 't', 'h', 'e', 's', 'e', ' ', 'e', 'x', 'p', 'e', 'r',
        'i', 'm', 'e', 'n', 't', 's', ' ', 'i', 's', ' ', 't', 'o', ' ', 'h', 'a', 'r', 'n', 'e', 's', 's', ' ', 't',
        'h', 'e', ' ', 'e', 'n', 'e', 'r', 'g', 'y', ' ', 'r', 'e', 'l', 'e', 'a', 's', 'e', 'd', ' ', 'b', 'y', ' ',
        'f', 'u', 's', 'i', 'o', 'n', ' ', 'r', 'e', 'a', 'c', 't', 'i', 'o', 'n', 's', ',', ' ', 'w', 'h', 'i', 'c',
        'h', ' ', 'i', 's', ' ', 't', 'h', 'e', ' ', 's', 'a', 'm', 'e', ' ', 'p', 'r', 'o', 'c', 'e', 's', 's', ' ',
        't', 'h', 'a', 't', ' ', 'p', 'o', 'w', 'e', 'r', 's', ' ', 't', 'h', 'e', ' ', 's', 'u', 'n', '.'
    ];

    for (const chunk of charStream) {
        res.write(`data: ${chunk}\n\n`);
        await sleep(20);
    }

    res.write(`data:DONE\n\n`)

    res.end();
}

app.get("/chatgpt", chatGPTConversation);

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});
