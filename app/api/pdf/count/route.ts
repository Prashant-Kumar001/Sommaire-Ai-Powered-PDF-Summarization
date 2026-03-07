
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { pdfSummaries } from "@/db/schema";

export async function GET() {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ count: 0 });
    }

    const result = await db
        .select()
        .from(pdfSummaries)
        .where(eq(pdfSummaries.userId, user.id));

    return NextResponse.json({
        count: result.length,
    });
}