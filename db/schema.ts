import {
    pgTable,
    uuid,
    text,
    timestamp,
    index,
} from "drizzle-orm/pg-core";

export const users = pgTable(
    "users",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        clerkUserId: text("clerk_user_id").notNull().unique(),

        email: text("email").notNull().unique(),

        fullName: text("full_name"),

        stripeCustomerId: text("stripe_customer_id").unique(),

        stripePriceId: text("stripe_price_id"),

        status: text("status").default("inactive"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        }).defaultNow(),

        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        }).defaultNow(),
    },
    (table) => ({
        clerkUserIdIdx: index("users_clerk_user_id_idx").on(
            table.clerkUserId
        ),
    })
);




export const pdfSummaries = pgTable(
    "pdf_summaries",
    {
        id: uuid("id").defaultRandom().primaryKey(),

        userId: text("user_id")
            .notNull()
            .references(() => users.clerkUserId, {
                onDelete: "cascade",
                onUpdate: "cascade",
            }),

        originalFileUrl: text("original_file_url").notNull(),

        summaryText: text("summary_text").notNull(),

        title: text("title"),

        fileName: text("file_name"),

        status: text("status").default("processing"),

        createdAt: timestamp("created_at", {
            withTimezone: true,
        }).defaultNow(),

        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        }).defaultNow(),
    },
    (table) => ({
        userIdIdx: index("pdf_summaries_user_id_idx").on(
            table.userId
        ),
    })
);


