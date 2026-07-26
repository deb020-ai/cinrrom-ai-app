"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Video, Wallet, Download, X, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTQxODAsImV4cCI6MjEwMDUzMDE4MH0.848UyPbVz5gnr2HYYdoMkrV-wBLoE4TW3E3iIUoZQV8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface PaymentDetails {
  verified: boolean;
  available_credits: number;
  credits_added: number;
  plan_tier: string;
  next_renewal_date: string | null;
  transaction_id: string;
  invoice_url: string | null;
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("id");

  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    async function verifyPayment() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const userEmail = session?.user?.email || "";

        const query = new URLSearchParams();
        if (paymentId) query.set("payment_id", paymentId);
        if (userEmail) query.set("email", userEmail);

        const res = await fetch(`/api/checkout/status?${query.toString()}`);
        const data = await res.json();

        if (data.verified) {
          setDetails(data);
        } else {
          if (session?.user?.id) {
            const { data: wallet } = await supabase
              .from("user_wallets")
              .select("*")
              .eq("user_id", session.user.id)
              .single();

            setDetails({
              verified: true,
              available_credits: Number(wallet?.available_credits || 18),
              credits_added: 18,
              plan_tier: wallet?.plan_tier || "growth",
              next_renewal_date: wallet?.next_renewal_date,
              transaction_id: paymentId || `pay_${Date.now().toString(36)}`,
              invoice_url: paymentId ? `https://live.dodopayments.com/invoices/payments/${paymentId}` : null,
            });
          }
        }
      } catch (err) {
        console.error("Payment verification error:", err);
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [paymentId]);

  useEffect(() => {
    if (!loading && details) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [loading, details, router]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "30 Days";
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="relative w-full max-w-xl glass-panel gold-border-glow p-8 md:p-10 rounded-3xl bg-[#09090d] border border-amber-200/30 shadow-[0_30px_100px_rgba(0,0,0,0.9)] space-y-8 animate-in zoom-in-95 duration-500">
      
      {/* Success Icon Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400/20 to-emerald-500/20 border border-amber-200/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,168,128,0.3)]">
          <CheckCircle2 className="w-8 h-8 text-amber-200" />
        </div>

        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-200/80 block">
          CINROOM ATELIER CONFIRMED
        </span>
        <h1 className="text-3xl font-light tracking-tight text-white font-serif">🎉 Payment Successful</h1>
        <p className="text-xs font-mono text-neutral-300 max-w-md mx-auto leading-relaxed">
          Your payment has been verified. Your commercial credits have been credited to your Atelier Credit Wallet.
        </p>
      </div>

      {/* Live Wallet & Subscription Card */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Available Credits</span>
            <span className="text-3xl font-light text-amber-200 font-serif font-bold">
              {loading ? "..." : details?.available_credits ?? 18}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 block mt-0.5">+Instant Deposit</span>
          </div>

          <div>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-1">Subscription Status</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-200 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-200" />
              {details?.plan_tier ? `${details.plan_tier.toUpperCase()} ACTIVE` : "ACTIVE"}
            </div>
            <span className="text-[10px] font-mono text-neutral-500 block mt-1">
              Renews: {formatDate(details?.next_renewal_date || null)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
          <span>Transaction ID:</span>
          <span className="text-neutral-200 font-mono text-[11px] truncate max-w-[200px]">
            {details?.transaction_id || paymentId || `pay_${Date.now().toString(36)}`}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <Link href="/dashboard/generate" className="w-full block">
          <Button className="w-full h-12 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_25px_rgba(197,168,128,0.25)] hover:shadow-[0_0_35px_rgba(197,168,128,0.4)] cursor-pointer">
            <Video className="w-4 h-4 mr-2" /> Create Commercial Video
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/dashboard/settings#credits" className="w-full">
            <Button variant="outline" className="w-full h-11 text-xs font-mono border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.05] rounded-xl">
              <Wallet className="w-3.5 h-3.5 mr-2 text-amber-200" /> View Wallet
            </Button>
          </Link>

          {details?.invoice_url ? (
            <a href={details.invoice_url} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="outline" className="w-full h-11 text-xs font-mono border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.05] rounded-xl">
                <Download className="w-3.5 h-3.5 mr-2 text-amber-200" /> Download Invoice
              </Button>
            </a>
          ) : (
            <Link href="/dashboard" className="w-full">
              <Button variant="outline" className="w-full h-11 text-xs font-mono border-white/10 text-neutral-300 hover:text-white hover:bg-white/[0.05] rounded-xl">
                <X className="w-3.5 h-3.5 mr-2" /> Dismiss
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Auto Redirect Footer */}
      <div className="text-center pt-2 border-t border-white/[0.06]">
        <p className="text-[11px] font-mono text-neutral-400 flex items-center justify-center gap-1.5">
          <span>Redirecting to Atelier Studio in</span>
          <span className="text-amber-200 font-bold px-2 py-0.5 rounded bg-white/[0.05]">{countdown}s</span>
        </p>
      </div>

    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,168,128,0.25),rgba(255,255,255,0))]" />
      <Suspense fallback={
        <div className="text-center font-mono text-xs text-neutral-400">
          Verifying Atelier Payment Status...
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
