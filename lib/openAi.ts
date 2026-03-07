'use server';

import OpenAI from "openai";
import { SUMMARY_USER_PROMPT_2 } from "./prompts";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const generateSummary = async (document: string): Promise<string> => {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: SUMMARY_USER_PROMPT_2,
                },
                {
                    role: "user",
                    content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${document}`,
                },
            ],
            temperature: 0.7,
            max_tokens: 1500,
        });

        const summary = response.choices?.[0]?.message?.content;

        if (!summary) {
            throw new Error("EMPTY_RESPONSE");
        }

        return summary;
    } catch (error: unknown) {
        console.error("OpenAI Error:", error);

        if (
            typeof error === "object" &&
            error !== null &&
            "status" in error &&
            (error as { status: number }).status === 429
        ) {
            throw new Error("RATE_LIMIT_EXCEEDED");
        }

        throw new Error("AI_SUMMARY_FAILED");
    }
};