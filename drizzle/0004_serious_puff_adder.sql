ALTER TABLE "payments" DROP CONSTRAINT "payments_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "pdf_summaries" DROP CONSTRAINT "pdf_summaries_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "pdf_summaries" ALTER COLUMN "status" SET DEFAULT 'processing';--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pdf_summaries" ADD CONSTRAINT "pdf_summaries_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("clerk_user_id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX "payments_user_id_idx" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pdf_summaries_user_id_idx" ON "pdf_summaries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "users_clerk_user_id_idx" ON "users" USING btree ("clerk_user_id");