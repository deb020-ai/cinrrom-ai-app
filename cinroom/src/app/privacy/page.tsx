import React from "react";
import Link from "next/link";
import { Diamond, ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Cinroom AI",
  description: "Privacy Policy and GDPR compliance details for Cinroom AI luxury video studio.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-neutral-300 font-sans p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cinroom</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-600/30 flex items-center justify-center border border-red-500/40">
              <Diamond className="w-3 h-3 text-red-400" />
            </div>
            <span className="font-semibold text-xs tracking-widest text-white uppercase font-serif">
              CINROOM AI
            </span>
          </div>
        </div>

        {/* HEADER TITLE */}
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> GDPR & CCPA COMPLIANT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Effective Date: July 30, 2026 · Last Updated: July 30, 2026
          </p>
        </div>

        {/* POLICY BODY */}
        <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-8 text-neutral-300">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              1. Introduction & Overview
            </h2>
            <p>
              Cinroom AI (&quot;Cinroom&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting the personal data and intellectual property of our users. This Privacy Policy describes how we collect, use, store, and share information when you use our AI-powered luxury jewelry commercial video and image generation platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Account Data:</strong> Email address, full name, encrypted credentials, and authentication provider metadata (Google OAuth or email login).
              </li>
              <li>
                <strong className="text-white">Uploaded Creative Assets:</strong> Jewelry reference photographs, CAD renderings, multi-angle product images, and brand guideline color palettes provided for AI video/image rendering.
              </li>
              <li>
                <strong className="text-white">Creative Inputs & Preferences:</strong> Custom text prompts, creative vision inputs, model casting preferences (gender, age, country of origin, ethnicity), duration, and aspect ratio selections.
              </li>
              <li>
                <strong className="text-white">Transaction Data:</strong> Subscription tier, credit balance, purchase history, and transaction identifiers. Payments are processed securely via Dodo Payments; we do not store full credit card numbers on our servers.
              </li>
              <li>
                <strong className="text-white">Technical Usage Data:</strong> IP address, browser type, device information, operating system, and interaction logs for system diagnostic and fraud prevention purposes.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              3. How We Use Your Information
            </h2>
            <p>We use your information exclusively for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>Generating photorealistic luxury jewelry video commercials and campaign images based on your uploaded references.</li>
              <li>Maintaining exact manufacturing fidelity of your jewelry items during AI rendering.</li>
              <li>Managing user accounts, credit balances, subscription billing, and transaction processing.</li>
              <li>Providing customer support and debugging technical execution failures.</li>
              <li>Ensuring platform security and preventing unauthorized access or API abuse.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              4. Data Processing & Third-Party Subprocessors
            </h2>
            <p>
              To deliver high-performance AI commercial generation, Cinroom securely shares necessary processing inputs with trusted infrastructure providers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                <div className="font-mono text-xs font-bold text-white">BytePlus (TikTok/ByteDance)</div>
                <div className="text-xs text-neutral-400">High-performance video generation rendering engine subprocessor.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                <div className="font-mono text-xs font-bold text-white">OpenAI</div>
                <div className="text-xs text-neutral-400">Image generation and creative prompt processing subprocessor.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                <div className="font-mono text-xs font-bold text-white">Supabase</div>
                <div className="text-xs text-neutral-400">Encrypted user database and session authentication management.</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 space-y-1">
                <div className="font-mono text-xs font-bold text-white">Dodo Payments</div>
                <div className="text-xs text-neutral-400">Merchant of Record for subscription billing and payment processing.</div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              5. Your GDPR & CCPA Data Rights
            </h2>
            <p>Under global data privacy laws (including GDPR and CCPA), you possess the following rights:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li><strong className="text-white">Right to Access:</strong> Request a copy of all personal data held about your account.</li>
              <li><strong className="text-white">Right to Deletion (Right to be Forgotten):</strong> Request permanent deletion of your account, uploaded images, and generated assets.</li>
              <li><strong className="text-white">Right to Rectification:</strong> Update or correct your account information at any time via Atelier Settings.</li>
              <li><strong className="text-white">Right to Data Portability:</strong> Export your generated commercial assets and project history.</li>
            </ul>
            <p className="pt-2 text-xs text-neutral-400 font-mono">
              To exercise any of these rights, contact our Privacy Office at <a href="mailto:privacy@cinroom.com" className="text-red-400 underline">privacy@cinroom.com</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              6. Data Security & Asset Retention
            </h2>
            <p>
              We implement industry-standard AES-256 encryption for data at rest and TLS 1.3 for data in transit. Uploaded product reference images and generated commercial videos remain strictly private to your account and are never sold, rented, or made public without your explicit consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              7. Contact & Inquiries
            </h2>
            <p>If you have any questions regarding this Privacy Policy, please contact us at:</p>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 text-xs font-mono text-neutral-300 space-y-1">
              <div>Cinroom AI Legal & Privacy Office</div>
              <div>Email: <a href="mailto:legal@cinroom.com" className="text-red-400 underline">legal@cinroom.com</a></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
