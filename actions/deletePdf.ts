"use server";

import db from "@/lib/db";
import { pdfSummaries } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function deletePdf(id: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const pdf = await db.query.pdfSummaries.findFirst({
      where: and(eq(pdfSummaries.id, id), eq(pdfSummaries.userId, userId)),
    });

    if (!pdf) {
      throw new Error("PDF not found");
    }

    await db.delete(pdfSummaries).where(eq(pdfSummaries.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete PDF",
    };
  }
}
