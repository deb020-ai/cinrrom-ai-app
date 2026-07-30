import React from "react";
import Link from "next/link";
import { Diamond, FileText, ArrowLeft, CheckCircle2, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Cinroom AI",
  description: "Terms of Service, Commercial Usage Rights, Account Consent, and Licensing Agreement for Cinroom AI.",
};

export default function TermsOfServicePage() {
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
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> TERMS OF SERVICE & COMMERCIAL LICENSE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service & Licensing Agreement
          </h1>
          <p className="text-xs font-mono text-neutral-400">
            Effective Date: July 30, 2026 · Last Updated: July 30, 2026
          </p>
        </div>

        {/* POLICY BODY */}
        <div className="prose prose-invert max-w-none text-sm leading-relaxed space-y-8 text-neutral-300">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              1. Acceptance of Terms & Mandatory Account Agreement
            </h2>
            <p>
              By creating an account (via Work Email OTP verification or Google Single Sign-On), accessing, or using the Cinroom AI platform (&quot;Service&quot;), you explicitly agree to be legally bound by these Terms of Service (&quot;Terms&quot;) and our Privacy Policy. Account creation requires checking the mandatory agreement box confirming that you have read, understood, and accepted these Terms. If you are accessing the Service on behalf of a luxury maison, brand, or agency, you represent and warrant that you possess full legal authority to bind that entity.
            </p>
          </section>

          {/* HIGHLIGHTED COMMERCIAL RIGHTS BOX */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-black to-neutral-950 border border-emerald-500/40 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>100% FULL COMMERCIAL OWNERSHIP GUARANTEE</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              You retain <strong className="text-white">100% full commercial ownership and worldwide license</strong> to all video commercials, images, campaign assets, and outputs generated through your Cinroom AI account. You have the unrestricted right to use, publish, broadcast, monetize, distribute, and license these generated assets across Meta Ads, Instagram, TikTok, YouTube, Television, Web, Editorial Print, and Global Commercial Advertising without paying any royalties or attribution to Cinroom AI.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              2. Intellectual Property & Uploaded Product Assets
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Uploaded Jewelry Ownership:</strong> You retain complete, uncompromised intellectual property rights and copyrights over all uploaded jewelry photographs, CAD files, brand guidelines, and product references.
              </li>
              <li>
                <strong className="text-white">File Upload Limit:</strong> High-resolution photos up to <strong className="text-white">20 MB per file</strong> (PNG, JPG, WEBP) are supported to accommodate direct mobile camera shots from luxury ateliers.
              </li>
              <li>
                <strong className="text-white">Platform Technology & Prompt Engine:</strong> Cinroom AI retains all rights, title, and interest in and to the platform, proprietary master prompt algorithms, AI orchestration engine, software code, and visual interface.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              3. Rate Limiting & Concurrency Security Policy
            </h2>
            <p>
              To ensure platform stability and prevent infrastructure abuse, the following security constraints apply:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Concurrency Locks:</strong> A single account may run a maximum of <strong className="text-white">2 active video commercial renders</strong> and <strong className="text-white">2 active image renders</strong> simultaneously.
              </li>
              <li>
                <strong className="text-white">API Rate Limiting:</strong> Generation and status endpoints are rate-limited (max 10-15 requests per minute). Automated script spamming or bot scraping is strictly prohibited.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              4. Subscriptions, Credits & Billing
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Merchant of Record:</strong> Billing and payment processing are securely managed by Dodo Payments (&quot;Merchant of Record&quot;).
              </li>
              <li>
                <strong className="text-white">Subscription Renewal:</strong> Subscriptions automatically renew at the end of each billing cycle (monthly or annually) unless canceled prior to the renewal date via your Atelier Settings panel.
              </li>
              <li>
                <strong className="text-white">Credit Allowance:</strong> Rendering video commercials or image campaigns consumes Generation Credits based on selected quality, duration, and engine. Unused monthly plan credits rollover or expire per plan tier terms.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              5. Refund Policy & Failure Protections
            </h2>
            <p>
              Due to the significant cloud GPU compute resources consumed immediately upon rendering AI commercials:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>Completed video and image renders are generally non-refundable once processed.</li>
              <li>If a technical system failure occurs during rendering (e.g. GPU crash or provider timeout), your credits will be automatically refunded back to your wallet balance.</li>
              <li>Subscription cancellation stops future renewal charges; current billing period access remains active until the end of the period.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              6. Acceptable Use Policy
            </h2>
            <p>You agree NOT to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>Upload content that infringes upon third-party trademarks, copyrights, or patents without authorization.</li>
              <li>Generate illegal, defamatory, deceptive, hateful, or pornographic content.</li>
              <li>Attempt to reverse-engineer, decompile, or extract the proprietary source code or master prompt templates of the platform.</li>
              <li>Bypass credit limits or security restrictions via automated bots or unauthorized script access.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              7. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Cinroom AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the Service. In no event shall Cinroom AI&apos;s total aggregate liability exceed the total amount paid by you to Cinroom in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              8. Governing Law & Legal Contact
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable commercial contract law. For legal inquiries or licensing questions:
            </p>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/10 text-xs font-mono text-neutral-300 space-y-1">
              <div>Cinroom AI Legal Department</div>
              <div>Email: <a href="mailto:legal@cinroom.com" className="text-red-400 underline">legal@cinroom.com</a></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
