"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Shield, Bell, Palette, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("Maison Vendôme");
  const [defaultAspect, setDefaultAspect] = useState<string>("16:9");
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserEmail(session.user.email || "");
          const storedBrand = session.user.user_metadata?.brand_name;
          if (storedBrand) setBrandName(storedBrand);
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
        data: { brand_name: brandName },
      });

      if (error) throw error;
      toast.success("Atelier Workspace settings updated successfully!");
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
          Manage your luxury brand workspace, account security, rendering defaults, and notifications.
        </p>
      </div>

      <div className="space-y-6">
        {/* BRAND IDENTITY CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-200" />
              Brand & Atelier Profile
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Configure your primary brand identity attached to commercial asset outputs.
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
          </CardContent>
        </Card>

        {/* DEFAULT STUDIO PREFERENCES CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-200" />
              Studio Rendering Defaults
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Default aspect ratio and engine preferences for new video & image projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-4 pt-2">
            <div className="grid gap-2">
              <label className="text-xs font-sans text-neutral-300 uppercase tracking-wider font-medium">
                Default Commercial Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "16:9", label: "16:9 Landscape" },
                  { id: "9:16", label: "9:16 Vertical Story" },
                  { id: "1:1", label: "1:1 Square Post" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDefaultAspect(opt.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-sans border transition-all cursor-pointer ${
                      defaultAspect === opt.id
                        ? "border-amber-200/60 bg-amber-400/10 text-amber-100 font-bold"
                        : "border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* NOTIFICATIONS & SECURITY CARD */}
        <Card className="glass-panel border-white/10 p-6 rounded-2xl bg-[#0a0a0d] space-y-4">
          <CardHeader className="px-0 pt-0 pb-3 border-b border-white/[0.06]">
            <CardTitle className="text-lg font-serif text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-200" />
              Security & Notifications
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Manage rendered video alerts and account authentication preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0 space-y-4 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="space-y-0.5">
                <div className="text-xs text-white font-medium flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-amber-200" /> Email Render Notifications
                </div>
                <div className="text-[10px] text-neutral-400">
                  Receive an email alert when long 4K commercial videos complete rendering.
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
          </CardContent>
        </Card>

        {/* SAVE BUTTON */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="h-11 px-8 text-xs font-sans tracking-widest uppercase bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 cursor-pointer shadow-lg border border-amber-200/30"
          >
            {isSaving ? "Saving Settings..." : "Save Atelier Settings"}
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
