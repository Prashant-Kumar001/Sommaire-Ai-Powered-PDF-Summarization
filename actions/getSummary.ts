import db from "@/lib/db";
import { pdfSummaries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSummaryById(id: string) {
    try {
        const pdf = await db.query.pdfSummaries.findFirst({
            where: eq(pdfSummaries.id, id),
        });

        return pdf;
    } catch (error) {
        console.error("Error fetching PDF by ID:", error);
        return null;
    }
}
