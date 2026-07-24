import { pgTable, text, integer, timestamp, boolean, uuid, varchar } from "drizzle-orm/pg-core";

// ==========================================
// 1. BETTER AUTH IDENTITY & ORGANIZATIONS
// ==========================================

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Organization (Company Workspace / Jewelry House)
export const organizations = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  // Shared Credit Pool Balance for all Team Members
  creditBalance: integer("credit_balance").notNull().default(5), // 5 free trial credits on workspace creation
  dodoCustomerId: text("dodo_customer_id"),
  dodoSubscriptionId: text("dodo_subscription_id"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const members = pgTable("member", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull().default("member"), // owner | admin | member
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const invitations = pgTable("invitation", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  role: text("role").notNull().default("member"),
  status: text("status").notNull().default("pending"),
  expiresAt: timestamp("expiresAt").notNull(),
  inviterId: text("inviterId").notNull().references(() => users.id, { onDelete: "cascade" }),
});

// ==========================================
// 2. CREDIT LEDGER & AUDIT TRAIL
// ==========================================

export const creditTransactions = pgTable("credit_transaction", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }), // User who initiated action
  amount: integer("amount").notNull(), // Positive (+50) for purchases, Negative (-1) for video render usage
  balanceAfter: integer("balance_after").notNull(), // Snapshot of balance after change
  type: varchar("type", { length: 32 }).notNull(), // 'SUBSCRIPTION_REFILL' | 'TOP_UP' | 'VIDEO_RENDER' | 'REFUND'
  description: text("description").notNull(),
  referenceId: text("reference_id"), // Dodo payment_id or Video Generation ID
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ==========================================
// 3. VIDEO GENERATION JOBS
// ==========================================

export const videoGenerations = pgTable("video_generation", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: text("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id),
  templateId: varchar("template_id", { length: 64 }).notNull(),
  aspectRatio: varchar("aspect_ratio", { length: 16 }).notNull().default("16:9"),
  duration: varchar("duration", { length: 16 }).notNull().default("10s"),
  resolution: varchar("resolution", { length: 16 }).notNull().default("4K"),
  inputImageUrl: text("input_image_url").notNull(),
  outputVideoUrl: text("output_video_url"),
  status: varchar("status", { length: 32 }).notNull().default("PENDING"), // PENDING | RENDERING | COMPLETED | FAILED
  creditCost: integer("credit_cost").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
