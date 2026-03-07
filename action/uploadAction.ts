"use server";



import { fetchAndExtractPdfText } from "@/lib/langChain";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { pdfSummaries } from "@/db/schema";
import { ensureUserExists } from "@/db/users";
import { revalidatePath } from "next/cache";




interface ExtractPdfInput {
    fileUrl: string;
}

interface StorePdfSummaryInput {
    pdfSummary: string;
    fileUrl: string;
    title?: string;
    fileName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ActionResponse<T = any> {
    success: boolean;
    message: string;
    data?: T | null;
}




export async function extractPdfText(
    input: ExtractPdfInput
): Promise<ActionResponse<string>> {

    try {

        if (!input?.fileUrl) {
            throw new Error("File URL is required");
        }

        console.log("Extracting PDF from:", input.fileUrl);

        const extractedText = await fetchAndExtractPdfText({
            fileUrl: input.fileUrl,
        });

        if (!extractedText) {
            throw new Error("No text extracted from PDF");
        }

        const title = input.fileUrl.split("/").pop() || "Untitled";
        console.log("title ", title)

        return {
            success: true,
            message: "PDF text extracted successfully",
            data: extractedText,
        };

    } catch (error) {

        console.error("PDF EXTRACTION ERROR:", error);
        const err = error as Error;
        return {
            success: false,
            message: err?.message || "Failed to extract PDF text",
            data: null,
        };
    }
}



async function savePDFSummaryToDB({
    pdfSummary,
    fileUrl,
    title,
    fileName,
}: StorePdfSummaryInput) {

    try {

        const { userId } = await auth();
        await ensureUserExists(userId);

        if (!userId) {
            throw new Error("User not authenticated");
        }

        if (!pdfSummary) {
            throw new Error("PDF summary is empty");
        }

        if (!fileUrl) {
            throw new Error("File URL is missing");
        }


        const result = await db
            .insert(pdfSummaries)
            .values({
                userId: userId,
                originalFileUrl: fileUrl,
                summaryText: pdfSummary,
                title: title || null,
                fileName: fileName || null,
                status: "completed",
            })
            .returning();


        if (!result || result.length === 0) {
            throw new Error("Database insert failed");
        }


        return result[0];

    } catch (error) {

        console.error("DATABASE SAVE ERROR:", error);
        const err = error as Error;
        throw new Error(
            err?.message || "Failed to save PDF summary"
        );
    }
}





export async function storePDFSummary(
    input: StorePdfSummaryInput
): Promise<ActionResponse> {

    try {

        const savedSummary = await savePDFSummaryToDB(input);

        revalidatePath(`/summary/${savedSummary.id}`);

        return {
            success: true,
            message: "PDF summary stored successfully",
            data: savedSummary,
        };

    } catch (error) {

        console.error("STORE SUMMARY ERROR:", error);
        const err = error as Error;

        return {
            success: false,
            message: err?.message || "Failed to store PDF summary",
            data: null,
        };
    }
}
