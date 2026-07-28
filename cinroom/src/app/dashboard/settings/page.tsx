"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Shield, Bell, Building, Phone, Globe, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { COUNTRIES_LIST } from "@/lib/modes";

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [jobRole, setJobRole] = useState<string>("Founder & Creative Director");
  const [brandName, setBrandName] = useState<string>("Maison Vendôme");
  const [websiteUrl, setWebsiteUrl] = useState<string>("https://www.maisonvendome.com");
  const [headquarters, setHeadquarters] = useState<string>("France");

  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [marketingAlerts, setMarketingAlerts] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email || "");
          const meta = session.user.user_metadata || {};
          setFullName(meta.full_name || meta.name || "");
          if (meta.phone) setPhone(meta.phone);
          if (meta.job_role) setJobRole(meta.job_role);
          if (meta.brand_name) setBrandName(meta.brand_name);
          if (meta.website_url) setWebsiteUrl(meta.website_url);
          if (meta.headquarters) setHeadquarters(meta.headquarters);
        }
      } catch (err) {
        console.error("Error fetching studio settings:", err);
      }
    }

    fetchUserData();
  }, []);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone,
          job_role: jobRole,
          brand_name: brandName,
          website_url: websiteUrl,
          headquarters,
        },
      });

      if (error) throw error;
      toast.success("Atelier Profile settings saved successfully!");
    } catch (err: any) {
      console.error("Save settings error:", err);
      toast.error("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-16">
      {/* Page Header */}
      <div>
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-amber-200/80 block mb-0.5">
          WORKSPACE CONFIGURATION
        </span>
        <h1 className="text-3xl font-serif text-white tracking-tight mb-1">Atelier Settings</h1>
        <p className="text-xs font-sans text-neutral-400">
          Manage your luxury brand identity, contact profile, security, and notification preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* PERSONAL CONTACT INFORMATION CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-200" />
              Personal Profile & Contact Info
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Your name and contact details attached to your Atelier account.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Debabrata Bairagy"
                  className="h-11 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl focus:border-amber-200/50"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-200/80" /> Phone / WhatsApp Number
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="h-11 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl focus:border-amber-200/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                  Primary Account Email
                </label>
                <Input
                  value={userEmail || "loading..."}
                  disabled
                  className="h-11 bg-black/40 border-white/10 text-neutral-400 font-mono text-xs rounded-xl opacity-75"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                  Job Role / Title
                </label>
                <Input
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Founder & Creative Director, Marketing Lead"
                  className="h-11 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl focus:border-amber-200/50"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* BRAND & ATELIER IDENTITY CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-200" />
              Brand & House Details
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Configure your primary brand identity and headquarters location.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-4 pt-2">
            <div className="grid gap-2">
              <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                Atelier / Brand Name
              </label>
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Maison Vendôme, Cartier, Tiffany & Co."
                className="h-11 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl focus:border-amber-200/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-200/80" /> Website URL
                </label>
                <Input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://www.yourbrand.com"
                  className="h-11 bg-black/60 border-white/10 text-white font-sans text-xs rounded-xl focus:border-amber-200/50"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                  Headquarters Country
                </label>
                <select
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                  style={{ backgroundColor: "#0a0a0d", color: "#ffffff" }}
                  className="h-11 w-full bg-[#0a0a0d] text-white border border-white/10 rounded-xl px-3 text-xs font-sans focus:border-amber-200/50"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NOTIFICATIONS & ALERTS CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-200" />
              Security & Notifications
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Manage rendered video alerts and platform notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-3 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs text-white font-medium flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-amber-200" /> Email Render Completion Alerts
                </div>
                <div className="text-[10px] text-neutral-400">
                  Receive instant email notification when long 4K commercial videos finish rendering.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  emailNotifications ? "bg-amber-400/30 border border-amber-200/50" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    emailNotifications ? "translate-x-6 bg-amber-200" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs text-white font-medium flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-amber-200" /> Product & AI Engine Updates
                </div>
                <div className="text-[10px] text-neutral-400">
                  Receive priority access to new camera movements, lighting rigs, and AI models.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMarketingAlerts(!marketingAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  marketingAlerts ? "bg-amber-400/30 border border-amber-200/50" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    marketingAlerts ? "translate-x-6 bg-amber-200" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="h-12 px-8 text-xs font-sans tracking-widest uppercase bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 cursor-pointer shadow-lg border border-amber-200/30"
          >
            {isSaving ? "Saving Settings..." : "Save Atelier Settings"}
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
