"use client";

import { useEffect, useState } from "react";
import { Diamond, Video, Camera, FolderOpen, CreditCard, Settings, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Video Studio", href: "/dashboard/generate", icon: Video },
  { name: "Image Studio", href: "/dashboard/generate-image", icon: Camera },
  { name: "Projects Vault", href: "/dashboard/history", icon: FolderOpen },
];

const secondaryItems = [
  { name: "Credits & Plan", href: "/dashboard/billing", icon: CreditCard },
  { name: "SuperAdmin Center", href: "/dashboard/admin", icon: ShieldCheck },
  { name: "Atelier Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Atelier Member";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#060608]/95 backdrop-blur-2xl border-b border-white/[0.06] z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600/30 to-red-900/40 flex items-center justify-center border border-red-500/50 shadow-[0_0_12px_rgba(220,38,38,0.4)]">
            <Diamond className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-xs tracking-[0.2em] text-white uppercase font-serif">
            CINROOM
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-40 animate-in fade-in"
        />
      )}

      {/* SIDEBAR DRAWER */}
      <aside
        className={`w-64 h-screen border-r border-white/[0.06] bg-[#060608]/95 backdrop-blur-2xl flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600/40 to-red-900/50 flex items-center justify-center border border-red-500/60 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              <Diamond className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-xs tracking-[0.2em] text-white uppercase font-serif">
              CINROOM
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
          <div className="px-3 mb-2 text-[10px] font-sans font-medium text-neutral-500 uppercase tracking-[0.2em]">
            Studio Engines
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/dashboard/generate" && pathname === "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-sans tracking-wide rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-red-600/20 text-white border border-red-500/40 font-semibold shadow-[0_0_20px_rgba(220,38,38,0.25)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-red-400" : "text-neutral-500"}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="px-3 mt-8 mb-2 text-[10px] font-sans font-medium text-neutral-500 uppercase tracking-[0.2em]">
            Management
          </div>
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-sans tracking-wide rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-red-600/20 text-white border border-red-500/40 font-semibold shadow-[0_0_20px_rgba(220,38,38,0.25)]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-red-400" : "text-neutral-500"}`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Account Info & Sign Out */}
        <div className="p-4 border-t border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600/40 to-red-950/60 border border-red-500/50 flex items-center justify-center text-white font-sans text-xs font-semibold shrink-0 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                {userInitials}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-medium text-white truncate">{userName}</span>
                <span className="text-[10px] text-red-300/80 truncate">
                  {user?.email || "Pro Atelier Plan"}
                </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
