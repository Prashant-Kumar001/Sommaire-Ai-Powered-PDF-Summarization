"use server";

import db from "@/lib/db";
import { pdfSummaries } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Summary } from "@/components/dashboard/Summary-card";
import { auth } from "@clerk/nextjs/server";

interface ActionResponse {
    limit: number;
    success: boolean;
    message: string;
    data?: Summary[];
    length?: number;
}
export async function getPdfSummaries(userId: string): Promise<ActionResponse> {
    try {
        if (!userId) {
            throw new Error("User not authenticated");
        }

        let LIMIT = 5 as number;

        const { has } = await auth();
        const plan = has({
            plan: "pro",
        });

        if (plan) {
            LIMIT = Infinity
        }



        const summaries = await db
            .select()
            .from(pdfSummaries)
            .where(eq(pdfSummaries.userId, userId))
            .orderBy(desc(pdfSummaries.createdAt));

        return {
            limit: LIMIT,
            success: true,
            message: "Summaries fetched successfully",
            data: summaries,
            length: summaries.length,
        };
    } catch (error) {
        console.error("Error fetching summaries:", error);

        return {
            limit: 0,
            message: "Failed to fetch summaries",
            success: false,
            data: [],
        };
    }
}
