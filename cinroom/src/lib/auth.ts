import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "cinroom_sec_9823471092384019238401928340192",
  baseURL: process.env.BETTER_AUTH_URL || "https://www.cinroom.com",
  trustedOrigins: [
    "https://www.cinroom.com",
    "https://cinroom.com",
    "https://cinroom.vercel.app",
    "http://localhost:3000",
  ],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      organization: schema.organizations,
      member: schema.members,
      invitation: schema.invitations,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
    }),
    dash(),
  ],
});
