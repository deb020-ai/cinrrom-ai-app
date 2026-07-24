import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/cinroom";

// Connection pool for serverless & server environments
const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });
