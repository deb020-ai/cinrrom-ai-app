import { betterAuth } from "better-auth";
import { organization, emailOTP } from "better-auth/plugins";
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
      verification: schema.verifications,
      organization: schema.organizations,
      member: schema.members,
      invitation: schema.invitations,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: process.env.GOOGLE_CLIENT_ID ? {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  } : {},
  plugins: [
    organization({
      allowUserToCreateOrganization: true,
    }),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        console.log(`[CINROOM AUTH OTP] Type: ${type} | Email: ${email} | Code: ${otp}`);
        // If Resend API key is configured, send email via Resend
        if (process.env.RESEND_API_KEY) {
          try {
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "Cinroom Security <security@cinroom.com>",
                to: [email],
                subject: `${otp} is your Cinroom security verification code`,
                html: `<div style="font-family: sans-serif; background: #050505; color: #fff; padding: 40px; border-radius: 12px;">
                  <h2 style="color: #c5a880; letter-spacing: 2px;">CINROOM ATELIER</h2>
                  <p>Your single-use 6-digit security verification code is:</p>
                  <h1 style="font-size: 36px; letter-spacing: 8px; color: #f59e0b;">${otp}</h1>
                  <p style="color: #888;">This code expires in 10 minutes. Do not share it with anyone.</p>
                </div>`,
              }),
            });
          } catch (err) {
            console.error("Failed to send OTP via Resend:", err);
          }
        }
      },
    }),
    dash(),
  ],
});
