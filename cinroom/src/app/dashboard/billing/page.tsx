"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, ShieldCheck, RefreshCw, Clock, History, ArrowDownRight, ArrowUpRight, Inbox } from "lucide-react";
import { Pricing } from "@/components/features/landing/pricing";
import { createClient } from "@/lib/supabase/client";

interface WalletData {
  available_credits: number;
  credits_used: number;
  plan_tier: string;
  next_renewal_date: string | null;
}

interface TransactionData {
  id: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  type: string;
  description: string;
  created_at: string;
  invoice_url?: string;
}

export default function BillingPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userId = session.user.id;

          // 1. Fetch live wallet
          const { data: walletRes } = await supabase
            .from("user_wallets")
            .select("available_credits, credits_used, plan_tier, next_renewal_date")
            .eq("user_id", userId)
            .single();

          if (walletRes) {
            setWallet({
              available_credits: Number(walletRes.available_credits || 0),
              credits_used: Number(walletRes.credits_used || 0),
              plan_tier: walletRes.plan_tier || "free",
              next_renewal_date: walletRes.next_renewal_date,
            });
          } else {
            setWallet({ available_credits: 0, credits_used: 0, plan_tier: "free", next_renewal_date: null });
          }

          // 2. Fetch live transactions ledger
          const { data: txRes } = await supabase
            .from("credit_transactions")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

          if (txRes) {
            setTransactions(txRes as TransactionData[]);
          }
        }
      } catch (err) {
        console.error("Error fetching studio wallet settings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const formatRenewalDate = (dateStr: string | null) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Header */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-red-400 font-semibold block mb-0.5">
          FINANCIAL MANAGEMENT
        </span>
        <h1 className="text-3xl font-serif text-white tracking-tight mb-1">Credits & Subscriptions</h1>
        <p className="text-xs font-sans text-neutral-400">
          Manage your Atelier credit wallet, recharge packs, monthly subscriptions, and billing ledger.
        </p>
      </div>

      <Tabs defaultValue="credits" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 h-12 px-2 gap-2 mb-8 rounded-xl">
          <TabsTrigger
            value="credits"
            className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-200 data-[state=active]:border-red-500/40 text-xs font-sans tracking-wider uppercase h-9 rounded-lg"
          >
            <Wallet className="w-4 h-4 mr-2" /> Credit Wallet
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-200 data-[state=active]:border-red-500/40 text-xs font-sans tracking-wider uppercase h-9 rounded-lg"
          >
            <CreditCard className="w-4 h-4 mr-2" /> Subscription Plans & Top-Ups
          </TabsTrigger>
        </TabsList>

        {/* Credit Wallet Tab */}
        <TabsContent value="credits" className="space-y-8">
          {/* Credit Wallet Widget */}
          <Card className="glass-panel blood-red-border-glow bg-[#0a0a0d] border-red-500/30 p-8 rounded-2xl shadow-2xl">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-red-400 font-semibold mb-1 block">
                    ATELIER WALLET
                  </span>
                  <CardTitle className="text-2xl font-serif text-white">Credit Balance & Ledger</CardTitle>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 font-sans text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  {wallet?.plan_tier ? `${wallet.plan_tier.toUpperCase()} PLAN` : "FREE ACCOUNT"}
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0 pb-0 pt-8">
              {/* Wallet Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-2">Available Credits</div>
                  <div className="text-4xl font-light text-red-400 font-serif">
                    {loading ? "..." : wallet?.available_credits ?? 0}
                  </div>
                  <div className="text-[10px] font-sans text-neutral-500 mt-2">Ready for commercial rendering</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-2">Credits Used</div>
                  <div className="text-4xl font-light text-white font-serif">
                    {loading ? "..." : wallet?.credits_used ?? 0}
                  </div>
                  <div className="text-[10px] font-sans text-neutral-500 mt-2">Commercial assets produced</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-2">Wallet Status</div>
                  <div className="text-4xl font-light text-white font-serif">
                    {wallet?.available_credits && wallet.available_credits > 0 ? "Active" : "Zero"}
                  </div>
                  <div className="text-[10px] font-sans text-neutral-500 mt-2">Live production account</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-sans text-neutral-400 uppercase tracking-wider mb-2">Next Renewal</div>
                    <div className="text-lg font-light text-white font-serif flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-400" /> {formatRenewalDate(wallet?.next_renewal_date || null)}
                    </div>
                  </div>
                  <div className="text-[10px] font-sans text-red-300/80 mt-2">Automatic monthly refill</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06] mb-8">
                <div className="text-xs font-sans text-neutral-400">
                  Need additional credits for an upcoming campaign drop?
                </div>
                <a href="#topup">
                  <Button className="h-11 px-6 text-xs font-sans tracking-widest uppercase bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold rounded-xl cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.3)] border border-red-400/40">
                    <RefreshCw className="w-4 h-4 mr-2" /> Recharge Credits
                  </Button>
                </a>
              </div>

              {/* Recent Ledger Transactions Table */}
              <div>
                <div className="flex items-center gap-2 text-xs font-sans text-red-400 uppercase tracking-wider mb-4 font-semibold">
                  <History className="w-4 h-4 text-red-400" /> Production Credit Ledger
                </div>

                {transactions.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 p-12 text-center bg-white/[0.01]">
                    <Inbox className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                    <h4 className="text-sm font-sans text-white font-medium mb-1">No Ledger Transactions Recorded</h4>
                    <p className="text-xs text-neutral-400 font-sans max-w-sm mx-auto mb-4">
                      Purchase credits or subscribe to view your billing ledger history.
                    </p>
                    <a href="#topup">
                      <Button variant="outline" className="h-9 px-5 text-xs font-sans border-red-500/40 text-red-300 hover:bg-red-500/20">
                        Purchase Credits
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.01]">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03] text-neutral-400">
                          <th className="p-3.5 font-normal">Transaction Description</th>
                          <th className="p-3.5 font-normal text-right">Amount</th>
                          <th className="p-3.5 font-normal text-right">Balance After</th>
                          <th className="p-3.5 font-normal text-right">Timestamp</th>
                          <th className="p-3.5 font-normal text-right">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05] text-neutral-300">
                        {transactions.map((tx) => (
                          <tr key={tx.id}>
                            <td className="p-3.5 flex items-center gap-2.5">
                              {tx.amount < 0 ? (
                                <ArrowDownRight className="w-4 h-4 text-red-400 shrink-0" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              <span>{tx.description}</span>
                            </td>
                            <td className={`p-3.5 text-right font-bold ${tx.amount < 0 ? "text-red-400" : "text-emerald-400"}`}>
                              {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
                            </td>
                            <td className="p-3.5 text-right text-neutral-300">{tx.balance_after}</td>
                            <td className="p-3.5 text-right text-neutral-400">
                              {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </td>
                            <td className="p-3.5 text-right font-sans text-[11px]">
                              {tx.invoice_url ? (
                                <a href={tx.invoice_url} target="_blank" rel="noopener noreferrer" className="text-red-300/90 hover:text-red-200 underline decoration-red-400/30 underline-offset-4">Receipt ↗</a>
                              ) : (
                                <span className="text-neutral-600">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Pricing activePlanTier={wallet?.plan_tier} />
        </TabsContent>

        {/* Subscription & Plans Tab */}
        <TabsContent value="billing">
          <Pricing activePlanTier={wallet?.plan_tier} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
