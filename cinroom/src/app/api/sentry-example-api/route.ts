import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  Sentry.logger.info("User triggered test log", { log_source: "sentry_test" });
  console.log("[SENTRY_TEST_LOG] User triggered test log from server API");
  const error = new Error("Cinroom Server-Side Test Error for Sentry Verification");
  Sentry.captureException(error);
  return NextResponse.json({ success: true, message: "User triggered test log sent to Sentry!" });
}
