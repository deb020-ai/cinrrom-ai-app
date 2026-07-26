"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CreditCard, Wallet, ShieldCheck, RefreshCw, Clock, History, ArrowDownRight, ArrowUpRight, Inbox } from "lucide-react";
import { Pricing } from "@/components/features/landing/pricing";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://pwtxdpgbggzgmscspepe.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dHhkcGdiZ2d6Z21zY3NwZXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTQxODAsImV4cCI6MjEwMDUzMDE4MH0.848UyPbVz5gnr2HYYdoMkrV-wBLoE4TW3E3iIUoZQV8";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export default function SettingsPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email || "");
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
      <div>
        <h1 className="text-3xl font-light text-white tracking-tight mb-1">Studio Settings</h1>
        <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Manage your Atelier workspace, commercial credits, and profile.</p>
      </div>

      <Tabs defaultValue="credits" className="w-full">
        <TabsList className="bg-white/5 border border-white/10 h-12 px-2 gap-2 mb-8 rounded-xl">
          <TabsTrigger value="credits" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-200 data-[state=active]:border-amber-200/30 text-xs font-mono tracking-wider uppercase h-9 rounded-lg">
            <Wallet className="w-4 h-4 mr-2" /> Credit Wallet
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-200 data-[state=active]:border-amber-200/30 text-xs font-mono tracking-wider uppercase h-9 rounded-lg">
            <CreditCard className="w-4 h-4 mr-2" /> Subscription & Plans
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-200 data-[state=active]:border-amber-200/30 text-xs font-mono tracking-wider uppercase h-9 rounded-lg">
            <User className="w-4 h-4 mr-2" /> Atelier Profile
          </TabsTrigger>
        </TabsList>

        {/* Credit Wallet Tab */}
        <TabsContent value="credits" className="space-y-8">
          
          {/* Credit Wallet Widget */}
          <Card className="glass-panel gold-border-glow bg-gradient-to-b from-[#16161f] via-[#0d0d12] to-[#07070a] border-amber-200/30 p-8 rounded-2xl shadow-2xl">
            <CardHeader className="px-0 pt-0 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-200/80 mb-1 block">
                    ATELIER WALLET
                  </span>
                  <CardTitle className="text-2xl font-light text-white">Credit Balance & Ledger</CardTitle>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-200/30 text-amber-200 font-mono text-xs flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-200" />
                  {wallet?.plan_tier ? `${wallet.plan_tier.toUpperCase()} PLAN` : "FREE ACCOUNT"}
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0 pb-0 pt-8">
              {/* Wallet Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Available Credits</div>
                  <div className="text-4xl font-light text-amber-200 font-serif">
                    {loading ? "..." : wallet?.available_credits ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Ready for commercial rendering</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Credits Used</div>
                  <div className="text-4xl font-light text-white font-serif">
                    {loading ? "..." : wallet?.credits_used ?? 0}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Commercial assets produced</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Wallet Status</div>
                  <div className="text-4xl font-light text-white font-serif">
                    {wallet?.available_credits && wallet.available_credits > 0 ? "Active" : "Zero"}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Live production account</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Next Renewal</div>
                    <div className="text-lg font-light text-white font-serif flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-200" /> {formatRenewalDate(wallet?.next_renewal_date || null)}
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-200/80 mt-2">Automatic monthly refill</div>
                </div>

              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06] mb-8">
                <div className="text-xs font-mono text-neutral-400">
                  Need additional credits for an upcoming campaign drop?
                </div>
                <a href="#topup">
                  <Button className="h-11 px-6 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] cursor-pointer">
                    <RefreshCw className="w-4 h-4 mr-2" /> Recharge Credits
                  </Button>
                </a>
              </div>

              {/* Recent Ledger Transactions Table */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-200 uppercase tracking-wider mb-4">
                  <History className="w-4 h-4 text-amber-200" /> Production Credit Ledger
                </div>

                {transactions.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 p-12 text-center bg-white/[0.01]">
                    <Inbox className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                    <h4 className="text-sm font-mono text-white font-medium mb-1">No Ledger Transactions Recorded</h4>
                    <p className="text-xs text-neutral-400 font-mono max-w-sm mx-auto mb-4">
                      Purchase credits or subscribe to view your billing ledger history.
                    </p>
                    <a href="#topup">
                      <Button variant="outline" className="h-9 px-5 text-xs font-mono border-amber-200/30 text-amber-200 hover:bg-amber-400/10">
                        Purchase Credits
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.01]">
                    <table className="w-full text-left text-xs font-mono">
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
                                <a href={tx.invoice_url} target="_blank" rel="noopener noreferrer" className="text-amber-200/80 hover:text-amber-200 underline decoration-amber-200/30 underline-offset-4">Receipt ↗</a>
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

          <Pricing />
        </TabsContent>

        {/* Subscription & Plans Tab */}
        <TabsContent value="billing">
          <Pricing />
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#08080a]">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-light text-white">Atelier Details</CardTitle>
              <CardDescription className="text-xs text-neutral-400">Update your workspace brand name and contact profile.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-4 pt-4">
              <div className="grid gap-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Atelier / Brand Name</label>
                <Input defaultValue="Maison Vendôme" className="h-11 bg-white/[0.03] border-white/10 text-white font-sans rounded-xl" />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Primary Work Email</label>
                <Input value={userEmail || "loading..."} disabled className="h-11 bg-white/[0.03] border-white/10 text-neutral-400 font-mono rounded-xl opacity-80" />
              </div>
              <Button className="bg-amber-400/10 text-amber-200 border border-amber-200/30 hover:bg-amber-400/20 text-xs font-mono uppercase tracking-wider h-10 px-5 rounded-xl">Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
