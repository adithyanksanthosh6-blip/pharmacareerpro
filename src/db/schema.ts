import {
  pgTable,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
  jsonb,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums
export const jobSourceEnum = pgEnum("job_source", [
  "naukri",
  "indeed",
  "linkedin",
  "pharma_jobs",
  "manual",
]);

export const interviewDifficultyEnum = pgEnum("interview_difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const analyticsEventEnum = pgEnum("analytics_event", [
  "cv_upload",
  "job_match",
  "interview_start",
  "interview_complete",
  "page_view",
  "job_click",
]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  passwordHash: text("password_hash").notNull(),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  consentGiven: boolean("consent_given").default(false),
  lastLoginAt: timestamp("last_login_at"),
});

// CV / Resume uploads
export const cvUploads = pgTable("cv_uploads", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 100 }),
  fileName: varchar("file_name", { length: 500 }).notNull(),
  rawText: text("raw_text"),
  parsedData: jsonb("parsed_data"),
  skills: jsonb("skills"),
  education: jsonb("education"),
  experience: jsonb("experience"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

// Job listings
export const jobListings = pgTable("job_listings", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 500 }).notNull(),
  company: varchar("company", { length: 300 }).notNull(),
  location: varchar("location", { length: 300 }),
  description: text("description"),
  requirements: text("requirements"),
  salary: varchar("salary", { length: 200 }),
  source: jobSourceEnum("source").notNull(),
  sourceUrl: text("source_url"),
  postedAt: timestamp("posted_at"),
  expiresAt: timestamp("expires_at"),
  isActive: boolean("is_active").default(true),
  skills: jsonb("skills"),
  qualifications: jsonb("qualifications"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Job matches (CV to job)
export const jobMatches = pgTable("job_matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  cvUploadId: uuid("cv_upload_id")
    .references(() => cvUploads.id, { onDelete: "cascade" })
    .notNull(),
  jobListingId: uuid("job_listing_id")
    .references(() => jobListings.id, { onDelete: "cascade" })
    .notNull(),
  matchScore: integer("match_score").notNull(),
  matchReasons: jsonb("match_reasons"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Mock interviews
export const mockInterviews = pgTable("mock_interviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  cvUploadId: uuid("cv_upload_id").references(() => cvUploads.id, {
    onDelete: "cascade",
  }),
  jobListingId: uuid("job_listing_id").references(() => jobListings.id, {
    onDelete: "cascade",
  }),
  jobDescription: text("job_description"),
  difficulty: interviewDifficultyEnum("difficulty").default("intermediate"),
  questions: jsonb("questions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics events
export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  sessionId: varchar("session_id", { length: 100 }),
  eventType: analyticsEventEnum("event_type").notNull(),
  eventData: jsonb("event_data"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
