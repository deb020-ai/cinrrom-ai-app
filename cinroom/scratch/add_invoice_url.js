import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_TZcpPeGSW0d2@ep-frosty-bird-aytf005w.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(connectionString);

async function main() {
  try {
    await sql`ALTER TABLE credit_transaction ADD COLUMN IF NOT EXISTS invoice_url TEXT;`;
    console.log("Successfully added invoice_url to credit_transaction table");
  } catch (error) {
    console.error("Error altering table:", error);
  }
}

main();
