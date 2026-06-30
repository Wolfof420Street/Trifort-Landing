
CREATE INDEX "idx_analytics_event_created" ON "analytics_events" USING btree ("event_type","created_at");--> statement-breakpoint
CREATE INDEX "idx_contacts_status" ON "contacts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_quotes_status" ON "quotes" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_reviews_status" ON "reviews" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_subcontractors_status" ON "subcontractors" USING btree ("status");