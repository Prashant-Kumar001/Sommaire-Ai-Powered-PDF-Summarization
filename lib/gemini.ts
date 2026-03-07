'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
    },
});

export const generateGeminiSummary = async (
    document: string,
): Promise<string> => {
    try {
        const objectPrompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: SUMMARY_SYSTEM_PROMPT },
                        {
                            text:
                                `Transform this document into an engaging, easy-to-read summary with ` +
                                `contextually relevant emojis and proper markdown formatting:\n\n${document}`,
                        },
                    ],
                },
            ],
        };


        // const prompt =
        //     `${SUMMARY_USER_PROMPT_2}\n\n` +
        //     `Transform this document into an engaging, easy-to-read summary with ` +
        //     `contextually relevant emojis and proper markdown formatting:\n\n${document}`;


        const result = await model.generateContent(objectPrompt);
        const response = result.response;



        if (!response.text()) {
            throw new Error("GEMINI_ERROR");
        }

        return response.text();

    } catch (error) {
        console.error("Gemini error", error);
        const err = error instanceof Error ? error : new Error("GEMINI_ERROR");

        if (err.message === "GEMINI_ERROR") {
            throw new Error("GEMINI_ERROR");
        }

        throw error;
    }
};
