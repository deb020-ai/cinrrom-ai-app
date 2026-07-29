import React from "react";
import Link from "next/link";
import { Diamond, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Terms of Service | Cinroom AI",
  description: "Terms of Service, Commercial Usage Rights, and License Agreement for Cinroom AI.",
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
              1. Acceptance of Terms
            </h2>
            <p>
              By creating an account, accessing, or using the Cinroom AI platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you are accessing the Service on behalf of a company or luxury maison, you represent that you have full legal authority to bind that entity to these Terms.
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
              2. Intellectual Property & Uploaded Assets
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>
                <strong className="text-white">Uploaded Jewelry Ownership:</strong> You retain complete, uncompromised intellectual property rights and copyrights over all uploaded jewelry photographs, CAD files, brand guidelines, and product references.
              </li>
              <li>
                <strong className="text-white">Platform Technology:</strong> Cinroom AI retains all rights, title, and interest in and to the platform, proprietary master prompt algorithms, AI orchestration engine, software code, and visual interface.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              3. Subscriptions, Credits & Billing
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
              4. Refund Policy
            </h2>
            <p>
              Due to the significant cloud GPU compute resources consumed immediately upon rendering AI commercials:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-300">
              <li>Completed video and image renders are generally non-refundable once processed.</li>
              <li>If a technical system failure occurs during rendering (e.g. GPU crash or server timeout), your credits will be automatically refunded back to your wallet balance.</li>
              <li>Subscription cancellation stops future renewal charges; current billing period access remains active until the end of the period.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              5. Acceptable Use Policy
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
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, Cinroom AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the Service. In no event shall Cinroom AI&apos;s total aggregate liability exceed the total amount paid by you to Cinroom in the twelve (12) months preceding the claim.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-mono border-b border-white/10 pb-2">
              7. Governing Law & Contact
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
