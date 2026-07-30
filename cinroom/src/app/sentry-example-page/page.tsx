"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function SentryExamplePage() {
  useEffect(() => {
    // Send a performance trace transaction on mount
    Sentry.startSpan(
      {
        name: "Cinroom Page Mount Performance Trace",
        op: "navigation",
      },
      () => {
        console.log("Sentry Performance Trace span recorded for page mount.");
      }
    );
  }, []);

  const triggerLog = () => {
    Sentry.logger.info("User triggered test log from Cinroom Studio", { log_source: "sentry_test" });
    console.log("[Cinroom Console Log Test] console.log captured by Sentry consoleLoggingIntegration");
    alert("Structured Test Log sent to Sentry Logs!");
  };

  const triggerTrace = () => {
    Sentry.startSpan(
      {
        name: "Manual Sentry Trace Verification Span",
        op: "ui.action.click",
      },
      () => {
        alert("Performance Trace Transaction sent to Sentry!");
      }
    );
  };

  const triggerClientError = () => {
    Sentry.captureException(new Error("Cinroom Client-Side Test Error for Sentry Verification"));
    alert("Client-side test error sent to Sentry! Check your Sentry dashboard.");
  };

  const triggerServerError = async () => {
    try {
      const res = await fetch("/api/sentry-example-api");
      const data = await res.json();
      alert(`Server trace & error triggered: ${data.message}`);
    } catch (e) {
      alert("Server-side test error triggered and captured in Sentry!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 space-y-6">
      <div className="p-8 rounded-2xl bg-neutral-900 border border-white/10 text-center space-y-4 max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold font-serif text-amber-200">Sentry Verification & Tracing</h1>
        <p className="text-xs text-neutral-400">
          Test live logs, performance tracing & error monitoring on (<span className="text-amber-200">cinroom.com</span>).
        </p>

        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={triggerLog}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Send Structured Test Log 🪵
          </button>

          <button
            type="button"
            onClick={triggerTrace}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Send Performance Trace Transaction 📊
          </button>

          <button
            type="button"
            onClick={triggerClientError}
            className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Trigger Client-Side Sentry Error 🚀
          </button>

          <button
            type="button"
            onClick={triggerServerError}
            className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
          >
            Trigger Server-Side Sentry Error ⚡
          </button>
        </div>

        <a href="/dashboard" className="block text-xs text-neutral-500 hover:text-white underline pt-2">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}
