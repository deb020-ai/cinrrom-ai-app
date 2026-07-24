import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_TZcpPeGSW0d2@ep-frosty-bird-aytf005w.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
