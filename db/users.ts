"use server";

import db from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import {  clerkClient } from "@clerk/nextjs/server";

export async function ensureUserExists(userId: string | null) {

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const existingUser = await db.query.users.findFirst({
        where: eq(users.clerkUserId, userId),
    });

    if (existingUser) {
        return existingUser;
    }

    const clerk = await clerkClient();
    const clerkUser = await clerk.users.getUser(userId);

    const newUser = await db.insert(users)
        .values({
            clerkUserId: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress || "",
            fullName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`,
            status: "active",
        })
        .returning();

    return newUser[0];
}
