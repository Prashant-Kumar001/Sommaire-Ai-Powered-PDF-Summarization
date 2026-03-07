CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed');--> statement-breakpoint
CREATE TYPE "public"."summary_status" AS ENUM('processing', 'completed', 'failed');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('active', 'inactive');--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "pdf_summaries" DROP CONSTRAINT "pdf_summaries_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DATA TYPE "public"."payment_status" USING "status"::"public"."payment_status";--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "status" SET DEFAULT 'processing'::"public"."summary_status";--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "status" SET DATA TYPE "public"."summary_status" USING "status"::"public"."summary_status";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'inactive'::"public"."user_status";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DATA TYPE "public"."user_status" USING "status"::"public"."user_status";--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ADD CONSTRAINT "pdf_summaries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;