import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  date,
  pgEnum,
  check,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const projectStatusEnum = pgEnum("project_status", ["ongoing", "completed", "upcoming"]);
export const contactStatusEnum = pgEnum("contact_status", ["new", "read", "replied"]);
export const quoteStatusEnum = pgEnum("quote_status", ["new", "reviewed", "contacted"]);
export const subcontractorStatusEnum = pgEnum("subcontractor_status", ["pending", "approved", "rejected"]);
export const reviewStatusEnum = pgEnum("review_status", ["pending", "published", "rejected"]);

// Users
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("admin"),
  passwordResetToken: varchar("password_reset_token", { length: 255 }),
  passwordResetExpires: timestamp("password_reset_expires", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Refresh Tokens (for explicit revocation)
export const refreshTokens = pgTable("refresh_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// Rate Limits (Postgres-backed rate limiting)
export const rateLimits = pgTable(
  "rate_limits",
  {
    ipAddress: varchar("ip_address", { length: 45 }).notNull(),
    action: varchar("action", { length: 50 }).notNull(),
    attempts: integer("attempts").default(0).notNull(),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    lastAttemptAt: timestamp("last_attempt_at", { withTimezone: true }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.ipAddress, table.action] }),
    };
  }
);

// Projects
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  location: text("location"),
  status: projectStatusEnum("status").default("ongoing").notNull(),
  completionDate: date("completion_date"),
  videoUrl: text("video_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  categoryIdx: index("idx_projects_category").on(table.category),
  statusIdx: index("idx_projects_status").on(table.status),
  slugIdx: index("idx_projects_slug").on(table.slug),
}));

// Project Images (dedicated table for variant management)
export const projectImages = pgTable("project_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  // Note: originalUrl stores the processed webp file path. The true original uploaded
  // file is intentionally discarded immediately after processing for security reasons.
  originalUrl: text("original_url").notNull(),
  webpUrl: text("webp_url"),
  avifUrl: text("avif_url"),
  thumbnailUrl: text("thumbnail_url"),
  altText: text("alt_text"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  projectIdIdx: index("idx_project_images_project_id").on(table.projectId),
}));

// Form Submissions: Contacts
export const contacts = pgTable("contacts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").default("No subject"),
  message: text("message").notNull(),
  phone: text("phone").default(""),
  status: contactStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index("idx_contacts_status").on(table.status),
}));

// Form Submissions: Quotes (Estimator Leads)
export const quotes = pgTable("quotes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  projectType: text("project_type").notNull(),
  details: text("details").default(""),
  status: quoteStatusEnum("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index("idx_quotes_status").on(table.status),
}));

// Form Submissions: Subcontractor Applications
export const subcontractors = pgTable("subcontractors", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  contact: text("contact").notNull(),
  email: text("email").notNull(),
  phone: text("phone").default(""),
  trade: text("trade").notNull(),
  experience: text("experience").default(""),
  serviceArea: text("service_area").default(""),
  message: text("message").default(""),
  status: subcontractorStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index("idx_subcontractors_status").on(table.status),
}));

// Form Submissions: Customer Reviews
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").default(5).notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  projectType: text("project_type").default(""),
  status: reviewStatusEnum("status").default("pending").notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  statusIdx: index("idx_reviews_status").on(table.status),
  ratingCheck: check("rating_check", sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
}));


export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id],
  }),
}));

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  sessionId: text("session_id").notNull(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  eventType: text("event_type").notNull(), // e.g. "pageview", "form_start", "form_submit"
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => ({
  eventTypeCreatedAtIdx: index("idx_analytics_event_created").on(table.eventType, table.createdAt),
}));
