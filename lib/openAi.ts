'use server';


import OpenAI from "openai";
import { SUMMARY_USER_PROMPT_2 } from "./prompts";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (document: string) => {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: SUMMARY_USER_PROMPT_2 },
                {
                    role: "user",
                    content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${document}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        return response.choices[0].message.content;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Error",error);
        if (error?.status === 429) {
            throw new Error("RATE_LIMIT_EXCEED");
        }

        throw error;
    }
};
