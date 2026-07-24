import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function sendVerificationEmail({ email, url }: { email: string; url: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[AUTH DEMO] Verification Email for ${email}: ${url}`);
    return;
  }

  await resend.emails.send({
    from: "Cinroom Atelier <auth@cinroom.com>",
    to: email,
    subject: "Verify your Cinroom Atelier Workspace",
    html: `
      <div style="font-family: sans-serif; background: #050505; color: #ffffff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #c5a880; font-weight: 300;">Welcome to Cinroom</h1>
        <p style="color: #a1a1aa;">Click the link below to verify your email address and claim your 5 free campaign generation credits:</p>
        <a href="${url}" style="display: inline-block; background: #c5a880; color: #000000; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">Verify Email Address</a>
      </div>
    `,
  });
}
