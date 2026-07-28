"use client";

import { useEffect, useState } from "react";
import { Diamond, Video, Camera, LayoutTemplate, FolderOpen, CreditCard, Settings, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Video Studio", href: "/dashboard/generate", icon: Video },
  { name: "Image Studio", href: "/dashboard/generate-image", icon: Camera },
  { name: "Cinroom Vault Rigs", href: "/dashboard/templates", icon: LayoutTemplate },
  { name: "Projects Vault", href: "/dashboard/history", icon: FolderOpen },
];

const secondaryItems = [
  { name: "Credits & Plan", href: "/dashboard/settings", icon: CreditCard },
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
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#050a18]/95 backdrop-blur-2xl border-b border-blue-500/15 z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600/30 to-white/10 flex items-center justify-center border border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
            <Diamond className="w-3 h-3 text-blue-300" />
          </div>
          <span className="font-semibold text-xs tracking-[0.2em] text-white uppercase font-sans">
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
        className={`w-64 h-screen border-r border-blue-500/15 bg-[#050a18]/95 backdrop-blur-2xl flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-blue-500/15">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600/30 to-white/10 flex items-center justify-center border border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              <Diamond className="w-3 h-3 text-blue-300" />
            </div>
            <span className="font-semibold text-xs tracking-[0.2em] text-white uppercase font-sans">
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
          <div className="px-3 mb-2 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-[0.2em]">
            STUDIO ENGINES
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/dashboard/generate" && pathname === "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/20 text-white border border-blue-400/40 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}

          <div className="px-3 mt-8 mb-2 text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-[0.2em]">
            MANAGEMENT
          </div>
          {secondaryItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-xs font-mono tracking-wider text-slate-300 rounded-xl hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <item.icon className="w-4 h-4 text-slate-400" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Account Info & Sign Out */}
        <div className="p-4 border-t border-blue-500/15 space-y-2">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/60 border border-blue-500/20">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/40 flex items-center justify-center text-white font-mono text-xs font-semibold shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                {userInitials}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-medium text-white truncate">{userName}</span>
                <span className="text-[10px] font-mono text-blue-300 truncate">
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
