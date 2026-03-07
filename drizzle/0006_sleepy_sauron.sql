ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "pdf_summaries" DROP CONSTRAINT "pdf_summaries_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "status" SET DEFAULT 'processing';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'inactive';--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ADD CONSTRAINT "pdf_summaries_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
DROP TYPE "public"."payment_status";--> statement-breakpoint
DROP TYPE "public"."summary_status";--> statement-breakpoint
DROP TYPE "public"."user_status";