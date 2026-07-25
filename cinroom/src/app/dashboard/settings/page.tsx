"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Key, CreditCard, Wallet, Sparkles, Zap, ShieldCheck, RefreshCw, Layers, Clock } from "lucide-react";
import { Pricing } from "@/components/features/landing/pricing";

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      <div>
        <h1 className="text-3xl font-light text-white tracking-tight mb-1">Studio Settings</h1>
        <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Manage your Atelier workspace, credit wallet, and API keys.</p>
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
          <TabsTrigger value="api" className="data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-200 data-[state=active]:border-amber-200/30 text-xs font-mono tracking-wider uppercase h-9 rounded-lg">
            <Key className="w-4 h-4 mr-2" /> API Access
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
                  <ShieldCheck className="w-4 h-4 text-amber-200" /> Active Subscription
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-0 pb-0 pt-8">
              {/* Wallet Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Available Credits</div>
                  <div className="text-4xl font-light text-amber-200 font-serif">12</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Ready for commercial rendering</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">This Month Used</div>
                  <div className="text-4xl font-light text-white font-serif">8</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Commercial assets produced</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Remaining</div>
                  <div className="text-4xl font-light text-white font-serif">4</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-2">Until next monthly top-up</div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">Next Renewal</div>
                    <div className="text-xl font-light text-white font-serif flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-200" /> 15 August
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-amber-200/80 mt-2">+10 Credits renew automatically</div>
                </div>

              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
                <div className="text-xs font-mono text-neutral-400">
                  Need extra credits before next renewal date?
                </div>
                <a href="#topup">
                  <Button className="h-11 px-6 text-xs font-mono tracking-widest uppercase bg-gradient-to-r from-[#E5D5C5] via-[#C5A880] to-[#A38257] text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(197,168,128,0.25)] hover:shadow-[0_0_30px_rgba(197,168,128,0.4)] cursor-pointer">
                    <RefreshCw className="w-4 h-4 mr-2" /> Recharge Credits
                  </Button>
                </a>
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
                <Input defaultValue="deb@cinroom.com" type="email" className="h-11 bg-white/[0.03] border-white/10 text-white font-sans rounded-xl" />
              </div>
              <Button className="bg-amber-400/10 text-amber-200 border border-amber-200/30 hover:bg-amber-400/20 text-xs font-mono uppercase tracking-wider h-10 px-5 rounded-xl">Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#08080a]">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-light text-white">Commercial API Keys</CardTitle>
              <CardDescription className="text-xs text-neutral-400">Integrate Cinroom campaign generation with your e-commerce platform.</CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0 space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/10">
                <div className="flex-1 font-mono text-xs text-amber-200/80 truncate">
                  sk_live_cinroom_89f7a4b901c23849f82190
                </div>
                <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 text-xs font-mono">Copy Key</Button>
              </div>
              <Button className="bg-amber-400/10 text-amber-200 border border-amber-200/30 hover:bg-amber-400/20 text-xs font-mono uppercase tracking-wider h-10 px-5 rounded-xl">Generate Production API Key</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
