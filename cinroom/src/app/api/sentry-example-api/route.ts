import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  const error = new Error("Cinroom Server-Side Test Error for Sentry Verification");
  Sentry.captureException(error);
  return NextResponse.json({ success: true, message: "Server-side Sentry test error captured successfully!" });
}
