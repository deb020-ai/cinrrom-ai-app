import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { dash } from "@better-auth/infra";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Set true in production with Resend integration
  },
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
    }),
    dash(),
  ],
});
