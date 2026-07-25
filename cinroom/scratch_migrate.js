const { neon } = require("@neondatabase/serverless");

const sql = neon("postgresql://neondb_owner:npg_TZcpPeGSW0d2@ep-frosty-bird-aytf005w.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require");

async function run() {
  console.log("Adding columns to account table...");
  await sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "password" text;`;
  await sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "idToken" text;`;
  await sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "accessTokenExpiresAt" timestamp;`;
  await sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "refreshTokenExpiresAt" timestamp;`;
  await sql`ALTER TABLE "account" ADD COLUMN IF NOT EXISTS "scope" text;`;
  console.log("Migration complete!");
}

run().catch(console.error);
