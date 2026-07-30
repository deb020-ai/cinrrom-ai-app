"use client";

import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6">
      <div className="p-8 rounded-2xl bg-neutral-900 border border-white/10 text-center space-y-4 max-w-md">
        <h1 className="text-2xl font-bold font-serif text-amber-200">Sentry Error Verification</h1>
        <p className="text-xs text-neutral-400">
          Click the button below to trigger a test error and verify that live errors are sent to your Sentry dashboard.
        </p>

        <button
          type="button"
          onClick={() => {
            Sentry.captureException(new Error("Cinroom Test Error for Sentry Verification"));
            alert("Test error sent to Sentry! Check your Sentry dashboard.");
          }}
          className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
        >
          Trigger Test Sentry Error 🚀
        </button>

        <a href="/dashboard" className="block text-xs text-neutral-500 hover:text-white underline">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
