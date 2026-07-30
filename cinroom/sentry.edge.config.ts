import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "https://9cf7813aa4656ad0f2d539a0f849e9bb@o4511823530360832.ingest.us.sentry.io/4511823541501952",
  tracesSampleRate: 1.0,
  debug: false,
  enableLogs: true,
  dataCollection: {
    genAI: { inputs: true, outputs: true },
  },
});
