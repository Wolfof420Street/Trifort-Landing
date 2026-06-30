CREATE TABLE "rate_limits" (
	"ip_address" varchar(45) NOT NULL,
	"action" varchar(50) NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"locked_until" timestamp with time zone,
	"last_attempt_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "rate_limits_ip_address_action_pk" PRIMARY KEY("ip_address","action")
);
